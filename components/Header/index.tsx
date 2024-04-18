"use client"
import * as Icons from "./Icons";
import { RootState } from "@/libs/store";
import { useSelector } from "react-redux";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { product } from "@prisma/client";

export default function Header() {
    const cart = useSelector((state: RootState) => state.cart);
    const count = cart.reduce((acc, item) => acc + item.quantity, 0);
    const [isSearchFocused, setIsSearchFocused] = useState(false);
    const [searchText, setSearchText] = useState("");
    const [searchResult, setSearchResult] = useState([] as product[]);
    const [timerId, setTimerId] = useState<NodeJS.Timeout | null>(null);

    const handleSearch = (searchValue: string) => {
        if (timerId) clearTimeout(timerId);

        setTimerId(setTimeout(async () => {
            const res = await fetch(`/api/products?product_name=${searchValue}`);
            const data = await res.json();
            setSearchResult(data);
        }, 500));
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchText(e.target.value);
        handleSearch(e.target.value);
    }

    return (
        <header className="flex justify-center h-20 bg-white border-b border-gray-200">
            <div className="flex justify-between items-center w-full max-w-[75%]">
                <div className="flex items-center space-x-2">
                    <Link href="/" className="w-32 h-full text-2xl font-bold">
                        Texhnolyze
                    </Link>
                    <div className={`w-[20rem] h-10 bg-blue-light-bg rounded-full space-x-2 flex items-center group ${isSearchFocused ? 'border-2 border-blue-500' : 'border-2 border-blue-light-bg'}`}>
                        <Icons.Search className="w-5 h-5 text-black ml-4" />
                        <input
                            type="text"
                            placeholder="Search"
                            className="w-full h-full bg-transparent outline-none"
                            onFocus={() => setIsSearchFocused(true)}
                            onBlur={() => setIsSearchFocused(false)}
                            value={searchText}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>

                {searchResult.length > 0 && (
                    <div className="w-[20rem] h-max-[20rem] overflow-y-auto shadow-[0_3px_10px_rgb(0,0,0,0.2)] bg-white rounded-md absolute top-[4rem] ml-[8.5rem] z-50">
                        <div className="p-2 flex justify-between font-semibold">
                            <h1>Search Result</h1>
                        </div>
                        <hr />
                        <div className="p-4 space-y-4 w-full h-max-[20rem] overflow-y-auto">
                            {searchResult.map((product, index) => (
                                <div key={index} className="flex space-x-4">
                                    <div className="w-16 h-16 bg-red-200 rounded-md flex-shrink-0"></div>
                                    <div className="flex flex-col justify-between w-full">
                                        <Link href={`/product/${product.id}`} className="font-semibold">{product.name}</Link>
                                        <h1 className="text-red-500">{product.price.toLocaleString()}</h1>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                <div className="space-x-4 flex">
                    <div className="size-[36px] rounded-full bg-neutral-100 p-2 group relative">
                        <Link href={"/cart"}>
                            <Icons.Cart className="w-5 h-5 text-black" />
                        </Link>
                        {count > 0 &&
                            <div
                                className="rounded-full size-[16px] bg-red-500 text-white absolute top-[-4px] right-[-4px] flex items-center justify-center">
                                <h1 className="text-white text-xs font-semibold">{count}</h1>
                            </div>}

                        <div className="h-[4px] w-[100px] absolute top-[36px] hidden group-hover:block" />
                        <div
                            className="z-50 w-[500px] h-max shadow-[0_3px_10px_rgb(0,0,0,0.2)] bg-white rounded-md absolute top-[40px] right-0 hidden group-hover:block">
                            <div className="p-4 flex justify-between font-semibold">
                                <h1>Cart</h1>
                                <Link href={"/cart"}>
                                    <h1 className="ml-auto text-blue-500">View Cart</h1>
                                </Link>
                            </div>
                            <hr />
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
                            <hr />
                            <div className="p-4 flex justify-between font-semibold">
                                <h1>Total</h1>
                                <h1>{cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0).toLocaleString()}</h1>
                            </div>
                        </div>
                    </div>

                    <Link
                        href={"/user"}
                        className="rounded-full w-[36px] h-[36px] bg-neutral-100 p-2">
                        <Icons.User className="w-5 h-5 text-black" />
                    </Link>

                </div>
            </div>
        </header>
    );
}