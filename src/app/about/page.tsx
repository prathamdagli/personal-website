import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import { certifications } from "@/lib/portfolio";
import { ContactCta } from "@/components/site-shell";
import { PageIntro } from "@/components/page-intro";
import { AboutExperience, AboutToolkit } from "@/components/about-experience";

export const metadata: Metadata = {
  title: "About",
  description:
    "Pratham Dagli: Computer Engineering at PDEU, practical machine learning, full-stack development, and the experience behind the work.",
};

export default function AboutPage() {
  return (
    <main id="main">
      <PageIntro
        className="about-intro"
        eyebrow="ABOUT / PRATHAM DAGLI"
        lines={["The person.", "The practice."]}
        description={
          <>
            Computer Engineering at PDEU.
            <br />
            Working across machine learning, software, and cloud infrastructure.
          </>
        }
      >
        <a href="#experience" className="text-link">
          Explore my experience <ArrowDownRight size={18} />
        </a>
      </PageIntro>

      <section
        className="container about-story"
        aria-labelledby="about-story-title"
      >
        <div>
          <div className="portrait-wrap">
            <Image
              src="/profile.jpg"
              alt="Pratham Dagli outdoors at the PDEU campus"
              width={876}
              height={1024}
              loading="eager"
              sizes="(max-width: 700px) 90vw, 40vw"
            />
            <div className="portrait-caption">
              <span>PRATHAM DAGLI</span>
              <ArrowDownRight size={21} aria-hidden="true" />
            </div>
          </div>
          <p className="about-photo-note">
            On campus at Pandit Deendayal Energy University.
          </p>
        </div>
        <div className="story-copy">
          <span className="eyebrow">A WORKING INTRODUCTION</span>
          <h2 id="about-story-title">
            From a dataset
            <br />
            to something
            <br />
            you can use.
          </h2>
          <p>
            I’m Pratham, a Computer Engineering student at Pandit Deendayal
            Energy University, graduating in May 2028. I’m interested in the
            entire path from understanding a problem to putting working software
            in someone’s hands.
          </p>
          <p>
            That means preparing data, training a model, exposing it through an
            API, and building the interface around it. My projects explore
            complaint triage, credit readiness, green hydrogen certification,
            career guidance, and Formula 1 data.
          </p>
          <p>
            Alongside university, I’m building AWS infrastructure and reusable
            service accelerators at Rivix, and working across digital engagement
            and construction estimation at Maverick. Earlier roles took me into
            applied ML, community education, and Physics tutoring.
          </p>
          <div className="about-page-actions">
            <a
              href="/Pratham-Dagli-Resume.pdf"
              className="button button-primary"
              download
            >
              Download resume <ArrowUpRight size={17} />
            </a>
            <Link href="/work" className="text-link">
              See the projects <ArrowUpRight size={17} />
            </Link>
          </div>
        </div>
      </section>

      <section
        id="experience"
        className="section container"
        aria-labelledby="experience-title"
      >
        <div className="section-heading chapter-heading">
          <div>
            <span className="eyebrow">01 / EXPERIENCE</span>
            <h2 id="experience-title">Work, so far.</h2>
          </div>
          <p>
            From teaching the fundamentals
            <br />
            to building the infrastructure.
          </p>
        </div>
        <AboutExperience />
      </section>

      <section className="toolkit-band" aria-labelledby="toolkit-title">
        <div className="container section">
          <div className="section-heading chapter-heading">
            <div>
              <span className="eyebrow">02 / TOOLKIT</span>
              <h2 id="toolkit-title">
                The tools
                <br />
                behind the work.
              </h2>
            </div>
            <p>
              What I use to move between
              <br />
              data, interfaces, and systems.
            </p>
          </div>
          <AboutToolkit />
        </div>
      </section>

      <section
        className="section container education-section"
        aria-label="Education and further study"
      >
        <div>
          <span className="eyebrow">03 / EDUCATION</span>
          <h2>The foundation.</h2>
          <div className="education-item">
            <span>EXPECTED MAY 2028</span>
            <h3>B.Tech, Computer Engineering</h3>
            <p>Pandit Deendayal Energy University</p>
            <strong className="education-score">
              9.57 <span>/ 10 CGPA</span>
            </strong>
          </div>
          <div className="education-item">
            <span>MAY 2024</span>
            <h3>Class XII, Science</h3>
            <p>Sharda Mandir Modern High School</p>
            <strong>97.7 percentile</strong>
          </div>
        </div>
        <div className="certifications">
          <span className="eyebrow">04 / COURSES & CERTIFICATIONS</span>
          <h2>Further study.</h2>
          {certifications.map(([name, issuer], i) => (
            <div className="certificate" key={name}>
              <span className="cert-star">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h3>{name}</h3>
                <p>{issuer}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
      <ContactCta />
    </main>
  );
}
