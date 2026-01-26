
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, TrendingUp, ShieldCheck, Play, ChevronRight, Activity, Database, Workflow, Sparkles, BrainCircuit, Bot } from 'lucide-react';
import Button from '../components/Button';
import Logo from '../components/Logo';
import { NavRoute } from '../types';
import { useLanguage, translations } from '../context/LanguageContext';
import SEO from '../components/SEO';

const Home: React.FC = () => {
  const { t, language } = useLanguage();
  const heroRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [reclaimedHours, setReclaimedHours] = useState(482100);

  useEffect(() => {
    const interval = setInterval(() => {
      setReclaimedHours(prev => prev + Math.floor(Math.random() * 3));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

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
        title="Oakivo | Agentic AI & Odoo ERP Orchestration"
        description="Oakivo Solutions Inc. orchestrates the digital future with Intelligent Agentic AI and Expert Odoo ERP implementation for enterprise SMEs."
        keywords="AI Automation Canada, Odoo ERP implementation, Digital Transformation Dieppe, Business Automation Atlantic Canada"
      />

      {/* Cinematic Hero */}
      <section 
        ref={heroRef}
        onMouseMove={handleMouseMove}
        className="relative min-h-screen flex items-center bg-[#020504] overflow-hidden pt-20"
      >
        {/* Animated Background Layers */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#040d0a] via-black to-black"></div>
          
          <div 
            className="absolute top-[-20%] left-[-10%] w-[80%] h-[80%] bg-oakivo-secondary/5 rounded-full blur-[220px] transition-transform duration-[3000ms] ease-out pointer-events-none"
            style={{ transform: `translate(${mousePos.x * 150}px, ${mousePos.y * 150}px)` }}
          ></div>
          <div 
            className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-oakivo-blue/5 rounded-full blur-[200px] transition-transform duration-[4000ms] ease-out delay-200 pointer-events-none"
            style={{ transform: `translate(${mousePos.x * -120}px, ${mousePos.y * -120}px)` }}
          ></div>
          
          <div className="absolute inset-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] pointer-events-none"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-16 mb-16">
              <div className="max-w-4xl">
                <div className="mb-12 inline-flex items-center gap-4 bg-white/5 border border-white/10 px-6 py-3 rounded-full backdrop-blur-3xl animate-fade-in-up shadow-2xl">
                   <Sparkles className="text-oakivo-secondary" size={16} />
                   <span className="text-white font-black tracking-[0.4em] uppercase text-[9px]">
                     Orchestrating Canada's Autonomous Future
                   </span>
                </div>

                <h1 className="text-6xl md:text-9xl lg:text-[11.5rem] font-serif-display font-bold text-white leading-[0.82] mb-14 tracking-tighter animate-fade-in-up [animation-delay:200ms]">
                  Build Your <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-oakivo-secondary via-white to-oakivo-secondary/40">Autonomous Growth.</span>
                </h1>

                <p className="text-xl md:text-3xl text-gray-400 mb-16 max-w-3xl font-light leading-snug animate-fade-in-up [animation-delay:400ms]">
                  {t('home.hero_subtitle')}
                </p>

                <div className="flex flex-col sm:flex-row items-center gap-12 animate-fade-in-up [animation-delay:600ms]">
                  <Link to={NavRoute.CONTACT}>
                    <Button variant="primary" size="lg" className="px-16 py-8 text-2xl shadow-[0_0_100px_rgba(46,204,113,0.2)] hover:scale-105 transition-all duration-700 group">
                      {t('home.cta_primary')} <ArrowRight className="inline ml-4 group-hover:translate-x-3 transition-transform" />
                    </Button>
                  </Link>
                  <Link to={NavRoute.SERVICES} className="group flex items-center gap-6 text-white font-black uppercase tracking-[0.2em] text-[11px] transition-all hover:text-oakivo-secondary">
                    <div className="w-16 h-16 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-oakivo-secondary group-hover:text-black group-hover:border-oakivo-secondary transition-all shadow-4xl backdrop-blur-md">
                      <ChevronRight size={24} />
                    </div>
                    {t('home.explore')}
                  </Link>
                </div>
              </div>

              {/* Business Intel Widget */}
              <div className="lg:w-96 bg-white/5 border border-white/10 backdrop-blur-3xl p-10 rounded-[56px] hidden lg:block animate-fade-in-up [animation-delay:800ms] shadow-4xl group hover:border-oakivo-secondary/40 transition-all duration-1000 relative overflow-hidden">
                 <div className="absolute top-0 right-0 p-8 opacity-5 text-oakivo-secondary group-hover:opacity-10 transition-opacity">
                    <TrendingUp size={100} />
                 </div>
                 <div className="mb-10 flex items-center justify-between">
                    <div className="w-14 h-14 bg-oakivo-secondary/20 rounded-2xl flex items-center justify-center text-oakivo-secondary group-hover:bg-oakivo-secondary group-hover:text-oakivo-primary transition-all">
                       <Activity size={28} />
                    </div>
                    <span className="text-[10px] font-black text-white/40 uppercase tracking-[0.3em]">Operational Telemetry</span>
                 </div>
                 <h4 className="text-white font-bold text-6xl font-serif-display mb-4 tracking-tighter">{reclaimedHours.toLocaleString()}</h4>
                 <p className="text-gray-400 text-lg font-light leading-snug">Human-hours reclaimed through autonomous enterprise logic.</p>
                 <div className="mt-12 h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-oakivo-secondary w-3/4 animate-pulse"></div>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Marquee */}
      <div className="bg-oakivo-primary py-14 border-y border-white/5 overflow-hidden cv-auto">
        <div className="animate-marquee flex items-center">
          {[...industries, ...industries].map((industry, i) => (
            <div key={i} className="flex items-center gap-14 mx-16">
              <span className="text-white/10 font-serif-display text-6xl font-bold uppercase tracking-tighter italic transition-all hover:text-oakivo-secondary/40 cursor-default">{industry}</span>
              <div className="w-3 h-3 rounded-full bg-oakivo-secondary/30 shadow-[0_0_20px_rgba(46,204,113,0.4)]"></div>
            </div>
          ))}
        </div>
      </div>

      {/* Insight Pillar */}
      <section className="py-44 bg-white cv-auto relative">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-24 items-center">
            <div className="lg:col-span-6">
              <div className="inline-block px-6 py-2 bg-oakivo-primary text-white rounded-full text-[10px] font-black uppercase tracking-[0.4em] mb-12 shadow-lg">
                Engineering Agility
              </div>
              <h2 className="text-6xl md:text-[8rem] font-serif-display font-bold text-oakivo-primary leading-[0.88] mb-14 tracking-tighter">
                {t('home.insight_title')}
              </h2>
              <div className="space-y-14">
                <p className="text-2xl text-gray-700 leading-relaxed font-light italic border-l-[14px] border-oakivo-secondary pl-14 bg-oakivo-surface py-14 rounded-r-[48px] pr-12 shadow-sm">
                  {t('home.insight_text_1')}
                </p>
                <p className="text-xl text-gray-400 leading-relaxed max-w-2xl font-light">
                  {t('home.insight_text_2')}
                </p>
              </div>
            </div>
            <div className="lg:col-span-6">
              <div className="grid grid-cols-1 gap-12">
                {[
                  { title: t('home.cap_auto_title'), icon: <BrainCircuit />, desc: t('home.cap_auto_desc') },
                  { title: t('home.cap_eco_title'), icon: <Database />, desc: t('home.cap_eco_desc') },
                  { title: t('home.cap_sec_title'), icon: <ShieldCheck />, desc: t('home.cap_sec_desc') }
                ].map((item, i) => (
                  <div key={i} className="bg-oakivo-surface p-12 rounded-[56px] border border-transparent hover:border-oakivo-secondary/30 hover:bg-white hover:shadow-4xl transition-all duration-700 group">
                    <div className="flex gap-12 items-start">
                      <div className="shrink-0 p-7 bg-white rounded-3xl shadow-sm text-oakivo-secondary group-hover:bg-oakivo-primary group-hover:text-white transition-all duration-700">
                        {/* Fix: Use React.ReactElement<any> to allow dynamic prop 'size' when cloning icon elements */}
                        {React.cloneElement(item.icon as React.ReactElement<any>, { size: 32 })}
                      </div>
                      <div>
                        <h3 className="text-3xl font-bold font-serif-display mb-4 text-oakivo-primary leading-tight tracking-tight">{item.title}</h3>
                        <p className="text-gray-500 leading-relaxed text-lg font-light">{item.desc}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Global Conversion Matrix */}
      <section className="bg-oakivo-secondary py-44 text-center relative overflow-hidden group cv-auto">
        <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-[2000ms]"></div>
        <div className="container mx-auto px-6 relative z-10">
          <h2 className="text-6xl md:text-[11rem] font-bold text-oakivo-primary mb-14 font-serif-display tracking-tighter leading-[0.72]">{t('home.cta_footer_title')}</h2>
          <p className="text-2xl md:text-5xl text-oakivo-primary/80 mb-28 max-w-5xl mx-auto font-light leading-relaxed tracking-tight">
            {t('home.cta_footer_text')}
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-12">
            <Link to={NavRoute.CONTACT}>
              <Button variant="black" size="lg" className="px-28 py-9 text-3xl shadow-4xl transition-all hover:scale-110 active:scale-95 duration-700 font-bold">
                {t('home.cta_footer_btn')}
              </Button>
            </Link>
            <Link to={NavRoute.SERVICES}>
              <Button variant="outline" size="lg" className="px-28 py-9 text-3xl text-oakivo-primary border-oakivo-primary/40 hover:bg-oakivo-primary hover:text-white hover:border-oakivo-primary transition-all duration-700">
                {t('home.explore')}
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
