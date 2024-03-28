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
        removeFromCart: (state, action: { payload: { product: product } }) => {
            return state.filter((item) => item.product.id !== action.payload.product.id);
        },
        decrementQuantity: (state, action: { payload: { product: product } }) => {
            const index = state.findIndex((item) => item.product.id === action.payload.product.id);
            if (index !== -1) {
                state[index].quantity -= 1;
            }
        },
        incrementQuantity: (state, action: { payload: { product: product } }) => {
            const index = state.findIndex((item) => item.product.id === action.payload.product.id);
            if (index !== -1) {
                state[index].quantity += 1;
            }
        }
    },
});

export const { addToCart, removeFromCart, incrementQuantity, decrementQuantity } = cart.actions;
export default cart.reducer;