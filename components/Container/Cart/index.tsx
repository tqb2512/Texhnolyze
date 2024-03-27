"use client";
import CartItem from "@/components/Container/Cart/CartItem";
import { RootState } from "@/libs/store";
import { useSelector } from "react-redux";

export default function CartContainer() {

    const cart = useSelector((state: RootState) => state.cart);
    console.log(cart);

    return (
        <div className="mt-8 w-full max-w-[75%] mx-auto">
            <h1 className="font-semibold text-2xl">Cart</h1>
            <div className="flex w-full space-x-4 mt-4">
                <div className="flex flex-col space-y-4 w-2/3">
                    {cart.map((cartItem, index) => (
                            <CartItem key={index} product={cartItem.product} quantity={cartItem.quantity}/>
                    ))}
                </div>

                <div className="rounded-md bg-white h-max w-1/3 p-4 sticky top-24">
                    <h1 className="font-semibold text-2xl">Summary</h1>

                    <hr className="mt-4"/>
                    <div className="mt-2">
                        <a className="font-semibold">Subtotal</a>
                        <a className="float-right">N 2000</a>
                    </div>
                    <div className="rounded-md bg-red-400 w-full h-12 flex items-center justify-center mt-4">
                        <a>Place Order</a>
                    </div>
                </div>
            </div>
        </div>
    )
}