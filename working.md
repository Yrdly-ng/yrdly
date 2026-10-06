# Working Plan: Phase 3.1 — Trust & Publisher Signals

## 1. Exact Facts & Proven Metadata

- **Company Name**: Yrdly Technologies Limited
- **CAC (RC) Number**: 9267059
- **Founder Byline**: Victor Salami & Boluwatife lasisi, Founder & Product Lead
- **Registered Location**: Oyo State, Nigeria (Registered address omitted per "omit" instruction)
- **Public Contact Email**: `support@yrdly.ng` ONLY (Phone `09166368783` retained on `/contact`)
- **Non-founder Articles Credited To**: Yrdly Team

---

## 2. Technical & Legal Evidence (Verbatim Proof)

### 2a. Recon Grep Outputs (Literal Output)
- **Gmail occurrences**:
  - `app/privacy-policy/page.tsx:127`: `["Email Support:", " support@yrdly.ng or yardlyng234@gmail.com"]`
- **Location occurrences ("Lagos" / "Oyo")**:
  - `app/contact/page.tsx:131`: `Oyo State, Nigeria.<br />`
  - `app/privacy-policy/page.tsx:129`: `["Data Controller:", " Yrdly Technologies Limited, Lagos, Nigeria"]`
  - `app/about/page.tsx:161`: `We started in a single community in Ibadan. Today, Yrdly communities exist across Oyo, Lagos, Abuja, Rivers, Enugu, Kano, and Delta States...`
  - `app/blog/articles-data.ts:128`: `intro: "As urban residential estates across Lagos, Ibadan, Abuja, and Port Harcourt expand..."`
  - `app/page.tsx:259`: `Get weekly updates on what's happening in Lagos estates. No spam. Just community trust.`
  - `components/footer.tsx:160`: `<span>Oyo State, Nigeria 🇳🇬</span>`
  - `components/newsletter-popup.tsx:99`: `Get weekly updates on what&apos;s happening in Lagos estates. No spam. Just community trust.`
- **Author occurrences**:
  - `app/blog/articles-data.ts:80`: `name: "Kemi Adeleke",`
  - `app/blog/articles-data.ts:122`: `name: "Tunde Bakare",`

### 2b. Trust & Safety Feature Claims (Verbatim Proof from `yrdly-app`)
1. **Escrow Provider (Payluk)**:
   - `yrdly-app/src/types/index.ts:245-247`:
     ```typescript
     // Phase 4 — Payments (Payluk deposit + escrow per-service)
     export type PaymentStatus = 'unpaid' | 'deposit_pending' | 'deposit_paid' | 'fully_paid' | 'escrow_held' | 'escrow_released' | 'refunded' | 'failed';
     export type PaymentType = 'deposit' | 'full' | 'escrow';
     ```
   - `yrdly-app/src/app/(app)/settings/withdraw/page.tsx:38`:
     ```typescript
     .from('escrow_transactions')
     ```
   - `yrdly-app/src/app/(app)/settings/help/page.tsx:14-16`:
     ```typescript
     q: 'How does marketplace escrow work?',
     a: 'When you buy an item, your payment is held securely in escrow by YRDLY. Once you meet the seller and verify the item is in the described condition, you release the funds to the seller. This protects both parties from fraud.'
     ```
2. **In-App Reporting**:
   - `yrdly-app/src/app/(app)/settings/report/page.tsx:90`:
     ```typescript
     const { error } = await supabase.from('reports').insert(insertData);
     ```
   - `yrdly-app/src/app/(app)/settings/guidelines/page.tsx:33`:
     ```typescript
     desc: "If you encounter suspicious behavior, spam, or a safety issue, use the report button immediately so moderators can handle it."
     ```
3. **Payout Bank Account-Name Lookup**:
   - `yrdly-app/src/app/(app)/settings/payout-settings/page.tsx:30`:
     ```typescript
     const [step, setStep] = useState<"select" | "account" | "verifying" | "confirmed">("select");
     ```
   - `yrdly-app/src/app/(app)/settings/payout-settings/page.tsx:114`:
     ```typescript
     toast({ title: "Verification Failed", description: "Could not verify this account number.", variant: "destructive" });
     ```

### 2c. Cookie Proof (Verbatim Audit)
1. **`sidebar:state`**:
   - Grep output for `Sidebar` usage across `app/` and `components/` (excluding `components/ui/sidebar.tsx`): **No matches found.**
   - `components/ui/sidebar.tsx` is not rendered or imported anywhere on the marketing site. `sidebar:state` cookie is NOT set at runtime.
2. **Supabase Auth Cookies**:
   - Imported in `app/auth/callback/page.tsx:5` and `components/auth/HeroLoginForm.tsx:4`:
     ```typescript
     import { supabaseAuthClient } from '@/lib/supabase-auth-client';
     ```
   - Called at runtime to store auth tokens in cookies on `.yrdly.ng` domain for authentication.
