import React, { useState } from 'react';
import { Anchor, ShoppingBag, Briefcase, Truck, ShieldCheck, Sparkles, ArrowRight, Layers, Database, HardHat, Warehouse } from 'lucide-react';
import { useLanguage, translations } from '../context/LanguageContext';
import SEO from '../components/SEO';
import LeadDrawer from '../components/LeadDrawer';

const IndustryDeepDive: React.FC<{ title: string; desc: string; impact: string; icon: React.ReactNode; onOpenDrawer: () => void }> = ({ title, desc, impact, icon, onOpenDrawer }) => (
  <div className="bg-slate-900/40 backdrop-blur-md rounded-sm p-10 border border-slate-800 hover:bg-slate-900/60 hover:border-cyan-500/30 transition-all duration-500 flex flex-col justify-between h-full group">
    <div>
      <div className="w-14 h-14 rounded-sm bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 mb-6 group-hover:scale-105 transition-transform">
        {icon}
      </div>
      <h3 className="text-2xl font-display font-bold text-slate-100 mb-3 tracking-tight">{title}</h3>
      <p className="text-sm text-slate-400 leading-relaxed font-light mb-6">{desc}</p>
    </div>

    <div className="space-y-6 pt-4 border-t border-slate-800">
      <div className="p-4 bg-slate-800/50 rounded-sm border border-slate-700/50">
        <p className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest font-bold mb-1">Measured Impact</p>
        <p className="text-xs text-slate-300 font-medium leading-relaxed">{impact}</p>
      </div>
      
      <button 
        onClick={onOpenDrawer} 
        className="w-full py-4 rounded-sm bg-slate-800/50 hover:bg-slate-800 text-slate-300 hover:text-white transition-all font-semibold text-xs tracking-wide flex items-center justify-center gap-2 cursor-pointer"
      >
        <span>Discuss Architectural Integration</span> <ArrowRight size={14} />
      </button>
    </div>
  </div>
);

const Verticals: React.FC = () => {
  const { language } = useLanguage();
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
        title="Industries Served | Security Architecture | Oakivo"
        description="Bespoke DevSecOps automation engineered for complex regulatory environments, healthcare networks, and critical supply chains across Atlantic Canada."
        canonical="/industries"
        keywords="DevSecOps Healthcare, Logistics API Security, Retail PCI-DSS, Financial SOC 2, Manufacturing Zero Trust, Atlantic Canada"
      />

      <section className="bg-slate-950 text-slate-100 pt-48 pb-32 relative overflow-hidden border-b border-slate-900/50">
        {/* Cinematic Video Background */}
        <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
          <video autoPlay loop muted playsInline className="w-full h-full object-cover">
            <source src="https://assets.mixkit.co/videos/preview/mixkit-global-world-network-connections-loop-27407-large.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-950/80 to-slate-950"></div>
        </div>
        <div className="container mx-auto px-6 relative z-10 text-center max-w-4xl">
          <div className="inline-flex items-center gap-2 bg-slate-900/50 border border-slate-800 px-4 py-2 rounded-sm mb-8">
            <ShieldCheck size={14} className="text-cyan-400" />
            <span className="text-[10px] font-mono text-cyan-400 font-bold uppercase tracking-widest">
              Atlantic Canada Sector Focus
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-display font-bold tracking-tight mb-6">
            Architected for Complexity
          </h1>
          <p className="text-base md:text-xl text-slate-400 max-w-2xl mx-auto font-light leading-relaxed mb-10">
            We engineer secure, compliant pipelines and zero-trust networks tailored to the exact regulatory demands of your specific industry vertical.
          </p>
          <button
            onClick={() => setIsDrawerOpen(true)}
            className="px-8 py-4 rounded-sm bg-slate-100 hover:bg-white text-slate-950 font-semibold text-xs tracking-wide transition-all inline-flex items-center gap-2"
          >
            Request Industry Briefing
          </button>
        </div>
      </section>

      <section className="bg-slate-950 text-slate-100 py-32 border-b border-slate-900/50">
        <div className="mb-16 text-center max-w-3xl mx-auto space-y-3 px-6">
          <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-cyan-400">
            Operational Blueprint
          </span>
          <h2 className="text-3xl md:text-5xl font-display font-bold">
            Tailored Security by Industry
          </h2>
          <p className="text-sm text-slate-400 font-light max-w-2xl mx-auto">
            Regardless of your legacy infrastructure, we build automated guardrails that connect securely to your existing operational workflows.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto px-6">
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
      </section>

      <section className="py-32 bg-slate-950 relative">
        <div className="container mx-auto px-6">
          <div className="bg-slate-900/40 backdrop-blur-md rounded-sm p-14 border border-slate-800 text-slate-100 max-w-5xl mx-auto text-center space-y-6">
            <span className="text-[10px] font-mono text-cyan-400 font-bold uppercase tracking-widest block">
              Free Security Audit
            </span>
            <h2 className="text-3xl md:text-5xl font-display font-bold">
              Ready to secure your enterprise infrastructure?
            </h2>
            <p className="text-sm md:text-base text-slate-400 font-light max-w-2xl mx-auto">
              We connect your existing cloud environments and software into a single secure pipeline so your engineers can deploy with confidence.
            </p>
            <button
              onClick={() => setIsDrawerOpen(true)}
              className="px-8 py-4 rounded-sm bg-slate-100 hover:bg-white text-slate-950 font-semibold text-xs tracking-wide transition-all inline-flex items-center gap-2 mt-4"
            >
              Book My Architectural Audit
            </button>
          </div>
        </div>
      </section>

      <LeadDrawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />
    </>
  );
};

export default Verticals;
