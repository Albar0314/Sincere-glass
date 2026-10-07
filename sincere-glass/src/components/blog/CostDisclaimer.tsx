interface Props {
  variant?: 'default' | 'compact';
}

export default function CostDisclaimer({ variant = 'default' }: Props) {
  if (variant === 'compact') {
    return (
      <p className="text-xs text-[#8B95A5] italic mt-2">
        2026 reference pricing, FOB Wuhan factory. Subject to formal quotation.
      </p>
    );
  }

  return (
    <div className="my-6 flex gap-3 items-start text-xs text-[#8B95A5] bg-[#3A4250]/15 rounded-lg p-4 border border-[#3A4250]/30">
      <svg className="w-4 h-4 flex-shrink-0 mt-0.5 text-[#8B95A5]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <p className="m-0 leading-relaxed">
        <strong className="text-[#F2F0ED]">Pricing note:</strong> All figures are 2026 reference pricing, FOB Wuhan factory, subject to formal quotation. Actual prices vary with glass thickness, coatings, panel size, order volume, and USD/CNY exchange rate at time of quotation.
      </p>
    </div>
  );
}
