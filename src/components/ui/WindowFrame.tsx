import React from "react";
import { GlassPanel } from "./GlassPanel";

interface WindowFrameProps {
  title: string;
  subtitle?: string;
  status?: string;
  children: React.ReactNode;
  className?: string;
  contentClassName?: string;
  onClose?: () => void;
  onMinimize?: () => void;
  onMaximize?: () => void;
}

export const WindowFrame: React.FC<WindowFrameProps> = ({
  title,
  subtitle,
  status = "ONLINE",
  children,
  className = "",
  contentClassName = "",
  onClose,
  onMinimize,
  onMaximize,
}) => {
  return (
    <GlassPanel
      variant="window"
      className={`overflow-hidden border border-white/[0.12] transition-shadow duration-300 hover:shadow-cyan-950/30 ${className}`}
    >
      {/* OS Window Titlebar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-black/40 border-b border-white/[0.08] select-none">
        {/* Left: Window Controls (Traffic Lights) */}
        <div className="flex items-center gap-2">
          <button
            onClick={onClose}
            aria-label="Close window"
            className="h-3 w-3 rounded-full bg-rose-500/80 hover:bg-rose-400 transition-colors focus:ring-1 focus:ring-rose-400 outline-none"
          />
          <button
            onClick={onMinimize}
            aria-label="Minimize window"
            className="h-3 w-3 rounded-full bg-amber-500/80 hover:bg-amber-400 transition-colors focus:ring-1 focus:ring-amber-400 outline-none"
          />
          <button
            onClick={onMaximize}
            aria-label="Maximize window"
            className="h-3 w-3 rounded-full bg-emerald-500/80 hover:bg-emerald-400 transition-colors focus:ring-1 focus:ring-emerald-400 outline-none"
          />
        </div>

        {/* Center: Window Title */}
        <div className="flex items-center gap-2 text-xs font-sans text-slate-300 truncate px-2">
          <span className="text-cyan-400 font-semibold">{title}</span>
          {subtitle && <span className="text-slate-500 hidden sm:inline">— {subtitle}</span>}
        </div>

        {/* Right: Status Pill */}
        <div className="flex items-center gap-1.5 text-[10px] font-sans text-slate-400">
          <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse" />
          <span className="hidden sm:inline uppercase tracking-wider">{status}</span>
        </div>
      </div>

      {/* Window Body */}
      <div className={`p-4 sm:p-6 ${contentClassName}`}>
        {children}
      </div>
    </GlassPanel>
  );
};
