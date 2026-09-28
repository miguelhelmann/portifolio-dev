"use client";

import React, { useState, useEffect } from "react";
import { SystemBar } from "@/components/system/SystemBar";
import { AmbientBackground } from "@/components/system/AmbientBackground";
import { BootSequence } from "@/components/system/BootSequence";
import { CommandPalette } from "@/components/system/CommandPalette";
import { HeroSection } from "@/components/sections/HeroSection";
import { CodeSection } from "@/components/sections/CodeSection";
import { IdentitySection } from "@/components/sections/IdentitySection";
import { ContactSection } from "@/components/sections/ContactSection";

export default function Home() {
  const [booted, setBooted] = useState(
    () => typeof window !== "undefined" && !!sessionStorage.getItem("miguel_os_booted")
  );
  const [paletteOpen, setPaletteOpen] = useState(false);

  const handleOpenPalette = React.useCallback(() => setPaletteOpen(true), []);
  const handleClosePalette = React.useCallback(() => setPaletteOpen(false), []);

  const scrollToSection = React.useCallback((sectionId: string) => {
    let targetId = sectionId;
    if (sectionId === "code") targetId = "projects";
    if (sectionId === "identity") targetId = "technologies";
    const el = document.getElementById(targetId) || document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  const handleNavigateCode = React.useCallback(() => {
    scrollToSection("projects");
  }, [scrollToSection]);

  // Global keyboard shortcut listener for Ctrl+K / Cmd+K and /
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setPaletteOpen((prev) => !prev);
      } else if (e.key === "/" && !["INPUT", "TEXTAREA"].includes((e.target as HTMLElement).tagName)) {
        e.preventDefault();
        setPaletteOpen(true);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div
      className="relative min-h-screen flex flex-col font-sans transition-colors duration-300"
      style={{
        backgroundColor: "var(--bg-primary)",
        color: "var(--text-primary)",
      }}
    >
      {/* 350ms Non-blocking Boot Sequence */}
      {!booted && <BootSequence onBootComplete={() => setBooted(true)} />}

      {/* Ambient Canvas Background with Analog Grain & Reactive Light */}
      <AmbientBackground />

      {/* Top Architectural System Bar with Theme Toggle & Language Selector */}
      <SystemBar
        onOpenCommandPalette={handleOpenPalette}
        onNavigateSection={scrollToSection}
      />

      {/* Command Palette Modal (Ctrl+K or /) — Mounted only when opened */}
      {paletteOpen && (
        <CommandPalette
          isOpen={paletteOpen}
          onClose={handleClosePalette}
          onSelectAction={scrollToSection}
        />
      )}

      {/* Continuous Architectural Canvas */}
      <main className="relative z-10 flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 space-y-16 sm:space-y-24">
        {/* HERO: Typographic Monolith */}
        <div id="hero">
          <HeroSection
            onOpenPrompt={handleOpenPalette}
            onNavigateWork={handleNavigateCode}
          />
        </div>

        {/* 01 / PROJETOS: Dynamic GitHub Repository Explorer */}
        <CodeSection />

        {/* 02 / TECNOLOGIAS & 03 / ESTUDOS: Technology Identity, Motivation, Studies & Future Step */}
        <IdentitySection />

        {/* 04 / CONTATO: Direct Communication Channels */}
        <ContactSection />
      </main>

      {/* NO FOOTER: The page concludes naturally after 04 / CONTATO */}
    </div>
  );
}
