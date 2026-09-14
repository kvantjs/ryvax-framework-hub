import React from 'react';
import { 
  Zap, 
  Terminal, 
  Globe2 
} from 'lucide-react';

export const WhyRyvax: React.FC<{ onOpenDocs: () => void }> = () => {
  return (
    <section id="why-ryvax" className="py-16 md:py-24 bg-[#0a0a0a]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="mb-14">
          <span className="text-[12px] font-mono tracking-[0.1em] text-[#898989] uppercase block mb-3">
            ARCHITECTURAL ADVANTAGE
          </span>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            <div className="lg:col-span-7">
              <h2 className="text-3xl sm:text-[36px] font-normal tracking-[-0.007em] leading-[1.2] text-[#fafafa] font-serif italic">
                Grow your scale, not your compute overhead
              </h2>
            </div>
            <div className="lg:col-span-5">
              <p className="text-[#b4b4b4] text-[16px] font-normal leading-[1.5] tracking-[-0.007em]">
                Between 10k and 100M requests, standard monolithic SSR frameworks double your cloud compute bill and latency. Ryvax compiles into fine-grained edge isolates with zero hydration debt.
              </p>
            </div>
          </div>
        </div>

        {/* 3 Feature Cards in Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card 1 */}
          <div className="bg-[#0a0a0a] rounded-[6px] border border-[#141414] p-6 flex flex-col justify-between transition-colors">
            <div>
              <div className="mb-4 text-[#fafafa]">
                <Zap className="w-6 h-6 stroke-[1.5]" />
              </div>

              <h3 className="text-[18px] font-medium text-[#fafafa] tracking-[-0.007em] mb-2">
                One framework for client and edge
              </h3>

              <p className="text-[14px] text-[#b4b4b4] font-normal leading-[1.5] tracking-[-0.007em] mb-6">
                Reactive client signals, database queries, and server actions compile from one cohesive file. The compiler handles boundary separation automatically.
              </p>
            </div>

            {/* Dark illustration area */}
            <div className="h-44 rounded-[6px] bg-[#0a0a0a] border border-[#141414] p-4 flex flex-col justify-between overflow-hidden">
              <div className="flex items-center justify-between text-[11px] font-mono text-[#898989]">
                <span>isomorphic-scope.ts</span>
                <span className="text-[#fafafa]">● COMPILED</span>
              </div>

              {/* Technical schematic wireframe */}
              <div className="space-y-2 py-1">
                <div className="flex items-center justify-between p-2 rounded-[6px] bg-[#0a0a0a] border border-[#141414] text-[12px] font-mono text-[#fafafa]">
                  <span className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-[6px] bg-[#fafafa]" />
                    client.signal()
                  </span>
                  <span className="text-[#898989] text-[11px]">0.0 kB VDOM</span>
                </div>
                <div className="flex items-center justify-between p-2 rounded-[6px] bg-[#0a0a0a] border border-[#141414] text-[12px] font-mono text-[#fafafa]">
                  <span className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-[6px] bg-[#525252]" />
                    edge.action()
                  </span>
                  <span className="text-[#898989] text-[11px]">0.8ms Isolate</span>
                </div>
              </div>

              <div className="text-[11px] text-[#898989] font-mono flex items-center justify-between">
                <span>AST Stripping: Active</span>
                <span className="text-[#fafafa]">100% Sound</span>
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-[#0a0a0a] rounded-[6px] border border-[#141414] p-6 flex flex-col justify-between transition-colors">
            <div>
              <div className="mb-4 text-[#fafafa]">
                <Terminal className="w-6 h-6 stroke-[1.5]" />
              </div>

              <h3 className="text-[18px] font-medium text-[#fafafa] tracking-[-0.007em] mb-2">
                Works where your team already does
              </h3>

              <p className="text-[14px] text-[#b4b4b4] font-normal leading-[1.5] tracking-[-0.007em] mb-6">
                Access everything directly through standard TypeScript, standard JSX, and your favorite editor. Compatible with Vite, Git, and modern CI workflows.
              </p>
            </div>

            {/* Dark illustration area */}
            <div className="h-44 rounded-[6px] bg-[#0a0a0a] border border-[#141414] p-4 flex flex-col justify-between overflow-hidden">
              <div className="flex items-center justify-between text-[11px] font-mono text-[#898989]">
                <span>CI/CD PIPELINE</span>
                <span className="text-[#fafafa]">PASSING</span>
              </div>

              {/* Wireframe pipeline line-art */}
              <div className="space-y-1.5 font-mono text-[11px]">
                <div className="flex items-center gap-2 text-[#fafafa]">
                  <span className="w-1.5 h-1.5 rounded-[6px] bg-[#fafafa]" />
                  <span>Typecheck: 100% sound</span>
                </div>
                <div className="flex items-center gap-2 text-[#fafafa]">
                  <span className="w-1.5 h-1.5 rounded-[6px] bg-[#fafafa]" />
                  <span>AST Split: 18 isolates</span>
                </div>
                <div className="flex items-center gap-2 text-[#898989]">
                  <span className="w-1.5 h-1.5 rounded-[6px] bg-[#525252]" />
                  <span>Deploy: 312 PoPs mesh</span>
                </div>
              </div>

              <div className="text-[11px] text-[#898989] font-mono flex items-center justify-between">
                <span>Output: WinterCG Bytecode</span>
                <span className="text-[#fafafa]">2.1 kB</span>
              </div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-[#0a0a0a] rounded-[6px] border border-[#141414] p-6 flex flex-col justify-between transition-colors">
            <div>
              <div className="mb-4 text-[#fafafa]">
                <Globe2 className="w-6 h-6 stroke-[1.5]" />
              </div>

              <h3 className="text-[18px] font-medium text-[#fafafa] tracking-[-0.007em] mb-2">
                Regional compliance, no workarounds
              </h3>

              <p className="text-[14px] text-[#b4b4b4] font-normal leading-[1.5] tracking-[-0.007em] mb-6">
                Regional data residency rules, contract schemas, and attendance policies run on edge nodes automatically. No manual VPC fixes, no annual corrections.
              </p>
            </div>

            {/* Dark illustration area */}
            <div className="h-44 rounded-[6px] bg-[#0a0a0a] border border-[#141414] p-4 flex flex-col justify-between overflow-hidden">
              <div className="flex items-center justify-between text-[11px] font-mono text-[#898989]">
                <span>GLOBAL POP NODES</span>
                <span className="text-[#fafafa]">WinterCG</span>
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between p-1.5 rounded-[6px] bg-[#0a0a0a] border border-[#141414] text-[11px] font-mono text-[#fafafa]">
                  <span>US-East (N. Virginia)</span>
                  <span className="text-[#fafafa]">0.8ms</span>
                </div>
                <div className="flex items-center justify-between p-1.5 rounded-[6px] bg-[#0a0a0a] border border-[#141414] text-[11px] font-mono text-[#fafafa]">
                  <span>EU-West (Frankfurt)</span>
                  <span className="text-[#fafafa]">1.1ms</span>
                </div>
                <div className="flex items-center justify-between p-1.5 rounded-[6px] bg-[#0a0a0a] border border-[#141414] text-[11px] font-mono text-[#fafafa]">
                  <span>AP-East (Tokyo)</span>
                  <span className="text-[#fafafa]">1.3ms</span>
                </div>
              </div>

              <div className="text-[11px] text-[#898989] font-mono flex items-center justify-between">
                <span>Data Isolation</span>
                <span className="text-[#fafafa]">Hardware Encrypted</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
