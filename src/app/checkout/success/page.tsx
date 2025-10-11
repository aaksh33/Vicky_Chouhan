'use client'

import Link from 'next/link'
import { CheckCircle, Package, Mail, Phone, MessageCircle, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useEffect, useState } from 'react';

export default function CheckoutSuccessPage() {


 const [contactSettings, setContactSettings] = useState({
      email: '',
      phone: '',
      address: '',
      hours: ''
    });

  const [loading, setLoading] = useState(true);

    useEffect(() => {
      fetch('/api/settings')
        .then(res => res.json())
        .then(data => {
          if (data.contact) setContactSettings(data.contact)
        })
        .catch(() => {})
        .finally(() => setLoading(false))
    }, []);


  return (
    <div className="min-h-screen bg-gray-50">
      <main className="mx-auto max-w-4xl px-4 py-16">
        {/* Success Message */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-6">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Order Placed Successfully! 🎉</h1>
          <p className="text-lg text-gray-600 mb-2">
            Thank you for your purchase. Your order has been confirmed and is being processed.
          </p>
          <p className="text-sm text-gray-500">
            You will receive an email confirmation shortly with your order details.
          </p>
        </div>

        {/* Action Cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {/* Track Orders */}
          <div className="bg-white rounded-lg p-6 shadow-sm border">
            <div className="flex items-center gap-3 mb-4">
              <Package className="w-6 h-6 text-blue-600" />
              <h3 className="text-lg font-semibold text-gray-900">Track Your Orders</h3>
            </div>
            <p className="text-gray-600 mb-4">
              Monitor your order status and delivery updates in real-time.
            </p>
            <Link href="/orders">
              <Button className="w-full flex items-center justify-center gap-2 cursor-pointer">
                View Orders <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>

          {/* Continue Shopping */}
          <div className="bg-white rounded-lg p-6 shadow-sm border">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-6 h-6 text-green-600">🛍️</div>
              <h3 className="text-lg font-semibold text-gray-900">Continue Shopping</h3>
            </div>
            <p className="text-gray-600 mb-4">
              Explore more products and discover great deals on electronics.
            </p>
            <Link href="/">
              <Button variant="outline" className="w-full flex items-center justify-center gap-2 cursor-pointer">
                Shop More <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Support Section */}
        <div className="bg-white rounded-lg p-8 shadow-sm border">
          <h2 className="text-xl font-semibold text-gray-900 mb-6 text-center">
            Need Help? We&apos;re Here for You
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            {/* Product Updates */}
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mb-4">
                <Package className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-medium text-gray-900 mb-2">Product Updates</h3>
              <p className="text-sm text-gray-600 mb-4">
                Questions about your order or need to make changes?
              </p>
              <Link href="/contact">
                <Button variant="outline" size="sm" className="text-blue-600 border-blue-200 hover:bg-blue-50 hover:text-blue-700 cursor-pointer">
                  Contact Support
                </Button>
              </Link>
            </div>

            {/* Refunds */}
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mb-4">
                <div className="w-6 h-6 text-green-600">💰</div>
              </div>
              <h3 className="font-medium text-gray-900 mb-2">Returns & Refunds</h3>
              <p className="text-sm text-gray-600 mb-4">
                Easy returns within 7 days. Get full refund or exchange.
              </p>
              <Link href="/contact">
                <Button variant="outline" size="sm" className="text-green-600 border-green-200 hover:bg-green-50 hover:text-green-700 cursor-pointer">
                  Return Policy
                </Button>
              </Link>
            </div>

            {/* Contact */}
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-100 rounded-full mb-4">
                <MessageCircle className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="font-medium text-gray-900 mb-2">24/7 Support</h3>
              <p className="text-sm text-gray-600 mb-4">
                Get instant help via chat, email, or phone support.
              </p>
              <Link href="/contact">
                <Button variant="outline" size="sm" className="text-purple-600 border-purple-200 hover:bg-purple-50 hover:text-purple-700 cursor-pointer">
                  Get Help
                </Button>
              </Link>
            </div>
          </div>

          {/* Contact Methods */}
          {loading ?
          ( <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <div className="h-5 bg-gray-200 rounded w-30 animate-pulse" />
              </div>
              <div className="flex items-center gap-1">
                <Phone className="w-4 h-4" />
                <div className="h-5 bg-gray-200 rounded w-20 animate-pulse" />
              </div>
              <div className="flex items-center gap-1">
                <div className="w-5 h-5  bg-green-500 rounded-full flex items-center justify-center">
                <svg className="w-2 h-2 sm:w-6 sm:h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
              </div>
                 <div className="h-5 bg-gray-200 rounded w-20 animate-pulse" />
              </div>
            </div>
          </div>): <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <a href={`mailto:${contactSettings.email}`} className="text-blue-600 hover:underline">{contactSettings.email}</a>
              </div>
              <div className="flex items-center gap-1">
                <Phone className="w-4 h-4" />
                <a href={`tel:${contactSettings.phone}`} className="text-green-600 hover:underline">{contactSettings.phone}</a>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-5 h-5  bg-green-500 rounded-full flex items-center justify-center">
                <svg className="w-2 h-2 sm:w-6 sm:h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
              </div>
                 <a href={`tel:${contactSettings.phone}`} className="text-green-600 hover:underline">Live Chat Available</a>
              </div>
            </div>
          </div>}
        </div>

        {/* Order Info */}
        <div className="text-center mt-8">
          <p className="text-sm text-gray-500">
            Order confirmation and tracking details have been sent to your email.
          </p>
        </div>
      </main>
    </div>
  )
}
