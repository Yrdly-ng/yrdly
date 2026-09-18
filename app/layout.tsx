import type { Metadata, Viewport } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { Fraunces, Work_Sans } from 'next/font/google'
import './globals.css'
import { CookieConsent } from '@/components/cookie-consent'
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
  title: 'Yrdly - Your Neighborhood Network',
  description: 'Connect with your neighbors, share updates, and build a stronger community with Yrdly.',
  metadataBase: new URL('https://yrdly.ng'),
  openGraph: {
    type: 'website',
    url: 'https://yrdly.ng',
    title: 'Yrdly - Your Neighborhood Network',
    description: 'Connect with your neighbors, buy and sell safely on your street, and discover local events just steps away.',
    siteName: 'Yrdly',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Yrdly — Your Neighbourhood, Connected.' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Yrdly - Your Neighborhood Network',
    description: 'Connect with your neighbors, buy and sell safely on your street, and discover local events just steps away.',
    images: ['/og-image.png'],
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="bg-background" suppressHydrationWarning>
      <head>

        {/* ✅ Google AdSense */}
        <Script
          async
          strategy="afterInteractive"
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4168167607384837"
          crossOrigin="anonymous"
        />

        <style>{`
html {
  font-family: ${workSans.style.fontFamily};
  --font-sans: ${GeistSans.variable};
  --font-mono: ${GeistMono.variable};
}
        `}</style>
      </head>

      <body className={`${fraunces.variable} ${workSans.variable}`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} disableTransitionOnChange>
          {children}
          <CookieConsent />
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  )
}
