/*
 * ─────────────────────────────────────────────────────────────
 *  SITE CONTENT — the only file you need to edit.
 *
 *  Everything marked PLACEHOLDER is invented and must be replaced
 *  before the site goes public (projects + e-mail).
 *  Everything else is factual and can stay as it is.
 *
 *  Edit, save: the dev server reloads. `npm run build` bakes it
 *  into static HTML (no JS needed to read it).
 * ─────────────────────────────────────────────────────────────
 */

export const person = {
  name: 'Riccardo Santarossa',
  firstName: 'Riccardo',
  lastName: 'Santarossa',
  city: 'Milan',
  positioning: 'Designer who can build.',
  intro: 'Visual design and branding, from Milan. Formerly a data engineer, so the thing gets built, too.',
  linkedin: 'https://www.linkedin.com/in/riccardo-santarossa',
  linkedinLabel: 'linkedin.com/in/riccardo-santarossa',
  // PLACEHOLDER — replace with your real address
  email: 'hello@example.com',
};

export const rows = {
  heading: 'I started in the rows.',
  body: 'A degree in computer science, then about two years as a data engineer: pipelines, schemas, jobs that ran at 3 a.m. and were not allowed to fail.',
  aside: 'Good training for caring about things nobody looks at.',
};

export const turn = {
  sentence: 'Somewhere between the hundredth table and the thousandth dashboard, I got curious about the part people actually see.',
};

export const craft = {
  heading: 'What I do now',
  items: [
    { word: 'Identity', text: 'Marks, colour and type that still hold up at sixteen pixels.' },
    { word: 'Layout', text: 'Grids, posters, editorial pages. Hierarchy before decoration.' },
    { word: 'Code', text: 'Sites and prototypes I build myself, so the design survives the browser.' },
    { word: 'Systems', text: 'Tokens, rules, documentation. The quiet part that keeps a brand in one piece.' },
  ],
};

/*
 * PLACEHOLDER — all four projects are fictional examples.
 * Replace title, kind, role, year, summary and (optionally) cover.
 * `cover` picks one of the code-generated covers in src/build/covers.js:
 *   'tram' | 'garden' | 'grid' | 'weather'
 * `href` can point to a case study later; leave '' for none.
 */
export const projects = [
  {
    title: 'Linea 9', // PLACEHOLDER
    kind: 'Self-initiated identity', // PLACEHOLDER
    role: 'Identity, wayfinding type', // PLACEHOLDER
    year: '2026', // PLACEHOLDER
    summary: 'An identity study for a night tram line: one numeral, one colour, legible from across a wet street.', // PLACEHOLDER
    cover: 'tram',
    href: '',
  },
  {
    title: 'Orto Comune', // PLACEHOLDER
    kind: 'Brand for a community garden', // PLACEHOLDER
    role: 'Naming, identity, signage', // PLACEHOLDER
    year: '2026', // PLACEHOLDER
    summary: 'A modular mark that grows with the plots it labels. Built to be painted by volunteers.', // PLACEHOLDER
    cover: 'garden',
    href: '',
  },
  {
    title: 'Rowtype', // PLACEHOLDER
    kind: 'Display typeface experiment', // PLACEHOLDER
    role: 'Type design, code', // PLACEHOLDER
    year: '2025', // PLACEHOLDER
    summary: 'Letters drawn only from table cells. A small joke about my old job that turned into a type family.', // PLACEHOLDER
    cover: 'grid',
    href: '',
  },
  {
    title: 'Quiet Numbers', // PLACEHOLDER
    kind: 'Editorial data series', // PLACEHOLDER
    role: 'Data design, layout', // PLACEHOLDER
    year: '2025', // PLACEHOLDER
    summary: 'Posters about Milan weather that read like weather, not like spreadsheets.', // PLACEHOLDER
    cover: 'weather',
    href: '',
  },
];

export const route = {
  heading: 'The route so far',
  stops: [
    { title: 'Computer science', text: 'A degree in it. Algorithms, databases, and an early suspicion that the interface was the interesting part.' },
    { title: 'Data engineering', text: 'About two years of pipelines. I learned rigour, patience, and how much naming things matters.' },
    { title: 'Visual design & branding', text: 'Now. Studying, drawing, shipping. Looking for a team, a master’s programme or a brand that needs both halves.' },
  ],
};

export const contact = {
  big: 'hello',
  line: 'Open to junior design roles, master’s programmes, and small brands or studios that need someone who can design it and build it.',
  footer: 'Designed and built by Riccardo. Every visual on this page is code.',
};
