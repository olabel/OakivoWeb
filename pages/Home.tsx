import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Database, BrainCircuit, ShieldCheck, Terminal, ChevronRight, Activity, Globe, Zap, Layers, Cpu, BarChart3, Radar, Disc, LayoutGrid, ChevronLeft, FastForward, Timer, Rocket, Fingerprint, Network, CheckCircle, TrendingUp } from 'lucide-react';
import Button from '../components/Button';
import SafeImage from '../components/SafeImage';
import { NavRoute } from '../types';
import { useLanguage } from '../context/LanguageContext';
import SEO from '../components/SEO';

const SLIDES = [
  {
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=85&w=2400&auto=format&fit=crop",
    label: "Digital Orchestration",
    title: "Orchestrating the Digital Future",
    desc: "Seamlessly integrating Odoo 18 and Agentic AI into institutional workflows."
  },
  {
    image: "https://images.unsplash.com/photo-1565043589221-1a62996ea601?q=85&w=2400&auto=format&fit=crop",
    label: "Industrial Automation",
    title: "Precision Manufacturing 4.0",
    desc: "Orchestrating robotic shop-floor logic with high-fidelity ERP frameworks."
  },
  {
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc51?q=85&w=2400&auto=format&fit=crop",
    label: "Cyber Resilience",
    title: "Zero-Trust Infrastructure",
    desc: "Securing Canada's industrial intelligence with mission-critical architecture."
  }
];

