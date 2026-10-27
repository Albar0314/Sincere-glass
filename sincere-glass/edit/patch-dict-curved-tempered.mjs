// patch-dict-curved-tempered.mjs
// Adds the missing EN + ES dictionary entries for `product.curvedTempered.name`
// and `product.curvedTempered.desc` to src/lib/dict.ts.
//
// Why: Header + Footer render product names via t(`product.${key}.name`). When
// the Curved Tempered product was added to the productLinks array, the dict
// entries were not added — so the UI rendered the literal fallback string
// "product.curvedTempered.name" (which is what Grok flagged).
//
// Idempotent — safe to re-run.
//
// Run from project root (D:\\桌面\\sincere-glass\\sincere-glass\\):
//   node edit\\patch-dict-curved-tempered.mjs

import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const ROOT = process.cwd();
const DICT_PATH = join(ROOT, 'src', 'lib', 'dict.ts');

if (!existsSync(DICT_PATH)) {
  console.error('\u2717 src/lib/dict.ts not found');
  process.exit(1);
}

let src = readFileSync(DICT_PATH, 'utf8');

// Already there? Skip.
if (src.includes(`'product.curvedTempered.name'`)) {
  console.log('\u26a0 dict.ts already has product.curvedTempered.* entries \u2014 nothing to do');
  process.exit(0);
}

// EN anchor \u2014 the last product entry in the EN block (line 34 in current source).
const enAnchor = `  'product.lowE.name': 'Low-E Glass',
  'product.lowE.desc': 'Energy-efficient coating',`;
const enInsertion = enAnchor + `
  'product.curvedTempered.name': 'Curved Tempered Glass',
  'product.curvedTempered.desc': 'Single-axis bent, R\u2098\u1d62\u2099 500mm at 6mm',`;

// ES anchor \u2014 the last product entry in the ES block (line 135 in current source).
const esAnchor = `  'product.lowE.name': 'Vidrio bajo emisivo (Low-E)',
  'product.lowE.desc': 'Recubrimiento de bajo consumo energ\u00e9tico',`;
const esInsertion = esAnchor + `
  'product.curvedTempered.name': 'Vidrio templado curvo',
  'product.curvedTempered.desc': 'Curvatura mono-axial, R\u2098\u1d62\u2099 500mm en 6mm',`;

if (!src.includes(enAnchor)) {
  console.error('\u2717 EN anchor (product.lowE entries) not found in dict.ts \u2014 structure changed; manual edit needed');
  process.exit(1);
}
if (!src.includes(esAnchor)) {
  console.error('\u2717 ES anchor (product.lowE entries) not found in dict.ts \u2014 structure changed; manual edit needed');
  process.exit(1);
}

// Replace EN block first, then ES. Each anchor is unique to its locale.
src = src.replace(enAnchor, enInsertion);
src = src.replace(esAnchor, esInsertion);

writeFileSync(DICT_PATH, src, 'utf8');

console.log('\u2713 Added product.curvedTempered.name + .desc to EN block of dict.ts');
console.log('\u2713 Added product.curvedTempered.name + .desc to ES block of dict.ts');
console.log('');
console.log('\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501');
console.log('Dict patch complete.');
console.log('');
console.log('Verify:');
console.log('  1. npm run build  \u2014 confirm no type errors');
console.log('  2. Load site and inspect Header mega menu + Footer: should now');
console.log('     show "Curved Tempered Glass" / "Vidrio templado curvo", not');
console.log('     the literal string "product.curvedTempered.name".');
console.log('  3. Also check QuoteModal subject dropdown \u2014 if it lists products,');
console.log('     the curved option should now render correctly too.');
console.log('\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501');
