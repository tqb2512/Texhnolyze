import ProductContainer from "@/components/Container/Product";
import CategoryBar from "@/components/CategoryBar";

export default function ProductPage() {
    return (
        <div>
            <CategoryBar isSticky={true}/>
            <ProductContainer/>
        </div>
    )
}