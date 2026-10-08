import { Bar } from '@/components/Bar';

export default function NotFound() {
  return (
    <>
      <Bar base="/" />
      <main className="lost">
        <h1 className="display lost-h">Not here.</h1>
        <p>This page does not exist.</p>
        <a className="hero-cta" href="/">
          Back to the portfolio
        </a>
      </main>
    </>
  );
}
