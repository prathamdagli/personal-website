"use client";

import { siteConfig } from "@/lib/site-config";
import Link from "next/link";

export default function PageError({ retry }: { retry: () => void }) {
  return (
    <main id="main" className="container route-fallback">
      <h1>This page couldn’t load.</h1>
      <p>Please try again. You can also return home or reach me directly.</p>
      <div className="contact-secondary-actions">
        <button className="button button-primary" type="button" onClick={retry}>Try again</button>
        <Link className="button button-outline" href="/">Back to home</Link>
        <a className="text-link" href={siteConfig.whatsapp.url} target="_blank" rel="noreferrer">Chat on WhatsApp</a>
      </div>
    </main>
  );
}
