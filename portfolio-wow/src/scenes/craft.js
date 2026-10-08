// Scene 4 — Craft. Horizontal pan through four giant words; each word's width axis opens as it
// reaches the centre, and its construction lines + live axis values draw themselves around it.
import { clamp, pinProgress, settle } from '../core/util.js';

export function createCraft(root) {
  const section = root;
  const track = root.querySelector('.craft-track');
  const items = [...root.querySelectorAll('.craft-item')].map((li) => ({
    li,
    word: li.querySelector('.craft-word'),
    wdth: li.querySelector('.v-wdth'),
    wght: li.querySelector('.v-wght'),
    dim: li.querySelector('.g-dim-v'),
    left: 0,
    w: 0,
    last: '',
  }));
  let dist = 0;

  // Section height = horizontal distance + one viewport, so the pan maps 1:1 to scroll.
  function size(vw, vh) {
    track.style.transform = 'none';
    dist = Math.max(0, track.scrollWidth - vw);
    section.style.height = `${Math.round(dist + vh)}px`;
    items.forEach((it) => {
      it.left = it.li.offsetLeft;
      it.w = it.li.offsetWidth;
    });
  }

  // Real font metrics → guide positions (cap height and baseline, in em).
  function metrics() {
    const c = document.createElement('canvas').getContext('2d');
    c.font = `800 100px "Anybody Variable"`;
    const m = c.measureText('H');
    const asc = m.fontBoundingBoxAscent, desc = m.fontBoundingBoxDescent;
    if (!asc) return;
    const half = (100 - (asc + desc)) / 2; // line-height: 1
    section.style.setProperty('--base-top', ((half + asc) / 100).toFixed(4) + 'em');
    section.style.setProperty('--cap-top', ((half + asc - m.actualBoundingBoxAscent) / 100).toFixed(4) + 'em');
  }

  function update(F) {
    const sec = F.L.craft;
    if (F.y < sec.top - F.vh || F.y > sec.top + sec.h) return;
    const p = pinProgress(sec, F.y, F.vh);
    const x = -p * dist;
    track.style.transform = `translate3d(${x.toFixed(1)}px,0,0)`;
    const mid = F.vw * 0.5;
    const reads = [];
    items.forEach((it) => {
      const center = it.left + x + it.w * 0.32;
      const k = settle(clamp(1 - Math.abs(center - mid) / (F.vw * 0.62)));
      const wdth = 50 + 85 * k;
      const wght = Math.round(380 + 470 * k);
      const key = wdth.toFixed(1) + '|' + wght;
      if (key === it.last) return;
      it.last = key;
      it.word.style.fontStretch = wdth.toFixed(1) + '%';
      it.word.style.fontWeight = wght;
      it.li.style.setProperty('--k', k.toFixed(3));
      it.wdth.textContent = wdth.toFixed(1);
      it.wght.textContent = wght;
      if (k > 0.02) reads.push(it);
    });
    // one layout read per frame, after all writes
    reads.forEach((it) => (it.dim.textContent = `${Math.round(it.word.offsetWidth)} px`));
  }

  return { size, metrics, update };
}
