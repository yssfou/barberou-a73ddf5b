import { createFileRoute } from "@tanstack/react-router";
import ShopListing from "../components/ShopListing";
import { useLang } from "../lib/LangContext";

function SalonsPage() {
  const { t } = useLang();
  return (
    <ShopListing
      typeFilter="Salon Esthétique"
      title={t.salonsPage.title}
      subtitle={t.salonsPage.subtitle}
    />
  );
}

export const Route = createFileRoute("/salons")({
  head: () => ({
    meta: [
      { title: "Salons Esthétiques Femmes — Barbero Tunisie" },
      { name: "description", content: "Découvre les meilleurs salons esthétiques pour femmes en Tunisie. Coiffure, soins, beauté." },
    ],
  }),
  component: SalonsPage,
});
