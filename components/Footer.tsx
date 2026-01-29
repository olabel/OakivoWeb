import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Linkedin, Twitter, Github, ArrowUp, Mail, MapPin, ArrowRight, Check, Loader2, Shield, AlertCircle, Clock, Cloud, Lock } from 'lucide-react';
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
      {/* Decorative Gradients */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-oakivo-secondary to-transparent opacity-30"></div>
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-oakivo-secondary/5 rounded-full blur-[120px] -mr-40 -mb-40"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-24">
          
          {/* Brand & Newsletter */}
          <div className="lg:col-span-5 space-y-10">
             <div className="max-w-md">
                <Logo className="h-12 mb-8" light={true} />
                <h3 className="text-4xl font-serif-display font-bold mb-6 leading-[1.1]">
                  {t('footer.tagline_1')} <br/>
                  <span className="text-oakivo-secondary">{t('footer.tagline_2')}</span>
                </h3>
                <p className="text-gray-400 mb-8 leading-relaxed text-lg font-light">
                  {t('footer.newsletter_text')}
                </p>
                
                <form onSubmit={handleSubscribe} className="relative group max-w-sm">
                  <input 
                    type="email" 
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={status === 'success' ? "Subscribed!" : t('footer.newsletter_placeholder')}
                    className={`w-full bg-white/5 border rounded-2xl py-5 pl-6 pr-14 text-white placeholder-gray-500 focus:outline-none transition-all disabled:opacity-50 ${status === 'error' ? 'border-red-500' : 'border-white/10 group-hover:border-oakivo-secondary/50 focus:border-oakivo-secondary'}`}
                    disabled={status === 'submitting' || status === 'success'}
                  />
                  <button 
                    type="submit" 
                    disabled={status !== 'idle' || !email.trim()}
                    className={`absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${status === 'success' ? 'bg-green-500' : status === 'error' ? 'bg-red-500' : 'bg-oakivo-secondary text-oakivo-primary hover:scale-110 disabled:bg-gray-800'}`}
                  >
                    {status === 'submitting' ? <Loader2 className="animate-spin" size={18} /> : status === 'success' ? <Check size={18} /> : status === 'error' ? <AlertCircle size={18} /> : <ArrowRight size={20} />}
                  </button>
                </form>
             </div>

             {/* Local Nexus & Socials */}
             <div className="flex flex-wrap items-center gap-10">
                <div className="flex gap-4">
                  {[
                    { Icon: Linkedin, href: "https://linkedin.com/company/oakivo" },
                    { Icon: Twitter, href: "https://twitter.com/oakivo" },
                    { Icon: Github, href: "https://github.com/oakivo" },
                    { Icon: Mail, href: "mailto:hello@oakivo.com" }
                  ].map(({ Icon, href }, i) => (
                    <a key={i} href={href} target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-2xl border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all duration-500 group">
                      <Icon size={20} className="group-hover:scale-110 transition-transform" />
                    </a>
                  ))}
                </div>
                <div className="h-10 w-[1px] bg-white/10 hidden sm:block"></div>
                <div className="flex items-center gap-3">
                   <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-oakivo-secondary">
                      <Clock size={18} />
                   </div>
                   <div>
                      <span className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest">Dieppe, NB Time</span>
                      <span className="block text-sm font-bold">{localTime}</span>
                   </div>
                </div>
             </div>
          </div>

          {/* Links Grid */}
          <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-3 gap-12">
             <div>
                <h4 className="font-bold mb-8 text-white text-lg font-serif-display">{t('footer.col_capabilities')}</h4>
                <ul className="space-y-4 text-gray-400">
                  {['Odoo 18 Orchestration', 'Intelligent Automation', 'Zero-Trust Security', 'Industrial IoT Sync', 'Data Modernization'].map((item, i) => (
                    <li key={i}><Link to={NavRoute.SERVICES} className="hover:text-oakivo-secondary transition-colors flex items-center gap-3 group">
                      <div className="w-1.5 h-[1px] bg-oakivo-secondary opacity-0 group-hover:opacity-100 group-hover:w-3 transition-all"></div> {item}
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
                  <li><Link to={NavRoute.CONTACT} className="hover:text-oakivo-secondary transition-colors">{t('nav.contact')}</Link></li>
                </ul>
             </div>

             <div>
                <h4 className="font-bold mb-8 text-white text-lg font-serif-display">Regional Ecosystem</h4>
                <ul className="space-y-6 text-gray-400">
                  <li className="flex gap-4">
                    <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-oakivo-secondary shrink-0">
                      <MapPin size={18} />
                    </div>
                    <div>
                      <strong className="text-white block font-serif-display">Atlantic Hub (HQ)</strong>
                      <span className="text-xs">21 Delta St. Dieppe, NB</span>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-oakivo-secondary shrink-0">
                      <MapPin size={18} />
                    </div>
                    <div>
                      <strong className="text-white block font-serif-display">Ontario Central</strong>
                      <span className="text-xs">King St. West, Toronto</span>
                    </div>
                  </li>
                  <li className="p-4 bg-white/5 border border-white/10 rounded-2xl">
                     <div className="flex items-center gap-3 mb-2">
                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                        <span className="text-[10px] font-bold uppercase tracking-widest text-white">Managed Infrastructure</span>
                     </div>
                     <div className="flex items-center justify-between text-[10px] font-medium text-gray-400">
                        <span>Systems Healthy</span>
                        <span>99.9% Uptime</span>
                     </div>
                  </li>
                </ul>
             </div>
          </div>
        </div>

        {/* Legal & Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-wrap items-center gap-8 text-xs font-medium text-gray-500">
             <span>&copy; {new Date().getFullYear()} Oakivo Solutions Inc.</span>
             <Link to={NavRoute.PRIVACY} className="hover:text-white transition-colors">Privacy & Sovereignty</Link>
             <Link to={NavRoute.COMPLIANCE} className="hover:text-white transition-colors">Compliance Matrix</Link>
             <Link to="/admin-portal" className="text-white/20 hover:text-oakivo-secondary flex items-center gap-2 transition-all">
                <Lock size={12} /> Vault Access
             </Link>
          </div>

          <div className="flex items-center gap-6">
             {/* Security Badges */}
             <div className="flex items-center gap-4 opacity-40 grayscale group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700">
                <div className="flex items-center gap-2 text-[10px] font-bold text-white border border-white/20 px-3 py-1.5 rounded-lg">
                   <Shield size={12} /> SOC2 Ready
                </div>
                <div className="flex items-center gap-2 text-[10px] font-bold text-white border border-white/20 px-3 py-1.5 rounded-lg">
                   <Cloud size={12} /> CA Data Residency
                </div>
             </div>
             <button 
              onClick={scrollToTop} 
              className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-oakivo-secondary hover:text-oakivo-primary transition-all group shadow-2xl"
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