import CategoryBox from "@/components/Container/Home/CategoryBox";
import ItemBox from "@/components/Box/Item";

export default function HomeContainer() {
    return (
        <div className="mt-8 w-full">

            <div className="rounded-md h-[300px] w-full bg-green-100">

            </div>

            <div className="mt-12 w-full">
                <h1 className="text-3xl font-semibold">Top Categories</h1>
                <div className="mt-4 rounded-md w-full bg-white p-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 2xl:grid-cols-8 gap-4">
                        <CategoryBox/>
                        <CategoryBox/>
                        <CategoryBox/>
                        <CategoryBox/>
                        <CategoryBox/>
                        <CategoryBox/>
                        <CategoryBox/>
                        <CategoryBox/>
                    </div>
                </div>
            </div>

            <div className="mt-12 w-full">
                <h1 className="text-3xl font-semibold">Recommended</h1>
                <div className="mt-4 w-full">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
                        <ItemBox showDetail={true}/>
                        <ItemBox/>
                        <ItemBox/>
                        <ItemBox/>
                        <ItemBox/>
                        <ItemBox/>
                        <ItemBox/>
                        <ItemBox/>
                        <ItemBox/>
                        <ItemBox/>
                        <ItemBox/>
                        <ItemBox/>
                    </div>
                </div>
            </div>
        </div>
    )
}