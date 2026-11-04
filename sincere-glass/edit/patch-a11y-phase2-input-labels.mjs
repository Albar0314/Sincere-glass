// patch-a11y-phase2-input-labels.mjs
// Phase 2: add aria-label to all unlabeled <input>/<select>/<textarea> controls.
// Driven by edit\a11y-inputs-manifest.json (115 entries, both EN and ES mirror).
//
// Run from project root:
//   node edit\patch-a11y-phase2-input-labels.mjs --dry   # preview each label
//   node edit\patch-a11y-phase2-input-labels.mjs         # apply
//   npm run build
//
// Safety: per-file .bak, line-endings preserved, ASCII-safe fallbacks,
// idempotent (skips controls that already have aria-label/aria-labelledby/
// aria-hidden), tag-end scan is quote- and brace-aware.

import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const MANIFEST_PATH = path.join(ROOT, "edit", "a11y-inputs-manifest.json");
const DRY_RUN = process.argv.includes("--dry");

if (!fs.existsSync(MANIFEST_PATH)) {
  console.error(`[fatal] manifest not found: ${MANIFEST_PATH}`);
  console.error("Run: node edit\\a11y-audit-inputs-v2.mjs first.");
  process.exit(1);
}

const manifest = JSON.parse(fs.readFileSync(MANIFEST_PATH, "utf8"));

// -------- Label computation ----------

function isSpanish(file) {
  return file.includes("/_i18n/es/") || file.includes("\\_i18n\\es\\");
}

// Hard-coded fallbacks for entries where nearestTextLabel is empty.
// Keys are matched by file-substring + valueExpr (or type).
function manualFallback(entry) {
  const es = isSpanish(entry.file);

  // Honeypot anti-spam fields: hide from assistive tech entirely.
  if (entry.nameAttr === "_hp_url") return { kind: "aria-hidden" };

  // LeadMagnetCTA email with no label/placeholder -> generic
  if (/LeadMagnetCTA/.test(entry.file) && entry.type === "email") {
    if (entry.placeholder) return { kind: "label", value: entry.placeholder };
    return { kind: "label", value: es ? "Correo electronico" : "Email address" };
  }

  // SearchModal
  if (/SearchModal/.test(entry.file)) {
    return { kind: "label", value: es ? "Buscar articulos y productos" : "Search articles and products" };
  }

  // RiskExposureProfiler state-named selects
  if (/RiskExposureProfiler/.test(entry.file)) {
    const map = {
      deal: es ? "Tamano del acuerdo" : "Deal size",
      rel: es ? "Antiguedad de la relacion" : "Relationship age",
      dest: es ? "Pais de destino" : "Destination country",
      cmp: es ? "Alcance de cumplimiento" : "Compliance scope",
    };
    const v = map[entry.valueExpr];
    if (v) return { kind: "label", value: v };
  }

  // Curved tempered calculators without label
  if (/BendFeasibilityCalculator/.test(entry.file)) {
    const map = {
      radius: es ? "Radio de curvatura (mm)" : "Curve radius (mm)",
      arcLength: es ? "Longitud del arco (mm)" : "Arc length (mm)",
    };
    const v = map[entry.valueExpr];
    if (v) return { kind: "label", value: v };
  }
  if (/CurvedCostPremiumCalculator/.test(entry.file) && entry.valueExpr === "uniqueRadii") {
    return { kind: "label", value: es ? "Cantidad de radios unicos" : "Number of unique radii" };
  }
  if (/CurvatureVisualizer/.test(entry.file) && entry.valueExpr === "radius") {
    return { kind: "label", value: es ? "Radio de curvatura (mm)" : "Curve radius (mm)" };
  }
  if (/CostPremiumCalculator/.test(entry.file) && entry.valueExpr === "area") {
    return { kind: "label", value: es ? "Area del pedido (m2)" : "Order area (m2)" };
  }
  if (/InterlayerCostCalculator/.test(entry.file) && entry.valueExpr === "area") {
    return { kind: "label", value: es ? "Area del pedido (m2)" : "Order area (m2)" };
  }
  if (/CurvedPremiumCalculator/.test(entry.file) && entry.valueExpr === "area") {
    return { kind: "label", value: es ? "Area del proyecto (m2)" : "Project area (m2)" };
  }

  return null;
}

