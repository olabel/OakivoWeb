import React from 'react';
import { ArrowRight, ShieldCheck, CheckCircle2, Lock, GitBranch, Key, Server, Mail, Phone } from 'lucide-react';
import SEO from '../components/SEO';
import TrustCarousel from '../components/TrustCarousel';
import DynamicHero from '../components/DynamicHero';
import { useLanguage } from '../context/LanguageContext';

const Home: React.FC = () => {
  const { t, language } = useLanguage();
  const isFr = language === 'fr';

  const triggerAuditDrawer = () => {
    window.dispatchEvent(new CustomEvent('open-lead-drawer', {
      detail: {
        focus: 'Executive Security Architecture Audit',
        topic: 'Home: 30-Minute Security Audit Request',
        industry: isFr ? 'Entreprise Canadienne' : 'Canadian Enterprise'
      }
    }));
  };

  const capabilities = [
    {
      icon: ShieldCheck,
      num: '01',
      title: isFr ? 'Gestion de la Posture Infonuagique (CSPM)' : 'Cloud Security Posture Management',
      description: isFr
        ? 'Détection continue des mauvaises configurations et remédiation automatisée sur AWS et Azure. Vos infrastructures restent conformes 24/7 sans vérifications manuelles.'
        : 'Continuous multi-cloud configuration auditing and automated drift remediation across AWS and Azure. Keep your infrastructure audit-ready 24/7/365 without manual fire-drills.',
      bullets: isFr
        ? ['Conformité continue SOC 2 & Loi 25', 'Détection de dérive Terraform / OpenTofu', 'Résidence des données strictement canadienne']
        : ['Continuous SOC 2 & Law 25 compliance', 'Terraform / OpenTofu drift remediation', 'Strict Canadian data residency guarantees']
    },
    {
      icon: GitBranch,
      num: '02',
      title: isFr ? 'Pipelines DevSecOps & Shift-Left' : 'DevSecOps & CI/CD Pipelines',
      description: isFr
        ? 'Intégration native de garde-fous Policy-as-Code et d\'analyse de secrets directement dans vos requêtes d\'extraction (PR). Les développeurs livrent vite en toute sécurité.'
        : 'Native Policy-as-Code guardrails, SAST, and secrets scanning embedded directly into developer pull requests. Ship fast with instant automated feedback.',
      bullets: isFr
        ? ['Garde-fous de pré-déploiement automatisés', 'Analyse des conteneurs & dépendances (SBOM)', 'Zéro ralentissement des cycles de livraison']
        : ['Automated pre-commit policy enforcement', 'Container & dependency vulnerability scanning', 'Zero disruption to daily release cycles']
    },
    {
      icon: Key,
      num: '03',
      title: isFr ? 'Gouvernance Zéro Confiance & Accès ERP' : 'Zero-Trust IAM & ERP Hardening',
      description: isFr
        ? 'Protection cryptographique de vos données opérationnelles et ERP critiques (Odoo, bases de données, API). Élimination des privilèges excessifs et des accès fantômes.'
        : 'Cryptographic least-privilege identity governance protecting your core operational ERP, databases, and customer records from credential abuse and lateral movement.',
      bullets: isFr
        ? ['Moindre privilège et rotation automatique', 'Chiffrement de bout en bout mTLS', 'Conformité rigoureuse LPRPDE / PIPEDA']
        : ['Role-based least-privilege & auto-rotation', 'Mutual TLS end-to-end encryption', 'Strict PIPEDA & privacy regulatory alignment']
    }
  ];

  const methodologySteps = [
    {
      num: '01',
      title: isFr ? 'Audit & Diagnostic Initial' : 'Diagnostic Architecture Audit',
      description: isFr
        ? 'Revue confidentielle de 30 minutes de votre infrastructure infonuagique, de vos accès ERP et de vos pipelines CI/CD pour cibler vos risques prioritaires.'
        : 'A 30-minute confidential evaluation of your cloud environment, ERP access topology, and deployment pipelines to identify high-risk exposure points.'
    },
    {
      num: '02',
      title: isFr ? 'Ingénierie & Garde-fous Automatisés' : 'Automated Hardening & Pipelines',
      description: isFr
        ? 'Déploiement de règles Policy-as-Code sur mesure, durcissement des conteneurs et élimination automatisée des dérives de configuration.'
        : 'Deployment of custom Policy-as-Code guardrails, container hardening, and automated remediation workflows tailored to your stack.'
    },
    {
      num: '03',
      title: isFr ? 'Gouvernance Continue & SRE' : 'Continuous Posture Governance',
      description: isFr
        ? 'Surveillance continue pilotée par les principes SRE pour garantir une résilience durable et une préparation permanente aux audits de conformité.'
        : 'Ongoing SRE-driven posture telemetry ensuring your infrastructure remains hardened, compliant, and unbreachable as your team scales.'
    }
  ];

  return (
    <>
      <SEO 
        title="DevSecOps Moncton & Cloud Security New Brunswick | Oakivo Solutions"
        description="Atlantic Canada & Canadian enterprise DevSecOps partner. Expert SOC 2 Type II readiness, Bill C-26 compliance, and Terraform AWS EKS hardening in Moncton, Halifax, and Calgary."
        keywords="DevSecOps Moncton, Cloud Security New Brunswick, SOC 2 Type II Canada, Bill C-26 Critical Cyber Systems, PIPEDA cloud storage architecture, Terraform AWS EKS hardening, Dieppe NB cloud security"
        canonical="/"
      />
      
      {/* 1. Minimalist Dynamic Hero */}
      <DynamicHero />

      {/* 2. Quiet Trust & Certifications Ticker */}
      <TrustCarousel />

      {/* 3. Core Architectural Pillars - Clean, Minimalist 3-Column Grid */}
      <section id="capabilities" className="py-24 md:py-32 px-6 bg-slate-950 border-t border-slate-900">
        <div className="container mx-auto max-w-7xl">
          
          <div className="max-w-3xl mb-16 md:mb-20">
            <div className="text-xs font-mono font-medium tracking-widest text-cyan-400 uppercase mb-3">
              {isFr ? 'CE QUE NOUS SÉCURISONS' : 'CORE CAPABILITIES'}
            </div>
            <h2 className="text-3xl md:text-5xl font-display font-bold tracking-tight text-white mb-6 leading-tight">
              {isFr 
                ? 'Une sécurité automatisée, conçue pour la vitesse de votre équipe.'
                : 'Automated cloud security, engineered for developer velocity.'
              }
            </h2>
            <p className="text-slate-400 font-light text-base md:text-lg leading-relaxed">
              {isFr
                ? 'Nous remplaçons les interventions manuelles et la panique des audits par des politiques automatisées intégrées directement dans vos infrastructures.'
                : 'We eliminate manual compliance fire-drills and late-stage security bottlenecks by embedding automated guardrails directly into your operational pipelines.'
              }
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
            {capabilities.map((cap) => {
              const Icon = cap.icon;
              return (
                <div 
                  key={cap.num}
                  className="rounded-2xl bg-slate-900/30 border border-slate-800/70 p-8 hover:border-slate-700 transition-colors flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-800/50">
                      <div className="w-10 h-10 rounded-lg bg-cyan-950/40 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
                        <Icon size={20} />
                      </div>
                      <span className="text-xs font-mono text-slate-500 font-light">
                        {cap.num}
                      </span>
                    </div>

                    <h3 className="text-xl font-display font-bold text-white mb-4 leading-snug">
                      {cap.title}
                    </h3>

                    <p className="text-slate-400 font-light leading-relaxed text-sm md:text-base mb-6">
                      {cap.description}
                    </p>
                  </div>

                  <ul className="space-y-2.5 pt-4 border-t border-slate-800/40">
                    {cap.bullets.map((bullet, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-300 font-light">
                        <CheckCircle2 size={13} className="text-cyan-400 shrink-0 mt-0.5" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 4. The 3-Step Engagement Model - Quiet, Editorial Process */}
      <section id="methodology" className="py-24 md:py-32 px-6 bg-[#070A0F] border-t border-slate-900">
        <div className="container mx-auto max-w-7xl">
          
          <div className="max-w-2xl mb-16">
            <div className="text-xs font-mono font-medium tracking-widest text-cyan-400 uppercase mb-3">
              {isFr ? 'NOTRE MÉTHODE' : 'ENGAGEMENT ROADMAP'}
            </div>
            <h2 className="text-3xl md:text-5xl font-display font-bold tracking-tight text-white mb-4">
              {isFr ? 'Comment nous travaillons' : 'How We Engage'}
            </h2>
            <p className="text-slate-400 font-light text-base md:text-lg">
              {isFr
                ? 'Un parcours structuré en 3 étapes sans perturbation de vos opérations courantes.'
                : 'A predictable, three-phase framework with zero disruption to daily engineering releases.'
              }
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {methodologySteps.map((step) => (
              <div key={step.num} className="flex flex-col">
                <div className="text-3xl font-display font-light text-slate-700 mb-4 pb-3 border-b border-slate-800">
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

      {/* 5. Minimalist, Ultra-Effective Final Call To Action */}
      <section className="py-24 md:py-32 px-6 bg-slate-950 border-t border-slate-900 relative">
        <div className="container mx-auto max-w-4xl text-center">
          
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/40 border border-cyan-800/40 text-[11px] font-mono text-cyan-400 uppercase tracking-widest mb-6">
            <span>{isFr ? 'SIÈGE SOCIAL À DIEPPE, N.-B.' : 'DIEPPE, NB HEADQUARTERS'}</span>
            <span className="text-slate-600" aria-hidden="true">·</span>
            <span>{isFr ? 'INGÉNIERIE 100% BILINGUE' : '100% BILINGUAL TEAM'}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold tracking-tight text-white mb-6 leading-tight text-balance">
            {isFr 
              ? 'Prêt à sécuriser votre infrastructure sans ralentir vos déploiements ?'
              : 'Ready to harden your cloud infrastructure without sacrificing developer velocity?'
            }
          </h2>

          <p className="text-slate-400 font-light text-base md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed text-balance">
            {isFr
              ? 'Réservez une évaluation confidentielle de 30 minutes avec un architecte DevSecOps senior. Nous analyserons vos risques prioritaires et tracerons votre feuille de route de remédiation.'
              : 'Book a confidential 30-minute architecture review with our senior DevSecOps architects. We will identify your high-risk vulnerabilities and outline a prioritized remediation path.'
            }
          </p>

          {/* Primary High-Converting CTA Button */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              type="button"
              id="final-book-audit-cta"
              onClick={triggerAuditDrawer}
              aria-label={isFr ? "Demander un audit d'architecture de sécurité de 30 minutes" : "Schedule 30-Minute Security Architecture Audit"}
              className="w-full sm:w-auto inline-flex items-center justify-center px-9 py-4 text-xs font-semibold tracking-widest uppercase text-slate-950 transition-all duration-300 bg-white hover:bg-slate-200 rounded-lg cursor-pointer focus:outline-none focus:ring-2 focus:ring-cyan-400 shadow-xl shadow-white/10 hover:shadow-cyan-500/20"
            >
              <span className="flex items-center gap-3">
                {isFr ? "Demander Mon Audit de Sécurité (30 Min)" : "Schedule Your 30-Minute Security Audit"}
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
              <span>{isFr ? "Réponse sous 24h" : "24-hour response guarantee"}</span>
            </span>
          </div>

          {/* Direct Contact Option for Executives */}
          <div className="mt-12 pt-8 border-t border-slate-900 flex items-center justify-center gap-8 text-xs font-mono text-slate-500">
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
