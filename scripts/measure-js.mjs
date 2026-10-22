import fs from "node:fs/promises";
import path from "node:path";
import { gzipSync } from "node:zlib";

const files = await fs.readdir(".next/static", { recursive: true });
const chunks = await Promise.all(files.filter(file => file.endsWith(".js")).map(async file => {
  const bytes = await fs.readFile(path.join(".next/static", file));
  return { file, rawBytes: bytes.length, gzipBytes: gzipSync(bytes).length };
}));
const before = JSON.parse(await fs.readFile("docs/phase-baseline.json", "utf8"));
const after = chunks.reduce((total, chunk) => ({ files: total.files + 1, rawBytes: total.rawBytes + chunk.rawBytes, gzipBytes: total.gzipBytes + chunk.gzipBytes }), { files: 0, rawBytes: 0, gzipBytes: 0 });
const report = {
  measurement: "All production .next/static JavaScript chunks, not a per-page transfer size",
  before, after,
  delta: { rawBytes: after.rawBytes - before.rawBytes, gzipBytes: after.gzipBytes - before.gzipBytes },
  chunks: chunks.sort((a, b) => b.gzipBytes - a.gzipBytes),
  notes: [
    "Includes lazy 3D, GSAP, and the Next.js security update; these totals are not initial page transfer sizes.",
    "The neural field is a separate dynamic import delayed until its desktop hero is visible; mobile, low-power, save-data and reduced-motion visitors use a static fallback.",
    "GSAP and Lenis are desktop fine-pointer dynamic imports, disabled for reduced motion.",
    "No Lighthouse or browser performance trace has been measured."
  ]
};
await fs.writeFile("docs/phase-js-report.json", JSON.stringify(report, null, 2) + "\n");
console.log(JSON.stringify({ before: before.gzipBytes, after: after.gzipBytes, delta: report.delta.gzipBytes, unit: "gzip bytes across all emitted chunks" }, null, 2));
