import { persistReducer, persistStore } from "redux-persist";
import localStorage from "redux-persist/lib/storage";
import { createStore, applyMiddleware, combineReducers } from "redux";
import createSagaMiddleware from "redux-saga";

import userReducer from "./userReducer";
import {
  messageReducer,
  teamReducer,
  channelReducer,
  memberReducer
} from "./reducers";

import fetchData from "../middleware";
import rootsaga from "../sagas";

const sagaMiddleware = createSagaMiddleware();

const persistConfig = {
  key: "root",
  storage: localStorage,
  whitelist: ["user", "team"]
};

const rootReducer = combineReducers({
  messages: messageReducer,
  user: userReducer,
  team: teamReducer,
  channel: channelReducer,
  member: memberReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(
  persistedReducer,
  applyMiddleware(sagaMiddleware, fetchData)
);
const persistor = persistStore(store);

sagaMiddleware.run(rootsaga);

export { store, persistor };
