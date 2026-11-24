#!/usr/bin/env node
/**
 * Sincere Glass - Companion FAQ Patch for Articles #2 & #3
 * Handles any FAQ variable name (faqs / faqItems / etc.) OR inline <FAQ items={[...]} />
 * Marker: SG-GSC-OPT-202611-V1
 * Usage:
 *   node edit/patch-gsc-faq-fix.mjs --dry-run
 *   node edit/patch-gsc-faq-fix.mjs
 */

import fs from "node:fs";
import path from "node:path";

const DRY_RUN = process.argv.includes("--dry-run");
const MARKER = "SG-GSC-OPT-202611-V1";
const ROOT = process.cwd();

const FAQ_PATCHES = [
  {
    slug: "tempered-glass-vs-annealed-glass",
    markerId: "faq-annealed-gsc",
    items: [
      {
        q: "What is annealed float glass and where is it still allowed by code?",
        a: "Annealed float glass is standard flat glass cooled slowly in an annealing lehr to relieve internal stress, allowing it to be cut, drilled, or edged after manufacture. Under IBC Section 2406 and EN 12600, annealed glass is permitted in non-hazardous locations such as upper-floor fixed windows above sill height, interior display cases, and mirror substrates, but is prohibited in doors, sidelites, shower enclosures, and low-level glazing.",
      },
      {
        q: "What is the difference between annealed glass and standard float glass?",
        a: "All standard float glass starts as annealed glass: float refers to the tin-bath forming method, while annealed refers to the slow-cooling heat treatment that leaves the sheet unstressed. Glass only ceases to be annealed when it undergoes secondary heat-strengthening or full tempering in a 620-650 C furnace.",
      },
    ],
  },
  {
    slug: "insulated-glass-vs-laminated-glass",
    markerId: "faq-igu-lam-gsc",
    items: [
      {
        q: "Can you combine laminated glass and insulated glass into one unit?",
        a: "Yes. A laminated insulated glass unit (laminated IGU) uses a laminated pane on one or both sides of the sealed air or argon cavity - for example, 6+1.52 PVB+6 laminated outer lite + 12A argon spacer + 6mm Low-E tempered inner lite. This hybrid delivers both low U-value thermal insulation and high STC acoustic damping plus overhead or hurricane safety compliance.",
      },
    ],
  },
];

function detectEol(text) {
  return text.includes("\r\n") ? "\r\n" : "\n";
}

function findMatchingBracket(text, openIdx) {
  let depth = 0;
  let inSingle = false;
  let inDouble = false;
  let inTemplate = false;
  let escaped = false;

  for (let i = openIdx; i < text.length; i++) {
    const ch = text[i];
    if (escaped) {
      escaped = false;
      continue;
    }
    if (ch === "\\") {
      escaped = true;
      continue;
    }
    if (inSingle) {
      if (ch === "'") inSingle = false;
      continue;
    }
    if (inDouble) {
      if (ch === '"') inDouble = false;
      continue;
    }
    if (inTemplate) {
      if (ch === "`") inTemplate = false;
      continue;
    }
    if (ch === "'") {
      inSingle = true;
      continue;
    }
    if (ch === '"') {
      inDouble = true;
      continue;
    }
    if (ch === "`") {
      inTemplate = true;
      continue;
    }
    if (ch === "[") depth++;
    else if (ch === "]") {
      depth--;
      if (depth === 0) return i;
    }
  }
  return -1;
}

function formatEntries(items, keyQ, keyA, indent, eol, fullMarker) {
  const lines = items.map(
    (item) =>
      `${indent}{${eol}${indent}  ${keyQ}: "${item.q}",${eol}${indent}  ${keyA}: "${item.a}",${eol}${indent}},`
  );
  return `${eol}${indent}// ${fullMarker}${eol}${lines.join(eol)}${eol}`;
}

function writeWithBackup(filePath, newContent) {
  if (DRY_RUN) {
    console.log(`[DRY-RUN] Would write: ${path.relative(ROOT, filePath)}`);
    return;
  }
  const bakPath = `${filePath}.bak`;
  if (!fs.existsSync(bakPath)) {
    fs.copyFileSync(filePath, bakPath);
  }
  fs.writeFileSync(filePath, newContent, "utf8");
  console.log(`[UPDATED] ${path.relative(ROOT, filePath)}`);
}

