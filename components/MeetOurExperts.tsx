import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Shield, 
  Lock, 
  Terminal, 
  CheckCircle2, 
  Linkedin, 
  ExternalLink, 
  Fingerprint, 
  Key, 
  FileCode, 
  Cpu, 
  Layers, 
  Copy, 
  Check, 
  Award, 
  MapPin, 
  Sparkles,
  ArrowRight,
  Clock,
  Activity,
  Zap,
  FileCheck
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface ArchitectDossier {
  nodeId: string;
  name: string;
  title: string;
  practiceRole: string;
  monogram: string;
  securityDomain: 'cloud_zerotrust' | 'devsecops_pipeline' | 'sre_ebpf' | 'governance_sovereignty';
  clearanceStandard: string;
  pgpKeyId: string;
  pgpFingerprint: string;
  verifiedCredentials: string[];
  directives: string[];
  trackRecord: {
    metric: string;
    label: string;
  }[];
  primaryTools: string[];
  location: string;
  timezone: string;
  bilingual: string;
  linkedin: string;
}

export const MeetOurExperts: React.FC = () => {
  const { language } = useLanguage();
  const isFrench = language === 'fr';

  const [copiedFingerprint, setCopiedFingerprint] = useState<string | null>(null);
  const [activeView, setActiveView] = useState<'dossiers' | 'matrix'>('dossiers');

  const handleCopyFingerprint = (fingerprint: string, nodeId: string) => {
    navigator.clipboard.writeText(fingerprint);
    setCopiedFingerprint(nodeId);
    setTimeout(() => setCopiedFingerprint(null), 3000);
  };

  const architects: ArchitectDossier[] = [
    {
      nodeId: "OAK-ARCH-001",
      name: "Ahmed Bello, M.Sc.",
      title: isFrench 
        ? "Architecte Principal de Sécurité Infonuagique & Fondateur" 
        : "Principal Cloud Security Architect & Founder",
      practiceRole: isFrench 
        ? "Direction de la Pratique • Architecture Zéro Confiance & Posture Infonuagique" 
        : "Practice Lead • Zero-Trust Cloud Architecture & Cloud Security Posture",
      monogram: "AB",
      securityDomain: "cloud_zerotrust",
      clearanceStandard: isFrench 
        ? "Alignement Fiabilité Approfondie / Protégé B du Canada" 
        : "Canadian Enhanced Reliability & Protected B Standard",
      pgpKeyId: "4D72-90AE",
      pgpFingerprint: "9F4B 21D8 7C3A E590 B812 40DF 681A 93CE 4D72 90AE",
      verifiedCredentials: [
        "CISSP® Certified",
        "AWS Security - Specialty",
        "CKA (K8s Administrator)",
        "M.Sc. Computing"
      ],
      directives: isFrench ? [
        "Conçoit des architectures infonuagiques Zéro Confiance et des zones d'atterrissage sécurisées sur AWS et GCP.",
        "Met en application le principe du moindre privilège IAM, la séparation des rôles et l'authentification multifacteur.",
        "Réalise des revues techniques de posture de sécurité et d'architecture pour les entreprises canadiennes."
      ] : [
        "Designs zero-trust multi-cloud architectures and secure landing zones across AWS and GCP environments.",
        "Enforces least-privilege IAM policies, credential lifecycle management, and mandatory multi-factor controls.",
        "Conducts technical cloud security posture reviews and architectural hardening assessments for Canadian clients."
      ],
      trackRecord: [
        { metric: "12+ Yrs", label: isFrench ? "Sécurité Nuage" : "Cloud Security" },
        { metric: "35+", label: isFrench ? "Revues d'Architecture" : "Architecture Reviews" },
        { metric: "100%", label: isFrench ? "Livraison Directe" : "Direct Delivery" }
      ],
      primaryTools: ["AWS KMS", "GCP IAM", "Kubernetes", "HashiCorp Vault", "Terraform"],
      location: "Dieppe, NB",
      timezone: "Atlantic Time (AST)",
      bilingual: isFrench ? "Anglais (Lead Ingénierie)" : "English (Engineering Lead)",
      linkedin: "https://www.linkedin.com/company/oakivo"
    },
    {
      nodeId: "OAK-ARCH-002",
      name: "Funmilayo Akinsiku, P.Eng.",
      title: isFrench 
        ? "Ingénieure DevSecOps & Automatisation de Pipelines" 
        : "DevSecOps & Pipeline Automation Engineer",
      practiceRole: isFrench 
        ? "Ingénierie DevSecOps • Intégration CI/CD & Garde-fous de Sécurité" 
        : "DevSecOps Engineering • CI/CD Pipeline Security & Policy Guardrails",
      monogram: "FA",
      securityDomain: "devsecops_pipeline",
      clearanceStandard: isFrench 
        ? "Ingénieure Professionnelle Agréée (P.Eng. Alberta)" 
        : "Licensed Professional Engineer (P.Eng. Alberta)",
      pgpKeyId: "6231-C70A",
      pgpFingerprint: "3E71 8A29 F04D 55BC 198E 6231 C70A B14F 8892 01AC",
      verifiedCredentials: [
        "P.Eng. Licensed (AB)",
        "CKS (Kubernetes Security)",
        "Terraform Associate",
        "CI/CD Security Automation"
      ],
      directives: isFrench ? [
        "Intègre l'analyse automatisée des vulnérabilités de conteneurs dans les pipelines CI/CD avant la livraison.",
        "Configure des politiques de contrôle d'admission Kubernetes et des garde-fous pour les déploiements d'applications.",
        "Maintient des gabarits d'Infrastructure-as-Code modulaires et reproductibles avec Terraform."
      ] : [
        "Integrates automated container vulnerability scanning and policy validation into CI/CD build pipelines.",
        "Configures Kubernetes admission controllers and declarative guardrails to prevent insecure configurations.",
        "Authors and maintains reproducible Infrastructure-as-Code modules using Terraform to prevent configuration drift."
      ],
      trackRecord: [
        { metric: "8+ Yrs", label: isFrench ? "Ingénierie & DevOps" : "Engineering & DevOps" },
        { metric: "40+", label: isFrench ? "Pipelines CI/CD" : "CI/CD Pipelines" },
        { metric: "Automated", label: isFrench ? "Tests de Sécurité" : "Security Gates" }
      ],
      primaryTools: ["Terraform", "GitHub Actions", "Kubernetes", "Trivy", "Cosign"],
      location: "Calgary, AB",
      timezone: "Mountain Time (MST)",
      bilingual: isFrench ? "100 % Bilingue (FR/EN)" : "100% Bilingual (EN/FR)",
      linkedin: "https://www.linkedin.com/company/oakivo"
    },
    {
      nodeId: "OAK-ARCH-003",
      name: "Fawaz Bello",
      title: isFrench 
        ? "Spécialiste Associé Infonuagique & DevSecOps (Professionnel Émergent)" 
        : "Associate Cloud & DevSecOps Specialist (Emerging Professional)",
      practiceRole: isFrench 
        ? "Opérations Infonuagiques • Observabilité & Automatisation des Déploiements" 
        : "Cloud Operations • Infrastructure Observability & Deployment Automation",
      monogram: "FB",
      securityDomain: "sre_ebpf",
      clearanceStandard: isFrench 
        ? "Praticien Infonuagique Émergent • Parcours Certifié Linux Foundation" 
        : "Emerging Cloud Practitioner • Linux Foundation Certification Pathway",
      pgpKeyId: "5519-E882",
      pgpFingerprint: "B260 D51C 4E88 77F3 9012 33AC 5519 E882 7A10 33DE",
      verifiedCredentials: [
        "AWS Cloud Practitioner",
        "Linux Foundation Pathway",
        "Kubernetes Fundamentals",
        "Cloud Observability"
      ],
      directives: isFrench ? [
        "Assiste à la mise en place de sondes d'observabilité, métriques Prometheus et tableaux de bord Grafana.",
        "Collabore au maintien des scripts de déploiement continu et à l'automatisation des tests d'intégration.",
        "Effectue la surveillance proactive des journaux d'infrastructure et les vérifications de bon fonctionnement."
      ] : [
        "Assists with configuring observability probes, Prometheus metrics collection, and Grafana monitoring dashboards.",
        "Supports automated continuous integration workflows, container builds, and test environment verification.",
        "Performs proactive infrastructure log monitoring, system health checks, and routine environment maintenance."
      ],
      trackRecord: [
        { metric: "3+ Yrs", label: isFrench ? "Expérience Tech" : "Tech Experience" },
        { metric: "24/7", label: isFrench ? "Surveillance Systèmes" : "System Telemetry" },
        { metric: "Proactive", label: isFrench ? "Gestion Alertes" : "Incident Support" }
      ],
      primaryTools: ["Prometheus", "Grafana", "Docker", "GitHub Actions", "Linux"],
      location: "Dieppe, NB",
      timezone: "Atlantic Time (AST)",
      bilingual: isFrench ? "100 % Bilingue (FR/EN)" : "100% Bilingual (EN/FR)",
      linkedin: "https://www.linkedin.com/company/oakivo"
    },
    {
      nodeId: "OAK-ARCH-004",
      name: "Taiwo Owoeye",
      title: isFrench 
        ? "Analyste d'Affaires" 
        : "Business Analyst",
      practiceRole: isFrench 
        ? "Analyse d'Affaires • Spécification des Besoins & Cartographie des Processus" 
        : "Business Analysis • Requirements Elicitation & Process Mapping",
      monogram: "TO",
      securityDomain: "governance_sovereignty",
      clearanceStandard: isFrench 
        ? "Analyse d'Affaires & Optimisation des Processus Métiers" 
        : "Business Analysis & Operational Process Optimization",
      pgpKeyId: "328C-90FE",
      pgpFingerprint: "78FA 119C D423 881B E092 64A1 328C 90FE 1904 887B",
      verifiedCredentials: [
        "Business Analysis (BA)",
        "Process Mapping (BPMN)",
        "Agile User Stories & Backlog",
        "Stakeholder Alignment"
      ],
      directives: isFrench ? [
        "Recueille et documente avec précision les exigences fonctionnelles et les besoins des parties prenantes.",
        "Cartographie les flux de travail opérationnels pour aligner les équipes techniques avec les objectifs d'affaires.",
        "Facilite les cérémonies agiles, la gestion du carnet de produit (backlog) et les tests d'acceptation utilisateurs (UAT)."
      ] : [
        "Elicits and documents functional requirements, operational workflows, and client user stories with high clarity.",
        "Maps current-state and future-state business processes to align engineering deliverables with client objectives.",
        "Facilitates agile sprint backlog refinement, acceptance criteria definition, and user acceptance testing (UAT)."
      ],
      trackRecord: [
        { metric: "6+ Yrs", label: isFrench ? "Analyse d'Affaires" : "Business Analysis" },
        { metric: "35+", label: isFrench ? "Processus Cartographiés" : "Workflows Mapped" },
        { metric: "100%", label: isFrench ? "Clarté des Exigences" : "Requirements Clarity" }
      ],
      primaryTools: ["Jira / Confluence", "BPMN / Miro", "Agile / Scrum", "Requirement Docs", "Lucidchart"],
      location: "Dieppe, NB",
      timezone: "Atlantic Time (AST)",
      bilingual: isFrench ? "Anglais (Analyse d'Affaires)" : "English (Business Analyst)",
      linkedin: "https://www.linkedin.com/company/oakivo"
    }
  ];

  // Domain-specific security heraldic crests (rendered as precision SVGs instead of portrait photos)
  const renderDomainEmblem = (domain: ArchitectDossier['securityDomain'], monogram: string) => {
    switch (domain) {
      case 'cloud_zerotrust':
        return (
          <div className="relative w-24 h-24 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-950 to-cyan-950/60 border-2 border-cyan-500/40 flex items-center justify-center shadow-lg shadow-cyan-950/40 group-hover:border-cyan-400 transition-colors">
            {/* Geometric Zero-Trust Lattice SVG */}
            <svg className="absolute inset-0 w-full h-full p-2 opacity-30 pointer-events-none" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="42" fill="none" stroke="#06b6d4" strokeWidth="1.5" strokeDasharray="3 3" />
              <circle cx="50" cy="50" r="30" fill="none" stroke="#06b6d4" strokeWidth="1" />
              <line x1="50" y1="8" x2="50" y2="92" stroke="#06b6d4" strokeWidth="0.8" opacity="0.6" />
              <line x1="8" y1="50" x2="92" y2="50" stroke="#06b6d4" strokeWidth="0.8" opacity="0.6" />
              <polygon points="50,20 80,50 50,80 20,50" fill="none" stroke="#06b6d4" strokeWidth="1.2" />
            </svg>
            <div className="relative z-10 flex flex-col items-center justify-center">
              <Lock className="w-6 h-6 text-cyan-400 mb-0.5" />
              <span className="font-mono text-sm font-bold text-white tracking-widest">{monogram}</span>
              <span className="text-[9px] font-mono text-cyan-300 uppercase tracking-wider">ZERO-TRUST</span>
            </div>
          </div>
        );

      case 'devsecops_pipeline':
        return (
          <div className="relative w-24 h-24 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-950 to-emerald-950/60 border-2 border-emerald-500/40 flex items-center justify-center shadow-lg shadow-emerald-950/40 group-hover:border-emerald-400 transition-colors">
            {/* Hexagonal Supply-Chain Seal SVG */}
            <svg className="absolute inset-0 w-full h-full p-2 opacity-30 pointer-events-none" viewBox="0 0 100 100">
              <polygon points="50,8 88,28 88,72 50,92 12,72 12,28" fill="none" stroke="#10b981" strokeWidth="1.5" strokeDasharray="4 2" />
              <polygon points="50,20 76,35 76,65 50,80 24,65 24,35" fill="none" stroke="#10b981" strokeWidth="1" />
              <circle cx="50" cy="50" r="16" fill="none" stroke="#10b981" strokeWidth="0.8" />
            </svg>
            <div className="relative z-10 flex flex-col items-center justify-center">
              <FileCode className="w-6 h-6 text-emerald-400 mb-0.5" />
              <span className="font-mono text-sm font-bold text-white tracking-widest">{monogram}</span>
              <span className="text-[9px] font-mono text-emerald-300 uppercase tracking-wider">COSIGN / OPA</span>
            </div>
          </div>
        );

      case 'sre_ebpf':
        return (
          <div className="relative w-24 h-24 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-950 to-amber-950/60 border-2 border-amber-500/40 flex items-center justify-center shadow-lg shadow-amber-950/40 group-hover:border-amber-400 transition-colors">
            {/* Kernel Waveform & Radar Pulse SVG */}
            <svg className="absolute inset-0 w-full h-full p-2 opacity-30 pointer-events-none" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="40" fill="none" stroke="#f59e0b" strokeWidth="1.5" />
              <circle cx="50" cy="50" r="26" fill="none" stroke="#f59e0b" strokeWidth="1" strokeDasharray="2 2" />
              <path d="M 15 50 L 35 50 L 42 25 L 52 75 L 60 40 L 68 55 L 85 50" fill="none" stroke="#f59e0b" strokeWidth="1.5" />
            </svg>
            <div className="relative z-10 flex flex-col items-center justify-center">
              <Zap className="w-6 h-6 text-amber-400 mb-0.5" />
              <span className="font-mono text-sm font-bold text-white tracking-widest">{monogram}</span>
              <span className="text-[9px] font-mono text-amber-300 uppercase tracking-wider">OPS / SRE</span>
            </div>
          </div>
        );

      case 'governance_sovereignty':
        return (
          <div className="relative w-24 h-24 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-950 to-cyan-950/60 border-2 border-cyan-500/40 flex items-center justify-center shadow-lg shadow-cyan-950/40 group-hover:border-cyan-400 transition-colors">
            {/* Sovereign Shield & Balance Grid SVG */}
            <svg className="absolute inset-0 w-full h-full p-2 opacity-30 pointer-events-none" viewBox="0 0 100 100">
              <path d="M 50 10 L 85 24 L 85 55 C 85 75 50 92 50 92 C 50 92 15 75 15 55 L 15 24 Z" fill="none" stroke="#06b6d4" strokeWidth="1.5" />
              <line x1="30" y1="45" x2="70" y2="45" stroke="#06b6d4" strokeWidth="1.2" />
              <line x1="50" y1="35" x2="50" y2="68" stroke="#06b6d4" strokeWidth="1.2" />
              <circle cx="35" cy="55" r="5" fill="none" stroke="#06b6d4" strokeWidth="1" />
              <circle cx="65" cy="55" r="5" fill="none" stroke="#06b6d4" strokeWidth="1" />
            </svg>
            <div className="relative z-10 flex flex-col items-center justify-center">
              <FileCheck className="w-6 h-6 text-cyan-400 mb-0.5" />
              <span className="font-mono text-sm font-bold text-white tracking-widest">{monogram}</span>
              <span className="text-[9px] font-mono text-cyan-300 uppercase tracking-wider">BA / PROCESS</span>
            </div>
          </div>
        );
    }
  };

  return (
    <section id="meet-our-experts" className="py-20 md:py-28 relative border-b border-white/[0.08] bg-slate-950">
      {/* Background Micro Grid Lattice */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b0a_1px,transparent_1px),linear-gradient(to_bottom,#1e293b0a_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none"></div>

      <div className="container mx-auto px-4 md:px-6 max-w-7xl relative z-10">
        
        {/* Section Header & Trust Seal */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-14">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-mono font-semibold tracking-wider uppercase">
              <ShieldCheck size={14} className="text-cyan-400" />
              <span>{isFrench ? "Équipe Canadienne & Praticiens Spécialisés" : "Canadian Engineering Team & Named Practitioners"}</span>
            </div>

            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white">
              {isFrench ? "Rencontrez Nos Spécialistes DevSecOps & Analyse d'Affaires" : "Meet Our DevSecOps & Business Analysis Specialists"}
            </h2>

            <p className="text-sm md:text-base text-slate-300 leading-relaxed max-w-2xl font-normal">
              {isFrench 
                ? "Chez Oakivo, la confiance institutionnelle repose sur des compétences professionnelles vérifiables, des directives transparentes et une responsabilité nominative directe. Vous collaborez directement avec nos spécialistes canadiens basés à Dieppe (N.-B.) et Calgary (AB), sans sous-traitance à l'étranger." 
                : "At Oakivo, institutional trust is established through verifiable credentials, transparent operational directives, and named practitioner accountability. You work directly with our Canadian specialists based in Dieppe, New Brunswick and Calgary, Alberta with zero offshore delegation."}
            </p>
          </div>

          {/* View Mode Switcher */}
          <div className="flex items-center gap-2 bg-slate-900/90 p-1.5 rounded-xl border border-slate-800 shrink-0">
            <button
              onClick={() => setActiveView('dossiers')}
              className={`px-4 py-2 rounded-lg font-mono text-xs font-bold transition-all ${
                activeView === 'dossiers'
                  ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {isFrench ? "Dossiers des Spécialistes" : "Specialist Dossiers"}
            </button>
            <button
              onClick={() => setActiveView('matrix')}
              className={`px-4 py-2 rounded-lg font-mono text-xs font-bold transition-all ${
                activeView === 'matrix'
                  ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {isFrench ? "Matrice de Gouvernance" : "Governance Matrix"}
            </button>
          </div>
        </div>

        {/* Firm Trust & Clearance Assurance Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800/80 flex items-start gap-3.5">
            <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 shrink-0 mt-0.5">
              <Fingerprint className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs font-mono font-bold text-white block uppercase tracking-wide">
                {isFrench ? "Accréditation Nominative" : "Named Practitioner"}
              </span>
              <p className="text-[11px] text-slate-400 leading-snug mt-0.5">
                {isFrench ? "Chaque mandat est dirigé par un spécialiste nominatif qualifié." : "Engagements are executed directly by certified named specialists."}
              </p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800/80 flex items-start gap-3.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0 mt-0.5">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs font-mono font-bold text-white block uppercase tracking-wide">
                {isFrench ? "Équipe 100 % Canadienne" : "100% Canadian Team"}
              </span>
              <p className="text-[11px] text-slate-400 leading-snug mt-0.5">
                {isFrench ? "Bureaux à Dieppe (N.-B.) et Calgary (AB). Aucune sous-traitance à l'étranger." : "Offices in Dieppe, NB & Calgary, AB. Zero anonymous offshore queues."}
              </p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800/80 flex items-start gap-3.5">
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 shrink-0 mt-0.5">
              <Lock className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs font-mono font-bold text-white block uppercase tracking-wide">
                {isFrench ? "Standard Protégé B" : "Protected B Standard"}
              </span>
              <p className="text-[11px] text-slate-400 leading-snug mt-0.5">
                {isFrench ? "Conformité stricte aux exigences fédérales et provinciales." : "Compliant with Canadian security clearance and Law 25 privacy."}
              </p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800/80 flex items-start gap-3.5">
            <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 shrink-0 mt-0.5">
              <Clock className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs font-mono font-bold text-white block uppercase tracking-wide">
                {isFrench ? "Fuseau Atlantique (HNA)" : "Atlantic Time Zone"}
              </span>
              <p className="text-[11px] text-slate-400 leading-snug mt-0.5">
                {isFrench ? "Collaboration en temps réel pendant vos heures d'affaires." : "Direct real-time Slack/Teams collaboration with your dev team."}
              </p>
            </div>
          </div>
        </div>

        {/* View 1: Architect Security Dossiers Grid */}
        {activeView === 'dossiers' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {architects.map((architect) => {
              const isCopied = copiedFingerprint === architect.nodeId;

              return (
                <div
                  key={architect.nodeId}
                  id={`architect-dossier-${architect.nodeId}`}
                  className="bg-slate-900/70 backdrop-blur-xl rounded-2xl border border-slate-800 hover:border-cyan-500/40 transition-all duration-300 p-6 flex flex-col justify-between group shadow-xl hover:shadow-cyan-950/10"
                >
                  <div className="space-y-5">
                    
                    {/* Top Identity & Status Bar */}
                    <div className="flex items-center justify-between pb-4 border-b border-slate-800/90 text-xs font-mono">
                      <div className="flex items-center gap-2">
                        <span className="text-cyan-400 font-bold">{architect.nodeId}</span>
                        <span className="text-slate-600">|</span>
                        <span className="text-slate-400 flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-emerald-400" />
                          {architect.location}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-bold text-emerald-400">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                          {architect.timezone.includes('MST')
                            ? (isFrench ? "ACTIF // HNR" : "ACTIVE // MST")
                            : (isFrench ? "ACTIF // HNA" : "ACTIVE // AST")}
                        </span>
                      </div>
                    </div>

                    {/* Emblem & Name Block */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
                      {/* Security Domain Emblem */}
                      <div className="shrink-0">
                        {renderDomainEmblem(architect.securityDomain, architect.monogram)}
                      </div>

                      <div className="space-y-1.5 flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <h3 className="text-xl font-display font-bold text-white group-hover:text-cyan-300 transition-colors truncate">
                            {architect.name}
                          </h3>
                        </div>

                        <p className="text-xs font-mono font-semibold text-cyan-400 line-clamp-1">
                          {architect.title}
                        </p>

                        <p className="text-[11px] text-slate-400 font-mono flex items-center gap-1.5">
                          <Award className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                          <span className="truncate">{architect.clearanceStandard}</span>
                        </p>
                      </div>
                    </div>

                    {/* Verified Credentials Pills */}
                    <div className="space-y-1.5 pt-1">
                      <span className="text-[10px] font-mono uppercase tracking-widest text-slate-500 font-bold block">
                        {isFrench ? "Accréditations Vérifiées :" : "Verified Professional Credentials:"}
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {architect.verifiedCredentials.map((cred, cIdx) => (
                          <span
                            key={cIdx}
                            className="text-[10px] font-mono px-2.5 py-1 rounded-md bg-slate-950 border border-slate-800 text-slate-200 flex items-center gap-1 font-medium"
                          >
                            <CheckCircle2 className="w-3 h-3 text-cyan-400" />
                            {cred}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Architectural Directives / Responsibilities */}
                    <div className="space-y-2 pt-1">
                      <span className="text-[10px] font-mono uppercase tracking-widest text-slate-500 font-bold block">
                        {isFrench ? "Directives d'Architecture & Périmètre d'Intervention :" : "Architectural Directives & Engineering Scope:"}
                      </span>
                      <ul className="space-y-2 text-xs text-slate-300">
                        {architect.directives.map((dir, dIdx) => (
                          <li key={dIdx} className="flex items-start gap-2 leading-relaxed">
                            <span className="text-cyan-400 font-mono font-bold select-none mt-0.5">›</span>
                            <span>{dir}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Quantified Track Record Matrix */}
                    <div className="grid grid-cols-3 gap-2 pt-2">
                      {architect.trackRecord.map((tr, tIdx) => (
                        <div key={tIdx} className="p-2.5 rounded-xl bg-slate-950/70 border border-slate-800/90 text-center">
                          <span className="text-base font-bold font-mono text-white block">
                            {tr.metric}
                          </span>
                          <span className="text-[9px] font-mono uppercase tracking-wider text-slate-400 block mt-0.5">
                            {tr.label}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Cryptographic Key Signature & PGP Verification Box */}
                    <div className="p-3 rounded-xl bg-slate-950 border border-slate-800/90 space-y-1.5">
                      <div className="flex items-center justify-between text-[10px] font-mono">
                        <span className="text-slate-400 flex items-center gap-1">
                          <Key className="w-3 h-3 text-cyan-400" />
                          PGP KEY FINGERPRINT ({architect.pgpKeyId})
                        </span>
                        <button
                          onClick={() => handleCopyFingerprint(architect.pgpFingerprint, architect.nodeId)}
                          className="text-cyan-400 hover:text-cyan-300 flex items-center gap-1 font-bold transition-colors cursor-pointer"
                          title="Copy cryptographic PGP fingerprint"
                        >
                          {isCopied ? (
                            <>
                              <Check className="w-3 h-3 text-emerald-400" />
                              <span className="text-emerald-400">{isFrench ? "Copié !" : "Copied !"}</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3 h-3" />
                              <span>{isFrench ? "Copier" : "Copy"}</span>
                            </>
                          )}
                        </button>
                      </div>

                      <div className="font-mono text-[10px] text-slate-400 tracking-wider break-all select-all bg-slate-900/60 px-2 py-1 rounded border border-slate-850">
                        {architect.pgpFingerprint}
                      </div>
                    </div>

                  </div>

                  {/* Card Footer: Language, LinkedIn, and Direct Architect Contact */}
                  <div className="pt-5 mt-5 border-t border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <span className="text-[11px] font-mono text-slate-400">
                        {architect.bilingual}
                      </span>
                      <a
                        href={architect.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${architect.name} LinkedIn Profile`}
                        className="p-1.5 rounded-lg bg-slate-950 border border-slate-800 hover:border-cyan-500/50 text-slate-400 hover:text-cyan-400 transition-colors inline-flex items-center gap-1 text-xs"
                      >
                        <Linkedin size={13} />
                        <span className="text-[10px] font-mono hidden sm:inline">Verified</span>
                      </a>
                    </div>

                    <button
                      type="button"
                      onClick={() => window.dispatchEvent(new CustomEvent('open-lead-drawer'))}
                      className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-cyan-500 hover:text-slate-950 text-slate-200 font-mono text-xs font-bold transition-all cursor-pointer"
                    >
                      <span>
                        {architect.nodeId === 'OAK-ARCH-004'
                          ? (isFrench ? "Consulter cette Analyste" : "Consult With Business Analyst")
                          : (isFrench ? "Consulter ce Spécialiste" : "Consult With Specialist")}
                      </span>
                      <ArrowRight size={13} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* View 2: Governance & Coverage Comparison Matrix */}
        {activeView === 'matrix' && (
          <div className="bg-slate-900/60 backdrop-blur-md rounded-2xl border border-slate-800 overflow-hidden shadow-2xl">
            <div className="p-6 border-b border-slate-800 bg-slate-950/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-display font-bold text-white flex items-center gap-2">
                  <Terminal className="w-5 h-5 text-cyan-400" />
                  {isFrench ? "Matrice de Couverture & de Responsabilité Technique" : "Engineering Coverage & Practice Authority Matrix"}
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  {isFrench 
                    ? "Répartition des responsabilités d'ingénierie et des compétences par spécialiste." 
                    : "Distribution of core engineering and business analysis responsibilities across staff."}
                </p>
              </div>
              <span className="text-xs font-mono text-cyan-400 bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-500/20 self-start sm:self-auto">
                100% Canadian Direct Operations
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse min-w-[760px]">
                <thead>
                  <tr className="border-b border-slate-800 bg-slate-950/60 font-mono text-slate-400 uppercase">
                    <th className="p-4 font-bold">Specialist / Node</th>
                    <th className="p-4 font-bold">Primary Practice Authority</th>
                    <th className="p-4 font-bold">Verified Credentials</th>
                    <th className="p-4 font-bold">Key Stack & Tooling</th>
                    <th className="p-4 font-bold">Governance & Clearance</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 text-slate-300 font-mono text-[11px]">
                  {architects.map((arch) => (
                    <tr key={arch.nodeId} className="hover:bg-slate-850/50 transition-colors">
                      <td className="p-4 font-bold text-white whitespace-nowrap">
                        <div className="flex items-center gap-2.5">
                          <span className="px-2 py-0.5 rounded bg-slate-950 text-cyan-400 border border-slate-800 text-[10px]">
                            {arch.nodeId}
                          </span>
                          <div>
                            <span className="block font-sans font-bold text-sm text-white">{arch.name}</span>
                            <span className="text-[10px] text-slate-400">{arch.location} ({arch.timezone})</span>
                          </div>
                        </div>
                      </td>

                      <td className="p-4 font-sans text-xs text-slate-200">
                        {arch.practiceRole}
                      </td>

                      <td className="p-4">
                        <div className="flex flex-wrap gap-1">
                          {arch.verifiedCredentials.map((c, i) => (
                            <span key={i} className="px-1.5 py-0.5 rounded bg-slate-950 border border-slate-800 text-cyan-300 text-[10px]">
                              {c}
                            </span>
                          ))}
                        </div>
                      </td>

                      <td className="p-4 text-slate-300">
                        {arch.primaryTools.join(', ')}
                      </td>

                      <td className="p-4 text-emerald-400 font-medium">
                        {arch.clearanceStandard}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Canadian Direct Accountability Guarantee */}
        <div className="mt-12 rounded-2xl bg-gradient-to-r from-slate-900/80 via-cyan-950/30 to-slate-900/80 border border-slate-800 p-6 md:p-8 flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0 mt-0.5 shadow-lg shadow-cyan-500/10">
              <ShieldCheck size={26} />
            </div>
            <div className="space-y-1">
              <h4 className="text-base font-display font-bold text-white flex items-center gap-2">
                <span>{isFrench ? "Garantie d'Ingénierie Directe & Souveraineté Canadienne" : "The Oakivo Direct Engineering & Canadian Sovereignty Guarantee"}</span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                  DIEPPE & CALGARY
                </span>
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-3xl">
                {isFrench 
                  ? "Toutes nos revues d'architecture infonuagique, déploiements CI/CD et spécifications d'affaires sont réalisés directement par notre équipe à Dieppe (Nouveau-Brunswick) et Calgary (Alberta). Nous garantissons une souveraineté juridictionnelle complète sous les lois canadiennes, sans aucune sous-traitance à l'étranger." 
                  : "Every architecture review, CI/CD security pipeline, and business process workflow is engineered directly by our team in Dieppe, New Brunswick and Calgary, Alberta. We maintain complete jurisdictional sovereignty under Canadian federal and provincial laws, providing direct access to our practicing specialists."}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => window.dispatchEvent(new CustomEvent('open-lead-drawer'))}
            className="w-full lg:w-auto px-7 py-3.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold font-mono text-xs tracking-wider uppercase transition-all shadow-lg shadow-cyan-500/20 shrink-0 cursor-pointer text-center"
          >
            {isFrench ? "Réserver une Consultation Technique" : "Schedule Technical Consultation"}
          </button>
        </div>

      </div>
    </section>
  );
};

export default MeetOurExperts;
