import { createStore, combineReducers } from "redux";

import tokenReducer from "./tokenReducer";
import auctionReducer from "./auctionReducer";

const reducers = combineReducers({ tokenReducer, auctionReducer });

const store = createStore(reducers);

export default store;
