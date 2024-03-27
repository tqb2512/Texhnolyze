import CategoryContainer from "@/components/Container/Category";

export default function CategoryPage({ params }: { params: { category_id: string } }) {
    return (
        <CategoryContainer category_id={params.category_id}/>
    )
}