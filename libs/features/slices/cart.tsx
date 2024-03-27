import { createSlice } from "@reduxjs/toolkit";
import { product } from "@prisma/client";

const cart = createSlice({
    name: "cart",
    initialState: [] as { product: product, quantity: number }[],
    reducers: {
        addToCart: (state, action: { payload: { product: product, quantity: number } }) => {
            const index = state.findIndex((item) => item.product.id === action.payload.product.id);
            if (index !== -1) {
                state[index].quantity += action.payload.quantity;
            } else {
                state.push(action.payload);
            }
        },
        removeFromCart: (state, action: { payload: { product: product, quantity: number } }) => {
            state.splice(state.indexOf(action.payload), 1);
        },
    },
});

export const { addToCart, removeFromCart } = cart.actions;
export default cart.reducer;