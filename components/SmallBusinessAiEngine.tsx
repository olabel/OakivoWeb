import React, { useState } from 'react';
import { 
  TrendingUp, DollarSign, Clock, ShieldCheck, Zap, 
  MessageSquare, PhoneCall, RefreshCw, Calendar, 
  Receipt, FileText, Send, UserCheck, ArrowRight,
  Sparkles, CheckCircle2, ChevronRight, Layers,
  Code2, Laptop, Lock, Database, FileCheck
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface SmallBusinessAiEngineProps {
  onScheduleDemo?: (topic: string) => void;
}

export const SmallBusinessAiEngine: React.FC<SmallBusinessAiEngineProps> = ({ onScheduleDemo }) => {
  const { language } = useLanguage();
  const isFr = language === 'fr';

  const [activeEngine, setActiveEngine] = useState<'sales' | 'cost' | 'launch' | 'security'>('sales');

  const handleCta = (topic: string) => {
    if (onScheduleDemo) {
      onScheduleDemo(topic);
    } else {
      window.dispatchEvent(new CustomEvent('open-lead-drawer', {
        detail: {
          focus: topic,
          topic: `Engine CTA: ${topic}`
        }
      }));
    }
  };

  const salesPillars = [
    {
      id: 'speed-to-lead',
      title: isFr ? '1. Vitesse d’intervention en moins de 3 minutes' : '1. Under 3-Minute Speed-to-Lead Response',
      badge: isFr ? 'Réponse Prioritaire' : 'Top Lead Response',
      icon: Zap,
      description: isFr
        ? "Plus de 75% des clients choisissent le premier prestataire qui répond avec une estimation claire. Notre système prépare un devis préliminaire personnalisé en quelques minutes pendant que l'intérêt de l'acheteur est maximal."
        : "Over 75% of buyers choose the vendor who replies first with a clear estimate. Our system ingests web inquiries, parses job specs, and drafts an itemized proposal within minutes for your quick approval.",
      metrics: isFr ? 'Délai de réponse réduit de 48 heures à moins de 3 minutes' : 'Turnaround cut from 48 hours to under 3 minutes'
    },
    {
      id: 'missed-call-sms',
      title: isFr ? '2. Récupération instantanée des appels manqués par SMS' : '2. Missed-Call Instant SMS Recovery',
      badge: isFr ? 'Zéro Appel Perdu' : 'Zero Lost Calls',
      icon: PhoneCall,
      description: isFr
        ? "Lorsque vous êtes sur un chantier ou avec un client, un appel manqué va souvent chez un concurrent. Dès la sonnerie sans réponse, un SMS courtois est envoyé pour recueillir le besoin et planifier un rappel."
        : "When you are on site or with a customer, a missed call often clicks the next search result. An immediate courteous SMS texts the caller, captures their issue, and schedules a callback before they look elsewhere.",
      metrics: isFr ? 'Sauve en moyenne 2 à 5 opportunités manquées par mois' : 'Recovers 2 to 5 lost opportunities every month'
    },
    {
      id: 'quote-resurrector',
      title: isFr ? '3. Relance automatique des devis sans réponse' : '3. Polite Estimate & Quote Follow-ups',
      badge: isFr ? 'Pipeline Ressuscité' : 'Revived Pipeline',
      icon: RefreshCw,
      description: isFr
        ? "La plupart des entrepreneurs n'ont pas le temps de relancer leurs devis envoyés. Le système détecte les soumissions sans nouvelles après 3 et 7 jours, rédige un courriel ou SMS bienveillant et attend votre clic de validation."
        : "Most small business owners lack time to follow up on open bids. The system surfaces quiet estimates at 3 and 7 days, prepares friendly check-in drafts, and waits for your 1-click mobile release.",
      metrics: isFr ? 'Relance 100% des devis sans effort supplémentaire' : 'Ensures 100% of open bids receive courteous follow-up'
    },
    {
      id: '24-7-booking',
      title: isFr ? '4. Prise de rendez-vous en ligne 24h/24' : '4. 24/7 Smart Appointment & Intake Booker',
      badge: isFr ? 'Prise de RDV Soir & WE' : 'Evening & Weekend Bookings',
      icon: Calendar,
      description: isFr
        ? "Près de 40% des recherches de services se font en dehors des heures de bureau. Les prospects peuvent choisir un créneau libre dans votre calendrier et répondre aux questions préalables sans échange de courriels."
        : "Over 40% of customer inquiries occur after 5:00 PM or on weekends. Prospects self-select open slots on your live calendar and answer intake questions, eliminating back-and-forth phone tag.",
      metrics: isFr ? 'Capture les prospects du soir et du week-end' : 'Secures bookings without Monday morning phone-tag'
    }
  ];

  const costPillars = [
    {
      id: 'zero-typing-invoices',
      title: isFr ? '1. Lecture des reçus & factures sans saisie manuelle' : '1. Zero-Typing Invoice & Receipt Parsing',
      badge: isFr ? 'Gain de Temps Réel' : 'Hours Reclaimed',
      icon: Receipt,
      description: isFr
        ? "Ne perdez plus votre dimanche à retaper des reçus dans QuickBooks ou Xero. Transférez un PDF ou prenez une photo : l’IA extrait les montants, la TVH/TPS et prépare l'écriture comptable pour validation."
        : "Stop spending Sunday afternoons typing paper receipts into QuickBooks. Forward a PDF or snap a mobile photo: the system extracts supplier, taxes, and line totals into a staged review list.",
      metrics: isFr ? 'Économise 5 à 10 heures de saisie par semaine' : 'Reclaims 5 to 10 hours of weekly typing toil'
    },
    {
      id: 'ai-prepared-estimates',
      title: isFr ? '2. Préparation assistée des devis à partir de notes vocales' : '2. Voice-to-Quote & Standardized Proposals',
      badge: isFr ? 'Moins de Fautes' : 'Faster Proposals',
      icon: FileText,
      description: isFr
        ? "Dictez une note vocale depuis votre camion ou téléversez les mesures : le système prépare les lignes tarifaires à partir de votre catalogue de prix pour vous faire gagner 30 minutes par soumission."
        : "Record a brief spoken debrief from your truck: the system parses required parts against your standard price catalog and formats an estimate draft in minutes for your review.",
      metrics: isFr ? 'Divise par 3 le temps de montage d’un devis' : 'Cuts quote assembly time by more than 60%'
    },
    {
      id: 'automated-dispatch-updates',
      title: isFr ? '3. Notifications automatiques de suivi client' : '3. Proactive Customer Delivery & Job Alerts',
      badge: isFr ? 'Moins d’Interruption' : 'Fewer Phone Distractions',
      icon: Send,
      description: isFr
        ? "Vos clients n'ont plus besoin d'appeler pour demander « Quand arrivez-vous ? ». Des SMS automatisés informent le client à chaque étape importante du projet ou de la livraison."
        : "Eliminate repetitive calls asking 'Is my order ready?' or 'What time is the tech arriving?'. Automatic SMS alerts inform customers as job stages update, protecting your focus.",
      metrics: isFr ? 'Réduit les appels récurrents au standard de plus de 50%' : 'Cuts routine status check calls by over 50%'
    },
    {
      id: 'support-triage',
      title: isFr ? '4. Filtrage intelligent du standard téléphonique' : '4. Inbound Triage & Urgent Escalations',
      badge: isFr ? 'Filtrage Bienveillant' : 'Priority Escalation',
      icon: UserCheck,
      description: isFr
        ? "Les questions simples (horaires, zones desservies, marche à suivre) sont traitées avec clarté. Dès qu'un client stratégique ou une urgence réelle se présente, une alerte directe vous est transmise."
        : "Frequently asked questions (hours, service coverage, basic procedures) are handled with natural clarity, while high-priority emergencies are instantly texted to the owner.",
      metrics: isFr ? 'Filtre le bruit récurrent tout en sécurisant les urgences' : 'Deflects routine clutter while prioritizing urgent clients'
    }
  ];

  const launchPillars = [
    {
      id: 'mvp-development',
      title: isFr ? '1. Développement de MVP & Logiciels en 14 à 30 Jours' : '1. MVP & Custom Software in 14 to 30 Days',
      badge: isFr ? 'Lancement Rapide' : 'Rapid Launch',
      icon: Code2,
      description: isFr
        ? "Vous avez une idée de produit logiciel ou souhaitez automatiser un service unique pour vos clients ? Nous concevons et développons des applications web complètes en React et TypeScript avec une architecture robuste."
        : "Have an idea for a software tool or unique digital workflow? We build production-ready minimum viable products (MVPs) and web applications using modern React, TypeScript, and cloud-native backbones.",
      metrics: isFr ? 'Première version fonctionnelle livrée en quelques semaines' : 'Working production prototype shipped in weeks'
    },
    {
      id: 'client-portals',
      title: isFr ? '2. Portails Clients & Tableaux de Bord Sur Mesure' : '2. Custom Client Portals & Dashboards',
      badge: isFr ? 'Expérience Pro' : 'Professional UX',
      icon: Laptop,
      description: isFr
        ? "Offrez à vos clients un espace en ligne élégant pour consulter leurs factures, suivre leurs commandes, téléverser des documents et communiquer en toute sécurité sans pièces jointes égarées."
        : "Give your clients a branded portal where they can approve estimates, review invoices, check order statuses, and upload project files securely without messy email chains.",
      metrics: isFr ? 'Valorise votre image de marque auprès de vos clients' : 'Elevates brand authority and customer retention'
    },
    {
      id: 'custom-integrations',
      title: isFr ? '3. Passerelles & Intégrations API Robustes' : '3. API Integrations & Custom Webhooks',
      badge: isFr ? 'Zéro Rupture' : 'Seamless Sync',
      icon: Layers,
      description: isFr
        ? "Nous connectons vos outils logiciels existants (QuickBooks, Stripe, Twilio, Google Workspace, CRM sur mesure) pour que vos données circulent automatiquement sans intervention humaine."
        : "We bridge your existing software stack (accounting, payment gateways, SMS, calendar, CRM) with reliable automated pipelines so your data flows seamlessly without double entry.",
      metrics: isFr ? 'Synchronisation automatique et détection d’anomalies' : 'Real-time synchronization with error handling'
    },
    {
      id: 'scalable-web-architecture',
      title: isFr ? '4. Modernisation de Sites Web & Haute Conversion' : '4. High-Converting Web Platforms & SEO',
      badge: isFr ? 'Génération de Leads' : 'High Converting',
      icon: Sparkles,
      description: isFr
        ? "Conception de sites web ultra-rapides, optimisés pour le référencement naturel (SEO) et conçus pour convertir les visiteurs locaux en demandes de soumission qualifiées."
        : "Engineered for speed, local search engine rankings, and high conversion. Built to turn local Canadian search traffic into qualified inbound inquiries and booked consultations.",
      metrics: isFr ? 'Chargement instantané et référencement SEO optimisé' : 'Sub-second page speeds and structured schema'
    }
  ];

  const securityPillars = [
    {
      id: 'canadian-cloud-residency',
      title: isFr ? '1. Résidence des Données 100% au Canada (ca-central-1)' : '1. 100% Domestic Canadian Data Residency',
      badge: isFr ? 'Souveraineté Totale' : '100% Domestic',
      icon: Database,
      description: isFr
        ? "Toutes les bases de données, sauvegardes et pipelines applicatifs sont hébergés exclusivement dans des centres de données canadiens (AWS ou GCP à Montréal), garantissant le respect des normes nationales."
        : "All databases, backups, and customer records remain strictly within Canadian borders (AWS/GCP ca-central-1 in Montreal), eliminating cross-border surveillance risks and data spillage.",
      metrics: isFr ? 'Zéro transfert de données sensibles vers l’étranger' : 'Zero cross-border exposure for sensitive client data'
    },
    {
      id: 'pipeda-law25-compliance',
      title: isFr ? '2. Conformité aux Lois Canadiennes : LPRPDE & Loi 25' : '2. PIPEDA & Quebec Law 25 Compliance Guardrails',
      badge: isFr ? 'Protection Légale' : 'Statutory Compliance',
      icon: FileCheck,
      description: isFr
        ? "Protection rigoureuse des renseignements personnels, gestion sécurisée des consentements et politiques de conservation conformes aux exigences fédérales et québécoises pour éviter toute amende."
        : "Strict privacy safeguards, consent management, and automated retention policies engineered to satisfy Canadian federal PIPEDA and strict Quebec Law 25 mandates without compliance panic.",
      metrics: isFr ? 'Conformité vérifiable pour les audits et assureurs' : 'Audit-ready documentation for insurers and partners'
    },
    {
      id: 'ransomware-defense',
      title: isFr ? '3. Sauvegardes Immuables & Défense Cyber' : '3. Immutable Backups & Ransomware Defense',
      badge: isFr ? 'Résilience Maximale' : 'Ransomware Proof',
      icon: Lock,
      description: isFr
        ? "Sauvegardes chiffrées quotidiennes hors site avec contrôle de version. En cas d'attaque informatique locale, vos données historiques d'entreprise peuvent être restaurées en quelques heures."
        : "Nightly encrypted offsite backups with immutable retention. If a local workstation suffers malware or ransomware, your core business ledger can be recovered cleanly within hours.",
      metrics: isFr ? 'Restauration rapide et sauvegardes isolées' : 'Fast disaster recovery with point-in-time restore'
    },
    {
      id: 'zero-trust-access',
      title: isFr ? '4. Contrôle d’Accès Zéro Confiance & Journal d’Audit' : '4. Zero-Trust Access & Audit Logging',
      badge: isFr ? 'Accès Restreint' : 'Role-Based Control',
      icon: ShieldCheck,
      description: isFr
        ? "Chaque collaborateur n'accède qu'aux dossiers strictement nécessaires à sa fonction. Un journal d'audit infalsifiable consigne les consultations et modifications pour une transparence absolue."
        : "Employees only access the specific customer files required for their role. A tamper-resistant audit trail records who viewed, edited, or released transactions for complete accountability.",
      metrics: isFr ? 'Contrôle précis des privilèges et traçabilité' : 'Granular permission boundaries and complete audit trail'
    }
  ];

  const getActivePillars = () => {
    switch (activeEngine) {
      case 'sales': return salesPillars;
      case 'cost': return costPillars;
      case 'launch': return launchPillars;
      case 'security': return securityPillars;
      default: return salesPillars;
    }
  };

  return (
    <section id="ai-engine" className="py-24 bg-[#05070D] border-t border-white/[0.08] relative overflow-hidden">
      <div className="container mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-mono font-medium tracking-widest text-emerald-400 uppercase mb-4">
            <Sparkles size={14} />
            <span>{isFr ? 'LES 4 DISCIPLINES OAKIVO' : 'THE 4 OAKIVO CAPABILITIES'}</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-display font-bold text-white tracking-tight mb-6">
            {isFr 
              ? 'Ventes, Coûts, Nouveaux Produits & Cybersécurité.'
              : 'Sales, Costs, New Products & Sovereign Cyber Security.'
            }
          </h2>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            {isFr
              ? 'Pas de gadgets futiles ni de promesses exagérées. Nous construisons des systèmes d’IA pratiques et des logiciels robustes qui protègent votre temps et vos marges.'
              : 'No generic gimmicks or inflated claims. We engineer focused automations, custom software, and Canadian data security that deliver grounded, measurable business outcomes.'
            }
          </p>
        </div>

        {/* 4-Engine Switcher Tabs */}
        <div className="flex justify-center mb-14 overflow-x-auto pb-2">
          <div className="inline-flex p-1.5 rounded-2xl bg-slate-900/90 border border-white/[0.1] shadow-2xl gap-1">
            <button
              type="button"
              onClick={() => setActiveEngine('sales')}
              className={`flex items-center gap-2 sm:gap-2.5 px-4 sm:px-5 py-3 rounded-xl font-mono text-xs sm:text-sm font-bold tracking-wider transition-all duration-200 cursor-pointer whitespace-nowrap ${
                activeEngine === 'sales'
                  ? 'bg-gradient-to-r from-emerald-500 to-cyan-500 text-slate-950 shadow-lg'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <TrendingUp size={15} />
              <span>{isFr ? '1. Ventes & Croissance' : '1. Grow Sales'}</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveEngine('cost')}
              className={`flex items-center gap-2 sm:gap-2.5 px-4 sm:px-5 py-3 rounded-xl font-mono text-xs sm:text-sm font-bold tracking-wider transition-all duration-200 cursor-pointer whitespace-nowrap ${
                activeEngine === 'cost'
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-slate-950 shadow-lg'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Clock size={15} />
              <span>{isFr ? '2. Réduction des Coûts' : '2. Cut Costs'}</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveEngine('launch')}
              className={`flex items-center gap-2 sm:gap-2.5 px-4 sm:px-5 py-3 rounded-xl font-mono text-xs sm:text-sm font-bold tracking-wider transition-all duration-200 cursor-pointer whitespace-nowrap ${
                activeEngine === 'launch'
                  ? 'bg-gradient-to-r from-purple-500 to-indigo-500 text-white shadow-lg'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Code2 size={15} />
              <span>{isFr ? '3. Lancer un Produit / MVP' : '3. Launch a Product'}</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveEngine('security')}
              className={`flex items-center gap-2 sm:gap-2.5 px-4 sm:px-5 py-3 rounded-xl font-mono text-xs sm:text-sm font-bold tracking-wider transition-all duration-200 cursor-pointer whitespace-nowrap ${
                activeEngine === 'security'
                  ? 'bg-gradient-to-r from-amber-500 to-emerald-500 text-slate-950 shadow-lg'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <ShieldCheck size={15} />
              <span>{isFr ? '4. Cybersécurité Canada' : '4. Cyber Security'}</span>
            </button>
          </div>
        </div>

        {/* Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mb-16">
          {getActivePillars().map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div 
                key={pillar.id}
                className="group p-8 rounded-2xl bg-gradient-to-b from-[#0B1120] to-[#070B16] border border-white/[0.08] hover:border-cyan-500/30 transition-all duration-300 flex flex-col justify-between hover:shadow-xl hover:shadow-cyan-500/5"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-4">
                    <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 group-hover:scale-105 transition-transform">
                      <Icon size={22} />
                    </div>
                    <span className="text-[11px] font-mono font-bold px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
                      {pillar.badge}
                    </span>
                  </div>

                  <h3 className="text-xl font-display font-bold text-white tracking-tight">
                    {pillar.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed">
                    {pillar.description}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-white/[0.06] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono">
                  <span className="text-cyan-300/90 flex items-center gap-1.5">
                    <CheckCircle2 size={13} className="text-emerald-400 shrink-0" />
                    <span>{pillar.metrics}</span>
                  </span>
                  <button
                    type="button"
                    onClick={() => handleCta(pillar.title)}
                    className="inline-flex items-center gap-1.5 text-slate-300 hover:text-white font-semibold transition-colors cursor-pointer group-hover:translate-x-1 duration-200"
                  >
                    <span>{isFr ? 'Explorer ce système' : 'Discuss this system'}</span>
                    <ChevronRight size={14} className="text-cyan-400" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* The Golden Rule Callout Box */}
        <div className="p-8 sm:p-10 rounded-2xl bg-gradient-to-r from-slate-900/90 via-[#0B1528] to-slate-900/90 border border-cyan-500/30 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-8 space-y-3">
              <div className="inline-flex items-center gap-2 text-[11px] font-mono text-cyan-400 uppercase tracking-widest font-bold">
                <ShieldCheck size={14} className="text-emerald-400" />
                <span>{isFr ? 'NOTRE STANDARD DE SÉCURITÉ' : 'THE OAKIVO SAFETY STANDARD'}</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-display font-bold text-white tracking-tight">
                {isFr 
                  ? 'La Règle d’Or : L’IA Prépare, Vous Décidez.'
                  : 'The Golden Rule: AI Prepares, Humans Approve.'
                }
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed max-w-2xl">
                {isFr
                  ? "Nous ne laissons jamais une IA envoyer un courriel délicat, modifier un solde bancaire ou engager votre entreprise sans votre accord explicite. L’IA effectue le tri et la mise en forme en coulisses ; votre équipe clique sur « Approuver »."
                  : "We never give autonomous software free rein to send unchecked client emails, alter accounting balances, or make commitments on your behalf. The system handles the prep work in seconds; you and your staff retain 100% approval authority."
                }
              </p>
            </div>

            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3">
              <button
                type="button"
                onClick={() => handleCta('Golden Rule Architecture Demo')}
                className="w-full py-4 px-6 rounded-xl bg-white hover:bg-slate-200 text-slate-950 font-bold font-mono text-xs uppercase tracking-wider transition-all shadow-xl hover:shadow-cyan-400/20 text-center cursor-pointer"
              >
                {isFr ? 'Planifier une Découverte de 30 min' : 'Schedule 30-Min Discovery'}
              </button>
              <div className="text-center text-[11px] font-mono text-slate-400">
                {isFr ? 'Échange direct avec les fondateurs · Sans engagement' : 'Direct discussion with senior engineering founders'}
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default SmallBusinessAiEngine;
