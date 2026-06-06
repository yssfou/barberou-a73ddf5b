import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { translations } from "../data/translations";

type Lang = "fr" | "en" | "ar";

interface LangCtx {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: any;
}

const Ctx = createContext<LangCtx>({ lang: "fr", setLang: () => {}, t: translations.fr });

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("fr");

  useEffect(() => {
    if (typeof document === "undefined") return;
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    document.documentElement.classList.toggle("lang-ar", lang === "ar");
  }, [lang]);

  return <Ctx.Provider value={{ lang, setLang, t: (translations as any)[lang] }}>{children}</Ctx.Provider>;
}

export const useLang = () => useContext(Ctx);
