import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const settings = await prisma.setting.findMany()
    
    const result = settings.reduce((acc, setting) => {
      acc[setting.tag] = setting.data
      return acc
    }, {} as Record<string, any>)
    
    return NextResponse.json(result)
  } catch (error) {
    console.error('GET /api/settings error:', error)
    return NextResponse.json({ error: 'Failed to fetch settings' }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const { tag, data } = await req.json()
    
    if (!tag || !data) {
      return NextResponse.json({ error: 'Tag and data are required' }, { status: 400 })
    }
    
    const setting = await prisma.setting.upsert({
      where: { tag },
      update: { data },
      create: { tag, data }
    })
    
    return NextResponse.json({ success: true, setting })
  } catch (error) {
    console.error('POST /api/settings error:', error)
    return NextResponse.json({ error: 'Failed to save settings', details: String(error) }, { status: 500 })
  }
}
