"use client";

import { useState } from "react";
import manifestData from "@/lib/test-reports-manifest.json";

type Report = { spec: string; label: string; url: string; filename: string };

const manifest = manifestData as any;

const COPY = {
  tempered: {
    title: "Download Test Reports — Tempered Glass",
    subtitle: "7 thicknesses, each independently verified by WITC under GB 15763.2-2005.",
  },
  laminated: {
    title: "Download Test Reports — Laminated Glass",
    subtitle: "27 build-ups covering all glass thicknesses times PVB interlayer combinations.",
  },
  insulated: {
    title: "Download Test Reports — Insulated Glass",
    subtitle: "28 build-ups covering common thickness and spacer combinations.",
  },
  lowE: {
    title: "Download Test Reports — Low-E Insulated Glass",
    subtitle: "28 Low-E IGU build-ups across the full thickness and spacer range.",
  },
};

export default function TestReportDownload(props: { bucket: string }) {
  const bucket = props.bucket;
  const [open, setOpen] = useState(false);
  const items = (manifest[bucket] || []) as Report[];
  const copy = (COPY as any)[bucket];
  const preview = items.slice(0, 6);
  const rest = items.slice(6);

  if (items.length === 0) return null;

  return (
    <section className="py-16 bg-[#F2F0ED] border-y border-[#E5E5E0]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
          <div>
            <p className="text-xs uppercase tracking-widest text-[#DAA745] mb-2">
              Independently Verified · CMA Accredited Lab
            </p>
            <h2 className="text-2xl md:text-3xl font-serif text-[#1C1F26] mb-2">
              {copy.title}
            </h2>
            <p className="text-sm text-[#3A4250] max-w-2xl">{copy.subtitle}</p>
          </div>
          <div className="text-xs text-[#8B95A5] whitespace-nowrap">
            {items.length} reports · GB 15763.2-2005
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {(open ? items : preview).map((r) => (
            <a
              key={r.filename}
              href={r.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 p-4 bg-white border border-[#E5E5E0] rounded-md hover:border-[#DAA745] hover:shadow-sm transition-all"
            >
              <div className="w-10 h-10 flex-shrink-0 rounded bg-[#DAA745]/10 flex items-center justify-center">
                <svg className="w-5 h-5 text-[#DAA745]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                </svg>
              </div>
              <div className="flex-grow min-w-0">
                <div className="text-sm font-medium text-[#1C1F26] truncate">{r.label}</div>
                <div className="text-xs text-[#8B95A5]">WITC Test Report · PDF</div>
              </div>
              <svg className="w-4 h-4 text-[#8B95A5] group-hover:text-[#DAA745] flex-shrink-0 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/>
              </svg>
            </a>
          ))}
        </div>

        {rest.length > 0 && (
          <div className="mt-6 text-center">
            <button
              onClick={() => setOpen(!open)}
              className="px-6 py-2 text-sm border border-[#3A4250] text-[#3A4250] rounded-md hover:bg-[#3A4250] hover:text-white transition-colors"
            >
              {open ? "Show less" : "Show all " + items.length + " reports"}
            </button>
          </div>
        )}

        <div className="mt-6 pt-6 border-t border-[#E5E5E0] text-xs text-[#8B95A5] text-center">
          Reports issued by WITC (Wuhan Inspection and Testing Certification Development Group), CMA No. 251700340165. Samples collected under random government surveillance sampling — not self-selected.
        </div>
      </div>
    </section>
  );
}