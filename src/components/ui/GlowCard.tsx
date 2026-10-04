"use client";

import React from "react";

interface GlowCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

export const GlowCard: React.FC<GlowCardProps> = ({
  children,
  className = "",
  style,
  ...props
}) => {
  return (
    <div
      className={`group/glow relative rounded-2xl transition-all duration-300 ease-out border hover:border-[var(--border-hover)] hover:shadow-[0_0_36px_-6px_var(--accent-glow)] ${className}`}
      style={{
        borderColor: "var(--border-hairline)",
        ...style,
      }}
      {...props}
    >
      {children}
    </div>
  );
};
