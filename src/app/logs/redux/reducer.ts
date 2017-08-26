import {ActionType} from './action';
import * as Actions from './action';
import {LogState} from './state';
import {LogColor, LogItem} from './logItemModel';
import {Action, Reducer} from 'redux';

const initialState: LogState = {items: [], buffer: 500, filter: ''};

class ReducerHelper {
  static SetBufferSize(state: LogState, action: Action): LogState {
    const a: Actions.SetBufferSizeAction = <Actions.SetBufferSizeAction>action;
    return {
      items: state.items.concat([]),
      buffer: a.buffer,
      filter: state.filter
    };
  }

  static SetFilter(state: LogState, action: Action): LogState {
    const a: Actions.SetFilterAction = <Actions.SetFilterAction>action;
    return {
      items: state.items.concat([]),
      buffer: state.buffer,
      filter: a.filter
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
      buffer: state.buffer,
      filter: state.filter
    };
  }

  static ClearLogs(state: LogState): LogState {
    return {
      items: [],
      buffer: state.buffer,
      filter: state.filter
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
      case ActionType.SetFilter:
        return ReducerHelper.SetFilter(state, action);
      default:
        return state;
    }
  };
