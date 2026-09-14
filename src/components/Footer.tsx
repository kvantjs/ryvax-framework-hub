import React from 'react';
import { 
  ArrowUp 
} from 'lucide-react';

export const Footer: React.FC<{ onOpenScaffold: () => void; onOpenDocs: () => void }> = ({ 
  onOpenScaffold,
  onOpenDocs
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#0a0a0a] text-[#fafafa] border-t border-[#141414]">
      
      {/* Top CTA Banner */}
      <div className="border-b border-[#141414] py-16 md:py-20">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
            <div className="space-y-2 max-w-2xl">
              <h2 className="text-3xl sm:text-[36px] font-normal text-[#fafafa] tracking-[-0.007em] leading-[1.2]">
                Build in a weekend. Scale to billions.
              </h2>
              <p className="text-[16px] text-[#b4b4b4] font-normal leading-[1.5] tracking-[-0.007em]">
                The full-stack framework engineered for edge speed. You focus on the product, Ryvax handles the runtime.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={onOpenScaffold}
                className="px-5 py-2.5 rounded-[6px] bg-[#0a0a0a] text-[#fafafa] border border-[#141414] hover:text-white text-[14px] font-medium tracking-[-0.007em] transition-all whitespace-nowrap active:scale-[0.98]"
              >
                Start your project
              </button>
              <button
                onClick={onOpenDocs}
                className="px-5 py-2.5 rounded-[6px] bg-[#0a0a0a] border border-[#141414] text-[#fafafa] text-[14px] font-normal hover:text-white transition-all"
              >
                Read documentation
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Multi-Column Links Section & Brand */}
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-14">
        {/* Full Ryvax.js Brand Logo */}
        <div className="mb-12">
          <a href="#" className="inline-block py-1 group" aria-label="Ryvax.js Home">
            <img 
              src="https://imgdb.io/i/CaXVY08.png" 
              alt="Ryvax.js" 
              className="h-6 md:h-7 w-auto object-contain transition-opacity group-hover:opacity-90"
              referrerPolicy="no-referrer"
            />
          </a>
          <p className="mt-2 text-[14px] text-[#898989] max-w-sm font-normal">
            The full-stack framework with isomorphic signals and zero-overhead RPC runtime.
          </p>
        </div>

        {/* Simple Link Row (No Cards - Just Logos and Text) */}
        <div className="flex flex-wrap items-center gap-x-8 gap-y-4 mb-10 text-[14px] text-[#898989]">
          <a 
            href="https://www.npmjs.com/package/@kvantjs/ryvax.js" 
            target="_blank" 
            rel="noreferrer" 
            className="flex items-center gap-2.5 hover:text-[#fafafa] transition-colors group"
          >
            {/* Downloaded monochromatic NPM icon from thesvg */}
            <img 
              src="/icons/npm.svg" 
              alt="NPM Logo" 
              className="w-4.5 h-4.5 object-contain grayscale opacity-60 group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-200"
              referrerPolicy="no-referrer"
            />
            <span className="font-medium tracking-tight">npm</span>
          </a>

          <span className="hidden md:inline text-neutral-800">|</span>

          <a 
            href="https://dryvax.kvant.sbs/" 
            target="_blank" 
            rel="noreferrer" 
            className="flex items-center gap-2.5 hover:text-[#fafafa] transition-colors group"
          >
            {/* SVG Docs/File Icon */}
            <svg viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-neutral-400 group-hover:text-white transition-colors">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
              <polyline points="14 2 14 8 20 8"></polyline>
              <line x1="16" y1="13" x2="8" y2="13"></line>
              <line x1="16" y1="17" x2="8" y2="17"></line>
              <polyline points="10 9 9 9 8 9"></polyline>
            </svg>
            <span className="font-medium tracking-tight">Documentation</span>
          </a>

          <span className="hidden md:inline text-neutral-800">|</span>

          <a 
            href="https://github.com/kvantjs/ryvax.js" 
            target="_blank" 
            rel="noreferrer" 
            className="flex items-center gap-2.5 hover:text-[#fafafa] transition-colors group"
          >
            {/* Downloaded high-fidelity GitHub icon from thesvg */}
            <img 
              src="/icons/github.svg" 
              alt="GitHub Logo" 
              className="w-4 h-4 object-contain brightness-0 invert opacity-60 group-hover:opacity-100 transition-all duration-200"
              referrerPolicy="no-referrer"
            />
            <span className="font-medium tracking-tight">Github repository</span>
          </a>
        </div>

        {/* Bottom Bar: Copyright & Attribution */}
        <div className="pt-8 border-t border-[#141414] flex flex-col sm:flex-row items-center justify-between gap-4 text-[12px] text-[#898989]">
          <div>
            © {new Date().getFullYear()} The Ryvax Foundation. All rights reserved.
          </div>

          <div className="flex items-center gap-4">
            {/* Custom SVG GitHub Icon */}
            <a 
              href="https://github.com/kvantjs/ryvax.js" 
              target="_blank" 
              rel="noreferrer" 
              className="text-[#898989] hover:text-[#fafafa] transition-colors"
              aria-label="GitHub Repository"
            >
              <img 
                src="/icons/github.svg" 
                alt="GitHub" 
                className="w-4 h-4 object-contain brightness-0 invert opacity-60 hover:opacity-100 transition-opacity"
                referrerPolicy="no-referrer"
              />
            </a>

            {/* Custom SVG NPM Icon */}
            <a 
              href="https://www.npmjs.com/package/@kvantjs/ryvax.js" 
              target="_blank" 
              rel="noreferrer" 
              className="text-[#898989] hover:text-[#fafafa] transition-colors flex items-center"
              aria-label="NPM Package"
            >
              <img 
                src="/icons/npm.svg" 
                alt="NPM" 
                className="w-4.5 h-4.5 object-contain grayscale opacity-60 hover:opacity-100 transition-all duration-200"
                referrerPolicy="no-referrer"
              />
            </a>

            {/* Custom SVG Docs Icon */}
            <a 
              href="https://dryvax.kvant.sbs/" 
              target="_blank" 
              rel="noreferrer" 
              className="text-[#898989] hover:text-[#fafafa] transition-colors"
              aria-label="Documentation Portal"
            >
              <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
                <line x1="16" y1="13" x2="8" y2="13"></line>
                <line x1="16" y1="17" x2="8" y2="17"></line>
                <polyline points="10 9 9 9 8 9"></polyline>
              </svg>
            </a>

            <button
              onClick={scrollToTop}
              className="p-1.5 rounded-[6px] bg-[#0a0a0a] text-[#898989] hover:text-[#fafafa] border border-[#141414] transition-colors ml-2"
              title="Return to top"
            >
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
