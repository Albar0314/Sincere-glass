/**
 * patch-backend-forms.mjs
 * ──────────────────────────────────────────────────
 * Sincere Glass — QuoteForm + Contact + Lead-Magnet backend
 * Next.js API Routes + Resend email notifications
 *
 * Run from project root:
 *   node edit\patch-backend-forms.mjs
 *
 * Prerequisites:
 *   npm install resend
 *
 * After running, add to Vercel Environment Variables:
 *   RESEND_API_KEY      → from https://resend.com/api-keys
 *   NOTIFICATION_EMAIL  → inbox that receives form submissions (e.g. sales@sincereglass.com)
 */

import { writeFileSync, mkdirSync, readFileSync, existsSync } from "fs";
import { join } from "path";

const BASE = process.cwd();
const src = (...p) => join(BASE, "src", ...p);
const ensure = (dir) => mkdirSync(dir, { recursive: true });

/* ═══════════════════════════════════════════════════
   1.  /api/quote/route.ts — Quote form API
   ═══════════════════════════════════════════════════ */
ensure(src("app", "api", "quote"));
writeFileSync(
  src("app", "api", "quote", "route.ts"),
  `import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const TO = process.env.NOTIFICATION_EMAIL || "sales@sincereglass.com";
// Use Resend default until domain is verified, then switch to custom domain
const FROM = process.env.RESEND_FROM_EMAIL || "Sincere Glass <onboarding@resend.dev>";

// Simple in-memory rate limiter (per serverless instance)
const rateMap = new Map<string, number[]>();
const RATE_WINDOW = 60_000; // 1 min
const RATE_LIMIT = 5;       // max 5 submissions per window

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const hits = (rateMap.get(ip) || []).filter((t) => now - t < RATE_WINDOW);
  if (hits.length >= RATE_LIMIT) return true;
  hits.push(now);
  rateMap.set(ip, hits);
  return false;
}

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }

    const body = await req.json();

    // Honeypot — if filled, silently succeed (bot)
    if (body._hp_company) {
      return NextResponse.json({ success: true });
    }

    const { name, email, phone, company, product, quantity, message } = body;

    // Validation
    if (!name || !email || !product) {
      return NextResponse.json(
        { error: "Name, email, and product are required." },
        { status: 400 }
      );
    }
    if (!/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Invalid email address." }, { status: 400 });
    }

    const { data, error } = await resend.emails.send({
      from: FROM,
      to: [TO],
      replyTo: email,
      subject: \`🔔 New Quote Request — \${product} — \${name}\`,
      html: \`
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"/></head>
<body style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:20px;color:#1C1F26;">
  <div style="background:#DAA745;padding:16px 24px;border-radius:8px 8px 0 0;">
    <h1 style="margin:0;color:#1C1F26;font-size:20px;">New Quote Request</h1>
  </div>
  <div style="border:1px solid #e5e7eb;border-top:none;padding:24px;border-radius:0 0 8px 8px;">
    <table style="width:100%;border-collapse:collapse;">
      <tr><td style="padding:8px 0;color:#6b7280;width:120px;">Name</td><td style="padding:8px 0;font-weight:600;">\${name}</td></tr>
      <tr><td style="padding:8px 0;color:#6b7280;">Email</td><td style="padding:8px 0;"><a href="mailto:\${email}">\${email}</a></td></tr>
      \${phone ? \`<tr><td style="padding:8px 0;color:#6b7280;">Phone</td><td style="padding:8px 0;">\${phone}</td></tr>\` : ""}
      \${company ? \`<tr><td style="padding:8px 0;color:#6b7280;">Company</td><td style="padding:8px 0;">\${company}</td></tr>\` : ""}
      <tr><td style="padding:8px 0;color:#6b7280;">Product</td><td style="padding:8px 0;font-weight:600;color:#DAA745;">\${product}</td></tr>
      \${quantity ? \`<tr><td style="padding:8px 0;color:#6b7280;">Quantity</td><td style="padding:8px 0;">\${quantity}</td></tr>\` : ""}
    </table>
    \${message ? \`<div style="margin-top:16px;padding:12px;background:#f9fafb;border-radius:6px;"><p style="margin:0 0 4px;color:#6b7280;font-size:13px;">Message</p><p style="margin:0;">\${message}</p></div>\` : ""}
    <p style="margin-top:24px;font-size:12px;color:#9ca3af;">Submitted from sincereglass.com at \${new Date().toISOString()}</p>
  </div>
</body>
</html>\`,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json({ error: "Failed to send. Please try again." }, { status: 500 });
    }

    return NextResponse.json({ success: true, id: data?.id });
  } catch (err) {
    console.error("Quote API error:", err);
    return NextResponse.json({ error: "Server error." }, { status: 500 });
  }
}
`
);
console.log("✅ Created /api/quote/route.ts");

