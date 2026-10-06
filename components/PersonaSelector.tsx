import React, { useState } from 'react';
import { 
  Building2, 
  Cpu, 
  ArrowRight, 
  CheckCircle2, 
  ShieldCheck, 
  Zap, 
  Database, 
  Clock, 
  Server, 
  Layers,
  ArrowUpRight,
  Sparkles,
  FileCheck2,
  Lock,
  Workflow
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export type PersonaType = 'business' | 'technical';

interface PersonaSelectorProps {
  onSelectStream?: (stream: string) => void;
}

export const PersonaSelector: React.FC<PersonaSelectorProps> = ({ onSelectStream }) => {
  const { language } = useLanguage();
  const isFr = language === 'fr';

  const [activePersona, setActivePersona] = useState<PersonaType>('business');
  const [activeStep, setActiveStep] = useState<number>(0);

  const handleCardCta = (streamName: string) => {
    if (onSelectStream) {
      onSelectStream(streamName);
    }
    const el = document.getElementById('discovery-contact');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Interactive Architecture Pipelines for each persona
  const businessPipeline = [
    {
      step: '01',
      titleEn: 'Order Capture',
      titleFr: 'Capture de Commande',
      descEn: 'Unified intake across web, EDI, and sales channels',
      descFr: 'Entrée unifiée via web, EDI et canaux de vente'
    },
    {
      step: '02',
      titleEn: 'Automated Billing',
      titleFr: 'Facturation Auto',
      descEn: 'Instant invoice generation with Stripe / Canadian EFT',
      descFr: 'Factures instantanées via Stripe et virements EFT'
    },
    {
      step: '03',
      titleEn: 'Multi-Warehouse Sync',
      titleFr: 'Sync Multi-Entrepôts',
      descEn: 'Real-time Odoo ERP inventory updates & barcode tracking',
      descFr: 'Mise à jour en direct des stocks Odoo & codes-barres'
    },
    {
      step: '04',
      titleEn: 'Bilingual Ledger',
      titleFr: 'Grand Livre Bilingue',
      descEn: 'Automated GST/HST/QST tax rules & financial statements',
      descFr: 'Règles fiscales TPS/TVH/TVQ et bilans instantanés'
    }
  ];

  const technicalPipeline = [
    {
      step: '01',
      titleEn: 'Terraform IaC',
      titleFr: 'Terraform IaC',
      descEn: 'Declarative, immutable cloud definitions in Git',
      descFr: 'Définitions d’infrastructure immuables sous Git'
    },
    {
      step: '02',
      titleEn: 'Sovereign ca-central',
      titleFr: 'Zone ca-central',
      descEn: 'Strictly Canadian AWS / Azure data residency',
      descFr: 'Résidence des données 100% canadienne garantie'
    },
    {
      step: '03',
      titleEn: 'Canary CI/CD',
      titleFr: 'CI/CD Canari',
      descEn: 'Zero-downtime releases with instant automated rollbacks',
      descFr: 'Déploiements sans coupure avec rollback automatique'
    },
    {
      step: '04',
      titleEn: 'Continuous Audit',
      titleFr: 'Preuves d’Audit',
      descEn: 'Automated evidence collection for PIPEDA & SOC 2',
      descFr: 'Collecte continue des preuves LPRPDE & SOC 2'
    }
  ];

  const currentPipeline = activePersona === 'business' ? businessPipeline : technicalPipeline;

  return (
    <section 
      id="executive-architecture" 
      aria-label="Executive Persona Architecture"
      className="py-24 md:py-36 px-6 sm:px-8 lg:px-12 bg-[#04070D] border-t border-white/[0.06] relative"
    >
      <div className="container mx-auto max-w-6xl">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16 space-y-4">
          <div className="text-xs font-mono font-medium tracking-widest text-cyan-400 uppercase select-none">
            {isFr ? 'Orientation par Rôle de Direction' : 'Interactive Leadership Lens'}
          </div>
          
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white tracking-tight leading-tight">
            {isFr 
              ? 'Conçu pour Vos Priorités Stratégiques.' 
              : 'Engineered for Your Strategic Mandate.'}
          </h2>

          <p className="text-slate-400 text-sm sm:text-base font-light leading-relaxed">
            {isFr
              ? 'Basculez entre la vision Opérations & Finances et la vision Ingénierie & Sécurité pour explorer l’architecture technique et les rendements quantifiables associés.'
              : 'Toggle between the Executive Operations lens and the Technical Engineering lens to inspect how our architecture translates specifications into business outcomes.'}
          </p>
        </div>

        {/* The Dual-Lens Segmented Control */}
        <div className="flex flex-col sm:flex-row items-center gap-3 p-1.5 rounded-2xl bg-slate-900/60 border border-white/[0.08] max-w-2xl mb-12 shadow-xl">
          
          <button
            type="button"
            onClick={() => {
              setActivePersona('business');
              setActiveStep(0);
            }}
            className={`flex-1 w-full py-3.5 px-5 rounded-xl font-mono text-xs tracking-wider transition-all duration-200 cursor-pointer flex items-center justify-center gap-2.5 ${
              activePersona === 'business'
                ? 'bg-white text-slate-950 font-bold shadow-lg shadow-white/10'
                : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
            }`}
          >
            <Building2 size={16} className={activePersona === 'business' ? 'text-slate-950' : 'text-cyan-400'} />
            <span className="uppercase">{isFr ? 'Opérations & Finances (CEO / CFO)' : 'Operations & Finance (CEO / CFO / COO)'}</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setActivePersona('technical');
              setActiveStep(0);
            }}
            className={`flex-1 w-full py-3.5 px-5 rounded-xl font-mono text-xs tracking-wider transition-all duration-200 cursor-pointer flex items-center justify-center gap-2.5 ${
              activePersona === 'technical'
                ? 'bg-white text-slate-950 font-bold shadow-lg shadow-white/10'
                : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
            }`}
          >
            <Cpu size={16} className={activePersona === 'technical' ? 'text-slate-950' : 'text-cyan-400'} />
            <span className="uppercase">{isFr ? 'Tech & Ingénierie (CTO / CISO)' : 'Tech & Engineering (CTO / VP Eng)'}</span>
          </button>

        </div>

        {/* Interactive Architecture Stage (The Living Blueprint) */}
        <div className="rounded-3xl bg-slate-900/40 border border-white/[0.08] p-8 md:p-12 mb-16 shadow-2xl relative overflow-hidden">
          
          {/* Subtle Stage Ambient Glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/[0.05] blur-3xl pointer-events-none" />

          <div className="relative z-10 space-y-10">
            
            {/* Stage Header Info */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-white/[0.06]">
              <div className="space-y-1">
                <span className="text-[11px] font-mono uppercase tracking-widest text-cyan-400 font-semibold">
                  {activePersona === 'business'
                    ? (isFr ? 'Architecture Applicative & Flux de Revenus' : 'Application Layer: Quote-to-Cash & Operations')
                    : (isFr ? 'Architecture Infonuagique & Souveraineté' : 'Infrastructure Layer: Sovereign Cloud & DevSecOps')
                  }
                </span>
                <h3 className="text-2xl sm:text-3xl font-display font-bold text-white tracking-tight">
                  {activePersona === 'business'
                    ? (isFr ? 'Élimination des Tableurs & ERP Moderne Odoo' : 'Zero Spreadsheet Errors & Turnkey Odoo ERP')
                    : (isFr ? 'Infonuagique Résiliente & FinOps (-30% à -40%)' : 'Sovereign Cloud, FinOps (-30%+) & Zero-Downtime CI/CD')
                  }
                </h3>
              </div>

              {/* Direct Strategy CTA */}
              <button
                type="button"
                onClick={() => handleCardCta(
                  activePersona === 'business' 
                    ? 'Modern ERP & Operations' 
                    : 'Cloud Architecture & FinOps'
                )}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white hover:bg-slate-200 text-slate-950 font-mono font-semibold text-xs uppercase tracking-wider transition-colors shadow-md cursor-pointer self-start md:self-auto shrink-0"
              >
                <span>
                  {activePersona === 'business'
                    ? (isFr ? 'Explorer la Feuille de Route ERP' : 'Explore Operations & ERP Roadmap')
                    : (isFr ? 'Explorer l’Audit FinOps & Cloud' : 'Explore Cloud & DevSecOps Scope')
                  }
                </span>
                <ArrowRight size={13} />
              </button>
            </div>

            {/* Interactive Flow Stepper / Topology */}
            <div className="space-y-4">
              <div className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                {isFr ? 'Flux d’Exécution du Système :' : 'System Architecture Pipeline :'}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {currentPipeline.map((step, idx) => {
                  const isCurrent = activeStep === idx;
                  return (
                    <div
                      key={step.step}
                      onClick={() => setActiveStep(idx)}
                      className={`p-5 rounded-2xl border transition-all duration-200 cursor-pointer space-y-2 flex flex-col justify-between ${
                        isCurrent
                          ? 'bg-slate-950 border-cyan-500/50 shadow-lg shadow-cyan-500/10'
                          : 'bg-slate-950/40 border-white/[0.06] hover:border-white/[0.12] hover:bg-slate-950/70'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className={`text-xs font-mono font-bold ${isCurrent ? 'text-cyan-400' : 'text-slate-500'}`}>
                          Phase {step.step}
                        </span>
                        {isCurrent && (
                          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                        )}
                      </div>

                      <div>
                        <h4 className="text-sm font-display font-bold text-white mb-1">
                          {isFr ? step.titleFr : step.titleEn}
                        </h4>
                        <p className="text-xs text-slate-400 font-light leading-relaxed">
                          {isFr ? step.descFr : step.descEn}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Quantified Executive Deliverables & Proof Comparison */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-8 border-t border-white/[0.06] items-center">
              
              {/* Deliverable Commitments */}
              <div className="lg:col-span-7 space-y-3">
                <div className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-2">
                  {isFr ? 'Garanties d’Ingénierie Associées :' : 'Engineering Commitments & Governance :'}
                </div>

                {activePersona === 'business' ? (
                  <>
                    <div className="flex items-start gap-3 text-xs sm:text-sm text-slate-300 font-light">
                      <CheckCircle2 size={16} className="text-cyan-400 shrink-0 mt-0.5" />
                      <span>{isFr ? 'Remplacement complet des tableurs par un ERP Odoo unifié en moins de 90 jours' : 'Complete replacement of fragmented spreadsheets with unified Odoo ERP under 90 days'}</span>
                    </div>
                    <div className="flex items-start gap-3 text-xs sm:text-sm text-slate-300 font-light">
                      <CheckCircle2 size={16} className="text-cyan-400 shrink-0 mt-0.5" />
                      <span>{isFr ? 'Flux devis-à-facturation automatisés avec rapprochement bancaire canadien (EFT / Stripe)' : 'Automated quote-to-cash workflows with automated Canadian banking reconciliations'}</span>
                    </div>
                    <div className="flex items-start gap-3 text-xs sm:text-sm text-slate-300 font-light">
                      <CheckCircle2 size={16} className="text-cyan-400 shrink-0 mt-0.5" />
                      <span>{isFr ? 'Gestion des stocks multi-entrepôts avec traçabilité complète et codes-barres' : 'Multi-warehouse real-time inventory synchronization with barcode scanning'}</span>
                    </div>
                    <div className="flex items-start gap-3 text-xs sm:text-sm text-slate-300 font-light">
                      <CheckCircle2 size={16} className="text-cyan-400 shrink-0 mt-0.5" />
                      <span>{isFr ? 'Formation personnalisée et soutien direct par des associés seniors bilingues' : 'Direct senior founder training and bilingual post-cutover support in Atlantic Time'}</span>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex items-start gap-3 text-xs sm:text-sm text-slate-300 font-light">
                      <CheckCircle2 size={16} className="text-cyan-400 shrink-0 mt-0.5" />
                      <span>{isFr ? 'Réduction garantie de 30% à 40% des coûts AWS/Azure par audit FinOps et refactorisation IaC' : 'Guaranteed 30–40% reduction in AWS/Azure bills via comprehensive FinOps rightsizing'}</span>
                    </div>
                    <div className="flex items-start gap-3 text-xs sm:text-sm text-slate-300 font-light">
                      <CheckCircle2 size={16} className="text-cyan-400 shrink-0 mt-0.5" />
                      <span>{isFr ? 'Pipelines CI/CD automatisés avec déploiements canaris et retours arrière instantanés' : 'Automated CI/CD deployment pipelines with automated canary verification & instant rollback'}</span>
                    </div>
                    <div className="flex items-start gap-3 text-xs sm:text-sm text-slate-300 font-light">
                      <CheckCircle2 size={16} className="text-cyan-400 shrink-0 mt-0.5" />
                      <span>{isFr ? 'Résidence 100% canadienne garantie (AWS/Azure ca-central) avec conformité LPRPDE & Loi 25' : '100% Canadian data residency guaranteed strictly in ca-central zones with PIPEDA proof'}</span>
                    </div>
                    <div className="flex items-start gap-3 text-xs sm:text-sm text-slate-300 font-light">
                      <CheckCircle2 size={16} className="text-cyan-400 shrink-0 mt-0.5" />
                      <span>{isFr ? 'Collecte continue des preuves SOC 2 Type II et dossier de sécurité pré-packagé pour vos clients' : 'Continuous automated SOC 2 Type II evidence generation and pre-packaged vendor review kit'}</span>
                    </div>
                  </>
                )}
              </div>

              {/* Quantified ROI Stat Cluster */}
              <div className="lg:col-span-5 p-6 rounded-2xl bg-slate-950/80 border border-white/[0.06] space-y-4">
                <div className="text-[11px] font-mono text-slate-400 uppercase tracking-widest pb-3 border-b border-white/[0.06]">
                  {isFr ? 'Indicateurs de Performance Mesurables' : 'Target Executive ROI Metrics'}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {activePersona === 'business' ? (
                    <>
                      <div>
                        <div className="text-2xl sm:text-3xl font-mono font-bold text-white tracking-tight">
                          25+ hrs
                        </div>
                        <div className="text-xs text-slate-400 font-light">
                          {isFr ? 'Récupérées / sem. / département' : 'Saved weekly per department'}
                        </div>
                      </div>
                      <div>
                        <div className="text-2xl sm:text-3xl font-mono font-bold text-white tracking-tight">
                          0
                        </div>
                        <div className="text-xs text-slate-400 font-light">
                          {isFr ? 'Erreur de double saisie' : 'Spreadsheet copy-paste errors'}
                        </div>
                      </div>
                      <div>
                        <div className="text-2xl sm:text-3xl font-mono font-bold text-white tracking-tight">
                          60%
                        </div>
                        <div className="text-xs text-slate-400 font-light">
                          {isFr ? 'Facturation accélérée' : 'Faster invoice collection cycle'}
                        </div>
                      </div>
                      <div>
                        <div className="text-2xl sm:text-3xl font-mono font-bold text-white tracking-tight">
                          &lt; 90 J
                        </div>
                        <div className="text-xs text-slate-400 font-light">
                          {isFr ? 'Mise en production réelle' : 'Full production cutover'}
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div>
                        <div className="text-2xl sm:text-3xl font-mono font-bold text-white tracking-tight">
                          30–40%
                        </div>
                        <div className="text-xs text-slate-400 font-light">
                          {isFr ? 'Baisse de facture garantie' : 'Guaranteed AWS/Azure bill drop'}
                        </div>
                      </div>
                      <div>
                        <div className="text-2xl sm:text-3xl font-mono font-bold text-white tracking-tight">
                          99.99%
                        </div>
                        <div className="text-xs text-slate-400 font-light">
                          {isFr ? 'Disponibilité en production' : 'Operational uptime SLA'}
                        </div>
                      </div>
                      <div>
                        <div className="text-2xl sm:text-3xl font-mono font-bold text-white tracking-tight">
                          &lt; 14 J
                        </div>
                        <div className="text-xs text-slate-400 font-light">
                          {isFr ? 'Audits de sécurité réussis' : 'Enterprise audit fast-pass'}
                        </div>
                      </div>
                      <div>
                        <div className="text-2xl sm:text-3xl font-mono font-bold text-white tracking-tight">
                          100%
                        </div>
                        <div className="text-xs text-slate-400 font-light">
                          {isFr ? 'Données au Canada (ca-central)' : 'Sovereign Canadian residency'}
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default PersonaSelector;
