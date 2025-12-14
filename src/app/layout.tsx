import type { Metadata, Viewport } from "next";
import "./globals.css";
import { AuthProvider } from "@/components/auth-provider";
import { ConditionalLayout } from "@/components/ConditionalLayout";
import { Toaster } from "sonner";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import CookieConsent from "@/components/CookieConsent";
import Script from "next/script";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://futureofgadgets.in";

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#2874f0',
}

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Premium Menswear",
    template: "%s | Premium Menswear",
  },
  description: "Shop premium men's fashion at Premium Menswear. Find suits, blazers, coats, jackets, kurta pajamas and more with fast delivery and great prices.",
  keywords: ["menswear", "suits", "blazers", "coats", "jackets", "kurta pajamas", "formal wear", "men's fashion", "premium clothing", "tailored suits", "business attire", "wedding suits"],
  authors: [{ name: "Premium Menswear" }],
  creator: "Premium Menswear",
  publisher: "Premium Menswear",
  alternates: {
    canonical: "/",
  },
  openGraph: {
  type: "website",
  locale: "en_IN",
  url: siteUrl,
  siteName: "Premium Menswear",
  title: "Premium Menswear",
  description:
    "Shop premium men's fashion at Premium Menswear. Find suits, blazers, coats, jackets, kurta pajamas and more with fast delivery and great prices.",
  images: [
    {
      url: `${siteUrl}/logo.png`,
      width: 1200,
      height: 630,
      alt: "Premium Menswear",
    },
  ],
},

  twitter: {
    card: "summary_large_image",
    title: "Premium Menswear",
    description: "Shop premium men's fashion at Premium Menswear. Find suits, blazers, coats, jackets, kurta pajamas and more with fast delivery and great prices.",
    images: [`${siteUrl}/logo.png`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Premium Menswear',
  url: siteUrl,
  description: 'Premium men\'s fashion destination for modern gentlemen',
  potentialAction: {
    '@type': 'SearchAction',
    target: `${siteUrl}/search?q={search_term_string}`,
    'query-input': 'required name=search_term_string',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Great+Vibes&display=swap" rel="stylesheet" />
        <link rel="dns-prefetch" href="https://res.cloudinary.com" />
      </head>
      <body className="antialiased bg-transparent">
        <Script
          id="json-ld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <AuthProvider>
          <ConditionalLayout>
            {children}
            <WhatsAppFloat />
          </ConditionalLayout>
          <CookieConsent />
          <Toaster className="!bottom-16 sm:!bottom-5" />
        </AuthProvider>
      </body>
    </html>
  );
}
