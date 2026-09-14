import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { FAQS } from '../data/frameworkData';

export const FaqSection: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>(null);

  const toggleFaq = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section className="py-16 md:py-24 bg-[#0a0a0a]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        
        {/* Header Block */}
        <div className="max-w-3xl mb-14">
          <span className="text-[12px] font-mono tracking-[0.1em] text-[#898989] uppercase block mb-3">
            FREQUENTLY ASKED QUESTIONS
          </span>
          <h2 className="text-3xl sm:text-[36px] font-normal tracking-[-0.007em] leading-[1.2] text-[#fafafa] font-serif italic">
            Everything you need to know
          </h2>
        </div>

        {/* Clean Accordion List */}
        <div className="divide-y divide-[#141414] border-y border-[#141414]">
          {FAQS.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div key={faq.id} className="py-5">
                <button
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full flex items-center justify-between text-left group"
                >
                  <span className="text-[16px] font-normal text-[#fafafa] group-hover:text-white transition-colors pr-6 tracking-[-0.007em]">
                    {faq.question}
                  </span>
                  <div className="w-6 h-6 flex items-center justify-center text-[#898989] group-hover:text-[#fafafa] shrink-0">
                    {isOpen ? (
                      <Minus className="w-4 h-4 text-[#fafafa]" />
                    ) : (
                      <Plus className="w-4 h-4" />
                    )}
                  </div>
                </button>

                {isOpen && (
                  <div className="mt-3 pr-12 text-[14px] text-[#b4b4b4] leading-[1.5] tracking-[-0.007em]">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
