// Scene 1 — Condense. Name breathes on the width axis around the pointer, then is compressed
// (wdth 125 → 50) by scroll and handed to the points.
import { damp, lerp, smooth, pinProgress } from '../core/util.js';

export function createHero(root) {
  const chars = [...root.querySelectorAll('.hero-name .ch')];
  const lines = root.querySelector('.hero-lines');
  const meta = root.querySelector('.hero-meta');
  const cue = root.querySelector('.hero-cue');
  const cur = chars.map(() => ({ s: 125, w: 800, applied: '' }));
  let centers = [];
  let formed = false;

  function measure() {
    centers = chars.map((c) => {
      const r = c.getBoundingClientRect();
      return { x: r.left + r.width / 2, line: c.parentElement.classList.contains('l2') ? 1 : 0 };
    });
  }

  function update(F, S) {
    const p = pinProgress(F.L.hero, F.y, F.vh);
    const comp = smooth(0, 0.32, p);
    S.nameA = smooth(0.34, 0.46, p);

    if (F.y < F.L.hero.top + F.L.hero.h) {
      const sigma = F.vw * 0.075;
      const pointerHere = F.pointer.active && F.pointer.fine;
      chars.forEach((c, i) => {
        let ts = 125, tw = 800;
        if (formed) {
          if (pointerHere) {
            const dx = F.pointer.x - centers[i].x;
            const g = Math.exp(-(dx * dx) / (2 * sigma * sigma));
            ts = 108 + 42 * g;
            tw = 760 + 140 * g;
          } else {
            const amp = F.vw < 760 ? 5 : 12;
            ts = 125 + amp * Math.sin(F.time * 0.9 - i * 0.42);
            tw = 800 + 60 * Math.sin(F.time * 0.9 - i * 0.42);
          }
        }
        ts = lerp(ts, 50, comp);
        tw = lerp(tw, 900, comp);
        const o = cur[i];
        o.s = comp > 0 ? lerp(damp(o.s, ts, 8, F.dt), ts, comp) : damp(o.s, ts, 8, F.dt);
        o.w = comp > 0 ? lerp(damp(o.w, tw, 8, F.dt), tw, comp) : damp(o.w, tw, 8, F.dt);
        const v = o.s.toFixed(1) + '|' + Math.round(o.w);
        if (v !== o.applied) {
          o.applied = v;
          c.style.fontStretch = o.s.toFixed(1) + '%';
          c.style.fontWeight = Math.round(o.w);
        }
      });
      lines.style.setProperty('--name-a', (1 - S.nameA).toFixed(3));
      const m = 1 - smooth(0.03, 0.2, p);
      meta.style.opacity = formed ? m : '';
      meta.style.transform = `translateY(${(-p * 60).toFixed(1)}px)`;
      cue.style.opacity = formed ? 1 - smooth(0, 0.06, p) : '';
    }
  }

  return {
    measure,
    update,
    setFormed(v) {
      formed = v;
    },
  };
}
