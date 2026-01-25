import React, { useState } from 'react';
import Section from '../components/Section';
import { ArrowRight, Plus, Lightbulb, Search, PenTool, Zap, BarChart, ChevronDown, Cpu, Database, ShieldCheck, Globe, Activity, Workflow, Code, Layers } from 'lucide-react';
import Button from '../components/Button';
import { Link } from 'react-router-dom';
import { NavRoute } from '../types';
import { useLanguage, translations } from '../context/LanguageContext';
import SEO from '../components/SEO';

const FAQItem: React.FC<{ question: string; answer: string }> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-gray-100 py-6 last:border-0">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between text-left group focus:outline-none"
      >
        <span className="text-xl font-bold font-serif-display group-hover:text-oakivo-secondary transition-colors duration-300">{question}</span>
        <div className={`w-8 h-8 rounded-full border border-gray-100 flex items-center justify-center transition-all duration-500 ${isOpen ? 'bg-oakivo-primary text-white rotate-180' : 'bg-white text-oakivo-secondary'}`}>
           <ChevronDown size={18} />
        </div>
      </button>
      <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-96 opacity-100 mt-6' : 'max-h-0 opacity-0'}`}>
        <p className="text-gray-500 leading-relaxed text-lg font-light">{answer}</p>
      </div>
    </div>
  );
};

