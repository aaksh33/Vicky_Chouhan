import { Metadata } from 'next';
import WishlistPageClient from '@/components/Pages/WishlistPageClient';

export const metadata: Metadata = {
  title: 'My Wishlist - Premium Menswear',
  description: 'View and manage your saved favorite electronics and tech products. Keep track of items you want to buy later from Premium Menswear.',
  keywords: ['wishlist', 'favorites', 'saved items', 'electronics wishlist', 'tech products'],
  robots: {
    index: false,
    follow: false,
  },
};

export default function WishlistPage() {
  return <WishlistPageClient />;
}