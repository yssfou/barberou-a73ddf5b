
-- Stop broadcasting bookings via Realtime so customer_name / customer_phone are not leaked
ALTER PUBLICATION supabase_realtime DROP TABLE public.bookings;

-- Tighten the guest INSERT policy: still allow guest bookings, but no longer WITH CHECK (true).
-- Validate field shape and that the referenced shop/service exist.
DROP POLICY IF EXISTS "Anyone can create bookings" ON public.bookings;

CREATE POLICY "Guests can create valid bookings"
ON public.bookings
FOR INSERT
TO anon, authenticated
WITH CHECK (
  length(btrim(customer_name)) BETWEEN 1 AND 100
  AND length(btrim(customer_phone)) BETWEEN 6 AND 20
  AND booking_date >= CURRENT_DATE
  AND EXISTS (SELECT 1 FROM public.shops s WHERE s.id = shop_id)
  AND EXISTS (SELECT 1 FROM public.services sv WHERE sv.id = service_id AND sv.shop_id = bookings.shop_id)
);
