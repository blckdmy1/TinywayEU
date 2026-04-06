"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { translations, Language, TranslationKeys } from "./translations";

type I18nContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: keyof TranslationKeys) => string;
};

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en");

  useEffect(() => {
    const saved = localStorage.getItem("tinyway-lang") as Language;
    if (saved && translations[saved]) {
      setLanguageState(saved);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("tinyway-lang", lang);
  };

  const t = (key: keyof TranslationKeys): string => {
    return translations[language][key] || translations.en[key] || key;
  };

  return (
    <I18nContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error("useI18n must be used within an I18nProvider");
  }
  return context;
}

export const languages: { code: Language; name: string; flag: string }[] = [
  { code: "en", name: "English", flag: "GB" },
  { code: "lv", name: "Latviešu", flag: "LV" },
  { code: "lt", name: "Lietuvių", flag: "LT" },
  { code: "et", name: "Eesti", flag: "EE" },
  { code: "ru", name: "Русский", flag: "RU" },
];
