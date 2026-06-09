import { useEffect, useRef, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { useLang } from "../lib/LangContext";
import { useTheme } from "../lib/ThemeContext";
import { SunIcon, MoonIcon } from "./Icons";
import { gsap } from "gsap";

const langs: Array<"fr" | "en" | "ar"> = ["fr", "en", "ar"];

export default function Navbar() {
  const { lang, setLang } = useLang();
  const { theme, toggle } = useTheme();
  const navRef = useRef<HTMLElement>(null);
  const [open, setOpen] = useState(false);
  const lastScroll = useRef(0);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => { setOpen(false); }, [pathname]);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      if (!navRef.current) return;
      if (y > 100 && y > lastScroll.current) navRef.current.classList.add("hidden-nav");
      else navRef.current.classList.remove("hidden-nav");
      lastScroll.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (open) {
      gsap.fromTo(".mobile-menu a", { y: 30, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.07, duration: 0.4, ease: "power2.out", delay: 0.1 });
    }
  }, [open]);

  return (
    <>
      <nav ref={navRef} className="navbar">
        <Link to="/" className="navbar-logo">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="16" height="16">
            <circle cx="6" cy="6" r="3" /><circle cx="6" cy="18" r="3" />
            <line x1="20" y1="4" x2="8.12" y2="15.88" /><line x1="14.47" y1="14.48" x2="20" y2="20" />
            <line x1="8.12" y1="8.12" x2="12" y2="12" />
          </svg>
          BARBERO
        </Link>
        <div className="navbar-links">
          <Link to="/barbers" className="navbar-link" activeProps={{ className: "navbar-link active" }}>{useLang().t.nav.barbers}</Link>
          <Link to="/salons" className="navbar-link" activeProps={{ className: "navbar-link active" }}>{useLang().t.nav.salons}</Link>
          <Link to="/join" className="navbar-link" activeProps={{ className: "navbar-link active" }}>{useLang().t.nav.join}</Link>
        </div>
        <div className="nav-tools">
          <button className="theme-toggle" onClick={toggle} aria-label="Toggle theme">
            {theme === "dark" ? <SunIcon /> : <MoonIcon />}
          </button>
          <div className="lang-switch">
            {langs.map((l) => (
              <button key={l} className={`lang-btn ${lang === l ? "active" : ""}`} onClick={() => setLang(l)}>{l.toUpperCase()}</button>
            ))}
          </div>
        </div>
        <button className="hamburger" onClick={() => setOpen((o) => !o)} aria-label="Menu">
          <span /><span /><span />
        </button>
      </nav>

      <div className={`mobile-menu ${open ? "open" : ""}`}>
        <Link to="/" onClick={() => setOpen(false)}>Accueil</Link>
        <Link to="/barbers" onClick={() => setOpen(false)}>Hommes</Link>
        <Link to="/salons" onClick={() => setOpen(false)}>Femmes</Link>
        <Link to="/join" onClick={() => setOpen(false)}>Rejoindre</Link>
        <div className="mobile-tools">
          <button className="theme-toggle" onClick={toggle} aria-label="Toggle theme">
            {theme === "dark" ? <SunIcon /> : <MoonIcon />}
          </button>
          <div className="lang-switch">
            {langs.map((l) => (
              <button key={l} className={`lang-btn ${lang === l ? "active" : ""}`} onClick={() => setLang(l)}>{l.toUpperCase()}</button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
