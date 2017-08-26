import {LogItem} from './logItemModel';
import {Action} from 'redux';

export enum ActionType {AddLogItem, ClearLogs, SetBufferSize, SetFilter}
export interface AddLogItemAction extends Action {
  logItem: LogItem;
}
export interface SetBufferSizeAction extends Action {
  buffer: number;
}
export interface SetFilterAction extends Action {
  filter: string;
}

export class ActionFacility {
  public static AddLogItem(logItem: LogItem): AddLogItemAction {
    return {
      type: ActionType.AddLogItem,
      logItem: logItem
    };
  }

  public static SetBufferSize(bufferSize: number): SetBufferSizeAction {
    return {
      type: ActionType.SetBufferSize,
      buffer: bufferSize
    };
  }

  public static SetFilter(filter: string): SetFilterAction {
    return {
      type: ActionType.SetFilter,
      filter: filter
    };
  }
  public static ClearLog(): Action {
    return {
      type: ActionType.ClearLogs
    };
  }
}

