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
  const blogPosts = translations[language].blog.posts.slice(0, 3);
  const [reclaimedHours, setReclaimedHours] = useState(482100);
  const heroRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

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
        title="Oakivo | AI Automation & Odoo ERP Leaders in Canada"
        description="Oakivo Solutions Inc. orchestrates the digital future with Intelligent AI Automation and Expert Odoo ERP implementation for enterprise SMEs."
        keywords="AI Automation Canada, Odoo ERP implementation, Digital Transformation Dieppe, Business Automation Atlantic Canada"
      />

      {/* Hero Section - High-Impact Cinematic Design */}
      <section 
        ref={heroRef}
        onMouseMove={handleMouseMove}
        className="relative min-h-screen flex items-center bg-[#020504] overflow-hidden pt-20"
      >
        {/* Animated Background Layers */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#05110d] via-black to-black"></div>
          
          <div 
            className="absolute top-[-20%] left-[-10%] w-[80%] h-[80%] bg-oakivo-secondary/10 rounded-full blur-[200px] transition-transform duration-[2000ms] ease-out"
            style={{ transform: `translate(${mousePos.x * 120}px, ${mousePos.y * 120}px)` }}
          ></div>
          <div 
            className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-oakivo-blue/10 rounded-full blur-[180px] transition-transform duration-[2500ms] ease-out delay-100"
            style={{ transform: `translate(${mousePos.x * -100}px, ${mousePos.y * -100}px)` }}
          ></div>
          
          <div className="absolute inset-0 opacity-[0.02] bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] pointer-events-none"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-16 mb-16">
              <div className="max-w-4xl">
                <div className="mb-10 inline-flex items-center gap-4 bg-white/5 border border-white/10 px-6 py-2.5 rounded-full backdrop-blur-xl animate-fade-in-up">
                   <BrainCircuit className="text-oakivo-secondary" size={16} />
                   <span className="text-white font-bold tracking-[0.5em] uppercase text-[10px]">
                     Orchestrating AI & Enterprise
                   </span>
                </div>

                <h1 className="text-6xl md:text-8xl lg:text-[11.5rem] font-serif-display font-bold text-white leading-[0.8] mb-12 tracking-tighter animate-fade-in-up [animation-delay:200ms]">
                  Build Your <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-oakivo-secondary via-white to-oakivo-blue/80">Autonomous Future.</span>
                </h1>

                <p className="text-xl md:text-3xl text-gray-400 mb-16 max-w-3xl font-light leading-snug animate-fade-in-up [animation-delay:400ms]">
                  {language === 'en' 
                    ? "Empowering Canadian enterprises with Agentic AI Automation, Expert Odoo Orchestration, and Zero-Trust Cybersecurity." 
                    : "Propulser les entreprises canadiennes avec l'automatisation IA, l'orchestration Odoo et la cybersécurité."}
                </p>

                <div className="flex flex-col sm:flex-row items-center gap-10 animate-fade-in-up [animation-delay:600ms]">
                  <Link to={NavRoute.CONTACT}>
                    <Button variant="primary" size="lg" className="px-16 py-7 text-2xl shadow-[0_0_80px_rgba(46,204,113,0.3)] hover:scale-105 transition-all duration-500 group">
                      {t('nav.contact')} <ArrowRight className="inline ml-3 group-hover:translate-x-2 transition-transform" />
                    </Button>
                  </Link>
                  <Link to={NavRoute.CASE_STUDIES} className="group flex items-center gap-5 text-white font-bold uppercase tracking-widest text-sm transition-all hover:text-oakivo-secondary">
                    <div className="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-oakivo-secondary group-hover:text-black group-hover:border-oakivo-secondary transition-all shadow-4xl backdrop-blur-md">
                      <Play size={20} fill="currentColor" />
                    </div>
                    Showreel 2026
                  </Link>
                </div>
              </div>

              {/* Business Agility Widget */}
              <div className="lg:w-96 bg-white/5 border border-white/10 backdrop-blur-3xl p-10 rounded-[48px] hidden lg:block animate-fade-in-up [animation-delay:800ms] shadow-4xl group hover:border-oakivo-secondary/30 transition-all duration-700">
                 <div className="mb-8 flex items-center justify-between">
                    <div className="w-12 h-12 bg-oakivo-secondary/20 rounded-2xl flex items-center justify-center text-oakivo-secondary group-hover:bg-oakivo-secondary group-hover:text-oakivo-primary transition-all">
                       <Bot size={24} />
                    </div>
                    <span className="text-[10px] font-bold text-white/40 uppercase tracking-[0.3em]">AI-Driven Impact</span>
                 </div>
                 <h4 className="text-white font-bold text-6xl font-serif-display mb-3 tracking-tighter">{reclaimedHours.toLocaleString()}</h4>
                 <p className="text-gray-400 text-lg font-light leading-snug">Hours reclaimed globally through autonomous enterprise logic.</p>
                 <div className="mt-10 h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-oakivo-secondary w-3/4 animate-pulse"></div>
                 </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-8 opacity-20 pointer-events-none">
          <div className="w-[1px] h-32 bg-gradient-to-b from-white to-transparent"></div>
        </div>
      </section>

      {/* Professional Marquee */}
      <div className="bg-oakivo-primary py-12 border-y border-white/5 overflow-hidden cv-auto">
        <div className="animate-marquee">
          {[...industries, ...industries].map((industry, i) => (
            <div key={i} className="flex items-center gap-12 mx-16">
              <span className="text-white/20 font-serif-display text-5xl font-bold uppercase tracking-tighter italic transition-all hover:text-oakivo-secondary/50 cursor-default">{industry}</span>
              <div className="w-3 h-3 rounded-full bg-oakivo-secondary/40 shadow-[0_0_15px_rgba(46,204,113,0.5)]"></div>
            </div>
          ))}
        </div>
      </div>

      {/* Core Insight Section */}
      <section className="py-40 bg-white cv-auto">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-24 items-center">
            <div className="lg:col-span-6">
              <div className="inline-block px-5 py-2 bg-oakivo-secondary/10 text-oakivo-secondary rounded-full text-[10px] font-bold uppercase tracking-[0.4em] mb-12">
                The Oakivo Standard
              </div>
              <h2 className="text-6xl md:text-8xl font-serif-display font-bold text-oakivo-primary leading-[0.9] mb-12 tracking-tighter">
                {t('home.insight_title')}
              </h2>
              <div className="space-y-12">
                <p className="text-2xl text-gray-700 leading-relaxed font-light italic border-l-[12px] border-oakivo-secondary pl-12 bg-oakivo-surface py-12 rounded-r-3xl pr-10 shadow-sm">
                  {t('home.insight_text_1')}
                </p>
                <p className="text-xl text-gray-400 leading-relaxed max-w-2xl font-light">
                  {t('home.insight_text_2')}
                </p>
              </div>
            </div>
            <div className="lg:col-span-6">
              <div className="grid grid-cols-1 gap-10">
                {[
                  { title: "Agentic AI Workflows", icon: <BrainCircuit className="text-oakivo-secondary" />, desc: "Deploy autonomous AI agents that execute complex business logic across your Odoo ERP ecosystem." },
                  { title: "Next-Gen Odoo 18", icon: <Database className="text-oakivo-secondary" />, desc: "Architecting unified environments that utilize native ML for predictive inventory and cash flow modeling." },
                  { title: "Cybersecurity First", icon: <ShieldCheck className="text-oakivo-secondary" />, desc: "Zero-trust frameworks and SOC2-ready security audits to protect your most critical intellectual assets." }
                ].map((item, i) => (
                  <div key={i} className="bg-oakivo-surface p-12 rounded-[48px] border border-transparent hover:border-oakivo-secondary/20 hover:bg-white hover:shadow-4xl transition-all duration-700 group">
                    <div className="flex gap-10 items-start">
                      <div className="shrink-0 p-6 bg-white rounded-3xl shadow-sm group-hover:bg-oakivo-primary group-hover:text-white transition-all duration-500">
                        {item.icon}
                      </div>
                      <div>
                        <h3 className="text-3xl font-bold font-serif-display mb-4 text-oakivo-primary leading-tight">{item.title}</h3>
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

      {/* Global Conversion Bar */}
      <section className="bg-oakivo-secondary py-40 text-center relative overflow-hidden group cv-auto">
        <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-1000"></div>
        <div className="container mx-auto px-6 relative z-10">
          <h2 className="text-6xl md:text-[10rem] font-bold text-oakivo-primary mb-12 font-serif-display tracking-tighter leading-[0.75]">{t('home.cta_footer_title')}</h2>
          <p className="text-2xl md:text-5xl text-oakivo-primary/80 mb-24 max-w-5xl mx-auto font-light leading-relaxed tracking-tight">
            {t('home.cta_footer_text')}
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-10">
            <Link to={NavRoute.CONTACT}>
              <Button variant="black" size="lg" className="px-24 py-8 text-3xl shadow-4xl transition-all hover:scale-110 active:scale-95">
                {t('nav.contact')}
              </Button>
            </Link>
            <Link to={NavRoute.SERVICES}>
              <Button variant="outline" size="lg" className="px-24 py-8 text-3xl text-oakivo-primary border-oakivo-primary hover:bg-oakivo-primary hover:text-white transition-all">
                Solution Matrix
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;