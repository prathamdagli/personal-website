"use client";
import { useEffect } from "react";
import { motionTokens } from "@/lib/motion";

export function HomeMotion() {
  useEffect(() => {
    let disposed = false;
    let cleanup: (() => void) | undefined;
    let generation = 0;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const desktop = window.matchMedia(
      "(min-width: 1000px) and (pointer: fine)",
    );
    const scheme = window.matchMedia("(prefers-color-scheme: light)");
    async function start() {
      const currentGeneration = ++generation;
      cleanup?.();
      cleanup = undefined;
      if (preference.matches || !desktop.matches || disposed) return;
      const [{ gsap }, { ScrollTrigger }, { default: Lenis }] =
        await Promise.all([
          import("gsap"),
          import("gsap/ScrollTrigger"),
          import("lenis"),
        ]);
      if (
        disposed ||
        preference.matches ||
        !desktop.matches ||
        currentGeneration !== generation
      )
        return;
      gsap.registerPlugin(ScrollTrigger);
      const root = document.getElementById("main");
      if (!root) return;
      const media = gsap.matchMedia();
      media.add(
        "(min-width: 1000px) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
        () => {
          const lenis = new Lenis({
            duration: motionTokens.duration.story,
            anchors: true,
            autoRaf: false,
          });
          const tick = (time: number) => lenis.raf(time * 1000);
          lenis.on("scroll", ScrollTrigger.update);
          gsap.ticker.add(tick);
          document.documentElement.classList.add("has-lenis");
          root
            .querySelectorAll<HTMLElement>("[data-split-title]")
            .forEach((heading) => {
              gsap.fromTo(
                heading.querySelectorAll(".title-word"),
                { yPercent: 105, opacity: 0 },
                {
                  yPercent: 0,
                  opacity: 1,
                  duration: motionTokens.duration.base,
                  stagger: 0.025,
                  ease: "power2.out",
                  scrollTrigger: {
                    trigger: heading,
                    start: "top 90%",
                    once: true,
                  },
                },
              );
            });
          const intro = root.querySelector<HTMLElement>("#introduction");
          if (intro) {
            const lines = intro.querySelectorAll(".story-line");
            const muted = getComputedStyle(document.documentElement)
              .getPropertyValue("--muted")
              .trim();
            const ink = getComputedStyle(document.documentElement)
              .getPropertyValue("--ink")
              .trim();
            gsap.set(lines, { color: muted });
            const story = gsap.timeline({
              scrollTrigger: {
                trigger: intro,
                start: "top 100px",
                end: "+=450",
                pin: intro.offsetHeight + 120 <= window.innerHeight,
                scrub: true,
                invalidateOnRefresh: true,
              },
            });
            lines.forEach((line) =>
              story.to(line, { color: ink, duration: 1, ease: "none" }),
            );
          }
          const section = root.querySelector<HTMLElement>("#selected-work");
          const strip =
            section?.querySelector<HTMLElement>(".home-project-list");
          const viewport = section?.querySelector<HTMLElement>(
            ".horizontal-viewport",
          );
          if (section && strip && viewport) {
            section.dataset.horizontalReady = "true";
            const distance = () =>
              Math.max(0, strip.scrollWidth - viewport.clientWidth);
            gsap.to(strip, {
              x: () => -distance(),
              ease: "none",
              scrollTrigger: {
                trigger: section,
                start: "top 100px",
                end: () => `+=${Math.max(500, distance())}`,
                pin: true,
                scrub: true,
                invalidateOnRefresh: true,
              },
            });
            strip.addEventListener("focusin", handleStripFocus);
          }
          function handleStripFocus(event: FocusEvent) {
            const target = event.target;
            if (!(target instanceof HTMLElement) || !strip || !viewport) return;
            const card = target.closest<HTMLElement>(".project-entry");
            const trigger = ScrollTrigger.getAll().find(
              (item) => item.trigger === section,
            );
            if (!card || !trigger) return;
            const max = Math.max(1, strip.scrollWidth - viewport.clientWidth);
            const progress = Math.min(1, Math.max(0, card.offsetLeft / max));
            lenis.scrollTo(
              trigger.start + progress * (trigger.end - trigger.start),
              { immediate: true },
            );
          }
          ScrollTrigger.refresh();
          return () => {
            gsap.ticker.remove(tick);
            lenis.destroy();
            strip?.removeEventListener("focusin", handleStripFocus);
            if (section) delete section.dataset.horizontalReady;
            document.documentElement.classList.remove("has-lenis");
          };
        },
        root,
      );
      cleanup = () => media.revert();
    }
    void start();
    const changed = () => {
      void start();
    };
    preference.addEventListener("change", changed);
    desktop.addEventListener("change", changed);
    scheme.addEventListener("change", changed);
    window.addEventListener("portfolio-theme", changed);
    return () => {
      disposed = true;
      preference.removeEventListener("change", changed);
      desktop.removeEventListener("change", changed);
      scheme.removeEventListener("change", changed);
      window.removeEventListener("portfolio-theme", changed);
      cleanup?.();
    };
  }, []);
  return null;
}
