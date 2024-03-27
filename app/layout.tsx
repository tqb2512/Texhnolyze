import "./globals.css";
import Header from "@/components/Header";
import CategoryBar from "@/components/CategoryBar";
import StoreProvider from "@/libs/StoreProvider";

export default function RootLayout({children,}: Readonly<{ children: React.ReactNode; }>) {
    return (
        <StoreProvider>
        <html lang="en">
        <body className="w-screen overflow-x-hidden">
        <Header/>
        {children}
        </body>
        </html>
        </StoreProvider>
    );
}
