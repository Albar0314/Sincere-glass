#!/usr/bin/env node
/**
 * Fix BreakageComparison display issue
 * 从项目根目录运行: node edit/patch-breakage-fix.mjs
 */
import { writeFileSync, existsSync, mkdirSync } from "fs";
import { join, dirname } from "path";
const root = process.cwd();
function write(rel, content) {
  const p = join(root, rel);
  const dir = dirname(p);
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
  const existed = existsSync(p);
  writeFileSync(p, content, "utf-8");
  console.log((existed ? "\u270F\uFE0F  \u8986\u76D6" : "\u2705  \u521B\u5EFA") + ": " + rel);
}

write("src/components/products/tempered/BreakageComparison.tsx", `"use client";
import { useState, useEffect } from "react";
import { useInView } from "@/lib/useInView";
import InlineQuoteCTA from "@/components/products/InlineQuoteCTA";

export default function BreakageComparison() {
  const { ref, isInView } = useInView();
  const [showTempered, setShowTempered] = useState(true);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (!isInView || paused) return;
    const t = setInterval(() => setShowTempered(prev => !prev), 5000);
    return () => clearInterval(t);
  }, [isInView, paused]);

  function select(val: boolean) {
    setShowTempered(val);
    setPaused(true);
    setTimeout(() => setPaused(false), 10000);
  }

  return (
    <section className="py-20 md:py-28 bg-brand-dark" ref={ref}>
      <div className="max-w-5xl mx-auto px-6 md:px-12">
        <div
          className="text-center mb-10"
          style={{
            opacity: isInView ? 1 : 0,
            transform: isInView ? "translateY(0)" : "translateY(20px)",
            transition: "all 600ms",
          }}
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold text-white tracking-tight">
            Why &quot;Safety Glass&quot; Matters
          </h2>
          <p className="mt-4 text-white/60 text-lg max-w-2xl mx-auto">
            See the difference in breakage pattern \u2014 it\u2019s why building codes require tempered glass.
          </p>
        </div>

        {/* Toggle buttons */}
        <div className="flex justify-center gap-2 mb-8">
          <button
            onClick={() => select(true)}
            className={
              "px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 " +
              (showTempered
                ? "bg-brand-accent text-brand-dark"
                : "bg-white/10 text-white/70 hover:bg-white/15")
            }
          >
            Tempered Glass
          </button>
          <button
            onClick={() => select(false)}
            className={
              "px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 " +
              (!showTempered
                ? "bg-red-500 text-white"
                : "bg-white/10 text-white/70 hover:bg-white/15")
            }
          >
            Ordinary Glass
          </button>
        </div>

        {/* Comparison container - NO absolute positioning */}
        <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
          <div className="min-h-[300px] md:min-h-[340px] flex flex-col items-center justify-center p-8 md:p-12">
            {showTempered ? (
              /* ===== TEMPERED VIEW ===== */
              <div className="flex flex-col items-center text-center">
                <div className="grid grid-cols-8 gap-1 sm:gap-1.5 mb-6">
                  {Array.from({ length: 64 }).map((_, i) => (
                    <div
                      key={"t-" + i}
                      className="w-4 h-4 sm:w-5 sm:h-5 rounded-sm bg-brand-accent/50"
                      style={{
                        opacity: isInView ? 1 : 0,
                        transform: isInView ? "scale(1)" : "scale(0)",
                        transition: "all 0.3s ease-out",
                        transitionDelay: i * 10 + "ms",
                      }}
                    />
                  ))}
                </div>
                <h3 className="font-display text-lg md:text-xl font-bold text-white">
                  Small, blunt granules
                </h3>
                <p className="mt-2 text-white/50 text-xs sm:text-sm max-w-md">
                  Shatters into hundreds of small, harmless pieces. No sharp edges. Minimal injury risk.
                </p>
              </div>
            ) : (
              /* ===== ORDINARY VIEW ===== */
              <div className="flex flex-col items-center text-center">
                <div className="relative h-36 md:h-44 w-56 md:w-64 mb-6">
                  {[
                    { w: 90, h: 60, r: -15, x: 20, y: 10 },
                    { w: 70, h: 45, r: 25, x: 120, y: 30 },
                    { w: 55, h: 75, r: -8, x: 5, y: 55 },
                    { w: 80, h: 30, r: 40, x: 140, y: 5 },
                    { w: 45, h: 65, r: -30, x: 80, y: 70 },
                    { w: 65, h: 25, r: 55, x: 30, y: 0 },
                    { w: 50, h: 40, r: 15, x: 160, y: 80 },
                  ].map((s, i) => (
                    <div
                      key={"o-" + i}
                      className="absolute bg-red-500/25 border border-red-500/50"
                      style={{
                        width: s.w + "px",
                        height: s.h + "px",
                        left: s.x + "px",
                        top: s.y + "px",
                        transform: "rotate(" + s.r + "deg)",
                        clipPath: "polygon(8% 0%, 95% 3%, 90% 97%, 2% 92%)",
                        opacity: isInView ? 1 : 0,
                        transition: "opacity 0.4s ease-out",
                        transitionDelay: i * 80 + "ms",
                      }}
                    />
                  ))}
                </div>
                <h3 className="font-display text-lg md:text-xl font-bold text-white">
                  Large, dangerous shards
                </h3>
                <p className="mt-2 text-white/50 text-xs sm:text-sm max-w-md">
                  Breaks into large, jagged shards with razor-sharp edges. Serious laceration risk.
                </p>
              </div>
            )}
          </div>

          {/* Auto-switch indicator */}
          <div className="flex justify-center gap-2 pb-4">
            <div className={"w-2 h-2 rounded-full transition-colors duration-300 " + (showTempered ? "bg-brand-accent" : "bg-white/20")} />
            <div className={"w-2 h-2 rounded-full transition-colors duration-300 " + (!showTempered ? "bg-red-400" : "bg-white/20")} />
          </div>
        </div>

        <div className="mt-8">
          <InlineQuoteCTA
            text="Need safety glass for your project? Our tempered glass is 3C certified."
            product="tempered"
            variant="dark"
          />
        </div>
      </div>
    </section>
  );
}
`);

console.log("");
console.log("BreakageComparison fix done!");
console.log("Key changes:");
console.log("  - Removed absolute positioning (was causing invisible content)");
console.log("  - Using conditional rendering instead of opacity toggle");
console.log("  - Fixed-size squares (w-4/h-4) instead of aspect-ratio");
console.log("  - Shard positions use left/top instead of translate");
console.log("  - Added auto-switch indicator dots");
console.log("");
console.log("Run: npm run dev and check /products/tempered-glass");
