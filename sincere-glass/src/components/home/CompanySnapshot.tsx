"use client";

import Image from "next/image";
import Link from "next/link";
import { useInView } from "@/lib/useInView";

export default function CompanySnapshot() {
  const { ref, isInView } = useInView({ threshold: 0.15 });

  return (
    <section className="py-20 md:py-28 bg-brand-light overflow-hidden" ref={ref}>
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div
            className="relative aspect-[4/3] rounded-lg overflow-hidden shadow-lg"
            style={{ opacity: isInView ? 1 : 0, transform: isInView ? "translateX(0)" : "translateX(-40px)", transition: "opacity 700ms ease-out, transform 700ms ease-out" }}
          >
            <Image src="/images/factory-exterior.jpg" alt="Sincere Glass factory in Hubei, China" fill className="object-cover" sizes="(max-width:1024px) 100vw,50vw" />
          </div>

          <div style={{ opacity: isInView ? 1 : 0, transform: isInView ? "translateX(0)" : "translateX(40px)", transition: "opacity 700ms ease-out 150ms, transform 700ms ease-out 150ms" }}>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-brand-dark tracking-tight">
              A Decade of Glass Manufacturing Excellence
            </h2>
            <div className="mt-6 space-y-4 text-brand-muted leading-relaxed">
              <p>Founded in 2005 in Wuhan and expanded in 2019 with a second factory in Honghu, Sincere Glass has grown into a full-service architectural glass processing enterprise covering deep processing and international trade.</p>
              <p>Our two facilities span 20,000㎡ and house 4 intelligent cutting lines, 4 edge polishing lines, 2 tempering furnaces (up to 3m×15m), 2 insulated glass lines including an automated gas-filling system, and 2 high-pressure autoclaves for laminated glass production.</p>
              <p>Under the leadership of Chairman Li Chuanren — recognized as one of Wuhan&apos;s Top 10 Outstanding Entrepreneurs — we&apos;ve built partnerships with domestic glass producers and served over 2,600 landmark projects.</p>
            </div>
            <Link href="/about" className="inline-flex items-center mt-8 text-brand-secondary hover:text-brand-accent font-medium transition-colors">
              About Us
              <svg className="ml-2 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
