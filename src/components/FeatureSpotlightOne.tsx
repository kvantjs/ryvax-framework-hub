import React, { useState } from 'react';
import { 
  ChevronRight, 
  FileCode2, 
  Cpu, 
  Zap,
  Star,
  Check
} from 'lucide-react';

export const FeatureSpotlightOne: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      title: 'Compile isolate AST shell',
      detail: 'Statically strips non-client modules in 1.4ms',
      icon: FileCode2
    },
    {
      title: 'Extract "use server" RPC endpoints',
      detail: 'Generates zero-overhead WinterCG micro-lambdas',
      icon: Cpu
    },
    {
      title: 'Warm edge connection pool',
      detail: 'Establishes persistent Read-Replica sockets',
      icon: Zap
    },
    {
      title: 'Global edge deployment',
      detail: 'Broadcasts bytecode to 312 PoPs simultaneously',
      icon: Star
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-[#0a0a0a]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Headline & Technical Specs */}
          <div className="lg:col-span-5 space-y-6">
            <span className="text-[12px] font-mono tracking-[0.1em] text-[#898989] uppercase block">
              EDGE COMPILER
            </span>

            <h2 className="text-3xl sm:text-[36px] font-normal tracking-[-0.007em] leading-[1.2] text-[#fafafa]">
              Set it up once.<br />
              <span className="text-[#898989]">Run forever.</span>
            </h2>

            <p className="text-[#b4b4b4] text-[16px] font-normal leading-[1.5] tracking-[-0.007em]">
              Automate full-stack lifecycle tasks like routing, streaming, and RPC dispatching with zero-overhead compiler directives.
            </p>

            <div className="pt-2 space-y-5">
              
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-[6px] bg-[#0a0a0a] border border-[#141414] flex items-center justify-center text-[#fafafa] shrink-0 mt-0.5">
                  <FileCode2 className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-[16px] font-medium text-[#fafafa] tracking-[-0.007em]">
                    Full-stack lifecycle
                  </h3>
                  <p className="text-[14px] text-[#b4b4b4] mt-1 leading-[1.5] tracking-[-0.007em]">
                    Client hydration bundles are stripped to 2.1 kB total. Every step of the runtime pipeline is handled at build time.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-[6px] bg-[#0a0a0a] border border-[#141414] flex items-center justify-center text-[#fafafa] shrink-0 mt-0.5">
                  <Cpu className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-[16px] font-medium text-[#fafafa] tracking-[-0.007em]">
                    Edge RPC handoff
                  </h3>
                  <p className="text-[14px] text-[#b4b4b4] mt-1 leading-[1.5] tracking-[-0.007em]">
                    Server functions compile directly into edge micro-lambdas with end-to-end type safety and zero serialization boilerplate.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-[6px] bg-[#0a0a0a] border border-[#141414] flex items-center justify-center text-[#fafafa] shrink-0 mt-0.5">
                  <Zap className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-[16px] font-medium text-[#fafafa] tracking-[-0.007em]">
                    Zero-overhead streaming
                  </h3>
                  <p className="text-[14px] text-[#b4b4b4] mt-1 leading-[1.5] tracking-[-0.007em]">
                    Push data streams from WinterCG isolates straight into browser micro-tasks without buffering or DOM reconciliation delays.
                  </p>
                </div>
              </div>

            </div>

          </div>

          {/* Right Column: Visual Component Showcase */}
          <div className="lg:col-span-7">
            <div className="bg-[#0a0a0a] rounded-[6px] border border-[#141414] p-6 space-y-4">
              
              {/* Terminal command execution bar */}
              <div className="flex items-center justify-between pb-3 border-b border-[#141414]">
                <div className="flex items-center gap-2 text-[12px] font-mono text-[#898989]">
                  <span className="w-2 h-2 rounded-[6px] bg-[#fafafa]" />
                  <span>COMPILATION MESH</span>
                </div>
                <span className="text-[12px] font-mono text-[#fafafa]">
                  WinterCG Isolate v2.4
                </span>
              </div>

              {/* Steps list */}
              <div className="space-y-2">
                {steps.map((step, idx) => {
                  const Icon = step.icon;
                  const isCurrent = activeStep === idx;
                  return (
                    <div
                      key={idx}
                      onClick={() => setActiveStep(idx)}
                      className={`p-3.5 rounded-[6px] border border-[#141414] transition-colors cursor-pointer flex items-center justify-between bg-[#0a0a0a]`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-[6px] bg-[#0a0a0a] border border-[#141414] flex items-center justify-center text-[#fafafa]">
                          <Icon className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-[14px] font-medium text-[#fafafa] tracking-[-0.007em]">
                            {step.title}
                          </div>
                          <div className="text-[12px] font-mono text-[#898989]">
                            {step.detail}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        {isCurrent ? (
                          <span className="text-[11px] font-mono text-[#fafafa] px-2 py-0.5 rounded-[6px] bg-[#0a0a0a] border border-[#141414]">
                            Active
                          </span>
                        ) : (
                          <ChevronRight className="w-4 h-4 text-[#525252]" />
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Bottom status bar */}
              <div className="pt-3 border-t border-[#141414] flex items-center justify-between text-[12px] font-mono text-[#898989]">
                <div className="flex items-center gap-2 text-[#fafafa]">
                  <Check className="w-4 h-4 text-[#fafafa]" />
                  <span>All 312 edge PoPs synchronized</span>
                </div>
                <span className="text-[#fafafa]">0.82ms cold-start</span>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
