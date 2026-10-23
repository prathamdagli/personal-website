# Production audit — 23 October 2026

## Fixed

- Direct WhatsApp chat uses `https://wa.me/919537365499` in Contact, the footer and shared contact calls to action. Number formatting follows the [official click-to-chat format](https://faq.whatsapp.com/5913398998672934).
- Contact detects server email configuration at request time. Configured deployments send through Resend; unconfigured deployments offer a clearly labelled email-composer flow instead of a Send button that always fails.
- Delivery failure preserves the message and automatically exposes Gmail, Outlook, email-app and clipboard alternatives. A response is only treated as successful when the [Resend API](https://resend.com/docs/api-reference/emails/send-email) accepts a message ID.
- Submissions have validation, a honeypot, body limits, origin checks, timeout handling and best-effort instance-local throttling. Duplicate clicks are guarded; inputs are locked while sending. Strict rate limiting across server instances would require shared storage.
- Public `[ADD …]` text, empty learning/reading fields, unverified achievement details and “Logo to add” labels are removed from visitor-facing pages. Editable fields remain in source; existing factual capabilities are used for project scope. No metrics, awards or personal project roles were invented.
- Page loading and recovery UI prevents unexplained blank fallback screens. The recovery button uses this installed Next version's `retry` API.
- Basic response headers disable MIME sniffing, restrict framing and avoid unnecessary camera, microphone and location permissions. The framework identification header is disabled.

## Actually verified

- Production build, TypeScript and ESLint.
- Nine automated contact/draft tests, including invalid input, honeypot, recipient integrity, provider failures, rate limiting, Unicode encoding and incomplete-success responses.
- Production dependencies have no audit findings. The full dependency audit still reports five high-severity development-tool findings in the Next ESLint/fast-glob/micromatch/braces chain; its suggested fix downgrades the Next ESLint configuration to version 14. That incompatible downgrade was not applied. These findings remain unresolved upstream/tooling work.
- HTTP/source audit of all ten routes, all rendered local links/anchors, PDF download, heading/landmark uniqueness, correct WhatsApp destination, and absence of public placeholder text. Results: `production-link-audit.json`.
- Real browser navigation between Projects, About, Experience and Contact; project filtering; experience expansion; toolkit expansion; next-project links; all five workflow walkthroughs; dark-mode persistence across navigation; Write to me scroll/focus; copy-email feedback; invalid-email rejection; draft URL encoding; and copy-draft feedback.
- Every case study renders with no observed horizontal overflow or unfinished content at the actual 1280px browser viewport. Browser error logs were empty during these checks.
- The user explicitly authorized one real verification email to `prathamdagli11@gmail.com`. It was submitted through the browser form; Resend accepted it, the success message appeared, and fields reset. This verifies provider acceptance, not inbox/spam placement. See `qa/contact-email-success.jpg`.
- GitHub reports a successful Vercel production deployment for commit `96f3ab7`. The public `/contact` page was checked after deployment: WhatsApp is present and Continue to email generates the correct Gmail/Outlook/email-app draft without a failed API submission. See `qa/live-email-composer.jpg`.
- Resend configuration is saved only in ignored `.env.local`; no API key is committed. The supplied key is send-only, so domain enumeration is denied. The successful test used `Pratham Dagli <onboarding@resend.dev>` and the fixed owner recipient.

## Remaining external blockers / measurement limits

The connected Vercel tool listed project `personal-website`, but updating its private environment returned **403 forbidden** for team `papayus-projects`. The connector exposes no team-authorization action. The Vercel browser sign-in reaches a GitHub credential screen with no authenticated session. Local email is configured; live direct sending cannot be enabled through this connection until account/team authentication is completed. The live fallback remains webmail plus WhatsApp rather than a broken sending action.

Browser viewport overrides were requested at 360/768/1280/1920px, but the tool retained an actual 1280px viewport each time. `qa/responsive.json` records requested and actual dimensions, not successful mobile tests. Mobile/tablet/wide screenshots are **not verified**; the misleading 360px screenshot was discarded. CSS breakpoints were reviewed in source.

Lighthouse scores, animation recordings, a Chrome performance trace, long-task bounds and CLS remain **unmeasured**. The site must not be described as having achieved the earlier Lighthouse ≥95 / CLS <0.05 targets without those measurements.
