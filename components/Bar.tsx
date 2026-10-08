import { person } from '@/content/site';
import { ModeToggle } from './ModeToggle';

export function Bar() {
  return (
    <header className="bar">
      <a className="bar-name" href="#top">
        {person.name}
      </a>
      <nav className="bar-nav" aria-label="Main">
        <a href="#work">Work</a>
        <a href="#contact">Contact</a>
      </nav>
      <ModeToggle />
    </header>
  );
}
