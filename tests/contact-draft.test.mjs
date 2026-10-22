import test from "node:test";
import assert from "node:assert/strict";
import { prepareContactDraft } from "../src/lib/contact-draft.ts";

const recipient = "prathamdagli11@gmail.com";
const message = {
  name: "  Alex & Sam  ",
  email: "  alex+portfolio@example.com  ",
  topic: "A project idea",
  message: "  A café project?\nReact + Python & a #roadmap.  ",
};

test("Gmail, Outlook, and email-app drafts preserve Unicode, line breaks, and special characters", () => {
  const draft = prepareContactDraft(message, recipient);
  for (const [href, subjectKey] of [
    [draft.gmail, "su"],
    [draft.outlook, "subject"],
  ]) {
    const url = new URL(href);
    assert.equal(url.protocol, "https:");
    assert.equal(url.searchParams.get("to"), recipient);
    assert.equal(
      url.searchParams.get(subjectKey),
      "A project idea — Alex & Sam",
    );
    assert.equal(url.searchParams.get("body"), draft.body);
  }
  const mailto = new URL(draft.mailto);
  assert.equal(mailto.protocol, "mailto:");
  assert.equal(mailto.pathname, recipient);
  assert.equal(mailto.searchParams.get("subject"), draft.subject);
  assert.equal(mailto.searchParams.get("body"), draft.body);
  assert.ok(
    draft.body.includes("A café project?\nReact + Python & a #roadmap."),
  );
  assert.ok(draft.body.endsWith("Reply to: alex+portfolio@example.com"));
});

test("copyable preview includes the same recipient, subject, and message as provider links", () => {
  const draft = prepareContactDraft(message, recipient);
  assert.equal(
    draft.text,
    `To: ${recipient}\nSubject: ${draft.subject}\n\n${draft.body}`,
  );
});

test("all contact topics are retained, and names cannot inject subject line breaks", () => {
  for (const topic of ["A project idea", "An opportunity", "Just saying hi"]) {
    const draft = prepareContactDraft(
      { ...message, topic, name: "Alex\r\nMorgan" },
      recipient,
    );
    assert.equal(draft.subject, `${topic} — Alex Morgan`);
    assert.equal(new URL(draft.gmail).searchParams.get("su"), draft.subject);
  }
});
