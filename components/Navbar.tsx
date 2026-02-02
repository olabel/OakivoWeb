import React, { useState, useEffect, useCallback } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Menu, X, Globe, Search, ChevronRight } from 'lucide-react';
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
      className={`fixed top-0 left-0 right-0 z-[60] transition-all duration-300 ${
        isScrolled ? 'bg-white/95 backdrop-blur-md py-3 shadow-vise' : 'bg-white py-5 border-b border-oakivo-border'
      }`}
    >
      <div className="container mx-auto flex items-center justify-between px-6">
        <div className="flex items-center gap-12">
          <NavLink to="/" className="flex items-center">
            <Logo className="h-9 md:h-10" />
          </NavLink>

          <nav className="hidden xl:flex items-center gap-8">
            {navLinks.map((link) => (
              <NavLink 
                key={link.path} 
                to={link.path}
                className={({ isActive }) => 
                  `text-[14px] font-bold tracking-tight transition-colors py-1 border-b-2 ${
                    isActive ? 'text-oakivo-primary border-oakivo-primary' : 'text-oakivo-text border-transparent hover:text-oakivo-accent'
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </nav>
        </div>

        <div className="hidden lg:flex items-center gap-8">
          <button onClick={toggleLanguage} className="flex items-center gap-2 text-[13px] font-bold text-oakivo-text hover:text-oakivo-accent">
            <Globe size={15} />
            <span>{language.toUpperCase()}</span>
          </button>

          <NavLink to={NavRoute.CONTACT}>
            <Button variant="visa" size="sm">
              {t('nav.contact')}
            </Button>
          </NavLink>
        </div>

        <button className="xl:hidden p-2" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      <div className={`xl:hidden fixed inset-0 top-[65px] bg-white z-[59] transition-transform duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex flex-col p-8 gap-6 h-full">
          {navLinks.map((link) => (
            <NavLink key={link.path} to={link.path} className="text-2xl font-serif-display font-bold text-oakivo-text border-b border-oakivo-border pb-4">
              {link.name}
            </NavLink>
          ))}
          <NavLink to={NavRoute.CONTACT} className="mt-auto">
            <Button variant="visa" className="w-full py-5 text-lg">
              {t('nav.contact')}
            </Button>
          </NavLink>
        </div>
      </div>
    </header>
  );
};

export default Navbar;