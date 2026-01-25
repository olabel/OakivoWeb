import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Menu, X, ShieldCheck, ChevronRight } from 'lucide-react';
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
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'fr' : 'en');
  };

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
        isScrolled 
          ? 'bg-white/95 backdrop-blur-md py-3 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border-b border-gray-100' 
          : 'bg-white py-6'
      }`}
    >
      <div className="container mx-auto flex items-center justify-between px-6">
        {/* Logo Lockup */}
        <NavLink to="/" className="flex items-center group transition-transform active:scale-95">
          <Logo className="h-10 md:h-12" />
        </NavLink>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-10">
          <div className="flex items-center gap-8">
            {navLinks.map((link) => (
              <NavLink 
                key={link.path} 
                to={link.path}
                className={({ isActive }) => 
                  `text-[11px] font-bold tracking-[0.2em] uppercase transition-all duration-300 relative py-2 ${
                    isActive 
                      ? 'text-oakivo-primary' 
                      : 'text-gray-400 hover:text-oakivo-primary'
                  }`
                }
              >
                {({ isActive }) => (
                  <span className="relative flex flex-col items-center">
                    {link.name}
                    <span className={`absolute -bottom-1 w-0 h-[2px] bg-oakivo-secondary transition-all duration-300 ${isActive ? 'w-full' : 'group-hover:w-full'}`}></span>
                  </span>
                )}
              </NavLink>
            ))}
          </div>

          <div className="h-6 w-[1px] bg-gray-100 mx-2"></div>
      
          <div className="flex items-center gap-6">
            <button 
              onClick={toggleLanguage}
              className="text-[10px] font-black text-gray-300 hover:text-oakivo-primary transition-all border border-gray-100 px-3 py-1 rounded-full bg-white shadow-sm flex items-center gap-1"
            >
              {language === 'en' ? 'EN' : 'FR'}
            </button>

            <NavLink to={NavRoute.CONTACT}>
              <Button variant="black" size="sm" className="font-bold flex items-center gap-2 group px-6 hover:shadow-xl hover:shadow-oakivo-primary/20">
                <ShieldCheck size={14} className="text-oakivo-secondary" />
                {t('nav.contact')}
                <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </Button>
            </NavLink>
          </div>
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-oakivo-primary focus:outline-none p-2 rounded-xl bg-gray-50"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`md:hidden absolute top-full left-0 right-0 bg-white border-t border-gray-100 shadow-2xl transition-all duration-500 ease-in-out overflow-hidden ${
        isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
      }`}>
        <div className="flex flex-col p-10 gap-8 items-center text-center bg-white">
          {navLinks.map((link) => (
            <NavLink 
              key={link.path} 
              to={link.path}
              className="text-2xl font-serif-display font-bold text-oakivo-primary hover:text-oakivo-secondary transition-colors"
            >
              {link.name}
            </NavLink>
          ))}
          <div className="h-[1px] w-20 bg-gray-100"></div>
          <button 
            onClick={toggleLanguage}
            className="text-sm font-bold text-gray-400 hover:text-oakivo-primary uppercase tracking-widest"
          >
            {language === 'en' ? 'Switch to French' : 'Passer en Anglais'}
          </button>
          <NavLink to={NavRoute.CONTACT} className="w-full">
            <Button variant="black" size="lg" className="w-full text-lg">
              {t('nav.contact')}
            </Button>
          </NavLink>
        </div>
      </div>
    </header>
  );
};

export default Navbar;