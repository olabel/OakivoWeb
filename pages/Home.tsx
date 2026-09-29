import React from 'react';
import { ArrowRight, ShieldCheck, CheckCircle2, Server, Mail, Phone, Database, Zap, Sparkles, TrendingUp, Clock, DollarSign, Calculator, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import SEO from '../components/SEO';
import TrustCarousel from '../components/TrustCarousel';
import DynamicHero from '../components/DynamicHero';
import IntersectionAnimatedCard from '../components/IntersectionAnimatedCard';
import { useLanguage } from '../context/LanguageContext';
import { NavRoute } from '../types';

const Home: React.FC = () => {
  const { language } = useLanguage();
  const isFr = language === 'fr';

  const triggerAuditDrawer = (focus = 'General Digital Transformation Advisory') => {
    window.dispatchEvent(new CustomEvent('open-lead-drawer', {
      detail: {
        focus,
        topic: `Home: ${focus}`,
        industry: isFr ? 'Entreprise Canadienne' : 'Canadian Enterprise'
      }
    }));
  };

  // Outcome-focused core transformations: Modern ERP, Automation, Cloud & Cybersecurity
  const outcomes = [
    {
      icon: Database,
      num: '01',
      title: isFr ? 'Opérations Unifiées & ERP Moderne' : 'Unified Operations & Modern ERP',
      outcomeMetric: isFr ? 'Déploiement en Moins de 90 Jours' : 'Live in Under 90 Days',
      description: isFr
        ? 'Remplacez vos tableurs disparates et logiciels déconnectés par une source unique de vérité reliant vos ventes, stocks, finances et logistique.'
        : 'Replace disconnected spreadsheets, email chains, and software silos with a single source of truth synchronizing sales, inventory, and finance.',
      benefits: isFr
        ? [
            'ERP unifié opérationnel reliant ventes, stocks et comptabilité',
            'Migration propre et intégrale de vos données historiques',
            'Formation pratique de vos équipes avec zéro interruption des ventes'
          ]
        : [
            'Turnkey unified ERP synchronizing sales, inventory & accounting',
            'Complete historical data migration with zero data loss',
            'Hands-on staff training with zero disruption to daily sales'
          ]
    },
    {
      icon: Zap,
      num: '02',
      title: isFr ? 'Automatisation des Flux & Revenus' : 'Hands-Free Revenue Workflows',
      outcomeMetric: isFr ? '25+ Heures Récupérées / Semaine' : '25+ Hours Recovered / Week',
      description: isFr
        ? 'Automatisez le cycle de la commande à la facturation pour accélérer vos encaissements et éliminer les erreurs manuelles.'
        : 'Automate quote-to-cash, inventory fulfillment, and customer invoicing to accelerate cash collections and eliminate billing errors.',
      benefits: isFr
        ? [
            'Pipeline devis-facturation automatisé sans double saisie',
            'Émission et envoi automatisés des factures dès livraison',
            'Rapprochement bancaire et alertes de trésorerie en temps réel'
          ]
        : [
            'Self-healing quote-to-cash pipeline without manual re-keying',
            'Instant automated invoice generation upon order fulfillment',
            'Real-time bank reconciliation & cash-flow health alerts'
          ]
    },
    {
      icon: Server,
      num: '03',
      title: isFr ? 'Infrastructures Cloud & DevSecOps' : 'Cloud Architecture & DevSecOps',
      outcomeMetric: isFr ? 'Garantie de Disponibilité 99,99 %' : '99.99% Cloud Uptime Guarantee',
      description: isFr
        ? 'Infrastructures infonuagiques canadiennes durcies, automatisations de déploiement et optimisation de vos coûts d’hébergement.'
        : 'Hardened Canadian sovereign cloud architectures, automated release pipelines, and proactive cloud cost optimization.',
      benefits: isFr
        ? [
            'Environnement infonuagique souverain au Canada (AWS / Azure)',
            'Mises en production automatisées avec zéro temps d’arrêt',
            'Rapports d’optimisation éliminant 30 à 40 % de gaspillage cloud'
          ]
        : [
            'Canadian sovereign cloud architecture (AWS / Azure ca-central)',
            'Automated production releases with zero downtime cutovers',
            'Cloud cost governance eliminating 30–40% in monthly waste'
          ]
    },
    {
      icon: ShieldCheck,
      num: '04',
      title: isFr ? 'Cybersécurité, Zéro Confiance & Conformité' : 'Cybersecurity, Zero Trust & Compliance',
      outcomeMetric: isFr ? 'Preuves de Conformité 24/7' : '24/7 Automated Audit Proof',
      description: isFr
        ? 'Protection Zéro Confiance des accès, remédiation automatisée des menaces et conformité continue (LPRPDE, Loi 25, SOC 2) avec preuves cryptographiques 24/7.'
        : 'Zero Trust identity access, real-time threat neutralization, and automated compliance evidence (PIPEDA, Law 25, SOC 2) to win enterprise deals with confidence.',
      benefits: isFr
        ? [
            'Dossier de preuves cryptographiques archivé en continu (LPRPDE, SOC 2)',
            'Architecture Zéro Confiance avec isolation instantanée des menaces',
            'Paquet d’audit de sécurité prêt à signer pour vos acheteurs corporatifs'
          ]
        : [
            'Continuous automated audit evidence for SOC 2, PIPEDA & Law 25',
            'Zero Trust credential security with autonomous threat isolation',
            'Executive security package ready for enterprise vendor sign-offs'
          ]
    }
  ];

  // The Boutique Advantage Comparison Matrix
  const boutiqueComparison = [
    {
      dimension: isFr ? 'Accès à l’Équipe' : 'Team Model',
      bigConsulting: isFr ? 'Vendu par des associés, délégué à des juniors' : 'Sold by senior partners, handed off to juniors',
      commodityMSP: isFr ? 'Techniciens de soutien généralistes (niveau 1)' : 'Helpdesk call center resetting passwords',
      oakivo: isFr ? 'Accompagnement direct par des fondateurs & ingénieurs seniors' : 'Direct partnership with senior founders & engineers'
    },
    {
      dimension: isFr ? 'Modernisation ERP' : 'Modern ERP Capability',
      bigConsulting: isFr ? 'Projets lourds sur 12 à 24 mois aux budgets à 7 chiffres' : 'Bloated 18-month implementations with 7-figure fees',
      commodityMSP: isFr ? 'Aucune compétence logicielle ou ERP' : 'Zero ERP or business software capability',
      oakivo: isFr ? 'ERP moderne sur mesure déployé et opérationnel en semaines' : 'Pragmatic, tailored modern ERP live in under 90 days'
    },
    {
      dimension: isFr ? 'Automatisation des Tâches' : 'Workflow Automation',
      bigConsulting: isFr ? 'Rapports stratégiques sans code exécutable' : 'Theoretical advisory slide decks with zero live code',
      commodityMSP: isFr ? 'Bricolages manuels ou scripts fragiles' : 'Basic off-the-shelf desktop repairs only',
      oakivo: isFr ? 'Pipelines automatisés et auto-cicatrisants déployés en direct' : 'Resilient, hands-free automation pipelines paying for themselves'
    },
    {
      dimension: isFr ? 'Cybersécurité & Conformité' : 'Cloud Security & Compliance',
      bigConsulting: isFr ? 'Dossiers de gouvernance théoriques sans surveillance continue' : 'High-overhead governance binders that gather dust',
      commodityMSP: isFr ? 'Antivirus de base non géré avec failles de sécurité non colmatées' : 'Basic commodity antivirus with unmonitored security gaps',
      oakivo: isFr ? 'Contrôles de sécurité automatisés, Zéro Confiance et souveraineté canadienne 24/7' : 'Continuous CSPM security, Zero Trust IAM, and automated PIPEDA / SOC 2 proof'
    },
    {
      dimension: isFr ? 'Délai vers le ROI' : 'Speed to Value',
      bigConsulting: isFr ? '6 à 18 mois avant la moindre rentabilité' : '6 to 18 months before any software reaches production',
      commodityMSP: isFr ? 'Réactif aux pannes matérielles sans vision de croissance' : 'Purely reactive break-fix with zero strategic momentum',
      oakivo: isFr ? 'Gains de temps et résultats mesurables dès le premier mois' : 'Measurable time savings and cash recovery in 2 to 4 weeks'
    },
    {
      dimension: isFr ? 'Proximité & Fuseau' : 'Local Accountability',
      bigConsulting: isFr ? 'Équipes distantes à Toronto ou réparties offshore' : 'Impersonal teams in Toronto or offshore call queues',
      commodityMSP: isFr ? 'Local mais capacités d’ingénierie très limitées' : 'Local presence but unable to automate core processes',
      oakivo: isFr ? '100 % Bilingue (FR/EN) • Heure de l’Atlantique (Dieppe, N.-B.)' : '100% Bilingual (EN/FR) in Atlantic Standard Time (Dieppe, NB)'
    }
  ];

  // 3-Step Process
  const steps = [
    {
      num: '01',
      title: isFr ? 'Session Découverte & Cartographie' : 'Discovery & Process Mapping',
      description: isFr
        ? 'Nous analysons vos goulots d’étranglement, logiciels actuels, posture de sécurité et flux administratifs pour identifier les opportunités à fort retour sur investissement.'
        : 'A focused evaluation of your operational bottlenecks, software friction, security posture, and admin toil to pinpoint high-ROI automation quick wins.'
    },
    {
      num: '02',
      title: isFr ? 'Implémentation Agile & Migration' : 'Agile Build & Safe Migration',
      description: isFr
        ? 'Configuration de votre ERP moderne, déploiement des ponts automatisés et sécurisation infonuagique avec migration propre des données sans interrompre votre activité.'
        : 'Rapid deployment of your unified ERP, automated revenue workflows, and hardened cloud guardrails with zero disruption to daily sales.'
    },
    {
      num: '03',
      title: isFr ? 'Accompagnement & Évolution' : 'Direct Founder Support & Evolution',
      description: isFr
        ? 'Formation pratique de vos équipes, surveillance proactive continue et accompagnement direct par nos spécialistes bilingues dans votre fuseau horaire.'
        : 'Hands-on team training, continuous proactive cloud security monitoring, and direct senior support in Atlantic Standard Time.'
    }
  ];

  return (
    <>
      <SEO 
        title="Modern ERP, Workflow Automation & Cloud Security | Atlantic Canada | Oakivo"
        description="Modernize business operations with modern ERP, hands-free workflow automation, and enterprise cloud cybersecurity & PIPEDA compliance. Direct founder accountability in Atlantic Standard Time."
        keywords="Modern ERP Atlantic Canada, Cloud Security New Brunswick, Business Workflow Automation, DevSecOps Dieppe, ERP Implementation Moncton, Automate Invoicing Canada, PIPEDA Cloud Compliance, Small Business Automation Halifax"
        canonical="/"
      />
      
      {/* 1. Minimalist Dynamic Hero with Ambient Video */}
      <DynamicHero />

      {/* 2. Executive Impact Strip - Balanced with Security, Automation & ERP */}
      <section className="py-12 px-6 bg-slate-950 border-y border-white/[0.06]">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 text-center">
            
            <div className="space-y-1">
              <div className="text-3xl md:text-4xl lg:text-5xl font-mono font-extrabold text-white tracking-tight">
                60%
              </div>
              <p className="text-xs md:text-sm text-slate-300 font-medium">
                {isFr ? 'Moins de saisie manuelle' : 'Less administrative toil'}
              </p>
              <span className="text-[11px] font-mono text-slate-500 block">
                {isFr ? 'Remplacement des tableurs' : 'Spreadsheets consolidated'}
              </span>
            </div>

            <div className="space-y-1">
              <div className="text-3xl md:text-4xl lg:text-5xl font-mono font-extrabold text-cyan-400 tracking-tight">
                25+ <span className="text-xl md:text-2xl font-sans font-light">hrs</span>
              </div>
              <p className="text-xs md:text-sm text-slate-300 font-medium">
                {isFr ? 'Gagnées par semaine / service' : 'Recovered weekly / dept'}
              </p>
              <span className="text-[11px] font-mono text-slate-500 block">
                {isFr ? 'Facturation & commandes auto' : 'Hands-free quote-to-cash'}
              </span>
            </div>

            <div className="space-y-1">
              <div className="text-3xl md:text-4xl lg:text-5xl font-mono font-extrabold text-white tracking-tight">
                100%
              </div>
              <p className="text-xs md:text-sm text-slate-300 font-medium">
                {isFr ? 'Conformité & Données Canadiennes' : 'PIPEDA & Sovereign Cloud'}
              </p>
              <span className="text-[11px] font-mono text-slate-500 block">
                {isFr ? 'Preuves d\'audit 24/7' : '24/7 automated audit proof'}
              </span>
            </div>

            <div className="space-y-1">
              <div className="text-3xl md:text-4xl lg:text-5xl font-mono font-extrabold text-cyan-400 tracking-tight">
                0
              </div>
              <p className="text-xs md:text-sm text-slate-300 font-medium">
                {isFr ? 'Angle mort de sécurité' : 'Security compromise tolerance'}
              </p>
              <span className="text-[11px] font-mono text-slate-500 block">
                {isFr ? 'Zéro Confiance & DevSecOps' : 'Zero Trust IAM & shift-left'}
              </span>
            </div>

          </div>
        </div>
      </section>

      {/* 3. Quiet Trust Carousel */}
      <TrustCarousel />

      {/* 4. Core Growth Transformations - Clean 4-Column Editorial Grid with Intersection Observer Animations */}
      <section id="capabilities" className="py-24 md:py-32 px-6 bg-[#070A0F] border-t border-white/[0.06]">
        <div className="container mx-auto max-w-7xl">
          
          <div className="max-w-3xl mb-16 md:mb-20 space-y-4">
            <div className="text-xs font-mono font-bold tracking-widest text-cyan-400 uppercase">
              {isFr ? 'LES 4 PILIERS : ERP · AUTOMATISATION · CLOUD · CYBERSÉCURITÉ' : 'THE FOUR PILLARS: ERP · AUTOMATION · CLOUD · CYBERSECURITY'}
            </div>
            <h2 className="text-3xl md:text-5xl font-display font-bold tracking-tight text-white leading-tight">
              {isFr 
                ? 'Une ingénierie concrète pour moderniser, automatiser et sécuriser votre entreprise.'
                : 'Engineered to modernize operations, eliminate admin drag, and secure your cloud.'
              }
            </h2>
            <p className="text-slate-400 font-light text-base md:text-lg leading-relaxed">
              {isFr
                ? 'Nous unifions vos opérations avec un ERP moderne, automatisons vos flux de facturation, architecturons des environnements infonuagiques résilients et protégeons vos données avec une cybersécurité d\'entreprise continue.'
                : 'We unify operations with modern ERP, automate quote-to-cash workflows, deploy resilient cloud architectures, and guard your critical assets with continuous enterprise cybersecurity.'
              }
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {outcomes.map((item, idx) => {
              const Icon = item.icon;
              return (
                <IntersectionAnimatedCard 
                  key={item.num}
                  delayMs={idx * 110}
                  className="h-full"
                >
                  <div className="h-full rounded-2xl bg-slate-900/40 border border-white/[0.08] p-7 hover:border-cyan-500/40 transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between group shadow-lg hover:shadow-cyan-500/10 cursor-default">
                    <div>
                      <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/[0.06]">
                        <div className="w-10 h-10 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform duration-300">
                          <Icon size={20} />
                        </div>
                        <span className="text-xs font-mono text-slate-500">
                          {item.num}
                        </span>
                      </div>

                      <h3 className="text-lg font-display font-bold text-white mb-2 leading-snug">
                        {item.title}
                      </h3>

                      <div className="text-xs font-mono text-cyan-400 mb-4 font-semibold">
                        {item.outcomeMetric}
                      </div>

                      <p className="text-slate-400 font-light leading-relaxed text-xs md:text-sm mb-6">
                        {item.description}
                      </p>
                    </div>

                    <ul className="space-y-2 pt-4 border-t border-white/[0.06]">
                      {item.benefits.map((benefit, bIdx) => (
                        <li key={bIdx} className="flex items-start gap-2 text-xs text-slate-300 font-light">
                          <CheckCircle2 size={13} className="text-cyan-400 shrink-0 mt-0.5" />
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </IntersectionAnimatedCard>
              );
            })}
          </div>

          {/* Quick link to interactive ROI calculator */}
          <div className="mt-12 p-6 rounded-2xl bg-cyan-950/20 border border-cyan-500/20 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 flex items-center justify-center text-cyan-400 shrink-0">
                <Calculator size={20} />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">
                  {isFr ? 'Curieux de connaître vos économies réelles ?' : 'Curious how many hours your team could recover?'}
                </h4>
                <p className="text-xs text-slate-400 font-light">
                  {isFr ? 'Testez notre calculateur de retour sur investissement interactif dans la section Services.' : 'Explore our interactive ROI Calculator in the Services section to quantify your annual dollar savings.'}
                </p>
              </div>
            </div>
            <Link
              to="/services#roi-calculator"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-white text-slate-950 hover:bg-slate-200 text-xs font-bold uppercase tracking-wider shrink-0 transition-all shadow-md hover:shadow-cyan-500/20"
            >
              <span>{isFr ? 'Calculer Mon RCI' : 'Calculate ROI'}</span>
              <ArrowRight size={14} />
            </Link>
          </div>

        </div>
      </section>

      {/* 5. The Agile Boutique Advantage - Direct, Honest Comparison Matrix */}
      <section className="py-24 md:py-32 px-6 bg-[#0B0F17] border-t border-white/[0.06]">
        <div className="container mx-auto max-w-7xl">
          <div className="max-w-3xl mb-16 space-y-3">
            <div className="text-xs font-mono font-bold tracking-widest text-cyan-400 uppercase">
              {isFr ? 'L’AVANTAGE BOUTIQUE' : 'THE AGILITY ADVANTAGE'}
            </div>
            <h2 className="text-3xl md:text-5xl font-display font-bold tracking-tight text-white">
              {isFr ? 'Pourquoi les PME Choisissent Oakivo' : 'Why Growing Businesses Choose Oakivo'}
            </h2>
            <p className="text-slate-400 font-light text-base md:text-lg">
              {isFr
                ? 'Le juste équilibre entre la rigueur d’ingénieurs de haut niveau et la proximité d’un partenaire local dévoué.'
                : 'The sweet spot between multi-million dollar corporate consulting bloat and commodity IT shops that can’t automate workflows.'
              }
            </p>
          </div>

          <div className="bg-slate-900/40 backdrop-blur-md rounded-2xl border border-white/[0.08] overflow-x-auto shadow-2xl">
            <table className="w-full text-left text-xs md:text-sm border-collapse min-w-[700px]">
              <thead>
                <tr className="border-b border-white/[0.08] bg-slate-950/60">
                  <th className="p-4 md:p-5 font-mono text-slate-400 font-semibold uppercase">{isFr ? 'Dimension' : 'Dimension'}</th>
                  <th className="p-4 md:p-5 font-mono text-slate-400 font-medium uppercase">{isFr ? 'Grands Cabinets (Big 4)' : 'The Big Monoliths (Big 4)'}</th>
                  <th className="p-4 md:p-5 font-mono text-slate-400 font-medium uppercase">{isFr ? 'Dépanneurs IT / MSP Locaux' : 'Commodity IT / Break-Fix MSPs'}</th>
                  <th className="p-4 md:p-5 font-mono text-cyan-400 font-bold uppercase bg-cyan-950/30 border-l border-r border-cyan-800/40">{isFr ? 'Oakivo (Le Cabinet Boutique)' : 'Oakivo Solutions (Agile Boutique)'}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.06] text-slate-300">
                {boutiqueComparison.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-900/20 transition-colors">
                    <td className="p-4 md:p-5 font-semibold text-white">{row.dimension}</td>
                    <td className="p-4 md:p-5 text-slate-400">{row.bigConsulting}</td>
                    <td className="p-4 md:p-5 text-slate-400">{row.commodityMSP}</td>
                    <td className="p-4 md:p-5 text-white font-medium bg-cyan-950/20 border-l border-r border-cyan-800/30 flex items-center gap-2">
                      <CheckCircle2 size={15} className="text-cyan-400 shrink-0" />
                      <span>{row.oakivo}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 6. The 3-Step Predictable Framework */}
      <section id="methodology" className="py-24 md:py-32 px-6 bg-[#070A0F] border-t border-white/[0.06]">
        <div className="container mx-auto max-w-7xl">
          
          <div className="max-w-2xl mb-16 space-y-3">
            <div className="text-xs font-mono font-bold tracking-widest text-cyan-400 uppercase">
              {isFr ? 'NOTRE MÉTHODOLOGIE' : 'HOW WE ENGAGE'}
            </div>
            <h2 className="text-3xl md:text-5xl font-display font-bold tracking-tight text-white mb-4">
              {isFr ? 'Du Goulot d’Étranglement à la Fluidité' : 'From Friction to Flow in 3 Steps'}
            </h2>
            <p className="text-slate-400 font-light text-base md:text-lg">
              {isFr
                ? 'Un parcours prévisible en 3 phases, sans interruption de vos activités quotidiennes.'
                : 'A predictable, three-phase framework with zero disruption to daily customer operations.'
              }
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {steps.map((step) => (
              <div key={step.num} className="flex flex-col bg-slate-900/30 p-8 rounded-2xl border border-white/[0.08] hover:border-slate-700 transition-colors">
                <div className="text-3xl font-display font-light text-cyan-400 mb-4 pb-3 border-b border-white/[0.06]">
                  {step.num}
                </div>
                <h3 className="text-lg font-display font-bold text-white mb-3">
                  {step.title}
                </h3>
                <p className="text-sm text-slate-400 font-light leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 7. Minimalist, Ultra-Effective Final Call To Action */}
      <section className="py-24 md:py-32 px-6 bg-slate-950 border-t border-white/[0.06] relative">
        <div className="container mx-auto max-w-4xl text-center">
          
          <div className="inline-flex items-center gap-2 text-[11px] font-mono text-cyan-400 uppercase tracking-widest mb-6">
            <span>{isFr ? 'SIÈGE SOCIAL À DIEPPE, N.-B.' : 'DIEPPE, NB HEADQUARTERS'}</span>
            <span className="text-slate-600" aria-hidden="true">·</span>
            <span>{isFr ? '100% BILINGUE (FR/EN)' : '100% BILINGUAL TEAM'}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold tracking-tight text-white mb-6 leading-tight text-balance">
            {isFr 
              ? 'Prêt à éliminer vos goulots d’étranglement, automatiser vos flux et sécuriser vos systèmes ?'
              : 'Ready to eliminate operational bottlenecks, automate workflows, and lock down security?'
            }
          </h2>

          <p className="text-slate-400 font-light text-base md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed text-balance">
            {isFr
              ? 'Réservez une session découverte confidentielle de 30 minutes avec nos fondateurs et ingénieurs. Nous analyserons vos processus et tracerons votre feuille de route.'
              : 'Schedule a confidential 30-minute discovery session with our senior partners. We will evaluate your software stack, identify immediate automation opportunities, and outline a high-ROI blueprint.'
            }
          </p>

          {/* Primary High-Converting CTA Button */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              type="button"
              id="final-book-audit-cta"
              onClick={() => triggerAuditDrawer('General Digital Transformation Advisory')}
              aria-label={isFr ? "Planifier une session découverte de 30 minutes" : "Schedule 30-Minute Discovery Session"}
              className="w-full sm:w-auto inline-flex items-center justify-center px-9 py-4 text-xs font-semibold tracking-widest uppercase text-slate-950 transition-all duration-300 bg-white hover:bg-slate-200 rounded-lg cursor-pointer focus:outline-none focus:ring-2 focus:ring-cyan-400 shadow-xl shadow-white/10 hover:shadow-cyan-500/20"
            >
              <span className="flex items-center gap-3">
                {isFr ? "Planifier Ma Session Découverte (30 Min)" : "Schedule Your 30-Minute Discovery Session"}
                <ArrowRight aria-hidden="true" className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </button>
          </div>

          {/* Friction-Removal Guarantees */}
          <div className="flex items-center justify-center gap-6 md:gap-10 mt-8 text-xs font-mono text-slate-400 flex-wrap">
            <span className="flex items-center gap-2">
              <CheckCircle2 size={13} className="text-cyan-400" />
              <span>{isFr ? "Sans engagement commercial" : "Zero sales pitch"}</span>
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle2 size={13} className="text-cyan-400" />
              <span>{isFr ? "100% Confidentiel" : "100% confidential"}</span>
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle2 size={13} className="text-cyan-400" />
              <span>{isFr ? "Accès direct aux fondateurs" : "Direct founder access"}</span>
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle2 size={13} className="text-cyan-400" />
              <span>{isFr ? "Réponse sous 24h" : "24-hour response guarantee"}</span>
            </span>
          </div>

          {/* Direct Contact Option for Executives */}
          <div className="mt-12 pt-8 border-t border-white/[0.06] flex items-center justify-center gap-8 text-xs font-mono text-slate-500">
            <a href="mailto:contact@oakivo.com" className="hover:text-cyan-400 transition-colors flex items-center gap-1.5">
              <Mail size={13} />
              <span>contact@oakivo.com</span>
            </a>
            <a href="tel:+15068002440" className="hover:text-cyan-400 transition-colors flex items-center gap-1.5">
              <Phone size={13} />
              <span>+1 (506) 800-2440</span>
            </a>
          </div>

        </div>
      </section>
    </>
  );
};

export default Home;
