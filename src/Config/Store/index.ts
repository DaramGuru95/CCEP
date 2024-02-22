import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
//for loacal storage
// import storage from "redux-persist/lib/storage";
//for session storage
import storage from "redux-persist/lib/storage/session";
import { rootReducers } from "./Slices/reducers";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["appState","userDetails","selectedTicketDetails"],
};

const persistedReducer = persistReducer(persistConfig, rootReducers);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

const persistor = persistStore(store);

export { store, persistor };

// Types
export type RootState = ReturnType<typeof rootReducers>;
export type AppDispatch = typeof store.dispatch;
