import { configureStore } from "@reduxjs/toolkit";
import * as apiSlices from "./features/apiSlices/categories";

export const store = configureStore({
    reducer: {
        [apiSlices.categoriesAPI.reducerPath]: apiSlices.categoriesAPI.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiSlices.categoriesAPI.middleware)
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch