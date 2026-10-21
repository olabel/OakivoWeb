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
      sector: isFr ? 'Fabrication & Métiers Spécialisés' : 'Precision Manufacturing & Field Contracting',
      subSector: isFr ? 'Usinage, Robotique, CVC & Électricité (Ateliers de 5 à 40 personnes)' : 'CNC Machining, Industrial Parts, HVAC & Electrical',
      image: '/assets/images/precision_manufacturing.jpg',
      imageAlt: isFr ? 'Atelier de fabrication de précision et robotique à Montréal' : 'Precision robotics and machining facility in Canada',
      icon: Wrench,
      targetGoal: isFr 
        ? 'Stopper les devis perdus & supprimer 6 à 10 h de paperasse par semaine' 
        : 'Stop lost leads after-hours & eliminate 6 to 10h of weekly paperwork',
      problem: isFr
        ? 'Les demandes de prix reçues le soir ou le week-end attendent souvent plusieurs jours. Les fiches de spécifications traînent dans les ateliers, et les soumissions envoyées ne sont jamais relancées par manque de temps.'
        : 'Evening and weekend quote inquiries sit in inboxes for days while shop managers are on the floor. Detailed parts specifications get lost, and sent estimates are rarely followed up on due to time constraints.',
      solution: isFr
        ? 'Répondeur d’ingénierie instantané, pré-génération automatique des soumissions à partir de votre catalogue tarifaire, et validation mobile en 1 clic par le directeur d’usine.'
        : 'Instant quote drafting from your bill of materials and price sheet, with 1-click mobile approval before final dispatch to customers.',
      realisticExpectations: [
        { val: '< 45s', label: isFr ? 'Délai de brouillon de devis' : 'Draft quote generated (was 3 days)' },
        { val: '8 to 12h', label: isFr ? 'Heures administratives économisées / sem' : 'Weekly admin desk hours saved' },
        { val: '2 à 4', label: isFr ? 'Contrats supplémentaires gagnés / mois' : 'Additional high-margin bids won / mo' }
      ],
      stackArchitecture: isFr
        ? 'Passerelle API Devis + Analyseur CAO/BOM + Synchronisation ERP/QuickBooks + Sas de Validation Mobile'
        : 'Quote Webhook Parser + CAD/BOM Ingestion + ERP/QuickBooks Sync + Secure Mobile Human Gateway',
      milestonePromise: isFr
        ? 'Déploiement complet en 14 jours. Essai dans un environnement bac à sable avant toute mise en production.'
        : '14-day sprint deployment. Fully verified in a sandbox environment before touching live operations.'
    },
    {
      sector: isFr ? 'Distribution B2B & Chaîne Logistique' : 'B2B Wholesale & Distribution Logistics',
      subSector: isFr ? 'Matériaux, Équipements & Produits Régionaux (Entrepôts & Flottes)' : 'Building Supplies, Industrial Parts & Fleet Warehouses',
      image: '/assets/images/logistics_warehouse.jpg',
      imageAlt: isFr ? 'Entrepôt logistique automatisé et centres de tri' : 'Modern automated distribution warehouse in Canada',
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
        { val: '8 to 14h', label: isFr ? 'Heures de bureau économisées / sem' : 'Weekly office hours reclaimed' }
      ],
      stackArchitecture: isFr
        ? 'Analyseur de Documents PDF + Sas de Contrôle Intégré + Synchronisation Odoo / ERP + Impression d’Entrepôt'
        : 'PDF Document Parser + Staging Review Console + ERP/Accounting Ledger Sync + Warehouse Dispatch Automation',
      milestonePromise: isFr
        ? 'Garantie anti-erreur : aucun bon de commande n’est injecté sans validation humaine en 1 clic.'
        : 'Error-proof safeguard: zero order records are committed without 1-click operator verification.'
    },
    {
      sector: isFr ? 'Cliniques Médicales & Cabinets Professionnels' : 'Healthcare Clinics & Professional Practices',
      subSector: isFr ? 'Cliniques Médicales, Réadaptation, Cabinets Comptables & Juridiques' : 'Medical Clinics, Allied Health & Accounting/Legal Offices',
      image: '/assets/images/health_clinic.jpg',
      imageAlt: isFr ? 'Clinique médicale canadienne moderne et accueil soigné' : 'Modern Canadian diagnostic and healthcare clinic interior',
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
        { val: '< 4%', label: isFr ? 'Taux d’absence visé (était 14%)' : 'Target no-show rate (down from 12-15%)' },
        { val: '10 to 14h', label: isFr ? 'Heures de téléphone sauvées / sem' : 'Weekly phone-tag hours reclaimed' },
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
    <section id="blueprints" className="py-24 bg-[#000000] border-t border-[#1e2d27]/70 relative text-[#f7faf9]">
      <div className="container mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <span className="nova-eyebrow text-[#23c694] mb-3">
            {isFr ? 'ARCHITECTURES ÉPROUVÉES & RÉSULTATS RÉALISTES' : 'TESTED BLUEPRINTS & REALISTIC BENCHMARKS'}
          </span>

          <h2 className="text-3xl sm:text-5xl font-display font-light text-white tracking-[-0.035em] mb-4">
            {isFr 
              ? 'Pas de battage publicitaire. Des systèmes qui fonctionnent.'
              : 'Zero vanity hype. Grounded, realistic systems.'
            }
          </h2>

          <p className="text-[#a8b0ad] text-sm sm:text-base leading-relaxed font-light">
            {isFr
              ? 'Nous sommes un studio d’ingénierie rigoureux. Plutôt que de fausses promesses ou des chiffres gonflés, nous exposons exactement notre architecture technique, nos objectifs réalistes et notre engagement de livraison sans risque.'
              : 'As a specialized engineering studio, we believe in radical transparency. Instead of inflated marketing claims, here are our exact operational blueprints, realistic time-saving benchmarks, and zero-risk pilot commitments.'
            }
          </p>

          <div className="mt-4 flex flex-wrap items-center gap-3 text-xs font-mono text-[#7c8581]">
            <span className="text-[#23c694] font-medium">14-Day Delivery Sprint</span>
            <span className="text-[#1e2d27]" aria-hidden="true">·</span>
            <span>30-Day Risk-Free Pilot Milestone</span>
            <span className="text-[#1e2d27]" aria-hidden="true">·</span>
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
                    ? 'bg-[#0f5e4a]/20 border-[#23c694] shadow-xl shadow-[#23c694]/10'
                    : 'bg-[#070a09] border-[#1e2d27] hover:border-[#23c694]/40 hover:bg-[#0a0d0c]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className={`p-2 rounded-lg ${isSelected ? 'bg-[#23c694]/20 text-[#23c694]' : 'bg-[#1e2d27]/40 text-[#7c8581]'}`}>
                    <BpIcon size={18} />
                  </div>
                  <span className="text-[10px] font-mono text-[#23c694] uppercase tracking-wider font-semibold">
                    {isFr ? `Schéma 0${idx + 1}` : `Blueprint 0${idx + 1}`}
                  </span>
                </div>
                <div>
                  <div className="text-sm font-semibold text-white mb-1">
                    {bp.sector}
                  </div>
                  <div className="text-xs text-[#7c8581] font-mono line-clamp-1">
                    {bp.subSector}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Blueprint Spotlight with High-Fidelity Photography */}
        <div className="p-6 sm:p-10 lg:p-12 rounded-3xl bg-[#070a09] border border-[#1e2d27] shadow-2xl backdrop-blur-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            
            {/* Left 7 Columns: Editorial Photo + Problem / Solution */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Sector Header Badge */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-mono text-[#23c694] uppercase tracking-wider font-semibold">
                  <Icon size={15} />
                  <span>{current.sector}</span>
                  <span className="text-[#1e2d27]">·</span>
                  <span className="text-[#a8b0ad]">{current.subSector}</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-display font-light text-white tracking-tight">
                  {current.targetGoal}
                </h3>
              </div>

              {/* High-Quality Sector Editorial Image */}
              <div className="relative rounded-2xl overflow-hidden border border-[#1e2d27] group">
                <img 
                  src={current.image} 
                  alt={current.imageAlt}
                  referrerPolicy="no-referrer"
                  className="w-full h-56 sm:h-72 object-cover object-center group-hover:scale-[1.02] transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#070a09] via-transparent to-transparent opacity-80" />
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-[11px] font-mono text-[#e1e7e4]">
                  <span className="bg-[#000000]/80 px-3 py-1 rounded-full border border-white/10 backdrop-blur-md flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#23c694] animate-pulse" />
                    <span>{isFr ? 'Environnement de production réel' : 'Live production environment'}</span>
                  </span>
                  <span className="bg-[#000000]/80 px-2.5 py-1 rounded-full border border-white/10 backdrop-blur-md text-[#a8b0ad]">
                    AWS ca-central-1
                  </span>
                </div>
              </div>

              {/* Problem / Solution Grid */}
              <div className="space-y-4 text-xs sm:text-sm font-light leading-relaxed">
                <div className="p-5 rounded-2xl bg-[#0a0e0c] border border-[#1e2d27]">
                  <span className="text-[11px] font-mono text-rose-400 uppercase tracking-wider block mb-1 font-semibold">
                    {isFr ? 'Friction Opérationnelle Initiale :' : 'Initial Operational Friction:'}
                  </span>
                  <p className="text-[#a8b0ad]">
                    {current.problem}
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-[#0f5e4a]/15 border border-[#23c694]/40">
                  <span className="text-[11px] font-mono text-[#23c694] uppercase tracking-wider block mb-1 font-semibold">
                    {isFr ? 'Architecture Déployée en 14 Jours :' : '14-Day Applied Architecture:'}
                  </span>
                  <p className="text-[#dce3e0]">
                    {current.solution}
                  </p>
                </div>
              </div>

              {/* Technical Stack Architecture */}
              <div className="p-4 rounded-xl bg-[#000000]/50 border border-[#1e2d27] space-y-1">
                <div className="text-[11px] font-mono text-[#7c8581] uppercase tracking-wider flex items-center gap-1.5">
                  <Code2 size={13} className="text-[#23c694]" />
                  <span>{isFr ? 'Composants Techniques Déployés :' : 'Integrated Technical Pipeline:'}</span>
                </div>
                <p className="text-xs font-mono text-[#dce3e0]">
                  {current.stackArchitecture}
                </p>
              </div>

            </div>

            {/* Right 5 Columns: Metrics Pillar & 1-Click Action */}
            <div className="lg:col-span-5 p-7 sm:p-8 rounded-2xl bg-[#0a0f0d] border border-[#23c694]/40 flex flex-col justify-between space-y-6 shadow-2xl">
              <div>
                <span className="nova-eyebrow text-[#23c694] mb-1">
                  {isFr ? 'OBJECTIFS CHIFFRÉS RÉALISTES' : 'REALISTIC TARGET BENCHMARKS'}
                </span>
                <span className="text-xs text-[#7c8581] font-mono block mt-1">
                  {isFr ? 'Gains concrets mesurables dès le premier mois' : 'Target outcomes measurable within Month 1'}
                </span>
              </div>

              <div className="space-y-5">
                {current.realisticExpectations.map((metric, idx) => (
                  <div key={idx} className="space-y-1 border-b border-[#1e2d27] pb-4 last:border-0 last:pb-0">
                    <div className="text-3xl sm:text-4xl font-mono font-light text-white tracking-tight">
                      {metric.val}
                    </div>
                    <div className="text-xs font-mono text-[#a8b0ad]">
                      {metric.label}
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-4 rounded-xl bg-[#070a09] border border-[#1e2d27] text-xs font-mono text-[#c2ccc7] leading-relaxed">
                <span className="font-semibold text-white block mb-0.5 text-[11px] uppercase tracking-wider text-[#23c694]">
                  {isFr ? 'Garantie de Réalisation :' : 'Delivery Safeguard:'}
                </span>
                {current.milestonePromise}
              </div>

              <button
                type="button"
                onClick={() => {
                  window.dispatchEvent(new CustomEvent('open-ai-audit-modal'));
                }}
                className="w-full nova-outline-btn justify-center cursor-pointer"
              >
                <span>{isFr ? 'Explorer ce Schéma pour Mon Entreprise' : 'Discuss This Blueprint for My Team'}</span>
                <ArrowRight size={14} className="text-[#23c694]" />
              </button>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

export default SmallBizCaseStudies;
