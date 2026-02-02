import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronRight, Database, BrainCircuit, ShieldCheck, Zap, Activity, Globe, Terminal, Layers } from 'lucide-react';
import Button from '../components/Button';
import SafeImage from '../components/SafeImage';
import { NavRoute } from '../types';
import { useLanguage } from '../context/LanguageContext';
import SEO from '../components/SEO';

const Home: React.FC = () => {
  const { t } = useLanguage();
  
  const platforms = [
    {
      title: "ERP Orchestration",
      desc: "The unified nervous system for industrial scaling through Odoo 18.",
      icon: <Database className="text-oakivo-primary" size={24} />,
      link: NavRoute.SERVICES
    },
    {
      title: "Agentic AI Engines",
      desc: "Autonomous workflows that think, act, and optimize in real-time.",
      icon: <BrainCircuit className="text-oakivo-primary" size={24} />,
      link: NavRoute.SERVICES
    },
    {
      title: "Cyber Resilience",
      desc: "Institutional-grade security for mission-critical industrial data.",
      icon: <ShieldCheck className="text-oakivo-primary" size={24} />,
      link: NavRoute.SERVICES
    }
  ];

  const blocks = [
    {
      tag: "INFRASTRUCTURE",
      title: "Build for institutional scale.",
      desc: "Oakivo provides the architectural depth required for Canada's most complex industrial challenges. From multi-warehouse logistics to predictive supply chain AI, we build for longevity.",
      img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2000&auto=format&fit=crop",
    },
    {
      tag: "ORCHESTRATION",
      title: "Intelligence that acts.",
      desc: "We go beyond simple automation. Our Agentic AI layers integrate directly into your environment, reconciling data and making decisions without human lag.",
      img: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=2000&auto=format&fit=crop", // Illustrative dynamic graphic for 'Intelligence that acts'
      reverse: true
    }
  ];

  return (
    <>
      <SEO 
        title="Oakivo | The Platform for Institutional Agility"
        description="Oakivo Solutions Inc. provides the engineering foundation for automated, high-growth Canadian enterprises using Odoo 18 and Agentic AI."
        keywords="Odoo ERP Canada, AI Automation, Industrial Digital Transformation, Cybersecurity"
      />

      {/* Hero Section - Refined with subtle architectural overlay */}
      <section className="pt-32 pb-24 md:pt-52 md:pb-48 bg-white border-b border-oakivo-border relative overflow-hidden">
        {/* Subtle architectural overlay for texture and depth */}
        <div className="absolute inset-0 z-0 opacity-[0.08] pointer-events-none">
          <img 
            src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=2000&auto=format&fit=crop" 
            alt="" 
            className="w-full h-full object-cover grayscale blur-[2px]"
          />
        </div>
        
        {/* Fine grid pattern */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none z-0">
          <svg width="100%" height="100%">
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1"/>
            </pattern>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        <div className="container mx-auto px-6 text-center relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-oakivo-surface/90 border border-oakivo-border rounded-full text-[10px] font-black text-oakivo-primary uppercase tracking-[0.2em] mb-12 animate-fade-in-up backdrop-blur-sm shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-oakivo-secondary"></span>
              The Standard for Digital Orchestration
            </div>
            <h1 className="text-5xl md:text-8xl font-serif-display font-bold text-oakivo-text leading-[1] mb-12 animate-fade-in-up [animation-delay:100ms] text-balance">
              The platform for <br />
              <span className="italic text-oakivo-secondary">institutional</span> agility.
            </h1>
            <p className="text-xl md:text-2xl text-oakivo-muted mb-16 max-w-2xl mx-auto leading-relaxed animate-fade-in-up [animation-delay:200ms] font-light">
              Oakivo Solutions Inc. engineers unified data ecosystems and autonomous AI for high-growth organizations across Canada.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 animate-fade-in-up [animation-delay:300ms]">
              <Link to={NavRoute.CONTACT}>
                <Button variant="visa" size="lg" className="w-full sm:w-auto shadow-vise group">
                  Initiate Strategic Audit <ArrowRight className="group-hover:translate-x-1 transition-transform" size={18} />
                </Button>
              </Link>
              <Link to={NavRoute.SERVICES}>
                <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                  View Solutions Matrix
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Platform Features - Clean Grid */}
      <section className="py-32 bg-oakivo-surface">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {platforms.map((p, i) => (
              <div key={i} className="bg-white p-12 rounded-[32px] border border-oakivo-border hover:shadow-vise-lg transition-all duration-500 group">
                <div className="w-12 h-12 bg-oakivo-surface rounded-xl flex items-center justify-center mb-10 group-hover:bg-oakivo-secondary group-hover:text-white transition-all">
                  {p.icon}
                </div>
                <h3 className="text-2xl font-bold text-oakivo-text mb-4 font-serif-display tracking-tight">{p.title}</h3>
                <p className="text-oakivo-muted leading-relaxed mb-10 text-sm font-light">{p.desc}</p>
                <Link to={p.link} className="text-oakivo-primary font-bold text-[11px] uppercase tracking-widest flex items-center gap-2 hover:gap-3 transition-all">
                  Learn more <ArrowRight size={14} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Institutional Blocks - Vise Narrative Layout */}
      <section className="py-40 bg-white overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="space-y-48">
            {blocks.map((block, i) => (
              <div key={i} className={`flex flex-col lg:flex-row items-center gap-24 ${block.reverse ? 'lg:flex-row-reverse' : ''}`}>
                <div className="w-full lg:w-1/2">
                  <div className="aspect-[16/10] rounded-[56px] overflow-hidden shadow-vise-xl relative group">
                    <SafeImage src={block.img} alt={block.title} className="group-hover:scale-105 transition-transform duration-1000" />
                    <div className="absolute inset-0 bg-oakivo-primary/20 group-hover:bg-transparent transition-all duration-500"></div>
                  </div>
                </div>
                <div className="w-full lg:w-1/2">
                  <span className="text-[10px] font-black text-oakivo-secondary uppercase tracking-[0.4em] mb-8 block">{block.tag}</span>
                  <h2 className="text-4xl md:text-6xl font-serif-display font-bold text-oakivo-text mb-8 leading-[1.1] tracking-tighter">
                    {block.title}
                  </h2>
                  <p className="text-xl md:text-2xl text-oakivo-muted font-light leading-relaxed mb-12">
                    {block.desc}
                  </p>
                  <div className="space-y-6">
                    <div className="flex items-center gap-4 text-oakivo-text font-bold text-sm">
                      <div className="w-2 h-2 rounded-full bg-oakivo-secondary"></div>
                      Validated Operational ROI
                    </div>
                    <div className="flex items-center gap-4 text-oakivo-text font-bold text-sm">
                      <div className="w-2 h-2 rounded-full bg-oakivo-secondary"></div>
                      Native Canadian Data Residency
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Expertise & Metrics - Vise Dark Module */}
      <section className="py-32 bg-oakivo-primary text-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div>
              <h2 className="text-4xl md:text-6xl font-serif-display font-bold mb-12 tracking-tight leading-[1.1]">
                Performance <br />
                <span className="text-oakivo-secondary italic">without</span> friction.
              </h2>
              <div className="grid grid-cols-2 gap-12">
                {[
                  { label: "Hours Reclaimed", val: "482K+" },
                  { label: "Uptime SLA", val: "99.9%" },
                  { label: "Data Residency", val: "100%" },
                  { label: "Client ROI", val: "4.2x" }
                ].map((stat, i) => (
                  <div key={i}>
                    <div className="text-4xl md:text-6xl font-bold mb-2">{stat.val}</div>
                    <div className="text-[10px] font-black uppercase tracking-[0.3em] text-white/50">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white/5 backdrop-blur-3xl p-12 md:p-16 rounded-[48px] border border-white/10">
              <Terminal className="text-oakivo-secondary mb-10" size={28} />
              <p className="text-2xl md:text-3xl font-serif-display italic font-light leading-relaxed mb-12">
                "By orchestrating the entire organization through Odoo 18 and Agentic AI, we de-couple technical debt from growth."
              </p>
              <div className="flex items-center gap-6">
                <div className="w-14 h-14 rounded-full bg-oakivo-secondary flex items-center justify-center font-bold text-oakivo-primary text-xl">
                  AB
                </div>
                <div>
                  <p className="font-bold text-lg leading-none">Ahmed Bello</p>
                  <p className="text-[10px] opacity-50 mt-2 uppercase tracking-widest font-black">Senior Systems Architect</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final Call to Action */}
      <section className="py-40 bg-white">
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-5xl md:text-7xl font-serif-display font-bold text-oakivo-text mb-12 tracking-tighter">
              Orchestrate your future.
            </h2>
            <p className="text-xl md:text-2xl text-oakivo-muted mb-16 leading-relaxed font-light">
              Join the elite 5% of Canadian companies reclaiming operational equity.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <Link to={NavRoute.CONTACT}>
                <Button variant="visa" size="lg" className="px-16 py-5 text-lg">
                  Initiate Strategic Audit
                </Button>
              </Link>
              <Link to={NavRoute.ABOUT}>
                <Button variant="secondary" size="lg" className="px-16 py-5 text-lg">
                  Meet the Architects
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
