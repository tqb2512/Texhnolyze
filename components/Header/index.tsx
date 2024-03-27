
import * as Icons from "./Icons";
import Link from "next/link";
export default function Header() {
    return (
        <header className="flex justify-center h-20 bg-white border-b border-gray-200">
            <div className="flex justify-between items-center w-full max-w-[75%]">
                <a className="text-2xl font-bold">Texhnolyze</a>

                <div className="space-x-4 flex">
                    <Link href="/cart" className="rounded-full bg-neutral-100 p-2">
                        <Icons.Cart className="w-5 h-5 text-black"/>
                    </Link>
                    <div className="rounded-full w-[36px] h-[36px] bg-neutral-100 p-2">
                    </div>
                </div>
            </div>
        </header>
    );
}