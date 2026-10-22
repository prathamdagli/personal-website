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
    <Link
      href={`/work/${project.slug}`}
      className={`project-card project-${project.color}`}
    >
      <div className="project-image">
        <ProjectVisual slug={project.slug} />
        <span className="project-open">
          <ArrowUpRight size={23} />
        </span>
      </div>
      <div className="project-meta">
        <span>
          0{index + 1} / {project.category}
        </span>
        <span>{project.stack.slice(0, 2).join(" · ")}</span>
      </div>
      <h3>
        {project.title}
        <ArrowUpRight size={22} />
      </h3>
      <p>{project.short}</p>
    </Link>
  );
}
