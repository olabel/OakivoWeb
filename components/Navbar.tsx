import React, { useState, useEffect, useCallback } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Menu, X, ShieldCheck, ChevronRight, Globe } from 'lucide-react';
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
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const toggleLanguage = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    const nextLang = language === 'en' ? 'fr' : 'en';
    setLanguage(nextLang);
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
      className={`fixed top-0 left-0 right-0 z-[60] transition-all duration-700 font-sans ${
        isScrolled 
          ? 'bg-white/80 backdrop-blur-3xl py-4 shadow-[0_20px_50px_rgba(0,0,0,0.05)] border-b border-gray-100' 
          : 'bg-white py-8'
      }`}
    >
      <div className="container mx-auto flex items-center justify-between px-8">
        {/* Brand Lockup */}
        <NavLink to="/" className="flex items-center group transition-all active:scale-95 duration-500">
          <Logo className="h-11 md:h-13" />
        </NavLink>

        {/* Tactical Nav */}
        <nav className="hidden lg:flex items-center gap-14">
          <div className="flex items-center gap-10">
            {navLinks.map((link) => (
              <NavLink 
                key={link.path} 
                to={link.path}
                className={({ isActive }) => 
                  `text-[10px] font-black tracking-[0.25em] uppercase transition-all duration-500 relative py-3 group ${
                    isActive 
                      ? 'text-oakivo-primary' 
                      : 'text-gray-400 hover:text-oakivo-primary'
                  }`
                }
              >
                {({ isActive }) => (
                  <span className="relative flex flex-col items-center">
                    {link.name}
                    <span className={`absolute -bottom-1 h-[2px] bg-oakivo-secondary transition-all duration-700 ease-out ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
                  </span>
                )}
              </NavLink>
            ))}
          </div>

          <div className="h-8 w-[1px] bg-gray-100 mx-4 opacity-50"></div>
      
          <div className="flex items-center gap-8">
            <button 
              onClick={toggleLanguage}
              className="group flex items-center gap-4 bg-gray-50 hover:bg-oakivo-primary hover:text-white px-5 py-2.5 rounded-2xl transition-all duration-700 border border-gray-100"
            >
              <Globe size={16} className="text-oakivo-secondary group-hover:rotate-12 transition-transform" />
              <span className="text-[10px] font-black uppercase tracking-[0.15em]">
                {language === 'en' ? 'EN' : 'FR'}
              </span>
            </button>

            <NavLink to={NavRoute.CONTACT}>
              <Button variant="black" size="sm" className="font-black flex items-center gap-3 group px-8 py-3.5 hover:shadow-2xl hover:shadow-oakivo-primary/20 hover:scale-105 duration-700">
                <ShieldCheck size={16} className="text-oakivo-secondary" />
                <span className="text-[9px] uppercase tracking-[0.2em]">{t('nav.contact')}</span>
                <ChevronRight size={16} className="group-hover:translate-x-2 transition-transform duration-500" />
              </Button>
            </NavLink>
          </div>
        </nav>

        {/* Mobile Matrix Toggle */}
        <button 
          className="lg:hidden text-oakivo-primary focus:outline-none p-3 rounded-2xl bg-gray-50 border border-gray-100 hover:scale-110 active:scale-95 transition-all duration-500"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Matrix Interface */}
      <div className={`lg:hidden absolute top-full left-0 right-0 bg-white border-t border-gray-100 shadow-4xl transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] overflow-hidden ${
        isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 pointer-events-none'
      }`}>
        <div className="flex flex-col p-12 gap-10 items-center text-center bg-white/50 backdrop-blur-xl">
          {navLinks.map((link) => (
            <NavLink 
              key={link.path} 
              to={link.path}
              className="text-3xl font-serif-display font-bold text-oakivo-primary hover:text-oakivo-secondary transition-all hover:scale-110 duration-500 tracking-tight"
            >
              {link.name}
            </NavLink>
          ))}
          <div className="h-[1px] w-32 bg-gray-100 opacity-50"></div>
          <button 
            onClick={toggleLanguage}
            className="flex items-center gap-4 bg-gray-50 px-10 py-5 rounded-3xl text-xs font-black text-oakivo-primary hover:bg-oakivo-secondary hover:text-white transition-all uppercase tracking-[0.2em] shadow-sm"
          >
            <Globe size={20} className="text-oakivo-secondary" />
            {language === 'en' ? 'Switch to French' : 'Passer en Anglais'}
          </button>
          <NavLink to={NavRoute.CONTACT} className="w-full">
            <Button variant="black" size="lg" className="w-full text-xl py-6 rounded-3xl shadow-xl">
              {t('nav.contact')}
            </Button>
          </NavLink>
        </div>
      </div>
    </header>
  );
};

export default Navbar;