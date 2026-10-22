"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Braces } from "lucide-react";
import type { Project } from "@/lib/portfolio";
import { forwardRef } from "react";
import { ProjectMedia } from "./project-media";
import { motionTokens } from "@/lib/motion";

export const ProjectCard = forwardRef<
  HTMLElement,
  {
    project: Project;
    index: number;
    headingLevel?: "h2" | "h3";
  }
>(function ProjectCard({ project, index, headingLevel: Heading = "h2" }, ref) {
  const reduced = useReducedMotion();
  return (
    <motion.article
      ref={ref}
      id={`project-${project.slug}`}
      layout={!reduced}
      initial={false}
      whileInView={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: reduced ? 0 : -12 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration: reduced ? 0 : motionTokens.duration.base,
        ease: motionTokens.ease.enter,
      }}
      className="project-entry"
      onPointerMove={(event) => {
        if (reduced || event.pointerType !== "mouse") return;
        const box = event.currentTarget.getBoundingClientRect();
        event.currentTarget.style.setProperty(
          "--tilt-y",
          `${((event.clientX - box.left) / box.width - 0.5) * 3}deg`,
        );
        event.currentTarget.style.setProperty(
          "--tilt-x",
          `${-((event.clientY - box.top) / box.height - 0.5) * 3}deg`,
        );
      }}
      onPointerLeave={(event) => {
        event.currentTarget.style.setProperty("--tilt-y", "0deg");
        event.currentTarget.style.setProperty("--tilt-x", "0deg");
      }}
    >
      <span className="project-entry-number">0{index + 1}</span>
      <ProjectMedia project={project} />
      <div className="project-entry-content">
        <span className="eyebrow">{project.category}</span>
        <Heading>
          <Link href={`/work/${project.slug}`}>
            <span>{project.title}</span>
            <ArrowUpRight aria-hidden="true" size={22} />
          </Link>
        </Heading>
        <p>{project.description}</p>
        <p className="project-impact">
          <span>Impact / scope</span> {project.impact}
        </p>
        <div className="project-entry-stack" aria-label="Technologies">
          {project.stack.map((tool) => (
            <span key={tool}>{tool}</span>
          ))}
        </div>
      </div>
      <div className="project-entry-actions">
        <Link href={`/work/${project.slug}`}>
          Case study <ArrowUpRight size={17} />
        </Link>
        {project.live && (
          <a href={project.live} target="_blank" rel="noreferrer">
            Live project <ArrowUpRight size={15} />
          </a>
        )}
        {project.repo && (
          <a href={project.repo} target="_blank" rel="noreferrer">
            <Braces size={16} /> GitHub <ArrowUpRight size={15} />
          </a>
        )}
        {!project.repo && (
          <span className="project-source-note">Source not published</span>
        )}
      </div>
    </motion.article>
  );
});
