'use client';
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { reducedMotion } from '@/lib/mode';

gsap.registerPlugin(ScrollTrigger);

type Project = { title: string; kind: string; summary: string; href: string; placeholder: boolean };

// Index of projects; the row at the centre of the screen (or under the pointer) drives the preview.
export function WorkIndex({ projects }: { projects: Project[] }) {
  const [active, setActive] = useState(0);
  const list = useRef<HTMLOListElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  const first = useRef(true);

  useEffect(() => {
    const rows = list.current ? Array.from(list.current.children) : [];
    const triggers = rows.map((row, i) =>
      ScrollTrigger.create({
        trigger: row,
        start: 'top 55%',
        end: 'bottom 55%',
        onToggle: (self) => self.isActive && setActive(i),
      }),
    );
    return () => triggers.forEach((t) => t.kill());
  }, []);

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    const slide = panel.current?.querySelector<HTMLElement>(`[data-slide="${active}"]`);
    if (!slide || reducedMotion()) return;
    gsap.fromTo(
      slide,
      { clipPath: 'inset(100% 0 0 0)' },
      { clipPath: 'inset(0% 0 0 0)', duration: 0.8, ease: 'expo.out', clearProps: 'clipPath' },
    );
  }, [active]);

  return (
    <div className="work-grid">
      <ol className="work-list" ref={list}>
        {projects.map((p, i) => {
          const title = <span className="display work-title">{p.title}</span>;
          return (
            <li
              key={p.title}
              className="work-row"
              data-active={active === i}
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
            >
              <span className="work-i" aria-hidden="true">
                {i + 1}
              </span>
              <h3 style={{ margin: 0, font: 'inherit' }}>{p.href ? <a href={p.href}>{title}</a> : title}</h3>
              <p className="work-meta">
                <strong>{p.kind}</strong>
                <span>{p.placeholder ? 'Placeholder. ' + p.summary : p.summary}</span>
              </p>
            </li>
          );
        })}
      </ol>
      <div className="preview" aria-hidden="true">
        <div className="preview-panel" ref={panel}>
          {projects.map((p, i) => (
            <div key={p.title} className="preview-slide" data-slide={i} hidden={active !== i}>
              <span className="preview-n">{i + 1}</span>
              <span className="display preview-title">{p.title}</span>
            </div>
          ))}
        </div>
        <p className="preview-cap">{projects[active].placeholder ? 'Placeholder: no case study yet.' : projects[active].kind}</p>
      </div>
    </div>
  );
}
