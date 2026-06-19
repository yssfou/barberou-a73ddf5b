import { useEffect, useMemo, useRef, useState } from "react";
import { gsap } from "gsap";
import { supabase } from "../integrations/supabase/client";
import { useLang } from "../lib/LangContext";
import {
  fetchBookedSlots,
  formatDate,
  formatTime,
  generateSlots,
  nextNDays,
  toISODate,
  validateTunisianPhone,
  type Service,
  type Shop,
  type WorkingHour,
} from "../lib/booking";
import { WhatsAppIcon } from "./Icons";

interface Props {
  shop: Shop;
  services: Service[];
  workingHours: WorkingHour[];
}

type Step = 1 | 2 | 3 | 4 | 5;

export default function BookingWidget({ shop, services, workingHours }: Props) {
  const { t, lang } = useLang();
  const [step, setStep] = useState<Step>(1);
  const [service, setService] = useState<Service | null>(null);
  const [date, setDate] = useState<Date | null>(null);
  const [time, setTime] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [bookedTimes, setBookedTimes] = useState<string[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const stepRef = useRef<HTMLDivElement>(null);
  const checkRef = useRef<SVGPathElement>(null);

  const tb = t.booking;

  // Animate step transitions
  useEffect(() => {
    if (!stepRef.current) return;
    gsap.fromTo(
      stepRef.current,
      { opacity: 0, x: 30 },
      { opacity: 1, x: 0, duration: 0.35, ease: "power2.out" },
    );
  }, [step]);

  // Days available
  const days = useMemo(() => nextNDays(14), []);
  const dayIsClosed = (d: Date) => {
    const wh = workingHours.find((w) => w.day_of_week === d.getDay());
    return !wh || wh.is_closed || !wh.open_time || !wh.close_time;
  };

  // Available slots for chosen date
  const allSlots = useMemo(() => {
    if (!date || !service) return [];
    return generateSlots(workingHours, date, service.duration_minutes);
  }, [date, service, workingHours]);

  // Load + realtime subscribe to booked slots when date changes
  useEffect(() => {
    if (!date || !service) return;
    const iso = toISODate(date);
    let active = true;
    fetchBookedSlots(shop.id, iso).then((arr) => {
      if (active) setBookedTimes(arr);
    });
    const channel = supabase
      .channel(`bookings-${shop.id}-${iso}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "bookings",
          filter: `shop_id=eq.${shop.id}`,
        },
        (payload: any) => {
          if (payload.new?.booking_date === iso) {
            setBookedTimes((prev) =>
              prev.includes(payload.new.booking_time)
                ? prev
                : [...prev, payload.new.booking_time],
            );
          }
        },
      )
      .subscribe();
    return () => {
      active = false;
      supabase.removeChannel(channel);
    };
  }, [date, service, shop.id]);

  // Stagger time slots
  const timesGridRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (step === 3 && timesGridRef.current) {
      gsap.fromTo(
        timesGridRef.current.children,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.25, stagger: 0.03, ease: "power2.out" },
      );
    }
  }, [step, allSlots.length, bookedTimes.length]);

  // Checkmark draw on success
  useEffect(() => {
    if (step === 5 && checkRef.current) {
      const path = checkRef.current;
      const len = path.getTotalLength();
      gsap.set(path, { strokeDasharray: len, strokeDashoffset: len });
      gsap.to(path, { strokeDashoffset: 0, duration: 0.7, ease: "power2.out", delay: 0.1 });
    }
  }, [step]);

  const submit = async () => {
    if (!service || !date || !time) return;
    setError(null);
    const v = validateTunisianPhone(phone);
    if (!name.trim()) {
      setError(tb.errors.nameRequired);
      return;
    }
    if (!v.ok) {
      setError(tb.errors.phoneInvalid);
      return;
    }
    setSubmitting(true);
    const { error: insertErr } = await supabase.from("bookings").insert({
      shop_id: shop.id,
      service_id: service.id,
      customer_name: name.trim(),
      customer_phone: v.normalized!,
      booking_date: toISODate(date),
      booking_time: time,
    });
    setSubmitting(false);
    if (insertErr) {
      // 23505 = unique violation = slot just taken
      if (insertErr.code === "23505") {
        setError(tb.errors.slotTaken);
        const iso = toISODate(date);
        fetchBookedSlots(shop.id, iso).then(setBookedTimes);
        setTime(null);
        setStep(3);
      } else {
        setError(tb.errors.generic);
      }
      return;
    }
    setStep(5);
  };

  const waReminderHref = useMemo(() => {
    if (!service || !date || !time) return "#";
    const msg = `${tb.success.waMsgIntro} ${shop.name} — ${service.name} — ${formatDate(date, lang)} ${formatTime(time)} — ${name} (${phone}).`;
    // Always send to the shop's WhatsApp number (default to 21622476723 if missing).
    const raw = (shop.whatsapp || shop.phone || "21622476723").replace(/[^0-9]/g, "");
    const num = raw.startsWith("216") ? raw : `216${raw.replace(/^0+/, "")}`;
    return `https://wa.me/${num}?text=${encodeURIComponent(msg)}`;
  }, [service, date, time, shop, lang, tb, name, phone]);

  // No services configured for this shop → graceful empty state
  if (services.length === 0 || workingHours.length === 0) {
    return (
      <div className="booking-widget">
        <h3 className="bw-title font-heading">{tb.title}</h3>
        <p className="bw-empty">{tb.comingSoon}</p>
      </div>
    );
  }

  return (
    <div className="booking-widget">
      <h3 className="bw-title font-heading">{tb.title}</h3>

      {step < 5 && (
        <div className="bw-steps">
          {[1, 2, 3, 4].map((n) => (
            <span key={n} className={`bw-dot ${step >= n ? "active" : ""}`} />
          ))}
        </div>
      )}

      <div ref={stepRef} className="bw-step" key={step}>
        {step === 1 && (
          <>
            <p className="bw-step-label">{tb.step1.label}</p>
            <div className="bw-services">
              {services.map((s) => (
                <button
                  key={s.id}
                  className={`bw-service ${service?.id === s.id ? "selected" : ""}`}
                  onClick={() => setService(s)}
                >
                  <span className="bw-service-name">{s.name}</span>
                  <span className="bw-service-meta">
                    <span className="bw-service-price">{s.price} DT</span>
                    <span className="bw-service-dur">{s.duration_minutes} {tb.minutes}</span>
                  </span>
                </button>
              ))}
            </div>
            <button
              className="bw-next"
              disabled={!service}
              onClick={() => setStep(2)}
            >
              {tb.next}
            </button>
          </>
        )}

        {step === 2 && (
          <>
            <p className="bw-step-label">{tb.step2.label}</p>
            <div className="bw-dates">
              {days.map((d) => {
                const closed = dayIsClosed(d);
                const selected = date && toISODate(d) === toISODate(date);
                return (
                  <button
                    key={toISODate(d)}
                    disabled={closed}
                    className={`bw-date ${selected ? "selected" : ""} ${closed ? "closed" : ""}`}
                    onClick={() => setDate(d)}
                  >
                    {formatDate(d, lang)}
                  </button>
                );
              })}
            </div>
            <div className="bw-nav">
              <button className="bw-back" onClick={() => setStep(1)}>{tb.back}</button>
              <button className="bw-next" disabled={!date} onClick={() => setStep(3)}>{tb.next}</button>
            </div>
          </>
        )}

        {step === 3 && (
          <>
            <p className="bw-step-label">{tb.step3.label}</p>
            {allSlots.length === 0 ? (
              <p className="bw-empty">{tb.step3.noSlots}</p>
            ) : (
              <div className="bw-times" ref={timesGridRef}>
                {allSlots.map((s) => {
                  const taken = bookedTimes.includes(s);
                  const selected = time === s;
                  return (
                    <button
                      key={s}
                      disabled={taken}
                      className={`bw-time ${selected ? "selected" : ""} ${taken ? "taken" : ""}`}
                      onClick={() => setTime(s)}
                    >
                      {formatTime(s)}
                    </button>
                  );
                })}
              </div>
            )}
            <div className="bw-nav">
              <button className="bw-back" onClick={() => setStep(2)}>{tb.back}</button>
              <button className="bw-next" disabled={!time} onClick={() => setStep(4)}>{tb.next}</button>
            </div>
          </>
        )}

        {step === 4 && (
          <>
            <p className="bw-step-label">{tb.step4.label}</p>
            <div className="bw-form">
              <label className="bw-field">
                <span>{tb.step4.name}</span>
                <input value={name} onChange={(e) => setName(e.target.value)} placeholder={tb.step4.namePh} />
              </label>
              <label className="bw-field">
                <span>{tb.step4.phone}</span>
                <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+216 22 476 723" inputMode="tel" />
              </label>
            </div>
            <div className="bw-recap">
              <div><strong>{service?.name}</strong> · {service?.price} DT</div>
              <div>{date && formatDate(date, lang)} · {time && formatTime(time)}</div>
            </div>
            {error && <p className="bw-error">{error}</p>}
            <div className="bw-nav">
              <button className="bw-back" onClick={() => setStep(3)}>{tb.back}</button>
              <button className="bw-confirm" disabled={submitting} onClick={submit}>
                {submitting ? tb.step4.submitting : tb.step4.confirm}
              </button>
            </div>
          </>
        )}

        {step === 5 && (
          <div className="bw-success">
            <svg className="bw-check" viewBox="0 0 64 64" width="72" height="72">
              <circle cx="32" cy="32" r="30" fill="none" stroke="var(--color-gold)" strokeWidth="2" opacity="0.5" />
              <path
                ref={checkRef}
                d="M18 33 L28 43 L46 23"
                fill="none"
                stroke="var(--color-gold)"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <h4 className="font-heading bw-success-title">{tb.success.title}</h4>
            <div className="bw-success-recap">
              <div><span>{tb.success.shop}</span><strong>{shop.name}</strong></div>
              <div><span>{tb.success.service}</span><strong>{service?.name}</strong></div>
              <div><span>{tb.success.when}</span><strong>{date && formatDate(date, lang)} · {time && formatTime(time)}</strong></div>
            </div>
            <a className="bw-confirm" href={waReminderHref} target="_blank" rel="noopener">
              <WhatsAppIcon size={18} /> {tb.success.waReminder}
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
