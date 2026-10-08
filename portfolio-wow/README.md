# Nebbia — portfolio of Riccardo Santarossa

A single-page, scroll-driven portfolio. Concept, palette, type and scenes: see [STORYBOARD.md](STORYBOARD.md).

## Run

```bash
npm install
npm run dev       # development server with reload
npm run build     # static site in dist/ (upload that folder anywhere)
npm run preview   # serve the built dist/ locally
```

## Replace the content

Everything you write lives in **one file: [`src/content.js`](src/content.js)**.

- Lines marked `PLACEHOLDER` are invented: the four projects and the e-mail (`hello@example.com`). Replace them before publishing.
- Each project has a `cover` key choosing one of four covers drawn in code (`tram`, `garden`, `grid`, `weather`, defined in `src/build/covers.js`), and an optional `href` for a future case study.
- The content is baked into static HTML at build time (the page is readable with JS off).

## Where things are

| Path | What |
|---|---|
| `src/styles/tokens.css` | palette, fonts, type scale, easing — the single design contract (JS reads colours from here) |
| `src/styles/style.css` | layout; static version first, motion layer under `.motion` |
| `src/journey.js` | the frame loop: scroll → every scene |
| `src/scenes/*` | one module per scene (fog shader, points, hero, rows, turn, craft, work, route, contact) |
| `src/build/*` | build-time HTML + SVG covers |

## Accessibility & fallbacks

Native scroll stays native (Lenis smooths wheel input on top). Keyboard, anchors and the back button all work. `prefers-reduced-motion` or no JS gets a static, composed version of the same content.

## Licences (checked)

- Anybody, Newsreader: SIL Open Font License 1.1 (self-hosted through `@fontsource-variable`)
- Lenis, Vite: MIT
- No third-party images: every visual is SVG, canvas or a shader written for this site.
