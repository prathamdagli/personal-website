import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import { Header, Footer } from "@/components/site-shell";
import "./globals.css";
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});
const space = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
  display: "swap",
});
export const metadata: Metadata = {
  metadataBase: new URL("https://personal-website-puce-two-38.vercel.app"),
  title: {
    default: "Pratham Dagli — AI / ML Engineer & Builder",
    template: "%s — Pratham Dagli",
  },
  description:
    "Pratham Dagli is an AI/ML engineer and full-stack developer studying Computer Engineering at PDEU. Explore projects that turn data, code, and curiosity into useful experiences.",
  openGraph: {
    title: "Pratham Dagli — AI / ML Engineer & Builder",
    description:
      "Turning ideas into intelligent experiences. Explore my work in applied AI, full-stack development, and data science.",
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
        <Footer />
      </body>
    </html>
  );
}
