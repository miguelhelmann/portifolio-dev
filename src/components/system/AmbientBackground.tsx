"use client";

import React, { useEffect, useRef } from "react";
import { usePortfolio } from "@/context/PortfolioContext";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export const AmbientBackground: React.FC = React.memo(function AmbientBackground() {
  const { theme } = usePortfolio();
  const prefersReducedMotion = useReducedMotion();
  const isColor = theme === "color";
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Atmospheric procedural constellation canvas (pure ambient atmosphere, zero aggressive mouse pursuit)
  useEffect(() => {
    if (typeof window === "undefined" || !canvasRef.current || prefersReducedMotion) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const mouse = { x: -1000, y: -1000 };

    const handlePointerMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handlePointerLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initGrid();
    };

    window.addEventListener("mousemove", handlePointerMove, { passive: true });
    document.addEventListener("mouseleave", handlePointerLeave, { passive: true });
    window.addEventListener("resize", handleResize, { passive: true });

    const spacing = 84; // Spacing for dignified, uncluttered architectural constellation
    interface Node {
      baseX: number;
      baseY: number;
      phase: number;
      speed: number;
      x: number;
      y: number;
      isLit: boolean;
      litRatio: number;
    }
    let nodes: Node[] = [];

    const initGrid = () => {
      nodes = [];
      const cols = Math.ceil(width / spacing) + 1;
      const rows = Math.ceil(height / spacing) + 1;

      for (let c = 0; c < cols; c++) {
        for (let r = 0; r < rows; r++) {
          nodes.push({
            baseX: c * spacing,
            baseY: r * spacing,
            phase: (c * 17 + r * 23) % 100,
            speed: 0.0006 + ((c + r) % 5) * 0.0002,
            x: c * spacing,
            y: r * spacing,
            isLit: false,
            litRatio: 0,
          });
        }
      }
    };

    initGrid();

    let animId: number = 0;
    let isRunning = true;
    let time = 0;

    const render = () => {
      if (!isRunning) return;

      ctx.clearRect(0, 0, width, height);
      time += 1;

      const pointColor = isColor ? "rgba(15, 23, 42, 0.18)" : "rgba(255, 255, 255, 0.15)";
      const activePointColor = isColor ? "rgba(2, 132, 199, 0.6)" : "rgba(255, 255, 255, 0.6)";
      const lineColorBase = isColor ? "2, 132, 199" : "255, 255, 255";
      const hoverRadius = 140;

      // 1. Calculate positions and draw nodes in-place (Zero GC allocation per frame)
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        // Slow, organic drift (max 3px amplitude — purely atmospheric)
        node.x = node.baseX + Math.sin(time * node.speed + node.phase) * 3;
        node.y = node.baseY + Math.cos(time * node.speed * 0.8 + node.phase) * 3;

        const dx = mouse.x - node.x;
        const dy = mouse.y - node.y;
        const dist = Math.hypot(dx, dy);

        node.isLit = dist < hoverRadius;
        node.litRatio = node.isLit ? 1 - dist / hoverRadius : 0;

        // Node point
        ctx.beginPath();
        const r = node.isLit ? 1.0 + node.litRatio * 0.4 : 0.85;
        ctx.arc(node.x, node.y, r, 0, Math.PI * 2);
        ctx.fillStyle = node.isLit ? activePointColor : pointColor;
        ctx.fill();
      }

      // 2. Subtle connections only between adjacent nodes that share proximity
      for (let i = 0; i < nodes.length; i++) {
        const p1 = nodes[i];
        if (!p1.isLit) continue;

        for (let j = i + 1; j < nodes.length; j++) {
          const p2 = nodes[j];
          if (!p2.isLit) continue;

          const connDx = p2.x - p1.x;
          const connDy = p2.y - p1.y;
          const connDist = Math.hypot(connDx, connDy);

          if (connDist < spacing * 1.25) {
            const alpha = (1 - connDist / (spacing * 1.25)) * Math.min(p1.litRatio, p2.litRatio) * 0.25;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(${lineColorBase}, ${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      animId = requestAnimationFrame(render);
    };

    // Tab visibility handling: pause completely when tab is hidden
    const handleVisibilityChange = () => {
      if (document.hidden) {
        isRunning = false;
        if (animId) cancelAnimationFrame(animId);
      } else {
        if (!isRunning) {
          isRunning = true;
          animId = requestAnimationFrame(render);
        }
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    animId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("mousemove", handlePointerMove);
      document.removeEventListener("mouseleave", handlePointerLeave);
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      cancelAnimationFrame(animId);
    };
  }, [isColor, prefersReducedMotion]);

  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 pointer-events-none z-0 overflow-hidden transition-colors duration-500"
      style={{
        backgroundColor: "var(--bg-primary)",
      }}
    >
      {/* Layer 1: Developer 32px Micro-Grid */}
      <div
        className={`absolute inset-0 bg-developer-grid transition-opacity duration-500 ${
          isColor ? "opacity-10" : "opacity-20"
        }`}
      />

      {/* Layer 2: Atmospheric Constellation Canvas (Gentle presence, no chasing) */}
      {!prefersReducedMotion && (
        <canvas
          ref={canvasRef}
          className="fixed inset-0 pointer-events-none z-0 opacity-60 transition-opacity duration-500"
        />
      )}

      {/* Layer 3: Theme Ambient Drift Fields */}
      {isColor ? (
        <div className="absolute inset-0 overflow-hidden">
          <div
            className="absolute -inset-8 pointer-events-none ambient-animate-slow"
            style={{
              background: `
                radial-gradient(ellipse 92vw 1400px at 80% 16%, rgba(6, 182, 212, 0.10) 0%, rgba(59, 130, 246, 0.06) 22%, rgba(139, 92, 246, 0.04) 44%, transparent 88%),
                radial-gradient(ellipse 88vw 1350px at 16% 74%, rgba(147, 51, 234, 0.08) 0%, rgba(244, 63, 94, 0.05) 24%, transparent 84%)
              `,
            }}
          />
          <div
            className="absolute -inset-8 pointer-events-none ambient-animate-reverse"
            style={{
              background: `
                radial-gradient(ellipse 85vw 1250px at 20% 32%, rgba(14, 165, 233, 0.07) 0%, transparent 75%),
                radial-gradient(ellipse 86vw 1250px at 84% 82%, rgba(244, 114, 182, 0.07) 0%, transparent 75%)
              `,
            }}
          />
        </div>
      ) : (
        <div className="absolute inset-0 overflow-hidden">
          <div
            className="absolute -inset-8 pointer-events-none ambient-animate-slow"
            style={{
              background: `
                radial-gradient(ellipse 70vw 850px at 25% 6%, rgba(255, 255, 255, 0.065) 0%, rgba(241, 245, 249, 0.03) 30%, transparent 75%),
                radial-gradient(ellipse 68vw 850px at 85% 36%, rgba(226, 232, 240, 0.05) 0%, transparent 70%),
                radial-gradient(ellipse 70vw 850px at 85% 88%, rgba(255, 255, 255, 0.055) 0%, transparent 72%)
              `,
            }}
          />
          <div
            className="absolute -inset-8 pointer-events-none ambient-animate-reverse"
            style={{
              background: `
                radial-gradient(ellipse 65vw 750px at 80% 12%, rgba(226, 232, 240, 0.055) 0%, transparent 70%),
                radial-gradient(ellipse 66vw 850px at 10% 40%, rgba(241, 245, 249, 0.06) 0%, transparent 72%),
                radial-gradient(ellipse 70vw 800px at 15% 84%, rgba(255, 255, 255, 0.055) 0%, transparent 72%)
              `,
            }}
          />
        </div>
      )}

      {/* Layer 4: Viewport Edge Vignette */}
      <div
        className="fixed inset-0 pointer-events-none transition-all duration-500"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 52%, var(--vignette) 100%)",
        }}
      />
    </div>
  );
});
