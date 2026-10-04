"use client";

import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { usePortfolio } from "@/context/PortfolioContext";
import { ThemeToggle } from "./ThemeToggle";
import { LanguageSelector } from "./LanguageSelector";

interface SystemBarProps {
  onOpenCommandPalette?: () => void;
  onNavigateSection?: (sectionId: string) => void;
}

const NAV_ITEMS = [
  { id: "projects", labelKey: "projects" as const },
  { id: "technologies", labelKey: "technologies" as const },
  { id: "studies", labelKey: "studies" as const },
  { id: "contact", labelKey: "contact" as const },
];

export const SystemBar: React.FC<SystemBarProps> = React.memo(function SystemBar({
  onNavigateSection,
}) {
  const { t, theme } = usePortfolio();
  const isColor = theme === "color";
  const progressBarRef = React.useRef<HTMLDivElement | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("projects");

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 30);

      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (progressBarRef.current && totalScroll > 0) {
        const pct = Math.min(Math.max((scrollY / totalScroll) * 100, 0), 100);
        progressBarRef.current.style.width = `${pct}%`;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    // Section Observer to track active section accurately
    const sectionIds = ["projects", "technologies", "studies", "contact"];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-20% 0px -55% 0px",
        threshold: 0,
      }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      {/* Full-viewport Telemetry Progress Line (100vw, screen edge to screen edge) */}
      <div
        className="fixed top-0 left-0 right-0 w-full h-[1.5px] pointer-events-none z-40 overflow-hidden"
        aria-hidden="true"
      >
        <div
          ref={progressBarRef}
          className="h-full transition-all duration-75 ease-out"
          style={{
            width: "0%",
            backgroundColor: "var(--accent)",
            boxShadow: "0 0 8px var(--accent-glow)",
          }}
        />
      </div>

      <header className="sticky top-3 sm:top-5 z-50 flex justify-center w-full px-3 sm:px-4 pointer-events-none transition-all duration-300">
        <div
          className={`pointer-events-auto mx-auto relative flex items-center justify-between sm:justify-center gap-1.5 sm:gap-3 rounded-full border transition-all duration-300 ease-out font-sans w-fit max-w-[96vw] ${
            isScrolled
              ? "py-1.5 sm:py-2 pl-3 sm:pl-5 pr-2.5 sm:pr-3.5 shadow-2xl backdrop-blur-2xl"
              : "py-2 sm:py-2.5 pl-3.5 sm:pl-6 pr-3 sm:pr-4 shadow-lg backdrop-blur-xl"
          }`}
          style={{
            backgroundColor: isColor
              ? isScrolled
                ? "rgba(255, 255, 255, 0.88)"
                : "rgba(255, 255, 255, 0.72)"
              : isScrolled
              ? "rgba(10, 12, 16, 0.82)"
              : "rgba(12, 14, 20, 0.65)",
            borderColor: isColor
              ? "rgba(15, 23, 42, 0.12)"
              : "rgba(255, 255, 255, 0.12)",
            boxShadow: isColor
              ? "0 10px 30px -8px rgba(15, 23, 42, 0.12), inset 0 1px 0 0 rgba(255, 255, 255, 0.8)"
              : "0 14px 40px -10px rgba(0, 0, 0, 0.65), inset 0 1px 0 0 rgba(255, 255, 255, 0.14)",
          }}
        >
          {/* Subtle balanced left spacer (reduces excessive empty void before Projetos) */}
          <div className="w-4 sm:w-7 hidden sm:block shrink-0" aria-hidden="true" />

          {/* Center: Section Navigation with Active Floating Pill */}
          <nav
            aria-label="Section Navigation"
            className="flex items-center justify-center gap-0.5 sm:gap-1.5 transition-colors relative"
          >
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onNavigateSection?.(item.id)}
                  className={`relative px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full text-[11px] sm:text-xs font-medium transition-colors duration-200 cursor-pointer outline-none select-none ${
                    isActive
                      ? "text-[var(--text-primary)]"
                      : "text-[var(--text-muted)] hover:text-[var(--text-secondary)] hover:bg-[var(--bg-surface-hover)]"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute inset-0 rounded-full -z-10"
                      style={{
                        backgroundColor: isColor ? "rgba(15, 23, 42, 0.07)" : "rgba(255, 255, 255, 0.12)",
                        border: isColor ? "1px solid rgba(15, 23, 42, 0.08)" : "1px solid rgba(255, 255, 255, 0.16)",
                        boxShadow: isColor
                          ? "inset 0 1px 0 0 rgba(255, 255, 255, 0.7)"
                          : "inset 0 1px 0 0 rgba(255, 255, 255, 0.2)",
                      }}
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{t.nav[item.labelKey]}</span>
                </button>
              );
            })}
          </nav>

          {/* Right: Independent Controls (PT + Theme Toggle) with comfortable spacing */}
          <div
            className="flex items-center justify-end gap-1.5 sm:gap-2.5 pl-2.5 sm:pl-4 border-l ml-2 sm:ml-4 shrink-0"
            style={{ borderColor: "var(--border-hairline)" }}
          >
            <LanguageSelector />
            <span className="w-0.5" aria-hidden="true" />
            <ThemeToggle />
          </div>
        </div>
      </header>
    </>
  );
});
