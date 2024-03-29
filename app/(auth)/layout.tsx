export default function RootLayout({children,}: Readonly<{ children: React.ReactNode; }>) {

    return (
        <div className="w-screen overflow-x-hidden overflow-y-hidden">
            {children}
        </div>
    );
}