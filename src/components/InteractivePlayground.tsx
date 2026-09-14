import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Play, 
  RotateCcw, 
  Copy, 
  Check, 
  Terminal, 
  Zap, 
  Activity, 
  Shield, 
  Sparkle,
  Maximize2,
  Code2,
  Cpu,
  Layers,
  Clock,
  AlertTriangle,
  XCircle,
  Package,
  RefreshCw,
  Unlock,
  Lock
} from 'lucide-react';
import { PLAYGROUND_SNIPPETS } from '../data/frameworkData';
import { CodeHighlighter } from './CodeHighlighter';

export const InteractivePlayground: React.FC = () => {
  const [activeSnippetKey, setActiveSnippetKey] = useState<string>('counter');
  const [activeTab, setActiveTab] = useState<'preview' | 'console' | 'flamegraph' | 'payload'>('preview');
  const [copied, setCopied] = useState(false);

  // Real-time cancellation demo state
  const [dbQueryStatus, setDbQueryStatus] = useState<'idle' | 'executing' | 'aborted' | 'completed'>('idle');
  const [queryProgress, setQueryProgress] = useState(0);
  const [queryTimer, setQueryTimer] = useState<NodeJS.Timeout | null>(null);

  // Durable job state
  const [jobsList, setJobsList] = useState<{ id: string; status: 'queued' | 'active' | 'completed'; task: string }[]>([
    { id: 'job_88a', status: 'completed', task: 'Compute image metadata' }
  ]);
  const [jobIdCount, setJobIdCount] = useState(1);

  // Cache state
  const [cacheHit, setCacheHit] = useState<boolean>(true);
  const [cacheTtl, setCacheTtl] = useState(300);

  // Signed session state
  const [sessionAuthenticated, setSessionAuthenticated] = useState<boolean>(true);

  // Playground interactive runtime state
  const [counterValue, setCounterValue] = useState(42);
  const [userQuery, setUserQuery] = useState('edge clusters');
  const [syncStatus, setSyncStatus] = useState<'Synced' | 'Synchronizing...'>('Synced');
  const [executionLogs, setExecutionLogs] = useState<string[]>([
    '00:00.001 - Ryvax runtime initialized',
    '00:00.003 - RequestContext established with explicit AbortSignal propagation',
    '00:00.006 - Bounded connection pooling ready'
  ]);

  const currentSnippet = PLAYGROUND_SNIPPETS[activeSnippetKey] || PLAYGROUND_SNIPPETS['counter'];

  const getLogDetails = (log: string) => {
    let icon = <Terminal className="w-3.5 h-3.5 text-neutral-400" />;
    let cleanLog = log;

    if (log.startsWith('⚡')) {
      icon = <Zap className="w-3.5 h-3.5 text-amber-400" />;
      cleanLog = log.replace(/^⚡\s*/, '');
    } else if (log.startsWith('🕒')) {
      icon = <Clock className="w-3.5 h-3.5 text-blue-400" />;
      cleanLog = log.replace(/^🕒\s*/, '');
    } else if (log.startsWith('✅')) {
      icon = <Check className="w-3.5 h-3.5 text-emerald-400" />;
      cleanLog = log.replace(/^✅\s*/, '');
    } else if (log.startsWith('🚨')) {
      icon = <AlertTriangle className="w-3.5 h-3.5 text-red-500" />;
      cleanLog = log.replace(/^🚨\s*/, '');
    } else if (log.startsWith('🛑')) {
      icon = <XCircle className="w-3.5 h-3.5 text-red-500" />;
      cleanLog = log.replace(/^🛑\s*/, '');
    } else if (log.startsWith('📦')) {
      icon = <Package className="w-3.5 h-3.5 text-purple-400" />;
      cleanLog = log.replace(/^📦\s*/, '');
    } else if (log.startsWith('🧹')) {
      icon = <RefreshCw className="w-3.5 h-3.5 text-cyan-400" />;
      cleanLog = log.replace(/^🧹\s*/, '');
    } else if (log.startsWith('🔓')) {
      icon = <Unlock className="w-3.5 h-3.5 text-amber-500" />;
      cleanLog = log.replace(/^🔓\s*/, '');
    } else if (log.startsWith('🔒')) {
      icon = <Lock className="w-3.5 h-3.5 text-emerald-500" />;
      cleanLog = log.replace(/^🔒\s*/, '');
    } else if (/^\d\d:\d\d\.\d\d\d\s*-\s*/.test(log)) {
      icon = <Cpu className="w-3.5 h-3.5 text-neutral-500" />;
    }

    return { icon, cleanLog };
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(currentSnippet.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const startCancellationDemo = () => {
    if (queryTimer) clearInterval(queryTimer);
    setDbQueryStatus('executing');
    setQueryProgress(0);
    setExecutionLogs((prev) => [
      '⚡ [ryvax:db] Query started: SELECT * FROM users',
      '🕒 [ryvax:db] Query executing downstream with signal',
      ...prev.slice(0, 3)
    ]);
    
    let current = 0;
    const interval = setInterval(() => {
      current += 20;
      setQueryProgress(current);
      if (current >= 100) {
        clearInterval(interval);
        setDbQueryStatus('completed');
        setExecutionLogs((prev) => [
          '✅ [ryvax:db] Query completed: returned 42 active users',
          ...prev.slice(0, 3)
        ]);
      }
    }, 200);
    setQueryTimer(interval);
  };

  const abortCancellationDemo = () => {
    if (queryTimer) {
      clearInterval(queryTimer);
      setQueryTimer(null);
    }
    setDbQueryStatus('aborted');
    setExecutionLogs((prev) => [
      '🚨 [ryvax:db] Abort propagation detected: client connection closed',
      '🛑 [ryvax:db] Query halted instantly (0ms wasted)',
      ...prev.slice(0, 3)
    ]);
  };

  const dispatchJob = () => {
    const newJobId = `job_${Math.random().toString(36).substr(2, 3)}`;
    const newJob = { id: newJobId, status: 'queued' as const, task: 'Analyze database records' };
    setJobsList(prev => [newJob, ...prev].slice(0, 4));
    setExecutionLogs(prev => [
      `📦 [ryvax:jobs] Enqueued job ${newJobId} with delay 15s`,
      ...prev.slice(0, 3)
    ]);

    setTimeout(() => {
      setJobsList(currentList => 
        currentList.map(j => j.id === newJobId ? { ...j, status: 'active' as const } : j)
      );
      setExecutionLogs(prev => [
        `🕒 [ryvax:jobs] Job ${newJobId} is now active`,
        ...prev.slice(0, 3)
      ]);

      setTimeout(() => {
        setJobsList(currentList => 
          currentList.map(j => j.id === newJobId ? { ...j, status: 'completed' as const } : j)
        );
        setExecutionLogs(prev => [
          `✅ [ryvax:jobs] Marked job ${newJobId} as completed`,
          ...prev.slice(0, 3)
        ]);
      }, 1000);
    }, 1500);
  };

  const triggerCacheQuery = () => {
    const latency = cacheHit ? '0.4ms' : '2.4ms';
    setExecutionLogs(prev => [
      `⚡ [ryvax:cache] GET /api/analytics - ${cacheHit ? 'Cache HIT' : 'Cache MISS (fetching from DB)'}`,
      `📦 [ryvax:cache] Latency: ${latency}`,
      ...prev.slice(0, 3)
    ]);
    if (!cacheHit) {
      setCacheHit(true);
    }
  };

  const invalidateCache = () => {
    setCacheHit(false);
    setExecutionLogs(prev => [
      '🧹 [ryvax:cache] Explicit cache invalidation triggered for "global-telemetry"',
      ...prev.slice(0, 3)
    ]);
  };

  const toggleSession = () => {
    setSessionAuthenticated(!sessionAuthenticated);
    setExecutionLogs(prev => [
      sessionAuthenticated 
        ? '🔓 [ryvax:auth] Session revoked' 
        : '🔒 [ryvax:auth] Signed session token generated using Ed25519',
      ...prev.slice(0, 3)
    ]);
  };

  const handleTriggerAction = () => {
    if (activeSnippetKey === 'counter') {
      startCancellationDemo();
    } else if (activeSnippetKey === 'actions') {
      dispatchJob();
    } else if (activeSnippetKey === 'edge-routing') {
      triggerCacheQuery();
    } else if (activeSnippetKey === 'streaming') {
      toggleSession();
    }
  };

  return (
    <section id="playground" className="py-24 bg-[#0a0a0a] border-b border-[#141414] relative overflow-hidden">
      {/* Bottom Right Animated Soften & Noise Gradient Overlay */}
      <div className="absolute bottom-0 right-0 w-[750px] h-[750px] pointer-events-none overflow-hidden select-none z-0">
        {/* Animated White/Gray Soften Gradient (47px blur) */}
        <motion.div
          className="absolute -bottom-32 -right-32 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-neutral-400/18 via-neutral-300/12 to-white/15"
          style={{
            filter: 'blur(47px)',
            mixBlendMode: 'plus-lighter'
          }}
          animate={{
            scale: [1, 1.12, 0.92, 1.08, 1],
            opacity: [0.7, 0.95, 0.65, 0.85, 0.7],
            rotate: [0, 90, 180, 270, 360]
          }}
          transition={{
            duration: 16,
            repeat: Infinity,
            ease: "linear"
          }}
        />

        {/* Noise Layer with exactly 27px width/height tiles for the custom noise pattern (27px noise) */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.08] mix-blend-overlay">
          <defs>
            <pattern id="noise-pattern-27" width="27" height="27" patternUnits="userSpaceOnUse">
              <rect width="27" height="27" fill="transparent" />
              <foreignObject width="27" height="27">
                <div className="w-full h-full bg-white/[0.18]" style={{ filter: 'url(#compiler-noise-filter)' }} />
              </foreignObject>
            </pattern>
            <filter id="compiler-noise-filter">
              <feTurbulence type="fractalNoise" baseFrequency="0.95" numOctaves="4" />
            </filter>
          </defs>
          <rect width="100%" height="100%" fill="url(#noise-pattern-27)" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <motion.div 
          className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-[6px] bg-[#0a0a0a] border border-[#141414] text-xs font-mono text-neutral-300 mb-3">
              <Code2 className="w-3.5 h-3.5" />
              <span>Interactive Edge Sandbox</span>
            </div>
            <h2 id="playground-title" className="text-3xl sm:text-5xl font-normal text-white tracking-tight font-serif italic">
              See the Compiler in Motion.
            </h2>
            <p className="mt-2 text-neutral-400 text-sm sm:text-base max-w-xl font-normal">
              Zero virtual DOM, zero OpenAPI codegen, pure atomic reactivity compiled into isolated edge functions.
            </p>
          </div>

          {/* Snippet Selector Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-[6px] bg-[#0a0a0a] border border-[#141414]">
            {Object.keys(PLAYGROUND_SNIPPETS).map((key) => {
              const item = PLAYGROUND_SNIPPETS[key];
              const isSelected = activeSnippetKey === key;
              return (
                <button
                  key={key}
                  id={`playground-snippet-tab-${key}`}
                  onClick={() => setActiveSnippetKey(key)}
                  className={`px-3 py-1.5 rounded-[6px] text-xs font-mono font-medium transition-all ${
                    isSelected
                      ? 'bg-neutral-900 text-white border border-[#141414]'
                      : 'text-neutral-400 hover:text-white hover:bg-neutral-900/60'
                  }`}
                >
                  {item.title}
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* IDE Layout Container */}
        <motion.div 
          id="ide-playground-window"
          className="rounded-[6px] bg-[#0a0a0a] border border-[#141414] shadow-2xl overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15 }}
        >
          {/* Top Window Chrome Bar */}
          <div className="px-4 py-3 bg-[#0a0a0a] border-b border-[#141414] flex items-center justify-between">
            <div className="flex items-center gap-3">
              {/* Monochromatic Mac dots */}
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-[6px] bg-neutral-700" />
                <span className="w-2.5 h-2.5 rounded-[6px] bg-neutral-700" />
                <span className="w-2.5 h-2.5 rounded-[6px] bg-neutral-700" />
              </div>
              
              <div className="hidden sm:flex items-center gap-2 px-2.5 py-1 rounded-[6px] bg-neutral-900 border border-[#141414] text-xs font-mono text-neutral-300">
                <span className="w-1.5 h-1.5 rounded-[6px] bg-white" />
                <span>routes/{activeSnippetKey}.ryvax.tsx</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[11px] font-mono text-neutral-400 hidden md:inline">
                Target: WinterCG Isolate (0.4ms)
              </span>

              <button
                id="copy-snippet-code-btn"
                onClick={handleCopyCode}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-[6px] bg-[#0a0a0a] border border-[#141414] hover:bg-neutral-900 text-xs font-mono text-neutral-300 hover:text-white transition-colors"
                title="Copy code snippet"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-white" />
                    <span>Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Code</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* IDE Main Workspace */}
          <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[440px]">
            
            {/* Left: Code Editor */}
            <div className="lg:col-span-7 bg-[#0a0a0a] border-b lg:border-b-0 lg:border-r border-[#141414] p-4 flex flex-col justify-between">
              <div>
                <div className="text-[11px] font-mono text-neutral-500 uppercase tracking-wider mb-2 flex items-center justify-between">
                  <span>Isomorphic Source Code</span>
                  <span className="text-neutral-400">TypeScript 5.6</span>
                </div>
                <CodeHighlighter code={currentSnippet.code} />
              </div>

              <div className="mt-4 pt-3 border-t border-[#141414] flex items-center justify-between text-xs font-mono text-neutral-500">
                <span>Bundle: 2.1 kB total</span>
                <span>AST Pass: Zero-Copy</span>
              </div>
            </div>

            {/* Right: Runtime DevTools & Live Visualizer */}
            <div className="lg:col-span-5 bg-[#0a0a0a] flex flex-col">
              
              {/* DevTools Tab Bar */}
              <div className="flex items-center border-b border-[#141414] bg-[#0a0a0a] px-2 pt-2 gap-1 overflow-x-auto">
                <button
                  id="tab-preview"
                  onClick={() => setActiveTab('preview')}
                  className={`px-3 py-1.5 rounded-[6px] text-xs font-mono font-medium transition-colors ${
                    activeTab === 'preview'
                      ? 'bg-neutral-900 text-white border border-[#141414]'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  Live View
                </button>
                <button
                  id="tab-console"
                  onClick={() => setActiveTab('console')}
                  className={`px-3 py-1.5 rounded-[6px] text-xs font-mono font-medium transition-colors ${
                    activeTab === 'console'
                      ? 'bg-neutral-900 text-white border border-[#141414]'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  Console Trace
                </button>
                <button
                  id="tab-flamegraph"
                  onClick={() => setActiveTab('flamegraph')}
                  className={`px-3 py-1.5 rounded-[6px] text-xs font-mono font-medium transition-colors ${
                    activeTab === 'flamegraph'
                      ? 'bg-neutral-900 text-white border border-[#141414]'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  Flamegraph
                </button>
                <button
                  id="tab-payload"
                  onClick={() => setActiveTab('payload')}
                  className={`px-3 py-1.5 rounded-[6px] text-xs font-mono font-medium transition-colors ${
                    activeTab === 'payload'
                      ? 'bg-neutral-900 text-white border border-[#141414]'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  Payload
                </button>
              </div>

              {/* DevTools Body Content */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                
                {/* 1. Preview Tab */}
                {activeTab === 'preview' && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between pb-3 border-b border-[#141414]">
                      <span className="text-xs font-mono text-neutral-400">
                        Ryvax Contract Simulator
                      </span>
                      <span className="inline-flex items-center gap-1.5 text-xs font-mono text-neutral-300">
                        <span className="w-1.5 h-1.5 rounded-[6px] bg-emerald-500 animate-pulse" />
                        Online
                      </span>
                    </div>

                    {/* Dynamic Simulated Interactive Component */}
                    {activeSnippetKey === 'counter' && (
                      <div className="p-4 rounded-[6px] bg-[#0a0a0a] border border-[#141414] space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-mono text-neutral-400">Cancellable Query Status</span>
                          <span className={`text-xs font-mono font-bold uppercase ${
                            dbQueryStatus === 'executing' ? 'text-amber-400 animate-pulse' :
                            dbQueryStatus === 'aborted' ? 'text-red-500' :
                            dbQueryStatus === 'completed' ? 'text-emerald-500' : 'text-neutral-500'
                          }`}>
                            {dbQueryStatus === 'idle' ? 'Ready' : dbQueryStatus}
                          </span>
                        </div>

                        {dbQueryStatus === 'executing' && (
                          <div className="p-3 rounded-[6px] bg-neutral-950/40 border border-[#141414] space-y-2.5">
                            <div className="text-[10px] font-mono text-neutral-500">
                              SQL Thread: <span className="text-neutral-400">SELECT * FROM users</span>
                            </div>
                            <div className="flex items-center gap-2 text-xs font-mono text-neutral-300">
                              <RefreshCw className="w-3.5 h-3.5 animate-spin text-neutral-400 shrink-0" />
                              <span className="font-medium">Running</span>
                              <span className="inline-flex items-center gap-0.5 ml-0.5">
                                <motion.span 
                                  animate={{ y: [0, -3, 0] }} 
                                  transition={{ repeat: Infinity, duration: 0.8, delay: 0 }} 
                                  className="w-1 h-1 rounded-full bg-neutral-300" 
                                />
                                <motion.span 
                                  animate={{ y: [0, -3, 0] }} 
                                  transition={{ repeat: Infinity, duration: 0.8, delay: 0.15 }} 
                                  className="w-1 h-1 rounded-full bg-neutral-300" 
                                />
                                <motion.span 
                                  animate={{ y: [0, -3, 0] }} 
                                  transition={{ repeat: Infinity, duration: 0.8, delay: 0.3 }} 
                                  className="w-1 h-1 rounded-full bg-neutral-300" 
                                />
                              </span>
                              <span className="text-neutral-500 ml-auto">{queryProgress}%</span>
                            </div>
                          </div>
                        )}

                        {dbQueryStatus === 'aborted' && (
                          <p className="text-[11px] text-red-400 font-mono flex items-center gap-1.5">
                            <Zap className="w-3.5 h-3.5 text-red-500 shrink-0" />
                            <span>Connection aborted. Database thread killed immediately. Zero wasted IOPS!</span>
                          </p>
                        )}

                        {dbQueryStatus === 'completed' && (
                          <p className="text-[11px] text-emerald-400 font-mono flex items-center gap-1.5">
                            <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                            <span>Query finished successfully. Transferred 42 records in 1.4ms.</span>
                          </p>
                        )}

                        <div className="grid grid-cols-2 gap-2">
                          <button
                            id="demo-start-query-btn"
                            disabled={dbQueryStatus === 'executing'}
                            onClick={startCancellationDemo}
                            className={`py-2 px-3 rounded-[6px] text-xs font-mono font-medium border transition-all active:scale-95 relative overflow-hidden group ${
                              dbQueryStatus === 'executing'
                                ? 'bg-neutral-950 border-[#141414] text-neutral-600 cursor-not-allowed'
                                : 'bg-[#0a0a0a] border-[#141414] text-white'
                            }`}
                          >
                            {dbQueryStatus !== 'executing' && (
                              <svg className="absolute inset-0 w-full h-full pointer-events-none rounded-[6px]" style={{ overflow: 'visible' }}>
                                <motion.rect
                                  x="0.5"
                                  y="0.5"
                                  width="calc(100% - 1px)"
                                  height="calc(100% - 1px)"
                                  rx="6"
                                  stroke="rgba(255, 255, 255, 0.35)"
                                  strokeWidth="1.2"
                                  strokeDasharray="30 90"
                                  fill="none"
                                  animate={{
                                    strokeDashoffset: [0, -240]
                                  }}
                                  transition={{
                                    repeat: Infinity,
                                    duration: 2.5,
                                    ease: "linear"
                                  }}
                                />
                              </svg>
                            )}
                            <span className="relative z-10">Execute Query</span>
                          </button>
                          <button
                            id="demo-abort-query-btn"
                            disabled={dbQueryStatus !== 'executing'}
                            onClick={abortCancellationDemo}
                            className={`py-2 rounded-[6px] text-xs font-mono border transition-all active:scale-95 ${
                              dbQueryStatus !== 'executing'
                                ? 'bg-neutral-950 border-[#141414] text-neutral-600 cursor-not-allowed'
                                : 'bg-red-950/40 hover:bg-red-900/40 text-red-200 border-red-900/60'
                            }`}
                          >
                            Abort Request
                          </button>
                        </div>
                      </div>
                    )}

                    {activeSnippetKey === 'actions' && (
                      <div className="p-4 rounded-[6px] bg-[#0a0a0a] border border-[#141414] space-y-3">
                        <div className="flex justify-between items-center text-xs font-mono text-neutral-400">
                          <span>JobQueue: ai-inference</span>
                          <span className="text-[11px] text-neutral-500">Concurrency: 5</span>
                        </div>
                        
                        <div className="space-y-1.5">
                          {jobsList.map((job) => (
                            <div key={job.id} className="p-2 rounded-[6px] bg-neutral-900/60 border border-[#141414] text-[11px] font-mono flex items-center justify-between">
                              <span className="text-neutral-300">{job.task}</span>
                              <span className={`px-1.5 py-0.5 rounded-[4px] text-[9px] font-bold uppercase ${
                                job.status === 'completed' ? 'bg-emerald-950/80 text-emerald-400' :
                                job.status === 'active' ? 'bg-amber-950/80 text-amber-400 animate-pulse' :
                                'bg-neutral-950 text-neutral-400'
                              }`}>
                                {job.status}
                              </span>
                            </div>
                          ))}
                        </div>

                        <button
                          id="demo-dispatch-action-btn"
                          onClick={dispatchJob}
                          className="w-full py-2 rounded-[6px] bg-[#0a0a0a] border border-[#141414] text-white font-semibold text-xs font-mono transition-all active:scale-95 relative overflow-hidden group"
                        >
                          <svg className="absolute inset-0 w-full h-full pointer-events-none rounded-[6px]" style={{ overflow: 'visible' }}>
                            <motion.rect
                              x="0.5"
                              y="0.5"
                              width="calc(100% - 1px)"
                              height="calc(100% - 1px)"
                              rx="6"
                              stroke="rgba(255, 255, 255, 0.35)"
                              strokeWidth="1.2"
                              strokeDasharray="30 90"
                              fill="none"
                              animate={{
                                strokeDashoffset: [0, -240]
                              }}
                              transition={{
                                repeat: Infinity,
                                duration: 2.5,
                                ease: "linear"
                              }}
                            />
                          </svg>
                          <span className="relative z-10">Dispatch Job (15s Delay)</span>
                        </button>
                      </div>
                    )}

                    {activeSnippetKey === 'edge-routing' && (
                      <div className="p-4 rounded-[6px] bg-[#0a0a0a] border border-[#141414] space-y-4">
                        <div className="flex justify-between items-center text-xs font-mono text-neutral-400">
                          <span>Cache Target: global-telemetry</span>
                          <span className={`text-[11px] font-bold ${cacheHit ? 'text-emerald-400' : 'text-red-400'}`}>
                            {cacheHit ? 'CACHE HIT (Fresh)' : 'CACHE MISS'}
                          </span>
                        </div>

                        <div className="grid grid-cols-2 gap-2 text-center text-xs font-mono">
                          <div className="p-2 rounded-[6px] bg-neutral-900 border border-[#141414]">
                            <div className="text-neutral-400 text-[10px]">Response TTL</div>
                            <div className="text-white font-bold">{cacheHit ? '282s' : '0s'}</div>
                          </div>
                          <div className="p-2 rounded-[6px] bg-neutral-900 border border-[#141414]">
                            <div className="text-neutral-400 text-[10px]">Median TTFB</div>
                            <div className="text-white font-bold">{cacheHit ? '0.4ms' : '2.4ms'}</div>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                          <button
                            id="demo-query-cache-btn"
                            onClick={triggerCacheQuery}
                            className="py-2 rounded-[6px] bg-[#0a0a0a] border border-[#141414] text-white text-xs font-mono font-semibold transition-all active:scale-95 relative overflow-hidden group"
                          >
                            <svg className="absolute inset-0 w-full h-full pointer-events-none rounded-[6px]" style={{ overflow: 'visible' }}>
                              <motion.rect
                                x="0.5"
                                y="0.5"
                                width="calc(100% - 1px)"
                                height="calc(100% - 1px)"
                                rx="6"
                                stroke="rgba(255, 255, 255, 0.35)"
                                strokeWidth="1.2"
                                strokeDasharray="30 90"
                                fill="none"
                                animate={{
                                  strokeDashoffset: [0, -240]
                                }}
                                transition={{
                                  repeat: Infinity,
                                  duration: 2.5,
                                  ease: "linear"
                                }}
                              />
                            </svg>
                            <span className="relative z-10">Query Endpoint</span>
                          </button>
                          <button
                            id="demo-invalidate-cache-btn"
                            onClick={invalidateCache}
                            className="py-2 rounded-[6px] bg-neutral-900 hover:bg-neutral-800 text-neutral-300 text-xs font-mono border border-[#141414] transition-all active:scale-95"
                          >
                            Invalidate Cache
                          </button>
                        </div>
                      </div>
                    )}

                    {activeSnippetKey === 'streaming' && (
                      <div className="p-4 rounded-[6px] bg-[#0a0a0a] border border-[#141414] space-y-4">
                        <div className="flex justify-between items-center text-xs font-mono text-neutral-400">
                          <span>Cryptographic Session Validation</span>
                          <span className={`text-[11px] font-bold ${sessionAuthenticated ? 'text-emerald-400' : 'text-red-400'}`}>
                            {sessionAuthenticated ? 'Verified (Ed25519)' : 'No Valid Session'}
                          </span>
                        </div>

                        <div className="p-3 rounded-[6px] bg-neutral-950 text-neutral-300 font-mono text-[11px] border border-[#141414] space-y-1 overflow-hidden text-ellipsis">
                          <div className="text-neutral-500">Cookie Signature:</div>
                          <div className="text-white break-all text-[10px]">
                            {sessionAuthenticated 
                              ? 'ryvax_session=eyU9d...Ghj82a1L.sig_8df7a834b'
                              : 'undefined'
                            }
                          </div>
                        </div>

                        <button
                          id="demo-toggle-session-btn"
                          onClick={toggleSession}
                          className="w-full py-2 rounded-[6px] bg-[#0a0a0a] border border-[#141414] text-white font-semibold text-xs font-mono transition-all active:scale-95 relative overflow-hidden group"
                        >
                          <svg className="absolute inset-0 w-full h-full pointer-events-none rounded-[6px]" style={{ overflow: 'visible' }}>
                            <motion.rect
                              x="0.5"
                              y="0.5"
                              width="calc(100% - 1px)"
                              height="calc(100% - 1px)"
                              rx="6"
                              stroke="rgba(255, 255, 255, 0.35)"
                              strokeWidth="1.2"
                              strokeDasharray="30 90"
                              fill="none"
                              animate={{
                                strokeDashoffset: [0, -240]
                              }}
                              transition={{
                                repeat: Infinity,
                                duration: 2.5,
                                ease: "linear"
                              }}
                            />
                          </svg>
                          <span className="relative z-10">
                            {sessionAuthenticated ? 'Revoke Session Token' : 'Sign & Generate Token'}
                          </span>
                        </button>
                      </div>
                    )}
                  </div>
                )}

                {/* 2. Console Trace Tab */}
                {activeTab === 'console' && (
                  <div className="space-y-2 font-mono text-xs text-neutral-300">
                    <div className="text-neutral-500 pb-2 border-b border-[#141414] flex justify-between">
                      <span>V8 Runtime Diagnostics</span>
                      <span>Log level: Verbose</span>
                    </div>
                    {executionLogs.map((log, i) => {
                      const { icon, cleanLog } = getLogDetails(log);
                      return (
                        <div key={i} className="p-2.5 rounded-[6px] bg-[#0c0c0c] border border-[#141414] text-[11px] flex items-center gap-2.5 font-mono">
                          <span className="shrink-0">{icon}</span>
                          <span className="text-neutral-300 leading-relaxed">{cleanLog}</span>
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* 3. Flamegraph Tab */}
                {activeTab === 'flamegraph' && (
                  <div className="space-y-3 font-mono text-xs">
                    <div className="text-neutral-500 pb-2 border-b border-[#141414] flex justify-between">
                      <span>Request Lifecycle Flamegraph</span>
                      <span>Total: 8.4ms</span>
                    </div>

                    <div className="space-y-1.5 text-[11px]">
                      <div>
                        <div className="flex justify-between text-neutral-400 mb-0.5">
                          <span>1. TLS 1.3 Handshake</span>
                          <span>1.2ms</span>
                        </div>
                        <div className="w-full h-2 rounded-[6px] bg-neutral-900 overflow-hidden">
                          <div className="bg-neutral-600 h-full w-[14%]" />
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between text-neutral-400 mb-0.5">
                          <span>2. Edge BGP Router</span>
                          <span>0.8ms</span>
                        </div>
                        <div className="w-full h-2 rounded-[6px] bg-neutral-900 overflow-hidden">
                          <div className="bg-neutral-500 h-full w-[10%]" />
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between text-neutral-400 mb-0.5">
                          <span>3. Ed25519 Token Validation</span>
                          <span>0.4ms</span>
                        </div>
                        <div className="w-full h-2 rounded-[6px] bg-neutral-900 overflow-hidden">
                          <div className="bg-neutral-400 h-full w-[6%]" />
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between text-neutral-300 mb-0.5 font-bold">
                          <span>4. Island Signal Hydration</span>
                          <span>1.9ms</span>
                        </div>
                        <div className="w-full h-2 rounded-[6px] bg-neutral-900 overflow-hidden">
                          <div className="bg-white h-full w-[24%]" />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* 4. Payload Tab */}
                {activeTab === 'payload' && (
                  <div className="space-y-3 font-mono text-xs">
                    <div className="text-neutral-500 pb-2 border-b border-[#141414] flex justify-between">
                      <span>Zstandard Datagram Inspector</span>
                      <span>Ratio: -86%</span>
                    </div>

                    <div className="p-3 rounded-[6px] bg-[#0a0a0a] border border-[#141414] space-y-2 text-[11px] text-neutral-300">
                      <div className="flex justify-between">
                        <span className="text-neutral-500">Uncompressed AST:</span>
                        <span>14.8 kB</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-neutral-500">Zstandard Wire Size:</span>
                        <span className="text-white font-bold">2.1 kB</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-neutral-500">HTTP/3 Multiplex Streams:</span>
                        <span>Enabled</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* DevTools Action Button */}
                <div className="mt-4 pt-3 border-t border-[#141414] flex items-center justify-between">
                  <span className="text-[11px] font-mono text-neutral-500">
                    Live Session Active
                  </span>
                  <button
                    id="execute-snippet-btn"
                    onClick={handleTriggerAction}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-[6px] bg-[#0a0a0a] text-white text-xs font-mono border border-[#141414] transition-all active:scale-95 relative overflow-hidden group"
                  >
                    <svg className="absolute inset-0 w-full h-full pointer-events-none rounded-[6px]" style={{ overflow: 'visible' }}>
                      <motion.rect
                        x="0.5"
                        y="0.5"
                        width="calc(100% - 1px)"
                        height="calc(100% - 1px)"
                        rx="6"
                        stroke="rgba(255, 255, 255, 0.35)"
                        strokeWidth="1.2"
                        strokeDasharray="30 90"
                        fill="none"
                        animate={{
                          strokeDashoffset: [0, -240]
                        }}
                        transition={{
                          repeat: Infinity,
                          duration: 2.5,
                          ease: "linear"
                        }}
                      />
                    </svg>
                    <Play className="w-3 h-3 text-white relative z-10 group-hover:scale-110 transition-transform" />
                    <span className="relative z-10">Run Mutation</span>
                  </button>
                </div>

              </div>

            </div>

          </div>

        </motion.div>

      </div>
    </section>
  );
};
