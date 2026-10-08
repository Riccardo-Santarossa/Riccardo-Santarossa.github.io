// The ground under everything: colour, fog density and darkness interpolated along the scroll.
// Also flips the fixed chrome (bar, rail) between ink and lime-wash.
import { luminance, mixRgb, smooth, hexToRgb } from '../core/util.js';

export function createEnv(T) {
  let stops = [];
  const html = document.documentElement;
  let chromeDark = null;
  const out = { ground: T.nebbia, density: 0.5, dark: 0 };

  function measure(L, vh) {
    const { hero, rows, turn, craft, work, route, contact } = L;
    const mid = mixRgb(T.nebbia, T.peltro, 0.45);
    const craftEnd = craft.top + craft.h - vh;
    const workEnd = work.top + work.h - vh;
    stops = [
      [hero.top, T.nebbia, 0.5, 0],
      [hero.top + hero.h - vh, mid, 0.62, 0],
      [rows.top + rows.h - vh, mid, 0.66, 0],
      [turn.top, T.peltro, 0.95, 0],
      [turn.top + turn.h - vh, T.peltro, 0.9, 0],
      [craft.top, mixRgb(T.peltro, T.nebbia, 0.2), 0.55, 0],
      [craftEnd, mixRgb(T.peltro, T.nebbia, 0.1), 0.6, 0],
      [work.top - vh * 0.1, T.naviglio, 0.85, 1],
      [workEnd, T.naviglio, 0.9, 1],
      [route.top + vh * 0.35, mixRgb(T.peltro, T.schiarita, 0.35), 0.5, 0],
      [contact.top - vh * 0.2, T.schiarita, 0.28, 0],
      [contact.top + contact.h, T.schiarita, 0.06, 0],
    ];
  }

  function update(F) {
    const y = F.y;
    let i = 0;
    while (i < stops.length - 2 && y > stops[i + 1][0]) i++;
    const a = stops[i], b = stops[i + 1];
    const t = smooth(a[0], b[0], y);
    out.ground = mixRgb(a[1], b[1], t);
    out.density = a[2] + (b[2] - a[2]) * t;
    out.dark = a[3] + (b[3] - a[3]) * t;
    const dark = luminance(out.ground) < 0.42;
    if (dark !== chromeDark) {
      chromeDark = dark;
      html.style.setProperty('--chrome', dark ? 'var(--calce)' : 'var(--inchiostro)');
    }
    return out;
  }

  return { measure, update };
}
