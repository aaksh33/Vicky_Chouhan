import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const user = await prisma.user.findFirst({
      where: { email: session.user.email },
      select: { phone: true, address: true, createdAt: true }
    })
    
    return NextResponse.json({
      phone: user?.phone || '',
      address: user?.address || null,
      createdAt: user?.createdAt
    })
  } catch (error) {
    console.error('Profile GET error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { phone, address } = body

    const user = await prisma.user.findFirst({ where: { email: session.user.email }, select: { id: true } })
    if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 })
    
    const updateData: any = {}
    if (phone !== undefined) updateData.phone = phone
    if (address !== undefined) {
      const { line1, line2, city, state, zip } = address
      updateData.address = { set: { line1, line2, city, state, zip } }
    }
    
    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: updateData,
      select: { phone: true, address: true }
    })
    
    return NextResponse.json({
      phone: updatedUser.phone || '',
      address: updatedUser.address || null
    })
  } catch (error) {
    console.error('Profile PATCH error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}