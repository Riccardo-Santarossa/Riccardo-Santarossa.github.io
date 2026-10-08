// Build-time renderer: turns src/content.js into static, semantic HTML slots for index.html.
import { covers } from './covers.js';

const esc = (s) =>
  String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);

const letters = (word) =>
  [...word].map((ch) => `<span class="ch">${esc(ch)}</span>`).join('');

export function renderSlots(c) {
  const { person, rows, turn, craft, projects, route, contact } = c;

  const hero = `
      <h1 class="hero-name">
        <span class="sr">${esc(person.name)}</span>
        <span class="hero-lines" aria-hidden="true">
          <span class="line l1">${letters(person.firstName)}</span>
          <span class="line l2">${letters(person.lastName)}</span>
        </span>
      </h1>
      <div class="hero-meta">
        <p class="hero-pos">${esc(person.positioning)}</p>
        <p class="hero-intro">${esc(person.intro)}</p>
      </div>
      <p class="hero-cue" aria-hidden="true">Scroll slowly. It’s foggy in ${esc(person.city)}.</p>`;

  const rowsHtml = `
      <h2 class="rows-h" id="rows-h">${esc(rows.heading)}</h2>
      <p class="rows-body">${esc(rows.body)}</p>
      <p class="rows-aside">${esc(rows.aside)}</p>`;

  const turnHtml = `
      <p class="turn-sentence">${turn.sentence
        .split(' ')
        .map((w) => `<span class="w">${esc(w)}</span>`)
        .join(' ')}</p>`;

  const craftHtml = `
      <h2 class="craft-h">${esc(craft.heading)}</h2>
      <ul class="craft-track">
        ${craft.items
          .map(
            (it) => `
        <li class="craft-item">
          <div class="spec">
            <span class="craft-word">${esc(it.word)}</span>
            <span class="g g-cap" aria-hidden="true"></span>
            <span class="g g-base" aria-hidden="true"></span>
            <span class="g g-l" aria-hidden="true"></span>
            <span class="g g-r" aria-hidden="true"></span>
            <span class="g-dim" aria-hidden="true"><span class="g-dim-v"></span></span>
            <span class="g-axes" aria-hidden="true">wdth <b class="v-wdth">100</b> / wght <b class="v-wght">760</b></span>
          </div>
          <p class="craft-text">${esc(it.text)}</p>
        </li>`,
          )
          .join('')}
      </ul>`;

  const workHtml = `
      <div class="work-intro">
        <h2 class="work-h">Selected work</h2>
        <p class="work-note">Four studies. Covers drawn in code, like everything else here.</p>
      </div>
      <ol class="plates">
        ${projects
          .map((p, i) => {
            const cover = (covers[p.cover] || covers.grid)();
            const title = p.href ? `<a href="${esc(p.href)}">${esc(p.title)}</a>` : esc(p.title);
            return `
        <li class="plate" style="--i:${i}">
          <article class="plate-in">
            <div class="plate-cover">${cover}</div>
            <div class="plate-text">
              <h3 class="plate-title">${title}</h3>
              <p class="plate-kind">${esc(p.kind)}, ${esc(p.year)}</p>
              <p class="plate-sum">${esc(p.summary)}</p>
              <p class="plate-role">${esc(p.role)}</p>
            </div>
          </article>
        </li>`;
          })
          .join('')}
      </ol>`;

  const routeHtml = `
      <h2 class="route-h">${esc(route.heading)}</h2>
      <ol class="sheets">
        ${route.stops
          .map(
            (s, i) => `
        <li class="sheet" style="--i:${i}">
          <span class="sheet-n" aria-hidden="true">${i + 1}</span>
          <h3 class="sheet-t">${esc(s.title)}</h3>
          <p class="sheet-p">${esc(s.text)}</p>
        </li>`,
          )
          .join('')}
      </ol>`;

  const contactHtml = `
      <h2 class="hello"><span class="sr">${esc(contact.big)}</span><span aria-hidden="true">${letters(contact.big)}</span></h2>
      <div class="contact-body">
        <p class="contact-line">${esc(contact.line)}</p>
        <ul class="contact-links">
          <li><a class="email" href="mailto:${esc(person.email)}">${esc(person.email)}</a></li>
          <li><a class="li" href="${esc(person.linkedin)}" rel="me noopener" target="_blank">LinkedIn<span class="sr"> (opens in a new tab)</span></a></li>
        </ul>
        <p class="contact-city">${esc(person.name)}, ${esc(person.city)}</p>
      </div>`;

  return {
    hero,
    rows: rowsHtml,
    turn: turnHtml,
    craft: craftHtml,
    work: workHtml,
    route: routeHtml,
    contact: contactHtml,
    footer: esc(contact.footer),
    title: esc(`${person.name} — ${person.positioning.replace(/\.$/, '')}`),
    description: esc(`${person.name}, ${person.city}. ${person.intro}`),
  };
}
