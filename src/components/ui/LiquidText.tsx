"use client";

import React, { useRef, useState, useEffect, useId } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface LiquidTextProps {
  children: React.ReactNode;
  className?: string;
  intensity?: number;
  triggerOnHover?: boolean;
}

export const LiquidText: React.FC<LiquidTextProps> = ({
  children,
  className = "",
  intensity = 6,
  triggerOnHover = true,
}) => {
  const prefersReducedMotion = useReducedMotion();
  const rawId = useId();
  // Safe CSS ID without colons
  const filterId = `liquid-filter-${rawId.replace(/:/g, "")}`;

  const [scale, setScale] = useState(0);
  const [baseFreq, setBaseFreq] = useState("0.02 0.05");
  const animFrameRef = useRef<number | null>(null);
  const targetScale = useRef(0);
  const currentScale = useRef(0);
  const loopStepRef = useRef<() => void>(() => {});

  useEffect(() => {
    function step() {
      currentScale.current += (targetScale.current - currentScale.current) * 0.14;
      setScale(parseFloat(currentScale.current.toFixed(2)));

      if (Math.abs(targetScale.current - currentScale.current) > 0.05 || currentScale.current > 0.1) {
        animFrameRef.current = requestAnimationFrame(step);
      } else {
        setScale(0);
        currentScale.current = 0;
        animFrameRef.current = null;
      }
    }
    loopStepRef.current = step;
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLSpanElement>) => {
    if (prefersReducedMotion || !triggerOnHover) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const relX = (e.clientX - rect.left) / rect.width;
    const relY = (e.clientY - rect.top) / rect.height;

    const freqX = (0.015 + relX * 0.035).toFixed(3);
    const freqY = (0.04 + relY * 0.04).toFixed(3);
    setBaseFreq(`${freqX} ${freqY}`);

    targetScale.current = intensity;

    if (!animFrameRef.current) {
      animFrameRef.current = requestAnimationFrame(() => loopStepRef.current());
    }
  };

  const handleMouseLeave = () => {
    targetScale.current = 0;
  };

  useEffect(() => {
    return () => {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, []);

  if (prefersReducedMotion) {
    return <span className={className}>{children}</span>;
  }

  return (
    <span
      className={`relative inline-block ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        filter: scale > 0.1 ? `url(#${filterId})` : "none",
        transition: "filter 0.05s ease-out",
        willChange: scale > 0.1 ? "filter" : "auto",
      }}
    >
      {/* Dynamic SVG Filter definition dedicated to this instance */}
      <svg className="absolute w-0 h-0 pointer-events-none" aria-hidden="true">
        <filter id={filterId} x="-20%" y="-20%" width="140%" height="140%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency={baseFreq}
            numOctaves={2}
            result="noise"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="noise"
            scale={scale}
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </svg>
      {children}
    </span>
  );
};
