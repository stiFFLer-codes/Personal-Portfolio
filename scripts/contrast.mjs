// Prints the WCAG contrast ratio of every text colour against the paper it
// sits on, for both themes, read straight out of global.css. Run it when a
// colour changes: node scripts/contrast.mjs
import { readFileSync } from 'node:fs';

const css = readFileSync(new URL('../src/styles/global.css', import.meta.url), 'utf8');
const block = (re) => Object.fromEntries([...css.match(re)[1].matchAll(/--([a-z0-9-]+):\s*(#[0-9a-f]{6})/gi)].map((m) => [m[1], m[2]]));
const light = block(/:root \{([\s\S]*?)\n\}/);
const dark = block(/:root\[data-theme='dark'\] \{([\s\S]*?)\n\}/);

const lum = (hex) => {
  const [r, g, b] = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255).map((c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};
const ratio = (a, b) => {
  const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p);
  return (x + 0.05) / (y + 0.05);
};

let fail = false;
for (const [name, t] of [['light', light], ['dark', { ...light, ...dark }]]) {
  console.log(`\n${name}`);
  for (const bg of ['paper', 'paper-2']) {
    for (const fg of ['ink', 'ink-soft', 'ink-faint', 'green', 'amber', 'red', 'slate']) {
      const r = ratio(t[fg], t[bg]);
      if (r < 4.5) fail = true;
      console.log(`  ${fg.padEnd(10)} on ${bg.padEnd(8)} ${r.toFixed(2)} ${r < 4.5 ? 'FAIL' : ''}`);
    }
  }
  // Text set on a fill rather than on the paper: add [text, fill] pairs here.
  for (const [fg, bg] of []) {
    const r = ratio(t[fg], t[bg]);
    if (r < 4.5) fail = true;
    console.log(`  ${fg.padEnd(10)} on ${bg.padEnd(8)} ${r.toFixed(2)} ${r < 4.5 ? 'FAIL' : ''}`);
  }
}
process.exit(fail ? 1 : 0);
