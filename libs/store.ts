import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer, FLUSH, REHYDRATE, REGISTER, PAUSE, PERSIST, PURGE } from "redux-persist";
import { categoriesAPI } from "@/libs/features/apiSlices/categories";
import { productsAPI } from "@/libs/features/apiSlices/products";
import { ordersApi } from "@/libs/features/apiSlices/orders";
import { usersApi } from "@/libs/features/apiSlices/users";
import { inventoriesAPI } from "./features/apiSlices/inventories";
import cart from "./features/slices/cart";
import createWebStorage from "redux-persist/es/storage/createWebStorage";

const rootReducer = combineReducers({
    orders: ordersApi.reducer,
    users: usersApi.reducer,
    categories: categoriesAPI.reducer,
    products: productsAPI.reducer,
    inventories: inventoriesAPI.reducer,
    cart: cart,
});

export function createPersistStore() {
    const isServer = typeof window === "undefined";
    if (isServer) {
        return {
            getItem() {
                return Promise.resolve(null);
            },
            setItem() {
                return Promise.resolve();
            },
            removeItem() {
                return Promise.resolve();
            },
        };
    }
    return createWebStorage("local");
}
const storage = typeof window !== "undefined"
    ? createWebStorage("local")
    : createPersistStore();

const persist = {
    key: 'root',
    storage: storage,
}

const persistedReducer = persistReducer(persist, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }).concat(categoriesAPI.middleware, productsAPI.middleware, ordersApi.middleware, usersApi.middleware, inventoriesAPI.middleware),
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch