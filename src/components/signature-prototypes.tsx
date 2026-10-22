"use client";
import dynamic from "next/dynamic";
import Image from "next/image";
import { Component, useEffect, useRef, useState, type ReactNode } from "react";
import { useInView, useReducedMotion } from "framer-motion";
const Scene = dynamic(() => import("./signature-scene"), {
  ssr: false,
  loading: () => (
    <span className="prototype-loading">Loading interactive scene…</span>
  ),
});
class SceneBoundary extends Component<
  { children: ReactNode },
  { failed: boolean }
> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? (
      <p className="prototype-loading">
        3D isn’t available in this browser. The static preview remains below.
      </p>
    ) : (
      this.props.children
    );
  }
}
function Prototype({ variant }: { variant: "network" | "sculpture" }) {
  const ref = useRef<HTMLElement>(null);
  const visible = useInView(ref, { margin: "0px", amount: 0.1 });
  const reduced = useReducedMotion();
  const [loaded, setLoaded] = useState(false);
  const [supported, setSupported] = useState(false);
  useEffect(() => {
    const media = window.matchMedia("(min-width: 769px) and (pointer: fine)");
    const check = () =>
      setSupported(
        media.matches &&
          navigator.hardwareConcurrency > 4 &&
          !(navigator as Navigator & { connection?: { saveData?: boolean } })
            .connection?.saveData,
      );
    check();
    media.addEventListener("change", check);
    return () => media.removeEventListener("change", check);
  }, []);
  return (
    <article ref={ref} className="signature-prototype">
      <span className="eyebrow">
        Option {variant === "network" ? "A" : "B"}
      </span>
      <h2>{variant === "network" ? "Neural field." : "Graphite study."}</h2>
      <p>
        {variant === "network"
          ? "A precise network of points and connections. Reacts to the pointer and rests when you do."
          : "A low-poly sculpture with restrained blue edges. This is a procedural proxy; a Blender-authored model is pending that connection."}
      </p>
      <div
        className="prototype-stage"
        aria-label={
          variant === "network"
            ? "Neural field prototype"
            : "Low-poly graphite sculpture prototype"
        }
      >
        {loaded && supported && !reduced && visible ? (
          <SceneBoundary>
            <Scene variant={variant} />
          </SceneBoundary>
        ) : (
          <Image
            src={
              variant === "network"
                ? "/prototypes/network.svg"
                : "/projects/greenhydro/cover.webp"
            }
            alt={
              variant === "network"
                ? "Static preview of a sparse connected neural field"
                : "Graphite material and lighting reference for the sculpture prototype"
            }
            fill
            sizes="(max-width:768px) 90vw,45vw"
          />
        )}
      </div>
      <button
        type="button"
        className="button button-outline"
        onClick={() => setLoaded(!loaded)}
        disabled={!supported || !!reduced}
      >
        {!supported || reduced
          ? "Static preview on this device"
          : loaded
            ? "Unload interactive prototype"
            : "Load interactive prototype"}
      </button>
    </article>
  );
}
export function SignaturePrototypes() {
  return (
    <div className="signature-comparison">
      <Prototype variant="network" />
      <Prototype variant="sculpture" />
    </div>
  );
}

// The chosen signature is intentionally separate from the initial page bundle.
export function HeroSignature() {
  const ref = useRef<HTMLDivElement>(null);
  const visible = useInView(ref);
  const reduced = useReducedMotion();
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const eligible = window.matchMedia("(min-width: 1000px) and (pointer: fine) and (prefers-reduced-motion: no-preference)");
    const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    let timer: number | undefined;
    const update = () => {
      window.clearTimeout(timer);
      if (!visible || !eligible.matches || navigator.hardwareConcurrency <= 4 || connection?.saveData) {
        setReady(false);
        return;
      }
      timer = window.setTimeout(() => setReady(true), 1200);
    };
    update();
    eligible.addEventListener("change", update);
    return () => {
      window.clearTimeout(timer);
      eligible.removeEventListener("change", update);
    };
  }, [visible, reduced]);
  return (
    <div className="hero-signature" ref={ref} aria-hidden="true">
      {ready && visible && !reduced ? <SceneBoundary><Scene variant="network" ambient /></SceneBoundary> : (
        <Image src="/prototypes/network.svg" alt="" fill sizes="(max-width:700px) 90vw, 620px" />
      )}
    </div>
  );
}
