import { persistReducer, persistStore } from "redux-persist";
import localStorage from "redux-persist/lib/storage";
import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";

import messageReducer from "./messageReducer";
import userReducer from "./userReducer";
import teamReducer from "./teamReducer";

const persistConfig = {
  key: "root",
  storage: localStorage,
  whitelist: ["user", "team"]
};

const rootReducer = combineReducers({
  messages: messageReducer,
  user: userReducer,
  team: teamReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(persistedReducer, applyMiddleware(thunk));
const persistor = persistStore(store);

export { store, persistor };
