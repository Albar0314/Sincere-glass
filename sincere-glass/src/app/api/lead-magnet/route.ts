import { NextRequest, NextResponse } from "next/server";
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
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Invalid email address." }, { status: 400 });
    }

    // PDF download link — stored in /public/downloads/
    const pdfUrl = "https://sincereglass.com/downloads/glass-building-codes-comparison.pdf";

    // 1. Send PDF download email to the user
    await resend.emails.send({
      from: FROM,
      to: [email],
      subject: "Your Free Guide: Global Glass Building Codes Comparison",
      html: `
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
      <a href="${pdfUrl}" style="display:inline-block;background:#DAA745;color:#1C1F26;padding:14px 32px;border-radius:6px;text-decoration:none;font-weight:700;font-size:16px;">
        📥 Download PDF Guide
      </a>
    </div>
    <p style="font-size:13px;color:#6b7280;">This link will remain active. You can also access the guide directly at:<br/><a href="${pdfUrl}">${pdfUrl}</a></p>
    <hr style="border:none;border-top:1px solid #e5e7eb;margin:20px 0;"/>
    <p style="font-size:13px;color:#6b7280;">Need custom glass solutions? <a href="https://sincereglass.com/contact" style="color:#DAA745;">Contact our team</a> for a free quote.</p>
  </div>
</body>
</html>`,
    });

    // 2. Notify sales team of the lead
    await resend.emails.send({
      from: FROM,
      to: [TO],
      subject: `📋 New Lead Magnet Download${optInSales ? " ★ Sales Opt-In" : ""} — ${email}`,
      html: `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"/></head>
<body style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:20px;color:#1C1F26;">
  <div style="background:${optInSales ? "#DAA745" : "#8B95A5"};padding:16px 24px;border-radius:8px 8px 0 0;">
    <h1 style="margin:0;color:#1C1F26;font-size:20px;">New Lead Captured</h1>
  </div>
  <div style="border:1px solid #e5e7eb;border-top:none;padding:24px;border-radius:0 0 8px 8px;">
    <table style="width:100%;border-collapse:collapse;">
      <tr><td style="padding:8px 0;color:#6b7280;width:140px;">Email</td><td style="padding:8px 0;font-weight:600;"><a href="mailto:${email}">${email}</a></td></tr>
      <tr><td style="padding:8px 0;color:#6b7280;">Downloaded</td><td style="padding:8px 0;">Glass Building Codes Comparison PDF</td></tr>
      <tr><td style="padding:8px 0;color:#6b7280;">Sales Opt-In</td><td style="padding:8px 0;font-weight:600;color:${optInSales ? "#16a34a" : "#6b7280"};">${optInSales ? "✅ YES — Follow up!" : "❌ No"}</td></tr>
    </table>
    <p style="margin-top:16px;font-size:12px;color:#9ca3af;">Captured at ${new Date().toISOString()}</p>
  </div>
</body>
</html>`,
    });

    return NextResponse.json({ success: true, downloadUrl: pdfUrl });
  } catch (err) {
    console.error("Lead magnet API error:", err);
    return NextResponse.json({ error: "Server error." }, { status: 500 });
  }
}
