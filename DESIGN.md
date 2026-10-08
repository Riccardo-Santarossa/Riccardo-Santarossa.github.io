<!-- SEED: established with the user before implementation; re-run /impeccable document once there's code to capture the actual tokens and components. -->
---
name: Riccardo Santarossa — Portfolio
description: Designer who can build.
---

# Design System: Riccardo Santarossa — Portfolio

## Overview

**Creative North Star: [to be resolved in the approved direction]**

No Next.js implementation exists yet in this repository, so there is no incumbent system to extract. This seed records only the identity the user made binding; layout, hierarchy, rhythm, supporting type, components and motion choreography are open and will be set by the approved direction, then captured by a scan-mode `document` pass.

**Key Characteristics (binding):**
- Three-colour identity: sand ground, charcoal ink, one rust accent.
- Fraunces (variable) as the identity typeface.
- Two modes, Pro and Weird, switchable by the visitor.
- Motion stack: GSAP + ScrollTrigger with Lenis smooth scroll.

## Colors

A warm, limited palette of three; values are binding, roles are provisional.

### Primary
- **Rust** (#C0532E): the single accent. Role and frequency to be resolved during implementation.

### Neutral
- **Sand** (#EFE7D6): ground.
- **Charcoal** (#36454F): ink and dark surfaces.

**The Three-Colour Rule.** New colours enter only as tints or shades of these three, never as new hues.

## Typography

**Display Font:** Fraunces (variable)
**Body / supporting font:** [to be resolved during implementation]

**Character:** Fraunces is the identity voice; its variable axes (weight, optical size, softness, wonk) are available to both modes. How Pro and Weird use them is [to be resolved during implementation].

## Layout

[to be resolved during implementation] Constraint: no horizontal scroll at 360px.

## Do's and Don'ts

### Do:
- **Do** keep the three hex values exact (#EFE7D6, #36454F, #C0532E) in both modes.
- **Do** keep Fraunces as the identity face in both modes.
- **Do** make both Pro and Weird meet WCAG AA contrast and honour `prefers-reduced-motion` (Lenis and GSAP included).

### Don't:
- **Don't** use a centred hero with two buttons.
- **Don't** present projects as a grid of identical cards.
