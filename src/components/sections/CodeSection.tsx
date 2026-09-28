"use client";

import React, { useState } from "react";
import { ArrowUpRight, GitFork, Terminal, FolderGit2 } from "lucide-react";
import { GITHUB_REPOS } from "@/config/portfolio.config";
import { TechLogo } from "@/components/icons/TechIcons";
import { usePortfolio } from "@/context/PortfolioContext";

export const CodeSection: React.FC = React.memo(function CodeSection() {
  const { t, theme } = usePortfolio();
  const [activeIdx, setActiveIdx] = useState<number>(0);
  const activeRepo = GITHUB_REPOS[activeIdx] || GITHUB_REPOS[0];
  const isColor = theme === "color";

  const repoExplanation =
    t.code.repos[activeRepo.name]?.explanation || activeRepo.explanation;
  const repoDescription =
    t.code.repos[activeRepo.name]?.description || activeRepo.description;

  return (
    <section id="projects" aria-label="GitHub Code Repositories" className="space-y-8 scroll-mt-20 relative">
      <div id="code" className="absolute top-0 pointer-events-none scroll-mt-20" />
      {/* Section Architectural Rule */}
      <div
        className="flex items-center justify-between border-b pb-4 font-sans text-xs transition-colors"
        style={{
          borderColor: "var(--border-hairline)",
          color: "var(--text-muted)",
        }}
      >
        <div className="flex items-center gap-2">
          <span className="font-bold" style={{ color: "var(--text-primary)" }}>
            {t.code.sectionNum}
          </span>
          <span className="opacity-40">/</span>
          <span className="tracking-wider uppercase font-semibold" style={{ color: "var(--text-secondary)" }}>
            {t.code.sectionTag}
          </span>
          <span className="opacity-40">•</span>
          <span className="opacity-80 uppercase tracking-wider text-[11px]">{t.code.githubLabel}</span>
        </div>
        <div className="font-sans text-xs hidden sm:flex items-center gap-2 tracking-wider" style={{ color: "var(--text-muted)" }}>
          <span
            className="h-1.5 w-1.5 rounded-full transition-colors"
            style={{ backgroundColor: "var(--accent)" }}
          />
          <span>miguelhelmann</span>
        </div>
      </div>

      {/* Dynamic Repository Explorer: Interactive Index + Architectural Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Left Column: Interactive Project Index (5 cols) */}
        <div className="lg:col-span-5 space-y-3" role="tablist" aria-label={t.code.selectRepoLabel}>
          <div
            className="text-[11px] font-sans uppercase tracking-wider font-semibold pb-1 flex items-center justify-between"
            style={{ color: "var(--text-dim)" }}
          >
            <span>{t.code.selectRepoLabel}</span>
            <span>(0{GITHUB_REPOS.length})</span>
          </div>

          {/* Interactive Project Index with Glass Surface */}
          <div
            className="glass-surface rounded-xl overflow-hidden border transition-colors divide-y"
            style={{
              borderColor: "var(--border-hairline)",
            }}
          >
            {GITHUB_REPOS.map((repo, idx) => {
              const isSelected = activeIdx === idx;

              return (
                <button
                  key={repo.name}
                  role="tab"
                  aria-selected={isSelected}
                  tabIndex={0}
                  onClick={() => setActiveIdx(idx)}
                  onFocus={() => setActiveIdx(idx)}
                  onKeyDown={(e) => {
                    if (e.key === "ArrowDown") {
                      e.preventDefault();
                      setActiveIdx((prev) => (prev + 1) % GITHUB_REPOS.length);
                    } else if (e.key === "ArrowUp") {
                      e.preventDefault();
                      setActiveIdx((prev) => (prev - 1 + GITHUB_REPOS.length) % GITHUB_REPOS.length);
                    }
                  }}
                  className="w-full text-left py-4 px-3 sm:px-4 transition-all duration-150 cursor-pointer outline-none block group relative hover:bg-[var(--bg-surface-elevated)]"
                  style={{
                    backgroundColor: isSelected
                      ? isColor
                        ? "rgba(15, 23, 42, 0.05)"
                        : "var(--bg-surface-elevated)"
                      : "transparent",
                    borderLeft: isSelected
                      ? "2px solid var(--accent)"
                      : "2px solid transparent",
                  }}
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3 min-w-0">
                      <span
                        className="font-sans text-xs font-bold tracking-wider transition-colors shrink-0"
                        style={{ color: isSelected ? "var(--text-primary)" : "var(--text-dim)" }}
                      >
                        0{idx + 1}
                      </span>
                      <span
                        className="font-sans text-sm font-semibold tracking-tight transition-colors truncate"
                        style={{ color: isSelected ? "var(--text-primary)" : "var(--text-secondary)" }}
                      >
                        {repo.name}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      {repo.languages.slice(0, 3).map((lang) => (
                        <div
                          key={lang}
                          className="transition-colors opacity-75 group-hover:opacity-100"
                          style={{ color: isSelected ? "var(--text-primary)" : "var(--text-muted)" }}
                          title={lang}
                        >
                          <TechLogo tech={lang} frameClassName="w-3.5 h-3.5" colored={isColor} />
                        </div>
                      ))}
                    </div>
                  </div>

                  <p
                    className="mt-1.5 text-xs line-clamp-1 font-sans transition-colors pl-7"
                    style={{ color: "var(--text-muted)" }}
                  >
                    {t.code.repos[repo.name]?.description || repo.description}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Profile link */}
          <div className="pt-2">
            <a
              href="https://github.com/miguelhelmann"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 font-sans text-xs tracking-wider transition-colors py-1 group outline-none"
              style={{ color: "var(--text-muted)" }}
            >
              <FolderGit2 className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" style={{ color: "var(--text-primary)" }} />
              <span className="group-hover:underline underline-offset-4">{t.code.viewAllGithub}</span>
              <ArrowUpRight className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 transition-opacity" />
            </a>
          </div>
        </div>

        {/* Right Column: Architectural Inspector Panel (7 cols) */}
        <div className="lg:col-span-7">
          <div
            className="glass-surface p-6 sm:p-8 rounded-xl space-y-6 relative transition-colors duration-200"
            style={{
              borderColor: "var(--border-hairline)",
            }}
          >
            {/* Top Bar inside inspector */}
            <div
              className="flex items-start justify-between gap-4 border-b pb-5 transition-colors"
              style={{ borderColor: "var(--border-hairline)" }}
            >
              <div className="space-y-1">
                <div
                  className="flex items-center gap-2 font-sans text-xs tracking-wider uppercase font-semibold"
                  style={{ color: "var(--text-primary)" }}
                >
                  <Terminal className="w-3.5 h-3.5" />
                  <span>{t.code.activeRepoLabel}</span>
                </div>
                <h3
                  className="font-display text-2xl sm:text-3xl font-bold tracking-tight transition-colors"
                  style={{ color: "var(--text-primary)" }}
                >
                  {activeRepo.name}
                </h3>
              </div>

              <a
                href={activeRepo.url}
                target="_blank"
                rel="noreferrer"
                className="glass-surface-interactive shrink-0 inline-flex items-center gap-2 px-3.5 py-2 rounded-lg cursor-pointer outline-none hover:opacity-90"
              >
                <span className="text-xs font-sans font-semibold tracking-wider" style={{ color: "var(--text-primary)" }}>{t.code.viewOnGithub}</span>
                <ArrowUpRight className="w-3.5 h-3.5" style={{ color: "var(--text-primary)" }} />
              </a>
            </div>

            {/* Description as recorded on GitHub */}
            <div className="space-y-2">
              <div
                className="text-[11px] font-sans uppercase tracking-wider font-semibold"
                style={{ color: "var(--text-dim)" }}
              >
                {t.code.publicDescLabel}
              </div>
              <p
                className="text-sm leading-relaxed font-sans italic px-3.5 py-2.5 rounded-lg border transition-colors"
                style={{
                  backgroundColor: "var(--bg-primary)",
                  borderColor: "var(--border-subtle)",
                  color: "var(--text-secondary)",
                }}
              >
                &quot;{repoDescription}&quot;
              </p>
            </div>

            {/* What it does / factual purpose */}
            <div className="space-y-2">
              <div
                className="text-[11px] font-sans uppercase tracking-wider font-semibold"
                style={{ color: "var(--text-dim)" }}
              >
                {t.code.practicalPurposeLabel}
              </div>
              <p
                className="text-sm leading-relaxed font-sans transition-colors"
                style={{ color: "var(--text-secondary)" }}
              >
                {repoExplanation}
              </p>
            </div>

            {/* Technologies detected */}
            <div
              className="space-y-3 pt-2 border-t transition-colors"
              style={{ borderColor: "var(--border-hairline)" }}
            >
              <div
                className="text-[11px] font-sans uppercase tracking-wider font-semibold"
                style={{ color: "var(--text-dim)" }}
              >
                {t.code.techDetectedLabel}
              </div>
              <div className="flex flex-wrap gap-2.5">
                {activeRepo.languages.map((lang) => (
                  <div
                    key={lang}
                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-sans font-medium transition-colors"
                    style={{
                      backgroundColor: "var(--bg-surface-elevated)",
                      borderColor: "var(--border-hairline)",
                      color: "var(--text-primary)",
                    }}
                  >
                    <TechLogo tech={lang} frameClassName="w-4 h-4" colored={isColor} />
                    <span>{lang}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Minimal clone reference */}
            <div
              className="pt-2 border-t flex items-center justify-between text-xs font-sans transition-colors"
              style={{
                borderColor: "var(--border-hairline)",
                color: "var(--text-dim)",
              }}
            >
              <div className="flex items-center gap-2 truncate">
                <GitFork className="w-3.5 h-3.5 shrink-0" style={{ color: "var(--text-dim)" }} />
                <span className="truncate">git clone {activeRepo.url}.git</span>
              </div>
              <span className="text-[11px] shrink-0 hidden sm:inline uppercase font-semibold tracking-wider">
                {t.code.publicRepoBadge}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});
