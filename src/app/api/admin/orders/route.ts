import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session || (session.user?.role !== "admin" && session.user?.email !== "admin@electronic.com")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }
    
    const orders = await prisma.order.findMany({
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
            image: true
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    })
    
    return NextResponse.json({ orders })
  } catch (error: any) {
    console.error('Admin orders fetch error:', error)
    return NextResponse.json({ 
      error: error.message || "Failed to fetch orders",
      details: process.env.NODE_ENV === 'development' ? error.stack : undefined
    }, { status: 500 })
  }
}

export async function PATCH(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session || (session.user?.role !== "admin" && session.user?.email !== "admin@electronic.com")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }
    
    const body = await request.json()
    const { orderId, status, billUrl } = body

    if (!orderId) {
      return NextResponse.json({ error: "Order ID is required" }, { status: 400 })
    }

    const updateData: any = { updatedAt: new Date() }
    if (status) updateData.status = status
    if (billUrl) updateData.billUrl = billUrl

    const order = await prisma.order.update({
      where: { id: orderId },
      data: updateData,
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
            image: true
          }
        }
      }
    })

    return NextResponse.json({ order })
  } catch (error: any) {
    console.error('Order update error:', error)
    return NextResponse.json({ 
      error: error.message || "Failed to update order",
      details: process.env.NODE_ENV === 'development' ? error.stack : undefined
    }, { status: 500 })
  }
}