let updatedCount = 0;
let skippedCount = 0;
const warnings = [];

for (const patch of FAQ_PATCHES) {
  const pagePath = path.join(ROOT, "src", "app", "blog", patch.slug, "page.tsx");
  if (!fs.existsSync(pagePath)) {
    warnings.push(`File not found: ${pagePath}`);
    continue;
  }

  const src = fs.readFileSync(pagePath, "utf8");
  const eol = detectEol(src);
  const fullMarker = `${MARKER}:${patch.markerId}`;

  if (src.includes(fullMarker)) {
    console.log(`[SKIP] Already patched: ${patch.slug}`);
    skippedCount++;
    continue;
  }

  let openBracketIdx = -1;

  // Case 1: <FAQ ... items={varName} ... />
  const faqTagVarMatch = /<FAQ\b[^>]*\bitems=\{([A-Za-z_$][\w$]*)\}/.exec(src);
  if (faqTagVarMatch) {
    const varName = faqTagVarMatch[1];
    const declRe = new RegExp(`(?:const|let|var)\\s+${varName}(?:\\s*:\\s*[^=]+)?\\s*=\\s*\\[`);
    const declMatch = declRe.exec(src);
    if (declMatch) {
      openBracketIdx = declMatch.index + declMatch[0].length - 1;
      console.log(`[FOUND] ${patch.slug}: variable "${varName}"`);
    }
  }

  // Case 2: <FAQ ... items={[ ... ]} ... /> (inline array)
  if (openBracketIdx === -1) {
    const inlineMatch = /<FAQ\b[^>]*\bitems=\{\s*\[/.exec(src);
    if (inlineMatch) {
      openBracketIdx = inlineMatch.index + inlineMatch[0].length - 1;
      console.log(`[FOUND] ${patch.slug}: inline <FAQ items={[...]} />`);
    }
  }

  // Case 3: fallback search for any const *faq* = [
  if (openBracketIdx === -1) {
    const fallbackMatch = /(?:const|let)\s+[A-Za-z_$][\w$]*[Ff][Aa][Qq][\w$]*(?:\s*:\s*[^=]+)?\s*=\s*\[/.exec(src);
    if (fallbackMatch) {
      openBracketIdx = fallbackMatch.index + fallbackMatch[0].length - 1;
      console.log(`[FOUND] ${patch.slug}: fallback FAQ array`);
    }
  }

  if (openBracketIdx === -1) {
    warnings.push(`Could not locate FAQ array in ${patch.slug}. Inspect <FAQ usage manually.`);
    continue;
  }

  const closeBracketIdx = findMatchingBracket(src, openBracketIdx);
  if (closeBracketIdx === -1) {
    warnings.push(`Unbalanced [ in FAQ array for ${patch.slug}`);
    continue;
  }

  const arrayBody = src.slice(openBracketIdx, closeBracketIdx);
  // Auto-detect key names ({ q, a } vs { question, answer })
  const usesQuestionKey = /\bquestion\s*:/.test(arrayBody) && !/\bq\s*:/.test(arrayBody);
  const keyQ = usesQuestionKey ? "question" : "q";
  const keyA = usesQuestionKey ? "answer" : "a";

  const beforeClose = src.slice(0, closeBracketIdx).trimEnd();
  const needsComma = !beforeClose.endsWith(",") && !beforeClose.endsWith("[");
  const insertion =
    (needsComma ? "," : "") +
    formatEntries(patch.items, keyQ, keyA, "  ", eol, fullMarker);

  const updated = beforeClose + insertion + src.slice(closeBracketIdx);
  writeWithBackup(pagePath, updated);
  updatedCount += patch.items.length;
}

console.log("");
console.log("=== FAQ Fix Summary ===");
console.log(`FAQ items appended : ${updatedCount}`);
console.log(`Skipped            : ${skippedCount}`);
console.log(`Warnings           : ${warnings.length}`);
for (const w of warnings) {
  console.error(`  [WARN] ${w}`);
}
if (!DRY_RUN && warnings.length === 0) {
  console.log("Next step: run `npm run build` to verify.");
}
