import CheckoutContainer from "@/components/Container/Checkout";
import CategoryBar from "@/components/CategoryBar";

export default function CheckoutPage() {
    return (
        <div>
            <CategoryBar isSticky={true}/>
            <CheckoutContainer />
        </div>
    )
}