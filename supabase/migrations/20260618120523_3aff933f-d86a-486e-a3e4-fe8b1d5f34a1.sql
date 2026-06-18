
-- SHOPS
CREATE TABLE public.shops (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE NOT NULL,
  name text NOT NULL,
  city text NOT NULL,
  area text,
  type text NOT NULL,
  price_min int,
  price_max int,
  description text,
  phone text,
  whatsapp text,
  facebook text,
  instagram text,
  image_url text,
  rating numeric(2,1) DEFAULT 5.0,
  featured boolean DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.shops TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.shops TO authenticated;
GRANT ALL ON public.shops TO service_role;
ALTER TABLE public.shops ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Shops are publicly viewable" ON public.shops FOR SELECT USING (true);

-- SERVICES
CREATE TABLE public.services (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  shop_id uuid NOT NULL REFERENCES public.shops(id) ON DELETE CASCADE,
  name text NOT NULL,
  price int NOT NULL,
  duration_minutes int NOT NULL DEFAULT 30,
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX services_shop_id_idx ON public.services(shop_id);
GRANT SELECT ON public.services TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.services TO authenticated;
GRANT ALL ON public.services TO service_role;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Services are publicly viewable" ON public.services FOR SELECT USING (true);

-- WORKING HOURS
CREATE TABLE public.working_hours (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  shop_id uuid NOT NULL REFERENCES public.shops(id) ON DELETE CASCADE,
  day_of_week int NOT NULL CHECK (day_of_week BETWEEN 0 AND 6),
  open_time time,
  close_time time,
  is_closed boolean NOT NULL DEFAULT false,
  UNIQUE(shop_id, day_of_week)
);
CREATE INDEX working_hours_shop_id_idx ON public.working_hours(shop_id);
GRANT SELECT ON public.working_hours TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.working_hours TO authenticated;
GRANT ALL ON public.working_hours TO service_role;
ALTER TABLE public.working_hours ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Working hours are publicly viewable" ON public.working_hours FOR SELECT USING (true);

-- BOOKINGS
CREATE TABLE public.bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  shop_id uuid NOT NULL REFERENCES public.shops(id) ON DELETE CASCADE,
  service_id uuid NOT NULL REFERENCES public.services(id) ON DELETE RESTRICT,
  customer_name text NOT NULL,
  customer_phone text NOT NULL,
  booking_date date NOT NULL,
  booking_time time NOT NULL,
  status text NOT NULL DEFAULT 'confirmed',
  created_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT bookings_unique_slot UNIQUE (shop_id, booking_date, booking_time)
);
CREATE INDEX bookings_shop_date_idx ON public.bookings(shop_id, booking_date);
GRANT SELECT, INSERT ON public.bookings TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.bookings TO authenticated;
GRANT ALL ON public.bookings TO service_role;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;

-- Anyone can create a booking (guest checkout)
CREATE POLICY "Anyone can create bookings" ON public.bookings FOR INSERT WITH CHECK (true);

-- Public view exposes ONLY slot occupancy info (no customer PII)
CREATE VIEW public.booked_slots
WITH (security_invoker=on) AS
  SELECT shop_id, booking_date, booking_time, status
  FROM public.bookings
  WHERE status = 'confirmed';
GRANT SELECT ON public.booked_slots TO anon, authenticated;

-- Deny direct SELECT on bookings table for anon (PII protection)
CREATE POLICY "No direct read access to bookings" ON public.bookings FOR SELECT USING (false);

-- Enable realtime so slot grid updates live
ALTER PUBLICATION supabase_realtime ADD TABLE public.bookings;
ALTER TABLE public.bookings REPLICA IDENTITY FULL;
