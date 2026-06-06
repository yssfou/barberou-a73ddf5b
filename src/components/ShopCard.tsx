import { Link } from "@tanstack/react-router";
import { useLang } from "../lib/LangContext";

interface Shop {
  slug: string;
  name: string;
  city: string;
  area: string;
  type: string;
  rating: number;
  priceMin: number;
  priceMax: number;
  description: string;
  phone: string;
  whatsapp: string;
  facebook: string;
  instagram: string;
  cover: string;
  featured?: boolean;
}

export default function ShopCard({ shop }: { shop: Shop }) {
  const { t } = useLang();
  const isBarbier = shop.type === "Barbier";

  return (
    <div className={`shop-card ${shop.featured ? "featured" : ""}`}>
      <Link to="/shop/$slug" params={{ slug: shop.slug }} style={{ display: "contents" }}>
        <div className="shop-cover">
          <img src={shop.cover} alt={shop.name} loading="lazy" />
          {shop.featured && (
            <span className="shop-badge featured-badge">⭐ {t.shops.featured}</span>
          )}
          <span className={`shop-badge ${isBarbier ? "type-barbier" : "type-salon"}`}>
            {shop.type}
          </span>
        </div>
        <div className="shop-body">
          <h3 className="shop-name">{shop.name}</h3>
          <div className="shop-meta">
            <span className="city">📍 {shop.city} — {shop.area}</span>
            <span className="shop-rating">★ {shop.rating.toFixed(1)}</span>
          </div>
          <div className="shop-price">{shop.priceMin}–{shop.priceMax} DT</div>
          <p className="shop-desc">{shop.description}</p>
        </div>
      </Link>
      <div className="shop-actions">
        <a className="shop-action phone" href={`tel:${shop.phone}`} aria-label="Phone" onClick={(e) => e.stopPropagation()}>📞</a>
        <a className="shop-action whatsapp" href={shop.whatsapp} target="_blank" rel="noopener" aria-label="WhatsApp" onClick={(e) => e.stopPropagation()}>💬</a>
        <a className="shop-action facebook" href={shop.facebook} target="_blank" rel="noopener" aria-label="Facebook" onClick={(e) => e.stopPropagation()}>f</a>
        <a className="shop-action instagram" href={shop.instagram} target="_blank" rel="noopener" aria-label="Instagram">◉</a>
      </div>
    </div>
  );
}
