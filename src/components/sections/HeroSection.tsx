"use client";

import React from "react";
import { motion } from "motion/react";
import { Terminal as TerminalIcon, ArrowDownRight, CornerDownLeft } from "lucide-react";
import { usePortfolio } from "@/context/PortfolioContext";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface HeroSectionProps {
  onOpenPrompt?: () => void;
  onNavigateWork?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = React.memo(function HeroSection({
  onOpenPrompt,
  onNavigateWork,
}) {
  const { t } = usePortfolio();
  const prefersReducedMotion = useReducedMotion();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : 0.08,
        delayChildren: prefersReducedMotion ? 0 : 0.04,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: prefersReducedMotion ? 0.01 : 0.6, ease: "easeOut" as const },
    },
  };

  return (
    <section
      aria-label="Developer Identity"
      className="relative pt-8 pb-16 sm:pt-14 sm:pb-24 lg:pt-20 lg:pb-32"
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-12 sm:space-y-16"
      >
        {/* Top Architectural Subtitle */}
        <motion.div
          variants={itemVariants}
          className="flex items-center border-b pb-4 font-sans text-xs transition-colors"
          style={{
            borderColor: "var(--border-hairline)",
            color: "var(--text-muted)",
          }}
        >
          <div className="flex items-center gap-2">
            <span className="font-bold tracking-wider uppercase" style={{ color: "var(--text-primary)" }}>
              {t.hero.portalTag}
            </span>
            <span className="opacity-40">/</span>
            <span className="tracking-wider uppercase font-semibold" style={{ color: "var(--text-secondary)" }}>
              {t.hero.sectionTag}
            </span>
          </div>
        </motion.div>

        {/* Oversized Typographic Monolith */}
        <div className="select-none">
          <motion.div variants={itemVariants} className="overflow-hidden">
            <h1
              className="font-display text-[15vw] sm:text-[14vw] lg:text-[11.5vw] font-bold tracking-[-0.04em] leading-[0.84] uppercase transition-colors"
              style={{ color: "var(--text-primary)" }}
            >
              <span className="inline-block transition-transform duration-300 hover:translate-x-1">
                MIGUEL
              </span>
              <br />
              <span
                className="headline-contrast inline-block transition-all duration-300"
                style={{
                  opacity: 0.95,
                }}
              >
                HELMANN
              </span>
            </h1>
          </motion.div>
        </div>

        {/* Asymmetric Offset Content (Columns 5–12) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end pt-4">
          {/* Deliberate Negative Space in Columns 1–4 */}
          <div className="hidden lg:block lg:col-span-4 font-sans text-xs space-y-2" style={{ color: "var(--text-muted)" }}>
            <div className="flex items-center gap-1.5 font-semibold uppercase tracking-wider" style={{ color: "var(--text-primary)" }}>
              <ArrowDownRight className="w-4 h-4" />
              <span>{t.hero.indexLabel}</span>
            </div>
            <p className="text-[11px] leading-relaxed opacity-80">
              {t.hero.disciplines}
            </p>
          </div>

          {/* Core Ethos & Quiet Interaction in Columns 5–12 */}
          <motion.div variants={itemVariants} className="lg:col-span-8 space-y-6">
            <p
              className="text-lg sm:text-2xl font-normal leading-relaxed max-w-2xl transition-colors"
              style={{ color: "var(--text-secondary)" }}
            >
              {t.hero.tagline}
            </p>

            {/* Single Quiet Interaction Prompt */}
            <div className="pt-2 flex flex-col sm:flex-row sm:items-center gap-4">
              <button
                onClick={onOpenPrompt}
                className="glass-surface-interactive group inline-flex items-center gap-3 px-4 py-2.5 rounded-xl cursor-pointer font-sans text-xs sm:text-sm font-medium tracking-wide outline-none"
                style={{
                  color: "var(--text-secondary)",
                }}
              >
                <TerminalIcon
                  className="w-4 h-4 group-hover:rotate-12 transition-transform"
                  style={{ color: "var(--text-primary)" }}
                />
                <span>{t.hero.promptButton}</span>
                <span className="text-xs hidden sm:inline opacity-60">
                  {t.hero.promptHint}
                </span>
                <CornerDownLeft className="w-3.5 h-3.5 ml-auto opacity-50 group-hover:opacity-100 transition-opacity" />
              </button>

              <button
                onClick={onNavigateWork}
                className="text-xs font-sans font-medium tracking-wider uppercase transition-colors flex items-center gap-1.5 cursor-pointer py-1 outline-none group"
                style={{ color: "var(--text-muted)" }}
              >
                <span className="group-hover:text-[var(--text-primary)] transition-colors">{t.hero.navigateCode}</span>
                <span className="group-hover:text-[var(--text-primary)] transition-colors">↓</span>
              </button>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
});
