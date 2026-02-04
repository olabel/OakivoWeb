
import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { 
  Linkedin, Twitter, Github, ArrowUp, Mail, MapPin, 
  ArrowRight, Check, Loader2, Globe, Shield, Sparkles, 
  Clock, ChevronRight, Activity, Cpu, Database, Zap, 
  Terminal, ShieldCheck, Fingerprint, BarChart3, Radio,
  // Added missing icon imports BrainCircuit and Send
  BrainCircuit, Send
} from 'lucide-react';
import { NavRoute } from '../types';
import Button from './Button';
import Logo from './Logo';
import { useLanguage } from '../context/LanguageContext';
import { db } from '../utils/database';

const TelemetryItem = ({ label, value, icon: Icon }: { label: string, value: string | number, icon: any }) => (
  <div className="bg-white/5 border border-white/5 p-4 rounded-2xl backdrop-blur-sm group hover:border-oakivo-secondary/30 transition-all">
    <div className="flex items-center gap-2 text-[8px] font-black text-white/30 uppercase tracking-[0.2em] mb-2">
      <Icon size={12} className="text-oakivo-secondary" /> {label}
    </div>
    <div className="text-sm font-bold tracking-tight text-white/90">{value}</div>
  </div>
);

const Footer: React.FC = () => {
  const { t, language, setLanguage } = useLanguage();
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [localTime, setLocalTime] = useState('');
  const [reasoningCycles, setReasoningCycles] = useState(1482092);

  useEffect(() => {
    const updateTime = () => {
      const options: any = { timeZone: 'America/Moncton', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true };
      setLocalTime(new Intl.DateTimeFormat('en-US', options).format(new Date()));
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    const cycleTimer = setInterval(() => {
      setReasoningCycles(prev => prev + Math.floor(Math.random() * 5));
    }, 2000);
    return () => { clearInterval(timer); clearInterval(cycleTimer); };
  }, []);

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

  const hubLinks = [
    { label: t('nav.services'), path: NavRoute.SERVICES, tag: '01' },
    { label: t('nav.verticals'), path: NavRoute.VERTICALS, tag: '02' },
    { label: t('nav.work'), path: NavRoute.CASE_STUDIES, tag: '03' },
    { label: t('nav.about'), path: NavRoute.ABOUT, tag: '04' },
    { label: t('nav.blog'), path: NavRoute.BLOG, tag: '05' },
    { label: t('nav.careers'), path: NavRoute.CAREERS, tag: '06' },
    { label: t('nav.contact'), path: NavRoute.CONTACT, tag: '07' },
    { label: 'Admin Portal', path: NavRoute.ADMIN_PORTAL, tag: '08' }
  ];

  return (
    <footer className="bg-[#020504] text-white font-sans relative overflow-hidden">
      {/* 
        PRE-FOOTER: Conversion Ribbon
      */}
      <div className="relative border-y border-white/5 bg-gradient-to-r from-oakivo-primary/20 to-transparent py-24 group">
        <div className="absolute inset-0 opacity-[0.02] bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            <div className="max-w-3xl">
              <h2 className="text-4xl md:text-7xl font-serif-display font-bold leading-none tracking-tighter mb-6">
                Ready to de-couple <br />
                <span className="text-oakivo-secondary italic font-light">technical debt?</span>
              </h2>
              <p className="text-xl text-gray-400 font-light max-w-xl">
                Our principal architects are online. Request a systemic audit to map your organization's digital trajectory today.
              </p>
            </div>
            <Link to={NavRoute.CONTACT}>
              <button className="bg-white text-black px-12 py-6 rounded-2xl text-xl font-bold shadow-premium hover:bg-oakivo-secondary hover:scale-105 transition-all flex items-center gap-4 group/btn">
                Initiate Handshake <ArrowRight size={24} className="group-hover/btn:translate-x-2 transition-transform" />
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* 
        MAIN FOOTER: Intelligence Hub
      */}
      <div className="container mx-auto px-6 pt-32 pb-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 mb-24">
          
          {/* Section 1: Brand & Agentic Logic */}
          <div className="lg:col-span-4 space-y-12">
            <div>
              <Logo className="h-10 mb-8" light={true} />
              <div className="p-8 bg-white/5 rounded-[2.5rem] border border-white/5 relative overflow-hidden group/viz">
                <div className="absolute top-0 right-0 p-6 opacity-[0.05] text-oakivo-secondary group-hover/viz:opacity-10 transition-opacity">
                  <Database size={100} />
                </div>
                <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-oakivo-secondary mb-6 flex items-center gap-2">
                  <Zap size={14} /> Agentic AI Value Prop
                </h4>
                <p className="text-gray-300 font-light leading-relaxed text-lg mb-8">
                  Oakivo orchestrates autonomous logic into your Odoo core. We don't just alert; we initiate corrective action, fulfilling orders and reconciling inventory in real-time.
                </p>
                <div className="flex items-center gap-6">
                  <div className="flex -space-x-3">
                    {[1,2,3].map(i => <div key={i} className="w-10 h-10 rounded-full border-4 border-[#020504] bg-white/10 flex items-center justify-center text-[10px] font-bold">OS</div>)}
                  </div>
                  <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Orchestration Nodes Active</span>
                </div>
              </div>
            </div>
            
            <div className="flex gap-4">
              {[Linkedin, Twitter, Github].map((Icon, i) => (
                <a key={i} href="#" className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-oakivo-secondary hover:text-black hover:scale-110 transition-all duration-500">
                  <Icon size={24} />
                </a>
              ))}
            </div>
          </div>

          {/* Section 2: Intelligence Hub (Node Grid) */}
          <div className="lg:col-span-4">
            <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-white/30 mb-12 flex items-center gap-3">
              <Terminal size={14} /> Intelligence Hub
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-6">
              {hubLinks.map((link, i) => (
                <Link key={i} to={link.path} className="group flex items-center gap-4 py-2">
                  <span className="text-[9px] font-black text-white/20 group-hover:text-oakivo-secondary transition-colors">[{link.tag}]</span>
                  <span className="text-gray-400 group-hover:text-white group-hover:translate-x-2 transition-all text-lg font-light leading-none">
                    {link.label}
                  </span>
                </Link>
              ))}
            </div>
            
            <div className="mt-16 pt-12 border-t border-white/5">
              <div className="flex items-center gap-6">
                 <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-oakivo-secondary">
                    <ShieldCheck size={24} />
                 </div>
                 <div>
                    <p className="text-[9px] font-black uppercase tracking-[0.3em] text-white/30">Technical Sovereignty</p>
                    <p className="text-sm font-bold text-gray-300">100% Native Canadian Residency</p>
                 </div>
              </div>
            </div>
          </div>

          {/* Section 3: Telemetry & Transmission */}
          <div className="lg:col-span-4 space-y-12">
            <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-white/30 mb-8 flex items-center gap-3">
              <Radio size={14} className="animate-pulse" /> Operational Telemetry
            </h4>
            
            <div className="grid grid-cols-2 gap-4">
               {/* TelemetryItem with BrainCircuit icon */}
               <TelemetryItem label="Active Reasonings" value={reasoningCycles.toLocaleString()} icon={BrainCircuit} />
               <TelemetryItem label="System Health" value="OPTIMIZED" icon={Activity} />
               <TelemetryItem label="Local Sync" value={localTime} icon={Clock} />
               <TelemetryItem label="Decision Latency" value="4.2ms" icon={Zap} />
            </div>

            <div className="space-y-6">
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30">Intelligence Transmission</p>
              <form onSubmit={handleSubscribe} className="relative group">
                <input 
                  type="email" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={status === 'success' ? "TRANSMISSION SUCCESSFUL" : "Corporate Intelligence Node"}
                  className={`w-full bg-white/5 border border-white/10 rounded-2xl py-6 pl-8 pr-20 text-sm text-white focus:outline-none focus:border-oakivo-secondary transition-all backdrop-blur-md group-hover:bg-white/10 ${status === 'error' ? 'border-red-500' : ''}`}
                  disabled={status === 'submitting' || status === 'success'}
                />
                <button 
                  type="submit" 
                  className={`absolute right-3 top-3 bottom-3 w-14 rounded-xl flex items-center justify-center transition-all ${status === 'success' ? 'bg-green-500 text-white' : 'bg-oakivo-secondary text-black hover:bg-white shadow-2xl'}`}
                  disabled={!email.trim() || status !== 'idle'}
                >
                  {/* Transmission status button with Send icon */}
                  {status === 'submitting' ? <Loader2 size={18} className="animate-spin" /> : status === 'success' ? <Check size={18} /> : <Send size={20} />}
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* 
          BOTTOM PROTOCOL BAR
        */}
        <div className="pt-16 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-12">
          <div className="flex flex-col md:flex-row items-center gap-12">
             <span className="text-[10px] font-black text-gray-600 uppercase tracking-[0.5em]">&copy; {new Date().getFullYear()} Oakivo Solutions Inc.</span>
             <button onClick={() => setLanguage(language === 'en' ? 'fr' : 'en')} className="flex items-center gap-3 text-[10px] font-black text-white/30 hover:text-oakivo-secondary transition-all uppercase tracking-widest">
               <Globe size={14} /> {language === 'en' ? 'SWITCH TO FRENCH PROTOCOL' : 'VERSION ANGLAISE'}
             </button>
          </div>

          <div className="flex items-center gap-10">
             <Link to={NavRoute.PRIVACY} className="text-[10px] font-black text-gray-500 hover:text-white uppercase tracking-widest flex items-center gap-2">
               <Shield size={14} /> {t('footer.privacy')}
             </Link>
             <button 
                onClick={scrollToTop} 
                className="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center bg-white/5 hover:bg-white hover:text-black transition-all hover:scale-110 shadow-2xl group"
                aria-label="Return to Top"
             >
                <ArrowUp size={24} className="group-hover:-translate-y-2 transition-transform duration-500" />
             </button>
          </div>
        </div>
      </div>
      
      {/* Decorative Kinetic Background Grid */}
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none bg-[linear-gradient(to_right,#ffffff12_1px,transparent_1px),linear-gradient(to_bottom,#ffffff12_1px,transparent_1px)] bg-[size:60px_60px]"></div>
    </footer>
  );
};

export default Footer;
