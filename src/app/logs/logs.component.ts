import {
  Component, ElementRef, OnInit, ViewChild, AfterViewChecked, OnDestroy, Input
} from '@angular/core';
import {LogColor, LogItem} from './LogItem';
import {LogsService} from './LogsService';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.css']
})

export class LogsComponent implements OnInit, AfterViewChecked, OnDestroy {

  @ViewChild('myLogs') private myScrollContainer: ElementRef;
  @Input() public buffer = 500;

  private items: LogItem[] = [];
  private searchPattern: RegExp;
  private isFiltered = false;


  constructor(private logService: LogsService) {
  }

  public getFilteredItems(): LogItem[] {
    if (!this.isFiltered) {
      return this.items;
    }

    const result: LogItem[] = [];
    Observable.from(this.items).filter(i => this.canPassFilter(i.value))
      .subscribe(i => {
        result.push(i);
      });
    return result;
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  filter(value: string): void {
    this.isFiltered = (value.trim() !== '');
    const s = value.trim();
    let r = '';
    for (let i = 0;
         i < s.length;
         i++) {

      if (s[i] === '.') {
        r += '\\' + s[i];
      } else {
        if (s[i] === '\\') {
          r += '\\' + s[i];
        } else {
          r += s[i];
        }
      }
    }
    this.searchPattern = new RegExp(r, 'mgi');
    setTimeout(() => this.scroll(), 100);
  }

  canPassFilter(s: string): boolean {
    return this.searchPattern.test(s);
  }

  clear(): void {
    this.items = [];
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
        if (this.items.length > this.buffer) {
          this.items.shift();
          this.items[0].value = '...';
          this.items[0].color = LogColor.yellow;
          this.items[0].isSubItem = false;
        }
        this.items.push(logItem);
        this.scrollToBottom();
      });
  }
}
