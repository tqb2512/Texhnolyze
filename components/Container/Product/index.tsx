export default function ProductContainer() {
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

                    <div className="w-full h-max rounded-md bg-white p-4">

                    </div>
                </div>

                <div className="w-[35%] flex flex-col space-y-4 sticky top-24 h-max">
                    <div className="w-full bg-white rounded-md p-4">
                        <h1 className="font-semibold text-lg">Product Name</h1>
                        <hr className="mt-2"/>
                        <div className="w-full h-64 bg-white rounded-md"></div>
                        <hr className="mt-2"/>
                        <div className="flex justify-between mt-4">
                            <a>Price</a>
                            <div className="flex space-x-2">
                                <div className="h-12 w-28 rounded-md bg-blue-light-bg">
                                    <a className="flex items-center justify-center h-full w-full">Add to Cart</a>
                                </div>
                                <div className="h-12 w-28 rounded-md bg-red-400">
                                    <a className="flex items-center justify-center h-full w-full text-white">Buy Now</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}