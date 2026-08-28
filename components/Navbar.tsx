import React, { useState, useEffect, useCallback } from 'react';
import { NavLink, useLocation, Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
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
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => setIsOpen(false), [location]);

  const toggleLanguage = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setLanguage(language === 'en' ? 'fr' : 'en');
  }, [language, setLanguage]);

  const navLinks = [
    { name: t('nav.home'), path: NavRoute.HOME },
    { name: t('nav.services'), path: NavRoute.SERVICES },
    { name: t('nav.about'), path: NavRoute.ABOUT },
    { name: t('nav.contact'), path: NavRoute.CONTACT },
  ];

  return (
    <>
      <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'glass-panel border-b border-white/[0.04]' : 'bg-transparent border-b border-transparent'}`}>
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
            <Link to={NavRoute.HOME} className="text-xl font-display font-bold tracking-tight text-white flex items-center">
                OAKIVO<span className="text-cyan-500">.</span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8 text-sm font-light text-slate-300">
                {navLinks.map((link) => (
                  <NavLink
                    key={link.path}
                    to={link.path}
                    className={({ isActive }) => 
                      `transition-colors hover:text-white ${isActive ? 'text-white font-medium' : ''}`
                    }
                  >
                    {link.name}
                  </NavLink>
                ))}
                
                <button 
                  onClick={toggleLanguage}
                  className="text-xs font-mono-tech uppercase tracking-wider text-slate-400 hover:text-white transition-colors"
                >
                  {language === 'en' ? 'FR' : 'EN'}
                </button>
            </div>

            <div className="hidden md:block">
              <button 
                onClick={() => setIsDrawerOpen(true)}
                className="text-xs font-semibold tracking-widest uppercase bg-white/5 hover:bg-white/10 border border-white/10 px-6 py-2.5 rounded-full transition-all duration-300 text-white cursor-pointer"
              >
                  Book Audit
              </button>
            </div>

            {/* Mobile Toggle */}
            <button 
              className="md:hidden text-white p-2"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
        </div>

        {/* Mobile Nav */}
        <div className={`md:hidden absolute top-20 left-0 w-full glass-panel border-b border-white/[0.04] transition-all duration-300 ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
          <div className="px-6 py-6 flex flex-col gap-6">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) => 
                  `text-sm font-medium transition-colors ${isActive ? 'text-cyan-400' : 'text-slate-300'}`
                }
              >
                {link.name}
              </NavLink>
            ))}
            <button 
              onClick={toggleLanguage}
              className="text-left text-sm font-mono-tech uppercase tracking-wider text-slate-400"
            >
              Language: {language === 'en' ? 'FR' : 'EN'}
            </button>
            <button 
              onClick={() => { setIsOpen(false); setIsDrawerOpen(true); }}
              className="w-full text-center text-xs font-semibold tracking-widest uppercase bg-indigo-600 hover:bg-indigo-500 px-6 py-3.5 rounded-full transition-all duration-300 text-white cursor-pointer"
            >
                Book Audit
            </button>
          </div>
        </div>
      </nav>

      <LeadDrawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />
    </>
  );
};

export default Navbar;
