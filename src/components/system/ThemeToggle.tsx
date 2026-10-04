"use client";

import React from "react";
import { usePortfolio } from "@/context/PortfolioContext";

export const ThemeToggle: React.FC = React.memo(function ThemeToggle() {
  const { theme, setTheme, t } = usePortfolio();
  const isColor = theme === "color";

  const handleToggle = (e: React.MouseEvent<HTMLButtonElement>) => {
    const nextTheme = isColor ? "dark" : "color";

    // View Transitions with radial circular mask expansion
    if (
      typeof document !== "undefined" &&
      "startViewTransition" in document &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      const x = e.clientX;
      const y = e.clientY;
      const endRadius = Math.hypot(
        Math.max(x, window.innerWidth - x),
        Math.max(y, window.innerHeight - y)
      );

      const transition = document.startViewTransition(() => {
        setTheme(nextTheme);
      });

      transition.ready.then(() => {
        const clipPath = [
          `circle(0px at ${x}px ${y}px)`,
          `circle(${endRadius}px at ${x}px ${y}px)`,
        ];
        document.documentElement.animate(
          {
            clipPath: clipPath,
          },
          {
            duration: 420,
            easing: "cubic-bezier(0.16, 1, 0.3, 1)",
            pseudoElement: "::view-transition-new(root)",
          }
        );
      });
    } else {
      setTheme(nextTheme);
    }
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
      {/* Sliding Circular Indicator — Industrial Minimal */}
      <span
        className={`w-4 h-4 rounded-full transition-transform duration-300 ease-out transform shadow-sm ${
          isColor ? "translate-x-5 bg-slate-900" : "translate-x-0.5 bg-slate-100"
        }`}
      />
    </button>
  );
});
