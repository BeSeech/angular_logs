import {LogItem} from './logItemModel';
import {Action} from 'redux';

export enum ActionType {AddLogItem, ClearLogs, SetBufferSize}
export interface AddLogItemAction extends Action {
  logItem: LogItem;
}
export interface SetBufferSizeAction extends Action {
  buffer: number;
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

  public static ClearLog(): Action {
    return {
      type: ActionType.ClearLogs
    };
  }
}

