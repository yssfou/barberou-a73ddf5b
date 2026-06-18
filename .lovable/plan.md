## Booking system for Barbero — plan

### 1. Enable Lovable Cloud
Provision the backend (Supabase under the hood). Required for database + realtime.

### 2. Database schema (migration)
Four tables in `public` with proper GRANTs + RLS:

- **shops** — `id uuid pk`, `name`, `city`, `area`, `type`, `price_min int`, `price_max int`, `description text`, `phone`, `whatsapp`, `facebook`, `instagram`, `image_url`, `rating numeric`, `featured bool`, `slug unique`
- **services** — `id uuid pk`, `shop_id fk→shops`, `name`, `price int`, `duration_minutes int`
- **working_hours** — `id uuid pk`, `shop_id fk`, `day_of_week int 0-6`, `open_time time`, `close_time time`, `is_closed bool`
- **bookings** — `id uuid pk`, `shop_id fk`, `service_id fk`, `customer_name text`, `customer_phone text`, `booking_date date`, `booking_time time`, `status text default 'confirmed'`, `created_at timestamptz default now()` + **unique index** on `(shop_id, booking_date, booking_time)` to enforce no double-booking at DB level

**RLS policies:**
- `shops`, `services`, `working_hours`: public SELECT for anon + authenticated (read-only catalog)
- `bookings`: public INSERT (guest checkout), public SELECT limited to checking slot availability (only `shop_id, booking_date, booking_time, status` columns via a view), no UPDATE/DELETE for anon
- Realtime enabled on `bookings`

User will populate shops/services/working_hours manually via Supabase Table Editor (as requested).

### 3. New components
- `src/components/BookingWidget.tsx` — main 4-step wizard, GSAP step transitions
- `src/components/booking/ServiceStep.tsx` — selectable service cards
- `src/components/booking/DateStep.tsx` — 14-day picker, closed days disabled
- `src/components/booking/TimeStep.tsx` — slot grid generated from working_hours + service duration, taken slots disabled, realtime subscription
- `src/components/booking/DetailsStep.tsx` — name + Tunisian phone validation
- `src/components/booking/SuccessStep.tsx` — GSAP checkmark draw + recap + wa.me reminder button
- `src/components/booking/StepIndicator.tsx` — 4 gold dots
- `src/lib/booking.ts` — slot generation, phone validation, supabase queries

### 4. Shop profile integration
- Modify `src/routes/shop.$slug.tsx`: replace the existing right-aisle "Contact direct" card with `<BookingWidget />`; keep the 4 contact icons (Phone/WhatsApp/Facebook/Instagram) below as secondary CTA
- On mobile: widget becomes a sticky bottom-sheet that slides up when "Réserver maintenant" is tapped (reuses existing `.sticky-bar` styling language)
- Existing shop JSON stays as the source for current cards/listings; profile page reads services/hours from Supabase by `slug`. If a shop has no Supabase row yet, fall back to JSON description and hide the widget gracefully with a "Réservation bientôt disponible" message.

### 5. Styling
Pure CSS additions to `src/styles.css` using existing `--color-gold`, `--color-navy`, `--color-cream`, Playfair/Cinzel/DM Sans variables. Reuse `.shop-card`, `.btn-whatsapp`, `.btn-gold-outline`, `.cta-card` patterns. New classes: `.booking-widget`, `.booking-step`, `.step-indicator`, `.service-option`, `.date-pill`, `.time-pill`, `.booking-success`, `.booking-sheet` (mobile sticky).

### 6. Animations (GSAP, matching existing language)
- Step transitions: `gsap.to` slide-left + fade 0.3s ease
- Time slots: `gsap.from` stagger 0.04s when date selected
- Success checkmark: SVG `strokeDasharray` draw via GSAP
- Selected cards: existing `.featured` glow + lift

### 7. Translations
Add booking strings (FR/EN/AR) to `src/data/translations.ts`: step labels, button copy, validation errors, success messages.

### 8. Double-booking guard
Two layers: (a) DB-level UNIQUE constraint on `(shop_id, booking_date, booking_time)`, (b) realtime subscription on `bookings` filtered by shop+date to live-update disabled slots while user is choosing. On insert conflict → inline gold/red error + force re-fetch of slots.

### Out of scope (confirmed)
- No shop-owner admin dashboard
- No customer accounts / auth
- No email or SMS confirmations (only wa.me reminder link)

Ready to build?
