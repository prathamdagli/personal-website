import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import { Header, Footer } from "@/components/site-shell";
import { SiteEffects } from "@/components/site-effects";
import "./globals.css";
import "./experience.css";
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
  metadataBase: new URL("https://personal-website-puce-two-38.vercel.app"),
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
    <html lang="en" data-scroll-behavior="smooth">
      <body id="top" className={`${inter.variable} ${space.variable}`}>
        <Header />
        {children}
        <SiteEffects />
        <Footer />
      </body>
    </html>
  );
}
