import CategoryBar from "@/components/CategoryBar";
import CartContainer from "@/components/Container/Cart";
export default function CartPage() {
    return (
        <main className="w-full">
            <CategoryBar isSticky={true}/>
            <CartContainer/>
        </main>
    );
}
