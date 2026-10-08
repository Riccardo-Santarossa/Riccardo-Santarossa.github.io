// The route rail (a tram line with a stop per scene) and the sodium cursor point.
import { clamp, damp } from '../core/util.js';

export function createRail(nav) {
  const links = [...nav.querySelectorAll('a')];
  const dot = nav.querySelector('.rail-dot');
  let centers = [];
  let current = -1;
  let dy = 0;
  const ids = links.map((a) => a.getAttribute('href').slice(1));

  function measure() {
    const base = nav.getBoundingClientRect().top;
    centers = links.map((a) => {
      const r = a.getBoundingClientRect();
      return r.top - base + r.height / 2;
    });
  }

  function update(F) {
    const secs = ids.map((id) => F.L[id === 'top' ? 'hero' : id]);
    const y = F.y + F.vh * 0.35;
    let i = 0;
    while (i < secs.length - 1 && y >= secs[i + 1].top) i++;
    const next = secs[i + 1];
    const f = next ? clamp((y - secs[i].top) / (next.top - secs[i].top)) : 0;
    const target = next ? centers[i] + (centers[i + 1] - centers[i]) * f : centers[i];
    dy = damp(dy, target, 10, F.dt);
    dot.style.transform = `translate3d(0, ${(dy - 3.5).toFixed(1)}px, 0)`;
    if (i !== current) {
      if (links[current]) links[current].removeAttribute('aria-current');
      links[i].setAttribute('aria-current', 'location');
      current = i;
    }
  }
  return { measure, update };
}

export function createCursor(el, pointer) {
  let x = -100, y = -100, on = false;
  document.addEventListener('pointerover', (e) => {
    el.classList.toggle('link', !!e.target.closest('a, button'));
  });
  function update(F) {
    if (!pointer.fine) return;
    if (pointer.active !== on) {
      on = pointer.active;
      el.classList.toggle('on', on);
    }
    x = damp(x, pointer.x, 22, F.dt);
    y = damp(y, pointer.y, 22, F.dt);
    el.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0)`;
  }
  return { update };
}
