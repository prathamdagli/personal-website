import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Pratham Dagli - AI/ML Engineer",
  description: "Personal Portfolio of Pratham Dagli, Computer Engineering student at PDEU focused on AI/ML.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-zinc-950 text-zinc-50 antialiased selection:bg-indigo-500/30`}>
        {children}
      </body>
    </html>
  );
}
