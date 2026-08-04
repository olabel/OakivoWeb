import React, { useState, useEffect, useCallback } from 'react';
import { NavLink, useLocation, Link } from 'react-router-dom';
import { Menu, X, Globe, ChevronRight, Zap, ShieldCheck, Lock, Sparkles } from 'lucide-react';
import { NavRoute } from '../types';
import Logo from './Logo';
import { useLanguage } from '../context/LanguageContext';
import LeadDrawer from './LeadDrawer';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showSticky, setShowSticky] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  
  const location = useLocation();
  const { language, setLanguage, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      setShowSticky(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => setIsOpen(false), [location]);

  const toggleLanguage = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setLanguage(language === 'en' ? 'fr' : 'en');
  }, [language, setLanguage]);

  const navLinks = [
    { name: t('nav.home'), path: NavRoute.HOME },
    { name: t('nav.verticals'), path: NavRoute.VERTICALS },
    { name: t('nav.services'), path: NavRoute.SERVICES },
    { name: t('nav.work'), path: NavRoute.CASE_STUDIES },
    { name: t('nav.compliance'), path: NavRoute.COMPLIANCE },
    { name: t('nav.about'), path: NavRoute.ABOUT },
  ];

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-[60] transition-all duration-500 ${
          isScrolled ? 'py-3' : 'py-5'
        }`}
      >
        <div className="container mx-auto px-4 md:px-6">
          <div className={`flex items-center justify-between transition-all duration-500 rounded-full px-6 md:px-8 py-3 ${
            isScrolled 
              ? 'glass-nav shadow-2xl border border-white/10' 
              : 'bg-[#070A0F]/60 backdrop-blur-md border border-white/10'
          }`}>
            <div className="flex items-center gap-8 xl:gap-10">
              <NavLink to="/" className="flex items-center group">
                <Logo className="group-hover:scale-105 transition-transform" />
              </NavLink>

              <nav className="hidden xl:flex items-center gap-6">
                {navLinks.map((link) => (
                  <NavLink 
                    key={link.path} 
                    to={link.path}
                    className={({ isActive }) => 
                      `text-xs font-medium tracking-normal transition-all relative group py-1 ${
                        isActive ? 'text-white font-semibold' : 'text-[#8A8F98] hover:text-white'
                      }`
                    }
                  >
                    {link.name}
                    <span className={`absolute -bottom-1 left-0 h-[2px] bg-oakivo-linearIndigo transition-all duration-300 ${
                      location.pathname === link.path ? 'w-full shadow-linear-glow' : 'w-0 group-hover:w-full'
                    }`}></span>
                  </NavLink>
                ))}
              </nav>
            </div>

            <div className="hidden lg:flex items-center gap-3">
              <button 
                onClick={toggleLanguage} 
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full linear-pill text-[11px] font-mono-tech font-medium text-gray-300 hover:text-white hover:border-white/20 transition-all uppercase"
                title="Switch Language (EN / FR)"
              >
                <Globe size={12} className="text-oakivo-secondary" />
                <span>{language.toUpperCase()}</span>
              </button>

              <NavLink to={NavRoute.BOOKING} className="hidden xl:block">
                <button className="px-4 py-2 rounded-full linear-pill text-gray-300 hover:text-white hover:border-white/20 transition-all text-xs font-medium whitespace-nowrap flex items-center gap-1.5">
                  <span>{t('nav.booking')}</span>
                  <kbd className="kbd-pill">⌘B</kbd>
                </button>
              </NavLink>

              <button 
                onClick={() => setIsDrawerOpen(true)}
                className="px-4 py-2 rounded-full bg-white hover:bg-gray-200 text-black font-semibold text-xs transition-all shadow-[0_0_20px_rgba(255,255,255,0.2)] flex items-center gap-2"
              >
                <Sparkles size={13} className="text-black" />
                <span>{t('nav.contact')}</span>
                <kbd className="bg-black/10 text-black/70 px-1.5 py-0.5 rounded text-[10px] font-mono-tech">⌘K</kbd>
              </button>
            </div>

            <button 
              className="xl:hidden p-2.5 rounded-2xl bg-white/5 text-white border border-white/10" 
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle navigation menu"
            >
              {isOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        <div className={`xl:hidden fixed inset-0 top-0 bg-[#070A0F] z-[59] transition-transform duration-500 pt-24 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="flex flex-col p-8 gap-6 h-full overflow-y-auto">
            <div className="flex justify-between items-center pb-4 border-b border-white/10">
               <button onClick={toggleLanguage} className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full text-xs font-mono-tech font-bold text-oakivo-secondary uppercase tracking-wider border border-white/10">
                  <Globe size={16} /> Language: {language.toUpperCase()}
               </button>
               <Link to={NavRoute.ADMIN_PORTAL} className="flex items-center gap-2 text-xs font-bold text-gray-500 hover:text-white">
                  <Lock size={14} /> Vault
               </Link>
            </div>

            {navLinks.map((link) => (
              <NavLink 
                key={link.path} 
                to={link.path} 
                className="text-2xl font-display font-bold text-white border-b border-white/5 pb-4 flex justify-between items-center"
              >
                {link.name}
                <ChevronRight size={20} className="text-oakivo-secondary" />
              </NavLink>
            ))}

            <div className="mt-auto space-y-4 pt-6">
              <NavLink to={NavRoute.BOOKING} className="block">
                <button className="w-full py-4 text-xs font-bold rounded-2xl border border-white/20 text-white uppercase tracking-wider">
                  {t('nav.booking')}
                </button>
              </NavLink>

              <button 
                onClick={() => { setIsOpen(false); setIsDrawerOpen(true); }}
                className="w-full py-4 text-xs font-extrabold rounded-2xl bg-oakivo-secondary text-black uppercase tracking-widest shadow-glow-cyan flex items-center justify-center gap-2"
              >
                <Sparkles size={16} /> {t('nav.contact')}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* MOBILE STICKY COMMAND PILL */}
      <div className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-[55] lg:hidden transition-all duration-700 ${showSticky && !isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20 pointer-events-none'}`}>
        <button 
          onClick={() => setIsDrawerOpen(true)}
          className="bg-[#0B0F17] text-white px-7 py-3.5 rounded-full shadow-2xl flex items-center gap-3 border border-oakivo-secondary/40 shadow-glow-cyan active:scale-95 transition-transform"
        >
          <div className="w-7 h-7 bg-oakivo-secondary rounded-full flex items-center justify-center text-black">
             <Zap size={14} />
          </div>
          <span className="text-[11px] font-mono-tech font-extrabold uppercase tracking-widest text-oakivo-secondary whitespace-nowrap">
            {t('common.cta_mobile_sticky')}
          </span>
        </button>
      </div>

      {/* Slide-over Lead Intake Drawer */}
      <LeadDrawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />
    </>
  );
};

export default Navbar;
