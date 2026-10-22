"use client";
import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
function Word({
  children,
  progress,
  start,
}: {
  children: string;
  progress: MotionValue<number>;
  start: number;
}) {
  const color = useTransform(
    progress,
    [start, start + 0.15],
    ["#718096", "#eef1f5"],
  );
  const reduced = useReducedMotion();
  return (
    <motion.span style={{ color: reduced ? "#eef1f5" : color }}>
      {children}{" "}
    </motion.span>
  );
}
export function ScrollStatement() {
  const ref = useRef<HTMLHeadingElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start .9", "end .35"],
  });
  return (
    <h2
      ref={ref}
      className="scroll-statement"
      aria-label="I work where machine intelligence meets the real world."
    >
      {["I work where", "machine intelligence", "meets the real world."].map(
        (line, i) => (
          <span className="statement-line" key={line}>
            {line.split(" ").map((word, j) => (
              <Word
                key={word}
                progress={scrollYProgress}
                start={i * 0.2 + j * 0.045}
              >
                {word}
              </Word>
            ))}
          </span>
        ),
      )}
    </h2>
  );
}
