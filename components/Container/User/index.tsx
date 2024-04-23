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
    const { data: user, refetch: refetchUser } = usersAPI.useGetUserQuery(session?.user?.id as string || skipToken);
    const { data: orders } = ordersAPI.useGetOrdersByUserQuery(session?.user?.id as string || skipToken);
    const [selectedSection, setSelectedSection] = useState<string>("orders");
    const [address, setAddress] = useState<string[]>(["", ""]);
    const [copyUser, setCopyUser] = useState(user as any);
    const [editUser, setEditUser] = useState(user as any);

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
                            <button onClick={() => {
                                document.getElementById("userinfoModal")?.classList.toggle("hidden");
                            }} className="bg-blue-500 text-white rounded-md p-2">Edit</button>
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

                        <div id="userinfoModal" className="hidden fixed z-50 top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
                            <div className="w-[400px] bg-white rounded-md p-4 flex flex-col">
                                <h1 className="font-semibold text-2xl">Edit User Information</h1>
                                <input className="rounded-md bg-blue-light-bg p-2 mt-4" placeholder="Fullname" value={editUser?.fullname} onChange={(e) => setEditUser({ ...editUser, fullname: e.target.value })} />
                                <input className="rounded-md bg-blue-light-bg p-2 mt-4" placeholder="Email" value={editUser?.email} onChange={(e) => setEditUser({ ...editUser, email: e.target.value })} />
                                <input className="rounded-md bg-blue-light-bg p-2 mt-4" placeholder="Phone" value={editUser?.phoneNumber} onChange={(e) => setEditUser({ ...editUser, phoneNumber: e.target.value })} />
                                <input
                                    className="rounded-md bg-blue-light-bg p-2 mt-4"
                                    type="date"
                                    placeholder="Date of Birth"
                                    value={editUser?.dateOfBirth instanceof Date ? editUser?.dateOfBirth.toISOString().split('T')[0] : ""}
                                    onChange={(e) => setEditUser({ ...editUser, dateOfBirth: new Date(e.target.value) })}
                                    onKeyDown={(e) => e.preventDefault()}
                                />
                                <button 
                                    onClick={() => {
                                        fetch("/api/users", {
                                            method: "PATCH",
                                            headers: {
                                                "Content-Type": "application/json",
                                            },
                                            body: JSON.stringify(editUser),
                                        }).then(() => {
                                            document.getElementById("userinfoModal")?.classList.toggle("hidden");
                                            refetchUser();
                                        })
                                    }}
                                    className="bg-blue-500 text-white rounded-md p-2 mt-4">Save</button>
                                <button className="bg-red-500 text-white rounded-md p-2 mt-4" onClick={() => {
                                    document.getElementById("userinfoModal")?.classList.toggle("hidden");
                                }}>Close</button>
                            </div>
                        </div>
                    </div>
                )
            case "address":
                return (
                    <div className="w-full">
                        <div className="flex justify-between">
                            <h1 className="font-semibold text-2xl">Address Book</h1>
                            <button onClick={() => {
                                document.getElementById("addressModal")?.classList.toggle("hidden");
                                setAddress(["", ""]);
                            }} className="bg-blue-500 text-white rounded-md p-2">Add Address</button>
                        </div>
                        {user?.address.map((address, index) => (
                            <div key={index} className="mt-4 w-full bg-blue-light-bg rounded-md p-4">
                                <h1 className="font-semibold">Address {index + 1}</h1>
                                <h1>{address.value}</h1>
                            </div>
                        ))}
                        <div id="addressModal" className="hidden fixed z-50 top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
                            <div className="w-[400px] bg-white rounded-md p-4 flex flex-col">
                                <h1 className="font-semibold text-2xl">Add Address</h1>
                                <input className="rounded-md bg-blue-light-bg p-2 mt-4" placeholder="Address name" value={address[0]} onChange={(e) => setAddress([e.target.value, address[1]])} />
                                <input className="rounded-md bg-blue-light-bg p-2 mt-4" placeholder="Address detail" value={address[1]} onChange={(e) => setAddress([address[0], e.target.value])} />
                                <button 
                                    onClick={
                                        () => {
                                            fetch("/api/users/", {
                                                method: "PATCH",
                                                headers: {
                                                    "Content-Type": "application/json",
                                                },
                                                body: JSON.stringify({ id: user?.id, address: [...copyUser?.address, { name: address[0], value: address[1] }] }),
                                            }).then(() => {
                                                document.getElementById("addressModal")?.classList.toggle("hidden");
                                                refetchUser();
                                            })
                                        }
                                    }
                                    className="bg-blue-500 text-white rounded-md p-2 mt-4">Add</button>
                                <button className="bg-red-500 text-white rounded-md p-2 mt-4" onClick={() => {
                                    document.getElementById("addressModal")?.classList.toggle("hidden");
                                }}>Close</button>
                            </div>
                        </div>
                    </div>
                )
            case "logout":
                return (
                    <div className="w-full">
                        <h1 className="font-semibold text-2xl">Are you sure you want to logout?</h1>
                        <button onClick={() => {
                            signOut();
                            router.push("/");
                        }} className="bg-red-500 text-white rounded-md p-2 mt-4">Logout</button>
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
