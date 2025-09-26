export type Product = {
  id: string
  slug: string
  name: string
  sku: string
  description: string
  price: number
  mrp?: number
  quantity: number
  status: "active" | "draft" | "archived"
  category: string
  brand?: string
  rating?: number
  image: string
  updatedAt: string
}

export type Address = {
  fullName: string
  street: string
  city: string
  province: string
  postalCode: string
  country: string
  phone: string
}

export type PaymentMethod = "cod" | "paypal" | "stripe"

export type OrderItem = {
  productId: string
  title: string
  price: number
  qty: number
  image: string
}

export type Order = {
  id: string
  createdAt: string
  items: OrderItem[]
  total: number
  status: "pending" | "paid" | "shipped" | "delivered"
  address: Address
  paymentMethod: PaymentMethod
  deliveryDate: string
  userEmail?: string
}
