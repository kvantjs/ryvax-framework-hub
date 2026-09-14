import React, { useState } from 'react';
import { 
  X, 
  Copy, 
  Check, 
  Sparkle
} from 'lucide-react';
import { ProjectTemplateConfig } from '../types';

interface ScaffoldGeneratorProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ScaffoldGenerator: React.FC<ScaffoldGeneratorProps> = ({ isOpen, onClose }) => {
  const [config, setConfig] = useState<ProjectTemplateConfig>({
    template: 'saas',
    database: 'drizzle',
    styling: 'tailwind',
    auth: 'ryvax-vault',
    typescript: true
  });
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const generateCommand = () => {
    const parts = ['pnpm create ryvax@latest my-app'];
    parts.push(`--template ${config.template}`);
    parts.push(`--db ${config.database}`);
    parts.push(`--styling ${config.styling}`);
    if (config.auth !== 'none') {
      parts.push(`--auth ${config.auth}`);
    }
    return parts.join(' ');
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generateCommand());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div 
      id="scaffold-modal-backdrop" 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0a0a0a]/80 backdrop-blur-xs"
      onClick={onClose}
    >
      <div 
        id="scaffold-modal-dialog"
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-2xl rounded-[6px] bg-[#0a0a0a] border border-[#141414] overflow-hidden flex flex-col max-h-[90vh]"
      >
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-[#141414] bg-[#0a0a0a] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-[6px] bg-[#0a0a0a] border border-[#141414] flex items-center justify-center text-[#fafafa]">
              <Sparkle className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-[16px] font-medium text-[#fafafa] tracking-[-0.007em]">
                Project Scaffolding Wizard
              </h3>
              <p className="text-[12px] text-[#898989] font-mono">
                Configure your tailored full-stack Ryvax starter
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-[6px] text-[#898989] hover:text-[#fafafa] bg-[#0a0a0a] border border-[#141414] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-5 overflow-y-auto bg-[#0a0a0a] text-[13px]">
          
          {/* Template Selection */}
          <div className="space-y-2">
            <label className="font-normal text-[#fafafa] block tracking-[-0.007em]">
              Application Template
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { id: 'saas', label: 'Edge SaaS' },
                { id: 'minimal', label: 'Minimal Core' },
                { id: 'edge-api', label: 'Micro-Lambda' },
                { id: 'realtime', label: 'CRDT Live' },
              ].map((tpl) => (
                <button
                  key={tpl.id}
                  onClick={() => setConfig({ ...config, template: tpl.id as any })}
                  className={`p-2.5 rounded-[6px] border border-[#141414] text-left transition-all ${
                    config.template === tpl.id
                      ? 'bg-[#0a0a0a] text-[#fafafa] font-medium'
                      : 'bg-[#0a0a0a] text-[#898989] hover:text-[#fafafa]'
                  }`}
                >
                  {tpl.label}
                </button>
              ))}
            </div>
          </div>

          {/* Database Selection */}
          <div className="space-y-2">
            <label className="font-normal text-[#fafafa] block tracking-[-0.007em]">
              Edge Database & Driver
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { id: 'drizzle', label: 'Drizzle ORM' },
                { id: 'prisma', label: 'Prisma Accelerate' },
                { id: 'kysely', label: 'Kysely SQL' },
                { id: 'none', label: 'No Database' },
              ].map((db) => (
                <button
                  key={db.id}
                  onClick={() => setConfig({ ...config, database: db.id as any })}
                  className={`p-2.5 rounded-[6px] border border-[#141414] text-left transition-all ${
                    config.database === db.id
                      ? 'bg-[#0a0a0a] text-[#fafafa] font-medium'
                      : 'bg-[#0a0a0a] text-[#898989] hover:text-[#fafafa]'
                  }`}
                >
                  {db.label}
                </button>
              ))}
            </div>
          </div>

          {/* Auth Selection */}
          <div className="space-y-2">
            <label className="font-normal text-[#fafafa] block tracking-[-0.007em]">
              Authentication Primitives
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'ryvax-vault', label: 'Ryvax Vault (Ed25519)' },
                { id: 'oauth', label: 'Standard OAuth 2.0' },
                { id: 'none', label: 'Custom Auth' },
              ].map((auth) => (
                <button
                  key={auth.id}
                  onClick={() => setConfig({ ...config, auth: auth.id as any })}
                  className={`p-2.5 rounded-[6px] border border-[#141414] text-left transition-all ${
                    config.auth === auth.id
                      ? 'bg-[#0a0a0a] text-[#fafafa] font-medium'
                      : 'bg-[#0a0a0a] text-[#898989] hover:text-[#fafafa]'
                  }`}
                >
                  {auth.label}
                </button>
              ))}
            </div>
          </div>

          {/* Generated Command Box */}
          <div className="pt-2">
            <div className="p-3.5 rounded-[6px] bg-[#0a0a0a] border border-[#141414] space-y-2">
              <div className="flex items-center justify-between text-[11px] font-mono text-[#898989]">
                <span>CLI EXECUTION SCRIPT</span>
                <span className="text-[#fafafa]">Zero Telemetry</span>
              </div>
              <div className="p-2.5 rounded-[6px] bg-[#0a0a0a] border border-[#141414] font-mono text-[12px] text-[#fafafa] flex items-center justify-between break-all">
                <span>{generateCommand()}</span>
                <button
                  onClick={handleCopy}
                  className="p-1.5 rounded-[6px] bg-[#0a0a0a] border border-[#141414] text-[#898989] hover:text-[#fafafa] ml-2 shrink-0 transition-colors"
                  title="Copy command"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-[#fafafa]" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3.5 border-t border-[#141414] bg-[#0a0a0a] flex items-center justify-between">
          <span className="text-[12px] text-[#898989] font-mono">
            Outputs clean, zero-config TypeScript directory.
          </span>
          <button
            onClick={handleCopy}
            className="px-5 py-2 rounded-[6px] bg-[#0a0a0a] text-[#fafafa] border border-[#141414] hover:text-white text-[13px] font-medium transition-all flex items-center gap-1.5"
          >
            <span>{copied ? 'Copied to Clipboard!' : 'Copy CLI Command'}</span>
          </button>
        </div>

      </div>
    </div>
  );
};
