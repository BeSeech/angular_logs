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

  public items: LogItem[] = [];

  private patt: RegExp;

  public isFiltered = false;

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
    this.patt = new RegExp(r, 'mgi');
  }

  canPassFilter(s: string): boolean {
    if (!this.isFiltered) {
      return true;
    }
    return this.patt.test(s);
  }

  clear(): void {
    this.items = [];
  }

  scroll(): void {
    this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
  }

  ngOnDestroy() {
    this.logService.getLogEvents().unsubscribe();
  }

  scrollToBottom(forced ?: boolean): void {
    try {
      let needToScrool: boolean;
      needToScrool =
        (this.myScrollContainer.nativeElement.scrollHeight - this.myScrollContainer.nativeElement.scrollTop) < 470;
      if (forced || needToScrool) {
        this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
      }
    } catch
      (err) {
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
