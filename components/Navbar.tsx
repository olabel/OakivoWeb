import React, { useState, useEffect } from 'react';
import { NavLink, useLocation, Link } from 'react-router-dom';
import { Menu, X, ArrowRight, ChevronRight, Globe } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import LeadDrawer from './LeadDrawer';
import Logo from './Logo';

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [drawerTopic, setDrawerTopic] = useState<string>('');
  
  const location = useLocation();
  const { language, setLanguage } = useLanguage();
  const isFr = language === 'fr';

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 15);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    const openDrawer = (e?: Event) => {
      const customEvent = e as CustomEvent<{ focus?: string; topic?: string }>;
      if (customEvent?.detail?.focus) {
        setDrawerTopic(customEvent.detail.focus);
      } else if (customEvent?.detail?.topic) {
        setDrawerTopic(customEvent.detail.topic);
      }
      setIsDrawerOpen(true);
    };
    window.addEventListener('open-lead-drawer', openDrawer);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('open-lead-drawer', openDrawer);
    };
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  // KPMG Standard Enterprise Menu (Clean, institutional, no 14-day sprint clutter)
  const navLinks = [
    { 
      name: isFr ? 'Services' : 'Services', 
      path: '/services' 
    },
    { 
      name: isFr ? 'Secteurs' : 'Industries', 
      path: '/verticals' 
    },
    { 
      name: isFr ? 'Études de Cas' : 'Case Studies', 
      path: '/case-studies' 
    },
    { 
      name: isFr ? 'Perspectives' : 'Insights', 
      path: '/insights' 
    },
    { 
      name: isFr ? 'Le Cabinet' : 'About', 
      path: '/about' 
    }
  ];

  return (
    <>
      <header 
        role="banner" 
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-[#000000]/92 backdrop-blur-2xl border-b border-[#1e2d27]/80 shadow-[0_10px_35px_rgba(0,0,0,0.85)]' 
            : 'bg-[#000000]/75 backdrop-blur-md border-b border-[#1e2d27]/40'
        }`}
      >
        <div className="container mx-auto max-w-7xl h-20 px-6 sm:px-8 lg:px-12 flex items-center justify-between">
          
          {/* Brand Wordmark & Emblem */}
          <Link 
            to="/" 
            aria-label="Oakivo Solutions homepage" 
            className="flex items-center group focus:outline-none focus:ring-1 focus:ring-[#23c694] rounded py-1"
          >
            <Logo size="md" />
          </Link>

          {/* KPMG-Standard Minimalist Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-9" aria-label="Main Navigation">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) => 
                  `text-[13px] font-sans tracking-wide transition-colors duration-200 py-1 relative ${
                    isActive 
                      ? 'text-[#ffffff] font-semibold' 
                      : 'text-[#9ba6a1] hover:text-[#f7faf9]'
                  }`
                }
              >
                {({ isActive }) => (
                  <span className="flex items-center gap-1.5">
                    {link.name}
                    {isActive && (
                      <span className="w-1 h-1 rounded-full bg-[#23c694] inline-block" />
                    )}
                  </span>
                )}
              </NavLink>
            ))}
          </nav>

          {/* Right Action Cluster: Language Switcher + Single Authoritative Executive CTA */}
          <div className="hidden lg:flex items-center gap-6">
            
            {/* Minimalist Bilingual Toggle */}
            <div 
              className="flex items-center gap-1.5 text-xs font-mono text-[#7c8581] select-none"
              role="group"
              aria-label="Language selection"
            >
              <button
                type="button"
                onClick={() => setLanguage('en')}
                className={`transition-colors cursor-pointer px-1 py-0.5 rounded ${
                  language === 'en' ? 'text-white font-bold' : 'hover:text-[#dce3e0]'
                }`}
                aria-pressed={language === 'en'}
                aria-label="Switch to English"
              >
                EN
              </button>
              <span className="text-[#36423d]" aria-hidden="true">/</span>
              <button
                type="button"
                onClick={() => setLanguage('fr')}
                className={`transition-colors cursor-pointer px-1 py-0.5 rounded ${
                  language === 'fr' ? 'text-white font-bold' : 'hover:text-[#dce3e0]'
                }`}
                aria-pressed={language === 'fr'}
                aria-label="Passer au français"
              >
                FR
              </button>
            </div>

            {/* Reviewed Executive Call to Action */}
            <Link
              to="/contact"
              className="nova-outline-btn text-xs font-mono tracking-wider uppercase py-2 px-5"
            >
              <span>{isFr ? 'Prendre Rendez-vous' : 'Book Consultation'}</span>
              <ArrowRight size={13} className="text-[#23c694]" />
            </Link>
          </div>

          {/* Mobile Menu Hamburger */}
          <div className="flex lg:hidden items-center gap-3">
            <div className="flex items-center gap-1.5 text-xs font-mono text-[#7c8581]">
              <button
                type="button"
                onClick={() => setLanguage('en')}
                className={language === 'en' ? 'text-white font-bold' : 'hover:text-[#dce3e0]'}
              >
                EN
              </button>
              <span>/</span>
              <button
                type="button"
                onClick={() => setLanguage('fr')}
                className={language === 'fr' ? 'text-white font-bold' : 'hover:text-[#dce3e0]'}
              >
                FR
              </button>
            </div>

            <button 
              type="button"
              className="text-[#dce3e0] hover:text-white p-2 rounded-lg bg-[#070a09] border border-[#1e2d27] focus:outline-none focus:ring-1 focus:ring-[#23c694]"
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? "Close menu" : "Open menu"}
              aria-expanded={isOpen}
            >
              {isOpen ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
            </button>
          </div>

        </div>

        {/* Minimalist Mobile Drawer */}
        {isOpen && (
          <div 
            id="mobile-menu"
            role="region"
            aria-label="Mobile Navigation"
            className="lg:hidden bg-[#000000]/98 backdrop-blur-3xl border-b border-[#1e2d27] shadow-2xl px-6 py-6 space-y-4 animate-in fade-in duration-150"
          >
            <nav className="flex flex-col space-y-1">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) => 
                    `px-4 py-3 rounded-xl text-xs font-mono uppercase tracking-wider transition-colors flex items-center justify-between ${
                      isActive 
                        ? 'bg-[#0f5e4a]/25 text-[#23c694] font-semibold border border-[#23c694]/30' 
                        : 'text-[#dce3e0] hover:bg-white/[0.04]'
                    }`
                  }
                >
                  <span>{link.name}</span>
                  <ChevronRight size={13} className="text-[#7c8581]" />
                </NavLink>
              ))}
            </nav>

            <div className="pt-4 border-t border-[#1e2d27]">
              <Link
                to="/contact"
                onClick={() => setIsOpen(false)}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-full bg-white text-black font-mono font-semibold text-xs uppercase tracking-wider hover:bg-[#23c694] transition-colors"
              >
                <span>{isFr ? 'Prendre Rendez-vous' : 'Book Consultation'}</span>
                <ArrowRight size={13} />
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Global Lead Capture Drawer */}
      <LeadDrawer 
        isOpen={isDrawerOpen} 
        onClose={() => setIsDrawerOpen(false)} 
        defaultTopic={drawerTopic}
      />
    </>
  );
};

export default Navbar;
