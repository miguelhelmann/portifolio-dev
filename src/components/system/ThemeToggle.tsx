"use client";

import React from "react";
import { usePortfolio } from "@/context/PortfolioContext";

export const ThemeToggle: React.FC = React.memo(function ThemeToggle() {
  const { theme, setTheme, t } = usePortfolio();
  const isColor = theme === "color";

  const handleToggle = () => {
    setTheme(isColor ? "dark" : "color");
  };

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isColor}
      aria-label={t.nav.themeToggleAria}
      onClick={handleToggle}
      className="group relative inline-flex items-center w-11 h-6 p-0.5 rounded-full border transition-colors duration-300 cursor-pointer outline-none select-none"
      style={{
        backgroundColor: isColor ? "rgba(15, 23, 42, 0.06)" : "rgba(255, 255, 255, 0.05)",
        borderColor: isColor ? "rgba(15, 23, 42, 0.15)" : "var(--border-hairline)",
      }}
    >
      {/* Sliding Circular Indicator — Pure Solid Industrial Minimal */}
      <span
        className={`w-4 h-4 rounded-full transition-transform duration-300 ease-out transform ${
          isColor ? "translate-x-5 bg-slate-900" : "translate-x-0.5 bg-slate-200"
        }`}
      />
    </button>
  );
});
