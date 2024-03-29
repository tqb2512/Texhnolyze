import HomeContainer from "@/components/Container/Home";
import CategoryBar from "@/components/CategoryBar";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

export default function Home() {
    return (
        <main className="w-full">
            <Header/>
            <CategoryBar isSticky={true}/>
            <HomeContainer/>
            <Footer/>
        </main>
    );
}
