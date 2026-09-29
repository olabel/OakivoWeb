import React, { useState, useEffect, useRef } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowRight, 
  Activity, 
  ChevronDown, 
  ShieldCheck, 
  Truck, 
  Landmark, 
  Zap, 
  ShoppingBag, 
  Building,
  CheckCircle2,
  Sparkles,
  SlidersHorizontal
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { NavRoute } from '../types';
import { 
  detectInferredIndustry, 
  setStoredIndustry, 
  INDUSTRY_HERO_CONTENT, 
  IndustryKey,
  IndustryHeroContent
} from '../utils/industryInference';

const INDUSTRY_ICONS: Record<IndustryKey, React.ComponentType<{ className?: string }>> = {
  default: ShieldCheck,
  logistics: Truck,
  healthcare: Activity,
  fintech: Landmark,
  energy: Zap,
  retail: ShoppingBag,
  public_sector: Building,
};

export const DynamicHero: React.FC = () => {
  const { t, language } = useLanguage();
  const [searchParams] = useSearchParams();
  const [industryKey, setIndustryKey] = useState<IndustryKey>('default');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Sync with URL or inferred storage on mount and when query params change
  useEffect(() => {
    const inferred = detectInferredIndustry();
    setIndustryKey(inferred);
  }, [searchParams]);

  // Ensure video autoplays smoothly across all browser restrictions and remains visible
  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.defaultMuted = true;
      video.muted = true;
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Autoplay policy prevented playback, start on first user interaction
          const playOnInteraction = () => {
            if (videoRef.current) {
              videoRef.current.play().catch(() => {});
            }
            window.removeEventListener('click', playOnInteraction);
            window.removeEventListener('touchstart', playOnInteraction);
            window.removeEventListener('scroll', playOnInteraction);
          };
          window.addEventListener('click', playOnInteraction, { once: true });
          window.addEventListener('touchstart', playOnInteraction, { once: true });
          window.addEventListener('scroll', playOnInteraction, { once: true });
        });
      }
    }
  }, []);

  // Handle outside click to close selector dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelectIndustry = (key: IndustryKey) => {
    setIndustryKey(key);
    setStoredIndustry(key);
    setIsDropdownOpen(false);
  };

  const activeContent: IndustryHeroContent = INDUSTRY_HERO_CONTENT[industryKey] || INDUSTRY_HERO_CONTENT.default;
  const ActiveIcon = INDUSTRY_ICONS[industryKey] || ShieldCheck;
  const isFrench = language === 'fr';

  const triggerAuditWithTailoredScope = () => {
    window.dispatchEvent(new CustomEvent('open-lead-drawer', {
      detail: {
        focus: activeContent.ctaFocus,
        topic: `[Tailored Scope] ${activeContent.name[language]}: ${activeContent.ctaFocus}`,
        industry: activeContent.name[language]
      }
    }));
  };

  const allIndustries: IndustryKey[] = [
    'default',
    'logistics',
    'healthcare',
    'fintech',
    'energy',
    'retail',
    'public_sector'
  ];

  return (
    <header id="hero" role="banner" aria-label="Hero introduction" className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-[#070A0F]">
      {/* Background Video - Cinematic, vivid ambient motion */}
      <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden bg-[#070A0F]" aria-hidden="true">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          aria-hidden="true"
          tabIndex={-1}
          className="absolute inset-0 w-full h-full object-cover opacity-65 md:opacity-75 scale-100 transition-opacity duration-1000"
        >
          <source src="/background-loop.mp4" type="video/mp4" />
        </video>
      </div>
      
      {/* Directional Contrast Scrim - Allows video motion to shine through while keeping text 100% legible */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#070A0F]/85 via-[#070A0F]/55 to-[#070A0F]/20 pointer-events-none" aria-hidden="true" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#070A0F] via-transparent to-transparent pointer-events-none" aria-hidden="true" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-cyan-500/15 via-transparent to-transparent pointer-events-none" aria-hidden="true" />

      <div className="relative z-10 container mx-auto px-6 max-w-5xl pt-32 md:pt-40 pb-20 md:pb-28">
        <div className="flex flex-col items-start text-left">

          {/* Minimalist, authoritative kicker */}
          <div className="flex items-center gap-2.5 text-cyan-400 font-mono text-xs uppercase tracking-widest mb-6">
            <span>{isFrench ? 'ERP MODERNE · AUTOMATISATION · CLOUD · CYBERSÉCURITÉ' : 'MODERN ERP · AUTOMATION · CLOUD · CYBERSECURITY'}</span>
            <span className="text-slate-600" aria-hidden="true">·</span>
            <span className="text-slate-400">{isFrench ? 'SOUVERAINETÉ CANADIENNE · DIEPPE, N.-B.' : 'CANADIAN DATA SOVEREIGNTY • DIEPPE, NB'}</span>
          </div>

          {/* Clean, commanding headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold tracking-tight mb-6 leading-[1.08] text-slate-100 text-balance">
            {t('landing.hero_headline')}
          </h1>

          {/* Minimalist subheadline */}
          <p className="text-lg md:text-xl text-slate-300 max-w-3xl font-light leading-relaxed mb-10 text-balance">
            {t('landing.hero_subheadline')}
          </p>

          {/* Highly Effective Primary & Secondary Call to Actions */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <button 
              type="button"
              id="hero-book-audit-cta"
              onClick={triggerAuditWithTailoredScope} 
              aria-label={isFrench ? "Planifier une session d'automatisation et découverte de 30 minutes" : "Schedule a 30-minute automation and discovery session"}
              className="group inline-flex items-center justify-center px-8 py-4 text-xs font-semibold tracking-widest uppercase text-slate-950 transition-all duration-300 bg-white hover:bg-slate-200 rounded-lg cursor-pointer focus:outline-none focus:ring-2 focus:ring-cyan-400 shadow-xl shadow-white/10 hover:shadow-cyan-500/20"
            >
              <span className="flex items-center gap-3">
                {isFrench ? "Planifier une Session Découverte (30 min)" : "Schedule 30-Min Discovery Session"}
                <ArrowRight aria-hidden="true" className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </button>

            <Link
              to={NavRoute.SERVICES}
              className="inline-flex items-center justify-center px-7 py-4 text-xs font-semibold tracking-widest uppercase text-white bg-slate-900/80 hover:bg-slate-800 border border-slate-700/80 rounded-lg transition-all"
            >
              {isFrench ? "Explorer Nos Solutions" : "Explore Services & Solutions"}
            </Link>
          </div>

          {/* Reassuring trust invariants below the CTA */}
          <div className="flex items-center gap-6 mt-6 text-xs font-mono text-slate-300 flex-wrap">
            <span className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
              <span>{isFrench ? "Accès direct aux fondateurs" : "Direct founder & senior review"}</span>
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
              <span>{isFrench ? "100% Bilingue (FR/EN) • Heure de l'Atlantique" : "100% Bilingual (EN/FR) • AST"}</span>
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
              <span>{isFrench ? "Surveillance de sécurité continue 24/7" : "Continuous 24/7 security & Zero Trust"}</span>
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
              <span>{isFrench ? "Conformité LPRPDE & Données Canadiennes" : "PIPEDA & Canadian sovereign data"}</span>
            </span>
          </div>

        </div>
      </div>
    </header>
  );
};

export default DynamicHero;
