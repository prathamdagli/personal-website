import { FaGithub, FaLinkedin } from "react-icons/fa";
import type { Metadata } from "next";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import { ContactForm, CopyEmail } from "@/components/contact-form";
import { email, social } from "@/lib/portfolio";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Pratham Dagli about applied AI, software projects, internships, and collaborations.",
};

export default function ContactPage() {
  return (
    <main id="main">
      <section className="container page-intro contact-intro">
        <div className="eyebrow">CONTACT / START A CONVERSATION</div>
        <h1>
          <span className="page-title-line">Let’s</span>
          <span className="page-title-line">
            talk<span className="accent">.</span>
          </span>
        </h1>
        <div className="intro-bottom">
          <p>
            An idea to explore. A system to build. An opportunity to learn.
            <br />
            Tell me what you’re working on.
          </p>
          <span>AI / ML · FULL STACK · COLLABORATION</span>
        </div>
      </section>

      <section
        className="container contact-layout"
        aria-label="Ways to get in touch"
      >
        <div className="contact-info">
          <span className="eyebrow">01 / WRITE DIRECTLY</span>
          <a
            href={`mailto:${email}`}
            className="email-heading"
            aria-label={`Email ${email}`}
          >
            prathamdagli11
            <br />
            @gmail.com
            <ArrowUpRight aria-hidden="true" />
          </a>
          <CopyEmail />
          <p className="contact-note">
            For project ideas, internships, and collaborations in applied AI or
            software development. A little context about the problem and what
            you have in mind is a good place to start.
          </p>
          <div className="contact-social-list">
            <a href={social.github} target="_blank" rel="noreferrer">
              <FaGithub size={20} aria-hidden="true" />
              <div>
                <span>GITHUB</span>
                <strong>Explore the code</strong>
              </div>
              <ArrowUpRight size={19} aria-hidden="true" />
            </a>
            <a href={social.linkedin} target="_blank" rel="noreferrer">
              <FaLinkedin size={20} aria-hidden="true" />
              <div>
                <span>LINKEDIN</span>
                <strong>Connect with me</strong>
              </div>
              <ArrowUpRight size={19} aria-hidden="true" />
            </a>
            <a href="/Pratham-Dagli-Resume.pdf" download>
              <ArrowDownRight size={20} aria-hidden="true" />
              <div>
                <span>RESUME</span>
                <strong>The experience, on paper</strong>
              </div>
              <ArrowUpRight size={19} aria-hidden="true" />
            </a>
          </div>
        </div>
        <ContactForm />
      </section>
      <div className="container contact-end">
        <span>PRATHAM DAGLI / COMPUTER ENGINEERING, PDEU</span>
        <ArrowUpRight size={48} aria-hidden="true" />
      </div>
    </main>
  );
}