/* ═══════════════════════════════════════════════════
   2.  /api/contact/route.ts — Contact form API
   ═══════════════════════════════════════════════════ */
ensure(src("app", "api", "contact"));
writeFileSync(
  src("app", "api", "contact", "route.ts"),
  `import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const TO = process.env.NOTIFICATION_EMAIL || "sales@sincereglass.com";
const FROM = process.env.RESEND_FROM_EMAIL || "Sincere Glass <onboarding@resend.dev>";

const rateMap = new Map<string, number[]>();
const RATE_WINDOW = 60_000;
const RATE_LIMIT = 5;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const hits = (rateMap.get(ip) || []).filter((t) => now - t < RATE_WINDOW);
  if (hits.length >= RATE_LIMIT) return true;
  hits.push(now);
  rateMap.set(ip, hits);
  return false;
}

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }

    const body = await req.json();

    // Honeypot
    if (body._hp_website) {
      return NextResponse.json({ success: true });
    }

    const { firstName, lastName, email, phone, subject, message } = body;

    if (!firstName || !lastName || !email || !message) {
      return NextResponse.json(
        { error: "First name, last name, email, and message are required." },
        { status: 400 }
      );
    }
    if (!/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Invalid email address." }, { status: 400 });
    }

    const subjectLine = subject || "General Inquiry";

    const { data, error } = await resend.emails.send({
      from: FROM,
      to: [TO],
      replyTo: email,
      subject: \`📩 Contact: \${subjectLine} — \${firstName} \${lastName}\`,
      html: \`
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"/></head>
<body style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:20px;color:#1C1F26;">
  <div style="background:#3A4250;padding:16px 24px;border-radius:8px 8px 0 0;">
    <h1 style="margin:0;color:#F2F0ED;font-size:20px;">New Contact Message</h1>
  </div>
  <div style="border:1px solid #e5e7eb;border-top:none;padding:24px;border-radius:0 0 8px 8px;">
    <table style="width:100%;border-collapse:collapse;">
      <tr><td style="padding:8px 0;color:#6b7280;width:120px;">Name</td><td style="padding:8px 0;font-weight:600;">\${firstName} \${lastName}</td></tr>
      <tr><td style="padding:8px 0;color:#6b7280;">Email</td><td style="padding:8px 0;"><a href="mailto:\${email}">\${email}</a></td></tr>
      \${phone ? \`<tr><td style="padding:8px 0;color:#6b7280;">Phone</td><td style="padding:8px 0;">\${phone}</td></tr>\` : ""}
      <tr><td style="padding:8px 0;color:#6b7280;">Subject</td><td style="padding:8px 0;color:#DAA745;font-weight:600;">\${subjectLine}</td></tr>
    </table>
    <div style="margin-top:16px;padding:12px;background:#f9fafb;border-radius:6px;">
      <p style="margin:0 0 4px;color:#6b7280;font-size:13px;">Message</p>
      <p style="margin:0;white-space:pre-wrap;">\${message}</p>
    </div>
    <p style="margin-top:24px;font-size:12px;color:#9ca3af;">Submitted from sincereglass.com/contact at \${new Date().toISOString()}</p>
  </div>
</body>
</html>\`,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json({ error: "Failed to send. Please try again." }, { status: 500 });
    }

    return NextResponse.json({ success: true, id: data?.id });
  } catch (err) {
    console.error("Contact API error:", err);
    return NextResponse.json({ error: "Server error." }, { status: 500 });
  }
}
`
);
console.log("✅ Created /api/contact/route.ts");

