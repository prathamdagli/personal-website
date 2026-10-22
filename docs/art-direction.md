# Portfolio art direction and assets

## Direction

A portrait-led editorial portfolio: ink (#161616), warm paper (#e8e5dd), and a restrained vermilion accent (#cb4b36). The visual hierarchy is name, person, and work. A photographic cover replaces the decorative atom; a light introduction separates identity from project evidence. Work appears as one broad feature, two staggered entries, and a complete numbered archive.

Astra visually reviewed the reference site’s hero, About transition, workstation scene, career timeline, project carousel, and contact area. Astra implemented the About and Contact pages and reviewed local screenshots. Its review led to changes in contrast, short-screen cover height, mobile copy separation, and contact action placement.

## Portrait treatment

- Source: the user-supplied `public/profile.jpg`, preserved unchanged.
- Saved asset: `public/portrait-editorial.png`.
- Method: built-in image generation tool, transparent-background photo edit.
- The result is an AI-assisted editorial treatment; the About page retains the original campus photograph.

Final prompt:

> Edit target: the supplied photograph of Pratham Dagli. Create a premium editorial portrait cutout asset for his personal engineering portfolio. Preserve the exact identity, face shape, hair, sunglasses, expression, clothing, natural arm pose and proportions of this real person. Remove the entire background including buildings, trees, lawn, pavement and railings; reconstruct only clothing where the rail touches it. Crop as a centered three-quarter portrait from top of hair to upper thighs, person occupying most of the image height with 5% padding at top and sides. Convert subject to sophisticated monochrome black-and-white studio treatment: rich charcoal shirt, silver midtones, subtle soft front light and delicate white rim light. The man remains photographic, recognizable and natural, not a cartoon, not a 3D avatar. Clean precision hair edges, transparent background with true alpha, no floor, no rectangular backdrop, no text, no borders, no halos. Portrait vertical composition. This is an edit of the original subject, never change his facial features.

## Project evidence

`public/work/creditscout-interface.png` is an actual browser capture of the public Creditscout landing page, taken during this redesign. The other covers are code-native system illustrations, not application screenshots. The ComplaintTracker diagram represents its NLP routing; GreenHydro connects hydrogen production and verification; JobWeMet depicts a learning path; Formula 1 illustrates exploratory race analysis.

The public ComplaintTracker and JobWeMet deployment URLs returned 404 during review. Their unavailable live buttons were removed; repository links remain. Creditscout’s live URL returned HTTP 200.

## Motion and accessibility

The cover uses a short text entrance and scroll-linked portrait depth. Scroll reveals run once and preserve reading order. Custom project cursors appear only for a fine pointer, never replace the standard pointer, and respect reduced motion. Mobile navigation supports Escape, a focus loop, inert underlying content, and closing when crossing the desktop breakpoint. The email composer opens a draft; it does not claim to send messages.
