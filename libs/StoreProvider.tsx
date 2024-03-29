"use client"
import { store, persistor } from "./store"
import { Provider } from "react-redux"
import { PersistGate } from "redux-persist/integration/react";

export default function StoreProvider({children}: {children: React.ReactNode}) {
   return (
        <Provider store={store}>
            <PersistGate loading={<div/>} persistor={persistor}>
                    {children}
            </PersistGate>
        </Provider>
    )
}