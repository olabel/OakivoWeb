import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, TrendingUp, ShieldCheck, ChevronRight, Activity, Database, Workflow, Sparkles, BrainCircuit, Bot, Search, PenTool, Zap, BarChart, Factory, ShoppingBag, Truck, Landmark, Cpu, Globe, Target, Layers, FileSearch, Rocket, CheckCircle2, MonitorCheck } from 'lucide-react';
import Button from '../components/Button';
import Logo from '../components/Logo';
import { NavRoute } from '../types';
import { useLanguage } from '../context/LanguageContext';
import SEO from '../components/SEO';

const Home: React.FC = () => {
  const { t } = useLanguage();
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

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Oakivo Solutions Inc",
    "url": "https://www.oakivo.com",
    "logo": "https://www.oakivo.com/logo.png",
    "description": "Leading Canadian digital transformation consultancy specializing in Agentic AI and Odoo ERP implementation.",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "21 Delta St.",
      "addressLocality": "Dieppe",
      "addressRegion": "NB",
      "postalCode": "E1A 3R5",
      "addressCountry": "CA"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+1-506-857-4000",
      "contactType": "customer service",
      "areaServed": "CA",
      "availableLanguage": ["English", "French"]
    }
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Digital Transformation Consulting",
    "provider": {
      "@type": "Organization",
      "name": "Oakivo Solutions Inc"
    },
    "areaServed": "Canada",
    "description": "Comprehensive digital transformation services including Odoo ERP orchestration, AI automation, and cybersecurity audits."
  };

  return (
    <>
      <SEO 
        title="Oakivo | Canada's Digital Transformation Engineers"
        description="Oakivo Solutions Inc. orchestrates the digital future with Intelligent Agentic AI and Expert Odoo ERP implementation. Engineering growth for Canadian SMEs."
        keywords="Digital Transformation Canada, AI Automation, Odoo ERP implementation, Business Process Orchestration, Cybersecurity SOC2"
        schema={[organizationSchema, serviceSchema]}
      />

      {/* Cinematic Hero - Enhanced Design */}
      <section 
        ref={heroRef}
        onMouseMove={handleMouseMove}
        className="relative min-h-screen flex items-center bg-[#020504] overflow-hidden pt-20"
      >
        {/* Abstract Background Image Layer */}
        <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
          <img 
            src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop"
            alt="Digital Data World"
            className="w-full h-full object-cover grayscale blur-[2px]"
            fetchPriority="high"
          />
          {/* Gradient Overlays for Fading into Background */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#020504] via-transparent to-[#020504]"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-[#020504] via-transparent to-[#020504]"></div>
        </div>

        {/* Dynamic Light Blobs */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <div 
            className="absolute top-[-20%] left-[-10%] w-[80%] h-[80%] bg-oakivo-secondary/10 rounded-full blur-[220px] transition-transform duration-[3000ms] ease-out"
            style={{ transform: `translate(${mousePos.x * 100}px, ${mousePos.y * 100}px)` }}
          ></div>
          <div 
            className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-oakivo-blue/5 rounded-full blur-[200px] transition-transform duration-[4000ms] ease-out delay-200"
            style={{ transform: `translate(${mousePos.x * -120}px, ${mousePos.y * -120}px)` }}
          ></div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
              <div className="lg:col-span-8">
                <div className="mb-10 inline-flex items-center gap-4 bg-white/5 border border-white/10 px-6 py-3 rounded-full backdrop-blur-3xl animate-fade-in-up shadow-2xl">
                   <Sparkles className="text-oakivo-secondary" size={16} />
                   <span className="text-white font-black tracking-[0.4em] uppercase text-[9px]">
                     Orchestrating Canada's Autonomous Future
                   </span>
                </div>

                <h1 className="text-5xl md:text-7xl lg:text-[7rem] font-serif-display font-bold text-white leading-[1.1] mb-12 tracking-tighter animate-fade-in-up [animation-delay:200ms]">
                  Orchestrating <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-oakivo-secondary via-white to-oakivo-secondary/60">Digital Growth.</span>
                </h1>

                <p className="text-lg md:text-2xl text-gray-400 mb-14 max-w-2xl font-light leading-snug animate-fade-in-up [animation-delay:400ms]">
                  {t('home.hero_subtitle')}
                </p>

                <div className="flex flex-col sm:flex-row items-center gap-10 animate-fade-in-up [animation-delay:600ms]">
                  <Link to={NavRoute.CONTACT}>
                    <Button variant="primary" size="lg" className="px-14 py-7 text-xl shadow-[0_0_100px_rgba(46,204,113,0.15)] hover:scale-105 transition-all duration-700 group">
                      {t('home.cta_primary')} <ArrowRight className="inline ml-4 group-hover:translate-x-3 transition-transform" />
                    </Button>
                  </Link>
                  <Link to={NavRoute.SERVICES} className="group flex items-center gap-6 text-white font-black uppercase tracking-[0.2em] text-[11px] transition-all hover:text-oakivo-secondary">
                    <div className="w-14 h-14 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-oakivo-secondary group-hover:text-black group-hover:border-oakivo-secondary transition-all shadow-4xl backdrop-blur-md">
                      <ChevronRight size={22} />
                    </div>
                    Blueprint Matrix
                  </Link>
                </div>
              </div>

              {/* Enhanced Metrics Card */}
              <div className="lg:col-span-4 space-y-6 animate-fade-in-up [animation-delay:800ms] hidden lg:block">
                 <div className="bg-white/5 border border-white/10 backdrop-blur-3xl p-10 rounded-[48px] shadow-4xl group hover:border-oakivo-secondary/40 transition-all duration-700 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-8 opacity-5 text-oakivo-secondary group-hover:opacity-10 transition-opacity">
                       <MonitorCheck size={80} />
                    </div>
                    <div className="flex items-center justify-between mb-10">
                       <span className="text-[10px] font-black text-oakivo-secondary uppercase tracking-[0.3em]">{t('home.stats_label')}</span>
                       <Activity size={20} className="text-oakivo-secondary animate-pulse" />
                    </div>
                    <div className="space-y-12">
                       <div className="flex justify-between items-end border-b border-white/5 pb-8">
                          <div>
                             <span className="text-5xl font-bold font-serif-display text-white">{t('home.stats_1_val')}</span>
                             <p className="text-xs text-gray-500 uppercase tracking-widest mt-1">{t('home.stats_1_lbl')}</p>
                          </div>
                          <TrendingUp size={32} className="text-oakivo-secondary opacity-30" />
                       </div>
                       <div className="flex justify-between items-end border-b border-white/5 pb-8">
                          <div>
                             <span className="text-5xl font-bold font-serif-display text-white">{t('home.stats_2_val')}</span>
                             <p className="text-xs text-gray-500 uppercase tracking-widest mt-1">{t('home.stats_2_lbl')}</p>
                          </div>
                          <Database size={32} className="text-oakivo-secondary opacity-30" />
                       </div>
                       <div className="flex justify-between items-end">
                          <div>
                             <span className="text-5xl font-bold font-serif-display text-white">{t('home.stats_3_val')}</span>
                             <p className="text-xs text-gray-500 uppercase tracking-widest mt-1">{t('home.stats_3_lbl')}</p>
                          </div>
                          <ShieldCheck size={32} className="text-oakivo-secondary opacity-30" />
                       </div>
                    </div>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Marquee Vertical Ticker - High Speed */}
      <div className="bg-oakivo-primary py-10 border-y border-white/5 overflow-hidden cv-auto">
        <div className="animate-marquee flex items-center">
          {[...industries, ...industries].map((industry, i) => (
            <div key={i} className="flex items-center gap-14 mx-16">
              <span className="text-white/10 font-serif-display text-5xl font-bold uppercase tracking-tighter italic transition-all hover:text-oakivo-secondary/40 cursor-default">{industry}</span>
              <div className="w-2 h-2 rounded-full bg-oakivo-secondary/30 shadow-[0_0_20px_rgba(46,204,113,0.4)]"></div>
            </div>
          ))}
        </div>
      </div>

      {/* Orchestration Model - Juiced Up Cards */}
      <section className="py-32 bg-white cv-auto relative overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end gap-12 mb-24 animate-fade-in-up">
             <div className="max-w-2xl">
                <div className="inline-flex items-center gap-3 text-oakivo-secondary font-black uppercase text-[10px] tracking-[0.4em] mb-6">
                   <Layers size={14} /> The Orchestration Model
                </div>
                <h2 className="text-5xl md:text-8xl font-serif-display font-bold text-oakivo-primary tracking-tighter leading-none mb-8">
                   {t('home.matrix_title')}
                </h2>
                <p className="text-xl text-gray-500 font-light leading-relaxed">{t('home.matrix_subtitle')}</p>
             </div>
             <Link to={NavRoute.SERVICES}>
                <Button variant="black" className="px-10 py-5 group shadow-2xl hover:scale-105 transition-all">
                  Tactical Blueprint <ArrowRight size={16} className="inline ml-3 group-hover:translate-x-2 transition-transform" />
                </Button>
             </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
             {[
               { title: t('home.cap_auto_title'), icon: <BrainCircuit />, desc: t('home.cap_auto_desc'), link: NavRoute.SERVICES },
               { title: t('home.cap_eco_title'), icon: <Database />, desc: t('home.cap_eco_desc'), link: NavRoute.SERVICES },
               { title: t('home.cap_sec_title'), icon: <ShieldCheck />, desc: t('home.cap_sec_desc'), link: NavRoute.SERVICES },
             ].map((item, i) => (
               <Link key={i} to={item.link} className="group p-12 bg-oakivo-surface border border-transparent hover:border-oakivo-secondary/30 hover:bg-white hover:shadow-4xl transition-all duration-700 rounded-[56px] flex flex-col h-full transform hover:-translate-y-2 animate-fade-in-up" style={{ animationDelay: `${i * 150}ms` }}>
                  <div className="w-20 h-20 bg-white rounded-3xl shadow-sm flex items-center justify-center text-oakivo-secondary group-hover:bg-oakivo-primary group-hover:text-white transition-all duration-700 mb-12">
                    {React.cloneElement(item.icon as React.ReactElement<any>, { size: 36 })}
                  </div>
                  <h3 className="text-3xl font-bold font-serif-display text-oakivo-primary mb-6 group-hover:text-oakivo-secondary transition-colors">{item.title}</h3>
                  <p className="text-gray-500 leading-relaxed font-light mb-12 flex-grow text-lg">{item.desc}</p>
                  <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-oakivo-primary">
                    Analyze Impact <ArrowRight size={14} className="group-hover:translate-x-3 transition-transform" />
                  </div>
               </Link>
             ))}
          </div>
        </div>
      </section>

      {/* Transformation Journey - Parallax Connector */}
      <section className="py-40 bg-oakivo-primary text-white cv-auto relative overflow-hidden">
         <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-5"></div>
         <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-4xl mx-auto text-center mb-32">
               <h2 className="text-5xl md:text-[7rem] font-serif-display font-bold mb-8 tracking-tighter leading-none">{t('home.transformation_title')}</h2>
               <p className="text-xl text-gray-400 font-light italic">{t('home.transformation_subtitle')}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
               {/* Connector Line with Animation */}
               <div className="absolute top-1/2 left-10 right-10 h-px bg-gradient-to-r from-oakivo-secondary/0 via-oakivo-secondary/20 to-oakivo-secondary/0 hidden lg:block -translate-y-1/2 animate-pulse"></div>
               
               {[
                 { title: "Discovery", desc: "Surgical audit of technical debt and silos.", icon: <FileSearch /> },
                 { title: "Architecture", icon: <PenTool />, desc: "Designing your digital nervous system." },
                 { title: "Deployment", icon: <Rocket />, desc: "High-precision integration and automation." },
                 { title: "Optimization", icon: <Zap />, desc: "Real-time telemetry and scaling." }
               ].map((step, i) => (
                 <div key={i} className="group p-12 bg-white/5 border border-white/10 rounded-[48px] hover:bg-white hover:text-oakivo-primary transition-all duration-700 relative z-10 backdrop-blur-md transform hover:scale-[1.03]">
                    <div className="flex items-center justify-between mb-12">
                       <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center text-oakivo-secondary group-hover:bg-oakivo-primary group-hover:text-white transition-all shadow-lg">
                          {React.cloneElement(step.icon as React.ReactElement<any>, { size: 28 })}
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

      {/* Digital Maturity Index - Juiced Interaction */}
      <section className="py-32 bg-white cv-auto">
        <div className="container mx-auto px-6">
           <div className="grid grid-cols-1 lg:grid-cols-12 gap-24 items-center">
              <div className="lg:col-span-5">
                 <div className="inline-block px-4 py-1.5 bg-oakivo-surface text-oakivo-primary border border-gray-100 rounded-full text-[10px] font-black uppercase tracking-[0.4em] mb-12">
                    Industrial Maturity
                 </div>
                 <h2 className="text-5xl md:text-7xl font-serif-display font-bold text-oakivo-primary mb-10 leading-[1.0] tracking-tighter">
                   {t('home.maturity_title')}
                 </h2>
                 <p className="text-xl text-gray-500 font-light leading-relaxed mb-14">
                   {t('home.maturity_subtitle')} We help organizations move from fragmented silos to autonomous, data-driven orchestration.
                 </p>
                 <Link to={NavRoute.CONTACT}>
                    <Button variant="black" className="px-14 py-6 text-lg shadow-4xl hover:scale-105 active:scale-95 transition-all">Assessment Audit</Button>
                 </Link>
              </div>
              <div className="lg:col-span-7">
                 <div className="space-y-8">
                    {[
                      { level: "L1: Fragmented", desc: "Manual processes, siloed data, high technical debt.", percentage: 20 },
                      { level: "L2: Optimized", desc: "Integrated ERP (Odoo), standard automations.", percentage: 55 },
                      { level: "L3: Autonomous", desc: "Agentic AI orchestration, real-time telemetry, predictive logic.", percentage: 95 }
                    ].map((idx, i) => (
                      <div key={i} className="p-12 bg-oakivo-surface border border-gray-100 rounded-[56px] group transition-all duration-700 hover:shadow-2xl hover:bg-white cursor-default">
                         <div className="flex justify-between items-center mb-8">
                            <h4 className="text-3xl font-bold font-serif-display text-oakivo-primary tracking-tight">{idx.level}</h4>
                            <CheckCircle2 size={32} className={i === 2 ? 'text-oakivo-secondary' : 'text-gray-200'} />
                         </div>
                         <p className="text-gray-500 mb-10 font-light text-lg">{idx.desc}</p>
                         <div className="h-2.5 w-full bg-gray-200 rounded-full overflow-hidden">
                            <div className="h-full bg-oakivo-secondary transition-all duration-[2000ms] group-hover:brightness-110" style={{ width: `${idx.percentage}%` }}></div>
                         </div>
                      </div>
                    ))}
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* Global Conversion Footer - Enhanced Dynamic Range */}
      <section className="bg-oakivo-secondary py-40 text-center group cv-auto relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-[2000ms]"></div>
        <div className="container mx-auto px-6 relative z-10">
          <h2 className="text-6xl md:text-[10rem] font-bold text-oakivo-primary mb-14 font-serif-display tracking-tighter leading-[0.75] transform group-hover:scale-[1.01] transition-transform duration-1000">
             {t('home.cta_footer_title')}
          </h2>
          <p className="text-2xl md:text-5xl text-oakivo-primary/80 mb-24 max-w-5xl mx-auto font-light leading-snug tracking-tight">
             {t('home.cta_footer_text')}
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-10">
            <Link to={NavRoute.CONTACT}>
              <Button variant="black" size="lg" className="px-20 py-8 text-2xl shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] hover:scale-110 duration-700 font-bold">
                {t('home.cta_footer_btn')}
              </Button>
            </Link>
            <Link to={NavRoute.CASE_STUDIES}>
              <Button variant="outline" size="lg" className="px-20 py-8 text-2xl text-oakivo-primary border-oakivo-primary/40 hover:bg-oakivo-primary hover:text-white transition-all duration-700 font-bold">
                Review Case Files
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;