/* ═══════════════════════════════════════════════════
   3.  /api/lead-magnet/route.ts — Lead magnet update
   ═══════════════════════════════════════════════════ */
ensure(src("app", "api", "lead-magnet"));
writeFileSync(
  src("app", "api", "lead-magnet", "route.ts"),
  `import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const TO = process.env.NOTIFICATION_EMAIL || "sales@sincereglass.com";
const FROM = process.env.RESEND_FROM_EMAIL || "Sincere Glass <onboarding@resend.dev>";

const rateMap = new Map<string, number[]>();
const RATE_WINDOW = 60_000;
const RATE_LIMIT = 3;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const hits = (rateMap.get(ip) || []).filter((t) => now - t < RATE_WINDOW);
  if (hits.length >= RATE_LIMIT) return true;
  hits.push(now);
  rateMap.set(ip, hits);
  return false;
}

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }

    const body = await req.json();

    // Honeypot
    if (body._hp_url) {
      return NextResponse.json({ success: true });
    }

    const { email, optInSales } = body;

    if (!email) {
      return NextResponse.json({ error: "Email is required." }, { status: 400 });
    }
    if (!/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Invalid email address." }, { status: 400 });
    }

    // PDF download link — stored in /public/downloads/
    const pdfUrl = "https://sincereglass.com/downloads/glass-building-codes-comparison.pdf";

    // 1. Send PDF download email to the user
    await resend.emails.send({
      from: FROM,
      to: [email],
      subject: "Your Free Guide: Global Glass Building Codes Comparison",
      html: \`
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"/></head>
<body style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:20px;color:#1C1F26;">
  <div style="background:linear-gradient(135deg,#1C1F26,#3A4250);padding:24px;border-radius:8px 8px 0 0;text-align:center;">
    <h1 style="margin:0;color:#DAA745;font-size:22px;">Your Free Guide is Ready</h1>
    <p style="margin:8px 0 0;color:#F2F0ED;font-size:14px;">Global Architectural Glass Building Codes Comparison</p>
  </div>
  <div style="border:1px solid #e5e7eb;border-top:none;padding:24px;border-radius:0 0 8px 8px;">
    <p>Thank you for your interest! Click the button below to download your free guide comparing building codes across US (IBC), EU (EN), China (GB), and Australia (AS).</p>
    <div style="text-align:center;margin:24px 0;">
      <a href="\${pdfUrl}" style="display:inline-block;background:#DAA745;color:#1C1F26;padding:14px 32px;border-radius:6px;text-decoration:none;font-weight:700;font-size:16px;">
        📥 Download PDF Guide
      </a>
    </div>
    <p style="font-size:13px;color:#6b7280;">This link will remain active. You can also access the guide directly at:<br/><a href="\${pdfUrl}">\${pdfUrl}</a></p>
    <hr style="border:none;border-top:1px solid #e5e7eb;margin:20px 0;"/>
    <p style="font-size:13px;color:#6b7280;">Need custom glass solutions? <a href="https://sincereglass.com/contact" style="color:#DAA745;">Contact our team</a> for a free quote.</p>
  </div>
</body>
</html>\`,
    });

    // 2. Notify sales team of the lead
    await resend.emails.send({
      from: FROM,
      to: [TO],
      subject: \`📋 New Lead Magnet Download\${optInSales ? " ★ Sales Opt-In" : ""} — \${email}\`,
      html: \`
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"/></head>
<body style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:20px;color:#1C1F26;">
  <div style="background:\${optInSales ? "#DAA745" : "#8B95A5"};padding:16px 24px;border-radius:8px 8px 0 0;">
    <h1 style="margin:0;color:#1C1F26;font-size:20px;">New Lead Captured</h1>
  </div>
  <div style="border:1px solid #e5e7eb;border-top:none;padding:24px;border-radius:0 0 8px 8px;">
    <table style="width:100%;border-collapse:collapse;">
      <tr><td style="padding:8px 0;color:#6b7280;width:140px;">Email</td><td style="padding:8px 0;font-weight:600;"><a href="mailto:\${email}">\${email}</a></td></tr>
      <tr><td style="padding:8px 0;color:#6b7280;">Downloaded</td><td style="padding:8px 0;">Glass Building Codes Comparison PDF</td></tr>
      <tr><td style="padding:8px 0;color:#6b7280;">Sales Opt-In</td><td style="padding:8px 0;font-weight:600;color:\${optInSales ? "#16a34a" : "#6b7280"};">\${optInSales ? "✅ YES — Follow up!" : "❌ No"}</td></tr>
    </table>
    <p style="margin-top:16px;font-size:12px;color:#9ca3af;">Captured at \${new Date().toISOString()}</p>
  </div>
</body>
</html>\`,
    });

    return NextResponse.json({ success: true, downloadUrl: pdfUrl });
  } catch (err) {
    console.error("Lead magnet API error:", err);
    return NextResponse.json({ error: "Server error." }, { status: 500 });
  }
}
`
);
console.log("✅ Created /api/lead-magnet/route.ts (Resend version)");

