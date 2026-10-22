import { Braces } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { projects } from "@/lib/portfolio";
import { ContactCta } from "@/components/site-shell";
import { ProjectLab } from "@/components/project-lab";
import { ProjectMedia } from "@/components/project-media";
import { siteConfig } from "@/lib/site-config";
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
    alternates: { canonical: `/work/${slug}` },
    openGraph: {
      title: p?.title,
      description: p?.description,
      url: `${siteConfig.url}/work/${slug}`,
    },
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
  const previous = projects[(index - 1 + projects.length) % projects.length];
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
          <a href="#context">Problem</a>
          <a href="#system">Approach</a>
          <a href="#architecture">Architecture</a>
          <a href="#results">Results</a>
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
                <Braces size={16} />
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
        <dl className="case-facts">
          <div>
            <dt>Role</dt>
            <dd>{p.overview.role}</dd>
          </div>
          <div>
            <dt>Timeline</dt>
            <dd>{p.overview.timeline}</dd>
          </div>
          <div>
            <dt>Team</dt>
            <dd>{p.overview.team}</dd>
          </div>
          <div>
            <dt>Impact / scope</dt>
            <dd>{p.impact}</dd>
          </div>
        </dl>
        <div className="case-media">
          <ProjectMedia project={p} />
        </div>
        <div className="case-section" id="context" data-reveal>
          <span className="eyebrow">01 / Problem</span>
          <div>
            <h2>The challenge.</h2>
            <p>{p.challenge}</p>
          </div>
        </div>
        <div className="case-section" id="system" data-reveal>
          <span className="eyebrow">02 / Approach</span>
          <div>
            <h2>The system.</h2>
            <p>{p.approach}</p>
          </div>
        </div>
        <section
          id="architecture"
          className="architecture-section"
          aria-labelledby="architecture-title"
        >
          <span className="eyebrow">03 / Architecture</span>
          <h2 id="architecture-title">The path through the system.</h2>
          {p.architectureImage ? (
            <Image src={p.architectureImage} alt={`${p.title} architecture diagram`} width={1200} height={600} sizes="(max-width:768px) 90vw, 1000px" className="architecture-image" />
          ) : <ol className="architecture-nodes">
            {p.flow.map((step, i) => (
              <li key={step}>
                <span>0{i + 1}</span>
                <strong>{step}</strong>
                <ArrowUpRight size={18} aria-hidden="true" />
              </li>
            ))}
          </ol>}
          <p>
            Conceptual architecture showing the main stages of the
            implementation.
          </p>
          <a href={`/projects/${p.slug}/architecture.mmd`} className="text-link" download>Download Mermaid diagram source <ArrowUpRight size={16} /></a>
        </section>
        <ProjectLab project={p} />
        <div className="case-section" id="details" data-reveal>
          <span className="eyebrow">04 / Features</span>
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
        <section className="case-section" id="results">
          <span className="eyebrow">05 / Results</span>
          <div>
            <h2>Evidence before claims.</h2>
            {p.results.length ? (
              <ul>
                {p.results.map((result) => (
                  <li key={result}>{result}</li>
                ))}
              </ul>
            ) : (
              <p>
                [ADD VERIFIED RESULTS] Document the measured outcome, evaluation
                method, or completed scope. No performance metrics have been
                inferred.
              </p>
            )}
          </div>
        </section>
        <section className="case-section">
          <span className="eyebrow">06 / Learnings & next steps</span>
          <div>
            <h2>What I’d take forward.</h2>
            {p.learnings.length ? (
              <ul>
                {p.learnings.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            ) : (
              <p>
                [ADD LEARNINGS] Add a technical decision, its tradeoff, and what
                the project taught you.
              </p>
            )}
            {p.nextSteps.length ? (
              <ul>
                {p.nextSteps.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            ) : (
              <p>
                [ADD NEXT STEPS] Add the next experiment or improvement you
                would prioritize.
              </p>
            )}
          </div>
        </section>
        <div className="previous-project">
          <Link href={`/work/${previous.slug}`}>
            <ArrowLeft size={17} /> Previous project: {previous.title}
          </Link>
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
