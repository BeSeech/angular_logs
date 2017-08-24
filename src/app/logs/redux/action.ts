import {LogItem} from './logItemModel';
import {Action} from 'redux';

export enum ActionType {AddLogItem, ClearLogs}
export interface AddLogItemAction extends Action {
  logItem: LogItem;
}

export class ActionFacility {
  public static AddLogItem(logItem: LogItem): AddLogItemAction {
    return {
      type: ActionType.AddLogItem,
      logItem: logItem
    };
  }

  public static ClearLog(): Action {
    return {
      type: ActionType.ClearLogs
    };
  }
}

