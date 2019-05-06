import { combineReducers, Reducer } from "redux";

import webpartReducer, { IWebpartState } from "./webpart";
import usageReducer from "./usageReducer";
import currentContext from "./addContext";
import { listItemsReducer } from "./listItems/listItemReducer";

export interface IState {
  webpart: IWebpartState;
  usage: {};
  currentContext: any;
  listItems: any;
}

export const rootReducer: Reducer<IState> = combineReducers<IState>({
  webpart: webpartReducer,
  usage: usageReducer,
  currentContext,
  listItems: listItemsReducer
});
