import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { PartnerLogos } from './components/PartnerLogos';
import { WhyRyvax } from './components/WhyRyvax';
import { InteractivePlayground } from './components/InteractivePlayground';
import { CorePrimitives } from './components/CorePrimitives';
import { ArchitectureSection } from './components/ArchitectureSection';
import { FeaturesGrid } from './components/FeaturesGrid';
import { FeatureSpotlightOne } from './components/FeatureSpotlightOne';
import { FeatureSpotlightTwo } from './components/FeatureSpotlightTwo';
import { RolePersonas } from './components/RolePersonas';
import { TestimonialQuote } from './components/TestimonialQuote';
import { SecurityStandards } from './components/SecurityStandards';
import { IntegrationsSection } from './components/IntegrationsSection';
import { EcosystemSection } from './components/EcosystemSection';
import { ImpactMetrics } from './components/ImpactMetrics';
import { AnimateOnScroll } from './components/AnimateOnScroll';
import { FaqSection } from './components/FaqSection';
import { Footer } from './components/Footer';
import { ScaffoldGenerator } from './components/ScaffoldGenerator';
import { DocsQuickViewModal } from './components/DocsQuickViewModal';

export default function App() {
  const [docsModalOpen, setDocsModalOpen] = useState(false);
  const [scaffoldModalOpen, setScaffoldModalOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('overview');

  // Track active scroll section for navbar indicator
  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        'overview', 
        'why-ryvax', 
        'playground', 
        'primitives', 
        'architecture', 
        'features', 
        'performance', 
        'security', 
        'ecosystem'
      ];
      const scrollPos = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Keyboard shortcut listener (Cmd+K / Ctrl+K for Docs, Escape to close modals)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setDocsModalOpen((prev) => !prev);
      }
      if (e.key === 'Escape') {
        setDocsModalOpen(false);
        setScaffoldModalOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#fafafa] flex flex-col selection:bg-[#262626] selection:text-[#fafafa] font-sans antialiased">
      {/* Navigation Bar */}
      <Navbar 
        onOpenDocs={() => setDocsModalOpen(true)}
        onOpenScaffold={() => setScaffoldModalOpen(true)}
        activeSection={activeSection}
      />

      {/* Main Content Sections faithfully executing the Supabase reference design */}
      <main className="flex-1">
        {/* 1. Hero with Assistant Mockup */}
        <Hero 
          onOpenDocs={() => setDocsModalOpen(true)}
          onOpenScaffold={() => setScaffoldModalOpen(true)}
        />

        {/* 2. Enterprise Ecosystem Partners */}
        <AnimateOnScroll>
          <PartnerLogos />
        </AnimateOnScroll>

        {/* 3. Why Ryvax.js - 3 Cards Section */}
        <AnimateOnScroll>
          <WhyRyvax onOpenDocs={() => setDocsModalOpen(true)} />
        </AnimateOnScroll>

        {/* 4. Interactive Edge Sandbox */}
        <AnimateOnScroll>
          <InteractivePlayground />
        </AnimateOnScroll>

        {/* 5. Core Primitives - 6 Grid Section */}
        <AnimateOnScroll>
          <CorePrimitives onOpenDocs={() => setDocsModalOpen(true)} />
        </AnimateOnScroll>

        {/* 6. Dual-Core Systems Architecture */}
        <AnimateOnScroll>
          <ArchitectureSection />
        </AnimateOnScroll>

        {/* 7. Systems Innovations (Bento grid) */}
        <AnimateOnScroll>
          <FeaturesGrid onOpenDocs={() => setDocsModalOpen(true)} />
        </AnimateOnScroll>

        {/* 8. Edge Compiler Spotlight */}
        <AnimateOnScroll>
          <FeatureSpotlightOne />
        </AnimateOnScroll>

        {/* 9. Performance Spotlight */}
        <AnimateOnScroll>
          <FeatureSpotlightTwo />
        </AnimateOnScroll>

        {/* 11. Built For - Role Personas */}
        <AnimateOnScroll>
          <RolePersonas />
        </AnimateOnScroll>

        {/* 12. Editorial Testimonial Quote & Cards */}
        <AnimateOnScroll>
          <TestimonialQuote />
        </AnimateOnScroll>

        {/* 13. Enterprise-Grade Security */}
        <AnimateOnScroll>
          <SecurityStandards />
        </AnimateOnScroll>

        {/* 14. Integrations & Tooling (IDE, MCP, Platform) */}
        <AnimateOnScroll>
          <IntegrationsSection />
        </AnimateOnScroll>

        {/* 15. The Ryvax Modular Suite */}
        <AnimateOnScroll>
          <EcosystemSection onOpenScaffold={() => setScaffoldModalOpen(true)} />
        </AnimateOnScroll>

        {/* 16. By The Numbers - Impact Metrics */}
        <AnimateOnScroll>
          <ImpactMetrics />
        </AnimateOnScroll>

        {/* 18. Frequently Asked Questions (Accordion) */}
        <AnimateOnScroll>
          <FaqSection />
        </AnimateOnScroll>
      </main>

      {/* Site Footer with Single Dark Band */}
      <Footer 
        onOpenScaffold={() => setScaffoldModalOpen(true)}
        onOpenDocs={() => setDocsModalOpen(true)}
      />

      {/* Interactive Modals */}
      <ScaffoldGenerator 
        isOpen={scaffoldModalOpen}
        onClose={() => setScaffoldModalOpen(false)}
      />

      <DocsQuickViewModal 
        isOpen={docsModalOpen}
        onClose={() => setDocsModalOpen(false)}
      />
    </div>
  );
}
