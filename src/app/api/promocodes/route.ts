import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    const promocodes = await prisma.promoCode.findMany({
      orderBy: { createdAt: "desc" }
    })
    
    const now = new Date()
    const expiredIds = promocodes
      .filter(p => p.isActive && p.expiresAt && now > p.expiresAt)
      .map(p => p.id)
    
    if (expiredIds.length > 0) {
      await prisma.promoCode.updateMany({
        where: { id: { in: expiredIds } },
        data: { isActive: false }
      })
      
      const updated = await prisma.promoCode.findMany({
        orderBy: { createdAt: "desc" }
      })
      return NextResponse.json(updated)
    }
    
    return NextResponse.json(promocodes)
  } catch (error: any) {
    console.error("Fetch promocodes error:", error)
    return NextResponse.json({ error: error.message || "Failed to fetch promocodes" }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await req.json()
    const { code, description, discount, type, productIds, isActive, expiresAt } = body

    const promocode = await prisma.promoCode.create({
      data: {
        code: code.toUpperCase(),
        description,
        discount: parseInt(discount),
        type: type || "all",
        productIds: productIds || [],
        isActive: isActive !== undefined ? isActive : true,
        expiresAt: expiresAt ? new Date(expiresAt) : null
      }
    })

    return NextResponse.json(promocode)
  } catch (error: any) {
    console.error("Promocode creation error:", error)
    return NextResponse.json({ error: error.message || "Failed to create promocode" }, { status: 500 })
  }
}
