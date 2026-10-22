import type { CSSProperties } from "react";
import { motionTokens } from "@/lib/motion";
import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import { Header, Footer } from "@/components/site-shell";
import { SiteEffects } from "@/components/site-effects";
import { PrecisionCursor } from "@/components/precision-cursor";
import { siteConfig } from "@/lib/site-config";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
import "./experience.css";
import "./phase.css";
import "./hero.css";
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});
const space = Manrope({
  subsets: ["latin"],
  variable: "--font-space",
  display: "swap",
});
export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "Pratham Dagli — AI Engineering",
    template: "%s — Pratham Dagli",
  },
  description:
    "Pratham Dagli focuses on AI engineering, applied machine learning, and cloud infrastructure while studying Computer Engineering at PDEU. Explore projects and professional experience.",
  openGraph: {
    title: "Pratham Dagli — AI Engineering",
    description:
      "Pratham Dagli. AI engineering, applied machine learning, and cloud infrastructure. Explore projects, professional experience, and the person behind them.",
    type: "website",
    locale: "en_IN",
    siteName: "Pratham Dagli",
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-scroll-behavior="smooth" suppressHydrationWarning style={{
      "--motion-fast": `${motionTokens.duration.fast}s`,
      "--motion-base": `${motionTokens.duration.base}s`,
      "--motion-story": `${motionTokens.duration.story}s`,
      "--ease-enter": `cubic-bezier(${motionTokens.ease.enter.join(",")})`,
      "--ease-standard": `cubic-bezier(${motionTokens.ease.standard.join(",")})`,
    } as CSSProperties}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('portfolio-theme');if(t==='dark'||t==='light')document.documentElement.dataset.theme=t}catch(e){}})()`,
          }}
        />
      </head>
      <body id="top" className={`${inter.variable} ${space.variable}`}>
        <Header />
        {children}
        <SiteEffects />
        <PrecisionCursor />
        <Footer />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: siteConfig.name,
              url: siteConfig.url,
              jobTitle: siteConfig.title,
              email: "mailto:prathamdagli11@gmail.com",
              sameAs: [
                "https://github.com/prathamdagli",
                "https://linkedin.com/in/pratham-dagli",
              ],
              alumniOf: {
                "@type": "CollegeOrUniversity",
                name: "Pandit Deendayal Energy University",
              },
              homeLocation: { "@type": "Place", name: siteConfig.location },
            }).replace(/</g, "\\u003c"),
          }}
        />
        {process.env.VERCEL && (
          <>
            <Analytics />
            <SpeedInsights />
          </>
        )}
      </body>
    </html>
  );
}
