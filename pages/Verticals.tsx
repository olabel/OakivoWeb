import React, { useState } from 'react';
import { Anchor, ShoppingBag, Briefcase, Truck, ShieldCheck, Sparkles, ArrowRight, Layers, Database, HardHat, Warehouse } from 'lucide-react';
import { Link } from 'react-router-dom';
import { NavRoute } from '../types';
import { useLanguage, translations } from '../context/LanguageContext';
import SEO from '../components/SEO';
import Section from '../components/Section';
import LeadDrawer from '../components/LeadDrawer';

const IndustryDeepDive: React.FC<{ title: string; desc: string; impact: string; icon: React.ReactNode; onOpenDrawer: () => void }> = ({ title, desc, impact, icon, onOpenDrawer }) => (
  <div className="linear-card rounded-3xl p-8 border border-white/[0.08] hover:border-emerald-500/30 transition-all group flex flex-col justify-between">
    <div>
      <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-6 group-hover:scale-105 transition-transform">
        {icon}
      </div>
      <h3 className="text-2xl font-bold text-white mb-3 tracking-tight">{title}</h3>
      <p className="text-sm text-gray-400 leading-relaxed font-light mb-6">{desc}</p>
    </div>

    <div className="space-y-6 pt-4 border-t border-white/5">
      <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
        <p className="text-[10px] font-mono-tech text-emerald-400 uppercase tracking-widest font-bold mb-1">Measured Impact</p>
        <p className="text-xs text-gray-300 font-medium leading-relaxed">{impact}</p>
      </div>
      
      <button 
        onClick={onOpenDrawer} 
        className="w-full py-3 rounded-full bg-white/5 hover:bg-white text-gray-300 hover:text-black transition-all font-semibold text-xs tracking-wide flex items-center justify-center gap-2 cursor-pointer"
      >
        <span>Discuss Workflow Integration</span> <ArrowRight size={14} />
      </button>
    </div>
  </div>
);

const Verticals: React.FC = () => {
  const { t, language } = useLanguage();
  const vData = translations[language].verticals;
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const icons = [
    <Anchor size={28} />,
    <Warehouse size={28} />,
    <Truck size={28} />,
    <HardHat size={28} />,
    <ShoppingBag size={28} />,
    <Briefcase size={28} />
  ];

  return (
    <>
      <SEO 
        title="Industries Served | Done-For-You Automation in Atlantic Canada"
        description="Done-for-you business workflow automation tailored to Seafood, Wholesale, Transport, Construction, Retail, and Professional Services in Atlantic Canada."
        canonical="/verticals"
      />

      <section className="bg-[#070A0F] text-white pt-40 pb-20 relative overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-emerald-500/5 rounded-full blur-[140px] pointer-events-none" />

        <div className="container mx-auto px-4 md:px-6 relative z-10 text-center max-w-4xl">
          <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-full mb-8">
            <ShieldCheck size={14} className="text-emerald-400" />
            <span className="text-[10px] font-mono-tech text-emerald-400 font-bold uppercase tracking-widest">
              Atlantic Canada Sector Focus
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-linear-heading mb-6">
            {vData.hero_title}
          </h1>
          <p className="text-base md:text-xl text-[#8A8F98] max-w-2xl mx-auto font-normal leading-relaxed mb-10">
            {vData.hero_subtitle}
          </p>

          <button
            onClick={() => setIsDrawerOpen(true)}
            className="px-8 py-4 rounded-full bg-white hover:bg-gray-100 text-black font-semibold text-xs tracking-wide shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:scale-105 transition-all inline-flex items-center gap-2"
          >
            <Sparkles size={16} /> Book My Free 15-Minute Audit
          </button>
        </div>
      </section>

      <Section className="bg-[#0B0F17] text-white py-24 border-t border-white/10">
        <div className="mb-16 text-center max-w-3xl mx-auto space-y-3">
          <span className="text-[10px] font-mono-tech font-bold uppercase tracking-widest text-emerald-400">
            Operational Blueprint
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-linear-heading">
            Tailored Automation by Industry
          </h2>
          <p className="text-sm text-[#8A8F98] font-normal">
            No matter what software tools your business uses, we connect them into a single automated workflow so your team stops re-typing data.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {vData.cards.map((card: any, idx: number) => (
            <IndustryDeepDive 
              key={idx} 
              title={card.title} 
              desc={card.desc}
              impact={card.impact} 
              icon={icons[idx] || <Layers size={28} />} 
              onOpenDrawer={() => setIsDrawerOpen(true)}
            />
          ))}
        </div>
      </Section>

      <section className="py-20 bg-[#070A0F] border-t border-white/10">
        <div className="container mx-auto px-4 md:px-6">
          <div className="linear-card rounded-3xl p-8 md:p-14 border border-white/10 text-white max-w-5xl mx-auto text-center space-y-6">
            <span className="text-[10px] font-mono-tech text-emerald-400 font-bold uppercase tracking-widest block">
              Free Operational Audit
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-linear-heading">
              Ready to eliminate manual data entry in your business?
            </h2>
            <p className="text-sm md:text-base text-gray-400 font-light max-w-2xl mx-auto">
              We connect your existing accounting, inventory, and operational software so your staff reclaims 10 to 20 payroll hours every single week.
            </p>
            <button
              onClick={() => setIsDrawerOpen(true)}
              className="px-8 py-4 rounded-full bg-white hover:bg-gray-100 text-black font-semibold text-xs tracking-wide shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:scale-105 transition-all inline-flex items-center gap-2"
            >
              <Sparkles size={16} /> Book My Free 15-Minute Operational Audit
            </button>
          </div>
        </div>
      </section>

      <LeadDrawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />
    </>
  );
};

export default Verticals;