const Services: React.FC = () => {
  const { t, language } = useLanguage();
  const servicesList = translations[language].services.list;
  const steps = translations[language].services.steps;
  const faqs = translations[language].services.faq;

  const serviceIcons = [Workflow, Database, ShieldCheck, Globe];
  const serviceColors = ["bg-blue-500", "bg-oakivo-secondary", "bg-purple-500", "bg-orange-500"];

  const serviceImages = [
     "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1600&auto=format&fit=crop", // AI Automation
     "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1600&auto=format&fit=crop", // Odoo / Dashboard
     "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1600&auto=format&fit=crop", // Cyber / Hardware
     "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?q=80&w=1600&auto=format&fit=crop"  // Cloud / Server
  ];

  const tagsMap = [
     ["Agentic AI Workflows", "Generative BI", "Autonomous ETL"],
     ["Odoo 18 Orchestration", "ERP Consolidation", "Supply Chain Visibility"],
     ["Zero-Trust Frameworks", "vCISO Governance", "Penetration Testing"],
     ["Distributed Systems", "Legacy De-coupling", "Technical Debt Audit"]
  ];

  const methodIcons = [<Search size={32} />, <PenTool size={32} />, <Zap size={32} />, <BarChart size={32} />];

  return (
    <>
      <SEO 
        title="Solutions Matrix | Oakivo Digital Transformation & AI"
        description="Explore the Oakivo Solutions Matrix: From Agentic AI Automation to Expert Odoo 18 Orchestration and Zero-Trust Cybersecurity."
        keywords="AI Automation Canada, Odoo 18 Implementation, Digital Transformation Strategy, Cyber Security Audit"
        canonical="/services"
      />

      {/* Cinematic Hero */}
      <section className="bg-oakivo-primary text-white pt-48 pb-32 relative overflow-hidden">
         <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
         <div className="absolute bottom-0 right-0 w-1/2 h-full bg-gradient-to-tl from-oakivo-secondary/10 to-transparent"></div>
         
         <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-4xl">
               <div className="inline-flex items-center gap-3 bg-white/5 border border-white/10 px-6 py-2 rounded-full backdrop-blur-md mb-10">
                  <span className="w-2 h-2 rounded-full bg-oakivo-secondary animate-pulse"></span>
                  <span className="text-[10px] font-bold text-white uppercase tracking-[0.4em]">{t('services.hero_label')}</span>
               </div>
               <h1 className="text-6xl md:text-[9rem] font-serif-display font-bold leading-[0.8] mb-12 tracking-tighter">
                 The Solutions <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-oakivo-secondary to-white">Matrix.</span>
               </h1>
               <p className="text-2xl md:text-4xl text-gray-400 font-light max-w-2xl leading-tight">
                 Strategic engineering for the high-output Canadian enterprise.
               </p>
            </div>
         </div>
      </section>

      {/* Services Grid Overhaul */}
      <section className="bg-white py-40">
        <div className="container mx-auto px-6">
          <div className="space-y-40">
             {servicesList.map((service: any, idx: number) => {
               const Icon = serviceIcons[idx];
               const isEven = idx % 2 === 1;
               return (
                 <div key={idx} className={`flex flex-col lg:flex-row items-center gap-20 cv-auto ${isEven ? 'lg:flex-row-reverse' : ''}`}>
                    {/* Visual Pillar */}
                    <div className="w-full lg:w-1/2 group relative">
                       <div className="aspect-[4/5] md:aspect-[16/10] overflow-hidden rounded-[48px] shadow-4xl relative">
                          <div className="absolute inset-0 bg-oakivo-primary/20 group-hover:bg-transparent transition-colors duration-1000 z-10"></div>
                          <img 
                            src={serviceImages[idx]} 
                            alt={service.title} 
                            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 transform group-hover:scale-105"
                            loading={idx === 0 ? "eager" : "lazy"}
                            decoding="async"
                            {...(idx === 0 ? { fetchpriority: "high" } : {})}
                          />
                          {/* Floating Metadata Tag */}
                          <div className="absolute bottom-8 right-8 z-20 bg-white/95 backdrop-blur-xl p-6 rounded-3xl shadow-2xl flex items-center gap-4 border border-white/20 animate-fade-in-up">
                             <div className={`w-12 h-12 rounded-2xl ${serviceColors[idx]} flex items-center justify-center text-white`}>
                                <Icon size={24} />
                             </div>
                             <div>
                                <span className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-0.5">Deployment Ready</span>
                                <span className="block text-sm font-bold text-oakivo-primary">Q1 2026 Framework</span>
                             </div>
                          </div>
                       </div>
                    </div>

                    {/* Content Pillar */}
                    <div className="w-full lg:w-1/2">
                       <div className="flex items-center gap-4 mb-8">
                          <span className="text-5xl font-serif-display italic font-bold text-gray-100">0{idx + 1}</span>
                          <div className="h-px flex-grow bg-gray-100"></div>
                       </div>
                       
                       <h2 className="text-4xl md:text-7xl font-serif-display font-bold text-oakivo-primary mb-10 tracking-tighter leading-none">
                         {service.title}
                       </h2>

                       <div className="space-y-10">
                          <p className="text-2xl text-gray-500 font-light leading-relaxed">
                            {service.desc}
                          </p>

                          <div className="flex flex-wrap gap-4">
                             {tagsMap[idx].map((tag, tIdx) => (
                               <div key={tIdx} className="px-5 py-2 bg-oakivo-surface border border-gray-100 rounded-full text-[11px] font-bold text-oakivo-primary uppercase tracking-widest flex items-center gap-2">
                                  <Activity size={12} className="text-oakivo-secondary" /> {tag}
                               </div>
                             ))}
                          </div>

                          <div className="p-8 bg-gray-50 rounded-[32px] border-l-[12px] border-oakivo-secondary relative overflow-hidden group/insight">
                             <div className="absolute top-0 right-0 p-4 opacity-5 text-oakivo-primary group-hover/insight:opacity-10 transition-opacity">
                                <Lightbulb size={60} />
                             </div>
                             <span className="block text-[10px] font-black uppercase tracking-[0.3em] text-oakivo-secondary mb-4">The Strategic Advantage</span>
                             <p className="text-xl font-serif-display italic text-gray-800 leading-relaxed">
                                "{service.insight}"
                             </p>
                          </div>

                          <div className="pt-6">
                             <Link to={NavRoute.CONTACT}>
                               <Button variant="black" size="lg" className="group">
                                 {t('services.cta_btn')} <ArrowRight className="inline ml-3 group-hover:translate-x-2 transition-transform" />
                               </Button>
                             </Link>
                          </div>
                       </div>
                    </div>
                 </div>
               );
             })}
          </div>
        </div>
      </section>

      {/* The Oakivo Method - Interactive Narrative */}
      <section className="bg-oakivo-primary py-40 text-white overflow-hidden relative cv-auto">
         <div className="absolute top-0 right-0 p-20 opacity-[0.02] text-[20rem] font-serif-display font-bold pointer-events-none select-none">
            BLUEPRINT
         </div>
         
         <div className="container mx-auto px-6 relative z-10">
            <div className="flex flex-col lg:flex-row justify-between items-end gap-12 mb-32">
               <div className="max-w-3xl">
                  <div className="text-oakivo-secondary font-bold text-xs uppercase tracking-[0.4em] mb-6">Execution Logic</div>
                  <h2 className="text-5xl md:text-8xl font-serif-display font-bold leading-[0.9] tracking-tighter">
                    {t('services.method_title')}
                  </h2>
               </div>
               <p className="text-xl text-gray-400 font-light max-w-sm mb-4">
                 {t('services.method_subtitle')}
               </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
               {steps.map((phase: any, i: number) => (
                  <div key={i} className="group p-12 bg-white/5 border border-white/10 rounded-[48px] hover:bg-white hover:text-oakivo-primary transition-all duration-700">
                     <div className="flex items-center justify-between mb-12">
                        <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center text-oakivo-secondary group-hover:bg-oakivo-primary group-hover:text-white transition-all duration-500">
                           {methodIcons[i]}
                        </div>
                        <span className="text-4xl font-serif-display font-bold text-white/10 group-hover:text-oakivo-primary/10">0{i+1}</span>
                     </div>
                     <h3 className="text-3xl font-bold font-serif-display mb-6 tracking-tight">{phase.title}</h3>
                     <p className="text-gray-400 group-hover:text-gray-600 leading-relaxed font-light text-lg">{phase.desc}</p>
                  </div>
               ))}
            </div>
         </div>
      </section>

      {/* Technical FAQ Matrix */}
      <section className="bg-white py-40 cv-auto">
        <div className="container mx-auto px-6 max-w-5xl">
           <div className="text-center mb-24">
              <h2 className="text-5xl md:text-7xl font-serif-display font-bold text-oakivo-primary tracking-tighter mb-8">
                The Technical <br/> <span className="text-oakivo-secondary">Deep Dive.</span>
              </h2>
              <div className="w-24 h-1 bg-gray-100 mx-auto"></div>
           </div>

           <div className="grid grid-cols-1 gap-4">
              {faqs.map((item: any, i: number) => (
                <div key={i} className="bg-white border border-gray-50 rounded-[40px] px-10 hover:shadow-2xl transition-all duration-500 group">
                   <FAQItem question={item.q} answer={item.a} />
                </div>
              ))}
           </div>
        </div>
      </section>

      {/* Global Conversion Bar */}
      <section className="bg-oakivo-secondary py-32 text-center group cv-auto">
        <div className="container mx-auto px-6">
          <h2 className="text-5xl md:text-9xl font-serif-display font-bold text-oakivo-primary mb-12 tracking-tighter leading-none group-hover:scale-[1.02] transition-transform duration-1000">
            {t('services.cta_title')}
          </h2>
          <p className="text-2xl md:text-4xl text-oakivo-primary/70 mb-20 max-w-3xl mx-auto font-light leading-snug tracking-tight">
            {t('services.cta_text')}
          </p>
          <Link to={NavRoute.CONTACT}>
            <Button variant="black" size="lg" className="px-24 py-8 text-3xl shadow-4xl hover:scale-110 active:scale-95 transition-all">
              {t('services.cta_btn')}
            </Button>
          </Link>
        </div>
      </section>
    </>
  );
};

export default Services;