import { FaGithub } from "react-icons/fa";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { projects } from "@/lib/portfolio";
import { ContactCta } from "@/components/site-shell";
import { ProjectLab } from "@/components/project-lab";
export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const p = projects.find((p) => p.slug === slug);
  return {
    title: p?.title ?? "Project not found",
    description: p?.description,
  };
}
export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = projects.find((p) => p.slug === slug);
  if (!p) notFound();
  const index = projects.indexOf(p);
  const next = projects[(index + 1) % projects.length];
  return (
    <main id="main">
      <article className={`container project-detail project-${p.color}`}>
        <Link href="/work" className="text-link back-link">
          <ArrowLeft size={16} />
          All projects
        </Link>
        <div className="project-detail-heading" data-reveal>
          <div className="eyebrow">
            PROJECT 0{index + 1} / {p.category.toUpperCase()}
          </div>
          <h1>
            {p.title}
            <span className="accent">.</span>
          </h1>
          <p>{p.short}</p>
        </div>
        <nav className="case-chapter-nav" aria-label="Case study chapters">
          <span>PROJECT 0{index + 1}</span>
          <a href="#context">01 / Context</a>
          <a href="#system">02 / System</a>
          <a href="#details">03 / Details</a>
        </nav>
        <div className="project-overview" data-reveal>
          <div>
            <span className="eyebrow">OVERVIEW</span>
            <p>{p.description}</p>
          </div>
          <div>
            <span className="eyebrow">TECHNOLOGIES</span>
            <div className="tags">
              {p.stack.map((s) => (
                <span key={s}>{s}</span>
              ))}
            </div>
          </div>
          <div className="project-links">
            {p.live && (
              <a
                href={p.live}
                target="_blank"
                rel="noreferrer"
                className="button button-primary"
              >
                Visit project <ArrowUpRight size={17} />
              </a>
            )}
            {p.repo && (
              <a
                href={p.repo}
                target="_blank"
                rel="noreferrer"
                className="text-link"
              >
                <FaGithub size={16} />
                Source code <ArrowUpRight size={15} />
              </a>
            )}
            {!p.repo && (
              <p className="muted">
                An exploratory data project.
                <br />
                Public source is not currently linked.
              </p>
            )}
          </div>
        </div>
        <div className="case-section" id="context" data-reveal>
          <span className="eyebrow">01 / THE CONTEXT</span>
          <div>
            <h2>The challenge.</h2>
            <p>{p.challenge}</p>
          </div>
        </div>
        <div className="case-section" id="system" data-reveal>
          <span className="eyebrow">02 / THE APPROACH</span>
          <div>
            <h2>The system.</h2>
            <p>{p.approach}</p>
          </div>
        </div>
        <ProjectLab project={p} />
        <div className="case-section" id="details" data-reveal>
          <span className="eyebrow">03 / IN THE DETAILS</span>
          <div>
            <h2>What it does.</h2>
            <ul className="feature-list">
              {p.features.map((f, i) => (
                <li key={f}>
                  <span>0{i + 1}</span>
                  {f}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="project-next" data-reveal>
          <span className="eyebrow">KEEP EXPLORING / NEXT PROJECT</span>
          <Link href={`/work/${next.slug}`}>
            {next.title}
            <ArrowUpRight />
          </Link>
        </div>
      </article>
      <ContactCta />
    </main>
  );
}
