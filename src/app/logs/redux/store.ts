import {InjectionToken} from '@angular/core';
import {createStore, Store, compose, StoreEnhancer} from 'redux';

import {LogState} from './state';
import {logReducer as reducer} from './reducer';

export const LogStore = new InjectionToken('App.store');

const devtools: StoreEnhancer<LogState> =
  window['devToolsExtension'] ?
    window['devToolsExtension']() : f => f;

export function createLogStore(): Store<LogState> {
  return createStore<LogState>(reducer, compose(devtools));
}

export const appStoreProviders = [
  {provide: LogStore, useFactory: createLogStore}
];
