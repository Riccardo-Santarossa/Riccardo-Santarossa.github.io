import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export type Mode = 'pro' | 'weird';

// Mirrors the [data-mode] blocks in app/globals.css, so GSAP can tween between them.
const MODES: Record<Mode, Record<string, string | number>> = {
  pro: {
    '--ground': '#efe7d6', '--ink': '#36454f', '--ink-soft': '#4c5860', '--panel': '#e3d8c1', '--panel-ink': '#36454f',
    '--sheet-1': '#e6dcc6', '--sheet-2': '#ddd1b8', '--sheet-3': '#d3c6ab',
    '--soft': 0, '--wonk': 0, '--wght-d': 430, '--weird': 0,
  },
  weird: {
    '--ground': '#36454f', '--ink': '#efe7d6', '--ink-soft': '#cac7bb', '--panel': '#c0532e', '--panel-ink': '#efe7d6',
    '--sheet-1': '#3e4e59', '--sheet-2': '#465763', '--sheet-3': '#4f616d',
    '--soft': 100, '--wonk': 1, '--wght-d': 820, '--weird': 1,
  },
};

export const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export function currentMode(): Mode {
  return document.documentElement.dataset.mode === 'weird' ? 'weird' : 'pro';
}

let running: gsap.core.Tween | null = null;

export function morphTo(mode: Mode) {
  const root = document.documentElement;
  try {
    localStorage.setItem('mode', mode);
  } catch {}
  running?.kill();
  const done = () => {
    root.dataset.mode = mode;
    Object.keys(MODES[mode]).forEach((k) => root.style.removeProperty(k));
    ScrollTrigger.refresh();
  };
  if (reducedMotion()) return done();
  // Start from the current computed values, end on the target mode, then hand back to CSS.
  const cs = getComputedStyle(root);
  const from: Record<string, string> = {};
  Object.keys(MODES[mode]).forEach((k) => (from[k] = cs.getPropertyValue(k).trim()));
  gsap.set(root, from);
  running = gsap.to(root, { ...MODES[mode], duration: 0.95, ease: 'expo.out', onComplete: done });
}
