"use client";

import React from "react";
import { TechLogo, TECH_BRAND_COLORS } from "@/components/icons/TechIcons";
import { usePortfolio } from "@/context/PortfolioContext";
import { GraduationCap, Target } from "lucide-react";
import { GlowCard } from "@/components/ui/GlowCard";

// Primary languages & framework vs web foundations for varied scale/spacing composition
const PRIMARY_TECHS = [
  { key: "JavaScript", query: "javascript" },
  { key: "TypeScript", query: "typescript" },
  { key: "Python", query: "python" },
  { key: "React", query: "react" },
];

const FOUNDATION_TECHS = [
  { key: "HTML5", query: "html" },
  { key: "CSS3", query: "css" },
];

export const IdentitySection: React.FC = React.memo(function IdentitySection() {
  const { t, theme } = usePortfolio();
  const isColor = theme === "color";

  return (
    <section id="technologies" aria-label="Identity & Technologies" className="space-y-12 sm:space-y-16 scroll-mt-20 relative">
      <div id="identity" className="absolute top-0 pointer-events-none scroll-mt-20" />

      {/* Section Architectural Rule — Clean & Stable */}
      <div
        className="flex items-center border-b pb-4 font-sans text-xs transition-colors"
        style={{
          borderColor: "var(--border-hairline)",
          color: "var(--text-muted)",
        }}
      >
        <div className="flex items-center gap-2">
          <span className="font-bold font-mono" style={{ color: "var(--text-primary)" }}>
            {t.identity.sectionNum}
          </span>
          <span className="opacity-40">/</span>
          <span className="tracking-wider uppercase font-semibold" style={{ color: "var(--text-secondary)" }}>
            {t.identity.sectionTag}
          </span>
          <span className="opacity-40">•</span>
          <span className="opacity-80 uppercase tracking-wider text-[11px]">{t.identity.whoIAm}</span>
        </div>
      </div>

      {/* 01. Technology Identity — Direct & Professional Presentation */}
      <div className="space-y-5">
        <div
          className="font-sans text-xs uppercase tracking-wider font-semibold"
          style={{ color: "var(--text-dim)" }}
        >
          {t.identity.techExploredLabel}
        </div>

        {/* Authored Technology Composition — Unified Architectural Glass Register */}
        <div
          className="glass-surface rounded-2xl overflow-hidden divide-y transition-colors"
          style={{
            borderColor: "var(--border-hairline)",
          }}
        >
          {/* Tier 1: Primary Languages & UI Stack (Commanding Scale & Spacing) */}
          <div
            className="grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 divide-x transition-colors"
            style={{ borderColor: "var(--border-hairline)" }}
          >
            {PRIMARY_TECHS.map((tech) => {
              const techData = t.identity.technologies[tech.key];
              const brandColor = TECH_BRAND_COLORS[tech.query] || "#ffffff";

              return (
                <div
                  key={tech.key}
                  className="group relative p-6 sm:p-7 transition-colors duration-200 flex flex-col justify-between hover:bg-[var(--bg-surface-elevated)]"
                  style={{
                    backgroundColor: "transparent",
                  }}
                >
                  {/* Authentic Vector Logo — Primary Scale, Stable */}
                  <div
                    className="transition-colors duration-200 flex items-center justify-center h-14"
                    style={{
                      color: isColor
                        ? brandColor
                        : "var(--text-muted)",
                    }}
                  >
                    <TechLogo
                      tech={tech.query}
                      colored={isColor}
                      frameClassName="w-11 h-11 sm:w-12 sm:h-12"
                      className="w-full h-full object-contain group-hover:opacity-100 transition-opacity"
                    />
                  </div>

                  {/* Typographic Metadata */}
                  <div className="pt-6 space-y-1">
                    <div
                      className="font-sans text-sm font-semibold tracking-tight transition-colors group-hover:text-[var(--text-primary)]"
                      style={{
                        color: "var(--text-secondary)",
                      }}
                    >
                      {tech.key}
                    </div>
                    <div
                      className="font-sans text-[11px] transition-colors line-clamp-1"
                      style={{
                        color: "var(--text-dim)",
                      }}
                    >
                      {techData?.shortRole}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Tier 2: Foundational Web Technologies (Complementary Proportions) */}
          <div
            className="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x transition-colors"
            style={{
              borderColor: "var(--border-hairline)",
              backgroundColor: isColor ? "rgba(248, 250, 252, 0.5)" : "rgba(0, 0, 0, 0.18)",
            }}
          >
            {FOUNDATION_TECHS.map((tech) => {
              const techData = t.identity.technologies[tech.key];
              const brandColor = TECH_BRAND_COLORS[tech.query] || "#ffffff";

              return (
                <div
                  key={tech.key}
                  className="group relative p-5 sm:p-6 transition-colors duration-200 flex items-center justify-between gap-4 hover:bg-[var(--bg-surface-elevated)]"
                  style={{
                    backgroundColor: "transparent",
                  }}
                >
                  <div className="flex items-center gap-4">
                    {/* Authentic Vector Logo — Complementary Scale, Stable */}
                    <div
                      className="transition-colors duration-200 flex items-center justify-center shrink-0"
                      style={{
                        color: isColor
                          ? brandColor
                          : "var(--text-muted)",
                      }}
                    >
                      <TechLogo
                        tech={tech.query}
                        colored={isColor}
                        frameClassName="w-9 h-9 sm:w-10 sm:h-10"
                        className="w-full h-full object-contain group-hover:opacity-100 transition-opacity"
                      />
                    </div>

                    {/* Metadata */}
                    <div className="space-y-0.5">
                      <div
                        className="font-sans text-sm font-semibold tracking-tight transition-colors group-hover:text-[var(--text-primary)]"
                        style={{
                          color: "var(--text-secondary)",
                        }}
                      >
                        {tech.key}
                      </div>
                      <div
                        className="font-sans text-[11px] transition-colors"
                        style={{
                          color: "var(--text-dim)",
                        }}
                      >
                        {techData?.shortRole}
                      </div>
                    </div>
                  </div>

                  <span
                    className="text-[10px] font-sans uppercase tracking-wider font-semibold shrink-0"
                    style={{ color: "var(--text-dim)" }}
                  >
                    Foundation
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 03 / ESTUDOS: Formação Acadêmica & Próximo Passo */}
      <div
        id="studies"
        className="scroll-mt-20 pt-4 space-y-6"
      >
        {/* Section Architectural Rule for 03 / ESTUDOS */}
        <div
          className="flex items-center border-b pb-4 font-sans text-xs transition-colors"
          style={{
            borderColor: "var(--border-hairline)",
            color: "var(--text-muted)",
          }}
        >
          <div className="flex items-center gap-2">
            <span className="font-bold font-mono" style={{ color: "var(--text-primary)" }}>
              {t.identity.studiesSectionNum}
            </span>
            <span className="opacity-40">/</span>
            <span className="tracking-wider uppercase font-semibold" style={{ color: "var(--text-secondary)" }}>
              {t.identity.studiesSectionTag}
            </span>
            <span className="opacity-40">•</span>
            <span className="opacity-80 uppercase tracking-wider text-[11px]">{t.identity.studiesCategory}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch pt-2">
          {/* Studies Presentation (Columns 1–7) — Stable Slab with Subtle Glow */}
          <div className="lg:col-span-7">
            <GlowCard className="h-full">
              <div className="glass-surface rounded-2xl p-6 sm:p-8 space-y-4 h-full">
                <div
                  className="flex items-center gap-2 font-sans text-xs uppercase tracking-wider font-semibold"
                  style={{ color: "var(--text-primary)" }}
                >
                  <GraduationCap className="w-4 h-4" />
                  <span>{t.identity.studiesLabel}</span>
                </div>

                <div className="space-y-1.5">
                  <h3
                    className="font-display text-2xl sm:text-3xl font-bold tracking-tight transition-colors"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {t.identity.course}
                  </h3>
                  <p
                    className="font-sans text-xs tracking-wider uppercase transition-colors font-mono"
                    style={{ color: "var(--text-muted)" }}
                  >
                    {t.identity.institution}
                  </p>
                </div>

                <blockquote
                  className="text-sm leading-relaxed max-w-xl transition-colors font-sans border-l-2 pl-4 py-1"
                  style={{
                    borderColor: "var(--border-hover)",
                    color: "var(--text-secondary)",
                  }}
                >
                  &quot;{t.identity.studiesDescription}&quot;
                </blockquote>
              </div>
            </GlowCard>
          </div>

          {/* Future Step (Columns 8–12) — Stable Slab with Subtle Glow */}
          <div className="lg:col-span-5">
            <GlowCard className="h-full">
              <div className="glass-surface rounded-2xl p-6 sm:p-8 space-y-4 flex flex-col justify-between h-full">
                <div className="space-y-4">
                  <div
                    className="flex items-center gap-2 font-sans text-xs uppercase tracking-wider font-semibold"
                    style={{ color: "var(--text-primary)" }}
                  >
                    <Target className="w-4 h-4" />
                    <span>{t.identity.nextStepLabel}</span>
                  </div>

                  <div className="space-y-2">
                    <h3
                      className="font-display text-2xl sm:text-3xl font-bold tracking-tight transition-colors"
                      style={{ color: "var(--text-primary)" }}
                    >
                      {t.identity.nextStepGoal}
                    </h3>
                    <p
                      className="text-xs sm:text-sm font-sans leading-relaxed transition-colors"
                      style={{ color: "var(--text-muted)" }}
                    >
                      {t.identity.nextStepDesc}
                    </p>
                  </div>
                </div>
              </div>
            </GlowCard>
          </div>
        </div>
      </div>
    </section>
  );
});
