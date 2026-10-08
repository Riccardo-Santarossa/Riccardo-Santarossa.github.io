// Scene 7 — Contact. Drives the last convergence of the points into "hello" as the fog clears.
import { pinTop, range } from '../core/util.js';

export function createContact() {
  function update(F, S) {
    const sec = F.L.contact;
    S.contactTop = pinTop(sec, F.y, F.vh);
    S.hello = F.y < sec.top - F.vh ? 0 : range(sec.top - F.vh * 0.65, sec.top + (sec.h - F.vh) * 0.72, F.y);
  }
  return { update };
}
