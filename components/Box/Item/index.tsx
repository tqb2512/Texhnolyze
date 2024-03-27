import { product} from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
interface ItemBoxProps {
    product: product;
    showDetail?: boolean;
}
export default function ItemBox({ product, showDetail }: ItemBoxProps) {
    return (
        <Link href={`/product/${product.id}`} className="min-h-[200px] min-w-[180px] rounded-md bg-white p-3">
            <div className="min-h-[180px] bg-green-500 relative overflow-hidden">
                {/*<Image src={product.image || "next.svg"} alt={"product image"} layout="fill" objectFit="cover"/>*/}
            </div>

            <div>
                <h2 className="text-md font-semibold">{product.name}</h2>
                <h2 className="text-md font-semibold text-red-500">{product.price.toLocaleString()}</h2>
            </div>

            {showDetail && (
                <div>
                    <hr className="mt-2 mb-2"/>
                    <div>
                        {product.properties?.slice(0, 5).map((property, index) => (
                            <h2 key={index} className="text-sm">{property.name}: {property.value}</h2>
                        ))}
                    </div>
                </div>
            )}
        </Link>
    )
}