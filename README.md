# Riccardo Santarossa: portfolio

Next.js (static export) + GSAP/ScrollTrigger + Lenis. Fraunces and Geist via `next/font`.

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # static site in out/
```

- **Words and links:** `content/site.ts`. Items marked `PLACEHOLDER` (e-mail, the three project slots) must be replaced.
- **Design system:** `DESIGN.md` (tokens in `app/globals.css`; the Pro/Weird values are mirrored in `lib/mode.ts`).
- **Deploy:** every push to `main` builds and publishes to GitHub Pages (`.github/workflows/deploy.yml`).
- `portfolio-wow/` is the previous, separate Vite experiment, kept for reference.

Licences: Fraunces and Geist (SIL OFL 1.1), Lenis (MIT), GSAP (Standard "no charge" licence, free for commercial use).
