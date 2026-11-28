import type { Metadata, Viewport } from 'next'
import { Fraunces, Work_Sans } from 'next/font/google'
import './globals.css'
import './astra.css'
import { GoogleMeasurement } from '@/components/google-measurement'
import { CookieConsent } from '@/components/cookie-consent'
import { AcquisitionBridge } from '@/components/acquisition-bridge'
import { MarketingTrafficTracker } from '@/components/marketing-traffic-tracker'
import { Analytics } from '@vercel/analytics/next'
import Script from 'next/script'
import { ThemeProvider } from '@/components/theme-provider'

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
  weight: ['300', '400', '600', '700'],
  style: ['normal', 'italic'],
})

const workSans = Work_Sans({
  subsets: ['latin'],
  variable: '--font-work-sans',
  weight: ['300', '400', '500', '600', '700'],
})

export const metadata: Metadata = {
  title: 'YRDLY — Your Neighbourhood Network',
  description: 'Connect with neighbours, discover local businesses and events, and buy and sell safely in your community.',
  metadataBase: new URL('https://yrdly.ng'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    url: 'https://yrdly.ng',
    title: 'YRDLY — Your Neighbourhood Network',
    description: 'Connect with neighbours, discover local businesses and events, and buy and sell safely in your community.',
    siteName: 'YRDLY',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Yrdly — Your Neighbourhood, Connected.' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'YRDLY — Your Neighbourhood Network',
    description: 'Connect with neighbours, discover local businesses and events, and buy and sell safely in your community.',
    images: ['/og-image.png'],
  },
}

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      name: "YRDLY",
      url: "https://yrdly.ng",
      logo: "https://yrdly.ng/logo.png",
    },
    {
      "@type": "WebSite",
      name: "YRDLY",
      url: "https://yrdly.ng",
      inLanguage: "en-NG",
    },
  ],
}

const googleTagManagerEnabled = process.env.NEXT_PUBLIC_YRDLY_GOOGLE_MEASUREMENT === 'gtm'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="bg-background" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData).replace(/</g, '\\u003c'),
          }}
        />
        {!googleTagManagerEnabled && (
          <>
            <Script
              async
              strategy="afterInteractive"
              src="https://www.googletagmanager.com/gtag/js?id=AW-18468457055"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', 'AW-18468457055');
              `}
            </Script>
          </>
        )}

        {/* Legacy AdSense remains unchanged until cutover. Its consent integration
            must be verified independently before enabling it in GTM mode. */}
        {!googleTagManagerEnabled && <Script
          async
          strategy="afterInteractive"
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4168167607384837"
          crossOrigin="anonymous"
        />}

        <style>{`
html {
  font-family: ${workSans.style.fontFamily};
  --font-sans: ${workSans.style.fontFamily};
  --font-mono: ui-monospace, monospace;
}
        `}</style>
      </head>

      <body className={`${fraunces.variable} ${workSans.variable}`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} disableTransitionOnChange>
          {children}
          <AcquisitionBridge />
          <MarketingTrafficTracker />
          <CookieConsent />
          {googleTagManagerEnabled && <GoogleMeasurement />}
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  )
}
