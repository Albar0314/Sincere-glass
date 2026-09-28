import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Sincere Glass — a professional glass manufacturer based in Hubei, China with 15+ years of production experience.",
};

export default function AboutPage() {
  return (
    <section className="py-16 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-semibold mb-8">About Sincere Glass</h1>

        <div className="space-y-6 text-brand-steel leading-relaxed">
          <p>
            Sincere Glass (武汉欣城玻璃有限公司 / 湖北欣之城玻璃有限公司) is a
            professional glass manufacturer headquartered in Hubei Province,
            China. With over 15 years of experience in the domestic glass
            market, we bring proven manufacturing capability to the global
            stage.
          </p>

          <p>
            Our facilities include complete production lines for cutting,
            edging, tempering, laminating, insulating, and coating — enabling
            us to deliver a full range of architectural and industrial glass
            products from a single source.
          </p>

          <h2 className="text-2xl font-semibold text-brand-navy pt-4">
            Our Capabilities
          </h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Flat and curved glass tempering</li>
            <li>Double and triple insulated glass unit (IGU) assembly</li>
            <li>PVB and SGP lamination</li>
            <li>Low-E and reflective coating processing</li>
            <li>CNC cutting and precision edgework</li>
            <li>Custom sizes and specifications per project requirements</li>
          </ul>

          <h2 className="text-2xl font-semibold text-brand-navy pt-4">
            Quality Commitment
          </h2>
          <p>
            {/* TODO: Update with confirmed certifications */}
            We maintain strict quality control throughout the production
            process. Our products are manufactured to meet international
            standards for safety and performance.
          </p>
        </div>
      </div>
    </section>
  );
}
