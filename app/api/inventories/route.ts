import { prisma } from '@/app/api/base'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
    const urlParams = new URLSearchParams(req.url.split("?")[1]);
    const inventory_id = urlParams.get("inventory_id") || "";

    const inventory = await prisma.inventory.findMany({
        where: {
            id: inventory_id ? inventory_id : undefined
        }
    })

    return NextResponse.json(inventory);
}