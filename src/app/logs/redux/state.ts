import {LogItem} from '../LogItem';

export interface LogState {
  items: LogItem[];
  buffer: number;
}
