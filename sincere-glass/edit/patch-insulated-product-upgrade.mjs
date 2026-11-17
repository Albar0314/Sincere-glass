// W2-#9: /products/insulated-glass upgrade (config table + spec builder + cluster guides)
// Marker: SG-IGU-PRODUCT-UPGRADE-V1. Idempotent, CRLF-tolerant, .bak backup next to page.tsx.
// Run from project root:  node edit\patch-insulated-product-upgrade.mjs   then   npm run build
import { readFileSync, writeFileSync, existsSync, mkdirSync } from "node:fs";

const MARKER = "SG-IGU-PRODUCT-UPGRADE-V1";
const PAGE = "src/app/products/insulated-glass/page.tsx";
const COMP_DIR = "src/components/products/insulated";
const QUOTE_CTX = "src/lib/QuoteContext.tsx";
const COMPONENTS = ["IGUConfigurationTable", "IGUSpecBuilder", "InsulatedGuides"];

function fail(msg) {
  console.error("ABORT: " + msg);
  console.error("Nothing was written to page.tsx.");
  process.exit(1);
}

// ---- 1. preconditions (no writes yet)
if (!existsSync(PAGE)) fail("missing " + PAGE + " (run from project root)");
if (!existsSync(QUOTE_CTX)) fail("missing " + QUOTE_CTX);
if (!readFileSync(QUOTE_CTX, "utf8").includes("prefillMessage")) {
  fail(QUOTE_CTX + " has no prefillMessage - openQuote(product, message) would not compile.");
}
if (!existsSync("src/components/LocalizedLink.tsx")) fail("missing src/components/LocalizedLink.tsx");

const templates = {};
for (const name of COMPONENTS) {
  const a = "edit/" + name + ".tsx.txt";
  const b = "edit/" + name + ".tsx";
  const src = existsSync(a) ? a : existsSync(b) ? b : null;
  if (!src) fail("template not found: " + a);
  const body = readFileSync(src, "utf8");
  if (/[^\x00-\x7F]/.test(body)) fail(src + " contains non-ASCII characters (file was re-encoded?)");
  templates[name] = body;
}

const raw = readFileSync(PAGE, "utf8");
const EOL = raw.includes("\r\n") ? "\r\n" : "\n";
const toEol = (s) => s.replace(/\r?\n/g, EOL);

// ---- 2. plan page patch
let next = raw;
if (raw.includes(MARKER)) {
  console.log("page.tsx already patched (" + MARKER + "), skipping page edit.");
} else {
  const steps = [
    {
      name: "imports after VideoSchema import",
      re: /^(import VideoSchema from "@\/components\/VideoSchema";)[ \t]*\r?\n/gm,
      build: (m) =>
        m[1] + EOL +
        COMPONENTS.map((c) => 'import ' + c + ' from "@/components/products/insulated/' + c + '";').join(EOL) + EOL,
    },
    {
      name: "table + builder after <InsulatedSpecs />",
      re: /^([ \t]*)<InsulatedSpecs \/>[ \t]*\r?\n/gm,
      build: (m) =>
        m[1] + "<InsulatedSpecs />" + EOL +
        m[1] + "{/* " + MARKER + " */}" + EOL +
        m[1] + "<IGUConfigurationTable />" + EOL +
        m[1] + "<IGUSpecBuilder />" + EOL,
    },
    {
      name: "guides before <InsulatedFAQ ... />",
      re: /^([ \t]*)(<InsulatedFAQ faqItems=\{faqItems\} \/>)[ \t]*\r?\n/gm,
      build: (m) => m[1] + "<InsulatedGuides />" + EOL + m[1] + m[2] + EOL,
    },
  ];
  for (const s of steps) {
    const hits = [...next.matchAll(s.re)];
    if (hits.length !== 1) {
      console.error("---- page.tsx head (600 chars) ----");
      console.error(raw.slice(0, 600));
      fail("anchor for [" + s.name + "] matched " + hits.length + " times (expected 1)");
    }
    const m = hits[0];
    next = next.slice(0, m.index) + s.build(m) + next.slice(m.index + m[0].length);
    console.log("OK   " + s.name);
  }
}

// ---- 3. write (components first, then page)
if (!existsSync(COMP_DIR)) mkdirSync(COMP_DIR, { recursive: true });
for (const name of COMPONENTS) {
  const dest = COMP_DIR + "/" + name + ".tsx";
  const body = toEol(templates[name]);
  if (existsSync(dest) && readFileSync(dest, "utf8") === body) {
    console.log("SKIP " + dest + " (identical)");
  } else {
    writeFileSync(dest, body, "utf8");
    console.log("WROTE " + dest);
  }
}
if (next !== raw) {
  writeFileSync(PAGE + ".bak", raw, "utf8");
  writeFileSync(PAGE, next, "utf8");
  console.log("WROTE " + PAGE + " (backup: page.tsx.bak)");
}
console.log("\nDone. Now run: npm run build");
