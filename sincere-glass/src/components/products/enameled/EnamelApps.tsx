"use client";
import { useInView } from "@/lib/useInView";

const apps = [
  { name: "Curtain Wall Spandrels", desc: "Hide floor slabs and structure behind decorative panels", tall: true },
  { name: "Building Facades", desc: "Create bold exterior statements with permanent color" },
  { name: "Interior Partitions", desc: "Privacy and design in offices and retail" },
  { name: "Decorative Columns", desc: "Wrap structural elements in color" },
  { name: "Signage & Branding", desc: "Logos and brand colors fused permanently into glass", tall: true },
  { name: "Privacy Screens", desc: "Gradient patterns for controlled transparency" },
  { name: "Canopies", desc: "Colored overhead glazing with solar control" },
  { name: "Feature Walls", desc: "Statement pieces in lobbies and atriums" },
];

export default function EnamelApps() {
  const { ref, isInView } = useInView({ threshold: 0.05 });

  return (
    <section className="py-20 md:py-28 bg-brand-lighter" ref={ref}>
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-brand-dark tracking-tight mb-10 text-center"
          style={{ opacity: isInView ? 1 : 0, transform: isInView ? "translateY(0)" : "translateY(16px)", transition: "all 600ms" }}>
          Applications
        </h2>

        {/* Masonry-style staggered grid */}
        <div className="columns-2 md:columns-3 lg:columns-4 gap-3 space-y-3">
          {apps.map((app, i) => (
            <div key={app.name}
              className={"bg-white rounded-xl p-5 border border-brand-light hover:border-brand-accent/20 hover:shadow-sm transition-all duration-300 break-inside-avoid " +
                (app.tall ? "pb-10" : "")}
              style={{ opacity: isInView ? 1 : 0, transform: isInView ? "translateY(0)" : "translateY(12px)", transition: "all 500ms", transitionDelay: (100 + i * 60) + "ms" }}>
              <h3 className="font-semibold text-brand-dark text-sm">{app.name}</h3>
              <p className="mt-1 text-xs text-brand-muted leading-relaxed">{app.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
