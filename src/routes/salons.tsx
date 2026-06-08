import { createFileRoute } from "@tanstack/react-router";
import ShopListing from "../components/ShopListing";

export const Route = createFileRoute("/salons")({
  head: () => ({
    meta: [
      { title: "Salons Esthétiques Femmes — Barbero Tunisie" },
      { name: "description", content: "Découvre les meilleurs salons esthétiques pour femmes en Tunisie. Coiffure, soins, beauté." },
    ],
  }),
  component: () => (
    <ShopListing
      typeFilter="Salon Esthétique"
      title="Salons Femmes"
      subtitle="Les meilleurs salons esthétiques pour femmes en Tunisie"
    />
  ),
});
