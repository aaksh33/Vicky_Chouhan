import { readFile, writeFile } from 'fs/promises'
import { join } from 'path'

const DB_PATH = join(process.cwd(), 'data', 'products.json')

export interface Product {
  id: string
  name: string
  title: string
  slug: string
  category: string
  description: string
  frontImage: string
  images: string[]
  price: number
  quantity: number
  brand?: string
  status: 'active' | 'inactive'
  sku: string
  createdAt: string
  updatedAt: string
}

export async function getProducts(): Promise<Product[]> {
  try {
    const data = await readFile(DB_PATH, 'utf-8')
    return JSON.parse(data)
  } catch {
    return []
  }
}

export async function saveProducts(products: Product[]): Promise<void> {
  await writeFile(DB_PATH, JSON.stringify(products, null, 2))
}

export async function addProduct(product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>): Promise<Product> {
  const products = await getProducts()
  const newProduct: Product = {
    ...product,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
  products.push(newProduct)
  await saveProducts(products)
  return newProduct
}

export async function updateProduct(id: string, updates: Partial<Product>): Promise<Product | null> {
  const products = await getProducts()
  const index = products.findIndex(p => p.id === id)
  if (index === -1) return null
  
  products[index] = { ...products[index], ...updates, updatedAt: new Date().toISOString() }
  await saveProducts(products)
  return products[index]
}

export async function deleteProduct(id: string): Promise<boolean> {
  const products = await getProducts()
  const filtered = products.filter(p => p.id !== id)
  if (filtered.length === products.length) return false
  
  await saveProducts(filtered)
  return true
}