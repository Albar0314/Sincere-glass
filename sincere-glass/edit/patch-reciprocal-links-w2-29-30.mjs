// patch-reciprocal-links-w2-29-30.mjs
// Inserts reciprocal inbound links for W2 spokes #29 (u-factor-and-shgc)
// and #30 (insulated-glass-spacer-warm-edge-vs-aluminum).
//
// Safe to re-run. Idempotent via per-page markers. CRLF-tolerant.
// - Backs up every touched page.tsx to .bak before writing.
// - Dual anchor: tries <section id="faq"> first, then the <FAQ ...> JSX tag.
// - If NEITHER anchor is found in a page, it does NOT write that page; it
//   records a failure, prints the file tail, and exits non-zero so you can
//   anchor it by hand. (Unlike the old #28 script, no silent skips.)
//
// Run from project root:  node patch-reciprocal-links-w2-29-30.mjs
// Then:                   npm run build

import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const BLOG = path.join(ROOT, "src", "app", "blog");

function pagePath(slug) {
  return path.join(BLOG, slug, "page.tsx");
}
function detectEol(src) {
  return src.includes("\r\n") ? "\r\n" : "\n";
}
function backup(fp) {
  if (fs.existsSync(fp)) fs.copyFileSync(fp, fp + ".bak");
}

// ---- Callout builders (ASCII-only; Tailwind classes match #28 pattern) ----

const linkTo29and30 = [
  '        <aside className="my-8 rounded-2xl border border-sky-200 bg-sky-50 p-5">',
  '          <div className="text-xs font-semibold uppercase tracking-wide text-sky-800">Related technical deep-dives</div>',
  '          <ul className="mt-2 space-y-2 text-sm text-slate-700">',
  '            <li>',
  '              <a href="/blog/u-factor-and-shgc-explained" className="font-semibold text-sky-900 underline">How to read U-factor and SHGC</a>',
  '              {" "}- the two numbers on every NFRC label, decoded.',
  '            </li>',
  '            <li>',
  '              <a href="/blog/insulated-glass-spacer-warm-edge-vs-aluminum" className="font-semibold text-sky-900 underline">Warm edge vs aluminum spacers</a>',
  '              {" "}- how the edge seal moves your whole-window U-factor.',
  '            </li>',
  '          </ul>',
  '        </aside>',
].join("\n");

const linkTo30_fromU = [
  '        <aside className="my-8 rounded-2xl border border-amber-200 bg-amber-50 p-5">',
  '          <div className="text-xs font-semibold uppercase tracking-wide text-amber-800">Related deep-dive</div>',
  '          <p className="mt-2 text-sm text-slate-700">',
  '            The spacer at the glass edge is where a lot of your U-factor is won or lost.',
  '          </p>',
  '          <a href="/blog/insulated-glass-spacer-warm-edge-vs-aluminum" className="mt-3 inline-block text-sm font-semibold text-amber-900 underline">',
  '            Read: Warm Edge vs Aluminum Spacers &rarr;',
  '          </a>',
  '        </aside>',
].join("\n");

const linkTo30_fromMade = [
  '        <aside className="my-8 rounded-2xl border border-amber-200 bg-amber-50 p-5">',
  '          <div className="text-xs font-semibold uppercase tracking-wide text-amber-800">Related deep-dive</div>',
  '          <p className="mt-2 text-sm text-slate-700">',
  '            Once the unit is assembled, the spacer you pick drives edge condensation and thermal performance.',
  '          </p>',
  '          <a href="/blog/insulated-glass-spacer-warm-edge-vs-aluminum" className="mt-3 inline-block text-sm font-semibold text-amber-900 underline">',
  '            Read: Warm Edge vs Aluminum Spacers &rarr;',
  '          </a>',
  '        </aside>',
].join("\n");

// ---- Patch plan ----

const PLAN = [
  { slug: "insulated-glass-complete-guide", marker: "RECIP-W2-V1:a26-to-2930", callout: linkTo29and30 },
  { slug: "double-pane-vs-triple-pane-glass", marker: "RECIP-W2-V1:a27-to-2930", callout: linkTo29and30 },
  { slug: "argon-vs-krypton-gas-fill-igu", marker: "RECIP-W2-V1:a28-to-2930", callout: linkTo29and30 },
  { slug: "u-factor-and-shgc-explained", marker: "RECIP-W2-V1:a29-to-30", callout: linkTo30_fromU },
  { slug: "how-is-insulated-glass-made", marker: "RECIP-W2-V1:a5-to-30", callout: linkTo30_fromMade },
];

// ---- Anchor finder: returns a RegExp that matched, or null ----

function findAnchor(raw) {
  const candidates = [
    /(\r?\n[ \t]*<section\s+id=["']faqs?["'][^>]*>)/i, // <section id="faq"> / "faqs"
    /(\r?\n[ \t]*<FAQ[\s/>])/,                          // <FAQ ... /> component
  ];
  for (const re of candidates) {
    if (re.test(raw)) return re;
  }
  return null;
}

// ---- Run ----

const done = [];
const already = [];
const failed = [];

for (const { slug, marker, callout } of PLAN) {
  const fp = pagePath(slug);
  if (!fs.existsSync(fp)) {
    failed.push({ slug, fp, reason: "page.tsx not found" });
    continue;
  }
  const raw = fs.readFileSync(fp, "utf8");
  if (raw.includes(marker)) {
    already.push(slug);
    continue;
  }
  const re = findAnchor(raw);
  if (!re) {
    failed.push({ slug, fp, reason: "no FAQ anchor (<section id=\"faq\"> or <FAQ>)" });
    continue;
  }
  const EOL = detectEol(raw);
  const calloutEol = callout.replace(/\n/g, EOL);
  const block = `${EOL}        {/* ${marker} */}${EOL}${calloutEol}`;
  const updated = raw.replace(re, `${block}$1`);
  backup(fp);
  fs.writeFileSync(fp, updated, "utf8");
  done.push(slug);
  console.log(`[ok] patched ${slug}`);
}

console.log("");
console.log("==== Reciprocal link patch summary ====");
console.log(`patched now : ${done.length ? done.join(", ") : "(none)"}`);
console.log(`already done: ${already.length ? already.join(", ") : "(none)"}`);
console.log(`FAILED      : ${failed.length ? failed.map((f) => f.slug).join(", ") : "(none)"}`);

if (failed.length) {
  console.log("");
  console.log("---- failures (no anchor; nothing written for these) ----");
  for (const f of failed) {
    console.log(`\n# ${f.slug}  (${f.reason})  ${f.fp}`);
    if (fs.existsSync(f.fp)) {
      const raw = fs.readFileSync(f.fp, "utf8");
      console.log("   ...file tail (last 600 chars):");
      console.log(raw.slice(-600));
    }
  }
  console.log("");
  console.log("Fix: tell Claude the FAQ region of each failed page, or add a <section id=\"faq\"> / <FAQ> anchor, then re-run.");
  process.exit(1);
}

console.log("");
console.log("All targets patched or already present. Next: npm run build");
