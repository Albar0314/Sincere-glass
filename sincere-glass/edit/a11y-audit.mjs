// a11y-audit.mjs
// Sincere Glass accessibility tree + agentic browsing audit
// Run from project root: node edit\a11y-audit.mjs
// Outputs report to edit\a11y-report.md
// Non-destructive — reads only.

import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const SRC = path.join(ROOT, "src");
const REPORT_PATH = path.join(ROOT, "edit", "a11y-report.md");

// ---- Helpers ----
function walk(dir, exts = [".tsx", ".jsx", ".ts"]) {
  const out = [];
  if (!fs.existsSync(dir)) return out;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (/node_modules|\.next|_i18n[\\/]/.test(full)) continue;
      out.push(...walk(full, exts));
    } else if (exts.some((e) => entry.name.endsWith(e))) {
      out.push(full);
    }
  }
  return out;
}

function read(file) {
  try { return fs.readFileSync(file, "utf8"); } catch { return ""; }
}

function rel(file) {
  return path.relative(ROOT, file).replace(/\\/g, "/");
}

// ---- Checks ----
const findings = {
  mainLandmark: { pages: [], layoutHasMain: null, layoutPath: null },
  pagesWithFragment: [],
  divOnClick: [],
  imgNoAlt: [],
  nextImageNoAlt: [],
  buttonNoAccessibleName: [],
  linkNoAccessibleName: [],
  svgNoRole: [],
  inputNoLabel: [],
  h1Count: {},
  skippedHeadings: [],
  duplicateIds: [],
};

// Check root layout for <main>
const layoutCandidates = [
  path.join(SRC, "app", "layout.tsx"),
  path.join(SRC, "app", "layout.jsx"),
];
for (const p of layoutCandidates) {
  if (fs.existsSync(p)) {
    findings.mainLandmark.layoutPath = rel(p);
    const src = read(p);
    findings.mainLandmark.layoutHasMain = /<main[\s>]/.test(src);
    break;
  }
}

// Walk all source files
const allFiles = walk(SRC);
const pageFiles = allFiles.filter((f) => /[\\/](page|layout)\.(tsx|jsx)$/.test(f));
const componentFiles = allFiles.filter((f) => !/[\\/](page|layout)\.(tsx|jsx)$/.test(f));

