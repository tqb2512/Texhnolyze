import { prisma } from "../base";
import { NextResponse } from "next/server";

export async function GET(req: Request) {

    const urlParams = new URLSearchParams(req.url.split("?")[1]);
    const code = urlParams.get("code") || "";

    const voucher = await prisma.voucher.findFirst({
        where: {
            code: code ? code : undefined
        }
    })

    return NextResponse.json(voucher);
}