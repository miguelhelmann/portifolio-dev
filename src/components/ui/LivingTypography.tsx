"use client";

import React from "react";
import { motion } from "motion/react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface LivingTypographyProps {
  firstName?: string;
  lastName?: string;
}

export const LivingTypography: React.FC<LivingTypographyProps> = ({
  firstName = "MIGUEL",
  lastName = "HELMANN",
}) => {
  const prefersReducedMotion = useReducedMotion();

  const lineVariants = {
    hidden: {
      opacity: 0,
      y: prefersReducedMotion ? 0 : 22,
    },
    visible: (custom: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: prefersReducedMotion ? 0.01 : 0.65,
        ease: [0.16, 1, 0.3, 1] as const,
        delay: prefersReducedMotion ? 0 : custom * 0.08,
      },
    }),
  };

  return (
    <h1
      className="font-display text-[15.5vw] sm:text-[14vw] lg:text-[11.5vw] font-bold tracking-[-0.045em] leading-[0.82] uppercase select-none transition-colors"
      style={{ color: "var(--text-primary)" }}
    >
      {/* Line 1: FIRST NAME — Clean, commanding, stable */}
      <div className="overflow-hidden">
        <motion.div
          custom={0}
          initial="hidden"
          animate="visible"
          variants={lineVariants}
          className="inline-block"
        >
          <span className="inline-block transition-transform duration-300 hover:translate-x-1">
            {firstName}
          </span>
        </motion.div>
      </div>

      {/* Line 2: LAST NAME — Editorial Contrast with subtle, controlled signature liquid touch */}
      <div className="overflow-hidden pt-1 sm:pt-2">
        <motion.div
          custom={1}
          initial="hidden"
          animate="visible"
          variants={lineVariants}
          className="inline-block"
        >
          <span
            className="headline-contrast inline-block transition-all duration-300"
            style={{ opacity: 0.95 }}
          >
            {lastName}
          </span>
        </motion.div>
      </div>
    </h1>
  );
};
