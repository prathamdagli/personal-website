import assert from "node:assert/strict";
import fs from "node:fs/promises";
import ts from "typescript";

const origin = new URL(process.argv[2] || "http://localhost:3000");
const routes = [
  "/",
  "/work",
  "/about",
  "/contact",
  "/design-lab",
  "/work/complaint-tracker",
  "/work/creditscout",
  "/work/greenhydro",
  "/work/jobwemet",
  "/work/formula-one",
];
const pages = new Map();
const links = [];
let controlledRegions = 0;
for (const route of routes) {
  const response = await fetch(new URL(route, origin));
  assert.equal(response.status, 200, `${route} should load`);
  const html = await response.text();
  pages.set(route, html);
  if (["/work", "/about", "/contact"].includes(route)) {
    const heading = html.slice(html.indexOf("<main"), html.indexOf("</h1>") + 5);
    assert.doesNotMatch(
      heading,
      /style="[^"]*(?:opacity:\s*0(?:[;" ]|$)|translateY\(110%\))/,
      `${route} heading must be visible before hydration`,
    );
    const streamed = await fetch(new URL(route, origin), { headers: { RSC: "1" } });
    assert.equal(streamed.status, 200, `${route} navigation payload should load`);
    assert.ok(streamed.headers.get("content-type")?.includes("text/x-component"));
    assert.ok((await streamed.text()).includes('"h1"'), `${route} navigation payload should include a heading`);
  }
  assert.equal(
    [...html.matchAll(/<main\b/gi)].length,
    1,
    `${route} should have one main landmark`,
  );
  assert.equal([...html.matchAll(/<h1\b/gi)].length, 1, `${route} should have one h1`);
  const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map((match) => match[1]);
  assert.equal(
    new Set(ids).size,
    ids.length,
    `${route} contains duplicate IDs`,
  );
  for (const match of html.matchAll(/\baria-controls="([^"]+)"/g)) {
    for (const id of match[1].split(/\s+/)) {
      assert.ok(ids.includes(id), `${route} controls missing region ${id}`);
      controlledRegions++;
    }
  }
  for (const match of html.matchAll(/<a\b([^>]*)>/gi)) {
    const href = /\bhref="([^"]*)"/
      .exec(match[1])?.[1]
      ?.replaceAll("&amp;", "&");
    assert.ok(href && href !== "#", `Empty link on ${route}`);
    links.push({ route, url: new URL(href, new URL(route, origin)) });
  }
}

let anchorCount = 0;
for (const { route, url } of links) {
  if (url.origin !== origin.origin) continue;
  const html = pages.get(url.pathname);
  if (!html) {
    const response = await fetch(url);
    assert.equal(
      response.status,
      200,
      `${route} links to missing ${url.pathname}`,
    );
    if (url.pathname.endsWith(".pdf")) {
      const bytes = new Uint8Array(await response.arrayBuffer());
      assert.equal(
        new TextDecoder().decode(bytes.slice(0, 5)),
        "%PDF-",
        "Resume should be a PDF",
      );
    }
  } else if (url.hash) {
    const id = decodeURIComponent(url.hash.slice(1));
    assert.ok(
      html.includes(`id="${id}"`),
      `${route} links to missing anchor ${url.pathname}#${id}`,
    );
    anchorCount++;
  }
}

let buttons = 0;
async function checkSource(directory) {
  for (const entry of await fs.readdir(directory, { withFileTypes: true })) {
    const path = `${directory}/${entry.name}`;
    if (entry.isDirectory()) {
      await checkSource(path);
      continue;
    }
    if (!path.endsWith(".tsx")) continue;
    const file = ts.createSourceFile(
      path,
      await fs.readFile(path, "utf8"),
      ts.ScriptTarget.Latest,
      true,
      ts.ScriptKind.TSX,
    );
    function visit(node) {
      if (
        (ts.isJsxOpeningElement(node) || ts.isJsxSelfClosingElement(node)) &&
        node.tagName.getText(file) === "button"
      ) {
        buttons++;
        const attributes = node.attributes.properties;
        const handler = attributes.some(
          (a) => ts.isJsxAttribute(a) && a.name.getText(file) === "onClick",
        );
        const submit = attributes.some(
          (a) =>
            ts.isJsxAttribute(a) &&
            a.name.getText(file) === "type" &&
            a.initializer &&
            ts.isStringLiteral(a.initializer) &&
            a.initializer.text === "submit",
        );
        assert.ok(
          handler || submit,
          `Button without a handler or submit action: ${path}`,
        );
      }
      ts.forEachChild(node, visit);
    }
    visit(file);
  }
}
await checkSource("src");
assert.ok(
  pages.get("/contact").includes('href="#contact-form"'),
  "Write to me should target the contact form",
);
assert.ok(
  pages.get("/contact").includes('id="contact-form"'),
  "Contact form anchor must exist",
);
const external = [
  ...new Set(
    links
      .filter(
        (l) =>
          l.url.protocol === "https:" &&
          l.url.origin !== origin.origin &&
          !["mail.google.com", "outlook.live.com"].includes(l.url.hostname),
      )
      .map((l) => l.url.href),
  ),
];
const externalResults = await Promise.all(
  external.map(async (url) => {
    try {
      const response = await fetch(url, {
        signal: AbortSignal.timeout(15000),
        redirect: "follow",
      });
      return {
        url,
        status: response.status,
        result: response.ok
          ? "reachable"
          : [403, 429, 999].includes(response.status)
            ? "automated access blocked; manual check needed"
            : "needs review",
      };
    } catch (error) {
      return { url, result: `not verified: ${error.message}` };
    }
  }),
);
console.log(
  JSON.stringify(
    {
      routes: pages.size,
      links: links.length,
      sectionAnchors: anchorCount,
      controlledRegions,
      buttonDeclarationsWithActions: buttons,
      resume: "valid PDF",
      external: externalResults,
      limitation:
        "Source wiring and HTTP checks; live browser click tests were unavailable.",
    },
    null,
    2,
  ),
);
