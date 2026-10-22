import Link from "next/link";
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
  return (
    <article className="archive-project" data-reveal>
      <div className="archive-project-info">
        <span className="eyebrow">
          0{index + 1} / {project.category.toUpperCase()}
        </span>
        <h2>
          <Link href={`/work/${project.slug}`}>{project.title}</Link>
        </h2>
        <p>{project.description}</p>
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
    </article>
  );
}
