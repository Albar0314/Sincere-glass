#!/usr/bin/env node
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
import { useState, useEffect, useCallback } from "react";
import { useInView } from "@/lib/useInView";
import InlineQuoteCTA from "@/components/products/InlineQuoteCTA";

function TemperedView() {
  const [show, setShow] = useState(false);
  useEffect(() => { requestAnimationFrame(() => setShow(true)); }, []);

  return (
    <div className="flex flex-col items-center text-center">
      <div className="grid grid-cols-8 gap-1 sm:gap-1.5 mb-6">
        {Array.from({ length: 64 }).map((_, i) => (
          <div
            key={i}
            className="w-4 h-4 sm:w-5 sm:h-5 rounded-sm bg-brand-accent/50"
            style={{
              opacity: show ? 1 : 0,
              transform: show ? "scale(1) rotate(0deg)" : "scale(0) rotate(45deg)",
              transition: "all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)",
              transitionDelay: i * 12 + "ms",
            }}
          />
        ))}
      </div>
      <h3 className="font-display text-lg md:text-xl font-bold text-white" style={{ opacity: show ? 1 : 0, transform: show ? "translateY(0)" : "translateY(10px)", transition: "all 0.4s ease-out 0.5s" }}>
        Small, blunt granules
      </h3>
      <p className="mt-2 text-white/50 text-xs sm:text-sm max-w-md" style={{ opacity: show ? 1 : 0, transition: "opacity 0.4s ease-out 0.6s" }}>
        Shatters into hundreds of small, harmless pieces. No sharp edges. Minimal injury risk.
      </p>
    </div>
  );
}

function OrdinaryView() {
  const [show, setShow] = useState(false);
  useEffect(() => { requestAnimationFrame(() => setShow(true)); }, []);

  const shards = [
    { w: 90, h: 55, r: -18, x: 15, y: 8 },
    { w: 65, h: 42, r: 28, x: 125, y: 25 },
    { w: 50, h: 70, r: -6, x: 0, y: 55 },
    { w: 75, h: 28, r: 42, x: 145, y: 0 },
    { w: 42, h: 60, r: -32, x: 78, y: 65 },
    { w: 60, h: 22, r: 58, x: 25, y: -2 },
    { w: 48, h: 38, r: 18, x: 155, y: 75 },
  ];

  return (
    <div className="flex flex-col items-center text-center">
      <div className="relative h-36 md:h-44 w-56 md:w-64 mb-6">
        {shards.map((s, i) => (
          <div
            key={i}
            className="absolute bg-red-500/25 border border-red-500/50"
            style={{
              width: s.w + "px",
              height: s.h + "px",
              left: s.x + "px",
              top: s.y + "px",
              transform: show
                ? "rotate(" + s.r + "deg) scale(1)"
                : "rotate(" + (s.r + 20) + "deg) scale(0.3)",
              opacity: show ? 1 : 0,
              clipPath: "polygon(8% 0%, 95% 3%, 90% 97%, 2% 92%)",
              transition: "all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)",
              transitionDelay: i * 100 + "ms",
            }}
          />
        ))}
      </div>
      <h3 className="font-display text-lg md:text-xl font-bold text-white" style={{ opacity: show ? 1 : 0, transform: show ? "translateY(0)" : "translateY(10px)", transition: "all 0.4s ease-out 0.5s" }}>
        Large, dangerous shards
      </h3>
      <p className="mt-2 text-white/50 text-xs sm:text-sm max-w-md" style={{ opacity: show ? 1 : 0, transition: "opacity 0.4s ease-out 0.6s" }}>
        Breaks into large, jagged shards with razor-sharp edges. Serious laceration risk.
      </p>
    </div>
  );
}

export default function BreakageComparison() {
  const { ref, isInView } = useInView();
  const [showTempered, setShowTempered] = useState(true);
  const [paused, setPaused] = useState(false);
  const [switchKey, setSwitchKey] = useState(0);

  useEffect(() => {
    if (!isInView || paused) return;
    const t = setInterval(() => {
      setShowTempered(prev => !prev);
      setSwitchKey(prev => prev + 1);
    }, 5000);
    return () => clearInterval(t);
  }, [isInView, paused]);

  function select(val: boolean) {
    setShowTempered(val);
    setSwitchKey(prev => prev + 1);
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

        {/* Toggle */}
        <div className="flex justify-center gap-2 mb-8">
          <button onClick={() => select(true)}
            className={"px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 " + (showTempered ? "bg-brand-accent text-brand-dark" : "bg-white/10 text-white/70 hover:bg-white/15")}>
            Tempered Glass
          </button>
          <button onClick={() => select(false)}
            className={"px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 " + (!showTempered ? "bg-red-500 text-white" : "bg-white/10 text-white/70 hover:bg-white/15")}>
            Ordinary Glass
          </button>
        </div>

        {/* Content — key forces remount = animation replays */}
        <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
          <div className="min-h-[300px] md:min-h-[340px] flex flex-col items-center justify-center p-8 md:p-12">
            {showTempered
              ? <TemperedView key={"t-" + switchKey} />
              : <OrdinaryView key={"o-" + switchKey} />
            }
          </div>

          {/* Indicator dots */}
          <div className="flex justify-center gap-2 pb-4">
            <div className={"w-2 h-2 rounded-full transition-colors duration-300 " + (showTempered ? "bg-brand-accent" : "bg-white/20")} />
            <div className={"w-2 h-2 rounded-full transition-colors duration-300 " + (!showTempered ? "bg-red-400" : "bg-white/20")} />
          </div>
        </div>

        <div className="mt-8">
          <InlineQuoteCTA text="Need safety glass for your project? Our tempered glass is 3C certified." product="tempered" variant="dark" />
        </div>
      </div>
    </section>
  );
}
`);

console.log("");
console.log("BreakageComparison animation fix done!");
console.log("");
console.log("Changes:");
console.log("  - Split into TemperedView / OrdinaryView sub-components");
console.log("  - Each has its own useState + useEffect for entrance animation");
console.log("  - key={switchKey} forces React to unmount/remount on every switch");
console.log("  - Tempered: squares pop in with bounce + rotation (12ms stagger)");
console.log("  - Ordinary: shards fly in from center with rotation (100ms stagger)");
console.log("  - Text fades in after shapes finish (0.5s delay)");
