"use client"
import * as Icons from "./Icons";
import {RootState} from "@/libs/store";
import {useSelector} from "react-redux";
import Link from "next/link";
import {signOut} from "next-auth/react";

export default function Header() {
    const cart = useSelector((state: RootState) => state.cart);
    const count = cart.reduce((acc, item) => acc + item.quantity, 0);


    return (
        <header className="flex justify-center h-20 bg-white border-b border-gray-200">
            <div className="flex justify-between items-center w-full max-w-[75%]">
                <Link href="/" className="text-2xl font-bold">
                    Texhnolyze
                </Link>
                <div className="space-x-4 flex">
                    <div className="size-[36px] rounded-full bg-neutral-100 p-2 group relative">
                        <Link href={"/cart"}>
                            <Icons.Cart className="w-5 h-5 text-black"/>
                        </Link>
                        {count > 0 &&
                            <div
                                className="rounded-full size-[16px] bg-red-500 text-white absolute top-[-4px] right-[-4px] flex items-center justify-center">
                                <h1 className="text-white text-xs font-semibold">{count}</h1>
                            </div>}

                        <div className="h-[4px] w-[100px] absolute top-[36px] hidden group-hover:block"/>
                        <div
                            className="z-50 w-[500px] h-max shadow-[0_3px_10px_rgb(0,0,0,0.2)] bg-white rounded-md absolute top-[40px] right-0 hidden group-hover:block">
                            <div className="p-4 flex justify-between font-semibold">
                                <h1>Cart</h1>
                                <Link href={"/cart"}>
                                    <h1 className="ml-auto text-blue-500">View Cart</h1>
                                </Link>
                            </div>
                            <hr/>
                            <div className="p-4 space-y-4 w-full">
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
                            <hr/>
                            <div className="p-4 flex justify-between font-semibold">
                                <h1>Total</h1>
                                <h1>{cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0).toLocaleString()}</h1>
                            </div>
                        </div>
                    </div>

                    <div onClick={() => {signOut()}}
                         className="rounded-full w-[36px] h-[36px] bg-neutral-100 p-2">
                    </div>
                </div>
            </div>
        </header>
    );
}