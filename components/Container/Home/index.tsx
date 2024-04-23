"use client"
import * as categoriesAPI from "@/libs/features/apiSlices/categories";
import CategoryBox from "@/components/Container/Home/CategoryBox";
import ItemBox from "@/components/Box/Item";
import * as productsAPI from "@/libs/features/apiSlices/products";
import Image from "next/image";

export default function HomeContainer() {

    const { data: categories } = categoriesAPI.useGetCategoriesQuery();
    const { data: products } = productsAPI.useGetProductsQuery();

    return (
        <div className="mt-8 w-full max-w-[75%] mx-auto">

            <div className="rounded-md h-[320px] w-full bg-black flex flex-row justify-between items-center ">
                <div className="w-[30%] h-[320px] text-white p-4 flex flex-col justify-center space-y-4">
                    <h1 className="text-xl font-semibold">
                        💥 April’s Shocking Laptop Deals
                    </h1>
                    <h1 className="text-md">
                        Visit Texhnolyze to purchase cutting-edge tech products at incredibly discounted prices, with reductions of up to 60%. Don’t miss out on the opportunity to experience remarkable products, services, and jaw-dropping deals this April!
                    </h1>
                </div>
                <div className="w-[70%] h-[320px] relative overflow-hidden">
                    <Image src="https://images.thinkgroup.vn/unsafe/1600x600/filters:quality(100)/https://media-api-beta.thinkpro.vn/media/core/categories/2024/3/2/frame-95720-thinkpro.jpeg" alt={"category image"} fill sizes="1200px" className="object-cover" />
                </div>
            </div>

            <div className="mt-12 w-full">
                <h1 className="text-3xl font-semibold">Top Categories</h1>
                <div className="mt-4 rounded-md w-full bg-white p-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 2xl:grid-cols-8 gap-4">
                        {categories?.map((category, index) => (
                            <CategoryBox key={index} category={category} />
                        ))}
                    </div>
                </div>
            </div>

            <div className="mt-12 w-full">
                <h1 className="text-3xl font-semibold">Recommended</h1>
                <div className="mt-4 w-full">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
                        {products?.map((product, index) => (
                            <ItemBox key={index} product={product} showDetail={true} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}