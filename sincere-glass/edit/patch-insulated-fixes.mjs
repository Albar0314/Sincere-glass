// /products/insulated-glass follow-up fixes. Marker: SG-IGU-FIXES-V1
//  F1 layout.tsx title: drop the trailing " | Sincere Glass" (root template already appends the brand)
//  F2 Low-E surface: "#3 (inner face of the outer pane)" -> "#2" in the insulated components
//  F3 refresh IGUConfigurationTable + IGUSpecBuilder so their U-values match the page's existing chart
// Idempotent, .bak next to every changed file. Run from project root:
//   node edit\patch-insulated-fixes.mjs   then   npm run build
import { readFileSync, writeFileSync, existsSync, readdirSync } from "node:fs";

const COMP_DIR = "src/components/products/insulated";
const log = [];
function save(path, before, after) {
  writeFileSync(path + ".bak", before, "utf8");
  writeFileSync(path, after, "utf8");
}

// ---- F1 title
{
  const F = "src/app/products/insulated-glass/layout.tsx";
  if (!existsSync(F)) log.push("MISS F1 " + F + " not found");
  else {
    const raw = readFileSync(F, "utf8");
    const re = /^([ \t]*title: "Insulated Glass Manufacturer China [^"\r\n]*?)[ \t]*\|[ \t]*Sincere Glass",/gm;
    const hits = [...raw.matchAll(re)];
    if (hits.length === 1) {
      const m = hits[0];
      save(F, raw, raw.slice(0, m.index) + m[1] + '",' + raw.slice(m.index + m[0].length));
      log.push("OK   F1 title suffix removed");
    } else if (hits.length === 0 && /^[ \t]*title: "Insulated Glass Manufacturer China [^"|\r\n]*",/m.test(raw)) {
      log.push("SKIP F1 title already has no brand suffix");
    } else log.push("MISS F1 title anchor matched " + hits.length + " times - check layout.tsx manually");
  }
}

// ---- F2 Low-E surface number
{
  const OLD = "surface #3 (inner face of the outer pane)";
  const NEW = "surface #2 (inner face of the outer pane)";
  let changed = 0, already = 0;
  if (!existsSync(COMP_DIR)) log.push("MISS F2 " + COMP_DIR + " not found");
  else {
    for (const name of readdirSync(COMP_DIR)) {
      if (!name.endsWith(".tsx")) continue;
      const p = COMP_DIR + "/" + name;
      const raw = readFileSync(p, "utf8");
      if (raw.includes(OLD)) { save(p, raw, raw.split(OLD).join(NEW)); changed++; log.push("OK   F2 " + name); }
      else if (raw.includes(NEW)) already++;
    }
    if (!changed) log.push(already ? "SKIP F2 already #2" : "MISS F2 phrase not found in " + COMP_DIR + " - tell Claude which file holds the 'How an IGU Works' text");
  }
}

// ---- F3 refresh the two components delivered in SG-IGU-PRODUCT-UPGRADE-V1
for (const name of ["IGUConfigurationTable", "IGUSpecBuilder"]) {
  const src = "edit/" + name + ".tsx.txt";
  const dest = COMP_DIR + "/" + name + ".tsx";
  if (!existsSync(src)) { log.push("MISS F3 template " + src + " not found (download the new one)"); continue; }
  if (!existsSync(dest)) { log.push("MISS F3 " + dest + " not found (run patch-insulated-product-upgrade first)"); continue; }
  const tpl = readFileSync(src, "utf8");
  if (/[^\x00-\x7F]/.test(tpl)) { log.push("MISS F3 " + src + " contains non-ASCII characters"); continue; }
  if (name === "IGUSpecBuilder" && !tpl.includes("argon: [2.1, 1.7, 1.6, 1.4, 1.4]")) { log.push("MISS F3 " + src + " is the OLD template - download the new one"); continue; }
  if (name === "IGUConfigurationTable" && tpl.includes("double-silver")) { log.push("MISS F3 " + src + " is the OLD template - download the new one"); continue; }
  const cur = readFileSync(dest, "utf8");
  const EOL = cur.includes("\r\n") ? "\r\n" : "\n";
  const next = tpl.replace(/\r?\n/g, EOL);
  if (cur === next) log.push("SKIP F3 " + name + " already current");
  else { save(dest, cur, next); log.push("OK   F3 " + name + " refreshed"); }
}

for (const l of log) console.log("  " + l);
if (log.some((l) => l.startsWith("MISS"))) { console.log("\nSome steps were skipped (MISS). The OK steps are already applied."); process.exitCode = 1; }
else console.log("\nDone. Now run: npm run build");
