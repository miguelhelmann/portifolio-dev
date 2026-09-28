"use client";

import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { Search, X, FolderGit2, User, Mail, Copy, Check, Palette, Globe } from "lucide-react";
import { DEVELOPER_PROFILE } from "@/config/portfolio.config";
import { usePortfolio } from "@/context/PortfolioContext";

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectAction: (actionId: string) => void;
}

interface CommandItem {
  id: string;
  title: string;
  category: string;
  icon: React.ReactNode;
  shortcut?: string;
  action: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  onSelectAction,
}) => {
  const { t, language, setLanguage, theme, setTheme } = usePortfolio();
  const [query, setQuery] = useState("");
  const [copied, setCopied] = useState<string | null>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const copyToClipboard = useCallback((text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopied(label);
    setTimeout(() => {
      setCopied(null);
      onClose();
    }, 1200);
  }, [onClose]);

  const nextTheme = theme === "dark" ? "color" : "dark";

  const nextLang = language === "pt" ? "en" : "pt";

  const commands: CommandItem[] = useMemo(() => [
    {
      id: "nav-code",
      title: t.commandPalette.navCode,
      category: t.commandPalette.navTitle,
      icon: <FolderGit2 className="w-4 h-4" style={{ color: "var(--accent)" }} />,
      action: () => {
        onSelectAction("code");
        onClose();
      },
    },
    {
      id: "nav-identity",
      title: t.commandPalette.navIdentity,
      category: t.commandPalette.navTitle,
      icon: <User className="w-4 h-4" style={{ color: "var(--accent)" }} />,
      action: () => {
        onSelectAction("technologies");
        onClose();
      },
    },
    {
      id: "nav-studies",
      title: t.commandPalette.navStudies,
      category: t.commandPalette.navTitle,
      icon: <User className="w-4 h-4" style={{ color: "var(--accent)" }} />,
      action: () => {
        onSelectAction("studies");
        onClose();
      },
    },
    {
      id: "nav-contact",
      title: t.commandPalette.navContact,
      category: t.commandPalette.navTitle,
      icon: <Mail className="w-4 h-4" style={{ color: "var(--accent)" }} />,
      action: () => {
        onSelectAction("contact");
        onClose();
      },
    },
    {
      id: "act-theme",
      title: `${t.commandPalette.toggleTheme} → ${nextTheme.toUpperCase()}`,
      category: t.commandPalette.actionsTitle,
      icon: <Palette className="w-4 h-4" style={{ color: "var(--accent)" }} />,
      action: () => {
        setTheme(nextTheme);
        onClose();
      },
    },
    {
      id: "act-lang",
      title: `${t.commandPalette.toggleLang} → ${nextLang.toUpperCase()}`,
      category: t.commandPalette.actionsTitle,
      icon: <Globe className="w-4 h-4" style={{ color: "var(--accent)" }} />,
      action: () => {
        setLanguage(nextLang);
        onClose();
      },
    },
    ...(DEVELOPER_PROFILE.socials.github
      ? [
          {
            id: "act-copy-github",
            title: t.commandPalette.copyGithub,
            category: t.commandPalette.actionsTitle,
            icon: <Copy className="w-4 h-4 opacity-70" />,
            action: () => copyToClipboard(DEVELOPER_PROFILE.socials.github!, "github"),
          },
        ]
      : []),
  ], [t, nextTheme, nextLang, onSelectAction, onClose, setTheme, setLanguage, copyToClipboard]);

  const filteredCommands = useMemo(() =>
    commands.filter((c) =>
      c.title.toLowerCase().includes(query.toLowerCase())
    ),
    [commands, query]
  );

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        setQuery("");
        setSelectedIndex(0);
        inputRef.current?.focus();
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev < filteredCommands.length - 1 ? prev + 1 : prev
        );
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : 0));
      } else if (e.key === "Enter") {
        e.preventDefault();
        if (filteredCommands[selectedIndex]) {
          filteredCommands[selectedIndex].action();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, filteredCommands, selectedIndex, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Command Palette"
      className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-lg rounded-2xl overflow-hidden glass-surface border shadow-2xl transition-all"
        style={{
          borderColor: "var(--border-focus)",
        }}
      >
        {/* Search Input Bar */}
        <div
          className="flex items-center gap-3 px-4 py-3 border-b transition-colors"
          style={{
            borderColor: "var(--border-hairline)",
            backgroundColor: "var(--bg-surface)",
          }}
        >
          <Search className="w-4 h-4 shrink-0" style={{ color: "var(--accent)" }} />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            placeholder={t.commandPalette.placeholder}
            className="flex-1 bg-transparent text-sm focus:outline-none font-sans"
            style={{
              color: "var(--text-primary)",
            }}
          />
          <button
            onClick={onClose}
            aria-label="Close command palette"
            className="hover:opacity-80 transition-opacity p-1 cursor-pointer outline-none"
            style={{ color: "var(--text-muted)" }}
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Command List */}
        <div className="max-h-72 overflow-y-auto p-2 space-y-1">
          {filteredCommands.length === 0 ? (
            <div className="p-4 text-center text-xs font-sans" style={{ color: "var(--text-dim)" }}>
              {t.commandPalette.emptyText}
            </div>
          ) : (
            filteredCommands.map((cmd, idx) => {
              const isSelected = idx === selectedIndex;
              return (
                <button
                  key={cmd.id}
                  onClick={cmd.action}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-left text-xs font-sans transition-colors border cursor-pointer outline-none"
                  style={{
                    backgroundColor: isSelected ? "var(--accent-soft)" : "transparent",
                    color: isSelected ? "var(--accent)" : "var(--text-secondary)",
                    borderColor: isSelected ? "var(--border-focus)" : "transparent",
                  }}
                >
                  <div className="flex items-center gap-2.5">
                    {cmd.icon}
                    <span className="font-medium">{cmd.title}</span>
                  </div>
                  {copied && cmd.id.includes(copied) ? (
                    <span className="flex items-center gap-1 text-[11px] font-bold" style={{ color: "var(--text-primary)" }}>
                      <Check className="w-3.5 h-3.5" /> {t.commandPalette.copyGithubDone}
                    </span>
                  ) : (
                    <span
                      className="text-[10px] uppercase tracking-wider font-semibold"
                      style={{ color: "var(--text-dim)" }}
                    >
                      {cmd.category}
                    </span>
                  )}
                </button>
              );
            })
          )}
        </div>

        {/* Footer shortcuts */}
        <div
          className="px-4 py-2 border-t flex items-center justify-between text-[10px] font-sans transition-colors"
          style={{
            borderColor: "var(--border-subtle)",
            backgroundColor: "var(--bg-surface)",
            color: "var(--text-dim)",
          }}
        >
          <div className="flex items-center gap-3">
            <span>↑↓ Navigate</span>
            <span>↵ Select</span>
            <span>ESC Close</span>
          </div>
          <span style={{ color: "var(--accent)" }} className="font-semibold uppercase tracking-wider">
            PROMPT
          </span>
        </div>
      </div>
    </div>
  );
};
