import React, { useState } from 'react';
import { 
  X, 
  Terminal, 
  FileCode, 
  Layers, 
  Zap, 
  Copy, 
  ChevronRight 
} from 'lucide-react';
import { CodeHighlighter } from './CodeHighlighter';

interface DocsQuickViewModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DocsQuickViewModal: React.FC<DocsQuickViewModalProps> = ({ isOpen, onClose }) => {
  const [activeDocSection, setActiveDocSection] = useState<'quickstart' | 'routing' | 'actions' | 'config'>('quickstart');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const docsSections = [
    { id: 'quickstart', label: '1. Quickstart & CLI', icon: Terminal },
    { id: 'routing', label: '2. File Routing & Shell', icon: FileCode },
    { id: 'actions', label: '3. Server Actions & RPC', icon: Zap },
    { id: 'config', label: '4. WinterCG Configuration', icon: Layers },
  ];

  return (
    <div 
      id="docs-modal-backdrop" 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0a0a0a]/80 backdrop-blur-xs"
      onClick={onClose}
    >
      <div 
        id="docs-modal-dialog"
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-4xl rounded-[6px] bg-[#0a0a0a] border border-[#141414] overflow-hidden flex flex-col max-h-[90vh]"
      >
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-[#141414] bg-[#0a0a0a] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-[6px] bg-[#0a0a0a] border border-[#141414] flex items-center justify-center text-[#fafafa]">
              <Terminal className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-[16px] font-medium text-[#fafafa] tracking-[-0.007em]">
                Ryvax Framework Documentation
              </h3>
              <p className="text-[12px] text-[#898989] font-mono">
                Official Reference Specification • v2.4.0 (WinterCG)
              </p>
            </div>
          </div>

          <button
            id="docs-modal-close-btn"
            onClick={onClose}
            className="p-1.5 rounded-[6px] text-[#898989] hover:text-[#fafafa] bg-[#0a0a0a] border border-[#141414] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body: Sidebar + Content */}
        <div className="flex-1 overflow-hidden grid grid-cols-1 md:grid-cols-12 min-h-[460px]">
          
          {/* Left Navigation Sidebar */}
          <div className="md:col-span-4 border-b md:border-b-0 md:border-r border-[#141414] p-4 bg-[#0a0a0a] space-y-1">
            <div className="text-[11px] font-mono uppercase tracking-[0.1em] text-[#898989] px-3 py-1 mb-2">
              ARCHITECTURE GUIDE
            </div>

            {docsSections.map((sec) => {
              const Icon = sec.icon;
              const isActive = activeDocSection === sec.id;
              return (
                <button
                  key={sec.id}
                  id={`docs-nav-${sec.id}`}
                  onClick={() => setActiveDocSection(sec.id as any)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-[6px] text-[13px] font-normal transition-all ${
                    isActive
                      ? 'bg-[#0a0a0a] text-[#fafafa] border border-[#141414] font-medium'
                      : 'text-[#898989] hover:text-[#fafafa]'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-[#fafafa]' : 'text-[#898989]'}`} />
                    <span>{sec.label}</span>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-[#525252]" />
                </button>
              );
            })}

            <div className="pt-4 mt-4 border-t border-[#141414] px-3">
              <div className="text-[11px] text-[#898989] leading-relaxed">
                Press <kbd className="px-1.5 py-0.5 rounded-[6px] bg-[#0a0a0a] text-[#fafafa] font-mono text-[10px] border border-[#141414]">Esc</kbd> anytime to return to the interactive application.
              </div>
            </div>
          </div>

          {/* Right Content Area */}
          <div className="md:col-span-8 p-6 overflow-y-auto bg-[#0a0a0a] space-y-5">
            
            {/* 1. Quickstart Section */}
            {activeDocSection === 'quickstart' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-[18px] font-medium text-[#fafafa] tracking-[-0.007em]">
                    Rapid Bootstrapping
                  </h4>
                  <span className="text-[12px] font-mono text-[#898989]">
                    Step 1 of 4
                  </span>
                </div>
                <p className="text-[14px] text-[#b4b4b4] leading-[1.5] tracking-[-0.007em]">
                  The recommended way to scaffold a new production Ryvax project is through the official interactive CLI. It initializes WinterCG runtime flags, TypeScript 5.6, and atomic signals.
                </p>

                <div className="p-3.5 rounded-[6px] bg-[#0a0a0a] border border-[#141414]">
                  <div className="flex justify-between items-center pb-2 mb-2 border-b border-[#141414] text-[12px] font-mono text-[#898989]">
                    <span>SHELL TERMINAL</span>
                    <button
                      onClick={() => handleCopyCode('pnpm create ryvax@latest my-app && cd my-app && pnpm dev')}
                      className="text-[12px] text-[#b4b4b4] hover:text-[#fafafa] flex items-center gap-1.5"
                    >
                      <Copy className="w-3 h-3 text-[#fafafa]" />
                      <span>{copied ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>
                  <code className="text-[12px] font-mono text-[#fafafa] block">
                    $ pnpm create ryvax@latest my-app<br />
                    $ cd my-app<br />
                    $ pnpm dev
                  </code>
                </div>

                <p className="text-[12px] text-[#898989] leading-[1.5]">
                  The development server boots with instant Hot-Reloading using isolated V8 isolates in less than 20ms.
                </p>
              </div>
            )}

            {/* 2. Routing Section */}
            {activeDocSection === 'routing' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-[18px] font-medium text-[#fafafa] tracking-[-0.007em]">
                    File-System Routing & Static Shells
                  </h4>
                  <span className="text-[12px] font-mono text-[#898989]">
                    Step 2 of 4
                  </span>
                </div>
                <p className="text-[14px] text-[#b4b4b4] leading-[1.5] tracking-[-0.007em]">
                  Ryvax automatically matches files in <code className="text-[#fafafa] font-mono bg-[#0a0a0a] px-1.5 py-0.5 rounded-[6px] border border-[#141414]">src/routes</code> to HTTP routes. Root layouts are statically compiled to eliminate runtime tree traversal overhead.
                </p>

                <div className="rounded-[6px] bg-[#0a0a0a] border border-[#141414] p-3 overflow-hidden">
                  <CodeHighlighter code={`// src/routes/+layout.tsx
import { LayoutProps } from 'ryvax';

export default function RootLayout({ children }: LayoutProps) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <title>Ryvax Edge App</title>
      </head>
      <body>
        <main>{children}</main>
      </body>
    </html>
  );
}`} />
                </div>
              </div>
            )}

            {/* 3. Server Actions Section */}
            {activeDocSection === 'actions' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-[18px] font-medium text-[#fafafa] tracking-[-0.007em]">
                    Server Actions & Edge RPC
                  </h4>
                  <span className="text-[12px] font-mono text-[#898989]">
                    Step 3 of 4
                  </span>
                </div>
                <p className="text-[14px] text-[#b4b4b4] leading-[1.5] tracking-[-0.007em]">
                  Call server logic directly from reactive event handlers. The compiler automatically splits the function into an edge micro-lambda with full type safety.
                </p>

                <div className="rounded-[6px] bg-[#0a0a0a] border border-[#141414] p-3 overflow-hidden">
                  <CodeHighlighter code={`// Co-located Action in routes/item.tsx
import { action, signal } from 'ryvax';
import { db } from '@/server/db';

export const saveItem = action(async (title: string) => {
  'use server';
  const item = await db.items.create({ data: { title } });
  return { id: item.id, ok: true };
});`} />
                </div>
              </div>
            )}

            {/* 4. Configuration Section */}
            {activeDocSection === 'config' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-[18px] font-medium text-[#fafafa] tracking-[-0.007em]">
                    WinterCG Compiler Configuration
                  </h4>
                  <span className="text-[12px] font-mono text-[#898989]">
                    Step 4 of 4
                  </span>
                </div>
                <p className="text-[14px] text-[#b4b4b4] leading-[1.5] tracking-[-0.007em]">
                  Specify edge targets, compression formats, and selective hydration thresholds inside <code className="text-[#fafafa] font-mono bg-[#0a0a0a] px-1.5 py-0.5 rounded-[6px] border border-[#141414]">ryvax.config.ts</code>.
                </p>

                <div className="rounded-[6px] bg-[#0a0a0a] border border-[#141414] p-3 overflow-hidden">
                  <CodeHighlighter code={`// ryvax.config.ts
import { defineConfig } from 'ryvax/config';

export default defineConfig({
  target: 'wintercg',
  edge: {
    regions: ['iad', 'fra', 'nrt'],
    streaming: true,
    compression: 'zstd'
  },
  signals: {
    vdom: false, // Pure atomic signals
    hydrationBudgetKb: 2.1
  }
});`} />
                </div>
              </div>
            )}

          </div>

        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3.5 border-t border-[#141414] bg-[#0a0a0a] flex items-center justify-between">
          <span className="text-[12px] font-mono text-[#898989]">
            WinterCG Spec • Zero proprietary lock-in
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-[6px] bg-[#0a0a0a] text-[#fafafa] border border-[#141414] hover:text-white text-[13px] font-medium transition-all"
          >
            Close Reference
          </button>
        </div>

      </div>
    </div>
  );
};
