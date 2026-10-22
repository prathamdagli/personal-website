"use client";
import { motionTokens } from "@/lib/motion";
import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  Check,
  FileText,
  GitBranch,
  Layers,
  Sparkles,
} from "lucide-react";
import type { Project } from "@/lib/portfolio";

const details: Record<
  string,
  { title: string; body: string; artifact: string; rows: string[] }[]
> = {
  "complaint-tracker": [
    {
      title: "One request. Multiple ways in.",
      body: "The same complaint can arrive through the web portal or Telegram. Both enter a shared workflow instead of becoming separate, disconnected conversations.",
      artifact: "Sample incoming complaint",
      rows: [
        "Channel / Web portal",
        "Message / I was charged twice for my subscription.",
        "State / Awaiting classification",
      ],
    },
    {
      title: "Turn text into something useful.",
      body: "TF-IDF represents the complaint text. Logistic Regression predicts a category, while VADER sentiment analysis adds context for prioritization.",
      artifact: "Classification pipeline",
      rows: [
        "Text → TF-IDF vector",
        "Vector → Logistic Regression",
        "Sentiment → VADER analysis",
      ],
    },
    {
      title: "Get it to the right person.",
      body: "Category and sentiment support priority assignment. Role-specific dashboards help support staff, managers, and QA work from the same ticket context.",
      artifact: "Illustrative routing",
      rows: [
        "Category / Billing",
        "Queue / Support review",
        "Context / Original message retained",
      ],
    },
    {
      title: "Resolution is also a learning signal.",
      body: "QA can correct a classification. Those corrections feed the retraining workflow, connecting human review back to the model.",
      artifact: "Human feedback loop",
      rows: [
        "Review prediction",
        "Record QA correction",
        "Incorporate into retraining",
      ],
    },
  ],
  creditscout: [
    {
      title: "Start with the data someone chooses to share.",
      body: "The platform accepts CSV and PDF bank statements. Transaction history is the starting point for a behavioral assessment.",
      artifact: "Statement ingestion",
      rows: [
        "Supported formats / CSV · PDF",
        "Processing / Python",
        "Access / Firebase authentication",
      ],
    },
    {
      title: "Look for habits, not just history.",
      body: "Pandas and NumPy turn transaction records into behavioral features that the model can use.",
      artifact: "Feature preparation",
      rows: [
        "Bank records → Structured transactions",
        "Transactions → Behavioral features",
        "Features → Model input",
      ],
    },
    {
      title: "An experimental view of readiness.",
      body: "XGBoost supports an assessment on a 0–100 scale. The model was trained on synthetic banking data; this project explores credit readiness rather than making lending decisions.",
      artifact: "Model context",
      rows: [
        "Model / XGBoost",
        "Training data / Synthetic banking data",
        "Output / Credit-readiness assessment",
      ],
    },
    {
      title: "Make the result understandable.",
      body: "A Next.js workspace brings the assessment, trend analysis, and score history together, with a downloadable PDF report.",
      artifact: "Report delivery",
      rows: [
        "Readiness score & trends",
        "Stored assessment history",
        "Downloadable PDF certificate",
      ],
    },
  ],
  greenhydro: [
    {
      title: "Bring production claims into one record.",
      body: "Documents and text submissions provide production, environmental, and capacity information for the analysis workflow.",
      artifact: "Production intake",
      rows: [
        "Production documentation",
        "Environmental information",
        "Capacity data",
      ],
    },
    {
      title: "Look for inconsistent patterns.",
      body: "A Flask service uses Random Forest analysis to flag suspicious patterns in the submitted data. Analysis informs the next review step.",
      artifact: "Analysis service",
      rows: [
        "Express → Flask",
        "Random Forest analysis",
        "Consistency flags → Review",
      ],
    },
    {
      title: "Keep the analysis connected to the record.",
      body: "Results are stored with Firebase so that the experimental certification workflow can continue from the same context.",
      artifact: "Review workspace",
      rows: ["Submitted evidence", "Analysis results", "Certification review"],
    },
    {
      title: "Explore a traceable next step.",
      body: "Solidity contracts extend the prototype into certification and subsidy token workflows. This is an experimental project, not an issued environmental accreditation.",
      artifact: "Contract layer",
      rows: [
        "Certification components",
        "Subsidy token workflows",
        "Solidity smart contracts",
      ],
    },
  ],
  jobwemet: [
    {
      title: "Begin with someone’s experience.",
      body: "PDF and DOCX resume parsing turns an existing document into text that the career analysis can work with.",
      artifact: "Resume intake",
      rows: [
        "Formats / PDF · DOCX",
        "Text extraction",
        "Document storage / Firebase",
      ],
    },
    {
      title: "Make the skills visible.",
      body: "A FastAPI service connects resume text with Gemini to analyze technical skills and career context.",
      artifact: "Skill analysis",
      rows: [
        "Resume text → Gemini",
        "Technical skill extraction",
        "Context for career matching",
      ],
    },
    {
      title: "Explore fit, with a reason why.",
      body: "Career matching includes supporting reasoning. Skill-gap analysis helps connect a current profile to a target role.",
      artifact: "Career exploration",
      rows: [
        "Existing competencies",
        "Target role requirements",
        "Skills to develop next",
      ],
    },
    {
      title: "Give the next step some structure.",
      body: "Personalized learning roadmaps and course recommendations turn gaps into a more focused learning plan.",
      artifact: "Learning roadmap",
      rows: [
        "Skill gaps → Learning goals",
        "Goals → Recommended courses",
        "A more focused next step",
      ],
    },
  ],
  "formula-one": [
    {
      title: "Take a wider view of the grid.",
      body: "A dataset spanning more than 500 races makes it possible to look beyond any single result.",
      artifact: "Study scope",
      rows: ["500+ races", "Historical race records", "Exploratory analysis"],
    },
    {
      title: "Prepare the questions and the data.",
      body: "Python and Pandas support exploration of performance across the dataset.",
      artifact: "Analysis toolkit",
      rows: [
        "Python / Data processing",
        "Pandas / Grouping & exploration",
        "Comparisons across races",
      ],
    },
    {
      title: "Look for patterns worth following.",
      body: "The study examines performance trends and race strategy patterns. The aim is to make comparisons clearer, rather than to predict race outcomes.",
      artifact: "Research lenses",
      rows: [
        "Performance trends",
        "Strategy patterns",
        "Cross-race comparisons",
      ],
    },
    {
      title: "Make the findings easier to inspect.",
      body: "Matplotlib and Seaborn turn tabular comparisons into visual exploration. Source charts are not currently published with this portfolio.",
      artifact: "Visualization toolkit",
      rows: [
        "Matplotlib / Figures",
        "Seaborn / Statistical views",
        "Visual comparison",
      ],
    },
  ],
};
const icons = [FileText, Sparkles, GitBranch, Layers];
export function ProjectLab({ project }: { project: Project }) {
  const [active, setActive] = useState(0);
  const reduced = useReducedMotion();
  const item = details[project.slug][active];
  const Icon = icons[active];
  return (
    <section
      className="system-lab"
      aria-label={`${project.title} workflow walkthrough`}
    >
      <div className="lab-header">
        <span className="eyebrow">EXPLORE THE WORKFLOW</span>
        <span>INTERACTIVE WALKTHROUGH / 0{active + 1}—04</span>
      </div>
      <div className="lab-layout">
        <div className="lab-steps" aria-label="Workflow stages">
          {project.flow.map((f, i) => (
            <button
              key={f}
              onClick={() => setActive(i)}
              aria-pressed={active === i}
              className={active === i ? "active" : ""}
            >
              <span>{i < active ? <Check size={15} /> : `0${i + 1}`}</span>
              <strong>{f}</strong>
              <ArrowRight size={17} />
            </button>
          ))}
        </div>
        <div className="lab-stage" aria-live="polite">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: reduced ? 0 : 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: reduced ? 0 : -12 }}
              transition={{ duration: reduced ? 0 : motionTokens.duration.base }}
            >
              <Icon size={30} strokeWidth={1} />
              <h3>{item.title}</h3>
              <p>{item.body}</p>
              <div className="lab-artifact">
                <span>{item.artifact}</span>
                {item.rows.map((row, i) => (
                  <div key={row}>
                    <span>0{i + 1}</span>
                    {row}
                  </div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
          <div className="lab-bottom">
            <span>
              Architecture explanation · no live model is running here
            </span>
            <button
              onClick={() => setActive((active + 1) % 4)}
              aria-label={
                active === 3 ? "Restart walkthrough" : "Next workflow stage"
              }
            >
              {active === 3 ? "Start again" : "Next stage"}
              <ArrowRight size={17} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
