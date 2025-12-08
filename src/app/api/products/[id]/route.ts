// app/api/products/[id]/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

function extractPublicId(url: string): string | null {
  const match = url.match(/\/upload\/(?:v\d+\/)?(.*?)(?:\.[^.]+)?$/);
  return match ? match[1] : null;
}

async function deleteFromCloudinary(url: string) {
  try {
    const publicId = extractPublicId(url);
    if (publicId) {
      await cloudinary.uploader.destroy(publicId);
    }
  } catch (error) {
    console.error('Failed to delete from Cloudinary:', error);
  }
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  try {
    const body = await req.json();

    // validate minimal fields if you want
    if (!body.name || !body.category || typeof body.price === "undefined") {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const existing = await prisma.product.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    // Delete old images from Cloudinary if new ones are provided
    if (body.frontImage && body.frontImage !== existing.frontImage && existing.frontImage) {
      await deleteFromCloudinary(existing.frontImage);
    }
    
    if (body.images && Array.isArray(body.images)) {
      const oldImages = Array.isArray(existing.images) ? existing.images : [];
      const newImages = body.images;
      const imagesToDelete = oldImages.filter((img: string) => !newImages.includes(img));
      
      for (const img of imagesToDelete) {
        await deleteFromCloudinary(img);
      }
    }

    // Use quantity directly from form
    let calculatedQty = Number(body.quantity) || 0;
    console.log('Update - Received quantity:', body.quantity, 'Calculated:', calculatedQty);

    const updateData: any = {
      name: body.name,
      slug: body.slug,
      category: body.category,
      description: body.description ?? "",
      frontImage: body.frontImage ?? "",
      images: Array.isArray(body.images) ? body.images : [],
      price: Number(body.price),
      mrp: Number(body.mrp) || Number(body.price),
      stock: calculatedQty,
      quantity: calculatedQty,
      brand: body.brand ?? "",
      modelName: body.modelName ?? "",
      availableColors: body.availableColors ?? "",
      fabric: body.fabric ?? "",
      fitType: body.fitType ?? "",
      occasion: body.occasion ?? "",
      sizes: body.sizes ?? "",
      boxContents: body.boxContents ?? "",
      status: body.status ?? "active",
      sku: body.sku ?? existing.sku,
      rating: Number(body.rating) || 0,
      ratingCount: Number(body.ratingCount) || 0,
    };

    if (body.ramOptions !== undefined) updateData.ramOptions = body.ramOptions;
    if (body.storageOptions !== undefined) updateData.storageOptions = body.storageOptions;

    const updated = await prisma.product.update({
      where: { id },
      data: updateData,
    });

    return NextResponse.json(updated);
  } catch (err: any) {
    console.error('PUT /api/products/[id] error:', err);
    return NextResponse.json({ error: "Failed to update product", details: err?.message ?? String(err) }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  try {
    const existing = await prisma.product.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    // Delete all images from Cloudinary
    if (existing.frontImage) {
      await deleteFromCloudinary(existing.frontImage);
    }
    if (Array.isArray(existing.images)) {
      for (const img of existing.images) {
        await deleteFromCloudinary(img);
      }
    }

    await prisma.product.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: "Failed to delete product", details: err?.message ?? String(err) }, { status: 500 });
  }
}
