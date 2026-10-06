"use client";
import { useInView } from "@/lib/useInView";
import { useCountUp } from "@/lib/useCountUp";

const stats = [
  { value: 2600, suffix: "+", label: "Projects delivered" },
  { value: 15, suffix: " yrs", label: "Industry experience" },
  { value: 1500, suffix: "+", label: "Clients served" },
  { value: 100, suffix: "%", label: "3C certified" },
];

const projects = [
  "Wuhan Station", "Tianhe Airport T3", "Haier International Plaza",
  "Poly Military Games Village", "Optics Valley World City",
];

export default function SocialProof() {
  const { ref, isInView } = useInView();

  return (
    <div ref={ref} className="bg-brand-dark/50 border-y border-white/5 py-8">
      <div className="max-w-5xl mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6"
          style={{ opacity: isInView ? 1 : 0, transition: "opacity 600ms" }}>
          <div className="flex flex-wrap justify-center gap-6 md:gap-10">
            {stats.map((s, i) => (
              <StatItem key={s.label} {...s} isActive={isInView} index={i} />
            ))}
          </div>
          <div className="hidden lg:block text-right">
            <p className="text-xs text-white/30 mb-1">Featured projects</p>
            <p className="text-xs text-white/50">{projects.join(" • ")}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatItem({ value, suffix, label, isActive, index }: {
  value: number; suffix: string; label: string; isActive: boolean; index: number;
}) {
  const count = useCountUp(value, isActive);
  return (
    <div className="text-center" style={{ transitionDelay: (index * 100) + "ms" }}>
      <span className="font-display text-xl md:text-2xl font-bold text-white tabular-nums">
        {count.toLocaleString()}<span className="text-brand-accent">{suffix}</span>
      </span>
      <p className="text-[10px] md:text-xs text-white/40 mt-0.5">{label}</p>
    </div>
  );
}
