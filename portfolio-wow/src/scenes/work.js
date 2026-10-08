// Scene 5 — Work (climax). A CSS 3D camera dollies forward through plates hanging in dark fog.
// The camera dwells at each plate's focal plane; sodium lamps pass overhead (drawn by the fog shader).
import { clamp, pinProgress, smooth } from '../core/util.js';

const P = 1000; // perspective, px (matches CSS)

export function createWork(root, { coarse }) {
  const plates = [...root.querySelectorAll('.plate')];
  const intro = root.querySelector('.work-intro');
  const n = plates.length;
  let D = 1400;
  const state = plates.map(() => ({ vis: false }));

  const dwell = (t) => t - Math.sin(2 * Math.PI * t) / (2 * Math.PI);

  function size(vw) {
    D = vw < 760 ? 1100 : 1400;
  }

  function update(F, S) {
    const sec = F.L.work;
    S.lamps = [];
    if (F.y < sec.top - F.vh || F.y > sec.top + sec.h) {
      if (state.some((s) => s.vis)) plates.forEach((pl, i) => ((pl.style.visibility = 'hidden'), (state[i].vis = false)));
      return;
    }
    const p = pinProgress(sec, F.y, F.vh);
    const s = p * (n + 0.65);
    const k = Math.floor(s);
    const cam = D * (k < n ? k + dwell(s - k) : n + (s - n));

    intro.style.opacity = (1 - smooth(0.01, 0.09, p)).toFixed(3);
    intro.style.transform = `translate3d(0, ${(-p * 300).toFixed(1)}px, 0)`;

    const side = F.vw < 760 ? 0.03 : 0.07;
    plates.forEach((pl, i) => {
      const z = -(i + 1) * D + cam;
      const fogA = Math.pow(smooth(-2.1 * D, -0.18 * D, z), 3);
      const passA = 1 - smooth(0.18 * D, 0.55 * D, z);
      const a = fogA * passA;
      const vis = a > 0.003 && z < P * 0.92;
      if (vis !== state[i].vis) {
        state[i].vis = vis;
        pl.style.visibility = vis ? 'visible' : 'hidden';
      }
      if (!vis) return;
      const dir = i % 2 ? 1 : -1;
      const x = dir * F.vw * side;
      const yy = (i % 2 ? -1 : 1) * F.vh * 0.025;
      pl.style.opacity = a.toFixed(3);
      pl.style.zIndex = String(10000 + Math.round(z));
      pl.style.transform = `translate(-50%, -50%) translate3d(${x.toFixed(1)}px, ${yy.toFixed(1)}px, ${z.toFixed(1)}px)`;
    });

    // lamps hang between plates, high and to the opposite side
    for (let j = 0; j <= n; j++) {
      const z = -(j + 0.55) * D + cam;
      if (z > P * 0.85 || z < -4 * D) continue;
      const scale = P / (P - z);
      const wx = (j % 2 ? -1 : 1) * F.vw * 0.36;
      const wy = -F.vh * 0.36;
      const a = smooth(-4 * D, -0.6 * D, z) * (1 - smooth(0.3 * D, 0.8 * D, z));
      S.lamps.push({
        x: F.vw * 0.5 + wx * scale,
        y: F.vh * 0.46 + wy * scale,
        r: clamp(70 * scale, 20, 900) * (coarse ? 0.9 : 1),
        a: a * 0.9,
        z,
      });
    }
    S.lamps.sort((a, b) => b.a - a.a);
  }

  return { size, update };
}
