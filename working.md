# Phase 4 — Expansion Plan: Payments / Quotes / Multi-Staff / Admin Appeals

> Base: Phases 1-3 handoff (yrdly-mobile source). Supabase yoiyqxtpmxnrrbqqidcs. yrdly/lib currently has NO booking-service — Phase1-3 must be instantiated first.

## 0. Gap
Expected per handoff in yrdly: lib/booking-service.ts, review-service.ts, notification-triggers.ts, hooks/use-bookings.ts, app/bookings/**, supabase/migrations/20260923*. Actual: only supabase-client.ts + resend-email.ts. So Phase4 deltas assume Phase1-3 scaffold first.

## 1. Execution Order (dependency-sorted)
| Order | Track | Depends | Why |
|---|---|---|--|
| 4A | Multi-Staff / Multi-Calendar | Phase1-3 | staff_id FK needed by payments & quotes |
| 4B | Payment (Payluk/escrow) | 4A | deposit/escrow ties to bookings.staff_id |
| 4C | Quotes-for-Trades | 4A+4B | quote->booking needs staff+payment |
| 4D | Admin Appeals Queue | all | manual unflag operates on strikes |
Alternative is 4B before 4A but then backfill staff_id later — not recommended.

## 2. Schema Deltas (single migration 20260923000002_phase4.sql)

### 4A Multi-Staff
- business_staff(id uuid pk, business_id fk, user_id fk nullable, name text, role text, is_active bool default true, created_at)
- service_staff_assignments(service_id fk, staff_id fk, pk composite)
- provider_availability add staff_id uuid fk nullable (null=legacy single calendar); partial unique (business_id,staff_id,day_of_week) where staff_id not null
- availability_exceptions add staff_id uuid fk nullable
- bookings add staff_id uuid fk nullable

### 4B Payments (Payluk+Escrow)
- enums: payment_status(unpaid,deposit_pending,deposit_paid,fully_paid,escrow_held,escrow_released,refunded,failed), payment_type(deposit,full,escrow)
- service_offerings add deposit_required bool, deposit_amount numeric, deposit_percent int 0-100, requires_full_payment bool, escrow_enabled bool
- bookings add payment_status enum default unpaid, payment_due_at timestamptz
- booking_payments(id pk, booking_id fk, amount numeric, type, status, provider text default payluk, payluk_reference text unique, payluk_checkout_url text, escrow_hold bool, created_at, paid_at)
- Webhook idempotency via payluk_reference unique; confirmBooking guarded: if service requires payment then payment_status must be deposit_paid/fully_paid/escrow_held
- Cancellation extends CANCELLATION_WINDOW_HOURS=5 with refund/escrow release via Payluk API

### 4C Quotes-for-Trades
- enum quote_status(pending,estimated,accepted,rejected,expired,converted,cancelled)
- quote_requests(id pk, customer_id fk, business_id fk, staff_id fk nullable, category text, title, description, images text[], location_text, urgency, status default pending, estimated_price numeric, estimated_duration int, estimate_notes, expires_at, converted_booking_id fk unique)
- quote_messages(id, quote_id fk, sender_id, body, created_at) optional
- bookings add quote_id fk nullable

### 4D Admin Appeals
- strike_appeals(id pk, booking_id fk, appellant_id, appellant_type enum, reason text, evidence_urls text[], status pending/approved/rejected, reviewed_by fk, reviewed_at, resolution_note, created_at)
- users/businesses add is_admin bool if not exists (or use auth custom claim) — need decision
- approveAppeal decrements counts, revokes strike, re-runs evaluateActiveFlagStatus (90-day trailing)

## 3. Service & Files
- lib/booking-service.ts: instantiate Phase1-3 then extend getStaff/createStaff, getAvailableSlots(businessId,serviceId,date,staffId?), createBooking(...,staffId?), payment guards
- lib/payluk-service.ts [NEW]: checkout init, verify, refund, escrow hold/release (via payluk-api skill). Env PAYLUK_SECRET_KEY, PAYLUK_WEBHOOK_SECRET, NEXT_PUBLIC_PAYLUK_PUBLIC_KEY
- lib/quote-service.ts [NEW]: createQuoteRequest, submitEstimate, accept/reject, convertQuoteToBooking
- lib/admin-service.ts [NEW]: listAppeals, reviewAppeal, manualUnflag, listFlaggedEntities + lib/admin-guard.ts
- app/api/payluk/webhook/route.ts [NEW]: HMAC verify, idempotent update
- hooks/use-bookings.ts extend useStaff/useQuote/usePayments/useAdminAppeals
- Routes: manage-staff/page.tsx, manage-availability per-staff tabs, bookings/create staff selector, bookings/[bookingId] payment CTA, quotes/* (create/list/detail), businesses/[id]/quotes, admin/appeals + admin/flagged (admin gated)

## 4. Payluk Notes
- Fetch docs via payluk-api skill before coding. Never expose secret to client. Webhook returns 200 idempotently.

## 5. RLS
- business_staff: owner CRUD, public read is_active=true
- booking_payments: customer read own, provider read business; insert via service_role
- quote_requests: customer CRUD own, business read/update own
- strike_appeals: appellant insert own, admin select/update where is_admin

## 6. Verify
- tsc --noEmit 0, pnpm build pass, vitest mocks for payments/quotes/appeals, manual staff->slot->booking->payluk mock->webhook->confirm->appeal->unflag flow preserves 90-day auto-clear and is_flagged ordering.

## 7. Decisions (Resolved 2026-09-30 in yrdly-app)
- Order 4A→4B→4C→4D executed as 4 separate migrations (20260923000002..05).
- Escrow supported alongside deposit/full via `escrow_enabled` + `escrow_hold` branching.
- Admin: `users.is_admin` + `role` + `app_metadata.role=admin` fallback (admin-guard.ts).
- yrdly parity scaffold still pending copy from yrdly-mobile/yrdly-app if desired.

## 8. Phase 4 Completion Log (yrdly-app 2026-09-30, live yoiyqxtpmxnrrbqqidcs)
- `npx tsc --noEmit` EXIT:0; routes `POST /api/bookings/checkout` + `POST /api/payluk/webhook` live.
- Checkout smoke: `bk_df8c6907-28a7-47b8-aa17-956532e9c733_deposit_1790790392752` `deposit_pending` row ok; Payluk intent 404 (no live customer) expected — `payluk_reference` created for webhook.
- Webhook: HMAC hex+base64 → `deposit_paid` then idempotent skip ok; escrow → `escrow_held` ok.
- Quote: `f467775a-5c16-46bd-a1be-2cf39ef5ca15` `pending` → booking `0a367446-a84c-4d95-8d26-6904a47bc1cc` `converted` via `quote_id` FK, checkout+webhook ok.
- Indexes 8/8 verified; legacy `uq_business_day/date` constraints dropped via `fix_uq_legacy_drop_v2` (root `2BP01` — `DROP CONSTRAINT` not `DROP INDEX`).
