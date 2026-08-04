import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Sparkles, ArrowRight, ShieldCheck, TrendingUp 
} from 'lucide-react';
import HeroCanvas from './HeroCanvas';
import LeadDrawer from './LeadDrawer';
import { useLanguage } from '../context/LanguageContext';

const KineticHero: React.FC = () => {
  const { language } = useLanguage();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const scrollToROI = () => {
    const el = document.getElementById('roi-engine-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-[85vh] flex flex-col justify-between pt-16 pb-20 overflow-hidden bg-[#070A0F]">
      {/* Interactive WebGL/Canvas background */}
      <HeroCanvas />

      {/* Radial Gradient Ambient Overlay */}
      <div className="absolute inset-0 bg-radial-gradient from-transparent via-[#070A0F]/60 to-[#070A0F] pointer-events-none z-0" />

      <div className="container mx-auto px-4 md:px-6 relative z-10 my-auto">
        <div className="max-w-4xl mx-auto text-center">
          
          {/* Kinetic Hero Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-8 flex flex-col items-center"
          >
            {/* Animated Status Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full linear-pill backdrop-blur-md">
              <div className="w-2 h-2 rounded-full bg-oakivo-linearIndigo animate-pulse" />
              <span className="text-[11px] font-mono-tech font-medium text-gray-300">
                {language === 'en' ? 'Odoo 19 & Agentic AI Sovereign Hub' : 'Hub Odoo 19 & IA Souveraine'}
              </span>
              <span className="text-gray-600 font-mono-tech">•</span>
              <span className="text-[10px] font-mono-tech text-emerald-400 font-medium uppercase tracking-wider flex items-center gap-1">
                <ShieldCheck size={11} /> PIPEDA & SOC2
              </span>
            </div>

            {/* Kinetic Linear Headline */}
            <h1 className="text-4xl sm:text-6xl xl:text-7xl font-extrabold tracking-linear-tight leading-[1.06] text-linear-heading max-w-3xl">
              Architecting <br />
              <span className="text-linear-accent font-semibold">resilient digital cores.</span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-[#8A8F98] font-normal max-w-2xl leading-relaxed tracking-linear-normal">
              Oakivo Solutions Inc. orchestrates the operational complexity of Odoo 19 and Agentic AI. We de-risk Canadian industrial growth through sovereign, Zero-Trust digital transformation.
            </p>

            {/* Action CTAs */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <button
                onClick={() => setIsDrawerOpen(true)}
                className="px-6 py-3.5 rounded-full bg-white hover:bg-gray-100 text-black font-semibold text-xs tracking-wide transition-all shadow-[0_0_25px_rgba(255,255,255,0.25)] flex items-center gap-2 group"
              >
                <Sparkles size={15} />
                <span>{language === 'en' ? 'Initialize Technical Discovery' : 'Initialiser la Découverte'}</span>
                <ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform" />
              </button>

              <button
                onClick={scrollToROI}
                className="px-6 py-3.5 rounded-full linear-pill text-gray-200 hover:text-white hover:border-white/20 transition-all text-xs font-medium flex items-center gap-2"
              >
                <TrendingUp size={15} className="text-oakivo-linearIndigo" />
                <span>{language === 'en' ? 'Calculate ROI & Diagnostic' : 'Calculer le ROI'}</span>
              </button>
            </div>

            {/* Micro Trust Indicators */}
            <div className="pt-8 border-t border-white/10 w-full grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-mono-tech text-center">
              <div>
                <span className="text-gray-500 block uppercase text-[9px] tracking-widest">Official Status</span>
                <span className="font-bold text-white">Odoo 19 Silver Partner</span>
              </div>
              <div>
                <span className="text-gray-500 block uppercase text-[9px] tracking-widest">Compliance</span>
                <span className="font-bold text-oakivo-accent">PIPEDA & Law 25</span>
              </div>
              <div>
                <span className="text-gray-500 block uppercase text-[9px] tracking-widest">Accounting</span>
                <span className="font-bold text-white">CRA GST/HST Localized</span>
              </div>
              <div>
                <span className="text-gray-500 block uppercase text-[9px] tracking-widest">Hub Locations</span>
                <span className="font-bold text-gray-300">Dieppe • Mtl • YYZ</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Floating Lead Drawer */}
      <LeadDrawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />
    </section>
  );
};

export default KineticHero;
