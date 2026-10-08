// Scene 6 — Route. Sticky sheets (pure CSS) stack; JS only makes the covered sheet recede.
export function createRoute(root) {
  const sheets = [...root.querySelectorAll('.sheet')];
  let nat = [], stick = [];

  function measure(vh) {
    sheets.forEach((s) => (s.style.position = 'static'));
    nat = sheets.map((s) => s.getBoundingClientRect().top + window.scrollY);
    sheets.forEach((s) => (s.style.position = ''));
    stick = sheets.map((s) => parseFloat(getComputedStyle(s).top) || 0);
  }

  function update(F) {
    const sec = F.L.route;
    if (F.y < sec.top - F.vh || F.y > sec.top + sec.h) return;
    sheets.forEach((s, i) => {
      if (i === sheets.length - 1) return;
      const nextTop = nat[i + 1] - F.y;
      const c = Math.min(1, Math.max(0, 1 - (nextTop - stick[i + 1]) / (F.vh * 0.75)));
      s.style.transform = `scale(${(1 - c * 0.06).toFixed(4)})`;
      s.style.filter = c > 0.01 ? `brightness(${(1 - c * 0.12).toFixed(3)})` : '';
    });
  }
  return { measure, update };
}
