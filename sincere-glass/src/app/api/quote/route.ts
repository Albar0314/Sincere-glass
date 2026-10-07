import { NextRequest, NextResponse } from "next/server";
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
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Invalid email address." }, { status: 400 });
    }

    const { data, error } = await resend.emails.send({
      from: FROM,
      to: [TO],
      replyTo: email,
      subject: `🔔 New Quote Request — ${product} — ${name}`,
      html: `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"/></head>
<body style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:20px;color:#1C1F26;">
  <div style="background:#DAA745;padding:16px 24px;border-radius:8px 8px 0 0;">
    <h1 style="margin:0;color:#1C1F26;font-size:20px;">New Quote Request</h1>
  </div>
  <div style="border:1px solid #e5e7eb;border-top:none;padding:24px;border-radius:0 0 8px 8px;">
    <table style="width:100%;border-collapse:collapse;">
      <tr><td style="padding:8px 0;color:#6b7280;width:120px;">Name</td><td style="padding:8px 0;font-weight:600;">${name}</td></tr>
      <tr><td style="padding:8px 0;color:#6b7280;">Email</td><td style="padding:8px 0;"><a href="mailto:${email}">${email}</a></td></tr>
      ${phone ? `<tr><td style="padding:8px 0;color:#6b7280;">Phone</td><td style="padding:8px 0;">${phone}</td></tr>` : ""}
      ${company ? `<tr><td style="padding:8px 0;color:#6b7280;">Company</td><td style="padding:8px 0;">${company}</td></tr>` : ""}
      <tr><td style="padding:8px 0;color:#6b7280;">Product</td><td style="padding:8px 0;font-weight:600;color:#DAA745;">${product}</td></tr>
      ${quantity ? `<tr><td style="padding:8px 0;color:#6b7280;">Quantity</td><td style="padding:8px 0;">${quantity}</td></tr>` : ""}
    </table>
    ${message ? `<div style="margin-top:16px;padding:12px;background:#f9fafb;border-radius:6px;"><p style="margin:0 0 4px;color:#6b7280;font-size:13px;">Message</p><p style="margin:0;">${message}</p></div>` : ""}
    <p style="margin-top:24px;font-size:12px;color:#9ca3af;">Submitted from sincereglass.com at ${new Date().toISOString()}</p>
  </div>
</body>
</html>`,
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
