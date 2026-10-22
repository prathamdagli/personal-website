"use client";
import { useEffect, useRef, useState } from "react";
import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from "framer-motion";
import { motionTokens } from "@/lib/motion";

export function NumberTicker({
  value,
  decimals = 0,
}: {
  value: number;
  decimals?: number;
}) {
  const ref = useRef<HTMLElement>(null);
  const visible = useInView(ref, { once: true, amount: 0.6 });
  const reduced = useReducedMotion();
  const number = useMotionValue(value);
  const label = useTransform(number, (current) => current.toFixed(decimals));
  useEffect(() => {
    if (!visible || reduced) {
      number.set(value);
      return;
    }
    number.set(0);
    const animation = animate(number, value, {
      duration: motionTokens.duration.story,
      ease: motionTokens.ease.enter,
    });
    return () => animation.stop();
  }, [visible, reduced, number, value]);
  return (
    <motion.strong
      ref={ref}
      aria-label={value.toFixed(decimals)}
      style={{ fontVariantNumeric: "tabular-nums" }}
    >
      {label}
    </motion.strong>
  );
}

export function LogoMarquee() {
  const root = useRef<HTMLDivElement>(null);
  const visible = useInView(root);
  const reduced = useReducedMotion();
  const [paused, setPaused] = useState(false);
  const labels = [
    "Python",
    "AWS",
    "React",
    "FastAPI",
    "Rivix",
    "Techify",
    "Maverick",
  ];
  return (
    <div
      ref={root}
      className="logo-marquee"
      data-running={visible && !reduced && !paused ? "true" : "false"}
      aria-label="Tools and companies: Python, AWS, React, FastAPI, Rivix, Techify, Maverick"
    >
      <div>
        {[0, 1].map((copy) => (
          <div className="logo-marquee-set" key={copy} aria-hidden={copy === 1}>
            {labels.map((label) => (
              <span className="logo-wordmark" key={label}>
                {label}
              </span>
            ))}
          </div>
        ))}
      </div>
      {!reduced && (
        <button className="marquee-control" type="button" onClick={() => setPaused(!paused)} aria-pressed={paused}>
          {paused ? "Resume motion" : "Pause motion"}
        </button>
      )}
    </div>
  );
}
