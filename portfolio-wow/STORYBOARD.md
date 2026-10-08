# Storyboard — "Nebbia"

## Concept (one sentence)

A slow ride through Milan fog: one handful of data points condenses, scene by scene, from noise into letters, work and finally a way to reach me — the fog lifts as the designer comes into focus.

Why fog: it is Milan's most recognisable weather, and it is a precise metaphor for the move from data engineering (noise, volume, rows) to design (form, clarity, intent). The scroll is the camera; the fog is the medium it moves through. Every scene happens *inside* the same fog field, so transitions are continuous by construction.

## Palette

Neutral, mineral, cool — wet stone and canal water, not paper.

| Token | Name | Hex | Use |
|---|---|---|---|
| `--nebbia` | Fog | `#D3D7D0` | opening background |
| `--peltro` | Pewter | `#AEB3AC` | development background |
| `--naviglio` | Canal at night | `#1F2A28` | climax background (work) |
| `--schiarita` | Clearing | `#E3E8E8` | closing background (contact) |
| `--inchiostro` | Ink | `#17201E` | text on light |
| `--calce` | Lime-wash | `#E9ECE6` | text on dark |
| `--sodio` | Sodium lamp | `#FF9A1A` | accent 1 — street-lamp points only: a few particles, the route dot, the cursor point, lamps in the dark scene |
| `--cobalto` | Cobalt | `#2B3BFF` | accent 2 — one place only: the e-mail link in the final scene (underline + focus) |

Background is not a CSS colour per section: a WebGL fog field interpolates between the four grounds along the scroll, and text ink flips only in the gaps between scenes.

## Type

- **Anybody** (variable: `wdth` 50–150, `wght` 100–900, OFL-1.1, Etcetera Type Co.) — display. The width axis is the protagonist: type stretches, compresses, and its live axis values are shown as a spec.
- **Newsreader** (variable: `opsz` 6–72, `wght` 200–800, italic, OFL-1.1, Production Type) — voice. Body, captions and small labels (italic, sentence case — no caps eyebrows, no monospace labels).

Scale (ratio ≈ 1.333): 0.875 / 1 / 1.25 / 1.75 / 2.5 / 4.2 rem, display fluid up to ~13vw.

## Motion tokens

- `settle` `cubic-bezier(.16, 1, .3, 1)` — things arriving.
- `drift` `cubic-bezier(.65, 0, .35, 1)` — things changing state.
- Lenis smooth scroll, `lerp 0.085` on wheel; native touch scrolling is kept.
- Every scroll-linked value is additionally low-pass filtered (lerp toward target) so nothing snaps.

## Scenes (in order)

| # | Scene | Beat | Animation mechanism (one per scene) |
|---|---|---|---|
| 0 | **Fog field** (global) | the medium | WebGL fbm-noise shader; uniforms (ground colour, density, lamp glow, drift) driven by scroll position |
| 1 | **Condense** — name | opening, sets tone | *Particle condensation*: ~2,000 points condense out of the fog into "Riccardo Santarossa" on load, then hand off to real DOM text. At rest letters breathe on the `wdth` axis around the pointer. On scroll the name is *compressed* (wdth 125 → 50) and released back into points. ★ signature |
| 2 | **Rows** — origin as data engineer | development, spectacle | *Path-flow particles*: the same points stream along pipeline curves — chaotic on the left, merged into clean rows on the right. Speed follows scroll velocity. ★ signature |
| 3 | **Turn** | breath | *Focus pull*: one sentence, pinned; each word racks from fog-blur to sharp as you scroll, like a lens finding focus. |
| 4 | **Craft** — what I do now | spectacle | *Horizontal pan*: pinned track slides sideways through four giant words; construction lines and the **live** variable-font values (wdth/wght read from the element every frame) draw themselves around them. ★ signature |
| 5 | **Work** — four projects | climax | *Z-dolly*: CSS 3D camera flies forward through plates hanging in dark fog lit by sodium lamps; each plate comes into focus at the focal plane and passes the camera. Covers are generative SVG. ★ signature |
| 6 | **Route** — path so far | breath | *Sticky stack*: three sheets (CS degree → data engineering → design) stack over each other; the one underneath recedes. Fog thins. |
| 7 | **Contact** | closing | *Reconvergence + pointer field*: points return one last time and settle into "hello" while the fog clears; at rest the word reacts to the pointer. E-mail and LinkedIn are plain, large, still. |

Arc: light fog → greyer → dark climax with lamps → clearing to the palest ground at the end.

## Readability contract

At rest: name + one-line positioning (scene 1), project titles (scene 5, focal plate), contact (scene 7) are fully legible, real HTML text. Motion may blur things *between* those points.

## Fallbacks

- `prefers-reduced-motion`: no smooth scroll, no particles, static fog gradient per scene, pinned scenes become normal flow (craft words stacked vertically, work as a list of plates, sheets in sequence). Same content, still composed.
- No JS: the same static version.
- Mobile / coarse pointer: ~900 particles instead of ~2,000, fog rendered at lower resolution with fewer octaves, no blur filters (opacity only), no cursor point.
