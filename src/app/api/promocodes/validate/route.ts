import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function POST(req: Request) {
  try {
    const { code, cartItems } = await req.json()

    const promocode = await prisma.promoCode.findUnique({
      where: { code: code.toUpperCase() }
    })

    if (!promocode) {
      return NextResponse.json({ error: "Invalid promo code" }, { status: 404 })
    }

    if (!promocode.isActive) {
      return NextResponse.json({ error: "Promo code is inactive" }, { status: 400 })
    }

    if (promocode.expiresAt && new Date() > promocode.expiresAt) {
      await prisma.promoCode.update({
        where: { id: promocode.id },
        data: { isActive: false }
      })
      return NextResponse.json({ error: "Promo code has expired" }, { status: 400 })
    }

    let applicableItems = cartItems
    if (promocode.type === "product" && promocode.productIds.length > 0) {
      applicableItems = cartItems.filter((item: any) => 
        promocode.productIds.includes(item.id)
      )
      if (applicableItems.length === 0) {
        return NextResponse.json({ error: "Promo code not applicable to cart items" }, { status: 400 })
      }
    }

    const subtotal = applicableItems.reduce((sum: number, item: any) => 
      sum + (item.price * (item.qty || 1)), 0
    )
    const discount = Math.floor((subtotal * promocode.discount) / 100)

    return NextResponse.json({
      valid: true,
      discount,
      description: promocode.description,
      type: promocode.type
    })
  } catch (error) {
    return NextResponse.json({ error: "Failed to validate promo code" }, { status: 500 })
  }
}
