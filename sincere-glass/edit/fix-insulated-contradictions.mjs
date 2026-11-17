// edit/fix-insulated-contradictions.mjs
// Fix /blog/insulated-glass-complete-guide internal contradictions + duplicate FAQ heading.
// Literal unique-anchor replaces; backup to <file>.bak (.bak suffix, tsc ignores); idempotent.
//   node edit\fix-insulated-contradictions.mjs   then   npm run build
import { readFileSync, writeFileSync, existsSync, copyFileSync } from "node:fs";

const F = "src/app/blog/insulated-glass-complete-guide/page.tsx";
if (!existsSync(F)) { console.error("MISSING:", F); process.exit(1); }

let raw = readFileSync(F, "utf8");
const orig = raw;
const log = [];

// R1: remove hand-written duplicate <h2 id="faq"> (FAQ component already renders h2+id="faq")
const h2re = /[ \t]*<h2 id="faq">Frequently Asked Questions<\/h2>\r?\n/;
if (h2re.test(raw)) { raw = raw.replace(h2re, ""); log.push("R1 removed duplicate FAQ h2"); }
else log.push("R1 skip (not found, maybe already removed)");

const edits = [
  [
    "jumbo sizes (above 3.3 m x 6 m) add 2 to 3 weeks",
    "jumbo sizes (above 3 m x 6 m) add 2 to 3 weeks",
    "R2 jumbo threshold 3.3 -> 3 (FAQ line)",
  ],
  [
    "Target U around 1.5 to 1.8.",
    "Target U around 1.3 to 1.5.",
    "R3 temperate U aligned to verdict/TLDR (1.3-1.5)",
  ],
  [
    "<td>7 to 10 weeks</td>",
    "<td>6 to 9 weeks</td>",
    "R4 jumbo lead time table 7-10 -> 6-9",
  ],
  [
    "plan for 1 to 2 week lead time penalty, 30 to 50% per-m2 price premium over standard sizes",
    "plan for 2 to 3 week lead time penalty, a roughly 3x per-m2 price premium over standard sizes",
    "R4/R5 jumbo penalty +1-2 -> +2-3, price 30-50% -> ~3x",
  ],
  [
    "<td>20 ft container, approx 300 m2</td>",
    "<td>20 ft container, approx 300 to 400 m2</td>",
    "R6 standard MOQ 300 -> 300-400 (table aligns to FAQ)",
  ],
];

for (const [o, n, desc] of edits) {
  if (raw.includes(o)) { raw = raw.split(o).join(n); log.push("OK   " + desc); }
  else if (raw.includes(n)) { log.push("SKIP " + desc + " (already new value)"); }
  else { log.push("MISS " + desc + " -- anchor not found, check manually"); }
}

if (raw !== orig) {
  copyFileSync(F, F + ".bak");
  writeFileSync(F, raw);
  console.log("patched (.bak written):");
} else {
  console.log("no changes:");
}
for (const l of log) console.log("  " + l);
if (raw !== orig) console.log("\nnow run: npm run build");