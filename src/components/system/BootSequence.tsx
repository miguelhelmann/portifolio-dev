"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface BootSequenceProps {
  onBootComplete: () => void;
}

export const BootSequence: React.FC<BootSequenceProps> = React.memo(function BootSequence({ onBootComplete }) {
  const prefersReducedMotion = useReducedMotion();
  const [progress, setProgress] = useState(0);
  const [isDismissed, setIsDismissed] = useState(false);

  const completeBoot = useCallback(() => {
    setIsDismissed(true);
    if (typeof window !== "undefined") {
      sessionStorage.setItem("miguel_os_booted", "true");
    }
    onBootComplete();
  }, [onBootComplete]);

  useEffect(() => {
    if (typeof window !== "undefined" && sessionStorage.getItem("miguel_os_booted")) {
      const timer = setTimeout(() => completeBoot(), 0);
      return () => clearTimeout(timer);
    }
    if (prefersReducedMotion) {
      const timer = setTimeout(() => completeBoot(), 0);
      return () => clearTimeout(timer);
    }

    const stepInterval = 40;
    const totalSteps = 8;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const nextProgress = Math.min(Math.round((currentStep / totalSteps) * 100), 100);
      setProgress(nextProgress);

      if (currentStep >= totalSteps) {
        clearInterval(timer);
        setTimeout(completeBoot, 80);
      }
    }, stepInterval);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.key === "Enter" || e.key === " ") {
        clearInterval(timer);
        completeBoot();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      clearInterval(timer);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [prefersReducedMotion, completeBoot]);

  if (isDismissed || prefersReducedMotion) return null;

  return (
    <div
      onClick={completeBoot}
      role="status"
      aria-label="System Initializing. Click or press Escape to skip."
      className="fixed inset-0 z-50 flex flex-col items-center justify-center font-sans select-none cursor-pointer transition-opacity duration-300"
      style={{
        backgroundColor: "var(--bg-primary)",
        color: "var(--accent)",
      }}
    >
      <div className="w-full max-w-sm px-6 text-center space-y-4">
        {/* Header */}
        <div
          className="text-xs uppercase tracking-widest flex items-center justify-center gap-2"
          style={{ color: "var(--text-secondary)" }}
        >
          <span
            className="h-1.5 w-1.5 rounded-full animate-ping"
            style={{ backgroundColor: "var(--accent)" }}
          />
          <span>MIGUEL HELMANN • PORTFOLIO</span>
        </div>

        {/* Progress Bar */}
        <div
          className="h-1 w-full rounded-full overflow-hidden"
          style={{ backgroundColor: "var(--border-hairline)" }}
        >
          <div
            className="h-full transition-all duration-75"
            style={{
              width: `${progress}%`,
              backgroundColor: "var(--accent)",
              boxShadow: "0 0 10px var(--accent-glow)",
            }}
          />
        </div>

        {/* Status Line */}
        <div
          className="flex items-center justify-between text-[11px]"
          style={{ color: "var(--text-muted)" }}
        >
          <span>WORKSPACE READY</span>
          <span style={{ color: "var(--accent)" }}>{progress}%</span>
        </div>

        {/* Skip hint */}
        <div className="text-[10px] pt-2" style={{ color: "var(--text-dim)" }}>
          Press <kbd className="px-1 py-0.5 rounded opacity-80" style={{ backgroundColor: "var(--bg-surface-elevated)" }}>ESC</kbd> or click to skip
        </div>
      </div>
    </div>
  );
});
