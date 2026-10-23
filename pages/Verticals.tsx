import React, { useState } from 'react';
import { Anchor, ShoppingBag, Briefcase, Truck, ShieldCheck, Sparkles, ArrowRight, Layers, Database, HardHat, Warehouse } from 'lucide-react';
import { useLanguage, translations } from '../context/LanguageContext';
import SEO from '../components/SEO';
import LeadDrawer from '../components/LeadDrawer';

const IndustryDeepDive: React.FC<{ title: string; desc: string; impact: string; icon: React.ReactNode; isFr: boolean; onOpenDrawer: () => void }> = ({ title, desc, impact, icon, isFr, onOpenDrawer }) => (
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
        <p className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest font-bold mb-1">
          {isFr ? "Impact Mesuré" : "Measured Impact"}
        </p>
        <p className="text-xs text-slate-300 font-medium leading-relaxed">{impact}</p>
      </div>
      
      <button 
        onClick={onOpenDrawer} 
        className="w-full py-4 rounded-sm bg-slate-800/50 hover:bg-slate-800 text-slate-300 hover:text-white transition-all font-semibold text-xs tracking-wide flex items-center justify-center gap-2 cursor-pointer"
      >
        <span>{isFr ? "Discuter d'Intégration d'Architecture" : "Discuss Architectural Integration"}</span> <ArrowRight size={14} />
      </button>
    </div>
  </div>
);

const Verticals: React.FC = () => {
  const { language } = useLanguage();
  const isFr = language === 'fr';
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
        title={isFr ? "Secteurs Industriels DevSecOps & Infonuagique | Oakivo Canada atlantique" : "Cloud Security & DevSecOps Industries | Oakivo Atlantic Canada"}
        description={isFr
          ? "DevSecOps et sécurité infonuagique sur mesure, conçus pour les exigences réglementaires et l'automatisation des processus des industries clés du Canada atlantique."
          : "Bespoke DevSecOps and cloud security engineered for complex regulatory compliance environments and process automation across critical Atlantic Canada industries."}
        canonical="/verticals"
      />

      <section className="bg-[#000000] text-[#f7faf9] pt-32 pb-24 relative overflow-hidden border-b border-[#1e2d27]/70">
        {/* Soft Ambient Depth */}
        <div className="absolute inset-0 z-0 pointer-events-none select-none">
          <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[900px] h-[350px] bg-gradient-to-b from-[#0f5e4a]/20 via-transparent to-transparent blur-[120px]" />
        </div>
        <div className="container mx-auto px-6 relative z-10 text-center max-w-4xl">
          <span className="nova-eyebrow text-[#23c694] mb-4">
            {isFr ? "Focus Sectoriel Canada Atlantique" : "Atlantic Canada Sector Focus"}
          </span>
          <h1 className="text-4xl md:text-6xl font-display font-light text-white tracking-[-0.035em] mb-6">
            {isFr ? "Conçu pour la Complexité" : "Architected for Complexity"}
          </h1>
          <p className="text-base md:text-xl text-[#a8b0ad] max-w-2xl mx-auto font-light leading-relaxed mb-10">
            {isFr 
              ? "Nous concevons des pipelines sécurisés et conformes, ainsi que des réseaux Zéro Confiance adaptés aux impératifs réglementaires stricts de votre secteur."
              : "We engineer secure, compliant pipelines and zero-trust networks tailored to the exact regulatory demands of your specific industry vertical."}
          </p>
          <button
            onClick={() => setIsDrawerOpen(true)}
            className="nova-outline-btn cursor-pointer py-3.5 px-7"
          >
            <span>{isFr ? "Prendre Rendez-vous" : "Book Consultation"}</span>
            <ArrowRight size={14} className="text-[#23c694]" />
          </button>
        </div>
      </section>

      <section className="bg-slate-950 text-slate-100 py-24 border-b border-slate-900/50">
        <div className="mb-16 text-center max-w-3xl mx-auto space-y-3 px-6">
          <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-cyan-400">
            {isFr ? "Plan Opérationnel" : "Operational Blueprint"}
          </span>
          <h2 className="text-3xl md:text-5xl font-display font-bold">
            {isFr ? "Sécurité Sur Mesure par Industrie" : "Tailored Security by Industry"}
          </h2>
          <p className="text-sm text-slate-400 font-light max-w-2xl mx-auto">
            {isFr
              ? "Peu importe votre infrastructure existante, nous construisons des garde-fous automatisés qui se connectent de manière sécurisée à vos flux opérationnels."
              : "Regardless of your legacy infrastructure, we build automated guardrails that connect securely to your existing operational workflows."}
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
              isFr={isFr}
              onOpenDrawer={() => setIsDrawerOpen(true)}
            />
          ))}
        </div>
      </section>

      <section className="py-24 bg-slate-950 relative">
        <div className="container mx-auto px-6">
          <div className="bg-slate-900/40 backdrop-blur-md rounded-sm p-14 border border-slate-800 text-slate-100 max-w-5xl mx-auto text-center space-y-6">
            <span className="text-[10px] font-mono text-cyan-400 font-bold uppercase tracking-widest block">
              {isFr ? "Audit de Sécurité Gratuit" : "Free Security Audit"}
            </span>
            <h2 className="text-3xl md:text-5xl font-display font-bold">
              {isFr ? "Prêt à sécuriser votre infrastructure d'entreprise ?" : "Ready to secure your enterprise infrastructure?"}
            </h2>
            <p className="text-sm md:text-base text-slate-400 font-light max-w-2xl mx-auto">
              {isFr
                ? "Nous interconnectons vos environnements infonuagiques et logiciels actuels dans un pipeline sécurisé unique pour permettre à vos ingénieurs de déployer en toute sérénité."
                : "We connect your existing cloud environments and software into a single secure pipeline so your engineers can deploy with confidence."}
            </p>
            <button
              onClick={() => setIsDrawerOpen(true)}
              className="px-8 py-4 rounded-sm bg-slate-100 hover:bg-white text-slate-950 font-semibold text-xs tracking-wide transition-all inline-flex items-center gap-2 mt-4 cursor-pointer"
            >
              {isFr ? "Réserver Mon Audit d'Architecture" : "Book My Architectural Audit"}
            </button>
          </div>
        </div>
      </section>

      <LeadDrawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />
    </>
  );
};

export default Verticals;
