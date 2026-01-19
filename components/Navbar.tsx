import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-black py-4 shadow-md' : 'bg-black py-6'
      }`}
    >
      <div className="container mx-auto flex items-center justify-between px-6">
        {/* Logo */}
        <NavLink to="/" className="flex items-center gap-3 group">
          <div className="relative flex items-center justify-center">
             <Logo className="w-10 h-10" />
          </div>
          <span className="text-xl font-bold font-sans text-white tracking-tight">
            Oakivo<span className="text-oakivo-secondary">.</span>
          </span>
        </NavLink>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <NavLink 
              key={link.path} 
              to={link.path}
              className={({ isActive }) => 
                `text-sm font-semibold tracking-wide transition-colors duration-300 border-b-2 ${
                  isActive ? 'text-white border-oakivo-secondary' : 'text-gray-300 border-transparent hover:text-white hover:border-gray-500'
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}

          <div className="h-4 w-[1px] bg-gray-700 mx-2"></div>
      
          <button 
            onClick={toggleLanguage}
            className="text-sm font-semibold text-gray-300 hover:text-white transition-colors flex items-center gap-2"
          >
            {language === 'en' ? 'FR' : 'EN'}
          </button>

          <NavLink to={NavRoute.CONTACT}>
            <Button variant="primary" size="sm" className="font-bold">{t('nav.contact')}</Button>
          </NavLink>
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-white focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`md:hidden absolute top-full left-0 right-0 bg-black border-t border-gray-800 shadow-xl transition-all duration-300 ease-in-out overflow-hidden ${
        isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
      }`}>
        <div className="flex flex-col p-8 gap-6 items-center">
          {navLinks.map((link) => (
            <NavLink 
              key={link.path} 
              to={link.path}
              className="text-xl font-bold text-white hover:text-oakivo-secondary"
            >
              {link.name}
            </NavLink>
          ))}
          <button 
            onClick={toggleLanguage}
            className="text-xl font-bold text-gray-400 hover:text-white"
          >
            {language === 'en' ? 'Switch to French' : 'Passer en Anglais'}
          </button>
          <NavLink to={NavRoute.CONTACT} className="mt-4 w-full">
            <Button variant="primary" className="w-full">{t('nav.contact')}</Button>
          </NavLink>
        </div>
      </div>
    </header>
  );
};

export default Navbar;