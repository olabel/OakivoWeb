import React, { useState } from 'react';
import { ArrowUpRight, CheckCircle2, TrendingDown, Clock, ShieldCheck, ArrowRight, Building2, Truck, Cloud, Lock } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { Link } from 'react-router-dom';

export const ExecutiveCaseStudies: React.FC = () => {
  const { language } = useLanguage();
  const isFr = language === 'fr';
  const [selectedIdx, setSelectedIdx] = useState(0);

  const studies = [
    {
      id: 'logistics',
      sectorEn: 'Supply Chain & Multi-Warehouse Logistics',
      sectorFr: 'Chaîne Logistique & Multi-Entrepôts',
      icon: Truck,
      tabTitleEn: 'Logistics ERP (78 Days)',
      tabTitleFr: 'ERP Logistique (78 Jours)',
      titleEn: 'Consolidating 40+ Spreadsheets into Turnkey Odoo ERP in 78 Days',
      titleFr: 'Consolidation de 40+ Tableurs dans un ERP Odoo en 78 Jours',
      clientEn: 'Atlantic Canada Regional Logistics Operator (180+ Employees)',
      clientFr: 'Opérateur Logistique Régional en Atlantique (180+ Employés)',
      challengeEn: 'Dispatch, multi-warehouse inventory, and billing were managed across fragile Excel sheets, creating frequent duplicate entries and 3-day billing delays.',
      challengeFr: 'Les expéditions, inventaires et factures étaient fragmentés dans Excel, provoquant des erreurs de double saisie et 3 jours de retard de facturation.',
      solutionEn: 'Architected turnkey bilingual Odoo ERP with live barcode scanners, automated GST/HST rules, and automated Canadian EFT bank reconciliations.',
      solutionFr: 'Déploiement d’Odoo ERP bilingue clé en main avec lecteurs code-barres en direct, règles TPS/TVH et rapprochement bancaire EFT automatisé.',
      metrics: [
        { val: '32 hrs', labelEn: 'Reclaimed weekly / dept', labelFr: 'Récupérées par semaine' },
        { val: '0', labelEn: 'Manual spreadsheet errors', labelFr: 'Erreurs de tableur' },
        { val: '78 Days', labelEn: 'Total time to production cutover', labelFr: 'Délai total de bascule' }
      ]
    },
    {
      id: 'cloud',
      sectorEn: 'SaaS & Regulated Health Data',
      sectorFr: 'SaaS & Données de Santé Réglementées',
      icon: Cloud,
      tabTitleEn: 'Cloud FinOps ($192k Saved)',
      tabTitleFr: 'FinOps Cloud (192 k$ Économisés)',
      titleEn: 'Slicing $16,000/Month (38%) from AWS Bills via Terraform FinOps',
      titleFr: 'Réduction de 16 000 $/mois (38%) des Coûts AWS via Terraform FinOps',
      clientEn: 'High-Growth Canadian Technology Platform',
      clientFr: 'Plateforme Technologique Canadienne en Forte Croissance',
      challengeEn: 'Unmonitored cloud sprawl across multiple AWS accounts led to ballooning monthly bills with over 40% idle compute and unattached EBS volumes.',
      challengeFr: 'La prolifération des ressources AWS non surveillées a fait exploser les coûts avec plus de 40% de serveurs inactifs et disques orphelins.',
      solutionEn: 'Codified infrastructure using immutable Terraform IaC strictly in ca-central-1, right-sizing instance families and instituting automated canary CI/CD.',
      solutionFr: 'Codification immuable sous Terraform IaC dans ca-central-1, dimensionnement dynamique et mise en place de déploiements canaris sans coupure.',
      metrics: [
        { val: '38%', labelEn: 'Permanent cloud bill cut', labelFr: 'Baisse permanente de facture' },
        { val: '$192k', labelEn: 'Annualized budget saved', labelFr: 'Économie annuelle totale' },
        { val: '99.99%', labelEn: 'Live operational SLA', labelFr: 'Disponibilité SLA en direct' }
      ]
    },
    {
      id: 'fintech',
      sectorEn: 'Commercial Financial Services',
      sectorFr: 'Services Financiers Commerciaux',
      icon: Lock,
      tabTitleEn: 'Bank Security Review (11 Days)',
      tabTitleFr: 'Audit Bancaire (11 Jours)',
      titleEn: 'Passing Tier-1 Bank Customer Security Review in 11 Business Days',
      titleFr: 'Réussite de l’Audit de Sécurité Bancaire en 11 Jours Ouvrables',
      clientEn: 'B2B Enterprise Payment & Settlement Provider',
      clientFr: 'Fournisseur de Solutions de Paiement B2B',
      challengeEn: 'A Fortune 500 financial prospect issued a 240-question vendor security questionnaire and mandated Canadian data residency with zero foreign exposure.',
      challengeFr: 'Un client corporatif bancaire exigeait un questionnaire de 240 contrôles et la preuve stricte de résidence des données au Canada.',
      solutionEn: 'Enforced Zero Trust IAM, automated continuous compliance telemetry for PIPEDA and SOC 2, and produced an institutional audit response dossier.',
      solutionFr: 'Déploiement du Zéro Confiance, télémétrie continue pour LPRPDE et SOC 2, et remise d’un dossier complet de conformité institutionnelle.',
      metrics: [
        { val: '11 Days', labelEn: 'From audit to contract approval', labelFr: 'De l’audit à la signature' },
        { val: '100%', labelEn: 'Canadian data residency', labelFr: 'Résidence souveraine' },
        { val: 'Zero', labelEn: 'Foreign data risk exposure', labelFr: 'Exposition juridique US' }
      ]
    }
  ];

  const current = studies[selectedIdx];
  const IconComponent = current.icon;

  return (
    <section 
      id="case-studies" 
      aria-label={isFr ? "Études de Cas & Résultats" : "Case Studies & Measurable Outcomes"}
      className="py-20 md:py-28 px-6 sm:px-8 lg:px-12 bg-[#030712] border-t border-white/[0.06]"
    >
      <div className="container mx-auto max-w-6xl space-y-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-2 border-b border-white/[0.06]">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2 text-xs font-mono font-medium tracking-widest text-cyan-400 uppercase select-none">
              <span>02</span>
              <span className="text-slate-600" aria-hidden="true">·</span>
              <span>{isFr ? 'RÉSULTATS MESURABLES' : 'MEASURABLE OUTCOMES'}</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-display font-bold text-white tracking-tight leading-tight">
              {isFr 
                ? 'Des Résultats Concrets. Aucun Récit Théorique.' 
                : 'Proven Impact. Quantified Return on Investment.'}
            </h2>

            <p className="text-slate-400 text-sm font-light leading-relaxed">
              {isFr
                ? 'Trois initiatives récentes menées pour des entreprises canadiennes en forte croissance.'
                : 'Inspect how ambitious Canadian mid-market organizations eliminate manual friction, reduce cloud spend, and satisfy enterprise audits.'}
            </p>
          </div>

          <Link
            to="/case-studies"
            className="inline-flex items-center gap-1.5 text-xs font-mono text-cyan-400 hover:text-cyan-300 transition-colors uppercase tracking-wider shrink-0"
          >
            <span>{isFr ? 'Voir Toutes les Études' : 'View All Case Studies'}</span>
            <ArrowRight size={13} />
          </Link>
        </div>

        {/* Minimalist Sector Selector Tabs */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {studies.map((item, idx) => {
            const isSelected = selectedIdx === idx;
            const TabIcon = item.icon;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setSelectedIdx(idx)}
                className={`p-4 rounded-2xl text-left transition-all duration-200 cursor-pointer border flex items-center justify-between gap-3 ${
                  isSelected
                    ? 'bg-[#090E1D] border-cyan-500/50 shadow-lg shadow-cyan-950/20 text-white'
                    : 'bg-[#060A14]/70 border-white/[0.06] hover:border-white/[0.15] text-slate-400 hover:text-slate-200'
                }`}
              >
                <div className="flex items-center gap-3">
                  <TabIcon size={16} className={isSelected ? 'text-cyan-400' : 'text-slate-500'} />
                  <span className="text-xs sm:text-sm font-display font-bold tracking-tight">
                    {isFr ? item.tabTitleFr : item.tabTitleEn}
                  </span>
                </div>
                <span className={`text-[11px] font-mono ${isSelected ? 'text-cyan-400 font-bold' : 'text-slate-600'}`}>
                  0{idx + 1}
                </span>
              </button>
            );
          })}
        </div>

        {/* The Focused Case Study Presentation Card */}
        <div className="rounded-3xl bg-[#090E1D]/95 border border-white/[0.08] shadow-2xl p-8 sm:p-12 transition-all duration-300">
          <div className="space-y-8">
            
            {/* Header info */}
            <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-white/[0.06]">
              <div className="space-y-1">
                <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest block">
                  {isFr ? current.sectorFr : current.sectorEn}
                </span>
                <span className="text-xs font-mono text-slate-400">
                  {isFr ? current.clientFr : current.clientEn}
                </span>
              </div>
              <div className="px-3.5 py-1.5 rounded-full bg-cyan-950/40 border border-cyan-500/30 text-xs font-mono text-cyan-300">
                {isFr ? 'Dossier de Production Validé' : 'Production Verified'}
              </div>
            </div>

            {/* Headline */}
            <h3 className="text-2xl sm:text-3xl font-display font-bold text-white tracking-tight leading-snug max-w-4xl">
              {isFr ? current.titleFr : current.titleEn}
            </h3>

            {/* Two-column Comparison: The Bottleneck vs The Engineering Solution */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-5 rounded-2xl bg-[#050812] border border-white/[0.06] space-y-2">
                <div className="text-xs font-mono text-amber-400/90 font-bold uppercase tracking-wider">
                  {isFr ? 'Le Défi Initial (Friction)' : 'The Operational Friction'}
                </div>
                <p className="text-slate-300 text-xs sm:text-sm font-light leading-relaxed">
                  {isFr ? current.challengeFr : current.challengeEn}
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-[#050812] border border-cyan-500/20 space-y-2">
                <div className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider">
                  {isFr ? 'La Solution d’Ingénierie Oakivo' : 'The Turnkey Engineering Solution'}
                </div>
                <p className="text-slate-300 text-xs sm:text-sm font-light leading-relaxed">
                  {isFr ? current.solutionFr : current.solutionEn}
                </p>
              </div>
            </div>

            {/* 3 Hard Quantified Numbers */}
            <div className="grid grid-cols-3 gap-6 pt-6 border-t border-white/[0.08]">
              {current.metrics.map((m, mIdx) => (
                <div key={mIdx} className="space-y-1">
                  <div className="text-2xl sm:text-4xl font-mono font-bold text-white tracking-tight">
                    {m.val}
                  </div>
                  <div className="text-xs text-slate-400 font-light">
                    {isFr ? m.labelFr : m.labelEn}
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

export default ExecutiveCaseStudies;
