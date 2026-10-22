"use client";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Project } from "@/lib/portfolio";
import { ProjectVisual } from "./project-visual";

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
      initial={{ opacity: 0, y: reduced ? 0 : 65 }}
      whileInView={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: reduced ? 0 : -20 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="archive-project product-chapter"
    >
      <div className="archive-project-info">
        <span className="eyebrow">
          0{index + 1} / {project.category.toUpperCase()}
        </span>
        <h2>
          <Link href={`/work/${project.slug}`}>{project.title}</Link>
        </h2>
        <p>{project.short}</p>
        <div className="archive-stack">
          {project.stack.map((s) => (
            <span key={s}>{s}</span>
          ))}
        </div>
        <Link href={`/work/${project.slug}`} className="underlined-link">
          EXPLORE PROJECT <ArrowUpRight size={18} />
        </Link>
      </div>
      <Link
        href={`/work/${project.slug}`}
        className="archive-project-art"
        data-cursor="EXPLORE"
        aria-label={`Explore ${project.title}`}
      >
        <ProjectVisual slug={project.slug} />
      </Link>
    </motion.article>
  );
}
