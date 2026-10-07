"use client";

import { useQuote } from "@/lib/QuoteContext";
import { useState, FormEvent } from "react";

type FormStatus = "idle" | "submitting" | "success" | "error";

export default function QuoteModal() {
  const { isOpen, closeQuote, preselectedProduct } = useQuote();
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  if (!isOpen) return null;

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMsg("");

    const form = e.currentTarget;
    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value.trim(),
      email: (form.elements.namedItem("email") as HTMLInputElement).value.trim(),
      phone: (form.elements.namedItem("phone") as HTMLInputElement).value.trim(),
      company: (form.elements.namedItem("company") as HTMLInputElement).value.trim(),
      product: (form.elements.namedItem("product") as HTMLSelectElement).value,
      quantity: (form.elements.namedItem("quantity") as HTMLInputElement).value.trim(),
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value.trim(),
      // Honeypot
      _hp_company: (form.elements.namedItem("_hp_company") as HTMLInputElement).value,
    };

    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Submission failed");
      }

      setStatus("success");
    } catch (err: unknown) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  }

  function handleClose() {
    setStatus("idle");
    setErrorMsg("");
    closeQuote();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors z-10"
          aria-label="Close"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {status === "success" ? (
          /* ── Success State ── */
          <div className="p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-[#1C1F26] mb-2">Quote Request Sent!</h3>
            <p className="text-gray-600 mb-6">
              Thank you for your interest. Our team will review your requirements and get back to you within 24 hours.
            </p>
            <button
              onClick={handleClose}
              className="px-6 py-2.5 bg-[#DAA745] text-[#1C1F26] font-semibold rounded-lg hover:bg-[#c4963e] transition-colors"
            >
              Close
            </button>
          </div>
        ) : (
          /* ── Form ── */
          <form onSubmit={handleSubmit} className="p-6 sm:p-8">
            <h2 className="text-2xl font-bold text-[#1C1F26] mb-1">Request a Quote</h2>
            <p className="text-gray-500 text-sm mb-6">Fill in your details and we&apos;ll get back to you within 24 hours.</p>

            {/* Honeypot — hidden from humans */}
            <div className="absolute -left-[9999px]" aria-hidden="true">
              <label htmlFor="_hp_company">Do not fill this</label>
              <input type="text" id="_hp_company" name="_hp_company" tabIndex={-1} autoComplete="off" />
            </div>

            {status === "error" && (
              <div className="mb-4 p-3 bg-red-50 text-red-700 text-sm rounded-lg border border-red-200">
                {errorMsg}
              </div>
            )}

            <div className="space-y-4">
              {/* Name */}
              <div>
                <label htmlFor="q-name" className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  id="q-name"
                  name="name"
                  type="text"
                  required
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#DAA745]/50 focus:border-[#DAA745] outline-none transition-all text-[#1C1F26]"
                  placeholder="John Smith"
                />
              </div>

              {/* Email */}
              <div>
                <label htmlFor="q-email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  id="q-email"
                  name="email"
                  type="email"
                  required
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#DAA745]/50 focus:border-[#DAA745] outline-none transition-all text-[#1C1F26]"
                  placeholder="john@company.com"
                />
              </div>

              {/* Phone + Company row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="q-phone" className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                  <input
                    id="q-phone"
                    name="phone"
                    type="tel"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#DAA745]/50 focus:border-[#DAA745] outline-none transition-all text-[#1C1F26]"
                    placeholder="+1 (555) 000-0000"
                  />
                </div>
                <div>
                  <label htmlFor="q-company" className="block text-sm font-medium text-gray-700 mb-1">Company</label>
                  <input
                    id="q-company"
                    name="company"
                    type="text"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#DAA745]/50 focus:border-[#DAA745] outline-none transition-all text-[#1C1F26]"
                    placeholder="Company name"
                  />
                </div>
              </div>

              {/* Product */}
              <div>
                <label htmlFor="q-product" className="block text-sm font-medium text-gray-700 mb-1">
                  Product <span className="text-red-500">*</span>
                </label>
                <select
                  id="q-product"
                  name="product"
                  required
                  defaultValue={preselectedProduct || ""}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#DAA745]/50 focus:border-[#DAA745] outline-none transition-all text-[#1C1F26] bg-white"
                >
                  <option value="" disabled>Select a product</option>
                  <option value="Tempered Glass">Tempered Glass</option>
                  <option value="Insulated Glass">Insulated Glass</option>
                  <option value="Laminated Glass">Laminated Glass</option>
                  <option value="Ceramic Frit Glass">Ceramic Frit Glass (Enameled)</option>
                  <option value="Low-E Glass">Low-E Glass</option>
                  <option value="Other">Other / Custom</option>
                </select>
              </div>

              {/* Quantity */}
              <div>
                <label htmlFor="q-quantity" className="block text-sm font-medium text-gray-700 mb-1">Estimated Quantity</label>
                <input
                  id="q-quantity"
                  name="quantity"
                  type="text"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#DAA745]/50 focus:border-[#DAA745] outline-none transition-all text-[#1C1F26]"
                  placeholder="e.g. 500 sqm, 200 panels"
                />
              </div>

              {/* Message */}
              <div>
                <label htmlFor="q-message" className="block text-sm font-medium text-gray-700 mb-1">Additional Details</label>
                <textarea
                  id="q-message"
                  name="message"
                  rows={3}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#DAA745]/50 focus:border-[#DAA745] outline-none transition-all resize-none text-[#1C1F26]"
                  placeholder="Specifications, sizes, project details..."
                />
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={status === "submitting"}
              className="w-full mt-6 py-3 bg-[#DAA745] text-[#1C1F26] font-bold rounded-lg hover:bg-[#c4963e] transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {status === "submitting" ? (
                <>
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Sending...
                </>
              ) : (
                "Get Your Free Quote"
              )}
            </button>

            <p className="text-center text-xs text-gray-400 mt-3">
              We typically respond within 24 hours on business days.
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
