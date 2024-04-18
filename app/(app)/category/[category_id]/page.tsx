import CategoryBar from "@/components/CategoryBar";
import CategoryContainer from "@/components/Container/Category";

export default function CategoryPage({ params }: { params: { category_id: string } }) {
    return (
        <div>
            <CategoryBar isSticky={false} />
            <CategoryContainer category_id={params.category_id} />
        </div>
    )
}