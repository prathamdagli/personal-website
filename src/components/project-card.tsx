"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import type { Project } from "@/lib/portfolio";

export function ProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const reduced = useReducedMotion();
  return (
    <motion.article
      id={`project-${project.slug}`}
      layout={!reduced}
      initial={{ opacity: 0, y: reduced ? 0 : 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: reduced ? 0 : -12 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="project-entry"
    >
      <span className="project-entry-number">0{index + 1}</span>
      <div className="project-entry-content">
        <span className="eyebrow">{project.category}</span>
        <h2>
          <Link href={`/work/${project.slug}`}>
            <span>{project.title}</span>
            <ArrowUpRight aria-hidden="true" size={22} />
          </Link>
        </h2>
        <p>{project.description}</p>
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
            <FaGithub size={16} /> GitHub <ArrowUpRight size={15} />
          </a>
        )}
        {!project.repo && (
          <span className="project-source-note">Source not published</span>
        )}
      </div>
    </motion.article>
  );
}
