import {LogItem} from './logItemModel';

export interface LogState {
  items: LogItem[];
  buffer: number;
}
