# YRDLY marketing redesign

## Scope

This work is exclusively for `yrdly.ng` in the `yrdly` repository, on
`yrdly-astra-design`. The marketing website creates curiosity; `app.yrdly.ng`
delivers the full product. The user subsequently authorized a Vercel preview
deployment. No app or mobile source changes, production deployments, pushes,
merges, schema changes, or access-policy changes are part of this redesign.

The initial brief included product-app issues. The subsequent clarification
supersedes that scope: comments, sold-item actions, group requests, app profiles,
and native Android screens remain outside this marketing-site change.

## Audit

- A full-screen stock-photo login hero asked for commitment before explaining the
  product. The homepage did not expose its existing live marketplace integration.
- Repeated outlined feature cards, phone frames, pills, gradients and large
  installation blocks obscured the actual discovery experience.
- Estate-specific language narrowed the nationwide proposition. Several older
  pages made unsupported verification, payment and messaging promises.
- Public marketplace listings already existed; the events API already exposed
  published, public events. Anonymous business reads are also allowed by the
  existing project, and the new directory selects active businesses only.
- The old event detail expected registration counts and contact fields absent
  from the current API. Its registration endpoint uses a separate legacy event
  catalogue. Live product events now lead to their existing web-app booking flow;
  legacy registration/scanner endpoints and components remain untouched.
- Mobile navigation concealed authentication behind the hero. Contact form labels
  lacked explicit associations. Viewport configuration disabled pinch zoom.
- The existing web app already maps its production project to the activated
  `api.yrdly.ng` domain; marketing authentication lacked that mapping.

## Design

Warm paper, dark ink, restrained YRDLY green and a small lime editorial note.
Work Sans handles UI and body text; Fraunces is reserved for expressive moments.
Existing photographs were compressed to WebP, without fabricating local scenes.
Live remote previews use responsive image optimisation and a quiet failure state.

The homepage moves from an asymmetric introduction into real public discovery,
then varies its rhythm through local-business storytelling, events, nationwide
community identity, concise install instructions, journal articles and newsletter.
There are no invented listings, reviews, counts or city-specific claims.

Marketplace cards prioritise the image, title, place and price. Businesses use
compact rows. Event cards prioritise the date and venue and become compact media
rows on phones. Loading, empty and unavailable states remain distinct.

## Integrations and navigation

- Public discovery uses anonymous keys and the existing RLS boundary.
- Marketplace and business previews deep-link to their existing product pages.
- State/FCT and local-government-area filters are derived from the currently
  loaded public previews. They are not a comprehensive location directory or a
  claim to show every item in an area. No geolocation is requested.
- `/events/:id` fetches the requested public event directly through the existing
  events endpoint, without relying on the first 20 results.
- `/login` and `/signup` reuse the existing marketing authentication form,
  callback and session cookie. No second auth implementation was introduced.
- The production OAuth client uses the already activated YRDLY API domain;
  development and other project URLs remain unchanged.
- Contact, newsletter, legal pages, journal routes and install instructions remain
  accessible. Public previews never require authentication.

## Verification

- `pnpm exec tsc --noEmit`
- `pnpm exec vitest run tests/public-discovery.test.ts`
- `pnpm build`
- `node qa-scripts/marketing-design.cjs`

The browser runner uses localhost only. It checks all five requested sizes,
public directories, authentication presentation, navigation, filters, FAQ,
newsletter/contact feedback, event details and errors, dark mode and reduced
motion. Form submissions and event fixtures are intercepted in the test browser;
they are not production data. Screenshots and a JSON report are written to
`/private/tmp/yrdly-astra-qa/final` by default.

The repository's existing `pnpm lint` script invokes `next lint`, which was removed
in Next.js 16. That command fails before linting; this unrelated tooling migration
has not been bundled into the design change.

Full Google account consent, real sign-in, payment and production form delivery
are not exercised by the local UI runner.

Final TypeScript, four focused tests and the production build passed. The browser
run completed the public routes at 390px and 430px and part of the 768px review
without reported overflow or browser errors. The user explicitly requested
skipping the remaining Chrome screenshots and proceeding to the preview.
Authentication on the preview is not part of the review: the existing shared
YRDLY-domain cookie cannot be shared from a vercel.app hostname. The user asked
to leave that flow unchanged for this design preview.

## Review preview

Vercel preview (ready):
https://yrdly-ds5u1f1j7-calebs-projects-98954387.vercel.app

Built from `yrdly-astra-design` without a Git push or merge. Production was not
changed. The deployment supplies `NEXT_PUBLIC_APP_SUPABASE_URL=https://api.yrdly.ng`
at build and runtime because the existing preview environment omitted that URL.
The deployed homepage and events endpoint both returned HTTP 200.

## Link and completion pass

- Audited all 20 linked marketing pages, their fragment targets, 17 app
  destinations, and every published event detail endpoint. The audit uses HTTP
  and DOM parsing, without Chrome or screenshots.
- Added the missing `/unsubscribe` support route referenced by welcome emails.
  It explicitly requests removal through support; it does not pretend to perform
  an automatic unsubscribe.
- Replaced the obsolete launch page and repaired its skip-to-content target.
- Added useful 404/error recovery, discovery retries, distinct data-source errors,
  search reset actions, and past-event labels. Upcoming events appear first.
- Contact delivery and newsletter persistence failures now return errors instead
  of false success. Requests time out with recoverable feedback.
- All 18 focused tests and the independent TypeScript check passed. Form tests
  mock delivery; no messages were sent or subscriber data created by QA.
- The updated Vercel production build passed for the preview target. The deployed
  20-page/17-app-link crawl has no broken destinations or fragment targets; both
  missing-page and missing-article routes return 404 with recovery navigation.
- Resend sending DKIM/SPF records are verified and an audience exists. Its
  custom tracking CNAME is failed and tracking CAA is pending, with click
  tracking enabled. The user explicitly requested leaving these shared email
  settings unchanged. Review this external configuration before a production
  release; no DNS or email-provider settings were changed here.
