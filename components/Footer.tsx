
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Linkedin, Twitter, Github, ArrowUp, Mail, MapPin, ArrowRight, Check, Loader2, Globe, Shield, Sparkles, Clock, ChevronRight, Activity, Cpu, Database, Zap } from 'lucide-react';
import { NavRoute } from '../types';
import Button from './Button';
import Logo from './Logo';
import { useLanguage } from '../context/LanguageContext';
import { db } from '../utils/database';

const Footer: React.FC = () => {
  const { t, language, setLanguage } = useLanguage();
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [localTime, setLocalTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const options: any = { timeZone: 'America/Moncton', hour: '2-digit', minute: '2-digit', hour12: true };
      setLocalTime(new Intl.DateTimeFormat('en-US', options).format(new Date()));
    };
    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

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
      db.saveEntry('subscriber', { email });
      await new Promise(resolve => setTimeout(resolve, 1500));
      setStatus('success');
      setEmail('');
      setTimeout(() => setStatus('idle'), 5000);
    } catch (err) {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  // Nav Links for the balanced 2-column Hub
  const hubLinks = [
    { label: t('nav.services'), path: NavRoute.SERVICES },
    { label: t('nav.work'), path: NavRoute.CASE_STUDIES },
    { label: t('nav.about'), path: NavRoute.ABOUT },
    { label: t('nav.verticals'), path: NavRoute.VERTICALS },
    { label: t('nav.blog'), path: NavRoute.BLOG },
    { label: t('nav.careers'), path: NavRoute.CAREERS },
    { label: t('nav.contact'), path: NavRoute.CONTACT },
    { label: 'Admin Access', path: NavRoute.ADMIN_PORTAL }
  ];

  return (
    <footer className="bg-[#020504] text-white pt-24 pb-12 font-sans relative overflow-hidden">
      {/* Background Kinetic Layer */}
      <div className="absolute inset-0 z-[1] opacity-[0.03] pointer-events-none bg-[linear-gradient(to_right,#ffffff12_1px,transparent_1px),linear-gradient(to_bottom,#ffffff12_1px,transparent_1px)] bg-[size:40px_40px]"></div>
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-oakivo-secondary/40 to-transparent"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 mb-20">
          
          {/* Section 1: Brand & AI Value Proposition */}
          <div className="lg:col-span-4 space-y-10">
            <Logo className="h-10" light={true} />
            <div className="space-y-6">
              <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-oakivo-secondary">The AI Advantage</h4>
              <p className="text-gray-400 font-light leading-relaxed text-lg lg:text-xl">
                {t('footer.ai_prop_text')}
              </p>
              <div className="flex items-center gap-6 pt-4">
                 {[
                   { icon: <Zap size={16} />, label: t('footer.ai_pillar_1') },
                   { icon: <Shield size={16} />, label: t('footer.ai_pillar_2') }
                 ].map((pill, i) => (
                   <div key={i} className="flex items-center gap-2 text-[9px] font-black uppercase tracking-widest text-white/40">
                      {pill.icon} {pill.label}
                   </div>
                 ))}
              </div>
            </div>
            <div className="flex gap-4">
              {[Linkedin, Twitter, Github].map((Icon, i) => (
                <a key={i} href="#" className="w-12 h-12 rounded-2xl border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all duration-500 bg-white/5 hover:scale-110">
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </div>

          {/* Section 2: Oakivo Hub (Visually Balanced 2-Column Grid) */}
          <div className="lg:col-span-4 space-y-10">
            <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-white/40">Oakivo Hub</h4>
            <div className="grid grid-cols-2 gap-x-8 gap-y-5">
              {hubLinks.map((link, i) => (
                <Link key={i} to={link.path} className="text-gray-400 hover:text-oakivo-secondary transition-all text-[15px] font-light flex items-center gap-3 group">
                  <ChevronRight size={12} className="opacity-30 group-hover:translate-x-1 group-hover:opacity-100 transition-all" /> 
                  {link.label}
                </Link>
              ))}
            </div>
            <div className="pt-8 border-t border-white/5">
               <div className="flex items-center gap-4 text-gray-500 text-[10px] font-bold uppercase tracking-widest">
                  <MapPin size={14} className="text-oakivo-secondary" /> {t('footer.hq_location')}
               </div>
            </div>
          </div>

          {/* Section 3: Intelligence Intake & Dynamics */}
          <div className="lg:col-span-4 space-y-10">
            <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-white/40">{t('footer.newsletter_text')}</h4>
            <div className="space-y-8">
              <form onSubmit={handleSubscribe} className="relative group">
                <input 
                  type="email" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={status === 'success' ? "Transmission Received" : t('footer.newsletter_placeholder')}
                  className={`w-full bg-white/5 border border-white/10 rounded-2xl py-5 pl-6 pr-16 text-sm text-white focus:outline-none focus:border-oakivo-secondary transition-all backdrop-blur-md group-hover:bg-white/10 ${status === 'error' ? 'border-red-500' : ''}`}
                  disabled={status === 'submitting' || status === 'success'}
                />
                <button 
                  type="submit" 
                  className={`absolute right-2 top-2 bottom-2 w-12 rounded-xl flex items-center justify-center transition-all ${status === 'success' ? 'bg-green-500 text-white' : 'bg-oakivo-secondary text-black hover:bg-white'}`}
                  disabled={!email.trim() || status !== 'idle'}
                >
                  {status === 'submitting' ? <Loader2 size={18} className="animate-spin" /> : status === 'success' ? <Check size={18} /> : <ArrowRight size={20} />}
                </button>
              </form>
              
              {/* Dynamic Telemetry Elements */}
              <div className="grid grid-cols-2 gap-4 pt-4">
                 <div className="bg-white/5 p-5 rounded-2xl border border-white/5 flex flex-col gap-2">
                    <div className="flex items-center gap-2 text-[8px] font-black text-white/30 uppercase tracking-widest">
                       <Clock size={12} className="text-oakivo-secondary" /> Local Sync
                    </div>
                    <span className="text-lg font-bold tracking-tight">{localTime}</span>
                 </div>
                 <div className="bg-white/5 p-5 rounded-2xl border border-white/5 flex flex-col gap-2">
                    <div className="flex items-center gap-2 text-[8px] font-black text-white/30 uppercase tracking-widest">
                       <Activity size={12} className="text-oakivo-secondary animate-pulse" /> System Health
                    </div>
                    <span className="text-lg font-bold tracking-tight text-oakivo-secondary">OPTIMIZED</span>
                 </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Protocol Bar */}
        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-col sm:flex-row items-center gap-8 text-[11px] font-black text-gray-600 uppercase tracking-widest">
             <span className="hover:text-gray-400 transition-colors">&copy; {new Date().getFullYear()} Oakivo Solutions Inc.</span>
             <button onClick={() => setLanguage(language === 'en' ? 'fr' : 'en')} className="hover:text-white transition-all text-white/30 flex items-center gap-2">
               <Globe size={14} /> {language === 'en' ? 'SWITCH TO FRENCH PROTOCOL' : 'VERSION ANGLAISE'}
             </button>
          </div>

          <div className="flex items-center gap-10">
             <Link to={NavRoute.PRIVACY} className="text-[10px] font-black text-gray-500 hover:text-white uppercase tracking-widest flex items-center gap-2">
               <Shield size={12} /> {t('footer.privacy')}
             </Link>
             <button 
                onClick={scrollToTop} 
                className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all bg-white/5 hover:scale-110 shadow-2xl group"
                aria-label="Back to Top"
             >
                <ArrowUp size={20} className="group-hover:-translate-y-1 transition-transform" />
             </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
