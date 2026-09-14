import React from 'react';
import { motion } from 'motion/react';

export const RolePersonas: React.FC = () => {
  const personasData = [
    {
      id: 'frontend',
      tag: 'FRONTEND ARCHITECTS',
      title: 'Zero virtual DOM. Pure reactive signals.',
      description: 'Never worry about re-render loops or unnecessary hydration overhead. Target DOM nodes update synchronously on user interaction.',
      metric: '0.0 kB VDOM payload',
      wireframe: (
        <svg viewBox="0 0 200 70" className="w-full h-auto" fill="none" style={{ overflow: 'visible' }}>
          <defs>
            <filter id="glow-fe" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          
          {/* Animated Connecting lines with breathing glow */}
          <motion.path 
            d="M 60 35 L 80 35" 
            stroke="rgba(255, 255, 255, 0.4)" 
            strokeWidth="1.5"
            animate={{ opacity: [0.3, 0.9, 0.3] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.path 
            d="M 120 35 L 140 35" 
            stroke="rgba(255, 255, 255, 0.4)" 
            strokeWidth="1.5"
            animate={{ opacity: [0.3, 0.9, 0.3] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          />

          {/* Core Wireframe Squares with animated glowing borders */}
          {/* Square 1 */}
          <motion.rect 
            x="20" y="15" width="40" height="40" rx="4" 
            stroke="rgba(255, 255, 255, 0.15)" 
            strokeWidth="1.2" 
          />
          <motion.rect 
            x="20" y="15" width="40" height="40" rx="4" 
            stroke="#fafafa" 
            strokeWidth="1.5" 
            filter="url(#glow-fe)"
            animate={{ opacity: [0.1, 0.6, 0.1] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Square 2 */}
          <motion.rect 
            x="80" y="15" width="40" height="40" rx="4" 
            stroke="rgba(255, 255, 255, 0.15)" 
            strokeWidth="1.2" 
          />
          <motion.rect 
            x="80" y="15" width="40" height="40" rx="4" 
            stroke="#fafafa" 
            strokeWidth="1.5" 
            filter="url(#glow-fe)"
            animate={{ opacity: [0.1, 0.6, 0.1] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          />

          {/* Square 3 */}
          <motion.rect 
            x="140" y="15" width="40" height="40" rx="4" 
            stroke="rgba(255, 255, 255, 0.15)" 
            strokeWidth="1.2" 
          />
          <motion.rect 
            x="140" y="15" width="40" height="40" rx="4" 
            stroke="#fafafa" 
            strokeWidth="1.5" 
            filter="url(#glow-fe)"
            animate={{ opacity: [0.1, 0.6, 0.1] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          />

          {/* Nodes inside */}
          <circle cx="40" cy="35" r="3" fill="#fafafa" />
          <circle cx="100" cy="35" r="3" fill="#fafafa" />
          <circle cx="160" cy="35" r="3" fill="rgba(255, 255, 255, 0.3)" />
        </svg>
      )
    },
    {
      id: 'systems',
      tag: 'SYSTEMS ENGINEERS',
      title: 'WinterCG isolates. Cold start < 1ms.',
      description: 'Deploy to Cloudflare, Deno, Fastly, or Node.js with byte-level execution guarantees and zero vendor lock-in.',
      metric: '0.82ms edge cold start',
      wireframe: (
        <svg viewBox="0 0 200 70" className="w-full h-auto" fill="none" style={{ overflow: 'visible' }}>
          <defs>
            <filter id="glow-sys" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Connecting line */}
          <motion.path 
            d="M 62 35 L 78 35 M 122 35 L 138 35" 
            stroke="rgba(255, 255, 255, 0.3)" 
            strokeWidth="1.2" 
            strokeDasharray="3 3"
            animate={{ opacity: [0.3, 0.8, 0.3] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Core Wireframe Circles with animated glowing borders */}
          {/* Circle 1 */}
          <circle cx="40" cy="35" r="22" stroke="rgba(255, 255, 255, 0.15)" strokeWidth="1.2" />
          <motion.circle 
            cx="40" cy="35" r="22" 
            stroke="#fafafa" 
            strokeWidth="1.5" 
            filter="url(#glow-sys)"
            animate={{ opacity: [0.1, 0.6, 0.1] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Circle 2 */}
          <circle cx="100" cy="35" r="22" stroke="rgba(255, 255, 255, 0.15)" strokeWidth="1.2" />
          <motion.circle 
            cx="100" cy="35" r="22" 
            stroke="#fafafa" 
            strokeWidth="1.5" 
            filter="url(#glow-sys)"
            animate={{ opacity: [0.1, 0.6, 0.1] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          />

          {/* Circle 3 */}
          <circle cx="160" cy="35" r="22" stroke="rgba(255, 255, 255, 0.15)" strokeWidth="1.2" />
          <motion.circle 
            cx="160" cy="35" r="22" 
            stroke="#fafafa" 
            strokeWidth="1.5" 
            filter="url(#glow-sys)"
            animate={{ opacity: [0.1, 0.6, 0.1] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          />

          {/* Nodes inside */}
          <circle cx="100" cy="35" r="4" fill="#fafafa" />
          <circle cx="40" cy="35" r="4" fill="rgba(255, 255, 255, 0.3)" />
          <circle cx="160" cy="35" r="4" fill="rgba(255, 255, 255, 0.3)" />
        </svg>
      )
    },
    {
      id: 'cto',
      tag: 'FOUNDERS & CTOS',
      title: 'Flat compute bills. Zero API glue.',
      description: 'Co-locate database queries, authentication tokens, and UI components in one file without maintaining redundant microservices.',
      metric: '-68% cloud compute costs',
      wireframe: (
        <svg viewBox="0 0 200 70" className="w-full h-auto" fill="none" style={{ overflow: 'visible' }}>
          <defs>
            <filter id="glow-cto" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Flat lines representing bottom axis grid */}
          <line x1="20" y1="58" x2="180" y2="58" stroke="rgba(255, 255, 255, 0.08)" strokeDasharray="3 3" />

          {/* Diagonal Line with dynamic glowing pulse */}
          <path d="M 20 50 L 70 38 L 120 25 L 180 15" stroke="rgba(255, 255, 255, 0.15)" strokeWidth="1.5" />
          <motion.path 
            d="M 20 50 L 70 38 L 120 25 L 180 15" 
            stroke="#fafafa" 
            strokeWidth="1.5" 
            filter="url(#glow-cto)"
            animate={{ opacity: [0.2, 0.7, 0.2] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Nodes along the diagonal line with pulsing radius glow */}
          <circle cx="20" cy="50" r="3" fill="rgba(255, 255, 255, 0.4)" />
          <circle cx="70" cy="38" r="3" fill="rgba(255, 255, 255, 0.4)" />
          <circle cx="120" cy="25" r="3" fill="rgba(255, 255, 255, 0.4)" />

          <circle cx="180" cy="15" r="4" fill="rgba(255, 255, 255, 0.15)" />
          <motion.circle 
            cx="180" cy="15" r="4.5" 
            fill="#fafafa" 
            filter="url(#glow-cto)"
            animate={{ opacity: [0.3, 0.9, 0.3], scale: [1, 1.25, 1] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />
        </svg>
      )
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-[#0a0a0a]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        
        {/* Header Block */}
        <div className="mb-14">
          <span className="text-[12px] font-mono tracking-[0.1em] text-[#898989] uppercase block mb-3">
            ARCHITECTURAL PERSONAS
          </span>
          <h2 className="text-3xl sm:text-[36px] font-normal tracking-[-0.007em] leading-[1.2] text-[#fafafa] font-serif italic">
            Different roles. Same framework.
          </h2>
        </div>

        {/* 3 Developer Schematic Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {personasData.map((p) => (
            <div
              key={p.id}
              className="rounded-[6px] bg-[#0a0a0a] border border-[#141414] p-6 flex flex-col justify-between transition-colors"
            >
              <div>
                <div className="text-[11px] font-mono tracking-[0.1em] text-[#898989] mb-3">
                  {p.tag}
                </div>

                <h3 className="text-[18px] font-medium text-[#fafafa] tracking-[-0.007em] mb-2">
                  {p.title}
                </h3>

                <p className="text-[14px] text-[#b4b4b4] font-normal leading-[1.5] tracking-[-0.007em] mb-6">
                  {p.description}
                </p>
              </div>

              <div>
                <div className="rounded-[6px] bg-[#0d0d0d]/40 border border-[#141414] p-4 flex flex-col justify-between">
                  <div className="py-2">
                    {p.wireframe}
                  </div>
                  <div className="pt-2 border-t border-[#141414] flex items-center justify-between text-[11px] font-mono">
                    <span className="text-[#898989]">Benchmark</span>
                    <span className="text-[#fafafa]">{p.metric}</span>
                  </div>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
