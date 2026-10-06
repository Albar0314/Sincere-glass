"use client";
import { useInView } from "@/lib/useInView";

const apps = [
  { name: "Overhead Glazing", desc: "Skylights, canopies, atriums — fragments stay bonded if broken", icon: "☀" },
  { name: "Hurricane Windows", desc: "Withstands windborne debris in coastal storm zones", icon: "🌪️" },
  { name: "Security Glazing", desc: "Bank counters, jewelry stores, government buildings", icon: "🔒" },
  { name: "Glass Floors", desc: "SGP interlayer maintains structural capacity after breakage", icon: "🏛️" },
  { name: "Museum Cases", desc: "99% UV blocking protects artwork and artifacts", icon: "🏨" },
  { name: "Acoustic Barriers", desc: "Highways, airports, urban noise walls", icon: "🔇" },
  { name: "Automotive", desc: "Windshields and sunroofs", icon: "🚗" },
];

export default function LaminatedApps() {
  const { ref, isInView } = useInView({ threshold: 0.05 });
  return (
    <section className="py-20 md:py-28 bg-brand-lighter overflow-hidden" ref={ref}>
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-8"
        style={{ opacity: isInView ? 1 : 0, transform: isInView ? "translateY(0)" : "translateY(16px)", transition: "all 600ms" }}>
        <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-brand-dark tracking-tight">Applications</h2>
      </div>

      {/* Horizontal scroll (different from grid in tempered/insulated) */}
      <div className="overflow-x-auto scrollbar-hide">
        <div className="flex gap-4 px-6 md:px-12 pb-4" style={{ minWidth: "max-content" }}>
          {apps.map((app, i) => (
            <div key={app.name}
              className="w-52 md:w-60 flex-shrink-0 bg-white rounded-xl p-5 border border-brand-light hover:border-brand-accent/20 hover:shadow-sm transition-all duration-300"
              style={{ opacity: isInView ? 1 : 0, transform: isInView ? "translateY(0)" : "translateY(16px)", transition: "all 500ms", transitionDelay: (100 + i * 60) + "ms" }}>
              <span className="text-2xl">{app.icon}</span>
              <h3 className="mt-3 font-semibold text-brand-dark text-sm">{app.name}</h3>
              <p className="mt-1 text-xs text-brand-muted leading-relaxed">{app.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
