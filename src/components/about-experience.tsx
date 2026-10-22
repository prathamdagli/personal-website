"use client";

import { useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
} from "framer-motion";
import { ArrowDownRight, Plus } from "lucide-react";
import { experience, skills } from "@/lib/portfolio";

export function AboutExperience() {
  const root = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const [expanded, setExpanded] = useState<number | null>(0);
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll({
    target: root,
    offset: ["start 0.6", "end 0.4"],
  });
  const progress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  useMotionValueEvent(scrollYProgress, "change", () => {
    const rows = root.current?.querySelectorAll<HTMLElement>(".journey-entry");
    if (!rows?.length) return;
    let closest = 0;
    let distance = Number.POSITIVE_INFINITY;
    rows.forEach((row, index) => {
      const next = Math.abs(
        row.getBoundingClientRect().top - window.innerHeight * 0.35,
      );
      if (next < distance) {
        distance = next;
        closest = index;
      }
    });
    setActive((previous) => (previous === closest ? previous : closest));
  });

  function jump(index: number) {
    setActive(index);
    root.current?.querySelector(`#journey-${index}`)?.scrollIntoView({
      behavior: reduced ? "auto" : "smooth",
      block: "start",
    });
  }

  return (
    <div className="journey-layout" ref={root}>
      <aside className="journey-index" aria-label="Experience navigation">
        <span className="eyebrow">THE EXPERIENCE INDEX</span>
        <div className="journey-index-list">
          <div className="journey-track" aria-hidden="true">
            <motion.div
              style={{ scaleY: reduced ? scrollYProgress : progress }}
            />
          </div>
          <div className="journey-track-mobile" aria-hidden="true">
            <motion.div
              style={{ scaleX: reduced ? scrollYProgress : progress }}
            />
          </div>
          {experience.map((entry, index) => (
            <button
              type="button"
              key={entry.company}
              className={active === index ? "is-active" : ""}
              onClick={() => jump(index)}
              aria-current={active === index ? "step" : undefined}
            >
              <span>{String(index + 1).padStart(2, "0")}</span>
              <span>{entry.company.split(" · ")[0]}</span>
              <ArrowDownRight size={15} aria-hidden="true" />
            </button>
          ))}
        </div>
        <p>Open an entry for the work behind the role.</p>
      </aside>
      <div className="journey-entries">
        {experience.map((entry, index) => {
          const open = expanded === index;
          return (
            <article
              id={`journey-${index}`}
              key={entry.company}
              className={`journey-entry${open ? " is-open" : ""}${active === index ? " is-current" : ""}`}
            >
              <div className="journey-date">
                <span>{String(index + 1).padStart(2, "0")}</span>
                <span>{entry.date}</span>
              </div>
              <h3>
                <button
                  type="button"
                  id={`journey-trigger-${index}`}
                  aria-expanded={open}
                  aria-controls={`journey-detail-${index}`}
                  onClick={() => {
                    setExpanded(open ? null : index);
                    setActive(index);
                  }}
                >
                  <span>{entry.company}</span>
                  <motion.span
                    className="journey-toggle"
                    animate={{ rotate: open ? 45 : 0 }}
                    transition={{ duration: reduced ? 0 : 0.3 }}
                  >
                    <Plus size={23} aria-hidden="true" />
                  </motion.span>
                </button>
              </h3>
              <p className="journey-role">{entry.role}</p>
              <p className="journey-summary">{entry.description}</p>
              <div
                id={`journey-detail-${index}`}
                role="region"
                aria-labelledby={`journey-trigger-${index}`}
                aria-hidden={!open}
              >
                <AnimatePresence initial={false}>
                  {open && (
                    <motion.div
                      key="details"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{
                        duration: reduced ? 0 : 0.4,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className="journey-details"
                    >
                      <ul>
                        {entry.bullets.map((bullet, bulletIndex) => (
                          <motion.li
                            key={bullet}
                            initial={reduced ? false : { opacity: 0, y: 9 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                              duration: reduced ? 0 : 0.3,
                              delay: reduced ? 0 : bulletIndex * 0.06,
                            }}
                          >
                            <span aria-hidden="true">↳</span>
                            {bullet}
                          </motion.li>
                        ))}
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}

export function AboutToolkit() {
  const reduced = useReducedMotion();
  const [expanded, setExpanded] = useState([true, false, false]);
  return (
    <div className="toolkit-interactive">
      {skills.map((group, index) => (
        <motion.article
          className={`toolkit-drawer${expanded[index] ? " is-open" : ""}`}
          key={group.name}
          initial={reduced ? false : { opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: reduced ? 0 : index * 0.08 }}
          whileHover={
            reduced ? undefined : { y: -5, transition: { duration: 0.25 } }
          }
        >
          <span className="eyebrow">
            0{index + 1} / {group.items.length} TOOLS
          </span>
          <h3>
            <button
              type="button"
              aria-expanded={expanded[index]}
              aria-controls={`toolkit-tools-${index}`}
              onClick={() =>
                setExpanded((current) =>
                  current.map((value, i) => (i === index ? !value : value)),
                )
              }
            >
              {group.name}
              <motion.span
                animate={{ rotate: expanded[index] ? 45 : 0 }}
                transition={{ duration: reduced ? 0 : 0.3 }}
              >
                <Plus size={22} aria-hidden="true" />
              </motion.span>
            </button>
          </h3>
          <p>{group.note}</p>
          <div id={`toolkit-tools-${index}`} aria-hidden={!expanded[index]}>
            <AnimatePresence initial={false}>
              {expanded[index] && (
                <motion.div
                  className="toolkit-reveal"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: reduced ? 0 : 0.35 }}
                >
                  <div className="toolkit-tools">
                    {group.items.map((tool, i) => (
                      <motion.span
                        key={tool}
                        initial={reduced ? false : { opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                          duration: reduced ? 0 : 0.25,
                          delay: reduced ? 0 : i * 0.025,
                        }}
                      >
                        {tool}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <button
            type="button"
            className="toolkit-drawer-action"
            aria-expanded={expanded[index]}
            aria-controls={`toolkit-tools-${index}`}
            onClick={() =>
              setExpanded((current) =>
                current.map((value, i) => (i === index ? !value : value)),
              )
            }
          >
            {expanded[index] ? "CLOSE TOOLKIT" : "EXPLORE TOOLKIT"}
            <ArrowDownRight size={16} aria-hidden="true" />
          </button>
        </motion.article>
      ))}
    </div>
  );
}
