import { useMemo, useState } from "react";
import shopsData from "../data/shops.json";
import { cities } from "../data/translations";
import { useLang } from "../lib/LangContext";
import ShopCard from "./ShopCard";
import { SearchIcon } from "./Icons";

interface Props {
  typeFilter?: "Barbier" | "Salon Esthétique";
  title: string;
  subtitle: string;
}

export default function ShopListing({ typeFilter, title, subtitle }: Props) {
  const { t } = useLang();
  const [query, setQuery] = useState("");
  const [city, setCity] = useState("");

  const filtered = useMemo(() => {
    return shopsData.filter((s) => {
      if (typeFilter && s.type !== typeFilter) return false;
      if (city && s.city !== city) return false;
      if (query) {
        const q = query.toLowerCase();
        if (!s.name.toLowerCase().includes(q) && !s.city.toLowerCase().includes(q) && !s.area.toLowerCase().includes(q)) {
          return false;
        }
      }
      return true;
    });
  }, [typeFilter, city, query]);

  return (
    <section className="section" style={{ paddingTop: 140 }}>
      <div className="section-inner">
        <h1 className="section-title">{title}</h1>
        <p className="section-subtitle">{subtitle}</p>

        <div className="search-bar">
          <div className="search-input-wrap">
            <SearchIcon size={18} />
            <input
              type="text"
              placeholder={t.shops.searchPlaceholder}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <select value={city} onChange={(e) => setCity(e.target.value)}>
            <option value="">{t.hero.allCities}</option>
            {cities.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>

        {filtered.length === 0 ? (
          <p style={{ textAlign: "center", color: "var(--color-muted)", padding: 60 }}>
            {t.shops.noResults}
          </p>
        ) : (
          <div className="shops-grid">
            {filtered.map((s) => <ShopCard key={s.slug} shop={s} />)}
          </div>
        )}
      </div>
    </section>
  );
}
