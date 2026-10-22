import type { ReactNode } from "react";
export function PageIntro({
  eyebrow,
  lines,
  description,
  children,
  className = "",
}: {
  eyebrow: string;
  lines: string[];
  description: ReactNode;
  children?: ReactNode;
  className?: string;
}) {
  return (
    <section className={`container page-intro kinetic-intro ${className}`}>
      <div className="eyebrow">
        {eyebrow}
      </div>
      <h1>
        {lines.map((line) => (
          <span className="title-mask" key={line}>
            <span className="page-title-line">
              {line}
            </span>
          </span>
        ))}
      </h1>
      <div className="intro-bottom">
        <div className="intro-description">{description}</div>
        {children}
      </div>
    </section>
  );
}
