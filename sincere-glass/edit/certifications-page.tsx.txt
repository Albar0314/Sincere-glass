import type { Metadata } from "next";
import Link from "@/components/LocalizedLink";
import CertificationsClient from "@/components/certifications/CertificationsClient";
import manifest from "@/lib/test-reports-manifest.json";
import { makeAlternates } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "Certifications & Independent Test Reports | Sincere Glass",
  description:
    "95 independent test reports from WITC (CMA-accredited lab), covering every architectural glass specification Sincere Glass produces. Verified under GB 15763.2-2005.",
  alternates: makeAlternates("/certifications"),
};

type Item = { label: string; url: string; filename: string; spec?: string };

export default function CertificationsPage() {
  const q = (manifest as unknown as { qualifications: Item[] }).qualifications;
  const ccc = (manifest as unknown as { cccReports: Item[] }).cccReports;

  return (
    <main className="bg-[#FAFAF8]">
      <section className="relative bg-[#1C1F26] text-white py-24 overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 20% 50%, #DAA745 0%, transparent 50%)" }}/>
        <div className="relative max-w-7xl mx-auto px-6 text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-[#DAA745] mb-4">
            Independently Verified · Government-Sampled
          </p>
          <h1 className="text-4xl md:text-6xl font-serif mb-6 leading-tight">
            Certifications &amp; Test Reports
          </h1>
          <p className="text-lg md:text-xl text-[#8B95A5] max-w-3xl mx-auto mb-8">
            Every specification we produce is third-party verified by WITC, a
            CMA-accredited laboratory, under random government surveillance sampling
            &mdash; not self-selected samples.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <span className="px-4 py-2 border border-[#DAA745]/40 rounded-full text-[#DAA745]">CMA Accredited Lab</span>
            <span className="px-4 py-2 border border-white/20 rounded-full">GB 15763.2-2005</span>
            <span className="px-4 py-2 border border-white/20 rounded-full">95 Reports Available</span>
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#FAFAF8]">
        <div className="max-w-5xl mx-auto px-6">
          <div className="mb-10 text-center">
            <p className="text-sm uppercase tracking-widest text-[#8B95A5] mb-3">01 — Company Qualifications</p>
            <h2 className="text-3xl md:text-4xl font-serif text-[#1C1F26] mb-4">Chinese National Compulsory Certification (3C)</h2>
          </div>
          <div className="grid gap-4">
            {q.map((item) => (
              <a key={item.filename} href={item.url} target="_blank" rel="noopener noreferrer"
                className="group flex items-center gap-6 p-6 bg-white border border-[#E5E5E0] rounded-lg hover:border-[#DAA745] hover:shadow-lg transition-all">
                <div className="w-14 h-14 flex-shrink-0 rounded-full bg-[#DAA745]/10 flex items-center justify-center">
                  <svg className="w-7 h-7 text-[#DAA745]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
                  </svg>
                </div>
                <div className="flex-grow">
                  <div className="text-lg font-medium text-[#1C1F26] mb-1">{item.label}</div>
                  <div className="text-sm text-[#8B95A5]">China Compulsory Certification · National safety-glass regulatory requirement</div>
                </div>
                <div className="text-[#DAA745] group-hover:translate-x-1 transition-transform whitespace-nowrap">Download PDF &rarr;</div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <div className="mb-10 text-center">
            <p className="text-sm uppercase tracking-widest text-[#8B95A5] mb-3">02 — 3C Factory Reports</p>
            <h2 className="text-3xl md:text-4xl font-serif text-[#1C1F26] mb-4">Product Line 3C Reports</h2>
            <p className="text-[#3A4250] max-w-2xl mx-auto">
              Factory-level 3C certification reports covering our laminated and insulated glass production lines.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {ccc.map((item) => (
              <a key={item.filename} href={item.url} target="_blank" rel="noopener noreferrer"
                className="group p-6 bg-[#FAFAF8] border border-[#E5E5E0] rounded-lg hover:border-[#DAA745] hover:shadow-md transition-all">
                <div className="text-xs font-semibold uppercase tracking-wider text-[#DAA745] mb-2">3C CCC Report</div>
                <div className="text-base font-medium text-[#1C1F26] mb-3">{item.label}</div>
                <div className="text-sm text-[#DAA745] group-hover:translate-x-1 transition-transform inline-block">Download PDF &rarr;</div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <CertificationsClient />

      <section className="py-20 bg-[#1C1F26] text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-serif mb-6">Why This Matters for Overseas Buyers</h2>
          <div className="grid md:grid-cols-3 gap-8 text-left mt-10">
            <div>
              <div className="text-[#DAA745] text-sm font-semibold uppercase tracking-wider mb-3">Not Self-Selected</div>
              <p className="text-[#8B95A5] leading-relaxed">Samples were collected by the Wuhan Municipal Market Supervision Administration under random surveillance &mdash; we did not pick what went to the lab.</p>
            </div>
            <div>
              <div className="text-[#DAA745] text-sm font-semibold uppercase tracking-wider mb-3">CMA Accredited</div>
              <p className="text-[#8B95A5] leading-relaxed">WITC holds China Metrology Accreditation (CMA No. 251700340165), the same framework ILAC/MRA signatory labs operate under.</p>
            </div>
            <div>
              <div className="text-[#DAA745] text-sm font-semibold uppercase tracking-wider mb-3">Full Parameter Set</div>
              <p className="text-[#8B95A5] leading-relaxed">Each report covers impact resistance, fragmentation, shot-bag impact, surface stress and thermal shock &mdash; the full GB 15763.2 battery with specific numeric results.</p>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-white/10">
            <Link href="/contact" className="inline-block px-8 py-4 bg-[#DAA745] text-[#1C1F26] font-medium rounded-md hover:bg-[#DAA745]/90 transition-colors">
              Request Specifications for Your Project &rarr;
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}