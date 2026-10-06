"use client";
import { useInView } from "@/lib/useInView";
import { useCountUp } from "@/lib/useCountUp";
import InlineQuoteCTA from "@/components/products/InlineQuoteCTA";

const advantages = [
  { icon: "M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5",
    title: "Automated Argon Filling", stat: 90, suffix: "%+", statLabel: "consistent fill rate",
    desc: "Our Honghu factory has a fully automated gas-filling production line — no manual injection. This ensures consistent 90%+ argon fill rates across every unit, maximizing thermal performance." },
  { icon: "M6 6.878V6a2.25 2.25 0 012.25-2.25h7.5A2.25 2.25 0 0118 6v.878m-12 0c.235-.083.487-.128.75-.128h10.5c.263 0 .515.045.75.128m-12 0A2.25 2.25 0 004.5 9v.878m13.5-3A2.25 2.25 0 0119.5 9v.878m0 0a2.246 2.246 0 00-.75-.128H5.25c-.263 0-.515.045-.75.128m15 0A2.25 2.25 0 0121 12v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6c0-.98.626-1.813 1.5-2.122",
    title: "Oversized IGU Capability", stat: 15, suffix: "m", statLabel: "max panel length",
    desc: "Most factories cap IGUs at 2.4m×3.6m. Our oversized line produces units up to 3m×15m — ideal for floor-to-ceiling curtain walls and feature glazing that demands uninterrupted views." },
  { icon: "M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
    title: "Factory-Direct Pricing", stat: 25, suffix: "%", statLabel: "lower than trading companies",
    desc: "We produce everything in-house — cutting, coating, assembly, sealing — across two owned factories. No middlemen means you get manufacturer pricing on every unit." },
  { icon: "M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z",
    title: "Full Documentation", stat: 100, suffix: "%", statLabel: "3C certified",
    desc: "Every IGU ships with 3C certification, test reports, and compliance documentation. We handle the paperwork so your project passes inspection first time — no surprises at the building site." },
];

function StatCard({ adv, isActive, index }: { adv: typeof advantages[0]; isActive: boolean; index: number }) {
  const count = useCountUp(adv.stat, isActive);
  return (
    <div className="p-6 rounded-xl bg-white border border-brand-light hover:border-brand-accent/20 hover:shadow-md transition-all duration-300"
      style={{ opacity: isActive ? 1 : 0, transform: isActive ? "translateY(0)" : "translateY(24px)", transition: "all 600ms ease-out", transitionDelay: (200 + index * 120) + "ms" }}>
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

export default function WhySincereIGU() {
  const { ref, isInView } = useInView({ threshold: 0.1 });
  return (
    <section className="py-20 md:py-28 bg-brand-lighter" ref={ref}>
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="mb-12" style={{ opacity: isInView ? 1 : 0, transform: isInView ? "translateY(0)" : "translateY(16px)", transition: "all 600ms" }}>
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-brand-dark tracking-tight">Why Source IGUs from Sincere Glass?</h2>
          <p className="mt-4 text-brand-muted text-base md:text-lg max-w-3xl">What sets our insulated glass apart from the hundreds of other Chinese IGU manufacturers.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {advantages.map((adv, i) => <StatCard key={adv.title} adv={adv} isActive={isInView} index={i} />)}
        </div>
        <div className="mt-8">
          <InlineQuoteCTA text="Ready to compare? Send us your glazing schedule and we will provide a competitive quote." product="insulated" />
        </div>
      </div>
    </section>
  );
}
