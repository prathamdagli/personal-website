import { FaGithub } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowDown,
  ArrowDownRight,
  ArrowUpRight,
  Code2,
  BrainCircuit,
  Layers,
} from "lucide-react";
import { projects, experience, social } from "@/lib/portfolio";
import { ContactCta } from "@/components/site-shell";
import { ProjectCard } from "@/components/project-card";
export default function Home() {
  return (
    <main id="main">
      <section className="hero container">
        <div className="hero-top">
          <span className="eyebrow">
            <span className="status-dot" /> PRATHAM DAGLI · ENGINEER & BUILDER
          </span>
          <span className="hero-edition">PORTFOLIO / 2026</span>
        </div>
        <div className="hero-content">
          <div className="hero-copy">
            <h1>
              Turning ideas
              <br />
              into <em>intelligent</em>
              <br />
              experiences<span className="accent">.</span>
            </h1>
            <p>
              AI / ML engineer. Full-stack developer.
              <br />I connect data, code, and curiosity to build
              <br className="desktop-break" /> things that make a difference.
            </p>
            <div className="hero-actions">
              <Link href="/work" className="button button-primary">
                Explore my work <ArrowUpRight size={18} />
              </Link>
              <Link href="/about" className="text-link">
                The person behind it <ArrowUpRight size={16} />
              </Link>
            </div>
          </div>
          <div className="hero-art" aria-hidden="true">
            <div className="art-cross cross-one">+</div>
            <div className="art-cross cross-two">+</div>
            <div className="orbit-coordinate coord-one">IDEA → SYSTEM</div>
            <div className="sculpture">
              <div className="orbit-ring ring-one" />
              <div className="orbit-ring ring-two" />
              <div className="orbit-ring ring-three" />
              <div className="orbit-ring ring-four" />
              <div className="orbit-core" />
              <div className="satellite" />
            </div>
            <div className="art-label label-ai">
              <BrainCircuit size={17} />
              <span>
                HUMAN CURIOSITY
                <br />
                <strong>Machine intelligence.</strong>
              </span>
            </div>
            <div className="art-label label-code">
              <Code2 size={17} />
              <span>BUILT TO CONNECT</span>
              <span className="tiny-dot" />
            </div>
            <div className="orbit-coordinate coord-two">
              EXPERIMENT. BUILD. REPEAT.
            </div>
          </div>
        </div>
        <div className="hero-bottom">
          <a href="#selected-work" className="scroll-link">
            <span className="scroll-circle">
              <ArrowDown size={16} />
            </span>
            SCROLL TO EXPLORE
          </a>
          <div className="hero-note">
            <span className="small-line" />
            Currently studying Computer Engineering at PDEU
          </div>
        </div>
      </section>
      <div className="discipline-strip">
        <div className="container">
          <span>
            APPLIED AI <span>↗</span>
          </span>
          <span>
            THOUGHTFUL INTERFACES <span>↗</span>
          </span>
          <span>
            END-TO-END SYSTEMS <span>↗</span>
          </span>
          <span>
            ALWAYS CURIOUS <span>✳</span>
          </span>
        </div>
      </div>
      <section id="selected-work" className="section container">
        <div className="section-heading">
          <div>
            <div className="eyebrow">01 / SELECTED WORK</div>
            <h2>
              A little curiosity.
              <br />A lot of <span className="serif">possibility.</span>
            </h2>
          </div>
          <div className="section-aside">
            <p>
              Real problems. Different domains.
              <br />
              One drive to build something useful.
            </p>
            <Link href="/work" className="text-link">
              View all projects <ArrowUpRight size={17} />
            </Link>
          </div>
        </div>
        <div className="project-grid">
          {projects.slice(0, 4).map((p, i) => (
            <ProjectCard key={p.slug} project={p} index={i} />
          ))}
        </div>
      </section>
      <section className="about-band">
        <div className="container about-preview">
          <div className="portrait-wrap">
            <Image
              src="/profile.jpg"
              alt="Pratham Dagli outdoors on campus"
              width={876}
              height={1024}
              sizes="(max-width: 700px) 90vw, 33vw"
            />
            <div className="portrait-caption">
              <span>PRATHAM, OFFLINE.</span>
              <ArrowDownRight size={22} />
            </div>
            <span className="portrait-sticker">
              A WORK IN
              <br />
              <strong>progress.</strong>↗
            </span>
          </div>
          <div className="about-preview-copy">
            <div className="eyebrow">02 / THE PERSON BEHIND THE CODE</div>
            <h2>
              Engineer by training.
              <br />
              <span className="serif">Curious</span> by default.
            </h2>
            <p>
              I’m Pratham, a Computer Engineering student at Pandit Deendayal
              Energy University. I like turning messy, open-ended problems into
              software people can actually use.
            </p>
            <p>
              My work lives where machine learning meets the web: from complaint
              intelligence and credit readiness to cleaner energy and career
              discovery.
            </p>
            <Link href="/about" className="text-link">
              A little more about me <ArrowUpRight size={17} />
            </Link>
            <div className="about-facts">
              <div>
                <strong>
                  9.57<span>/10</span>
                </strong>
                <span>CGPA AT PDEU</span>
              </div>
              <div>
                <strong>2028</strong>
                <span>EXPECTED GRADUATION</span>
              </div>
              <div>
                <strong>∞</strong>
                <span>THINGS TO LEARN</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="section container experience-preview">
        <div className="section-heading">
          <div>
            <div className="eyebrow">03 / LEARNING BY DOING</div>
            <h2>
              Small steps.
              <br />
              <span className="serif">Meaningful</span> experience.
            </h2>
          </div>
          <Link href="/about#experience" className="text-link">
            The full story <ArrowUpRight size={17} />
          </Link>
        </div>
        <div className="experience-list">
          {experience.map((e, i) => (
            <div className="experience-row" key={e.company}>
              <span className="row-index">0{i + 1}</span>
              <div>
                <h3>{e.role}</h3>
                <span>{e.company}</span>
              </div>
              <p>{e.description}</p>
              <span className="experience-date">{e.date}</span>
            </div>
          ))}
        </div>
        <div className="capabilities">
          <div>
            <BrainCircuit />
            <h3>Intelligence that helps.</h3>
            <p>
              ML models, data pipelines, and predictions connected to a real
              purpose.
            </p>
          </div>
          <div>
            <Layers />
            <h3>Systems that connect.</h3>
            <p>
              From Python APIs to React interfaces, keeping the whole experience
              in view.
            </p>
          </div>
          <div>
            <FaGithub />
            <h3>Learning in the open.</h3>
            <p>Experiments and projects, built one iteration at a time.</p>
            <a
              href={social.github}
              target="_blank"
              rel="noreferrer"
              className="text-link"
            >
              Explore GitHub <ArrowUpRight size={15} />
            </a>
          </div>
        </div>
      </section>
      <ContactCta />
    </main>
  );
}
