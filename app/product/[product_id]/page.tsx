import ProductContainer from "@/components/Container/Product";
import CategoryBar from "@/components/CategoryBar";

export default function ProductPage({ params }: { params: { product_id: string } }) {
    return (
        <div>
            <CategoryBar isSticky={true}/>
            <ProductContainer product_id={params.product_id} />
        </div>
    )
}