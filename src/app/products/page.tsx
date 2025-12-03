import React from 'react'
import ProductsPage from '@/components/Pages/ProductPage'
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Products - Future of Gadgets',
  description: 'Discover the latest electronics and tech products. Shop laptops, desktops, monitors, keyboards, headphones and more.',
  keywords: ['electronics', 'products', 'laptops', 'desktops', 'monitors', 'keyboards', 'headphones', 'tech'],
};


export default function page(){
  return (

      <ProductsPage/>

  )
}


