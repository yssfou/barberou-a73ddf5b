import { createFileRoute } from "@tanstack/react-router";
import ShopListing from "../components/ShopListing";
import { useLang } from "../lib/LangContext";

function BarbersPage() {
  const { t } = useLang();
  return (
    <ShopListing
      typeFilter="Barbier"
      title={t.barbersPage.title}
      subtitle={t.barbersPage.subtitle}
    />
  );
}

export const Route = createFileRoute("/barbers")({
  head: () => ({
    meta: [
      { title: "Barbiers Hommes — Barbero Tunisie" },
      { name: "description", content: "Découvre les meilleurs barbiers pour hommes en Tunisie. Coupes, dégradés, rasage traditionnel." },
    ],
  }),
  component: BarbersPage,
});
