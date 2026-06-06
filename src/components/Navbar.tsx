import { useEffect, useRef, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { useLang } from "../lib/LangContext";
import { gsap } from "gsap";

const langs: Array<"fr" | "en" | "ar"> = ["fr", "en", "ar"];

export default function Navbar() {
  const { lang, setLang, t } = useLang();
  const navRef = useRef<HTMLElement>(null);
  const [open, setOpen] = useState(false);
  const lastScroll = useRef(0);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => { setOpen(false); }, [pathname]);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      if (!navRef.current) return;
      if (y > 100 && y > lastScroll.current) {
        navRef.current.classList.add("hidden-nav");
      } else {
        navRef.current.classList.remove("hidden-nav");
      }
      lastScroll.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (open) {
      gsap.fromTo(
        ".mobile-menu a",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.08, duration: 0.4, ease: "power2.out", delay: 0.1 }
      );
    }
  }, [open]);

  return (
    <>
      <nav ref={navRef} className="navbar">
        <Link to="/" className="navbar-logo">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <circle cx="6" cy="6" r="3" />
            <circle cx="6" cy="18" r="3" />
            <line x1="20" y1="4" x2="8.12" y2="15.88" />
            <line x1="14.47" y1="14.48" x2="20" y2="20" />
            <line x1="8.12" y1="8.12" x2="12" y2="12" />
          </svg>
          BARBERO
        </Link>
        <div className="navbar-links">
          <a href="#shops" className="navbar-link">{t.nav.barbers}</a>
          <a href="#cities" className="navbar-link">{t.nav.cities}</a>
          <a href="#about" className="navbar-link">{t.nav.about}</a>
        </div>
        <div className="lang-switch">
          {langs.map((l) => (
            <button
              key={l}
              className={`lang-btn ${lang === l ? "active" : ""}`}
              onClick={() => setLang(l)}
            >
              {l.toUpperCase()}
            </button>
          ))}
        </div>
        <button className="hamburger" onClick={() => setOpen((o) => !o)} aria-label="Menu">
          <span /><span /><span />
        </button>
      </nav>

      <div className={`mobile-menu ${open ? "open" : ""}`}>
        <a href="#shops" onClick={() => setOpen(false)}>{t.nav.barbers}</a>
        <a href="#cities" onClick={() => setOpen(false)}>{t.nav.cities}</a>
        <a href="#about" onClick={() => setOpen(false)}>{t.nav.about}</a>
        <div className="lang-switch" style={{ marginTop: 20 }}>
          {langs.map((l) => (
            <button key={l} className={`lang-btn ${lang === l ? "active" : ""}`} onClick={() => setLang(l)}>
              {l.toUpperCase()}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
