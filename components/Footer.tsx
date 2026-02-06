import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Linkedin, Twitter, Github, ArrowUp, 
  ArrowRight, Check, Loader2, Globe, Shield, 
  Send, Copyright, ShieldCheck, Zap
} from 'lucide-react';
import { NavRoute } from '../types';
import Logo from './Logo';
import { useLanguage } from '../context/LanguageContext';
import { db } from '../utils/database';

const Footer: React.FC = () => {
  const { t, language, setLanguage } = useLanguage();
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes('@')) { setStatus('error'); setTimeout(() => setStatus('idle'), 3000); return; }
    setStatus('submitting');
    db.saveEntry('subscriber', { email });
    await new Promise(resolve => setTimeout(resolve, 1500));
    setStatus('success');
    setEmail('');
    setTimeout(() => setStatus('idle'), 5000);
  };

  const navLinks = {
    solutions: [
      { label: t('nav.services'), path: NavRoute.SERVICES },
      { label: t('nav.verticals'), path: NavRoute.VERTICALS },
      { label: t('nav.work'), path: NavRoute.CASE_STUDIES },
    ],
    architecture: [
      { label: t('nav.about'), path: NavRoute.ABOUT },
      { label: t('nav.careers'), path: NavRoute.CAREERS },
      { label: 'Admin Portal', path: NavRoute.ADMIN_PORTAL },
    ],
    legal: [
      { label: 'Privacy Protocol', path: NavRoute.PRIVACY },
      { label: 'Security Matrix', path: NavRoute.COMPLIANCE },
      { label: t('nav.blog'), path: NavRoute.BLOG },
    ]
  };

  return (
    <footer className="bg-white text-oakivo-primary font-sans pt-32 pb-12 relative overflow-hidden border-t border-gray-100">
      <div className="container mx-auto px-6 relative z-10">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-16 lg:gap-24 mb-24">
          
          {/* Brand Info */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <Logo className="h-11 mb-12" />
              <p className="text-2xl text-gray-500 font-serif-display font-light leading-relaxed mb-10 text-balance">
                Architecting the autonomous engine for Canada's most critical industrial enterprises. De-coupling debt, accelerating growth.
              </p>
              <div className="flex items-center gap-4">
                {[Linkedin, Twitter, Github].map((Icon, i) => (
                  <a key={i} href="#" className="w-12 h-12 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-400 hover:text-oakivo-primary hover:bg-white hover:border-oakivo-primary hover:shadow-sm transition-all">
                    <Icon size={20} />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Directory Sections */}
          <div className="lg:col-span-4 grid grid-cols-2 gap-10">
            <div>
              <h5 className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-300 mb-8">Solutions</h5>
              <ul className="space-y-4">
                {navLinks.solutions.map((l, i) => (
                  <li key={i}><Link to={l.path} className="text-gray-500 hover:text-oakivo-primary transition-colors text-base font-light">{l.label}</Link></li>
                ))}
              </ul>
            </div>
            <div>
              <h5 className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-300 mb-8">Architecture</h5>
              <ul className="space-y-4">
                {navLinks.architecture.map((l, i) => (
                  <li key={i}><Link to={l.path} className="text-gray-500 hover:text-oakivo-primary transition-colors text-base font-light">{l.label}</Link></li>
                ))}
              </ul>
            </div>
          </div>

          {/* Intelligence Newsletter */}
          <div className="lg:col-span-3">
             <h5 className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-300 mb-8">Intelligence</h5>
             <div className="bg-oakivo-surface border border-gray-100 p-8 rounded-[2.5rem] shadow-sm">
                <p className="text-sm font-bold text-oakivo-primary mb-6">Receive Technical Briefings</p>
                <form onSubmit={handleSubscribe} className="space-y-4">
                   <div className="relative">
                      <input 
                        type="email" 
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Work Email"
                        className={`w-full bg-white border border-gray-100 rounded-xl px-5 py-4 text-sm focus:outline-none focus:border-oakivo-primary transition-all ${status === 'error' ? 'border-red-500' : ''}`}
                      />
                      <button 
                        type="submit" 
                        disabled={status !== 'idle'}
                        className="absolute right-2 top-2 bottom-2 w-10 bg-oakivo-primary text-white rounded-lg flex items-center justify-center hover:bg-black transition-all shadow-md"
                      >
                         {status === 'submitting' ? <Loader2 size={16} className="animate-spin" /> : status === 'success' ? <Check size={16} /> : <Send size={16} />}
                      </button>
                   </div>
                </form>
             </div>
          </div>
        </div>

        {/* Status Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between py-10 border-y border-gray-50 mb-10 gap-8">
           <div className="flex items-center gap-10">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-oakivo-secondary animate-pulse" />
                <span className="text-[10px] font-black uppercase tracking-widest text-oakivo-primary">Logic Node: Active</span>
              </div>
              <div className="flex items-center gap-3">
                <ShieldCheck size={14} className="text-gray-300" />
                <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">SOC2 Aligned</span>
              </div>
           </div>
           <div className="flex items-center gap-10">
              <Link to={NavRoute.PRIVACY} className="text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-oakivo-primary transition-colors">Privacy Protocol</Link>
              <Link to={NavRoute.COMPLIANCE} className="text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-oakivo-primary transition-colors">Security Matrix</Link>
           </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="flex flex-col md:flex-row items-center gap-10">
             <div className="flex items-center gap-3 text-[10px] font-black text-gray-400 uppercase tracking-[0.3em]">
                <Copyright size={14} className="text-oakivo-secondary" /> {new Date().getFullYear()} Oakivo Solutions Inc.
             </div>
             <button onClick={() => setLanguage(language === 'en' ? 'fr' : 'en')} className="flex items-center gap-2 text-[10px] font-black text-gray-400 hover:text-oakivo-primary transition-all uppercase tracking-widest">
               <Globe size={14} /> {language === 'en' ? 'VERSION FRANÇAISE' : 'ENGLISH VERSION'}
             </button>
          </div>

          <button 
             onClick={scrollToTop} 
             className="w-12 h-12 rounded-full border border-gray-100 flex items-center justify-center bg-gray-50 hover:bg-oakivo-primary hover:text-white transition-all hover:scale-110 shadow-sm group"
          >
             <ArrowUp size={20} className="group-hover:-translate-y-1 transition-transform" />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;