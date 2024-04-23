"use client"
import { user } from "@prisma/client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignupContainer() {

    const router = useRouter();
    const [user, setUser] = useState<user>({ role: "user" } as user);

    const handleSignup = async () => {
        await fetch("/api/auth/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
        }).then((res) => {
            if (res.status === 200) {
                router.push("/login");
            }
        });
    }

    return (
        <div className="w-full max-w-[75%] mx-auto flex justify-center items-center h-screen">
            <div className="w-[400px] h-[500px] bg-white rounded-md shadow-[0_3px_10px_rgb(0,0,0,0.2)] p-4">
                <div className="h-full flex flex-col justify-center items-center">
                    <h1 className="font-semibold text-2xl">Signup</h1>
                    <div className="w-full flex flex-col space-y-4 mt-4">
                        <input className="rounded-md bg-blue-light-bg p-2" placeholder="Username" value={user.username} onChange={(e) => setUser({ ...user, username: e.target.value })} />
                        <input className="rounded-md bg-blue-light-bg p-2" placeholder="Password" value={user.password} onChange={(e) => setUser({ ...user, password: e.target.value })} />
                        <input className="rounded-md bg-blue-light-bg p-2" placeholder="Fullname" value={user.fullname} onChange={(e) => setUser({ ...user, fullname: e.target.value })} />
                        <input className="rounded-md bg-blue-light-bg p-2" placeholder="Email" value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })} />
                        <input className="rounded-md bg-blue-light-bg p-2" placeholder="Phone" value={user.phoneNumber} onChange={(e) => setUser({ ...user, phoneNumber: e.target.value })} />
                        <input
                            className="rounded-md bg-blue-light-bg p-2"
                            type="date"
                            placeholder="Date of Birth"
                            value={user.dateOfBirth instanceof Date ? user.dateOfBirth.toISOString().split('T')[0] : ""}
                            onChange={(e) => setUser({ ...user, dateOfBirth: new Date(e.target.value) })}
                            onKeyDown={(e) => e.preventDefault()}
                        />

                        <button
                            onClick={handleSignup}
                            className="rounded-md bg-blue-500 text-white p-2">Signup</button>
                        <Link href="/login" className="text-blue-500">Already have account?</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}