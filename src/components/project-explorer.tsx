"use client";
import { useState } from "react";
import { projects } from "@/lib/portfolio";
import { ProjectCard } from "./project-card";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
const filters = ["All work", "Applied AI", "Full stack", "Data science"];
export function ProjectExplorer() {
  const [filter, setFilter] = useState("All work");
  const reduced = useReducedMotion();
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
              onClick={() => {
                setFilter(f);
                document
                  .getElementById("project-collection")
                  ?.scrollIntoView({
                    behavior: reduced ? "auto" : "smooth",
                    block: "start",
                  });
              }}
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
      <motion.div layout={!reduced} className="work-list">
        <AnimatePresence mode="popLayout">
          {visible.map((p) => (
            <ProjectCard key={p.slug} project={p} index={projects.indexOf(p)} />
          ))}
        </AnimatePresence>
      </motion.div>
    </>
  );
}
