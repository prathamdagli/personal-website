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
    ["#b6b1a6", "#20201e"],
  );
  const reduced = useReducedMotion();
  return (
    <motion.span style={{ color: reduced ? "#20201e" : color }}>
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
export function DisciplineRibbon() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-18%"]);
  return (
    <section
      ref={ref}
      className="discipline-ribbon"
      aria-label="Intelligence, interfaces, infrastructure"
    >
      <div className="container ribbon-caption">
        <span>THE THREAD THROUGH THE WORK</span>
        <span>THINK / BUILD / CONNECT</span>
      </div>
      <motion.div style={{ x: reduced ? 0 : x }} aria-hidden="true">
        INTELLIGENCE <i>↗</i> INTERFACES <i>↗</i> INFRASTRUCTURE <i>↗</i>
      </motion.div>
    </section>
  );
}
