export function SplitHeading({ text, id }: { text: string; id?: string }) {
  return (
    <h2 id={id} data-split-title aria-label={text}>
      {text.split(" ").map((word, index) => (
        <span key={`${word}-${index}`} aria-hidden="true">
          <span className="title-word-mask">
            <span className="title-word">{word}</span>
          </span>{" "}
        </span>
      ))}
    </h2>
  );
}
