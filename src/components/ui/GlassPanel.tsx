import React from "react";

interface GlassPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "subtle" | "elevated" | "window";
  glow?: "none" | "cyan" | "violet";
  interactive?: boolean;
  children: React.ReactNode;
  className?: string;
}

export const GlassPanel: React.FC<GlassPanelProps> = ({
  variant = "subtle",
  glow = "none",
  interactive = false,
  children,
  className = "",
  ...props
}) => {
  const variantStyles = {
    subtle: "glass-subtle",
    elevated: "glass-elevated",
    window: "glass-window",
  };

  const glowStyles = {
    none: "",
    cyan: "glow-cyan-sm border-cyan-500/30",
    violet: "glow-violet-sm border-violet-500/30",
  };

  const interactiveStyles = interactive
    ? "transition-all duration-300 hover:border-cyan-400/40 hover:-translate-y-0.5 hover:shadow-cyan-950/20"
    : "";

  return (
    <div
      className={`rounded-xl ${variantStyles[variant]} ${glowStyles[glow]} ${interactiveStyles} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
