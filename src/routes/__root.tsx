import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  createRootRouteWithContext,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { type ReactNode } from "react";

import appCss from "../styles.css?url";
import { LangProvider } from "../lib/LangContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Barbero — Les meilleurs barbiers de Tunisie" },
      { name: "description", content: "Barbero — le répertoire des meilleurs barbiers et salons esthétiques de Tunisie. Trouve, contacte, réserve." },
      { property: "og:title", content: "Barbero — Les meilleurs barbiers de Tunisie" },
      { property: "og:description", content: "Trouve ton barbier en Tunisie. Réserve en 1 tap." },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "stylesheet", href: appCss }],
  }),
  shellComponent: RootShell,
  component: RootComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="fr">
      <head><HeadContent /></head>
      <body>{children}<Scripts /></body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <LangProvider>
        <Navbar />
        <Outlet />
        <Footer />
      </LangProvider>
    </QueryClientProvider>
  );
}
