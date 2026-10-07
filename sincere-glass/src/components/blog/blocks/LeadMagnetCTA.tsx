"use client";

import { useState, FormEvent } from "react";

interface LeadMagnetCTAProps {
  title?: string;
  description?: string;
  buttonText?: string;
  pdfName?: string;
}

type FormStatus = "idle" | "submitting" | "success" | "error";

export default function LeadMagnetCTA({
  title = "Free Download: Glass Building Codes Comparison",
  description = "Get our comprehensive guide comparing architectural glass building codes across US (IBC), EU (EN), China (GB), and Australia (AS) standards.",
  buttonText = "Download Free Guide",
  pdfName = "Glass Building Codes Comparison PDF",
}: LeadMagnetCTAProps) {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMsg("");

    const form = e.currentTarget;
    const data = {
      email: (form.elements.namedItem("lead-email") as HTMLInputElement).value.trim(),
      optInSales: (form.elements.namedItem("optInSales") as HTMLInputElement).checked,
      // Honeypot
      _hp_url: (form.elements.namedItem("_hp_url") as HTMLInputElement).value,
    };

    try {
      const res = await fetch("/api/lead-magnet", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.error || "Submission failed");
      }

      setStatus("success");

      // Auto-open the PDF download
      if (result.downloadUrl) {
        window.open(result.downloadUrl, "_blank");
      }
    } catch (err: unknown) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  if (status === "success") {
    return (
      <div className="my-8 bg-gradient-to-br from-[#1C1F26] to-[#3A4250] rounded-2xl p-8 text-center">
        <div className="w-14 h-14 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-7 h-7 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-white mb-2">Check Your Email!</h3>
        <p className="text-gray-300 text-sm">
          We&apos;ve sent the download link for <strong className="text-[#DAA745]">{pdfName}</strong> to your inbox.
          The PDF should also be opening in a new tab now.
        </p>
      </div>
    );
  }

  return (
    <div className="my-8 bg-gradient-to-br from-[#1C1F26] to-[#3A4250] rounded-2xl p-6 sm:p-8">
      <div className="flex flex-col sm:flex-row items-start gap-6">
        {/* Icon */}
        <div className="flex-shrink-0">
          <div className="w-14 h-14 bg-[#DAA745]/20 rounded-xl flex items-center justify-center">
            <svg className="w-7 h-7 text-[#DAA745]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1">
          <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
          <p className="text-gray-300 text-sm mb-4">{description}</p>

          <form onSubmit={handleSubmit} className="space-y-3">
            {/* Honeypot */}
            <div className="absolute -left-[9999px]" aria-hidden="true">
              <input type="text" name="_hp_url" tabIndex={-1} autoComplete="off" />
            </div>

            {status === "error" && (
              <div className="p-2 bg-red-500/20 text-red-300 text-sm rounded-lg">
                {errorMsg}
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-3">
              <input
                name="lead-email"
                type="email"
                required
                placeholder="Your business email"
                className="flex-1 px-4 py-2.5 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-[#DAA745]/50 focus:border-[#DAA745] outline-none transition-all"
              />
              <button
                type="submit"
                disabled={status === "submitting"}
                className="px-6 py-2.5 bg-[#DAA745] text-[#1C1F26] font-bold rounded-lg hover:bg-[#c4963e] transition-colors whitespace-nowrap disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {status === "submitting" ? (
                  <>
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Sending...
                  </>
                ) : (
                  buttonText
                )}
              </button>
            </div>

            <label className="flex items-start gap-2 cursor-pointer group">
              <input
                name="optInSales"
                type="checkbox"
                className="mt-0.5 w-4 h-4 rounded border-white/30 bg-white/10 text-[#DAA745] focus:ring-[#DAA745]/50"
              />
              <span className="text-xs text-gray-400 group-hover:text-gray-300 transition-colors">
                I&apos;d also like to receive product updates and glass industry insights from Sincere Glass. (Optional)
              </span>
            </label>
          </form>
        </div>
      </div>
    </div>
  );
}
