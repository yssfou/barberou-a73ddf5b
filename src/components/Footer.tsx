import { useLang } from "../lib/LangContext";

export default function Footer() {
  const { t } = useLang();
  return (
    <footer className="footer" id="about">
      <div className="footer-logo">BARBERO</div>
      <div className="footer-tagline">{t.footer.tagline}</div>
      <div className="footer-links">
        <a href="#shops">{t.nav.barbers}</a>
        <a href="#cities">{t.nav.cities}</a>
        <a href="#about">{t.nav.about}</a>
        <a href="mailto:hello@barberotunis.com">{t.nav.contact}</a>
      </div>
      <div className="footer-socials">
        <a href="https://facebook.com" aria-label="Facebook">f</a>
        <a href="https://instagram.com" aria-label="Instagram">◉</a>
        <a href="https://wa.me/21622476723" aria-label="WhatsApp">✆</a>
      </div>
      <div className="footer-bottom">{t.footer.made}</div>
    </footer>
  );
}
