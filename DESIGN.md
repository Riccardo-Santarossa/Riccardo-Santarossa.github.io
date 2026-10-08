---
name: Riccardo Santarossa Portfolio
description: Designer who can build.
colors:
  sand: "#efe7d6"
  charcoal: "#36454f"
  rust: "#c0532e"
  ink-soft-pro: "#4c5860"
  panel-pro: "#e3d8c1"
  sheet-1-pro: "#e6dcc6"
  sheet-2-pro: "#ddd1b8"
  sheet-3-pro: "#d3c6ab"
  ink-soft-weird: "#cac7bb"
  sheet-1-weird: "#3e4e59"
  sheet-2-weird: "#465763"
  sheet-3-weird: "#4f616d"
typography:
  display:
    fontFamily: "Fraunces, Iowan Old Style, Georgia, serif"
    fontSize: "clamp(3.4rem, 12.5vw, 12rem)"
    fontWeight: 430
    lineHeight: 0.88
    letterSpacing: "-0.035em"
    fontVariation: "'SOFT' 0, 'WONK' 0"
  headline:
    fontFamily: "Fraunces, Georgia, serif"
    fontSize: "clamp(2.6rem, 1.4rem + 4.6vw, 5.5rem)"
    fontWeight: 430
    lineHeight: 1
  title:
    fontFamily: "Fraunces, Georgia, serif"
    fontSize: "clamp(1.9rem, 1.3rem + 2.2vw, 3rem)"
    fontWeight: 430
    lineHeight: 1.05
  body:
    fontFamily: "Geist, system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "Geist, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 500
rounded:
  panel: "4px"
  pill: "999px"
spacing:
  gutter: "clamp(1rem, 4vw, 3.5rem)"
  section: "clamp(6rem, 14vh, 11rem)"
components:
  toggle-active:
    backgroundColor: "{colors.charcoal}"
    textColor: "{colors.sand}"
    rounded: "{rounded.pill}"
    height: "44px"
  preview-panel-pro:
    backgroundColor: "{colors.panel-pro}"
    textColor: "{colors.charcoal}"
    rounded: "{rounded.panel}"
  preview-panel-weird:
    backgroundColor: "{colors.rust}"
    textColor: "{colors.sand}"
    rounded: "{rounded.panel}"
---

# Design System: Riccardo Santarossa Portfolio

## Overview

**Creative North Star: "Two hands, one typeface"**

One page, one content set, two modes. Pro is the hand that gets hired: sand ground, charcoal ink, Fraunces set straight and light. Weird is the hand that draws: charcoal ground, Fraunces pushed to its softest and wonkiest axes, letters knocked slightly off their baseline, rust used as a field instead of a detail. The toggle does not swap a theme; GSAP tweens the same CSS variables (colours, `SOFT`, `WONK`, weight, the `--weird` amount), so the type visibly changes shape.

Density is low (gallery spacing), alignment is left and asymmetric, and every section uses a different layout family: wordmark hero, offset statement, scroll-read sentence, horizontal pan, index with preview, sticky stack, giant sign-off.

**Key Characteristics:**
- Three identity colours, exact in both modes; everything else is a tint or shade of them.
- Fraunces carries identity; Geist carries information and UI.
- Motion is scroll-driven and single-purpose per section; reduced motion gets the complete page without it.

## Colors

Warm sand and cool charcoal trade places between modes; rust stays rust.

### Primary
- **Rust** (`rust`): underlines of links and the main call, focus ring in Pro, text selection, and in Weird the project preview field. Never used for small text (3.8:1 on sand, 2.1:1 on charcoal).

### Neutral
- **Sand** (`sand`): Pro ground, Weird ink.
- **Charcoal** (`charcoal`): Pro ink, Weird ground.
- **Soft ink** (`ink-soft-pro` / `ink-soft-weird`): secondary text, at least 5.9:1 in both modes.
- **Sheets and panels** (`sheet-*`, `panel-pro`): tonal steps of the ground for the stacked route cards and the work preview.

**The Three-Colour Rule.** New colours enter only as tints or shades of sand, charcoal and rust.

**The Rust Is Not Text Rule.** Rust appears as lines, fields and focus, never as body or label text.

## Typography

**Display Font:** Fraunces (variable: `opsz`, `wght`, `SOFT`, `WONK`, italic)
**Body Font:** Geist (variable)

**Character:** A soft old-style serif with real personality next to a plain, technical sans: the design half and the build half, side by side.

### Hierarchy
- **Display** (430 Pro / 820 Weird, `clamp(3.4rem, 12.5vw, 12rem)`, 0.88): the name in the hero only; `hello` in the sign-off is the same voice at `clamp(5.5rem, 26vw, 24rem)`.
- **Headline** (same weights, `clamp(2.6rem, …, 5.5rem)`, 1): section headings; the origin statement goes up to 7.5rem.
- **Title** (`clamp(1.9rem, …, 3rem)`, 1.05): project titles, route stops, positioning line (italic).
- **Body** (Geist 400, 1.0625rem–1.375rem, 1.6): paragraphs, max 44ch.
- **Label** (Geist 500, 0.875rem): nav, toggle, project kind.

**The Axis Rule.** Display text never hard-codes `SOFT`, `WONK` or weight: it reads `--soft`, `--wonk`, `--wght-d` so the mode can morph it.

## Layout

Single column page with a `88rem` wrap and `clamp(1rem, 4vw, 3.5rem)` gutters; section padding `clamp(6rem, 14vh, 11rem)`. Below 760px every multi-column block collapses to one column; below 860px the work preview hides and the index stands alone. No section may overflow horizontally at 360px; the craft pan is clipped and only becomes horizontal when motion is allowed.

## Elevation & Depth

Mostly flat. Two soft, charcoal-tinted shadows only: under the work preview (`0 24px 60px -28px`) and on the top edge of each stacked route sheet (`0 -12px 40px -24px`), where depth explains that the sheets overlap.

## Shapes

Panels and sheets: 4px corners. Interactive pills (mode toggle): fully round. Nothing else is rounded.

## Components

### Mode toggle
Two-button group with `aria-pressed`, 44px targets, pill shape. Active: ink fill, ground text. Choice persists in `localStorage` and is restored before paint.

### Work index
Rows: index number, Fraunces title, Geist kind and status. The row at screen centre (or under the pointer or focus) is active: its title shifts right and the sticky preview wipes in from the bottom (clip-path). Placeholders say so in text.

### Route sheets
Sticky cards, each offset 3.5rem lower than the previous; the covered sheet scales to 0.94 as the next arrives.

### Links
Underline in rust, 2–3px, offset grows on hover.

## Do's and Don'ts

### Do:
- **Do** keep the three hex values exact in both modes.
- **Do** drive every display face through `--soft`, `--wonk`, `--wght-d`.
- **Do** gate every GSAP choreography with `gsap.matchMedia('(prefers-reduced-motion: no-preference)')` and keep Lenis off under reduced motion.
- **Do** mark missing case studies as placeholders in visible text.

### Don't:
- **Don't** use a centred hero with two buttons.
- **Don't** present projects as a grid of identical cards.
- **Don't** put rust under small text.
- **Don't** add eyebrow labels above headings.
