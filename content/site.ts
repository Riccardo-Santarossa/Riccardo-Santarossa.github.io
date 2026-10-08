/*
 * SITE CONTENT: the only file to edit for words and links.
 * Copy comes from the previous version of the portfolio and is kept as is.
 * Everything marked PLACEHOLDER must be replaced before you share the site widely.
 */

export const person = {
  name: 'Riccardo Santarossa',
  firstName: 'Riccardo',
  lastName: 'Santarossa',
  city: 'Milan',
  positioning: 'Designer who can build.',
  intro: 'Visual design and branding, from Milan. Formerly a data engineer, so the thing gets built, too.',
  linkedin: 'https://www.linkedin.com/in/riccardo-santarossa',
  // PLACEHOLDER: replace with your real address
  email: 'hello@example.com',
};

export const rows = {
  heading: 'I started in the rows.',
  body: 'A degree in computer science, then about two years as a data engineer: pipelines, schemas, jobs that ran at 3 a.m. and were not allowed to fail.',
  aside: 'Good training for caring about things nobody looks at.',
};

export const turn = {
  sentence:
    'Somewhere between the hundredth table and the thousandth dashboard, I got curious about the part people actually see.',
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
 * PLACEHOLDER: no case studies yet. Each slot is shown as a placeholder on the page.
 * Replace `title`, `kind`, `summary`, set `placeholder: false` and add `href` when a case study exists.
 */
export const work = {
  heading: 'Selected work',
  note: 'Case studies in preparation. The slots below are placeholders.',
  projects: [
    { title: 'Identity project', kind: 'Branding', summary: 'Case study in preparation.', href: '', placeholder: true },
    { title: 'Editorial project', kind: 'Layout and type', summary: 'Case study in preparation.', href: '', placeholder: true },
    { title: 'Web build', kind: 'Design and code', summary: 'Case study in preparation.', href: '', placeholder: true },
  ],
};

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
