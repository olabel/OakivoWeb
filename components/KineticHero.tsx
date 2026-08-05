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
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[11px] font-mono-tech font-medium text-gray-300">
                Done-For-You Workflow Automation • Atlantic Canada
              </span>
            </div>

            {/* Kinetic Linear Headline */}
            <h1 className="text-3xl sm:text-5xl xl:text-6xl font-extrabold tracking-linear-tight leading-[1.1] text-linear-heading max-w-4xl">
              Stop Wasting Hours on <span className="text-linear-accent font-semibold">Manual Data Entry</span> and Copy-Pasting Between Systems.
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-[#8A8F98] font-normal max-w-2xl leading-relaxed tracking-linear-normal">
              We connect the software you already use so your team stops wasting hours on manual data entry, copy-pasting between systems, and repetitive admin work. No expensive new software to buy, and zero disruption to your daily operations.
            </p>

            {/* Action CTAs */}
            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              <button
                onClick={() => setIsDrawerOpen(true)}
                className="px-7 py-4 rounded-full bg-white hover:bg-gray-100 text-black font-semibold text-xs tracking-wide transition-all shadow-[0_0_25px_rgba(255,255,255,0.25)] flex items-center gap-2 group cursor-pointer"
              >
                <Sparkles size={15} />
                <span>Book Your Free 15-Minute Operational Audit</span>
                <ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>

            {/* Social Proof & Risk Reversal Bar */}
            <div className="pt-8 border-t border-white/10 w-full text-center">
              <p className="text-xs text-gray-400 font-medium max-w-2xl mx-auto flex items-center justify-center gap-2">
                <ShieldCheck size={16} className="text-emerald-400 shrink-0" />
                <span>No new software to buy. No pushy sales pitch. 100% Atlantic Canada focused.</span>
              </p>
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
