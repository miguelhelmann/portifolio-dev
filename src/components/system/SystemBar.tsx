"use client";

import React from "react";
import { usePortfolio } from "@/context/PortfolioContext";
import { ThemeToggle } from "./ThemeToggle";
import { LanguageSelector } from "./LanguageSelector";

interface SystemBarProps {
  onOpenCommandPalette?: () => void;
  onNavigateSection?: (sectionId: string) => void;
}

export const SystemBar: React.FC<SystemBarProps> = React.memo(function SystemBar({
  onNavigateSection,
}) {
  const { t } = usePortfolio();

  return (
    <header
      className="sticky top-0 z-40 w-full glass-surface border-b transition-all duration-300"
      style={{
        backgroundColor: "var(--bg-systembar)",
        borderColor: "var(--border-hairline)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-12 flex items-center justify-between font-sans text-xs">
        {/* Natural Professional Navigation */}
        <nav
          aria-label="Section Navigation"
          className="flex items-center gap-3 sm:gap-6 transition-colors"
        >
          <button
            onClick={() => onNavigateSection?.("projects")}
            className="font-medium text-xs transition-opacity hover:opacity-100 cursor-pointer outline-none"
            style={{ color: "var(--text-secondary)" }}
          >
            {t.nav.projects}
          </button>
          <button
            onClick={() => onNavigateSection?.("technologies")}
            className="font-medium text-xs transition-opacity hover:opacity-100 cursor-pointer outline-none"
            style={{ color: "var(--text-secondary)" }}
          >
            {t.nav.technologies}
          </button>
          <button
            onClick={() => onNavigateSection?.("studies")}
            className="font-medium text-xs transition-opacity hover:opacity-100 cursor-pointer outline-none"
            style={{ color: "var(--text-secondary)" }}
          >
            {t.nav.studies}
          </button>
          <button
            onClick={() => onNavigateSection?.("contact")}
            className="font-medium text-xs transition-opacity hover:opacity-100 cursor-pointer outline-none"
            style={{ color: "var(--text-secondary)" }}
          >
            {t.nav.contact}
          </button>
        </nav>

        {/* Floating Controls: Language Switcher + Theme Toggle */}
        <div className="flex items-center gap-2 sm:gap-3">
          <LanguageSelector />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
});
