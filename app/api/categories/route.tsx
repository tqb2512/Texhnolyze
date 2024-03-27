import { prisma } from "@/app/api/base";
import {NextResponse} from "next/server";

export async function GET(req: Request) {
    const categories = await prisma.category.findMany()

    return NextResponse.json(categories)
}