// --- Page-level: check for <main> wrapper or fragment-only root ---
for (const f of pageFiles) {
  if (f.endsWith("layout.tsx") || f.endsWith("layout.jsx")) continue;
  const src = read(f);
  const hasMain = /<main[\s>]/.test(src);
  const hasFragment = /return\s*\(\s*<>/m.test(src) || /return\s*<>/m.test(src);
  if (!hasMain) {
    findings.mainLandmark.pages.push(rel(f));
    if (hasFragment) findings.pagesWithFragment.push(rel(f));
  }
}

// --- All files: common a11y bugs ---
for (const f of allFiles) {
  const src = read(f);
  const name = rel(f);

  // <div onClick / <span onClick without role="button"
  const divClickRe = /<(div|span)\b[^>]*\bonClick=/g;
  let m;
  while ((m = divClickRe.exec(src)) !== null) {
    const chunk = src.slice(m.index, m.index + 300);
    if (!/role=["']button["']/.test(chunk) && !/role=["']tab["']/.test(chunk)) {
      findings.divOnClick.push({ file: name, snippet: chunk.slice(0, 120).replace(/\s+/g, " ") });
    }
  }

  // Plain <img> without alt
  const imgRe = /<img\b[^>]*>/g;
  while ((m = imgRe.exec(src)) !== null) {
    if (!/\balt=/.test(m[0])) {
      findings.imgNoAlt.push({ file: name, snippet: m[0].slice(0, 120) });
    }
  }

  // next/image <Image> without alt
  const nextImgRe = /<Image\b[^>]*\/?>/g;
  while ((m = nextImgRe.exec(src)) !== null) {
    if (!/\balt=/.test(m[0])) {
      findings.nextImageNoAlt.push({ file: name, snippet: m[0].slice(0, 120) });
    }
  }

  // <button> with no text content AND no aria-label / aria-labelledby / title
  const btnRe = /<button\b([^>]*)>([\s\S]*?)<\/button>/g;
  while ((m = btnRe.exec(src)) !== null) {
    const attrs = m[1];
    const inner = m[2];
    const hasAria = /aria-label\s*=/.test(attrs) || /aria-labelledby\s*=/.test(attrs) || /title\s*=/.test(attrs);
    // strip JSX comments and svg, then check for text
    const text = inner
      .replace(/<svg[\s\S]*?<\/svg>/g, "")
      .replace(/\{[\s\S]*?\}/g, "")
      .replace(/<[^>]+>/g, "")
      .trim();
    if (!hasAria && !text) {
      findings.buttonNoAccessibleName.push({ file: name, snippet: m[0].slice(0, 160).replace(/\s+/g, " ") });
    }
  }

  // <a> / <Link> with no visible text and no aria-label
  const linkRe = /<(a|Link)\b([^>]*)>([\s\S]*?)<\/\1>/g;
  while ((m = linkRe.exec(src)) !== null) {
    const attrs = m[2];
    const inner = m[3];
    const hasAria = /aria-label\s*=/.test(attrs) || /aria-labelledby\s*=/.test(attrs) || /title\s*=/.test(attrs);
    const text = inner
      .replace(/<svg[\s\S]*?<\/svg>/g, "")
      .replace(/\{[\s\S]*?\}/g, "")
      .replace(/<Image\b[^>]*\/?>/g, "")
      .replace(/<img\b[^>]*\/?>/g, "")
      .replace(/<[^>]+>/g, "")
      .trim();
    if (!hasAria && !text) {
      findings.linkNoAccessibleName.push({ file: name, snippet: m[0].slice(0, 160).replace(/\s+/g, " ") });
    }
  }

  // Standalone <svg> with no role / aria-label / aria-hidden (meaningful SVG without role="img" or decorative without aria-hidden)
  // Heuristic: inline SVG with viewBox and no role attribute
  const svgRe = /<svg\b([^>]*)>/g;
  while ((m = svgRe.exec(src)) !== null) {
    const attrs = m[1];
    const hasRole = /role\s*=/.test(attrs);
    const hasAriaHidden = /aria-hidden\s*=/.test(attrs);
    const hasAriaLabel = /aria-label\s*=/.test(attrs) || /aria-labelledby\s*=/.test(attrs);
    // Only flag if NOT inside a <button> or <a> in the surrounding 200 chars (those get their label from parent)
    const before = src.slice(Math.max(0, m.index - 300), m.index);
    const insideLabeledParent = /<(button|a|Link)\b[^>]*(aria-label|title)=/i.test(before);
    if (!hasRole && !hasAriaHidden && !hasAriaLabel && !insideLabeledParent) {
      findings.svgNoRole.push({ file: name, snippet: m[0].slice(0, 120) });
    }
  }

  // <input> / <textarea> / <select> without id matching <label htmlFor> AND without aria-label
  const inputRe = /<(input|textarea|select)\b([^>]*)\/?>/g;
  while ((m = inputRe.exec(src)) !== null) {
    const attrs = m[2];
    if (/type=["'](hidden|submit|button|image)["']/.test(attrs)) continue;
    const hasAria = /aria-label\s*=/.test(attrs) || /aria-labelledby\s*=/.test(attrs);
    const idMatch = attrs.match(/\bid=["']([^"']+)["']/);
    if (!hasAria && !idMatch) {
      findings.inputNoLabel.push({ file: name, snippet: m[0].slice(0, 160) });
    } else if (idMatch) {
      const id = idMatch[1];
      const labelRe = new RegExp(`<label[^>]*htmlFor=["']${id.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}["']`);
      if (!labelRe.test(src) && !hasAria) {
        findings.inputNoLabel.push({ file: name, snippet: m[0].slice(0, 160) + " (id=" + id + " has no matching <label htmlFor>)" });
      }
    }
  }

  // Count <h1> per page file
  if (/[\\/]page\.(tsx|jsx)$/.test(f)) {
    const h1s = (src.match(/<h1\b/g) || []).length;
    if (h1s !== 1) {
      findings.h1Count[name] = h1s;
    }
  }

  // Simple duplicate id check (string literals only)
  const ids = [];
  const idLitRe = /\bid=["']([a-zA-Z][\w-]+)["']/g;
  while ((m = idLitRe.exec(src)) !== null) ids.push(m[1]);
  const seen = {};
  for (const id of ids) {
    seen[id] = (seen[id] || 0) + 1;
  }
  for (const [id, count] of Object.entries(seen)) {
    if (count > 1) findings.duplicateIds.push({ file: name, id, count });
  }
}

// ---- Compose report ----
const now = new Date().toISOString();
const lines = [];
lines.push(`# Sincere Glass — Accessibility Tree Audit`);
lines.push(``);
lines.push(`Generated: ${now}`);
lines.push(`Project root: \`${ROOT}\``);
lines.push(``);
lines.push(`---`);
lines.push(``);

// Section 1: root layout
lines.push(`## 1. Root layout <main> landmark`);
lines.push(``);
if (findings.mainLandmark.layoutPath) {
  lines.push(`- Layout file: \`${findings.mainLandmark.layoutPath}\``);
  lines.push(`- Has <main> wrapper: **${findings.mainLandmark.layoutHasMain ? "YES" : "NO"}**`);
  if (!findings.mainLandmark.layoutHasMain) {
    lines.push(``);
    lines.push(`> **CRITICAL**: root layout has no <main> landmark. Every page contributes to the problem.`);
  }
} else {
  lines.push(`- **Layout not found** at expected paths. Please verify.`);
}
lines.push(``);

// Section 2: page-level <main>
lines.push(`## 2. Pages missing <main>`);
lines.push(``);
lines.push(`${findings.mainLandmark.pages.length} page file(s) have no <main> element themselves.`);
lines.push(`(If root layout has <main>, individual pages do NOT need their own — this list is informational.)`);
lines.push(``);
if (findings.mainLandmark.pages.length) {
  for (const p of findings.mainLandmark.pages.slice(0, 40)) lines.push(`- \`${p}\``);
  if (findings.mainLandmark.pages.length > 40) lines.push(`- ... +${findings.mainLandmark.pages.length - 40} more`);
}
lines.push(``);

if (findings.pagesWithFragment.length) {
  lines.push(`### 2a. Pages returning <> fragment as root`);
  lines.push(``);
  lines.push(`${findings.pagesWithFragment.length} page(s) return a fragment with no landmark. These are the ones Agent crawlers will struggle with if root layout also lacks <main>.`);
  lines.push(``);
  for (const p of findings.pagesWithFragment.slice(0, 40)) lines.push(`- \`${p}\``);
  if (findings.pagesWithFragment.length > 40) lines.push(`- ... +${findings.pagesWithFragment.length - 40} more`);
  lines.push(``);
}

// Section 3-9: issue categories
function section(title, arr, limit = 20, keyFn = (x) => x.file + " :: " + (x.snippet || "")) {
  lines.push(`## ${title}`);
  lines.push(``);
  lines.push(`Total: **${arr.length}**`);
  lines.push(``);
  if (arr.length) {
    // dedupe
    const seen = new Set();
    const unique = [];
    for (const x of arr) {
      const k = keyFn(x);
      if (seen.has(k)) continue;
      seen.add(k);
      unique.push(x);
    }
    for (const x of unique.slice(0, limit)) {
      if (x.snippet) lines.push(`- \`${x.file}\`\n  \`${x.snippet}\``);
      else lines.push(`- \`${x.file}\``);
    }
    if (unique.length > limit) lines.push(`- ... +${unique.length - limit} more unique occurrences`);
  }
  lines.push(``);
}

section("3. <div>/<span> with onClick but no role=\"button\"", findings.divOnClick, 25);
section("4. Plain <img> without alt", findings.imgNoAlt, 20);
section("5. next/image <Image> without alt", findings.nextImageNoAlt, 20);
section("6. <button> with no accessible name (no text, no aria-label)", findings.buttonNoAccessibleName, 25);
section("7. <a>/<Link> with no accessible name", findings.linkNoAccessibleName, 25);
section("8. Inline <svg> without role / aria-label / aria-hidden (outside labeled parent)", findings.svgNoRole, 15);
section("9. <input>/<textarea>/<select> without associated label or aria-label", findings.inputNoLabel, 20);

// Section 10: heading structure
lines.push(`## 10. Heading hierarchy issues`);
lines.push(``);
const h1Issues = Object.entries(findings.h1Count);
lines.push(`Pages with wrong <h1> count: **${h1Issues.length}**`);
lines.push(``);
for (const [file, count] of h1Issues.slice(0, 20)) {
  lines.push(`- \`${file}\` has ${count} <h1> (should be exactly 1)`);
}
lines.push(``);

// Section 11: duplicate IDs
lines.push(`## 11. Duplicate IDs (within same file, literal strings only)`);
lines.push(``);
lines.push(`Total: **${findings.duplicateIds.length}**`);
lines.push(``);
for (const d of findings.duplicateIds.slice(0, 20)) {
  lines.push(`- \`${d.file}\` — id="${d.id}" appears ${d.count} times`);
}
lines.push(``);

// Summary
lines.push(`---`);
lines.push(``);
lines.push(`## Summary counts`);
lines.push(``);
lines.push(`| Check | Count |`);
lines.push(`|---|---|`);
lines.push(`| Root layout has <main> | ${findings.mainLandmark.layoutHasMain ? "yes" : "NO"} |`);
lines.push(`| Pages without <main> | ${findings.mainLandmark.pages.length} |`);
lines.push(`| Pages returning <> fragment | ${findings.pagesWithFragment.length} |`);
lines.push(`| <div/span onClick> no role | ${findings.divOnClick.length} |`);
lines.push(`| <img> no alt | ${findings.imgNoAlt.length} |`);
lines.push(`| <Image> no alt | ${findings.nextImageNoAlt.length} |`);
lines.push(`| <button> no accessible name | ${findings.buttonNoAccessibleName.length} |`);
lines.push(`| <a>/<Link> no accessible name | ${findings.linkNoAccessibleName.length} |`);
lines.push(`| <svg> no role/aria | ${findings.svgNoRole.length} |`);
lines.push(`| <input> no label | ${findings.inputNoLabel.length} |`);
lines.push(`| Pages with wrong h1 count | ${Object.keys(findings.h1Count).length} |`);
lines.push(`| Duplicate IDs | ${findings.duplicateIds.length} |`);
lines.push(``);
lines.push(`Total source files scanned: ${allFiles.length}`);
lines.push(`Page files: ${pageFiles.length}`);
lines.push(`Component files: ${componentFiles.length}`);

// Ensure edit/ exists
if (!fs.existsSync(path.join(ROOT, "edit"))) fs.mkdirSync(path.join(ROOT, "edit"));
fs.writeFileSync(REPORT_PATH, lines.join("\n"), "utf8");

console.log("");
console.log("=== Sincere Glass a11y audit complete ===");
console.log(`Report written to: ${rel(REPORT_PATH)}`);
console.log("");
console.log("Quick summary:");
console.log(`  Root layout <main>: ${findings.mainLandmark.layoutHasMain ? "YES" : "NO <<< CRITICAL"}`);
console.log(`  Pages returning <> fragment: ${findings.pagesWithFragment.length}`);
console.log(`  <div onClick> without role: ${findings.divOnClick.length}`);
console.log(`  <img> without alt: ${findings.imgNoAlt.length}`);
console.log(`  <Image> without alt: ${findings.nextImageNoAlt.length}`);
console.log(`  <button> without accessible name: ${findings.buttonNoAccessibleName.length}`);
console.log(`  <a>/<Link> without accessible name: ${findings.linkNoAccessibleName.length}`);
console.log(`  <svg> without role: ${findings.svgNoRole.length}`);
console.log(`  <input> without label: ${findings.inputNoLabel.length}`);
console.log(`  Pages with wrong h1 count: ${Object.keys(findings.h1Count).length}`);
console.log(`  Duplicate IDs: ${findings.duplicateIds.length}`);
console.log("");
console.log("Next: paste edit\\a11y-report.md back to Claude for targeted patch scripts.");
