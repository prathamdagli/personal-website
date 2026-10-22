"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { ArrowDown, ArrowUpRight } from "lucide-react";

export function Hero() {
  const root = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: root,
    offset: ["start start", "end start"],
  });
  const portraitY = useTransform(scrollYProgress, [0, 1], [0, 110]);
  const portraitOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0.15]);
  return (
    <section className="cover" ref={root} aria-labelledby="cover-title">
      <div className="cover-topline">
        <span>SELECTED WORK & EXPERIMENTS / 2026</span>
        <span>
          AHMEDABAD, INDIA <span className="red-dot" />
        </span>
      </div>
      <div className="cover-name">
        <h1 id="cover-title">
          <motion.span
            initial={reduced ? false : { y: 70, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            PRATHAM
          </motion.span>
          <motion.span
            className="cover-surname"
            initial={reduced ? false : { y: 70, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              duration: 1.1,
              delay: 0.12,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            DAGLI
          </motion.span>
        </h1>
      </div>
      <motion.div
        className="cover-portrait"
        style={reduced ? undefined : { y: portraitY, opacity: portraitOpacity }}
      >
        <motion.div
          className="portrait-entrance"
          initial={reduced ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.3, delay: 0.15 }}
        >
          <Image
            src="/portrait-editorial.png"
            alt="Pratham Dagli, AI/ML and full-stack developer"
            width={1160}
            height={1355}
            loading="eager"
            fetchPriority="high"
            sizes="(max-width: 700px) 100vw, 900px"
          />
        </motion.div>
      </motion.div>
      <div className="cover-left">
        <span className="eyebrow">COMPUTER ENGINEERING / PDEU</span>
        <p>
          AI / ML engineer.
          <br />
          Full-stack developer.
          <br />
          <span>Computer Engineering, class of 2028.</span>
        </p>
      </div>

      <div className="cover-bottom">
        <a href="#introduction" className="scroll-cue">
          <span className="scroll-rule" /> SCROLL TO DISCOVER{" "}
          <ArrowDown size={14} />
        </a>
        <span className="cover-edition">SELECTED WORK / 2026</span>
        <Link
          href="/work"
          className="round-cta"
          aria-label="Explore selected work"
        >
          <ArrowUpRight size={28} />
          <span>
            EXPLORE
            <br />
            THE WORK
          </span>
        </Link>
      </div>
    </section>
  );
}
