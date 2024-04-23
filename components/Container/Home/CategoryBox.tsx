import { category } from "@prisma/client";
import Link from "next/link";
import Image from "next/image";

interface CategoryBoxProps {
    category: category;

}
export default function CategoryBox({ category }: CategoryBoxProps){
    return (
        <Link href={`/category/${category.id}`} className="h-[160px] min-w-[80px] rounded-lg hover:bg-blue-light-bg p-2">
            <div className="h-[75%] bg-white rounded-md relative overflow-hidden">
                <Image src={category.image || "next.svg"} alt={"category image"} fill sizes="128px" className="object-cover" />
            </div>
            <div className="h-[25%] flex flex-col justify-center items-center">
                <h2 className="text-lg font-semibold">{category.name}</h2>
            </div>
        </Link>
    )
}