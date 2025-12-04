"use client"
import { useState, useEffect } from "react"
import ProductCard from "@/components/product-card"
import ProductCardSkeleton from "@/components/product-card-skeleton"
import Link from "next/link"
import { ArrowDown, ArrowUp } from "lucide-react"
import { useSearchParams } from "next/navigation"

async function getProducts() {
  try {
    const res = await fetch('/api/products', { cache: 'no-store' });
    return res.ok ? await res.json() : [];
  } catch {
    return [];
  }
}

function ProductGridSkeleton() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-0 sm:gap-6">
      {Array.from({ length: 8 }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  )
}

export default function CatalogPage() {
  const [products, setProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const searchParams = useSearchParams()
  const category = searchParams.get('category')
  const sort = searchParams.get('sort') as "price-asc" | "price-desc" | null
  
  useEffect(() => {
    async function loadProducts() {
      setLoading(true)
      const data = await getProducts()
      setProducts(data)
      setLoading(false)
    }
    loadProducts()
  }, [category, sort])
  
  const categories = Array.from(new Set(products.map((p: any) => p.category))).sort()
  
  let list = [...products].filter((p: any) => p.status === "active")
  if (category) list = list.filter((p: any) => p.category === category)
  if (sort === "price-asc") list.sort((a: any, b: any) => a.price - b.price)
  if (sort === "price-desc") list.sort((a: any, b: any) => b.price - a.price)

  return (
    <main className="mx-auto max-w-7xl px-4 py-8">
      <header className="mb-6">
        <h1 className="text-2xl font-semibold text-foreground text-balance">Catalog</h1>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Browse our selection. Use filters to narrow your search.
        </p>
      </header>

      <div className="mb-6 space-y-4">
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-sm font-medium text-gray-700">Categories:</span>
          <Link href="/catalog" className={`px-3 py-1 rounded-full text-sm transition-colors ${
            !category ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}>
            All
          </Link>
          {categories?.length > 0 && (
            <>
              {categories.slice(0, 3).map((category) => (
                <Link key={category} href={`/catalog?category=${encodeURIComponent(category)}`} className={`px-3 py-1 rounded-full text-sm transition-colors ${
                  searchParams.get('category') === category ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}>
                  {category}
                </Link>
              ))}
              <div className="md:hidden">
                {categories.length > 3 && (
                  <button className="px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-600 hover:bg-gray-200">
                    +{categories.length - 3} more
                  </button>
                )}
              </div>
              <div className="hidden md:flex gap-3">
                {categories.slice(3).map((category) => (
                  <Link key={category} href={`/catalog?category=${encodeURIComponent(category)}`} className={`px-3 py-1 rounded-full text-sm transition-colors ${
                    searchParams.get('category') === category ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}>
                    {category}
                  </Link>
                ))}
              </div>
            </>
          )}          
        </div>
        
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-sm font-medium text-gray-700">Sort:</span>
         
          <Link
            href={`/catalog?${category ? `category=${encodeURIComponent(category)}&` : ""}sort=price-desc`}
            className={`px-3 py-1 rounded-full text-sm transition-colors flex items-center gap-1 ${
              sort === 'price-desc' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
          Price  <ArrowUp className="w-3.5 h-5" />
          </Link>

           <Link
            href={`/catalog?${category ? `category=${encodeURIComponent(category)}&` : ""}sort=price-asc`}
            className={`px-3 py-1 rounded-full text-sm transition-colors flex items-center gap-1 ${
              sort === 'price-asc' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Price<ArrowDown className="w-3.5 h-5" />
          </Link>
        </div>
      </div>
      {loading ? (
        <ProductGridSkeleton />
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-0 sm:gap-6">
          {list.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </main>
  )
}