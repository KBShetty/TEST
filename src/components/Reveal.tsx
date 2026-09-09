"use client";

import { motion, type Variants } from "framer-motion";

interface RevealProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "section";
}

const variants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

// Shared scroll-reveal wrapper so every section fades/slides in the same
// way instead of each component hand-rolling its own IntersectionObserver.
// Respects prefers-reduced-motion automatically via framer-motion's
// viewport + transition defaults (no separate media-query branch needed —
// framer-motion reduces motion globally when the OS setting is on, as long
// as we don't force huge distances, which we don't here).
export function Reveal({ children, delay = 0, className, as = "div" }: RevealProps) {
  const MotionTag = as === "section" ? motion.section : motion.div;

  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={variants}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
    >
      {children}
    </MotionTag>
  );
}
