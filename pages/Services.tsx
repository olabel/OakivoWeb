
import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight, Database, BrainCircuit, ShieldCheck, Globe, Activity, Workflow, Lightbulb, Cpu, Layers } from 'lucide-react';
import Button from '../components/Button';
import SafeImage from '../components/SafeImage';
import { Link } from 'react-router-dom';
import { NavRoute } from '../types';
import { useLanguage, translations } from '../context/LanguageContext';
import SEO from '../components/SEO';

const AnimatedIcon: React.FC<{ icon: React.ReactNode }> = ({ icon }) => {
  const iconRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.2 }
    );

    if (iconRef.current) {
      observer.observe(iconRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div 
      ref={iconRef} 
      className={`w-20 h-20 lg:w-24 lg:h-24 bg-oakivo-surface border border-gray-100 rounded-[28px] lg:rounded-[32px] flex items-center justify-center text-oakivo-primary shadow-sm mb-10 lg:mb-12 transition-all duration-[1200ms] ${isVisible ? 'animate-icon-pop opacity-100' : 'opacity-0 translate-y-8 scale-90'}`}
    >
      {React.cloneElement(icon as React.ReactElement<any>, { size: 40, strokeWidth: 1.5 })}
    </div>
  );
};

const Services: React.FC = () => {
  const { t, language } = useLanguage();
  const servicesList = translations[language].services.list;

  const serviceIcons = [
     <BrainCircuit />, 
     <Database />, 
     <ShieldCheck />, 
     <Workflow />
  ];

  const serviceImages = [
     "https://images.unsplash.com/photo-1551434678-e076c223a692?q=90&w=1600&auto=format&fit=crop", 
     "https://images.unsplash.com/photo-1518770660439-4636190af475?q=90&w=1600&auto=format&fit=crop", 
     "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=90&w=1600&auto=format&fit=crop", 
     "https://images.unsplash.com/photo-1454165833767-027eeea15c3e?q=90&w=1600&auto=format&fit=crop"
  ];

  return (
    <>
      <SEO 
        title="Expertise | Digital Transformation & Odoo 18 Orchestration"
        description="Examine Oakivo's engineering pillars: Agentic AI, Odoo 18 Orchestration, and Zero-Trust Cybersecurity. Architecting high-fidelity resilience for Canadian industry."
      />

      {/* Header */}
      <section className="bg-white pt-48 pb-32 border-b border-oakivo-border relative overflow-hidden">
        <div className="absolute top-0 right-0 p-32 opacity-[0.03] text-oakivo-primary pointer-events-none">
           <Cpu size={300} />
        </div>
        <div className="container mx-auto px-6">
          <div className="max-w-4xl relative z-10">
            <div className="flex items-center gap-4 mb-10">
               <div className="h-[1px] w-12 bg-oakivo-secondary"></div>
               <span className="text-[10px] font-black text-oakivo-secondary uppercase tracking-[0.6em] block">Expertise Hub</span>
            </div>
            <h1 className="text-6xl md:text-9xl font-serif-display font-bold text-oakivo-primary mb-12 tracking-tighter leading-none">
              High-Fidelity <br/> Orchestration.
            </h1>
            <p className="text-2xl md:text-4xl text-oakivo-muted font-light leading-snug max-w-2xl">
              De-coupling technical debt through systemic engineering and autonomous agentic intelligence.
            </p>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-40 bg-white">
        <div className="container mx-auto px-6">
          <div className="space-y-64">
            {servicesList.map((service: any, idx: number) => (
              <div key={idx} className={`flex flex-col lg:flex-row items-center gap-24 ${idx % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
                <div className="w-full lg:w-1/2">
                  <div className="aspect-[16/10] rounded-[64px] overflow-hidden shadow-vise-xl relative group">
                    <SafeImage src={serviceImages[idx]} alt={service.title} className="group-hover:scale-105 transition-transform duration-[3000ms]" />
                    <div className="absolute inset-0 bg-oakivo-primary/10 group-hover:opacity-0 transition-opacity duration-1000"></div>
                  </div>
                </div>
                <div className="w-full lg:w-1/2">
                  <div className="flex items-start justify-between mb-8">
                     <AnimatedIcon icon={serviceIcons[idx]} />
                     <div className="text-7xl font-serif-display font-bold text-gray-100 italic select-none">0{idx + 1}</div>
                  </div>
                  <h2 className="text-4xl md:text-7xl font-serif-display font-bold text-oakivo-primary mb-10 tracking-tighter leading-none">
                    {service.title}
                  </h2>
                  <p className="text-xl md:text-3xl text-gray-500 font-light leading-relaxed mb-12">
                    {service.desc}
                  </p>
                  <div className="p-12 bg-oakivo-surface rounded-[48px] border border-gray-100 shadow-sm mb-12 relative overflow-hidden group/insight">
                    <div className="absolute top-0 right-0 p-8 opacity-5 text-oakivo-secondary">
                       <Layers size={120} />
                    </div>
                    <Lightbulb className="text-oakivo-secondary mb-8 group-hover:scale-110 transition-transform" size={32} />
                    <p className="text-2xl font-serif-display italic text-oakivo-primary font-light relative z-10">"{service.insight}"</p>
                  </div>
                  <Link to={NavRoute.CONTACT}>
                    <Button variant="black" size="lg" className="px-12 py-5 shadow-premium group">
                      Orchestrate Autonomy <ArrowRight size={22} className="group-hover:translate-x-2 transition-transform" />
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final Tactical CTA */}
      <section className="py-48 bg-[#020504] text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-oakivo-secondary/5 rounded-full blur-[160px] -mr-96 -mt-96"></div>
        <div className="container mx-auto px-6 text-center relative z-10">
          <h2 className="text-6xl md:text-9xl font-serif-display font-bold mb-12 tracking-tighter leading-none">Build your roadmap.</h2>
          <p className="text-2xl md:text-3xl text-gray-400 mb-20 max-w-3xl mx-auto font-light leading-relaxed">
            Our principal architects are ready to audit your industrial logic and map your journey to institutional maturity.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-10">
             <Link to={NavRoute.CONTACT}>
               <Button variant="white" size="lg" className="px-20 py-8 text-2xl bg-white text-black hover:bg-oakivo-secondary rounded-[24px] shadow-premium">
                 Engineer Resilience
               </Button>
             </Link>
             <Link to={NavRoute.CASE_STUDIES}>
               <Button variant="outline" size="lg" className="px-20 py-8 text-2xl border-white/20 text-white hover:border-white rounded-[24px]">
                 View Impact
               </Button>
             </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default Services;
