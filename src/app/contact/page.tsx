import { FaGithub, FaLinkedin } from "react-icons/fa";
import type { Metadata } from "next";
import { ArrowUpRight, Mail } from "lucide-react";
import { ContactForm, CopyEmail } from "@/components/contact-form";
import { email, social } from "@/lib/portfolio";
export const metadata: Metadata = {
  title: "Let’s Talk",
  description:
    "Have a project, collaboration, or opportunity in mind? Get in touch with Pratham Dagli.",
};
export default function ContactPage() {
  return (
    <main id="main">
      <section className="container page-intro contact-intro">
        <div className="eyebrow">
          <span className="status-dot" /> OPEN TO A GOOD CONVERSATION
        </div>
        <h1>
          Great things start
          <br />
          with a <span className="serif">hello.</span>
          <span className="accent">↗</span>
        </h1>
        <div className="intro-bottom">
          <p>
            Have an interesting problem? A project that needs a builder?
            <br />
            Or just want to exchange ideas? Let’s connect.
          </p>
        </div>
      </section>
      <section className="container contact-layout">
        <div className="contact-info">
          <span className="eyebrow">THE DIRECT ROUTE</span>
          <a href={`mailto:${email}`} className="email-heading">
            prathamdagli11
            <br />
            @gmail.com
            <ArrowUpRight />
          </a>
          <CopyEmail />
          <div className="contact-social-list">
            <a href={social.github} target="_blank" rel="noreferrer">
              <FaGithub size={20} />
              <div>
                <span>GITHUB</span>
                <strong>Follow the work</strong>
              </div>
              <ArrowUpRight size={19} />
            </a>
            <a href={social.linkedin} target="_blank" rel="noreferrer">
              <FaLinkedin size={20} />
              <div>
                <span>LINKEDIN</span>
                <strong>Connect professionally</strong>
              </div>
              <ArrowUpRight size={19} />
            </a>
            <a href={`mailto:${email}`}>
              <Mail size={20} />
              <div>
                <span>EMAIL</span>
                <strong>Start a conversation</strong>
              </div>
              <ArrowUpRight size={19} />
            </a>
          </div>
          <p className="contact-note">
            Currently studying at PDEU.
            <br />
            Always interested in thoughtful projects
            <br />
            and people who care about what they build.
          </p>
        </div>
        <ContactForm />
      </section>
      <div className="container contact-end">
        <span>LET’S MAKE SOMETHING THAT MATTERS.</span>
        <span>✳</span>
      </div>
    </main>
  );
}
