# Pratham Dagli — Personal Portfolio

A complete portfolio built with Next.js 16, React 19, and TypeScript. A portrait cover, consistent graphite surfaces, a cool blue accent, compact project entries, and interactive system walkthroughs.

## Pages

- `/`: portrait/neural-field hero, introduction, skills, selected projects, profile, experience, achievements and Currently.
- `/work`: project collection with category filters.
- `/work/[slug]`: five detailed project stories, interactive architecture walkthroughs, technologies, and source/live links.
- `/about`: full experience, education, skills, certifications, and resume download.
- `/contact`: Resend contact form, clipboard email and email-draft alternatives.
- `/design-lab`: noindex review of the two signature prototypes; the neural field was selected.

## Development

```sh
npm ci
npm run dev
npm run build
npm start
```

Edit project evidence/media in `src/data/projects.ts`, availability/Currently/achievements/skills in `src/lib/site-config.ts`, and experience/company logos/outcomes in `src/lib/portfolio.ts`. Optimized WebP photos are used alongside preserved originals. The resume download is the supplied PDF at `public/Pratham-Dagli-Resume.pdf`.

## Contact behavior

“Write to me” scrolls to the form and focuses the name field. Direct sending uses `/api/contact` with validation, body limits, origin checks, honeypot and best-effort instance-local throttling. Configure `RESEND_API_KEY` and a verified `CONTACT_FROM` privately in `.env.local` and Vercel; see `.env.example`. No success is claimed without Resend acceptance. Gmail, Outlook, email-app and clipboard draft alternatives remain available. Real delivery remains unverified until credentials are configured.

Run `node --experimental-strip-types --test tests/contact-api.test.mjs tests/contact-draft.test.mjs`. With the site running on port 3000, use `node tests/audit-links.mjs http://localhost:3000` for HTTP/source checks. Run `node scripts/measure-js.mjs` after a build for total emitted JavaScript. These checks do not replace browser interaction tests.

## Accessibility and performance

Semantic landmarks, keyboard focus styles, a skip link, mobile navigation, reduced motion, optimized images, system/light/dark themes and static content pages. Projects use compact approved abstract covers with explicit case-study/repository links. All case studies retain interactive walkthroughs. GSAP/Lenis and the demand-rendered neural field are code split. Motion tokens live in `src/lib/motion.ts` and feed CSS variables.

See [the phase report and complete placeholder checklist](docs/phase-report.md). Lighthouse, viewport screenshots, recordings, CLS and performance traces remain unmeasured because local browser use is disabled in Work settings.

## Deployment

The existing GitHub repository is connected to Vercel. Pushing main triggers its configured deployment. Set `NEXT_PUBLIC_SITE_URL` for the canonical custom domain; metadata, sitemap, robots and Person JSON-LD share it. Analytics and Speed Insights render on Vercel deployments.
