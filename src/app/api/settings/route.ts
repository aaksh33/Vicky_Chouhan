import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

function extractPublicId(url: string): string | null {
  const match = url.match(/\/upload\/(?:v\d+\/)?(.*?)(?:\.[^.]+)?$/)
  return match ? match[1] : null
}

async function deleteFromCloudinary(url: string) {
  try {
    const publicId = extractPublicId(url)
    if (publicId) {
      await cloudinary.uploader.destroy(publicId)
    }
  } catch (error) {
    console.error('Failed to delete from Cloudinary:', error)
  }
}

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
    
    // Get existing settings to delete old images
    const existingSetting = await prisma.setting.findUnique({ where: { tag } })
    
    // Handle slider images deletion
    if (tag === 'slider' && existingSetting?.data) {
      const oldSlides = existingSetting.data as any[]
      const newSlides = data as any[]
      
      for (const oldSlide of oldSlides) {
        const newSlide = newSlides.find((s: any) => s.id === oldSlide.id)
        if (newSlide && newSlide.image !== oldSlide.image && oldSlide.image) {
          await deleteFromCloudinary(oldSlide.image)
        }
      }
      
      // Delete images from removed slides
      const removedSlides = oldSlides.filter((old: any) => !newSlides.find((n: any) => n.id === old.id))
      for (const slide of removedSlides) {
        if (slide.image) await deleteFromCloudinary(slide.image)
      }
    }
    
    // Handle category sections images deletion
    if (tag === 'categorySections' && existingSetting?.data) {
      const oldSections = existingSetting.data as any[]
      const newSections = data as any[]
      
      for (const oldSection of oldSections) {
        const newSection = newSections.find((s: any) => s.id === oldSection.id)
        
        if (newSection) {
          // Check for updated/removed category images
          for (const oldCat of oldSection.categories || []) {
            const newCat = newSection.categories?.find((c: any) => c.slug === oldCat.slug)
            if (newCat && newCat.image !== oldCat.image && oldCat.image) {
              await deleteFromCloudinary(oldCat.image)
            } else if (!newCat && oldCat.image) {
              await deleteFromCloudinary(oldCat.image)
            }
          }
        } else {
          // Section removed, delete all its images
          for (const cat of oldSection.categories || []) {
            if (cat.image) await deleteFromCloudinary(cat.image)
          }
        }
      }
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
