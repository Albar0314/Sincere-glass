"use client";

import { useInView } from "@/lib/useInView";
import { useCountUp } from "@/lib/useCountUp";

const stats = [
  { value: 15, suffix: "+", label: "Years Experience" },
  { value: 20000, suffix: "㎡", label: "Factory Area" },
  { value: 2600, suffix: "+", label: "Projects Completed" },
  { value: 1500, suffix: "+", label: "Clients Served" },
];

function StatItem({
  value,
  suffix,
  label,
  isActive,
  index,
}: {
  value: number;
  suffix: string;
  label: string;
  isActive: boolean;
  index: number;
}) {
  const count = useCountUp(value, isActive);

  return (
    <div
      className="flex flex-col items-center py-5 transition-all duration-500 ease-out"
      style={{
        transitionDelay: `${index * 100}ms`,
        opacity: isActive ? 1 : 0,
        transform: isActive ? "translateY(0)" : "translateY(12px)",
      }}
    >
      <span className="font-display text-2xl md:text-3xl font-bold text-white tabular-nums">
        {count.toLocaleString()}
        <span className="text-brand-accent">{suffix}</span>
      </span>
      <span className="mt-1 text-sm text-white/60 tracking-wide">
        {label}
      </span>
    </div>
  );
}

export default function TrustBar() {
  const { ref, isInView } = useInView({ threshold: 0.3 });

  return (
    <div ref={ref} className="bg-brand-primary border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/10">
          {stats.map((stat, i) => (
            <StatItem key={stat.label} {...stat} isActive={isInView} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
