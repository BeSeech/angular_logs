import {Component, Inject, OnInit, OnDestroy, ElementRef, AfterViewChecked, ViewChild} from '@angular/core';
import {Store} from 'redux';
import {LogStore} from '../redux/store';
import {LogsService} from '../logs.service';
import {LogState} from '../redux/state';
import {ActionFacility} from '../redux/action';
import {Observable} from 'rxjs/Observable';
import {LogItem} from '../redux/logItemModel';

@Component({
  selector: 'app-log-record-set',
  templateUrl: './log-record-set.component.html',
  styleUrls: ['./log-record-set.component.css']
})
export class LogRecordSetComponent implements OnInit, OnDestroy, AfterViewChecked {

  @ViewChild('myLogs') private htmlElement: ElementRef;
  private isFiltered = false;
  private searchString = '';

  constructor(private logService: LogsService, @Inject(LogStore) private store: Store<LogState>) {
  }

  ngOnInit() {
    this.logService.getLogEvents()
      .subscribe(logItem => {
        this.store.dispatch(ActionFacility.AddLogItem(logItem));
      });
    this.store.subscribe(() => this.filter(this.store.getState().filter));
    this.logService.success('Log initialization complete. Buffer size: ' + this.store.getState().buffer);
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  ngOnDestroy(): void {
    this.logService.getLogEvents().unsubscribe();
  }

  private filter(s: String): void {
    if (this.searchString === s.toLowerCase()) {
      return;
    }
    this.isFiltered = (s.trim() !== '');
    this.searchString = s.toLowerCase();
    setTimeout(() => this.scroll(), 0);
  }

  public getFilteredItems(): Observable<LogItem[]> {
    return Observable.from(this.store.getState().items)
      .filter(i => this.canPassFilter(i.value))
      .toArray();
  }

  canPassFilter(s: string): boolean {
    if (!this.isFiltered) {
      return true;
    }
    return s.toLowerCase().indexOf(this.searchString) >= 0;
  }

  scroll(): void {
    try {
      this.htmlElement.nativeElement.scrollTop = this.htmlElement.nativeElement.scrollHeight;
    } catch
      (err) {
      console.error('this.scroll(): ' + err.message);
    }
  }

  scrollToBottom(forced ?: boolean): void {
    let needToScroll: boolean;
    needToScroll =
      (this.htmlElement.nativeElement.scrollHeight - this.htmlElement.nativeElement.scrollTop) < 470;
    if (forced || needToScroll) {
      this.scroll();
    }
  }

}

