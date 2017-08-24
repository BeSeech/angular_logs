export enum LogColor {white, black, gray, red, green, blue, yellow}

export class LogItem {
  value: string;
  date: Date;
  color: LogColor;
  isSubItem: boolean;

  getColor(): string {
    return LogColor[this.color];
  }

  getDate(): string {
    const ss: string = ('0' + this.date.getSeconds()).slice(-2);
    const hh: string = ('0' + this.date.getHours()).slice(-2);
    const mm: string = ('0' + this.date.getMinutes()).slice(-2);
    const sss: string = ('00' + this.date.getMilliseconds()).slice(-3);
    return `${hh}:${mm}:${ss}.${sss}`;
  }

  constructor(value: string, color?: LogColor, isSubItem?: boolean) {
    this.date = new Date();
    this.value = value;
    this.color = color || LogColor.white;
    this.isSubItem = isSubItem || false;
    if (this.isSubItem) {
      this.color = LogColor.gray;
    }
  }
}
