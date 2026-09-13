import React, { useState, useEffect } from 'react';
import { NavLink, useLocation, Link } from 'react-router-dom';
import { Menu, X, Globe } from 'lucide-react';
import { NavRoute } from '../types';
import { useLanguage } from '../context/LanguageContext';
import LeadDrawer from './LeadDrawer';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  
  const location = useLocation();
  const { language, setLanguage, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    const openDrawer = () => setIsDrawerOpen(true);
    window.addEventListener('open-lead-drawer', openDrawer);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('open-lead-drawer', openDrawer);
    };
  }, []);

  useEffect(() => setIsOpen(false), [location]);

  const navLinks = [
    { name: t('nav.capabilities'), path: NavRoute.CAPABILITIES },
    { name: t('nav.industries'), path: NavRoute.INDUSTRIES },
    { name: t('nav.insights'), path: NavRoute.METHODOLOGY },
    { name: t('nav.research'), path: NavRoute.INSIGHTS },
    { name: t('nav.firm'), path: NavRoute.FIRM },
  ];

  return (
    <>
      <nav 
        role="navigation" 
        aria-label="Main Navigation" 
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'glass-panel border-b border-white/[0.04]' : 'bg-transparent border-b border-transparent'}`}
      >
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
            <Link 
              to={NavRoute.HOME} 
              aria-label="Oakivo Solutions homepage" 
              className="text-xl font-display font-bold tracking-tight text-white flex items-center focus:outline-none focus:ring-2 focus:ring-cyan-400 rounded-md"
            >
                OAKIVO<span className="text-cyan-500">.</span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8 text-sm font-light text-slate-300" role="menubar">
                {navLinks.map((link) => (
                  <NavLink
                    key={link.path}
                    to={link.path}
                    role="menuitem"
                    aria-current={location.pathname === link.path ? 'page' : undefined}
                    className={({ isActive }) => 
                      `transition-colors hover:text-white focus:outline-none focus:ring-2 focus:ring-cyan-400 rounded-md px-1 py-0.5 ${isActive ? 'text-white font-medium' : ''}`
                    }
                  >
                    {link.name}
                  </NavLink>
                ))}
                
                {/* Global Language Switcher */}
                <div 
                  id="global-language-switcher"
                  className="flex items-center bg-slate-900/90 border border-slate-700/70 rounded-full p-1 shadow-inner backdrop-blur-md"
                  role="group"
                  aria-label="Language selection"
                >
                  <div className="flex items-center pl-2 pr-1.5 text-slate-400" aria-hidden="true">
                    <Globe size={13} className="text-cyan-400" />
                  </div>
                  <button
                    type="button"
                    id="lang-btn-en"
                    onClick={() => setLanguage('en')}
                    className={`px-2.5 py-1 text-xs font-mono font-bold tracking-wider rounded-full transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-cyan-400 ${
                      language === 'en'
                        ? 'bg-cyan-500 text-slate-950 shadow-sm shadow-cyan-500/25'
                        : 'text-slate-400 hover:text-white'
                    }`}
                    aria-pressed={language === 'en'}
                    aria-label="Switch interface language to English"
                    title="Switch language to English"
                  >
                    EN
                  </button>
                  <button
                    type="button"
                    id="lang-btn-fr"
                    onClick={() => setLanguage('fr')}
                    className={`px-2.5 py-1 text-xs font-mono font-bold tracking-wider rounded-full transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-cyan-400 ${
                      language === 'fr'
                        ? 'bg-cyan-500 text-slate-950 shadow-sm shadow-cyan-500/25'
                        : 'text-slate-400 hover:text-white'
                    }`}
                    aria-pressed={language === 'fr'}
                    aria-label="Passer l'interface en français"
                    title="Passer au français"
                  >
                    FR
                  </button>
                </div>
            </div>

            <div className="hidden md:block">
              <button 
                type="button"
                onClick={() => setIsDrawerOpen(true)}
                aria-label="Book a 30-minute security architecture audit"
                aria-haspopup="dialog"
                className="text-xs font-semibold tracking-widest uppercase bg-slate-100 hover:bg-white border border-slate-200 px-6 py-2.5 rounded-full transition-all duration-300 text-slate-950 cursor-pointer focus:outline-none focus:ring-2 focus:ring-cyan-400"
              >
                  {t('common.cta_book_audit')}
              </button>
            </div>

            {/* Mobile Toggle */}
            <button 
              type="button"
              className="md:hidden text-white p-2 focus:outline-none focus:ring-2 focus:ring-cyan-400 rounded-lg"
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={isOpen}
              aria-controls="mobile-navigation-menu"
              aria-haspopup="true"
            >
              {isOpen ? <X size={24} aria-hidden="true" /> : <Menu size={24} aria-hidden="true" />}
            </button>
        </div>

        {/* Mobile Nav */}
        <div 
          id="mobile-navigation-menu"
          role="region"
          aria-label="Mobile Navigation Menu"
          aria-hidden={!isOpen}
          className={`md:hidden absolute top-20 left-0 w-full glass-panel border-b border-white/[0.04] transition-all duration-300 ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
        >
          <div className="px-6 py-6 flex flex-col gap-6">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                aria-current={location.pathname === link.path ? 'page' : undefined}
                className={({ isActive }) => 
                  `text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-400 rounded-md py-1 ${isActive ? 'text-cyan-400' : 'text-slate-300'}`
                }
              >
                {link.name}
              </NavLink>
            ))}

            {/* Mobile Language Selector */}
            <div 
              className="flex items-center justify-between p-3 rounded-xl bg-slate-900/70 border border-slate-800"
              role="group"
              aria-label="Language selection"
            >
              <div className="flex items-center gap-2 text-xs font-medium text-slate-300">
                <Globe size={15} className="text-cyan-400" aria-hidden="true" />
                <span>{language === 'en' ? 'Language / Langue' : 'Langue / Language'}</span>
              </div>
              <div className="flex items-center bg-slate-950 border border-slate-800 rounded-lg p-0.5">
                <button
                  type="button"
                  onClick={() => setLanguage('en')}
                  aria-pressed={language === 'en'}
                  aria-label="Select English language"
                  className={`px-3 py-1.5 text-xs font-mono font-bold rounded-md transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-cyan-400 ${
                    language === 'en'
                      ? 'bg-cyan-500 text-slate-950'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  English
                </button>
                <button
                  type="button"
                  onClick={() => setLanguage('fr')}
                  aria-pressed={language === 'fr'}
                  aria-label="Sélectionner la langue française"
                  className={`px-3 py-1.5 text-xs font-mono font-bold rounded-md transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-cyan-400 ${
                    language === 'fr'
                      ? 'bg-cyan-500 text-slate-950'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Français
                </button>
              </div>
            </div>

            <button 
              type="button"
              onClick={() => { setIsOpen(false); setIsDrawerOpen(true); }}
              aria-label="Book a 30-minute security architecture audit"
              aria-haspopup="dialog"
              className="w-full text-center text-xs font-semibold tracking-widest uppercase bg-slate-100 hover:bg-white text-slate-950 px-6 py-3.5 rounded-full transition-all duration-300 cursor-pointer focus:outline-none focus:ring-2 focus:ring-cyan-400"
            >
                {t('common.cta_book_audit')}
            </button>
          </div>
        </div>
      </nav>

      <LeadDrawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />
    </>
  );
};

export default Navbar;
