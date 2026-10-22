"use client";
import { FaGithub, FaLinkedin } from "react-icons/fa";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowUpRight, ArrowUp, Menu, X } from "lucide-react";
import { email, social } from "@/lib/portfolio";
const links = [
  ["Home", "/"],
  ["Work", "/work"],
  ["About", "/about"],
  ["Contact", "/contact"],
];
export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);
  useEffect(() => {
    if (!open) return;
    const close = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [open]);
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <header className="site-header">
        <Link
          href="/"
          className="site-name"
          aria-label="Pratham Dagli home"
          onClick={() => setOpen(false)}
        >
          Pratham Dagli
        </Link>
        <nav className="desktop-nav" aria-label="Main navigation">
          {links.map(([label, href]) => (
            <Link
              key={href}
              href={href}
              aria-current={
                pathname === href ||
                (href === "/work" && pathname.startsWith("/work/"))
                  ? "page"
                  : undefined
              }
            >
              {label}
            </Link>
          ))}
        </nav>
        <Link className="nav-cta" href="/contact">
          Let’s talk <ArrowUpRight size={15} />
        </Link>
        <button
          className="menu-toggle icon-button"
          aria-expanded={open}
          aria-controls="mobile-navigation"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen(!open)}
        >
          {open ? <X /> : <Menu />}
        </button>
      </header>
      {open && (
        <nav
          id="mobile-navigation"
          className="mobile-nav"
          aria-label="Mobile navigation"
        >
          {links.map(([label, href], i) => (
            <Link href={href} key={href} onClick={() => setOpen(false)}>
              <span>0{i + 1}</span>
              {label}
              <ArrowUpRight />
            </Link>
          ))}
          <a className="mobile-email" href={`mailto:${email}`}>
            {email}
          </a>
        </nav>
      )}
    </>
  );
}
export function Footer() {
  return (
    <footer className="site-footer container">
      <div>
        <Link href="/" className="site-name" aria-label="Pratham Dagli home">
          Pratham Dagli
        </Link>
        <span>Curiosity in. Possibility out.</span>
      </div>
      <p>© {new Date().getFullYear()} Pratham Dagli</p>
      <div className="footer-socials">
        <a
          href={social.github}
          target="_blank"
          rel="noreferrer"
          aria-label="GitHub (opens in a new tab)"
        >
          <FaGithub size={18} />
        </a>
        <a
          href={social.linkedin}
          target="_blank"
          rel="noreferrer"
          aria-label="LinkedIn (opens in a new tab)"
        >
          <FaLinkedin size={18} />
        </a>
        <a href="#top" aria-label="Back to top">
          <ArrowUp size={18} />
        </a>
      </div>
    </footer>
  );
}
export function ContactCta() {
  return (
    <section className="contact-cta container">
      <div className="eyebrow">
        <span className="status-dot" /> GOOD WORK STARTS WITH A CONVERSATION
      </div>
      <Link href="/contact" className="big-contact">
        Have something
        <br />
        in mind? <span>Let’s build.</span>
        <ArrowUpRight aria-hidden="true" />
      </Link>
      <div className="contact-cta-bottom">
        <p>
          Ideas, opportunities, or a simple hello.
          <br />
          I’d love to hear from you.
        </p>
        <a href={`mailto:${email}`}>
          {email}
          <ArrowUpRight size={16} />
        </a>
      </div>
    </section>
  );
}
