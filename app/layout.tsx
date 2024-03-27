import "./globals.css";
import Header from "@/components/Header";
import CategoryBar from "@/components/CategoryBar";
import StoreProvider from "@/libs/StoreProvider";
import Footer from "@/components/Footer";

export default function RootLayout({children,}: Readonly<{ children: React.ReactNode; }>) {
    return (

        <html lang="en">
        <body className="w-screen overflow-x-hidden">
        <StoreProvider>
            <Header/>
            {children}
            <Footer/>
        </StoreProvider>
        </body>
        </html>

    );
}
