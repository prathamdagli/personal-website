import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { ContactComposerLink, ContactForm } from "@/components/contact-form";
import { ContactOrbit } from "@/components/contact-orbit";
import { PageIntro } from "@/components/page-intro";
import { siteConfig } from "@/lib/site-config";

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
        <ContactComposerLink />
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
        <span>
          {siteConfig.location} · {siteConfig.timezone}
          <br />
          Pratham Dagli / Computer Engineering, PDEU
        </span>
        <ArrowUpRight size={48} aria-hidden="true" />
      </div>
    </main>
  );
}
