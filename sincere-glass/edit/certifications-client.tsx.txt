"use client";

import { useState } from "react";
import manifest from "@/lib/test-reports-manifest.json";

type Bucket = "tempered" | "laminated" | "insulated" | "lowE";
type Report = { spec: string; label: string; url: string; filename: string };

const TABS: { key: Bucket; label: string }[] = [
  { key: "tempered", label: "Tempered" },
  { key: "laminated", label: "Laminated" },
  { key: "insulated", label: "Insulated (Clear)" },
  { key: "lowE", label: "Low-E Insulated" },
];

export default function CertificationsClient() {
  const [tab, setTab] = useState<Bucket>("tempered");
  const items = ((manifest as unknown as Record<Bucket, Report[]>)[tab]) || [];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-10 text-center">
          <p className="text-sm uppercase tracking-widest text-[#8B95A5] mb-3">
            03 — Specification-Level Test Reports
          </p>
          <h2 className="text-3xl md:text-4xl font-serif text-[#1C1F26] mb-4">
            Download the Report for Your Exact Specification
          </h2>
          <p className="text-[#3A4250] max-w-3xl mx-auto">
            90 individual test reports covering every thickness and build-up we
            produce — issued by WITC (Wuhan Inspection &amp; Testing Certification
            Development Group), a CMA-accredited laboratory, under China&apos;s
            national safety-glass standard GB 15763.2-2005.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-10 border-b border-[#E5E5E0]">
          {TABS.map((t) => {
            const count = (manifest as unknown as Record<Bucket, Report[]>)[t.key].length;
            return (
              <button
                key={t.key}
                onClick={() => setTab(t.key)}
                className={`px-5 py-3 text-sm font-medium transition-all border-b-2 -mb-px ${
                  tab === t.key
                    ? "border-[#DAA745] text-[#1C1F26]"
                    : "border-transparent text-[#8B95A5] hover:text-[#3A4250]"
                }`}
              >
                {t.label}
                <span className="ml-2 text-xs opacity-60">({count})</span>
              </button>
            );
          })}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((r) => (
            <a
              key={r.filename}
              href={r.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group p-5 border border-[#E5E5E0] rounded-lg hover:border-[#DAA745] hover:shadow-md transition-all bg-[#FAFAF8]"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="text-xs font-semibold uppercase tracking-wider text-[#DAA745]">
                  WITC Verified
                </div>
                <svg className="w-5 h-5 text-[#8B95A5] group-hover:text-[#DAA745] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/>
                </svg>
              </div>
              <div className="text-base font-medium text-[#1C1F26] mb-2 leading-snug">
                {r.label}
              </div>
              <div className="text-xs text-[#8B95A5]">
                GB 15763.2-2005 · PDF
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}