import {EventEmitter, Inject, Injectable} from '@angular/core';
import {LogItem, LogColor} from './redux/logItemModel';

@Injectable()
export class LogsService {

  private toConsole = false;

  private emitter: EventEmitter<LogItem> = new EventEmitter<LogItem>();

  public add(logMessage: string, color?: LogColor, isSubItem?: boolean): void {
    if (this.toConsole) {
      if (color === LogColor.red) {
        console.error(logMessage);
      } else if (color === LogColor.yellow) {
        console.warn(logMessage);
      }
      console.log(logMessage);
    } else {
      this.emitter.next(new LogItem(logMessage, color || LogColor.white, isSubItem));
    }
  }

  public info(logMessage: string) {
    this.add(logMessage, LogColor.white);
  }

  public success(logMessage: string) {
    this.add(logMessage, LogColor.green);
  }

  public sub(logMessage: string) {
    this.add(logMessage, LogColor.gray, true);
  }

  public warning(logMessage: string) {
    this.add(logMessage, LogColor.yellow);
  }

  public error(logMessage: string) {
    this.add(logMessage, LogColor.red);
  }

  public debug(logMessage: string) {
    this.add(logMessage, LogColor.gray);
  }

  public getLogEvents(): EventEmitter<LogItem> {
    return this.emitter;
  }
}
