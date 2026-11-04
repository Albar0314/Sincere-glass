// a11y-audit-inputs-v2.mjs
// Deeper audit of <input>/<select>/<textarea> missing accessible names.
// Outputs a JSON manifest of all unlabeled form controls with enough context
// (file, line, element type, nearby heading, variable/state name, existing
// attrs) to generate targeted aria-label values in the Phase 2 patch.
//
// Run from project root: node edit\a11y-audit-inputs-v2.mjs
// Writes: edit\a11y-inputs-manifest.json
//
// Non-destructive, read-only.

import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const SRC = path.join(ROOT, "src");
const OUT = path.join(ROOT, "edit", "a11y-inputs-manifest.json");

function walk(dir, exts = [".tsx", ".jsx"]) {
  const out = [];
  if (!fs.existsSync(dir)) return out;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (/node_modules|\.next/.test(full)) continue;
      out.push(...walk(full, exts));
    } else if (exts.some((e) => entry.name.endsWith(e))) {
      out.push(full);
    }
  }
  return out;
}

function rel(file) {
  return path.relative(ROOT, file).replace(/\\/g, "/");
}

// Find all form controls, returning rich context per occurrence.
function findControls(src, file) {
  const results = [];
  // Match <input ... />, <select ...>...</select>, <textarea ...>...</textarea>
  // We only need the opening tag attrs to decide whether it has a name.
  const re = /<(input|select|textarea)\b([\s\S]*?)(\/?)>/g;
  let m;
  while ((m = re.exec(src)) !== null) {
    const tag = m[1];
    const attrs = m[2];
    const openerFull = m[0];
    const openerStart = m.index;

    // Skip non-user-facing inputs
    if (tag === "input") {
      const typeMatch = attrs.match(/\btype=["']([a-z]+)["']/);
      const type = typeMatch ? typeMatch[1] : "text";
      if (["hidden", "submit", "button", "image", "reset"].includes(type)) continue;
    }

    // Existing accessibility hooks
    const hasAriaLabel = /\baria-label\b/.test(attrs);
    const hasAriaLabelledby = /\baria-labelledby\b/.test(attrs);
    if (hasAriaLabel || hasAriaLabelledby) continue;

    // id -> maybe matching <label htmlFor>
    const idMatch = attrs.match(/\bid=["']([^"']+)["']/);
    if (idMatch) {
      const id = idMatch[1];
      const labelRe = new RegExp(
        `<label[^>]*htmlFor=["']${id.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}["']`
      );
      if (labelRe.test(src)) continue;
    }

    // Check parent-label pattern: <label>...<input/></label> within ~400 chars before
    const before = src.slice(Math.max(0, openerStart - 400), openerStart);
    // Count open vs close <label> tags in the before window; if more opens than
    // closes AND the last tag is <label> (not </label>), we're inside a label.
    const openLabels = (before.match(/<label\b/g) || []).length;
    const closeLabels = (before.match(/<\/label>/g) || []).length;
    if (openLabels > closeLabels) continue;

    // Not labeled. Capture context.
    const line = src.slice(0, openerStart).split(/\r?\n/).length;

    // Nearest preceding heading or component function name (for synthesizing aria-label)
    const heading =
      // JSX heading text in nearby markup
      (src.slice(Math.max(0, openerStart - 2000), openerStart)
        .match(/<h[1-4][^>]*>([\s\S]*?)<\/h[1-4]>/g) || [])
        .slice(-1)[0] || "";
    const headingText = heading
      .replace(/<[^>]+>/g, "")
      .replace(/\{[^}]*\}/g, "")
      .replace(/\s+/g, " ")
      .trim();

    // Function/component name this control sits inside
    const funcMatch = src.slice(0, openerStart).match(
      /(?:export\s+default\s+function|function|const)\s+([A-Z][A-Za-z0-9_]+)\s*(?:=|\()/g
    );
    const componentName =
      funcMatch && funcMatch.length
        ? funcMatch[funcMatch.length - 1].match(/\s+([A-Z][A-Za-z0-9_]+)/)[1]
        : "";

    // Variable name: from value={xxx} or value={state.xxx} or name="xxx"
    const valueMatch = attrs.match(/\bvalue=\{([^}]+)\}/);
    const nameAttr = attrs.match(/\bname=["']([^"']+)["']/);
    const placeholder = attrs.match(/\bplaceholder=["']([^"']+)["']/);
    const typeAttr = attrs.match(/\btype=["']([a-z]+)["']/);

    // Nearest preceding text label pattern: span/div with simple text just before
    // input, within ~250 chars
    const near = src.slice(Math.max(0, openerStart - 250), openerStart);
    // Look for the last short <span|div|p|label>TEXT</...> in near window
    const nearLabelRe = /<(span|div|p|label)[^>]*>\s*([A-Z][^<{]{2,60})\s*(<|<\/)/g;
    let lastNearText = "";
    let nlm;
    while ((nlm = nearLabelRe.exec(near)) !== null) {
      lastNearText = nlm[2].trim();
    }

    results.push({
      file: rel(file),
      line,
      tag,
      componentName,
      type: typeAttr ? typeAttr[1] : tag === "input" ? "text" : tag,
      valueExpr: valueMatch ? valueMatch[1].trim() : null,
      nameAttr: nameAttr ? nameAttr[1] : null,
      placeholder: placeholder ? placeholder[1] : null,
      id: idMatch ? idMatch[1] : null,
      nearestHeading: headingText.slice(0, 80),
      nearestTextLabel: lastNearText.slice(0, 80),
      opener: openerFull.slice(0, 220).replace(/\s+/g, " "),
    });
  }
  return results;
}

const files = walk(SRC);
const all = [];
for (const f of files) {
  const src = fs.readFileSync(f, "utf8");
  const found = findControls(src, f);
  all.push(...found);
}

if (!fs.existsSync(path.join(ROOT, "edit"))) fs.mkdirSync(path.join(ROOT, "edit"));
fs.writeFileSync(OUT, JSON.stringify(all, null, 2), "utf8");

// Summary
const byFile = {};
for (const r of all) {
  byFile[r.file] = (byFile[r.file] || 0) + 1;
}

console.log("");
console.log(`=== Form control audit v2 ===`);
console.log(`Total unlabeled controls: ${all.length}`);
console.log(`Files affected:           ${Object.keys(byFile).length}`);
console.log("");
console.log("Top 15 files by count:");
const sorted = Object.entries(byFile).sort((a, b) => b[1] - a[1]).slice(0, 15);
for (const [f, c] of sorted) console.log(`  ${String(c).padStart(3)}  ${f}`);
console.log("");
console.log(`Manifest written: ${rel(OUT)}`);
console.log("Paste it back to Claude to generate the Phase 2 aria-label patch.");
