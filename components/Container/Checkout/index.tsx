"use client"
import { useState } from "react";
import {RootState} from "@/libs/store";
import {useSelector} from "react-redux";
import Link from "next/link";

export default function CheckoutContainer() {
    const [shippingMethod, setShippingMethod] = useState<string>("AtShop");
    const cart = useSelector((state: RootState) => state.cart);

    return (
        <div className="mt-8 w-full max-w-[75%] mx-auto">
            <div className="flex w-full space-x-4 mt-4">
                <div className="w-[65%] flex flex-col space-y-4">
                    <div className="w-full h-full rounded-md bg-white flex justify-between space-x-2 p-4">
                        <div className="w-full">
                            <h1 className="font-semibold text-lg">Shipping Method</h1>
                            <div className="flex space-x-10 mt-4">
                                <div className="space-x-2">
                                    <input onChange={() => setShippingMethod("AtShop")} type="radio" name="shipping" id="AtShop" checked={shippingMethod === "AtShop"}/>
                                    <label htmlFor="AtShop">At Shop</label>
                                </div>
                                <div className="space-x-2">
                                    <input onChange={() => setShippingMethod("HomeDelivery")} type="radio" name="shipping" id="HomeDelivery"/>
                                    <label htmlFor="HomeDelivery">Home Delivery</label>
                                </div>
                            </div>
                            <hr className="mt-4"/>
                            {shippingMethod === "AtShop" &&
                                <div className="mt-4">
                                    <h1 className="font-semibold text-lg">Select shop to pickup</h1>
                                    <div className="grid grid-cols-2 gap-4 mt-4">
                                        <div className="rounded-lg bg-blue-light-bg h-24">

                                        </div>
                                        <div className="rounded-lg bg-blue-light-bg h-24">

                                        </div>
                                        <div className="rounded-lg bg-blue-light-bg h-24">

                                        </div>
                                    </div>
                                    <hr className="mt-4"/>
                                </div>}
                            <div className="mt-4">
                                <h1 className="font-semibold text-lg">Customer Information</h1>
                                <div className="grid grid-cols-2 gap-4 mt-4">
                                    <input className="rounded-md bg-blue-light-bg p-2" placeholder="Full name"/>
                                    <input className="rounded-md bg-blue-light-bg p-2" placeholder="Phone number"/>
                                    {shippingMethod === "HomeDelivery" &&
                                        <input className="rounded-md bg-blue-light-bg p-2" placeholder="Address"/>}
                                </div>

                            </div>
                        </div>
                    </div>
                </div>

                <div className="w-[35%] flex flex-col space-y-4 sticky top-24 h-max">
                    <div className="w-full bg-white rounded-md p-4">
                        <h1 className="font-semibold text-2xl">Summary</h1>

                        <hr className="mt-4"/>
                        <div className="mt-2">
                            <span className="font-semibold">Subtotal</span>
                            <h1 className="float-right text-lg text-red-500 font-semibold">{cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0).toLocaleString()}</h1>
                        </div>
                        <button
                            className="rounded-md bg-red-500 w-full h-12 flex items-center justify-center mt-4 text-white font-bold text-lg">
                            Place Order
                        </button>
                    </div>

                    <div className="w-full bg-white rounded-md p-4">
                        <h1 className="font-semibold text-2xl">Products in order</h1>
                        <hr className="mt-4"/>
                        <div className="space-y-4 mt-4">
                            {cart.map((cartItem, index) => (
                                <div key={index} className="flex space-x-4">
                                    <div className="w-16 h-16 bg-red-200 rounded-md"></div>
                                    <div className="flex flex-col justify-between">
                                        <Link href={`/product/${cartItem.product.id}`} className="font-semibold">{cartItem.product.name}</Link>
                                        <h1 className="text-red-500">{cartItem.quantity} x {cartItem.product.price.toLocaleString()}</h1>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}