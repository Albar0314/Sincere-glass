// patch-article-grok-improvements.mjs
// Non-destructive, idempotent patch that adds Grok-feedback GEO improvements
// to the EXISTING /blog/curved-glass-vs-flat-glass article page.
//
// Inserts 6 new blocks at anchor-matched positions. Does NOT delete or modify
// any existing paragraph, interactive component, or import.
//
// Each inserted block carries the marker  GROK-INSERT-V1  for idempotence —
// re-running the script skips any insertion that is already present.
//
// Writes a backup to page.tsx.pre-grok.bak before touching anything.
//
// Run from project root:
//   node edit\patch-article-grok-improvements.mjs

import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const ROOT = process.cwd();
const PAGE = join(ROOT, 'src', 'app', 'blog', 'curved-glass-vs-flat-glass', 'page.tsx');
const BAK  = PAGE + '.pre-grok.bak';

if (!existsSync(PAGE)) {
  console.error('✗ Page file not found:', PAGE);
  process.exit(1);
}

const original = readFileSync(PAGE, 'utf8');
let src = original;
let changed = 0;
const skipped = [];

function insertAfter(anchor, label, block) {
  if (src.includes(`{/* GROK-INSERT-V1:${label} */}`)) {
    skipped.push(label);
    return;
  }
  if (!src.includes(anchor)) {
    console.log(`⚠ Anchor for "${label}" not found. Skipping. (anchor hint: ${anchor.slice(0, 60)}...)`);
    return;
  }
  const marked = `{/* GROK-INSERT-V1:${label} */}\n${block}`;
  src = src.replace(anchor, anchor + '\n\n        ' + marked);
  changed += 1;
  console.log(`✓ Inserted "${label}" after anchor`);
}

// ─── Block 1: 30-second verdict + Standards badges ─────────────────────────
// Anchor: TLDRBox render (immediately after it, before the first H2).
const anchor1 =
  '<TLDRBox takeaways={article.tldr || []} />';
// Fallback anchor if the above has different formatting:
const anchor1Alt = '<TLDRBox takeaways={article.tldr';

const block1 = `
        <div className="not-prose my-8 p-5 rounded-xl border-l-4 border-[#DAA745] bg-[#FAFAF8] dark:bg-[#1C1F26]/40">
          <p className="text-xs uppercase tracking-wider text-[#DAA745] font-semibold mb-2">
            The 30-second verdict
          </p>
          <p className="text-base md:text-lg leading-relaxed text-[#1C1F26] dark:text-[#F2F0ED] m-0">
            <strong>Flat glass is the architectural default.</strong> Pay the curved premium only when your project hits at least two of these four pressure factors:
            <span className="block mt-2 text-sm text-[#3A4250] dark:text-[#8B95A5]">
              (1) geometry physically demands a curved panel ·
              (2) visual continuity matters at the viewing distance ·
              (3) panel size is large enough that facet joints would read ·
              (4) budget can absorb the premium.
            </span>
            <span className="block mt-2 text-sm text-[#3A4250] dark:text-[#8B95A5]">
              Hybrid builds (curved at focal zones, faceted flat elsewhere) typically hold the project premium under +25%.
            </span>
          </p>
        </div>

        <div className="not-prose my-6 flex flex-wrap gap-2">
          {[
            { code: 'GB 15763.2-2005', region: 'China', meaning: 'Safety glass tempered' },
            { code: 'ASTM C1048', region: 'US', meaning: 'Heat-treated flat glass' },
            { code: 'EN 12150', region: 'EU', meaning: 'Thermally toughened' },
            { code: 'EN 14179', region: 'EU', meaning: 'Heat-soaked tempered' },
          ].map((s) => (
            <div
              key={s.code}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-[#3A4250]/5 dark:bg-white/5 border border-[#3A4250]/15 dark:border-white/10 text-xs"
              title={s.meaning}
            >
              <span className="font-mono font-semibold text-[#1C1F26] dark:text-[#F2F0ED]">{s.code}</span>
              <span className="text-[#8B95A5]">· {s.region}</span>
            </div>
          ))}
        </div>`;

if (src.includes(anchor1)) {
  insertAfter(anchor1, 'verdict-and-standards', block1);
} else {
  // Fallback: find any TLDRBox usage and anchor on its full tag end
  const regex = /<TLDRBox[^>]*\/>/;
  const match = src.match(regex);
  if (match) {
    insertAfter(match[0], 'verdict-and-standards', block1);
  } else {
    console.log('⚠ Could not find TLDRBox to anchor verdict/standards block');
  }
}

