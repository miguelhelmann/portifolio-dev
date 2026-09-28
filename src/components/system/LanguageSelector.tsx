"use client";

import React from "react";
import { usePortfolio } from "@/context/PortfolioContext";

export const LanguageSelector: React.FC = React.memo(function LanguageSelector() {
  const { language, setLanguage, t } = usePortfolio();

  const handleToggle = React.useCallback(() => {
    setLanguage(language === "pt" ? "en" : "pt");
  }, [language, setLanguage]);

  const nextLang = language === "pt" ? "English" : "Português";

  return (
    <button
      type="button"
      onClick={handleToggle}
      aria-label={`${t.nav.langToggleAria}: ${language.toUpperCase()} (Switch to ${nextLang})`}
      title={language === "pt" ? "Mudar para Inglês (Switch to English)" : "Switch to Portuguese (Mudar para Português)"}
      className="font-sans text-xs font-bold tracking-wider transition-opacity hover:opacity-70 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--text-primary)] rounded px-1.5 py-0.5 cursor-pointer select-none"
      style={{
        color: "var(--text-primary)",
      }}
    >
      {language.toUpperCase()}
    </button>
  );
});
