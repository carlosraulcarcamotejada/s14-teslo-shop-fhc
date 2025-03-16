import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

import cartSlice from "@/store/cart-slice";
import addressSlice from "@/store/address-slice";

// Configuración de persistencia con claves únicas
const persistConfig = {
  storage,
};

const persistedCartReducer = persistReducer(
  { key: "cartStore", ...persistConfig },
  cartSlice
);
const persistedAddressReducer = persistReducer(
  { key: "addressStore", ...persistConfig },
  addressSlice
);

// Configurar el store con persistencia
export const store = configureStore({
  reducer: {
    cartStore: persistedCartReducer,
    addressStore: persistedAddressReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          "persist/PERSIST",
          "persist/REHYDRATE",
          "persist/REGISTER",
        ],
        ignoredPaths: ["_persist"],
      },
    }),
});

export const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
