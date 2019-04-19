import { Store, createStore as reduxCreateStore, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";
// import createLogger = require('redux-logger');
import {createLogger} from 'redux-logger';

import { rootReducer, IState } from '../reducers';

export { IState } from '../reducers';

export function createStore(initialState?: IState): Store<IState> {
  const loggerMiddleware = createLogger();

  const middlewares = [
    thunk,
    // add additional middleware like redux-thunk here
    loggerMiddleware
  ];

  return reduxCreateStore(rootReducer, initialState, compose(
    applyMiddleware(...middlewares),
    (window as any).__REDUX_DEVTOOLS_EXTENSION__ ? (window as any).__REDUX_DEVTOOLS_EXTENSION__() : f => f
  ));
}