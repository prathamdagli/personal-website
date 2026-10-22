export function ScrollStatement() {
  return <h2 className="scroll-statement" aria-label="I work where machine intelligence meets the real world.">{["I work where", "machine intelligence", "meets the real world."].map(line=><span className="statement-line story-line" key={line}>{line}</span>)}</h2>;
}
