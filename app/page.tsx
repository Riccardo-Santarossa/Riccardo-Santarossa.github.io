import { person, rows, turn, craft, work, route, contact } from '@/content/site';
import { Bar } from '@/components/Bar';
import { Letters } from '@/components/Letters';
import { SmoothScroll } from '@/components/SmoothScroll';
import { Choreography } from '@/components/Choreography';
import { WorkIndex } from '@/components/WorkIndex';

export default function Home() {
  return (
    <>
      <a className="skip" href="#work">
        Skip to work
      </a>
      <Bar />
      <main>
        <section id="top" className="hero" aria-label="Introduction">
          <h1 className="display hero-name">
            <span className="sr">{person.name}</span>
            <span aria-hidden="true">
              <span className="line l1">
                <Letters text={person.firstName} seed={3} />
              </span>
              <span className="line l2">
                <Letters text={person.lastName} seed={17} />
              </span>
            </span>
          </h1>
          <div className="hero-foot">
            <p className="hero-pos">{person.positioning}</p>
            <div>
              <p className="hero-intro">{person.intro}</p>
              <a className="hero-cta" href="#work">
                Work
              </a>
            </div>
          </div>
        </section>

        <section id="rows" className="section" aria-labelledby="rows-h">
          <div className="wrap rows-grid">
            <h2 id="rows-h" className="display rows-h">
              {rows.heading}
            </h2>
            <div className="rows-text">
              <p className="rows-body">{rows.body}</p>
              <p className="rows-aside">{rows.aside}</p>
            </div>
          </div>
        </section>

        <section id="turn" className="section" aria-label="The turn">
          <div className="wrap">
            <p className="display turn-sentence">
              {turn.sentence.split(' ').map((w, i) => (
                <span key={i}>
                  <span className="w">{w}</span>{' '}
                </span>
              ))}
            </p>
          </div>
        </section>

        <section id="craft" className="section craft" aria-labelledby="craft-h">
          <h2 id="craft-h" className="display craft-h">
            {craft.heading}
          </h2>
          <ul className="craft-track">
            {craft.items.map((it) => (
              <li key={it.word} className="craft-item">
                <span className="craft-word">{it.word}</span>
                <p className="craft-text">{it.text}</p>
              </li>
            ))}
          </ul>
        </section>

        <section id="work" className="section" aria-labelledby="work-h">
          <div className="wrap">
            <div className="work-head">
              <h2 id="work-h" className="display h2">
                {work.heading}
              </h2>
              <p className="work-note">{work.note}</p>
            </div>
            <WorkIndex projects={work.projects} />
          </div>
        </section>

        <section id="route" className="section" aria-labelledby="route-h">
          <div className="wrap">
            <h2 id="route-h" className="display h2 route-h">
              {route.heading}
            </h2>
            <ol className="sheets">
              {route.stops.map((s, i) => (
                <li key={s.title} className="sheet" style={{ '--i': i } as React.CSSProperties}>
                  <span className="sheet-n" aria-hidden="true">
                    {i + 1}
                  </span>
                  <h3 className="display sheet-t">{s.title}</h3>
                  <p className="sheet-p">{s.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section id="contact" className="section contact" aria-labelledby="contact-h">
          <div className="wrap">
            <h2 id="contact-h" className="display hello">
              <span className="sr">{contact.big}</span>
              <span aria-hidden="true">
                <Letters text={contact.big} seed={29} />
              </span>
            </h2>
            <div className="contact-grid">
              <p className="contact-line">{contact.line}</p>
              <ul className="contact-links">
                <li>
                  <a href={`mailto:${person.email}`}>{person.email}</a>
                </li>
                <li>
                  <a href={person.linkedin} rel="me noopener" target="_blank">
                    LinkedIn<span className="sr"> (opens in a new tab)</span>
                  </a>
                </li>
              </ul>
              <p className="contact-city">
                {person.name}, {person.city}
              </p>
            </div>
          </div>
        </section>
      </main>
      <footer className="foot">
        <p>{contact.footer}</p>
      </footer>
      <SmoothScroll />
      <Choreography />
    </>
  );
}
