import type { Metadata } from "next";
import { ProjectExplorer } from "@/components/project-explorer";
import { ContactCta } from "@/components/site-shell";
import { PageIntro } from "@/components/page-intro";
export const metadata: Metadata = {
  title: "Projects",
  description:
    "Explore Pratham Dagli’s AI engineering and data science projects, from complaint intelligence to credit readiness.",
};
export default function WorkPage() {
  return (
    <main id="main">
      <PageIntro
        className="work-intro"
        eyebrow="THE PROJECT INDEX / 01—05"
        lines={["Selected", "projects."]}
        description={
          <p>
            Five explorations in intelligence, interfaces, and the connections
            between them. Open a project. Follow the thinking. Look under the
            hood.
          </p>
        }
      >
        <span>SCROLL TO EXPLORE ↓</span>
      </PageIntro>
      <section
        id="project-collection"
        className="container work-section"
        aria-label="Project collection"
      >
        <ProjectExplorer />
      </section>
      <ContactCta />
    </main>
  );
}
