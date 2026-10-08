// The points. One population travels the whole page: fog → name → pipeline rows → fog → "hello".
import { clamp, lerp, smooth, settle, drift, rng } from '../core/util.js';

/**
 * Rasterise glyph spans into a list of candidate points, in coordinates relative to `originTop`.
 * Each span is drawn at its own measured box, so the result matches the DOM layout.
 */
export function sampleGlyphs(spans, { originTop, stretch, weight, step = 3 }) {
  const vw = window.innerWidth;
  const vh = Math.max(window.innerHeight, 1);
  const c = document.createElement('canvas');
  c.width = vw;
  c.height = vh;
  const g = c.getContext('2d', { willReadFrequently: true });
  g.fillStyle = '#000';
  g.textBaseline = 'alphabetic';
  spans.forEach((s) => {
    const r = s.getBoundingClientRect();
    const size = parseFloat(getComputedStyle(s).fontSize);
    g.font = `${stretch} ${weight} ${size}px "Anybody Variable"`;
    if ('fontStretch' in g) g.fontStretch = stretch;
    const m = g.measureText(s.textContent);
    const asc = m.fontBoundingBoxAscent ?? size * 0.9;
    const desc = m.fontBoundingBoxDescent ?? size * 0.25;
    const base = r.top - originTop + (r.height - (asc + desc)) / 2 + asc;
    g.fillText(s.textContent, r.left, base);
  });
  const data = g.getImageData(0, 0, vw, vh).data;
  const pts = [];
  const r = rng(7);
  for (let y = 0; y < vh; y += step) {
    for (let x = 0; x < vw; x += step) {
      if (data[(y * vw + x) * 4 + 3] > 140) pts.push(x + (r() - 0.5) * step, y + (r() - 0.5) * step);
    }
  }
  return pts;
}