// Clean a text label into a safe aria-label value.
function normalizeLabel(raw) {
  if (!raw) return "";
  return raw
    .replace(/\s+/g, " ")
    .trim()
    .replace(/[*:]+$/, "")
    .trim();
}

function computeAriaAttr(entry) {
  const manual = manualFallback(entry);
  if (manual && manual.kind === "aria-hidden") return { attr: `aria-hidden="true"`, source: "manual-hidden" };
  if (manual && manual.kind === "label") {
    return { attr: `aria-label="${escapeAttr(manual.value)}"`, source: "manual-label" };
  }

  // Prefer nearestTextLabel
  const text = normalizeLabel(entry.nearestTextLabel);
  if (text) return { attr: `aria-label="${escapeAttr(text)}"`, source: "nearestTextLabel" };

  // Fallback: placeholder
  if (entry.placeholder) {
    return { attr: `aria-label="${escapeAttr(entry.placeholder)}"`, source: "placeholder" };
  }

  // Last resort: synthesize from componentName + valueExpr
  const parts = [];
  if (entry.componentName && entry.componentName !== "PADDING") parts.push(entry.componentName);
  if (entry.valueExpr) parts.push(entry.valueExpr);
  else if (entry.type) parts.push(entry.type);
  const synth = parts.join(" ").replace(/([a-z])([A-Z])/g, "$1 $2");
  return { attr: `aria-label="${escapeAttr(synth || "input")}"`, source: "synth" };
}

