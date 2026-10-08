// The journey: one rAF loop, one layout cache, every scene reads the same frame.
import { createScroll } from './core/scroll.js';
import { readTokens } from './core/tokens.js';
import { docRect, clamp } from './core/util.js';
import { createFog } from './scenes/fog.js';
import { createDots, sampleGlyphs } from './scenes/dots.js';
import { createHero } from './scenes/hero.js';
import { createRows } from './scenes/rows.js';
import { createTurn } from './scenes/turn.js';
import { createCraft } from './scenes/craft.js';
import { createWork } from './scenes/work.js';
import { createRoute } from './scenes/route.js';
import { createContact } from './scenes/contact.js';
import { createEnv } from './scenes/env.js';
import { createRail, createCursor } from './scenes/chrome.js';

const $ = (s) => document.querySelector(s);
const INTRO_MS = 2600;

export async function start() {
  const html = document.documentElement;
  const coarse = matchMedia('(pointer: coarse)').matches || Math.min(innerWidth, innerHeight) < 600;
  const T = readTokens();

  // Fonts must be ready before measuring glyphs; never wait forever.
  await Promise.race([
    Promise.all([
      document.fonts.load('800 100px "Anybody Variable"', 'Riccardo Santarossa hello'),
      document.fonts.load('400 20px "Newsreader Variable"'),
    ]).then(() => document.fonts.ready),
    new Promise((r) => setTimeout(r, 2500)),
  ]);

  const { lenis } = createScroll();
  const fog = createFog($('.fog'), { coarse });
  if (!fog) $('.fog').style.display = 'none';
  const dots = createDots($('.dots'), { coarse, inkHex: T.hex.inchiostro, accentHex: T.hex.sodio });

  const sec = {
    hero: $('#top'),
    rows: $('#rows'),
    turn: $('#turn'),
    craft: $('#craft'),
    work: $('#work'),
    route: $('#route'),
    contact: $('#contact'),
  };
  const hero = createHero(sec.hero);
  const rows = createRows(sec.rows);
  const turn = createTurn(sec.turn, { coarse });
  const craft = createCraft(sec.craft);
  const work = createWork(sec.work, { coarse });
  const route = createRoute(sec.route);
  const contact = createContact();
  const env = createEnv(T);
  const rail = createRail($('.rail'));

  const pointer = { x: -999, y: -999, active: false, fine: matchMedia('(pointer: fine)').matches };
  const cursor = createCursor($('.cursor'), pointer);
  addEventListener('pointermove', (e) => {
    pointer.x = e.clientX;
    pointer.y = e.clientY;
    pointer.active = true;
    if (e.pointerType === 'mouse') pointer.fine = true;
  }, { passive: true });
  document.addEventListener('pointerleave', () => (pointer.active = false));
  addEventListener('blur', () => (pointer.active = false));

  const L = {};
  let vw = innerWidth, vh = innerHeight;

  function sampleTargets() {
    const heroPin = sec.hero.querySelector('.pin');
    const chars = [...sec.hero.querySelectorAll('.hero-name .ch')];
    const pinTop0 = heroPin.getBoundingClientRect().top;
    html.classList.add('measuring-rest');
    dots.setNameRest(sampleGlyphs(chars, { originTop: pinTop0, stretch: 'expanded', weight: 800 }));
    html.classList.remove('measuring-rest');
    html.classList.add('measuring');
    dots.setNameComp(sampleGlyphs(chars, { originTop: pinTop0, stretch: 'ultra-condensed', weight: 900, step: 2 }));
    html.classList.remove('measuring');

    const cPin = sec.contact.querySelector('.pin');
    const hChars = [...sec.contact.querySelectorAll('.hello .ch')];
    dots.setHello(
      sampleGlyphs(hChars, { originTop: cPin.getBoundingClientRect().top, stretch: 'extra-expanded', weight: 820, step: coarse ? 2 : 3 }),
    );
  }

  function layout() {
    vw = innerWidth;
    vh = innerHeight;
    craft.size(vw, vh);
    craft.metrics();
    work.size(vw);
    for (const k in sec) L[k] = docRect(sec[k]);
    route.measure(vh);
    env.measure(L, vh);
    rail.measure();
    hero.measure();
    fog?.resize();
    dots.resize();
    sampleTargets();
  }
  layout();

  let lastW = vw, lastH = vh, rt;
  addEventListener('resize', () => {
    clearTimeout(rt);
    rt = setTimeout(() => {
      // mobile URL-bar show/hide only nudges height: keep particles, just re-measure
      if (innerWidth === lastW && Math.abs(innerHeight - lastH) < 140) {
        vh = innerHeight;
        for (const k in sec) L[k] = docRect(sec[k]);
        env.measure(L, vh);
        return;
      }
      lastW = innerWidth;
      lastH = innerHeight;
      layout();
      lenis.resize();
    }, 160);
  });

  // Intro: points condense into the name (only when the page opens at the top).
  const t0 = performance.now();
  const skipIntro = scrollY > vh * 0.5;
  let formed = false;
  let formedAt = 0;
  const S = { nameA: 0, laneM: 0, laneExit: 0, hello: 0, contactTop: 0, lamps: [] };

  let prevT = performance.now();
  let prevY = scrollY;
  let vel = 0;

  function frame(now) {
    lenis.raf(now);
    const dt = clamp((now - prevT) / 1000, 0.001, 0.05);
    prevT = now;
    const y = scrollY;
    const v = (y - prevY) / vh / dt;
    prevY = y;
    vel += (v - vel) * (1 - Math.exp(-dt * 6));
    const time = now / 1000;

    let intro = skipIntro ? 1 : clamp((now - t0) / INTRO_MS);
    if (!formed && intro >= 1) {
      formed = true;
      formedAt = now;
      html.classList.add('formed');
      hero.setFormed(true);
    }
    const introFade = formed ? clamp(1 - (now - formedAt) / 700) * (skipIntro ? 0 : 1) : 1;

    const F = { y, vw, vh, dt, time, vel, pointer, L };
    hero.update(F, S);
    rows.update(F, S);
    turn.update(F);
    craft.update(F);
    work.update(F, S);
    route.update(F);
    contact.update(F, S);
    rail.update(F);
    cursor.update(F);

    const g = env.update(F);
    if (fog) {
      fog.render({
        time,
        travel: y / vh,
        density: g.density,
        dark: g.dark,
        ground: g.ground,
        sodium: T.sodio,
        lamps: S.lamps,
      });
    } else {
      document.body.style.backgroundColor = `rgb(${g.ground.map((c) => Math.round(c * 255)).join(',')})`;
    }

    const heroTop = Math.min(Math.max(L.hero.top - y, 0), L.hero.top + L.hero.h - vh - y);
    dots.render({
      dt,
      time,
      vel,
      pointer,
      intro,
      introFade,
      heroTop,
      nameA: S.nameA,
      laneM: S.laneM,
      laneExit: S.laneExit,
      hello: S.hello,
      contactTop: S.contactTop,
    });

    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);

  // debugging/QA hook (harmless in production)
  window.__journey = { L, dots, lenis };
}
