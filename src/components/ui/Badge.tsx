import React from "react";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "cyan" | "violet" | "status-online" | "status-idle";
  size?: "sm" | "md";
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = "default",
  size = "sm",
  className = "",
}) => {
  const sizeStyles = {
    sm: "px-2 py-0.5 text-xs font-sans",
    md: "px-2.5 py-1 text-xs sm:text-sm font-sans",
  };

  const variantStyles = {
    default: "bg-white/[0.05] text-slate-300 border border-white/[0.08]",
    cyan: "bg-cyan-950/30 text-cyan-300 border border-cyan-500/30",
    violet: "bg-violet-950/30 text-violet-300 border border-violet-500/30",
    "status-online": "bg-emerald-950/40 text-emerald-400 border border-emerald-500/30",
    "status-idle": "bg-amber-950/40 text-amber-400 border border-amber-500/30",
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-md font-medium tracking-tight ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
    >
      {variant === "status-online" && (
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
      )}
      {variant === "status-idle" && (
        <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
      )}
      {children}
    </span>
  );
};
