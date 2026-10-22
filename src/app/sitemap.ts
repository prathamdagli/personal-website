import type { MetadataRoute } from "next";
import { projects } from "@/lib/portfolio";
export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://personal-website-puce-two-38.vercel.app";
  return [
    "",
    "/work",
    "/about",
    "/contact",
    ...projects.map((p) => `/work/${p.slug}`),
  ].map((path) => ({
    url: base + path,
    changeFrequency: "monthly",
    priority: path === "" ? 1 : 0.8,
  }));
}
