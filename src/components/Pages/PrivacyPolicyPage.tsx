"use client"
import Link from "next/link";
import { Shield, Lock, Eye, UserCheck, Database, Bell } from "lucide-react";
import { useEffect, useState } from "react";

type ContactSettings = {
  email: string;
};

export default function PrivacyPolicyPage() {
  const highlights = [
    {
      icon: Shield,
      title: "Data Protection",
      desc: "Your data is encrypted and secure",
      bgClass: "bg-emerald-50",
      iconClass: "text-emerald-600",
    },
    {
      icon: Lock,
      title: "Secure Storage",
      desc: "Industry-standard security measures",
      bgClass: "bg-slate-100",
      iconClass: "text-slate-700",
    },
    {
      icon: Eye,
      title: "Transparency",
      desc: "Clear about data usage",
      bgClass: "bg-indigo-50",
      iconClass: "text-indigo-600",
    },
    {
      icon: UserCheck,
      title: "Your Rights",
      desc: "Full control over your data",
      bgClass: "bg-amber-50",
      iconClass: "text-amber-600",
    },
  ];

  const [contactSettings, setContactSettings] = useState<ContactSettings>({
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
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10 py-10 sm:py-12">
        {/* Header */}
        <header className="mb-8 sm:mb-10">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="inline-flex items-center rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium uppercase tracking-wide text-slate-600 shadow-sm">
                Legal &amp; Privacy
              </p>
              <h1 className="mt-4 text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight text-slate-900">
                Privacy Policy
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
                className="rounded-xl border border-slate-200 bg-white/90 p-4 sm:p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md"
              >
                <div className="mb-3 flex items-center gap-3">
                  <div
                    className={`inline-flex h-11 w-11 items-center justify-center rounded-full ${item.bgClass}`}
                  >
                    <item.icon className={`h-5 w-5 ${item.iconClass}`} />
                  </div>
                  <h3 className="text-sm sm:text-base font-semibold text-slate-900">
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
        <section>
          <div className="">
            <div className="space-y-8 text-slate-700 text-sm sm:text-[15px] leading-relaxed">
              <section>
                <h2 className="text-lg sm:text-xl font-semibold text-slate-900 mb-3 flex items-center gap-2">
                  <Database className="h-5 w-5 text-blue-600" />
                  1. Information We Collect
                </h2>
                <p className="mb-3">
                  We collect information you provide directly to us, including:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Name, email address, and phone number</li>
                  <li>Shipping and billing addresses</li>
                  <li>
                    Payment information (processed securely through third-party
                    providers)
                  </li>
                  <li>Order history and preferences</li>
                  <li>Account credentials</li>
                </ul>
              </section>

              <section>
                <h2 className="text-lg sm:text-xl font-semibold text-slate-900 mb-3 flex items-center gap-2">
                  <Bell className="h-5 w-5 text-green-600" />
                  2. How We Use Your Information
                </h2>
                <p className="mb-3">We use the information we collect to:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Process and fulfill your orders</li>
                  <li>Send order confirmations and shipping updates</li>
                  <li>Respond to your inquiries and provide customer support</li>
                  <li>Improve our products and services</li>
                  <li>Send promotional communications (with your consent)</li>
                  <li>Detect and prevent fraud</li>
                </ul>
              </section>

              <section>
                <h2 className="text-lg sm:text-xl font-semibold text-slate-900 mb-3 flex items-center gap-2">
                  <UserCheck className="h-5 w-5 text-purple-600" />
                  3. Information Sharing
                </h2>
                <p className="mb-3">
                  We do not sell your personal information. We may share your
                  information with:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Service providers who assist in our operations</li>
                  <li>Payment processors for transaction processing</li>
                  <li>Shipping companies to deliver your orders</li>
                  <li>Law enforcement when required by law</li>
                </ul>
              </section>

              <section>
                <h2 className="text-lg sm:text-xl font-semibold text-slate-900 mb-3 flex items-center gap-2">
                  <Lock className="h-5 w-5 text-red-600" />
                  4. Data Security
                </h2>
                <p>
                  We implement appropriate security measures to protect your
                  personal information. However, no method of transmission over
                  the internet is 100% secure, and we cannot guarantee absolute
                  security.
                </p>
              </section>

              <section>
                <h2 className="text-lg sm:text-xl font-semibold text-slate-900 mb-3 flex items-center gap-2">
                  <Shield className="h-5 w-5 text-orange-600" />
                  5. Your Rights
                </h2>
                <p className="mb-3">You have the right to:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Access your personal information</li>
                  <li>Correct inaccurate data</li>
                  <li>Request deletion of your data</li>
                  <li>Opt-out of marketing communications</li>
                  <li>Export your data</li>
                </ul>
              </section>

              <section>
                <h2 className="text-lg sm:text-xl font-semibold text-slate-900 mb-3 flex items-center gap-2">
                  <Eye className="h-5 w-5 text-indigo-600" />
                  6. Cookies
                </h2>
                <p>
                  We use cookies and similar technologies to enhance your
                  experience. See our{' '}
                  <Link
                    href="/cookie-policy"
                    className="text-blue-600 hover:underline"
                  >
                    Cookie Policy
                  </Link>{' '}
                  for more details.
                </p>
              </section>

              <section>
                <h2 className="text-lg sm:text-xl font-semibold text-slate-900 mb-3">
                  7. Contact Us
                </h2>
                <p>
                  If you have questions about this Privacy Policy, please contact
                  us at:
                </p>
                {loading ? (
                  <div className="mt-2 flex items-center gap-2">
                    <span>Email:</span>
                    <div className="h-4 w-48 rounded bg-slate-200 animate-pulse" />
                  </div>
                ) : (
                  <p className="mt-2">
                    Email:{' '}
                    <a
                      href={`mailto:${contactSettings.email}`}
                      className="text-blue-600 hover:underline"
                    >
                      {contactSettings.email}
                    </a>
                  </p>
                )}
              </section>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-200">
              <Link
                href="/"
                className="text-sm font-medium text-blue-700 hover:underline"
              >
                Back to Home
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
