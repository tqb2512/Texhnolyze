"use client"
import { useEffect, useState } from "react";
import { RootState } from "@/libs/store";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { useSession } from "next-auth/react";
import * as cartSlice from "@/libs/features/slices/cart";
import * as usersAPI from "@/libs/features/apiSlices/users";
import * as inventoriesAPI from "@/libs/features/apiSlices/inventories";
import { skipToken } from "@reduxjs/toolkit/query";
import { order, voucher } from "@prisma/client";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function CheckoutContainer() {

    const router = useRouter();
    const dispatch = useDispatch();
    const { data: session } = useSession();
    const { data: userState } = usersAPI.useGetUserQuery(session?.user?.id as string || skipToken);
    const { data: inventories } = inventoriesAPI.useGetInventoriesQuery();
    const [order, setOrder] = useState<order>({
        shippingMethod: "At Shop",
        shippingAddress: "",
    } as order);
    const [voucher, setVoucher] = useState<voucher>({} as voucher);
    const [voucherApplyError, setVoucherApplyError] = useState<string>("");
    const cart = useSelector((state: RootState) => state.cart);

    useEffect(() => {
        if (session && userState && cart) {
            let subTotal = 0;
            cart.forEach(cartItem => {
                subTotal += cartItem.product.price * cartItem.quantity;
            });
            setOrder((prev) => {
                return { ...prev, total: subTotal, subTotal: subTotal, user: userState.id }
            })
        }
    }, [session, userState, cart])

    const handleUseVoucher = () => {
        fetch(`/api/vouchers?code=${voucher?.code}`)
            .then(res => res.json())
            .then(data => {
                if (data) {
                    if (!handleCheckVoucher(data)) return;
                    setVoucherApplyError("");
                    setVoucher(data);
                    setOrder((prev) => {
                        return { ...prev, voucher: data.id }
                    })
                } else {
                    setVoucherApplyError("Voucher not found");
                }
            })
    }

    const handleCheckVoucher = (voucher: voucher) => {

        if (!voucher.applyAllUser) {
            const index = voucher.userApply.findIndex(user => user === userState?.id);
            if (index === -1) {
                setVoucherApplyError("Voucher not apply for you");
                return false;
            }
        }

        if (!voucher.applyAllItem) {
            const index = cart.findIndex(cartItem => voucher.itemsApply.includes(cartItem.product.id));
            if (index === -1) {
                setVoucherApplyError("Items in cart not apply for this voucher");
                return false;
            }
        }

        return true;
    }

    useEffect(() => {
        if (order.voucher) {
            if (!voucher.applyAllItem) {
                const index = cart.findIndex(cartItem => voucher.itemsApply?.includes(cartItem.product.id));
                if (voucher.type === "percent") {
                    let discount = cart[index].product.price * voucher.value / 100;
                    if (discount > voucher.maxValueInFinalPrice) {
                        discount = voucher.maxValueInFinalPrice;
                    }
                    setOrder((prev) => {
                        return { ...prev, total: prev.total - discount }
                    })
                } else {
                    let discount = voucher.value;
                    setOrder((prev) => {
                        return { ...prev, total: prev.total - discount }
                    })
                }
            }
        }
    }, [cart, order.voucher, voucher.applyAllItem, voucher.itemsApply, voucher.maxValueInFinalPrice, voucher.type, voucher.value])

    const handlePlaceOrder = () => {
        fetch("/api/orders", {
            method: "POST",
            body: JSON.stringify({
                user_id: userState?.id,
                productList: cart.map(cartItem => {
                    return {
                        product: cartItem.product.id,
                        quantity: cartItem.quantity
                    }
                }),
                voucher: order.voucher || "",
                status: "pending",
                total: order.total,
                subtotal: order.subTotal,
                shippingAddress: order.shippingAddress,
                shippingMethod: order.shippingMethod
            })
        })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    alert("Order placed successfully");
                    dispatch(cartSlice.clearCart());
                    router.push("/user");
                } else {
                    alert("Order placed failed");
                    router.push("/");

                }
            })
    }

    return (
        <div className="mt-8 w-full max-w-[75%] mx-auto">
            <div className="flex w-full space-x-4 mt-4">
                <div className="w-[65%] flex flex-col space-y-4">
                    <div className="w-full h-full rounded-md bg-white flex justify-between space-x-2 p-4">
                        <div className="w-full">
                            <h1 className="font-semibold text-lg">Shipping Method</h1>
                            <div className="flex space-x-10 mt-2 p-2">
                                <div className="space-x-2">
                                    <input onChange={() => setOrder((prev) => {
                                        return { ...prev, shippingMethod: "At Shop" }
                                    })} type="radio" name="shipping" id="At Shop" checked={order.shippingMethod === "At Shop"} />
                                    <label htmlFor="AtShop">At Shop</label>
                                </div>
                                <div className="space-x-2">
                                    <input onChange={() => setOrder((prev) => {
                                        return { ...prev, shippingMethod: "Home Delivery" }
                                    })} type="radio" name="shipping" id="Home Delivery" />
                                    <label htmlFor="HomeDelivery">Home Delivery</label>
                                </div>
                            </div>
                            <hr className="mt-2" />


                            {order.shippingMethod === "At Shop" &&
                                <div className="mt-4">
                                    <h1 className="font-semibold text-lg">Select shop to pickup</h1>
                                    <div className="grid grid-cols-2 gap-4 mt-4">
                                        {inventories?.map((inventory, index) => (
                                            <div key={index} className="flex space-x-4 items-center rounded-lg bg-blue-light-bg p-2">
                                                <input onChange={() => setOrder((prev) => {
                                                    return { ...prev, shippingAddress: inventory.address }
                                                })} type="radio" name="inventory" id={inventory.id} />
                                                <label htmlFor={inventory.id}>
                                                    <h1 className="font-semibold">{inventory.name}</h1>
                                                    <h1>{inventory.address}</h1>
                                                </label>
                                            </div>
                                        ))}
                                    </div>
                                    <hr className="mt-4" />
                                </div>}


                            {order.shippingMethod === "Home Delivery" &&
                                <div className="mt-4">
                                    <h1 className="font-semibold text-lg mt-4">Select address</h1>
                                    <div className="grid grid-cols-2 gap-4 mt-4">
                                        {userState?.address?.map((address, index) => (
                                            <div key={index} className="flex space-x-4 items-center rounded-lg bg-blue-light-bg p-2">
                                                <input onChange={() => setOrder((prev) => {
                                                    return { ...prev, shippingAddress: address.value }
                                                })} type="radio" name="address" id={address.value} />
                                                <label htmlFor={address.value}>
                                                    <h1 className="font-semibold">{address.name}</h1>
                                                    <h1>{address.value}</h1>
                                                </label>
                                            </div>
                                        ))}
                                    </div>
                                    <hr className="mt-4" />
                                </div>
                            }

                            <div className="mt-4">
                                <h1 className="font-semibold text-lg">Customer Information</h1>
                                <div className="grid grid-cols-2 gap-4 mt-4">
                                    <div className="rounded-md bg-blue-light-bg p-2">
                                        <h1 className="font-semibold">Name</h1>
                                        <h1>{userState?.fullname}</h1>
                                    </div>
                                    <div className="rounded-md bg-blue-light-bg p-2">
                                        <h1 className="font-semibold">Phone</h1>
                                        <h1>{userState?.phoneNumber}</h1>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="w-[35%] flex flex-col space-y-4 sticky top-24 h-max">
                    <div className="w-full bg-white rounded-md p-4">
                        <h1 className="font-semibold text-2xl">Voucher</h1>

                        <div className="mt-4">
                            {order.voucher ?
                                <div>
                                    <div className="flex justify-between">
                                        <h1 className="font-semibold">{voucher.code}</h1>
                                        <h1>{voucher.description}</h1>
                                    </div>
                                    <button onClick={() => {
                                        setVoucher({} as voucher)
                                        setOrder((prev) => {
                                            return { ...prev, voucher: "", total: prev.subTotal }
                                        })
                                    }} className="rounded-md bg-blue-light-bg w-full h-12 flex items-center justify-center mt-4 font-bold text-lg">Remove</button>
                                </div> :
                                <div>
                                    {voucherApplyError && <h1 className="text-red-500 mb-2">{voucherApplyError}</h1>}
                                    <input type="text" placeholder="Enter voucher code" className="w-full h-10 border border-gray-300 rounded-md p-2" onChange={(e) => setVoucher((prev) => { return { ...prev, code: e.target.value } })} />
                                    <button onClick={handleUseVoucher} className="rounded-md bg-blue-light-bg w-full h-12 flex items-center justify-center mt-4 font-bold text-lg">Use Voucher</button>
                                </div>}
                        </div>

                    </div>

                    <div className="w-full bg-white rounded-md p-4">
                        <h1 className="font-semibold text-2xl">Summary</h1>
                        <div className="flex justify-between mt-4">
                            <h1>Total</h1>
                            <h1>{order.total?.toLocaleString()}</h1>
                        </div>
                        {order.voucher && <div className="flex justify-between mt-4">
                            <h1>Voucher</h1>
                            <h1>- {(order.subTotal - order.total).toLocaleString()}</h1>
                        </div>}
                        <hr className="mt-4" />
                        <div className="mt-2">
                            <span className="font-semibold">Subtotal</span>
                            <h1 className="float-right text-lg text-red-500 font-semibold">{order.total?.toLocaleString()}</h1>
                        </div>
                        <button
                            onClick={handlePlaceOrder}
                            className="rounded-md bg-red-500 w-full h-12 flex items-center justify-center mt-4 text-white font-bold text-lg">
                            Place Order
                        </button>
                    </div>

                    <div className="w-full bg-white rounded-md p-4">
                        <h1 className="font-semibold text-2xl">Products in order</h1>
                        <hr className="mt-4" />
                        <div className="space-y-4 mt-4">
                            {cart.map((cartItem, index) => (
                                <div key={index} className="flex space-x-4">
                                    <div className="w-16 h-16 bg-white rounded-md relative overflow-hidden">
                                        <Image src={cartItem.product.previewImage} alt={"product image"} fill sizes="64px" className="object-cover" />
                                    </div>
                                    <div className="flex flex-col justify-between">
                                        <Link href={`/product/${cartItem.product.id}`} className="font-semibold">{cartItem.product.name}</Link>
                                        <h1 className="text-red-500">{cartItem.quantity} x {cartItem.product.price.toLocaleString()}</h1>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}