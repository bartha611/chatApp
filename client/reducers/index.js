import { persistReducer, persistStore } from "redux-persist";
import localStorage from "redux-persist/lib/storage";
import { createStore, applyMiddleware, combineReducers } from "redux";
import createSagaMiddleware from "redux-saga";

import userReducer from "./userReducer";

import fetchData from "../middleware";
import rootsaga from "../sagas";

const sagaMiddleware = createSagaMiddleware();

const createAsyncReducer = base => {
  const defaultState = {
    loading: false,
    [base]: [],
    error: false
  };
  return (state = defaultState, { type, payload }) => {
    switch (type) {
      case `${base}_REQUEST`:
        return {
          ...state,
          loading: true
        };
      case `${base}_CREATE`:
        return {
          ...state,
          [base]: [...state[base], payload]
        };
      case `${base}_READ`:
        return {
          ...state,
          [base]: payload
        };
      case `${base}_DELETE`:
        return {
          ...state,
          [base]: state[base].filter(x => x.id !== payload)
        };
      default:
        return state;
    }
  };
};

const messageReducer = createAsyncReducer("messages");
const channelReducer = createAsyncReducer("channels");
const teamReducer = createAsyncReducer("teams");

const persistConfig = {
  key: "root",
  storage: localStorage,
  whitelist: ["user", "team"]
};

const rootReducer = combineReducers({
  messages: messageReducer,
  user: userReducer,
  team: teamReducer,
  channel: channelReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(
  persistedReducer,
  applyMiddleware(sagaMiddleware, fetchData)
);
const persistor = persistStore(store);

sagaMiddleware.run(rootsaga);

export { store, persistor };
