export const clamp = (v, a = 0, b = 1) => (v < a ? a : v > b ? b : v);
export const lerp = (a, b, t) => a + (b - a) * t;
export const range = (a, b, v) => clamp((v - a) / (b - a));
export const smooth = (a, b, v) => {
  const t = range(a, b, v);
  return t * t * (3 - 2 * t);
};
// motion tokens as functions (mirror --ease-settle / --ease-drift)
export const settle = (t) => (t >= 1 ? 1 : 1 - Math.pow(2, -10 * t));
export const drift = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
// frame-rate independent smoothing toward a target
export const damp = (cur, target, lambda, dt) => lerp(cur, target, 1 - Math.exp(-lambda * dt));

export const hexToRgb = (hex) => {
  const h = hex.replace('#', '').trim();
  const n = parseInt(h.length === 3 ? h.replace(/./g, '$&$&') : h, 16);
  return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255];
};
export const mixRgb = (a, b, t) => [lerp(a[0], b[0], t), lerp(a[1], b[1], t), lerp(a[2], b[2], t)];
export const luminance = (c) => 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];

export function rng(seed = 1) {
  let s = seed >>> 0;
  return () => {
    s = (s + 0x6d2b79f5) >>> 0;
    let t = s;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Absolute document geometry of an element (read once per layout, never per frame).
export const docRect = (el) => {
  const r = el.getBoundingClientRect();
  return { top: r.top + window.scrollY, h: r.height, left: r.left, w: r.width };
};

// Viewport top of a sticky 100vh pin inside a section, from scroll position only.
export const pinTop = (sec, y, vh) => Math.min(Math.max(sec.top - y, 0), sec.top + sec.h - vh - y);
// Progress through a pinned section (0 when it pins, 1 when it releases).
export const pinProgress = (sec, y, vh) => clamp((y - sec.top) / Math.max(1, sec.h - vh));
