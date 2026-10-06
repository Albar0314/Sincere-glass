"use client";
import { useInView } from "@/lib/useInView";
import { useQuote } from "@/lib/QuoteContext";

export default function RequestSample() {
  const { ref, isInView } = useInView();
  const { openQuote } = useQuote();

  return (
    <section className="py-14 md:py-20 bg-brand-dark" ref={ref}>
      <div className="max-w-5xl mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12"
          style={{ opacity: isInView ? 1 : 0, transform: isInView ? "translateY(0)" : "translateY(20px)", transition: "all 700ms" }}>

          {/* Icon */}
          <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-brand-accent/10 flex items-center justify-center flex-shrink-0">
            <svg className="w-8 h-8 md:w-10 md:h-10 text-brand-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 11.25v8.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 109.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1114.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
            </svg>
          </div>

          {/* Text */}
          <div className="flex-1 text-center md:text-left">
            <h3 className="font-display text-xl md:text-2xl font-bold text-white">Request a Free Sample</h3>
            <p className="mt-2 text-white/50 text-sm md:text-base leading-relaxed">
              Need to show your client or architect? We ship tempered glass samples at no cost — choose your
              thickness and see the quality before you commit to a full order.
            </p>
          </div>

          {/* CTA */}
          <div className="flex flex-col gap-3 flex-shrink-0">
            <button onClick={() => openQuote("tempered")}
              className="px-6 py-3 bg-brand-accent hover:bg-brand-accent-hover text-brand-dark font-semibold rounded-md transition-colors text-sm whitespace-nowrap">
              Request Sample
            </button>
            <p className="text-white/30 text-xs text-center">Free shipping • No commitment</p>
          </div>
        </div>
      </div>
    </section>
  );
}
