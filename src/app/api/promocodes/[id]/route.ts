import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    await prisma.promoCode.delete({ where: { id: params.id } })
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete promocode" }, { status: 500 })
  }
}

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await req.json()
    const updateData: any = {}
    
    if (body.code) updateData.code = body.code.toUpperCase()
    if (body.description) updateData.description = body.description
    if (body.discount) updateData.discount = parseInt(body.discount)
    if (body.type) updateData.type = body.type
    if (body.productIds !== undefined) updateData.productIds = body.productIds
    if (body.isActive !== undefined) updateData.isActive = body.isActive
    if (body.expiresAt !== undefined) updateData.expiresAt = body.expiresAt ? new Date(body.expiresAt) : null

    const promocode = await prisma.promoCode.update({
      where: { id: params.id },
      data: updateData
    })

    return NextResponse.json(promocode)
  } catch (error: any) {
    console.error("Promocode update error:", error)
    return NextResponse.json({ error: error.message || "Failed to update promocode" }, { status: 500 })
  }
}
