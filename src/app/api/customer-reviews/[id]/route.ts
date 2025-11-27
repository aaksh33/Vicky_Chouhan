import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { uploadToCloudinary } from '@/lib/cloudinary'
import { v2 as cloudinary } from 'cloudinary'

const prisma = new PrismaClient()

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

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const formData = await request.formData()
    const file = formData.get('image') as File | null
    const customerName = formData.get('customerName') as string
    const message = formData.get('message') as string
    const rating = formData.get('rating') as string
    const ratingCount = formData.get('ratingCount') as string
    
    const existing = await prisma.customerReview.findUnique({ where: { id } })
    if (!existing) {
      return NextResponse.json({ error: 'Review not found' }, { status: 404 })
    }
    
    let imageUrl: string | undefined
    
    if (file) {
      // Delete old image from Cloudinary
      if (existing.imageUrl) {
        await deleteFromCloudinary(existing.imageUrl)
      }
      imageUrl = await uploadToCloudinary(file)
    }
    
    const updateData: any = {
      customerName,
      message,
      rating: Number(rating),
      ratingCount: Number(ratingCount)
    }
    
    if (imageUrl) updateData.imageUrl = imageUrl
    
    const review = await prisma.customerReview.update({
      where: { id },
      data: updateData
    })
    
    return NextResponse.json({ success: true, review })
  } catch (error: any) {
    console.error('Update review error:', error)
    return NextResponse.json({ error: error.message || 'Failed to update' }, { status: 500 })
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const existing = await prisma.customerReview.findUnique({ where: { id } })
    
    if (existing?.imageUrl) {
      await deleteFromCloudinary(existing.imageUrl)
    }
    
    await prisma.customerReview.delete({ where: { id } })
    
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete' }, { status: 500 })
  }
}
