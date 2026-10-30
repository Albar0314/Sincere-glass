import Link from "@/components/LocalizedLink";

export default function CertificationStrip() {
  return (
    <section className="bg-brand-primary border-t border-white/5 py-6">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
            <div className="flex items-center gap-2 text-sm text-white/80">
              <svg className="w-4 h-4 text-brand-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
              </svg>
              <span className="font-medium">Government-sampled</span>
            </div>
            <div className="hidden md:block w-px h-4 bg-white/10"/>
            <div className="flex items-center gap-2 text-sm text-white/80">
              <span className="text-brand-accent font-semibold">CMA</span>
              <span>Accredited Lab (WITC)</span>
            </div>
            <div className="hidden md:block w-px h-4 bg-white/10"/>
            <div className="flex items-center gap-2 text-sm text-white/80">
              <span className="text-brand-accent font-semibold">GB 15763.2-2005</span>
            </div>
          </div>
          <Link
            href="/certifications"
            className="inline-flex items-center gap-1.5 text-sm text-brand-accent hover:text-white transition-colors whitespace-nowrap"
          >
            View all 95 test reports
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/>
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}