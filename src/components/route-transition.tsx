"use client";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { motionTokens } from "@/lib/motion";
export function RouteTransition({ children }: { children: ReactNode }) {
  const path = usePathname();
  const reduced = useReducedMotion();
  return (
    <AnimatePresence initial={false} mode="wait">
      <motion.div
        key={path}
        initial={reduced ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: reduced ? 1 : 0 }}
        transition={{ duration: reduced ? 0 : motionTokens.duration.fast }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
