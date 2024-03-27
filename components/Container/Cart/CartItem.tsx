import { product } from "@prisma/client";
interface CartItemProps {
    product: product;
    quantity: number;
}
export default function CartItem({ product, quantity }: CartItemProps ){

    return (
        <div className="bg-white rounded-md w-full flex justify-between p-4 space-x-4">
            <div className="w-20 h-20 bg-red-200">

            </div>
            <div className="flex justify-between space-y-2 w-full">
                <div className="flex flex-col">
                    <h1>{product.name}</h1>
                    <h1>Quantity: {quantity}</h1>
                </div>
                <div>
                    <h1>{product.price.toLocaleString()}</h1>
                </div>
            </div>
        </div>
    )
}