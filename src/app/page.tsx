import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import { experience, projects } from "@/lib/portfolio";
import { Hero } from "@/components/hero";
import { ContactCta } from "@/components/site-shell";
import { ProjectVisual } from "@/components/project-visual";
import {
  ScrollStatement,
  DisciplineRibbon,
} from "@/components/scroll-statement";

export default function Home() {
  return (
    <main id="main">
      <Hero />
      <section id="introduction" className="intro-section paper-section">
        <div className="container">
          <div className="section-label">
            <span>01 / THE WAY I THINK</span>
            <ArrowDownRight size={23} />
          </div>
          <ScrollStatement />
          <div className="intro-details">
            <p>
              Computer Engineering at PDEU. Hands-on experience in machine
              learning, full-stack development, and cloud infrastructure. I like
              understanding the whole system — and building the parts that make
              it useful.
            </p>
            <Link href="/about" className="underlined-link">
              THE PERSON & THE PRACTICE <ArrowUpRight size={18} />
            </Link>
            <div className="intro-stats">
              <div>
                <strong>9.57</strong>
                <span>CGPA / 10</span>
              </div>
              <div>
                <strong>2028</strong>
                <span>EXPECTED GRADUATION</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id="selected-work" className="selected-work section container">
        <div className="section-label">
          <span>02 / SELECTED WORK</span>
          <span>IDEAS → SYSTEMS → EXPERIENCES</span>
        </div>
        <div className="work-heading" data-reveal>
          <h2>
            SELECTED
            <br />
            <span>PROJECTS.</span>
          </h2>
          <Link href="/work" className="underlined-link">
            THE COMPLETE INDEX <ArrowUpRight size={18} />
          </Link>
        </div>
        <Link
          href={`/work/${projects[0].slug}`}
          className="featured-project"
          data-reveal
          data-cursor="EXPLORE"
        >
          <div className="featured-project-media">
            <ProjectVisual slug={projects[0].slug} />
            <span className="project-circle">
              <ArrowUpRight size={24} />
            </span>
          </div>
          <div className="featured-project-caption">
            <div>
              <span className="eyebrow">01 / APPLIED AI</span>
              <h3>ComplaintTracker AI</h3>
            </div>
            <p>
              Making sense of every complaint.
              <br />
              From intake to resolution.
            </p>
            <span className="project-caption-stack">REACT / FASTAPI / NLP</span>
          </div>
        </Link>
        <div className="staggered-projects">
          {projects.slice(1, 3).map((p, i) => (
            <Link
              key={p.slug}
              href={`/work/${p.slug}`}
              className="secondary-project"
              data-reveal
              data-cursor="EXPLORE"
            >
              <div className="secondary-project-media">
                <ProjectVisual slug={p.slug} />
                <span className="project-circle">
                  <ArrowUpRight size={21} />
                </span>
              </div>
              <div className="secondary-project-caption">
                <span className="eyebrow">
                  0{i + 2} / {p.category.toUpperCase()}
                </span>
                <h3>
                  {p.title}
                  <ArrowUpRight size={22} />
                </h3>
                <p>{p.short}</p>
              </div>
            </Link>
          ))}
        </div>
        <div className="work-index-link">
          <span>ALSO IN THE COLLECTION</span>
          {projects.slice(3).map((p) => (
            <Link href={`/work/${p.slug}`} key={p.slug}>
              {p.title}
              <ArrowUpRight size={18} />
            </Link>
          ))}
        </div>
      </section>
      <DisciplineRibbon />
      <section className="practice-section">
        <div className="container practice-layout">
          <div className="practice-photo" data-reveal>
            <Image
              src="/profile.jpg"
              alt="Pratham Dagli on campus"
              width={876}
              height={1024}
              sizes="(max-width:700px) 90vw,40vw"
            />
            <div className="photo-caption">
              <span>AWAY FROM THE TERMINAL.</span>
              <span>PRATHAM, ON CAMPUS.</span>
            </div>
          </div>
          <div className="practice-copy" data-reveal>
            <span className="eyebrow">03 / THE PRACTICE</span>
            <h2>
              A STUDENT.
              <br />A BUILDER.
              <br />
              <span>ALWAYS BOTH.</span>
            </h2>
            <p>
              I’m not interested in a model that only lives in a notebook. I
              want to connect it to an API, put an interface in front of it, and
              understand what happens when someone uses it.
            </p>
            <p>
              That’s taken me from complaint classification to credit readiness,
              green hydrogen certification, and career guidance. Each project
              asks a different question.
            </p>
            <Link href="/about" className="underlined-link">
              GET TO KNOW ME <ArrowUpRight size={18} />
            </Link>
          </div>
        </div>
      </section>
      <section className="section container career-home">
        <div className="section-label">
          <span>04 / EXPERIENCE</span>
          <span>LEARNING BY CONTRIBUTING.</span>
        </div>
        <div className="career-heading" data-reveal>
          <h2>
            BUILDING
            <br />
            <span>IN GOOD COMPANY.</span>
          </h2>
          <Link href="/about#experience" className="underlined-link">
            FULL EXPERIENCE <ArrowUpRight size={18} />
          </Link>
        </div>
        <div className="experience-ledger">
          {experience.slice(0, 3).map((e, i) => (
            <Link href="/about#experience" key={e.company} data-reveal>
              <span className="ledger-number">0{i + 1}</span>
              <div>
                <h3>{e.company.split(" · ")[0]}</h3>
                <span>{e.role}</span>
              </div>
              <p>{e.description}</p>
              <span className="ledger-date">{e.date}</span>
              <ArrowUpRight size={20} />
            </Link>
          ))}
        </div>
      </section>
      <ContactCta />
    </main>
  );
}