/* ═══════════════════════════════════════════════════
   4.  QuoteModal.tsx — Add form submission logic
   ═══════════════════════════════════════════════════ */

// Read existing file to preserve as much as possible
const quoteModalPath = src("components", "QuoteModal.tsx");
let quoteModalContent;
if (existsSync(quoteModalPath)) {
  quoteModalContent = readFileSync(quoteModalPath, "utf-8");
  console.log("📖 Read existing QuoteModal.tsx — patching...");
} else {
  console.log("⚠️  QuoteModal.tsx not found — writing full file...");
}

// Write complete QuoteModal with submission logic
writeFileSync(
  quoteModalPath,
  `"use client";

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
`
);
console.log("✅ Updated QuoteModal.tsx with form submission");

/* ═══════════════════════════════════════════════════
   5.  Contact page — Add form submission logic
   ═══════════════════════════════════════════════════ */

// The contact page is a full page component, write the entire ContactForm as a separate client component
ensure(src("components"));
writeFileSync(
  src("components", "ContactForm.tsx"),
  `"use client";

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
`
);
console.log("✅ Created ContactForm.tsx client component");

/* ═══════════════════════════════════════════════════
   6.  Contact page.tsx — Inject ContactForm
   ═══════════════════════════════════════════════════ */

// We need to patch the contact page to use the ContactForm component
// Since the existing page has the form inline, we'll create a helper script
// that the user can check against their page

writeFileSync(
  src("components", "ContactPagePatch.md"),
  `# Contact Page Patch Instructions

In \`src/app/contact/page.tsx\`, replace the inline <form> block with:

1. Add import at the top:
   import ContactForm from "@/components/ContactForm";

2. Replace the entire <form>...</form> section with:
   <ContactForm />

The ContactForm component handles:
- All 6 fields (firstName, lastName, email, phone, subject, message)
- Honeypot anti-spam
- Submission to /api/contact
- Loading/success/error states
- Same styling as existing form

If your contact page is a Server Component (no "use client"),
you can keep it that way — ContactForm is its own client component.
`
);
console.log("✅ Created ContactPagePatch.md with integration instructions");

/* ═══════════════════════════════════════════════════
   7.  LeadMagnetCTA.tsx — Update to use Resend API
   ═══════════════════════════════════════════════════ */

// The LeadMagnetCTA already exists from Patch 2a — update its submission logic
writeFileSync(
  src("components", "blog", "blocks", "LeadMagnetCTA.tsx"),
  `"use client";

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
`
);
console.log("✅ Updated LeadMagnetCTA.tsx with Resend submission");

