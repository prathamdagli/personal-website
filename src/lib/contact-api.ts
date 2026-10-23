type ContactDependencies = {
  env: Record<string, string | undefined>;
  fetcher?: typeof fetch;
  now?: () => number;
};
export function createContactHandler({
  env,
  fetcher = fetch,
  now = Date.now,
}: ContactDependencies) {
  // Best-effort instance-local throttle; honeypot and input limits also apply on every request.
  const attempts = new Map<string, { count: number; expires: number }>();
  return async function handleContact(request: Request): Promise<Response> {
    const origin = request.headers.get("origin");
    const allowed = new Set([
      new URL(request.url).origin,
      env.NEXT_PUBLIC_SITE_URL ||
        "https://personal-website-puce-two-38.vercel.app",
    ]);
    if (origin && !allowed.has(origin))
      return Response.json(
        { error: "This request could not be verified." },
        { status: 403 },
      );
    if (!request.headers.get("content-type")?.includes("application/json"))
      return Response.json(
        { error: "Please submit the contact form." },
        { status: 415 },
      );
    if (Number(request.headers.get("content-length")) > 24000)
      return Response.json({ error: "Message is too long." }, { status: 413 });
    let body: unknown;
    try {
      const reader = request.body?.getReader();
      if (!reader) throw new Error("Missing body");
      let bytes = 0;
      const decoder = new TextDecoder();
      let text = "";
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        bytes += value.byteLength;
        if (bytes > 24000) {
          await reader.cancel();
          return Response.json(
            { error: "Message is too long." },
            { status: 413 },
          );
        }
        text += decoder.decode(value, { stream: true });
      }
      body = JSON.parse(text + decoder.decode());
    } catch {
      return Response.json(
        { error: "Please check your message and try again." },
        { status: 400 },
      );
    }
    if (!body || typeof body !== "object" || Array.isArray(body))
      return Response.json({ error: "Invalid form." }, { status: 400 });
    const data = body as Record<string, unknown>;
    if (typeof data.company === "string" && data.company.trim())
      return Response.json({ ok: true });
    const name = typeof data.name === "string" ? data.name.trim() : "";
    const email = typeof data.email === "string" ? data.email.trim() : "";
    const message = typeof data.message === "string" ? data.message.trim() : "";
    const topic =
      typeof data.topic === "string" &&
      ["A project idea", "An opportunity", "Just saying hi"].includes(
        data.topic,
      )
        ? data.topic
        : "Portfolio inquiry";
    if (
      !name ||
      name.length > 100 ||
      /[\r\n]/.test(name) ||
      email.length > 254 ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
      message.length < 10 ||
      message.length > 5000
    )
      return Response.json(
        {
          error:
            "Please enter your name, a valid email, and a message of 10–5000 characters.",
        },
        { status: 400 },
      );
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      "unknown";
    const timestamp = now();
    if (attempts.size >= 1000)
      for (const [key, value] of attempts) {
        if (value.expires <= timestamp) attempts.delete(key);
      }
    const previous = attempts.get(ip);
    const attempt =
      previous && previous.expires > timestamp
        ? previous
        : { count: 0, expires: timestamp + 600000 };
    if (attempt.count >= 3)
      return Response.json(
        { error: "Please wait a few minutes before sending another message." },
        { status: 429, headers: { "Retry-After": "600" } },
      );
    if (!env.RESEND_API_KEY || !env.CONTACT_FROM)
      return Response.json(
        {
          error:
            "Direct sending is not configured yet. You can still prepare an email draft below.",
          code: "NOT_CONFIGURED",
        },
        { status: 503 },
      );
    if (attempts.size >= 1000 && !attempts.has(ip))
      return Response.json(
        { error: "Please try again in a few minutes." },
        { status: 429 },
      );
    attempt.count++;
    attempts.set(ip, attempt);
    try {
      const response = await fetcher("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${env.RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: env.CONTACT_FROM,
          to: [env.CONTACT_TO || "prathamdagli11@gmail.com"],
          reply_to: email,
          subject: `${topic} — ${name}`,
          text: `${message}\n\nFrom: ${name}\nReply to: ${email}`,
        }),
        signal: AbortSignal.timeout(10000),
      });
      const accepted = response.ok ? await response.json().catch(() => null) : null;
      if (!response.ok || typeof accepted?.id !== "string" || !accepted.id)
        return Response.json(
          {
            error:
              "Your message could not be sent. Please try again or use an email draft.",
          },
          { status: 502 },
        );
      return Response.json({ ok: true });
    } catch {
      return Response.json(
        {
          error:
            "The email service is taking too long. Please try again or use an email draft.",
        },
        { status: 502 },
      );
    }
  };
}
