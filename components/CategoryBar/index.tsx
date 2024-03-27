"use client";
import * as Icons from "./Icons";
import {useState, useEffect, createRef} from "react";
import * as categoriesAPI from "@/libs/features/apiSlices/categories";
import {category} from "@prisma/client";
import Link from "next/link";
interface CategoryBarProps {
    isSticky?: boolean;
}

export default function CategoryBar({isSticky}: CategoryBarProps){

    const [isOpen, setIsOpen] = useState(false);
    const { data: categories} = categoriesAPI.useGetCategoriesQuery();
    const [selectedCategory, setSelectedCategory] = useState<category>({} as category);
    const handleModal = () => {
        setIsOpen(!isOpen);
        if (isOpen) {
            document.body.classList.remove('overflow-hidden');
            return;
        }
        document.body.classList.add('overflow-hidden');
    }

    return (
        <nav className={`flex justify-center h-20 bg-white pt-2 pb-2 z-50 ${isSticky ? 'sticky top-0' : ''}`}>
            <div className="flex w-full max-w-[75%] space-x-4">
                <div className="flex w-full space-x-4 justify-between">
                    <button
                        onClick={handleModal}
                        className="rounded-lg hover:bg-blue-light-bg w-[200px] h-full flex justify-center items-center space-x-2">
                        <Icons.Category className="w-5 h-5 text-black"/>
                        <h1>Category</h1>
                    </button>
                    <div
                        id="category-container"
                        className="h-full flex space-x-4 overflow-x-hidden">
                        {categories?.map((category, index) => (
                            <Link href={`/category/${category.id}`} key={index}
                                  className="rounded-lg w-44 h-full flex space-x-4 p-4 items-center hover:bg-blue-light-bg">
                                <div className="w-10 h-10 bg-red-200"></div>
                                <a className="font-semibold w-max">{category.name}</a>
                            </Link>
                        ))}
                    </div>

                    <div className="h-full w-[84px] flex space-x-4 items-center z-10">
                        <button onClick={() => {
                            document.getElementById("category-container")?.scrollBy({
                                left: -300,
                                behavior: 'smooth'
                            });
                        }} className="rounded-full p-2 bg-blue-light-bg">
                            <Icons.Prev className="w-5 h-5 text-black"/>
                        </button>
                        <button onClick={() => {
                            document.getElementById("category-container")?.scrollBy({
                                left: 300,
                                behavior: 'smooth'
                            });
                        }} className="rounded-full p-2 bg-blue-light-bg">
                            <Icons.Next className="w-5 h-5 text-black"/>
                        </button>
                    </div>
                </div>

            </div>

            {/*Modal*/}
            {isOpen && (
                <div
                    style={{top: window.scrollY > 80 ? 80 : 160 - window.scrollY}}
                    className={`fixed left-0 right-0 bottom-0 flex justify-center pt-5 transition-opacity`}>
                    <div className="bg-white w-[75%] h-[540px] rounded-lg p-4 flex space-x-4 shadow-md ease-in-out duration-200 transform">
                        <div className="min-w-[20%] h-full space-y-2 overflow-y-auto">
                            {categories?.map((category, index) => (
                                <div
                                    onClick={() => setSelectedCategory(category)}
                                    key={index}
                                    className="rounded-md hover:bg-blue-light-bg w-full h-12 pl-6 items-center hover:cursor-pointer">
                                    <div className="flex items-center space-x-4 h-full">
                                        <div className="w-6 h-6 bg-green-300"></div>
                                        <h1 className="font-semibold">{category.name}</h1>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="bg-blue-light-bg h-full w-[55%] rounded-md">
                            {selectedCategory.name}
                        </div>

                        <div className="flex h-full w-[25%] flex-col space-y-4">
                            <div className="rounded-md h-1/4 bg-green-300 w-full">

                            </div>
                            <div className="rounded-md h-1/4 bg-green-300 w-full">

                            </div>
                            <div className="rounded-md h-1/4 bg-green-300 w-full">

                            </div>
                            <div className="rounded-md h-1/4 bg-green-300 w-full">

                            </div>
                        </div>
                    </div>
                </div>
            )}


        </nav>
    )
}