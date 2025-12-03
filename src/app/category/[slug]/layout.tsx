import { Metadata } from 'next';
import React from 'react'

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const categoryName = slug.charAt(0).toUpperCase() + slug.slice(1);
  
  return {
    title: `${categoryName} - Future of Gadgets`,
    description: `Shop the best ${slug} at Future of Gadgets. Find top quality electronics and tech products with great prices.`,
    keywords: [slug, 'electronics', categoryName.toLowerCase(), 'tech products', 'gadgets'],
  };
}

export default function layout({ children }: { children: React.ReactNode }) {
    return (
        <>
            {children}
        </>
    )
}
