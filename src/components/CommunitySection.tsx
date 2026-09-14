import React, { useState } from 'react';
import { 
  Users, 
  MessageSquare, 
  Github, 
  Mail, 
  Check, 
  ArrowRight, 
  Sparkle, 
  Heart,
  Quote,
  ShieldCheck,
  Send
} from 'lucide-react';
import { FRAMEWORK_META } from '../data/frameworkData';

export const CommunitySection: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
    setTimeout(() => {
      setEmail('');
    }, 3000);
  };

  const testimonials = [
    {
      quote: "Ryvax completely rewrote our cost model for edge microservices. Moving from monolithic SSR to fine-grained signal streaming dropped our 99th percentile latency from 140ms down to 12ms.",
      author: "Elena Rostova",
      role: "VP of Engineering",
      company: "Krypton Global Media",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=160&q=80"
    },
    {
      quote: "Zero-codegen typed RPC is a breath of fresh air. We threw away three distinct build steps and 4,000 lines of OpenAPI glue code. It just compiles cleanly into edge dispatchers.",
      author: "Marcus Chen",
      role: "Staff Infrastructure Architect",
      company: "Aether Dynamics",
      avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=160&q=80"
    },
    {
      quote: "The built-in CRDT state fabric enabled our distributed whiteboard team to achieve real-time peer sync in under 48 hours. The WinterCG standard compliance is the real deal.",
      author: "Hannah Lindqvist",
      role: "Lead Platform Engineer",
      company: "Synthetix Labs",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=160&q=80"
    }
  ];

  return (
    <section id="community" className="py-24 bg-[#0a0a0a] border-b border-[#141414]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-[6px] bg-[#0a0a0a] border border-[#141414] text-xs font-mono text-neutral-300 mb-3">
            <Users className="w-3.5 h-3.5" />
            <span>Developer Ecosystem</span>
          </div>
          <h2 id="community-title" className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-display">
            Engineered in Public.
          </h2>
          <p className="mt-3 text-neutral-400 text-sm sm:text-base font-normal leading-relaxed">
            Join over 14,000 systems developers in our community discussing compiler RFCs, edge performance regressions, and mission-critical production clusters.
          </p>
        </div>

        {/* Community Channel Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-16">
          
          {/* Discord Card */}
          <div className="p-6 rounded-[6px] bg-[#0a0a0a] border border-[#141414] hover:border-neutral-700 transition-all flex flex-col justify-between">
            <div>
              <div className="w-9 h-9 rounded-[6px] bg-neutral-900 border border-[#141414] flex items-center justify-center text-white mb-4">
                <MessageSquare className="w-4 h-4" />
              </div>
              <h3 className="text-lg font-bold text-white tracking-tight font-display">
                Community Discord
              </h3>
              <p className="text-xs text-neutral-400 mt-1.5 leading-relaxed">
                Connect with the core compiler team, troubleshoot edge setups in #help-desk, and share production milestones.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-[#141414] flex items-center justify-between">
              <span className="text-xs font-mono text-neutral-400">
                14,200+ members online
              </span>
              <a
                href="https://discord.com"
                target="_blank"
                rel="noreferrer"
                className="text-xs font-semibold text-white hover:text-neutral-300 flex items-center gap-1"
              >
                <span>Join Discord</span>
                <ArrowRight className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* GitHub Repository Card */}
          <div className="p-6 rounded-[6px] bg-[#0a0a0a] border border-[#141414] hover:border-neutral-700 transition-all flex flex-col justify-between">
            <div>
              <div className="w-9 h-9 rounded-[6px] bg-neutral-900 border border-[#141414] flex items-center justify-center text-white mb-4">
                <Github className="w-4 h-4" />
              </div>
              <h3 className="text-lg font-bold text-white tracking-tight font-display">
                GitHub Repository
              </h3>
              <p className="text-xs text-neutral-400 mt-1.5 leading-relaxed">
                Review source code, inspect pull request reviews, submit reproducible bug reports, and track milestones.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-[#141414] flex items-center justify-between">
              <span className="text-xs font-mono text-neutral-400">
                28,400+ stars on GitHub
              </span>
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="text-xs font-semibold text-white hover:text-neutral-300 flex items-center gap-1"
              >
                <span>Browse Code</span>
                <ArrowRight className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Technical Newsletter Card */}
          <div className="p-6 rounded-[6px] bg-[#0a0a0a] border border-[#141414] hover:border-neutral-700 transition-all flex flex-col justify-between">
            <div>
              <div className="w-9 h-9 rounded-[6px] bg-neutral-900 border border-[#141414] flex items-center justify-center text-white mb-4">
                <Mail className="w-4 h-4" />
              </div>
              <h3 className="text-lg font-bold text-white tracking-tight font-display">
                Systems Dispatch
              </h3>
              <p className="text-xs text-neutral-400 mt-1.5 leading-relaxed">
                Bi-weekly deep dive into systems programming, V8 isolate optimizations, and WinterCG standardization.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-[#141414]">
              {subscribed ? (
                <div className="flex items-center gap-2 text-xs font-mono text-white py-2">
                  <Check className="w-4 h-4 text-white" />
                  <span>Subscribed to Systems Dispatch!</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex gap-2">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="architect@company.com"
                    className="flex-1 px-3 py-1.5 rounded-[6px] bg-[#0a0a0a] border border-[#141414] text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-neutral-500"
                    required
                  />
                  <button
                    type="submit"
                    className="px-3 py-1.5 rounded-[6px] bg-white hover:bg-neutral-200 text-black text-xs font-semibold shrink-0 transition-colors"
                  >
                    Join
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>

        {/* Enterprise & Production Testimonials */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <span className="text-xs font-mono text-neutral-400 uppercase tracking-wider block mb-1">
              Production Case Studies
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-white font-display">
              Trusted in Mission-Critical Clusters
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {testimonials.map((t, idx) => (
              <div 
                key={idx}
                className="p-6 rounded-[6px] bg-[#0a0a0a] border border-[#141414] flex flex-col justify-between relative"
              >
                <div className="mb-4">
                  <Quote className="w-5 h-5 text-neutral-600 mb-3" />
                  <p className="text-xs text-neutral-300 leading-relaxed italic">
                    "{t.quote}"
                  </p>
                </div>

                <div className="pt-4 border-t border-[#141414] flex items-center gap-3">
                  <img 
                    src={t.avatar} 
                    alt={t.author} 
                    referrerPolicy="no-referrer"
                    className="w-9 h-9 rounded-[6px] object-cover border border-[#141414] grayscale"
                  />
                  <div>
                    <div className="text-xs font-bold text-white font-display">
                      {t.author}
                    </div>
                    <div className="text-[11px] text-neutral-400 font-mono">
                      {t.role} • {t.company}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
