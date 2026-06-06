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
      { property: "og:description", content: "Barbero — le répertoire des meilleurs barbiers et salons esthétiques de Tunisie. Trouve, contacte, réserve." },
      { property: "og:type", content: "website" },
      { name: "twitter:title", content: "Barbero — Les meilleurs barbiers de Tunisie" },
      { name: "twitter:description", content: "Barbero — le répertoire des meilleurs barbiers et salons esthétiques de Tunisie. Trouve, contacte, réserve." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/74d679c2-2c5e-4aa1-8db7-ee962abeaf72/id-preview-f0e8326e--d6691df4-12c7-44af-8c8c-9b3cb6ee065d.lovable.app-1780755680151.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/74d679c2-2c5e-4aa1-8db7-ee962abeaf72/id-preview-f0e8326e--d6691df4-12c7-44af-8c8c-9b3cb6ee065d.lovable.app-1780755680151.png" },
      { name: "twitter:card", content: "summary_large_image" },
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
