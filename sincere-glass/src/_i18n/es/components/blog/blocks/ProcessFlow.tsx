'use client';

interface Step {
  title: string;
  description: string;
  icon?: string; // emoji or short label
}
interface Props {
  title?: string;
  steps: Step[];
}
export default function ProcessFlow({
  title,
  steps
}: Props) {
  return <div className="my-10 py-8 px-6 bg-[#3A4250]/10 rounded-xl border border-[#3A4250]/20">
      {title && <h3 className="text-lg font-semibold text-[#F2F0ED] mb-6">{title}</h3>}
      <div className="relative">
        {/* Connector line */}
        <div className="absolute left-[19px] top-4 bottom-4 w-px bg-[#DAA745]/20 hidden md:block" />

        <div className="space-y-6">
          {steps.map((step, i) => <div key={i} className="flex gap-4 md:gap-6 items-start">
              <div className="w-10 h-10 rounded-full bg-[#DAA745]/10 border border-[#DAA745]/30 flex items-center justify-center shrink-0 text-sm font-semibold text-[#DAA745] relative z-10">
                {step.icon || i + 1}
              </div>
              <div className="pt-1.5">
                <h4 className="font-medium text-[#F2F0ED] mb-1">{step.title}</h4>
                <p className="text-sm text-[#8B95A5] leading-relaxed">{step.description}</p>
              </div>
            </div>)}
        </div>
      </div>
    </div>;
}