import React, { useEffect, useRef, useState } from 'react';
import Section from '../components/Section';
import { ArrowRight, Plus, X, BarChart3, ShieldCheck, Zap, Activity, FileText, Cpu, Search, Layers, TrendingUp } from 'lucide-react';
import { useLanguage, translations } from '../context/LanguageContext';
import Button from '../components/Button';
import { NavRoute } from '../types';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

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

    window.addEventListener('scroll', handleScroll, { passive: true });
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
        decoding="async"
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
    <div className="fixed inset-0 z-[100] flex items-center justify-end bg-black/90 backdrop-blur-xl animate-in fade-in duration-500">
      <div 
        className="h-full w-full max-w-4xl bg-white shadow-4xl animate-in slide-in-from-right duration-700 overflow-y-auto"
      >
        <div className="p-10 md:p-20 relative">
          <button 
            onClick={onClose}
            className="absolute top-10 right-10 p-4 hover:bg-gray-100 rounded-full transition-all text-oakivo-primary group"
          >
            <X size={32} className="group-hover:rotate-90 transition-transform duration-500" />
          </button>

          <div className="flex items-center gap-6 mb-16">
            <div className="w-16 h-16 bg-oakivo-primary text-oakivo-secondary rounded-[20px] flex items-center justify-center shadow-2xl">
                <FileText size={32} />
            </div>
            <div>
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-oakivo-secondary mb-2 block">Technical Intelligence Case</span>
                <h2 className="text-4xl md:text-5xl font-serif-display font-bold text-oakivo-primary tracking-tighter">{data.title}</h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-20">
             <div className="p-10 bg-oakivo-surface rounded-[40px] border border-gray-100 shadow-sm relative overflow-hidden group/metric">
                <div className="absolute top-0 right-0 p-6 opacity-5 text-oakivo-secondary group-hover/metric:opacity-10 transition-opacity">
                   <TrendingUp size={120} />
                </div>
                <h4 className="text-[11px] font-black uppercase tracking-widest text-oakivo-primary mb-8 flex items-center gap-3">
                  <Activity size={16} className="text-oakivo-secondary" /> Performance Payload
                </h4>
                <div className="space-y-10">
                   <div>
                      <div className="flex justify-between items-end mb-3">
                         <span className="text-sm font-bold text-oakivo-primary">Operational Velocity</span>
                         <span className="text-sm font-black text-oakivo-secondary">+88%</span>
                      </div>
                      <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                         <div className="h-full bg-oakivo-secondary w-[88%] transition-all duration-1000"></div>
                      </div>
                   </div>
                   <div>
                      <div className="flex justify-between items-end mb-3">
                         <span className="text-sm font-bold text-oakivo-primary">Error Suppression</span>
                         <span className="text-sm font-black text-oakivo-secondary">99.2%</span>
                      </div>
                      <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                         <div className="h-full bg-oakivo-secondary w-[99%] transition-all duration-1000"></div>
                      </div>
                   </div>
                </div>
             </div>

             <div className="p-10 bg-oakivo-primary text-white rounded-[40px] shadow-4xl relative overflow-hidden group/ai">
                <div className="absolute top-0 right-0 p-6 opacity-10 text-oakivo-secondary">
                   <Cpu size={100} />
                </div>
                <h4 className="text-[11px] font-black uppercase tracking-widest text-oakivo-secondary mb-8 flex items-center gap-3">
                  <Layers size={16} /> Orchestration Logic
                </h4>
                <p className="text-lg font-light text-gray-300 leading-relaxed italic mb-10 relative z-10">
                  "The Agentic workflow utilized a multi-stage reasoning engine to bridge the gap between Odoo's core database and real-world industrial metrics."
                </p>
                <div className="flex flex-wrap gap-3 relative z-10">
                   {['Agentic AI', 'Odoo 18', 'Real-time Sync', 'SOC2 Compliant'].map(tag => (
                     <span key={tag} className="px-4 py-1.5 bg-white/10 border border-white/5 rounded-xl text-[10px] font-bold uppercase tracking-widest">
                       {tag}
                     </span>
                   ))}
                </div>
             </div>
          </div>

          <div className="prose prose-xl max-w-none text-gray-600 font-light leading-relaxed mb-20">
             <h3 className="text-3xl font-serif-display font-bold text-oakivo-primary tracking-tight mb-8">The Engineering Blueprint</h3>
             <p>Our engineering team identified a critical bottleneck in the manual data reconciliation process. By deploying a custom Odoo 18 automation layer, we de-coupled the operational team from routine tasks, allowing them to focus on high-level strategic advisory.</p>
             <p>The resulting architecture is fully scalable, supporting multi-region growth with native Canadian compliance built into every data pipeline.</p>
          </div>

          <div className="pt-12 border-t border-gray-100 flex flex-col md:flex-row items-center justify-between gap-10">
             <div className="flex items-center gap-5">
                <div className="w-14 h-14 bg-oakivo-surface rounded-2xl flex items-center justify-center text-oakivo-secondary border border-gray-100">
                   <ShieldCheck size={32} />
                </div>
                <span className="text-xs font-black text-gray-400 uppercase tracking-[0.3em]">Project Certified <br/> Institutional Grade</span>
             </div>
             <Link to={NavRoute.CONTACT} className="w-full md:w-auto">
               <Button variant="black" size="lg" className="w-full px-16 shadow-2xl">Request Strategic Audit</Button>
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
      client: "Atlantic Distribution",
      category: "Industrial Orchestration",
      img: "https://images.unsplash.com/photo-1553413077-190dd305871c?q=80&w=1600&auto=format&fit=crop", // Modern Distribution
      size: "large",
    },
    {
      id: 2,
      client: "FinTrust Canada",
      category: "Cyber Resilience",
      img: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200&auto=format&fit=crop", // Secure Infrastructure
      size: "small",
    },
    {
      id: 3,
      client: "Northern Retail",
      category: "ERP Modernization",
      img: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e12?q=80&w=1200&auto=format&fit=crop", // Modern Logistics
      size: "small",
    },
    {
      id: 4,
      client: "Atlantic Manufacturing",
      category: "Agentic AI",
      img: "https://images.unsplash.com/photo-1565106430482-8f6e74349ca1?q=80&w=1600&auto=format&fit=crop", // Advanced Robotics
      size: "large",
    },
  ];

  return (
    <>
      <SEO 
        title="Case Studies | Engineering Success in Canada"
        description="Explore Oakivo's portfolio of successful digital transformations. Measurable ROI through AI automation and ERP orchestration."
        keywords="Case Studies Odoo Canada, AI implementation ROI, ERP success stories Atlantic Canada"
        canonical="/case-studies"
      />

      <section className="bg-white pt-48 pb-20">
         <div className="container mx-auto px-6">
            <div className="flex items-center gap-4 mb-8 animate-fade-in-up">
               <div className="h-[1px] w-12 bg-oakivo-secondary"></div>
               <span className="text-oakivo-secondary font-black tracking-[0.4em] uppercase text-[10px]">Strategic Portfolio</span>
            </div>
            <h1 className="text-6xl md:text-9xl font-serif-display font-bold mb-10 text-black tracking-tighter leading-none animate-fade-in-up [animation-delay:200ms]">
              Results.
            </h1>
            <p className="text-xl md:text-3xl text-gray-500 max-w-3xl font-light leading-relaxed animate-fade-in-up [animation-delay:400ms]">
              Institutional-grade reports on how we transform operational friction into organizational equity.
            </p>
         </div>
      </section>

      <section className="bg-white pb-40">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-32">
            {casesMeta.map((project, idx) => {
              const data = casesData[idx] || { title: 'Blueprint Pending', summary: '', quote: '', impact: 'N/A', author: 'Oakivo Engineer' };
              const isLarge = project.size === 'large';
              
              return (
                <div 
                  key={project.id} 
                  className={`group relative flex flex-col ${isLarge ? 'md:col-span-2' : ''} cv-auto animate-fade-in-up`}
                  style={{ animationDelay: `${(idx % 2) * 200}ms` }}
                >
                  <div className={`relative overflow-hidden mb-12 shadow-4xl rounded-[56px] transition-all duration-1000 ${isLarge ? 'aspect-[21/9]' : 'aspect-[4/5]'} group-hover:shadow-[0_50px_100px_rgba(0,0,0,0.15)]`}>
                    <div className="absolute inset-0 bg-oakivo-primary/20 group-hover:bg-transparent transition-colors z-20 duration-1000"></div>
                    
                    {isLarge ? (
                      <ParallaxImage src={project.img} alt={data.title} speed={0.15} />
                    ) : (
                      <img 
                        src={project.img} 
                        alt={data.title} 
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-[2000ms] transform group-hover:scale-110" 
                        loading="lazy"
                        decoding="async"
                      />
                    )}

                    <button 
                      onClick={() => setActiveBlueprint(data)}
                      className="absolute top-10 right-10 z-30 group/badge"
                    >
                      <div className="flex items-center gap-4 bg-white/95 backdrop-blur-md px-10 py-5 rounded-full text-[10px] font-black uppercase tracking-[0.3em] text-oakivo-primary shadow-2xl transition-all group-hover/badge:bg-oakivo-secondary group-hover/badge:scale-105 active:scale-95">
                        <Plus size={18} className="group-hover/badge:rotate-90 transition-transform duration-500" /> 
                        Tactical Blueprint
                      </div>
                    </button>
                  </div>
                  
                  <div className={`grid grid-cols-1 ${isLarge ? 'lg:grid-cols-12' : ''} gap-20 items-start`}>
                    <div className={`${isLarge ? 'lg:col-span-7' : ''}`}>
                      <div className="flex items-center gap-5 mb-10">
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] bg-oakivo-primary text-white px-5 py-2 rounded-xl shadow-xl">
                          {project.category}
                        </span>
                        <div className="h-px w-12 bg-gray-100"></div>
                        <span className="text-xs font-black uppercase tracking-widest text-gray-400">
                          {project.client}
                        </span>
                      </div>
                      <h3 className={`font-serif-display font-bold leading-tight mb-10 tracking-tighter transition-colors group-hover:text-oakivo-secondary ${isLarge ? 'text-5xl md:text-8xl' : 'text-4xl md:text-5xl'}`}>
                        {data.title}
                      </h3>
                      <p className="text-gray-500 text-xl md:text-2xl leading-relaxed mb-12 max-w-3xl font-light italic">
                        {data.summary}
                      </p>
                      
                      <button 
                        onClick={() => setActiveBlueprint(data)}
                        className="inline-flex items-center gap-6 font-black uppercase tracking-[0.4em] text-[9px] md:text-[10px] text-oakivo-primary border-b-2 border-transparent hover:border-oakivo-secondary transition-all pb-4 group/link"
                      >
                        ANALYZE ARCHITECTURAL IMPACT 
                        <ArrowRight size={18} className="group-hover/link:translate-x-3 transition-transform duration-500" />
                      </button>
                    </div>

                    <div className={`${isLarge ? 'lg:col-span-5' : ''}`}>
                      <div className="bg-oakivo-surface p-12 rounded-[56px] border border-gray-100 relative hover:shadow-4xl transition-all duration-700 group/quote overflow-hidden">
                        <div className="absolute top-0 right-0 p-8 opacity-10 text-oakivo-secondary group-hover/quote:opacity-20 transition-opacity">
                           <TrendingUp size={120} />
                        </div>
                        <div className="relative z-10 mb-12">
                           <span className="text-[10px] font-black uppercase tracking-[0.4em] text-oakivo-secondary mb-4 block">Performance Metric</span>
                           <div className="text-6xl md:text-7xl font-serif-display font-bold text-oakivo-primary tracking-tighter">
                              {data.impact}
                           </div>
                        </div>
                        <p className="text-2xl font-serif-display italic text-gray-800 mb-12 leading-relaxed relative z-10 font-light border-t border-gray-100 pt-10">
                          "{data.quote}"
                        </p>
                        <div className="flex items-center gap-6 relative z-10">
                           <div className="w-16 h-16 rounded-[20px] bg-oakivo-primary flex items-center justify-center text-white text-xl font-bold shadow-2xl border border-white/10">
                              {data.author ? data.author.charAt(0) : 'P'}
                           </div>
                           <div>
                              <p className="text-sm font-black uppercase tracking-widest text-oakivo-primary leading-none mb-2">
                                {data.author}
                              </p>
                              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter opacity-70">Strategic Deployment Lead</p>
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

      <BlueprintDrawer 
        isOpen={!!activeBlueprint} 
        onClose={() => setActiveBlueprint(null)} 
        data={activeBlueprint} 
      />
    </>
  );
};

export default CaseStudies;