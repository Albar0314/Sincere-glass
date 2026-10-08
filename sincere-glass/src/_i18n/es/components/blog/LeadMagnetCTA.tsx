'use client';

import { useState } from 'react';
type Variant = 'inline' | 'footer';
interface Props {
  variant?: Variant;
  articleSlug: string;
  title?: string;
  description?: string;
}
type Status = 'idle' | 'submitting' | 'success' | 'error';
export default function LeadMagnetCTA({
  variant = 'inline',
  articleSlug,
  title = 'Free Download: Global Glass Building Codes Comparison',
  description = 'A side-by-side reference for architectural glass regulations across US IBC, EU EN, China GB, and Australia AS \u2014 free PDF for architects and specifiers.'
}: Props) {
  const [email, setEmail] = useState('');
  const [optIn, setOptIn] = useState(false);
  const [status, setStatus] = useState<Status>('idle');
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (status === 'submitting') return;
    setStatus('submitting');
    setErrorMessage(null);
    try {
      const res = await fetch('/api/lead-magnet', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email,
          articleSlug,
          salesOptIn: optIn,
          magnet: 'global-glass-codes-comparison'
        })
      });
      if (!res.ok) throw new Error(`${res.status}`);
      const data = await res.json();
      setDownloadUrl(data.downloadUrl || '/downloads/global-glass-codes-comparison.pdf');
      setStatus('success');
    } catch (err: any) {
      setStatus('error');
      setErrorMessage('Something went wrong. Please try again or email us directly.');
    }
  }
  const isFooter = variant === 'footer';
  const wrapperClass = isFooter ? 'my-14 rounded-2xl bg-gradient-to-br from-[#3A4250]/40 to-[#1C1F26] p-8 md:p-10 border border-[#DAA745]/30' : 'my-10 rounded-xl bg-[#3A4250]/20 p-6 md:p-7 border border-[#3A4250]/40';
  if (status === 'success') {
    return <div className={wrapperClass}>
        <div className="flex items-start gap-3">
          <svg className="w-6 h-6 text-[#DAA745] flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div className="flex-1">
            <h3 className={`font-bold text-[#F2F0ED] m-0 mb-2 ${isFooter ? 'text-xl' : 'text-base'}`}>
              Su descarga está lista
            </h3>
            <p className="text-sm text-[#8B95A5] m-0 mb-4">
              Gracias por su interés. Haga clic en el botón a continuación para descargar el PDF.
            </p>
            <a href={downloadUrl || '#'} download className="inline-block px-5 py-2.5 bg-[#DAA745] text-[#1C1F26] rounded-full text-sm font-semibold hover:bg-[#c4952e] transition-colors no-underline">
              Descargar PDF ↓
            </a>
          </div>
        </div>
      </div>;
  }
  return <div className={wrapperClass}>
      <div className={isFooter ? 'md:grid md:grid-cols-[1fr_auto] md:gap-8 md:items-center' : ''}>
        <div className={isFooter ? '' : 'mb-5'}>
          <div className="flex items-center gap-2 mb-2">
            <svg className="w-4 h-4 text-[#DAA745]" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
            </svg>
            <span className="text-xs font-semibold text-[#DAA745] tracking-wider uppercase">
              Recurso Gratuito
            </span>
          </div>
          <h3 className={`font-bold text-[#F2F0ED] m-0 mb-2 ${isFooter ? 'text-xl md:text-2xl' : 'text-lg'}`}>
            {title}
          </h3>
          <p className="text-sm text-[#8B95A5] m-0 leading-relaxed">{description}</p>
        </div>

        <form onSubmit={handleSubmit} className={isFooter ? 'md:min-w-[320px]' : ''}>
          <div className="flex flex-col sm:flex-row gap-2">
            <input type="email" required value={email} onChange={e => setEmail(e.target.value)} placeholder="your@email.com" className="flex-1 px-4 py-2.5 rounded-full bg-[#1C1F26] border border-[#3A4250] text-[#F2F0ED] placeholder:text-[#8B95A5]/60 text-sm focus:outline-none focus:border-[#DAA745] transition-colors" disabled={status === 'submitting'} />
            <button type="submit" disabled={status === 'submitting'} className="px-5 py-2.5 bg-[#DAA745] text-[#1C1F26] rounded-full text-sm font-semibold hover:bg-[#c4952e] disabled:opacity-60 disabled:cursor-not-allowed transition-colors whitespace-nowrap">
              {status === 'submitting' ? 'Sending\u2026' : 'Get PDF'}
            </button>
          </div>
          <label className="flex items-start gap-2 mt-3 cursor-pointer text-xs text-[#8B95A5]">
            <input type="checkbox" checked={optIn} onChange={e => setOptIn(e.target.checked)} className="mt-0.5 accent-[#DAA745] flex-shrink-0" />
            <span>
              Sí, me gustaría que Sincere Glass realice un seguimiento con una consulta de producto.
            </span>
          </label>
          {errorMessage && <p className="text-xs text-red-400 mt-2 m-0">{errorMessage}</p>}
        </form>
      </div>
    </div>;
}