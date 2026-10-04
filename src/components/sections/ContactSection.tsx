"use client";

import React, { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { GitHubIcon, WhatsAppIcon, OutlookIcon } from "@/components/icons/TechIcons";
import { DEVELOPER_PROFILE } from "@/config/portfolio.config";
import { usePortfolio } from "@/context/PortfolioContext";
import { EmailComposeModal } from "@/components/system/EmailComposeModal";
import { LiquidText } from "@/components/ui/LiquidText";

export const ContactSection: React.FC = React.memo(function ContactSection() {
  const { t, theme } = usePortfolio();
  const { socials } = DEVELOPER_PROFILE;
  const isColor = theme === "color";
  const [emailModalOpen, setEmailModalOpen] = useState(false);

  return (
    <section id="contact" aria-label="Contact" className="space-y-12 sm:space-y-16 pt-8 pb-20 scroll-mt-20">
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
            {t.contact.sectionNum}
          </span>
          <span className="opacity-40">/</span>
          <span className="tracking-wider uppercase font-semibold" style={{ color: "var(--text-secondary)" }}>
            {t.contact.sectionTag}
          </span>
          <span className="opacity-40">•</span>
          <span className="opacity-80 uppercase tracking-wider text-[11px]">{t.contact.sectionCategory}</span>
        </div>
      </div>

      {/* Editorial Contact Composition */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
        {/* Left Side: Large Typographic Monolith */}
        <div className="lg:col-span-6 space-y-4">
          <h2
            className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[0.95] uppercase transition-colors"
            style={{ color: "var(--text-primary)" }}
          >
            <span>{t.contact.headlinePart1}</span>
            <br />
            <LiquidText intensity={2.0}>
              <span className="headline-contrast inline-block transition-colors">
                {t.contact.headlinePart2}
              </span>
            </LiquidText>
          </h2>
          <p
            className="text-sm font-sans max-w-md pt-2 leading-relaxed transition-colors"
            style={{ color: "var(--text-secondary)" }}
          >
            {t.contact.subtitle}
          </p>
        </div>

        {/* Right Side: Professional Destination Hierarchy (Stable, high-end interactive cards) */}
        <div className="lg:col-span-6 space-y-3.5 font-sans">
          {/* 01. Outlook Email (Primary Direct with Webmail / Local App Fallback) */}
          {socials.email && (
            <a
              href={`mailto:${socials.email}`}
              onClick={(e) => {
                e.preventDefault();
                setEmailModalOpen(true);
              }}
              className="glass-surface-interactive group flex items-center justify-between p-5 sm:p-6 rounded-2xl cursor-pointer outline-none w-full active:scale-[0.99] transition-all"
            >
              <div className="flex items-center gap-4 min-w-0">
                <div
                  className="p-2.5 rounded-xl transition-colors shrink-0"
                  style={{
                    backgroundColor: isColor ? "rgba(0, 120, 212, 0.12)" : "var(--bg-surface-elevated)",
                    color: isColor ? "#0078D4" : "var(--text-primary)",
                  }}
                >
                  <OutlookIcon className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span
                      className="text-sm font-bold tracking-tight transition-colors"
                      style={{ color: "var(--text-primary)" }}
                    >
                      {t.contact.emailLabel}
                    </span>
                    <span
                      className="text-[10px] font-sans font-medium uppercase tracking-wider px-2 py-0.5 rounded transition-colors"
                      style={{
                        backgroundColor: isColor ? "rgba(0, 120, 212, 0.08)" : "var(--bg-surface-elevated)",
                        color: isColor ? "#0078D4" : "var(--text-muted)",
                      }}
                    >
                      {t.contact.emailAction}
                    </span>
                  </div>
                  <div className="text-xs transition-colors mt-0.5 truncate font-mono" style={{ color: "var(--text-muted)" }}>
                    {socials.email}
                  </div>
                </div>
              </div>
              <ArrowUpRight
                className="w-5 h-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 shrink-0 ml-4"
                style={{ color: "var(--text-primary)" }}
              />
            </a>
          )}

          {/* 02. WhatsApp (Primary Direct with Prefilled Intent Message) */}
          {socials.whatsapp && (
            <a
              href={`https://wa.me/${socials.whatsapp.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(t.contact.whatsappPrefill)}`}
              target="_blank"
              rel="noreferrer"
              className="glass-surface-interactive group flex items-center justify-between p-5 sm:p-6 rounded-2xl cursor-pointer outline-none w-full active:scale-[0.99] transition-all"
            >
              <div className="flex items-center gap-4 min-w-0">
                <div
                  className="p-2.5 rounded-xl transition-colors shrink-0"
                  style={{
                    backgroundColor: isColor ? "rgba(37, 211, 102, 0.12)" : "var(--bg-surface-elevated)",
                    color: isColor ? "#25D366" : "var(--text-primary)",
                  }}
                >
                  <WhatsAppIcon className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span
                      className="text-sm font-bold tracking-tight transition-colors"
                      style={{ color: "var(--text-primary)" }}
                    >
                      {t.contact.whatsappLabel}
                    </span>
                    <span
                      className="text-[10px] font-sans font-medium uppercase tracking-wider px-2 py-0.5 rounded transition-colors"
                      style={{
                        backgroundColor: isColor ? "rgba(37, 211, 102, 0.08)" : "var(--bg-surface-elevated)",
                        color: isColor ? "#25D366" : "var(--text-muted)",
                      }}
                    >
                      {t.contact.whatsappAction}
                    </span>
                  </div>
                  <div className="text-xs transition-colors mt-0.5 truncate font-mono" style={{ color: "var(--text-muted)" }}>
                    {socials.whatsapp}
                  </div>
                </div>
              </div>
              <ArrowUpRight
                className="w-5 h-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 shrink-0 ml-4"
                style={{ color: "var(--text-primary)" }}
              />
            </a>
          )}

          {/* 03. GitHub Repositories (Strictly Equal Proportions & Layout) */}
          {socials.github && (
            <a
              href={socials.github}
              target="_blank"
              rel="noreferrer"
              className="glass-surface-interactive group flex items-center justify-between p-5 sm:p-6 rounded-2xl cursor-pointer outline-none w-full active:scale-[0.99] transition-all"
            >
              <div className="flex items-center gap-4 min-w-0">
                <div
                  className="p-2.5 rounded-xl transition-colors shrink-0"
                  style={{
                    backgroundColor: isColor ? "rgba(15, 23, 42, 0.08)" : "var(--bg-surface-elevated)",
                    color: isColor ? "#0f172a" : "var(--text-primary)",
                  }}
                >
                  <GitHubIcon className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span
                      className="text-sm font-bold tracking-tight transition-colors"
                      style={{ color: "var(--text-primary)" }}
                    >
                      {t.contact.githubLabel}
                    </span>
                    <span
                      className="text-[10px] font-sans font-medium uppercase tracking-wider px-2 py-0.5 rounded transition-colors"
                      style={{
                        backgroundColor: isColor ? "rgba(15, 23, 42, 0.06)" : "var(--bg-surface-elevated)",
                        color: isColor ? "var(--text-primary)" : "var(--text-muted)",
                      }}
                    >
                      {t.contact.githubAction}
                    </span>
                  </div>
                  <div className="text-xs transition-colors mt-0.5 truncate font-mono" style={{ color: "var(--text-muted)" }}>
                    {socials.github.replace("https://", "")}
                  </div>
                </div>
              </div>
              <ArrowUpRight
                className="w-5 h-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 shrink-0 ml-4"
                style={{ color: "var(--text-primary)" }}
              />
            </a>
          )}
        </div>
      </div>

      {/* Browser Webmail & Desktop Email Composition Choice Modal */}
      {socials.email && (
        <EmailComposeModal
          isOpen={emailModalOpen}
          onClose={() => setEmailModalOpen(false)}
          email={socials.email}
        />
      )}
    </section>
  );
});
