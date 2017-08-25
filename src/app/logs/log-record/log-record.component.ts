import {Component, Input, OnInit} from '@angular/core';
import {LogItem} from '../redux/logItemModel';

@Component({
  selector: 'app-log-record',
  templateUrl: './log-record.component.html',
  styleUrls: ['./log-record.component.css']
})
export class LogRecordComponent implements OnInit {

  @Input() public item: LogItem;

  constructor() { }

  ngOnInit() {
  }

}
