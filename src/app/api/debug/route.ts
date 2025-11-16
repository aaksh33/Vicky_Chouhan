// DEBUG API ROUTE - FOR TESTING ONLY
// This route should be disabled or removed in production

import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  // Disable in production
  if (process.env.NODE_ENV === 'production') {
    return NextResponse.json({ error: "Debug route disabled in production" }, { status: 403 })
  }

  try {
    const users = await prisma.user.findMany()
    const orders = await prisma.order.findMany()
    
    return NextResponse.json({
      users: users.map(u => ({ id: u.id, email: u.email, name: u.name })),
      orders: orders.map(o => ({ 
        id: o.id, 
        userId: o.userId, 
        total: o.total, 
        status: o.status,
        createdAt: o.createdAt 
      }))
    })
  } catch (error) {
    console.error('Debug error:', error)
    return NextResponse.json({ error: "Debug failed" }, { status: 500 })
  }
}