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

The contact form validates inputs and opens a `mailto:` draft in the visitor's email application. It does not store messages or claim to send them. No email service or API credentials are required.

## Accessibility and performance

Semantic landmarks, keyboard focus styles, a skip link, mobile navigation with a focus loop and Escape support, reduced-motion preferences, optimized portrait images, and statically generated content pages. Projects use compact entries with explicit case-study and repository links, without screenshots or decorative covers. All five case studies include button-operated workflow walkthroughs. About includes an indexed experience accordion and skill drawers; Contact includes a magnetic email link and channel selection. See `docs/art-direction.md` for asset sources, motion behavior, and the portrait treatment prompt.

## Deployment

The existing GitHub repository is connected to Vercel. Pushing to the production branch triggers its configured deployment. Sitemap and metadata use the existing Vercel URL; update these if the canonical domain changes.
