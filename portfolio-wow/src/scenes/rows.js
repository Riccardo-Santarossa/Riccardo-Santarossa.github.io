// Scene 2 — Rows. The points (see dots.js) become a pipeline; this module drives its timeline
// and lets the copy settle in once the rows are formed.
import { clamp, range, smooth } from '../core/util.js';

export function createRows(root) {
  const items = [...root.querySelectorAll('.rows-h, .rows-body, .rows-aside')];

  function update(F, S) {
    const { hero, rows } = F.L;
    const vh = F.vh;
    const start = hero.top + 0.48 * (hero.h - vh);
    const end = rows.top + 0.06 * (rows.h - vh);
    S.laneM = range(start, end, F.y);
    S.laneExit = range(rows.top + 0.8 * (rows.h - vh), rows.top + rows.h - vh * 0.35, F.y);

    if (F.y > rows.top - vh && F.y < rows.top + rows.h) {
      items.forEach((el, i) => {
        const a = smooth(0.55 + i * 0.12, 1 + i * 0.12, S.laneM + range(rows.top, rows.top + (rows.h - vh) * 0.3, F.y));
        el.style.opacity = a.toFixed(3);
        el.style.transform = `translate3d(0, ${((1 - a) * 2.4).toFixed(2)}rem, 0)`;
      });
    }
  }
  return { update };
}
