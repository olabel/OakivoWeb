import React from 'react';
import { Link } from 'react-router-dom';
import { Linkedin, Twitter, Github, ArrowUp, Mail, MapPin, ArrowRight } from 'lucide-react';
import { NavRoute } from '../types';
import Button from './Button';
import Logo from './Logo';
import { useLanguage } from '../context/LanguageContext';

const Footer: React.FC = () => {
  const { t } = useLanguage();
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-black text-white pt-32 pb-12 relative overflow-hidden">
      {/* Decorative Background Element */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-oakivo-secondary to-transparent opacity-50"></div>
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-oakivo-secondary/10 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-24">
          
          {/* Brand & Newsletter Column */}
          <div className="lg:col-span-5 space-y-12">
             <div className="max-w-md">
                <div className="flex items-center gap-3 mb-6">
                   <Logo className="w-12 h-12" />
                   <span className="text-3xl font-bold font-serif-display tracking-tight">Oakivo.</span>
                </div>
                <h3 className="text-3xl font-bold mb-6 leading-tight">
                  {t('footer.tagline_1')} <br/>
                  <span className="text-oakivo-secondary">{t('footer.tagline_2')}</span>
                </h3>
                <p className="text-gray-400 mb-8 leading-relaxed">
                  {t('footer.newsletter_text')}
                </p>
                
                {/* Newsletter Input */}
                <div className="relative max-w-sm">
                  <input 
                    type="email" 
                    placeholder={t('footer.newsletter_placeholder')}
                    className="w-full bg-white/5 border border-white/10 rounded-full py-4 pl-6 pr-14 text-white placeholder-gray-500 focus:outline-none focus:border-oakivo-secondary transition-colors"
                  />
                  <button className="absolute right-2 top-2 bottom-2 w-10 h-10 bg-oakivo-secondary rounded-full flex items-center justify-center text-oakivo-primary hover:bg-white transition-colors">
                    <ArrowRight size={18} />
                  </button>
                </div>
             </div>

             {/* Socials */}
             <div className="flex gap-4">
                {[Linkedin, Twitter, Github, Mail].map((Icon, i) => (
                  <a key={i} href="#" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-black transition-all duration-300">
                    <Icon size={18} />
                  </a>
                ))}
             </div>
          </div>

          {/* Navigation Columns */}
          <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-3 gap-12">
             
             {/* Capabilities */}
             <div>
                <h4 className="font-bold mb-8 text-white text-lg font-serif-display">{t('footer.col_capabilities')}</h4>
                <ul className="space-y-4 text-gray-400">
                  {['Digital Strategy', 'Intelligent Automation', 'Cloud & Security', 'ERP Modernization', 'Data Analytics', 'Generative AI'].map((item, i) => (
                    <li key={i}><a href="#" className="hover:text-oakivo-secondary transition-colors flex items-center gap-2 group">
                      <span className="w-0 overflow-hidden group-hover:w-2 transition-all duration-300 text-oakivo-secondary">•</span> {item}
                    </a></li>
                  ))}
                </ul>
             </div>

             {/* Company */}
             <div>
                <h4 className="font-bold mb-8 text-white text-lg font-serif-display">{t('footer.col_company')}</h4>
                <ul className="space-y-4 text-gray-400">
                  <li><Link to={NavRoute.ABOUT} className="hover:text-oakivo-secondary transition-colors">{t('nav.about')}</Link></li>
                  <li><Link to={NavRoute.CASE_STUDIES} className="hover:text-oakivo-secondary transition-colors">{t('nav.work')}</Link></li>
                  <li><a href="#" className="hover:text-oakivo-secondary transition-colors">Careers</a></li>
                  <li><a href="#" className="hover:text-oakivo-secondary transition-colors">Partners</a></li>
                  <li><Link to={NavRoute.CONTACT} className="hover:text-oakivo-secondary transition-colors">{t('nav.contact')}</Link></li>
                </ul>
             </div>

             {/* Offices */}
             <div>
                <h4 className="font-bold mb-8 text-white text-lg font-serif-display">{t('footer.col_global')}</h4>
                <ul className="space-y-6 text-gray-400">
                  <li className="flex gap-3">
                    <MapPin className="text-oakivo-secondary shrink-0" size={20} />
                    <div>
                      <strong className="text-white block">Halifax (HQ)</strong>
                      <span className="text-sm">123 Innovation Dr.</span>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <MapPin className="text-oakivo-secondary shrink-0" size={20} />
                    <div>
                      <strong className="text-white block">Toronto</strong>
                      <span className="text-sm">King St. West</span>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <MapPin className="text-oakivo-secondary shrink-0" size={20} />
                    <div>
                      <strong className="text-white block">Montreal</strong>
                      <span className="text-sm">Place Ville Marie</span>
                    </div>
                  </li>
                </ul>
             </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
          <div className="mb-4 md:mb-0">
             <span className="mr-8">&copy; {new Date().getFullYear()} Oakivo Solutions Inc.</span>
             <a href="#" className="hover:text-white transition-colors mr-6">{t('footer.privacy')}</a>
             <a href="#" className="hover:text-white transition-colors">{t('footer.terms')}</a>
          </div>
          
          <button 
            onClick={scrollToTop} 
            className="flex items-center gap-2 text-white hover:text-oakivo-secondary transition-colors font-bold uppercase tracking-widest text-xs"
          >
            {t('footer.back_to_top')} <ArrowUp size={16} />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;