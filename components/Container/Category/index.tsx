import ItemBox from "@/components/Box/Item";

export default function CategoryContainer() {
    return (
        <div className="mt-8 w-full max-w-[75%] mx-auto">
            <div className="rounded-md h-[300px] w-full bg-green-100">

            </div>


            <div
                className="mt-8 h-14 p-2 sticky top-0 bg-blue-light-bg">
                <div className="rounded-md bg-white h-full w-max pl-2 pr-2 flex items-center">
                    <a className="">Brand</a>
                </div>
            </div>

            <div className="mt-4 w-full">
                <div className="w-full">
                    <div
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
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