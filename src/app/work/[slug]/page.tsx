import { FaGithub } from "react-icons/fa";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { projects } from "@/lib/portfolio";
import { ProjectVisual } from "@/components/project-visual";
import { ContactCta } from "@/components/site-shell";
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
        <div className="project-detail-heading">
          <div className="eyebrow">
            PROJECT 0{index + 1} / {p.category.toUpperCase()}
          </div>
          <h1>
            {p.title}
            <span className="accent">.</span>
          </h1>
          <p>{p.short}</p>
        </div>
        <ProjectVisual slug={p.slug} large />
        <div className="project-overview">
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
        <div className="case-section">
          <span className="eyebrow">01 / THE CONTEXT</span>
          <div>
            <h2>
              The problem
              <br />
              worth <span className="serif">solving.</span>
            </h2>
            <p>{p.challenge}</p>
          </div>
        </div>
        <div className="case-section">
          <span className="eyebrow">02 / THE APPROACH</span>
          <div>
            <h2>
              Connecting
              <br />
              the <span className="serif">pieces.</span>
            </h2>
            <p>{p.approach}</p>
            <div className="flow-diagram">
              {p.flow.map((f, i) => (
                <div key={f}>
                  <span>0{i + 1}</span>
                  <strong>{f}</strong>
                  {i < p.flow.length - 1 && <ArrowRight size={16} />}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="case-section">
          <span className="eyebrow">03 / IN THE DETAILS</span>
          <div>
            <h2>
              What’s <span className="serif">inside.</span>
            </h2>
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
        <div className="project-next">
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
