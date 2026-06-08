import { Link } from "@tanstack/react-router";
import { useLang } from "../lib/LangContext";
import { WhatsAppIcon, InstagramIcon, FacebookIcon, MailIcon } from "./Icons";

export default function Footer() {
  const { t } = useLang();
  return (
    <footer className="footer" id="about">
      <div className="footer-grid">
        <div className="footer-col footer-brand-col">
          <div className="footer-logo">BARBERO</div>
          <p className="footer-tagline">{t.footer.tagline}</p>
          <div className="footer-socials">
            <a href="https://wa.me/21622476723" target="_blank" rel="noopener" aria-label="WhatsApp"><WhatsAppIcon /></a>
            <a href="https://instagram.com" target="_blank" rel="noopener" aria-label="Instagram"><InstagramIcon /></a>
            <a href="https://facebook.com" target="_blank" rel="noopener" aria-label="Facebook"><FacebookIcon /></a>
            <a href="mailto:hello@barberotunis.com" aria-label="Email"><MailIcon /></a>
          </div>
        </div>

        <div className="footer-col">
          <h4>Explorer</h4>
          <Link to="/barbers">Barbiers Hommes</Link>
          <Link to="/salons">Salons Femmes</Link>
          <Link to="/join">Ajouter mon salon</Link>
        </div>

        <div className="footer-col">
          <h4>Contact</h4>
          <a href="tel:+21622476723">+216 22 476 723</a>
          <a href="https://wa.me/21622476723" target="_blank" rel="noopener">WhatsApp</a>
          <a href="mailto:hello@barberotunis.com">hello@barberotunis.com</a>
        </div>

        <div className="footer-col">
          <h4>À propos</h4>
          <p className="footer-about">Le répertoire premium des meilleurs barbiers et salons de Tunisie. Trouve, contacte, réserve — en un tap.</p>
        </div>
      </div>

      <div className="footer-divider" />

      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} Barbero — barberotunis.com</span>
        <span className="footer-credit">Created with <span className="heart">♥</span> by <strong>Ourabi Youssef</strong></span>
      </div>
    </footer>
  );
}
