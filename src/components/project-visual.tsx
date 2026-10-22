"use client";
import Image from "next/image";
import {
  motion,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from "framer-motion";
import {
  ArrowUpRight,
  Check,
  Circle,
  FileText,
  Layers,
  Search,
  Sparkles,
  GitBranch,
  ShieldCheck,
  Leaf,
  Command,
} from "lucide-react";
const names: Record<string, string> = {
  "complaint-tracker": "ComplaintTracker AI",
  creditscout: "Creditscout",
  greenhydro: "GreenHydro",
  jobwemet: "JobWeMet",
  "formula-one": "Race intelligence",
};
function WindowBar({ slug }: { slug: string }) {
  return (
    <div className="product-window-bar">
      <span className="window-dots">
        <i />
        <i />
        <i />
      </span>
      <span>{names[slug]}</span>
      <span className="window-command">
        <Command size={10} /> K
      </span>
    </div>
  );
}
function ComplaintPreview() {
  return (
    <div className="triage-app">
      <aside className="app-rail">
        <span className="app-symbol">
          <Layers size={19} />
        </span>
        <span className="rail-active">
          <FileText size={16} />
        </span>
        <GitBranch size={16} />
        <ShieldCheck size={16} />
        <span className="rail-avatar">PD</span>
      </aside>
      <div className="triage-main">
        <div className="product-breadcrumb">
          WORKSPACE <span>/</span> COMPLAINT INTELLIGENCE
        </div>
        <div className="product-title">
          <h3>
            Every voice.
            <br />
            <span>A clear next step.</span>
          </h3>
          <span className="small-status">
            <i /> Triage workspace
          </span>
        </div>
        <div className="sample-strip">
          <span>01 / INTAKE</span>
          <span>02 / UNDERSTAND</span>
          <span>03 / RESOLVE</span>
        </div>
        <div className="triage-content">
          <div className="ticket-list">
            <div className="mini-section">
              INCOMING REQUESTS <Search size={12} />
            </div>
            {[
              ["Billing", "Charged twice for my subscription", "Web portal"],
              ["Technical", "Unable to sign in to my account", "Telegram"],
              ["Service", "An update on my open request", "Web portal"],
            ].map(([tag, text, source], i) => (
              <div
                className={`sample-ticket ${i === 0 ? "ticket-active" : ""}`}
                key={text}
              >
                <div>
                  <span className="ticket-id">#00{i + 1}</span>
                  <span>{tag}</span>
                </div>
                <strong>{text}</strong>
                <small>
                  {source}
                  <ArrowUpRight size={11} />
                </small>
              </div>
            ))}
          </div>
          <div className="ticket-insight">
            <span className="insight-icon">
              <Sparkles size={20} />
            </span>
            <span className="mini-section">INTELLIGENCE LAYER</span>
            <h4>
              Understand.
              <br />
              Then act.
            </h4>
            <div className="insight-row">
              <span>Classification</span>
              <strong>Billing</strong>
            </div>
            <div className="insight-row">
              <span>Sentiment</span>
              <strong>Negative</strong>
            </div>
            <div className="insight-row">
              <span>Next step</span>
              <strong>Support review</strong>
            </div>
            <div className="sample-note">
              Illustrative request · sample workflow
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
function HydroPreview() {
  return (
    <div className="hydro-app">
      <div className="hydro-heading">
        <span>
          <Leaf size={18} /> GREENHYDRO
        </span>
        <span>PRODUCTION → PROOF</span>
      </div>
      <div className="hydro-body">
        <div className="hydro-molecule" aria-hidden="true">
          <span>
            H<sub>2</sub>
          </span>
          <i className="molecule-orbit" />
          <i className="molecule-orbit orbit-two" />
          <i className="molecule-dot" />
        </div>
        <div className="hydro-dossier">
          <div className="mini-section">
            CERTIFICATION WORKSPACE / CONCEPT VIEW
          </div>
          <h3>
            Energy, with
            <br />a paper trail.
          </h3>
          <div className="dossier-file">
            <FileText size={25} />
            <div>
              <strong>Production record</strong>
              <span>Document & environmental data</span>
            </div>
            <ArrowUpRight size={17} />
          </div>
          {[
            "Production data submitted",
            "ML consistency analysis",
            "Certification review",
            "Contract workflow",
          ].map((s, i) => (
            <div className="hydro-step" key={s}>
              <span>{i < 2 ? <Check size={12} /> : <Circle size={11} />}</span>
              <strong>{s}</strong>
              <small>0{i + 1}</small>
            </div>
          ))}
          <span className="sample-note">
            Experimental ML + blockchain workflow
          </span>
        </div>
      </div>
    </div>
  );
}
function CareerPreview() {
  return (
    <div className="career-app">
      <div className="career-top">
        <span>
          jobwe<span>met</span>
          <i />
        </span>
        <span>YOUR NEXT CHAPTER, MAPPED.</span>
      </div>
      <div className="career-dashboard">
        <div className="career-profile">
          <div className="resume-page">
            <FileText size={27} />
            <strong>Your experience.</strong>
            <span>Your potential.</span>
            <i />
            <i />
            <i />
            <div className="resume-tags">
              <span>Python</span>
              <span>React</span>
              <span>SQL</span>
            </div>
          </div>
          <span className="mini-section">01 / RESUME & SKILLS</span>
        </div>
        <div className="career-path-panel">
          <span className="mini-section">02 / A DIRECTION WORTH EXPLORING</span>
          <h3>
            Turn “what next?”
            <br />
            into a plan.
          </h3>
          <div className="career-target">
            <span>
              <Sparkles size={15} /> ROLE EXPLORATION
            </span>
            <strong>Machine Learning Engineer</strong>
            <small>Illustrative career pathway</small>
          </div>
          <div className="roadmap-track">
            {["Foundations", "Model building", "Deploy & learn"].map((s, i) => (
              <div key={s}>
                <span>0{i + 1}</span>
                <strong>{s}</strong>
                <i />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
function FormulaPreview() {
  return (
    <div className="race-app">
      <div className="race-top">
        <span>
          F<span>1</span> / FIELD NOTES
        </span>
        <span>PYTHON · PANDAS · EXPLORATION</span>
      </div>
      <div className="race-body">
        <div>
          <span className="mini-section">AN EXPLORATORY DATA STUDY</span>
          <h3>
            Beyond
            <br />
            the podium<span>.</span>
          </h3>
          <div className="race-dataset">
            <strong>
              500<span>+</span>
            </strong>
            <span>
              RACES IN
              <br />
              THE DATASET
            </span>
          </div>
          <span className="sample-note">Performance / Strategy / Patterns</span>
        </div>
        <div className="notebook-preview">
          <div className="notebook-cell">
            <span>In [01]</span>
            <code>
              <b>import</b> pandas <b>as</b> pd
              <br />
              <b>import</b> seaborn <b>as</b> sns
            </code>
          </div>
          <div className="notebook-cell">
            <span>In [02]</span>
            <code>
              <em># Start with better questions.</em>
              <br />
              races.groupby(<q>constructor</q>)<br />
              &nbsp; .agg(<q>performance</q>)
            </code>
          </div>
          <div className="race-questions">
            <span>RESEARCH LENSES</span>
            {["Driver performance", "Team comparisons", "Race strategy"].map(
              (s, i) => (
                <div key={s}>
                  <small>0{i + 1}</small>
                  {s}
                  <ArrowUpRight size={13} />
                </div>
              ),
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
export function ProjectVisual({
  slug,
  large = false,
}: {
  slug: string;
  large?: boolean;
}) {
  const reduced = useReducedMotion();
  const x = useMotionValue(0),
    y = useMotionValue(0);
  const rotateX = useSpring(y, { stiffness: 110, damping: 24 });
  const rotateY = useSpring(x, { stiffness: 110, damping: 24 });
  return (
    <div
      className={`project-visual product-stage stage-${slug} ${large ? "visual-large" : ""}`}
      onPointerMove={(e) => {
        if (reduced || e.pointerType !== "mouse") return;
        const r = e.currentTarget.getBoundingClientRect();
        x.set(((e.clientX - r.left) / r.width - 0.5) * 7);
        y.set(-((e.clientY - r.top) / r.height - 0.5) * 7);
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      <div className="stage-grid" aria-hidden="true" />
      <div className="stage-caption">
        <span>PD / PROJECT 0{Object.keys(names).indexOf(slug) + 1}</span>
        <span>
          {slug === "creditscout"
            ? "CAPTURED FROM THE LIVE PROJECT"
            : "PRODUCT INTERFACE STUDY"}
        </span>
      </div>
      <motion.div
        className="product-window"
        style={{
          rotateX: reduced ? 0 : rotateX,
          rotateY: reduced ? 0 : rotateY,
        }}
      >
        <WindowBar slug={slug} />
        {slug === "complaint-tracker" ? (
          <ComplaintPreview />
        ) : slug === "greenhydro" ? (
          <HydroPreview />
        ) : slug === "jobwemet" ? (
          <CareerPreview />
        ) : slug === "formula-one" ? (
          <FormulaPreview />
        ) : (
          <div className="credit-real-interface">
            <Image
              src="/work/creditscout-interface.png"
              alt="Actual Creditscout website, showing its credit readiness product"
              width={1265}
              height={712}
              sizes="(max-width:700px) 90vw,1100px"
            />
            <span className="credit-interface-stamp">
              CREDITSCOUT / LIVE INTERFACE
            </span>
          </div>
        )}
      </motion.div>
      <div className="stage-footer">
        <span>{names[slug]}</span>
        <span>
          IDEA → WORKING SYSTEM <ArrowUpRight size={12} />
        </span>
      </div>
    </div>
  );
}
