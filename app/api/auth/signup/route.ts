import { prisma } from "@/app/api/base";
import {NextResponse} from "next/server";

export async function POST(req: Request){

    const { username, password, email, phoneNumber, dateOfBirth, role, fullname } = await req.json();

    const user = await prisma.user.create({
        data: {
            username,
            password,
            email,
            phoneNumber,
            dateOfBirth,
            role,
            fullname
        }
    })

    return NextResponse.json(user)
}