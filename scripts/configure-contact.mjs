import fs from "node:fs/promises";

if (process.stdin.isTTY) process.stdin.setRawMode(true);
console.log("Ready for private Resend key on stdin; input is not echoed.");
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
if (process.stdin.isTTY) process.stdin.setRawMode(false);
const response = await fetch("https://api.resend.com/domains", {
  headers: { Authorization: `Bearer ${key}` },
  signal: AbortSignal.timeout(10000),
});
const result = await response.json();
const verified = Array.isArray(result.data) ? result.data.filter(domain => domain.status === "verified") : [];
const domain = verified[0]?.name;
let previous = await fs.readFile(".env.local", "utf8").catch(() => "");
const values = {
  RESEND_API_KEY: key,
  CONTACT_FROM: `Pratham Dagli <${domain ? `hello@${domain}` : "onboarding@resend.dev"}>`,
  CONTACT_TO: "prathamdagli11@gmail.com",
};
for (const [name, value] of Object.entries(values)) {
  const line = `${name}=${JSON.stringify(value)}`;
  const expression = new RegExp(`^${name}=.*$`, "m");
  previous = expression.test(previous) ? previous.replace(expression, () => line) : `${previous.trimEnd()}\n${line}\n`;
}
await fs.writeFile(".env.local", previous.trimStart());
console.log(JSON.stringify({ configured: true, domainReadStatus: response.status, verifiedDomains: verified.map(item => item.name), senderMode: domain ? "verified domain" : "Resend test domain — only the account owner's email can receive messages" }));
