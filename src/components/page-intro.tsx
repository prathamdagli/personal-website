"use client";
import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { motionTokens } from "@/lib/motion";
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
        transition={{ duration: reduced ? 0 : motionTokens.duration.base }}
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
                duration: reduced ? 0 : motionTokens.duration.base,
                delay: reduced ? 0 : i * 0.05,
                ease: motionTokens.ease.enter,
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
        transition={{ duration: reduced ? 0 : motionTokens.duration.base }}
      >
        <div className="intro-description">{description}</div>
        {children}
      </motion.div>
    </section>
  );
}
