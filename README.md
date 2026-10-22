# Pratham Dagli — Personal Portfolio

A complete portfolio built with Next.js 16, React 19, and TypeScript. A portrait cover, consistent graphite surfaces, a cool blue accent, compact project entries, and interactive system walkthroughs.

## Pages

- `/`: introduction, selected projects, profile, and experience.
- `/work`: project collection with category filters.
- `/work/[slug]`: five detailed project stories, interactive architecture walkthroughs, technologies, and source/live links.
- `/about`: full experience, education, skills, certifications, and resume download.
- `/contact`: direct links, clipboard email, and an accessible email draft composer.

## Development

```sh
npm ci
npm run dev
npm run build
npm start
```

Edit profile, projects, experience, skills, and certifications in `src/lib/portfolio.ts`. Replace `public/profile.jpg` to update the portrait. The resume download is the supplied PDF at `public/Pratham-Dagli-Resume.pdf`; it is independent of the website experience list.

## Contact behavior

“Write to me” scrolls to the contact form and focuses the name field. The form validates inputs and prepares a visible email draft with Gmail, Outlook, email-app, and clipboard options. Visitors review and send the draft themselves; the site does not store or send messages. Direct webmail links are also available beside the email address for visitors without a configured email app. No email service or API credentials are required.

Check draft encoding with `node --test tests/contact-draft.test.mjs` (Node 24). With the site running, use `node tests/audit-links.mjs http://localhost:3000` to audit routes, rendered links, section anchors, PDF downloads, external destinations, and source button actions. This audit does not replace browser interaction tests.

## Accessibility and performance

Semantic landmarks, keyboard focus styles, a skip link, mobile navigation with a focus loop and Escape support, reduced-motion preferences, optimized portrait images, and statically generated content pages. Projects use compact entries with explicit case-study and repository links, without screenshots or decorative covers. All five case studies include button-operated workflow walkthroughs. About includes an indexed experience accordion and skill drawers; Contact includes a magnetic email link and channel selection. See `docs/art-direction.md` for asset sources, motion behavior, and the portrait treatment prompt.

## Deployment

The existing GitHub repository is connected to Vercel. Pushing to the production branch triggers its configured deployment. Sitemap and metadata use the existing Vercel URL; update these if the canonical domain changes.
