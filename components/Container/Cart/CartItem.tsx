"use client";
import {product} from "@prisma/client";
import { useDispatch } from "react-redux";
import * as cart from "@/libs/features/slices/cart";
import Link from "next/link";
import Image from "next/image";
interface CartItemProps {
    product: product;
    quantity: number;
}

export default function CartItem({product, quantity}: CartItemProps) {
    const dispatch = useDispatch();
    return (
        <div className="bg-white rounded-md w-full flex justify-between p-4 space-x-4">
            <div className="w-20 h-20 bg-white shrink-0 relative overflow-hidden">
                <Image src={product.previewImage || "next.svg"} alt={"product image"} fill sizes="80px"
                    className="object-cover" />
            </div>
            <div className="flex justify-between space-y-2 w-full">
                <div  className="flex flex-col">
                    <Link href={`/product/${product.id}`}>{product.name}</Link>
                </div>

                <div className="flex w-max justify-between">
                    <div className="flex flex-col">
                        <div className="flex justify-between items-center h-full">
                            <button
                                onClick={() => {
                                    if (quantity <= 1) {
                                        return;
                                    }
                                    dispatch(cart.decrementQuantity({product: product as product}));
                                }}
                                className="rounded-l-md bg-blue-light-bg size-10 p-2 border">-
                            </button>
                            <span className="size-10 border flex items-center justify-center">{quantity}</span>
                            <button
                                onClick={() => dispatch(cart.incrementQuantity({product: product as product}))}
                                className="rounded-r-md bg-blue-light-bg size-10 p-2 border">+
                            </button>
                        </div>

                        <h1
                            onClick={() => dispatch(cart.removeFromCart({product: product as product}))}
                            className="text-center hover:cursor-pointer text-neutral-500">Remove</h1>
                    </div>


                    <div className="flex w-[140px] justify-end items-center">
                        <h1 className="text-red-500 font-semibold text-lg">{product.price.toLocaleString()}</h1>
                    </div>
                </div>

            </div>
        </div>
    )
}