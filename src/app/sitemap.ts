import type { MetadataRoute } from "next";
import { projects } from "@/lib/portfolio";
import { siteConfig } from "@/lib/site-config";
export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url.replace(/\/$/, "");
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
