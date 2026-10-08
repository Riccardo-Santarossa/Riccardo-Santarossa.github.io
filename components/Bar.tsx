import { person } from '@/content/site';
import { ModeToggle } from './ModeToggle';

// `base` is '' on the home page (in-page anchors) and '/' elsewhere.
export function Bar({ base = '' }: { base?: string }) {
  return (
    <header className="bar">
      <a className="bar-name" href={`${base}#top`}>
        {person.name}
      </a>
      <nav className="bar-nav" aria-label="Main">
        <a href={`${base}#work`}>Work</a>
        <a href={`${base}#contact`}>Contact</a>
      </nav>
      <ModeToggle />
    </header>
  );
}
