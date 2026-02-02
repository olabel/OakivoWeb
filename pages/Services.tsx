import React from 'react';
import { ArrowRight, Database, BrainCircuit, ShieldCheck, Globe, Activity, Workflow, Lightbulb, ChevronDown } from 'lucide-react';
import Button from '../components/Button';
import SafeImage from '../components/SafeImage';
import { Link } from 'react-router-dom';
import { NavRoute } from '../types';
import { useLanguage, translations } from '../context/LanguageContext';
import SEO from '../components/SEO';

const Services: React.FC = () => {
  const { t, language } = useLanguage();
  const servicesList = translations[language].services.list;

  const serviceImages = [
     "https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=1600&auto=format&fit=crop", // AI Workflow
     "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1600&auto=format&fit=crop", // Technical Hardware
     "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1600&auto=format&fit=crop", // Security
     "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1600&auto=format&fit=crop"  // Network Infrastructure
  ];

  return (
    <>
      <SEO 
        title="Services | The Oakivo Solutions Matrix"
        description="Comprehensive digital transformation services including Odoo ERP orchestration, Agentic AI, and cybersecurity for Canadian industry."
      />

      {/* Header */}
      <section className="bg-white pt-48 pb-32 border-b border-oakivo-border">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl">
            <span className="text-[10px] font-black text-oakivo-primary uppercase tracking-[0.5em] mb-10 block">Expertise Hub</span>
            <h1 className="text-6xl md:text-9xl font-serif-display font-bold text-oakivo-text mb-12 tracking-tighter leading-none">
              The Matrix.
            </h1>
            <p className="text-2xl md:text-4xl text-oakivo-muted font-light leading-snug">
              High-fidelity engineering for the autonomous Canadian enterprise.
            </p>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-40 bg-white">
        <div className="container mx-auto px-6">
          <div className="space-y-48">
            {servicesList.map((service: any, idx: number) => (
              <div key={idx} className={`flex flex-col lg:flex-row items-center gap-24 ${idx % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
                <div className="w-full lg:w-1/2">
                  <div className="aspect-[16/10] rounded-[56px] overflow-hidden shadow-vise-lg">
                    <SafeImage src={serviceImages[idx]} alt={service.title} />
                  </div>
                </div>
                <div className="w-full lg:w-1/2">
                  <div className="text-6xl font-serif-display font-bold text-oakivo-surface mb-8 italic">0{idx + 1}</div>
                  <h2 className="text-4xl md:text-6xl font-serif-display font-bold text-oakivo-text mb-10 tracking-tight">
                    {service.title}
                  </h2>
                  <p className="text-xl md:text-2xl text-oakivo-muted font-light leading-relaxed mb-12">
                    {service.desc}
                  </p>
                  <div className="p-10 bg-oakivo-surface rounded-[40px] border-l-[8px] border-oakivo-primary mb-12">
                    <Lightbulb className="text-oakivo-primary mb-6" size={28} />
                    <p className="text-xl font-serif-display italic text-oakivo-text">"{service.insight}"</p>
                  </div>
                  <Link to={NavRoute.CONTACT}>
                    <Button variant="visa" size="lg" className="px-12">
                      Get Blueprint <ArrowRight size={20} className="ml-2" />
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 bg-oakivo-surface border-t border-oakivo-border text-center">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl md:text-6xl font-serif-display font-bold mb-10 tracking-tight">Need a custom technical roadmap?</h2>
          <p className="text-xl text-oakivo-muted mb-16 max-w-2xl mx-auto font-light leading-relaxed">
            Our architects are ready to audit your current infrastructure and map your journey to institutional agility.
          </p>
          <Link to={NavRoute.CONTACT}>
            <Button variant="visa" size="lg" className="px-16 py-6 text-xl">
              Initiate Strategic Audit
            </Button>
          </Link>
        </div>
      </section>
    </>
  );
};

export default Services;
