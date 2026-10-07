"use client";

import { useState, FormEvent } from "react";

type FormStatus = "idle" | "submitting" | "success" | "error";

const SUBJECTS = [
  "General Inquiry",
  "Product Quote Request",
  "Technical Specifications",
  "Shipping & Logistics",
  "Sample Request",
  "Partnership / Distribution",
  "Other",
];

export default function ContactForm() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMsg("");

    const form = e.currentTarget;
    const data = {
      firstName: (form.elements.namedItem("firstName") as HTMLInputElement).value.trim(),
      lastName: (form.elements.namedItem("lastName") as HTMLInputElement).value.trim(),
      email: (form.elements.namedItem("email") as HTMLInputElement).value.trim(),
      phone: (form.elements.namedItem("phone") as HTMLInputElement).value.trim(),
      subject: (form.elements.namedItem("subject") as HTMLSelectElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value.trim(),
      // Honeypot
      _hp_website: (form.elements.namedItem("_hp_website") as HTMLInputElement).value,
    };

    try {
      const res = await fetch("/api/contact", {
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

  if (status === "success") {
    return (
      <div className="bg-white rounded-2xl p-8 shadow-lg text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-[#1C1F26] mb-2">Message Sent!</h3>
        <p className="text-gray-600 mb-6">
          Thank you for reaching out. Our team will review your message and respond within 24 hours.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="px-6 py-2.5 bg-[#DAA745] text-[#1C1F26] font-semibold rounded-lg hover:bg-[#c4963e] transition-colors"
        >
          Send Another Message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg">
      <h2 className="text-2xl font-bold text-[#1C1F26] mb-6">Send Us a Message</h2>

      {/* Honeypot */}
      <div className="absolute -left-[9999px]" aria-hidden="true">
        <label htmlFor="_hp_website">Do not fill this</label>
        <input type="text" id="_hp_website" name="_hp_website" tabIndex={-1} autoComplete="off" />
      </div>

      {status === "error" && (
        <div className="mb-4 p-3 bg-red-50 text-red-700 text-sm rounded-lg border border-red-200">
          {errorMsg}
        </div>
      )}

      <div className="space-y-4">
        {/* Name row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="c-firstName" className="block text-sm font-medium text-gray-700 mb-1">
              First Name <span className="text-red-500">*</span>
            </label>
            <input
              id="c-firstName"
              name="firstName"
              type="text"
              required
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#DAA745]/50 focus:border-[#DAA745] outline-none transition-all text-[#1C1F26]"
              placeholder="John"
            />
          </div>
          <div>
            <label htmlFor="c-lastName" className="block text-sm font-medium text-gray-700 mb-1">
              Last Name <span className="text-red-500">*</span>
            </label>
            <input
              id="c-lastName"
              name="lastName"
              type="text"
              required
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#DAA745]/50 focus:border-[#DAA745] outline-none transition-all text-[#1C1F26]"
              placeholder="Smith"
            />
          </div>
        </div>

        {/* Email */}
        <div>
          <label htmlFor="c-email" className="block text-sm font-medium text-gray-700 mb-1">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            id="c-email"
            name="email"
            type="email"
            required
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#DAA745]/50 focus:border-[#DAA745] outline-none transition-all text-[#1C1F26]"
            placeholder="john@company.com"
          />
        </div>

        {/* Phone */}
        <div>
          <label htmlFor="c-phone" className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
          <input
            id="c-phone"
            name="phone"
            type="tel"
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#DAA745]/50 focus:border-[#DAA745] outline-none transition-all text-[#1C1F26]"
            placeholder="+1 (555) 000-0000"
          />
        </div>

        {/* Subject */}
        <div>
          <label htmlFor="c-subject" className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
          <select
            id="c-subject"
            name="subject"
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#DAA745]/50 focus:border-[#DAA745] outline-none transition-all text-[#1C1F26] bg-white"
          >
            {SUBJECTS.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>

        {/* Message */}
        <div>
          <label htmlFor="c-message" className="block text-sm font-medium text-gray-700 mb-1">
            Message <span className="text-red-500">*</span>
          </label>
          <textarea
            id="c-message"
            name="message"
            rows={5}
            required
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#DAA745]/50 focus:border-[#DAA745] outline-none transition-all resize-none text-[#1C1F26]"
            placeholder="Tell us about your project requirements, specifications, quantities..."
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
          "Send Message"
        )}
      </button>
    </form>
  );
}
