"use client";

import React, { useRef, useState, useCallback } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "terminal" | "ghost";
  size?: "sm" | "md" | "lg";
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  magnetic?: boolean;
  children: React.ReactNode;
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({
  variant = "secondary",
  size = "md",
  iconLeft,
  iconRight,
  magnetic = false,
  children,
  className = "",
  disabled,
  ...props
}) => {
  const btnRef = useRef<HTMLButtonElement | null>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const prefersReducedMotion = useReducedMotion();

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      if (!magnetic || prefersReducedMotion || !btnRef.current) return;
      const rect = btnRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const deltaX = (e.clientX - centerX) * 0.22;
      const deltaY = (e.clientY - centerY) * 0.22;
      setOffset({ x: deltaX, y: deltaY });
    },
    [magnetic, prefersReducedMotion]
  );

  const handleMouseLeave = useCallback(() => {
    if (!magnetic) return;
    setOffset({ x: 0, y: 0 });
  }, [magnetic]);

  const baseStyles =
    "relative inline-flex items-center justify-center font-medium transition-all duration-200 cursor-pointer select-none active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none disabled:cursor-not-allowed";

  const sizeStyles = {
    sm: "px-3 py-1.5 text-xs rounded-md gap-1.5",
    md: "px-4 py-2 text-sm rounded-lg gap-2",
    lg: "px-5 py-2.5 text-base rounded-lg gap-2.5",
  };

  const variantStyles = {
    primary:
      "bg-cyan-500/10 text-cyan-300 border border-cyan-400/40 hover:bg-cyan-500/20 hover:border-cyan-300 hover:shadow-[0_0_20px_rgba(0,240,255,0.25)]",
    secondary:
      "bg-white/[0.04] text-slate-200 border border-white/[0.1] hover:bg-white/[0.08] hover:border-white/[0.2] hover:text-white",
    terminal:
      "font-sans text-xs tracking-wider uppercase font-semibold text-cyan-300 bg-slate-950/80 border border-cyan-500/40 hover:bg-cyan-950/40 hover:border-cyan-400",
    ghost:
      "text-slate-400 hover:text-slate-100 hover:bg-white/[0.05]",
  };

  return (
    <button
      ref={btnRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform:
          offset.x !== 0 || offset.y !== 0
            ? `translate3d(${offset.x}px, ${offset.y}px, 0)`
            : undefined,
      }}
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      disabled={disabled}
      {...props}
    >
      {iconLeft && <span className="inline-flex shrink-0">{iconLeft}</span>}
      <span>{children}</span>
      {iconRight && <span className="inline-flex shrink-0">{iconRight}</span>}
    </button>
  );
};
