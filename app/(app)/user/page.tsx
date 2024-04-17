import CategoryBar from "@/components/CategoryBar";
import UserContainer from "@/components/Container/User";

export default function UserPage() {
    return (
        <div>
            <CategoryBar isSticky={true}/>
            <UserContainer/>
        </div>
    )
}