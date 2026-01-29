import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, TrendingUp, ShieldCheck, ChevronRight, Activity, Database, Workflow, Sparkles, BrainCircuit, Bot, Search, PenTool, Zap, BarChart, Factory, ShoppingBag, Truck, Landmark, Cpu, Globe, Target, Layers, FileSearch, Rocket, CheckCircle2, MonitorCheck, Server, Terminal, Lock, Wind, Command } from 'lucide-react';
import Button from '../components/Button';
import Logo from '../components/Logo';
import { NavRoute } from '../types';
import { useLanguage } from '../context/LanguageContext';
import SEO from '../components/SEO';

const Home: React.FC = () => {
  const { t } = useLanguage();
  const heroRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    setMousePos({
      x: (e.clientX - rect.left) / rect.width - 0.5,
      y: (e.clientY - rect.top) / rect.height - 0.5
    });
  };

  const industries = [
    "Manufacturing", "Retail", "Distribution", "Finance", "Public Sector", "Logistics", "Energy", "Healthcare"
  ];

  return (
    <>
      <SEO 
        title="Oakivo | Orchestrating Agile Digital Futures"
        description="Oakivo Solutions Inc. orchestrates the digital future for Canadian SMEs with Intelligent Agentic AI and surgical Odoo 18 ERP implementation. Reclaiming operational equity."
        keywords="Digital Transformation Canada, AI Automation, Odoo ERP implementation, Business Process Orchestration, Cybersecurity SOC2, New Brunswick IT Consulting"
      />

      {/* Cinematic Hero - Agility Focus */}
      <section 
        ref={heroRef}
        onMouseMove={handleMouseMove}
        className="relative min-h-screen flex items-center bg-[#020504] overflow-hidden pt-20"
      >
        <div className="absolute inset-0 z-0 opacity-30 pointer-events-none overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2560&auto=format&fit=crop"
            alt="Advanced Technology Infrastructure"
            className="w-full h-full object-cover transition-transform duration-[12000ms] ease-out"
            style={{ transform: `scale(${1.15 + mousePos.y * 0.05}) translate(${mousePos.x * 40}px, ${mousePos.y * 40}px)` }}
            fetchPriority="high"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#020504] via-transparent to-[#020504]"></div>
          <div className="absolute inset-0 bg-black/50"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
              <div className="lg:col-span-8">
                <div className="mb-10 inline-flex items-center gap-4 bg-white/5 border border-white/10 px-6 py-2 rounded-full backdrop-blur-3xl animate-fade-in-up shadow-2xl">
                   <Command className="text-oakivo-secondary" size={14} />
                   <span className="text-white font-black tracking-[0.5em] uppercase text-[9px]">
                     High-Velocity Engineering Hub
                   </span>
                </div>

                <h1 className="text-6xl md:text-8xl lg:text-[8rem] font-serif-display font-bold text-white leading-[0.8] mb-12 tracking-tighter animate-fade-in-up [animation-delay:200ms]">
                  Orchestrate <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-oakivo-secondary via-white to-oakivo-secondary/40 italic">Agility.</span>
                </h1>

                <p className="text-xl md:text-2xl text-gray-400 mb-14 max-w-2xl font-light leading-relaxed animate-fade-in-up [animation-delay:400ms]">
                  Oakivo Solutions Inc. de-couples operational complexity using Agentic AI and surgical Odoo 18 Orchestration for high-growth Canadian enterprises.
                </p>

                <div className="flex flex-col sm:flex-row items-center gap-10 animate-fade-in-up [animation-delay:600ms]">
                  <Link to={NavRoute.CONTACT}>
                    <Button variant="primary" size="lg" className="px-14 py-7 text-xl shadow-[0_0_80px_rgba(46,204,113,0.4)] hover:scale-105 active:scale-95 transition-all duration-700 group">
                      Initiate Strategic Audit <ArrowRight className="inline ml-4 group-hover:translate-x-3 transition-transform" />
                    </Button>
                  </Link>
                  <Link to={NavRoute.SERVICES} className="group flex items-center gap-6 text-white font-black uppercase tracking-[0.2em] text-[11px] transition-all hover:text-oakivo-secondary">
                    <div className="w-14 h-14 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-oakivo-secondary group-hover:text-black group-hover:border-oakivo-secondary transition-all shadow-4xl backdrop-blur-md">
                      <ChevronRight size={22} />
                    </div>
                    Expertise Matrix
                  </Link>
                </div>
              </div>

              {/* High-Impact Stat Bar */}
              <div className="lg:col-span-4 animate-fade-in-up [animation-delay:800ms] hidden lg:block">
                 <div className="bg-white/5 border border-white/10 backdrop-blur-3xl p-12 rounded-[56px] shadow-4xl group hover:border-oakivo-secondary/40 transition-all duration-1000 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-8 opacity-5 text-oakivo-secondary">
                       <Zap size={100} />
                    </div>
                    <div className="flex items-center justify-between mb-12">
                       <span className="text-[10px] font-black text-oakivo-secondary uppercase tracking-[0.4em]">Velocity Standards</span>
                       <Activity size={24} className="text-oakivo-secondary animate-pulse" />
                    </div>
                    <div className="space-y-12">
                       <div className="flex justify-between items-end border-b border-white/5 pb-10">
                          <div>
                             <span className="text-6xl font-bold font-serif-display text-white">400%</span>
                             <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest mt-2">Throughput Gains</p>
                          </div>
                          <TrendingUp size={32} className="text-oakivo-secondary opacity-30" />
                       </div>
                       <div className="flex justify-between items-end border-b border-white/5 pb-10">
                          <div>
                             <span className="text-6xl font-bold font-serif-display text-white">Zero</span>
                             <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest mt-2">Legacy Friction</p>
                          </div>
                          <Command size={32} className="text-oakivo-secondary opacity-30" />
                       </div>
                    </div>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Marquee - Industry Expertise */}
      <div className="bg-oakivo-primary py-12 border-y border-white/5 overflow-hidden cv-auto">
        <div className="animate-marquee flex items-center">
          {[...industries, ...industries].map((industry, i) => (
            <div key={i} className="flex items-center gap-14 mx-16">
              <span className="text-white/10 font-serif-display text-5xl font-bold uppercase tracking-tighter italic hover:text-oakivo-secondary transition-all cursor-default">{industry}</span>
              <div className="w-2 h-2 rounded-full bg-oakivo-secondary/40 shadow-[0_0_20px_rgba(46,204,113,0.5)]"></div>
            </div>
          ))}
        </div>
      </div>

      {/* Agile Orchestration Framework - Redesign */}
      <section className="py-40 bg-white cv-auto relative overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-24 items-center mb-40">
             <div className="lg:col-span-5 order-2 lg:order-1">
                <div className="inline-flex items-center gap-3 text-oakivo-secondary font-black uppercase text-[10px] tracking-[0.5em] mb-10">
                   <Layers size={14} /> Structural Agility
                </div>
                <h2 className="text-5xl md:text-8xl font-serif-display font-bold text-oakivo-primary tracking-tighter leading-[0.85] mb-12">
                   Orchestrating <br/> Complexity.
                </h2>
                <p className="text-xl md:text-2xl text-gray-500 font-light leading-relaxed mb-14">
                  We deploy an unified operational nervous system that evolves at the speed of your organization's highest ambitions.
                </p>
                <div className="space-y-10">
                   {[
                     { title: "Autonomous Workflows", icon: <Wind />, desc: "Self-correcting AI logic that manages routines without intervention." },
                     { title: "Unified Data Mesh", icon: <Database />, desc: "A single source of operational truth via Odoo 18." },
                     { title: "Institutional Resilience", icon: <ShieldCheck />, desc: "Zero-Trust security built into every transaction." }
                   ].map((item, i) => (
                     <div key={i} className="flex gap-8 group">
                        <div className="w-14 h-14 bg-oakivo-surface rounded-2xl flex items-center justify-center text-oakivo-primary group-hover:bg-oakivo-primary group-hover:text-white transition-all duration-700 shadow-sm">
                           {item.icon}
                        </div>
                        <div>
                           <h4 className="font-bold text-oakivo-primary mb-2 uppercase tracking-[0.2em] text-xs">{item.title}</h4>
                           <p className="text-sm text-gray-500 font-light leading-relaxed">{item.desc}</p>
                        </div>
                     </div>
                   ))}
                </div>
             </div>
             
             <div className="lg:col-span-7 order-1 lg:order-2 group">
                <div className="relative">
                   <div className="aspect-[4/3] rounded-[64px] overflow-hidden shadow-4xl relative">
                      <img 
                         src="https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=2000&auto=format&fit=crop" 
                         alt="Elite Engineering Consultation" 
                         className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 transform group-hover:scale-105"
                         loading="lazy"
                         decoding="async"
                      />
                      <div className="absolute inset-0 bg-oakivo-primary/20 group-hover:bg-transparent transition-all duration-1000"></div>
                   </div>
                   {/* Floating Tech Badge */}
                   <div className="absolute -bottom-10 -left-10 z-20 bg-white/95 backdrop-blur-3xl p-10 rounded-[40px] shadow-4xl border border-white/20 animate-fade-in-up max-w-sm">
                      <div className="flex items-center gap-5 mb-6">
                         <div className="w-14 h-14 rounded-2xl bg-oakivo-primary flex items-center justify-center text-oakivo-secondary shadow-2xl">
                            <Server size={28} />
                         </div>
                         <h4 className="text-xl font-bold text-oakivo-primary font-serif-display leading-tight">Institutional <br/> Performance</h4>
                      </div>
                      <p className="text-sm text-gray-500 font-light leading-relaxed">Surgically integrated Odoo 18 ecosystems with 99.9% availability standards.</p>
                   </div>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* Protocol Journey - Visual Expertise */}
      <section className="py-40 bg-oakivo-primary text-white cv-auto relative overflow-hidden">
         <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
         <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-4xl mx-auto text-center mb-32">
               <h2 className="text-5xl md:text-[8rem] font-serif-display font-bold mb-8 tracking-tighter leading-none">The Protocol.</h2>
               <p className="text-xl text-gray-400 font-light italic leading-relaxed">A high-precision methodology to reclaiming organizational agility.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
               {[
                 { title: "Discovery", desc: "Audit of technical debt and siloed operational logic.", icon: <FileSearch /> },
                 { title: "Architecture", icon: <PenTool />, desc: "Designing a robust autonomous nervous system." },
                 { title: "Deployment", icon: <Rocket />, desc: "Surgical integration with zero operational friction." },
                 { title: "Optimization", icon: <Zap />, desc: "Real-time industrial telemetry and scaling." }
               ].map((step, i) => (
                 <div key={i} className="group p-14 bg-white/5 border border-white/10 rounded-[56px] hover:bg-white hover:text-oakivo-primary transition-all duration-1000 relative z-10 backdrop-blur-md transform hover:scale-[1.03]">
                    <div className="flex items-center justify-between mb-16">
                       <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center text-oakivo-secondary group-hover:bg-oakivo-primary group-hover:text-white transition-all shadow-lg">
                          {React.cloneElement(step.icon as React.ReactElement<any>, { size: 32 })}
                       </div>
                       <span className="text-5xl font-serif-display font-bold opacity-10 group-hover:opacity-100 transition-opacity">0{i+1}</span>
                    </div>
                    <h4 className="text-2xl font-bold font-serif-display mb-6 tracking-tight">{step.title}</h4>
                    <p className="text-gray-400 group-hover:text-gray-600 text-base font-light leading-relaxed">{step.desc}</p>
                 </div>
               ))}
            </div>
         </div>
      </section>

      {/* Conversion Grid */}
      <section className="bg-oakivo-secondary py-40 text-center group cv-auto relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-[2000ms]"></div>
        <div className="container mx-auto px-6 relative z-10">
          <h2 className="text-6xl md:text-[11rem] font-bold text-oakivo-primary mb-14 font-serif-display tracking-tighter leading-[0.75] transform group-hover:scale-[1.01] transition-transform duration-1000">
             Initiate Growth.
          </h2>
          <p className="text-2xl md:text-5xl text-oakivo-primary/80 mb-24 max-w-5xl mx-auto font-light leading-snug tracking-tight">
             Join the elite 5% of Canadian companies orchestrating growth with Agentic AI.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-10">
            <Link to={NavRoute.CONTACT}>
              <Button variant="black" size="lg" className="px-20 py-8 text-2xl shadow-4xl hover:scale-110 duration-700 font-bold">
                Start Strategic Audit
              </Button>
            </Link>
            <Link to={NavRoute.CASE_STUDIES}>
              <Button variant="outline" size="lg" className="px-20 py-8 text-2xl text-oakivo-primary border-oakivo-primary/40 hover:bg-oakivo-primary hover:text-white transition-all duration-700 font-bold">
                Review Success Files
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;