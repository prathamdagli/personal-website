"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, ArrowUp, Menu, X } from "lucide-react";
import { email, social } from "@/lib/portfolio";

const links = [
  ["Work", "/work"],
  ["About", "/about"],
  ["Contact", "/contact"],
];
export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menu = useRef<HTMLElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 40);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const main = document.getElementById("main");
    const footer = document.getElementById("site-footer");
    if (main) main.inert = true;
    if (footer) footer.inert = true;
    menu.current?.querySelector<HTMLAnchorElement>("a")?.focus();
    const keys = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggle.current?.focus();
      }
      if (event.key === "Tab") {
        const items = Array.from(
          menu.current?.querySelectorAll<HTMLAnchorElement>("a") || [],
        );
        const first = items[0];
        const last = items[items.length - 1];
        if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          toggle.current?.focus();
        } else if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          toggle.current?.focus();
        } else if (document.activeElement === toggle.current) {
          event.preventDefault();
          (event.shiftKey ? last : first)?.focus();
        }
      }
    };
    const desktop = window.matchMedia("(min-width: 701px)");
    const closeDesktop = () => {
      if (desktop.matches) setOpen(false);
    };
    desktop.addEventListener("change", closeDesktop);
    document.addEventListener("keydown", keys);
    return () => {
      document.body.style.overflow = previous;
      if (main) main.inert = false;
      if (footer) footer.inert = false;
      desktop.removeEventListener("change", closeDesktop);
      document.removeEventListener("keydown", keys);
    };
  }, [open]);
  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <header
        className={`site-header ${scrolled || pathname !== "/" ? "header-solid" : ""}`}
      >
        <Link href="/" className="site-name" onClick={() => setOpen(false)}>
          Pratham Dagli<span>ENGINEER & DEVELOPER</span>
        </Link>
        <nav className="desktop-nav" aria-label="Main navigation">
          {links.map(([label, href], i) => (
            <Link
              key={href}
              href={href}
              aria-current={pathname.startsWith(href) ? "page" : undefined}
            >
              <span className="nav-number">0{i + 1}</span>
              <span className="nav-label">{label}</span>
            </Link>
          ))}
        </nav>
        <a href="/Pratham-Dagli-Resume.pdf" className="header-resume" download>
          RESUME <ArrowUpRight size={14} />
        </a>
        <button
          ref={toggle}
          className="menu-toggle"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-navigation"
          onClick={() => setOpen(!open)}
        >
          {open ? <X /> : <Menu />}
        </button>
      </header>
      <nav
        ref={menu}
        id="mobile-navigation"
        className={`mobile-nav ${open ? "is-open" : ""}`}
        aria-label="Mobile navigation"
        hidden={!open}
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
    </>
  );
}
export function Footer() {
  return (
    <footer id="site-footer" className="site-footer">
      <div className="container footer-top">
        <Link href="/" className="footer-name">
          Pratham Dagli
        </Link>
        <div>
          <a href={social.github} target="_blank" rel="noreferrer">
            GITHUB <ArrowUpRight size={14} />
          </a>
          <a href={social.linkedin} target="_blank" rel="noreferrer">
            LINKEDIN <ArrowUpRight size={14} />
          </a>
          <a href="#top" aria-label="Back to top">
            <ArrowUp size={18} />
          </a>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>© {new Date().getFullYear()} PRATHAM DAGLI</span>
        <span>AHMEDABAD, INDIA</span>
      </div>
    </footer>
  );
}
export function ContactCta() {
  return (
    <section className="contact-cta">
      <div className="container">
        <div className="cta-top">
          <span className="eyebrow">HAVE AN IDEA OR AN OPPORTUNITY?</span>
          <span className="eyebrow">LET’S MAKE THE CONNECTION.</span>
        </div>
        <Link href="/contact" className="big-contact">
          <span>Let’s build something.</span>
          <ArrowUpRight aria-hidden="true" />
        </Link>
        <div className="contact-cta-bottom">
          <a href={`mailto:${email}`}>
            {email}
            <ArrowUpRight size={17} />
          </a>
          <p>
            Thoughtful projects.
            <br />
            Interesting problems. Good people.
          </p>
        </div>
      </div>
    </section>
  );
}
