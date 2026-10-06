"use client";
import { useQuote } from "@/lib/QuoteContext";

export default function InlineQuoteCTA({
  text = "Get a quote for this product",
  product = "",
  variant = "default",
}: {
  text?: string;
  product?: string;
  variant?: "default" | "dark" | "compact";
}) {
  const { openQuote } = useQuote();

  if (variant === "compact") {
    return (
      <button
        onClick={() => openQuote(product)}
        className="text-sm font-medium text-brand-accent hover:text-brand-accent-hover transition-colors inline-flex items-center gap-1"
      >
        {text}
        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    );
  }

  const bg = variant === "dark"
    ? "bg-white/5 border-white/10 hover:border-white/20"
    : "bg-brand-accent/5 border-brand-accent/15 hover:border-brand-accent/30";
  const textColor = variant === "dark" ? "text-white/80" : "text-brand-dark";
  const btnBg = "bg-brand-accent hover:bg-brand-accent-hover text-brand-dark";

  return (
    <div className={"flex flex-col sm:flex-row items-center justify-between gap-4 p-5 rounded-xl border transition-all " + bg}>
      <p className={"text-sm font-medium " + textColor}>{text}</p>
      <button
        onClick={() => openQuote(product)}
        className={"flex-shrink-0 px-5 py-2 font-semibold text-sm rounded-md transition-colors " + btnBg}
      >
        Request Quote
      </button>
    </div>
  );
}
