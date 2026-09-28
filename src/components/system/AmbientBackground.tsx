"use client";

import React from "react";
import { usePortfolio } from "@/context/PortfolioContext";

export const AmbientBackground: React.FC = React.memo(function AmbientBackground() {
  const { theme } = usePortfolio();
  const isColor = theme === "color";

  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 pointer-events-none z-0 overflow-hidden transition-colors duration-500"
      style={{
        backgroundColor: "var(--bg-primary)",
      }}
    >
      {/* Layer 1: Developer 32px Micro-Grid across full document */}
      <div
        className={`absolute inset-0 bg-developer-grid transition-opacity duration-500 ${
          isColor ? "opacity-15" : "opacity-25"
        }`}
      />

      {/* Layer 2: Theme-Specific Ambient Light Fields (Feathered Radial Gradients — Zero Filter Blur Overhead) */}
      {isColor ? (
        /* COLOR THEME: Prismatic Refracted Light (3-5 Enormous Multi-Color Blended Fields on White Editorial Canvas) */
        <div className="absolute inset-0 overflow-hidden">
          {/* Primary Prismatic Drift Layer (GPU translate3d) */}
          <div
            className="absolute -inset-8 pointer-events-none ambient-animate-slow"
            style={{
              background: `
                radial-gradient(ellipse 92vw 1400px at 80% 16%, rgba(6, 182, 212, 0.12) 0%, rgba(59, 130, 246, 0.08) 22%, rgba(139, 92, 246, 0.05) 44%, rgba(244, 63, 94, 0.025) 64%, rgba(251, 191, 36, 0.01) 80%, transparent 92%),
                radial-gradient(ellipse 88vw 1350px at 16% 74%, rgba(147, 51, 234, 0.10) 0%, rgba(244, 63, 94, 0.07) 24%, rgba(251, 146, 60, 0.04) 48%, rgba(250, 204, 21, 0.015) 70%, transparent 88%)
              `,
            }}
          />

          {/* Secondary Prismatic Counter-Drift Layer (GPU translate3d) */}
          <div
            className="absolute -inset-8 pointer-events-none ambient-animate-reverse"
            style={{
              background: `
                radial-gradient(ellipse 85vw 1250px at 20% 32%, rgba(14, 165, 233, 0.09) 0%, rgba(16, 185, 129, 0.045) 26%, rgba(99, 102, 241, 0.02) 54%, transparent 80%),
                radial-gradient(ellipse 86vw 1250px at 84% 82%, rgba(244, 114, 182, 0.09) 0%, rgba(129, 140, 248, 0.05) 25%, rgba(253, 164, 175, 0.02) 52%, transparent 78%)
              `,
            }}
          />
        </div>
      ) : (
        /* DARK THEME: Black Architectural Space Illuminated by Diffused White & Silver Light */
        <div className="absolute inset-0 overflow-hidden">
          {/* Primary Diffused White & Silver Illumination Layer */}
          <div
            className="absolute -inset-8 pointer-events-none ambient-animate-slow"
            style={{
              background: `
                radial-gradient(ellipse 70vw 850px at 25% 6%, rgba(255, 255, 255, 0.08) 0%, rgba(241, 245, 249, 0.04) 30%, rgba(148, 163, 184, 0.012) 58%, transparent 78%),
                radial-gradient(ellipse 68vw 850px at 85% 36%, rgba(226, 232, 240, 0.065) 0%, rgba(148, 163, 184, 0.025) 35%, transparent 75%),
                radial-gradient(ellipse 72vw 900px at 15% 64%, rgba(248, 250, 252, 0.075) 0%, rgba(203, 213, 225, 0.035) 32%, transparent 76%),
                radial-gradient(ellipse 70vw 850px at 85% 88%, rgba(255, 255, 255, 0.07) 0%, rgba(203, 213, 225, 0.03) 34%, transparent 76%)
              `,
            }}
          />

          {/* Secondary Silver, Light Gray & Graphite Diffused Field */}
          <div
            className="absolute -inset-8 pointer-events-none ambient-animate-reverse"
            style={{
              background: `
                radial-gradient(ellipse 65vw 750px at 80% 12%, rgba(226, 232, 240, 0.07) 0%, rgba(148, 163, 184, 0.025) 32%, transparent 74%),
                radial-gradient(ellipse 66vw 850px at 10% 40%, rgba(241, 245, 249, 0.075) 0%, rgba(203, 213, 225, 0.03) 34%, transparent 76%),
                radial-gradient(ellipse 68vw 850px at 88% 60%, rgba(226, 232, 240, 0.065) 0%, rgba(148, 163, 184, 0.025) 34%, transparent 76%),
                radial-gradient(ellipse 70vw 800px at 15% 84%, rgba(255, 255, 255, 0.07) 0%, rgba(226, 232, 240, 0.03) 35%, transparent 76%),
                radial-gradient(ellipse 75vw 600px at 50% 98%, rgba(226, 232, 240, 0.055) 0%, transparent 75%)
              `,
            }}
          />
        </div>
      )}

      {/* Layer 3: Viewport Edge Vignette (Fixed to ground whatever content is on screen) */}
      <div
        className="fixed inset-0 pointer-events-none transition-all duration-500"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 48%, var(--vignette) 100%)",
        }}
      />
    </div>
  );
});
