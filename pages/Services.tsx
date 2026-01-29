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
  const serviceColors = ["bg-blue-600", "bg-oakivo-secondary", "bg-indigo-600", "bg-emerald-600"];

  const serviceImages = [
     "https://images.unsplash.com/photo-1620712943543-bcc4638d9f8d?q=80&w=1600&auto=format&fit=crop", // AI Orchestration
     "https://images.unsplash.com/photo-1551288049-bbbda5366392?q=80&w=1600&auto=format&fit=crop", // Odoo 18 Systems
     "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=1600&auto=format&fit=crop", // Security & Resilience
     "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1600&auto=format&fit=crop"  // Digital Hub
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
      />

      {/* Cinematic Header */}
      <section className="bg-oakivo-primary text-white pt-48 pb-32 relative overflow-hidden">
         <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
         <div className="absolute bottom-0 right-0 w-1/2 h-full bg-gradient-to-tl from-oakivo-secondary/10 to-transparent"></div>
         
         <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-4xl">
               <div className="inline-flex items-center gap-3 bg-white/5 border border-white/10 px-6 py-2 rounded-full backdrop-blur-md mb-10">
                  <span className="w-2 h-2 rounded-full bg-oakivo-secondary animate-pulse"></span>
                  <span className="text-[10px] font-bold text-white uppercase tracking-[0.5em]">{t('services.hero_label')}</span>
               </div>
               <h1 className="text-6xl md:text-[9.5rem] font-serif-display font-bold leading-[0.8] mb-12 tracking-tighter">
                 The Matrix.
               </h1>
               <p className="text-2xl md:text-4xl text-gray-400 font-light max-w-2xl leading-tight">
                 High-fidelity engineering for the autonomous Canadian enterprise.
               </p>
            </div>
         </div>
      </section>

      {/* Services Feed */}
      <section className="bg-white py-40">
        <div className="container mx-auto px-6">
          <div className="space-y-48">
             {servicesList.map((service: any, idx: number) => {
               const Icon = serviceIcons[idx];
               const isEven = idx % 2 === 1;
               return (
                 <div key={idx} className={`flex flex-col lg:flex-row items-center gap-24 cv-auto ${isEven ? 'lg:flex-row-reverse' : ''}`}>
                    <div className="w-full lg:w-1/2 group relative">
                       <div className="aspect-[4/5] md:aspect-[16/10] overflow-hidden rounded-[56px] shadow-4xl relative">
                          <img 
                            src={serviceImages[idx]} 
                            alt={service.title} 
                            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 transform group-hover:scale-105"
                            loading="lazy"
                            decoding="async"
                          />
                          <div className="absolute inset-0 bg-oakivo-primary/20 group-hover:bg-transparent transition-colors duration-1000 z-10"></div>
                       </div>
                    </div>

                    <div className="w-full lg:w-1/2">
                       <div className="flex items-center gap-6 mb-10">
                          <span className="text-6xl font-serif-display italic font-bold text-gray-100">0{idx + 1}</span>
                          <div className="h-[2px] flex-grow bg-gray-50"></div>
                       </div>
                       
                       <h2 className="text-5xl md:text-7xl font-serif-display font-bold text-oakivo-primary mb-12 tracking-tighter leading-none">
                         {service.title}
                       </h2>

                       <div className="space-y-12">
                          <p className="text-2xl text-gray-500 font-light leading-relaxed">
                            {service.desc}
                          </p>

                          <div className="flex flex-wrap gap-4">
                             {tagsMap[idx].map((tag, tIdx) => (
                               <div key={tIdx} className="px-6 py-2.5 bg-oakivo-surface border border-gray-100 rounded-2xl text-[11px] font-bold text-oakivo-primary uppercase tracking-[0.2em] flex items-center gap-3">
                                  <Activity size={14} className="text-oakivo-secondary" /> {tag}
                               </div>
                             ))}
                          </div>

                          <div className="p-10 bg-gray-50 rounded-[40px] border-l-[12px] border-oakivo-secondary relative overflow-hidden group/insight">
                             <div className="absolute top-0 right-0 p-6 opacity-5 text-oakivo-primary group-hover/insight:opacity-10 transition-opacity">
                                <Lightbulb size={80} />
                             </div>
                             <span className="block text-[10px] font-black uppercase tracking-[0.4em] text-oakivo-secondary mb-6 italic">Tactical Advantage</span>
                             <p className="text-2xl font-serif-display italic text-gray-800 leading-relaxed">
                                "{service.insight}"
                             </p>
                          </div>

                          <div className="pt-8">
                             <Link to={NavRoute.CONTACT}>
                               <Button variant="black" size="lg" className="group px-12 py-6 text-xl">
                                 Request Blueprint <ArrowRight className="inline ml-4 group-hover:translate-x-3 transition-transform" />
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
    </>
  );
};

export default Services;