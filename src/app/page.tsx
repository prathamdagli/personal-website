import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import { experience, projects } from "@/lib/portfolio";
import { Hero } from "@/components/hero";
import { ContactCta } from "@/components/site-shell";
import { ProjectCard } from "@/components/project-card";
import { ScrollStatement } from "@/components/scroll-statement";
import {
  SkillsSection,
  AchievementsSection,
  CurrentlySection,
} from "@/components/profile-sections";
import { HomeMotion } from "@/components/home-motion";
import { NumberTicker, LogoMarquee } from "@/components/motion-details";

export default function Home() {
  return (
    <main id="main">
      <Hero />
      <HomeMotion />
      <section id="introduction" className="intro-section paper-section">
        <div className="container">
          <div className="section-label">
            <span>01 / THE WAY I THINK</span>
            <ArrowDownRight size={23} />
          </div>
          <div className="intro-composition">
          <ScrollStatement />
          <div className="intro-details">
            <p>
              Computer Engineering at PDEU. Hands-on experience in machine
              learning, AI systems, and cloud infrastructure. I like
              understanding the whole system — and building the parts that make
              it useful.
            </p>
            <Link href="/about" className="underlined-link">
              About me <ArrowUpRight size={18} />
            </Link>
            <div className="intro-stats">
              <div>
                <NumberTicker value={9.57} decimals={2} />
                <span>CGPA / 10</span>
              </div>
              <div>
                <NumberTicker value={2028} />
                <span>EXPECTED GRADUATION</span>
              </div>
            </div>
          </div>
          </div>
        </div>
      </section>
      <SkillsSection />
      <div className="container">
        <LogoMarquee />
      </div>
      <section id="selected-work" className="selected-work section container">
        <div className="section-label">
          <span>03 / Selected projects</span>
          <span>Ideas → Systems → Experiences</span>
        </div>
        <div className="work-heading" data-reveal>
          <h2>
            Selected projects<span>.</span>
          </h2>
          <Link href="/work" className="underlined-link">
            All projects <ArrowUpRight size={18} />
          </Link>
        </div>
        <div className="horizontal-viewport">
          <div className="home-project-list">
            {projects.slice(0, 3).map((project, index) => (
              <ProjectCard key={project.slug} project={project} index={index} headingLevel="h3" />
            ))}
          </div>
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
      <section className="practice-section">
        <div className="container practice-layout">
          <div className="practice-photo" data-reveal>
            <Image
              src="/profile.webp"
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
            <span className="eyebrow">04 / The practice</span>
            <h2>
              Curious in theory.
              <br />
              <span>Practical by nature.</span>
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
              About me <ArrowUpRight size={18} />
            </Link>
          </div>
        </div>
      </section>
      <section className="section container career-home">
        <div className="section-label">
          <span>05 / Experience</span>
          <span>Learning by contributing.</span>
        </div>
        <div className="career-heading" data-reveal>
          <h2>
            Learning in good company<span>.</span>
          </h2>
          <Link href="/about#experience" className="underlined-link">
            Full experience <ArrowUpRight size={18} />
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
      <CurrentlySection />
      <AchievementsSection />
      <ContactCta />
    </main>
  );
}