const PerformancePulse = () => {
  const [value, setValue] = useState(98.4);
  useEffect(() => {
    const interval = setInterval(() => {
      setValue(prev => +(prev + (Math.random() * 0.4 - 0.2)).toFixed(1));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center gap-4 bg-white/5 border border-white/10 px-6 py-3 rounded-2xl backdrop-blur-xl">
      <div className="relative">
        <div className="w-3 h-3 bg-oakivo-secondary rounded-full animate-ping absolute inset-0"></div>
        <div className="w-3 h-3 bg-oakivo-secondary rounded-full relative"></div>
      </div>
      <div className="flex flex-col text-left">
        <span className="text-[8px] font-black text-white/30 tracking-[0.3em] uppercase leading-none mb-1">SYSTEM_EFFICIENCY</span>
        <span className="text-sm font-bold text-white tracking-tighter">{value}%</span>
      </div>
    </div>
  );
};

const Home: React.FC = () => {
  const { t } = useLanguage();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [telemetry, setTelemetry] = useState({ sync: 98.2, latency: 12, throughput: 840 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % SLIDES.length);
    }, 9000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setTelemetry(prev => ({
        sync: +(prev.sync + (Math.random() * 0.2 - 0.1)).toFixed(1),
        latency: Math.floor(10 + Math.random() * 5),
        throughput: Math.floor(830 + Math.random() * 20)
      }));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current || window.innerWidth < 1024) return;
    const { left, top, width, height } = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - left) / width - 0.5;
    const y = (e.clientY - top) / height - 0.5;
    setMousePos({ x, y });
  };

  const platforms = [
    {
      title: "ERP Orchestration",
      desc: "The unified nervous system for industrial scaling through Odoo 18.",
      icon: <Database className="text-oakivo-primary" size={24} />,
      link: NavRoute.SERVICES,
      tag: "CORE INFRA"
    },
    {
      title: "Agentic AI Engines",
      desc: "Autonomous workflows that think, act, and optimize in real-time.",
      icon: <BrainCircuit className="text-oakivo-primary" size={24} />,
      link: NavRoute.SERVICES,
      tag: "INTELLIGENCE"
    },
    {
      title: "Cyber Resilience",
      desc: "Institutional-grade security for mission-critical industrial data.",
      icon: <ShieldCheck className="text-oakivo-primary" size={24} />,
      link: NavRoute.SERVICES,
      tag: "SECURITY"
    }
  ];

  const agilitySteps = [
    { label: "Audit", icon: <Radar />, text: "Real-time telemetry analysis." },
    { label: "Design", icon: <Layers />, text: "Architectural blueprinting." },
    { label: "Sync", icon: <Activity />, text: "High-fidelity system integration." },
    { label: "Scale", icon: <Rocket />, text: "Autonomous growth acceleration." }
  ];

  return (
    <>
      <SEO 
        title="Odoo 18 Partner Canada | Oakivo Solutions | Orchestrating the Digital Future"
        description="Oakivo Solutions Inc. provides the engineering foundation for automated, high-growth Canadian enterprises using Odoo 18 and Agentic AI."
        keywords="Odoo 18 Partner Canada, Agentic AI Automation, ERP Orchestration SME, Industrial Digital Transformation, Cybersecurity Audit SOC2"
      />

      {/* 
        HERO: THE ORCHESTRATION ENGINE
      */}
      <section 
        ref={containerRef}
        onMouseMove={handleMouseMove}
        className="relative min-h-screen flex items-center bg-[#010403] overflow-hidden pt-28 pb-32 lg:pt-0 lg:pb-0 cursor-default"
      >
        <div className="absolute inset-0 z-[1] opacity-[0.05] pointer-events-none bg-[radial-gradient(circle_at_center,#ffffff22_1px,transparent_1px)] bg-[size:40px_40px]"></div>

        {SLIDES.map((slide, index) => (
          <div 
            key={index}
            className={`absolute inset-0 transition-opacity duration-2000 ease-in-out ${index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
          >
            <div 
              className="absolute inset-0 z-0 transition-transform duration-[12000ms] ease-out"
              style={{ transform: index === currentSlide ? 'scale(1.1) translate(1%, 1%)' : 'scale(1) translate(0, 0)' }}
            >
              <SafeImage 
                src={slide.image} 
                alt={slide.title}
                fetchpriority={index === 0 ? "high" : "auto"}
                className="h-full w-full object-cover grayscale opacity-20 lg:opacity-30"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-[#010403] via-[#010403]/90 to-transparent"></div>
            </div>
          </div>
        ))}

        <div className="container mx-auto px-6 relative z-30">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            <div 
              className="flex-grow max-w-6xl text-center lg:text-left"
              style={{ transform: `translate(${mousePos.x * 10}px, ${mousePos.y * 10}px)` }}
            >
              <div className="inline-flex items-center gap-4 px-6 py-2.5 bg-white/5 border border-white/10 rounded-full text-[10px] font-black text-oakivo-secondary uppercase tracking-[0.4em] mb-12 animate-fade-in-up backdrop-blur-xl">
                <ShieldCheck size={14} className="text-oakivo-secondary" />
                Engineering Institutional Autonomy
              </div>
              
              <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-[11rem] font-serif-display font-bold text-white leading-[0.85] mb-12 animate-fade-in-up [animation-delay:150ms] tracking-tighter">
                Orchestrating <br />
                <span className="italic text-oakivo-secondary font-light">growth</span> circuits.
              </h1>
              
              <p className="text-xl md:text-3xl text-gray-400 max-w-3xl leading-tight font-light tracking-tight mb-16 animate-fade-in-up [animation-delay:250ms] mx-auto lg:mx-0">
                {SLIDES[currentSlide].desc}
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-8 animate-fade-in-up [animation-delay:350ms]">
                <Link to={NavRoute.CONTACT} className="w-full sm:w-auto">
                  <Button variant="visa" size="lg" className="w-full px-16 py-8 text-2xl bg-oakivo-secondary text-black hover:bg-white rounded-[32px] font-bold shadow-premium transition-all duration-700">
                    Initiate Audit <ArrowRight className="ml-4 group-hover:translate-x-3 transition-transform" size={28} />
                  </Button>
                </Link>
                <PerformancePulse />
              </div>
            </div>

            {/* Kinetic Sidebar Telemetry */}
            <div className="hidden xl:flex flex-col gap-6 animate-fade-in-up [animation-delay:550ms]">
               {[
                 { label: "ORCHESTRATION", value: `${telemetry.sync}%`, icon: <BrainCircuit size={20} /> },
                 { label: "SYS_LATENCY", value: `${telemetry.latency}MS`, icon: <Zap size={20} /> },
                 { label: "DATA_THROUGHPUT", value: `${telemetry.throughput}T/S`, icon: <Database size={20} /> }
               ].map((stat, i) => (
                 <div key={i} className="bg-white/5 backdrop-blur-3xl border border-white/10 p-10 rounded-[40px] w-72 shadow-2xl group hover:border-oakivo-secondary/50 transition-all duration-700">
                    <div className="text-oakivo-secondary mb-6 group-hover:scale-110 transition-transform">{stat.icon}</div>
                    <div className="text-[10px] font-black text-white/30 uppercase tracking-[0.4em] mb-1">{stat.label}</div>
                    <div className="text-4xl font-bold text-white tracking-tighter">{stat.value}</div>
                 </div>
               ))}
            </div>
          </div>
        </div>

        {/* Dynamic Nav Control */}
        <div className="absolute bottom-10 left-0 right-0 z-40 flex items-center justify-center gap-12 px-6">
           <button 
             onClick={() => setCurrentSlide(prev => (prev - 1 + SLIDES.length) % SLIDES.length)}
             className="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all bg-white/5 backdrop-blur-md"
           >
             <ChevronLeft size={28} />
           </button>
           <div className="flex items-center gap-4">
             {SLIDES.map((_, i) => (
               <button 
                 key={i} 
                 onClick={() => setCurrentSlide(i)}
                 className={`h-2 transition-all duration-700 rounded-full ${i === currentSlide ? 'w-16 bg-oakivo-secondary' : 'w-4 bg-white/10'}`} 
               />
             ))}
           </div>
           <button 
             onClick={() => setCurrentSlide(prev => (prev + 1) % SLIDES.length)}
             className="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all bg-white/5 backdrop-blur-md"
           >
             <ChevronRight size={28} />
           </button>
        </div>
      </section>

      {/* 
        TRUST BAR
      */}
      <section className="py-20 bg-[#010403] border-y border-white/5 relative z-20">
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap items-center justify-center lg:justify-between gap-12 opacity-30 hover:opacity-100 transition-opacity duration-1000">
             <div className="flex items-center gap-3 text-[11px] font-black uppercase tracking-[0.5em] text-white">
                <ShieldCheck size={20} className="text-oakivo-secondary" /> SOC2 INSTITUTIONAL
             </div>
             <div className="flex items-center gap-3 text-[11px] font-black uppercase tracking-[0.5em] text-white">
                <Globe size={20} className="text-oakivo-secondary" /> CANADIAN DATA RESIDENCY
             </div>
             <div className="flex items-center gap-3 text-[11px] font-black uppercase tracking-[0.5em] text-white">
                <Cpu size={20} className="text-oakivo-secondary" /> AGENTIC ENGINE V18.2
             </div>
             <div className="flex items-center gap-3 text-[11px] font-black uppercase tracking-[0.5em] text-white">
                <Zap size={20} className="text-oakivo-secondary" /> 99.99% SYSTEM SLA
             </div>
          </div>
        </div>
      </section>

      {/* 
        THE ORCHESTRATION GRID
      */}
      <section className="py-32 lg:py-48 bg-white cv-auto overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center justify-between mb-24 gap-12">
             <div className="max-w-4xl text-center lg:text-left">
                <div className="inline-flex items-center gap-4 text-oakivo-secondary font-black uppercase text-[11px] tracking-[0.6em] mb-10">
                  <LayoutGrid size={18} /> Engineering Matrix
                </div>
                <h2 className="text-6xl md:text-8xl lg:text-[10rem] font-serif-display font-bold text-oakivo-primary mb-12 tracking-tighter leading-none">Matrix of Growth.</h2>
                <p className="text-2xl md:text-4xl text-gray-400 font-light leading-relaxed max-w-3xl mx-auto lg:mx-0">De-coupling technical friction through high-fidelity ERP orchestration and Agentic AI.</p>
             </div>
             <div className="hidden lg:block">
                <div className="w-40 h-40 border border-gray-100 rounded-full flex items-center justify-center text-oakivo-secondary animate-spin-slow">
                   <Network size={64} strokeWidth={1} />
                </div>
             </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16">
            {platforms.map((p, i) => (
              <div key={i} className="group bg-oakivo-surface p-12 lg:p-16 rounded-[64px] border border-gray-100 hover:border-oakivo-secondary/30 hover:bg-white hover:shadow-vise-xl transition-all duration-1000 flex flex-col h-full transform hover:-translate-y-4">
                <div className="flex justify-between items-start mb-16">
                   <div className="w-20 h-20 bg-white rounded-[28px] flex items-center justify-center group-hover:bg-oakivo-secondary group-hover:text-black transition-all duration-700 shadow-xl border border-gray-50">
                     {React.cloneElement(p.icon as React.ReactElement<any>, { size: 36 })}
                   </div>
                   <span className="text-[10px] font-black text-gray-300 tracking-[0.4em] uppercase">{p.tag}</span>
                </div>
                <h3 className="text-4xl lg:text-5xl font-bold text-oakivo-primary mb-8 font-serif-display tracking-tight leading-none">{p.title}</h3>
                <p className="text-gray-500 leading-relaxed mb-16 text-xl font-light flex-grow">{p.desc}</p>
                <Link to={p.link} className="text-oakivo-primary font-black text-[11px] uppercase tracking-[0.6em] flex items-center gap-5 group/link">
                  Audit Capability <ChevronRight size={20} className="text-oakivo-secondary group-hover/link:translate-x-6 transition-transform duration-700" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 
        MOMENTUM LIFECYCLE
      */}
      <section className="py-32 lg:py-48 bg-oakivo-surface overflow-hidden cv-auto">
        <div className="container mx-auto px-6">
           <div className="flex flex-col lg:flex-row items-center lg:items-end justify-between mb-24 gap-12 text-center lg:text-left">
              <div className="max-w-4xl">
                 <div className="flex items-center justify-center lg:justify-start gap-6 mb-10">
                    <div className="h-[2px] w-16 bg-oakivo-secondary"></div>
                    <span className="text-oakivo-secondary font-black tracking-[0.6em] uppercase text-[11px]">Lifecycle Agility</span>
                 </div>
                 <h2 className="text-6xl md:text-8xl lg:text-[11rem] font-serif-display font-bold text-oakivo-primary tracking-tighter leading-none">Momentum Logic.</h2>
              </div>
              <div className="hidden lg:flex items-center gap-10 text-[12px] font-black uppercase tracking-[0.5em] text-gray-300">
                 <Timer size={40} className="text-oakivo-secondary" /> OPTIMIZING_LATENCY
              </div>
           </div>

           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
              {agilitySteps.map((step, i) => (
                <div key={i} className="bg-white p-12 rounded-[56px] border border-gray-100 group hover:bg-oakivo-primary hover:text-white transition-all duration-[1200ms] flex flex-col justify-between aspect-square shadow-sm transform hover:-translate-y-4">
                   <div className="text-oakivo-secondary mb-12 group-hover:scale-110 transition-transform">
                      {React.cloneElement(step.icon as React.ReactElement<any>, { size: 48 })}
                   </div>
                   <div>
                      <h4 className="text-3xl lg:text-4xl font-serif-display font-bold mb-6 tracking-tight leading-none">{step.label}</h4>
                      <p className="text-gray-500 group-hover:text-gray-300 font-light leading-relaxed text-lg lg:text-xl">{step.text}</p>
                   </div>
                </div>
              ))}
           </div>
        </div>
      </section>

      {/* 
        TACTICAL CLOSER
      */}
      <section className="py-32 lg:py-64 bg-oakivo-primary relative overflow-hidden group/cta">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:64px_64px]"></div>
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-oakivo-secondary/5 blur-[240px] -mr-96 -mt-96 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-white/5 blur-[180px] -ml-64 -mb-64 pointer-events-none"></div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-24 lg:gap-32">
             <div className="w-full lg:w-3/5 text-center lg:text-left">
                <div className="inline-flex items-center gap-6 bg-white/5 border border-white/10 px-8 py-3 rounded-full mb-12 backdrop-blur-xl">
                   <Network size={20} className="text-oakivo-secondary animate-pulse" />
                   <span className="text-[11px] font-black text-white uppercase tracking-[0.6em]">Strategy Protocol Active</span>
                </div>
                
                <h2 className="text-6xl sm:text-8xl md:text-9xl lg:text-[12rem] font-serif-display font-bold text-white mb-16 tracking-tighter leading-[0.85] lg:leading-[0.8]">
                  Orchestrate <br />
                  <span className="italic font-light text-oakivo-secondary text-5xl sm:text-7xl md:text-8xl lg:text-[11rem]">sustainable growth.</span>
                </h2>
                
                <p className="text-2xl lg:text-5xl text-gray-400 font-light leading-relaxed max-w-3xl mb-16 lg:mb-0 tracking-tight px-4 lg:px-0">
                  Join Canada's industrial elite. Replace technical debt with autonomous operational logic through a surgical audit.
                </p>
             </div>

             <div className="w-full lg:w-2/5">
                <div className="bg-white/5 backdrop-blur-3xl p-12 lg:p-20 rounded-[72px] border border-white/10 shadow-4xl hover:border-oakivo-secondary/40 transition-all duration-[2000ms] group/box">
                   <div className="flex items-center gap-8 mb-16">
                      <div className="w-20 h-20 bg-white/5 rounded-3xl flex items-center justify-center border border-white/10 text-oakivo-secondary group-hover/box:scale-110 transition-transform">
                         <Fingerprint size={40} />
                      </div>
                      <div>
                         <span className="block text-[11px] font-black text-white/40 uppercase tracking-[0.5em] mb-2">Tactical Access</span>
                         <span className="block text-2xl font-bold text-white tracking-tight">Tier-1 Strategy Audit</span>
                      </div>
                   </div>
                   
                   <div className="space-y-10 mb-20">
                      <div className="flex items-start gap-6 text-gray-300">
                         <CheckCircle size={24} className="text-oakivo-secondary mt-1 shrink-0" />
                         <p className="text-lg font-medium">Evaluation of legacy technical debt impact.</p>
                      </div>
                      <div className="flex items-start gap-4 text-gray-300">
                         <CheckCircle size={24} className="text-oakivo-secondary mt-1 shrink-0" />
                         <p className="text-lg font-medium">Blueprint for Agentic AI workflows.</p>
                      </div>
                      <div className="flex items-start gap-4 text-gray-300">
                         <CheckCircle size={24} className="text-oakivo-secondary mt-1 shrink-0" />
                         <p className="text-lg font-medium">Odoo 18 optimization roadmap.</p>
                      </div>
                   </div>

                   <Link to={NavRoute.CONTACT} className="w-full">
                      <Button variant="white" size="lg" className="w-full py-10 text-3xl font-black group shadow-premium bg-oakivo-secondary text-black hover:bg-white transition-all duration-700">
                        Initiate Audit <ArrowRight className="group-hover:translate-x-5 transition-transform duration-700" size={32} />
                      </Button>
                   </Link>
                </div>
             </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;