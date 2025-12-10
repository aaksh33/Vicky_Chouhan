"use client"
import Link from "next/link";
import { FileText, ShoppingCart, CreditCard, Truck, RotateCcw, Scale } from "lucide-react";
import { useEffect, useState } from "react";

export default function TermsOfServicePage() {
  const highlights = [
    { icon: FileText, title: "Clear Terms", desc: "Simple and transparent policies", color: "text-blue-600", bg: "bg-blue-100" },
    { icon: ShoppingCart, title: "Fair Orders", desc: "Clear ordering and billing flow", color: "text-emerald-600", bg: "bg-emerald-100" },
    { icon: CreditCard, title: "Secure Payments", desc: "Protected and encrypted transactions", color: "text-orange-600", bg: "bg-orange-100" },
    { icon: RotateCcw, title: "Returns Policy", desc: "Easy-to-understand return rules", color: "text-rose-600", bg: "bg-rose-100" },
  ];

  const [contactSettings, setContactSettings] = useState({
    email: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/settings")
      .then((res) => res.json())
      .then((data) => {
        if (data.contact) setContactSettings(data.contact);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10 py-10 sm:py-14">
        {/* Header */}
        <header className="mb-8 sm:mb-10">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="inline-flex items-center rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium uppercase tracking-wide text-slate-600 shadow-sm">
                Legal • Terms &amp; Conditions
              </p>
              <h1 className="mt-4 text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight text-slate-900">
                Terms of Service
              </h1>
              <p className="mt-2 text-sm sm:text-base text-slate-500">
                Last updated: November 2025
              </p>
            </div>
          </div>
        </header>

        {/* Highlights */}
        <section className="mb-10 sm:mb-12">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
            {highlights.map((item, idx) => (
              <div
                key={idx}
                className="rounded-xl border border-slate-200 bg-white/90 p-4 sm:p-5 text-center shadow-sm transition hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md"
              >
                <div className={`mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-full ${item.bg}`}>
                  <item.icon className={`h-5 w-5 ${item.color}`} />
                </div>
                <h3 className="mb-1 text-sm sm:text-base font-semibold text-slate-900">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Legal overview strip */}
        <section className="mb-8 sm:mb-10">
          <div className="rounded-lg border-l-4 border-sky-500 bg-sky-50/80 px-4 py-4 sm:px-5 sm:py-4">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-600">
              Important Information
            </p>
            <p className="mt-1 text-sm sm:text-base text-slate-700">
              Please read these Terms of Service carefully before using our website or placing any orders.
              By accessing or using Premium Menswear, you agree to be bound by these terms.
            </p>
          </div>
        </section>

        {/* Main Content (no big white card; clean sections) */}
        <main className="space-y-8 text-slate-700 text-sm sm:text-[15px] leading-relaxed">
          <section>
            <h2 className="mb-3 flex items-center gap-2 text-base sm:text-lg font-semibold text-slate-900">
              <FileText className="h-5 w-5 text-sky-600" />
              1. Acceptance of Terms
            </h2>
            <p>
              By accessing and using this website, you accept and agree to be bound by these Terms of
              Service, along with our Privacy Policy and any additional policies referenced here.
              If you do not agree to these terms, you should not use our website or services.
            </p>
          </section>

          <section>
            <h2 className="mb-3 flex items-center gap-2 text-base sm:text-lg font-semibold text-slate-900">
              <ShoppingCart className="h-5 w-5 text-emerald-600" />
              2. Account Registration
            </h2>
            <p className="mb-3">
              To make purchases, you may need to create an account. You agree to:
            </p>
            <ul className="list-disc space-y-2 pl-5">
              <li>Provide accurate, current, and complete information during registration</li>
              <li>Maintain the confidentiality of your login credentials</li>
              <li>Notify us immediately of any unauthorized use of your account</li>
              <li>Accept responsibility for all actions taken under your account</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-3 flex items-center gap-2 text-base sm:text-lg font-semibold text-slate-900">
              <FileText className="h-5 w-5 text-indigo-600" />
              3. Product Information
            </h2>
            <p>
              We make every effort to display accurate product descriptions, images, and pricing.
              However, we do not warrant that any content on the website is error-free, complete, or
              current. We reserve the right to correct any errors, inaccuracies, or omissions and to
              update information at any time without prior notice.
            </p>
          </section>

          <section>
            <h2 className="mb-3 flex items-center gap-2 text-base sm:text-lg font-semibold text-slate-900">
              <CreditCard className="h-5 w-5 text-orange-500" />
              4. Orders and Payments
            </h2>
            <p className="mb-3">
              When you place an order through our website:
            </p>
            <ul className="list-disc space-y-2 pl-5">
              <li>
                You agree to pay the listed price for products, including any applicable taxes,
                fees, and shipping charges
              </li>
              <li>
                We reserve the right to accept, refuse, or cancel any order at our sole discretion
              </li>
              <li>Orders are processed only after successful payment authorization</li>
              <li>All orders are subject to product availability</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-3 flex items-center gap-2 text-base sm:text-lg font-semibold text-slate-900">
              <Truck className="h-5 w-5 text-sky-700" />
              5. Shipping and Delivery
            </h2>
            <p>
              Shipping timelines shown at checkout are estimates only and may vary based on your
              location, courier delays, or other factors beyond our control. We are not liable for
              delays caused by third-party logistics providers or unforeseen circumstances.
            </p>
          </section>

          <section>
            <h2 className="mb-3 flex items-center gap-2 text-base sm:text-lg font-semibold text-slate-900">
              <RotateCcw className="h-5 w-5 text-rose-600" />
              6. Returns and Refunds
            </h2>
            <p className="mb-3">
              Our returns and refunds are governed by our dedicated 
              <Link href={'/refund-policy'}
                className="text-sm font-medium text-blue-600 hover:text-blue-700 hover:underline transition-colors mx-1">
                Return &amp; Refund Policy
              </Link>
              .In general:
            </p>
            <ul className="list-disc space-y-2 pl-5">
              <li>Products must be returned within the specified return window from delivery</li>
              <li>Items must be unused, in original condition, and with all packaging/accessories</li>
              <li>Refunds, where applicable, are processed within a reasonable timeframe</li>
              <li>Original shipping charges may be non-refundable unless required by law</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-3 flex items-center gap-2 text-base sm:text-lg font-semibold text-slate-900">
              <Scale className="h-5 w-5 text-purple-600" />
              7. Intellectual Property
            </h2>
            <p>
              All content on this website, including text, graphics, logos, icons, images, and
              software, is owned by or licensed to Premium Menswear and is protected by applicable
              intellectual property laws. You may not reproduce, distribute, modify, or create
              derivative works without our prior written consent.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-base sm:text-lg font-semibold text-slate-900">
              8. Limitation of Liability
            </h2>
            <p>
              To the maximum extent permitted by law, we shall not be liable for any indirect,
              incidental, special, or consequential damages arising out of or related to your use
              of the website, products, or services, even if we have been advised of the possibility
              of such damages.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-base sm:text-lg font-semibold text-slate-900">
              9. Changes to Terms
            </h2>
            <p>
              We may update or modify these Terms of Service from time to time. Any changes will
              be posted on this page with an updated &quot;Last updated&quot; date. Your continued
              use of the website after changes are posted constitutes acceptance of the revised terms.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-base sm:text-lg font-semibold text-slate-900">
              10. Contact Information
            </h2>
            <p>
              If you have any questions about these Terms of Service or our policies, you can contact us at:
            </p>
            {loading ? (
              <div className="mt-2 flex items-center gap-2">
                <span className="text-sm text-slate-700">Email:</span>
                <div className="h-4 w-48 rounded bg-slate-200 animate-pulse" />
              </div>
            ) : (
              <p className="mt-2 text-sm sm:text-base text-slate-700">
                Email:{" "}
                <a
                  href={`mailto:${contactSettings.email}`}
                  className="font-medium text-blue-600 hover:underline"
                >
                  {contactSettings.email}
                </a>
              </p>
            )}
          </section>
        </main>

        <div className="mt-10 border-t border-slate-200 pt-4">
          <Link href="/" className="text-sm font-medium text-blue-700 hover:underline">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
