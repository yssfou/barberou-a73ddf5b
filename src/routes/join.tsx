import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { gsap } from "gsap";
import { WhatsAppIcon, PhoneIcon, MailIcon } from "../components/Icons";
import { GoldDivider } from "../components/ArchFrame";
import { useLang } from "../lib/LangContext";

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
  const { t } = useLang();
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".join-hero > *", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.7, stagger: 0.1, ease: "power2.out" });
      gsap.fromTo(".join-card", { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.6, stagger: 0.12, ease: "power2.out", delay: 0.3 });
    });
    return () => ctx.revert();
  }, []);

  const icons = ["✦", "⌘", "★", "✺"];

  return (
    <div className="join-page">
      <section className="join-hero">
        <span className="join-eyebrow">{t.join.eyebrow}</span>
        <h1 className="font-heading">{t.join.h1a}<br /><span className="accent">{t.join.h1b}</span></h1>
        <p>{t.join.intro}</p>
      </section>

      <GoldDivider />

      <section className="section">
        <div className="section-inner">
          <h2 className="section-title">{t.join.missionTitle} <span className="accent">{t.join.missionAccent}</span></h2>
          <p className="section-subtitle" style={{ maxWidth: 720, margin: "16px auto 0" }}>
            {t.join.missionText}
          </p>

          <div className="join-benefits">
            {t.join.benefits.map((b: any, i: number) => (
              <div key={i} className="join-card">
                <div className="join-icon">{icons[i]}</div>
                <h3>{b.title}</h3>
                <p>{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section join-contact-section">
        <div className="section-inner">
          <h2 className="section-title">{t.join.contactTitle}<span className="accent">{t.join.contactAccent}</span></h2>
          <p className="section-subtitle">{t.join.contactSubtitle}</p>

          <div className="contact-grid">
            <a className="contact-card whatsapp" href="https://wa.me/21622476723?text=Salam%2C%20nheb%20nzid%20salon%20fi%20Barbero" target="_blank" rel="noopener">
              <WhatsAppIcon size={36} />
              <h3>{t.join.whatsappLabel}</h3>
              <p>{t.join.whatsappDesc}</p>
              <span className="contact-value">+216 22 476 723</span>
            </a>
            <a className="contact-card phone" href="tel:+21622476723">
              <PhoneIcon size={36} />
              <h3>{t.join.phoneLabel}</h3>
              <p>{t.join.phoneDesc}</p>
              <span className="contact-value">+216 22 476 723</span>
            </a>
            <a className="contact-card email" href="mailto:hello@barberotunis.com?subject=Ajouter%20mon%20salon%20%C3%A0%20Barbero">
              <MailIcon size={36} />
              <h3>{t.join.emailLabel}</h3>
              <p>{t.join.emailDesc}</p>
              <span className="contact-value">hello@barberotunis.com</span>
            </a>
          </div>

          <div className="join-footer-note">
            <p>📱 <strong>+216 22 476 723</strong> — WhatsApp & Call</p>
            <p>{t.join.footerNote}</p>
          </div>
        </div>
      </section>
    </div>
  );
}
