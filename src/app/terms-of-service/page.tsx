import React from 'react'
import TermsOfServicePage from '@/components/Pages/Terms&Condition'
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service - Premium Menswear',
  description: 'Read our terms of service to understand the rules and regulations for using Premium Menswear platform.',
  keywords: ['terms of service', 'terms and conditions', 'user agreement', 'legal'],
};


export default function TermsCondition(){
  return (
    <TermsOfServicePage/>
  )
}


