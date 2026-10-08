import Lenis from 'lenis';
import { clamp } from './util.js';

// Smoothness layered over native scroll: wheel/trackpad get inertia, touch stays native,
// keyboard, anchors and the back button keep working.
export function createScroll() {
  const lenis = new Lenis({ lerp: 0.085, wheelMultiplier: 0.9, autoRaf: false });

  const ease = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
  const goTo = (hash, { push = true } = {}) => {
    const target = hash && hash !== '#' ? document.querySelector(hash) : null;
    const y = target ? target.getBoundingClientRect().top + window.scrollY : 0;
    const dist = Math.abs(y - window.scrollY) / window.innerHeight;
    lenis.scrollTo(y, { duration: clamp(0.9 + dist * 0.16, 0.9, 3.2), easing: ease, force: true });
    if (push && location.hash !== hash) history.pushState(null, '', hash || location.pathname);
    if (target) {
      if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex', '-1');
      target.focus({ preventScroll: true });
    }
  };

  document.addEventListener('click', (e) => {
    const a = e.target.closest('a[href^="#"]');
    if (!a || e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey) return;
    e.preventDefault();
    goTo(a.getAttribute('href'));
  });
  window.addEventListener('popstate', () => goTo(location.hash || '#top', { push: false }));

  return { lenis, goTo };
}
