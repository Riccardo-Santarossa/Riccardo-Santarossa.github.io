import { hexToRgb } from './util.js';

// Colours come from src/styles/tokens.css, so CSS and WebGL share one source.
export function readTokens() {
  const cs = getComputedStyle(document.documentElement);
  const get = (n) => hexToRgb(cs.getPropertyValue('--' + n));
  return {
    nebbia: get('nebbia'),
    peltro: get('peltro'),
    naviglio: get('naviglio'),
    schiarita: get('schiarita'),
    inchiostro: get('inchiostro'),
    calce: get('calce'),
    sodio: get('sodio'),
    cobalto: get('cobalto'),
    hex: {
      inchiostro: cs.getPropertyValue('--inchiostro').trim(),
      calce: cs.getPropertyValue('--calce').trim(),
      sodio: cs.getPropertyValue('--sodio').trim(),
    },
  };
}
