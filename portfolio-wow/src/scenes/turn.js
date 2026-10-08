// Scene 3 — Turn. A focus pull: each word racks from fog-blur to sharp as you scroll.
import { pinProgress, smooth } from '../core/util.js';

export function createTurn(root, { coarse }) {
  const words = [...root.querySelectorAll('.turn-sentence .w')];
  const n = words.length;
  const last = words.map(() => -1);

  function update(F) {
    const sec = F.L.turn;
    if (F.y < sec.top - F.vh || F.y > sec.top + sec.h) return;
    // starts racking slightly before the pin so the first words are never blank
    const p = pinProgress({ top: sec.top - F.vh * 0.4, h: sec.h + F.vh * 0.4 }, F.y, F.vh);
    words.forEach((w, i) => {
      const s = 0.04 + (i / n) * 0.62;
      const f = smooth(s, s + 0.2, p);
      const q = Math.round(f * 100);
      if (q === last[i]) return;
      last[i] = q;
      w.style.opacity = (0.1 + 0.9 * f).toFixed(3);
      if (!coarse) w.style.filter = f > 0.995 ? 'none' : `blur(${((1 - f) * 14).toFixed(2)}px)`;
      w.style.transform = `scale(${(1 + (1 - f) * 0.06).toFixed(4)})`;
    });
  }
  return { update };
}
