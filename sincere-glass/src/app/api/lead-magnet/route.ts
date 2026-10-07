import { NextRequest, NextResponse } from 'next/server';
import { appendFileSync, mkdirSync, existsSync } from 'fs';
import { join } from 'path';

/**
 * POST /api/lead-magnet
 *
 * Captures email + opt-in and returns a PDF download URL.
 *
 * CURRENT (dev/MVP): logs to data/leads.jsonl locally.
 * PRODUCTION TODO: wire to an email service (Mailchimp / Brevo / SendGrid)
 * and gate the PDF behind a signed, time-limited URL.
 */

interface LeadPayload {
  email: string;
  articleSlug: string;
  salesOptIn: boolean;
  magnet: string;
}

const PDF_URL_MAP: Record<string, string> = {
  'global-glass-codes-comparison': '/downloads/global-glass-codes-comparison.pdf',
};

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as LeadPayload;

    if (!body.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email)) {
      return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
    }
    if (!body.magnet || !(body.magnet in PDF_URL_MAP)) {
      return NextResponse.json({ error: 'Unknown magnet' }, { status: 400 });
    }

    // Dev: append to local JSONL file
    const dataDir = join(process.cwd(), 'data');
    if (!existsSync(dataDir)) mkdirSync(dataDir, { recursive: true });
    const record = {
      ...body,
      timestamp: new Date().toISOString(),
      userAgent: req.headers.get('user-agent') || '',
    };
    appendFileSync(join(dataDir, 'leads.jsonl'), JSON.stringify(record) + '\n');

    return NextResponse.json({
      ok: true,
      downloadUrl: PDF_URL_MAP[body.magnet],
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message || 'Server error' },
      { status: 500 },
    );
  }
}
