import React, { useState, useEffect } from 'react';
import { NavLink, useLocation, Link } from 'react-router-dom';
import { Menu, X, ArrowRight, ShieldCheck, ChevronRight } from 'lucide-react';
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
          setIsScrolled(window.scrollY > 20);
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

  const navLinks = [
    { 
      name: isFr ? 'Solutions' : 'Solutions', 
      path: '/services' 
    },
    { 
      name: isFr ? 'Conformité' : 'Compliance', 
      path: '/compliance-matrix' 
    },
    { 
      name: isFr ? 'Méthodologie' : 'Methodology', 
      path: '/methodology' 
    },
    { 
      name: isFr ? 'Pourquoi Oakivo' : 'Why Oakivo', 
      path: '/about' 
    },
    { 
      name: isFr ? 'Perspectives' : 'Insights', 
      path: '/insights' 
    }
  ];

  return (
    <>
      <header 
        role="banner" 
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-[#04070D]/90 backdrop-blur-2xl border-b border-white/[0.08] shadow-[0_8px_32px_rgba(0,0,0,0.8)]' 
            : 'bg-[#04070D]/60 backdrop-blur-md border-b border-white/[0.04]'
        }`}
      >
        <div className="container mx-auto max-w-7xl h-20 px-6 sm:px-8 lg:px-12 flex items-center justify-between">
          
          {/* Brand Wordmark & Emblem */}
          <Link 
            to="/" 
            aria-label="Oakivo Solutions homepage" 
            className="flex items-center group focus:outline-none focus:ring-1 focus:ring-cyan-400 rounded py-1"
          >
            <Logo size="md" />
          </Link>

          {/* Minimalist Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-9 text-xs font-mono tracking-wider uppercase" aria-label="Main Navigation">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) => 
                  `transition-colors duration-200 py-1 relative ${
                    isActive 
                      ? 'text-cyan-400 font-semibold' 
                      : 'text-slate-300 hover:text-white'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <span>{link.name}</span>
                    {isActive && (
                      <span className="absolute -bottom-2 left-0 w-full h-[2px] bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full" />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          {/* Right Action Cluster: Unboxed Language Switcher + Executive CTA */}
          <div className="hidden lg:flex items-center gap-7">
            {/* Unboxed Typographic Language Toggle */}
            <div 
              className="flex items-center gap-2 text-xs font-mono text-slate-400 select-none"
              role="group"
              aria-label="Language selection"
            >
              <button
                type="button"
                onClick={() => setLanguage('en')}
                className={`transition-colors cursor-pointer py-1 ${
                  language === 'en' ? 'text-white font-bold' : 'hover:text-slate-200'
                }`}
                aria-pressed={language === 'en'}
                aria-label="Switch to English"
              >
                EN
              </button>
              <span className="text-slate-700" aria-hidden="true">·</span>
              <button
                type="button"
                onClick={() => setLanguage('fr')}
                className={`transition-colors cursor-pointer py-1 ${
                  language === 'fr' ? 'text-white font-bold' : 'hover:text-slate-200'
                }`}
                aria-pressed={language === 'fr'}
                aria-label="Passer au français"
              >
                FR
              </button>
            </div>

            {/* Pristine Executive CTA */}
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 px-6 py-2.5 text-xs font-mono font-semibold tracking-wider uppercase text-slate-950 bg-white hover:bg-slate-200 rounded-lg transition-all duration-200 cursor-pointer shadow-lg shadow-white/5 hover:shadow-cyan-500/20"
            >
              <span>{isFr ? 'Planifier une Découverte' : 'Schedule Discovery'}</span>
              <ArrowRight size={13} />
            </Link>
          </div>

          {/* Mobile Menu Hamburger */}
          <div className="flex lg:hidden items-center gap-3">
            <div className="flex items-center gap-1.5 text-[11px] font-mono text-slate-400">
              <button
                type="button"
                onClick={() => setLanguage('en')}
                className={language === 'en' ? 'text-white font-bold' : 'hover:text-slate-200'}
              >
                EN
              </button>
              <span>·</span>
              <button
                type="button"
                onClick={() => setLanguage('fr')}
                className={language === 'fr' ? 'text-white font-bold' : 'hover:text-slate-200'}
              >
                FR
              </button>
            </div>

            <button 
              type="button"
              className="text-slate-300 hover:text-white p-2 rounded-lg bg-slate-900/60 border border-white/[0.08] focus:outline-none focus:ring-1 focus:ring-cyan-400"
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
            className="lg:hidden bg-[#04070D]/98 backdrop-blur-3xl border-b border-white/[0.08] shadow-2xl px-6 py-6 space-y-4 animate-in fade-in duration-150"
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
                        ? 'bg-cyan-500/10 text-cyan-400 font-semibold border border-cyan-500/20' 
                        : 'text-slate-300 hover:bg-white/[0.04]'
                    }`
                  }
                >
                  <span>{link.name}</span>
                  <ChevronRight size={13} className="text-slate-600" />
                </NavLink>
              ))}

              <Link
                to="/compliance-grader"
                onClick={() => setIsOpen(false)}
                className="px-4 py-3 rounded-xl text-xs font-mono uppercase tracking-wider text-slate-300 hover:bg-white/[0.04] flex items-center justify-between"
              >
                <span>{isFr ? 'Diagnostic de Conformité' : 'Compliance Readiness Grader'}</span>
                <ShieldCheck size={14} className="text-cyan-400" />
              </Link>
            </nav>

            <div className="pt-4 border-t border-white/[0.08]">
              <Link
                to="/contact"
                onClick={() => setIsOpen(false)}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-white text-slate-950 font-mono font-semibold text-xs uppercase tracking-wider shadow-md"
              >
                <span>{isFr ? 'Planifier une Découverte (30 Min)' : 'Schedule 30-Minute Discovery'}</span>
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
