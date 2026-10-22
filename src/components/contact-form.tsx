"use client";
import { useState, type FormEvent } from "react";
import { ArrowUpRight, Check, Copy } from "lucide-react";
import { email } from "@/lib/portfolio";
export function CopyEmail() {
  const [status, setStatus] = useState("");
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
      <button className="text-link" onClick={copy}>
        {status === "Email copied" ? <Check size={15} /> : <Copy size={15} />}
        Copy email address
      </button>
      <span role="status">{status}</span>
    </div>
  );
}
export function ContactForm() {
  const [topic, setTopic] = useState("A project idea");
  const [opened, setOpened] = useState(false);
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const subject = `${topic} — ${data.get("name")}`;
    const body = `Hi Pratham,\n\n${data.get("message")}\n\n${data.get("name")}\nReply to: ${data.get("email")}`;
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setOpened(true);
  }
  return (
    <form className="contact-form" onSubmit={submit}>
      <h2>What are you thinking?</h2>
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
            placeholder="Alex Morgan"
            autoComplete="name"
            required
            maxLength={100}
          />
        </label>
        <label>
          Email address
          <input
            name="email"
            type="email"
            placeholder="alex@example.com"
            autoComplete="email"
            required
            maxLength={254}
          />
        </label>
      </div>
      <label>
        A little about it
        <textarea
          name="message"
          placeholder="The idea, the challenge, or what you’d like to build…"
          required
          minLength={10}
          maxLength={5000}
          rows={4}
        />
      </label>
      <div className="form-bottom">
        <p>
          This opens a draft in your email app.
          <br />
          You’re in control of sending it.
        </p>
        <button className="button button-primary" type="submit">
          Prepare email <ArrowUpRight size={17} />
        </button>
      </div>
      {opened && (
        <p role="status" className="form-status">
          Your email app should open with a draft. If it doesn’t, write directly
          to <a href={`mailto:${email}`}>{email}</a>.
        </p>
      )}
    </form>
  );
}
