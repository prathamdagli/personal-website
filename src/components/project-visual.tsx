import {
  ArrowUpRight,
  Check,
  GitBranch,
  Layers,
  Leaf,
  Sparkles,
  MessageSquare,
  Activity,
} from "lucide-react";
export function ProjectVisual({
  slug,
  large = false,
}: {
  slug: string;
  large?: boolean;
}) {
  return (
    <div
      className={`project-visual visual-${slug} ${large ? "visual-large" : ""}`}
      aria-label={`${slug} conceptual project illustration`}
      role="img"
    >
      <div className="visual-grid" />
      {slug === "complaint-tracker" && (
        <div className="mini-window">
          <div className="window-bar">
            <div className="window-dots">
              <i />
              <i />
              <i />
            </div>
            <span>COMPLAINT INTELLIGENCE</span>
            <Sparkles size={12} />
          </div>
          <div className="ticket-body">
            <div className="ticket-icon">
              <MessageSquare size={23} />
            </div>
            <div className="ticket-heading">
              Every voice.
              <br />
              <strong>A clear next step.</strong>
            </div>
            <div className="ticket-row">
              <span>
                <i /> Complaint received
              </span>
              <Check size={12} />
            </div>
            <div className="ticket-row">
              <span>
                <i /> Classified with AI
              </span>
              <Check size={12} />
            </div>
            <div className="ticket-row active">
              <span>
                <i /> Routed for resolution
              </span>
              <ArrowUpRight size={12} />
            </div>
            <div className="ticket-bottom">
              <span>UNDERSTAND</span>
              <span>PRIORITIZE</span>
              <span>RESOLVE</span>
            </div>
          </div>
        </div>
      )}
      {slug === "creditscout" && (
        <div className="score-art">
          <div className="visual-label">BEYOND A CREDIT HISTORY</div>
          <div className="score-ring">
            <div>
              <Activity size={24} />
              <strong>Potential.</strong>
              <span>Seen differently.</span>
            </div>
          </div>
          <div className="score-pill">
            <span className="tiny-dot" /> Behavior → Features → Insight{" "}
            <ArrowUpRight size={12} />
          </div>
        </div>
      )}
      {slug === "greenhydro" && (
        <div className="hydro-art">
          <div className="hydro-symbol">
            <Leaf size={70} strokeWidth={1} />
            <span>H₂</span>
          </div>
          <div className="hydro-line">
            <span>PRODUCTION</span>
            <i />
            <span>VERIFICATION</span>
            <i />
            <span>CERTIFICATION</span>
          </div>
          <div className="hydro-caption">A cleaner chain of trust.</div>
        </div>
      )}
      {slug === "jobwemet" && (
        <div className="career-art">
          <div className="career-node node-one">
            <Layers size={19} />
            <span>Your skills</span>
          </div>
          <div className="career-path" />
          <div className="career-node node-two">
            <GitBranch size={19} />
            <span>Your next chapter</span>
            <ArrowUpRight size={16} />
          </div>
          <div className="career-caption">
            Less guessing.
            <br />
            <strong>More direction.</strong>
          </div>
        </div>
      )}
      {slug === "formula-one" && (
        <div className="race-art">
          <svg viewBox="0 0 500 240" aria-hidden="true">
            <path
              className="race-track-outer"
              d="M85 170C15 160 30 65 110 65H370Q460 65 420 135L360 185Q340 203 302 175L250 130Q220 112 190 150L160 175Q130 200 85 170Z"
            />
            <path
              className="race-track-inner"
              d="M85 170C15 160 30 65 110 65H370Q460 65 420 135L360 185Q340 203 302 175L250 130Q220 112 190 150L160 175Q130 200 85 170Z"
            />
            <circle cx="189" cy="65" r="7" />
          </svg>
          <div className="race-caption">
            <span>500+ RACES. COUNTLESS STORIES.</span>
            <strong>Data at full speed.</strong>
          </div>
        </div>
      )}
      <span className="visual-footnote">
        CONCEPT VISUAL /{" "}
        {slug === "formula-one" ? "DATA EXPLORATION" : "PROJECT ARCHITECTURE"}
      </span>
    </div>
  );
}
