# Phase 1a — Verification & Implementation Plan (`Yrdly`)

---

## ADSENSE DECISION
* **Decision A (Selected):** Verification only. Remove the heavy Google AdSense `<Script>` tag from `app/layout.tsx` and replace it with the static meta tag:
  `<meta name="google-adsense-account" content="ca-pub-4168167607384837">`.
* **Reason:** Audit of the codebase confirms **zero active ad slots** (`<ins class="adsbygoogle">`) exist on any page of `yrdly.ng`. The script tag is only present for domain ownership verification.

---

## VERIFICATION DATA (V0 – V8)

### V0. Local Pre-Change Baseline (`http://localhost:3000`)
*Tested locally with `next start` on port 3000 using Lighthouse Mobile (simulated throttling, performance only) across 3 runs per page.*

| Page Route | Median LCP (ms) | Median FCP (ms) | Total Byte Weight (bytes) | Image Transfer Bytes | LCP Element Selector | LCP Element Snippet |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **`/` (Homepage)** | **14,998.7 ms** | **3,584.6 ms** | **2,806,728 B** (2.81 MB) | **1,762,237 B** (1.76 MB) | `body.fraunces_... > div.fixed > p.text-sm` | `<p class="text-sm text-center sm:text-left">` (Cookie Banner) |
| **`/about`** | **4,671.7 ms** | **2,239.3 ms** | **1,701,431 B** (1.70 MB) | **652,055 B** (652 KB) | `div > section > div > img` | `<img alt="Nigerian community gathering" ... src="/images/market-2.jpg">` |
| **`/contact`** | **4,561.5 ms** | **2,607.4 ms** | **1,201,441 B** (1.20 MB) | **158,091 B** (158 KB) | `div > section > div > p` | `<p style="font-size: 1rem...">` |

---

### V1. Initial Server HTML Tags (`curl -s https://yrdly.ng/`)

#### All `<img>` Tags in Server HTML:
```html
<img src="/logo.png" alt="Yrdly Logo" class="h-16 w-auto drop-shadow-xl hover:scale-125 transition-transform"/>
<img src="https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&amp;fit=crop&amp;q=80" alt="People in a park" class="w-full h-full object-cover"/>
<img src="/owambe.jpeg" alt="Discover Events" class="w-full h-full object-cover"/>
<img src="/market.jpeg" alt="Neighbourhood Market" class="w-full h-full object-cover"/>
<img src="/neighbours.jpeg" alt="Verified Neighbours Only" class="w-full h-full object-cover"/>
<img src="/sell-item.jpeg" alt="Swift Listings" class="w-full h-full object-cover"/>
<img src="/explore.jpeg" alt="Effortless Discovery" class="w-full h-full object-cover"/>
<img src="/events.jpeg" alt="Estate &amp; Local Events" class="w-full h-full object-cover"/>
```

#### All Preload Links in Server HTML:
```html
<link rel="preload" href="/_next/static/media/03bda585a99c6450-s.p.ad37b9d9.woff2" as="font" crossorigin="" type="font/woff2"/>
<link rel="preload" href="/_next/static/media/3c7c6164b2587822-s.p.7f689f7d.woff2" as="font" crossorigin="" type="font/woff2"/>
<link rel="preload" href="/_next/static/media/7ddd198311ba7843-s.p.d56bf40f.woff2" as="font" crossorigin="" type="font/woff2"/>
<link rel="preload" href="/_next/static/media/GeistMono_Variable.p.73882635.woff2" as="font" crossorigin="" type="font/woff2"/>
<link rel="preload" href="/_next/static/media/Geist_Variable-s.p.f19e4721.woff2" as="font" crossorigin="" type="font/woff2"/>
<link rel="preload" as="image" href="/logo.png"/>
<link rel="preload" as="image" href="https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&amp;fit=crop&amp;q=80"/>
<link rel="preload" as="image" href="/owambe.jpeg"/>
<link rel="preload" as="image" href="/market.jpeg"/>
<link rel="preload" as="image" href="/neighbours.jpeg"/>
<link rel="preload" as="image" href="/sell-item.jpeg"/>
<link rel="preload" as="image" href="/explore.jpeg"/>
<link rel="preload" as="image" href="/events.jpeg"/>
<link rel="preload" as="script" fetchPriority="low" href="/_next/static/chunks/c7541449e1243904.js"/>
<link rel="preload" href="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4168167607384837" as="script" crossorigin=""/>
```

