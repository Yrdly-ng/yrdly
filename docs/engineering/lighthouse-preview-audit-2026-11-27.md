# YRDLY Lighthouse preview audit — 27 November 2026

## Scope and method

- Target: YRDLY public marketing homepage, on the latest available PR preview.
- Tool: Lighthouse 13.4.0, simulated mobile and desktop runs.
- This is a synthetic preview audit, not Chrome UX Report field data or a real-user 75th-percentile Core Web Vitals measurement. Scores and timings vary between runs.
- Authenticated web-app preview was not measured: Vercel Deployment Protection redirected the audit to Vercel SSO. The resulting sign-in-page metrics are not YRDLY app metrics and are intentionally excluded.

## Latest measured marketing preview

Preview: `https://yrdly-582qqg5sw-calebs-projects-98954387.vercel.app/`

| Metric | Mobile | Desktop |
|---|---:|---:|
| Lighthouse performance | 83 | 98 |
| Lighthouse accessibility | 100 | 100 |
| Lighthouse best practices | 100 | 100 |
| First Contentful Paint | 1.3 s | 0.4 s |
| Largest Contentful Paint | 3.7 s | 1.0 s |
| Total Blocking Time | 290 ms | 70 ms |
| Cumulative Layout Shift | 0 | 0 |
| Total transfer size | 1,126 KiB | 1,431 KiB |

## Changes made in this pass

- Replaced the 1280×1280 raw header logo request (displayed at roughly 30–42 px) with Next.js Image optimization.
- Corrected discovery-card `sizes` hints to match their rendered layout: two-column marketplace cards, compact business thumbnails, and narrow event thumbnails.
- Deferred the events API request until the Events tab is selected, avoiding an unnecessary request during the initial marketplace homepage render.
- Added this repeatable audit record so later runs can be compared against the same metrics.

The initial mobile run before the logo/card sizing changes transferred about 1,323 KiB; the later run transferred about 1,126 KiB (roughly 197 KiB less). This is a synthetic comparison, not a guaranteed user-level saving.

## Remaining performance work

- Mobile LCP remains about 3.7 s, above the 2.5 s Core Web Vitals good threshold.
- Mobile TBT remains about 290 ms; the trace attributes substantial script work to third-party scripts and app bundles.
- Lighthouse estimates about 290 KiB of unused JavaScript. Third-party ad and measurement integrations were left unchanged in this pass; they need a separate consent/attribution-safe review before any loading-strategy change.
- Continue profiling the hero's mobile LCP and app-owned JavaScript before making further structural changes.

## Verification limits

- Accessibility and best-practices category scores were 100 in these synthetic runs; that does not replace manual keyboard, screen-reader, zoom, and color-contrast checks.
- Authenticated app route tests remain blocked by the isolated visual-review job failing before runner assignment. Static checks and Playwright test discovery pass, but authenticated browser assertions have not run.
- No production deployment or production data change was made.
