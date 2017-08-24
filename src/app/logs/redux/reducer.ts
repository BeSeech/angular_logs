import {ActionType} from './action';
import * as Actions from './action';
import {LogState} from './state';
import {LogColor, LogItem} from './logItemModel';
import {Action, Reducer} from 'redux';

const initialState: LogState = {items: [], buffer: 500};

class ReducerHelper {
  static SetBufferSize(state: LogState, action: Action): LogState {
    const a: Actions.SetBufferSizeAction = <Actions.SetBufferSizeAction>action;
    return {
      items: state.items.concat([]),
      buffer: a.buffer
    };
  }

  static AddItem(state: LogState, action: Action): LogState {
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

  static ClearLogs(state: LogState): LogState {
    return {
      items: [],
      buffer: state.buffer
    };
  }
}

export const logReducer: Reducer<LogState> =
  (state: LogState = initialState, action: Action): LogState => {
    switch (action.type) {
      case ActionType.SetBufferSize:
        return ReducerHelper.SetBufferSize(state, action);
      case ActionType.AddLogItem:
        return ReducerHelper.AddItem(state, action);
      case ActionType.ClearLogs:
        return ReducerHelper.ClearLogs(state);
      default:
        return state;
    }
  };
