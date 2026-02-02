import React from 'react';
import Section from '../components/Section';
import { Factory, ShoppingBag, Briefcase, Truck, Landmark, Zap, ArrowRight, Cog, Globe, Database, Shield } from 'lucide-react';
import Button from '../components/Button';
import { Link } from 'react-router-dom';
import { NavRoute } from '../types';
import { useLanguage, translations } from '../context/LanguageContext';
import SEO from '../components/SEO';

const Verticals: React.FC = () => {
  const { t, language } = useLanguage();
  const cards = translations[language].verticals.cards;
  const icons = [Factory, ShoppingBag, Briefcase, Truck, Landmark, Zap];

  return (
    <>
      <SEO 
        title="Industrial Transformation Canada | Odoo 18 Sector Solutions"
        description="Specialized Odoo ERP and AI solutions for Manufacturing, Logistics, and Retail. Orchestrating digital growth across Canada's key sectors."
        keywords="Manufacturing ERP Canada, Odoo Logistics Automation, Retail AI Solutions, Industry 4.0 Canada"
      />

      {/* Hero */}
      <section className="bg-[#020504] text-white pt-48 pb-24 relative overflow-hidden">
         <div className="absolute inset-0 bg-gradient-to-br from-oakivo-primary via-black to-black opacity-90"></div>
         <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-oakivo-secondary/5 rounded-full blur-[140px] -mr-40 -mt-40"></div>
         <div className="container mx-auto px-6 relative z-10">
            <div className="flex items-center gap-4 mb-8">
               <div className="h-[1px] w-12 bg-oakivo-secondary"></div>
               <span className="text-oakivo-secondary font-black tracking-[0.4em] uppercase text-[10px]">{t('nav.verticals')}</span>
            </div>
            <h1 className="text-6xl md:text-[9rem] font-serif-display font-bold max-w-5xl leading-[0.8] mb-12 tracking-tighter">
              Verticals.
            </h1>
            <p className="text-2xl md:text-4xl text-gray-400 max-w-3xl font-light leading-relaxed">
              Tailored digital strategies engineered for the structural complexities of Canada's most critical sectors.
            </p>
         </div>
      </section>

      {/* Industry Matrix Grid */}
      <section className="bg-white py-32">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {cards.map((card: any, idx: number) => {
              const Icon = icons[idx];
              return (
                <div key={idx} className="group p-14 border border-gray-100 hover:border-oakivo-secondary/30 hover:shadow-vise-lg transition-all duration-700 rounded-[48px] bg-white flex flex-col h-full">
                   <div className="w-16 h-16 rounded-2xl bg-gray-50 flex items-center justify-center text-oakivo-primary mb-12 group-hover:bg-oakivo-secondary group-hover:text-oakivo-primary transition-all duration-500 shadow-sm">
                      <Icon size={32} strokeWidth={1.5} />
                   </div>
                   <h3 className="text-3xl font-bold font-serif-display mb-8 group-hover:text-oakivo-secondary transition-colors tracking-tight leading-none">{card.title}</h3>
                   <p className="text-gray-500 leading-relaxed text-lg font-light mb-12 flex-grow">
                     {card.desc}
                   </p>
                   <Link to={NavRoute.SERVICES} className="inline-flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.3em] text-oakivo-primary group-hover:text-oakivo-secondary transition-all">
                     EXPLORE MATRIX <ArrowRight size={18} className="group-hover:translate-x-3 transition-transform" />
                   </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Closer CTA */}
      <section className="py-32 bg-oakivo-surface border-t border-gray-100 text-center">
        <div className="container mx-auto px-6">
           <h2 className="text-4xl md:text-7xl font-serif-display font-bold text-oakivo-primary mb-10 tracking-tighter">Sector-specific excellence.</h2>
           <p className="text-xl md:text-2xl text-gray-500 mb-16 max-w-2xl mx-auto font-light leading-relaxed">
             Request a technical audit focused on your specific industrial logic and operational bottlenecks.
           </p>
           <Link to={NavRoute.CONTACT}>
              <Button variant="visa" size="lg" className="px-16 py-5 text-xl">
                 {t('common.cta_audit')}
              </Button>
           </Link>
        </div>
      </section>
    </>
  );
};

export default Verticals;
