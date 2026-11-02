'use client';

import { useState } from 'react';

type Thickness = 'thin' | 'medium' | 'thick' | 'extra-thick';
type Application =
  | 'shower'
  | 'showcase'
  | 'facade-spandrel'
  | 'facade-vision'
  | 'furniture'
  | 'aquarium'
  | 'solar'
  | 'backsplash';
type Priority = 'color-accuracy' | 'edge-appearance' | 'max-transmission' | 'cost-sensitive';
type Verdict = 'essential' | 'recommended' | 'marginal' | 'not-needed';

interface VerdictDetail {
  label: string;
  color: string;
  bg: string;
  border: string;
  summary: string;
}

const VERDICTS: Record<Verdict, VerdictDetail> = {
  essential: {
    label: 'Low Iron is Essential',
    color: '#4ade80',
    bg: 'bg-green-500/10',
    border: 'border-green-500/40',
    summary: 'The premium is justified by failure cost. Standard clear will visibly compromise the design.',
  },
  recommended: {
    label: 'Low Iron Recommended',
    color: '#DAA745',
    bg: 'bg-[#DAA745]/10',
    border: 'border-[#DAA745]/40',
    summary: 'Noticeable improvement at a reasonable premium. Default to low iron unless budget is extremely tight.',
  },
  marginal: {
    label: 'Low Iron Marginal',
    color: '#f59e0b',
    bg: 'bg-amber-500/10',
    border: 'border-amber-500/40',
    summary: 'Difference is detectable but subtle. Decide on project budget and client sensitivity.',
  },
  'not-needed': {
    label: 'Standard Clear is Fine',
    color: '#8B95A5',
    bg: 'bg-[#8B95A5]/10',
    border: 'border-[#8B95A5]/40',
    summary: 'The visual difference is not worth the 30 to 100 percent cost uplift for this use case.',
  },
};

const THICKNESS_LABEL: Record<Thickness, string> = {
  'thin': '4 to 6 mm',
  'medium': '8 to 10 mm',
  'thick': '12 to 15 mm',
  'extra-thick': '19 mm or more',
};

const APPLICATION_LABEL: Record<Application, string> = {
  'shower': 'Frameless shower / bath',
  'showcase': 'Retail / museum showcase',
  'facade-spandrel': 'Facade spandrel (opaque)',
  'facade-vision': 'Facade vision glass',
  'furniture': 'Table top / shelf',
  'aquarium': 'Aquarium / pool viewing',
  'solar': 'Solar panel cover',
  'backsplash': 'Kitchen backsplash',
};

const PRIORITY_LABEL: Record<Priority, string> = {
  'color-accuracy': 'Color fidelity through glass',
  'edge-appearance': 'Edge appearance (frameless)',
  'max-transmission': 'Maximum light transmission',
  'cost-sensitive': 'Cost sensitive',
};

function decide(thickness: Thickness, app: Application, priority: Priority): { verdict: Verdict; reasoning: string } {
  if (app === 'solar') {
    return { verdict: 'essential', reasoning: 'Solar panel glass is almost always low iron because every point of visible light transmission translates directly into cell efficiency.' };
  }
  if (app === 'showcase' || app === 'aquarium') {
    return { verdict: 'essential', reasoning: 'The glass is viewed against colored contents at close range. Standard green cast will shift displayed colors by a visible margin.' };
  }
  if (app === 'shower' && (thickness === 'medium' || thickness === 'thick' || thickness === 'extra-thick')) {
    return { verdict: 'essential', reasoning: 'Frameless shower doors expose the glass edge at under 1 m viewing distance. Green edge is immediately obvious on tempered 10 mm and above.' };
  }
  if (app === 'furniture' && (thickness === 'thick' || thickness === 'extra-thick')) {
    return { verdict: 'essential', reasoning: 'Thick table tops concentrate the green tint when viewed through the pane. Clients will notice and comment.' };
  }
  if (app === 'facade-spandrel') {
    return { verdict: 'not-needed', reasoning: 'Spandrel glass is opaque or back painted. The green tint of the substrate is irrelevant to the finished appearance.' };
  }
  if (app === 'backsplash') {
    if (priority === 'color-accuracy' || priority === 'edge-appearance') {
      return { verdict: 'recommended', reasoning: 'White or pale backsplashes show the green cast of standard glass. Low iron keeps the specified color true.' };
    }
    return { verdict: 'marginal', reasoning: 'For deep colors like black or navy the tint difference is invisible. For pale colors low iron is noticeable.' };
  }
  if (app === 'facade-vision') {
    if (thickness === 'extra-thick') {
      return { verdict: 'recommended', reasoning: 'At 19 mm or more, standard glass loses 25 percent of visible light transmission to iron absorption. This affects interior daylight.' };
    }
    if (thickness === 'thick' && priority === 'max-transmission') {
      return { verdict: 'recommended', reasoning: 'Energy performance targets or passive solar design often make the 7 to 10 point VLT gain worth the premium.' };
    }
    if (priority === 'cost-sensitive') {
      return { verdict: 'not-needed', reasoning: 'Vision glass at 6 to 10 mm viewed from street distance rarely shows a tint difference that justifies cost on a budget project.' };
    }
    return { verdict: 'marginal', reasoning: 'Visible from distance the green cast is detectable only to trained eyes. Decide by project tier.' };
  }
  if (app === 'shower' && thickness === 'thin') {
    return { verdict: 'marginal', reasoning: 'Thin shower glass is uncommon and shows minimal tint. Low iron is a premium touch rather than a necessity.' };
  }
  if (app === 'furniture' && (thickness === 'thin' || thickness === 'medium')) {
    if (priority === 'cost-sensitive') {
      return { verdict: 'not-needed', reasoning: 'Thin furniture glass under 10 mm shows little edge tint. Standard clear is adequate.' };
    }
    return { verdict: 'recommended', reasoning: 'Low iron adds visible refinement on exposed edges but is not critical at this thickness.' };
  }
  return { verdict: 'marginal', reasoning: 'Edge case. Rely on a mockup or small sample panel before committing to the full order quantity.' };
}

