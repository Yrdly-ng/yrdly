# YRDLY Lighthouse preview audit — 28 November 2026

## Scope and method

- Target: YRDLY public marketing homepage, current PR preview for `ed9146d75e498b608908512f4c2b2b7f49b54f72`.
- Preview: `https://yrdly-e30rb6l22-calebs-projects-98954387.vercel.app/`
- Tool: Lighthouse 13.4.0, simulated mobile and desktop runs.
- Synthetic lab measurements only. They are not Chrome UX Report field data or real-user 75th-percentile Core Web Vitals. Scores and timings vary between runs.
- Authenticated app preview was not measured: it is behind Vercel Deployment Protection. A protected app route fetch returned the app shell, but did not execute an authenticated browser session.

## Latest measured marketing preview

| Metric | Mobile | Desktop |
|---|---:|---:|
| Lighthouse performance | 80–86 | 97 |
| Lighthouse accessibility | 100 | 100 |
| Lighthouse best practices | 100 | 100 |
| First Contentful Paint | 1.3 s | 0.8 s |
| Largest Contentful Paint | 3.6 s | 1.1 s |
| Total Blocking Time | 200–400 ms | 0 ms |
| Cumulative Layout Shift | 0 | 0 |
| Total transfer size | about 1,126 KiB | not recorded in this run |

Repeated runs on the current and immediately preceding previews varied from mobile performance 80 to 88 and LCP 2.8 to 3.6 s; the latest current-preview run was performance 80, LCP 3.6 s, TBT 400 ms. Treat the higher LCP and TBT readings as the conservative current baseline. Lighthouse variability is material, so compare repeated runs on the same deployment and device profile.

## Current LCP diagnosis

- The mobile LCP element is the homepage hero `h1` (“Good things. Good people. Closer than you think.”), not the editorial image.
- Latest breakdown: time to first byte about 33 ms; element render delay about 297 ms. The network dependency trace shows a locally served font file completing around 367 ms after navigation start.
- This points toward font/render scheduling and mobile main-thread work as the next profiling targets. Do not change the headline typography or font family without checking visual parity.
- The hero editorial image is not the LCP element in the mobile trace. Lighthouse still estimates about 26 KiB image savings by increasing compression, but this is a secondary optimization.

## Third-party and JavaScript observations

- Lighthouse estimates about 289 KiB of unused JavaScript on mobile.
- The largest reported unused resources include Google AdSense and Google Ads measurement scripts, alongside app-owned chunks.
- Paid-ad and measurement scripts were intentionally left unchanged in this pass. Any future loading-strategy change needs a separate consent, attribution, and campaign-measurement review.
- Render-blocking CSS savings are estimated around 140 ms. This is lower priority than validating the hero's actual LCP and app-owned JavaScript.

## Changes made in this pass

- Replaced the 1280×1280 raw header logo request (displayed at roughly 30–42 px) with Next.js Image optimization.
- Corrected discovery-card `sizes` hints to match their rendered layout: two-column marketplace cards, compact business thumbnails, and narrow event thumbnails.
- Deferred the events API request until the Events tab is selected, avoiding an unnecessary request during the initial marketplace homepage render.
- Added project-specific Modern Web Guidance standards and scanner workflow.

The earlier comparison showed transfer size falling from about 1,323 KiB to about 1,126 KiB. This is a synthetic preview comparison, not a guaranteed per-user saving.

## Verification limits and remaining work

- Accessibility and best-practices category scores were 100 in these synthetic runs; this does not replace manual keyboard, screen-reader, zoom, and color-contrast checks.
- The app visual-review workflow now passes with 20 Playwright tests and 326 evidence files. Those tests cover authenticated responsive screens and key interactions, but do not yet exercise the Google Maps route.
- The isolated QA environment does not currently receive a Google Maps API key in its generated `.env.qa`; therefore a real map-tile/API smoke test cannot be truthfully marked passed from that QA run. The provider is scoped to the map route in code, but runtime map rendering remains unverified.
- No production deployment or production data change was made.

## SEO and standards follow-through

- Aligned the page title, description, Open Graph and Twitter metadata with the YRDLY name and Nigerian/British English copy.
- Added server-rendered Schema.org `Organization` and `WebSite` JSON-LD using verified brand, canonical URL, logo and language information.
- The official Modern Web Guidance legacy scan completed with **0 findings across 137 marketing-site files** (52 deterministic rules across 38 guides).
- Marketing verification passed, including frozen-lockfile install, TypeScript, attribution tests, lint, production build, and the Google guidance legacy scan.


## Live production spot-check (currently deployed site)

A separate set of mobile Lighthouse runs against `https://yrdly.ng/` was taken as a baseline only; no production changes were made. Across three runs, performance varied from 88 to 93, FCP from 1.1 to 1.7s, LCP from 3.0 to 4.1s, and TBT from 37 to 41ms; CLS remained 0. In the latest run (2026-11-27 23:54:05 UTC), performance was 88, accessibility 100, Best Practices 77, FCP 1.4s, LCP 3.8s, TBT 37ms, and CLS 0. Root-document response time varied materially (about 755–1,391ms).

The production audit also reported:
- 403 responses for some Next.js RSC prefetches to `/terms` and `/privacy-policy`. These may involve edge/security handling; they need a controlled browser/network investigation before changing Cloudflare rules.
- A Cloudflare challenge-platform deprecated API warning. This is emitted by the edge challenge script, not YRDLY application code; do not alter challenge/security settings based on Lighthouse alone.
- About 239 KiB of potential image-delivery savings, including the production `/logo.png` asset (1280×1280, about 158 KiB, displayed around 53×53 px) and some discovery images. The current PR already switches the header logo to Next.js Image and supplies responsive discovery image sizing; re-audit the preview after the changes rather than treating the older production finding as proof that the PR fix failed.
- The live production page is not the PR preview. These findings are a baseline for a later controlled comparison after an explicitly approved production release.

Paid-ad and measurement scripts remain untouched. No Cloudflare security configuration was changed.
