"use client";
import { useEffect, useRef } from "react";
export function PrecisionCursor() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const media = window.matchMedia(
      "(pointer: fine) and (prefers-reduced-motion: no-preference)",
    );
    const move = (event: PointerEvent) => {
      if (!ref.current) return;
      ref.current.hidden = !media.matches;
      ref.current.style.transform = `translate3d(${event.clientX - 12}px,${event.clientY - 12}px,0)`;
    };
    const hide = () => {
      if (ref.current) ref.current.hidden = true;
    };
    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("blur", hide);
    document.addEventListener("pointerleave", hide);
    media.addEventListener("change", hide);
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("blur", hide);
      document.removeEventListener("pointerleave", hide);
      media.removeEventListener("change", hide);
    };
  }, []);
  return (
    <div ref={ref} className="precision-cursor" hidden aria-hidden="true" />
  );
}