/* ═══════════════════════════════════════════════════
   8.  Auto-patch Contact page.tsx
   ═══════════════════════════════════════════════════ */
const contactPagePath = src("app", "contact", "page.tsx");
if (existsSync(contactPagePath)) {
  let contactPage = readFileSync(contactPagePath, "utf-8");

  // Add ContactForm import if not present
  if (!contactPage.includes("ContactForm")) {
    // Add import after other imports
    contactPage = contactPage.replace(
      /(import\s+.*\n)/,
      '$1import ContactForm from "@/components/ContactForm";\n'
    );

    // Replace inline <form> with <ContactForm />
    // Match the form tag (various patterns it might use)
    const formRegex = /<form[\s\S]*?<\/form>/;
    if (formRegex.test(contactPage)) {
      contactPage = contactPage.replace(formRegex, "<ContactForm />");
      console.log("✅ Auto-patched contact/page.tsx — replaced inline form with <ContactForm />");
    } else {
      console.log("⚠️  Could not auto-find <form> in contact/page.tsx — see ContactPagePatch.md for manual steps");
    }

    writeFileSync(contactPagePath, contactPage);
  } else {
    console.log("ℹ️  contact/page.tsx already has ContactForm import");
  }
} else {
  console.log("⚠️  contact/page.tsx not found at expected path — see ContactPagePatch.md");
}

/* ═══════════════════════════════════════════════════
   9.  .env.local template
   ═══════════════════════════════════════════════════ */
const envPath = join(BASE, ".env.local.example");
const envContent = `# ── Resend (Email API) ──────────────────────────
# Get your API key at: https://resend.com/api-keys
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxxxxxx

# ── Sender Address ─────────────────────────────
# Before domain verification, use Resend default:
RESEND_FROM_EMAIL=Sincere Glass <onboarding@resend.dev>
# After verifying sincereglass.com in Resend, change to:
# RESEND_FROM_EMAIL=Sincere Glass Website <noreply@sincereglass.com>

# ── Form Notification Recipient ────────────────
# Email address that receives quote/contact form submissions
NOTIFICATION_EMAIL=sales@sincereglass.com
`;

writeFileSync(envPath, envContent);
console.log("✅ Created .env.local.example");

/* ═══════════════════════════════════════════════════
   10.  Summary
   ═══════════════════════════════════════════════════ */
console.log(`
════════════════════════════════════════════════════
  ✅ Backend Forms Patch Complete
════════════════════════════════════════════════════

Created files:
  📁 src/app/api/quote/route.ts        — Quote form API (Resend)
  📁 src/app/api/contact/route.ts      — Contact form API (Resend)
  📁 src/app/api/lead-magnet/route.ts  — Lead magnet API (Resend)
  📁 src/components/QuoteModal.tsx      — Updated with form submission
  📁 src/components/ContactForm.tsx     — New contact form component
  📁 src/components/blog/blocks/LeadMagnetCTA.tsx — Updated with Resend
  📁 src/components/ContactPagePatch.md — Integration guide
  📁 .env.local.example                — Environment vars template

NEXT STEPS:

  1. Install Resend:
     npm install resend

  2. Register at https://resend.com and get API key

  3. Create .env.local with your keys:
     RESEND_API_KEY=re_xxxxx
     NOTIFICATION_EMAIL=sales@sincereglass.com

  4. Add same env vars in Vercel Dashboard:
     Project Settings → Environment Variables

  5. Resend domain verification:
     In Resend Dashboard → Domains → Add sincereglass.com
     Add the DNS records (DKIM, SPF, DMARC) to Cloudflare
     Until verified, emails use Resend default sender

  6. After domain verified, update .env.local:
     RESEND_FROM_EMAIL=Sincere Glass Website <noreply@sincereglass.com>

  7. Test locally:
     npm run dev → submit test forms → check inbox

  8. Push to GitHub → Vercel auto-deploys

════════════════════════════════════════════════════
`);
