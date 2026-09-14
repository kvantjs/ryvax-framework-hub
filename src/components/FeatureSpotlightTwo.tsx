import React from 'react';
import { motion } from 'motion/react';
import { 
  RefreshCw, 
  Database, 
  Sparkle, 
  CheckCircle2, 
  Activity
} from 'lucide-react';

export const FeatureSpotlightTwo: React.FC = () => {
  return (
    <section id="performance" className="py-16 md:py-24 bg-[#0a0a0a]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Visual Telemetry Card */}
          <div className="lg:col-span-7 order-2 lg:order-1">
            <div className="bg-[#0a0a0a] rounded-[6px] border border-[#141414] p-6 space-y-4">
              
              {/* Header */}
              <div className="flex items-center justify-between pb-3 border-b border-[#141414]">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-[6px] bg-[#0a0a0a] border border-[#141414] flex items-center justify-center text-[#fafafa]">
                    <Activity className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-[14px] font-medium text-[#fafafa] tracking-[-0.007em]">
                      Cluster Telemetry — Node IAD-04
                    </h4>
                    <span className="text-[12px] font-mono text-[#898989]">
                      WinterCG Isolate • 312 PoPs Mesh
                    </span>
                  </div>
                </div>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded-[6px] bg-[#0a0a0a] text-[#fafafa] border border-[#141414]">
                  REAL-TIME
                </span>
              </div>

              {/* Wireframe Metric Schematic */}
              <div className="rounded-[6px] bg-[#0a0a0a] border border-[#141414] p-4 space-y-3">
                <div className="text-[11px] font-mono uppercase tracking-[0.1em] text-[#898989] flex items-center justify-between">
                  <span>COMPILER REASONING</span>
                  <span className="text-[#fafafa]">p99: 1.4ms</span>
                </div>
                <p className="text-[12px] font-mono text-[#b4b4b4] leading-[1.6]">
                  Reactivity tree optimized. Zero VDOM nodes retained in memory. Direct pointer updates eliminate garbage collection pauses. Cold start confirmed at 0.82ms across all regional isolates.
                </p>
                {/* SVG Latency Histogram Line Art with Animating Bouncing Ball & Glowing Trail */}
                <div className="pt-2 relative overflow-hidden">
                  <svg viewBox="0 0 300 45" className="w-full h-10 text-[#262626]" fill="none" strokeWidth="1.5" style={{ overflow: 'visible' }}>
                    {/* Base Background Path */}
                    <path d="M 0 38 Q 40 37 70 30 T 130 12 T 160 32 T 220 37 T 300 38" stroke="rgba(255, 255, 255, 0.08)" strokeWidth="1.5" />
                    
                    {/* Glowing Active Trail Following the Ball */}
                    <motion.path 
                      d="M 0 38 Q 40 37 70 30 T 130 12 T 160 32 T 220 37 T 300 38" 
                      stroke="rgba(255, 255, 255, 0.4)" 
                      strokeWidth="1.5" 
                      animate={{
                        strokeDasharray: ["0 350", "100 350", "0 350"],
                        strokeDashoffset: [0, -300, -350]
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "linear"
                      }}
                    />

                    {/* Outer Glowing Halo of the Bouncing Ball */}
                    <motion.circle
                      r="6"
                      fill="#fafafa"
                      opacity="0.15"
                      stroke="none"
                      animate={{
                        cx: [0, 40, 70, 100, 130, 145, 160, 190, 220, 260, 300],
                        cy: [38, 25, 30, 18, 12, 22, 32, 26, 37, 32, 38]
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "linear"
                      }}
                    />

                    {/* Core Solid Bouncing Ball */}
                    <motion.circle
                      r="2.5"
                      fill="#fafafa"
                      stroke="none"
                      animate={{
                        cx: [0, 40, 70, 100, 130, 145, 160, 190, 220, 260, 300],
                        cy: [38, 25, 30, 18, 12, 22, 32, 26, 37, 32, 38],
                        scale: [1, 1.25, 1, 1.3, 1, 1.15, 1, 1.2, 1, 1.1, 1]
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "linear"
                      }}
                    />
                  </svg>
                </div>
              </div>

              {/* Sources Row */}
              <div className="flex items-center gap-2 pt-1">
                <span className="text-[12px] font-mono text-[#898989]">Telemetry:</span>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-[6px] bg-[#0a0a0a] border border-[#141414] text-[11px] font-mono text-[#fafafa]">
                    V8 Isolate Heap
                  </span>
                  <span className="px-2.5 py-1 rounded-[6px] bg-[#0a0a0a] border border-[#141414] text-[11px] font-mono text-[#fafafa]">
                    OpenTelemetry
                  </span>
                  <span className="px-2.5 py-1 rounded-[6px] bg-[#0a0a0a] border border-[#141414] text-[11px] font-mono text-[#fafafa]">
                    0.0 kB VDOM
                  </span>
                </div>
              </div>

              {/* Status Bar */}
              <div className="pt-3 border-t border-[#141414] flex items-center justify-between text-[12px]">
                <div className="flex items-center gap-2 text-[#fafafa]">
                  <CheckCircle2 className="w-4 h-4 text-[#fafafa]" />
                  <span>Ryvax compiler certified</span>
                </div>
                <span className="text-[12px] font-mono text-[#898989]">Latency delta: -94%</span>
              </div>

            </div>
          </div>

          {/* Right Column: Text & Bullet Points */}
          <div className="lg:col-span-5 space-y-6 order-1 lg:order-2">
            <span className="text-[12px] font-mono tracking-[0.1em] text-[#898989] uppercase block">
              CONTINUOUS BENCHMARKS
            </span>

            <h2 className="text-3xl sm:text-[36px] font-normal tracking-[-0.007em] leading-[1.2] text-[#fafafa] font-serif italic">
              Continuous performance,<br />
              <span className="text-[#898989]">not annual surprises.</span>
            </h2>

            <p className="text-[#b4b4b4] text-[16px] font-normal leading-[1.5] tracking-[-0.007em]">
              Performance telemetry and benchmarks grounded in real production isolates, not theoretical lab tests.
            </p>

            <div className="pt-2 space-y-5">
              
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-[6px] bg-[#0a0a0a] border border-[#141414] flex items-center justify-center text-[#fafafa] shrink-0 mt-0.5">
                  <RefreshCw className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-[16px] font-medium text-[#fafafa] tracking-[-0.007em]">
                    Automate structure and schedule
                  </h3>
                  <p className="text-[14px] text-[#b4b4b4] mt-1 leading-[1.5] tracking-[-0.007em]">
                    Module boundaries compile based on real route traffic. Hot paths are promoted to edge memory caches automatically.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-[6px] bg-[#0a0a0a] border border-[#141414] flex items-center justify-center text-[#fafafa] shrink-0 mt-0.5">
                  <Database className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-[16px] font-medium text-[#fafafa] tracking-[-0.007em]">
                    Data from any source
                  </h3>
                  <p className="text-[14px] text-[#b4b4b4] mt-1 leading-[1.5] tracking-[-0.007em]">
                    Streams data from your database, external APIs, and AI models into synchronous client signals with zero layout shift.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-[6px] bg-[#0a0a0a] border border-[#141414] flex items-center justify-center text-[#fafafa] shrink-0 mt-0.5">
                  <Sparkle className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-[16px] font-medium text-[#fafafa] tracking-[-0.007em]">
                    Agentic runtime review
                  </h3>
                  <p className="text-[14px] text-[#b4b4b4] mt-1 leading-[1.5] tracking-[-0.007em]">
                    Detects runtime latency regressions, flags unbounded closures, and surfaces optimizations before PRs merge.
                  </p>
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
