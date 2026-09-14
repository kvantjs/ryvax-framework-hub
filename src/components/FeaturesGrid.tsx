import React from 'react';
import { 
  Zap, 
  Cpu, 
  Globe, 
  Layers, 
  Flame, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight,
  Sparkle,
  Lock,
  Boxes,
  Activity
} from 'lucide-react';
import { FEATURES } from '../data/frameworkData';

export const FeaturesGrid: React.FC<{ onOpenDocs: () => void }> = ({ onOpenDocs }) => {
  const getIcon = (name: string) => {
    switch (name) {
      case 'Zap':
        return <Zap className="w-4 h-4 text-white" />;
      case 'Cpu':
        return <Cpu className="w-4 h-4 text-white" />;
      case 'Globe':
        return <Globe className="w-4 h-4 text-white" />;
      case 'Layers':
        return <Layers className="w-4 h-4 text-white" />;
      case 'Flame':
        return <Flame className="w-4 h-4 text-white" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-4 h-4 text-white" />;
      default:
        return <Zap className="w-4 h-4 text-white" />;
    }
  };

  return (
    <section id="features" className="py-24 bg-[#0a0a0a] border-b border-[#141414]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-[6px] bg-[#0a0a0a] border border-[#141414] text-xs font-mono text-neutral-300 mb-3">
            <Sparkle className="w-3.5 h-3.5" />
            <span>Systems Innovations</span>
          </div>
          <h2 id="features-title" className="text-3xl sm:text-5xl font-normal text-white tracking-tight font-serif italic">
            Built for Engineers Who Reject Compromise.
          </h2>
          <p className="mt-3 text-neutral-400 text-sm sm:text-base font-normal leading-relaxed">
            Every architectural decision in Ryvax was governed by one strict tenet: framework abstractions must never tax wire payloads or runtime CPU cycles.
          </p>
        </div>

        {/* Bento Grid Layout */}
        <div 
          id="features-grid-container"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {FEATURES.map((feat) => (
            <div
              key={feat.id}
              id={`feature-card-${feat.id}`}
              className="p-6 rounded-[6px] bg-[#0a0a0a] border border-[#141414] hover:border-neutral-700 transition-all flex flex-col justify-between group"
            >
              <div>
                {/* Card Header: Icon & Highlight Badge */}
                <div className="flex items-center justify-between mb-4">
                  <div className="w-9 h-9 rounded-[6px] bg-neutral-900 border border-[#141414] flex items-center justify-center text-white">
                    {getIcon(feat.iconName)}
                  </div>
                  <span className="text-[11px] font-mono font-medium px-2 py-0.5 rounded-[6px] bg-[#0a0a0a] border border-[#141414] text-neutral-300">
                    {feat.highlight}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white tracking-tight font-display">
                  {feat.title}
                </h3>
                <div className="text-xs font-mono text-neutral-400 mt-0.5 mb-2.5">
                  {feat.tagline}
                </div>
                <p className="text-xs text-neutral-400 leading-relaxed font-normal">
                  {feat.description}
                </p>
              </div>

              {/* Capability Bullets */}
              <div className="mt-6 pt-4 border-t border-[#141414] space-y-1.5">
                {feat.capabilities.map((cap, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-neutral-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-white shrink-0" />
                    <span className="text-[11px]">{cap}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Documentation Callout Bar */}
        <div className="mt-12 p-5 rounded-[6px] bg-[#0a0a0a] border border-[#141414] flex flex-col sm:flex-row items-center justify-between gap-4 max-w-4xl mx-auto shadow-xl">
          <div className="flex items-center gap-3 text-center sm:text-left">
            <div className="w-9 h-9 rounded-[6px] bg-neutral-900 border border-[#141414] flex items-center justify-center text-white shrink-0">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-semibold text-white font-display">
                Need deeper compiler AST benchmarks and micro-architecture details?
              </div>
              <div className="text-xs text-neutral-400">
                Explore the technical implementation papers published by the Ryvax Foundation.
              </div>
            </div>
          </div>

          <button
            onClick={onOpenDocs}
            className="px-4 py-2 rounded-[6px] bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-semibold border border-[#141414] transition-all shrink-0 flex items-center gap-1.5 active:scale-95"
          >
            <span>Read Architecture Specs</span>
            <ArrowRight className="w-3.5 h-3.5 text-white" />
          </button>
        </div>

      </div>
    </section>
  );
};
