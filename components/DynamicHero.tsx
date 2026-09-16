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
    <header id="hero" role="banner" aria-label="Hero introduction" className="relative min-h-[92vh] flex items-center justify-center overflow-hidden bg-[#070A0F]">
      {/* Background Video */}
      <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden bg-[#070A0F]" aria-hidden="true">
        <video
          autoPlay
          loop
          muted
          playsInline
          aria-hidden="true"
          tabIndex={-1}
          className="absolute inset-0 w-full h-full object-cover opacity-50 scale-105"
        >
          <source src="/background-loop.mp4" type="video/mp4" />
        </video>
      </div>
      
      {/* Premium Darkening Overlay */}
      <div className="absolute inset-0 bg-slate-950/40 mix-blend-multiply" aria-hidden="true"></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-transparent via-[#070A0F]/60 to-[#070A0F]" aria-hidden="true"></div>
      
      {/* Subtle grid accent */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b0a_1px,transparent_1px),linear-gradient(to_bottom,#1e293b0a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="relative z-10 container mx-auto px-6 max-w-7xl pt-32 pb-20">
        <div className="flex flex-col items-start text-left max-w-4xl">

          {/* Dynamic Industry Badge & Interactive Segment Switcher */}
          <div className="relative mb-6" ref={dropdownRef}>
            <div className="inline-flex items-center gap-2 flex-wrap">
              <button
                type="button"
                id="industry-variation-selector"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                aria-expanded={isDropdownOpen}
                aria-haspopup="listbox"
                className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-slate-700/80 hover:border-cyan-500/60 transition-all duration-200 text-xs font-medium text-slate-200 shadow-sm backdrop-blur-md cursor-pointer group focus:outline-none focus:ring-2 focus:ring-cyan-400"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
                </span>
                
                <ActiveIcon className="w-3.5 h-3.5 text-cyan-400 group-hover:scale-110 transition-transform" />
                
                <span className="text-slate-400 font-mono text-[11px] uppercase tracking-wider">
                  {isFrench ? 'Secteur Détecté :' : 'Inferred Sector:'}
                </span>

                <span className="text-cyan-300 font-semibold">
                  {activeContent.name[language]}
                </span>

                <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180 text-cyan-400' : ''}`} />
              </button>

              {industryKey !== 'default' && (
                <button
                  type="button"
                  onClick={() => handleSelectIndustry('default')}
                  className="text-[11px] text-slate-400 hover:text-slate-200 underline decoration-slate-600 transition-colors cursor-pointer"
                  title={isFrench ? 'Réinitialiser au secteur standard' : 'Reset to default enterprise view'}
                >
                  {isFrench ? 'Réinitialiser' : 'Reset view'}
                </button>
              )}
            </div>

            {/* Dropdown Menu for Custom Sector Preview */}
            <AnimatePresence>
              {isDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -6, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -6, scale: 0.98 }}
                  transition={{ duration: 0.15 }}
                  className="absolute left-0 top-full mt-2 w-72 md:w-80 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl p-2 z-50 backdrop-blur-xl"
                  role="listbox"
                >
                  <div className="px-3 py-2 text-[11px] font-mono uppercase tracking-wider text-slate-400 border-b border-slate-800 flex items-center justify-between">
                    <span>{isFrench ? 'Personnaliser l’Industrie' : 'Switch Industry Perspective'}</span>
                    <SlidersHorizontal className="w-3 h-3 text-cyan-400" />
                  </div>

                  <div className="mt-1 space-y-0.5 max-h-72 overflow-y-auto pr-1">
                    {allIndustries.map((key) => {
                      const item = INDUSTRY_HERO_CONTENT[key];
                      const IconComponent = INDUSTRY_ICONS[key];
                      const isSelected = industryKey === key;

                      return (
                        <button
                          key={key}
                          type="button"
                          role="option"
                          aria-selected={isSelected}
                          onClick={() => handleSelectIndustry(key)}
                          className={`w-full text-left px-3 py-2.5 rounded-lg flex items-center justify-between transition-colors cursor-pointer ${
                            isSelected 
                              ? 'bg-cyan-950/70 border border-cyan-500/40 text-cyan-200' 
                              : 'hover:bg-slate-800/80 text-slate-300 hover:text-white'
                          }`}
                        >
                          <div className="flex items-center gap-2.5">
                            <IconComponent className={`w-4 h-4 ${isSelected ? 'text-cyan-400' : 'text-slate-400'}`} />
                            <div>
                              <div className="text-xs font-medium leading-snug">{item.name[language]}</div>
                              <div className="text-[10px] text-slate-400 font-mono line-clamp-1">{item.targetFrameworks.slice(0, 2).join(' • ')}</div>
                            </div>
                          </div>
                          {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />}
                        </button>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Dynamic Headline with Smooth Transition */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`${industryKey}-${language}-headline`}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className="w-full"
            >
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[5.25rem] font-display font-bold tracking-tight mb-8 leading-[1.1] text-slate-100">
                {isFrench ? (
                  industryKey === 'default' ? (
                    t('landing.hero_headline')
                  ) : (
                    <>
                      {activeContent.headline.fr.replace(activeContent.headline.highlightFr, '')}
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-400">
                        {activeContent.headline.highlightFr}
                      </span>
                    </>
                  )
                ) : (
                  industryKey === 'default' ? (
                    t('landing.hero_headline')
                  ) : (
                    <>
                      {activeContent.headline.en.replace(activeContent.headline.highlightEn, '')}
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-400">
                        {activeContent.headline.highlightEn}
                      </span>
                    </>
                  )
                )}
              </h1>
            </motion.div>
          </AnimatePresence>

          {/* Dynamic Subheadline */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`${industryKey}-${language}-subheadline`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="w-full"
            >
              <p className="text-lg md:text-2xl text-slate-300 max-w-3xl font-light leading-relaxed mb-6 border-l-2 border-cyan-500/60 pl-6">
                {industryKey === 'default' 
                  ? t('landing.hero_subheadline')
                  : activeContent.subheadline[language]
                }
              </p>

              {/* Target Compliance Framework Chips */}
              <div className="flex flex-wrap items-center gap-2 mb-10 pl-6">
                {activeContent.targetFrameworks.map((fw, idx) => (
                  <span 
                    key={idx}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-900/80 border border-slate-800 text-[11px] font-mono text-cyan-300/90"
                  >
                    <span className="w-1 h-1 rounded-full bg-cyan-400"></span>
                    {fw}
                  </span>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Primary Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-6" role="group" aria-label="Primary Call to Action Options">
            <button 
              type="button"
              id="hero-book-audit-cta"
              onClick={triggerAuditWithTailoredScope} 
              aria-label={`Book a 30-minute security architecture audit for ${activeContent.name[language]}`}
              aria-haspopup="dialog"
              className="group inline-flex items-center justify-center px-8 py-4 text-sm font-semibold tracking-wider text-slate-950 transition-all duration-300 bg-white hover:bg-slate-200 rounded-sm cursor-pointer focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-slate-950 shadow-[0_0_25px_rgba(6,182,212,0.15)] hover:shadow-[0_0_35px_rgba(6,182,212,0.3)]"
            >
              <span className="flex items-center gap-3">
                {industryKey === 'default' 
                  ? t('common.cta_book_audit')
                  : isFrench
                  ? `Audit Sécurité ${activeContent.name.fr}`
                  : `Audit For ${activeContent.name.en}`
                }
                <ArrowRight aria-hidden="true" className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </button>

            <Link 
              to={NavRoute.CLIENT_DEMO} 
              id="hero-view-demo-cta"
              aria-label="View interactive live client security portal demo"
              className="group inline-flex items-center justify-center px-8 py-4 text-sm font-semibold tracking-wider text-slate-100 transition-all duration-300 border border-slate-700 hover:border-slate-400 bg-slate-900/50 hover:bg-slate-800 rounded-sm focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-slate-950"
            >
              <span className="flex items-center gap-3">
                {isFrench ? 'Démo en Direct' : 'View Live Demo'}
                <Activity aria-hidden="true" className="w-4 h-4 text-cyan-500 transition-transform duration-300 group-hover:scale-110" />
              </span>
            </Link>
          </div>

          {/* Quick Segment Pill Strip (Optional Exploration) */}
          <div className="mt-12 pt-8 border-t border-slate-800/60 w-full max-w-3xl flex flex-wrap items-center gap-2">
            <span className="text-xs text-slate-500 font-mono flex items-center gap-1.5 mr-2">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              {isFrench ? 'Aperçu par secteur :' : 'Explore by sector:'}
            </span>
            {allIndustries.filter(k => k !== 'default').map((key) => {
              const item = INDUSTRY_HERO_CONTENT[key];
              const isCurrent = industryKey === key;
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => handleSelectIndustry(key)}
                  className={`text-xs px-2.5 py-1 rounded-full transition-all cursor-pointer ${
                    isCurrent
                      ? 'bg-cyan-950 border border-cyan-400/60 text-cyan-300 font-semibold'
                      : 'bg-slate-900/50 border border-slate-800/80 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                  }`}
                >
                  {item.name[language]}
                </button>
              );
            })}
          </div>

        </div>
      </div>
    </header>
  );
};

export default DynamicHero;
