import { prisma } from "@/app/api/base";
import {NextResponse} from "next/server";

export async function GET(req: Request) {
    const category_id = req.url.split("/").pop() || "";

    const category = await prisma.category.findUnique({
        where: {
            id: category_id
        }
    })

    return NextResponse.json(category)
}