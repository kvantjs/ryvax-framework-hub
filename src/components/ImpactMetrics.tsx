import React from 'react';
import { Info } from 'lucide-react';
import { IMPACT_METRICS } from '../data/frameworkData';

export const ImpactMetrics: React.FC = () => {
  return (
    <section className="py-16 md:py-24 bg-[#0a0a0a]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        
        {/* Header Block */}
        <div className="max-w-3xl mb-14">
          <span className="text-[12px] font-mono tracking-[0.1em] text-[#898989] uppercase block mb-3">
            BENCHMARK RESULTS
          </span>
          <h2 className="text-3xl sm:text-[36px] font-normal tracking-[-0.007em] leading-[1.2] text-[#fafafa]">
            The math behind the framework
          </h2>
        </div>

        {/* 4 Full-Width Horizontal Metric Rows */}
        <div className="divide-y divide-[#141414] border-y border-[#141414]">
          {IMPACT_METRICS.map((metric) => (
            <div
              key={metric.id}
              className="py-6 sm:py-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 group"
            >
              <div className="flex items-center gap-2 max-w-xl">
                <span className="text-[16px] font-normal text-[#b4b4b4] tracking-[-0.007em]">
                  {metric.label}
                </span>
                <div className="relative group/tooltip">
                  <Info className="w-3.5 h-3.5 text-[#898989] hover:text-[#fafafa] cursor-help shrink-0" />
                  <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 hidden group-hover/tooltip:block w-64 p-2.5 bg-[#0a0a0a] border border-[#141414] text-[#fafafa] text-[11px] rounded-[6px] z-20 pointer-events-none">
                    {metric.info}
                  </div>
                </div>
              </div>

              <div className="text-3xl sm:text-5xl font-normal text-[#fafafa] tracking-[-0.007em] text-left sm:text-right">
                {metric.value}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
