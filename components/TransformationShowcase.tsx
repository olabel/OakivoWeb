import React, { useState } from 'react';
import { 
  Database, Zap, Palette, ShieldCheck, ArrowRight, CheckCircle2, 
  XCircle, Clock, Sparkles, TrendingUp, Layers
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface PillarTab {
  id: string;
  num: string;
  nameEn: string;
  nameFr: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  taglineEn: string;
  taglineFr: string;
  timeframeEn: string;
  timeframeFr: string;
  beforeTitleEn: string;
  beforeTitleFr: string;
  beforeItemsEn: string[];
  beforeItemsFr: string[];
  afterTitleEn: string;
  afterTitleFr: string;
  afterItemsEn: string[];
  afterItemsFr: string[];
  deliverablesEn: string[];
  deliverablesFr: string[];
}

export const TransformationShowcase: React.FC = () => {
  const { language } = useLanguage();
  const isFr = language === 'fr';

  const tabs: PillarTab[] = [
    {
      id: 'erp',
      num: '01',
      nameEn: 'Modern ERP',
      nameFr: 'ERP Moderne',
      icon: Database,
      taglineEn: 'One synchronized platform for sales, stock, and finances.',
      taglineFr: 'Une plateforme unique synchronisant ventes, stocks et finances.',
      timeframeEn: 'Live in under 90 days',
      timeframeFr: 'Déploiement en moins de 90 jours',
      beforeTitleEn: 'The Fragmented Reality',
      beforeTitleFr: 'La Réalité Fragmentée',
      beforeItemsEn: [
        'Staff re-typing sales orders across 4 separate spreadsheets with sync errors',
        'Sales reps promising inventory that has already been dispatched',
        'Finance team spending a week at month-end fixing manual discrepancies'
      ],
      beforeItemsFr: [
        'Équipes ressaisissant les commandes sur 4 tableurs avec erreurs fréquentes',
        'Commerciaux vendant des articles déjà en rupture de stock',
        'Semaine entière perdue en fin de mois pour réconcilier les chiffres'
      ],
      afterTitleEn: 'The Oakivo Transformed State',
      afterTitleFr: 'L’État Transformé avec Oakivo',
      afterItemsEn: [
        'Single real-time source of truth for CRM, inventory, invoices, and accounting',
        'Zero manual copy-pasting between departments or warehouse teams',
        'Live profit margin visibility and automated stock replenishment alerts'
      ],
      afterItemsFr: [
        'Source de données unique en temps réel pour CRM, stocks, facturation et comptabilité',
        'Zéro copier-coller manuel entre les services ou les équipes d’entrepôt',
        'Visibilité instantanée des marges et alertes de réapprovisionnement automatiques'
      ],
      deliverablesEn: [
        'Tailored modern ERP modules',
        'Complete historical data migration',
        'Hands-on bilingual staff training',
        'Post-deployment warranty'
      ],
      deliverablesFr: [
        'Modules ERP modernes sur mesure',
        'Migration intégrale des données historiques',
        'Formation pratique bilingue de vos employés',
        'Garantie et accompagnement post-lancement'
      ]
    },
    {
      id: 'automation',
      num: '02',
      nameEn: 'Workflow Automation',
      nameFr: 'Automatisation des Flux',
      icon: Zap,
      taglineEn: 'Hands-free quote-to-cash and automatic invoice reconciliation.',
      taglineFr: 'Cycle devis-facturation automatisé et encaissements plus rapides.',
      timeframeEn: 'Live in 2 to 4 weeks',
      timeframeFr: 'Opérationnel en 2 à 4 semaines',
      beforeTitleEn: 'The Manual Grind',
      beforeTitleFr: 'La Routine Manuelle',
      beforeItemsEn: [
        'Orders sit in email threads for days before invoices get generated',
        'Manual payment matching against bank statements causing delayed collections',
        'Staff spending 20+ hours a week on repetitive administrative busywork'
      ],
      beforeItemsFr: [
        'Commandes bloquées dans des courriels avant l’émission des factures',
        'Rapprochement bancaire manuel entraînant des retards d’encaissement',
        'Équipes consacrant 20+ heures par semaine à de la bureaucratie répétitive'
      ],
      afterTitleEn: 'The Oakivo Transformed State',
      afterTitleFr: 'L’État Transformé avec Oakivo',
      afterItemsEn: [
        'Instant automated invoice generation and dispatch the moment orders ship',
        'Direct Canadian bank feed reconciliation and automated payment reminders',
        '25+ hours recovered weekly per department to focus on client service'
      ],
      afterItemsFr: [
        'Émission et envoi automatiques de la facture dès confirmation de livraison',
        'Rapprochement bancaire canadien direct et relances de paiement automatiques',
        '25+ heures récupérées par semaine par service pour servir vos clients'
      ],
      deliverablesEn: [
        'Self-healing quote-to-cash pipeline',
        'Bi-directional bank & CRM synchronization',
        'Custom webhook & API connections',
        'Real-time cash flow notifications'
      ],
      deliverablesFr: [
        'Pipeline devis-facturation auto-cicatrisant',
        'Synchronisation bidirectionnelle banque & CRM',
        'Ponts API et connecteurs personnalisés',
        'Alertes de trésorerie en temps réel'
      ]
    },
    {
      id: 'web',
      num: '03',
      nameEn: 'Creative Web Design',
      nameFr: 'Conception Web Créative',
      icon: Palette,
      taglineEn: 'Fast, bespoke websites that win customer trust and convert visitors.',
      taglineFr: 'Des sites web rapides et sur mesure qui renforcent votre autorité.',
      timeframeEn: 'Launch in 3 to 5 weeks',
      timeframeFr: 'Lancement en 3 à 5 semaines',
      beforeTitleEn: 'The Outdated Impression',
      beforeTitleFr: 'L’Image Vieillissante',
      beforeItemsEn: [
        'Outdated template site taking 5+ seconds to load on mobile devices',
        'Weak Google search visibility and zero local search presence in your market',
        'Generic styling that looks indistinguishable from low-cost competitors'
      ],
      beforeItemsFr: [
        'Site web vieillissant mettant 5+ secondes à charger sur mobile',
        'Faible visibilité sur Google et quasi-absence sur votre marché régional',
        'Apparence générique qui ne vous distingue pas de concurrents bas de gamme'
      ],
      afterTitleEn: 'The Oakivo Transformed State',
      afterTitleFr: 'L’État Transformé avec Oakivo',
      afterItemsEn: [
        'Bespoke, brand-aligned visual design that commands immediate executive credibility',
        'Blazing-fast load speeds with modern responsive mobile architecture',
        'Google technical SEO & inquiry pipelines funnelling leads directly into your inbox'
      ],
      afterItemsFr: [
        'Design visuel unique qui assoit immédiatement votre crédibilité professionnelle',
        'Vitesse de chargement fulgurante et expérience mobile irréprochable',
        'Référencement technique Google et formulaires connectés directement à votre boîte courriel'
      ],
      deliverablesEn: [
        'Custom interactive design & typography',
        'Mobile-first responsive engineering',
        'Technical SEO & schema metadata',
        'Connected lead capture forms'
      ],
      deliverablesFr: [
        'Direction artistique & typographie sur mesure',
        'Développement web mobile-first réactif',
        'Référencement technique SEO & métadonnées',
        'Formulaires de contact reliés'
      ]
    },
    {
      id: 'cloud',
      num: '04',
      nameEn: 'Sovereign Cloud & Security',
      nameFr: 'Cloud Souverain & Sécurité',
      icon: ShieldCheck,
      taglineEn: '100% Canadian data residency with 24/7 automated compliance proof.',
      taglineFr: 'Résidence des données 100 % au Canada et conformité continue.',
      timeframeEn: 'Active from Day 1',
      timeframeFr: 'Actif dès le premier jour',
      beforeTitleEn: 'The Compliance Anxiety',
      beforeTitleFr: 'L’Inquiétude Réglementaire',
      beforeItemsEn: [
        'Customer records sitting in US cloud zones exposed to US CLOUD Act subpoenas',
        'Panic whenever an enterprise client sends a 40-page vendor security questionnaire',
        'Untested backups with hours or days of potential downtime in an incident'
      ],
      beforeItemsFr: [
        'Données clients stockées aux États-Unis et exposées aux requêtes de justice étrangères',
        'Panique à chaque questionnaire de sécurité complexe envoyé par un client corporatif',
        'Sauvegardes non vérifiées avec risque de jours d’arrêt en cas d’incident'
      ],
      afterTitleEn: 'The Oakivo Transformed State',
      afterTitleFr: 'L’État Transformé avec Oakivo',
      afterItemsEn: [
        'Data pinned strictly to certified Canadian sovereign availability zones (AWS / Azure)',
        'Continuous automated evidence for SOC 2, PIPEDA, and Law 25 compliance',
        'Hardened cloud infrastructure with 99.99% uptime SLA and automated daily backups'
      ],
      afterItemsFr: [
        'Données stockées exclusivement dans des zones certifiées au Canada (AWS / Azure)',
        'Collecte continue automatisée de preuves d’audit pour LPRPDE, Loi 25 et SOC 2',
        'Infrastructure infonuagique durcie avec SLA de 99,99 % et sauvegardes quotidiennes'
      ],
      deliverablesEn: [
        'Sovereign Canadian cloud hosting',
        'Zero Trust access & encryption at rest',
        'Continuous compliance audit package',
        'Automated disaster recovery protocols'
      ],
      deliverablesFr: [
        'Hébergement infonuagique canadien souverain',
        'Contrôles Zéro Confiance & chiffrement fort',
        'Dossier de conformité prêt pour vos clients',
        'Plan de continuité et reprise automatisé'
      ]
    }
  ];

  const [activeTabId, setActiveTabId] = useState<string>('erp');
  const activeTab = tabs.find(t => t.id === activeTabId) || tabs[0];
  const ActiveIcon = activeTab.icon;

  const handleOpenDiscovery = () => {
    window.dispatchEvent(new CustomEvent('open-lead-drawer', {
      detail: {
        focus: isFr ? activeTab.nameFr : activeTab.nameEn,
        topic: isFr ? `Transformation ${activeTab.nameFr}` : `${activeTab.nameEn} Transformation`,
      }
    }));
  };

  return (
    <section className="py-20 md:py-28 px-6 bg-[#080C14] border-t border-white/[0.06] relative">
      <div className="container mx-auto max-w-7xl">
        
        {/* Section Heading */}
        <div className="max-w-3xl mb-12 space-y-3">
          <div className="text-xs font-mono font-bold tracking-widest text-cyan-400 uppercase flex items-center gap-2">
            <Sparkles size={14} />
            <span>{isFr ? 'LA TRANSFORMATION EN ACTION' : 'THE TRANSFORMATION IN ACTION'}</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-display font-bold tracking-tight text-white leading-tight">
            {isFr 
              ? 'Ce qui change concrètement dans votre entreprise.'
              : 'What actually changes when you work with us.'
            }
          </h2>
          <p className="text-slate-400 font-light text-base md:text-lg">
            {isFr
              ? 'Cliquez sur l’un de nos domaines pour comparer la réalité quotidienne avant et après notre intervention.'
              : 'Select any area below to compare the daily reality before and after our senior team steps in.'
            }
          </p>
        </div>

        {/* Pillar Tabs Bar */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = tab.id === activeTab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTabId(tab.id)}
                className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex items-center gap-3 relative ${
                  isActive 
                    ? 'bg-slate-900 border-cyan-500/60 text-white shadow-xl shadow-cyan-500/10' 
                    : 'bg-slate-950/60 border-slate-800/80 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                }`}
              >
                <div className={`p-2.5 rounded-xl shrink-0 transition-colors ${isActive ? 'bg-cyan-500/20 text-cyan-300' : 'bg-slate-900 text-slate-400'}`}>
                  <Icon size={20} />
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-400 font-bold block">
                    Pillar {tab.num}
                  </span>
                  <span className="text-sm font-bold block mt-0.5">
                    {isFr ? tab.nameFr : tab.nameEn}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Interactive Comparison Card */}
        <div className="bg-slate-900/60 backdrop-blur-md rounded-3xl border border-white/[0.08] p-6 md:p-10 shadow-2xl relative overflow-hidden">
          
          {/* Header of Active Tab */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-8 border-b border-white/[0.06]">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 shrink-0">
                <ActiveIcon size={24} />
              </div>
              <div>
                <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight">
                  {isFr ? activeTab.nameFr : activeTab.nameEn}
                </h3>
                <p className="text-xs md:text-sm text-slate-400 font-light mt-0.5">
                  {isFr ? activeTab.taglineFr : activeTab.taglineEn}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 self-start sm:self-auto px-3.5 py-1.5 rounded-full bg-cyan-950/40 border border-cyan-500/30 text-cyan-300 text-xs font-mono font-semibold shrink-0">
              <Clock size={13} />
              <span>{isFr ? activeTab.timeframeFr : activeTab.timeframeEn}</span>
            </div>
          </div>

          {/* Side-by-side Before vs After Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 mb-8">
            
            {/* The Old Way */}
            <div className="bg-red-950/15 border border-red-900/30 rounded-2xl p-6 space-y-4">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-red-400 font-bold">
                <XCircle size={16} />
                <span>{isFr ? activeTab.beforeTitleFr : activeTab.beforeTitleEn}</span>
              </div>
              <ul className="space-y-3">
                {(isFr ? activeTab.beforeItemsFr : activeTab.beforeItemsEn).map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300 font-light leading-relaxed">
                    <span className="text-red-400 shrink-0 font-bold select-none">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* The Oakivo Way */}
            <div className="bg-cyan-950/20 border border-cyan-500/30 rounded-2xl p-6 space-y-4">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-cyan-400 font-bold">
                <CheckCircle2 size={16} />
                <span>{isFr ? activeTab.afterTitleFr : activeTab.afterTitleEn}</span>
              </div>
              <ul className="space-y-3">
                {(isFr ? activeTab.afterItemsFr : activeTab.afterItemsEn).map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-200 font-medium leading-relaxed">
                    <CheckCircle2 size={16} className="text-emerald-400 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>

          {/* Deliverables Footer Bar */}
          <div className="pt-6 border-t border-white/[0.06] flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <span className="text-[11px] font-mono uppercase tracking-widest text-slate-400 block mb-2 font-semibold">
                {isFr ? 'Livrables Clés de la Mission :' : 'Key Project Deliverables:'}
              </span>
              <div className="flex flex-wrap gap-2">
                {(isFr ? activeTab.deliverablesFr : activeTab.deliverablesEn).map((d, idx) => (
                  <span key={idx} className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-800/80 border border-slate-700/80 text-xs font-medium text-slate-200">
                    <CheckCircle2 size={12} className="text-cyan-400" />
                    <span>{d}</span>
                  </span>
                ))}
              </div>
            </div>

            <button
              type="button"
              onClick={handleOpenDiscovery}
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white hover:bg-slate-200 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all duration-200 shadow-md hover:shadow-cyan-500/20 cursor-pointer shrink-0"
            >
              <span>{isFr ? 'Discuter de ce Projet (30 min)' : 'Explore This Solution (30 min)'}</span>
              <ArrowRight size={14} />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};

export default TransformationShowcase;
