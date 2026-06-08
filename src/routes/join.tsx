import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { gsap } from "gsap";
import { WhatsAppIcon, PhoneIcon, MailIcon } from "../components/Icons";
import { GoldDivider } from "../components/ArchFrame";

export const Route = createFileRoute("/join")({
  head: () => ({
    meta: [
      { title: "Ajouter mon salon — Barbero Tunisie" },
      { name: "description", content: "Vous êtes barbier ou salon esthétique ? Rejoignez Barbero et connectez-vous à des milliers de clients en Tunisie." },
    ],
  }),
  component: JoinPage,
});

function JoinPage() {
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".join-hero > *", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.7, stagger: 0.1, ease: "power2.out" });
      gsap.fromTo(".join-card", { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.6, stagger: 0.12, ease: "power2.out", delay: 0.3 });
    });
    return () => ctx.revert();
  }, []);

  return (
    <div className="join-page">
      <section className="join-hero">
        <span className="join-eyebrow">REJOIGNEZ BARBERO</span>
        <h1 className="font-heading">Ajoutez votre salon<br /><span className="accent">au répertoire premium</span></h1>
        <p>Connectez-vous à des milliers de clients en Tunisie qui cherchent leur prochain barbier.</p>
      </section>

      <GoldDivider />

      <section className="section">
        <div className="section-inner">
          <h2 className="section-title">Notre <span className="accent">mission</span></h2>
          <p className="section-subtitle" style={{ maxWidth: 720, margin: "16px auto 0" }}>
            Barbero connecte les clients à leurs barbiers en toute simplicité — pour que chaque visite soit une vraie expérience,
            et que vous puissiez travailler dans de meilleures conditions, sans surcharge ni stress.
          </p>

          <div className="join-benefits">
            <div className="join-card">
              <div className="join-icon">✦</div>
              <h3>Plus de visibilité</h3>
              <p>Votre salon apparaît dans le répertoire premium des meilleurs barbiers de Tunisie.</p>
            </div>
            <div className="join-card">
              <div className="join-icon">⌘</div>
              <h3>Moins de stress</h3>
              <p>Des clients qui réservent à l'avance — fini les salles d'attente surchargées.</p>
            </div>
            <div className="join-card">
              <div className="join-icon">★</div>
              <h3>Clients fidèles</h3>
              <p>Une vitrine professionnelle qui inspire confiance et fidélise votre clientèle.</p>
            </div>
            <div className="join-card">
              <div className="join-icon">✺</div>
              <h3>100% gratuit</h3>
              <p>Inscription simple et gratuite — aucun frais caché, aucun engagement.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section join-contact-section">
        <div className="section-inner">
          <h2 className="section-title">Contactez-<span className="accent">moi</span></h2>
          <p className="section-subtitle">Choisissez le moyen qui vous convient le mieux</p>

          <div className="contact-grid">
            <a className="contact-card whatsapp" href="https://wa.me/21622476723?text=Salam%2C%20nheb%20nzid%20salon%20fi%20Barbero" target="_blank" rel="noopener">
              <WhatsAppIcon size={36} />
              <h3>WhatsApp</h3>
              <p>Le plus rapide</p>
              <span className="contact-value">+216 22 476 723</span>
            </a>
            <a className="contact-card phone" href="tel:+21622476723">
              <PhoneIcon size={36} />
              <h3>Appel direct</h3>
              <p>On répond 7j/7</p>
              <span className="contact-value">+216 22 476 723</span>
            </a>
            <a className="contact-card email" href="mailto:hello@barberotunis.com?subject=Ajouter%20mon%20salon%20%C3%A0%20Barbero">
              <MailIcon size={36} />
              <h3>Email</h3>
              <p>Pour les détails</p>
              <span className="contact-value">hello@barberotunis.com</span>
            </a>
          </div>

          <div className="join-footer-note">
            <p>📱 <strong>22 476 723</strong> — WhatsApp & Appel</p>
            <p>Envoyez-nous le nom de votre salon, votre ville, et quelques photos. On s'occupe du reste.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
