import { category } from "@prisma/client";
import Link from "next/link";

interface CategoryBoxProps {
    category: category;

}
export default function CategoryBox({ category }: CategoryBoxProps){
    return (
        <Link href={`/category/${category.id}`} className="h-[160px] min-w-[80px] rounded-lg hover:bg-blue-light-bg p-2">
            <div className="h-2/3 bg-green-500">
            </div>
            <div className="h-1/3 flex flex-col justify-center items-center">
                <h2 className="text-lg font-semibold">{category.name}</h2>
                <h2 className="text-sm">quantity</h2>
            </div>
        </Link>
    )
}