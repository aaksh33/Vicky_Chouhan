import { Metadata } from 'next';
import PrivacyPolicyPage from '@/components/Pages/PrivacyPolicyPage'

export const metadata: Metadata = {
  title: 'Privacy Policy - Premium Menswear',
  description: 'Read our privacy policy to understand how Premium Menswear collects, uses, and protects your personal information.',
  keywords: ['privacy policy', 'data protection', 'personal information', 'privacy'],
};


export default function PrivacyPolicy(){
  return (
<PrivacyPolicyPage/>
  )
}


