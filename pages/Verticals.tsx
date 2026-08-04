import React from 'react';
import { Factory, ShoppingBag, Briefcase, Truck, Landmark, Zap, ArrowRight, Cog, ShieldCheck, Activity, BarChart3, Database } from 'lucide-react';
import Button from '../components/Button';
import { Link } from 'react-router-dom';
import { NavRoute } from '../types';
import { useLanguage, translations } from '../context/LanguageContext';
import SEO from '../components/SEO';
import Section from '../components/Section';

const IndustryDeepDive: React.FC<{ title: string; impact: string; icon: React.ReactNode }> = ({ title, impact, icon }) => (
  <div className="p-8 md:p-12 bg-white border border-gray-100 rounded-[48px] hover:border-oakivo-secondary/30 transition-all group shadow-sm hover:shadow-vise-xl">
    <div className="w-16 h-16 rounded-2xl bg-oakivo-surface flex items-center justify-center text-oakivo-primary mb-8 group-hover:bg-oakivo-secondary transition-all">
      {icon}
    </div>
    <h3 className="text-3xl font-serif-display font-bold text-oakivo-primary mb-6 tracking-tight leading-none">{title}</h3>
    <div className="space-y-6">
      <p className="text-gray-500 font-light leading-relaxed text-lg italic">
        "How do we de-risk this sector?"
      </p>
      <div className="p-6 bg-oakivo-primary/5 rounded-3xl border-l-4 border-oakivo-secondary">
        <p className="text-sm font-bold text-oakivo-primary uppercase tracking-widest mb-2">Operational Impact</p>
        <p className="text-gray-700 font-medium leading-relaxed">{impact}</p>
      </div>
      <Link to={NavRoute.SERVICES} className="inline-flex items-center gap-4 text-[10px] font-black uppercase tracking-widest text-oakivo-primary hover:text-oakivo-secondary transition-all pt-4">
        EXPLORE ARCHITECTURE <ArrowRight size={18} />
      </Link>
    </div>
  </div>
);

const Verticals: React.FC = () => {
  const { t, language } = useLanguage();
  const vData = translations[language].verticals;
  const icons = [
    <Factory size={32} strokeWidth={1.5} />,
    <Truck size={32} strokeWidth={1.5} />,
    <Briefcase size={32} strokeWidth={1.5} />,
    <Landmark size={32} strokeWidth={1.5} />,
    <Zap size={32} strokeWidth={1.5} />,
    <Landmark size={32} strokeWidth={1.5} />
  ];

  return (
    <>
      <SEO 
        title="Industries | Odoo 19 Sector Solutions"
        description="Specialized Odoo ERP and AI solutions for Manufacturing, Logistics, and Retail in Canada."
      />

      <section className="bg-oakivo-primary text-white pt-48 pb-32 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
          <Database className="w-full h-full" />
        </div>
         <div className="container mx-auto px-6 relative z-10">
            <div className="inline-flex items-center gap-3 bg-white/5 border border-white/10 px-6 py-2 rounded-full backdrop-blur-md mb-10">
               <ShieldCheck size={14} className="text-oakivo-secondary" />
               <span className="text-[10px] font-bold text-white uppercase tracking-[0.4em]">Sector Integrity</span>
            </div>
            <h1 className="text-6xl md:text-[8rem] font-serif-display font-bold leading-[0.85] mb-12 tracking-tighter">
              {vData.hero_title}
            </h1>
            <p className="text-2xl md:text-3xl text-gray-400 max-w-3xl font-light leading-relaxed">
              {vData.hero_subtitle}
            </p>
         </div>
      </section>

      <Section className="bg-white py-40">
        <div className="mb-24 flex flex-col md:flex-row md:items-end justify-between gap-12">
           <div className="max-w-3xl">
              <span className="text-[10px] font-mono-tech text-oakivo-primary uppercase tracking-[0.4em] mb-4 block">The Industrial Matrix</span>
              <h2 className="text-5xl md:text-7xl font-serif-display font-bold text-oakivo-primary tracking-tighter leading-none">
                Specific logic for <br/> specific growth.
              </h2>
           </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {vData.cards.map((card: any, idx: number) => (
            <IndustryDeepDive 
              key={idx} 
              title={card.title} 
              impact={card.impact} 
              icon={icons[idx] || <Cog size={32} />} 
            />
          ))}
        </div>
      </Section>

      <section className="py-40 bg-oakivo-surface overflow-hidden">
        <div className="container mx-auto px-6">
           <div className="bg-oakivo-primary rounded-[60px] p-12 md:p-24 text-white relative group">
              <div className="absolute inset-0 opacity-10 pointer-events-none">
                <Activity size={400} className="absolute -right-20 -bottom-20 rotate-12" />
              </div>
              <div className="max-w-4xl relative z-10">
                 <h2 className="text-4xl md:text-7xl font-serif-display font-bold mb-10 tracking-tighter leading-tight">De-risk your digital <br/> infrastructure.</h2>
                 <p className="text-xl text-gray-400 font-light mb-12 leading-relaxed max-w-2xl">
                    Every industry has unique data residency and operational constraints. We architect the bridge between legacy debt and sovereign automation.
                 </p>
                 <Link to={NavRoute.CONTACT}>
                    <Button variant="white" size="lg" className="px-16 py-6 shadow-premium !bg-oakivo-secondary !text-black border-none font-black text-xl hover:scale-105 transition-transform">
                       INITIATE TECHNICAL INTAKE
                    </Button>
                 </Link>
              </div>
           </div>
        </div>
      </section>
    </>
  );
};

export default Verticals;