export function createDots(canvas, { coarse, inkHex, accentHex }) {
  const ctx = canvas.getContext('2d');
  const r = rng(42);
  let vw = 1, vh = 1, dpr = 1, N = 0;
  let x, y, sx, sy, ax, ay, bx, by, hx, hy, cx, cy, ox, oy, lane, u, spd, jit, del, acc;
  let lastAlpha = 0;
  const LANES = 9;

  function alloc() {
    const area = vw * vh;
    N = Math.round(clamp(area / (coarse ? 380 : 560), coarse ? 700 : 1400, coarse ? 1100 : 2400));
    const F = () => new Float32Array(N);
    [x, y, sx, sy, ax, ay, bx, by, hx, hy, cx, cy, ox, oy, u, spd, jit, del] = Array.from({ length: 18 }, F);
    lane = new Uint8Array(N);
    acc = new Uint8Array(N);
    for (let i = 0; i < N; i++) {
      sx[i] = r() * vw;
      sy[i] = r() * vh;
      cx[i] = r() * vw;
      cy[i] = r() * vh;
      x[i] = sx[i];
      y[i] = sy[i];
      lane[i] = Math.floor(r() * LANES);
      u[i] = r();
      spd[i] = 0.045 + r() * 0.03 + (lane[i] % 3) * 0.008;
      jit[i] = r() - 0.5;
      del[i] = r();
      acc[i] = r() < 0.022 ? 1 : 0;
    }
  }

  function resize() {
    vw = window.innerWidth;
    vh = canvas.clientHeight || window.innerHeight;
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(vw * dpr);
    canvas.height = Math.round(vh * dpr);
    alloc();
  }

  // Assign sampled candidate points to particles (random, so every glyph gets an even share).
  function assign(pts, tx, ty) {
    const n = pts.length / 2;
    if (!n) return;
    for (let i = 0; i < N; i++) {
      const k = Math.floor(r() * n) * 2;
      tx[i] = pts[k];
      ty[i] = pts[k + 1];
    }
  }
  const setNameRest = (pts) => assign(pts, ax, ay);
  const setNameComp = (pts) => assign(pts, bx, by);
  const setHello = (pts) => assign(pts, hx, hy);

  // Pipeline: chaos on the left, a narrow merge, clean parallel rows on the right.
  function lanePoint(i, out) {
    const t = u[i];
    const l = lane[i];
    const bandTop = vh * (coarse ? 0.13 : 0.12);
    const bandH = vh * (coarse ? 0.36 : 0.46);
    const y0 = (l + 0.5) / LANES;
    const chaos = clamp(y0 + 0.2 * Math.sin(t * 9 + l * 1.7) + 0.09 * Math.sin(t * 23 + l * 4.1), -0.05, 1.05);
    const merge = 0.5 + (y0 - 0.5) * 0.12;
    const row = 0.12 + 0.76 * (l / (LANES - 1));
    const a = smooth(0.22, 0.44, t);
    const b = smooth(0.5, 0.7, t);
    const yy = lerp(lerp(chaos, merge, a), row, b);
    const loose = 1 - smooth(0.32, 0.6, t);
    out[0] = (-0.04 + 1.08 * t) * vw;
    out[1] = bandTop + bandH * (yy + jit[i] * 0.16 * loose);
  }

  const tmp = [0, 0];

  /**
   * f: { dt, time, vel, pointer:{x,y,active},
   *      intro (0..1, time based), introFade (alpha after intro),
   *      heroTop, nameA, laneM, laneExit, hello, contactTop }
   */
  function render(f) {
    let mode = 0, alpha = 0;
    if (f.hello > 0) {
      mode = 3;
      alpha = smooth(0, 0.18, f.hello);
    } else if (f.intro < 1 || f.introFade > 0) {
      mode = 1;
      alpha = f.intro < 1 ? 1 : f.introFade;
    } else if (f.nameA > 0 || f.laneM > 0) {
      mode = 2;
      alpha = clamp(f.nameA + f.laneM * 2) * (1 - smooth(0.4, 1, f.laneExit));
    }

    if (alpha <= 0.002) {
      if (lastAlpha > 0) ctx.clearRect(0, 0, canvas.width, canvas.height);
      lastAlpha = 0;
      return;
    }
    const snap = lastAlpha <= 0.002;
    lastAlpha = alpha;
    const k = snap ? 1 : 1 - Math.exp(-f.dt * 11);
    const boost = 1 + Math.min(Math.abs(f.vel) * 2.2, 7);
    const px = f.pointer.x, py = f.pointer.y, pOn = f.pointer.active && mode >= 2;
    const R = coarse ? 70 : 110;

    for (let i = 0; i < N; i++) {
      let tx, ty;
      if (mode === 1) {
        const e = settle(clamp((f.intro - del[i] * 0.45) / 0.55));
        const wob = (1 - e) * 18;
        tx = lerp(sx[i], ax[i], e) + Math.sin(f.time * 1.3 + del[i] * 40) * wob;
        ty = lerp(sy[i], ay[i] + f.heroTop, e) + Math.cos(f.time * 1.1 + del[i] * 30) * wob;
        x[i] = tx;
        y[i] = ty;
        continue;
      } else if (mode === 2) {
        u[i] = (u[i] + spd[i] * f.dt * boost * (0.4 + f.laneM * 0.6)) % 1;
        lanePoint(i, tmp);
        const m = drift(clamp((f.laneM - del[i] * 0.45) / 0.55));
        tx = lerp(bx[i], tmp[0], m);
        ty = lerp(by[i] + f.heroTop, tmp[1], m);
        if (f.laneExit > 0) {
          const e = f.laneExit * f.laneExit;
          ty -= e * vh * (0.15 + del[i] * 0.5);
          tx += e * jit[i] * vw * 0.3;
        }
      } else {
        const h = settle(clamp((f.hello - del[i] * 0.4) / 0.6));
        const fx = cx[i] + Math.sin(f.time * 0.35 + del[i] * 50) * 40;
        const fy = cy[i] + Math.cos(f.time * 0.3 + del[i] * 70) * 40;
        tx = lerp(fx, hx[i], h);
        ty = lerp(fy, hy[i] + f.contactTop, h);
      }

      // pointer field: points step aside, then spring back
      let gx = 0, gy = 0;
      if (pOn) {
        const dx = tx - px, dy = ty - py;
        const d2 = dx * dx + dy * dy;
        if (d2 < R * R) {
          const d = Math.sqrt(d2) || 1;
          const push = (1 - d / R) * (1 - d / R) * R * 0.9;
          gx = (dx / d) * push;
          gy = (dy / d) * push;
        }
      }
      ox[i] += (gx - ox[i]) * (snap ? 1 : 1 - Math.exp(-f.dt * 9));
      oy[i] += (gy - oy[i]) * (snap ? 1 : 1 - Math.exp(-f.dt * 9));
      x[i] += (tx + ox[i] - x[i]) * k;
      y[i] += (ty + oy[i] - y[i]) * k;
    }

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, vw, vh);
    ctx.globalAlpha = alpha;
    const s = coarse ? 2.1 : 1.8;
    ctx.fillStyle = inkHex;
    for (let i = 0; i < N; i++) if (!acc[i]) ctx.fillRect(x[i] - s / 2, y[i] - s / 2, s, s);
    ctx.fillStyle = accentHex;
    const sa = s * 1.6;
    for (let i = 0; i < N; i++) if (acc[i]) ctx.fillRect(x[i] - sa / 2, y[i] - sa / 2, sa, sa);
  }

  resize();
  return { resize, render, setNameRest, setNameComp, setHello, get count() { return N; } };
}
