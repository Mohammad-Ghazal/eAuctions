import { createStore, combineReducers } from "redux";
import { persistStore } from "redux-persist";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import tokenReducer from "./tokenReducer";
import auctionReducer from "./auctionReducer";
import { useState } from "react";
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["tokenReducer"],
};
//

const reducers = combineReducers({ tokenReducer, auctionReducer });

export const store = createStore(persistReducer(persistConfig, reducers));
export const persistor = persistStore(store);
export default { store, persistor };
