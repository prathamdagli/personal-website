import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import { certifications, experience, skills } from "@/lib/portfolio";
import { ContactCta } from "@/components/site-shell";
export const metadata: Metadata = {
  title: "About Me",
  description:
    "Meet Pratham Dagli, a Computer Engineering student at PDEU building practical AI and full-stack software. Experience, education, and toolkit.",
};
export default function AboutPage() {
  return (
    <main id="main">
      <section className="container page-intro about-intro">
        <div className="eyebrow">A LITTLE ABOUT ME</div>
        <h1>
          More than
          <br />
          the <span className="serif">code.</span>
          <span className="lime">✳</span>
        </h1>
        <div className="intro-bottom">
          <p>
            A builder, a student, and a firm believer
            <br />
            that the best way to learn is to make something.
          </p>
          <span>PRATHAM DAGLI / COMPUTER ENGINEERING</span>
        </div>
      </section>
      <section className="container about-story">
        <div className="portrait-wrap">
          <Image
            src="/profile.jpg"
            alt="Pratham Dagli at the PDEU campus"
            width={876}
            height={1024}
            priority
            sizes="(max-width: 700px) 90vw, 40vw"
          />
          <div className="portrait-caption">
            <span>THE PERSON BEHIND THE PROJECTS.</span>
            <ArrowDownRight size={21} />
          </div>
        </div>
        <div className="story-copy">
          <span className="eyebrow">HELLO, I’M PRATHAM.</span>
          <h2>
            I like the space between
            <br />
            <span className="serif">“what if”</span> and “it works.”
          </h2>
          <p>
            I’m studying Computer Engineering at Pandit Deendayal Energy
            University, with an expected graduation in May 2028. My focus is on
            practical machine learning and the software that makes it useful.
          </p>
          <p>
            I enjoy the whole journey: understanding a dataset, training a
            model, building an API, and creating an interface that brings it
            together. A good result, to me, is something a person can actually
            interact with.
          </p>
          <p>
            That curiosity has taken me into customer support, financial
            inclusion, green hydrogen, career guidance, and even Formula 1 data.
            Different problems keep me learning.
          </p>
          <div className="about-page-actions">
            <Link href="/work" className="text-link">
              See where that curiosity leads <ArrowUpRight size={17} />
            </Link>
            <a
              href="/Pratham-Dagli-Resume.pdf"
              className="button button-primary"
              download
            >
              Download resume <ArrowUpRight size={17} />
            </a>
          </div>
          <div className="personal-note">
            <span>MY APPROACH</span>
            <p>
              Understand the problem.
              <br />
              Build something useful.
              <br />
              <em>Keep making it better.</em>
            </p>
          </div>
        </div>
      </section>
      <section id="experience" className="section container">
        <div className="section-heading">
          <div>
            <span className="eyebrow">01 / EXPERIENCE</span>
            <h2>
              Learning beyond
              <br />
              the <span className="serif">classroom.</span>
            </h2>
          </div>
        </div>
        <div className="detailed-experience">
          {experience.map((e, i) => (
            <div key={e.company}>
              <div className="experience-side">
                <span>0{i + 1}</span>
                <span>{e.date}</span>
              </div>
              <div>
                <h3>{e.role}</h3>
                <h4>{e.company}</h4>
                <p>{e.description}</p>
                <ul>
                  {e.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>
      <section className="toolkit-band">
        <div className="container section">
          <div className="section-heading">
            <div>
              <span className="eyebrow">02 / THE TOOLKIT</span>
              <h2>
                Different tools.
                <br />
                One <span className="serif">connected</span> mindset.
              </h2>
            </div>
            <p className="muted">
              The stack changes.
              <br />
              The drive to figure things out doesn’t.
            </p>
          </div>
          <div className="toolkit-grid">
            {skills.map((s, i) => (
              <div key={s.name}>
                <span className="eyebrow">0{i + 1}</span>
                <h3>{s.name}</h3>
                <p>{s.note}</p>
                <div className="tags">
                  {s.items.map((t) => (
                    <span key={t}>{t}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="section container education-section">
        <div>
          <span className="eyebrow">03 / EDUCATION</span>
          <h2>
            A foundation
            <br />
            for <span className="serif">what’s next.</span>
          </h2>
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
          <span className="eyebrow">04 / CONTINUOUS LEARNING</span>
          <h2>
            Never done
            <br />
            <span className="serif">learning.</span>
          </h2>
          {certifications.map(([name, issuer]) => (
            <div className="certificate" key={name}>
              <span className="cert-star">✳</span>
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
