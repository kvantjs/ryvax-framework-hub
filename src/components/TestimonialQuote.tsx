import React from 'react';

export const TestimonialQuote: React.FC = () => {
  const testimonials = [
    {
      handle: '@aris_thorne',
      name: 'Aris Thorne',
      role: 'VP Architecture at Waypoint',
      quote: "Our p99 latency plummeted from 140ms to 1.4ms, our AWS invoice dropped by 68%, and our engineers didn't need to learn a complex new mental model.",
      initial: 'AT'
    },
    {
      handle: '@mdev_keller',
      name: 'Maya Keller',
      role: 'Staff Infrastructure Eng',
      quote: "Replacing our OpenAPI generation and Next.js hydration glue with Ryvax co-located actions removed 4,000 lines of brittle boilerplate.",
      initial: 'MK'
    },
    {
      handle: '@dchen_cloud',
      name: 'David Chen',
      role: 'Founder & CTO, HyperScale',
      quote: "We serve 60 million edge requests a day on WinterCG isolates with flat memory usage. Ryvax is the fastest framework we have benchmarked.",
      initial: 'DC'
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-[#0a0a0a]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-[12px] font-mono tracking-[0.1em] text-[#898989] uppercase block mb-3">
            SOCIAL PROOF
          </span>
          <h2 className="text-3xl sm:text-[36px] font-normal tracking-[-0.007em] leading-[1.2] text-[#fafafa] font-serif italic">
            Trusted by teams running at global scale
          </h2>
        </div>

        {/* 3-Column Testimonial Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="rounded-[6px] bg-[#0d0d0d]/40 border border-[#141414] p-6 flex flex-col justify-between transition-colors"
            >
              {/* Quote body with serif italic typography */}
              <p className="text-[15px] text-[#fafafa] font-serif italic leading-[1.6] tracking-[-0.007em] mb-6">
                "{t.quote}"
              </p>

              {/* Author row */}
              <div className="flex items-center gap-3 pt-3 border-t border-[#141414]">
                <div className="w-10 h-10 rounded-[6px] bg-[#0a0a0a] border border-[#141414] flex items-center justify-center text-[#fafafa] font-mono text-[13px] shrink-0">
                  {t.initial}
                </div>
                <div>
                  <div className="text-[14px] font-medium text-[#fafafa] tracking-[-0.007em]">
                    {t.name}
                  </div>
                  <div className="text-[12px] text-[#898989] font-mono">
                    {t.handle} • {t.role}
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
