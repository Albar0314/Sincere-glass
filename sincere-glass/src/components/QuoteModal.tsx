"use client";
import { useState, FormEvent, useEffect } from "react";
import { useQuote } from "@/lib/QuoteContext";

export default function QuoteModal() {
  const { isOpen, closeQuote, preselectedProduct } = useQuote();
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      const t = setTimeout(() => setSubmitted(false), 300);
      return () => clearTimeout(t);
    }
  }, [isOpen]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") closeQuote();
    }
    if (isOpen) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, closeQuote]);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    await new Promise(r => setTimeout(r, 1200));
    setLoading(false);
    setSubmitted(true);
  }

  return (
    <div
      className={"fixed inset-0 z-[60] flex items-center justify-center transition-all duration-300 " +
        (isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none")}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={closeQuote} />

      {/* Modal */}
      <div
        className={"relative bg-brand-dark border border-white/10 rounded-2xl shadow-2xl w-full max-w-lg mx-4 transition-all duration-300 " +
          (isOpen ? "scale-100 translate-y-0" : "scale-95 translate-y-4")}
      >
        {/* Close button */}
        <button onClick={closeQuote} className="absolute top-4 right-4 text-white/40 hover:text-white transition-colors p-1">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="p-6 md:p-8">
          {submitted ? (
            <div className="text-center py-8">
              <div className="w-14 h-14 mx-auto rounded-full bg-green-500/20 flex items-center justify-center">
                <svg className="w-7 h-7 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="mt-4 text-xl font-semibold text-white">Quote request sent!</h3>
              <p className="mt-2 text-white/50 text-sm">Our team will respond within 24 hours.</p>
              <button onClick={closeQuote} className="mt-6 px-6 py-2 bg-brand-accent text-brand-dark font-semibold rounded-md text-sm">
                Close
              </button>
            </div>
          ) : (
            <>
              <h2 className="font-display text-xl font-bold text-white">Get a free quote</h2>
              <p className="mt-1 text-sm text-white/50">Fill in your requirements — we respond within 24 hours.</p>

              <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-white/60 mb-1">Full Name *</label>
                    <input type="text" required className="w-full px-3 py-2 bg-white/5 border border-white/15 rounded-md text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-brand-accent/50 focus:ring-1 focus:ring-brand-accent/30" placeholder="Your name" />
                  </div>
                  <div>
                    <label className="block text-xs text-white/60 mb-1">Email *</label>
                    <input type="email" required className="w-full px-3 py-2 bg-white/5 border border-white/15 rounded-md text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-brand-accent/50 focus:ring-1 focus:ring-brand-accent/30" placeholder="you@company.com" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-white/60 mb-1">Phone / WhatsApp</label>
                    <input type="tel" className="w-full px-3 py-2 bg-white/5 border border-white/15 rounded-md text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-brand-accent/50 focus:ring-1 focus:ring-brand-accent/30" placeholder="+country code" />
                  </div>
                  <div>
                    <label className="block text-xs text-white/60 mb-1">Glass Type</label>
                    <select defaultValue={preselectedProduct} className="w-full px-3 py-2 bg-white/5 border border-white/15 rounded-md text-sm text-white/70 focus:outline-none focus:border-brand-accent/50">
                      <option value="">Select type</option>
                      <option value="tempered">Tempered Glass</option>
                      <option value="insulated">Insulated Glass</option>
                      <option value="laminated">Laminated Glass</option>
                      <option value="enameled">Enameled Glass</option>
                      <option value="low-e">Low-E Glass</option>
                      <option value="other">Other / Custom</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-xs text-white/60 mb-1">Project Details</label>
                  <textarea rows={3} className="w-full px-3 py-2 bg-white/5 border border-white/15 rounded-md text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-brand-accent/50 focus:ring-1 focus:ring-brand-accent/30 resize-none" placeholder="Dimensions, quantity, application, timeline..." />
                </div>
                <button type="submit" disabled={loading} className="w-full py-2.5 bg-brand-accent hover:bg-brand-accent-hover disabled:opacity-60 text-brand-dark font-semibold rounded-md transition-colors text-sm">
                  {loading ? "Sending..." : "Submit Quote Request"}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
