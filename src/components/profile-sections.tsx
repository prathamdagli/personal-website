import { SplitHeading } from "./split-heading";
import {
  ArrowUpRight,
  Braces,
  BrainCircuit,
  Server,
  PanelsTopLeft,
  Cloud,
  Wrench,
  ArrowRight,
} from "lucide-react";
import { siteConfig, skillGroups } from "@/lib/site-config";
const icons = [Braces, BrainCircuit, Server, PanelsTopLeft, Cloud, Wrench];

export function SkillsSection() {
  return (
    <section
      className="container section skills-section"
      aria-labelledby="skills-title"
    >
      <div className="section-label">
        <span>02 / Skills</span>
        <span>Data, models, and the systems around them</span>
      </div>
      <SplitHeading id="skills-title" text="The tools I build with." />
      <div className="skills-inventory">
        {skillGroups.map((group, i) => {
          const Icon = icons[i];
          return (
            <article key={group.name}>
              <Icon size={21} strokeWidth={1.5} />
              <h3>{group.name}</h3>
              <ul>
                {group.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          );
        })}
      </div>
      <div className="pipeline-overview" aria-label="My engineering pipeline">
        <span className="eyebrow">From input to something useful</span>
        <ol>
          {["Data", "Model", "API", "Interface"].map((step, i) => (
            <li key={step}>
              <span>0{i + 1}</span>
              <strong>{step}</strong>
              {i < 3 && <ArrowRight size={18} aria-hidden="true" />}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function CurrentlySection() {
  return (
    <section
      className="container section currently-section"
      aria-labelledby="currently-title"
    >
      <div className="section-label">
        <span>06 / Currently</span>
        <span>Always in progress</span>
      </div>
      <SplitHeading id="currently-title" text="What has my attention." />
      <div className="currently-grid">
        {Object.entries(siteConfig.currently).filter(([, value]) => value.trim()).map(([label, value]) => (
          <article key={label}>
            <h3>{label}</h3>
            <p>{value}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export function AchievementsSection() {
  const published = siteConfig.achievements.filter(item => !item.placeholder);
  if (!published.length) return null;
  return (
    <section
      className="container section achievements-section"
      aria-labelledby="achievements-title"
    >
      <div className="section-label">
        <span>07 / Achievements & hackathons</span>
        <span>Experiments beyond the classroom</span>
      </div>
      <SplitHeading
        id="achievements-title"
        text="Challenges worth taking on."
      />
      <div className="achievement-grid">
        {published.map((item) => (
          <article key={item.title}>
            <span className="eyebrow">
              {item.year} / {item.placeholder ? "Details to add" : item.event}
            </span>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            {item.href && (
              <a href={item.href} target="_blank" rel="noreferrer">
                Event details <ArrowUpRight size={16} />
              </a>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}
