"use client";
import { signOut, useSession } from "next-auth/react"
import * as ordersAPI from "@/libs/features/apiSlices/orders";
import * as usersAPI from "@/libs/features/apiSlices/users";
import { skipToken } from "@reduxjs/toolkit/query";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const section = [
    { name: "orders", label: "Orders" },
    { name: "user", label: "User Information" },
    { name: "address", label: "Address Book" },
    { name: "logout", label: "Logout" }
]

export default function UserContainer() {

    const router = useRouter();
    const { data: session } = useSession();
    const { data: user } = usersAPI.useGetUserQuery(session?.user?.id as string || skipToken);
    const { data: orders } = ordersAPI.useGetOrdersByUserQuery(session?.user?.id as string || skipToken);
    const [selectedSection, setSelectedSection] = useState<string>("orders");
    const [copyUser, setCopyUser] = useState(user);

    useEffect(() => {
        setCopyUser(user);
    }, [user])

    const renderSection = () => {
        switch (selectedSection) {
            case "orders":
                return (
                    <div className="w-full">
                        <h1 className="font-semibold text-2xl">Orders</h1>
                        <div className="mt-4 w-full flex flex-col space-y-4">
                            {orders?.map((order, index) => (
                                <Link href={`/order/${order.id}`} key={index} className="w-full bg-blue-light-bg rounded-md p-4 flex flex-col space-y-2">
                                    <h1 className="font-semibold">Order ID: {order.id}</h1>
                                    <div className="flex justify-between">
                                        <h1 className="font-semibold">Total</h1>
                                        <h1 className="font-semibold text-red-500">{order.total.toLocaleString()}</h1>
                                    </div>
                                    <div className="flex justify-between">
                                        <h1 className="font-semibold">Status</h1>
                                        <h1 className="font-semibold">{order.status}</h1>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                )
            case "user":
                return (
                    <div className="w-full">
                        <div className="flex justify-between">
                            <h1 className="font-semibold text-2xl">User Information</h1>
                            
                        </div>
                        <div className="mt-4 w-full bg-blue-light-bg rounded-md p-4">
                            <h1 className="font-semibold">Fullname</h1>
                            <h1>{copyUser?.fullname}</h1>
                            <h1 className="font-semibold">Email</h1>
                            <h1>{copyUser?.email}</h1>
                            <h1 className="font-semibold">Phone</h1>
                            <h1>{copyUser?.phoneNumber}</h1>
                            <h1 className="font-semibold">Date of Birth</h1>
                            <h1>{new Date(copyUser?.dateOfBirth || '1970-01-01').toLocaleDateString()}</h1>
                        </div>
                    </div>
                )
            case "address":
                return (
                    <div className="w-full">
                        <h1 className="font-semibold text-2xl">Address Book</h1>
                        {user?.address.map((address, index) => (
                            <div key={index} className="mt-4 w-full bg-blue-light-bg rounded-md p-4">
                                <h1 className="font-semibold">Address {index + 1}</h1>
                                <h1>{address.value}</h1>
                            </div>
                        ))}
                    </div>
                )
            case "logout":
                return (
                    <div className="w-full">
                        <h1 className="font-semibold text-2xl">Logout</h1>
                        <div className="mt-4 w-full bg-white rounded-md p-4">
                            <button onClick={() => {
                                signOut();
                            }} className="bg-red-500 text-white rounded-md p-2">Logout</button>
                        </div>
                    </div>
                )
            default:
                break;
        }
    }

    return (
        <div className="mt-8 w-full max-w-[75%] mx-auto">
            <div className="flex w-full space-x-4 mt-4">
                <div className="w-[75%] flex flex-col space-y-4">
                    <div className="w-full rounded-md bg-white flex justify-between space-x-2 p-4">
                        {renderSection()}
                    </div>
                </div>
                <div className="w-[25%] flex flex-col space-y-4 sticky top-24 h-max">
                    <div className="w-full bg-white rounded-md p-4">
                        <h1 className="font-semibold text-2xl">{user?.fullname}</h1>
                    </div>
                    <div className="w-full bg-white rounded-md p-4 flex flex-col space-y-2">
                        {section.map((item, index) => (
                            <div key={index} className={`flex rounded-lg justify-between items-center p-4 cursor-pointer hover:bg-blue-light-bg border-2 ${selectedSection === item.name ? "border-blue-500" : "border-blue-light-bg"}`} onClick={() => setSelectedSection(item.name)}>
                                <h1>{item.label}</h1>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
