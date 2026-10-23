"use client";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { ArrowUpRight, Check, Copy } from "lucide-react";
import { useReducedMotion } from "framer-motion";
import { email } from "@/lib/portfolio";
import { prepareContactDraft } from "@/lib/contact-draft";
import { siteConfig } from "@/lib/site-config";

export function ContactComposerLink() {
  const reduced = useReducedMotion();
  return (
    <a
      className="underlined-link"
      href="#contact-form"
      onClick={(event) => {
        const form = document.getElementById("contact-form");
        const input =
          form?.querySelector<HTMLInputElement>('input[name="name"]');
        if (!form || !input) return;
        event.preventDefault();
        form.scrollIntoView({
          behavior: reduced ? "auto" : "smooth",
          block: "center",
        });
        input.focus({ preventScroll: true });
      }}
    >
      WRITE TO ME <ArrowUpRight size={18} />
    </a>
  );
}
export function CopyEmail() {
  const [status, setStatus] = useState("");
  useEffect(() => {
    if (!status) return;
    const timer = window.setTimeout(() => setStatus(""), 4000);
    return () => window.clearTimeout(timer);
  }, [status]);
  async function copy() {
    try {
      await navigator.clipboard.writeText(email);
      setStatus("Email copied");
    } catch {
      setStatus("Copy unavailable. Use the email link above.");
    }
  }
  return (
    <div className="copy-email">
      <button type="button" className="text-link" onClick={copy}>
        {status === "Email copied" ? <Check size={15} /> : <Copy size={15} />}
        Copy email address
      </button>
      <span role="status" className={status ? "toast" : undefined}>
        {status}
      </span>
    </div>
  );
}
export function ContactForm({ directDelivery = false }: { directDelivery?: boolean }) {
  const [topic, setTopic] = useState("A project idea");
  const [draft, setDraft] = useState<ReturnType<
    typeof prepareContactDraft
  > | null>(null);
  const [copyStatus, setCopyStatus] = useState("");
  const [sending, setSending] = useState(false);
  const [delivery, setDelivery] = useState<{
    kind: "success" | "error";
    message: string;
  } | null>(null);
  const draftPanel = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const inFlight = useRef(false);
  useEffect(() => {
    if (!draft) return;
    draftPanel.current?.focus({ preventScroll: true });
    draftPanel.current?.scrollIntoView({
      behavior: reduced ? "auto" : "smooth",
      block: "nearest",
    });
  }, [draft, reduced]);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (inFlight.current) return;
    const form = event.currentTarget;
    const nameInput = event.currentTarget.elements.namedItem(
      "name",
    ) as HTMLInputElement;
    const messageInput = event.currentTarget.elements.namedItem(
      "message",
    ) as HTMLTextAreaElement;
    if (!nameInput.value.trim()) {
      nameInput.setCustomValidity("Please enter your name.");
      nameInput.reportValidity();
      return;
    }
    if (messageInput.value.trim().length < 10) {
      messageInput.setCustomValidity(
        "Please add at least 10 characters about your idea.",
      );
      messageInput.reportValidity();
      return;
    }
    const data = new FormData(event.currentTarget);
    const action = (event.nativeEvent as SubmitEvent).submitter?.getAttribute(
      "value",
    );
    const prepared = prepareContactDraft({ topic, name: String(data.get("name") ?? ""), email: String(data.get("email") ?? ""), message: String(data.get("message") ?? "") }, email);
    if (action !== "draft" && directDelivery) {
      inFlight.current = true;
      setSending(true);
      setDelivery(null);
      try {
        const response = await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: data.get("name"),
            email: data.get("email"),
            message: data.get("message"),
            topic,
            company: data.get("company"),
          }),
          signal: AbortSignal.timeout(15000),
        });
        const result = await response.json().catch(() => null);
        if (!response.ok || result?.ok !== true)
          throw new Error(
            "Your message has not been sent. Please use one of the email options below, or chat on WhatsApp.",
          );
        setDelivery({
          kind: "success",
          message: "Message sent. Thank you for reaching out.",
        });
        setDraft(null);
        form.reset();
        setTopic("A project idea");
      } catch (error) {
        setDraft(prepared);
        setDelivery({
          kind: "error",
          message:
            error instanceof Error && error.name !== "TimeoutError"
              ? error.message
              : "The email service is taking too long. Please try again or prepare an email draft.",
        });
      } finally {
        inFlight.current = false;
        setSending(false);
      }
      return;
    }
    setDraft(prepared);
    setCopyStatus("");
  }
  async function copyDraft() {
    if (!draft) return;
    try {
      await navigator.clipboard.writeText(draft.text);
      setCopyStatus("Draft copied.");
    } catch {
      setCopyStatus("Copy unavailable. Select and copy the draft below.");
      const text =
        draftPanel.current?.querySelector<HTMLTextAreaElement>("textarea");
      text?.focus();
      text?.select();
    }
  }
  return (
    <form
      id="contact-form"
      className="contact-form"
      aria-busy={sending}
      onSubmit={submit}
      onChange={() => {
        setDraft(null);
        setCopyStatus("");
        setDelivery(null);
      }}
    >
      <h2>What are you thinking?</h2>
      <div className="contact-honeypot" aria-hidden="true">
        <label>
          Company website
          <input name="company" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      <fieldset>
        <legend>I’m reaching out about</legend>
        <div className="topic-options">
          {["A project idea", "An opportunity", "Just saying hi"].map((t) => (
            <label key={t} className={topic === t ? "selected" : ""}>
              <input
                type="radio"
                name="topic"
                value={t}
                checked={topic === t}
                disabled={sending}
                onChange={() => setTopic(t)}
              />
              {t}
            </label>
          ))}
        </div>
      </fieldset>
      <div className="form-row">
        <label>
          Your name
          <input
            name="name"
            placeholder="Your full name"
            onInput={(event) => event.currentTarget.setCustomValidity("")}
            autoComplete="name"
            required
            maxLength={100}
            disabled={sending}
          />
        </label>
        <label>
          Email address
          <input
            name="email"
            type="email"
            placeholder="you@example.com"
            autoComplete="email"
            required
            maxLength={254}
            disabled={sending}
          />
        </label>
      </div>
      <label>
        A little about it
        <textarea
          name="message"
          placeholder="What would you like to build together?"
          onInput={(event) => event.currentTarget.setCustomValidity("")}
          required
          minLength={10}
          maxLength={5000}
          rows={4}
          disabled={sending}
        />
      </label>
      <div className="form-bottom">
        <p>
          {directDelivery ? "Send your message here, or use your preferred email app." : "Prepare your message, then send it with Gmail, Outlook or your email app."}
        </p>
        <button
          className="button button-primary"
          type="submit"
          name="action"
          value={directDelivery ? "send" : "draft"}
          disabled={sending}
        >
          {sending ? "Sending…" : directDelivery ? "Send message" : "Continue to email"} <ArrowUpRight size={17} />
        </button>
      </div>
      <div className="contact-secondary-actions">
      {directDelivery && <button
        type="submit"
        name="action"
        value="draft"
        className="text-link draft-fallback"
        disabled={sending}
      >
        Or prepare an email draft <ArrowUpRight size={15} />
      </button>}
      <a className="text-link contact-whatsapp" href={siteConfig.whatsapp.url} target="_blank" rel="noreferrer">
        Chat on WhatsApp <ArrowUpRight size={15} />
      </a>
      </div>
      {delivery && (
        <p
          className={`delivery-status delivery-${delivery.kind}`}
          role={delivery.kind === "error" ? "alert" : "status"}
        >
          {delivery.message}
        </p>
      )}
      {draft && (
        <section
          ref={draftPanel}
          className="email-draft"
          tabIndex={-1}
          aria-labelledby="email-draft-title"
        >
          <h3 id="email-draft-title">Your draft is ready.</h3>
          <p>Choose where to open it. You’ll review and send it there.</p>
          <div className="email-draft-actions">
            <a href={draft.gmail} target="_blank" rel="noreferrer">
              Open Gmail <ArrowUpRight size={15} />
            </a>
            <a href={draft.outlook} target="_blank" rel="noreferrer">
              Open Outlook <ArrowUpRight size={15} />
            </a>
            <a href={draft.mailto}>
              Use email app <ArrowUpRight size={15} />
            </a>
            <button type="button" onClick={copyDraft}>
              <Copy size={15} /> Copy draft
            </button>
          </div>
          <label htmlFor="prepared-email">Draft preview</label>
          <textarea id="prepared-email" value={draft.text} readOnly rows={9} />
          <p role="status">{copyStatus}</p>
        </section>
      )}
    </form>
  );
}
