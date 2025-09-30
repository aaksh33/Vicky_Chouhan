import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

// Mock address storage since it's not in the User model
const userAddresses = new Map<string, string>()

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: { phone: true }
    })
    
    return NextResponse.json({
      phone: user?.phone || '',
      address: userAddresses.get(session.user.email) || ''
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

    let updatedPhone = ''
    
    if (phone !== undefined) {
      const updatedUser = await prisma.user.update({
        where: { email: session.user.email },
        data: { phone },
        select: { phone: true }
      })
      updatedPhone = updatedUser.phone || ''
    }
    
    if (address !== undefined) {
      userAddresses.set(session.user.email, address)
    }
    
    return NextResponse.json({
      phone: updatedPhone || (await prisma.user.findUnique({ where: { email: session.user.email }, select: { phone: true } }))?.phone || '',
      address: userAddresses.get(session.user.email) || ''
    })
  } catch (error) {
    console.error('Profile PATCH error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}