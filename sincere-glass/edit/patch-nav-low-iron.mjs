#!/usr/bin/env node
/**
 * Sincere Glass - Add Low Iron Glass to Header & Footer Navigation
 * Marker: SG-NAV-LOW-IRON-V1
 *
 * Targets (verified against live source):
 *   1. src/components/Header.tsx -> products[]
 *   2. src/components/Footer.tsx -> productLinks[]
 *
 * Pre-requisite: product.lowIron.name & product.lowIron.desc exist in src/lib/dict.ts
 *
 * Usage:
 *   node edit\patch-nav-low-iron.mjs --dry-run
 *   node edit\patch-nav-low-iron.mjs
 *   npm run build
 */

import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const DRY_RUN = process.argv.includes("--dry-run");
const MARKER = "SG-NAV-LOW-IRON-V1";

function log(msg) {
  console.log((DRY_RUN ? "[DRY-RUN] " : "") + msg);
}

function detectEol(text) {
  return text.includes("\r\n") ? "\r\n" : "\n";
}

function writeWithBackup(absPath, content) {
  if (DRY_RUN) {
    log("[WOULD WRITE] " + path.relative(ROOT, absPath));
    return;
  }
  const bak = absPath + ".bak";
  if (!fs.existsSync(bak)) {
    fs.copyFileSync(absPath, bak);
    log("[BAK] " + path.relative(ROOT, bak));
  }
  fs.writeFileSync(absPath, content, "utf8");
  log("[UPDATED] " + path.relative(ROOT, absPath));
}

function patchHeader() {
  const absPath = path.join(ROOT, "src", "components", "Header.tsx");
  if (!fs.existsSync(absPath)) {
    throw new Error("Missing file: " + absPath);
  }
  const src = fs.readFileSync(absPath, "utf8");
  const eol = detectEol(src);

  if (src.includes("/products/low-iron-glass") || src.includes('"lowIron"')) {
    log("[SKIP] Header.tsx already includes lowIron / /products/low-iron-glass");
    return;
  }

  const anchor = /(\{\s*key:\s*"lowE",\s*href:\s*"\/products\/low-e-glass",\s*image:\s*"\/images\/products\/low-e\.jpg"\s*\},)/;
  if (!anchor.test(src)) {
    throw new Error("Anchor not found in src/components/Header.tsx");
  }

  const entry =
    '$1' +
    eol +
    '  { key: "lowIron",        href: "/products/low-iron-glass",         image: "/images/products/low-iron.jpg" },';

  const updated = src.replace(anchor, entry);
  writeWithBackup(absPath, updated);
}

function patchFooter() {
  const absPath = path.join(ROOT, "src", "components", "Footer.tsx");
  if (!fs.existsSync(absPath)) {
    throw new Error("Missing file: " + absPath);
  }
  const src = fs.readFileSync(absPath, "utf8");
  const eol = detectEol(src);

  if (src.includes("/products/low-iron-glass") || src.includes('"lowIron"')) {
    log("[SKIP] Footer.tsx already includes lowIron / /products/low-iron-glass");
    return;
  }

  const anchor = /(\{\s*key:\s*"curvedTempered",\s*href:\s*"\/products\/curved-tempered-glass"\s*\},)/;
  if (!anchor.test(src)) {
    throw new Error("Anchor not found in src/components/Footer.tsx");
  }

  const entry =
    '$1' +
    eol +
    '  { key: "lowIron",         href: "/products/low-iron-glass" },';

  const updated = src.replace(anchor, entry);
  writeWithBackup(absPath, updated);
}

log("=== Running " + MARKER + " ===");
patchHeader();
patchFooter();
if (!DRY_RUN) {
  console.log("Done! Run `npm run build` next to verify.");
}
