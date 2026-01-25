import React, { useEffect, useRef, useState } from 'react';
import Section from '../components/Section';
import { ArrowRight, Quote, Plus, X, BarChart3, Database, ShieldCheck, Zap, Activity, ChevronRight, FileText, Cpu } from 'lucide-react';
import { useLanguage, translations } from '../context/LanguageContext';
import Button from '../components/Button';
import { NavRoute } from '../types';
import { Link } from 'react-router-dom';

const ParallaxImage: React.FC<{ src: string; alt: string; speed?: number }> = ({ src, alt, speed = 0.1 }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const scrollPos = window.scrollY;
      const windowHeight = window.innerHeight;
      
      if (rect.top < windowHeight && rect.bottom > 0) {
        setOffset((scrollPos - containerRef.current.offsetTop) * speed);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed]);

  return (
    <div ref={containerRef} className="overflow-hidden relative h-full w-full">
      <img 
        src={src} 
        alt={alt} 
        className="w-full h-[120%] object-cover absolute -top-[10%]" 
        style={{ transform: `translateY(${offset}px)` }}
        loading="lazy"
      />
    </div>
  );
};

const BlueprintDrawer: React.FC<{ 
  isOpen: boolean; 
  onClose: () => void; 
  data: any;
}> = ({ isOpen, onClose, data }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-end bg-black/80 backdrop-blur-sm animate-in fade-in duration-300">
      <div 
        className="h-full w-full max-w-4xl bg-white shadow-4xl animate-in slide-in-from-right duration-500 overflow-y-auto"
      >
        <div className="p-10 md:p-16">
          <div className="flex items-center justify-between mb-12">
            <div className="flex items-center gap-4">
               <div className="w-12 h-12 bg-oakivo-primary text-oakivo-secondary rounded-2xl flex items-center justify-center">
                  <FileText size={24} />
               </div>
               <div>
                  <span className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">Tactical Case File</span>
                  <h2 className="text-3xl font-serif-display font-bold text-oakivo-primary">{data.title}</h2>
               </div>
            </div>
            <button 
              onClick={onClose}
              className="p-3 hover:bg-gray-100 rounded-full transition-all text-oakivo-primary"
            >
              <X size={32} />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
             <div className="p-8 bg-oakivo-surface rounded-3xl border border-gray-100">
                <h4 className="text-[10px] font-black uppercase tracking-widest text-oakivo-secondary mb-6 flex items-center gap-2">
                  <Activity size={14} /> Performance Index
                </h4>
                <div className="space-y-8">
                   <div>
                      <div className="flex justify-between items-end mb-2">
                         <span className="text-sm font-bold text-oakivo-primary">Operational Speed</span>
                         <span className="text-sm font-black text-oakivo-secondary">+88%</span>
                      </div>
                      <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
                         <div className="h-full bg-oakivo-secondary w-[88%]"></div>
                      </div>
                   </div>
                   <div>
                      <div className="flex justify-between items-end mb-2">
                         <span className="text-sm font-bold text-oakivo-primary">Error Reduction</span>
                         <span className="text-sm font-black text-oakivo-secondary">99.2%</span>
                      </div>
                      <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
                         <div className="h-full bg-oakivo-secondary w-[99%]"></div>
                      </div>
                   </div>
                </div>
             </div>

             <div className="p-8 bg-oakivo-primary text-white rounded-3xl">
                <h4 className="text-[10px] font-black uppercase tracking-widest text-oakivo-secondary mb-6 flex items-center gap-2">
                  <Cpu size={14} /> AI Core Logic
                </h4>
                <p className="text-sm font-light text-gray-300 leading-relaxed italic mb-8">
                  "The Agentic workflow implemented here utilized a multi-stage reasoning engine to bridge the gap between Odoo's core data and the industrial shop-floor sensors."
                </p>
                <div className="flex flex-wrap gap-3">
                   {['Agentic AI', 'Odoo 18', 'Real-time Sync'].map(tag => (
                     <span key={tag} className="px-3 py-1 bg-white/10 rounded-lg text-[9px] font-bold uppercase tracking-widest">
                       {tag}
                     </span>
                   ))}
                </div>
             </div>
          </div>

          <div className="prose prose-lg max-w-none text-gray-600 font-light leading-relaxed mb-16">
             <h3 className="text-2xl font-serif-display font-bold text-oakivo-primary">The Orchestration Blueprint</h3>
             <p>Our engineering team identified a critical bottleneck in the manual reconciliation process. By deploying a custom Odoo 18 automation layer, we de-coupled the finance team from routine tasks, allowing them to focus on high-level strategic advisory.</p>
             <p>The resulting architecture is fully scalable, supporting multi-region growth with native Canadian compliance built-in.</p>
          </div>

          <div className="pt-10 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-8">
             <div className="flex items-center gap-4">
                <ShieldCheck className="text-oakivo-secondary" size={32} />
                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Project Certified SOC2 Ready</span>
             </div>
             <Link to={NavRoute.CONTACT}>
               <Button variant="black" className="px-12">Request Blueprint Audit</Button>
             </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

const CaseStudies: React.FC = () => {
  const { t, language } = useLanguage();
  const casesData = translations[language].caseStudies.cases;
  const [activeBlueprint, setActiveBlueprint] = useState<any | null>(null);
  
  const casesMeta = [
    {
      id: 1,
      client: "Atlantic Logistics",
      category: "Industrial Automation",
      img: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=1200&auto=format&fit=crop",
      size: "large",
    },
    {
      id: 2,
      client: "FinTrust Canada",
      category: "Cloud Security",
      img: "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=800&auto=format&fit=crop",
      size: "small",
    },
    {
      id: 3,
      client: "Northern Retail Group",
      category: "ERP Modernization",
      img: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=800&auto=format&fit=crop",
      size: "small",
    },
    {
      id: 4,
      client: "TechFlow Support",
      category: "Generative AI",
      img: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?q=80&w=1200&auto=format&fit=crop",
      size: "large",
    },
  ];

  return (
    <>
      <section className="bg-white pt-40 pb-16">
         <div className="container mx-auto px-6">
            <div className="flex items-center gap-4 mb-6">
               <div className="h-[1px] w-12 bg-oakivo-secondary"></div>
               <span className="text-oakivo-secondary font-bold tracking-widest uppercase">{t('nav.work')}</span>
            </div>
            <h1 className="text-6xl md:text-8xl font-serif-display font-bold mb-8 text-black tracking-tighter">
              {t('caseStudies.hero_title')}
            </h1>
            <p className="text-xl text-gray-500 max-w-2xl font-light leading-relaxed">
              {t('caseStudies.hero_subtitle')}
            </p>
         </div>
      </section>

      {/* Case Studies Grid */}
      <section className="bg-white pb-32">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-32">
            {casesMeta.map((project, idx) => {
              const data = casesData[idx] || { title: 'Pending Case', summary: '', quote: '', impact: 'N/A' };
              const isLarge = project.size === 'large';
              
              return (
                <div 
                  key={project.id} 
                  className={`group relative flex flex-col ${isLarge ? 'md:col-span-2' : ''} ${idx % 3 === 0 ? 'md:mt-0' : 'md:mt-24'} cv-auto`}
                >
                  {/* Image Container */}
                  <div className={`relative overflow-hidden mb-8 shadow-2xl rounded-3xl ${isLarge ? 'aspect-[21/9]' : 'aspect-[4/5] md:aspect-[3/4]'}`}>
                    <div className="absolute inset-0 bg-oakivo-primary/20 group-hover:bg-transparent transition-colors z-20 duration-500"></div>
                    
                    {isLarge ? (
                      <ParallaxImage src={project.img} alt={data.title} speed={0.12} />
                    ) : (
                      <img 
                        src={project.img} 
                        alt={data.title} 
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 transform group-hover:scale-105" 
                        loading="lazy"
                      />
                    )}

                    {/* Technical Blueprint Badge */}
                    <button 
                      onClick={() => setActiveBlueprint(data)}
                      className="absolute top-6 right-6 z-30 group/badge"
                    >
                      <div className="flex items-center gap-3 bg-white/95 backdrop-blur-md px-6 py-3 rounded-full text-[11px] font-black uppercase tracking-[0.2em] text-oakivo-primary shadow-2xl transition-all group-hover/badge:bg-oakivo-secondary group-hover/badge:scale-105">
                        <Plus size={14} className="group-hover/badge:rotate-90 transition-transform" /> 
                        View Blueprint
                      </div>
                    </button>
                  </div>
                  
                  {/* Content Lockup */}
                  <div className={`grid grid-cols-1 ${isLarge ? 'lg:grid-cols-12' : ''} gap-12 items-start`}>
                    <div className={`${isLarge ? 'lg:col-span-7' : ''}`}>
                      <div className="flex items-center gap-4 mb-6">
                        <span className="text-[10px] font-black uppercase tracking-[0.25em] bg-oakivo-primary text-white px-3 py-1 rounded">
                          {project.category}
                        </span>
                        <div className="h-px w-8 bg-gray-200"></div>
                        <span className="text-[11px] font-bold uppercase tracking-widest text-gray-400 italic">
                          {project.client}
                        </span>
                      </div>
                      <h3 className={`font-serif-display font-bold leading-tight group-hover:text-oakivo-primary transition-colors mb-8 ${isLarge ? 'text-4xl md:text-7xl tracking-tighter' : 'text-3xl'}`}>
                        {data.title}
                      </h3>
                      <p className="text-gray-500 text-xl leading-relaxed mb-10 max-w-2xl font-light">
                        {data.summary}
                      </p>
                      
                      <button 
                        onClick={() => setActiveBlueprint(data)}
                        className="inline-flex items-center gap-4 font-black uppercase tracking-[0.2em] text-[10px] text-oakivo-primary border-b-2 border-transparent hover:border-oakivo-secondary transition-all pb-2 group/link"
                      >
                        Review Architectural Impact 
                        <ArrowRight size={16} className="group-hover/link:translate-x-2 transition-transform" />
                      </button>
                    </div>

                    {/* Impact Stats / Quote Column */}
                    <div className={`${isLarge ? 'lg:col-span-5' : ''}`}>
                      <div className="bg-oakivo-surface p-12 rounded-[40px] border border-gray-100 relative group-hover:shadow-4xl transition-all duration-700 group/quote overflow-hidden">
                        <div className="absolute top-0 right-0 p-8 opacity-10 text-oakivo-secondary group-hover/quote:opacity-20 transition-opacity">
                           <BarChart3 size={80} />
                        </div>
                        <div className="relative z-10 mb-8">
                           <span className="text-[10px] font-black uppercase tracking-[0.3em] text-oakivo-secondary mb-2 block">Measurable ROI</span>
                           <div className="text-5xl font-serif-display font-bold text-oakivo-primary tracking-tighter">
                              {data.impact}
                           </div>
                        </div>
                        <p className="text-xl font-serif-display italic text-gray-800 mb-10 leading-relaxed relative z-10 font-medium border-t border-gray-100 pt-8">
                          "{data.quote}"
                        </p>
                        <div className="flex items-center gap-5 relative z-10">
                           <div className="w-10 h-10 rounded-xl bg-oakivo-primary flex items-center justify-center text-white text-xs font-bold shadow-lg">
                              {data.author ? data.author.charAt(0) : 'P'}
                           </div>
                           <div>
                              <p className="text-[10px] font-black uppercase tracking-widest text-oakivo-primary">
                                {data.author}
                              </p>
                              <p className="text-[9px] text-gray-400 font-bold uppercase tracking-tighter mt-1 opacity-70">Strategic Partner Success</p>
                           </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Strategic Partnership Section */}
      <section className="bg-oakivo-primary py-40 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
        <div className="container mx-auto px-6 relative z-10">
           <div className="max-w-5xl mx-auto text-center">
              <div className="inline-flex items-center gap-3 bg-white/5 border border-white/10 text-oakivo-secondary px-8 py-3 rounded-full text-xs font-black uppercase tracking-[0.3em] mb-16 backdrop-blur-md">
                 <Zap size={16} className="animate-pulse" /> Engineering Results
              </div>
              <h2 className="text-5xl md:text-[8rem] font-serif-display font-bold mb-16 tracking-tighter leading-[0.8] transition-all">
                Beyond <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-oakivo-secondary to-white">Software.</span>
              </h2>
              <p className="text-2xl text-gray-400 font-light leading-relaxed mb-20 max-w-3xl mx-auto">
                {language === 'en'
                  ? "We don't measure success by deployments, but by the measurable impact on your bottom line. Our AI Orchestration models typically yield ROI within the first 6 months of execution."
                  : "Nous ne mesurons pas le succès par les déploiements, mais par l'impact mesurable sur vos résultats. Nos modèles d'orchestration IA produisent généralement un ROI dès les 6 premiers mois."}
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                 {[
                   { val: "23%", label: "Average OpEx Reduction", icon: <BarChart3 size={24} className="text-oakivo-secondary mb-4 mx-auto" /> },
                   { val: "500k+", label: "Reclaimed Human Hours", icon: <ShieldCheck size={24} className="text-oakivo-secondary mb-4 mx-auto" /> },
                   { val: "98%", label: "System Uptime Standard", icon: <Zap size={24} className="text-oakivo-secondary mb-4 mx-auto" /> }
                 ].map((stat, i) => (
                   <div key={i} className="p-12 bg-white/5 border border-white/10 rounded-[48px] backdrop-blur-2xl hover:bg-white/10 transition-all duration-500">
                      {stat.icon}
                      <div className="text-6xl font-bold text-white mb-3 font-serif-display">{stat.val}</div>
                      <div className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500">{stat.label}</div>
                   </div>
                 ))}
              </div>
           </div>
        </div>
      </section>

      {/* Blueprint Drawer Component */}
      <BlueprintDrawer 
        isOpen={!!activeBlueprint} 
        onClose={() => setActiveBlueprint(null)} 
        data={activeBlueprint} 
      />
    </>
  );
};

export default CaseStudies;