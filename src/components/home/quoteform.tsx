"use client";

import { useState, FormEvent } from "react";
import { useInView } from "@/lib/useInView";

export default function QuoteForm() {
  const { ref, isInView } = useInView({ threshold: 0.1 });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    // TODO: wire up to Next.js API route or WP REST endpoint
    await new Promise((r) => setTimeout(r, 1200));

    setLoading(false);
    setSubmitted(true);
  }

  return (
    <section
      id="quote"
      className="py-20 md:py-28 bg-brand-dark relative overflow-hidden"
      ref={ref}
    >
      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Left: heading + contact info */}
          <div
            style={{
              opacity: isInView ? 1 : 0,
              transform: isInView ? "translateY(0)" : "translateY(24px)",
              transition: "all 600ms ease-out",
            }}
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white tracking-tight">
              Ready to Start Your Glass Project?
            </h2>
            <p className="mt-4 text-white/70 text-lg leading-relaxed">
              Tell us what you need — our team responds within 24 hours with a
              free quote and production timeline.
            </p>

            <div className="mt-10 space-y-6">
              {/* Factory 1 */}
              <div>
                <h3 className="text-brand-accent font-semibold text-sm tracking-wide uppercase">
                  Wuhan Factory
                </h3>
                <p className="mt-1 text-white/60 text-sm">
                  Wujin Industrial Park, Hannan District, Wuhan
                </p>
                <a
                  href="mailto:xcglass@sina.cn"
                  className="text-white/80 hover:text-brand-accent text-sm transition-colors"
                >
                  xcglass@sina.cn
                </a>
              </div>

              {/* Factory 2 */}
              <div>
                <h3 className="text-brand-accent font-semibold text-sm tracking-wide uppercase">
                  Honghu Factory
                </h3>
                <p className="mt-1 text-white/60 text-sm">
                  Xintan Town Industrial Park, Honghu, Hubei
                </p>
                <a
                  href="mailto:1348767121@qq.com"
                  className="text-white/80 hover:text-brand-accent text-sm transition-colors"
                >
                  1348767121@qq.com
                </a>
              </div>
            </div>
          </div>

          {/* Right: form */}
          <div
            style={{
              opacity: isInView ? 1 : 0,
              transform: isInView ? "translateY(0)" : "translateY(24px)",
              transition: "all 600ms ease-out 200ms",
            }}
          >
            {submitted ? (
              <div className="bg-white/5 border border-white/10 rounded-lg p-10 text-center">
                <div className="w-14 h-14 mx-auto rounded-full bg-green-500/20 flex items-center justify-center">
                  <svg
                    className="w-7 h-7 text-green-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <h3 className="mt-4 text-xl font-semibold text-white">
                  Thank you!
                </h3>
                <p className="mt-2 text-white/60">
                  Our team will respond within 24 hours.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="bg-white/5 border border-white/10 rounded-lg p-6 md:p-8 space-y-5"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm text-white/70 mb-1.5">
                      Full Name <span className="text-brand-accent">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      className="w-full px-4 py-2.5 bg-white/5 border border-white/15 rounded-md text-white placeholder:text-white/30 focus:outline-none focus:border-brand-accent/50 focus:ring-1 focus:ring-brand-accent/30 transition-colors"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-white/70 mb-1.5">
                      Email <span className="text-brand-accent">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      className="w-full px-4 py-2.5 bg-white/5 border border-white/15 rounded-md text-white placeholder:text-white/30 focus:outline-none focus:border-brand-accent/50 focus:ring-1 focus:ring-brand-accent/30 transition-colors"
                      placeholder="you@company.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm text-white/70 mb-1.5">
                      Phone / WhatsApp
                    </label>
                    <input
                      type="tel"
                      className="w-full px-4 py-2.5 bg-white/5 border border-white/15 rounded-md text-white placeholder:text-white/30 focus:outline-none focus:border-brand-accent/50 focus:ring-1 focus:ring-brand-accent/30 transition-colors"
                      placeholder="Include country code"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-white/70 mb-1.5">
                      Glass Type Needed
                    </label>
                    <select className="w-full px-4 py-2.5 bg-white/5 border border-white/15 rounded-md text-white/70 focus:outline-none focus:border-brand-accent/50 focus:ring-1 focus:ring-brand-accent/30 transition-colors">
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
                  <label className="block text-sm text-white/70 mb-1.5">
                    Project Description
                  </label>
                  <textarea
                    rows={4}
                    className="w-full px-4 py-2.5 bg-white/5 border border-white/15 rounded-md text-white placeholder:text-white/30 focus:outline-none focus:border-brand-accent/50 focus:ring-1 focus:ring-brand-accent/30 transition-colors resize-none"
                    placeholder="Tell us about your project — dimensions, quantity, application..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 bg-brand-accent hover:bg-brand-accent-hover disabled:opacity-60 text-brand-dark font-semibold rounded-md transition-colors duration-300"
                >
                  {loading ? "Sending..." : "Get Your Free Quote"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