interface Props {
  initialThickness?: Thickness;
  initialApplication?: Application;
  initialPriority?: Priority;
}

export default function WhenToUseDecisionMatrix({
  initialThickness = 'medium',
  initialApplication = 'shower',
  initialPriority = 'edge-appearance',
}: Props) {
  const [thickness, setThickness] = useState<Thickness>(initialThickness);
  const [application, setApplication] = useState<Application>(initialApplication);
  const [priority, setPriority] = useState<Priority>(initialPriority);

  const result = decide(thickness, application, priority);
  const v = VERDICTS[result.verdict];

  return (
    <div className="my-10 rounded-xl bg-[#3A4250]/15 border border-[#3A4250]/40 p-6 md:p-8">
      <div className="mb-5">
        <div className="text-xs font-semibold text-[#DAA745] uppercase tracking-wider mb-1">
          Decision Matrix
        </div>
        <h3 className="text-xl font-bold text-[#F2F0ED] m-0">
          Does Your Project Actually Need Low Iron Glass?
        </h3>
      </div>

      <div className="space-y-5 mb-6">
        <div>
          <div className="text-xs text-[#8B95A5] uppercase tracking-wider mb-2">Thickness</div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {(Object.keys(THICKNESS_LABEL) as Thickness[]).map((t) => (
              <button
                key={t}
                onClick={() => setThickness(t)}
                className={`py-2 px-3 rounded-lg text-xs font-medium transition-colors ${
                  thickness === t
                    ? 'bg-[#DAA745] text-[#1C1F26]'
                    : 'bg-[#1C1F26] text-[#8B95A5] hover:text-[#F2F0ED] border border-[#3A4250]/40'
                }`}
              >
                {THICKNESS_LABEL[t]}
              </button>
            ))}
          </div>
        </div>

        <div>
          <div className="text-xs text-[#8B95A5] uppercase tracking-wider mb-2">Application</div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {(Object.keys(APPLICATION_LABEL) as Application[]).map((a) => (
              <button
                key={a}
                onClick={() => setApplication(a)}
                className={`py-2 px-3 rounded-lg text-xs font-medium text-left transition-colors ${
                  application === a
                    ? 'bg-[#DAA745] text-[#1C1F26]'
                    : 'bg-[#1C1F26] text-[#8B95A5] hover:text-[#F2F0ED] border border-[#3A4250]/40'
                }`}
              >
                {APPLICATION_LABEL[a]}
              </button>
            ))}
          </div>
        </div>

        <div>
          <div className="text-xs text-[#8B95A5] uppercase tracking-wider mb-2">Visual Priority</div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {(Object.keys(PRIORITY_LABEL) as Priority[]).map((p) => (
              <button
                key={p}
                onClick={() => setPriority(p)}
                className={`py-2 px-3 rounded-lg text-xs font-medium text-left transition-colors ${
                  priority === p
                    ? 'bg-[#DAA745] text-[#1C1F26]'
                    : 'bg-[#1C1F26] text-[#8B95A5] hover:text-[#F2F0ED] border border-[#3A4250]/40'
                }`}
              >
                {PRIORITY_LABEL[p]}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className={`rounded-xl ${v.bg} ${v.border} border p-5`}>
        <div className="flex items-center gap-2 mb-2">
          <div
            className="w-2.5 h-2.5 rounded-full"
            style={{ background: v.color }}
          />
          <div className="text-sm font-bold uppercase tracking-wider" style={{ color: v.color }}>
            {v.label}
          </div>
        </div>
        <div className="text-sm font-semibold text-[#F2F0ED] mb-2">{v.summary}</div>
        <div className="text-sm text-[#8B95A5] leading-relaxed">{result.reasoning}</div>
      </div>

      <div className="mt-4 text-xs text-[#8B95A5] italic">
        Guidance based on common industry experience. Always confirm with a physical sample mockup before ordering jumbo quantities.
      </div>
    </div>
  );
}
