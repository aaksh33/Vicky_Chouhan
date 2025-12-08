import { Metadata } from 'next'

type Props = {
  params: { slug: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') || 'http://localhost:3000'
    const res = await fetch(`${baseUrl}/api/products`, { cache: 'no-store' })
    const products = await res.json()
    
    const product = products.find((p: any) => 
      p.slug === slug || 
      p.id === slug ||
      p.name.toLowerCase().replace(/\s+/g, '-') === slug
    )
    
    if (product) {
      const imageUrl = product.frontImage || product.image || product.coverImage || '/placeholder.svg'
      const fullImageUrl = imageUrl.startsWith('http') ? imageUrl : `${baseUrl}${imageUrl}`
      
      return {
        title: `${product.name} - Future of Gadgets`,
        description: product.description || `Buy ${product.name} at best price. High-quality electronics and gadgets.`,
        openGraph: {
          title: product.name,
          description: product.description || `Buy ${product.name} at best price`,
          images: [fullImageUrl],
          url: `${baseUrl}/products/${slug}`,
          type: 'website',
        },
        twitter: {
          card: 'summary_large_image',
          title: product.name,
          description: product.description || `Buy ${product.name} at best price`,
          images: [fullImageUrl],
        },
      }
    }
  } catch (error) {
    console.error('Error generating metadata:', error)
  }
  
  return {
    title: 'Product - Future of Gadgets',
    description: 'Shop quality electronics and gadgets',
  }
}

export default function ProductLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
