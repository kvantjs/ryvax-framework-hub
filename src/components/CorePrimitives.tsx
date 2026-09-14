import React from 'react';
import { 
  Zap, 
  Cpu, 
  Globe, 
  ShieldCheck, 
  Database, 
  Layers 
} from 'lucide-react';

export const CorePrimitives: React.FC<{ onOpenDocs: () => void }> = () => {
  const primitives = [
    {
      icon: Zap,
      title: 'Atomic signals',
      description: 'Zero-cost reactive primitives that update target DOM nodes directly with zero virtual DOM diffing and zero hydration waterfall.',
      code: 'signal(count => count + 1)'
    },
    {
      icon: Cpu,
      title: 'Zero-codegen RPC',
      description: 'Functions marked with "use server" compile into type-safe edge micro-endpoints with automatic input validation and zero schema generation.',
      code: 'action(async (data) => { "use server" })'
    },
    {
      icon: Globe,
      title: 'WinterCG compliance',
      description: 'Full compatibility across Cloudflare Workers, Fastly Compute, Deno, Bun, and Node.js without proprietary cloud lock-in.',
      code: 'target: "wintercg-isolate"'
    },
    {
      icon: ShieldCheck,
      title: 'Vault & Ed25519 tokens',
      description: 'Cryptographic session signing directly in isolated memory with sub-millisecond verification and zero database lookup.',
      code: 'verifyEd25519(token, pubKey)'
    },
    {
      icon: Database,
      title: 'Edge read-replicas',
      description: 'Distributed database connection pooling that keeps latency under 2ms across all 312 global edge Points of Presence.',
      code: 'db.readReplica.pool({ max: 20 })'
    },
    {
      icon: Layers,
      title: 'Zero-bundle layouts',
      description: 'Layout shells are pre-compiled into static HTTP stream headers. The client only downloads code for interactive islands.',
      code: 'export default layout({ shell: "static" })'
    }
  ];

  return (
    <section id="primitives" className="py-16 md:py-24 bg-[#0a0a0a]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        
        {/* Header Block */}
        <div className="max-w-3xl mb-14">
          <span className="text-[12px] font-mono tracking-[0.1em] text-[#898989] uppercase block mb-3">
            CORE PRIMITIVES
          </span>
          
          {/* Ultrathin Prisma Logo Container */}
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-[4px] bg-[#0d0d0d] border border-[#141414] mb-4 text-[11px] font-mono text-neutral-300">
            <img 
              src="/icons/prisma.svg" 
              alt="Prisma Logo" 
              className="w-3.5 h-3.5 object-contain"
              referrerPolicy="no-referrer"
            />
            <span className="tracking-tight">Database: Prisma Integration</span>
          </div>

          <h2 className="text-3xl sm:text-[36px] font-normal tracking-[-0.007em] leading-[1.2] text-[#fafafa]">
            From server to client, no manual steps
          </h2>
          <p className="mt-4 text-[#b4b4b4] text-[16px] font-normal leading-[1.5] tracking-[-0.007em]">
            Server actions, client signals, edge caches, and cryptographic auth run automatically. Your team never has to write API glue code.
          </p>
        </div>

        {/* 6-Card 3-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {primitives.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div 
                key={idx}
                className="rounded-[6px] bg-[#0a0a0a] border border-[#141414] p-6 flex flex-col justify-between transition-colors"
              >
                <div>
                  {/* Icon in monochrome #fafafa */}
                  <div className="w-8 h-8 flex items-center justify-center text-[#fafafa] mb-4">
                    <Icon className="w-6 h-6 stroke-[1.5]" />
                  </div>

                  {/* Heading */}
                  <h3 className="text-[18px] font-medium text-[#fafafa] tracking-[-0.007em] mb-2">
                    {item.title}
                  </h3>

                  {/* Body */}
                  <p className="text-[14px] text-[#b4b4b4] font-normal leading-[1.5] tracking-[-0.007em] mb-4">
                    {item.description}
                  </p>
                </div>

                {/* Dark code strip */}
                <div className="mt-2 rounded-[6px] bg-[#0a0a0a] border border-[#141414] p-3 text-[12px] font-mono text-[#898989] flex items-center justify-between">
                  <span className="truncate text-[#b4b4b4]">{item.code}</span>
                  <span className="w-1.5 h-1.5 rounded-[6px] bg-[#fafafa] ml-2 shrink-0" />
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
