"use client";
import { useState } from "react";
import { projects } from "@/lib/portfolio";
import { ProjectCard } from "./project-card";
const filters = ["All work", "Applied AI", "Full stack", "Data science"];
export function ProjectExplorer() {
  const [filter, setFilter] = useState("All work");
  const visible = projects.filter(
    (p) => filter === "All work" || p.category === filter,
  );
  return (
    <>
      <div className="work-toolbar">
        <div className="filter-tabs" aria-label="Filter projects">
          {filters.map((f) => (
            <button
              key={f}
              aria-pressed={f === filter}
              className={f === filter ? "selected" : ""}
              onClick={() => setFilter(f)}
            >
              {f}
              {f === "All work" && <span>05</span>}
            </button>
          ))}
        </div>
        <span className="result-count" aria-live="polite">
          {visible.length} project{visible.length === 1 ? "" : "s"}
        </span>
      </div>
      <div className="project-grid work-grid">
        {visible.map((p) => (
          <ProjectCard key={p.slug} project={p} index={projects.indexOf(p)} />
        ))}
      </div>
    </>
  );
}
