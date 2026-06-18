import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import shopsData from "../data/shops.json";
import { useLang } from "../lib/LangContext";
import { GoldDivider } from "../components/ArchFrame";
import { WhatsAppIcon, PhoneIcon, FacebookIcon, InstagramIcon } from "../components/Icons";
import BookingWidget from "../components/BookingWidget";
import { fetchShopBundle, type Service, type Shop as DbShop, type WorkingHour } from "../lib/booking";

export const Route = createFileRoute("/shop/$slug")({
  loader: ({ params }) => {
    const shop = shopsData.find((s) => s.slug === params.slug);
    if (!shop) throw notFound();
    return { shop };
  },
  head: ({ loaderData }) => ({
    meta: loaderData?.shop ? [
      { title: `${loaderData.shop.name} — Barbero` },
      { name: "description", content: loaderData.shop.description },
      { property: "og:title", content: `${loaderData.shop.name} — Barbero` },
      { property: "og:description", content: loaderData.shop.description },
      { property: "og:image", content: loaderData.shop.cover },
    ] : [],
  }),
  component: ShopProfile,
  notFoundComponent: () => (
    <div style={{ padding: "200px 24px", textAlign: "center" }}>
      <h1 className="font-heading" style={{ fontSize: 48 }}>Barbier introuvable</h1>
      <Link to="/" style={{ color: "var(--color-gold)", marginTop: 24, display: "inline-block" }}>← Retour</Link>
    </div>
  ),
});

function ShopProfile() {
  const { shop } = Route.useLoaderData();
  const { t } = useLang();

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    window.scrollTo(0, 0);
    const ctx = gsap.context(() => {
      gsap.fromTo(".profile-banner-content", { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1, ease: "power2.out", delay: 0.2 });
      gsap.utils.toArray<HTMLElement>(".profile-section").forEach((el) => {
        gsap.fromTo(el, { opacity: 0, y: 40 }, {
          opacity: 1, y: 0, duration: 0.7,
          scrollTrigger: { trigger: el, start: "top 85%" },
        });
      });
    });
    return () => ctx.revert();
  }, [shop.slug]);

  return (
    <article>
      <div className="profile-banner">
        <img src={shop.cover} alt={shop.name} />
        <div className="profile-banner-content">
          <h1 className="font-heading">{shop.name}</h1>
          <div className="profile-banner-meta">
            <span className={`shop-badge ${shop.type === "Barbier" ? "type-barbier" : "type-salon"}`} style={{ position: "static" }}>
              {shop.type}
            </span>
            <span>📍 {shop.city} — {shop.area}</span>
            <span style={{ color: "var(--color-gold)" }}>★ {shop.rating.toFixed(1)}</span>
            <span style={{ color: "var(--color-gold-light)" }}>{shop.priceMin}–{shop.priceMax} DT</span>
          </div>
        </div>
      </div>

      <GoldDivider />

      <div className="profile-body">
        <div>
          <section className="profile-section">
            <h2>{t.profile.about}</h2>
            <p>{shop.longDescription}</p>
          </section>

          <section className="profile-section">
            <h2>{t.profile.services}</h2>
            <table className="services-table">
              <thead>
                <tr><th>Service</th><th style={{ textAlign: "right" }}>Prix</th></tr>
              </thead>
              <tbody>
                {(shop.services as Array<{ name: string; price: string }>).map((s, i) => (
                  <tr key={i}><td>{s.name}</td><td>{s.price}</td></tr>
                ))}
              </tbody>
            </table>
          </section>

          <section className="profile-section">
            <h2>{t.profile.hours}</h2>
            <div className="hours-grid">
              {(shop.hours as Array<{ day: string; time: string }>).flatMap((h, i) => [
                <div key={`d${i}`}>{h.day}</div>,
                <div key={`t${i}`}>{h.time}</div>,
              ])}
            </div>
          </section>

          <section className="profile-section">
            <h2>{t.profile.gallery}</h2>
            <div className="gallery-grid">
              {(shop.gallery as string[]).map((g, i) => <img key={i} src={g} alt={`${shop.name} ${i + 1}`} loading="lazy" />)}
            </div>
          </section>

          <section className="profile-section">
            <h2>{t.profile.location}</h2>
            <div className="map-placeholder">
              <div className="map-pin">📍</div>
              <div>{shop.address}</div>
            </div>
          </section>
        </div>

        <aside>
          <BookingSection slug={shop.slug} fallback={shop} />
          <div className="cta-card" style={{ marginTop: 18 }}>
            <h4 className="font-heading" style={{ fontSize: 16, marginBottom: 12, color: "var(--color-muted)", textAlign: "center", letterSpacing: "0.08em" }}>
              — OU —
            </h4>
            <div className="shop-actions" style={{ position: "static", display: "flex", justifyContent: "center", gap: 12 }}>
              <a className="shop-action phone" href={`tel:${shop.phone}`} aria-label="Phone"><PhoneIcon size={20} /></a>
              <a className="shop-action whatsapp" href={shop.whatsapp} target="_blank" rel="noopener" aria-label="WhatsApp"><WhatsAppIcon size={20} /></a>
              <a className="shop-action facebook" href={shop.facebook} target="_blank" rel="noopener" aria-label="Facebook"><FacebookIcon size={20} /></a>
              <a className="shop-action instagram" href={shop.instagram} target="_blank" rel="noopener" aria-label="Instagram"><InstagramIcon size={20} /></a>
            </div>
            <p style={{ marginTop: 12, color: "var(--color-muted)", fontSize: 12, textAlign: "center" }}>{shop.phone}</p>
          </div>
        </aside>
      </div>

      <div className="sticky-bar">
        <a href={`tel:${shop.phone}`} className="sb-phone" aria-label="Phone"><PhoneIcon size={22} /></a>
        <a href={shop.whatsapp} target="_blank" rel="noopener" className="sb-wa" aria-label="WhatsApp"><WhatsAppIcon size={22} /></a>
        <a href={shop.facebook} target="_blank" rel="noopener" className="sb-fb" aria-label="Facebook"><FacebookIcon size={22} /></a>
        <a href={shop.instagram} target="_blank" rel="noopener" className="sb-ig" aria-label="Instagram"><InstagramIcon size={22} /></a>
      </div>
    </article>
  );
}

function BookingSection({ slug, fallback }: { slug: string; fallback: any }) {
  const [data, setData] = useState<{ shop: DbShop | null; services: Service[]; workingHours: WorkingHour[] } | null>(null);

  useEffect(() => {
    let active = true;
    fetchShopBundle(slug).then((d) => {
      if (active) setData(d);
    });
    return () => { active = false; };
  }, [slug]);

  if (!data) {
    return <div className="booking-widget"><p className="bw-empty">…</p></div>;
  }

  // Synthesize a Shop object: prefer DB row, fall back to JSON for whatsapp link in success step.
  const shop: DbShop = data.shop ?? {
    id: "",
    slug,
    name: fallback.name,
    city: fallback.city,
    area: fallback.area,
    type: fallback.type,
    price_min: fallback.priceMin,
    price_max: fallback.priceMax,
    phone: fallback.phone,
    whatsapp: fallback.whatsapp,
    facebook: fallback.facebook,
    instagram: fallback.instagram,
    image_url: fallback.cover,
  };

  return <BookingWidget shop={shop} services={data.services} workingHours={data.workingHours} />;
}
