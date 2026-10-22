"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

export function SiteEffects() {
  const pathname = usePathname();
  const cursor = useRef<HTMLDivElement>(null);
  useEffect(() => {
    cursor.current?.classList.remove("cursor-visible");
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const elements = Array.from(
      document.querySelectorAll<HTMLElement>("[data-reveal]"),
    );
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.remove("reveal-pending");
          observer.unobserve(entry.target);
        }),
      { threshold: 0.12 },
    );
    elements.forEach((element) => {
      if (element.getBoundingClientRect().top > window.innerHeight)
        element.classList.add("reveal-pending");
      observer.observe(element);
    });
    return () => {
      observer.disconnect();
      elements.forEach((e) => e.classList.remove("reveal-pending"));
    };
  }, [pathname]);
  useEffect(() => {
    if (
      !window.matchMedia(
        "(pointer: fine) and (prefers-reduced-motion: no-preference)",
      ).matches
    )
      return;
    const element = cursor.current;
    if (!element) return;
    const move = (event: PointerEvent) => {
      element.style.transform = `translate3d(${event.clientX - 41}px, ${event.clientY - 41}px, 0)`;
      const target =
        event.target instanceof Element
          ? event.target.closest("[data-cursor]")
          : null;
      element.classList.toggle("cursor-visible", !!target);
      element.textContent = target?.getAttribute("data-cursor") || "VIEW";
    };
    const hide = () => element.classList.remove("cursor-visible");
    window.addEventListener("pointermove", move);
    window.addEventListener("blur", hide);
    window.addEventListener("scroll", hide, { passive: true });
    document.addEventListener("pointerleave", hide);
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("blur", hide);
      window.removeEventListener("scroll", hide);
      document.removeEventListener("pointerleave", hide);
    };
  }, []);
  return (
    <div ref={cursor} className="project-cursor" aria-hidden="true">
      VIEW
    </div>
  );
}
