'use client';
import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/*
 * Every scroll choreography on the home page, in one place. Each one has a single job:
 *  hero    page-load reveal of the name (the one authored entrance), then it lifts away
 *  rows    the origin statement is uncovered when it arrives
 *  turn    the sentence is read at scroll pace, word by word
 *  craft   vertical scroll pans sideways through the four disciplines; the centred word gains weight
 *  route   each sheet recedes as the next one covers it
 * Under prefers-reduced-motion none of this is created; the page is complete without it.
 */
export function Choreography() {
  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      // hero
      const chars = gsap.utils.toArray<HTMLElement>('.hero-name .ch');
      gsap.from(chars, {
        yPercent: 105,
        opacity: 0,
        duration: 1.25,
        ease: 'expo.out',
        stagger: 0.032,
        delay: 0.1,
        clearProps: 'transform,opacity',
      });
      gsap.from('.hero-foot > *', { opacity: 0, y: 18, duration: 1, ease: 'expo.out', stagger: 0.08, delay: 0.6, clearProps: 'all' });
      gsap.to('.hero-name', {
        yPercent: -22,
        ease: 'none',
        scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true },
      });

      // rows
      gsap.from('.rows-h', {
        clipPath: 'inset(0 0 100% 0)',
        y: 48,
        duration: 1.3,
        ease: 'expo.out',
        clearProps: 'clipPath,transform',
        scrollTrigger: { trigger: '.rows-h', start: 'top 85%' },
      });

      // turn
      gsap.fromTo(
        '.turn-sentence .w',
        { opacity: 0.16 },
        {
          opacity: 1,
          ease: 'none',
          stagger: 0.1,
          scrollTrigger: { trigger: '.turn-sentence', start: 'top 78%', end: 'bottom 42%', scrub: true },
        },
      );

      // craft
      const track = document.querySelector<HTMLElement>('.craft-track');
      if (track) {
        const distance = () => Math.max(0, track.scrollWidth - window.innerWidth);
        const pan = gsap.to(track, {
          x: () => -distance(),
          ease: 'none',
          scrollTrigger: {
            trigger: '.craft',
            start: 'top top',
            end: () => '+=' + distance(),
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });
        gsap.utils.toArray<HTMLElement>('.craft-item').forEach((item) => {
          const word = item.querySelector('.craft-word');
          gsap
            .timeline({
              scrollTrigger: { trigger: item, containerAnimation: pan, start: 'left 95%', end: 'right 5%', scrub: true },
            })
            .fromTo(word, { '--w': 300 }, { '--w': 880, ease: 'power2.out', duration: 1 })
            .to(word, { '--w': 300, ease: 'power2.in', duration: 1 });
        });
      }

      // route
      const sheets = gsap.utils.toArray<HTMLElement>('.sheet');
      sheets.forEach((sheet, i) => {
        const next = sheets[i + 1];
        if (!next) return;
        gsap.to(sheet, {
          scale: 0.94,
          ease: 'none',
          scrollTrigger: { trigger: next, start: 'top bottom', end: 'top 30%', scrub: true },
        });
      });
    });
    return () => mm.revert();
  }, []);
  return null;
}
