import { prisma } from "../base";
import { NextResponse } from "next/server";

export async function GET(req: Request) {

    const urlParams = new URLSearchParams(req.url.split("?")[1]);
    const order_id = urlParams.get("order_id") || "";
    const user_id = urlParams.get("user_id") || "";

    const order = await prisma.order.findMany({
        where: {
            id: order_id ? order_id : undefined,
            user_id: user_id ? user_id : undefined
        }
    })

    return NextResponse.json(order);
}

export async function POST(req: Request) {
    const { user_id, productList, voucher, status, total, subtotal, shippingAddress, shippingMethod } = await req.json();

    const order = await prisma.order.create({
        data: {
            user_id: user_id,
            productList: productList,
            voucher: voucher,
            status: status,
            total: total,
            subTotal: subtotal,
            shippingAddress: shippingAddress,
            shippingMethod: shippingMethod,
            date: new Date()
        }
    })
    
    if (order) {
        return NextResponse.json({ success: true });
    } else {
        return NextResponse.json({ success: false });
    }
}