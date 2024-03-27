import "./globals.css";
import Header from "@/components/Header";
import CategoryBar from "@/components/CategoryBar";

export default function RootLayout({children,}: Readonly<{ children: React.ReactNode; }>) {
    return (
        <html lang="en">
        <body className="w-screen overflow-x-hidden">
        <Header/>
        <CategoryBar/>
        {children}
        </body>
        </html>
    );
}
