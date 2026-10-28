'use client';

import { useState } from 'react';

/**
 * HST cycle chart — EN 14179-1 heating / soak / cooling curve
 * overlaid on α→β conversion rate.
 *
 * Views:
 *   - 'temperature' : standard EN 14179-1 cycle (ramp → 290±10°C soak 2h → cool)
 *   - 'conversion'  : overlay α→β phase conversion % at the holding temperature
 *
 * Reference: EN 14179-1:2016 Annex A specifies 280–300°C holding temperature
 * with a minimum 2-hour soak at the center of the thickest glass in the load.
 */

type View = 'temperature' | 'conversion';

export default function HSTCycleChart() {
  const [view, setView] = useState<View>('temperature');

  // SVG viewBox: 400 wide x 220 tall
  // X axis: 0–8 hours mapped to 50–380 (10 min = 7 px wide)
  // Y axis: 0–350°C mapped to 190–30 (height 160)

  const xForHour = (h: number) => 50 + (h / 8) * 330;
  const yForTemp = (t: number) => 190 - (t / 350) * 160;

  // Temperature curve waypoints (hours, °C)
  const tempPath = [
    [0.0, 20],   // ambient start
    [1.0, 150],  // ramp phase 1
    [2.0, 260],  // ramp phase 2 (approaching soak)
    [2.5, 290],  // soak begin
    [4.5, 290],  // soak end (2h hold)
    [5.5, 180],  // cooling begin
    [7.0, 60],   // cooling continues
    [8.0, 20],   // ambient
  ];

  // Conversion % overlay at soak temp. Modeled roughly as kinetics:
  // At 290°C, α→β completes >95% within 2h for critical-size inclusions.
  const conversionPath = [
    [0.0, 0],
    [1.0, 0],
    [2.0, 2],
    [2.5, 10],   // conversion ramps once we hit holding temp
    [3.0, 40],
    [3.5, 70],
    [4.0, 88],
    [4.5, 96],   // >95% done at end of 2h soak
    [5.5, 97],
    [8.0, 97],
  ];

  const pathD = (pts: number[][], mode: View) =>
    pts
      .map(([h, v], i) => {
        const x = xForHour(h);
        const y = mode === 'temperature' ? yForTemp(v) : 190 - (v / 100) * 160;
        return `${i === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`;
      })
      .join(' ');

  return (
    <div className="my-10 rounded-xl border border-[#3A4250]/40 bg-[#1C1F26] overflow-hidden">
      <div className="px-6 py-4 border-b border-[#3A4250]/40 flex items-center justify-between flex-wrap gap-3">
        <div>
          <div className="text-xs uppercase tracking-wider text-[#DAA745] font-semibold">
            Interactive &middot; HST cycle
          </div>
          <h3 className="text-lg font-semibold text-[#F2F0ED] m-0 mt-1">
            Inside an 8-hour heat soak oven cycle
          </h3>
        </div>
        <div className="flex gap-1.5">
          <button
            onClick={() => setView('temperature')}
            className={`px-3 py-1.5 rounded text-xs font-medium transition-colors ${
              view === 'temperature'
                ? 'bg-[#DAA745] text-[#1C1F26]'
                : 'bg-[#3A4250]/40 text-[#8B95A5] hover:bg-[#3A4250]/60'
            }`}
          >
            Temperature
          </button>
          <button
            onClick={() => setView('conversion')}
            className={`px-3 py-1.5 rounded text-xs font-medium transition-colors ${
              view === 'conversion'
                ? 'bg-[#DAA745] text-[#1C1F26]'
                : 'bg-[#3A4250]/40 text-[#8B95A5] hover:bg-[#3A4250]/60'
            }`}
          >
            α→β conversion
          </button>
        </div>
      </div>

      <div className="p-6 bg-[#3A4250]/10">
        <svg
          viewBox="0 0 400 220"
          className="w-full"
          role="img"
          aria-label={
            view === 'temperature'
              ? 'EN 14179-1 heat soak cycle temperature curve: ramp to 290 degrees Celsius, hold for 2 hours, cool to ambient'
              : 'Nickel sulfide alpha to beta phase conversion percentage over the 8-hour cycle, reaching 96 percent by end of soak'
          }
        >
          {/* Y-axis gridlines */}
          {view === 'temperature'
            ? [0, 100, 200, 290, 300].map((t) => (
                <g key={t}>
                  <line
                    x1="50"
                    x2="380"
                    y1={yForTemp(t)}
                    y2={yForTemp(t)}
                    stroke="#3A4250"
                    strokeOpacity="0.35"
                    strokeDasharray={t === 290 ? '0' : '2 3'}
                    strokeWidth={t === 290 ? 1 : 0.5}
                  />
                  <text
                    x="42"
                    y={yForTemp(t) + 3}
                    textAnchor="end"
                    fontSize="8"
                    fontFamily="monospace"
                    fill={t === 290 ? '#DAA745' : '#8B95A5'}
                  >
                    {t}°C
                  </text>
                </g>
              ))
            : [0, 25, 50, 75, 95, 100].map((v) => (
                <g key={v}>
                  <line
                    x1="50"
                    x2="380"
                    y1={190 - (v / 100) * 160}
                    y2={190 - (v / 100) * 160}
                    stroke="#3A4250"
                    strokeOpacity="0.35"
                    strokeDasharray={v === 95 ? '0' : '2 3'}
                    strokeWidth={v === 95 ? 1 : 0.5}
                  />
                  <text
                    x="42"
                    y={190 - (v / 100) * 160 + 3}
                    textAnchor="end"
                    fontSize="8"
                    fontFamily="monospace"
                    fill={v === 95 ? '#DAA745' : '#8B95A5'}
                  >
                    {v}%
                  </text>
                </g>
              ))}

          {/* Soak band (highlight 2.5–4.5h) */}
          <rect
            x={xForHour(2.5)}
            y={30}
            width={xForHour(4.5) - xForHour(2.5)}
            height={160}
            fill="#DAA745"
            fillOpacity="0.07"
          />
          <text
            x={(xForHour(2.5) + xForHour(4.5)) / 2}
            y={24}
            textAnchor="middle"
            fontSize="9"
            fill="#DAA745"
            fontFamily="monospace"
            fontWeight="600"
          >
            2h soak @ 290±10°C
          </text>

          {/* X-axis */}
          <line x1="50" x2="380" y1="190" y2="190" stroke="#8B95A5" strokeOpacity="0.4" />
          {[0, 2, 4, 6, 8].map((h) => (
            <g key={h}>
              <line
                x1={xForHour(h)}
                x2={xForHour(h)}
                y1="190"
                y2="194"
                stroke="#8B95A5"
                strokeOpacity="0.5"
              />
              <text
                x={xForHour(h)}
                y="206"
                textAnchor="middle"
                fontSize="8"
                fontFamily="monospace"
                fill="#8B95A5"
              >
                {h}h
              </text>
            </g>
          ))}

          {/* Faded companion curve (always drawn thin) */}
          <path
            d={view === 'temperature' ? pathD(conversionPath, 'conversion') : pathD(tempPath, 'temperature')}
            fill="none"
            stroke="#8B95A5"
            strokeOpacity="0.3"
            strokeWidth="1"
            strokeDasharray="3 2"
          />

          {/* Active curve */}
          <path
            d={view === 'temperature' ? pathD(tempPath, 'temperature') : pathD(conversionPath, 'conversion')}
            fill="none"
            stroke="#DAA745"
            strokeWidth="2"
            strokeLinejoin="round"
          />

          {/* Marker at 290°C soak */}
          {view === 'temperature' && (
            <circle cx={xForHour(3.5)} cy={yForTemp(290)} r="3.5" fill="#DAA745" />
          )}
          {view === 'conversion' && (
            <circle cx={xForHour(4.5)} cy={190 - (96 / 100) * 160} r="3.5" fill="#DAA745" />
          )}
        </svg>

        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="p-3 rounded bg-[#3A4250]/20 border border-[#3A4250]/40">
            <div className="text-[10px] uppercase tracking-wider text-[#8B95A5] font-semibold mb-1">
              Ramp
            </div>
            <div className="text-[#F2F0ED]">~2.5 h, 20°C → 290°C</div>
          </div>
          <div className="p-3 rounded bg-[#DAA745]/10 border border-[#DAA745]/30">
            <div className="text-[10px] uppercase tracking-wider text-[#DAA745] font-semibold mb-1">
              Hold (EN 14179-1)
            </div>
            <div className="text-[#F2F0ED]">2 h minimum, 290±10°C core</div>
          </div>
          <div className="p-3 rounded bg-[#3A4250]/20 border border-[#3A4250]/40">
            <div className="text-[10px] uppercase tracking-wider text-[#8B95A5] font-semibold mb-1">
              Cool
            </div>
            <div className="text-[#F2F0ED]">~3.5 h controlled to ambient</div>
          </div>
        </div>

        <p className="text-[11px] text-[#8B95A5]/70 mt-4 leading-relaxed">
          Toggle to <em>α→β conversion</em> to see the kinetics: at 290°C in the glass core, 95%+ of critical-size NiS inclusions complete their phase transition during the 2-hour hold. Any panel containing an unstable inclusion fractures inside the oven and never ships.
        </p>
      </div>
    </div>
  );
}
