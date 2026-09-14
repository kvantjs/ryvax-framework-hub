import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Terminal, 
  Copy, 
  Check, 
  ChevronRight,
  Play
} from 'lucide-react';
import { FRAMEWORK_META } from '../data/frameworkData';
import { HeroGradientBackground } from './HeroGradientBackground';
import { CodeHighlighter } from './CodeHighlighter';
import { React as ReactIcon, Typescript as TypescriptIcon } from '@thesvg/react';

interface HeroProps {
  onOpenDocs: () => void;
  onOpenScaffold: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenDocs, onOpenScaffold }) => {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'route' | 'signals' | 'action'>('route');
  const [executing, setExecuting] = useState(false);
  const [consoleLogs, setConsoleLogs] = useState<string[]>([
    'isolate-01: ready on 312 PoPs',
    'cold start: 0.82ms | V8 heap: 4.2MB'
  ]);

  // Premium typing state machine
  const words = [
    'Scale to billions.',
    'Deploy in seconds.',
    'Run anywhere.',
    'Zero cold starts.',
    'Hydrate instantly.'
  ];
  const [wordIndex, setWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(100);

  useEffect(() => {
    const fullWord = words[wordIndex];
    
    const handleType = () => {
      if (!isDeleting) {
        // Typing letters
        const nextText = fullWord.substring(0, currentText.length + 1);
        setCurrentText(nextText);
        setTypingSpeed(100);

        if (nextText === fullWord) {
          // Finished typing word, hold it for 2s
          setTypingSpeed(2200);
          setIsDeleting(true);
        }
      } else {
        // Deleting letters
        const nextText = fullWord.substring(0, currentText.length - 1);
        setCurrentText(nextText);
        setTypingSpeed(40); // faster backspace

        if (nextText === '') {
          setIsDeleting(false);
          setWordIndex((prev) => (prev + 1) % words.length);
          setTypingSpeed(300); // pause before next word
        }
      }
    };

    const timer = setTimeout(handleType, typingSpeed);
    return () => clearTimeout(timer);
  }, [currentText, isDeleting, wordIndex, typingSpeed]);

  const handleCopyCli = () => {
    navigator.clipboard.writeText(FRAMEWORK_META.cliCommand);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRunSample = () => {
    setExecuting(true);
    setTimeout(() => {
      setExecuting(false);
      setConsoleLogs((prev) => [
        ...prev.slice(-3),
        `RPC dispatch -> ${activeTab} handler resolved in 0.94ms [OK]`
      ]);
    }, 380);
  };

  const codeSnippets = {
    route: `// src/routes/dashboard/+page.tsx
import { signal, component } from 'ryvax';
import { fetchMetrics } from './actions';

export default component(() => {
  const telemetry = signal({ latency: 0.8, reqs: '4.2M/s' });
  return (
    <div className="telemetry-node">
      <span>Latency: {telemetry.value.latency}ms</span>
    </div>
  );
});`,
    signals: `// src/primitives/signals.ts
import { createSignal, createEffect } from 'ryvax';

// Zero Virtual DOM - Direct target DOM pointer mutation
export const activeWorkers = createSignal(312);
export const p99Latency = createSignal(1.4);

createEffect(() => {
  // Dispatches isolate heartbeat across WinterCG mesh
  console.log(\`[Mesh] PoPs synchronized: \${activeWorkers()}\`);
});`,
    action: `// src/routes/dashboard/actions.ts
'use server';
import { action } from 'ryvax';
import { db } from '@/server/database';

export const dispatchTask = action(async (payload: { id: string }) => {
  // Statically compiled into isolated WinterCG micro-lambda
  const record = await db.tasks.update({
    where: { id: payload.id },
    data: { status: 'dispatched' }
  });
  return { ok: true, timestamp: Date.now() };
});`
  };

  return (
    <section id="overview" className="relative pt-32 pb-16 md:pt-40 md:pb-24 bg-[#0a0a0a] overflow-hidden">
      {/* Aurora JSON Blend Gradient Background */}
      <HeroGradientBackground />

      <div className="relative z-10 max-w-[1200px] mx-auto px-4 sm:px-6">
        
        {/* Centered Hero Header */}
        <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
          
          {/* Announcement Badge */}
          <div className="mb-8">
            <a 
              href="#performance"
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-[6px] bg-[#0a0a0a] border border-[#141414] text-[12px] font-normal text-[#b4b4b4] hover:text-[#fafafa] transition-all"
            >
              <span>Introducing Ryvax 2.4 with WinterCG isolate mesh</span>
              <ChevronRight className="w-3.5 h-3.5 text-[#b4b4b4]" />
            </a>
          </div>

          {/* Display headline */}
          <h1 className="text-4xl sm:text-6xl md:text-[72px] font-normal tracking-[-0.007em] leading-[1.0] text-[#fafafa] font-sans">
            Build in a <span className="font-serif italic text-white/95 font-light">weekend</span>.<br />
            <span className="text-[#898989] inline-flex items-center min-h-[1.1em]">
              {currentText}
              <span className="inline-block w-[3px] h-[0.8em] bg-current ml-2 align-middle animate-blink" />
            </span>
          </h1>

          {/* Subtitle */}
          <p className="mt-6 text-[16px] leading-[1.5] text-[#b4b4b4] font-normal max-w-2xl tracking-[-0.007em]">
            Ryvax is an open-source full-stack framework with zero hydration penalty. 
            Write reactive signals on the client and type-safe actions on the edge without boilerplate glue.
          </p>

          {/* Action buttons */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              id="hero-start-project-btn"
              onClick={onOpenScaffold}
              className="px-5 py-2.5 rounded-[6px] bg-[#0a0a0a] text-[#fafafa] border border-[#141414] hover:text-white text-[14px] font-medium tracking-[-0.007em] transition-all active:scale-[0.98] relative overflow-hidden group min-w-[160px]"
            >
              <svg className="absolute inset-0 w-full h-full pointer-events-none rounded-[6px]" style={{ overflow: 'visible' }}>
                <motion.rect
                  x="0.5"
                  y="0.5"
                  width="calc(100% - 1px)"
                  height="calc(100% - 1px)"
                  rx="6"
                  stroke="rgba(255, 255, 255, 0.25)"
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
              <span className="relative z-10">Start your project</span>
            </button>

            <button
              id="hero-docs-ghost-btn"
              onClick={onOpenDocs}
              className="px-5 py-2.5 rounded-[6px] bg-[#0a0a0a] border border-[#141414] text-[#fafafa] text-[14px] font-normal hover:text-white transition-all relative overflow-hidden group min-w-[160px]"
            >
              <svg className="absolute inset-0 w-full h-full pointer-events-none rounded-[6px]" style={{ overflow: 'visible' }}>
                <motion.rect
                  x="0.5"
                  y="0.5"
                  width="calc(100% - 1px)"
                  height="calc(100% - 1px)"
                  rx="6"
                  stroke="rgba(255, 255, 255, 0.25)"
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
              <span className="relative z-10">Documentation</span>
            </button>
          </div>

        </div>

        {/* Product Showcase Card: Code Editor */}
        <div className="mt-16 max-w-5xl mx-auto">
          <div className="rounded-[6px] bg-[#0a0a0a] border border-[#141414] p-6 overflow-hidden">
            
            {/* Editor Window Header Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#141414] gap-3">
              {/* Window Dots + Title */}
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-[6px] bg-[#0a0a0a] border border-[#141414]" />
                  <div className="w-3 h-3 rounded-[6px] bg-[#0a0a0a] border border-[#141414]" />
                  <div className="w-3 h-3 rounded-[6px] bg-[#0a0a0a] border border-[#141414]" />
                </div>
                {/* File Tabs with React & TypeScript brand logos */}
                <div className="flex items-center gap-1 bg-[#0a0a0a] p-1 rounded-[6px] border border-[#141414]">
                  {[
                    { 
                      id: 'route', 
                      label: '+page.tsx', 
                      icon: <ReactIcon width={14} height={14} className="w-3.5 h-3.5 text-[#38bdf8] fill-current" /> 
                    },
                    { 
                      id: 'signals', 
                      label: 'signals.ts', 
                      icon: <TypescriptIcon width={14} height={14} className="w-3.5 h-3.5 text-[#60a5fa] fill-current rounded-[2px]" /> 
                    },
                    { 
                      id: 'action', 
                      label: 'actions.ts', 
                      icon: <TypescriptIcon width={14} height={14} className="w-3.5 h-3.5 text-[#60a5fa] fill-current rounded-[2px]" /> 
                    },
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id as any)}
                      className={`flex items-center gap-1.5 px-3 py-1 rounded-[6px] text-[12px] font-mono transition-colors ${
                        activeTab === tab.id
                          ? 'bg-[#141414] text-[#fafafa] border border-[#262626] font-medium'
                          : 'text-[#898989] hover:text-[#b4b4b4]'
                      }`}
                    >
                      {tab.icon}
                      <span>{tab.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* CLI Command + Action buttons */}
              <div className="flex items-center gap-2">
                <button
                  onClick={handleRunSample}
                  disabled={executing}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[6px] bg-[#0a0a0a] border border-[#141414] text-[12px] text-[#fafafa] font-mono transition-colors hover:text-white"
                >
                  <Play className="w-3 h-3 text-[#fafafa]" />
                  <span>{executing ? 'Executing...' : 'Run Test'}</span>
                </button>

                <button
                  onClick={handleCopyCli}
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-[6px] bg-[#0a0a0a] border border-[#141414] text-[12px] font-mono text-[#b4b4b4] transition-colors hover:text-white"
                >
                  <Terminal className="w-3.5 h-3.5 text-[#898989]" />
                  <span>{FRAMEWORK_META.cliCommand}</span>
                  {copied ? (
                    <Check className="w-3.5 h-3.5 text-[#fafafa]" />
                  ) : (
                    <Copy className="w-3.5 h-3.5 text-[#898989]" />
                  )}
                </button>
              </div>
            </div>

            {/* Code Body Area */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 pt-4">
              
              {/* Code Text Area with Syntax Highlighting */}
              <div className="lg:col-span-8 bg-[#0a0a0a] rounded-[6px] border border-[#141414] p-3 font-mono text-[12px] leading-[1.6] overflow-x-auto">
                <CodeHighlighter 
                  code={codeSnippets[activeTab]} 
                  showLineNumbers={true}
                  className="bg-transparent"
                />
              </div>

              {/* Schematic Wireframe & Telemetry Output Column represented as ultra-modern animated Skeletons */}
              <div className="lg:col-span-4 flex flex-col justify-between gap-4">
                {/* Metrics Skeleton Box */}
                <div className="relative overflow-hidden bg-[#0d0d0d] rounded-[6px] border border-white/[0.04] p-5 flex flex-col justify-between h-[165px] transition-all duration-300">
                  {/* Subtle Continuous Shimmer Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.03] to-transparent -translate-x-full animate-shimmer pointer-events-none" />
                  
                  {/* Header Row */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-[2px] bg-white/[0.08]" />
                      <div className="h-2 w-20 bg-white/[0.08] rounded" />
                    </div>
                    <div className="w-8 h-2 bg-white/[0.04] rounded" />
                  </div>
                  
                  {/* Detailed structural pulsing bars */}
                  <div className="space-y-3.5 my-auto">
                    <div className="space-y-2">
                      <div className="h-1.5 w-full bg-white/[0.06] rounded animate-pulse" />
                      <div className="h-1.5 w-2/3 bg-white/[0.04] rounded animate-pulse" />
                    </div>
                    
                    {/* Minimalist divided grid layout representation */}
                    <div className="grid grid-cols-3 gap-2 pt-1">
                      <div className="space-y-1">
                        <div className="h-1 w-8 bg-white/[0.04] rounded" />
                        <div className="h-1.5 w-12 bg-white/[0.08] rounded animate-pulse" />
                      </div>
                      <div className="space-y-1">
                        <div className="h-1 w-6 bg-white/[0.04] rounded" />
                        <div className="h-1.5 w-10 bg-white/[0.08] rounded animate-pulse" />
                      </div>
                      <div className="space-y-1">
                        <div className="h-1 w-8 bg-white/[0.04] rounded" />
                        <div className="h-1.5 w-8 bg-white/[0.08] rounded animate-pulse" />
                      </div>
                    </div>
                  </div>

                  {/* Footer Row */}
                  <div className="flex items-center justify-between pt-2 border-t border-white/[0.03]">
                    <div className="h-1.5 w-16 bg-white/[0.04] rounded" />
                    <div className="h-1.5 w-6 bg-white/[0.04] rounded" />
                  </div>
                </div>

                {/* Console Terminal Skeleton Box */}
                <div className="relative overflow-hidden bg-[#0d0d0d] rounded-[6px] border border-white/[0.04] p-5 flex flex-col justify-between h-[155px] transition-all duration-300">
                  {/* Subtle Continuous Shimmer Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.03] to-transparent -translate-x-full animate-shimmer pointer-events-none" />

                  {/* Header Row */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-2 bg-white/[0.08] rounded-[1px]" />
                      <div className="h-2 w-24 bg-white/[0.08] rounded animate-pulse" />
                    </div>
                    <div className="flex gap-1">
                      <div className="w-1 h-1 rounded-full bg-white/[0.08]" />
                      <div className="w-1 h-1 rounded-full bg-white/[0.08]" />
                    </div>
                  </div>

                  {/* Text-trace skeleton lines */}
                  <div className="space-y-3 py-1">
                    <div className="flex items-center justify-between">
                      <div className="h-1.5 w-1/2 bg-white/[0.06] rounded animate-pulse" />
                      <div className="h-1 w-6 bg-white/[0.03] rounded" />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="h-1.5 w-3/4 bg-white/[0.04] rounded animate-pulse" />
                      <div className="h-1 w-8 bg-white/[0.03] rounded" />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="h-1.5 w-5/12 bg-white/[0.05] rounded animate-pulse" />
                      <div className="h-1 w-5 bg-white/[0.03] rounded" />
                    </div>
                  </div>

                  {/* Footer Row */}
                  <div className="flex items-center justify-between pt-2 border-t border-white/[0.03]">
                    <div className="h-1 w-12 bg-white/[0.04] rounded" />
                    <div className="h-1.5 w-20 bg-white/[0.04] rounded animate-pulse" />
                  </div>
                </div>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