// ─── Block 2: Cost breakdown table (before CurvedPremiumCalculator) ────────
// Anchor: the H2 for cost-calculator.
const anchor2 = '<h2 id="cost-calculator">The real cost delta, calculated</h2>';
const block2 = `
        <figure className="not-prose my-6 overflow-x-auto">
          <table
            className="w-full text-sm border-collapse"
            aria-label="Cost premium breakdown of curved tempered glass over flat tempered glass"
          >
            <caption className="text-left text-xs text-[#8B95A5] mb-3 italic">
              Reference pricing: Sincere Glass FOB Wuhan quotations, 2023 Q1 – 2026 Q3. Not a formal quote; subject to specification, coating, and FX.
            </caption>
            <thead>
              <tr className="border-b-2 border-[#3A4250]/30 bg-[#FAFAF8] dark:bg-[#3A4250]/20">
                <th scope="col" className="text-left py-2.5 px-3 font-semibold">Shape class</th>
                <th scope="col" className="text-left py-2.5 px-3 font-semibold">Price (10mm, 1.5×2.5m ref)</th>
                <th scope="col" className="text-left py-2.5 px-3 font-semibold">Delta vs flat</th>
                <th scope="col" className="text-left py-2.5 px-3 font-semibold">When it fits</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-[#3A4250]/10">
                <th scope="row" className="py-2.5 px-3 font-semibold">Flat tempered</th>
                <td className="py-2.5 px-3 font-mono">USD 75–90 /m²</td>
                <td className="py-2.5 px-3 font-mono">Baseline</td>
                <td className="py-2.5 px-3 text-[#8B95A5]">Default</td>
              </tr>
              <tr className="border-b border-[#3A4250]/10">
                <th scope="row" className="py-2.5 px-3 font-semibold">Curved cylindrical (standard R)</th>
                <td className="py-2.5 px-3 font-mono">USD 140–180 /m²</td>
                <td className="py-2.5 px-3 font-mono text-[#DAA745]">+70–110%</td>
                <td className="py-2.5 px-3 text-[#8B95A5]">R ≥ 800 mm, reusable molds</td>
              </tr>
              <tr className="border-b border-[#3A4250]/10">
                <th scope="row" className="py-2.5 px-3 font-semibold">Curved cylindrical (tight R &lt; 800 mm)</th>
                <td className="py-2.5 px-3 font-mono">USD 180–250 /m²</td>
                <td className="py-2.5 px-3 font-mono text-[#DAA745]">+120–200%</td>
                <td className="py-2.5 px-3 text-[#8B95A5]">Yield loss + bespoke mold</td>
              </tr>
              <tr className="border-b border-[#3A4250]/10">
                <th scope="row" className="py-2.5 px-3 font-semibold">Curved spherical</th>
                <td className="py-2.5 px-3 font-mono">USD 250–380 /m²</td>
                <td className="py-2.5 px-3 font-mono text-[#DAA745]">+230–320%</td>
                <td className="py-2.5 px-3 text-[#8B95A5]">Custom-cast refractory mold</td>
              </tr>
              <tr>
                <th scope="row" className="py-2.5 px-3 font-semibold">Free-form (CNC mold per panel)</th>
                <td className="py-2.5 px-3 font-mono">USD 320–480 /m²</td>
                <td className="py-2.5 px-3 font-mono text-[#DAA745]">+325–435%</td>
                <td className="py-2.5 px-3 text-[#8B95A5]">4-panel MOQ per profile</td>
              </tr>
            </tbody>
          </table>
        </figure>`;

insertAfter(anchor2, 'cost-breakdown-table', block2);

