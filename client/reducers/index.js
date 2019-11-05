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
  const entity = base.toUpperCase().replace(/S$/, "");
  return (state = defaultState, action) => {
    switch (action.type) {
      case `${entity}_REQUEST`:
        return {
          ...state,
          loading: true
        };
      case `${entity}_CREATE`:
        return {
          ...state,
          [base]: [...state[base], action.payload]
        };
      case `${entity}_READ`:
        return {
          ...state,
          [base]: action.payload
        };
      case `${entity}_DELETE`:
        return {
          ...state,
          [base]: state[base].filter(x => x.id !== action.payload)
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
