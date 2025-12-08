import { Metadata } from 'next'

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') || 'https://futureofgadgets.in'
    const res = await fetch(`${baseUrl}/api/products`, { cache: 'no-store' })
    const products = await res.json()
    
    const product = products.find((p: any) => 
      p.slug === slug || 
      p.id === slug ||
      p.name.toLowerCase().replace(/\s+/g, '-') === slug
    )
    
    if (product) {
      const imageUrl = product.frontImage || product.image || product.coverImage
      const fullImageUrl = imageUrl?.startsWith('http') ? imageUrl : `${baseUrl}${imageUrl || '/logo.png'}`
      const description = product.description?.substring(0, 160) || `Buy ${product.name} at best price. High-quality electronics and gadgets.`
      
      return {
        title: product.name,
        description,
        openGraph: {
          title: product.name,
          description,
          images: [{
            url: fullImageUrl,
            width: 1200,
            height: 630,
            alt: product.name,
          }],
          url: `${baseUrl}/products/${slug}`,
          type: 'website',
          siteName: 'Future of Gadgets',
        },
        twitter: {
          card: 'summary_large_image',
          title: product.name,
          description,
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
