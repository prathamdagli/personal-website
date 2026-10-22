import { spawn } from "node:child_process";
import fs from "node:fs/promises";

const cli = process.argv[2];
if (!cli) throw new Error("Pass the installed ctx7 CLI JavaScript path.");
console.log("Ready for Context7 key on stdin (hidden).");
if (process.stdin.isTTY) process.stdin.setRawMode(true);
const key = await new Promise(resolve => {
  let buffer = "";
  const read = chunk => {
    buffer += chunk.toString();
    if (/[\r\n]/.test(buffer)) {
      process.stdin.off("data", read);
      process.stdin.pause();
      resolve(buffer.trim());
    }
  };
  process.stdin.on("data", read);
});
await fs.mkdir("docs/research", { recursive: true });
const queries = [
  ["gsap", "/greensock/gsap", "React gsap.context cleanup ScrollTrigger matchMedia pin horizontal scrolling reduced motion"],
  ["motion", "/motiondivision/motion", "React AnimatePresence useReducedMotion page transitions reduced motion"],
  ["lenis", "/darkroomengineering/lenis", "React Lenis GSAP ScrollTrigger ticker sync destroy reduced motion"],
  ["fiber", "/pmndrs/react-three-fiber", "Canvas frameloop demand useFrame performance pause offscreen reduced motion"],
  ["drei", "/pmndrs/drei", "PerformanceMonitor adaptive DPR React Three Fiber useGLTF preload"],
];
for (const [name, library, query] of queries) {
  const child = spawn(process.execPath, [cli, "docs", library, query], {
    env: { ...process.env, CONTEXT7_API_KEY: key, CTX7_TELEMETRY_DISABLED: "1" },
    stdio: ["ignore", "pipe", "pipe"],
  });
  let output = "";
  child.stdout.on("data", chunk => { output += chunk; });
  child.stderr.on("data", chunk => { output += chunk; });
  const code = await new Promise(resolve => child.on("close", resolve));
  output = output.replaceAll(key, "[redacted]");
  await fs.writeFile(`docs/research/context7-${name}.md`, `# Context7: ${library}\n\nQuery: ${query}\n\n${output}`);
  console.log(`${name}: ${code === 0 ? "documentation saved" : "request failed"}`);
}
if (process.stdin.isTTY) process.stdin.setRawMode(false);
