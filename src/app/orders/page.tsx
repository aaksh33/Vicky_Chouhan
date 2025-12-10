import { Metadata } from 'next';
import OrdersPageClient from '@/components/Pages/OrdersPageClient';

export const metadata: Metadata = {
  title: 'My Orders - Premium Menswear',
  description: 'Track and manage your orders from Premium Menswear. View order history, track shipments, and manage returns.',
  keywords: ['orders', 'order tracking', 'order history', 'shipment tracking', 'returns'],
  robots: {
    index: false,
    follow: false,
  },
};

export default function OrdersPage() {
  return <OrdersPageClient />;
}