3. **`next-themes`**:
   - Uses `localStorage` (key: `theme`) via React state and HTML attribute `class` (`app/layout.tsx:119`). Does NOT set cookies.
4. **`@vercel/analytics`**:
   - Uses cookie-less first-party tracking (per official Vercel documentation). Does NOT set cookies.
5. **Google Ads & AdSense Cookies**:
   - `app/layout.tsx:62-107` injects `gtag/js?id=AW-18468457055` and `adsbygoogle.js?client=ca-pub-4168167607384837`.
   - Uses third-party cookies for ad performance measurement and personalized advertising. Link: [Google Advertising Privacy Policy](https://policies.google.com/technologies/ads).
6. **`yrdly_cookie_consent`**:
   - Set in `components/cookie-consent.tsx:8` via `js-cookie` to store user cookie preference.

---

## 3. UNVERIFIED List (Omitted from Claims)

The following claims are **UNVERIFIED** in code and MUST BE OMITTED from all marketing, safety, and legal copy:
- End-to-end encrypted messaging.
- Guaranteed 24-hour response time for reports.
- Government ID / identity verification for general profiles.
- Absolute claims such as "100% verified", "every member is verified", or "verified profiles". (Account lookup is strictly Payout Bank Account-Name Lookup).

---

## 4. Plan Corrections & Specific Guidelines

1. **Cookie Policy (`app/cookie-policy/page.tsx`)**:
   - List ONLY items proven in 2c (`yrdly_cookie_consent`, Supabase Auth session cookies, Google Ads / AdSense advertising cookies).
2. **Trust & Safety (`app/trust-and-safety/page.tsx`)**:
   - Describe Payluk as the escrow provider.
   - Describe bank account check as "Payout bank account-name lookup", NOT profile or identity verification.
   - Label safe-meetup tips and scam warning signs as "guidance" / "best practices", NOT product features.
3. **Terms of Service (`app/terms/page.tsx`)**:
   - Governing law: "laws of the Federal Republic of Nigeria".
   - Do NOT specify Oyo State courts.
   - Flag dispute resolution / arbitration clauses explicitly for user/lawyer review.
4. **Footer & Links**:
   - Do NOT commit footer links to `/cookie-policy` and `/trust-and-safety` until Batch 3 (when both pages exist).
   - No commit or push of any batch until all 3 batches are approved.

---

## 5. Execution Batches

### Batch 1 (4 files)
- `app/blog/articles-data.ts`: Replace "Kemi Adeleke" and "Tunde Bakare" blocks with "Yrdly Team". Update founder entry to `Victor Salami & Boluwatife lasisi, Founder & Product Lead`.
- `app/page.tsx`: Line ~259, replace "Lagos estates" with "your estate".
- `components/newsletter-popup.tsx`: Line ~99, replace "Lagos estates" with "your estate".
- `app/about/page.tsx`: Add `Yrdly Technologies Limited`, RC `9267059`, registered location `Oyo State, Nigeria`, and contact link. Do NOT touch community counts or state lists.

### Batch 2 (4 files)
- `app/contact/page.tsx`: Verify `support@yrdly.ng` ONLY, retain phone `09166368783` and office location `Oyo State, Nigeria`.
- `app/privacy-policy/page.tsx`: Line 127 replace `yardlyng234@gmail.com` with `support@yrdly.ng`. Line 129 update Data Controller to `Yrdly Technologies Limited (RC: 9267059), Oyo State, Nigeria`. Add "Advertising and Cookies" section covering Google AdSense/Ads, DART cookies, opt-out links (`adssettings.google.com`, `aboutads.info`), separation from app data, and updated date.
- `app/terms/page.tsx`: Expand into complete Terms of Service under Nigerian law. Flag sensitive dispute clauses for lawyer review.
- `components/cookie-consent.tsx`: Update to Accept / Decline options, store in `yrdly_cookie_consent`, link to `/cookie-policy`.

### Batch 3 (3 files)
- `app/cookie-policy/page.tsx` (NEW): Complete Cookie Policy (500+ words) listing proven cookies only, control guide, Privacy Policy link, metadata.
- `app/trust-and-safety/page.tsx` (NEW): Complete Trust & Safety page (600+ words) grounded in verified code features (Payluk escrow, in-app reporting, payout bank account-name lookup) + guidance. Metadata included.
- `components/footer.tsx`: Add `/cookie-policy` and `/trust-and-safety` links, display `Oyo State, Nigeria 🇳🇬`, `Yrdly Technologies Limited`, RC `9267059`.
- `app/sitemap.ts`: Add `/cookie-policy` and `/trust-and-safety` routes.

---

## 6. Verification Plan
- Run `npx tsc --noEmit` after edits and report unfiltered output.
- Present full git diffs for review before any commit.
