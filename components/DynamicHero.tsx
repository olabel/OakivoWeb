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

  // Sync with URL or inferred storage on mount and when query params change
  useEffect(() => {
    const inferred = detectInferredIndustry();
    setIndustryKey(inferred);
  }, [searchParams]);

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
      {/* Background Video - Calm, cinematic opacity to prevent visual clutter */}
      <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden bg-[#070A0F]" aria-hidden="true">
        <video
          autoPlay
          loop
          muted
          playsInline
          aria-hidden="true"
          tabIndex={-1}
          className="absolute inset-0 w-full h-full object-cover opacity-20 scale-100"
        >
          <source src="/background-loop.mp4" type="video/mp4" />
        </video>
      </div>
      
      {/* Darkening & Soft Vignette Overlays */}
      <div className="absolute inset-0 bg-[#070A0F]/80 mix-blend-multiply" aria-hidden="true"></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-transparent via-[#070A0F]/80 to-[#070A0F]" aria-hidden="true"></div>

      <div className="relative z-10 container mx-auto px-6 max-w-5xl pt-32 md:pt-40 pb-20 md:pb-28">
        <div className="flex flex-col items-start text-left">

          {/* Minimalist, authoritative kicker */}
          <div className="flex items-center gap-2.5 text-cyan-400 font-mono text-xs uppercase tracking-widest mb-6">
            <span>DEVSECOPS & CLOUD ARCHITECTURE</span>
            <span className="text-slate-600" aria-hidden="true">·</span>
            <span className="text-slate-400">ATLANTIC CANADA & DIEPPE, NB</span>
          </div>

          {/* Clean, commanding headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold tracking-tight mb-6 leading-[1.08] text-slate-100 text-balance">
            {isFrench ? t('landing.hero_headline') : t('landing.hero_headline')}
          </h1>

          {/* Minimalist subheadline */}
          <p className="text-lg md:text-xl text-slate-300 max-w-3xl font-light leading-relaxed mb-10 text-balance">
            {t('landing.hero_subheadline')}
          </p>

          {/* Single, Highly Effective Call to Action */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <button 
              type="button"
              id="hero-book-audit-cta"
              onClick={triggerAuditWithTailoredScope} 
              aria-label={isFrench ? "Demander un audit d'architecture de sécurité de 30 minutes" : "Book a 30-minute security architecture audit"}
              className="group inline-flex items-center justify-center px-8 py-4 text-xs font-semibold tracking-widest uppercase text-slate-950 transition-all duration-300 bg-white hover:bg-slate-200 rounded-lg cursor-pointer focus:outline-none focus:ring-2 focus:ring-cyan-400 shadow-xl shadow-white/10 hover:shadow-cyan-500/20"
            >
              <span className="flex items-center gap-3">
                {isFrench ? "Demander un Audit de Sécurité (30 Min)" : "Request 30-Minute Security Architecture Audit"}
                <ArrowRight aria-hidden="true" className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </button>
          </div>

          {/* Reassuring trust invariants below the CTA */}
          <div className="flex items-center gap-6 mt-6 text-xs font-mono text-slate-400 flex-wrap">
            <span className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
              <span>{isFrench ? "Sans démarche commerciale" : "Zero sales pitch"}</span>
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
              <span>{isFrench ? "100% Confidentiel" : "100% confidential"}</span>
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
              <span>{isFrench ? "Architecte DevSecOps senior direct" : "Direct senior architect review"}</span>
            </span>
          </div>

        </div>
      </div>
    </header>
  );
};

export default DynamicHero;
