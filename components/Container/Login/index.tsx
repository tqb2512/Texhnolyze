"use client"
import { signIn } from "next-auth/react";
import {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import Link from "next/link";

export default function LoginContainer() {

    const router = useRouter();
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<string>("");

    const handleLogin = async () => {
        const response = await signIn("credentials", {
            username,
            password,
            redirect: false
        });

        if (response && response.error) {
            setError(response.error);
        } else {
            router.push("/");
        }
    }

    return (
        <div className="w-full max-w-[75%] mx-auto flex justify-center items-center h-screen">
            <div className="w-[400px] h-[300px] bg-white rounded-md shadow-[0_3px_10px_rgb(0,0,0,0.2)] p-4">
                <div className="h-full flex flex-col justify-center items-center">
                    <h1 className="font-semibold text-2xl">Login</h1>
                    <div className="w-full flex flex-col space-y-4 mt-4">
                        <input className="rounded-md bg-blue-light-bg p-2" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)}/>
                        <input className="rounded-md bg-blue-light-bg p-2" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                        {error && <p className="text-red-500">{error}</p>}
                        <button
                            onClick={handleLogin}
                            className="rounded-md bg-blue-500 text-white p-2">Login</button>
                        <Link href="/signup" className="text-blue-500">Don&apos;t have account?</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}