function escapeAttr(s) {
  // Replace double quotes with single quotes to keep attr string syntactically simple;
  // also strip any backslashes that could escape unexpectedly.
  return s.replace(/\\/g, "").replace(/"/g, "'");
}

// -------- Tag-end scanner (brace + quote aware) ----------

function findTagEnd(src, tagStart) {
  // Starts at '<' position. Returns index AFTER closing '>' of this opening tag.
  // Handles nested braces (JSX expressions) and string literals.
  let i = tagStart + 1;
  let braceDepth = 0;
  let stringChar = null;
  while (i < src.length) {
    const c = src[i];
    if (stringChar) {
      if (c === "\\" && i + 1 < src.length) { i += 2; continue; }
      if (c === stringChar) stringChar = null;
    } else if (braceDepth === 0 && (c === '"' || c === "'" || c === "`")) {
      stringChar = c;
    } else if (c === "{") {
      braceDepth++;
    } else if (c === "}") {
      braceDepth--;
    } else if (c === ">" && braceDepth === 0 && !stringChar) {
      return i + 1;
    }
    i++;
  }
  return -1;
}

// -------- Per-file application ----------

const byFile = {};
for (const e of manifest) {
  if (!byFile[e.file]) byFile[e.file] = [];
  byFile[e.file].push(e);
}

let totalEntries = 0;
let totalApplied = 0;
let totalSkippedIdempotent = 0;
let totalFailed = 0;
const perFileReport = [];
const previewLines = [];

for (const [relFile, entries] of Object.entries(byFile)) {
  const abs = path.join(ROOT, relFile.replace(/\//g, path.sep));
  if (!fs.existsSync(abs)) {
    console.error(`[warn] file missing, skipping: ${relFile}`);
    totalFailed += entries.length;
    continue;
  }
  let src = fs.readFileSync(abs, "utf8");
  const originalSrc = src;
  const eol = src.includes("\r\n") ? "\r\n" : "\n";

  // For each entry, find the <tag position by line number, then find tag end.
  // Then sort descending by position and apply (so inserts don't shift later positions).
  const positioned = [];
  for (const entry of entries) {
    totalEntries++;
    const linesBefore = src.split(/\r?\n/).slice(0, entry.line - 1);
    const startPos = linesBefore.join(eol).length + (entry.line > 1 ? eol.length : 0);
    const window = src.slice(startPos, startPos + 800);
    const tagRe = new RegExp(`<${entry.tag}\\b`);
    const m = tagRe.exec(window);
    if (!m) {
      console.error(`[miss] ${relFile}:${entry.line} <${entry.tag}> not found in window`);
      totalFailed++;
      continue;
    }
    const tagStart = startPos + m.index;
    const tagEnd = findTagEnd(src, tagStart);
    if (tagEnd === -1) {
      console.error(`[miss] ${relFile}:${entry.line} tag end not found`);
      totalFailed++;
      continue;
    }
    positioned.push({ entry, tagStart, tagEnd });
  }

  positioned.sort((a, b) => b.tagStart - a.tagStart);

  let appliedInFile = 0;
  let skippedInFile = 0;

  for (const { entry, tagStart, tagEnd } of positioned) {
    const tagContent = src.slice(tagStart, tagEnd);
    if (/\baria-(label|labelledby|hidden)\b/.test(tagContent)) {
      skippedInFile++;
      totalSkippedIdempotent++;
      continue;
    }
    const { attr, source } = computeAriaAttr(entry);
    // Determine self-close
    const isSelfClose = tagContent.endsWith("/>");
    const insertPos = isSelfClose ? tagEnd - 2 : tagEnd - 1; // before '/>' or before '>'
    const before = src.slice(0, insertPos);
    const after = src.slice(insertPos);
    const needsSpaceBefore = before.length > 0 && !/\s$/.test(before);
    const sep = needsSpaceBefore ? " " : "";
    // For <input ... />, keep space before '/>'
    // For <select ...> or <textarea ...>, no trailing space needed before '>'
    const trailing = isSelfClose ? " " : "";
    src = before + sep + attr + trailing + after;

    appliedInFile++;
    totalApplied++;

    const labelValue = attr.match(/aria-(?:label|hidden)="([^"]*)"/)[1];
    previewLines.push({
      file: relFile,
      line: entry.line,
      tag: entry.tag,
      attr,
      source,
    });
  }

  if (appliedInFile === 0 && skippedInFile === 0) continue;
  perFileReport.push({ file: relFile, applied: appliedInFile, skipped: skippedInFile });

  if (!DRY_RUN && src !== originalSrc) {
    const bak = abs + ".bak";
    if (!fs.existsSync(bak)) fs.writeFileSync(bak, originalSrc, "utf8");
    fs.writeFileSync(abs, src, "utf8");
  }
}

// -------- Report ----------

console.log("");
console.log(`=== Phase 2 aria-label patch ${DRY_RUN ? "(DRY RUN)" : ""} ===`);
console.log("");
console.log(`Manifest entries:       ${totalEntries}`);
console.log(`Applied:                ${totalApplied}`);
console.log(`Skipped (idempotent):   ${totalSkippedIdempotent}`);
console.log(`Failed to locate:       ${totalFailed}`);
console.log(`Files touched:          ${perFileReport.length}`);
console.log("");

// Source distribution (how we picked the label)
const sources = {};
for (const p of previewLines) sources[p.source] = (sources[p.source] || 0) + 1;
console.log("Label source distribution:");
for (const [k, v] of Object.entries(sources)) console.log(`  ${k.padEnd(20)} ${v}`);
console.log("");

// Per-file summary
console.log("Files patched:");
for (const r of perFileReport.sort((a, b) => b.applied - a.applied).slice(0, 20)) {
  console.log(`  ${String(r.applied).padStart(3)}  ${r.file}`);
}
console.log("");

// Preview sample (first 30) + any synth entries (those deserve review)
console.log("Sample of labels chosen (first 30):");
for (const p of previewLines.slice(0, 30)) {
  console.log(`  ${p.file}:${p.line}  <${p.tag}>  ->  ${p.attr}  [${p.source}]`);
}
console.log("");

const synthEntries = previewLines.filter((p) => p.source === "synth");
if (synthEntries.length) {
  console.log(`[review] ${synthEntries.length} entries used synthetic labels (fallback):`);
  for (const p of synthEntries) {
    console.log(`  ${p.file}:${p.line}  ->  ${p.attr}`);
  }
  console.log("");
}

if (DRY_RUN) {
  console.log("DRY RUN complete. Review labels above, then run without --dry.");
} else {
  console.log("Backups written as <file>.bak (first-run only).");
  console.log("");
  console.log("Next: npm run build");
}

