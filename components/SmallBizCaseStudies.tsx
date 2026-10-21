import React, { useState } from 'react';
import { 
  Building2, TrendingUp, Clock, CheckCircle2, 
  ArrowRight, Sparkles, ShieldCheck, DollarSign, Wrench, 
  Stethoscope, Truck, Code2, AlertCircle, FileCheck
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const SmallBizCaseStudies: React.FC = () => {
  const { language } = useLanguage();
  const isFr = language === 'fr';

  const [activeStudy, setActiveStudy] = useState<number>(0);

  const blueprints = [
    {
      sector: isFr ? 'Métiers Spécialisés & Entrepreneurs' : 'Trades & Field Contracting',
      subSector: isFr ? 'CVC, Électricité, Plomberie & Toiture (Équipes de 3 à 15 personnes)' : 'HVAC, Electrical, Plumbing & Roofing (Teams of 3 to 15)',
      icon: Wrench,
      targetGoal: isFr 
        ? 'Stopper les devis perdus & supprimer 6 à 10 h de paperasse par semaine' 
        : 'Stop lost leads after-hours & eliminate 6 to 10h of weekly paperwork',
      problem: isFr
        ? 'Les demandes de prix reçues le soir ou le week-end attendent souvent plusieurs jours. Les reçus de pièces traînent dans les camions, et les devis envoyés ne sont jamais relancés par manque de temps.'
        : 'Evening and weekend quote inquiries sit in inboxes for days while crews are on site. Parts receipts get lost in truck consoles, and sent estimates are rarely followed up on due to time constraints.',
      solution: isFr
        ? 'Répondeur SMS intelligent après appel manqué, pré-génération automatique des soumissions à partir de votre catalogue, et validation mobile en 1 clic par le propriétaire.'
        : 'Missed-call smart SMS responder, automated estimate draft generation from your price list, and 1-click mobile approval before quotes are sent to customers.',
      realisticExpectations: [
        { val: '< 3 min', label: isFr ? 'Délai de réponse aux demandes' : 'Lead response turnaround (was 2+ days)' },
        { val: '6 to 10h', label: isFr ? 'Heures administratives récupérées / sem' : 'Weekly admin hours saved per team' },
        { val: '2 à 4', label: isFr ? 'Contrats supplémentaires récupérés / mois' : 'Additional revived jobs won per month' }
      ],
      stackArchitecture: isFr
        ? 'Webhook Twilio SMS + Analyseur de Devis + Passerelle QuickBooks / Xero + Validation Sécurisée Mobile'
        : 'Twilio SMS Webhook + Inbound Quote Parser + QuickBooks/Xero Sync + Secure Mobile Human Approval',
      milestonePromise: isFr
        ? 'Déploiement complet en 14 jours. Essai en environnement test avant toute mise en ligne.'
        : '14-day sprint deployment. Fully tested in a sandbox environment before touching live operations.'
    },
    {
      sector: isFr ? 'Distribution B2B & Grossistes' : 'B2B Wholesale & Distribution',
      subSector: isFr ? 'Matériaux, Équipements & Produits Régionaux (Entrepôts & Flottes)' : 'Building Supplies, Industrial Parts & Food Distribution',
      icon: Truck,
      targetGoal: isFr 
        ? 'Zéro double saisie manuelle & bons de livraison générés instantanément' 
        : 'Zero manual order retyping & instant bilingual delivery manifests',
      problem: isFr
        ? 'Les commandes arrivent par PDF, courriel ou message texte. Le personnel passe 2 à 4 heures chaque matin à les retaper dans la comptabilité, causant des erreurs de commande et des retards d’expédition.'
        : 'Orders arrive via mixed emails, PDFs, and text messages. Staff spend 2 to 4 hours every morning re-typing orders into accounting, causing shipping errors and inventory mismatches.',
      solution: isFr
        ? 'Module d’extraction OCR intelligent qui lit les bons de commande, prépare les lignes dans un sas de révision sécurisé, et imprime automatiquement les bordereaux de livraison.'
        : 'Automated order extraction reading incoming POs, staging line items in a secure review console, and automatically generating delivery slips and inventory allocations.',
      realisticExpectations: [
        { val: '20 min', label: isFr ? 'Temps de saisie matinale (au lieu de 3h)' : 'Morning order processing (was 3+ hours)' },
        { val: '90%', label: isFr ? 'Diminution des erreurs de frappe' : 'Fewer order typing & quantity errors' },
        { val: '8 to 12h', label: isFr ? 'Heures de bureau économisées / sem' : 'Weekly office hours reclaimed' }
      ],
      stackArchitecture: isFr
        ? 'Analyseur de Documents PDF + Sas de Contrôle Intégré + Synchronisation Odoo / ERP + Impression d’Entrepôt'
        : 'PDF Document Parser + Staging Review Console + ERP/Accounting Ledger Sync + Warehouse Dispatch Automation',
      milestonePromise: isFr
        ? 'Garantie anti-erreur : aucun bon de commande n’est injecté sans validation humaine en 1 clic.'
        : 'Error-proof safeguard: zero order records are committed without 1-click operator verification.'
    },
    {
      sector: isFr ? 'Services Professionnels & Santé' : 'Professional Services & Clinics',
      subSector: isFr ? 'Cliniques Médicales, Réadaptation, Cabinets Comptables & Juridiques' : 'Allied Health Clinics, Legal Practices & Accounting Offices',
      icon: Stethoscope,
      targetGoal: isFr 
        ? 'Prise de rendez-vous 24/7 & dossiers numériques conformes à la LPRPDE' 
        : '24/7 self-scheduling & zero-touch PIPEDA/Law 25 compliant intake',
      problem: isFr
        ? 'La réception est submergée par les appels pour déplacer des rendez-vous. Les taux d’absence de 10 à 15% créent des trous financiers, et les formulaires papier sont numérisés avec retard.'
        : 'Front desk staff spend hours answering repetitive booking inquiries and making confirmation calls. A 10-15% no-show rate leaves expensive vacant time slots.',
      solution: isFr
        ? 'Portail de réservation en ligne synchronisé à l’agenda, rappels SMS interactifs à 48h et 24h, et formulaires d’admission sécurisés hébergés au Canada (AWS ca-central-1).'
        : '24/7 calendar booking, smart 2-way SMS reminder sequences, and digital intake questionnaires hosted strictly within Canadian sovereign cloud regions.',
      realisticExpectations: [
        { val: '< 4%', label: isFr ? 'Taux de non-présentation visé (était 12%)' : 'Target no-show rate (down from 12-15%)' },
        { val: '8 to 14h', label: isFr ? 'Heures de téléphone sauvées / sem' : 'Weekly phone-tag hours reclaimed' },
        { val: '100%', label: isFr ? 'Souveraineté des données canadiennes' : 'Canadian data sovereignty (ca-central-1)' }
      ],
      stackArchitecture: isFr
        ? 'Moteur de Prise de RDV + Passerelle SMS Bilingue + Chiffrement KMS Canadien + Intégration Logiciel Clinique'
        : 'Online Scheduling Engine + Bilingual SMS Gateway + KMS Canadian Cloud Encryption + CRM/EHR API Sync',
      milestonePromise: isFr
        ? 'Garantie stricte de souveraineté des données personnelles conformément aux lois canadiennes et à la Loi 25.'
        : 'Strict data residency guarantee: 100% compliant with Canadian PIPEDA and Quebec Law 25.'
    }
  ];

  const current = blueprints[activeStudy];
  const Icon = current.icon;

  return (
    <section id="blueprints" className="py-24 bg-[#050814] border-t border-white/[0.08] relative">
      <div className="container mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="text-xs font-mono text-cyan-400 uppercase tracking-widest mb-3">
            {isFr ? 'Architectures Éprouvées & Résultats Réalistes' : 'Tested Blueprints & Realistic Benchmarks'}
          </div>

          <h2 className="text-3xl sm:text-4xl font-display font-semibold text-white tracking-tight mb-4">
            {isFr 
              ? 'Pas de battage publicitaire. Des systèmes qui fonctionnent.'
              : 'Zero vanity hype. Grounded, realistic systems.'
            }
          </h2>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-light">
            {isFr
              ? 'Nous sommes un studio d’ingénierie rigoureux. Plutôt que de fausses promesses ou des chiffres gonflés, nous exposons exactement notre architecture technique, nos objectifs réalistes et notre engagement de livraison sans risque.'
              : 'As a specialized engineering studio, we believe in radical transparency. Instead of inflated marketing claims, here are our exact operational blueprints, realistic time-saving benchmarks, and zero-risk pilot commitments.'
            }
          </p>

          {/* Founder Transparency Note (Zero-Pill Discipline) */}
          <div className="mt-4 flex items-center gap-2 text-xs font-mono text-slate-400">
            <span className="text-cyan-400 font-medium">14-Day Delivery Sprint</span>
            <span className="text-slate-600" aria-hidden="true">·</span>
            <span>30-Day Risk-Free Pilot Milestone</span>
            <span className="text-slate-600" aria-hidden="true">·</span>
            <span>Tested in Sandbox First</span>
          </div>
        </div>

        {/* Blueprint Selector Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
          {blueprints.map((bp, idx) => {
            const BpIcon = bp.icon;
            const isSelected = activeStudy === idx;
            return (
              <button
                key={idx}
                type="button"
                onClick={() => setActiveStudy(idx)}
                className={`p-5 rounded-2xl border text-left transition-all duration-200 cursor-pointer flex flex-col justify-between gap-3 ${
                  isSelected
                    ? 'bg-slate-900 border-cyan-400 shadow-xl shadow-cyan-500/10'
                    : 'bg-black/40 border-white/[0.08] hover:border-white/[0.2] hover:bg-slate-900/40'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className={`p-2 rounded-lg ${isSelected ? 'bg-cyan-500/20 text-cyan-300' : 'bg-white/[0.05] text-slate-400'}`}>
                    <BpIcon size={18} />
                  </div>
                  <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider font-semibold">
                    {isFr ? `Schéma 0${idx + 1}` : `Blueprint 0${idx + 1}`}
                  </span>
                </div>
                <div>
                  <div className="text-sm font-bold text-white mb-1">
                    {bp.sector}
                  </div>
                  <div className="text-xs text-slate-400 font-mono line-clamp-1">
                    {bp.subSector}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Blueprint Spotlight */}
        <div className="p-8 sm:p-12 rounded-3xl bg-[#090E1F]/90 border border-white/[0.1] shadow-2xl backdrop-blur-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-wider font-semibold">
                  <Icon size={15} />
                  <span>{current.sector}</span>
                  <span className="text-slate-600">·</span>
                  <span className="text-slate-400">{current.subSector}</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-display font-bold text-white tracking-tight">
                  {current.targetGoal}
                </h3>
              </div>

              {/* Problem / Solution Grid */}
              <div className="space-y-4 text-xs sm:text-sm font-light leading-relaxed">
                <div className="p-5 rounded-xl bg-white/[0.02] border border-white/[0.08]">
                  <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block mb-1">
                    {isFr ? 'Friction Opérationnelle Initiale :' : 'Initial Operational Friction:'}
                  </span>
                  <p className="text-slate-300">
                    {current.problem}
                  </p>
                </div>

                <div className="p-5 rounded-xl bg-white/[0.02] border border-white/[0.08]">
                  <span className="text-[11px] font-mono text-cyan-400 uppercase tracking-wider block mb-1">
                    {isFr ? 'Architecture Déployée en 14 Jours :' : '14-Day Applied Architecture:'}
                  </span>
                  <p className="text-slate-300">
                    {current.solution}
                  </p>
                </div>
              </div>

              {/* Technical Stack Architecture */}
              <div className="p-4 rounded-xl bg-white/[0.015] border border-white/[0.06] space-y-1">
                <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Code2 size={13} className="text-cyan-400" />
                  <span>{isFr ? 'Composants Techniques Déployés :' : 'Integrated Technical Pipeline:'}</span>
                </div>
                <p className="text-xs font-mono text-slate-300">
                  {current.stackArchitecture}
                </p>
              </div>
            </div>

            {/* Metrics Pillar Column */}
            <div className="lg:col-span-5 p-8 rounded-2xl bg-gradient-to-b from-slate-900 to-black/80 border border-cyan-500/30 flex flex-col justify-between space-y-6 shadow-xl">
              <div>
                <span className="text-[11px] font-mono text-cyan-400 uppercase tracking-widest font-bold block mb-1">
                  {isFr ? 'OBJECTIFS CHIFFRÉS RÉALISTES' : 'REALISTIC TARGET BENCHMARKS'}
                </span>
                <span className="text-xs text-slate-400 font-mono">
                  {isFr ? 'Gains concrets attendus dès le premier mois' : 'Target outcomes measurable within Month 1'}
                </span>
              </div>

              <div className="space-y-6">
                {current.realisticExpectations.map((metric, idx) => (
                  <div key={idx} className="space-y-1 border-b border-white/[0.06] pb-4 last:border-0 last:pb-0">
                    <div className="text-3xl sm:text-4xl font-mono font-bold text-white tracking-tight">
                      {metric.val}
                    </div>
                    <div className="text-xs font-mono text-slate-400">
                      {metric.label}
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-3.5 rounded-xl bg-cyan-950/40 border border-cyan-500/30 text-xs font-mono text-cyan-200/90 leading-relaxed">
                <span className="font-bold text-white block mb-0.5">
                  {isFr ? 'Garantie de Réalisation :' : 'Delivery Safeguard:'}
                </span>
                {current.milestonePromise}
              </div>

              <button
                type="button"
                onClick={() => {
                  window.dispatchEvent(new CustomEvent('open-lead-drawer', {
                    detail: {
                      focus: `Architecture Blueprint: ${current.sector}`,
                      topic: `Blueprint discussion for ${current.sector}`
                    }
                  }));
                }}
                className="w-full py-3.5 px-5 rounded-xl bg-white hover:bg-slate-200 text-slate-950 font-bold font-mono text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg"
              >
                <span>{isFr ? 'Explorer ce Schéma pour Mon Entreprise' : 'Discuss This Blueprint for My Team'}</span>
                <ArrowRight size={14} />
              </button>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

export default SmallBizCaseStudies;
