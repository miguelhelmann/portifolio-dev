"use client";

import React, { useState, useEffect, useCallback } from "react";
import { X, Mail, Copy, Check, ArrowUpRight } from "lucide-react";
import { OutlookIcon, GmailIcon } from "@/components/icons/TechIcons";
import { usePortfolio } from "@/context/PortfolioContext";

interface EmailComposeModalProps {
  isOpen: boolean;
  onClose: () => void;
  email: string;
}

export const EmailComposeModal: React.FC<EmailComposeModalProps> = React.memo(
  function EmailComposeModal({ isOpen, onClose, email }) {
    const { t, theme } = usePortfolio();
    const isColor = theme === "color";
    const [copied, setCopied] = useState(false);

    // Close on ESC
    useEffect(() => {
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape" && isOpen) {
          onClose();
        }
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }, [isOpen, onClose]);

    // Reset copied state on open
    useEffect(() => {
      if (isOpen) {
        setCopied(false);
      }
    }, [isOpen]);

    const handleCopy = useCallback(async () => {
      try {
        await navigator.clipboard.writeText(email);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch {
        // Fallback for older environments
        const textArea = document.createElement("textarea");
        textArea.value = email;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    }, [email]);

    const handleOutlook = useCallback(() => {
      window.open(
        `https://outlook.live.com/mail/0/deeplink/compose?to=${encodeURIComponent(email)}`,
        "_blank",
        "noopener,noreferrer"
      );
      onClose();
    }, [email, onClose]);

    const handleGmail = useCallback(() => {
      window.open(
        `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(email)}`,
        "_blank",
        "noopener,noreferrer"
      );
      onClose();
    }, [email, onClose]);

    const handleDefaultMailto = useCallback(() => {
      window.location.href = `mailto:${email}`;
      onClose();
    }, [email, onClose]);

    if (!isOpen) return null;

    return (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
        role="dialog"
        aria-modal="true"
        aria-labelledby="email-compose-title"
      >
        {/* Backdrop */}
        <div
          className="fixed inset-0 transition-opacity duration-200"
          style={{
            backgroundColor: isColor ? "rgba(15, 23, 42, 0.45)" : "rgba(0, 0, 0, 0.75)",
            backdropFilter: "blur(6px)",
            WebkitBackdropFilter: "blur(6px)",
          }}
          onClick={onClose}
        />

        {/* Modal Window */}
        <div
          className="relative w-full max-w-md rounded-2xl glass-surface p-5 sm:p-6 shadow-2xl transition-all duration-200 z-10 space-y-5 animate-in fade-in zoom-in-95"
          style={{
            borderColor: "var(--border-hairline)",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-start justify-between gap-4 border-b pb-4" style={{ borderColor: "var(--border-hairline)" }}>
            <div>
              <h3
                id="email-compose-title"
                className="font-display text-lg font-bold tracking-tight"
                style={{ color: "var(--text-primary)" }}
              >
                {t.contact.emailModalTitle}
              </h3>
              <p className="text-xs font-sans mt-0.5" style={{ color: "var(--text-muted)" }}>
                {t.contact.emailModalSubtitle}
              </p>
              <p className="text-xs font-mono font-medium mt-1 select-all" style={{ color: "var(--text-secondary)" }}>
                {email}
              </p>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-lg opacity-60 hover:opacity-100 transition-opacity cursor-pointer outline-none focus-visible:ring-1 focus-visible:ring-[var(--text-primary)]"
              aria-label={t.contact.emailModalClose}
              style={{ color: "var(--text-primary)" }}
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Composition Options */}
          <div className="space-y-2.5 font-sans">
            {/* 1. Outlook Webmail */}
            <button
              type="button"
              onClick={handleOutlook}
              className="w-full glass-surface-interactive group flex items-center justify-between p-3.5 sm:p-4 rounded-xl cursor-pointer text-left outline-none transition-colors"
            >
              <div className="flex items-center gap-3.5 min-w-0">
                <div
                  className="p-2 rounded-lg shrink-0 transition-colors"
                  style={{
                    backgroundColor: isColor ? "rgba(0, 120, 212, 0.12)" : "var(--bg-surface-elevated)",
                    color: isColor ? "#0078D4" : "var(--text-primary)",
                  }}
                >
                  <OutlookIcon className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <div className="text-xs font-bold tracking-tight" style={{ color: "var(--text-primary)" }}>
                    {t.contact.emailModalOutlook}
                  </div>
                  <div className="text-[11px] truncate opacity-70" style={{ color: "var(--text-muted)" }}>
                    {t.contact.emailModalOutlookDesc}
                  </div>
                </div>
              </div>
              <ArrowUpRight
                className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 shrink-0 ml-2"
                style={{ color: "var(--text-primary)" }}
              />
            </button>

            {/* 2. Gmail Webmail */}
            <button
              type="button"
              onClick={handleGmail}
              className="w-full glass-surface-interactive group flex items-center justify-between p-3.5 sm:p-4 rounded-xl cursor-pointer text-left outline-none transition-colors"
            >
              <div className="flex items-center gap-3.5 min-w-0">
                <div
                  className="p-2 rounded-lg shrink-0 transition-colors"
                  style={{
                    backgroundColor: isColor ? "rgba(234, 67, 53, 0.12)" : "var(--bg-surface-elevated)",
                    color: isColor ? "#EA4335" : "var(--text-primary)",
                  }}
                >
                  <GmailIcon className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <div className="text-xs font-bold tracking-tight" style={{ color: "var(--text-primary)" }}>
                    {t.contact.emailModalGmail}
                  </div>
                  <div className="text-[11px] truncate opacity-70" style={{ color: "var(--text-muted)" }}>
                    {t.contact.emailModalGmailDesc}
                  </div>
                </div>
              </div>
              <ArrowUpRight
                className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 shrink-0 ml-2"
                style={{ color: "var(--text-primary)" }}
              />
            </button>

            {/* 3. Default App (mailto:) */}
            <button
              type="button"
              onClick={handleDefaultMailto}
              className="w-full glass-surface-interactive group flex items-center justify-between p-3.5 sm:p-4 rounded-xl cursor-pointer text-left outline-none transition-colors"
            >
              <div className="flex items-center gap-3.5 min-w-0">
                <div
                  className="p-2 rounded-lg shrink-0 transition-colors"
                  style={{
                    backgroundColor: "var(--bg-surface-elevated)",
                    color: "var(--text-primary)",
                  }}
                >
                  <Mail className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <div className="text-xs font-bold tracking-tight" style={{ color: "var(--text-primary)" }}>
                    {t.contact.emailModalDefault}
                  </div>
                  <div className="text-[11px] truncate opacity-70" style={{ color: "var(--text-muted)" }}>
                    {t.contact.emailModalDefaultDesc}
                  </div>
                </div>
              </div>
              <ArrowUpRight
                className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 shrink-0 ml-2"
                style={{ color: "var(--text-primary)" }}
              />
            </button>

            {/* 4. Copy Email Address */}
            <button
              type="button"
              onClick={handleCopy}
              className="w-full glass-surface-interactive group flex items-center justify-between p-3.5 sm:p-4 rounded-xl cursor-pointer text-left outline-none transition-colors"
            >
              <div className="flex items-center gap-3.5 min-w-0">
                <div
                  className="p-2 rounded-lg shrink-0 transition-colors"
                  style={{
                    backgroundColor: "var(--bg-surface-elevated)",
                    color: "var(--text-primary)",
                  }}
                >
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                </div>
                <div className="min-w-0">
                  <div className="text-xs font-bold tracking-tight" style={{ color: "var(--text-primary)" }}>
                    {copied ? t.contact.emailModalCopyDone : t.contact.emailModalCopy}
                  </div>
                  <div className="text-[11px] truncate opacity-70 font-mono" style={{ color: "var(--text-muted)" }}>
                    {email}
                  </div>
                </div>
              </div>
              <span
                className="text-[11px] font-medium tracking-wide uppercase px-2 py-0.5 rounded transition-colors"
                style={{
                  backgroundColor: "var(--bg-surface-elevated)",
                  color: "var(--text-secondary)",
                }}
              >
                {copied ? "✓" : "Copy"}
              </span>
            </button>
          </div>
        </div>
      </div>
    );
  }
);