// ─── Block 3: Six static scenario cards (before ProjectFitAdvisor) ─────────
// Anchor: the H2 for project-fit.
const anchor3 = '<h2 id="project-fit">Six project types, six verdicts</h2>';
const block3 = `
        <div className="not-prose my-8 grid md:grid-cols-2 gap-4">
          {[
            {
              name: 'Panoramic lift / glass elevator',
              verdict: 'Curved',
              costDelta: '+90–130% vs flat',
              buildup: '10 mm or 12 mm curved tempered, R = 1,500–2,500 mm',
              reason: 'Shaft geometry physically demands cylindrical panels; one panel spans up to 15 m vertically on our line.',
            },
            {
              name: 'Multi-story curved curtain wall',
              verdict: 'Hybrid',
              costDelta: '+25–45% blended vs full-flat',
              buildup: 'Ground floor: 8+1.52+8 curved laminated. Upper floors: flat IGU with Low-E.',
              reason: 'At viewing distances > 15 m the eye reads faceted flat as curved. Keep the premium where it counts.',
            },
            {
              name: 'Entrance canopy / porte-cochere',
              verdict: 'Curved',
              costDelta: '+30–60% vs flat',
              buildup: '6+1.52+6 laminated, R = 5,000–15,000 mm, cold-bent on-site',
              reason: 'Gentle radius means cold-bending flat panels into curved frames on site — cost-effective.',
            },
            {
              name: 'Boutique retail shopfront',
              verdict: 'Curved',
              costDelta: '+70–110% vs flat',
              buildup: '10 mm or 12 mm curved tempered, R = 2,000–4,000 mm',
              reason: 'Flagship facades judged by brand positioning. Glass area is usually small (10–40 m²) so absolute premium stays modest.',
            },
            {
              name: 'Standard office perimeter facade',
              verdict: 'Flat',
              costDelta: 'Baseline (0%)',
              buildup: '6+1.52+6 or 8+1.52+8 flat laminated IGU',
              reason: 'No geometric or visual demand that curved glass solves. Curved here would add 60–200% cost for zero project benefit.',
              isFallback: true,
            },
            {
              name: 'Sculptural free-form feature wall',
              verdict: 'Curved',
              costDelta: '+150–250% vs flat',
              buildup: 'Varies — custom CNC mold per unique panel profile',
              reason: 'Design intent is the glass itself. 45–70 day lead from approved 3D model. 4-panel MOQ per profile.',
            },
          ].map((s) => (
            <div
              key={s.name}
              className={\`p-5 rounded-xl border \${
                s.isFallback
                  ? 'bg-[#F2F0ED]/50 dark:bg-[#3A4250]/20 border-[#3A4250]/20'
                  : 'bg-white dark:bg-[#1C1F26]/60 border-[#DAA745]/30'
              }\`}
            >
              <div className="flex items-start justify-between gap-3 mb-2">
                <h4 className="text-sm font-semibold text-[#1C1F26] dark:text-[#F2F0ED] m-0">{s.name}</h4>
                <span
                  className={\`text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded whitespace-nowrap \${
                    s.isFallback
                      ? 'bg-[#3A4250]/10 text-[#3A4250] dark:text-[#8B95A5]'
                      : 'bg-[#DAA745]/15 text-[#DAA745]'
                  }\`}
                >
                  {s.verdict}
                </span>
              </div>
              <p className="text-xs text-[#8B95A5] mb-1 font-mono">{s.costDelta}</p>
              <p className="text-xs text-[#3A4250] dark:text-[#8B95A5] font-mono mb-2">{s.buildup}</p>
              <p className="text-sm text-[#3A4250] dark:text-[#8B95A5] leading-relaxed m-0">{s.reason}</p>
            </div>
          ))}
        </div>
        <p className="text-xs text-[#8B95A5] italic -mt-4 mb-4">
          Static scenario cards above. The interactive advisor below walks the same six scenarios one at a time with the full reasoning chain.
        </p>`;

insertAfter(anchor3, 'static-scenario-cards', block3);

