import test from "node:test";
import assert from "node:assert/strict";
import { createContactHandler } from "../src/lib/contact-api.ts";
const env = {
  RESEND_API_KEY: "test-key-not-a-real-secret",
  CONTACT_FROM: "Portfolio <hello@example.com>",
  CONTACT_TO: "owner@example.com",
};
const data = {
  name: "Alex",
  email: "alex@example.com",
  topic: "A project idea",
  message: "A detailed project inquiry.",
  company: "",
};
const request = (body = data, headers = {}) =>
  new Request("http://localhost:3000/api/contact", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      origin: "http://localhost:3000",
      ...headers,
    },
    body: JSON.stringify(body),
  });

test("valid messages use a fixed recipient, verified sender, and reply-to", async () => {
  let sent;
  const handle = createContactHandler({
    env,
    fetcher: async (url, options) => {
      assert.equal(url, "https://api.resend.com/emails");
      sent = JSON.parse(options.body);
      return Response.json({ id: "test-message" });
    },
  });
  assert.equal(
    (await handle(request({ ...data, to: "attacker@example.com" }))).status,
    200,
  );
  assert.deepEqual(sent.to, ["owner@example.com"]);
  assert.equal(sent.reply_to, data.email);
  assert.equal(sent.from, env.CONTACT_FROM);
});
test("honeypot submissions do not send email", async () => {
  const handle = createContactHandler({
    env,
    fetcher: async () => {
      assert.fail("Must not send");
    },
  });
  assert.equal((await handle(request({ company: "spam" }))).status, 200);
});
test("invalid and cross-origin requests are rejected", async () => {
  const handle = createContactHandler({
    env,
    fetcher: async () => {
      assert.fail("Must not send");
    },
  });
  for (const body of [
    { ...data, name: "  " },
    { ...data, email: "bad" },
    { ...data, message: "short" },
    { ...data, name: "Header\nInjection" },
  ])
    assert.equal((await handle(request(body))).status, 400);
  assert.equal(
    (await handle(request(data, { origin: "https://unrelated.example" })))
      .status,
    403,
  );
  assert.equal(
    (await handle(request(data, { "content-length": "25000" }))).status,
    413,
  );
});
test("missing Resend setup and upstream failures never claim success", async () => {
  const missing = await createContactHandler({ env: {} })(request());
  assert.equal(missing.status, 503);
  assert.equal((await missing.json()).code, "NOT_CONFIGURED");
  const failed = await createContactHandler({
    env,
    fetcher: async () =>
      Response.json({ error: "private upstream detail" }, { status: 500 }),
  })(request());
  assert.equal(failed.status, 502);
  assert.ok(!(await failed.text()).includes("private upstream detail"));
});
test("instance-local throttle limits repeated valid submissions", async () => {
  const handle = createContactHandler({
    env,
    fetcher: async () => Response.json({ id: "test" }),
    now: () => 1000,
  });
  for (let i = 0; i < 3; i++)
    assert.equal((await handle(request())).status, 200);
  assert.equal((await handle(request())).status, 429);
});
