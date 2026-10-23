import React, { useState, useEffect } from 'react';
import { 
  ArrowRight, ShieldCheck, CheckCircle2, ChevronRight, 
  Server, Lock, Sparkles, Sliders, Calculator, Check, PhoneCall,
  Terminal, Activity, Compass
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface DynamicHeroProps {
  onOpenAudit?: () => void;
  onScrollToContact?: () => void;
  onScrollToBlueprints?: () => void;
}

export const DynamicHero: React.FC<DynamicHeroProps> = ({ 
  onOpenAudit, 
  onScrollToContact,
  onScrollToBlueprints 
}) => {
  const { language } = useLanguage();
  const isFr = language === 'fr';

  // Executive Operational Task Cycler (3D Stacked Deck Status Pill)
  const [activeTaskIndex, setActiveTaskIndex] = useState(0);

  const operationalTasks = [
    {
      badge: isFr ? 'ACCÉLÉRATION COMMERCIALE' : 'COMMERCIAL ACCELERATION',
      task: isFr 
        ? 'Génération instantanée de devis selon la grille tarifaire (< 45s)' 
        : 'Instant itemized quote drafted from master price sheet (< 45s)',
      metric: isFr ? 'Réponse en 38s (était 3 jours)' : 'Response in 38s (was 3 days)'
    },
    {
      badge: isFr ? 'ZÉRO PAPIER COMPTABLE' : 'PAPERLESS OPERATIONS',
      task: isFr 
        ? 'Extraction de factures PDF et réconciliation directe dans l’ERP' 
        : 'Extracting invoice PDF line items directly into ERP & accounting',
      metric: isFr ? '11h administratives récupérées / sem.' : '11 admin desk hours saved / wk'
    },
    {
      badge: isFr ? 'SAS D’AUTORISATION EXÉCUTIF' : 'EXECUTIVE VALIDATION GATE',
      task: isFr 
        ? 'Sas actif : En attente de validation mobile 1-clic du gestionnaire' 
        : 'Air-gap held: Awaiting manager 1-tap mobile authorization',
      metric: isFr ? '0 dérive ou erreur d’envoi' : 'Zero autonomous deviation'
    },
    {
      badge: isFr ? 'SOUVERAINETÉ CLOUD CANADA' : 'CANADIAN DATA SOVEREIGNTY',
      task: isFr 
        ? 'Conformité LPRPDE & hébergement souverain à Montréal ca-central-1' 
        : 'PIPEDA & Law 25 certified · Montreal AWS ca-central-1 residency',
      metric: isFr ? '100% données résidentes au Canada' : '100% domestic Canadian residency'
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveTaskIndex((prev) => (prev + 1) % operationalTasks.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [operationalTasks.length]);

  const handleContactClick = () => {
    if (onScrollToContact) {
      onScrollToContact();
    } else {
      const el = document.getElementById('contact');
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleBlueprintsClick = () => {
    if (onScrollToBlueprints) {
      onScrollToBlueprints();
    } else {
      const el = document.getElementById('blueprints');
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleAuditClick = () => {
    if (onOpenAudit) {
      onOpenAudit();
    } else {
      window.dispatchEvent(new CustomEvent('open-ai-audit-modal'));
    }
  };

  const currentTask = operationalTasks[activeTaskIndex];

  return (
    <div className="relative bg-[#000000] text-[#f7faf9] overflow-hidden selection:bg-[#23c694]/30 selection:text-[#dffff1]">
      
      {/* 
        NOVA INTELLIGENCE-STYLE HERO SECTION (Fixed & Elevated)
        - Clean vertical rhythm: predictable padding without flex squashing
        - Centered celestial sphere aura (emerald + sand gold)
        - Concentric astrolabe wireframes in SVG
        - Clear executive headline & reviewed CTA
      */}
      <section 
        id="hero" 
        aria-label={isFr ? "Accueil Oakivo Solutions" : "Oakivo Solutions Overview"}
        className="relative pt-24 pb-16 md:pt-32 md:pb-20 overflow-hidden border-b border-[#1e2d27]/70 bg-[#000000]"
      >
        
        {/* ================= BACKGROUND: CELESTIAL SPHERE AURA + ORBITAL WIREFRAMES ================= */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0" aria-hidden="true">
          
          {/* Centered Planetary Sphere Halo: Emerald Core + Radiant Sand Amber Halo */}
          <div className="absolute top-[44%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[680px] sm:w-[920px] h-[480px] sm:h-[620px] pointer-events-none">
            {/* Emerald Core Sphere */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_46%_48%,rgba(15,94,74,0.45)_0%,rgba(35,198,148,0.20)_34%,transparent_70%)] blur-[110px]" />
            {/* Warm Golden Sand / Amber Halo */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_55%_52%,rgba(212,163,115,0.34)_0%,rgba(195,145,70,0.15)_36%,transparent_68%)] blur-[95px]" />
          </div>

          {/* Top Edge Ambient Fade */}
          <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[1100px] h-[320px] bg-gradient-to-b from-[#0f5e4a]/18 via-transparent to-transparent blur-[120px]" />

          {/* Concentric Geometric Astrolabe / Orbital Wireframes */}
          <svg 
            className="absolute top-[44%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[880px] sm:w-[1040px] h-[880px] sm:h-[1040px] max-w-none opacity-45 sm:opacity-55"
            viewBox="0 0 1000 1000" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="orbit-grad-emerald" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#23c694" stopOpacity="0.55" />
                <stop offset="50%" stopColor="#ffffff" stopOpacity="0.14" />
                <stop offset="100%" stopColor="#d4a373" stopOpacity="0.45" />
              </linearGradient>
              <linearGradient id="orbit-grad-soft" x1="100%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.2" />
                <stop offset="50%" stopColor="#23c694" stopOpacity="0.1" />
                <stop offset="100%" stopColor="#ffffff" stopOpacity="0.04" />
              </linearGradient>
            </defs>

            {/* Outermost Tilted Ellipses */}
            <ellipse cx="500" cy="500" rx="465" ry="235" transform="rotate(-18 500 500)" stroke="url(#orbit-grad-emerald)" strokeWidth="1" />
            <ellipse cx="500" cy="500" rx="440" ry="215" transform="rotate(14 500 500)" stroke="url(#orbit-grad-soft)" strokeWidth="0.8" strokeDasharray="3 5" />
            
            {/* Mid Tilted Ellipses */}
            <ellipse cx="500" cy="500" rx="360" ry="180" transform="rotate(-8 500 500)" stroke="rgba(255, 255, 255, 0.12)" strokeWidth="1" />
            <ellipse cx="500" cy="500" rx="330" ry="165" transform="rotate(22 500 500)" stroke="rgba(212, 163, 115, 0.25)" strokeWidth="0.8" />
            
            {/* Inner Concentric Rings */}
            <ellipse cx="500" cy="500" rx="260" ry="130" transform="rotate(-4 500 500)" stroke="rgba(35, 198, 148, 0.3)" strokeWidth="1.2" />
            <ellipse cx="500" cy="500" rx="190" ry="95" stroke="rgba(255, 255, 255, 0.15)" strokeWidth="0.8" strokeDasharray="4 6" />
            <circle cx="500" cy="500" r="110" stroke="rgba(255, 255, 255, 0.08)" strokeWidth="0.8" />
            
            {/* Coordinate Crosshairs */}
            <line x1="500" y1="120" x2="500" y2="880" stroke="rgba(255, 255, 255, 0.05)" strokeWidth="0.8" strokeDasharray="2 4" />
            <line x1="120" y1="500" x2="880" y2="500" stroke="rgba(255, 255, 255, 0.05)" strokeWidth="0.8" strokeDasharray="2 4" />
            
            {/* Node Markers */}
            <circle cx="500" cy="265" r="2.5" fill="#23c694" className="animate-pulse" />
            <circle cx="735" cy="500" r="2.5" fill="#d4a373" />
            <circle cx="265" cy="500" r="2.5" fill="#23c694" />
            <circle cx="500" cy="735" r="2" fill="#ffffff" opacity="0.6" />
          </svg>

          {/* Micro Geometric Dot Texture */}
          <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_75%_65%_at_50%_45%,#000_20%,transparent_100%)] pointer-events-none" />
        </div>

        {/* ================= HERO CONTENT WRAPPER ================= */}
        <div className="relative z-10 container mx-auto px-6 sm:px-8 lg:px-12 max-w-6xl space-y-12 md:space-y-14">
          
          {/* ================= TOP ROW: LIFECYCLE COORDINATES & STACKED STATUS DECK ================= */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-[#1e2d27]/70">
            
            {/* 5-Axis Technical Lifecycle Coordinates (Nova Signature) */}
            <div className="flex flex-wrap items-center gap-x-5 sm:gap-x-7 gap-y-2 text-[11px] font-mono tracking-widest text-[#7c8581] uppercase select-none">
              <span className="flex items-center gap-1.5 transition-colors hover:text-[#dffff1] cursor-default">
                <span className="text-[#23c694] font-semibold">01.</span>
                <span>{isFr ? 'DÉCOUVERTE' : 'DISCOVER'}</span>
              </span>
              <span className="text-[#1e2d27] hidden sm:inline" aria-hidden="true">/</span>
              <span className="flex items-center gap-1.5 transition-colors hover:text-[#dffff1] cursor-default">
                <span className="text-[#23c694] font-semibold">02.</span>
                <span>{isFr ? 'CONCEPTION' : 'DESIGN'}</span>
              </span>
              <span className="text-[#1e2d27] hidden sm:inline" aria-hidden="true">/</span>
              <span className="flex items-center gap-1.5 transition-colors hover:text-[#dffff1] cursor-default">
                <span className="text-[#23c694] font-semibold">03.</span>
                <span>{isFr ? 'DÉVELOPPEMENT' : 'BUILD'}</span>
              </span>
              <span className="text-[#1e2d27] hidden sm:inline" aria-hidden="true">/</span>
              <span className="flex items-center gap-1.5 transition-colors hover:text-[#dffff1] cursor-default">
                <span className="text-[#23c694] font-semibold">04.</span>
                <span>{isFr ? 'DÉPLOIEMENT' : 'DEPLOY'}</span>
              </span>
              <span className="text-[#1e2d27] hidden sm:inline" aria-hidden="true">/</span>
              <span className="flex items-center gap-1.5 transition-colors hover:text-[#dffff1] cursor-default">
                <span className="text-[#23c694] font-semibold">05.</span>
                <span>{isFr ? 'EXÉCUTION' : 'OPERATE'}</span>
              </span>
            </div>

            {/* 3D Stacked Deck Status Pill (Faithful to Nova screenshot) */}
            <div className="relative flex justify-start lg:justify-end shrink-0">
              <button
                type="button"
                onClick={handleAuditClick}
                aria-label="See Oakivo systems in action — operational diagnostic audit"
                className="group relative cursor-pointer text-left transition-transform duration-300 hover:scale-[1.015]"
              >
                {/* Layer 3 - Bottom shadow deck */}
                <div 
                  className="absolute inset-0 translate-y-3 scale-[0.92] rounded-full bg-[#070a09] border border-white/[0.04] opacity-30 pointer-events-none" 
                  aria-hidden="true" 
                />
                
                {/* Layer 2 - Middle stacked deck */}
                <div 
                  className="absolute inset-0 translate-y-1.5 scale-[0.96] rounded-full bg-[#0a0e0c] border border-white/[0.08] opacity-60 pointer-events-none" 
                  aria-hidden="true" 
                />

                {/* Subtle outer glow on hover */}
                <div 
                  className="absolute -inset-1 rounded-full bg-gradient-to-r from-[#23c694]/25 via-[#d4a373]/20 to-[#0f5e4a]/25 blur-md opacity-40 group-hover:opacity-100 transition-opacity" 
                  aria-hidden="true" 
                />

                {/* Layer 1 - Active Top Floating Card */}
                <div className="relative flex items-center gap-3 px-4 sm:px-5 py-2.5 rounded-full bg-[#0a0f0d]/95 border border-[#23c694]/45 backdrop-blur-2xl shadow-[0_12px_35px_rgba(0,0,0,0.85)]">
                  
                  {/* Cellular 4-Node Clover Glowing Icon (Signature Nova node) */}
                  <div className="relative w-6 h-6 shrink-0 text-[#23c694] flex items-center justify-center">
                    <svg viewBox="0 0 32 32" fill="currentColor" className="w-5 h-5" aria-hidden="true">
                      <circle cx="11" cy="11" r="4.2" className="animate-pulse fill-[#23c694]" />
                      <circle cx="21" cy="11" r="4.2" className="fill-[#23c694] opacity-90" />
                      <circle cx="11" cy="21" r="4.2" className="fill-[#23c694] opacity-75" />
                      <circle cx="21" cy="21" r="4.2" className="fill-[#23c694] opacity-60" />
                    </svg>
                  </div>

                  {/* Cycling Status Label */}
                  <div className="flex flex-col sm:flex-row sm:items-center gap-0.5 sm:gap-2.5 text-xs font-mono">
                    <span className="text-[#23c694] font-semibold tracking-wider uppercase text-[10px] sm:text-[11px] flex items-center gap-1.5 shrink-0">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#23c694] animate-ping" />
                      {currentTask.badge}
                    </span>
                    <span className="text-[#36423d] hidden sm:inline" aria-hidden="true">/</span>
                    <span className="text-[#dce3e0] font-normal truncate max-w-[220px] sm:max-w-[320px]">
                      {currentTask.task}
                    </span>
                  </div>

                  <ChevronRight size={14} className="text-[#7c8581] group-hover:text-[#85e1bf] group-hover:translate-x-0.5 transition-all shrink-0 ml-1" />
                </div>
              </button>
            </div>

          </div>

          {/* ================= MIDDLE: MASSIVE DISPLAY HEADLINE & ACTION CLUSTER ================= */}
          <div className="space-y-8">
            
            <div className="max-w-5xl">
              <span className="nova-eyebrow mb-6">
                {isFr 
                  ? 'OAKIVO SOLUTIONS · SYSTÈMES OPÉRATIONNELS & EXPÉRIENCES NUMÉRIQUES · DIEPPE, N.-B.' 
                  : 'OAKIVO SOLUTIONS · APPLIED AUTOMATION & DIGITAL EXPERIENCES · DIEPPE, NB'}
              </span>

              {/* Massive Display Headline */}
              <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-[76px] xl:text-[82px] font-display font-light text-[#f7faf9] tracking-[-0.04em] leading-[1.04] mb-8">
                {isFr ? (
                  <>
                    <span className="block">Le Moteur Opérationnel Appliqué</span>
                    <span className="block text-[#9ba6a1] font-normal">pour les Entreprises Canadiennes.</span>
                  </>
                ) : (
                  <>
                    <span className="block">The Applied Operational Engine</span>
                    <span className="block text-[#9ba6a1] font-normal">for Canadian Enterprise.</span>
                  </>
                )}
              </h1>

              {/* Subhead and Reviewed Action Cluster Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end pt-2">
                
                {/* Left Subcopy (Refined without AI buzzwords; includes 'design experiences') */}
                <div className="lg:col-span-7">
                  <p className="text-base sm:text-lg text-[#a8b0ad] font-light leading-relaxed max-w-xl">
                    {isFr
                      ? "Une pratique d'ingénierie unifiée pour les entreprises canadiennes : nous concevons des expériences numériques d'élite, accélérons vos soumissions en moins de 45 secondes et éradiquons la paperasse manuelle avec une souveraineté des données 100 % canadienne."
                      : "A unified engineering practice for Canadian enterprise: we design high-converting digital experiences, accelerate quote turnaround to under 45 seconds, and eliminate manual paperwork—all with 100% domestic Canadian data sovereignty."
                    }
                  </p>
                </div>

                {/* Right Reviewed Action Cluster (Single Clear Executive Action + Secondary Link) */}
                <div className="lg:col-span-5 flex flex-wrap items-center gap-5 lg:justify-end">
                  <button 
                    type="button"
                    onClick={handleContactClick}
                    className="nova-outline-btn cursor-pointer py-3.5 px-6 text-sm"
                  >
                    <span>{isFr ? 'Prendre Rendez-vous' : 'Book Consultation'}</span>
                    <ArrowRight size={15} className="text-[#23c694]" />
                  </button>

                  <button 
                    type="button"
                    onClick={handleBlueprintsClick}
                    className="inline-flex items-center gap-1.5 text-sm font-mono text-[#c2ccc7] hover:text-[#85e1bf] transition-colors cursor-pointer py-2"
                  >
                    <span>{isFr ? 'Consulter les Schémas' : 'Explore Technical Blueprints'}</span>
                    <span aria-hidden="true">→</span>
                  </button>
                </div>

              </div>

            </div>

          </div>

          {/* ================= BOTTOM: PROOF STRIP ================= */}
          <div className="pt-6 border-t border-[#1e2d27]/70">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              
              <div className="space-y-2.5">
                <p className="text-[11px] font-mono uppercase tracking-widest text-[#7c8581]">
                  {isFr ? 'Accélération des Opérations & Expériences Numériques pour :' : 'Accelerating Operations & Digital Experiences for'}
                </p>
                <div className="flex flex-wrap items-center gap-2.5">
                  {[
                    { en: 'Wholesale & Distribution', fr: 'Distribution & Vente en Gros' },
                    { en: 'Precision Manufacturing', fr: 'Fabrication de Précision' },
                    { en: 'Health & Medical Clinics', fr: 'Cliniques de Santé & Médical' },
                    { en: 'Supply Chain & Logistics', fr: 'Chaîne Logistique & Flottes' },
                    { en: 'Professional Practices', fr: 'Cabinets Professionnels' }
                  ].map((sector) => (
                    <span 
                      key={sector.en}
                      className="px-3 py-1 rounded-full text-xs font-mono text-[#dce3e0] bg-[#080c0a] border border-[#1e2d27] hover:border-[#23c694]/50 transition-colors cursor-default"
                    >
                      {isFr ? sector.fr : sector.en}
                    </span>
                  ))}
                </div>
              </div>

              <div className="lg:text-right shrink-0 border-t lg:border-t-0 lg:border-l border-[#1e2d27] pt-4 lg:pt-0 lg:pl-8">
                <p className="text-[11px] font-mono uppercase tracking-widest text-[#7c8581] mb-1">
                  {isFr ? 'Hébergement Souverain Canada' : 'Domestic Data Residency'}
                </p>
                <div className="inline-flex items-center gap-2 text-xs font-mono text-[#23c694]">
                  <Server size={13} />
                  <span className="font-semibold text-white">Montreal AWS ca-central-1</span>
                  <span className="text-[#7c8581]">·</span>
                  <span className="text-[#a8b0ad]">{isFr ? 'Loi 25 & LPRPDE' : 'PIPEDA & Law 25'}</span>
                </div>
              </div>

            </div>
          </div>

        </div>

      </section>

      {/* 
        METRICS SECTION (Key Impact Statistics)
      */}
      <section className="py-20 bg-[#000000] border-b border-[#1e2d27]/70 relative z-10" aria-label="Impact statistics">
        <div className="container mx-auto max-w-6xl px-6 sm:px-8 lg:px-12">
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            <article className="p-8 rounded-2xl bg-[#070a09] border border-[#1e2d27] hover:border-[#23c694]/40 transition-all duration-300 group">
              <span className="nova-eyebrow text-[#23c694] mb-3">
                {isFr ? 'Capacité Accrue' : 'Higher Capacity'}
              </span>
              <strong className="text-6xl font-light font-display text-white tracking-tight block my-2 group-hover:text-[#23c694] transition-colors">
                5x
              </strong>
              <p className="text-sm text-[#a8b0ad] font-light leading-relaxed mt-2">
                {isFr 
                  ? 'Vitesse de réponse aux prospects ramenée de 3 jours à moins de 45 secondes avec devis pré-rempli.' 
                  : 'Speed-to-lead response compressed from 3 business days to under 45 seconds with instant quote drafting.'}
              </p>
            </article>

            <article className="p-8 rounded-2xl bg-[#070a09] border border-[#1e2d27] hover:border-[#23c694]/40 transition-all duration-300 group">
              <span className="nova-eyebrow text-[#23c694] mb-3">
                {isFr ? 'Réduction des Coûts' : 'Lower Overhead'}
              </span>
              <strong className="text-6xl font-light font-display text-white tracking-tight block my-2 group-hover:text-[#23c694] transition-colors">
                50%
              </strong>
              <p className="text-sm text-[#a8b0ad] font-light leading-relaxed mt-2">
                {isFr 
                  ? 'Éradication de la saisie manuelle de factures fournisseurs, reçus et feuilles de temps dans vos logiciels comptables.' 
                  : 'Reduction in repetitive administrative overhead through automated document parsing into QuickBooks and ERPs.'}
              </p>
            </article>

            <article className="p-8 rounded-2xl bg-[#070a09] border border-[#1e2d27] hover:border-[#23c694]/40 transition-all duration-300 group">
              <span className="nova-eyebrow text-[#23c694] mb-3">
                {isFr ? 'Déploiement Rapide' : 'Rapid Production Sprint'}
              </span>
              <strong className="text-6xl font-light font-display text-white tracking-tight block my-2 group-hover:text-[#23c694] transition-colors">
                14 Days
              </strong>
              <p className="text-sm text-[#a8b0ad] font-light leading-relaxed mt-2">
                {isFr 
                  ? 'De l’analyse initiale à la mise en production opérationnelle, avec notre garantie pilote de 30 jours sans risque.' 
                  : 'From architectural design kickoff to verified live deployment, backed by our 30-day risk-free pilot guarantee.'}
              </p>
            </article>

          </div>

        </div>
      </section>

    </div>
  );
};

export default DynamicHero;
