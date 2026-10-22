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
import { siteConfig } from "@/lib/site-config";
import { motionTokens } from "@/lib/motion";
import { HeroSignature } from "./signature-prototypes";

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
      <HeroSignature />
      <div className="cover-topline">
        <span>AI ENGINEERING & PROJECTS / 2026</span>
        <span>
          AHMEDABAD, INDIA <span className="red-dot" />
        </span>
      </div>
      <div className="cover-name">
        <h1 id="cover-title" aria-label="Pratham Dagli">
          <motion.span
            initial={reduced ? false : { y: 70, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              duration: reduced ? 0 : motionTokens.duration.story,
              ease: motionTokens.ease.enter,
            }}
          >
            <span aria-hidden="true">PRATHAM</span>
          </motion.span>
          <motion.span
            className="cover-surname"
            initial={reduced ? false : { y: 70, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              duration: reduced ? 0 : motionTokens.duration.story,
              delay: reduced ? 0 : 0.05,
              ease: motionTokens.ease.enter,
            }}
          >
            <span aria-hidden="true">DAGLI</span>
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
          transition={{ duration: reduced ? 0 : motionTokens.duration.story }}
        >
          <Image
            src="/portrait-editorial.webp"
            alt="Pratham Dagli, AI Engineering"
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
          AI Engineering.
          <br />
          <span>Computer Engineering, class of 2028.</span>
        </p>
        <p className="availability">
          <span aria-hidden="true" />
          {siteConfig.availability}
        </p>
        <div className="hero-actions">
          <Link href="/work" className="button button-primary">
            View work <ArrowUpRight size={16} />
          </Link>
          <a
            href={siteConfig.resume}
            className="button button-outline resume-action"
            download
          >
            Download résumé <ArrowUpRight size={16} />
          </a>
        </div>
      </div>

      <div className="cover-bottom">
        <a href="#introduction" className="scroll-cue">
          <span className="scroll-rule" /> SCROLL TO DISCOVER{" "}
          <ArrowDown size={14} />
        </a>
        <span className="cover-edition">SELECTED PROJECTS / 2026</span>
        <Link
          href="/work"
          className="round-cta"
          aria-label="Explore selected projects"
        >
          <ArrowUpRight size={28} />
          <span>
            EXPLORE
            <br />
            PROJECTS
          </span>
        </Link>
      </div>
    </section>
  );
}
