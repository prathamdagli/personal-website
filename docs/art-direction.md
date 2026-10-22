# Portfolio art direction and assets

## Direction

A consistent graphite portfolio: background #101216, surface #171b21, elevated surface #20262e, off-white #eef1f5, secondary text #a1aab6, and a cool blue accent #8eacff. All routes share the same surfaces, separators, heading hierarchy, and interaction language. The original portrait remains the primary visual identity; the full Dagli surname stays readable.

Astra audited the visual system and source. Sol at medium effort implemented the refinement. The oversized footer slogan, scrolling discipline slogan, project screenshots, simulated interface covers, H2 artwork, and large custom cursor have been removed. Work is presented as compact numbered entries with specific descriptions, technologies, and separate case-study and GitHub links. Existing live links remain available; Formula 1 has no invented repository.

## Portrait treatment

- Source: the user-supplied `public/profile.jpg`, preserved unchanged.
- Saved asset: `public/portrait-editorial.png`.
- Method: built-in image generation tool, transparent-background photo edit.
- The result is an AI-assisted editorial treatment; the About page retains the original campus photograph.

Final prompt:

> Edit target: the supplied photograph of Pratham Dagli. Create a premium editorial portrait cutout asset for his personal engineering portfolio. Preserve the exact identity, face shape, hair, sunglasses, expression, clothing, natural arm pose and proportions of this real person. Remove the entire background including buildings, trees, lawn, pavement and railings; reconstruct only clothing where the rail touches it. Crop as a centered three-quarter portrait from top of hair to upper thighs, person occupying most of the image height with 5% padding at top and sides. Convert subject to sophisticated monochrome black-and-white studio treatment: rich charcoal shirt, silver midtones, subtle soft front light and delicate white rim light. The man remains photographic, recognizable and natural, not a cartoon, not a 3D avatar. Clean precision hair edges, transparent background with true alpha, no floor, no rectangular backdrop, no text, no borders, no halos. Portrait vertical composition. This is an edit of the original subject, never change his facial features.

## Project content

Project facts and links live in `src/lib/portfolio.ts`. The portfolio makes no invented performance claims. Interactive walkthroughs explain the documented architecture; they do not run models, calculate real credit readiness, or issue environmental certificates. Creditscout's synthetic training data and GreenHydro's experimental scope remain explicit. The previous Creditscout screenshot is retained as an unused asset, not shown in project layouts.

## Motion and accessibility

Keep the portrait entrance, restrained page entrances, reading progress, once-only scroll reveals, experience drawers, skill drawers, workflow transitions, and contact feedback. Respect reduced motion, preserve native pointer and keyboard behavior, and keep focus indicators visible. Mobile navigation supports Escape, a focus loop, inert underlying content, and closing when crossing the desktop breakpoint. The email composer opens a draft; it does not send messages.

## Local verification

Build the current checkout before starting production preview. Restart the owned server after a production build so port 3000 does not keep a previously loaded version. Browser automation is disabled in Work settings during this pass; production build, route responses, rendered content, and source checks are verified without claiming a new visual browser inspection.
