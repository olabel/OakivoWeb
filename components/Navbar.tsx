import React, { useState, useEffect, useCallback } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Menu, X, Globe, ChevronRight } from 'lucide-react';
import { NavRoute } from '../types';
import Button from './Button';
import Logo from './Logo';
import { useLanguage } from '../context/LanguageContext';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const { language, setLanguage, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
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
    { name: t('nav.about'), path: NavRoute.ABOUT },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-[60] transition-all duration-500 ${
        isScrolled ? 'py-4' : 'py-6'
      }`}
    >
      <div className="container mx-auto px-6">
        <div className={`flex items-center justify-between transition-all duration-500 rounded-full px-8 py-3 ${
          isScrolled ? 'bg-white/80 backdrop-blur-xl shadow-soft border border-white/20' : 'bg-transparent'
        }`}>
          <div className="flex items-center gap-12">
            <NavLink to="/" className="flex items-center group">
              <Logo className="h-8 lg:h-9 group-hover:scale-105 transition-transform" />
            </NavLink>

            <nav className="hidden xl:flex items-center gap-10">
              {navLinks.map((link) => (
                <NavLink 
                  key={link.path} 
                  to={link.path}
                  className={({ isActive }) => 
                    `text-[13px] font-bold tracking-tight transition-all relative group ${
                      isActive ? 'text-oakivo-primary' : 'text-gray-400 hover:text-oakivo-primary'
                    }`
                  }
                >
                  {link.name}
                  <span className={`absolute -bottom-1 left-0 h-0.5 bg-oakivo-secondary transition-all duration-300 ${
                    location.pathname === link.path ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}></span>
                </NavLink>
              ))}
            </nav>
          </div>

          <div className="hidden lg:flex items-center gap-8">
            <button onClick={toggleLanguage} className="flex items-center gap-2 text-[11px] font-black text-gray-400 hover:text-oakivo-primary tracking-widest uppercase">
              <Globe size={14} />
              <span>{language}</span>
            </button>

            <NavLink to={NavRoute.CONTACT}>
              <Button variant="black" size="sm" className="rounded-full px-6 shadow-soft">
                {t('nav.contact')}
              </Button>
            </NavLink>
          </div>

          <button className="xl:hidden p-2 text-oakivo-primary" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div className={`xl:hidden fixed inset-0 top-0 bg-white z-[59] transition-transform duration-500 pt-24 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex flex-col p-8 gap-8 h-full">
          {navLinks.map((link) => (
            <NavLink key={link.path} to={link.path} className="text-3xl font-serif-display font-bold text-oakivo-primary border-b border-gray-50 pb-6 flex justify-between items-center">
              {link.name}
              <ChevronRight size={24} className="text-oakivo-secondary" />
            </NavLink>
          ))}
          <NavLink to={NavRoute.CONTACT} className="mt-auto">
            <Button variant="black" className="w-full py-6 text-xl rounded-3xl">
              {t('nav.contact')}
            </Button>
          </NavLink>
        </div>
      </div>
    </header>
  );
};

export default Navbar;