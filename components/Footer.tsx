import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { 
  Linkedin, Twitter, Github, ArrowUp, 
  ArrowRight, Check, Loader2, Globe, Shield, 
  Send, Copyright, ShieldCheck, Zap, Activity,
  Database, Cpu, Network, Terminal, Sparkles,
  Command, Box, Clock, ShieldAlert, CpuChip
} from 'lucide-react';
import { NavRoute } from '../types';
import Logo from './Logo';
import { useLanguage } from '../context/LanguageContext';
import { db } from '../utils/database';

const Footer: React.FC = () => {
  const { t, language, setLanguage } = useLanguage();
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  
  // Real-time dynamic states
  const [uptime, setUptime] = useState(99.9982);
  const [activeNodes, setActiveNodes] = useState(1482);
  const [hqTime, setHqTime] = useState(new Date());
  const [logIndex, setLogIndex] = useState(0);

  const logs = useMemo(() => [
    "LOGIC: RE-ARCHITECTING SUPPLY CHAIN...",
    "AI: OPTIMIZING AGENTIC REASONING...",
    "SEC: ZERO-TRUST IDENTITY SYNC...",
    "ERP: ORCHESTRATING ODOO 18 NODES...",
    "SYS: LATENCY OPTIMIZED TO 4.2ms...",
    "DATA: SOVEREIGN RESIDENCY VERIFIED..."
  ], []);

  useEffect(() => {
    const timer = setInterval(() => {
      setUptime(prev => Math.min(99.9999, Math.max(99.9970, prev + (Math.random() - 0.5) * 0.0001)));
      setActiveNodes(prev => prev + (Math.random() > 0.5 ? 1 : -1));
      setHqTime(new Date());
      setLogIndex(prev => (prev + 1) % logs.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [logs]);

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

  const directory = {
    orchestration: [
      { label: t('nav.services'), path: NavRoute.SERVICES },
      { label: t('nav.verticals'), path: NavRoute.VERTICALS },
      { label: t('nav.work'), path: NavRoute.CASE_STUDIES },
    ],
    architecture: [
      { label: t('nav.about'), path: NavRoute.ABOUT },
      { label: t('nav.careers'), path: NavRoute.CAREERS },
      { label: 'Admin Portal', path: NavRoute.ADMIN_PORTAL },
    ],
    intelligence: [
      { label: t('nav.blog'), path: NavRoute.BLOG },
      { label: 'Privacy Protocol', path: NavRoute.PRIVACY },
      { label: 'Security Matrix', path: NavRoute.COMPLIANCE },
    ]
  };

  return (
    <footer className="bg-[#020504] text-white font-sans pt-32 pb-12 relative overflow-hidden selection:bg-oakivo-secondary selection:text-black border-t border-white/5">
      {/* Background Ambience */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-oakivo-primary/20 rounded-full blur-[180px] -mr-80 -mt-80 pointer-events-none opacity-50"></div>
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        
        {/* Tier 1: Brand Power & Value Proposition */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 mb-32">
          <div className="lg:col-span-8">
            <Logo className="h-14 mb-16" light={true} />
            <h2 className="text-4xl md:text-7xl lg:text-8xl font-serif-display font-bold leading-[0.9] tracking-tighter mb-16">
              The high-fidelity <span className="text-oakivo-secondary italic font-light">Operating System</span> for Industrial Growth.
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <div className="space-y-6 group">
                <div className="w-12 h-12 rounded-xl bg-oakivo-secondary/10 flex items-center justify-center text-oakivo-secondary group-hover:bg-oakivo-secondary group-hover:text-black transition-all">
                   <Database size={24} />
                </div>
                <h3 className="text-xl font-bold tracking-tight">Digital Transformation</h3>
                <p className="text-gray-500 font-light leading-relaxed">
                  Decoupling legacy debt with surgical Odoo 18 orchestration tailored for Canada's industrial complexity.
                </p>
              </div>
              <div className="space-y-6 group">
                <div className="w-12 h-12 rounded-xl bg-oakivo-secondary/10 flex items-center justify-center text-oakivo-secondary group-hover:bg-oakivo-secondary group-hover:text-black transition-all">
                   <Cpu size={24} />
                </div>
                <h3 className="text-xl font-bold tracking-tight">AI Automation</h3>
                <p className="text-gray-500 font-light leading-relaxed">
                  Architecting Agentic reasoning engines that proactively manage supply chains and operational logistics.
                </p>
              </div>
              <div className="space-y-6 group">
                <div className="w-12 h-12 rounded-xl bg-oakivo-secondary/10 flex items-center justify-center text-oakivo-secondary group-hover:bg-oakivo-secondary group-hover:text-black transition-all">
                   <ShieldCheck size={24} />
                </div>
                <h3 className="text-xl font-bold tracking-tight">Industrial Resilience</h3>
                <p className="text-gray-500 font-light leading-relaxed">
                  Zero-Trust architecture and native Canadian data sovereignty to safeguard institutional intelligence.
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-4">
             <div className="bg-white/5 border border-white/10 rounded-[56px] p-12 backdrop-blur-3xl relative overflow-hidden h-full flex flex-col justify-between">
                <div className="absolute top-0 right-0 p-10 opacity-[0.03] text-oakivo-secondary">
                   <Zap size={180} />
                </div>
                <div>
                  <div className="inline-flex items-center gap-3 bg-oakivo-secondary/10 text-oakivo-secondary px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.3em] mb-10 border border-oakivo-secondary/20">
                    <Sparkles size={14} /> Strategic Intake
                  </div>
                  <h4 className="text-3xl font-serif-display font-bold mb-8">Ready to orchestrate <br/> your future?</h4>
                  <p className="text-gray-400 font-light mb-10">Connect with an architect for a systemic audit of your digital infrastructure.</p>
                  
                  <form onSubmit={handleSubscribe} className="space-y-4">
                    <div className="relative group">
                      <input 
                        type="email" 
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Corporate Email Address"
                        className={`w-full bg-black border border-white/10 rounded-2xl py-6 pl-8 pr-16 text-sm text-white focus:outline-none focus:border-oakivo-secondary transition-all ${status === 'error' ? 'border-red-500' : ''}`}
                      />
                      <button 
                        type="submit" 
                        disabled={status !== 'idle'}
                        className="absolute right-2 top-2 bottom-2 w-12 bg-white text-black rounded-xl flex items-center justify-center hover:bg-oakivo-secondary transition-all"
                      >
                         {status === 'submitting' ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
                      </button>
                    </div>
                  </form>
                </div>
                <div className="mt-12 pt-12 border-t border-white/5">
                   <div className="flex items-center gap-4 text-gray-500">
                      <Shield size={16} className="text-oakivo-secondary" />
                      <span className="text-[10px] font-black uppercase tracking-widest">ISO 27001 Aligned Framework</span>
                   </div>
                </div>
             </div>
          </div>
        </div>

        {/* Tier 2: The Command Center (Interactive Telemetry & Navigation) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 mb-32 pt-24 border-t border-white/5">
          
          <div className="lg:col-span-3">
             <h5 className="text-[11px] font-black uppercase tracking-[0.5em] text-white/30 mb-12 flex items-center gap-3">
               <Database size={14} /> Orchestration
             </h5>
             <ul className="space-y-6">
                {directory.orchestration.map((l, i) => (
                  <li key={i}><Link to={l.path} className="text-gray-400 hover:text-oakivo-secondary transition-all text-xl font-light">{l.label}</Link></li>
                ))}
             </ul>
          </div>

          <div className="lg:col-span-3">
             <h5 className="text-[11px] font-black uppercase tracking-[0.5em] text-white/30 mb-12 flex items-center gap-3">
               <Network size={14} /> Architecture
             </h5>
             <ul className="space-y-6">
                {directory.architecture.map((l, i) => (
                  <li key={i}><Link to={l.path} className="text-gray-400 hover:text-oakivo-secondary transition-all text-xl font-light">{l.label}</Link></li>
                ))}
             </ul>
          </div>

          <div className="lg:col-span-3">
             <h5 className="text-[11px] font-black uppercase tracking-[0.5em] text-white/30 mb-12 flex items-center gap-3">
               <Terminal size={14} /> Intelligence
             </h5>
             <ul className="space-y-6">
                {directory.intelligence.map((l, i) => (
                  <li key={i}><Link to={l.path} className="text-gray-400 hover:text-oakivo-secondary transition-all text-xl font-light">{l.label}</Link></li>
                ))}
             </ul>
          </div>

          <div className="lg:col-span-3">
             <div className="bg-black/40 border border-white/5 rounded-[40px] p-8 space-y-10 relative overflow-hidden group">
                {/* Dynamic Terminal Feed */}
                <div className="bg-black rounded-2xl p-6 font-mono text-[10px] text-oakivo-secondary border border-white/10 relative overflow-hidden h-24">
                   <div className="absolute top-0 left-0 w-full h-[1px] bg-oakivo-secondary/20 animate-scan-line"></div>
                   <div className="flex items-center gap-2 mb-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></div>
                      <span className="opacity-50 uppercase tracking-widest">Active Process</span>
                   </div>
                   <p className="animate-pulse">{logs[logIndex]}</p>
                   <div className="mt-2 text-white/20 uppercase tracking-[0.2em] font-black">Oakivo Shell v4.2</div>
                </div>

                {/* Telemetry Block */}
                <div className="space-y-6">
                   <div className="flex items-center justify-between group/tele">
                      <div className="flex items-center gap-4">
                        <Activity size={18} className="text-gray-600 group-hover/tele:text-oakivo-secondary transition-colors" />
                        <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Architecture Uptime</span>
                      </div>
                      <span className="font-mono text-sm">{uptime.toFixed(4)}%</span>
                   </div>
                   <div className="flex items-center justify-between group/tele">
                      <div className="flex items-center gap-4">
                        <Box size={18} className="text-gray-600 group-hover/tele:text-oakivo-secondary transition-colors" />
                        <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Active Nodes</span>
                      </div>
                      <span className="font-mono text-sm">{activeNodes}</span>
                   </div>
                   <div className="flex items-center justify-between group/tele">
                      <div className="flex items-center gap-4">
                        <Clock size={18} className="text-gray-600 group-hover/tele:text-oakivo-secondary transition-colors" />
                        <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500">HQ Protocol Time</span>
                      </div>
                      <span className="font-mono text-sm">{hqTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}</span>
                   </div>
                </div>
                
                <div className="pt-4 border-t border-white/5 flex items-center gap-3">
                   <div className="w-2 h-2 rounded-full bg-oakivo-secondary animate-pulse shadow-[0_0_8px_rgba(46,204,113,0.8)]" />
                   <span className="text-[9px] font-black text-oakivo-secondary uppercase tracking-[0.5em]">System Status: Nominal</span>
                </div>
             </div>
          </div>
        </div>

        {/* Tier 3: Institutional Footer & Global Actions */}
        <div className="pt-16 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-12">
          
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="flex items-center gap-4 text-[10px] font-black text-gray-600 uppercase tracking-[0.4em]">
              <Copyright size={14} className="text-oakivo-secondary" /> {new Date().getFullYear()} Oakivo Solutions Inc.
            </div>
            <div className="flex items-center gap-8">
              {[Linkedin, Twitter, Github].map((Icon, i) => (
                <a key={i} href="#" className="text-gray-600 hover:text-white transition-all transform hover:scale-125">
                  <Icon size={22} />
                </a>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-12">
            <button 
              onClick={() => setLanguage(language === 'en' ? 'fr' : 'en')}
              className="flex items-center gap-3 text-[10px] font-black text-gray-500 hover:text-oakivo-secondary transition-all uppercase tracking-[0.3em] group"
            >
              <Globe size={16} className="group-hover:rotate-180 transition-transform duration-1000" />
              {language === 'en' ? 'Switch to French Protocol' : 'Version Anglaise'}
            </button>
            
            <button 
              onClick={scrollToTop} 
              className="w-16 h-16 rounded-2xl border border-white/10 flex items-center justify-center bg-white/5 hover:bg-white hover:text-black transition-all hover:-translate-y-2 shadow-2xl group"
              aria-label="Return to Top"
            >
              <ArrowUp size={24} className="group-hover:animate-bounce" />
            </button>
          </div>

        </div>

      </div>
    </footer>
  );
};

export default Footer;