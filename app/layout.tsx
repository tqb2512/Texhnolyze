import "./globals.css";
import StoreProvider from "@/libs/StoreProvider";
import AuthProvider from "@/libs/AuthProvider";

export default function RootLayout({children}: Readonly<{ children: React.ReactNode; }>) {
    return (
        <html lang="en">
        <body className="w-screen overflow-x-hidden">
        <StoreProvider>
            <AuthProvider session={null}>
                {children}
            </AuthProvider>
        </StoreProvider>
        </body>
        </html>
    );
}