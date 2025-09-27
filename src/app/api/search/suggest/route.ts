import { NextResponse } from "next/server"
import { searchProducts } from "@/lib/data/products"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const q = searchParams.get("q") || ""
  const results = searchProducts(q).slice(0, 8)
  return NextResponse.json({ suggestions: results })
}
