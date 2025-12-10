import { Metadata } from 'next';
import ProfilePageClient from '@/components/Pages/ProfilePageClient';

export const metadata: Metadata = {
  title: 'My Profile - Premium Menswear',
  description: 'Manage your Premium Menswear account profile, update personal information, view order history, and manage your preferences.',
  keywords: ['profile', 'account', 'user profile', 'personal information', 'order history'],
  robots: {
    index: false,
    follow: false,
  },
};

export default function ProfilePage() {
  return <ProfilePageClient />;
}