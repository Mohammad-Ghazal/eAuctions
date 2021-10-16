import { createStore, combineReducers } from "redux";

import tokenReducer from "./tokenReducer";

const reducers = combineReducers({ tokenReducer: tokenReducer });

const store = createStore(reducers);

export default store;
