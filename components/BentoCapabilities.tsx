import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, ShieldCheck, Zap, Server, Database, Lock, Clock, Sparkles } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import bentoConsoleImg from '../src/assets/images/bento_operations_console_1791246023871.jpg';

interface BentoCapabilitiesProps {
  onSchedule: (stream: string) => void;
}

export const BentoCapabilities: React.FC<BentoCapabilitiesProps> = ({ onSchedule }) => {
  const { language } = useLanguage();
  const isFr = language === 'fr';
  const [activeTab, setActiveTab] = useState<'erp' | 'cloud' | 'security'>('erp');

  const disciplines = [
    {
      id: 'erp' as const,
      number: '01',
      streamId: 'Modern ERP & Operations',
      tabLabel: isFr ? '01 · ERP Moderne & Opérations' : '01 · Modern ERP & Operations',
      badge: isFr ? '< 90 Jours en Production' : '< 90 Days Production Go-Live',
      headline: isFr
        ? 'Éliminez les Erreurs de Tableurs & Récupérez 25+ Heures par Semaine'
        : 'Eliminate Spreadsheet Chaos & Reclaim 25+ Hours Weekly per Department',
      description: isFr
        ? 'Centralisez commandes, inventaires multi-entrepôts et comptabilité dans un ERP Odoo clé en main. Nous remplaçons les tableurs fragiles par des flux de facturation automatisés et synchronisés avec Helcim, Stripe et virements EFT canadiens.'
        : 'Centralize sales orders, multi-warehouse inventory, and accounting in a turnkey, composable Odoo ERP. We eliminate fragmented spreadsheets and connect disjointed tools into self-healing quote-to-cash pipelines.',
      metrics: [
        { val: '25+ hrs', label: isFr ? 'Récupérées par semaine' : 'Recovered weekly / dept' },
        { val: '0', label: isFr ? 'Erreurs de saisie manuelle' : 'Manual spreadsheet errors' },
        { val: '< 90 d', label: isFr ? 'Délai moyen de bascule' : 'Turnkey production cutover' }
      ],
      points: isFr ? [
        'Centralisation Odoo ERP sur mesure (CRM, Ventes, Stocks, Comptabilité)',
        'Synchronisation bancaire EFT canadienne & facturation automatisée',
        'Zéro interruption d’affaires lors de la bascule en production'
      ] : [
        'Custom Odoo ERP implementation (CRM, Inventory, Billing, Dispatch)',
        'Canadian EFT bank reconciliations & automated Stripe/Helcim billing',
        'Zero daily operational downtime during live data migration'
      ],
      buttonText: isFr ? 'Planifier cette Initiative ERP' : 'Schedule ERP Discovery',
      highlightTag: 'Turnkey Odoo Engine'
    },
    {
      id: 'cloud' as const,
      number: '02',
      streamId: 'Cloud Architecture & FinOps',
      tabLabel: isFr ? '02 · Cloud & FinOps (-35%)' : '02 · Cloud FinOps (-35% Spend)',
      badge: isFr ? '-35% Dépenses Infonuagiques' : '-35% Cloud Spend Reduction',
      headline: isFr
        ? 'Baisse Garantie de 30–40% des Factures AWS et Azure'
        : 'Guaranteed 30–40% Reduction in AWS and Azure Cloud Bills',
      description: isFr
        ? 'Cessez de gaspiller votre budget dans des serveurs surdimensionnés. Nous restructurons vos environnements dans les régions canadiennes avec Terraform IaC et des déploiements sans coupure.'
        : 'Stop bleeding budget on idle, over-provisioned cloud infrastructure. We refactor your cloud footprint in Canadian sovereign zones using immutable Terraform IaC, deploying automated canary CI/CD with instant rollbacks.',
      metrics: [
        { val: '30–40%', label: isFr ? 'Baisse de facture garantie' : 'Guaranteed bill reduction' },
        { val: '$18k–$94k', label: isFr ? 'Économies annuelles moyennes' : 'Annual client budget saved' },
        { val: '99.99%', label: isFr ? 'Disponibilité SLA' : 'Operational uptime SLA' }
      ],
      points: isFr ? [
        'Audit exhaustif FinOps du gaspillage et des instances inactives',
        'Infrastructures immuables codifiées avec Terraform / OpenTofu',
        'Pipelines CI/CD automatisés avec retours arrière instantanés'
      ] : [
        'Exhaustive FinOps rightsizing audit & idle cloud resource cleanup',
        'Immutable infrastructure codified with Terraform / OpenTofu IaC',
        'Automated zero-downtime canary CI/CD with instant rollbacks'
      ],
      buttonText: isFr ? 'Planifier l’Audit Infonuagique' : 'Schedule Cloud FinOps Audit',
      highlightTag: 'Terraform IaC & FinOps'
    },
    {
      id: 'security' as const,
      number: '03',
      streamId: 'Cybersecurity & Canadian Sovereignty',
      tabLabel: isFr ? '03 · Souveraineté & Sécurité' : '03 · Sovereign Security & Compliance',
      badge: isFr ? '100% Données au Canada' : '100% Canadian Data Residency',
      headline: isFr
        ? 'Verrouillez Vos Données & Réussissez les Audits de Sécurité en Moins de 14 Jours'
        : 'Lock Down Corporate Data & Pass Enterprise Customer Security Reviews in < 14 Days',
      description: isFr
        ? 'Remportez des contrats corporatifs majeurs et répondez aux exigences des assureurs. Nous déployons le Zéro Confiance, la collecte continue des preuves pour LPRPDE, Loi 25 (Québec) et SOC 2, avec résidence garantie 100% au Canada.'
        : 'Win larger enterprise contracts and satisfy cyber insurance mandates without panic. We enforce Zero Trust identity, continuous audit evidence generation, and 100% sovereign Canadian data residency in AWS/Azure ca-central.',
      metrics: [
        { val: '< 14 d', label: isFr ? 'Délai de préparation audit' : 'Audit readiness horizon' },
        { val: '100%', label: isFr ? 'Résidence ca-central' : 'Canadian ca-central residency' },
        { val: 'Zero', label: isFr ? 'Exposition CLOUD Act' : 'Foreign cloud risk exposure' }
      ],
      points: isFr ? [
        'Résidence stricte dans les centres de données canadiens (Montréal / Calgary)',
        'Architecture Zéro Confiance (mTLS, clés gérées par le client)',
        'Collecte automatisée des preuves d’audit pour SOC 2, LPRPDE et Loi 25'
      ] : [
        'Strict domestic residency in Canadian zones (Montreal / Calgary)',
        'Zero Trust IAM architecture with Customer Managed Keys (CMK)',
        'Continuous automated evidence generation for SOC 2, PIPEDA, & Law 25'
      ],
      buttonText: isFr ? 'Planifier l’Audit Sécurité' : 'Schedule Security Discovery',
      highlightTag: 'Zero Trust & Law 25'
    }
  ];

  const current = disciplines.find(d => d.id === activeTab) || disciplines[0];

  return (
    <section 
      id="core-disciplines" 
      aria-label={isFr ? "Disciplines d'Ingénierie" : "Engineering Disciplines"}
      className="py-20 md:py-28 px-6 sm:px-8 lg:px-12 bg-[#040815] border-t border-white/[0.06]"
    >
      <div className="container mx-auto max-w-6xl space-y-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-2 border-b border-white/[0.06]">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2 text-xs font-mono font-medium tracking-widest text-cyan-400 uppercase select-none">
              <span>01</span>
              <span className="text-slate-600" aria-hidden="true">·</span>
              <span>{isFr ? 'DISCIPLINES D’INGÉNIERIE CLÉS' : 'CORE ENGINEERING DISCIPLINES'}</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-display font-bold text-white tracking-tight leading-tight">
              {isFr 
                ? 'Trois Piliers Modulaires. Zéro Jargon Inutile.' 
                : 'Three Focused Disciplines. Measurable Velocity.'}
            </h2>

            <p className="text-slate-400 text-sm font-light leading-relaxed">
              {isFr
                ? 'Une architecture de services conçue pour éliminer les frictions administratives, réduire les coûts d’infrastructure et sécuriser vos données au Canada.'
                : 'A clean, modular delivery model designed to eliminate manual administrative toil, optimize cloud bills, and guarantee audit-ready data sovereignty.'}
            </p>
          </div>

          {/* Quick Stat Pill */}
          <div className="text-xs font-mono text-slate-400 flex items-center gap-2 shrink-0">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span>{isFr ? 'Mise en production < 90 jours' : 'Production Go-Live < 90 Days'}</span>
          </div>
        </div>

        {/* Minimalist Interactive Tab Switcher (Quiet, Zero-Noise Navigation) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {disciplines.map((d) => {
            const isSelected = activeTab === d.id;
            return (
              <button
                key={d.id}
                type="button"
                onClick={() => setActiveTab(d.id)}
                className={`p-4 rounded-2xl text-left transition-all duration-200 cursor-pointer border flex flex-col justify-between gap-2 ${
                  isSelected
                    ? 'bg-[#090E1D] border-cyan-500/50 shadow-lg shadow-cyan-950/20'
                    : 'bg-[#060A14]/70 border-white/[0.06] hover:border-white/[0.15] text-slate-400 hover:text-slate-200'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className={`text-xs font-mono font-bold ${isSelected ? 'text-cyan-400' : 'text-slate-500'}`}>
                    {d.number}
                  </span>
                  <span className={`text-[11px] font-mono ${isSelected ? 'text-emerald-400 font-semibold' : 'text-slate-500'}`}>
                    {d.badge}
                  </span>
                </div>
                <div className={`text-sm font-display font-bold tracking-tight ${isSelected ? 'text-white' : 'text-slate-300'}`}>
                  {d.tabLabel.split(' · ')[1]}
                </div>
              </button>
            );
          })}
        </div>

        {/* The Focused Discipline Showcase Card (Single Pristine Stage, Zero Clutter) */}
        <div className="rounded-3xl bg-[#090E1D]/95 border border-white/[0.08] shadow-2xl p-8 sm:p-12 transition-all duration-300">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Column: Scope, Value Proposition & Key Metrics */}
            <div className="lg:col-span-7 space-y-6">
              
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-cyan-950/50 text-cyan-300 border border-cyan-500/30">
                  {current.highlightTag}
                </span>
                <span className="text-xs font-mono text-slate-400">
                  {current.badge}
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-display font-bold text-white tracking-tight leading-snug">
                {current.headline}
              </h3>

              <p className="text-slate-300 text-sm sm:text-base font-light leading-relaxed">
                {current.description}
              </p>

              {/* Concrete Points */}
              <div className="space-y-2.5 pt-2 text-xs sm:text-sm font-mono text-slate-300">
                {current.points.map((pt, idx) => (
                  <div key={idx} className="flex items-start gap-2.5">
                    <CheckCircle2 size={15} className="text-cyan-400 shrink-0 mt-0.5" />
                    <span>{pt}</span>
                  </div>
                ))}
              </div>

              {/* Quantified Metrics Row */}
              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-white/[0.08]">
                {current.metrics.map((m, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="text-2xl sm:text-3xl font-mono font-bold text-white">{m.val}</div>
                    <div className="text-[11px] text-slate-400 font-light">{m.label}</div>
                  </div>
                ))}
              </div>

              {/* Action Button */}
              <div className="pt-4 flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={() => onSchedule(current.streamId)}
                  className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl bg-white hover:bg-slate-200 text-slate-950 font-mono font-semibold text-xs uppercase tracking-wider transition-all duration-150 cursor-pointer shadow-md"
                >
                  <span>{current.buttonText}</span>
                  <ArrowRight size={13} />
                </button>

                <span className="text-xs font-mono text-slate-500">
                  {isFr ? 'Discussion directe avec les fondateurs · Sans engagement' : 'Direct senior engineering conversation · Non-binding'}
                </span>
              </div>

            </div>

            {/* Right Column: Visual Telemetry / Operations Graphic */}
            <div className="lg:col-span-5">
              <div className="rounded-2xl overflow-hidden border border-white/[0.08] bg-[#050811] shadow-xl relative group">
                <img 
                  src={bentoConsoleImg} 
                  alt={isFr ? "Console d'opérations et ERP moderne" : "Modern Operations & Composable ERP Console"}
                  className="w-full aspect-[4/3] object-cover object-center group-hover:scale-[1.02] transition-transform duration-500"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#090E1D] via-transparent to-transparent pointer-events-none" />
                
                {/* Live System Indicator Badge */}
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs font-mono text-cyan-300 bg-[#090E1D]/90 px-3.5 py-2 rounded-xl border border-white/[0.08] backdrop-blur-md">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span>{current.highlightTag}</span>
                  </div>
                  <span className="text-emerald-400 font-semibold">{current.badge}</span>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

export default BentoCapabilities;
