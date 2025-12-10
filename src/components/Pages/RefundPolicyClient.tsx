'use client'

import { Package, AlertCircle, RefreshCw, Clock, Shield } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'

type ContactSettings = {
  email: string
  phone: string
  address: string
}

export default function RefundPolicyPage() {
  const [contactSettings, setContactSettings] = useState<ContactSettings>({
    email: '',
    phone: '',
    address: ''
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await fetch('/api/settings')
        const data = await res.json()
        if (data?.contact) {
          setContactSettings(data.contact)
        }
      } catch (error) {
        // silently fail
      } finally {
        setLoading(false)
      }
    }

    fetchSettings()
  }, [])

  const highlights = [
    { icon: Package, title: 'Exchange Only', desc: 'Products can be exchanged, no refunds', color: 'text-emerald-600', bg: 'bg-emerald-100' },
    { icon: Clock, title: '24 Hour Window', desc: 'Report issues within 24 hours', color: 'text-amber-600', bg: 'bg-amber-100' },
    { icon: RefreshCw, title: 'Easy Exchange', desc: 'Same or different product options', color: 'text-blue-600', bg: 'bg-blue-100' },
    { icon: Shield, title: 'Original Condition', desc: 'Return in original packaging', color: 'text-indigo-600', bg: 'bg-indigo-100' }
  ]

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        {/* Header */}
        <header className="mb-8 sm:mb-10">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="inline-flex items-center rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium uppercase tracking-wide text-slate-600 shadow-sm">
                Policy & Compliance
              </p>
              <h1 className="mt-4 text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight text-slate-900">
                Return & Refund Policy
              </h1>
              <p className="mt-2 text-sm text-slate-500">
                Last updated: November 2025
              </p>
            </div>
            <div className="hidden sm:flex flex-col items-end gap-2">
              <div className="h-1.5 w-24 rounded-full bg-gradient-to-r from-sky-500 to-indigo-500" />
              <p className="text-xs text-slate-500">
                Premium Menswear • Customer Protection
              </p>
            </div>
          </div>
        </header>

        {/* Highlights */}
        <section className="mb-8 sm:mb-10">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {highlights.map((item, idx) => (
              <div
                key={idx}
                className="group rounded-xl border border-slate-200 bg-white p-4 sm:p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md"
              >
                <div className="mb-3 flex items-center gap-3">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-full ${item.bg}`}>
                    <item.icon className={`h-5 w-5 ${item.color}`} />
                  </div>
                  <h3 className="text-sm font-semibold text-slate-900">
                    {item.title}
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Main Content */}
        <main className="">
          <div className="space-y-8 text-slate-700 text-sm sm:text-[15px] leading-relaxed">

            {/* Policy Overview strip */}
            <section className="border-l-4 border-blue-500 bg-blue-50/70 px-5 py-4 rounded-lg">
              <p className="text-xs font-bold text-blue-700 uppercase tracking-[0.14em]">
                Policy Overview
              </p>
              <p className="mt-1 text-sm text-slate-700 font-medium">
                Please review the terms below carefully before initiating any return or exchange.
              </p>
            </section>

            {/* Introduction */}
            <section>
              <h2 className="mb-4 flex items-center gap-2 text-lg sm:text-xl font-bold text-slate-900">
                <AlertCircle className="h-6 w-6 text-blue-600" />
                Introduction
              </h2>
              <p>
                Products purchased from <span className="font-semibold text-slate-900">Premium Menswear</span> may only be returned to the same outlet where they were originally delivered.
                All items must be returned in their <span className="font-semibold text-slate-900">original condition</span>. Products with opened seals, tampered packaging, or missing
                accessories will not be eligible for return. Please note that we follow an <span className="font-semibold text-slate-900">exchange-only policy</span>, and refunds are not
                provided unless specifically mentioned under applicable conditions.
              </p>
            </section>

            {/* General Return Policy */}
            <section>
              <h2 className="mb-4 flex items-center gap-2 text-lg sm:text-xl font-bold text-slate-900">
                <Package className="h-6 w-6 text-emerald-600" />
                General Return Policy
              </h2>
              <ul className="list-disc space-y-3 pl-6">
                <li>
                  <strong className="text-slate-900">Original Condition:</strong> Items must be returned with all original accessories, packaging, manuals, and
                  documentation.
                </li>
                <li>
                  <strong className="text-slate-900">Sealed Products:</strong> Products with broken seals, opened boxes, or tampered packaging are strictly
                  non-returnable.
                </li>
                <li>
                  <strong className="text-slate-900">Exchange Only:</strong> Products can only be exchanged; no refunds will be provided except under specific
                  conditions.
                </li>
                <li>
                  <strong className="text-slate-900">Transit Orders:</strong> Orders that are in transit can be canceled at zero cost.
                </li>
                <li>
                  <strong className="text-slate-900">Advance Payments:</strong> If an advance payment has been made and the order is canceled, the refund will be
                  processed within <span className="font-semibold text-slate-900">7 days</span>.
                </li>
                <li>
                  <strong className="text-slate-900">Faulty Products:</strong> In case of product faults, customers will be assisted by the nearest authorized
                  service center.
                </li>
              </ul>
            </section>

            {/* Open-Box Laptops */}
            <section>
              <h2 className="mb-4 flex items-center gap-2 text-lg sm:text-xl font-bold text-slate-900">
                <Shield className="h-6 w-6 text-indigo-600" />
                Open-Box Laptops – Return & Refund Policy
              </h2>

              <div className="space-y-6">
                <div>
                  <h3 className="mb-3 text-base font-bold text-slate-900">
                    1. Condition of Product
                  </h3>
                  <ul className="list-disc space-y-2 pl-6 text-sm">
                    <li>Products must be returned in the <span className="font-semibold text-slate-900">same physical condition</span> as delivered.</li>
                    <li>All packaging materials, accessories, and documentation must be intact.</li>
                    <li>Products with missing contents, altered condition, or tampered packaging will not be accepted.</li>
                  </ul>
                </div>

                <div className="rounded-xl border-2 border-amber-300 bg-gradient-to-br from-amber-50 to-orange-50 px-5 py-4 sm:px-6 sm:py-5">
                  <h3 className="mb-3 flex items-center gap-2 text-base font-bold text-slate-900">
                    <Clock className="h-5 w-5 text-amber-600" />
                    2. Reporting Issues (24 Hour Window)
                  </h3>
                  <ul className="list-disc space-y-2 pl-6 text-sm">
                    <li>
                      Issues such as damage, malfunction, or missing accessories must be reported{' '}
                      <strong className="text-amber-700 bg-amber-100 px-1.5 py-0.5 rounded">within 24 hours of delivery</strong>.
                    </li>
                    <li>Reports made after 24 hours may not qualify for exchange or refund.</li>
                  </ul>
                </div>

                <div>
                  <h3 className="mb-3 text-base font-bold text-slate-900">
                    3. Exchange Options
                  </h3>
                  <ul className="list-disc space-y-2 pl-6 text-sm">
                    <li>
                      <strong className="text-slate-900">Same Product Exchange:</strong> Exchange with the same model (subject to stock availability).
                    </li>
                    <li>
                      <strong className="text-slate-900">Different Product Exchange:</strong> Exchange with another available model, with the price difference
                      adjusted accordingly.
                    </li>
                    <li>
                      <strong className="text-slate-900">Full Refund:</strong> Available only if reported within the 24-hour window and no replacement option is
                      available.
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="mb-3 text-base font-bold text-slate-900">
                    4. Advance Payments
                  </h3>
                  <p className="text-sm">
                    If advance payment is made and the order is cancelled before dispatch or while in transit, the full amount will be
                    refunded within <span className="font-semibold text-slate-900">14–21 business days</span>.
                  </p>
                </div>

                <div>
                  <h3 className="mb-3 text-base font-bold text-slate-900">
                    5. Faulty Product Support (After 24 Hours)
                  </h3>
                  <ul className="list-disc space-y-2 pl-6 text-sm">
                    <li>
                      If a product develops a fault after the 24-hour reporting window, assistance will be provided through the nearest
                      authorized service center.
                    </li>
                    <li>For service-related queries, please contact the authorized service center directly.</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Additional Information */}
            <section>
              <h2 className="mb-4 flex items-center gap-2 text-lg sm:text-xl font-bold text-slate-900">
                <AlertCircle className="h-6 w-6 text-amber-600" />
                Additional Information
              </h2>
              <p>
                Customers may visit the nearest <span className="font-semibold text-slate-900">Premium Menswear outlet</span> for any queries regarding returns, exchanges, or service
                assistance.
              </p>
            </section>

            {/* Contact Information */}
            <section>
              <h2 className="mb-4 text-lg sm:text-xl font-bold text-slate-900">
                Contact Information
              </h2>
              <p className="mb-4 font-medium">
                For further assistance, please contact us at:
              </p>
              <div className="space-y-3 rounded-xl border border-slate-200 bg-slate-50/60 p-5 sm:p-6">
                <p className="text-sm">
                  <strong className="text-slate-900">Company Name:</strong> Premium Menswear
                </p>

                {loading ? (
                  <>
                    <p className="flex items-center gap-2 text-sm">
                      <strong className="text-slate-900">Address:</strong>{' '}
                      <span className="h-4 w-64 rounded bg-slate-200/80 animate-pulse" />
                    </p>
                    <p className="flex items-center gap-2 text-sm">
                      <strong className="text-slate-900">Phone:</strong>{' '}
                      <span className="h-4 w-32 rounded bg-slate-200/80 animate-pulse" />
                    </p>
                    <p className="flex items-center gap-2 text-sm">
                      <strong className="text-slate-900">Email:</strong>{' '}
                      <span className="h-4 w-48 rounded bg-slate-200/80 animate-pulse" />
                    </p>
                  </>
                ) : (
                  <>
                    <p className="text-sm">
                      <strong className="text-slate-900">Address:</strong> {contactSettings.address}
                    </p>
                    <p className="text-sm">
                      <strong className="text-slate-900">Phone:</strong>{' '}
                      <a
                        href={`tel:${contactSettings.phone}`}
                        className="font-semibold text-green-600 hover:underline"
                      >
                        {contactSettings.phone}
                      </a>
                    </p>
                    <p className="text-sm">
                      <strong className="text-slate-900">Email:</strong>{' '}
                      <a
                        href={`mailto:${contactSettings.email}`}
                        className="font-semibold text-blue-600 hover:underline"
                      >
                        {contactSettings.email}
                      </a>
                    </p>
                  </>
                )}
              </div>
            </section>
          </div>
        </main>

        <div className="mt-8 flex flex-col-reverse sm:flex-row items-center justify-between">
          <Link
            href="/"
            className="text-sm font-semibold text-blue-700 hover:underline"
          >
            Back to Home
          </Link>
          <p className="text-xs text-slate-500 font-medium">
            This policy is subject to change without prior notice.
          </p>
        </div>
      </div>
    </div>
  )
}
