import {Store} from 'redux';
import {LogState} from './state';
import {createLogStore} from './store';
import {ActionFacility} from './action';
import {LogColor, LogItem} from './logItemModel';

describe(
  'Log store',
  () => {
    const store: Store<LogState> = createLogStore();
    it('Add log item',
      () => {
        expect(store.getState().items.length).toEqual(0);
        store.dispatch(ActionFacility.AddLogItem(new LogItem('text', LogColor.blue, false)));
        expect(store.getState().items.length).toEqual(1);
      });
    it('Clear logs',
      () => {
        store.dispatch(ActionFacility.AddLogItem(new LogItem('text', LogColor.blue, false)));
        expect(store.getState().items.length).toBeGreaterThanOrEqual(1);
        store.dispatch(ActionFacility.ClearLog());
        expect(store.getState().items.length).toEqual(0);
      });
    it('Set buffer size', () => {
      store.dispatch(ActionFacility.SetBufferSize(10));
      expect(store.getState().buffer).toEqual(10);
    });
    it('Set filter', () => {
      store.dispatch(ActionFacility.SetFilter('10'));
      expect(store.getState().filter).toEqual('10');
    });
    it('Subscribe', () => {
      let filter: string;
      const unsubscribe: any = store.subscribe(() => filter = store.getState().filter);
      store.dispatch(ActionFacility.SetFilter('test value'));
      expect(filter).toEqual('test value');
      unsubscribe();
      store.dispatch(ActionFacility.SetFilter('test value2'));
      expect(filter).toEqual('test value');
    });
  }
);
