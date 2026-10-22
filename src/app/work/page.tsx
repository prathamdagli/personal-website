import type { Metadata } from "next";
import { ProjectExplorer } from "@/components/project-explorer";
import { ContactCta } from "@/components/site-shell";
export const metadata: Metadata = {
  title: "Selected Work",
  description:
    "Explore Pratham Dagli’s applied AI, full-stack, and data science projects, from complaint intelligence to credit readiness.",
};
export default function WorkPage() {
  return (
    <main id="main">
      <section className="container page-intro">
        <div className="eyebrow">THE PROJECT INDEX / 01—05</div>
        <h1>
          Selected
          <br />
          work<span className="accent">.</span>
        </h1>
        <div className="intro-bottom">
          <p>
            A collection of things I’ve built, explored, and learned from.
            <br />
            Where machine intelligence meets everyday problems.
          </p>
          <span>AI / ML · WEB · DATA</span>
        </div>
      </section>
      <section
        className="container work-section"
        aria-label="Project collection"
      >
        <ProjectExplorer />
      </section>
      <ContactCta />
    </main>
  );
}
