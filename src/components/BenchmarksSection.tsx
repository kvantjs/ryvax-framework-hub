import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  BarChart3, 
  ArrowUpRight, 
  HelpCircle, 
  Zap, 
  Check, 
  ExternalLink,
  ShieldCheck,
  TrendingUp,
  Terminal,
  Activity,
  Copy
} from 'lucide-react';
import { BENCHMARKS, BENCHMARK_METRICS } from '../data/frameworkData';
import { BenchmarkMetric } from '../types';

export const BenchmarksSection: React.FC = () => {
  const [activeMetric, setActiveMetric] = useState<BenchmarkMetric>('coldStart');
  const [percentile, setPercentile] = useState<'p50' | 'p95' | 'p99'>('p50');
  const [copiedHarness, setCopiedHarness] = useState(false);

  const currentMetricMeta = BENCHMARK_METRICS[activeMetric];

  const getMetricValue = (baseVal: number) => {
    if (activeMetric === 'bundleSize' || activeMetric === 'throughput') return baseVal;
    if (percentile === 'p95') return +(baseVal * 1.35).toFixed(1);
    if (percentile === 'p99') return +(baseVal * 1.82).toFixed(1);
    return baseVal;
  };

  const calculatedValues = BENCHMARKS.map((b) => ({
    ...b,
    displayValue: getMetricValue(b[activeMetric])
  }));

  const maxVal = Math.max(...calculatedValues.map((b) => b.displayValue));

  const copyHarnessCommand = () => {
    navigator.clipboard.writeText('npx @ryvax/bench --suite=edge-throughput --iterations=100000');
    setCopiedHarness(true);
    setTimeout(() => setCopiedHarness(false), 2000);
  };

  return (
    <section id="benchmarks" className="py-24 bg-[#0a0a0a] border-b border-[#141414]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-[6px] bg-[#0a0a0a] border border-[#141414] text-xs font-mono text-neutral-300 mb-3">
            <BarChart3 className="w-3.5 h-3.5" />
            <span>Empirical Systems Benchmarks</span>
          </div>
          <h2 id="benchmarks-title" className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-display">
            Measured Head-to-Head at the Edge.
          </h2>
          <p className="mt-3 text-neutral-400 text-sm sm:text-base font-normal leading-relaxed">
            Standardized benchmark suite executing 100,000 synthetic HTTP/3 requests across identical edge compute isolates with zero proprietary compiler caching.
          </p>
        </motion.div>

        {/* Metric Selector Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
          {(Object.keys(BENCHMARK_METRICS) as BenchmarkMetric[]).map((metricKey) => {
            const m = BENCHMARK_METRICS[metricKey];
            const isSelected = activeMetric === metricKey;
            return (
              <button
                key={metricKey}
                id={`benchmark-tab-${metricKey}`}
                onClick={() => setActiveMetric(metricKey)}
                className={`px-3.5 py-2 rounded-[6px] text-xs sm:text-sm font-mono transition-all ${
                  isSelected
                    ? 'bg-white text-black font-semibold'
                    : 'bg-[#0a0a0a] text-neutral-400 hover:text-white hover:bg-neutral-900 border border-[#141414]'
                }`}
              >
                <span>{m.title}</span>
                <span className="ml-1.5 opacity-70 text-xs font-mono">({m.unit})</span>
              </button>
            );
          })}
        </div>

        {/* Benchmark Results Display Container */}
        <motion.div 
          id="benchmark-results-card"
          className="max-w-4xl mx-auto p-6 sm:p-8 rounded-[6px] bg-[#0a0a0a] border border-[#141414] shadow-2xl"
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {/* Active Metric Description & Percentile Toggle */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-6 border-b border-[#141414] gap-4">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-bold text-white font-display">
                  {currentMetricMeta.title}
                </h3>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded-[6px] bg-[#0a0a0a] border border-[#141414] text-neutral-400">
                  {currentMetricMeta.better === 'lower' ? 'Lower is better ▼' : 'Higher is better ▲'}
                </span>
              </div>
              <p className="text-xs text-neutral-400 mt-1">
                {currentMetricMeta.description}
              </p>
            </div>

            <div className="flex items-center gap-3">
              {/* Percentile Selector */}
              {(activeMetric === 'coldStart' || activeMetric === 'ttfb') && (
                <div className="flex items-center bg-[#0a0a0a] p-0.5 rounded-[6px] border border-[#141414] text-xs font-mono">
                  {(['p50', 'p95', 'p99'] as const).map((p) => (
                    <button
                      key={p}
                      onClick={() => setPercentile(p)}
                      className={`px-2 py-0.5 rounded-[6px] ${percentile === p ? 'bg-neutral-800 text-white font-bold' : 'text-neutral-500 hover:text-neutral-300'}`}
                    >
                      {p.toUpperCase()}
                    </button>
                  ))}
                </div>
              )}

              <div className="text-right">
                <span className="text-[11px] font-mono text-neutral-400 block">
                  Advantage
                </span>
                <span className="text-xs sm:text-sm font-bold text-white font-mono">
                  {activeMetric === 'coldStart' && '4.2x Faster'}
                  {activeMetric === 'ttfb' && '4.9x Faster'}
                  {activeMetric === 'bundleSize' && '-97.5% Shipped'}
                  {activeMetric === 'throughput' && '+2.5x Concurrency'}
                </span>
              </div>
            </div>
          </div>

          {/* Graphical Comparison Bars (Monochromatic) */}
          <div className="space-y-4">
            {calculatedValues.map((item) => {
              const val = item.displayValue;
              const percent = currentMetricMeta.better === 'lower'
                ? ((maxVal - val) / maxVal) * 80 + 20
                : (val / maxVal) * 100;

              return (
                <div key={item.framework} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className={`font-semibold flex items-center gap-2 ${
                      item.isRyvax ? 'text-white' : 'text-neutral-400'
                    }`}>
                      {item.isRyvax && (
                        <span className="w-1.5 h-1.5 rounded-[6px] bg-white animate-pulse" />
                      )}
                      <span>{item.framework}</span>
                      {item.isRyvax && (
                        <span className="text-[10px] px-1.5 py-0.2 rounded-[6px] bg-neutral-900 text-white border border-[#141414]">
                          Tested Core
                        </span>
                      )}
                    </span>
                    <span className={`font-bold ${
                      item.isRyvax ? 'text-white' : 'text-neutral-400'
                    }`}>
                      {val} {currentMetricMeta.unit}
                    </span>
                  </div>

                  <div className="h-3 rounded-[6px] bg-[#0a0a0a] overflow-hidden p-[1px] border border-[#141414]">
                    <div 
                      className={`h-full rounded-[6px] transition-all duration-700 ease-out ${
                        item.isRyvax 
                          ? 'bg-white shadow-sm' 
                          : 'bg-neutral-800'
                      }`}
                      style={{ width: `${Math.max(percent, 8)}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Test Harness Reproducibility Footer */}
          <div className="mt-8 pt-5 border-t border-[#141414] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-neutral-400 font-mono">
            <div className="flex items-center gap-2 text-[11px]">
              <ShieldCheck className="w-3.5 h-3.5 text-white" />
              <span>Hardware: AMD EPYC 7763 • 128MB Memory Isolates • k6 HTTP/3</span>
            </div>

            <button
              onClick={copyHarnessCommand}
              className="flex items-center gap-1.5 px-3 py-1 rounded-[6px] bg-[#0a0a0a] border border-[#141414] hover:bg-neutral-900 text-[11px] text-neutral-300 hover:text-white transition-colors"
              title="Copy reproducible benchmark CLI command"
            >
              {copiedHarness ? (
                <>
                  <Check className="w-3 h-3 text-white" />
                  <span className="text-white">Copied harness command</span>
                </>
              ) : (
                <>
                  <Terminal className="w-3 h-3 text-neutral-400" />
                  <span>ryvax bench --reproduce</span>
                </>
              )}
            </button>
          </div>

        </motion.div>

      </div>
    </section>
  );
};
