export default function CartItem() {
    return (
        <div className="bg-white rounded-md w-full flex justify-between p-4 space-x-4">
            <div className="w-20 h-20 bg-red-200">

            </div>
            <div className="flex justify-between space-y-2 w-full">
                <div className="flex flex-col">
                    <a>Product Name</a>
                    <a>Des</a>
                </div>
                <div>
                    <a>Price</a>
                </div>
            </div>
        </div>
    )
}