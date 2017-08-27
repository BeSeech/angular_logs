import {Component, Inject, Input, OnInit} from '@angular/core';
import {LogItem} from '../redux/logItemModel';
import {LogState} from '../redux/state';
import {LogStore} from '../redux/store';
import {Store} from 'redux';

@Component({
  selector: 'app-log-record',
  templateUrl: './log-record.component.html',
  styleUrls: ['./log-record.component.css']
})
export class LogRecordComponent implements OnInit {

  @Input() public item: LogItem;

  constructor(@Inject(LogStore) private store: Store<LogState>) { }

  ngOnInit() {
  }

  canPassFilter(s: string): boolean {
    if (!this.store.getState().filter.length) {
      return true;
    }
    return s.toLowerCase().indexOf(this.store.getState().filter.toLowerCase()) >= 0;
  }

}
