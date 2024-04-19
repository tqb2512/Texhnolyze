"use client";
import * as cart from "@/libs/features/slices/cart";
import * as productsAPI from "@/libs/features/apiSlices/products";
import { useDispatch } from "react-redux";
import { inventory, product } from "@prisma/client";
import Image from "next/image";
import { useEffect, useState } from "react";
interface CategoryContainerProps {
    product_id: string;
}
export default function ProductContainer({ product_id }: CategoryContainerProps) {

    const dispatch = useDispatch();
    const { data: product } = productsAPI.useGetProductQuery(product_id);
    const [alert, setAlert] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [inventories, setInventories] = useState([] as inventory[]);

    useEffect(() => {
        if (alert) {
            setTimeout(() => {
                setAlert(false);
            }, 3000);
        }
    }, [alert]);

    useEffect(() => {
        fetch(`/api/inventories?product_id=${product_id}`)
            .then(res => res.json())
            .then(data => setInventories(data));
    }, [product_id]);

    return (
        <div className="mt-8 w-full max-w-[75%] mx-auto">
            <div className="flex w-full space-x-4 mt-4">
                <div className="w-[65%] flex flex-col space-y-4">
                    <div className="w-full h-[44rem] aspect-square rounded-md bg-white flex justify-between space-x-2 p-4">
                        <div className="w-[10rem] space-y-2 items-center h-full no-scrollbar overflow-y-scroll">
                            <div className="flex flex-col space-y-2">
                                {product?.images?.map((image, index) => (
                                    <div
                                        key={index}
                                        className={`size-[8rem] relative overflow-hidden rounded-md cursor-pointer border-2 ${selectedIndex === index ? " border-blue-500" : "border-blue-light-bg"}`}
                                        onClick={() => { setSelectedIndex(index); }}>
                                        <Image src={image || "next.svg"} alt={"product image"} fill sizes="128px" className="object-cover" />
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="w-full h-full aspect-square rounded-md border-blue-light-bg border-2 overflow-hidden relative">
                            <Image src={product?.images?.[selectedIndex] || "next.svg"} alt={"product image"} fill sizes="664px" className="object-cover" />
                        </div>
                    </div>

                    <div className="w-full h-max rounded-md bg-white p-4">
                        <h1 className="font-semibold text-lg">Specification</h1>
                        <hr className="mt-2" />
                        <div className="flex flex-col space-y-4 my-4 rounded-md overflow-hidden">
                            {product?.properties?.map((property, index) => (
                                <div key={index} className={`flex justify-between p-1 ${index % 2 === 0 ? "bg-blue-light-bg" : ""}`}>
                                    <h1>{property.name}</h1>
                                    <h1>{property.value}</h1>
                                </div>
                            ))}
                        </div>
                        <h1 className="font-semibold text-lg mt-8">Description</h1>
                        <hr className="mt-2" />
                        <p className="mt-2">{product?.description}</p>
                        <h1 className="font-semibold text-lg mt-8">Avaiable at</h1>
                        <hr className="mt-2" />
                        {inventories.length > 0 ? (
                            <div className="flex flex-col space-y-4 my-4 rounded-md overflow-hidden">
                                {inventories.map((inventory, index) => (
                                    <div key={index} className={`flex justify-between p-1 ${index % 2 === 0 ? "bg-blue-light-bg" : ""}`}>
                                        <h1>{inventory.name}</h1>
                                        <h1>{inventory.address}</h1>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="mt-2">No inventory available</p>
                        )}
                    </div>
                </div>

                <div className="w-[35%] flex flex-col space-y-4 sticky top-24 h-max">
                    <div className="w-full bg-white rounded-md p-4">
                        <h1 className="font-semibold text-lg">{product?.name}</h1>
                        <hr className="mt-2" />
                        <div className="w-full bg-white rounded-md">
                        </div>
                        <hr className="mt-2" />
                        <div className="flex justify-between mt-4 h-12 items-center">
                            <h1 className="font-semibold text-lg text-red-500">{product?.price.toLocaleString()}</h1>
                            <div className="flex space-x-2">
                                <button
                                    onClick={() => {
                                        dispatch(cart.addToCart({ product: product as product, quantity: 1 }));
                                        setAlert(true);
                                    }}
                                    className="h-12 w-28 rounded-md bg-blue-light-bg">
                                    <h1 className="flex items-center justify-center h-full w-full">Add to Cart</h1>
                                </button>
                                <button className="h-12 w-28 rounded-md bg-red-400">
                                    <h1 className="flex items-center justify-center h-full w-full text-white">Buy Now</h1>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {alert &&
                <div className="fixed right-5 top-10 bg-white shadow-[0_3px_10px_rgb(0,0,0,0.2)] p-4 z-50 rounded flex items-center">
                    <div className="rounded-full size-4 mr-2 bg-green-500"></div>
                    <p className="font-semibold">Product added to cart!</p>
                </div>
            }
        </div>
    )
}