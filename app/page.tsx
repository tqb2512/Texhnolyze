import HomeContainer from "@/components/Container/Home";
import CategoryBar from "@/components/CategoryBar";

export default function Home() {
    return (
        <main className="w-full">
            <CategoryBar isSticky={true}/>
            <HomeContainer/>
        </main>
    );
}
