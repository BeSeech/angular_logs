import {
  Component, ElementRef, OnInit, ViewChild, AfterViewChecked, OnDestroy, Input, Inject
} from '@angular/core';
import {LogItem} from './redux/logItemModel';
import {LogsService} from './logs.service';
import {Observable} from 'rxjs/Observable';
import {LogStore} from './redux/store';
import {LogState} from './redux/state';
import {Store} from 'redux';
import {ActionFacility} from './redux/action';

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.css']
})

export class LogsComponent implements OnInit, AfterViewChecked, OnDestroy {

  @ViewChild('myLogs') private myScrollContainer: ElementRef;
  @ViewChild('inputField') private inputField: ElementRef;

  @Input() public buffer = 500;

  private searchString: string;
  private isFiltered = false;
  private keyUpObservable: any;

  constructor(private logService: LogsService, @Inject(LogStore) private store: Store<LogState>) {
  }

  public getFilteredItems(): Observable<LogItem[]> {
    return Observable.from(this.store.getState().items)
      .filter(i => this.canPassFilter(i.value))
      .toArray();
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  filter(value: string): void {
    this.isFiltered = (value.trim() !== '');
    this.searchString = value.toLowerCase();
    setTimeout(() => this.scroll(), 0);
  }

  canPassFilter(s: string): boolean {
    if (!this.isFiltered) {
      return true;
    }
    return s.toLowerCase().indexOf(this.searchString) > 0;
  }

  clear(): void {
    this.store.dispatch(ActionFacility.ClearLog());
  }

  scroll(): void {
    try {
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch
      (err) {
      console.error('this.scroll(): ' + err.message);
    }

  }

  ngOnDestroy() {
    this.logService.getLogEvents().unsubscribe();
  }

  scrollToBottom(forced ?: boolean): void {
    let needToScrool: boolean;
    needToScrool =
      (this.myScrollContainer.nativeElement.scrollHeight - this.myScrollContainer.nativeElement.scrollTop) < 470;
    if (forced || needToScrool) {
      this.scroll();
    }
  }

  ngOnInit() {
    this.logService.getLogEvents()
      .subscribe(logItem => {
        this.store.dispatch(ActionFacility.AddLogItem(logItem));
      });
    this.store.dispatch(ActionFacility.SetBufferSize(this.buffer));

    this.logService.success('Log initialization...');
    this.keyUpObservable = Observable.fromEvent(this.inputField.nativeElement, 'keyup')
      .map(() => this.inputField.nativeElement.value)
      .debounceTime(250).distinctUntilChanged();
    this.keyUpObservable.subscribe(s => this.filter(s));
    this.logService.success('Log initialization complete. Buffer size: ' + this.store.getState().buffer);
  }
}
