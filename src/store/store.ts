import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "@/store/cart-slice";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import { combineReducers } from "redux";

// Configuración de persistencia
const persistConfig = {
  key: "root",
  storage, // Usa localStorage
};

const rootReducer = combineReducers({
  cart: persistReducer(persistConfig, cartSlice), // Hace persistente el cart
});

// Configurar el store con persistencia
export const store = configureStore({
  reducer: rootReducer,
});

export const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
