// Booking helpers: slot generation, phone validation, supabase queries.
import { supabase } from "../integrations/supabase/client";

export interface Shop {
  id: string;
  slug: string;
  name: string;
  city: string;
  area: string | null;
  type: string;
  price_min: number | null;
  price_max: number | null;
  phone: string | null;
  whatsapp: string | null;
  facebook: string | null;
  instagram: string | null;
  image_url: string | null;
}
export interface Service {
  id: string;
  shop_id: string;
  name: string;
  price: number;
  duration_minutes: number;
}
export interface WorkingHour {
  id: string;
  shop_id: string;
  day_of_week: number; // 0 = Sunday
  open_time: string | null; // "HH:MM:SS"
  close_time: string | null;
  is_closed: boolean;
}

// Tunisian phone: 8 digits, optional +216 / 216 prefix.
export function validateTunisianPhone(raw: string): { ok: boolean; normalized?: string } {
  const cleaned = raw.replace(/[\s\-().]/g, "");
  const m = cleaned.match(/^(?:\+?216)?(\d{8})$/);
  if (!m) return { ok: false };
  return { ok: true, normalized: `+216${m[1]}` };
}

// "HH:MM:SS" → minutes from midnight
function timeToMin(t: string): number {
  const [h, m] = t.split(":").map(Number);
  return h * 60 + m;
}
function minToTime(min: number): string {
  const h = Math.floor(min / 60).toString().padStart(2, "0");
  const m = (min % 60).toString().padStart(2, "0");
  return `${h}:${m}:00`;
}
export function formatTime(t: string): string {
  return t.slice(0, 5); // "HH:MM"
}
export function formatDate(d: Date, locale: string): string {
  return d.toLocaleDateString(locale === "ar" ? "ar-TN" : locale === "en" ? "en-GB" : "fr-FR", {
    weekday: "short",
    day: "numeric",
    month: "short",
  });
}
export function toISODate(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${dd}`;
}

export function generateSlots(
  workingHours: WorkingHour[],
  date: Date,
  durationMin: number,
): string[] {
  const dow = date.getDay();
  const wh = workingHours.find((w) => w.day_of_week === dow);
  if (!wh || wh.is_closed || !wh.open_time || !wh.close_time) return [];
  const start = timeToMin(wh.open_time);
  const end = timeToMin(wh.close_time);
  const slots: string[] = [];
  // Step every 30 minutes — feels natural for booking grids
  const step = 30;
  for (let m = start; m + durationMin <= end; m += step) {
    slots.push(minToTime(m));
  }
  return slots;
}

export function nextNDays(n: number): Date[] {
  const out: Date[] = [];
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  for (let i = 0; i < n; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    out.push(d);
  }
  return out;
}

export async function fetchShopBundle(slug: string): Promise<{
  shop: Shop | null;
  services: Service[];
  workingHours: WorkingHour[];
}> {
  const { data: shop } = await supabase
    .from("shops")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();
  if (!shop) return { shop: null, services: [], workingHours: [] };
  const [{ data: services }, { data: workingHours }] = await Promise.all([
    supabase.from("services").select("*").eq("shop_id", shop.id).order("price"),
    supabase.from("working_hours").select("*").eq("shop_id", shop.id),
  ]);
  return {
    shop: shop as Shop,
    services: (services ?? []) as Service[],
    workingHours: (workingHours ?? []) as WorkingHour[],
  };
}

export async function fetchBookedSlots(shopId: string, isoDate: string): Promise<string[]> {
  const { data } = await supabase
    .from("booked_slots")
    .select("booking_time")
    .eq("shop_id", shopId)
    .eq("booking_date", isoDate);
  return (data ?? []).map((r: any) => r.booking_time as string);
}
