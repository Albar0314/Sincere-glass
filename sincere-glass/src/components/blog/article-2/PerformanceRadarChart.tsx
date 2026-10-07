'use client';

import { useState } from 'react';

type Metric = 'thermal' | 'acoustic' | 'safety' | 'solar' | 'cost';

interface Product {
  name: string;
  color: string;
  values: Record<Metric, number>; // 0-100
}

const products: Product[] = [
  {
    name: 'Insulated Glass (IGU)',
    color: '#60A5FA',
    values: { thermal: 90, acoustic: 55, safety: 40, solar: 85, cost: 55 },
  },
  {
    name: 'Laminated Glass',
    color: '#FBBF24',
    values: { thermal: 25, acoustic: 85, safety: 95, solar: 40, cost: 65 },
  },
  {
    name: 'Laminated IGU (combined)',
    color: '#34D399',
    values: { thermal: 90, acoustic: 90, safety: 95, solar: 85, cost: 35 },
  },
];

const metrics: { key: Metric; label: string; hint: string }[] = [
  { key: 'thermal', label: 'Thermal (U-value)', hint: 'Lower U-value = better insulation. IGU dominates here.' },
  { key: 'acoustic', label: 'Acoustic (STC)', hint: 'PVB interlayer absorbs airborne sound.' },
  { key: 'safety', label: 'Safety (Impact)', hint: 'Resistance to breakage AND fragment retention.' },
  { key: 'solar', label: 'Solar Control (SHGC)', hint: 'With Low-E coating in IGU, controls solar heat gain.' },
  { key: 'cost', label: 'Cost Efficiency', hint: 'Higher score = better value per sqm (not absolute low price).' },
];

export default function PerformanceRadarChart() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [hoveredMetric, setHoveredMetric] = useState<Metric | null>(null);

  // Radar geometry
  const size = 320;
  const center = size / 2;
  const radius = 110;
  const angleStep = (2 * Math.PI) / metrics.length;

  function point(value: number, i: number): [number, number] {
    const angle = -Math.PI / 2 + i * angleStep;
    const r = (value / 100) * radius;
    return [center + r * Math.cos(angle), center + r * Math.sin(angle)];
  }

  function axisPoint(i: number): [number, number] {
    const angle = -Math.PI / 2 + i * angleStep;
    return [center + radius * Math.cos(angle), center + radius * Math.sin(angle)];
  }

  return (
    <div className="my-10 bg-[#3A4250]/10 border border-[#3A4250]/20 rounded-xl p-6 md:p-8">
      {/* Product selector */}
      <div className="flex flex-wrap gap-2 mb-6">
        {products.map((p, i) => (
          <button
            key={p.name}
            onClick={() => setActiveIdx(i)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all border ${
              activeIdx === i
                ? 'text-[#1C1F26]'
                : 'text-[#8B95A5] hover:text-[#F2F0ED] border-[#3A4250]/40'
            }`}
            style={activeIdx === i ? { backgroundColor: p.color, borderColor: p.color } : {}}
          >
            {p.name}
          </button>
        ))}
      </div>

      <div className="grid md:grid-cols-[1fr_auto] gap-6 items-center">
        {/* Radar SVG */}
        <div className="flex justify-center">
          <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
            {/* Grid rings */}
            {[0.25, 0.5, 0.75, 1].map((r) => (
              <polygon
                key={r}
                points={metrics
                  .map((_, i) => {
                    const [x, y] = point(r * 100, i);
                    return `${x},${y}`;
                  })
                  .join(' ')}
                fill="none"
                stroke="#3A4250"
                strokeWidth="0.5"
                opacity={0.5}
              />
            ))}

            {/* Axes */}
            {metrics.map((_, i) => {
              const [x, y] = axisPoint(i);
              return (
                <line
                  key={i}
                  x1={center}
                  y1={center}
                  x2={x}
                  y2={y}
                  stroke="#3A4250"
                  strokeWidth="0.5"
                  opacity={0.4}
                />
              );
            })}

            {/* Data polygon */}
            <polygon
              points={metrics
                .map((m, i) => {
                  const [x, y] = point(products[activeIdx].values[m.key], i);
                  return `${x},${y}`;
                })
                .join(' ')}
              fill={products[activeIdx].color}
              fillOpacity={0.2}
              stroke={products[activeIdx].color}
              strokeWidth={2}
              style={{ transition: 'all 0.4s' }}
            />

            {/* Data dots */}
            {metrics.map((m, i) => {
              const [x, y] = point(products[activeIdx].values[m.key], i);
              return (
                <circle
                  key={m.key}
                  cx={x}
                  cy={y}
                  r={hoveredMetric === m.key ? 6 : 4}
                  fill={products[activeIdx].color}
                  style={{ transition: 'all 0.2s' }}
                />
              );
            })}

            {/* Metric labels */}
            {metrics.map((m, i) => {
              const [x, y] = axisPoint(i);
              const labelOffset = 20;
              const dx = (x - center) * (1 + labelOffset / radius);
              const dy = (y - center) * (1 + labelOffset / radius);
              return (
                <text
                  key={m.key}
                  x={center + dx}
                  y={center + dy}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className="fill-[#8B95A5] text-[10px] font-medium cursor-pointer"
                  onMouseEnter={() => setHoveredMetric(m.key)}
                  onMouseLeave={() => setHoveredMetric(null)}
                  style={{ fill: hoveredMetric === m.key ? '#DAA745' : undefined }}
                >
                  {m.label}
                </text>
              );
            })}
          </svg>
        </div>

        {/* Score breakdown */}
        <div className="space-y-2 min-w-[200px]">
          {metrics.map((m) => {
            const value = products[activeIdx].values[m.key];
            const active = hoveredMetric === m.key;
            return (
              <div
                key={m.key}
                className={`p-2 rounded transition-colors ${
                  active ? 'bg-[#DAA745]/10' : ''
                }`}
                onMouseEnter={() => setHoveredMetric(m.key)}
                onMouseLeave={() => setHoveredMetric(null)}
              >
                <div className="flex justify-between text-xs mb-1">
                  <span className={active ? 'text-[#DAA745]' : 'text-[#8B95A5]'}>
                    {m.label}
                  </span>
                  <span className="text-[#F2F0ED] font-mono">{value}</span>
                </div>
                <div className="h-1 bg-[#3A4250]/40 rounded">
                  <div
                    className="h-full rounded transition-all duration-500"
                    style={{ width: `${value}%`, backgroundColor: products[activeIdx].color }}
                  />
                </div>
              </div>
            );
          })}
          {hoveredMetric && (
            <p className="text-xs text-[#8B95A5] italic mt-3 leading-relaxed">
              {metrics.find((m) => m.key === hoveredMetric)?.hint}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
