import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import shopsData from "../data/shops.json";
import { cities } from "../data/translations";
import { useLang } from "../lib/LangContext";
import ArchFrame, { CornerOrnament, GoldDivider, BarberPole } from "../components/ArchFrame";
import ShopCard from "../components/ShopCard";
import { SearchIcon } from "../components/Icons";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Barbero — Trouve ton Barbier en Tunisie" },
      { name: "description", content: "Le répertoire des meilleurs barbiers et salons esthétiques de Tunisie. Tunis, Sfax, Sousse, Ariana et plus." },
    ],
  }),
  component: Home,
});

function Home() {
  const { t, lang } = useLang();
  const [cityFilter, setCityFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const heroRef = useRef<HTMLDivElement>(null);
  const poleRef = useRef<SVGSVGElement | null>(null);

  // Hero entrance
  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();
      tl.fromTo(".hero-arch", { opacity: 0, scale: 0.85 }, { opacity: 0.18, scale: 1, duration: 1, ease: "power2.out" })
        .fromTo(".hero-corner", { opacity: 0, scale: 0.6 }, { opacity: 0.85, scale: 1, duration: 0.8, stagger: 0.15 }, "-=0.6")
        .fromTo(".hero-brand .letter",
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.5, stagger: { each: 0.08, from: "center" }, ease: "power2.out" },
          "-=0.4")
        .fromTo(".hero-title", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6 }, "-=0.2")
        .fromTo(".hero-subtitle", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5 }, "-=0.3")
        .fromTo(".hero-search", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.5 }, "-=0.2")
        .fromTo(".hero-stat",
          { opacity: 0, scale: 0.6 },
          { opacity: 1, scale: 1, duration: 0.8, stagger: 0.1, ease: "elastic.out(1, 0.6)" },
          "-=0.2");

      // barber pole rotation
      if (poleRef.current) {
        gsap.to(poleRef.current.querySelector("rect"), {
          attr: { patternTransform: "rotate(225)" },
          duration: 4,
          repeat: -1,
          ease: "none",
        });
      }

      // How it works steps
      gsap.fromTo(".how-step",
        { opacity: 0, y: 50 },
        {
          opacity: 1, y: 0, duration: 0.7, stagger: 0.15, ease: "power2.out",
          scrollTrigger: { trigger: ".how-grid", start: "top 80%" },
        });

      // Shop cards
      ScrollTrigger.batch(".shop-card", {
        start: "top 90%",
        onEnter: (els) => gsap.fromTo(els,
          { opacity: 0, y: 60 },
          { opacity: 1, y: 0, duration: 0.7, stagger: 0.1, ease: "power2.out" }),
      });

      // Section titles
      gsap.utils.toArray<HTMLElement>(".section-title").forEach((el) => {
        gsap.fromTo(el, { opacity: 0, y: 30 }, {
          opacity: 1, y: 0, duration: 0.8,
          scrollTrigger: { trigger: el, start: "top 85%" },
        });
      });
    }, heroRef);
    return () => ctx.revert();
  }, []);

  // Language change fade
  const contentRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!contentRef.current) return;
    gsap.fromTo(contentRef.current, { opacity: 0.4 }, { opacity: 1, duration: 0.3 });
  }, [lang]);

  const filteredShops = shopsData.filter((s) => {
    if (cityFilter && s.city !== cityFilter) return false;
    if (typeFilter && s.type !== typeFilter) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      if (!s.name.toLowerCase().includes(q) && !s.city.toLowerCase().includes(q) && !s.area.toLowerCase().includes(q)) return false;
    }
    return true;
  });

  const brandLetters = "BARBERO".split("");

  return (
    <div ref={contentRef}>
      {/* HERO */}
      <section className="hero" ref={heroRef}>
        <ArchFrame className="hero-arch" glow />
        <CornerOrnament className="hero-corner tl" />
        <CornerOrnament className="hero-corner br" flip />
        <BarberPole className="barber-pole" />

        <div className="hero-content">
          <h1 className="hero-brand font-display">
            {brandLetters.map((l, i) => <span key={i} className="letter">{l}</span>)}
          </h1>
          <div className="hero-title">
            {t.hero.title}
            <span className="accent">{t.hero.titleAccent}</span>
          </div>
          <p className="hero-subtitle">{t.hero.subtitle}</p>
          <div className="hero-search">
            <select value={cityFilter} onChange={(e) => setCityFilter(e.target.value)}>
              <option value="">{t.hero.allCities}</option>
              {cities.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
            <button onClick={() => {
              document.getElementById("shops")?.scrollIntoView({ behavior: "smooth" });
            }}>
              {t.hero.searchBtn}
            </button>
          </div>
          <div className="hero-stats">
            <span className="hero-stat"><strong>50+</strong> {t.hero.stats.barbers}</span>
            <span className="hero-stat"><strong>13</strong> {t.hero.stats.cities}</span>
            <span className="hero-stat"><strong>100%</strong> {t.hero.stats.free}</span>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="section" id="how">
        <div className="section-inner">
          <GoldDivider />
          <h2 className="section-title">{t.how.title.split("?")[0]}<span className="accent">?</span></h2>
          <p className="section-subtitle">{t.how.subtitle}</p>
          <div className="how-grid">
            {t.how.steps.map((step: any, i: number) => (
              <div key={i} className="how-step">
                <div className="how-number">0{i + 1}</div>
                <div className="how-icon">{step.icon}</div>
                <h3>{step.title}</h3>
                <p>{step.desc}</p>
              </div>
            ))}
          </div>
          <GoldDivider />
        </div>
      </section>

      {/* SHOPS */}
      <section className="section" id="shops">
        <div className="section-inner">
          <h2 className="section-title">{t.shops.title.split(" ")[0]} <span className="accent">{t.shops.title.split(" ").slice(1).join(" ")}</span></h2>
          <p className="section-subtitle">{t.shops.subtitle}</p>

          <div className="search-bar">
            <div className="search-input-wrap">
              <SearchIcon size={18} />
              <input
                type="text"
                placeholder="Rechercher par nom ou ville..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <select value={cityFilter} onChange={(e) => setCityFilter(e.target.value)}>
              <option value="">{t.shops.filterAll} — {t.shops.filterCity}</option>
              {cities.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
            <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}>
              <option value="">{t.shops.filterAll} — {t.shops.filterType}</option>
              <option value="Barbier">Barbier</option>
              <option value="Salon Esthétique">Salon Esthétique</option>
            </select>
          </div>

          {filteredShops.length === 0 ? (
            <p style={{ textAlign: "center", color: "var(--color-muted)", padding: "40px" }}>
              {t.shops.noResults}
            </p>
          ) : (
            <div className="shops-grid">
              {filteredShops.map((shop) => <ShopCard key={shop.slug} shop={shop} />)}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
