import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Linkedin, Twitter, Github, ArrowUp, Mail, MapPin, ArrowRight, Check, Loader2, Shield, AlertCircle, Clock, Cloud, Lock, Server, Activity } from 'lucide-react';
import { NavRoute } from '../types';
import Button from './Button';
import Logo from './Logo';
import { useLanguage } from '../context/LanguageContext';
import { db } from '../utils/database';

const Footer: React.FC = () => {
  const { t } = useLanguage();
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

  return (
    <footer className="bg-[#020504] text-white pt-32 pb-12 relative overflow-hidden border-t border-white/5">
      {/* Decorative Gradients for prestige */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-oakivo-secondary/40 to-transparent opacity-50"></div>
      <div className="absolute -bottom-40 -right-40 w-[600px] h-[600px] bg-oakivo-secondary/5 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-24">
          
          {/* Brand & Newsletter Section */}
          <div className="lg:col-span-5 space-y-12">
             <div className="max-w-md">
                <Logo className="h-14 mb-10" light={true} />
                <h3 className="text-4xl font-serif-display font-bold mb-8 leading-[1.05] tracking-tight">
                  {t('footer.tagline_1')} <br/>
                  <span className="text-oakivo-secondary">{t('footer.tagline_2')}</span>
                </h3>
                <p className="text-gray-400 mb-10 leading-relaxed text-lg font-light">
                  {t('footer.newsletter_text')}
                </p>
                
                <form onSubmit={handleSubscribe} className="relative group max-w-sm">
                  <input 
                    type="email" 
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={status === 'success' ? "Subscribed!" : t('footer.newsletter_placeholder')}
                    className={`w-full bg-white/5 border rounded-[20px] py-5 pl-6 pr-14 text-white placeholder-gray-500 focus:outline-none transition-all disabled:opacity-50 ${status === 'error' ? 'border-red-500/50' : 'border-white/10 group-hover:border-oakivo-secondary/40 focus:border-oakivo-secondary'}`}
                    disabled={status === 'submitting' || status === 'success'}
                  />
                  <button 
                    type="submit" 
                    disabled={status !== 'idle' || !email.trim()}
                    className={`absolute right-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-300 ${status === 'success' ? 'bg-green-500' : status === 'error' ? 'bg-red-500' : 'bg-oakivo-secondary text-oakivo-primary hover:scale-105 active:scale-95 disabled:bg-white/5 disabled:text-gray-600'}`}
                  >
                    {status === 'submitting' ? <Loader2 className="animate-spin" size={18} /> : status === 'success' ? <Check size={18} /> : status === 'error' ? <AlertCircle size={18} /> : <ArrowRight size={20} />}
                  </button>
                </form>
             </div>

             {/* Connection & Telemetry */}
             <div className="flex flex-wrap items-center gap-10">
                <div className="flex gap-4">
                  {[
                    { Icon: Linkedin, href: "https://linkedin.com/company/oakivo" },
                    { Icon: Twitter, href: "https://twitter.com/oakivo" },
                    { Icon: Github, href: "https://github.com/oakivo" },
                    { Icon: Mail, href: "mailto:hello@oakivo.com" }
                  ].map(({ Icon, href }, i) => (
                    <a key={i} href={href} target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-2xl border border-white/10 flex items-center justify-center hover:bg-white hover:text-[#020504] hover:border-white transition-all duration-500 group shadow-lg">
                      <Icon size={20} className="group-hover:scale-110 transition-transform" />
                    </a>
                  ))}
                </div>
                <div className="h-10 w-[1px] bg-white/10 hidden sm:block"></div>
                <div className="flex items-center gap-4">
                   <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-oakivo-secondary">
                      <Clock size={20} />
                   </div>
                   <div>
                      <span className="block text-[10px] font-black text-gray-500 uppercase tracking-widest leading-none mb-1.5">Atlantic Hub Time</span>
                      <span className="block text-sm font-bold tracking-tight">{localTime}</span>
                   </div>
                </div>
             </div>
          </div>

          {/* Site Map Columns */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-12 pt-6 lg:pt-0">
             <div>
                <h4 className="font-bold mb-10 text-white text-[11px] uppercase tracking-[0.3em] font-sans opacity-60">Matrix Hub</h4>
                <ul className="space-y-5 text-gray-400">
                  {['Odoo Orchestration', 'Agentic Automation', 'Cyber Resilience', 'Supply Chain AI', 'Strategic Audit'].map((item, i) => (
                    <li key={i}><Link to={NavRoute.SERVICES} className="hover:text-oakivo-secondary transition-colors text-base font-light flex items-center gap-2 group">
                      <div className="w-1 h-1 rounded-full bg-oakivo-secondary opacity-0 group-hover:opacity-100 transition-all"></div> {item}
                    </Link></li>
                  ))}
                </ul>
             </div>

             <div>
                <h4 className="font-bold mb-10 text-white text-[11px] uppercase tracking-[0.3em] font-sans opacity-60">Institution</h4>
                <ul className="space-y-5 text-gray-400">
                  <li><Link to={NavRoute.ABOUT} className="hover:text-oakivo-secondary transition-colors text-base font-light">{t('nav.about')}</Link></li>
                  <li><Link to={NavRoute.CASE_STUDIES} className="hover:text-oakivo-secondary transition-colors text-base font-light">{t('nav.work')}</Link></li>
                  <li><Link to={NavRoute.BLOG} className="hover:text-oakivo-secondary transition-colors text-base font-light">Perspectives</Link></li>
                  <li><Link to={NavRoute.CAREERS} className="hover:text-oakivo-secondary transition-colors text-base font-light">{t('nav.careers')}</Link></li>
                  <li><Link to={NavRoute.CONTACT} className="hover:text-oakivo-secondary transition-colors text-base font-light">{t('nav.contact')}</Link></li>
                </ul>
             </div>

             <div>
                <h4 className="font-bold mb-10 text-white text-[11px] uppercase tracking-[0.3em] font-sans opacity-60">Ecosystem Status</h4>
                <ul className="space-y-6">
                  <li className="flex gap-4">
                    <div className="w-11 h-11 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-oakivo-secondary shrink-0">
                      <MapPin size={18} />
                    </div>
                    <div>
                      <strong className="text-white block text-sm font-bold tracking-tight">Atlantic HQ</strong>
                      <span className="text-xs text-gray-500 font-light">Dieppe, NB Canada</span>
                    </div>
                  </li>
                  <li className="p-5 bg-white/5 border border-white/10 rounded-3xl group relative overflow-hidden">
                     <div className="absolute top-0 right-0 p-3 opacity-[0.1] text-oakivo-secondary group-hover:opacity-[0.2] transition-opacity">
                        <Activity size={40} />
                     </div>
                     <div className="flex items-center gap-3 mb-3">
                        <div className="w-2 h-2 rounded-full bg-oakivo-secondary animate-pulse"></div>
                        <span className="text-[10px] font-black uppercase tracking-widest text-white">Cloud Resilience</span>
                     </div>
                     <div className="flex items-center justify-between text-[11px] font-medium text-gray-400">
                        <span>Systems Optimized</span>
                        <span>99.9% SLA</span>
                     </div>
                  </li>
                </ul>
             </div>
          </div>
        </div>

        {/* Global Bottom Bar with Compliance Badges */}
        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="flex flex-wrap items-center gap-8 text-[11px] font-medium text-gray-500">
             <span>&copy; {new Date().getFullYear()} Oakivo Solutions Inc.</span>
             <Link to={NavRoute.PRIVACY} className="hover:text-white transition-colors tracking-tight">Privacy Protocol</Link>
             <Link to={NavRoute.COMPLIANCE} className="hover:text-white transition-colors tracking-tight">Institutional Compliance</Link>
             <Link to="/admin-portal" className="text-white/10 hover:text-oakivo-secondary flex items-center gap-2 transition-all">
                <Lock size={12} /> Vault
             </Link>
          </div>

          <div className="flex items-center gap-6">
             {/* Dynamic Compliance Matrix */}
             <div className="flex items-center gap-4 grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-700">
                <div className="flex items-center gap-2 text-[9px] font-black text-white border border-white/10 px-4 py-2 rounded-xl bg-white/5">
                   <Shield size={12} className="text-oakivo-secondary" /> SOC2 COMPLIANT
                </div>
                <div className="flex items-center gap-2 text-[9px] font-black text-white border border-white/10 px-4 py-2 rounded-xl bg-white/5">
                   <Cloud size={12} className="text-oakivo-secondary" /> CA RESIDENCY
                </div>
             </div>
             <button 
              onClick={scrollToTop} 
              className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center hover:bg-white hover:text-[#020504] transition-all group shadow-xl"
              aria-label="Back to top"
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
