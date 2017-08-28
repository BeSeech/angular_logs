/* tslint:disable:directive-selector */
import {
  AfterContentInit, ChangeDetectorRef, Directive, DoCheck, Inject, Input,
  IterableDiffer, IterableDiffers, TemplateRef, ViewContainerRef, ViewRef
} from '@angular/core';
import {Store} from 'redux';
import {LogStore} from '../redux/store';
import {LogState} from '../redux/state';
import {LogItem} from '../redux/logItemModel';

@Directive({
  selector: '[ngLogFor]'
})
export class NgLogForDirective implements AfterContentInit, DoCheck {
  private filterString = '';
  private items: any;
  private differ: IterableDiffer<any>;
  private views: Map<any, ViewRef> = new Map<any, ViewRef>();

  @Input()
  set ngLogForOf(items) {
    this.items = items;
    if (this.items && !this.differ) {
      this.differ = this.differs.find(items).create(null);
    }
  }

  constructor(private viewContainer: ViewContainerRef,
              private template: TemplateRef<any>,
              private  differs: IterableDiffers,
              @Inject(LogStore) private store: Store<LogState>) {
  }

  ngAfterContentInit(): void {
    this.store.subscribe(() => {
      if (this.needApplyFilter()) {
        this.items.forEach(item => {
          this.removeItem(item);
          if (this.canPassFilter(item.value)) {
            this.addItem(item);
          }
        });
      }
    });
  }

  ngDoCheck(): void {
    if (!this.differ) {
      return;
    }
    const changes = this.differ.diff(this.items);
    if (!changes) {
      return;
    }
    changes.forEachAddedItem((change) => {
      if (this.canPassFilter(change.item.value)) {
        this.addItem(change.item);
      }
    });
    changes.forEachRemovedItem(
      (change) => {
        this.removeItem(change.item);
      }
    );
  }

  private canPassFilter(s: string): boolean {
    if (!this.store.getState().filter.length) {
      return true;
    }
    return s.toLowerCase().indexOf(this.store.getState().filter.toLowerCase()) >= 0;
  }

  private removeItem(item: LogItem): void {
    const view = this.views.get(item);
    if (view) {
      const idx = this.viewContainer.indexOf(view);
      this.viewContainer.remove(idx);
      this.views.delete(item);
    }
  }

  private addItem(item: LogItem): void {
    const newView = this.viewContainer.createEmbeddedView(this.template, {'$implicit': item});
    this.views.set(item, newView);
  }

  private needApplyFilter(): boolean {
    const result = this.filterString !== this.store.getState().filter;
    if (result) {
      this.filterString = this.store.getState().filter;
    }
    return result;
  }
}
