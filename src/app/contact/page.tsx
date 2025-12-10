import { Metadata } from 'next';
import ContactPageClient from '@/components/Pages/ContactPageClient';

export const metadata: Metadata = {
  title: 'Contact Us - Premium Menswear',
  description: 'Get in touch with Premium Menswear for support, inquiries, and assistance. We offer order support, returns, tech support, and live chat. Contact us via email, phone, or visit our store.',
  keywords: ['contact', 'support', 'customer service', 'help', 'electronics support', 'tech support', 'returns', 'order tracking'],
};

export default function ContactPage() {
  return <ContactPageClient />;
}