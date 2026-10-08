// Code-generated project covers (build time, deterministic). No images, no third-party assets.
// Each returns an inline <svg> string, viewBox 400×500.

const C = {
  fog: '#D3D7D0',
  pewter: '#AEB3AC',
  canal: '#1F2A28',
  clear: '#E3E8E8',
  ink: '#17201E',
  lime: '#E9ECE6',
  sodium: '#FF9A1A',
};

function rng(seed) {
  let s = seed >>> 0;
  return () => {
    s = (s + 0x6d2b79f5) >>> 0;
    let t = s;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const wrap = (inner, bg, label) =>
  `<svg class="cover" viewBox="0 0 400 500" role="img" aria-label="${label}" xmlns="http://www.w3.org/2000/svg"><rect width="400" height="500" fill="${bg}"/>${inner}</svg>`;

function tram() {
  // A night tram line: one route, eight stops, one lit stop, a huge numeral.
  const pts = [
    [40, 430], [90, 420], [140, 380], [170, 320], [230, 290], [290, 300], [330, 240], [350, 160], [360, 70],
  ];
  const d = 'M' + pts.map((p) => p.join(' ')).join(' L ');
  const stops = pts
    .slice(1, -1)
    .map(([x, y], i) =>
      i === 4
        ? `<circle cx="${x}" cy="${y}" r="9" fill="${C.sodium}"/><circle cx="${x}" cy="${y}" r="20" fill="none" stroke="${C.sodium}" stroke-width="1.5" opacity=".6"/>`
        : `<circle cx="${x}" cy="${y}" r="7" fill="${C.canal}" stroke="${C.lime}" stroke-width="3"/>`,
    )
    .join('');
  return wrap(
    `<text x="22" y="250" font-family="Anybody Variable, sans-serif" font-size="330" font-weight="900" font-stretch="62%" fill="${C.lime}" opacity=".1">9</text>
     <path d="${d}" fill="none" stroke="${C.lime}" stroke-width="10" stroke-linejoin="round" stroke-linecap="round"/>
     ${stops}
     <text x="28" y="66" font-family="Anybody Variable, sans-serif" font-size="58" font-weight="800" font-stretch="125%" fill="${C.lime}">9</text>`,
    C.canal,
    'Cover: a tram route line with stops, one stop lit in amber',
  );
}

function garden() {
  // Plots on a grid; each plot a different seedling of the same modular mark.
  const r = rng(11);
  let out = '';
  const cols = 5, rows = 6, cw = 64, ch = 66, ox = 40, oy = 42;
  for (let j = 0; j < rows; j++) {
    for (let i = 0; i < cols; i++) {
      const x = ox + i * cw, y = oy + j * ch;
      const k = Math.floor(r() * 4);
      const lit = i === 3 && j === 2;
      const f = lit ? C.sodium : C.ink;
      if (k === 0) out += `<circle cx="${x + 26}" cy="${y + 28}" r="${10 + r() * 12}" fill="${f}"/>`;
      else if (k === 1) out += `<path d="M${x + 6} ${y + 52} Q ${x + 26} ${y - 4} ${x + 46} ${y + 52} Z" fill="${f}"/>`;
      else if (k === 2) out += `<rect x="${x + 8}" y="${y + 10}" width="36" height="40" rx="18" fill="none" stroke="${f}" stroke-width="5"/>`;
      else out += `<path d="M${x + 26} ${y + 52} V ${y + 10} M${x + 26} ${y + 30} q 16 -4 18 -20 M${x + 26} ${y + 38} q -16 -4 -18 -18" fill="none" stroke="${f}" stroke-width="5" stroke-linecap="round"/>`;
    }
  }
  return wrap(out, C.fog, 'Cover: a grid of small plant-like marks, one in amber');
}

function grid() {
  // "ROW" drawn only with table cells.
  const glyphs = {
    R: ['11110', '10001', '10001', '11110', '10100', '10010', '10001'],
    O: ['01110', '10001', '10001', '10001', '10001', '10001', '01110'],
    W: ['10001', '10001', '10001', '10101', '10101', '11011', '10001'],
  };
  const cell = 21, gap = 0, ox = 22, oy = 140;
  let lines = '';
  for (let x = 0; x <= 400; x += cell) lines += `<line x1="${x}" y1="0" x2="${x}" y2="500" stroke="${C.ink}" stroke-width=".6" opacity=".18"/>`;
  for (let y = 0; y <= 500; y += cell) lines += `<line x1="0" y1="${y}" x2="400" y2="${y}" stroke="${C.ink}" stroke-width=".6" opacity=".18"/>`;
  let cells = '';
  'ROW'.split('').forEach((ch, gi) => {
    glyphs[ch].forEach((row, j) =>
      row.split('').forEach((b, i) => {
        if (b === '1') {
          const x = ox + (gi * 6 + i) * cell, y = oy + j * cell;
          const lit = ch === 'O' && j === 3 && i === 4;
          cells += `<rect x="${x + gap}" y="${y + gap}" width="${cell}" height="${cell}" fill="${lit ? C.sodium : C.ink}"/>`;
        }
      }),
    );
  });
  return wrap(lines + cells, C.clear, 'Cover: the letters ROW built from filled table cells');
}

function weather() {
  // Fog days drawn as soft horizontal strokes, a year read top to bottom.
  const r = rng(29);
  let out = '';
  for (let m = 0; m < 12; m++) {
    const y = 60 + m * 34;
    const n = Math.round(4 + (Math.cos(((m - 0.5) / 12) * Math.PI * 2) * 0.5 + 0.5) * 18 + r() * 4);
    for (let d = 0; d < n; d++) {
      const x = 40 + d * 12.5;
      const lit = m === 10 && d === n - 1;
      out += `<rect x="${x}" y="${y}" width="9" height="${lit ? 14 : 6 + r() * 8}" rx="3" fill="${lit ? C.sodium : C.lime}" opacity="${lit ? 1 : 0.35 + r() * 0.5}"/>`;
    }
  }
  return wrap(out, C.ink, 'Cover: rows of short soft strokes, one per foggy day, one in amber');
}

export const covers = { tram, garden, grid, weather };
