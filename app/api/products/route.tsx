import { prisma } from "@/app/api/base";
import {NextResponse} from "next/server";

export async function GET(req: Request) {

    const urlParams = new URLSearchParams(req.url.split("?")[1]);
    const category_id = urlParams.get("category_id") || "";
    const page = urlParams.get("page") || "1";
    const limit = urlParams.get("limit") || "10";
    const offset = (parseInt(page) - 1) * parseInt(limit);

    const products = await prisma.product.findMany({
        where: category_id ? { category: category_id } : undefined,
        take: parseInt(limit),
        skip: offset
    })

    return NextResponse.json(products)
}