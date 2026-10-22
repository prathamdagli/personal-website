# Editorial engineer phase — 23 October 2026

## Changes

The existing App Router structure, portrait, campus photograph, editorial numbering, name, copy voice, skip link and social metadata were retained. About and Experience remain separate header destinations; Projects contains the project collection. The title remains AI Engineering.

This phase adds system/light/dark themes, compact matched covers, explicit evidence fields, standardized case studies with previous/next navigation, grouped skills, Currently, achievements, editable availability, two hero actions, and a server-side Resend contact integration. Existing project walkthroughs remain interactive.

After screenshot feedback, the hero was divided into separate artwork and action rows. Repeated degree/role copy and the redundant circular CTA were removed. The name scales against both viewport width and height, and the portrait's parallax is clipped inside the artwork region so it cannot overlap the actions.

## Motion decisions

| Effect | Purpose and bounds |
| --- | --- |
| Neural field | Selected after the user delegated the choice. Quiet technical signature behind the portrait; separate lazy chunk, demand rendering and offscreen unmounting. Static on small/low-power/save-data/reduced-motion devices. |
| Split titles | Brief 300ms desktop reading cues. |
| Introduction | Compact two-column statement and details; scroll highlights without pinning or artificial scroll space. |
| Horizontal selected work | Three compact desktop entries; normal vertical layout on mobile/reduced motion. Keyboard focus advances the strip. |
| Number tickers | Single 600ms reveal of existing 9.57 and 2028 facts. |
| Marquee | Text logo slots, paused offscreen, on hover/focus, by a pause control and for reduced motion. |
| Pipeline beam | Brief hover-only traversal of Data → Model → API → Interface. |
| Card tilt / résumé shimmer | Small pointer response and hover-only CTA emphasis. |
| Page changes | Server-rendered Next template with a brief CSS entrance. No exit gate or hidden route wrapper; reduced motion removes animation. |

`src/lib/motion.ts` owns durations/easings, also injected as CSS variables. Existing interaction durations were aligned with these tokens. The decorative cursor retains the native cursor.

Context7 docs for GSAP, Motion, Lenis, React Three Fiber and drei were retrieved through its official CLI before new animation code. The key was passed privately to the process, not stored in source/research. This does not install a persistent authenticated MCP connection. The official Magic UI MCP supplied marquee, number ticker, beam and shimmer source references; custom adaptations use the site's tokens. References are in `docs/research`.

Shadcn/Aceternity/React Bits, Blender and Replicate/fal were not exposed as tools. No Figma link was supplied. New interface icons use Lucide consistently. The available built-in image generator produced the approved covers: abstract precision-machined graphite, icy-blue lighting, technical linework, grain and negative space, without text/logos/molecules/fake dashboards. Five compact 960px WebPs total approximately 167KB; these are artwork, not product screenshots. Original photos remain alongside optimized WebP copies.

Architecture uses existing project flows, themed HTML diagrams and downloadable Mermaid source. An optional `architectureImage` field accepts a later export. `/design-lab` retains both prototypes. The unchosen sculpture is explicitly a procedural proxy, not a Blender/Draco GLB export.

## Every content/configuration placeholder

| Location | Supply or confirm |
| --- | --- |
| `src/data/projects.ts`: ComplaintTracker AI | Impact/scope, role, timeline, team, verified results, learnings, next steps. |
| Same file: CreditScout | Impact/scope, role, timeline, team, verified results, learnings, next steps. |
| Same file: GreenHydro | Impact/scope, role, timeline, team, verified results, learnings, next steps. |
| Same file: JobWeMet | Impact/scope, role, timeline, team, verified results, learnings, next steps. |
| Same file: Formula One | Confirm existing “500+ races explored” scope; role, timeline, team, verified results, learnings, next steps. Add a repository only when public source is available. |
| `public/projects/<slug>/README.md`, all five projects | Optional real screenshot replacing included artwork; optional demo video/poster; optional architecture image replacing themed nodes. Set matching typed paths and meaningful alt text. No empty paths are rendered. |
| `src/lib/portfolio.ts`, five experience records | Local approved company logo and 1–2 verified outcomes each: Rivix, Maverick, Techify, Rainbow Force Foundation, Physics is Everywhere. Existing supplied work bullets remain. |
| `src/components/motion-details.tsx` | Optional approved company/tool logos to replace marquee text slots. |
| `src/lib/site-config.ts` | Current learning and reading; SIH 2026 event/track, truthful participation/result details and URL. Confirm Summer 2027 availability. Maintain the editable skills list. SIH is marked details pending, not an award claim. |
| Private local/Vercel environment | `RESEND_API_KEY`, verified `CONTACT_FROM`, optional `CONTACT_TO`. Set `NEXT_PUBLIC_SITE_URL` for the canonical domain; redeploy after changes. Never commit secrets. |

Optional MDX Writing was not added; no fabricated post was published.

## Validation

- Production build, TypeScript and ESLint pass.
- Eight contact/draft tests pass: mocked Resend success, rejection paths, limits, fixed recipient, honeypot, local throttle, Unicode draft encoding. No real email was sent in tests.
- HTTP/source audit checks ten pages, one main and h1 per page, unique IDs, linked anchors, button action wiring and the real PDF. This is not a browser click test.
- Listed repositories, CreditScout live site, GitHub and LinkedIn returned HTTP 200.
- Production dependency audit: zero vulnerabilities. Development tooling has transitive findings; forced dependency downgrades were not applied.
- Total emitted JavaScript, including lazy chunks and the Next.js update, is recorded in `phase-js-report.json`. This is not initial-page transfer size. 3D and GSAP remain code split.

The latest measured aggregate is 589,124 gzip bytes versus 266,293 before this phase: **+322,831 bytes (about 315KiB)** across every emitted chunk. The majority of the increase belongs to separately loaded 3D libraries. A browser transfer/performance audit is still required to assess initial-route costs.

## Navigation and spacing correction

Following feedback about empty introduction space and blank navigation, the introduction now places the statement and supporting details in adjacent columns, with a stacked mobile layout. Intro pinning and its artificial 450px scroll range were removed. A server-rendered Next template replaces the route-wide AnimatePresence exit gate. Page headings and project entries render visibly before hydration, and scroll reveals no longer hide content while awaiting an observer. Primary-page HTML and streamed navigation payloads are checked by the link audit. These checks do not substitute for browser click tests, which remain unavailable.

Local port 3000 now runs the development server with isolated `.next/dev` output and hot updates, rather than serving production chunks while those chunks are rebuilt.

| Browser QA requested | Result |
| --- | --- |
| Lighthouse Performance / Accessibility / Best Practices / SEO | **Unmeasured** |
| Screenshots at 360 / 768 / 1280 / 1920px | **Not captured** |
| Animation recordings at 360 / 1280px | **Not captured** |
| Chrome trace, animation long tasks ≤50ms | **Unmeasured** |
| CLS <0.05 | **Unmeasured** |

The browser tool reports “Local browser use is disabled in Work settings.” Responsive rules/fallbacks were reviewed in source; rendered overflow, visual contrast, keyboard interaction, layout shifts and animation smoothness still require browser QA. Build success does not establish Lighthouse scores. Enable local browser use in Work settings to complete these checks.

Contact delivery also requires private Resend settings and verification. The UI claims success only after Resend accepts a message; email draft alternatives remain available. Throttling is best-effort per server instance; strict cross-instance limits need a shared service.
