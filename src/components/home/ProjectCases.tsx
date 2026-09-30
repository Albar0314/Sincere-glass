"use client";

import Image from "next/image";
import Link from "next/link";
import { useInView } from "@/lib/useInView";

const projects = [
  { name: "Wuhan Railway Station", type: "Insulated Glass", image: "/images/cases/wuhan-station.jpg" },
  { name: "Tianhe Airport T3 Terminal", type: "Tempered + Laminated", image: "/images/cases/tianhe-t3.jpg" },
  { name: "Wuhan International Expo Center", type: "Insulated Glass", image: "/images/cases/guobo.jpg" },
  { name: "Haier International Plaza", type: "Low-E Glass", image: "/images/cases/haier.jpg" },
  { name: "Country Garden Phoenix City", type: "Tempered Glass", image: "/images/cases/biguiyuan.jpg" },
  { name: "Jiangxia People's Hospital", type: "Insulated Glass", image: "/images/cases/jiangxia-hospital.jpg" },
  { name: "Optics Valley World City", type: "Enameled Glass", image: "/images/cases/guanggu.jpg" },
  { name: "Poly Military Games Village", type: "Laminated Glass", image: "/images/cases/baoli.jpg" },
];

export default function ProjectCases() {
  const { ref, isInView } = useInView({ threshold: 0.1 });

  return (
    <section className="py-20 md:py-28 bg-white overflow-hidden" ref={ref}>
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Heading */}
        <div
          className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 transition-all duration-600 ease-out"
          style={{
            opacity: isInView ? 1 : 0,
            transform: isInView ? "translateY(0)" : "translateY(20px)",
          }}
        >
          <div>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-brand-dark tracking-tight">
              Trusted by Landmark Projects
            </h2>
            <p className="mt-3 text-brand-muted text-lg">
              2,600+ projects across China and growing internationally.
            </p>
          </div>
          <Link
            href="/projects"
            className="text-brand-secondary hover:text-brand-accent font-medium transition-colors whitespace-nowrap"
          >
            View All Projects
          </Link>
        </div>
      </div>

      {/* Scrollable cards */}
      <div className="mt-12 overflow-x-auto scrollbar-hide">
        <div className="flex gap-5 px-6 md:px-12 pb-4" style={{ minWidth: "max-content" }}>
          {projects.map((project, i) => (
            <div
              key={project.name}
              className="relative w-72 md:w-80 flex-shrink-0 group rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300"
              style={{
                opacity: isInView ? 1 : 0,
                transform: isInView ? "translateY(0)" : "translateY(24px)",
                transitionProperty: "opacity, transform, box-shadow",
                transitionDuration: "600ms",
                transitionDelay: `${100 + i * 80}ms`,
              }}
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="320px"
                />
                {/* Gradient overlay at bottom */}
                <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/70 to-transparent" />

                {/* Text on image */}
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="text-white font-semibold text-sm leading-snug">
                    {project.name}
                  </h3>
                  <span className="inline-block mt-1.5 px-2 py-0.5 bg-brand-accent/90 text-brand-dark text-xs font-medium rounded">
                    {project.type}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
