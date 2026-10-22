import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

export function ProjectVisual({
  slug,
  large = false,
}: {
  slug: string;
  large?: boolean;
}) {
  return (
    <div
      className={`project-visual art-${slug} ${large ? "visual-large" : ""}`}
      role="img"
      aria-label={`${slug.replaceAll("-", " ")} — illustrated system overview`}
    >
      {slug === "complaint-tracker" && (
        <>
          <div className="art-topline">
            <span>COMPLAINTTRACKER / AI</span>
            <span>HUMAN INPUT. MACHINE UNDERSTANDING.</span>
          </div>
          <div className="complaint-art">
            <div className="complaint-poster-type">
              EVERY
              <br />
              VOICE<span className="poster-red">.</span>
            </div>
            <svg
              viewBox="0 0 500 420"
              className="complaint-network"
              aria-hidden="true"
            >
              <g fill="none" stroke="currentColor" strokeWidth="1">
                <path d="M20 90 C160 90 120 210 235 210M20 210H235M20 330C160 330 120 210 235 210M235 210C340 210 330 70 430 70M235 210C340 210 330 165 430 165M235 210C340 210 330 260 430 260M235 210C340 210 330 355 430 355" />
                <circle cx="235" cy="210" r="55" />
                <circle cx="235" cy="210" r="64" strokeDasharray="2 7" />
              </g>
              <g fill="currentColor">
                <circle cx="20" cy="90" r="5" />
                <circle cx="20" cy="210" r="5" />
                <circle cx="20" cy="330" r="5" />
                <circle cx="430" cy="70" r="5" />
                <circle cx="430" cy="165" r="5" />
                <circle cx="430" cy="260" r="5" />
                <circle cx="430" cy="355" r="5" />
              </g>
              <circle cx="235" cy="210" r="42" fill="#c44832" />
              <text
                x="235"
                y="215"
                textAnchor="middle"
                fill="#f0eae0"
                fontSize="15"
                fontFamily="monospace"
              >
                NLP
              </text>
              <g fill="currentColor" fontSize="11" fontFamily="monospace">
                <text x="443" y="74">
                  01
                </text>
                <text x="443" y="169">
                  02
                </text>
                <text x="443" y="264">
                  03
                </text>
                <text x="443" y="359">
                  04
                </text>
              </g>
            </svg>
          </div>
          <div className="art-bottomline">
            <span>CLASSIFY / PRIORITIZE / RESOLVE</span>
            <span>
              TF-IDF + LOGISTIC REGRESSION <ArrowUpRight size={13} />
            </span>
          </div>
        </>
      )}
      {slug === "creditscout" && (
        <>
          <div className="art-topline">
            <span>CREDITSCOUT</span>
            <span>BEHAVIORAL CREDIT INTELLIGENCE</span>
          </div>
          <div className="credit-art">
            <div className="credit-art-heading">
              A different
              <br />
              kind of <em>credit.</em>
            </div>
            <div className="credit-browser">
              <div className="browser-caption">
                <i />
                <i />
                <i />
                <span>CREDITSCOUT / LIVE INTERFACE</span>
              </div>
              <Image
                src="/work/creditscout-interface.png"
                alt="Creditscout landing page interface"
                width={1265}
                height={712}
                sizes="(max-width:700px) 80vw,650px"
              />
            </div>
          </div>
          <div className="art-bottomline">
            <span>TRANSACTIONS → BEHAVIOR → READINESS</span>
            <span>
              XGBOOST / FASTAPI <ArrowUpRight size={13} />
            </span>
          </div>
        </>
      )}
      {slug === "greenhydro" && (
        <>
          <div className="art-topline">
            <span>GREENHYDRO</span>
            <span>ENERGY / INTELLIGENCE / TRUST</span>
          </div>
          <div className="hydrogen-art">
            <svg
              className="hydrogen-contours"
              viewBox="0 0 650 400"
              aria-hidden="true"
            >
              {Array.from({ length: 18 }, (_, i) => (
                <ellipse
                  key={i}
                  cx="325"
                  cy="200"
                  rx={100 + i * 10}
                  ry={30 + i * 7}
                  transform={`rotate(${i * 5} 325 200)`}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth=".7"
                />
              ))}
            </svg>
            <span className="hydrogen-type">
              H<span>2</span>
            </span>
            <span className="hydrogen-small">
              LESS DOUBT.
              <br />
              MORE TRACEABILITY.
            </span>
          </div>
          <div className="art-bottomline">
            <span>PRODUCTION → VALIDATION → CERTIFICATION</span>
            <span>
              ML + BLOCKCHAIN <ArrowUpRight size={13} />
            </span>
          </div>
        </>
      )}
      {slug === "jobwemet" && (
        <>
          <div className="art-topline">
            <span>JOBWEMET</span>
            <span>A CAREER IS A PATH. NOT A GUESS.</span>
          </div>
          <div className="career-art">
            <svg viewBox="0 0 700 360" aria-hidden="true">
              <path
                d="M60 280H220Q270 280 270 230V160Q270 110 320 110H405Q455 110 455 160V240Q455 290 505 290H560Q610 290 610 240V70"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <path
                d="M595 85l15-15 15 15"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <circle cx="60" cy="280" r="11" fill="#c44832" />
              {[
                [270, 170],
                [410, 110],
                [525, 290],
              ].map(([cx, cy]) => (
                <circle key={cx} cx={cx} cy={cy} r="6" fill="currentColor" />
              ))}
              <g fontFamily="monospace" fontSize="12" fill="currentColor">
                <text x="38" y="315">
                  YOU
                </text>
                <text x="288" y="175">
                  SKILLS
                </text>
                <text x="385" y="88">
                  INSIGHT
                </text>
                <text x="500" y="320">
                  LEARNING
                </text>
                <text x="548" y="46">
                  WHAT’S NEXT
                </text>
              </g>
            </svg>
            <span className="career-art-type">
              YOUR NEXT
              <br />
              CHAPTER<span>.</span>
            </span>
          </div>
          <div className="art-bottomline">
            <span>RESUME → SKILL GAPS → LEARNING ROADMAP</span>
            <span>
              GEMINI / REACT <ArrowUpRight size={13} />
            </span>
          </div>
        </>
      )}
      {slug === "formula-one" && (
        <>
          <div className="art-topline">
            <span>FORMULA 1 / DATA STUDY</span>
            <span>THE PATTERNS BEHIND THE PODIUM</span>
          </div>
          <div className="formula-art">
            <span className="formula-type">
              F<span>1</span>
            </span>
            <svg viewBox="0 0 500 240" aria-hidden="true">
              <path
                d="M85 170C15 160 30 65 110 65H370Q460 65 420 135L360 185Q340 203 302 175L250 130Q220 112 190 150L160 175Q130 200 85 170Z"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              />
              <path
                d="M85 170C15 160 30 65 110 65H370Q460 65 420 135L360 185Q340 203 302 175L250 130Q220 112 190 150L160 175Q130 200 85 170Z"
                fill="none"
                stroke="currentColor"
                strokeWidth="14"
                opacity=".08"
              />
              <circle cx="190" cy="65" r="6" fill="#c44832" />
            </svg>
            <span className="formula-small">
              500+ RACES
              <br />
              ONE DATASET.
            </span>
          </div>
          <div className="art-bottomline">
            <span>PERFORMANCE / STRATEGY / EXPLORATION</span>
            <span>
              PYTHON / PANDAS <ArrowUpRight size={13} />
            </span>
          </div>
        </>
      )}
    </div>
  );
}
