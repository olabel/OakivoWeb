import React from 'react';
import { ArrowRight, ChevronDown, ShieldCheck, Zap, Server, Activity, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import heroDataCenterImg from '../src/assets/images/hero_sovereign_datacenter_1791246015388.jpg';

export const DynamicHero: React.FC = () => {
  const { language } = useLanguage();
  const isFr = language === 'fr';

  const scrollToContact = () => {
    const el = document.getElementById('discovery-contact');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const scrollToDisciplines = () => {
    const el = document.getElementById('core-disciplines');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section 
      id="hero" 
      aria-label={isFr ? "Présentation de l'Entreprise" : "Enterprise Overview"} 
      className="relative min-h-[92vh] flex flex-col items-center justify-center overflow-hidden bg-[#030712] pt-32 pb-20 md:pt-40 md:pb-28"
    >
      {/* Precision Atmospheric Lighting & Spatial Depth */}
      <div 
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[550px] bg-gradient-to-b from-cyan-500/[0.12] via-blue-600/[0.04] to-transparent blur-[140px] pointer-events-none rounded-full" 
        aria-hidden="true" 
      />
      <div 
        className="absolute top-1/3 -left-40 w-[500px] h-[500px] bg-cyan-600/[0.06] blur-[150px] pointer-events-none rounded-full" 
        aria-hidden="true" 
      />
      
      {/* Subtle Precision Grid Backdrop */}
      <div 
        className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_20%,#000_70%,transparent_100%)] pointer-events-none" 
        aria-hidden="true" 
      />

      <div className="relative z-10 container mx-auto px-6 sm:px-8 lg:px-12 max-w-6xl text-center">
        
        {/* Unboxed Precision Kicker (Zero-Pill Discipline) */}
        <div className="inline-flex items-center gap-2.5 text-xs font-mono font-medium tracking-widest text-cyan-400 uppercase mb-8 select-none">
          <span>{isFr ? 'INGÉNIERIE TECHNOLOGIQUE SOUVERAINE' : 'SOVEREIGN TECHNOLOGY ENGINEERING'}</span>
          <span className="text-slate-600" aria-hidden="true">·</span>
          <span>DIEPPE, NB</span>
          <span className="text-slate-600" aria-hidden="true">·</span>
          <span>{isFr ? '100% BILINGUE' : '100% BILINGUAL'}</span>
        </div>

        {/* Monolithic $20M Headline */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-bold tracking-tight text-white leading-[1.04] max-w-5xl mx-auto mb-8 text-balance">
          {isFr ? (
            <>
              Systèmes de Précision. <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-400">
                Échelle Souveraine.
              </span>
            </>
          ) : (
            <>
              Precision Systems. <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-400">
                Sovereign Scale.
              </span>
            </>
          )}
        </h1>

        {/* Authoritative, Noise-Free Value Proposition */}
        <p className="text-base sm:text-lg md:text-xl text-slate-300 font-light max-w-3xl mx-auto leading-relaxed mb-10 text-balance">
          {isFr
            ? 'Nous remplaçons les tableurs fragiles par des ERP modernes clés en main, éliminons 35% du gaspillage infonuagique et garantissons la souveraineté stricte des données canadiennes — en production en moins de 90 jours.'
            : 'We replace fragile spreadsheet infrastructure with modern enterprise ERP, eliminate 35% of AWS/Azure cloud waste, and guarantee Canadian data sovereignty—with direct senior founder accountability.'
          }
        </p>

        {/* Magnetic High-Contrast Primary CTA Row */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <button 
            type="button"
            onClick={scrollToContact}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl bg-white hover:bg-slate-200 text-slate-950 font-semibold text-xs font-mono uppercase tracking-wider transition-all duration-200 shadow-2xl shadow-white/10 hover:shadow-cyan-400/30 cursor-pointer"
          >
            <span>{isFr ? 'Planifier une Découverte Technique' : 'Schedule Technical Discovery'}</span>
            <ArrowRight size={14} />
          </button>

          <button 
            type="button"
            onClick={scrollToDisciplines}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-200 hover:text-white font-medium text-xs font-mono tracking-wider border border-white/[0.08] hover:border-cyan-500/30 transition-colors cursor-pointer"
          >
            <span>{isFr ? 'Explorer les Disciplines' : 'Inspect Core Disciplines'}</span>
            <ChevronDown size={14} className="text-cyan-400" />
          </button>
        </div>

        {/* Direct Trust Line (Unboxed Typographic Metadata) */}
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs font-mono text-slate-400 mb-16">
          <span className="flex items-center gap-1.5 text-slate-300">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            <span>SOC 2 Type II Ready</span>
          </span>
          <span className="text-slate-700" aria-hidden="true">·</span>
          <span>100% Canadian Data Residency (ca-central)</span>
          <span className="text-slate-700" aria-hidden="true">·</span>
          <span>Guaranteed &lt; 90-Day Production Live</span>
          <span className="text-slate-700" aria-hidden="true">·</span>
          <span>Zero Junior Delegation</span>
        </div>

        {/* Monolithic Operations Console Preview (The Visual Focal Point) */}
        <div className="relative mx-auto max-w-5xl rounded-3xl p-2 sm:p-3 bg-gradient-to-b from-white/[0.12] via-white/[0.04] to-transparent border border-white/[0.1] shadow-[0_30px_100px_rgba(0,0,0,0.9)]">
          <div className="relative rounded-2xl overflow-hidden aspect-[16/9] bg-[#070D1E]">
            <img 
              src={heroDataCenterImg} 
              alt="Oakivo Sovereign Cloud Architecture and Data Vault" 
              className="w-full h-full object-cover object-center"
              loading="eager"
              referrerPolicy="no-referrer"
            />
            
            {/* Measured Scrim for Contrast & Legibility */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-[#030712]/40 to-transparent pointer-events-none" />

            {/* In-Frame Live Floating Telemetry Bar */}
            <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 p-4 rounded-xl bg-[#090E1F]/90 border border-white/[0.1] backdrop-blur-xl flex flex-wrap items-center justify-between gap-4 text-left font-mono">
              <div className="space-y-0.5">
                <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Sovereign Cluster</span>
                <span className="text-xs sm:text-sm font-bold text-white flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span>AWS &amp; Azure ca-central-1</span>
                </span>
              </div>

              <div className="space-y-0.5">
                <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Edge Latency</span>
                <span className="text-xs sm:text-sm font-bold text-cyan-300">
                  3.8ms (Atlantic Standard Time)
                </span>
              </div>

              <div className="space-y-0.5">
                <span className="text-[10px] text-slate-400 uppercase tracking-wider block">FinOps Efficiency</span>
                <span className="text-xs sm:text-sm font-bold text-emerald-400">
                  -35% Spend Guaranteed
                </span>
              </div>

              <div className="space-y-0.5 hidden md:block">
                <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Data Boundary</span>
                <span className="text-xs sm:text-sm font-bold text-slate-200">
                  100% Canadian Soil
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Quantified Rigor Grid (4 Pillars of Founder Accountability) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 pt-16 mt-16 border-t border-white/[0.08] text-left">
          
          <div className="space-y-1">
            <div className="text-3xl sm:text-4xl font-mono font-bold text-white tracking-tight">
              &lt; 90 <span className="text-xs font-sans font-light text-slate-400">{isFr ? 'jours' : 'days'}</span>
            </div>
            <div className="text-xs font-medium text-slate-200">
              {isFr ? 'Mise en Production Réelle' : 'Turnkey Production Live'}
            </div>
            <p className="text-[11px] text-slate-400 font-light">
              {isFr ? 'Déploiement ERP & flux clés en main' : 'Turnkey modern ERP & automated workflows'}
            </p>
          </div>

          <div className="space-y-1">
            <div className="text-3xl sm:text-4xl font-mono font-bold text-white tracking-tight">
              30–40%
            </div>
            <div className="text-xs font-medium text-slate-200">
              {isFr ? 'Baisse de Facture Infonuagique' : 'Guaranteed Cloud Bill Cut'}
            </div>
            <p className="text-[11px] text-slate-400 font-light">
              {isFr ? 'Audit FinOps & élimination du gaspillage' : 'AWS/Azure waste removal via Terraform IaC'}
            </p>
          </div>

          <div className="space-y-1">
            <div className="text-3xl sm:text-4xl font-mono font-bold text-white tracking-tight">
              100%
            </div>
            <div className="text-xs font-medium text-slate-200">
              {isFr ? 'Souveraineté des Données' : 'Canadian Sovereign Residency'}
            </div>
            <p className="text-[11px] text-slate-400 font-light">
              {isFr ? 'Zones ca-central strictement conformes' : 'AWS/Azure ca-central with PIPEDA & Law 25 proof'}
            </p>
          </div>

          <div className="space-y-1">
            <div className="text-3xl sm:text-4xl font-mono font-bold text-white tracking-tight">
              0 <span className="text-xs font-sans font-light text-slate-400">{isFr ? 'junior' : 'juniors'}</span>
            </div>
            <div className="text-xs font-medium text-slate-200">
              {isFr ? 'Fondateurs Directs' : 'Direct Founder Access'}
            </div>
            <p className="text-[11px] text-slate-400 font-light">
              {isFr ? 'Ingénierie de haut niveau à Dieppe (N.-B.)' : 'No delegation to call centers or junior analysts'}
            </p>
          </div>

        </div>

      </div>
    </section>
  );
};

export default DynamicHero;
