import {LogColor, LogItem} from '../LogItem';
import {Action, ActionCreator} from 'redux';

export enum ActionType {AddLogItem, ClearLogs, FilterLogMessages}

export interface AddLogItemAction extends Action {
  logItem: LogItem;
}

export interface FilterLogMessageAction extends Action {
  filter: string;
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

  public static FilterLog(filter: string): FilterLogMessageAction {
    return {
      type: ActionType.FilterLogMessages,
      filter: filter
    };
  }
}

