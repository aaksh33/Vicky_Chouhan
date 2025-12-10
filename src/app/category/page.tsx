import CategoryPage from '@/components/Pages/Category'
import { Metadata } from 'next';
import React from 'react'

export const metadata: Metadata = {
  title: 'Categories - Premium Menswear',
  description: 'Browse electronics by category. Find laptops, desktops, monitors, keyboards, headphones and more tech products.',
  keywords: ['electronics', 'categories', 'laptops', 'desktops', 'monitors', 'keyboards', 'headphones'],
};

export default function Category(){
  return (<CategoryPage/>)
}


