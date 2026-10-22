"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion, useScroll, useSpring, useReducedMotion } from "framer-motion";

export function SiteEffects() {
  const pathname = usePathname();
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 150, damping: 32 });
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const elements = Array.from(
      document.querySelectorAll<HTMLElement>(
        "[data-reveal], main > section:not(.cover):not(.kinetic-intro) .section-label, .contact-cta .big-contact, .project-next, .certification-list > *, .education-list > *",
      ),
    );
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("reveal-enter");
          observer.unobserve(entry.target);
        }),
      { threshold: 0.12 },
    );
    elements.forEach((element) => {
      observer.observe(element);
    });
    return () => {
      observer.disconnect();
      elements.forEach((e) => e.classList.remove("reveal-enter"));
    };
  }, [pathname]);
  return (
    <>
      <motion.div
        className="reading-progress"
        style={{ scaleX: reduced ? scrollYProgress : progress }}
        aria-hidden="true"
      />
    </>
  );
}
