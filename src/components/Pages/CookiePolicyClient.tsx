"use client";
import Link from "next/link";
import { Cookie, Settings, BarChart3, Zap } from "lucide-react";
import { useEffect, useState } from "react";

export default function CookiePolicyPage() {
  const highlights = [
    {
      icon: Cookie,
      title: "Essential",
      desc: "Required for site functionality",
      color: "text-purple-600",
      bg: "bg-purple-100",
    },
    { icon: Settings, title: "Functional", desc: "Remember your preferences", color: "text-blue-600", bg: "bg-blue-100" },
    { icon: BarChart3, title: "Analytics", desc: "Improve user experience", color: "text-green-600", bg: "bg-green-100" },
    { icon: Zap, title: "Performance", desc: "Optimize site speed", color: "text-orange-600", bg: "bg-orange-100" },
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
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10 py-10 sm:py-12">
        {/* Header */}
        <header className="mb-8 sm:mb-10">
          <div>
            <p className="inline-flex items-center rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium uppercase tracking-wide text-slate-600 shadow-sm">
              Legal • Cookies
            </p>
            <h1 className="mt-4 text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight text-slate-900">
              Cookie Policy
            </h1>
            <p className="mt-2 text-sm sm:text-base text-slate-500">
              Last updated: November 2025
            </p>
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
                  <div className={`inline-flex h-11 w-11 items-center justify-center rounded-full ${item.bg}`}>
                    <item.icon className={`h-5 w-5 ${item.color}`} />
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

        {/* Content */}
        <section>
          <div className="space-y-8 text-slate-700 text-sm sm:text-[15px] leading-relaxed">
            <section>
              <h2 className="text-lg sm:text-xl font-semibold text-slate-900 mb-3 flex items-center gap-2">
                <Cookie className="h-5 w-5 text-purple-600" />
                What Are Cookies?
              </h2>
              <p>
                Cookies are small text files stored on your device when you
                visit our website. They help us provide you with a better
                experience by remembering your preferences and understanding how
                you use our site.
              </p>
            </section>

            <section>
              <h2 className="text-lg sm:text-xl font-semibold text-slate-900 mb-3 flex items-center gap-2">
                <Settings className="h-5 w-5 text-blue-600" />
                Types of Cookies We Use
              </h2>

              <div className="space-y-4">
                <div className="px-4">
                  <h3 className="font-semibold text-slate-900 mb-2">
                    Essential Cookies
                  </h3>
                  <p>
                    These cookies are necessary for the website to function
                    properly. They enable core functionality such as security,
                    authentication, and shopping cart operations.
                  </p>
                </div>

                <div className="px-4">
                  <h3 className="font-semibold text-slate-900 mb-2">
                    Performance Cookies
                  </h3>
                  <p>
                    These cookies collect information about how visitors use our
                    website, such as which pages are visited most often. This
                    helps us improve our website performance.
                  </p>
                </div>

                <div className="px-4">
                  <h3 className="font-semibold text-slate-900 mb-2">
                    Functionality Cookies
                  </h3>
                  <p>
                    These cookies allow our website to remember choices you make
                    (such as your username or language preference) and provide
                    enhanced features.
                  </p>
                </div>

                <div className="px-4">
                  <h3 className="font-semibold text-slate-900 mb-2">
                    Analytics Cookies
                  </h3>
                  <p>
                    We use analytics cookies to understand how visitors interact
                    with our website, helping us improve user experience and
                    optimize our services.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-lg sm:text-xl font-semibold text-slate-900 mb-3 flex items-center gap-2">
                <Zap className="h-5 w-5 text-orange-600" />
                How We Use Cookies
              </h2>
              <p className="mb-3">We use cookies to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Keep you signed in to your account</li>
                <li>Remember items in your shopping cart</li>
                <li>Understand your preferences and settings</li>
                <li>Analyze website traffic and usage patterns</li>
                <li>Improve website functionality and user experience</li>
                <li>Provide personalized content and recommendations</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg sm:text-xl font-semibold text-slate-900 mb-3 flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-green-600" />
                Third-Party Cookies
              </h2>
              <p>
                We may use third-party services that set cookies on your device,
                including:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-3">
                <li>Google Analytics for website analytics</li>
                <li>Payment processors for secure transactions</li>
                <li>Social media platforms for sharing features</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg sm:text-xl font-semibold text-slate-900 mb-3 flex items-center gap-2">
                <Settings className="h-5 w-5 text-indigo-600" />
                Managing Cookies
              </h2>
              <p className="mb-3">
                You can control and manage cookies in several ways:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  Browser settings: Most browsers allow you to refuse or delete
                  cookies
                </li>
                <li>
                  Opt-out tools: Use browser extensions to block tracking
                  cookies
                </li>
                <li>
                  Privacy settings: Adjust your preferences in your account
                  settings
                </li>
              </ul>
              <p className="mt-3 text-sm text-slate-600">
                Note: Disabling essential cookies may affect website
                functionality and your ability to use certain features.
              </p>
            </section>

            <section>
              <h2 className="text-lg sm:text-xl font-semibold text-slate-900 mb-3">
                Cookie Duration
              </h2>
              <p className="mb-3">
                We use both session and persistent cookies:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Session cookies:</strong> Temporary cookies that
                  expire when you close your browser
                </li>
                <li>
                  <strong>Persistent cookies:</strong> Remain on your device for
                  a set period or until manually deleted
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg sm:text-xl font-semibold text-slate-900 mb-3">
                Updates to This Policy
              </h2>
              <p>
                We may update this Cookie Policy from time to time. Any changes
                will be posted on this page with an updated revision date.
              </p>
            </section>

            <section>
              <h2 className="text-lg sm:text-xl font-semibold text-slate-900 mb-3">
                Contact Us
              </h2>
              <p>
                If you have questions about our use of cookies, please contact
                us at:
              </p>
              {loading ? (
                <div className="mt-2 flex items-center gap-2">
                  <span>Email:</span>
                  <div className="h-4 w-48 rounded bg-slate-200 animate-pulse" />
                </div>
              ) : (
                <p className="mt-2">
                  Email:{" "}
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
        </section>
      </div>
    </div>
  );
}
