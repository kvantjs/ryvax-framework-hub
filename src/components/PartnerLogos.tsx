import React from 'react';
import { 
  Supabase, 
  Cloudflare, 
  Linear, 
  Drizzle, 
  FlyIo, 
  Fastly, 
  Prisma, 
  React as ReactLogo,
  Vercel,
  Manus,
  Netlify,
  Mintlify,
  AiStudioGoogle,
  Scalar
} from '@thesvg/react';

export const PartnerLogos: React.FC = () => {
  const partners = [
    { 
      name: 'Supabase', 
      tag: 'POSTGRES',
      Icon: Supabase
    },
    { 
      name: 'Cloudflare', 
      tag: 'EDGE COMPUTE',
      Icon: Cloudflare
    },
    { 
      name: 'Linear', 
      tag: 'SYNC ENGINE',
      Icon: Linear
    },
    { 
      name: 'Vercel', 
      tag: 'FRONTEND CLOUD',
      Icon: Vercel
    },
    { 
      name: 'Manus AI', 
      tag: 'AGENT LAYER',
      Icon: Manus
    },
    { 
      name: 'Netlify', 
      tag: 'APP DELIVERY',
      Icon: Netlify
    },
    { 
      name: 'Drizzle', 
      tag: 'ORM ENGINE',
      Icon: Drizzle
    },
    { 
      name: 'Fly.io', 
      tag: 'DISTRIBUTED',
      Icon: FlyIo
    },
    { 
      name: 'Mintlify', 
      tag: 'DEV DOCS',
      Icon: Mintlify
    },
    { 
      name: 'Fastly', 
      tag: 'ISOLATES',
      Icon: Fastly
    },
    { 
      name: 'Google AI Studio', 
      tag: 'AI RUNTIME',
      Icon: AiStudioGoogle
    },
    { 
      name: 'Prisma', 
      tag: 'DATA PLATFORM',
      Icon: Prisma
    },
    { 
      name: 'Scalar', 
      tag: 'API DOCUMENTATION',
      Icon: Scalar
    },
    { 
      name: 'React', 
      tag: 'COMPONENT MODEL',
      Icon: ReactLogo
    },
  ];

  return (
    <section className="py-14 bg-[#0a0a0a] border-y border-[#141414] overflow-hidden">
      <div className="w-full max-w-[1200px] mx-auto px-4 sm:px-6">
        <p className="text-center text-[12px] font-mono tracking-[0.1em] text-[#898989] uppercase mb-8">
          Engineered for modern infrastructure teams & interoperable ecosystems
        </p>
      </div>

      {/* Infinite Scrolling Logo Ticker */}
      <div className="relative w-full overflow-hidden">
        {/* Soft edge masking gradients */}
        <div className="absolute inset-y-0 left-0 w-16 sm:w-32 bg-gradient-to-r from-[#0a0a0a] to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-16 sm:w-32 bg-gradient-to-l from-[#0a0a0a] to-transparent z-10 pointer-events-none" />
        
        {/* Animated Marquee Container */}
        <div className="flex w-max gap-4 sm:gap-5 animate-marquee py-3">
          {[...partners, ...partners, ...partners].map((p, index) => {
            const IconComponent = p.Icon;
            return (
              <div 
                key={`${p.name}-${index}`}
                className="group flex items-center gap-2.5 px-4 py-2 rounded-[6px] bg-[#0d0d0d]/60 border border-white/[0.04] backdrop-blur-sm text-[#898989] hover:text-[#fafafa] hover:bg-white/[0.02] hover:border-white/[0.08] transition-all cursor-default select-none shrink-0"
                title={`${p.name} • ${p.tag}`}
              >
                <div className="w-5 h-5 flex items-center justify-center text-current transition-transform duration-200 group-hover:scale-105">
                  <IconComponent width={20} height={20} className="w-5 h-5 fill-current" />
                </div>
                <span className="font-sans text-[13px] tracking-[-0.007em] font-medium text-inherit">
                  {p.name}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