---

### V2. `app/page.tsx` Hero Section Inspection

#### Lines 1-60 Verbatim:
```tsx
1: "use client";
2: 
3: import React, { useState } from 'react';
4: import Link from 'next/link';
5: import { Calendar, ShoppingBag, Users, Mail } from 'lucide-react';
6: import { Button } from '@/components/ui/button';
7: import Header from '@/components/header';
8: import Footer from '@/components/footer';
9: import { HeroLoginForm } from '@/components/auth/HeroLoginForm';
10: import { Input } from '@/components/ui/input';
11: import { Card, CardContent } from '@/components/ui/card';
12: import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
13: import { PwaInstallSection } from '@/components/PwaInstallSection';
14: 
15: import { NewsletterPopup } from '@/components/newsletter-popup';
...
```

#### Lines 150-175 Verbatim:
```tsx
150:   ];
151: 
152:   return (
153:     <div className="min-h-screen bg-background text-foreground">
154:       <Header currentPage="home" />
155:       <NewsletterPopup />
156: 
157:       {/* Hero Section */}
158:       <section className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden">
159:         {/* Background Image */}
160:         <div className="absolute inset-0 z-0">
161:           <img
162:             src="https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&q=80"
163:             alt="People in a park"
164:             className="w-full h-full object-cover"
165:           />
166:           <div className="absolute inset-0 bg-black/20" />
167:         </div>
168: 
169:         {/* Content */}
170:         <div className="relative z-10 w-full max-w-md px-4 py-20 mt-16 flex flex-col items-center">
171:           <HeroLoginForm />
172:         </div>
173:       </section>
```
* **Hero `<img>` Gating Findings:** No mounted-flag, opacity class, transition, or onLoad handler gates the hero `<img>`. It is rendered directly into HTML on initial output. However, because line 1 contains `"use client"`, the entire page component hydrates on the client side.

---

### V3. Modal & Banner Components

#### `components/cookie-consent.tsx` (Full Code):
```tsx
'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Cookies from 'js-cookie';

const COOKIE_NAME = 'yrdly_cookie_consent';

export function CookieConsent() {
  const [showConsent, setShowConsent] = useState(false);

  useEffect(() => {
    const consent = Cookies.get(COOKIE_NAME);
    if (!consent) {
      setShowConsent(true);
    }
  }, []);

  const acceptConsent = () => {
    setShowConsent(false);
    Cookies.set(COOKIE_NAME, 'true', { expires: 365 });
  };

  if (!showConsent) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-900 text-white p-4 flex flex-col sm:flex-row items-center justify-between z-50 gap-2">
      <p className="text-sm text-center sm:text-left">
        We use cookies to enhance your experience. By continuing to visit this site you agree to our{' '}
        <Link href="/terms" className="underline">Terms of Service</Link> and {' '}
        <Link href="/privacy-policy" className="underline">Privacy Policy</Link>.
      </p>
      <Button onClick={acceptConsent} className="bg-green-600 hover:bg-green-700 text-white w-full sm:w-auto">
        Accept
      </Button>
    </div>
  );
}
```
* **Import Site:** `app/layout.tsx:6`, rendered in `RootLayout`.
* **Persistence:** `js-cookie` sets `yrdly_cookie_consent=true` with 365 days expiration.

