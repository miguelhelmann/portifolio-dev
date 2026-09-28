"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const CHARS = "ABCDEF0123456789_#*/<>[]~+-";

interface ScrambleTextProps {
  text: string;
  triggerOnHover?: boolean;
  className?: string;
  speed?: number;
}

export const ScrambleText: React.FC<ScrambleTextProps> = ({
  text,
  triggerOnHover = true,
  className = "",
  speed = 25,
}) => {
  const [displayText, setDisplayText] = useState(text);
  const [prevText, setPrevText] = useState(text);
  const prefersReducedMotion = useReducedMotion();
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  if (prevText !== text) {
    setPrevText(text);
    setDisplayText(text);
  }

  const startScramble = useCallback(() => {
    if (prefersReducedMotion) {
      setDisplayText(text);
      return;
    }

    let iteration = 0;
    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      setDisplayText(() =>
        text
          .split("")
          .map((char, index) => {
            if (char === " ") return " ";
            if (index < iteration) {
              return text[index];
            }
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join("")
      );

      if (iteration >= text.length) {
        if (intervalRef.current) clearInterval(intervalRef.current);
      }
      iteration += 1 / 2;
    }, speed);
  }, [text, speed, prefersReducedMotion]);

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <span
      className={`font-sans tracking-wide transition-colors select-none ${className}`}
      onMouseEnter={triggerOnHover ? startScramble : undefined}
    >
      {displayText}
    </span>
  );
};
