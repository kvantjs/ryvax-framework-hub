import React, { useState, useEffect } from 'react';
import { Menu, X, Github } from 'lucide-react';

interface NavbarProps {
  onOpenDocs: () => void;
  onOpenScaffold: () => void;
  activeSection: string;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  onOpenDocs, 
  onOpenScaffold,
  activeSection: _activeSection 
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Overview', href: '#overview' },
    { label: 'Playground', href: '#playground' },
    { label: 'Architecture', href: '#architecture' },
    { label: 'Ecosystem', href: '#ecosystem' },
  ];

  return (
    <header 
      id="main-navbar"
      className={`fixed top-0 left-0 right-0 z-40 h-16 transition-all duration-300 ${
        scrolled 
          ? 'bg-[#0a0a0a]/60 backdrop-blur-md border-b border-[#141414]/70 shadow-sm' 
          : 'bg-[#0a0a0a] border-b border-[#141414]'
      }`}
    >
      <div className="max-w-[1200px] mx-auto h-full px-4 sm:px-6 flex items-center justify-between">
        
        {/* Left: Ryvax.js Official Full Logo (without redundant text) */}
        <div className="flex items-center gap-8">
          <a href="#" className="flex items-center group py-1" aria-label="Ryvax.js Home">
            <img 
              src="https://imgdb.io/i/CaXVY08.png" 
              alt="Ryvax.js" 
              className="h-5 md:h-6 w-auto object-contain transition-opacity group-hover:opacity-90"
              referrerPolicy="no-referrer"
            />
          </a>

          {/* Center: nav links in Circular 400 14px */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-[14px] font-normal text-[#b4b4b4] hover:text-[#fafafa] transition-colors tracking-[-0.007em]"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>

        {/* Right: GitHub stars, Docs ghost, Start project button */}
        <div className="hidden sm:flex items-center gap-3">
          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-[6px] bg-[#0a0a0a] border border-[#141414] text-[12px] font-normal text-[#fafafa] hover:text-white transition-colors"
          >
            <Github className="w-3.5 h-3.5 text-[#fafafa]" />
            <span>Star</span>
            <span className="text-[#898989] text-[11px] font-mono ml-0.5">4.8k</span>
          </a>

          <button
            id="navbar-docs-btn"
            onClick={onOpenDocs}
            className="px-4 py-2 rounded-[6px] bg-[#0a0a0a] border border-[#141414] text-[#fafafa] text-[14px] font-normal hover:text-white transition-all"
          >
            Docs
          </button>

          <button
            id="navbar-scaffold-btn"
            onClick={onOpenScaffold}
            className="px-4 py-2 rounded-[6px] bg-[#0a0a0a] text-[#fafafa] border border-[#141414] hover:text-white text-[14px] font-medium tracking-[-0.007em] transition-all active:scale-[0.98]"
          >
            Start your project
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="flex sm:hidden items-center gap-2">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-[6px] text-[#b4b4b4] hover:text-[#fafafa] bg-[#0a0a0a] border border-[#141414]"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="sm:hidden bg-[#0a0a0a] border-b border-[#141414] px-4 pt-3 pb-6 space-y-3">
          <div className="space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 text-[14px] text-[#b4b4b4] hover:text-[#fafafa] rounded-[6px] bg-[#0a0a0a]"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="pt-3 border-t border-[#141414] flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenDocs();
              }}
              className="w-full text-center py-2.5 rounded-[6px] bg-[#0a0a0a] border border-[#141414] text-[#fafafa] text-[14px] font-normal"
            >
              Documentation
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenScaffold();
              }}
              className="w-full text-center py-2.5 rounded-[6px] bg-[#0a0a0a] text-[#fafafa] text-[14px] font-medium border border-[#141414]"
            >
              Start your project
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