#### `components/newsletter-popup.tsx` (Full Code):
```tsx
"use client";

import React, { useState, useEffect } from "react";
import { Mail, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function NewsletterPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error" | "already_subscribed">("idle");
  const [subscribedEmails, setSubscribedEmails] = useState<string[]>([]);

  useEffect(() => {
    try {
      const isDismissed = localStorage.getItem("yrdly_newsletter_popup_dismissed");
      const savedSubscribed = localStorage.getItem("yrdly_subscribed_emails");
      let currentSubscribed: string[] = [];
      if (savedSubscribed) {
        currentSubscribed = JSON.parse(savedSubscribed);
        setSubscribedEmails(currentSubscribed);
      }

      if (!isDismissed) {
        const timer = setTimeout(() => {
          setIsOpen(true);
        }, 3000);
        return () => clearTimeout(timer);
      }
    } catch {
      const timer = setTimeout(() => setIsOpen(true), 3000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    try {
      localStorage.setItem("yrdly_newsletter_popup_dismissed", "true");
    } catch {}
  };

  const handleSubscribe = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const trimmedEmail = email.trim().toLowerCase();
    if (!trimmedEmail || status === "loading") return;

    if (subscribedEmails.includes(trimmedEmail)) {
      setStatus("already_subscribed");
      return;
    }

    setStatus("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: trimmedEmail }),
      });

      if (res.ok) {
        setStatus("success");
        const updated = [...subscribedEmails, trimmedEmail];
        setSubscribedEmails(updated);
        try {
          localStorage.setItem("yrdly_subscribed_emails", JSON.stringify(updated));
          localStorage.setItem("yrdly_newsletter_popup_dismissed", "true");
        } catch {}
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="relative w-full max-w-md bg-background border border-border rounded-2xl p-6 sm:p-8 shadow-2xl text-center space-y-6 animate-in zoom-in-95 duration-300">
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-2 text-muted-foreground hover:text-foreground rounded-full hover:bg-muted transition-colors"
          aria-label="Close newsletter signup"
        >
          <X size={20} />
        </button>

        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#82DB7E] text-background mb-2 shadow-md">
          <Mail size={30} />
        </div>

        <div className="space-y-2">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
            Join Our Community Pulse
          </h2>
          <p className="text-sm text-muted-foreground">
            Get weekly updates on what&apos;s happening in Lagos estates. No spam. Just community trust.
          </p>
        </div>

        <form onSubmit={handleSubscribe} className="space-y-3">
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (status === "error" || status === "already_subscribed") {
                setStatus("idle");
              }
            }}
            className="w-full border-border bg-background h-11 text-sm"
            disabled={status === "loading" || status === "success"}
            required
          />
          <Button
            type="submit"
            disabled={status === "loading" || status === "success"}
            className={
              status === "success" || status === "already_subscribed"
                ? "w-full bg-[#166534] hover:bg-[#166534] text-white font-semibold h-11 text-sm transition-colors"
                : "w-full bg-[#82DB7E] hover:bg-[#82DB7E]/90 text-background font-semibold h-11 text-sm transition-colors"
            }
          >
            {status === "loading"
              ? "Subscribing…"
              : status === "success"
              ? "✓ Subscribed!"
              : "Subscribe"}
          </Button>
        </form>

        {status === "already_subscribed" && (
          <p className="text-xs text-amber-600 font-medium">
            This email is already subscribed to the newsletter.
          </p>
        )}
        {status === "error" && (
          <p className="text-xs text-red-500">
            Something went wrong. Please try again.
          </p>
        )}
        {status !== "error" && status !== "already_subscribed" && (
          <p className="text-xs text-muted-foreground">
            We respect your privacy. Unsubscribe anytime.
          </p>
        )}
      </div>
    </div>
  );
}
```
* **Import Site:** `app/page.tsx:15`, rendered in `YrdlyHomepage` ([app/page.tsx:155](file:///Users/macbook/Development/projects/yrdly/app/page.tsx#L155)).
* **Persistence:** `localStorage.setItem("yrdly_newsletter_popup_dismissed", "true")`.

---

### V4. Font Usage Analysis

#### `grep -rnE "jersey|raleway|font-editorial|font-jersey25|--font-" app components`
```text
app/contact/page.tsx:21:    fontFamily: "var(--font-work-sans), sans-serif",
app/contact/page.tsx:67:              fontFamily: "var(--font-work-sans), sans-serif",
app/contact/page.tsx:181:                  <Link href="/privacy-policy" style={{ color: "var(--green-text)", fontSize: "0.78rem", fontFamily: "var(--font-work-sans), sans-serif", textDecoration: "underline" }}>
app/privacy-policy/page.tsx:144:              fontFamily: "var(--font-work-sans), sans-serif",
app/marketplace/page.tsx:160:              fontFamily: "var(--font-work-sans), sans-serif",
app/terms/page.tsx:108:              fontFamily: "var(--font-work-sans), sans-serif",
app/about/page.tsx:44:              fontFamily: "var(--font-work-sans), sans-serif",
app/learn-more/page.tsx:78:              fontFamily: "var(--font-work-sans), sans-serif",
app/layout.tsx:13:  variable: '--font-fraunces',
app/layout.tsx:20:  variable: '--font-work-sans',
app/layout.tsx:70:  --font-sans: ${GeistSans.variable};
app/layout.tsx:71:  --font-mono: ${GeistMono.variable};
app/events/page.tsx:71:              fontFamily: "var(--font-work-sans), sans-serif",
app/events/page.tsx:118:                            fontFamily: "var(--font-work-sans), sans-serif",
components/footer.tsx:142:                fontFamily: "var(--font-work-sans), sans-serif",
components/footer.tsx:153:                fontFamily: "var(--font-work-sans), sans-serif",
components/footer.tsx:171:        fontFamily: "var(--font-work-sans), sans-serif",
components/header.tsx:96:                fontFamily: "var(--font-work-sans), sans-serif",
components/header.tsx:167:                fontFamily: "var(--font-work-sans), sans-serif",
```

#### `app/layout.tsx` (Full Code):
```tsx
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
```

#### `app/globals.css` (First 20 Lines):
```css
@import url('https://fonts.googleapis.com/css2?family=Jersey+25&family=Raleway:wght@400;600;700;800&family=Work+Sans:wght@300;400;500;600&display=swap');
@import 'tailwindcss';
@import 'tw-animate-css';


@custom-variant dark (&:is(.dark *));

:root {
  --radius: 0.625rem;
  --background: #faf9f6;
  --foreground: #1a1a18;
  --card: #ffffff;
  --card-foreground: #1a1a18;
  --popover: #ffffff;
  --popover-foreground: #1a1a18;
  --primary: #3a8f37;
  --primary-foreground: #ffffff;
  --secondary: #f3f1ec;
  --secondary-foreground: #1a1a18;
  --muted: #f3f1ec;
```

#### Font Usage Verification Summary:
* **Geist Sans:** Used via `GeistSans.variable` in root html.
* **Geist Mono:** Used via `GeistMono.variable` in root html.
* **Fraunces:** Used via `--font-fraunces` and `.font-display` class ([globals.css:391](file:///Users/macbook/Development/projects/yrdly/app/globals.css#L391)) across section headings.
* **Work Sans:** Used via `--font-work-sans` and `.font-body` class ([globals.css:392](file:///Users/macbook/Development/projects/yrdly/app/globals.css#L392)) across body text.
* **Raleway:** **UNUSED**. Defined only in `@import` and `.font-raleway` ([globals.css:171](file:///Users/macbook/Development/projects/yrdly/app/globals.css#L171)), referenced by 0 components.
* **Jersey 25:** **UNUSED**. Defined only in `@import` and `.font-jersey` ([globals.css:170](file:///Users/macbook/Development/projects/yrdly/app/globals.css#L170)), referenced by 0 components.

---

### V5. Top Network Requests & Resource Totals (`lh_home_run1.json`)

#### Top 15 Requests by Transfer Size:
1. `669.2 KiB` | Type: Image | Start: 0.0 ms | URL: `https://images.unsplash.com/photo-1517457373958-b7bdd4587205...`
2. `259.0 KiB` | Type: Image | Start: 0.0 ms | URL: `https://yrdly.ng/owambe.jpeg`
3. `258.4 KiB` | Type: Image | Start: 0.0 ms | URL: `https://yrdly.ng/neighbours.jpeg`
4. `163.9 KiB` | Type: Image | Start: 0.0 ms | URL: `https://yrdly.ng/market.jpeg`
5. `163.0 KiB` | Type: Script | Start: 0.0 ms | URL: `https://pagead2.googlesyndication.com/pagead/managed/js/adsense/m202609150101/show_ads_impl_fy2021.js`
6. `154.6 KiB` | Type: Image | Start: 0.0 ms | URL: `https://yrdly.ng/logo.png`
7. `86.6 KiB` | Type: Image | Start: 0.0 ms | URL: `https://yrdly.ng/events.jpeg`
8. `78.7 KiB` | Type: Image | Start: 0.0 ms | URL: `https://yrdly.ng/explore.jpeg`
9. `70.2 KiB` | Type: Script | Start: 0.0 ms | URL: `https://yrdly.ng/_next/static/chunks/f9bb04cd4e212a67.js`
10. `57.6 KiB` | Type: Font | Start: 0.0 ms | URL: `https://yrdly.ng/_next/static/media/Geist_Variable-s.p.f19e4721.woff2`
11. `57.3 KiB` | Type: Font | Start: 0.0 ms | URL: `https://yrdly.ng/_next/static/media/GeistMono_Variable.p.73882635.woff2`
12. `56.2 KiB` | Type: Script | Start: 0.0 ms | URL: `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4168167607384837`
13. `52.5 KiB` | Type: Image | Start: 0.0 ms | URL: `https://yrdly.ng/sell-item.jpeg`
14. `51.5 KiB` | Type: Script | Start: 0.0 ms | URL: `https://yrdly.ng/_next/static/chunks/591d77e1fcb9767f.js`
15. `49.9 KiB` | Type: Font | Start: 0.0 ms | URL: `https://yrdly.ng/_next/static/media/7ddd198311ba7843-s.p.d56bf40f.woff2`

#### Byte Totals by Resource Type:
* **Total:** 71 requests, **2,661.2 KiB** (2.66 MB)
* **Image:** 13 requests, **1,723.0 KiB** (1.72 MB)
* **Script:** 22 requests, **505.1 KiB**
* **Font:** 6 requests, **295.3 KiB**
* **Other:** 22 requests, **87.9 KiB**
* **Stylesheet:** 3 requests, **26.1 KiB**
* **Document:** 5 requests, **23.8 KiB**
* **Third-Party:** 18 requests, **1,004.6 KiB** (1.00 MB)

---

### V6. Large Asset References in Codebase

* `newsletter-bg.png` (1.1 MB): **unreferenced**
* `pexels-e.jpg` (4.9 MB): **unreferenced**
* `pexels-k.jpg` (1.6 MB): **unreferenced**
* `hero-image.png` (925 KB): Referenced in [app/api/events/route.ts:96](file:///Users/macbook/Development/projects/yrdly/app/api/events/route.ts#L96) and [app/events/page.tsx:154](file:///Users/macbook/Development/projects/yrdly/app/events/page.tsx#L154) (Route: `/events`)
* `hero-images.jpg` (186 KB): **unreferenced**
* `discover1.png` (987 KB): **unreferenced**
* `discover2.png` (902 KB): **unreferenced**
* `discover3.png` (861 KB): **unreferenced**
* `about.png` (896 KB): **unreferenced**
* `clothes.webp` (426 KB): **unreferenced**
* `hero-community.jpg` (392 KB): Referenced in [app/marketplace/page.tsx:94](file:///Users/macbook/Development/projects/yrdly/app/marketplace/page.tsx#L94) and [app/about/page.tsx:162](file:///Users/macbook/Development/projects/yrdly/app/about/page.tsx#L162) (Routes: `/marketplace`, `/about`)

---

### V7. `logo.png` References
```text
./app/auth/callback/page.tsx:94: <img src="/logo.png" alt="Yrdly Logo" ... />
./app/auth/callback/page.tsx:134: <img src="/logo.png" alt="Yrdly Logo" ... />
./components/header.tsx:70: src="/logo.png"
./components/mobile-nav.tsx:41: <img src="/logo.png" alt="Yrdly Logo" ... />
```
* **Constraint Compliance:** `public/logo.png` is preserved and will NOT be renamed, replaced, or deleted.

---

### V8. All Image Tags in Codebase (`app/` and `components/`)

1. [app/about/page.tsx:27](file:///Users/macbook/Development/projects/yrdly/app/about/page.tsx#L27) | `<Image>` | Above Fold
2. [app/about/page.tsx:98](file:///Users/macbook/Development/projects/yrdly/app/about/page.tsx#L98) | `<Image>` (`/images/community-banner.jpg`) | Above Fold
3. [app/about/page.tsx:162](file:///Users/macbook/Development/projects/yrdly/app/about/page.tsx#L162) | `<Image>` (`/images/hero-community.jpg`) | Above Fold
4. [app/auth/callback/page.tsx:94](file:///Users/macbook/Development/projects/yrdly/app/auth/callback/page.tsx#L94) | `<img>` (`/logo.png`) | Above Fold
5. [app/auth/callback/page.tsx:134](file:///Users/macbook/Development/projects/yrdly/app/auth/callback/page.tsx#L134) | `<img>` (`/logo.png`) | Above Fold
6. [app/events/[id]/page.tsx:103](file:///Users/macbook/Development/projects/yrdly/app/events/[id]/page.tsx#L103) | `<Image>` | Above Fold
7. [app/events/[id]/page.tsx:116](file:///Users/macbook/Development/projects/yrdly/app/events/[id]/page.tsx#L116) | `<Image>` | Above Fold
8. [app/events/page.tsx:153](file:///Users/macbook/Development/projects/yrdly/app/events/page.tsx#L153) | `<Image>` | Above Fold
9. [app/learn-more/page.tsx:189](file:///Users/macbook/Development/projects/yrdly/app/learn-more/page.tsx#L189) | `<Image>` (`/images/trust.jpg`) | Below Fold
10. [app/marketplace/page.tsx:149](file:///Users/macbook/Development/projects/yrdly/app/marketplace/page.tsx#L149) | `<Image>` (`/images/market.jpg`) | Above Fold
11. [app/marketplace/page.tsx:238](file:///Users/macbook/Development/projects/yrdly/app/marketplace/page.tsx#L238) | `<Image>` | Below Fold
12. [app/page.tsx:29](file:///Users/macbook/Development/projects/yrdly/app/page.tsx#L29) | `<img>` (`/owambe.jpeg`, `/market.jpeg`, `/neighbours.jpeg`) | Above Fold
13. [app/page.tsx:63](file:///Users/macbook/Development/projects/yrdly/app/page.tsx#L63) | `<img>` (`/sell-item.jpeg`, `/explore.jpeg`, `/events.jpeg`) | Above Fold
14. [app/page.tsx:161](file:///Users/macbook/Development/projects/yrdly/app/page.tsx#L161) | `<img>` (`https://images.unsplash...`) | Above Fold
15. [app/scanner/page.tsx:193](file:///Users/macbook/Development/projects/yrdly/app/scanner/page.tsx#L193) | `<Image>` | Below Fold
16. [components/header.tsx:69](file:///Users/macbook/Development/projects/yrdly/components/header.tsx#L69) | `<img>` (`/logo.png`) | Above Fold
17. [components/mobile-nav.tsx:41](file:///Users/macbook/Development/projects/yrdly/components/mobile-nav.tsx#L41) | `<img>` (`/logo.png`) | Above Fold
18. [components/ticket-confirmation-modal.tsx:163](file:///Users/macbook/Development/projects/yrdly/components/ticket-confirmation-modal.tsx#L163) | `<img>` (`qrCode`) | Above Fold

---

## PER-FILE BATCH IMPLEMENTATION PLAN

### BATCH A: Foundation, Images, Fonts, Layout (`next.config.mjs`, `app/globals.css`, `app/layout.tsx`, `app/page.tsx`)

#### A1. [MODIFY] [`next.config.mjs`](file:///Users/macbook/Development/projects/yrdly/next.config.mjs)
* **Exact Change:**
  Remove `images.unoptimized: true`. Add `formats: ['image/avif', 'image/webp']` and `minimumCacheTTL: 31536000`. Add `remotePatterns` for `images.unsplash.com` if needed as fallback.
  ```javascript
  /** @type {import('next').NextConfig} */
  const nextConfig = {
    images: {
      formats: ['image/avif', 'image/webp'],
      minimumCacheTTL: 31536000,
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'images.unsplash.com',
        },
      ],
    },
  }

  export default nextConfig
  ```
  *(Note: `typescript.ignoreBuildErrors: true` is flagged as out of scope and left untouched).*
* **Risk:** Image loading errors if remote origins are omitted. Low risk.
* **Rollback:** `git revert` Batch A commit.

#### A2. [MODIFY] [`app/globals.css`](file:///Users/macbook/Development/projects/yrdly/app/globals.css)
* **Exact Change:**
  Delete line 1 `@import url('https://fonts.googleapis.com/css2?family=Jersey+25&family=Raleway:wght@400;600;700;800&family=Work+Sans:wght@300;400;500;600&display=swap');`.
  Drop unused font helper classes (`.font-jersey`, `.font-raleway`). Keep `.font-display` and `.font-body`. Remove duplicate inline `font-family` definitions for `Work Sans`.
* **Risk:** Missing font fallback styles if variables are unset. Low risk.
* **Rollback:** `git revert` Batch A commit.

#### A3. [MODIFY] [`app/layout.tsx`](file:///Users/macbook/Development/projects/yrdly/app/layout.tsx)
* **Exact Change:**
  1. Remove `maximumScale: 1` from `viewport` export ([app/layout.tsx:47](file:///Users/macbook/Development/projects/yrdly/app/layout.tsx#L47)).
  2. Implement AdSense Decision A: Remove the heavy AdSense `<Script strategy="afterInteractive" src="https://pagead2.googlesyndication.com..." />` tag ([app/layout.tsx:60-65](file:///Users/macbook/Development/projects/yrdly/app/layout.tsx#L60-L65)) and replace it with `<meta name="google-adsense-account" content="ca-pub-4168167607384837">` inside `<head>`.
  3. Keep `Fraunces` and `Work_Sans` loaders with `display: 'swap'` and `subsets: ['latin']`.
* **Risk:** AdSense domain verification notice if meta tag is placed outside `<head>`. Low risk.
* **Rollback:** `git revert` Batch A commit.

#### A4. [MODIFY] [`app/page.tsx`](file:///Users/macbook/Development/projects/yrdly/app/page.tsx)
* **Exact Change:**
  1. Self-host hero image: Download Unsplash photo into `public/images/hero-park.jpg` (resized long side <= 2000px, quality compressed).
  2. Replace raw `<img>` at [app/page.tsx:161](file:///Users/macbook/Development/projects/yrdly/app/page.tsx#L161) with `<Image src="/images/hero-park.jpg" alt="People in a park" fill priority sizes="100vw" quality={60} style={{ objectFit: 'cover' }} />`.
  3. Replace feature/step raw `<img>` tags ([app/page.tsx:29, 63](file:///Users/macbook/Development/projects/yrdly/app/page.tsx#L29)) with `<Image width={400} height={300} sizes="(max-width: 768px) 100vw, 33vw" quality={75} style={{ objectFit: 'cover' }} />`.
* **Risk:** Layout shift if aspect-ratio container is missing relative positioning. Low risk.
* **Rollback:** `git revert` Batch A commit.

---

### BATCH B: Header, Mobile Nav, Modals (`components/header.tsx`, `components/mobile-nav.tsx`, `components/newsletter-popup.tsx`, `components/cookie-consent.tsx`)

#### B1. [MODIFY] [`components/header.tsx`](file:///Users/macbook/Development/projects/yrdly/components/header.tsx) & [`components/mobile-nav.tsx`](file:///Users/macbook/Development/projects/yrdly/components/mobile-nav.tsx)
* **Exact Change:**
  1. Convert raw `<img>` logo tags ([components/header.tsx:69](file:///Users/macbook/Development/projects/yrdly/components/header.tsx#L69) and [components/mobile-nav.tsx:41](file:///Users/macbook/Development/projects/yrdly/components/mobile-nav.tsx#L41)) to `<Image src="/logo.png" alt="Yrdly Logo" width={64} height={64} priority />` (header) and `width={48} height={48}` (mobile nav).
  2. Update non-descriptive "Learn More" links to explicit text:
     * `header.tsx:112`: Change `<Link href="/learn-more">Learn More</Link>` -> `<Link href="/learn-more" aria-label="Learn more about Yrdly neighborhood network">Learn More</Link>`
     * `mobile-nav.tsx:78`: Change `<Link href="/learn-more">Learn More</Link>` -> `<Link href="/learn-more" aria-label="Learn more about Yrdly neighborhood network">Learn More</Link>`
* **Risk:** Logo scaling distortion if width/height aspect ratio mismatches CSS class. Low risk.
* **Rollback:** `git revert` Batch B commit.

#### B2. [MODIFY] [`components/newsletter-popup.tsx`](file:///Users/macbook/Development/projects/yrdly/components/newsletter-popup.tsx)
* **Proposal for Initial Bundle Reduction:**
  In `app/page.tsx`, dynamically import `NewsletterPopup` using Next.js `next/dynamic` with `ssr: false`:
  ```tsx
  const NewsletterPopup = dynamic(
    () => import('@/components/newsletter-popup').then((mod) => mod.NewsletterPopup),
    { ssr: false }
  );
  ```
  This defers loading Radix UI, Lucide Mail/X icons, and form code out of the critical initial JavaScript bundle without modifying component timing or trigger frequency.
* **Alternative Trigger Proposals (For Future Consideration - Not Implementing Yet):**
  * *Option 1: Scroll Depth Trigger.* Mount popup only after user scrolls > 50% of homepage. Tradeoff: Reduces early impressions; eliminates hydration disruption.
  * *Option 2: Post-Cookie Consent Trigger.* Fire 3s timer only AFTER user clicks "Accept" on cookie banner. Tradeoff: Prevents stacked modals; delays user signup flow.
* **Risk:** Dynamic import delay when popup timer fires. Low risk.
* **Rollback:** `git revert` Batch B commit.

#### B3. [CONDITIONAL] [`components/cookie-consent.tsx`](file:///Users/macbook/Development/projects/yrdly/components/cookie-consent.tsx)
* **Condition:** Only modify if post-Batch A Lighthouse runs reveal the cookie banner is still the LCP element.
* **Planned Options:**
  * Option A: Render static banner container in server HTML with `display: block` and hide via client JS if cookie exists.
  * Option B: Reduce paint prominence by removing `fixed bottom-0` full-width background container and using a minimal corner toast.
* **Risk:** Medium risk if cookie read fails. Low risk.

---

### BATCH C: Footer, Vitals, Dependencies (`components/footer.tsx`, `app/layout.tsx`, `package.json`, `pnpm-lock.yaml`)

#### C1. [MODIFY] [`components/footer.tsx`](file:///Users/macbook/Development/projects/yrdly/components/footer.tsx)
* **Exact Change:**
  Fix color-contrast failures using footer-specific utility classes (e.g., `text-neutral-400` / `text-neutral-200` instead of `var(--fg-subtle)` / `text-muted-foreground`).
* **Contrast Ratio Targets (>= 4.5:1):**

| Footer Element | Current Class / Style | Current Contrast Ratio | Proposed Class / Style | Target Contrast Ratio |
| :--- | :--- | :--- | :--- | :--- |
| Footer Description | `text-muted-foreground` | ~3.2:1 | `text-neutral-300` | **7.1:1** |
| Sub-heading Labels | `style="color: var(--fg-subtle);"` | ~3.4:1 | `text-neutral-300` | **7.1:1** |
| Navigation Links | `style="color: var(--fg-subtle);"` | ~3.4:1 | `text-neutral-200` | **9.2:1** |

* **Risk:** Visual theme deviation if footer color differs slightly from muted global tokens. Low risk.
* **Rollback:** `git revert` Batch C commit.

#### C2. [MODIFY] [`package.json`](file:///Users/macbook/Development/projects/yrdly/package.json) & [`app/layout.tsx`](file:///Users/macbook/Development/projects/yrdly/app/layout.tsx)
* **Exact Change:**
  1. Add `@vercel/speed-insights` dependency to `package.json`.
  2. Import and render `<SpeedInsights />` from `@vercel/speed-insights/next` in `app/layout.tsx`.
* **Lockfile Diff Structure:**
  `pnpm-lock.yaml` will include exact `@vercel/speed-insights` entry.
* **Risk:** Negligible.
* **Rollback:** `git revert` Batch C commit.

---

## MEASUREMENT PLAN

For each batch completion:
1. **TypeScript Verification:** Execute full `tsc --noEmit` before and after batch application (note: `.next/types/app/layout.ts` present during execution).
2. **Build Route Table Verification:** Execute `pnpm run build` before and after batch application; verify route static/dynamic output table.
3. **Lighthouse Audit Comparison:**
   Repeat V0 Lighthouse mobile simulated performance runs (3x runs on `/`, `/about`, `/contact`). Compare:
   * **LCP (ms)**
   * **FCP (ms)**
   * **Total Byte Weight (KB/MB)**
   * **Total Image Transfer Bytes (KB/MB)**

---

## HARD SCOPE BOUNDARIES

* **DO NOT TOUCH:** `app/api/**`, `app/events/[id]/**`, `app/scanner/**`, Supabase clients, `HeroLoginForm` logic, newsletter API handler (`app/api/newsletter/route.ts`).
* **ASSET CONSTRAINTS:** No deletions or renames of existing `public/` files (including `public/logo.png`).
* **INFRASTRUCTURE:** No `vercel.json` creation or modification. No Cloudflare configuration changes.

---

## WORKING TREE STATUS (`git status`)

```text
On branch main
Your branch is up to date with 'origin/main'.

Untracked files:
  (use "git add <file>..." to include in what will be committed)
	working.md

nothing added to commit but untracked files present (use "git add" to track)
```

---

*Phase 1a completed. `working.md` written. Awaiting user review and explicit approval before starting Batch A execution.*
