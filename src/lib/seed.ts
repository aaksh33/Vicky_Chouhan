import dbConnect from './db'
import { Product } from './models'

const sampleProducts = [
  {
    name: 'MacBook Pro 14"',
    price: 199900,
    category: 'laptops',
    brand: 'Apple',
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500',
    description: 'Powerful laptop with M3 chip',
    slug: 'macbook-pro-14',
    stock: 10
  },
  {
    name: 'Dell XPS 13',
    price: 89900,
    category: 'laptops',
    brand: 'Dell',
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500',
    description: 'Ultra-portable laptop',
    slug: 'dell-xps-13',
    stock: 15
  },
  {
    name: 'Gaming Desktop PC',
    price: 149900,
    category: 'desktops',
    brand: 'Custom',
    image: 'https://images.unsplash.com/photo-1587831990711-23ca6441447b?w=500',
    description: 'High-performance gaming PC',
    slug: 'gaming-desktop-pc',
    stock: 8
  },
  {
    name: '4K Monitor 27"',
    price: 39900,
    category: 'monitors',
    brand: 'Samsung',
    image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=500',
    description: '4K UHD display monitor',
    slug: '4k-monitor-27',
    stock: 20
  },
  {
    name: 'Mechanical Keyboard',
    price: 12900,
    category: 'keyboards',
    brand: 'Logitech',
    image: 'https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=500',
    description: 'RGB mechanical gaming keyboard',
    slug: 'mechanical-keyboard',
    stock: 25
  },
  {
    name: 'Wireless Headphones',
    price: 29900,
    category: 'headphones',
    brand: 'Sony',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500',
    description: 'Noise-cancelling wireless headphones',
    slug: 'wireless-headphones',
    stock: 30
  }
]

export async function seedDatabase() {
  await dbConnect()
  
  const existingProducts = await Product.countDocuments()
  if (existingProducts === 0) {
    await Product.insertMany(sampleProducts)
    console.log('Database seeded with sample products')
  }
}