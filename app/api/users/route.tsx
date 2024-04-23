import { prisma } from "../base";
import { NextResponse } from "next/server";

export async function GET(req: Request) {

    const urlParams = new URLSearchParams(req.url.split("?")[1]);
    const user_id = urlParams.get("user_id") || "";

    const user = await prisma.user.findUnique({
        where: {
            id: user_id ? user_id : undefined
        }
    })

    return NextResponse.json(user);
}

export async function PATCH(req: Request) {

    const { ...data } = await req.json();

    const user = await prisma.user.update({
        where: {
            id: data.id
        },
        data: {
            fullname: data.fullname,
            email: data.email,
            phoneNumber: data.phoneNumber,
            dateOfBirth: data.dateOfBirth,
            address: data.address,
            username: data.username,
            password: data.password,
            role: data.role
        }
    })

    return NextResponse.json(user);
}
