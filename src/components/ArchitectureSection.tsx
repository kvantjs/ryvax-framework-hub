import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Network, 
  Shield, 
  Boxes, 
  Database, 
  Monitor, 
  ArrowRight, 
  CheckCircle2, 
  ChevronRight,
  Activity,
  Layers,
  Sparkle,
  Terminal,
  Cpu,
  Lock,
  Zap
} from 'lucide-react';
import { ARCHITECTURE_FLOW } from '../data/frameworkData';
import { CodeHighlighter } from './CodeHighlighter';

export const ArchitectureSection: React.FC = () => {
  const [selectedNodeId, setSelectedNodeId] = useState<string>(ARCHITECTURE_FLOW[0].id);
  const [activeSimulationIndex, setActiveSimulationIndex] = useState<number | null>(null);

  const selectedNode = ARCHITECTURE_FLOW.find((n) => n.id === selectedNodeId) || ARCHITECTURE_FLOW[0];

  const getIcon = (name: string) => {
    switch (name) {
      case 'Monitor':
        return <Monitor className="w-4 h-4" />;
      case 'Network':
        return <Network className="w-4 h-4" />;
      case 'Shield':
        return <Shield className="w-4 h-4" />;
      case 'Boxes':
        return <Boxes className="w-4 h-4" />;
      case 'Database':
        return <Database className="w-4 h-4" />;
      default:
        return <Activity className="w-4 h-4" />;
    }
  };

  const runPipelineSimulation = () => {
    let step = 0;
    setActiveSimulationIndex(0);
    const interval = setInterval(() => {
      step++;
      if (step < ARCHITECTURE_FLOW.length) {
        setActiveSimulationIndex(step);
        setSelectedNodeId(ARCHITECTURE_FLOW[step].id);
      } else {
        clearInterval(interval);
        setTimeout(() => setActiveSimulationIndex(null), 1200);
      }
    }, 550);
  };

  return (
    <section id="architecture" className="py-24 bg-[#0a0a0a] border-b border-[#141414] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-[6px] bg-[#0a0a0a] border border-[#141414] text-xs font-mono text-neutral-300 mb-3">
            <Layers className="w-3.5 h-3.5" />
            <span>Dual-Core Systems Architecture</span>
          </div>
          <h2 id="architecture-title" className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-display">
            How Ryvax Eliminates the Full-Stack Boundary.
          </h2>
          <p className="mt-3 text-neutral-400 text-sm sm:text-base leading-relaxed font-normal">
            Traditional meta-frameworks bolt server routers on top of client SPAs. Ryvax uses an isomorphic compiler AST that prunes client bundles and executes server RPC at the edge with zero serial overhead.
          </p>

          <div className="mt-6 flex justify-center">
            <button
              id="simulate-pipeline-flow-btn"
              onClick={runPipelineSimulation}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-[6px] bg-neutral-900 hover:bg-neutral-800 text-neutral-200 hover:text-white text-xs font-mono border border-[#141414] transition-all active:scale-95"
            >
              <Activity className={`w-3.5 h-3.5 text-white ${activeSimulationIndex !== null ? 'animate-pulse' : ''}`} />
              <span>Simulate Packet Flow Across Edge Pipeline</span>
            </button>
          </div>
        </motion.div>

        {/* Pipeline Visual Flow Circuit Ribbon */}
        <motion.div 
          id="architecture-pipeline-ribbon"
          className="grid grid-cols-1 md:grid-cols-5 gap-3 mb-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.08
              }
            }
          }}
        >
          {ARCHITECTURE_FLOW.map((node, index) => {
            const isSelected = selectedNodeId === node.id;
            const isSimulating = activeSimulationIndex === index;

            return (
              <motion.button
                key={node.id}
                id={`arch-node-${node.id}`}
                onClick={() => setSelectedNodeId(node.id)}
                variants={{
                  hidden: { opacity: 0, y: 15 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
                }}
                className={`p-4 rounded-[6px] border text-left transition-all relative group overflow-hidden ${
                  isSelected
                    ? 'bg-[#0f0f0f] border-transparent'
                    : 'bg-[#0a0a0a] border-[#141414] hover:bg-neutral-900/60'
                }`}
              >
                {/* Active Indicator: Animated Border Trace */}
                {isSelected && (
                  <>
                    <div className="absolute inset-0 bg-white/[0.01] pointer-events-none rounded-[6px]" />
                    <svg className="absolute inset-0 w-full h-full pointer-events-none rounded-[6px]" style={{ overflow: 'visible' }}>
                      <motion.rect
                        x="0.5"
                        y="0.5"
                        width="calc(100% - 1px)"
                        height="calc(100% - 1px)"
                        rx="6"
                        stroke="rgba(255, 255, 255, 0.35)"
                        strokeWidth="1.2"
                        strokeDasharray="40 120"
                        fill="none"
                        animate={{
                          strokeDashoffset: [0, -320]
                        }}
                        transition={{
                          repeat: Infinity,
                          duration: 3,
                          ease: "linear"
                        }}
                      />
                    </svg>
                  </>
                )}

                {/* Packet Simulation Pulse (Monochrome) */}
                {isSimulating && (
                  <div className="absolute inset-0 bg-white/10 pointer-events-none animate-pulse" />
                )}

                <div className="flex items-center justify-between mb-3">
                  <div className={`w-8 h-8 rounded-[6px] flex items-center justify-center transition-all ${
                    isSelected 
                      ? 'bg-white/[0.08] text-white border border-white/[0.12] shadow-inner' 
                      : 'bg-neutral-900 text-neutral-300 border border-[#141414] group-hover:text-white'
                  }`}>
                    {getIcon(node.iconName)}
                  </div>
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-[6px] bg-[#0a0a0a] border border-[#141414] text-neutral-400">
                    {node.latency}
                  </span>
                </div>

                <div className="text-xs font-mono text-neutral-500 mb-0.5">
                  0{index + 1} • Layer
                </div>
                <h4 className="text-sm font-semibold text-white tracking-tight truncate">
                  {node.label}
                </h4>
                <p className="text-[11px] text-neutral-400 mt-1 truncate">
                  {node.sublabel}
                </p>
              </motion.button>
            );
          })}
        </motion.div>

        {/* Deep Layer Specification Panel */}
        <motion.div 
          id="architecture-layer-detail"
          className="p-6 sm:p-8 rounded-[6px] bg-[#0a0a0a] border border-[#141414] shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          {/* Left: Deep Layer Explanation */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-[6px] text-xs font-mono bg-neutral-900 text-neutral-300 border border-[#141414]">
                Layer Specification
              </span>
              <span className="text-xs font-mono text-neutral-400">
                Median Execution: {selectedNode.latency}
              </span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight font-display">
              {selectedNode.label}: <span className="text-neutral-400 font-normal">{selectedNode.sublabel}</span>
            </h3>

            <p className="text-neutral-300 text-sm sm:text-base leading-relaxed">
              {selectedNode.description}
            </p>

            {/* Architectural Invariants / Key Guarantees */}
            <div className="pt-3 border-t border-[#141414]">
              <div className="text-xs font-mono text-neutral-400 uppercase tracking-wider mb-3">
                Architectural Invariants & Guarantees
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {selectedNode.details.map((detail, idx) => (
                  <div 
                    key={idx}
                    className="p-2.5 rounded-[6px] bg-[#0a0a0a] border border-[#141414] text-xs text-neutral-300 flex items-start gap-2"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-white shrink-0 mt-0.5" />
                    <span className="leading-tight text-[11px]">{detail}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Technical Assembly / IR Transformation Card */}
          <div className="lg:col-span-5 bg-[#0a0a0a] rounded-[6px] border border-[#141414] p-4 overflow-hidden font-mono text-xs">
            <div className="flex items-center justify-between pb-2 mb-3 border-b border-[#141414] text-[11px] text-neutral-400">
              <span className="flex items-center gap-1.5 text-white">
                <Terminal className="w-3.5 h-3.5" />
                <span>Compiler IR Emission</span>
              </span>
              <span className="text-neutral-300 text-[10px]">Zero-Copy AST</span>
            </div>

            {(() => {
              let code = '';
              if (selectedNode.id === 'client-layer') {
                code = `// Compiled Signal Binding (Zero-VDOM)
const $s_count = __ryvax_sig(42);
__ryvax_bind_node(textNode_01, $s_count);
// -> Direct DOM pointer: zero diffing.`;
              } else if (selectedNode.id === 'edge-gateway') {
                code = `// Edge BGP Dispatch Tree
export default {
  async fetch(req, env) {
    return __ryvax_route(req, {
      compression: 'zstd',
      wintercg: true
    });
  }
};`;
              } else if (selectedNode.id === 'shield-auth') {
                code = `// Ed25519 Edge Crypto Verification
const sigValid = crypto.subtle.verify(
  'Ed25519',
  sessionPublicKey,
  tokenSignature,
  requestPayload
); // 0.08ms at Edge`;
              } else if (selectedNode.id === 'reactive-store') {
                code = `// CRDT State Vector Reconciler
const vectorClock = new VectorClock(nodeId);
const delta = crdt.reconcile(inboundDatagram);
// -> 0 merge conflicts guaranteed.`;
              } else if (selectedNode.id === 'persistence') {
                code = `// Universal Pool Adapter
const pool = createConnectionPool({
  replicas: ['iad', 'fra', 'nrt'],
  maxConnections: 12000,
  zeroColdStart: true
});`;
              }
              return <CodeHighlighter code={code} className="bg-transparent text-[11px]" showLineNumbers={false} />;
            })()}

            <div className="mt-3 pt-2.5 border-t border-[#141414] flex items-center justify-between text-[10px] text-neutral-500">
              <span>Target: WebAssembly / V8 Isolate</span>
              <span>Memory overhead: 0.00%</span>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};
