import React, { useState } from 'react';
import { 
  Boxes, 
  Download, 
  Copy, 
  Check, 
  ArrowUpRight, 
  Layers, 
  Terminal, 
  Cpu,
  Filter,
  Sparkle
} from 'lucide-react';
import { ECOSYSTEM_PACKAGES } from '../data/frameworkData';

export const EcosystemSection: React.FC<{ onOpenScaffold: () => void }> = ({ onOpenScaffold }) => {
  const [copiedPkg, setCopiedPkg] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Core', 'Edge', 'Tooling', 'Data'];

  const filteredPackages = selectedCategory === 'All' 
    ? ECOSYSTEM_PACKAGES 
    : ECOSYSTEM_PACKAGES.filter((p) => p.category === selectedCategory);

  const handleCopy = (command: string, pkgName: string) => {
    navigator.clipboard.writeText(command);
    setCopiedPkg(pkgName);
    setTimeout(() => setCopiedPkg(null), 2000);
  };

  return (
    <section id="ecosystem" className="py-24 bg-[#0a0a0a] border-b border-[#141414]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-[6px] bg-[#0a0a0a] border border-[#141414] text-xs font-mono text-neutral-300 mb-3">
              <Boxes className="w-3.5 h-3.5" />
              <span>Official Modules & Libraries</span>
            </div>
            <h2 id="ecosystem-title" className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-display">
              The Ryvax Modular Suite.
            </h2>
            <p className="mt-3 text-neutral-400 text-sm sm:text-base max-w-2xl font-normal leading-relaxed">
              Zero-dependency, interoperable packages engineered by the Ryvax Foundation working groups under strict zero-overhead guidelines.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Category Filter Pills */}
            <div className="flex items-center gap-1 bg-[#0a0a0a] p-1 rounded-[6px] border border-[#141414]">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1 text-xs font-mono rounded-[6px] transition-all ${
                    selectedCategory === cat
                      ? 'bg-neutral-900 text-white border border-[#141414] font-semibold'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <button
              id="ecosystem-scaffold-btn"
              onClick={onOpenScaffold}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-[6px] bg-white hover:bg-neutral-200 text-black text-xs font-semibold shadow-md transition-all active:scale-95"
            >
              <Terminal className="w-3.5 h-3.5" />
              <span>Project Configurator</span>
            </button>
          </div>
        </div>

        {/* Packages Grid */}
        <div 
          id="ecosystem-packages-grid"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {filteredPackages.map((pkg) => {
            const isCopied = copiedPkg === pkg.name;

            return (
              <div
                key={pkg.name}
                id={`ecosystem-card-${pkg.name.replace('/', '-')}`}
                className="p-6 rounded-[6px] bg-[#0a0a0a] border border-[#141414] hover:border-neutral-700 transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[11px] font-mono font-medium px-2 py-0.5 rounded-[6px] bg-neutral-900 text-neutral-300 border border-[#141414]">
                      {pkg.category}
                    </span>
                    <span className="text-[11px] font-mono text-neutral-400 flex items-center gap-1">
                      <Download className="w-3 h-3 text-neutral-500" />
                      {pkg.downloads}
                    </span>
                  </div>

                  <div className="flex items-baseline gap-2 mb-2">
                    <h3 className="text-lg font-bold text-white font-mono tracking-tight">
                      {pkg.name}
                    </h3>
                    <span className="text-xs font-mono text-neutral-500">
                      {pkg.version}
                    </span>
                  </div>

                  <p className="text-xs text-neutral-400 leading-relaxed font-normal">
                    {pkg.description}
                  </p>
                </div>

                {/* Quick Copy Command */}
                <div className="mt-6 pt-4 border-t border-[#141414]">
                  <div className="flex items-center justify-between p-2.5 rounded-[6px] bg-[#0a0a0a] border border-[#141414] font-mono text-xs">
                    <span className="text-neutral-300 truncate mr-2 select-all text-[11px]">
                      {pkg.command}
                    </span>
                    <button
                      onClick={() => handleCopy(pkg.command, pkg.name)}
                      className="p-1.5 rounded-[6px] text-neutral-400 hover:text-white hover:bg-neutral-900 transition-colors shrink-0"
                      title="Copy package install command"
                    >
                      {isCopied ? (
                        <Check className="w-3.5 h-3.5 text-white" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
