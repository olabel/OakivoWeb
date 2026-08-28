import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Sparkles, ArrowRight, ShieldCheck, ShieldAlert, Cpu, Terminal, 
  Layers, Lock, Play, RefreshCw, CheckCircle2, ChevronDown
} from 'lucide-react';
import HeroCanvas from './HeroCanvas';
import LeadDrawer from './LeadDrawer';
import { useLanguage } from '../context/LanguageContext';

const KineticHero: React.FC = () => {
  const { t } = useLanguage();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [showVideoConcept, setShowVideoConcept] = useState(false);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-[90vh] flex flex-col justify-between pt-16 pb-20 overflow-hidden bg-[#070A0F]">
      {/* Interactive DevSecOps WebGL/Canvas Living Infrastructure Mesh */}
      <HeroCanvas />

      {/* Radial Gradient Ambient Overlay with deep dark vignette */}
      <div className="absolute inset-0 bg-radial-gradient from-transparent via-[#070A0F]/65 to-[#070A0F] pointer-events-none z-0" />

      <div className="container mx-auto px-4 md:px-6 relative z-10 my-auto">
        <div className="max-w-4xl mx-auto text-center">
          
          {/* Kinetic Hero Content */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-7 flex flex-col items-center"
          >
            {/* Animated Status Pill */}
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full linear-pill backdrop-blur-md border border-emerald-500/30 bg-black/60 shadow-[0_0_20px_rgba(16,185,129,0.15)]">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#10B981]" />
              <span className="text-xs font-mono-tech font-semibold text-emerald-300 tracking-wide">
                {t('hero.badge')}
              </span>
            </div>

            {/* Kinetic H1 Headline (Max 7 words, punchy & benefit-driven) */}
            <h1 className="text-4xl sm:text-6xl xl:text-7xl font-extrabold tracking-linear-tight leading-[1.05] text-white max-w-4xl">
              {t('hero.headline_main')}{' '}
              <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent drop-shadow-[0_0_35px_rgba(16,185,129,0.35)]">
                {t('hero.headline_accent')}
              </span>
            </h1>

            {/* Subheadline (Plain-English, direct business benefit for Atlantic Canada) */}
            <p className="text-base sm:text-xl text-[#94A3B8] font-normal max-w-3xl leading-relaxed tracking-linear-normal">
              {t('hero.subtitle')}
            </p>

            {/* Action CTAs: Primary + Secondary */}
            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              <button
                type="button"
                onClick={() => setIsDrawerOpen(true)}
                className="px-8 py-4 rounded-full bg-white hover:bg-gray-100 text-black font-extrabold text-xs sm:text-sm tracking-wide transition-all shadow-[0_0_30px_rgba(255,255,255,0.3)] hover:scale-[1.02] flex items-center gap-2.5 group cursor-pointer"
              >
                <Sparkles size={16} className="text-black" />
                <span>{t('hero.cta')}</span>
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                type="button"
                onClick={() => scrollToSection('arsenal-section')}
                className="px-6 py-4 rounded-full bg-white/5 hover:bg-white/10 text-white font-semibold text-xs sm:text-sm tracking-wide border border-white/15 transition-all flex items-center gap-2 cursor-pointer backdrop-blur-sm hover:border-emerald-500/40"
              >
                <Terminal size={15} className="text-cyan-400" />
                <span>{t('hero.secondary_cta')}</span>
                <ChevronDown size={15} className="text-gray-400" />
              </button>
            </div>

            {/* Video Concept & Telemetry Callout Modal Trigger */}
            <div className="pt-2">
              <button
                type="button"
                onClick={() => setShowVideoConcept(!showVideoConcept)}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-mono-tech text-gray-400 hover:text-emerald-300 bg-white/5 hover:bg-white/10 border border-white/10 transition-colors cursor-pointer"
              >
                <Play size={10} className="text-emerald-400 fill-emerald-400" />
                <span>{t('hero.video_tag')}: Interactive Mesh Active</span>
              </button>
            </div>

            {/* Expandable Video Concept Blueprint (Design Inspiration) */}
            {showVideoConcept && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="w-full max-w-2xl text-left bg-black/80 border border-emerald-500/30 rounded-2xl p-5 backdrop-blur-xl shadow-2xl space-y-3 font-mono-tech text-xs"
              >
                <div className="flex items-center justify-between border-b border-white/10 pb-2">
                  <div className="flex items-center gap-2 text-emerald-400 font-bold">
                    <Cpu size={14} />
                    <span>LIVING INFRASTRUCTURE MESH  -  VIDEO ARCHITECTURE</span>
                  </div>
                  <span className="text-[10px] text-gray-500">60 FPS REAL-TIME</span>
                </div>
                <p className="text-gray-300 font-sans text-xs leading-relaxed">
                  Depicting a 3D architectural node graph of an Atlantic enterprise hybrid cloud (AWS/Azure sovereign regions + on-premise ERP/Kubernetes clusters). Glowing telemetry pulses travel along interconnected pipelines; automated guardrails execute instant, microsecond geometric self-healing animations without cliché hacker tropes.
                </p>
                <div className="grid grid-cols-3 gap-2 text-[10px]">
                  <div className="p-2 rounded bg-white/5 border border-white/10">
                    <span className="text-emerald-400 block font-bold">NODE GRAPH</span>
                    <span className="text-gray-400">Zero-Trust Verified</span>
                  </div>
                  <div className="p-2 rounded bg-white/5 border border-white/10">
                    <span className="text-cyan-400 block font-bold">LATENCY</span>
                    <span className="text-gray-400">&lt; 1ms Guardrail</span>
                  </div>
                  <div className="p-2 rounded bg-white/5 border border-white/10">
                    <span className="text-amber-400 block font-bold">AUTO-HEAL</span>
                    <span className="text-gray-400">Deterministic SRE</span>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Localized Authority Wedge & Trust Bar */}
            <div className="pt-6 border-t border-white/10 w-full text-center">
              <p className="text-xs text-gray-400 font-medium max-w-3xl mx-auto flex flex-wrap items-center justify-center gap-2 sm:gap-3">
                <span className="inline-flex items-center gap-1.5 text-emerald-400 font-bold">
                  <CheckCircle2 size={15} /> 100% Bilingual (EN/FR)
                </span>
                <span className="text-gray-600">•</span>
                <span className="inline-flex items-center gap-1.5 text-gray-300">
                  <Lock size={14} className="text-cyan-400" /> Dieppe, New Brunswick Headquarters
                </span>
                <span className="text-gray-600">•</span>
                <span className="inline-flex items-center gap-1.5 text-emerald-400">
                  <ShieldCheck size={15} /> Zero Daily Pipeline Disruption
                </span>
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
