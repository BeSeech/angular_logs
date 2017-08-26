import {Component, ElementRef, OnInit, ViewChild, Input, Inject} from '@angular/core';
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

export class LogsComponent implements OnInit {

  @Input() public buffer = 500;
  @ViewChild('inputField') private inputField: ElementRef;
  private keyUpObservable: any;

  constructor(@Inject(LogStore) private store: Store<LogState>) {
  }

  ngOnInit() {
    this.store.dispatch(ActionFacility.SetBufferSize(this.buffer));

    this.keyUpObservable = Observable.fromEvent(this.inputField.nativeElement, 'keyup')
      .map(() => this.inputField.nativeElement.value)
      .debounceTime(250).distinctUntilChanged();
    this.keyUpObservable.subscribe(s => this.filter(s));
  }

  clear(): void {
    this.store.dispatch(ActionFacility.ClearLog());
  }

  filter(value: string): void {
    this.store.dispatch(ActionFacility.SetFilter(value));
  }
}
