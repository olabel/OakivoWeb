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

  // Nova Intelligence Agent Status Card Cycler (Deck of stacked cards)
  const [activeAgentIndex, setActiveAgentIndex] = useState(0);

  const agentTasks = [
    {
      badge: isFr ? 'ACCÉLÉRATION COMMERCIALE' : 'SPEED-TO-LEAD ENGINE',
      task: isFr 
        ? 'Génération automatique de devis selon la grille tarifaire (< 45s)' 
        : 'Auto-drafting itemized quote from master price sheet (< 45s)',
      metric: isFr ? 'Réponse en 38s (était 3 jours)' : 'Response in 38s (was 3 days)'
    },
    {
      badge: isFr ? 'ZÉRO SAISIE COMPTABLE' : 'PAPERLESS LEDGER SYNC',
      task: isFr 
        ? 'Extraction de factures PDF et ventilation automatique dans QuickBooks' 
        : 'Extracting invoice PDF line items & tax codes into QuickBooks',
      metric: isFr ? '11h administratives économisées / sem.' : '11 admin desk hours saved / wk'
    },
    {
      badge: isFr ? 'SAS DE SÉCURITÉ HUMAIN' : 'HUMAN APPROVAL GATE',
      task: isFr 
        ? 'Sas actif : En attente de validation mobile 1-clic du gestionnaire' 
        : 'Air-gap held: Awaiting manager 1-tap mobile authorization',
      metric: isFr ? '0 dérive autonome autorisée' : 'Zero autonomous dispatch errors'
    },
    {
      badge: isFr ? 'SOUVERAINETÉ CLOUD CANADA' : 'CANADIAN CLOUD RESIDENCY',
      task: isFr 
        ? 'Conformité LPRPDE & hébergement souverain à Montréal ca-central-1' 
        : 'PIPEDA compliant & Montreal ca-central-1 cloud residency',
      metric: isFr ? '100% données résidentes au Canada' : '100% domestic Canadian data'
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveAgentIndex((prev) => (prev + 1) % agentTasks.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [agentTasks.length]);

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

  const currentAgent = agentTasks[activeAgentIndex];

  return (
    <div className="relative bg-[#000000] text-[#f7faf9] overflow-hidden selection:bg-[#23c694]/30 selection:text-[#dffff1]">
      
      {/* 
        HERO SECTION (Faithfully adjusted to Nova Intelligence composition)
        Features: Centered celestial sphere aura, concentric orbital wireframes, 5-stage coordinate axis, 3D stacked deck status pill, display typography & reviewed executive CTA
      */}
      <section 
        id="hero" 
        aria-label={isFr ? "Accueil Oakivo Solutions" : "Oakivo Solutions Overview"}
        className="relative min-h-[90vh] lg:min-h-[94vh] flex flex-col justify-between pt-28 pb-14 md:pt-36 md:pb-16 overflow-hidden border-b border-[#1e2d27]/70"
      >
        
        {/* ================= BACKGROUND: DUAL CELESTIAL SPHERE AURA + ORBITAL WIREFRAMES ================= */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0" aria-hidden="true">
          
          {/* Centered Planetary Sphere Halo: Emerald Core + Radiant Sand Amber Halo */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[720px] sm:w-[960px] h-[520px] sm:h-[680px] pointer-events-none">
            {/* Emerald Core Sphere */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_45%_48%,rgba(15,94,74,0.48)_0%,rgba(35,198,148,0.22)_32%,transparent_70%)] blur-[110px]" />
            {/* Warm Golden Sand / Amber Halo */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_56%_52%,rgba(212,163,115,0.36)_0%,rgba(195,145,70,0.16)_36%,transparent_68%)] blur-[95px]" />
          </div>

          {/* Top Edge Ambient Fade */}
          <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[1100px] h-[340px] bg-gradient-to-b from-[#0f5e4a]/18 via-transparent to-transparent blur-[120px]" />

          {/* Concentric Geometric Astrolabe / Orbital Wireframes */}
          <svg 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[920px] sm:w-[1020px] h-[920px] sm:h-[1020px] max-w-none opacity-45 sm:opacity-60"
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

        {/* ================= TOP SECTION: LIFECYCLE AXIS & STACKED DECK STATUS PILL ================= */}
        <div className="relative z-10 container mx-auto px-6 sm:px-8 lg:px-12 max-w-6xl mb-8">
          
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
            <div className="relative flex justify-start lg:justify-end">
              <button
                type="button"
                onClick={handleAuditClick}
                aria-label="See Oakivo autonomous agent in action — launch readiness audit"
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
                      {currentAgent.badge}
                    </span>
                    <span className="text-[#36423d] hidden sm:inline" aria-hidden="true">/</span>
                    <span className="text-[#dce3e0] font-normal truncate max-w-[230px] sm:max-w-[330px]">
                      {currentAgent.task}
                    </span>
                  </div>

                  <ChevronRight size={14} className="text-[#7c8581] group-hover:text-[#85e1bf] group-hover:translate-x-0.5 transition-all shrink-0 ml-1" />
                </div>
              </button>
            </div>

          </div>

        </div>

        {/* ================= MIDDLE: MASSIVE DISPLAY HEADLINE & ACTION CLUSTER ================= */}
        <div className="relative z-10 container mx-auto px-6 sm:px-8 lg:px-12 max-w-6xl my-auto">
          
          <div className="max-w-5xl">
            <span className="nova-eyebrow mb-6">
              {isFr 
                ? 'OAKIVO SOLUTIONS · STUDIO DE SYSTÈMES AUTONOMES · DIEPPE, N.-B.' 
                : 'OAKIVO SOLUTIONS · SOVEREIGN APPLIED AUTOMATION STUDIO · DIEPPE, NB'}
            </span>

            {/* Massive Display Headline */}
            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-[84px] font-display font-light text-[#f7faf9] tracking-[-0.04em] leading-[0.98] mb-8">
              {isFr ? (
                <>
                  <span className="block">Le Moteur d'Automatisation</span>
                  <span className="block text-[#9ba6a1] font-normal">pour les Entreprises d'Ici.</span>
                </>
              ) : (
                <>
                  <span className="block">The Applied Automation Engine</span>
                  <span className="block text-[#9ba6a1] font-normal">for Canadian Business.</span>
                </>
              )}
            </h1>

            {/* Subhead and Reviewed Action Cluster Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end pt-2">
              
              {/* Left Subcopy */}
              <div className="lg:col-span-7">
                <p className="text-base sm:text-lg text-[#a8b0ad] font-light leading-relaxed max-w-xl">
                  {isFr
                    ? "Une couche d'intelligence unifiée pour les PME et entreprises canadiennes afin d'accélérer les ventes, d'éradiquer la paperasse manuelle et de déployer des logiciels robustes en 14 jours."
                    : "One unified intelligence layer for Canadian enterprise to win high-margin bids, eliminate manual paperwork, and deploy custom software in focused 14-day sprints."
                  }
                </p>
              </div>

              {/* Right Reviewed Action Cluster (Single Clear Executive Action + Secondary Link) */}
              <div className="lg:col-span-5 flex flex-wrap items-center gap-5 lg:justify-end">
                <button 
                  type="button"
                  onClick={handleContactClick}
                  className="nova-outline-btn cursor-pointer py-3 px-6 text-sm"
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

        {/* ================= BOTTOM: CUSTOMER & SECTOR PROOF STRIP ================= */}
        <div className="relative z-10 container mx-auto max-w-6xl px-6 sm:px-8 lg:px-12 mt-12 pt-6 border-t border-[#1e2d27]/70">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            
            <div className="space-y-2.5">
              <p className="text-[11px] font-mono uppercase tracking-widest text-[#7c8581]">
                {isFr ? 'Accélération des Opérations & Réduction des Coûts pour :' : 'Reducing Overhead & Accelerating Operations for'}
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
                  ? 'Vitesse de réponse aux prospects ramenée de 3 jours à moins de 90 secondes avec devis pré-rempli.' 
                  : 'Speed-to-lead response compressed from 3 business days to under 90 seconds with instant quote drafting.'}
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
