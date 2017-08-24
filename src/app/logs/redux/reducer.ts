import {ActionType} from './action';
import * as Actions from './action';
import {LogState} from './state';
import {LogColor, LogItem} from '../LogItem';
import {Action, Reducer} from 'redux';

const initialState: LogState = {items: [], buffer: 500};

export const logReducer: Reducer<LogState> =
  (state: LogState = initialState, action: Action): LogState => {
    switch (action.type) {
      case ActionType.AddLogItem: {
        const newItems: LogItem[] = state.items.concat([]);
        if (newItems.length > state.buffer) {
          newItems.shift();
          newItems[0].value = '...';
          newItems[0].color = LogColor.yellow;
          newItems[0].isSubItem = false;
        }
        const a: Actions.AddLogItemAction = <Actions.AddLogItemAction>action;
        return {
          items: newItems.concat(a.logItem),
          buffer: state.buffer
        };
      }
      case ActionType.ClearLogs:
        return {
          items: [],
          buffer: state.buffer
        };

      case ActionType.FilterLogMessages:
        return state;

      default:
        return state;
    }
  };
