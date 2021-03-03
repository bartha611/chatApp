import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import thunk from "redux-thunk";
import storage from "redux-persist/lib/storage";
import logger from "redux-logger";
import SocketMiddleware from "./middleware";
import * as reducers from "./ducks";

const rootReducer = combineReducers(reducers);

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth", "teams", "channels", "members"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
const middleware = [thunk, SocketMiddleware];

if (process.env.NODE_ENV === "development") {
  console.log(process.env.NODE_ENV);
  middleware.push(logger);
}

const store = configureStore({
  reducer: persistedReducer,
  middleware,
});

const persistor = persistStore(store);

export { store, persistor };
