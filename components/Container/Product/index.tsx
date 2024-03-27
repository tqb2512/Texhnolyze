"use client";
import * as cart from "@/libs/features/slices/cart";
import * as productsAPI from "@/libs/features/apiSlices/products";
import { useDispatch } from "react-redux";
import { product } from "@prisma/client";
interface CategoryContainerProps {
    product_id: string;
}
export default function ProductContainer({ product_id }: CategoryContainerProps) {

    const dispatch = useDispatch();
    const { data: product } = productsAPI.useGetProductQuery(product_id);
    console.log(product)
    return (
        <div className="mt-8 w-full max-w-[75%] mx-auto">
            <div className="flex w-full space-x-4 mt-4">
                <div className="w-[65%] flex flex-col space-y-4">
                    <div className="w-full h-max rounded-md bg-white flex justify-between space-x-2 p-4">
                        <div className="flex flex-col w-32 space-y-2 items-center">
                            <div className="w-full h-32 aspect-square bg-red-200 rounded-md"></div>
                            <div className="w-full h-32 aspect-square bg-red-200 rounded-md"></div>
                            <div className="w-full h-32 aspect-square bg-red-200 rounded-md"></div>
                        </div>
                        <div className="w-full h-full aspect-square rounded-md bg-red-400">
                        </div>
                    </div>

                    <div className="w-full h-[1000px] rounded-md bg-white p-4">

                    </div>
                </div>

                <div className="w-[35%] flex flex-col space-y-4 sticky top-24 h-max">
                    <div className="w-full bg-white rounded-md p-4">
                        <h1 className="font-semibold text-lg">{product?.name}</h1>
                        <hr className="mt-2"/>
                        <div className="w-full h-64 bg-white rounded-md"></div>
                        <hr className="mt-2"/>
                        <div className="flex justify-between mt-4 h-12 items-center">
                            <h1 className="font-semibold text-lg text-red-500">{product?.price.toLocaleString()}</h1>
                            <div className="flex space-x-2">
                                <div
                                    onClick={() => dispatch(cart.addToCart({ product: product as product, quantity: 1 }))}
                                    className="h-12 w-28 rounded-md bg-blue-light-bg">
                                    <h1 className="flex items-center justify-center h-full w-full">Add to Cart</h1>
                                </div>
                                <div className="h-12 w-28 rounded-md bg-red-400">
                                    <h1 className="flex items-center justify-center h-full w-full text-white">Buy Now</h1>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}