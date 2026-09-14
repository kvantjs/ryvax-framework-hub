import React from 'react';
import { 
  ShieldCheck, 
  KeyRound, 
  Globe2, 
  Cpu 
} from 'lucide-react';

export const SecurityStandards: React.FC = () => {
  const securityItems = [
    {
      icon: Globe2,
      label: 'WinterCG certified',
      detail: 'Standard Web Platform APIs across all isolate providers with no vendor extensions.'
    },
    {
      icon: KeyRound,
      label: 'Ed25519 signed tokens',
      detail: 'Zero-latency memory signature validation directly in V8 isolate closures.'
    },
    {
      icon: ShieldCheck,
      label: 'Hermetic sandboxing',
      detail: 'Complete tenant isolation with zero cross-context memory leaks.'
    },
    {
      icon: Cpu,
      label: 'Deterministic memory limits',
      detail: 'Enforces strict heap bounds per request to prevent runaway isolate costs.'
    }
  ];

  return (
    <section id="security" className="py-16 md:py-24 bg-[#0a0a0a]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        
        {/* Left Headline & Description */}
        <div className="max-w-3xl mb-14">
          <span className="text-[12px] font-mono tracking-[0.1em] text-[#898989] uppercase block mb-3">
            SECURITY & ISOLATION
          </span>
          <h2 className="text-3xl sm:text-[36px] font-normal tracking-[-0.007em] leading-[1.2] text-[#fafafa]">
            Enterprise-grade security, by default
          </h2>
          <p className="mt-4 text-[#b4b4b4] text-[16px] font-normal leading-[1.5] tracking-[-0.007em]">
            As a full-stack framework running across hundreds of edge locations, Ryvax is built from the ground up for strict zero-trust environments. Every isolate execution is sandboxed with hardware-backed encryption.
          </p>
        </div>

        {/* 4 Clean Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {securityItems.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div 
                key={idx} 
                className="rounded-[6px] bg-[#0a0a0a] border border-[#141414] p-6 flex flex-col justify-between transition-colors"
              >
                <div>
                  <div className="w-8 h-8 flex items-center justify-center text-[#fafafa] mb-4">
                    <Icon className="w-6 h-6 stroke-[1.5]" />
                  </div>
                  <h3 className="text-[16px] font-medium text-[#fafafa] tracking-[-0.007em] mb-2">
                    {item.label}
                  </h3>
                  <p className="text-[14px] text-[#b4b4b4] font-normal leading-[1.5] tracking-[-0.007em]">
                    {item.detail}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
