# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Next.js (App Router), GSAP + ScrollTrigger, Lenis. Set by the user in the redesign brief. The Next.js app does not exist yet in this folder (only `portfolio-wow/`, a separate Vite site); the user asked for missing parts to be created here.

## Users

- **Recruiters and hiring teams** scanning quickly: who is this, what can he do, how to reach him.
- **Design community and master's programme peers/faculty**: judging taste, craft and point of view.
- **Small brands and studios**: looking for someone who can design an identity and also build it.

Not a sales page for marketplace clients (e.g. Upwork).

## Product Purpose

Personal portfolio of Riccardo Santarossa. Primary action: look at the projects, then get in touch. Success is a visitor who leaves knowing the positioning and with a clear path to contact.

## Positioning

"Designer who can build": a computer science degree and about two years as a data engineer, now moving into visual design and branding. The technical half is real, so designs survive implementation.

## Operating Context

Visitors arrive from LinkedIn, a CV, an application or a referral, on desktop and phone, often with little time. Some will judge the site itself as a portfolio piece.

## Capabilities and Constraints

- Single portfolio site; no new pages beyond what exists (none exist yet in Next.js).
- Copy, links and images of the incumbent stay unchanged; new text only where a slot has none.
- No new dependencies without asking (stack above is user-specified).
- Undecided: whether a case-study page template exists or is wanted (none exists).

## Brand Commitments

- Palette: `#EFE7D6`, `#36454F`, `#C0532E`.
- Typeface: Fraunces (variable).
- A Pro/Weird mode toggle is part of the identity.
- Voice, inferred from existing copy (`portfolio-wow/src/content.js`): short, dry, plain verbs, self-aware about the data-engineering past, no hype.

## Evidence on Hand

- Facts: Riccardo Santarossa, Milan; computer science degree; ~2 years data engineer; transitioning to visual design and branding; LinkedIn `linkedin.com/in/riccardo-santarossa`.
- No finished case studies, no testimonials, no client logos, no metrics. Project slots must be visibly marked placeholders, never invented projects.
- E-mail: none provided; use an obvious placeholder on `example.com`.

## Product Principles

1. Work first: every layout decision shortens the path to the projects.
2. Show the build half, don't claim it: craft in the site itself is the evidence.
3. Honest gaps: placeholders look like placeholders.
4. Both modes are real: Pro must satisfy a recruiter in ten seconds; Weird must not break legibility or access.

## Accessibility & Inclusion

WCAG 2.1 AA contrast, visible focus, full `prefers-reduced-motion` support (including Lenis and GSAP), no horizontal scroll at 360px.
