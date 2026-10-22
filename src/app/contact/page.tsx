import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { ContactForm } from "@/components/contact-form";
import { ContactOrbit } from "@/components/contact-orbit";
import { PageIntro } from "@/components/page-intro";
import { email } from "@/lib/portfolio";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Pratham Dagli about applied AI, software projects, internships, and collaborations.",
};

export default function ContactPage() {
  return (
    <main id="main">
      <PageIntro
        className="contact-intro"
        eyebrow="CONTACT / START A CONVERSATION"
        lines={["Let’s", "talk."]}
        description={
          <>
            An idea to explore. A system to build. An opportunity to learn.
            <br />
            Tell me what you’re working on.
          </>
        }
      >
        <a className="underlined-link" href={`mailto:${email}`}>
          WRITE TO ME <ArrowUpRight size={18} />
        </a>
      </PageIntro>
      <section
        className="container contact-layout contact-layout-interactive"
        aria-label="Ways to get in touch"
      >
        <ContactOrbit />
        <div className="contact-composer">
          <span className="eyebrow">OR / GIVE THE IDEA SOME SHAPE</span>
          <ContactForm />
        </div>
      </section>
      <div className="container contact-end">
        <span>PRATHAM DAGLI / COMPUTER ENGINEERING, PDEU</span>
        <ArrowUpRight size={48} aria-hidden="true" />
      </div>
    </main>
  );
}
