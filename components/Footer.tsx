import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Linkedin, Twitter, Github, ArrowUp, Mail, MapPin, ArrowRight, Check, Loader2, Shield, AlertCircle } from 'lucide-react';
import { NavRoute } from '../types';
import Button from './Button';
import Logo from './Logo';
import { useLanguage, translations } from '../context/LanguageContext';
import { db } from '../utils/database';

const Footer: React.FC = () => {
  const { t, language } = useLanguage();
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
      return;
    }

    setStatus('submitting');
    
    try {
      // Save to DB
      db.saveEntry('subscriber', { email });
      
      // Simulate delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setStatus('success');
      setEmail('');
      setTimeout(() => setStatus('idle'), 5000);
    } catch (err) {
      console.error("Subscription error:", err);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  return (
    <footer className="bg-black text-white pt-32 pb-12 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-oakivo-secondary to-transparent opacity-50"></div>
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-oakivo-secondary/10 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-24">
          
          <div className="lg:col-span-5 space-y-12">
             <div className="max-w-md">
                <div className="mb-6">
                   <Logo className="h-12" light={true} />
                </div>
                <h3 className="text-3xl font-bold mb-6 leading-tight">
                  {t('footer.tagline_1')} <br/>
                  <span className="text-oakivo-secondary">{t('footer.tagline_2')}</span>
                </h3>
                <p className="text-gray-400 mb-8 leading-relaxed">
                  {t('footer.newsletter_text')}
                </p>
                
                <form onSubmit={handleSubscribe} className="relative max-w-sm">
                  <input 
                    type="email" 
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={status === 'success' ? (language === 'en' ? "Welcome aboard!" : "Bienvenue !") : t('footer.newsletter_placeholder')}
                    className={`w-full bg-white/5 border rounded-full py-4 pl-6 pr-14 text-white placeholder-gray-500 focus:outline-none transition-all disabled:opacity-50 ${status === 'error' ? 'border-red-500' : 'border-white/10 focus:border-oakivo-secondary'}`}
                    disabled={status === 'submitting' || status === 'success'}
                  />
                  <button 
                    type="submit" 
                    disabled={status !== 'idle' || !email.trim()}
                    className={`absolute right-2 top-2 bottom-2 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${status === 'success' ? 'bg-green-500 text-white shadow-lg' : status === 'error' ? 'bg-red-500 text-white' : 'bg-oakivo-secondary text-oakivo-primary hover:bg-white disabled:bg-gray-700'}`}
                  >
                    {status === 'submitting' ? (
                        <Loader2 className="animate-spin" size={18} />
                    ) : status === 'success' ? (
                        <Check size={18} />
                    ) : status === 'error' ? (
                        <AlertCircle size={18} />
                    ) : (
                        <ArrowRight size={18} />
                    )}
                  </button>
                </form>
             </div>

             <div className="flex gap-4">
                {[Linkedin, Twitter, Github, Mail].map((Icon, i) => (
                  <a key={i} href="#" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-black transition-all duration-300">
                    <Icon size={18} />
                  </a>
                ))}
             </div>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-3 gap-12">
             <div>
                <h4 className="font-bold mb-8 text-white text-lg font-serif-display">{t('footer.col_capabilities')}</h4>
                <ul className="space-y-4 text-gray-400">
                  {['Digital Strategy', 'Intelligent Automation', 'Cloud & Security', 'ERP Modernization', 'Data Analytics', 'Generative AI'].map((item, i) => (
                    <li key={i}><Link to={NavRoute.SERVICES} className="hover:text-oakivo-secondary transition-colors flex items-center gap-2 group">
                      <span className="w-0 overflow-hidden group-hover:w-2 transition-all duration-300 text-oakivo-secondary">•</span> {item}
                    </Link></li>
                  ))}
                </ul>
             </div>

             <div>
                <h4 className="font-bold mb-8 text-white text-lg font-serif-display">{t('footer.col_company')}</h4>
                <ul className="space-y-4 text-gray-400">
                  <li><Link to={NavRoute.ABOUT} className="hover:text-oakivo-secondary transition-colors">{t('nav.about')}</Link></li>
                  <li><Link to={NavRoute.CASE_STUDIES} className="hover:text-oakivo-secondary transition-colors">{t('nav.work')}</Link></li>
                  <li><Link to={NavRoute.BLOG} className="hover:text-oakivo-secondary transition-colors">{t('home.perspectives_title')}</Link></li>
                  <li><Link to={NavRoute.CAREERS} className="hover:text-oakivo-secondary transition-colors">{t('nav.careers')}</Link></li>
                  <li><Link to={NavRoute.CONTACT} className="hover:text-oakivo-secondary transition-colors">Partners</Link></li>
                  <li><Link to={NavRoute.CONTACT} className="hover:text-oakivo-secondary transition-colors">{t('nav.contact')}</Link></li>
                </ul>
             </div>

             <div>
                <h4 className="font-bold mb-8 text-white text-lg font-serif-display">{t('footer.col_global')}</h4>
                <ul className="space-y-6 text-gray-400">
                  <li className="flex gap-3">
                    <MapPin className="text-oakivo-secondary shrink-0" size={20} />
                    <div>
                      <strong className="text-white block">Dieppe (HQ)</strong>
                      <span className="text-sm">21 Delta Street</span>
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

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
          <div className="mb-4 md:mb-0 flex items-center gap-6">
             <span>&copy; {new Date().getFullYear()} Oakivo Solutions Inc.</span>
             <Link to={NavRoute.CONTACT} className="hover:text-white transition-colors">{t('footer.privacy')}</Link>
             <Link to={NavRoute.CONTACT} className="hover:text-white transition-colors">{t('footer.terms')}</Link>
             <Link to="/admin-portal" className="text-white/20 hover:text-oakivo-secondary flex items-center gap-1 transition-all group">
                <Shield size={12} className="group-hover:scale-110" /> 
                <span className="opacity-0 group-hover:opacity-100 text-[10px] font-bold uppercase tracking-widest ml-1">Admin Strategy Vault</span>
             </Link>
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