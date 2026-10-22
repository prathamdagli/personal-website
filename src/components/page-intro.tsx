"use client";
import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
export function PageIntro({
  eyebrow,
  lines,
  description,
  children,
  className = "",
}: {
  eyebrow: string;
  lines: string[];
  description: ReactNode;
  children?: ReactNode;
  className?: string;
}) {
  const reduced = useReducedMotion();
  return (
    <section className={`container page-intro kinetic-intro ${className}`}>
      <motion.div
        className="eyebrow"
        initial={{ opacity: reduced ? 1 : 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        {eyebrow}
      </motion.div>
      <h1>
        {lines.map((line, i) => (
          <span className="title-mask" key={line}>
            <motion.span
              className="page-title-line"
              initial={{ y: reduced ? 0 : "110%", rotate: reduced ? 0 : 3 }}
              animate={{ y: 0, rotate: 0 }}
              transition={{
                duration: 0.95,
                delay: i * 0.12,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {line}
            </motion.span>
          </span>
        ))}
      </h1>
      <motion.div
        className="intro-bottom"
        initial={{ opacity: reduced ? 1 : 0, y: reduced ? 0 : 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: reduced ? 0 : 0.4, duration: 0.7 }}
      >
        <div className="intro-description">{description}</div>
        {children}
      </motion.div>
    </section>
  );
}
