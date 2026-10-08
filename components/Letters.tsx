// Splits a word into glyph spans with fixed pseudo-random offsets.
// The offsets only show in Weird mode (multiplied by --weird), so Pro stays set straight.
const jitter = (seed: number) => {
  const x = Math.sin(seed * 12.9898) * 43758.5453;
  return (x - Math.floor(x)) * 2 - 1;
};

export function Letters({ text, seed = 1 }: { text: string; seed?: number }) {
  return (
    <>
      {[...text].map((ch, i) => (
        <span
          key={i}
          className="ch"
          style={{ '--jy': jitter(seed + i).toFixed(2), '--jr': jitter(seed * 7 + i).toFixed(2) } as React.CSSProperties}
        >
          {ch === ' ' ? '\u00a0' : ch}
        </span>
      ))}
    </>
  );
}
