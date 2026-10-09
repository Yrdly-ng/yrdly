# Yrdly Public Website

## Product context

Yrdly is a local community network and marketplace for Nigerian neighbourhoods. This repository is the public-facing website for the wider Yrdly product. The authenticated product lives in the separate `yrdly-app` project, and the native client lives in `yrdly-mobile`; each has its own Git history, dependencies, and Supabase-related code. The public site links visitors to `https://app.yrdly.ng` for product use.

The site explains the product and supports visitor inquiries, newsletter signups, event discovery/registration, and marketing content. It is not the main authenticated social or marketplace application.

## Stack and commands

- Next.js App Router, React, TypeScript, Tailwind CSS, and Radix-based UI components.
- Supabase client helpers are in `lib/`; Resend is used for email workflows.
- Run commands from this directory. Common commands: `pnpm dev`, `pnpm build`, and `pnpm lint`.
- Follow the package manifest and nearby files for the current versions and scripts; the package name is still a starter-project name.

## Main areas

- `app/page.tsx`: homepage, product overview, links into the app, and newsletter interaction.
- `app/about`, `app/learn-more`, `app/faq`, `app/trust-and-safety`, and the policy routes: public company, product, and legal information.
- `app/marketplace`, `app/events`, and `app/blog`: public previews and editorial/event content. Event detail pages are under `app/events/[id]`; blog content currently includes `app/blog/articles-data.ts` and slug routes.
- `app/api`: contact form, newsletter, public event listing/registration, and event scanning handlers.
- `components/`: shared site chrome, forms, modals, install prompts, and UI primitives. `lib/` and `hooks/` contain Supabase, email, and form helpers.
- `public/`: images, logos, email assets, and static files.

## Product behavior and boundaries

- Keep marketing and policy copy aligned with the product, but verify claims against the current web and mobile implementations before describing payments, verification, safety, or availability.
- Public event registration and ticket scanning are separate from the authenticated product's event screens. Check the corresponding API route and product flow before changing ticket behavior.
- Newsletter and contact submissions call this site's API routes. Preserve server-side validation and avoid exposing provider credentials in browser code.
- The homepage and public marketplace are primarily informational; listing creation and account workflows route to the main app.

## Working guidance

- Use the existing App Router structure and shared components. Keep page-specific presentation in the relevant route and reusable UI in `components/`.
- Do not treat the sibling projects as one package or one Git repository. If a change affects shared product behavior, inspect the relevant sibling app and its own history where available.
- Read the current route, helper, and API implementation before changing behavior. Some older notes or marketing text may not reflect current implementation.
- Keep secrets in local environment files; document new required variables without recording values. Never put service-role or email provider credentials in client code.
- For UI work, preserve responsive behavior and the site's existing Yrdly colors, typography, and shared navigation/footer patterns.

## Visitor journeys and request flows

### Discover Yrdly and enter the product

The homepage introduces the neighbourhood network, social feed, events, marketplace, and mobile/PWA entry points. The public marketplace is a preview; its calls to action point to `app.yrdly.ng`. The authenticated social and marketplace experience belongs to `yrdly-app` and `yrdly-mobile`.

### Read about an event and register

1. `app/events/page.tsx` requests `GET /api/events` and renders public event cards.
2. `app/api/events/route.ts` reads published public events from the main app's Supabase project using `NEXT_PUBLIC_APP_SUPABASE_URL` and `NEXT_PUBLIC_APP_SUPABASE_ANON_KEY`. It reshapes ticket tiers/date/location for the public page and provides a link to `/events/[id]` in the app.
3. The public event detail and registration UI submit email-based registrations to `POST /api/events/register-v2`. This handler validates input, rate limits by IP and event, checks event capacity and duplicate email, generates a ticket ID and QR code, persists a ticket through `lib/supabase-client.ts`, then sends the ticket by Resend.
4. `app/scanner/page.tsx` is a staff-facing scanner. It submits scanned or typed IDs to `POST /api/events/scan-v2`.

**Important boundary:** public event listing reads live normalized events from the main product's Supabase tables, while `register-v2` also looks up the event in this repo's `lib/data/events.json`. Do not assume every event returned by `/api/events` can be registered through this simplified handler. This public email/QR path is distinct from the main app's authenticated, paid ticket flow. Trace both page and handler before changing ticket behavior.

### Newsletter and contact

- Newsletter forms call `POST /api/newsletter`. The route validates email/source, attempts a Supabase-backed IP rate-limit check, sends a welcome message, and adds the address to the Resend audience. The homepage's local-storage list is a duplicate-submit UX aid, not the authoritative subscriber list.
- Contact forms call `POST /api/contact`. The server validates name/email/message and sends a support email with `lib/resend-email.ts`. Email delivery failures are logged and may not fail the form response.
- Client-side validation is for quick feedback; keep server validation authoritative and do not expose provider credentials in browser code.

## Route map and ownership

| Area | Entry points | Responsibility |
|---|---|---|
| Public shell | `app/layout.tsx`, `components/header.tsx`, `components/footer.tsx`, `components/mobile-nav.tsx` | Metadata, global styling, navigation, footer |
| Homepage | `app/page.tsx` | Product story, app entry points, newsletter UI |
| Product education | `app/about`, `app/learn-more`, `app/faq`, `app/trust-and-safety` | Public company/product/safety explanation |
| Marketplace preview | `app/marketplace/page.tsx` | Public listing preview; not the seller listing manager |
| Events | `app/events/page.tsx`, `app/events/[id]/page.tsx`, `components/event-registration-modal.tsx` | Public event detail and registration UI |
| Event APIs | `app/api/events/*` | Event reads, lightweight registration/ticket generation, QR scan |
| Editorial/legal | `app/blog/*`, `app/terms`, `app/privacy-policy`, `app/cookie-policy` | Articles and public legal pages |
| Contact | `app/contact`, `components/contact-form.tsx`, `app/api/contact/route.ts` | Visitor inquiry and support email |
| Newsletter | `components/newsletter-signup.tsx`, `components/newsletter-popup.tsx`, `app/api/newsletter/route.ts` | Subscription UX and email/audience calls |

`lib/data/*.json` and `lib/supabase-client.ts` include fallback/legacy event, ticket, and rate-limit helpers. Before changing data ownership, inspect the specific route, helper, and environment configuration together.

## How to work on a public feature

1. Decide whether the task is marketing copy, public web functionality, or signed-in product behavior. The last category usually belongs in the product and/or mobile repository as well.
2. Follow a control from its component through its fetch call to the matching `app/api` route and helper. Check how the UI handles success and error responses.
3. For events, compare live event reads, registration, and scanning; those are separate handlers and can use different data sources.
4. For product claims, verify current app behavior before promising payment protection, identity verification, moderation, safety, or availability.
5. Run website commands from this directory. Sibling projects have separate package manifests, environment variables, and Git histories.
