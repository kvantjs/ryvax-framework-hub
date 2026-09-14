import React from 'react';
import { Terminal, Cpu, Layers } from 'lucide-react';

export const IntegrationsSection: React.FC = () => {
  return (
    <section id="ecosystem" className="py-16 md:py-24 bg-[#0a0a0a]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="max-w-3xl mb-14">
          <span className="text-[12px] font-mono tracking-[0.1em] text-[#898989] uppercase block mb-3">
            ECOSYSTEM & TOOLS
          </span>
          <h2 className="text-3xl sm:text-[36px] font-normal tracking-[-0.007em] leading-[1.2] text-[#fafafa]">
            Works where your team already does
          </h2>
        </div>

        {/* 3 Integration Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card 1: IDE Agent & LSP */}
          <div className="rounded-[6px] bg-[#0a0a0a] border border-[#141414] p-6 flex flex-col justify-between transition-colors">
            <div>
              <div className="mb-4 text-[#fafafa]">
                <Terminal className="w-6 h-6 stroke-[1.5]" />
              </div>

              <h3 className="text-[18px] font-medium text-[#fafafa] tracking-[-0.007em] mb-2">
                IDE language server
              </h3>
              <p className="text-[14px] text-[#b4b4b4] font-normal leading-[1.5] tracking-[-0.007em] mb-6">
                A dedicated language server for VS Code and Cursor. Inspect reactive signals, track hydration budgets, and jump directly to co-located RPC definitions.
              </p>
            </div>

            {/* Dark illustration */}
            <div className="h-44 rounded-[6px] bg-[#0a0a0a] border border-[#141414] p-4 flex flex-col justify-between overflow-hidden">
              <div className="flex items-center gap-2 text-[11px] font-mono text-[#898989]">
                <span className="w-1.5 h-1.5 rounded-[6px] bg-[#fafafa]" />
                <span>ryvax-lsp-server</span>
              </div>

              <div className="bg-[#0a0a0a] rounded-[6px] p-3 border border-[#141414] text-[12px] font-mono space-y-1">
                <div className="text-[#fafafa]">
                  Hover: Signal &lt;count&gt;
                </div>
                <div className="text-[#898989] text-[11px]">
                  Subscribers: 2 DOM nodes • Zero VDOM cost
                </div>
              </div>

              <div className="text-[11px] text-[#898989] font-mono">
                Real-time reactivity diagnostics in VS Code
              </div>
            </div>
          </div>

          {/* Card 2: MCP Interface */}
          <div className="rounded-[6px] bg-[#0a0a0a] border border-[#141414] p-6 flex flex-col justify-between transition-colors">
            <div>
              <div className="mb-4 text-[#fafafa]">
                <Cpu className="w-6 h-6 stroke-[1.5]" />
              </div>

              <h3 className="text-[18px] font-medium text-[#fafafa] tracking-[-0.007em] mb-2">
                MCP interface
              </h3>
              <p className="text-[14px] text-[#b4b4b4] font-normal leading-[1.5] tracking-[-0.007em] mb-6">
                Connect Ryvax directly to Claude Code, Cursor, or Gemini CLI via MCP. Every route, schema, and signal is introspectable for autonomous developer workflows.
              </p>
            </div>

            {/* Dark illustration */}
            <div className="h-44 rounded-[6px] bg-[#0a0a0a] border border-[#141414] p-4 flex flex-col justify-between overflow-hidden">
              <div className="flex items-center justify-between text-[11px] font-mono text-[#898989]">
                <span>MODEL CONTEXT PROTOCOL</span>
                <span className="text-[#fafafa]">MCP</span>
              </div>

              <div className="bg-[#0a0a0a] rounded-[6px] p-3 border border-[#141414] text-[12px] font-mono space-y-1">
                <div className="text-[#fafafa]">
                  Agent: Scaffold /api/checkout
                </div>
                <div className="text-[#898989] text-[11px]">
                  Action created • Drizzle edge pool linked
                </div>
              </div>

              <div className="text-[11px] text-[#898989] font-mono">
                Exposes project schema to Claude & Gemini
              </div>
            </div>
          </div>

          {/* Card 3: Platform Integrations */}
          <div className="rounded-[6px] bg-[#0a0a0a] border border-[#141414] p-6 flex flex-col justify-between transition-colors">
            <div>
              <div className="mb-4 text-[#fafafa]">
                <Layers className="w-6 h-6 stroke-[1.5]" />
              </div>

              <h3 className="text-[18px] font-medium text-[#fafafa] tracking-[-0.007em] mb-2">
                Platform integrations
              </h3>
              <p className="text-[14px] text-[#b4b4b4] font-normal leading-[1.5] tracking-[-0.007em] mb-6">
                Compile to Cloudflare Workers, Fastly Compute, Deno, Bun, or Docker containers without changing a single line of business logic.
              </p>
            </div>

            {/* Dark illustration */}
            <div className="h-44 rounded-[6px] bg-[#0a0a0a] border border-[#141414] p-4 flex flex-col justify-between overflow-hidden">
              <div className="text-[11px] font-mono text-[#898989]">
                TARGET RUNTIMES
              </div>

              <div className="grid grid-cols-3 gap-2 py-1">
                {['Cloudflare', 'Fly.io', 'Fastly', 'Deno', 'Vercel', 'Bun'].map((plat) => (
                  <div key={plat} className="p-2 rounded-[6px] bg-[#0a0a0a] border border-[#141414] text-center text-[10px] font-mono text-[#fafafa]">
                    {plat}
                  </div>
                ))}
              </div>

              <div className="text-[11px] text-[#898989] font-mono">
                Single build output runs on any isolate
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
