import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with Sincere Glass for a quote or to discuss your glass requirements. We respond within 24 hours.",
};

export default function ContactPage() {
  return (
    <section className="py-16 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-semibold mb-4">Contact Us</h1>
        <p className="text-brand-steel mb-10">
          Send us your project details and we will get back to you within 24
          hours with a quote.
        </p>

        {/* TODO: Replace with a real form handler (e.g. Formspree, WPForms REST, or custom API route) */}
        <form className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-1">
                Your Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-brand-sky"
              />
            </div>
            <div>
              <label htmlFor="company" className="block text-sm font-medium mb-1">
                Company
              </label>
              <input
                type="text"
                id="company"
                name="company"
                className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-brand-sky"
              />
            </div>
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-brand-sky"
            />
          </div>

          <div>
            <label htmlFor="product" className="block text-sm font-medium mb-1">
              Product Interest
            </label>
            <select
              id="product"
              name="product"
              className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-brand-sky"
            >
              <option value="">Select a product</option>
              <option value="tempered">Tempered Glass</option>
              <option value="insulated">Insulated Glass</option>
              <option value="laminated">Laminated Glass</option>
              <option value="low-e">Low-E Glass</option>
              <option value="decorative">Decorative Glass</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium mb-1">
              Project Details
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              required
              placeholder="Glass type, dimensions, quantity, delivery location..."
              className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-brand-sky"
            />
          </div>

          <button
            type="submit"
            className="bg-brand-navy text-white font-medium px-8 py-3 rounded hover:bg-gray-800 transition-colors"
          >
            Send Inquiry
          </button>
        </form>
      </div>
    </section>
  );
}
