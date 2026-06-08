import { createFileRoute } from "@tanstack/react-router";
import ShopListing from "../components/ShopListing";

export const Route = createFileRoute("/barbers")({
  head: () => ({
    meta: [
      { title: "Barbiers Hommes — Barbero Tunisie" },
      { name: "description", content: "Découvre les meilleurs barbiers pour hommes en Tunisie. Coupes, dégradés, rasage traditionnel." },
    ],
  }),
  component: () => (
    <ShopListing
      typeFilter="Barbier"
      title="Barbiers Hommes"
      subtitle="Les meilleurs barbiers pour hommes en Tunisie"
    />
  ),
});
