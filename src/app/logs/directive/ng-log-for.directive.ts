/* tslint:disable:directive-selector */
import {
  AfterContentInit,
  ChangeDetectorRef, Directive, DoCheck, Inject, Input, IterableDiffer, IterableDiffers, TemplateRef, ViewContainerRef,
  ViewRef
} from '@angular/core';
import {Store} from 'redux';
import {LogStore} from '../redux/store';
import {LogState} from '../redux/state';

@Directive({
  selector: '[ngLogFor]'
})
export class NgLogForDirective implements AfterContentInit, DoCheck {
  private filterString = '';
  private items: any;
  private differ: IterableDiffer<any>;
  private views: Map<any, ViewRef> = new Map<any, ViewRef>();
  private needRefilter = false;

  @Input()
  set ngLogForOf(items) {
    this.items = items;

    if (this.items && !this.differ) {
      this.differ = this.differs.find(items).create(null);
    }
  }

  ngAfterContentInit(): void {
    this.store.subscribe(() => {
      this.needRefilter = this.filterString !== this.store.getState().filter;
      this.filterString = this.store.getState().filter;
      if (this.needRefilter) {
        console.log(`Need refilter: ${this.needRefilter}. FilterString: ${this.filterString}`);
        this.items.forEach(item => {
          // console.log(`Del item: ${item.value}`)
          const view = this.views.get(item);
          if (view) {
            const idx = this.viewContainer.indexOf(view);
            this.viewContainer.remove(idx);
            this.views.delete(item);
          }
          if (this.canPassFilter(item.value)) {
            // console.log(`Add item: ${item.value}`)
            const newView = this.viewContainer.createEmbeddedView(this.template, {'$implicit': item});
            this.views.set(item, newView);
          }
        });
      }

    });
  }

  constructor(private viewContainer: ViewContainerRef,
              private template: TemplateRef<any>,
              private changeDetector: ChangeDetectorRef,
              private  differs: IterableDiffers,
              @Inject(LogStore) public store: Store<LogState>) {
  }

  canPassFilter(s: string): boolean {
    if (!this.store.getState().filter.length) {
      return true;
    }
    return s.toLowerCase().indexOf(this.store.getState().filter.toLowerCase()) >= 0;
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
        const view = this.viewContainer.createEmbeddedView(this.template, {'$implicit': change.item});
        this.views.set(change.item, view);
      }
    });
    changes
      .forEachRemovedItem(
        (change) => {
          const view = this.views.get(change.item);
          if (view) {
            const idx = this.viewContainer.indexOf(view);
            this.viewContainer.remove(idx);
            this.views.delete(change.item);
          }
        }
      );
  }
}
