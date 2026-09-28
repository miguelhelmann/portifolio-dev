"use client";

import React, { createContext, useContext, useMemo, useSyncExternalStore, useCallback } from "react";
import { Language, ThemeId, TRANSLATIONS, TranslationDictionary } from "@/config/i18n.config";

interface PortfolioContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  theme: ThemeId;
  setTheme: (theme: ThemeId) => void;
  t: TranslationDictionary;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

const THEME_STORAGE_KEY = "portfolio_theme";
const LANG_STORAGE_KEY = "portfolio_lang";

const listeners = new Set<() => void>();

function notify() {
  listeners.forEach((listener) => listener());
}

function subscribe(callback: () => void) {
  listeners.add(callback);
  window.addEventListener("storage", callback);
  return () => {
    listeners.delete(callback);
    window.removeEventListener("storage", callback);
  };
}

function getThemeSnapshot(): ThemeId {
  if (typeof window === "undefined") return "dark";
  try {
    const saved = localStorage.getItem(THEME_STORAGE_KEY) as ThemeId | null;
    if (saved && ["dark", "color"].includes(saved)) {
      return saved;
    }
  } catch {}
  return "dark";
}

function getThemeServerSnapshot(): ThemeId {
  return "dark";
}

function getLangSnapshot(): Language {
  if (typeof window === "undefined") return "pt";
  try {
    const saved = localStorage.getItem(LANG_STORAGE_KEY) as Language | null;
    if (saved && ["pt", "en"].includes(saved)) {
      return saved;
    }
  } catch {}
  return "pt";
}

function getLangServerSnapshot(): Language {
  return "pt";
}

export const PortfolioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const theme = useSyncExternalStore(subscribe, getThemeSnapshot, getThemeServerSnapshot);
  const language = useSyncExternalStore(subscribe, getLangSnapshot, getLangServerSnapshot);

  React.useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  React.useEffect(() => {
    document.documentElement.setAttribute("lang", language);
  }, [language]);

  const setTheme = useCallback((newTheme: ThemeId) => {
    try {
      localStorage.setItem(THEME_STORAGE_KEY, newTheme);
      document.documentElement.setAttribute("data-theme", newTheme);
    } catch {}
    notify();
  }, []);

  const setLanguage = useCallback((newLang: Language) => {
    try {
      localStorage.setItem(LANG_STORAGE_KEY, newLang);
      document.documentElement.setAttribute("lang", newLang);
    } catch {}
    notify();
  }, []);

  const t = useMemo(() => TRANSLATIONS[language], [language]);

  const value = useMemo(
    () => ({
      language,
      setLanguage,
      theme,
      setTheme,
      t,
    }),
    [language, setLanguage, theme, setTheme, t]
  );

  return (
    <PortfolioContext.Provider value={value}>
      {children}
    </PortfolioContext.Provider>
  );
};

export function usePortfolio() {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error("usePortfolio must be used within a PortfolioProvider");
  }
  return context;
}
