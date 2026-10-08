'use client';
import { useEffect, useState } from 'react';
import { currentMode, morphTo, type Mode } from '@/lib/mode';

export function ModeToggle() {
  const [mode, setMode] = useState<Mode>('pro');
  useEffect(() => setMode(currentMode()), []);

  const pick = (next: Mode) => {
    if (next === mode) return;
    setMode(next);
    morphTo(next);
  };

  return (
    <div className="toggle" role="group" aria-label="Site mode">
      <button type="button" aria-pressed={mode === 'pro'} onClick={() => pick('pro')}>
        Pro
      </button>
      <button type="button" aria-pressed={mode === 'weird'} onClick={() => pick('weird')}>
        Weird
      </button>
    </div>
  );
}
