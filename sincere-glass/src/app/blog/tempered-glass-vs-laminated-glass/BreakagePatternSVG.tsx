'use client';
import { useState } from 'react';

export default function BreakagePatternSVG() {
  const [active, setActive] = useState<'tempered' | 'laminated'>('tempered');

  return (
    <div className="my-12">
      <div className="flex gap-2 mb-6 justify-center">
        <button
          onClick={() => setActive('tempered')}
          className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
            active === 'tempered'
              ? 'bg-[#1C1F26] text-white'
              : 'bg-[#F2F0ED] text-[#3A4250] hover:bg-[#e8e5e0]'
          }`}
        >
          Tempered Glass
        </button>
        <button
          onClick={() => setActive('laminated')}
          className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
            active === 'laminated'
              ? 'bg-[#1C1F26] text-white'
              : 'bg-[#F2F0ED] text-[#3A4250] hover:bg-[#e8e5e0]'
          }`}
        >
          Laminated Glass
        </button>
      </div>

      <div className="relative bg-[#FAFAF8] rounded-2xl p-8 border border-[#F2F0ED] overflow-hidden">
        {active === 'tempered' ? (
          <div className="flex flex-col items-center gap-6" key="tempered" style={{ animation: 'fadeIn 0.4s ease-out' }}>
            <svg viewBox="0 0 400 280" className="w-full max-w-md" xmlns="http://www.w3.org/2000/svg">
              <rect x="50" y="20" width="300" height="200" rx="4" fill="none" stroke="#8B95A5" strokeWidth="2" strokeDasharray="6 3" opacity="0.4" />
              {[
                [80,50],[130,40],[180,55],[230,35],[280,60],[310,45],
                [95,90],[145,85],[195,100],[245,80],[290,95],
                [70,130],[120,140],[170,125],[220,145],[270,130],[320,140],
                [100,170],[150,180],[200,165],[250,185],[300,170],
              ].map(([x, y], i) => (
                <rect
                  key={i}
                  x={x} y={y}
                  width={10} height={10}
                  rx="1.5"
                  fill={`rgba(58,66,80,${0.15 + (i % 5) * 0.06})`}
                  stroke="#8B95A5"
                  strokeWidth="0.5"
                  transform={`rotate(${(i * 17) % 45} ${x+5} ${y+5})`}
                />
              ))}
              <circle cx="200" cy="110" r="12" fill="none" stroke="#DAA745" strokeWidth="2.5" opacity="0.8" />
              <circle cx="200" cy="110" r="4" fill="#DAA745" opacity="0.6" />
              <text x="200" y="258" textAnchor="middle" fill="#3A4250" fontSize="13" fontFamily="Inter,sans-serif" fontWeight="500">
                Shatters into small, blunt granules — safer on impact
              </text>
            </svg>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-6" key="laminated" style={{ animation: 'fadeIn 0.4s ease-out' }}>
            <svg viewBox="0 0 400 280" className="w-full max-w-md" xmlns="http://www.w3.org/2000/svg">
              <rect x="50" y="20" width="300" height="200" rx="4" fill="rgba(58,66,80,0.06)" stroke="#8B95A5" strokeWidth="2" />
              <rect x="50" y="115" width="300" height="10" fill="rgba(218,167,69,0.15)" />
              <circle cx="200" cy="110" r="12" fill="none" stroke="#DAA745" strokeWidth="2.5" opacity="0.8" />
              <circle cx="200" cy="110" r="4" fill="#DAA745" opacity="0.6" />
              {[0,30,60,90,120,150,180,210,240,270,300,330].map((angle, i) => {
                const rad = (angle * Math.PI) / 180;
                const len = 60 + (i % 3) * 30;
                const x2 = 200 + Math.cos(rad) * len;
                const y2 = 110 + Math.sin(rad) * len;
                return (
                  <line key={i} x1="200" y1="110"
                    x2={Math.min(Math.max(x2, 55), 345)}
                    y2={Math.min(Math.max(y2, 25), 215)}
                    stroke="#3A4250" strokeWidth="1" opacity="0.4"
                  />
                );
              })}
              {[30,55,85].map((r, i) => (
                <circle key={i} cx="200" cy="110" r={r}
                  fill="none" stroke="#3A4250" strokeWidth="0.7" opacity="0.25"
                />
              ))}
              <text x="355" y="124" textAnchor="end" fill="#DAA745" fontSize="10" fontFamily="Inter,sans-serif" fontWeight="600">PVB</text>
              <text x="200" y="258" textAnchor="middle" fill="#3A4250" fontSize="13" fontFamily="Inter,sans-serif" fontWeight="500">
                Cracks but holds together — interlayer prevents fallout
              </text>
            </svg>
          </div>
        )}
      </div>
      <style>{`@keyframes fadeIn{from{opacity:0}to{opacity:1}}`}</style>
    </div>
  );
}
