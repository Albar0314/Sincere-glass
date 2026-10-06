"use client";
import { useInView } from "@/lib/useInView";
import { useCountUp } from "@/lib/useCountUp";
import InlineQuoteCTA from "@/components/products/InlineQuoteCTA";

const advantages = [
  {
    icon: "M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
    title: "Factory-Direct Pricing",
    stat: 30,
    suffix: "%",
    statLabel: "lower than trading companies",
    desc: "No middlemen. Our two factories run mature production lines that have been optimized over 15 years. High equipment utilization + bulk raw material purchasing = cost savings passed directly to you.",
  },
  {
    icon: "M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z",
    title: "7-15 Day Lead Time",
    stat: 15,
    suffix: " days",
    statLabel: "standard order turnaround",
    desc: "Dual-factory capacity means we rarely have backlogs. Standard orders ship within 7-15 business days. Even oversized panels (3m\u00D715m) typically take 15-25 days \u2014 faster than most single-factory competitors.",
  },
  {
    icon: "M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15",
    title: "Oversized Panel Capability",
    stat: 15,
    suffix: "m",
    statLabel: "max panel length",
    desc: "Most manufacturers cap at 2.4m\u00D74.5m. Our Honghu factory\u2019s furnace handles panels up to 3m\u00D715m \u2014 meaning your oversized curtain wall or skylight project doesn\u2019t need to go elsewhere.",
  },
  {
    icon: "M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z",
    title: "Zero Certification Risk",
    stat: 100,
    suffix: "%",
    statLabel: "products 3C certified",
    desc: "Every product carries China\u2019s mandatory 3C certification and has passed national technical inspection. We provide full documentation \u2014 test reports, certificates, compliance letters \u2014 so your project passes inspection the first time.",
  },
];

function StatCard({ adv, isActive, index }: { adv: typeof advantages[0]; isActive: boolean; index: number }) {
  const count = useCountUp(adv.stat, isActive);
  return (
    <div
      className="p-6 rounded-xl bg-white border border-brand-light hover:border-brand-accent/20 hover:shadow-md transition-all duration-300"
      style={{ opacity: isActive ? 1 : 0, transform: isActive ? "translateY(0)" : "translateY(24px)", transition: "all 600ms ease-out", transitionDelay: (200 + index * 120) + "ms" }}
    >
      <div className="flex items-start gap-4">
        <div className="w-11 h-11 rounded-xl bg-brand-accent/10 flex items-center justify-center flex-shrink-0">
          <svg className="w-5 h-5 text-brand-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d={adv.icon} />
          </svg>
        </div>
        <div className="flex-1">
          <div className="flex items-baseline gap-1">
            <span className="font-display text-3xl font-bold text-brand-accent tabular-nums">{count}</span>
            <span className="font-display text-lg font-bold text-brand-accent">{adv.suffix}</span>
          </div>
          <p className="text-xs text-brand-muted mt-0.5">{adv.statLabel}</p>
          <h3 className="font-display text-base font-bold text-brand-dark mt-3">{adv.title}</h3>
          <p className="mt-2 text-sm text-brand-muted leading-relaxed">{adv.desc}</p>
        </div>
      </div>
    </div>
  );
}

export default function WhySincere() {
  const { ref, isInView } = useInView({ threshold: 0.1 });

  return (
    <section className="py-20 md:py-28 bg-brand-lighter" ref={ref}>
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="mb-12" style={{ opacity: isInView ? 1 : 0, transform: isInView ? "translateY(0)" : "translateY(16px)", transition: "all 600ms" }}>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-brand-dark tracking-tight">
            Why Source Tempered Glass from Sincere Glass?
          </h2>
          <p className="mt-4 text-brand-muted text-lg max-w-3xl">
            You have options. Here is what makes us different from the 600+ glass factories in China.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {advantages.map((adv, i) => (
            <StatCard key={adv.title} adv={adv} isActive={isInView} index={i} />
          ))}
        </div>

        <div className="mt-8">
          <InlineQuoteCTA text="Ready to compare? Send us your specs and we will beat any like-for-like quote." product="tempered" />
        </div>
      </div>
    </section>
  );
}