// ─── Block 4: Procurement tables (lead time + container load) ──────────────
// Anchor: the H2 for procurement.
const anchor4 = '<h2 id="procurement">Lead time, MOQ, and container economics</h2>';
const block4 = `
        <figure className="not-prose my-6 overflow-x-auto">
          <table
            className="w-full text-sm border-collapse"
            aria-label="Lead time comparison for flat and curved tempered glass"
          >
            <caption className="text-left text-xs text-[#8B95A5] mb-3 italic">
              Table · Lead time by shape class, EXW Wuhan. Add 30–40 days for sea freight to Europe or North America. Data verified October 2026.
            </caption>
            <thead>
              <tr className="border-b-2 border-[#3A4250]/30 bg-[#FAFAF8] dark:bg-[#3A4250]/20">
                <th scope="col" className="text-left py-2.5 px-3 font-semibold">Shape</th>
                <th scope="col" className="text-left py-2.5 px-3 font-semibold">Lead time (PO → ready)</th>
                <th scope="col" className="text-left py-2.5 px-3 font-semibold">MOQ</th>
                <th scope="col" className="text-left py-2.5 px-3 font-semibold">Tooling</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-[#3A4250]/10">
                <th scope="row" className="py-2.5 px-3 font-semibold">Flat tempered</th>
                <td className="py-2.5 px-3 font-mono">20–30 days</td>
                <td className="py-2.5 px-3 font-mono">None</td>
                <td className="py-2.5 px-3 text-[#8B95A5]">No tooling</td>
              </tr>
              <tr className="border-b border-[#3A4250]/10">
                <th scope="row" className="py-2.5 px-3 font-semibold">Curved cylindrical</th>
                <td className="py-2.5 px-3 font-mono">25–35 days</td>
                <td className="py-2.5 px-3 font-mono">1 panel</td>
                <td className="py-2.5 px-3 text-[#8B95A5]">Reusable steel mold</td>
              </tr>
              <tr className="border-b border-[#3A4250]/10">
                <th scope="row" className="py-2.5 px-3 font-semibold">Curved spherical</th>
                <td className="py-2.5 px-3 font-mono">35–55 days</td>
                <td className="py-2.5 px-3 font-mono">4 panels / profile</td>
                <td className="py-2.5 px-3 text-[#8B95A5]">Custom-cast refractory mold</td>
              </tr>
              <tr>
                <th scope="row" className="py-2.5 px-3 font-semibold">Free-form</th>
                <td className="py-2.5 px-3 font-mono">45–70 days</td>
                <td className="py-2.5 px-3 font-mono">4 panels / profile</td>
                <td className="py-2.5 px-3 text-[#8B95A5]">CNC-machined per 3D model</td>
              </tr>
            </tbody>
          </table>
        </figure>

        <figure className="not-prose my-6 overflow-x-auto">
          <table
            className="w-full text-sm border-collapse"
            aria-label="Container loading density, flat vs curved tempered glass"
          >
            <caption className="text-left text-xs text-[#8B95A5] mb-3 italic">
              Table · Container loading density. Curved panels require custom nested cradles, so freight cost scales with cubic meters rather than panel weight.
            </caption>
            <thead>
              <tr className="border-b-2 border-[#3A4250]/30 bg-[#FAFAF8] dark:bg-[#3A4250]/20">
                <th scope="col" className="text-left py-2.5 px-3 font-semibold">Container</th>
                <th scope="col" className="text-left py-2.5 px-3 font-semibold">Flat (m²)</th>
                <th scope="col" className="text-left py-2.5 px-3 font-semibold">Curved (m²)</th>
                <th scope="col" className="text-left py-2.5 px-3 font-semibold">Density vs flat</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-[#3A4250]/10">
                <th scope="row" className="py-2.5 px-3 font-semibold">20' DC</th>
                <td className="py-2.5 px-3 font-mono">320–400 m²</td>
                <td className="py-2.5 px-3 font-mono">160–240 m²</td>
                <td className="py-2.5 px-3 font-mono text-[#DAA745]">~50–60%</td>
              </tr>
              <tr>
                <th scope="row" className="py-2.5 px-3 font-semibold">40' HQ</th>
                <td className="py-2.5 px-3 font-mono">650–800 m²</td>
                <td className="py-2.5 px-3 font-mono">350–550 m²</td>
                <td className="py-2.5 px-3 font-mono text-[#DAA745]">~55–70%</td>
              </tr>
            </tbody>
          </table>
        </figure>`;

insertAfter(anchor4, 'procurement-tables', block4);

// ─── Finalize ──────────────────────────────────────────────────────────────
if (changed === 0 && skipped.length === 0) {
  console.log('');
  console.log('⚠ No changes made. Anchors may have shifted — inspect the file manually.');
  process.exit(0);
}

if (changed > 0) {
  writeFileSync(BAK, original, 'utf8');
  console.log('');
  console.log(`✓ Backup written: ${BAK}`);
  writeFileSync(PAGE, src, 'utf8');
  console.log(`✓ Updated ${PAGE}`);
}

console.log('');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log(`Inserted ${changed} new blocks. Skipped (already present): ${skipped.length ? skipped.join(', ') : 'none'}`);
console.log('');
console.log('Blocks:');
console.log('  1. "verdict-and-standards" — 30-second verdict + 4 standards badges, after TLDRBox');
console.log('  2. "cost-breakdown-table" — 5-row price delta table, after cost-calculator H2');
console.log('  3. "static-scenario-cards" — 6 static cards, before ProjectFitAdvisor');
console.log('  4. "procurement-tables" — lead-time + container-load tables, after procurement H2');
console.log('');
console.log('Next:');
console.log('  npm run build');
console.log('');
console.log('If anything looks off, restore:');
console.log(`  copy /Y "${BAK}" "${PAGE}"`);
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
