import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Linkedin, Twitter, Github, ArrowUp, 
  ArrowRight, Check, Loader2, Globe, Shield, 
  Send, Copyright, ShieldCheck, Zap, Activity,
  Database, Cpu, Network, Terminal, Sparkles,
  Command, Box
} from 'lucide-react';
import { NavRoute } from '../types';
import Logo from './Logo';
import { useLanguage } from '../context/LanguageContext';
import { db } from '../utils/database';

const Footer: React.FC = () => {
  const { t, language, setLanguage } = useLanguage();
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [systemUptime, setSystemUptime] = useState(99.9982);
  const [activeNodes, setActiveNodes] = useState(1482);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  // Simulate live telemetry
  useEffect(() => {
    const interval = setInterval(() => {
      setSystemUptime(prev => Math.min(99.9999, Math.max(99.9970, prev + (Math.random() - 0.5) * 0.0001)));
      setActiveNodes(prev => prev + (Math.random() > 0.5 ? 1 : -1));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

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

  const directory = {
    orchestration: [
      { label: t('nav.services'), path: NavRoute.SERVICES },
      { label: t('nav.verticals'), path: NavRoute.VERTICALS },
      { label: t('nav.work'), path: NavRoute.CASE_STUDIES },
      { label: 'Odoo 18 Matrix', path: NavRoute.SERVICES },
    ],
    architecture: [
      { label: t('nav.about'), path: NavRoute.ABOUT },
      { label: t('nav.careers'), path: NavRoute.CAREERS },
      { label: 'Admin Portal', path: NavRoute.ADMIN_PORTAL },
      { label: 'Partner Network', path: NavRoute.ABOUT },
    ],
    intelligence: [
      { label: t('nav.blog'), path: NavRoute.BLOG },
      { label: 'Privacy Protocol', path: NavRoute.PRIVACY },
      { label: 'Security Matrix', path: NavRoute.COMPLIANCE },
      { label: 'System Status', path: NavRoute.COMPLIANCE },
    ]
  };

  return (
    <footer className="bg-[#020504] text-white font-sans pt-32 pb-12 relative overflow-hidden selection:bg-oakivo-secondary selection:text-black">
      {/* Cinematic Background Elements */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-oakivo-primary/20 rounded-full blur-[160px] -mr-60 -mt-60 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-oakivo-secondary/5 rounded-full blur-[140px] -ml-60 -mb-60 pointer-events-none"></div>
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        
        {/* Top Tier: Brand Manifesto & Tactical Handoff */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 mb-32 border-b border-white/5 pb-24">
          
          <div className="lg:col-span-7">
            <Logo className="h-12 mb-12" light={true} />
            <h2 className="text-4xl md:text-6xl font-serif-display font-bold leading-[1.1] tracking-tighter mb-10 text-balance">
              Building the <span className="text-oakivo-secondary italic font-light">autonomous engine</span> for Canada's industrial elite.
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-oakivo-secondary">
                  <Cpu size={20} />
                  <span className="text-[10px] font-black uppercase tracking-[0.4em]">Agentic Intelligence</span>
                </div>
                <p className="text-gray-400 font-light leading-relaxed">
                  We de-couple human labor from data processing through high-velocity AI reasoning engines built on sovereign infrastructure.
                </p>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-oakivo-secondary">
                  <Database size={20} />
                  <span className="text-[10px] font-black uppercase tracking-[0.4em]">ERP Orchestration</span>
                </div>
                <p className="text-gray-400 font-light leading-relaxed">
                  Surgical Odoo 18 deployments that serve as the high-fidelity nervous system for multi-location industrial entities.
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="bg-white/5 border border-white/10 rounded-[48px] p-10 md:p-14 backdrop-blur-2xl relative group overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-5 text-oakivo-secondary transition-all group-hover:opacity-10 group-hover:rotate-12 duration-1000">
                <Terminal size={120} />
              </div>
              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 bg-oakivo-secondary/10 text-oakivo-secondary px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest mb-8 border border-oakivo-secondary/20">
                  <Sparkles size={12} /> Intelligence Transmission
                </div>
                <h4 className="text-2xl font-serif-display font-bold mb-8">Stay ahead of the <br/>autonomous shift.</h4>
                <form onSubmit={handleSubscribe} className="space-y-4">
                  <div className="relative">
                    <input 
                      type="email" 
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Corporate Email Protocol"
                      className={`w-full bg-white/5 border border-white/10 rounded-2xl py-6 pl-8 pr-20 text-sm text-white focus:outline-none focus:border-oakivo-secondary transition-all placeholder:text-gray-600 ${status === 'error' ? 'border-red-500' : ''}`}
                    />
                    <button 
                      type="submit" 
                      disabled={status !== 'idle'}
                      className="absolute right-2 top-2 bottom-2 w-14 bg-oakivo-secondary text-black rounded-xl flex items-center justify-center hover:bg-white hover:scale-105 transition-all shadow-lg active:scale-95"
                    >
                       {status === 'submitting' ? <Loader2 size={20} className="animate-spin" /> : status === 'success' ? <Check size={20} /> : <Send size={20} />}
                    </button>
                  </div>
                  <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest flex items-center gap-2 px-2">
                    <ShieldCheck size={14} className="text-oakivo-secondary" /> Data Sovereign Residency: Canada
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>

        {/* Middle Tier: Interactive Navigation Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-12 gap-12 mb-32">
          
          <div className="lg:col-span-3">
            <h5 className="text-[11px] font-black uppercase tracking-[0.5em] text-white/30 mb-10">Orchestration</h5>
            <ul className="space-y-4">
              {directory.orchestration.map((item, i) => (
                <li key={i}>
                  <Link to={item.path} className="text-gray-400 hover:text-oakivo-secondary transition-all flex items-center gap-3 group text-lg font-light">
                    <span className="w-1.5 h-1.5 rounded-full bg-white/10 group-hover:bg-oakivo-secondary transition-colors" />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h5 className="text-[11px] font-black uppercase tracking-[0.5em] text-white/30 mb-10">Architecture</h5>
            <ul className="space-y-4">
              {directory.architecture.map((item, i) => (
                <li key={i}>
                  <Link to={item.path} className="text-gray-400 hover:text-oakivo-secondary transition-all flex items-center gap-3 group text-lg font-light">
                    <span className="w-1.5 h-1.5 rounded-full bg-white/10 group-hover:bg-oakivo-secondary transition-colors" />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h5 className="text-[11px] font-black uppercase tracking-[0.5em] text-white/30 mb-10">Intelligence</h5>
            <ul className="space-y-4">
              {directory.intelligence.map((item, i) => (
                <li key={i}>
                  <Link to={item.path} className="text-gray-400 hover:text-oakivo-secondary transition-all flex items-center gap-3 group text-lg font-light">
                    <span className="w-1.5 h-1.5 rounded-full bg-white/10 group-hover:bg-oakivo-secondary transition-colors" />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h5 className="text-[11px] font-black uppercase tracking-[0.5em] text-white/30 mb-10">Live Telemetry</h5>
            <div className="bg-white/5 border border-white/5 rounded-3xl p-8 space-y-8">
               <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Activity size={18} className="text-oakivo-secondary" />
                    <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500">System Uptime</span>
                  </div>
                  <span className="font-mono text-sm text-white">{systemUptime.toFixed(4)}%</span>
               </div>
               <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Network size={18} className="text-oakivo-secondary" />
                    <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Active Nodes</span>
                  </div>
                  <span className="font-mono text-sm text-white">{activeNodes}</span>
               </div>
               <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Command size={18} className="text-oakivo-secondary" />
                    <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Logic Ops/s</span>
                  </div>
                  <span className="font-mono text-sm text-white">4,192</span>
               </div>
               <div className="pt-4 border-t border-white/5 flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-oakivo-secondary animate-pulse" />
                  <span className="text-[9px] font-black text-oakivo-secondary uppercase tracking-[0.4em]">All Systems Nominal</span>
               </div>
            </div>
          </div>
        </div>

        {/* Bottom Tier: Institutional Legal & Interaction */}
        <div className="pt-16 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-10">
          
          <div className="flex flex-col md:flex-row items-center gap-10">
            <div className="flex items-center gap-3 text-[10px] font-black text-gray-600 uppercase tracking-[0.4em]">
              <Copyright size={14} className="text-oakivo-secondary" /> {new Date().getFullYear()} Oakivo Solutions Inc.
            </div>
            <div className="flex items-center gap-6">
              {[Linkedin, Twitter, Github].map((Icon, i) => (
                <a key={i} href="#" className="text-gray-600 hover:text-white transition-all transform hover:scale-125">
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-10">
            <button 
              onClick={() => setLanguage(language === 'en' ? 'fr' : 'en')}
              className="flex items-center gap-3 text-[10px] font-black text-gray-500 hover:text-oakivo-secondary transition-all uppercase tracking-[0.3em] group"
            >
              <Globe size={14} className="group-hover:rotate-180 transition-transform duration-1000" />
              {language === 'en' ? 'Switch to French Protocol' : 'Version Anglaise'}
            </button>
            
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

      {/* Interactive Scan Line Effect */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-oakivo-secondary/50 to-transparent opacity-20 pointer-events-none animate-scan-line"></div>
    </footer>
  );
};

export default Footer;