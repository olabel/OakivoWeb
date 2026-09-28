import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShieldCheck, 
  AlertTriangle, 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft, 
  Download, 
  Calendar, 
  Lock, 
  Server, 
  Activity, 
  FileCheck, 
  Cpu, 
  Layers, 
  Globe, 
  Building2, 
  User, 
  Mail, 
  Briefcase, 
  Sparkles, 
  Info, 
  RefreshCw, 
  Check, 
  Copy,
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import SEO from '../components/SEO';
import { useLanguage } from '../context/LanguageContext';
import { db } from '../utils/database';

interface FrameworkOption {
  id: string;
  name: string;
  nameFr?: string;
  acronym: string;
  regulator: string;
  regulatorFr?: string;
  description: string;
  descriptionFr?: string;
  penaltyContext: string;
  penaltyContextFr?: string;
}

interface QuestionOption {
  id: string;
  level: number;
  label: string;
  labelFr?: string;
  technicalDetails: string;
  technicalDetailsFr?: string;
  score: number; // 0 to 100
}

interface DimensionQuestion {
  id: string;
  title: string;
  titleFr?: string;
  category: string;
  categoryFr?: string;
  regulatoryRelevance: string;
  icon: 'data' | 'identity' | 'cicd' | 'telemetry' | 'vendor' | 'ai';
  options: QuestionOption[];
}

const FRAMEWORKS: FrameworkOption[] = [
  {
    id: 'bill-c26',
    name: 'Bill C-26 (CCSPA)',
    nameFr: 'Loi C-26 (LSPCY)',
    acronym: 'CCSPA',
    regulator: 'Public Safety Canada / CSE',
    regulatorFr: 'Sécurité publique Canada / CST',
    description: 'Canadian Critical Cyber Systems Protection Act with mandatory sub-2-hour incident disclosure.',
    descriptionFr: 'Loi sur la protection des cybersystèmes essentiels avec obligation de notification d\'incident en moins de 2 heures.',
    penaltyContext: 'Administrative monetary penalties up to $15,000,000 per violation day for designated vital systems.',
    penaltyContextFr: 'Sanctions administratives pécuniaires pouvant atteindre 15 000 000 $ par jour d\'infraction pour les systèmes vitaux désignés.'
  },
  {
    id: 'osfi-b13',
    name: 'OSFI Guideline B-13 & E-21',
    nameFr: 'Lignes directrices B-13 & E-21 du BSIF',
    acronym: 'OSFI B-13',
    regulator: 'Office of the Superintendent of Financial Institutions',
    regulatorFr: 'Bureau du surintendant des institutions financières',
    description: 'Technology, Cyber Risk Management, and Operational Resilience for Canadian Banks & Insurers.',
    descriptionFr: 'Gestion du risque technologique, cybersécurité et résilience opérationnelle pour les banques et assureurs canadiens.',
    penaltyContext: 'Supervisory capital surcharge, mandatory external assurance mandates, and public rating actions.',
    penaltyContextFr: 'Surcharges de capital réglementaire, mandats de vérification externe obligatoire et avis de surveillance publique.'
  },
  {
    id: 'soc2',
    name: 'SOC 2 Type II',
    nameFr: 'SOC 2 Type II',
    acronym: 'AICPA SOC 2',
    regulator: 'American Institute of CPAs',
    regulatorFr: 'American Institute of CPAs',
    description: 'Trust Services Criteria: Security, Availability, Processing Integrity, and Confidentiality.',
    descriptionFr: 'Critères de confiance opérationnelle : Sécurité, Disponibilité, Intégrité des traitements et Confidentialité.',
    penaltyContext: 'Disqualification from enterprise RFP procurement, lost enterprise deals, and breach of customer MSAs.',
    penaltyContextFr: 'Disqualification des appels d\'offres d\'entreprise, perte de contrats majeurs et manquement aux ententes de niveau de service.'
  },
  {
    id: 'pipeda-law25',
    name: 'PIPEDA & Law 25 (Quebec)',
    nameFr: 'LPRPDE & Loi 25 (Québec)',
    acronym: 'PIPEDA / Law 25',
    regulator: 'OPC & Commission d’accès à l’information',
    regulatorFr: 'CPVP & Commission d’accès à l’information du Québec',
    description: 'Sovereign Canadian data residency, cross-border transfer assessments (PIA), and privacy safeguards.',
    descriptionFr: 'Résidence souveraine des données au Canada, évaluations des facteurs relatifs à la vie privée (ÉFRVP) et garanties de sécurité.',
    penaltyContext: 'Fines up to $25,000,000 or 4% of worldwide turnover for unauthorized non-sovereign data transfers.',
    penaltyContextFr: 'Amendes jusqu\'à 25 000 000 $ ou 4 % du chiffre d\'affaires mondial pour transferts non autorisés hors juridiction souveraine.'
  },
  {
    id: 'iso-27001-42001',
    name: 'ISO/IEC 27001:2022 & ISO 42001',
    nameFr: 'ISO/CEI 27001:2022 & ISO 42001',
    acronym: 'ISO 27001 / 42001',
    regulator: 'International Organization for Standardization',
    regulatorFr: 'Organisation internationale de normalisation',
    description: 'Global benchmark for Information Security Management Systems (ISMS) and Artificial Intelligence Governance.',
    descriptionFr: 'Référence mondiale pour les Systèmes de Management de la Sécurité de l\'Information (SMSI) et la gouvernance de l\'IA.',
    penaltyContext: 'Loss of accredited ISO status, customer audit failures, and contract cancellations.',
    penaltyContextFr: 'Perte de l\'accréditation ISO officielle, échec des audits clients et résiliations contractuelles.'
  },
  {
    id: 'nist-zero-trust',
    name: 'NIST SP 800-207 Zero-Trust',
    nameFr: 'NIST SP 800-207 Zéro Confiance',
    acronym: 'NIST Zero-Trust',
    regulator: 'National Institute of Standards and Technology',
    regulatorFr: 'National Institute of Standards and Technology',
    description: 'Zero-Trust Architecture: Cryptographic workload identity, continuous micro-segmentation, and dynamic authorization.',
    descriptionFr: 'Architecture Zéro Confiance : Identité cryptographique des charges de travail, micro-segmentation continue et autorisation dynamique.',
    penaltyContext: 'Vulnerability to lateral breach traversal, ransomware extortion, and privilege escalation.',
    penaltyContextFr: 'Vulnérabilité aux déplacements latéraux lors d\'intrusions, rançongiciels et escalades de privilèges non détectées.'
  }
];

const INDUSTRIES = [
  { id: 'fintech', labelEn: 'Financial Services & Banking', labelFr: 'Services Financiers & Banques' },
  { id: 'healthtech', labelEn: 'Healthcare & Life Sciences', labelFr: 'Santé & Sciences de la Vie' },
  { id: 'infrastructure', labelEn: 'Energy, Utilities & Critical Infrastructure', labelFr: 'Énergie & Infrastructures Critiques' },
  { id: 'saas', labelEn: 'Enterprise SaaS & Cloud Platforms', labelFr: 'Plateformes SaaS & Infonuagique' },
  { id: 'public-sector', labelEn: 'Public Sector & Sovereign Agencies', labelFr: 'Secteur Public & Organismes Souverains' }
];

const CLOUD_PROVIDERS = [
  { id: 'aws', label: 'Amazon Web Services (ca-central-1 / ca-west-1)', labelFr: 'Amazon Web Services (ca-central-1 / ca-west-1)' },
  { id: 'azure', label: 'Microsoft Azure (Canada Central / Canada East)', labelFr: 'Microsoft Azure (Canada Centre / Canada Est)' },
  { id: 'gcp', label: 'Google Cloud Platform (northamerica-northeast1/2)', labelFr: 'Google Cloud Platform (northamerica-northeast1/2)' },
  { id: 'hybrid', label: 'Hybrid / Private Data Center + Multi-Cloud', labelFr: 'Centre de données privé / Hybride + Multi-Nuage' }
];

const QUESTIONS: DimensionQuestion[] = [
  {
    id: 'data-sovereignty',
    title: 'Data Residency, Sovereign Encryption & Key Governance',
    titleFr: 'Résidence des Données, Chiffrement Souverain & Gestion des Clés',
    category: 'Sovereignty & Cryptography',
    categoryFr: 'Souveraineté & Cryptographie',
    regulatoryRelevance: 'PIPEDA, Law 25, OSFI B-13, SOC 2 Confidentiality',
    icon: 'data',
    options: [
      {
        id: 'ds-0',
        level: 0,
        score: 15,
        label: 'Unencrypted cross-border replication or unmanaged default keys',
        labelFr: 'Réplication transfrontalière non chiffrée ou clés par défaut non gérées',
        technicalDetails: 'Production data replicated across US/EU regions without boundary policies or Privacy Impact Assessments (PIA).',
        technicalDetailsFr: 'Données de production répliquées dans des régions É.-U./UE sans politiques de frontière ni ÉFRVP.'
      },
      {
        id: 'ds-1',
        level: 1,
        score: 45,
        label: 'Standard server-side cloud KMS encryption (SSE-S3 / Azure SSE)',
        labelFr: 'Chiffrement côté serveur standard géré par le fournisseur (SSE-S3 / Azure SSE)',
        technicalDetails: 'Data resides in Canadian zones, but encryption keys are managed by the cloud provider without HSM custody.',
        technicalDetailsFr: 'Les données résident au Canada, mais les clés de chiffrement restent sous le contrôle du fournisseur infonuagique sans HSM dédié.'
      },
      {
        id: 'ds-2',
        level: 2,
        score: 75,
        label: 'Dedicated Canadian Region Cloud HSM with Customer-Managed Keys (BYOK)',
        labelFr: 'Cloud HSM dédié en région canadienne avec clés gérées par le client (BYOK)',
        technicalDetails: 'FIPS 140-3 Level 3 HSM enforcement, explicit Service Control Policies blocking cross-border data replication.',
        technicalDetailsFr: 'Application de la norme FIPS 140-3 Niveau 3 et politiques SCP bloquant la réplication hors frontière.'
      },
      {
        id: 'ds-3',
        level: 3,
        score: 100,
        label: 'Confidential Computing (AMD SEV-SNP/Intel TDX) with Sovereign Key Escrow',
        labelFr: 'Informatique confidentielle (AMD SEV-SNP/Intel TDX) avec séquestre souverain des clés',
        technicalDetails: 'Zero-knowledge memory encryption in use, tamper-proof hardware attestation, and client-side deterministic field tokenization.',
        technicalDetailsFr: 'Chiffrement de la mémoire vive en cours d\'exécution, attestation matérielle inviolable et tokenisation déterministe.'
      }
    ]
  },
  {
    id: 'identity-perimeter',
    title: 'Workload Identity, Zero-Trust Access & Machine Credentials',
    titleFr: 'Identité des Charges de Travail, Accès Zéro Confiance & Secrets Machine',
    category: 'Identity & Access Control',
    categoryFr: 'Contrôle d\'Accès & Identité',
    regulatoryRelevance: 'OSFI B-13 Domain 3, NIST SP 800-207, SOC 2 CC6',
    icon: 'identity',
    options: [
      {
        id: 'id-0',
        level: 0,
        score: 10,
        label: 'Static long-lived IAM credentials and shared operational keys',
        labelFr: 'Identifiants IAM statiques permanents et clés opérationnelles partagées',
        technicalDetails: 'Service accounts rely on permanent JSON keys or hardcoded API credentials stored in code repositories.',
        technicalDetailsFr: 'Les comptes de service reposent sur des clés JSON permanentes ou des jetons codés en dur dans les dépôts de code.'
      },
      {
        id: 'id-1',
        level: 1,
        score: 40,
        label: 'Corporate SSO with basic MFA on cloud administration portals',
        labelFr: 'SSO corporatif avec MFA basique sur les portails d\'administration infonuagiques',
        technicalDetails: 'Human users use Okta/Entra ID MFA, but inter-service microservice calls rely on static bearer tokens.',
        technicalDetailsFr: 'Les utilisateurs humains utilisent Okta/Entra ID avec MFA, mais les appels inter-services utilisent des jetons statiques.'
      },
      {
        id: 'id-2',
        level: 2,
        score: 75,
        label: 'OIDC Identity Federation with short-lived session roles',
        labelFr: 'Fédération d\'identité OIDC avec rôles de session temporaires à courte durée',
        technicalDetails: 'GitHub Actions / GitLab CI use temporary STS tokens; human access enforces just-in-time (JIT) role elevation.',
        technicalDetailsFr: 'GitHub Actions / GitLab CI utilisent des jetons STS éphémères ; élévation de privilèges juste-à-temps (JIT) pour les administrateurs.'
      },
      {
        id: 'id-3',
        level: 3,
        score: 100,
        label: 'SPIFFE/SPIRE Cryptographic Workload Identity & Sub-Minute mTLS Mesh',
        labelFr: 'Identité cryptographique SPIFFE/SPIRE & Maillage mTLS sous la minute',
        technicalDetails: 'Zero static secrets across all clusters; every container exchanges hardware-attested X.509 SVID tokens with sub-60s TTLs.',
        technicalDetailsFr: 'Zéro secret statique dans les clusters ; chaque conteneur échange des certificats X.509 SVID attestés matériellement (TTL < 60s).'
      }
    ]
  },
  {
    id: 'cicd-supply-chain',
    title: 'CI/CD Pipeline Integrity & Software Supply Chain (SBOM / SLSA)',
    titleFr: 'Intégrité des Pipelines CI/CD & Chaîne Logistique Logicielle (SBOM / SLSA)',
    category: 'DevSecOps & Supply Chain',
    categoryFr: 'DevSecOps & Chaîne Logistique',
    regulatoryRelevance: 'Bill C-26 Section 15, OSFI B-13 Domain 4, SOC 2 CC7',
    icon: 'cicd',
    options: [
      {
        id: 'sc-0',
        level: 0,
        score: 10,
        label: 'Ad-hoc manual builds with unvetted third-party base images',
        labelFr: 'Compilations manuelles ponctuelles avec images de base tierces non vérifiées',
        technicalDetails: 'Developers push Docker images directly to production without automated vulnerability gating or lockfiles.',
        technicalDetailsFr: 'Les développeurs déploient des conteneurs directement en production sans validation automatisée des vulnérabilités.'
      },
      {
        id: 'sc-1',
        level: 1,
        score: 40,
        label: 'Scheduled weekly container scanning without deployment blocking',
        labelFr: 'Analyse hebdomadaire programmée des conteneurs sans blocage du déploiement',
        technicalDetails: 'Trivy or Snyk scans images after build, but critical CVEs do not block production Kubernetes deployments.',
        technicalDetailsFr: 'Trivy ou Snyk analyse les images après compilation, mais les CVE critiques ne bloquent pas la mise en production Kubernetes.'
      },
      {
        id: 'sc-2',
        level: 2,
        score: 75,
        label: 'Automated CI Security Gating (SAST, SCA, Secret Scanning) with Break-Build',
        labelFr: 'Portes de sécurité CI automatisées (SAST, SCA, fuites de secrets) avec rupture de build',
        technicalDetails: 'Pipeline fails on critical CVEs or secret leakage; automated CycloneDX SBOM generation for every release artifact.',
        technicalDetailsFr: 'Le pipeline échoue immédiatement en cas de CVE critique ou fuite de secret ; génération automatique du SBOM CycloneDX.'
      },
      {
        id: 'sc-3',
        level: 3,
        score: 100,
        label: 'SLSA Level 3/4 with Sigstore Cosign Attestation & OPA Admission Control',
        labelFr: 'SLSA Niveau 3/4 avec attestation Sigstore Cosign et contrôleur d\'admission OPA',
        technicalDetails: 'Cryptographically signed provenance; in-cluster Kubernetes admission controllers reject any image lacking valid signature.',
        technicalDetailsFr: 'Provenance logicielle signée cryptographiquement ; les contrôleurs d\'admission Kubernetes rejettent toute image non signée.'
      }
    ]
  },
  {
    id: 'incident-telemetry',
    title: 'Incident Telemetry & Bill C-26 Mandatory Sub-2-Hour Reporting',
    titleFr: 'Télémétrie d\'Incidents & Signalement Obligatoire sous 2h (Loi C-26)',
    category: 'Detection & Response',
    categoryFr: 'Détection & Réponse',
    regulatoryRelevance: 'Bill C-26 Mandatory Disclosure, OSFI B-13 Incident Notification',
    icon: 'telemetry',
    options: [
      {
        id: 'it-0',
        level: 0,
        score: 10,
        label: 'Reactive log inspection with mean detection time exceeding 48 hours',
        labelFr: 'Inspection réactive des journaux avec délai moyen de détection supérieur à 48 heures',
        technicalDetails: 'Security incidents discovered through customer bug reports, public disclosure, or downstream cloud provider warnings.',
        technicalDetailsFr: 'Incidents découverts via des signalements clients, des divulgations publiques ou des avis de fournisseurs cloud.'
      },
      {
        id: 'it-1',
        level: 1,
        score: 40,
        label: 'Centralized SIEM (Datadog/CloudWatch) with standard email alerts',
        labelFr: 'SIEM centralisé (Datadog/CloudWatch) avec alertes courriel standard',
        technicalDetails: 'Audit logs collected centrally, but incident triage requires manual engineering intervention during working hours.',
        technicalDetailsFr: 'Journaux collectés de façon centralisée, mais le tri des incidents nécessite une intervention humaine manuelle durant les heures ouvrables.'
      },
      {
        id: 'it-2',
        level: 2,
        score: 70,
        label: '24/7 Managed SOC alerting with documented CSIRT playbooks',
        labelFr: 'SOC géré 24/7 avec alertes continues et procédures documentées (CSIRT)',
        technicalDetails: 'Mean time to detect under 2 hours; defined runbooks for regulatory notifications, but dispatch remains manual.',
        technicalDetailsFr: 'Délai de détection inférieur à 2 heures ; procédures définies pour les avis réglementaires, mais l\'envoi demeure manuel.'
      },
      {
        id: 'it-3',
        level: 3,
        score: 100,
        label: 'Kernel-Level eBPF Behavioral Detection & Automated Regulatory Webhook Dispatch',
        labelFr: 'Détection comportementale au niveau du noyau Linux (eBPF) & Webhooks réglementaires automatisés',
        technicalDetails: 'Instantaneous anomalous syscall mitigation via eBPF; automated Bill C-26 statutory notification payload generation in < 15 min.',
        technicalDetailsFr: 'Blocage instantané des appels système anormaux par eBPF ; génération et transmission automatique de la charge utile réglementaire en < 15 min.'
      }
    ]
  },
  {
    id: 'vendor-concentration',
    title: 'Third-Party ICT Risk, Vendor Concentration & Exit Strategy',
    titleFr: 'Risque Technologique Tiers, Concentration des Fournisseurs & Stratégie de Sortie',
    category: 'Vendor & Operational Resilience',
    categoryFr: 'Fournisseurs & Résilience Opérationnelle',
    regulatoryRelevance: 'OSFI Guideline E-21, OSFI B-13 Domain 5, DORA Aligned',
    icon: 'vendor',
    options: [
      {
        id: 'vc-0',
        level: 0,
        score: 10,
        label: 'No centralized vendor register or concentration tracking',
        labelFr: 'Aucun registre centralisé des fournisseurs ni suivi de concentration',
        technicalDetails: 'Disparate departments purchase cloud APIs independently; no dependency mapping for critical business functions.',
        technicalDetailsFr: 'Différents départements achètent des API infonuagiques isolément sans cartographie des dépendances critiques.'
      },
      {
        id: 'vc-1',
        level: 1,
        score: 45,
        label: 'Annual vendor security questionnaire review (SIG/CAIQ)',
        labelFr: 'Révision annuelle des questionnaires de sécurité des fournisseurs (SIG/CAIQ)',
        technicalDetails: 'Point-in-time self-assessment forms collected annually, without continuous telemetry or SLA enforcement.',
        technicalDetailsFr: 'Formulaires d\'auto-évaluation collectés annuellement, sans télémétrie continue ni vérification stricte des SLA.'
      },
      {
        id: 'vc-2',
        level: 2,
        score: 75,
        label: 'Continuous third-party security ratings & API health circuit breakers',
        labelFr: 'Évaluations de sécurité tierces en continu et coupe-circuits API',
        technicalDetails: 'Real-time vendor risk scoring (Bitsight/SecurityScorecard); automated circuit breakers prevent vendor downtime cascading.',
        technicalDetailsFr: 'Notation des risques fournisseurs en temps réel ; des disjoncteurs automatiques empêchent les pannes en cascade.'
      },
      {
        id: 'vc-3',
        level: 3,
        score: 100,
        label: 'Formally Tested Multi-Cloud Exit Strategy with Automated Fail-Closed Gateways',
        labelFr: 'Stratégie de sortie multi-nuage formellement testée avec passerelles à fermeture automatique',
        technicalDetails: 'Disaster recovery tested bi-annually with simulated tier-1 vendor outages; zero lock-in container portable state.',
        technicalDetailsFr: 'Reprise après sinistre testée deux fois par an avec simulation de panne majeure ; conteneurs portables sans verrouillage propriétaire.'
      }
    ]
  },
  {
    id: 'ai-agentic-governance',
    title: 'Autonomous AI, Agentic Workflows & Model Context Protocol (MCP)',
    titleFr: 'IA Autonome, Flux d\'Agents & Protocole MCP (Model Context Protocol)',
    category: 'AI Risk & Model Governance',
    categoryFr: 'Gouvernance de l\'IA & Risque des Modèles',
    regulatoryRelevance: 'ISO/IEC 42001, NIST AI RMF 1.0, EU AI Act, Canadian AIDA',
    icon: 'ai',
    options: [
      {
        id: 'ai-0',
        level: 0,
        score: 10,
        label: 'Unmonitored Shadow AI adoption across engineering & business units',
        labelFr: 'Adoption d\'IA fantôme (Shadow AI) non surveillée dans l\'ingénierie et les opérations',
        technicalDetails: 'Employees and developers connect public LLMs and third-party MCP servers directly to production databases and code.',
        technicalDetailsFr: 'Les employés et développeurs connectent des LLM publics et serveurs MCP tiers directement aux bases de données de production.'
      },
      {
        id: 'ai-1',
        level: 1,
        score: 40,
        label: 'Written corporate policy prohibiting unauthorized AI tools without enforcement',
        labelFr: 'Politique d\'entreprise écrite interdisant les outils d\'IA non autorisés sans application technique',
        technicalDetails: 'HR/legal policy exists on paper, but no technical gateway blocks exfiltration of proprietary data or code.',
        technicalDetailsFr: 'La politique existe sur papier, mais aucune passerelle technique ne bloque l\'exfiltration de code ou de données confidentielles.'
      },
      {
        id: 'ai-2',
        level: 2,
        score: 70,
        label: 'Centralized AI Gateway with rate limiting & static prompt/output filters',
        labelFr: 'Passerelle IA centralisée avec limitation de débit et filtrage statique des invites et sorties',
        technicalDetails: 'All LLM calls traverse an enterprise proxy with basic regex PII redaction and enterprise licensing.',
        technicalDetailsFr: 'Tous les appels LLM transitent par un proxy d\'entreprise avec anonymisation regex basique des renseignements personnels.'
      },
      {
        id: 'ai-3',
        level: 3,
        score: 100,
        label: 'Layer-7 MCP Security Proxy with Cryptographic Tool Attestation & OPA Guardrails',
        labelFr: 'Proxy de Sécurité MCP Layer-7 avec Attestation Cryptographique des Outils & Règles OPA',
        technicalDetails: 'Deterministic Policy-as-Code gate intercepts every agent tool call; AI-BOM tracks model weights, data lineage, and schemas.',
        technicalDetailsFr: 'Passerelle Policy-as-Code déterministe interceptant chaque appel d\'outil d\'agent ; AI-BOM assurant la traçabilité des modèles et données.'
      }
    ]
  }
];

export const ComplianceGrader: React.FC = () => {
  const { language } = useLanguage();
  const isFr = language === 'fr';
  const navigate = useNavigate();

  // Wizard state
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | 4>(1);
  
  // Step 1: Scope
  const [selectedIndustry, setSelectedIndustry] = useState('fintech');
  const [selectedCloud, setSelectedCloud] = useState('aws');
  const [selectedFrameworks, setSelectedFrameworks] = useState<string[]>([
    'bill-c26',
    'osfi-b13',
    'soc2',
    'pipeda-law25'
  ]);

  // Step 2: Diagnostic Selections
  const [answers, setAnswers] = useState<Record<string, QuestionOption>>({
    'data-sovereignty': QUESTIONS[0].options[1],
    'identity-perimeter': QUESTIONS[1].options[1],
    'cicd-supply-chain': QUESTIONS[2].options[1],
    'incident-telemetry': QUESTIONS[3].options[1],
    'vendor-concentration': QUESTIONS[4].options[1],
    'ai-agentic-governance': QUESTIONS[5].options[1]
  });

  // Step 4: Lead Form State
  const [leadForm, setLeadForm] = useState({
    name: '',
    workEmail: '',
    company: '',
    role: '',
    phone: '',
    notes: ''
  });
  const [isSubmittingLead, setIsSubmittingLead] = useState(false);
  const [leadSubmitted, setLeadSubmitted] = useState(false);
  const [copiedDossier, setCopiedDossier] = useState(false);

  // Framework toggle
  const toggleFramework = (frameworkId: string) => {
    setSelectedFrameworks(prev => {
      if (prev.includes(frameworkId)) {
        if (prev.length <= 1) {
          toast.error(isFr ? 'Sélectionnez au moins un cadre réglementaire.' : 'Please select at least one compliance framework.');
          return prev;
        }
        return prev.filter(id => id !== frameworkId);
      } else {
        return [...prev, frameworkId];
      }
    });
  };

  // Answer selection
  const handleSelectOption = (questionId: string, option: QuestionOption) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: option
    }));
  };

  // Calculations
  const results = useMemo(() => {
    const answeredValues = Object.values(answers);
    const totalScore = Math.round(answeredValues.reduce((sum, item) => sum + item.score, 0) / answeredValues.length);

    // Framework-specific weighted adjustments
    const frameworkScores: Record<string, { score: number; status: 'critical' | 'moderate' | 'compliant'; keyGap: string }> = {};

    selectedFrameworks.forEach(fwId => {
      let fwScore = totalScore;
      let keyGap = '';

      if (fwId === 'bill-c26') {
        const telScore = answers['incident-telemetry']?.score || 0;
        const cicdScore = answers['cicd-supply-chain']?.score || 0;
        fwScore = Math.round((telScore * 0.6) + (cicdScore * 0.4));
        keyGap = telScore < 70 
          ? (isFr ? 'Absence de télémétrie eBPF pour notification en < 2h' : 'Lacks eBPF kernel telemetry for mandatory < 2h regulatory reporting')
          : (isFr ? 'Vérification de chaîne d’approvisionnement logicielle incomplète' : 'Software supply chain cryptographic provenance incomplete');
      } else if (fwId === 'osfi-b13') {
        const idScore = answers['identity-perimeter']?.score || 0;
        const vendorScore = answers['vendor-concentration']?.score || 0;
        fwScore = Math.round((idScore * 0.5) + (vendorScore * 0.5));
        keyGap = vendorScore < 70
          ? (isFr ? 'Absence de stratégie de sortie et de coupe-circuits tiers documentés' : 'Missing multi-cloud exit strategy and automated third-party circuit breakers')
          : (isFr ? 'Identité de machine non éphémère (mTLS incomplet)' : 'Non-ephemeral machine workload identities (mTLS incomplete)');
      } else if (fwId === 'soc2') {
        const cicdScore = answers['cicd-supply-chain']?.score || 0;
        const idScore = answers['identity-perimeter']?.score || 0;
        fwScore = Math.round((cicdScore * 0.5) + (idScore * 0.5));
        keyGap = cicdScore < 75
          ? (isFr ? 'Gouvernance CI/CD non basée sur la Politique en tant que Code' : 'CI/CD gating lacks automated Policy-as-Code (OPA/Checkov) enforcement')
          : (isFr ? 'Collecte manuelle des preuves d’audit (point dans le temps)' : 'Manual audit evidence collection creates point-in-time drift');
      } else if (fwId === 'pipeda-law25') {
        const dataScore = answers['data-sovereignty']?.score || 0;
        fwScore = dataScore;
        keyGap = dataScore < 75
          ? (isFr ? 'Absence de clés KMS régionales canadiennes dédiées (HSM FIPS 140-3)' : 'No dedicated Canadian Region Cloud HSM with customer-managed keys (BYOK)')
          : (isFr ? 'Évaluations des facteurs relatifs à la vie privée (ÉFRVP/PIA) transfrontalières incomplètes' : 'Incomplete cross-border Privacy Impact Assessments (PIA)');
      } else if (fwId === 'iso-27001-42001') {
        const aiScore = answers['ai-agentic-governance']?.score || 0;
        const cicdScore = answers['cicd-supply-chain']?.score || 0;
        fwScore = Math.round((aiScore * 0.5) + (cicdScore * 0.5));
        keyGap = aiScore < 70
          ? (isFr ? 'Agents IA fantômes sans passerelle d’inspection Layer-7 MCP' : 'Shadow AI agents operating without Layer-7 MCP inspection gateway')
          : (isFr ? 'Traçabilité des dépendances et inventaire AI-BOM absents' : 'Missing automated AI Bill of Materials (AI-BOM) lineage tracking');
      } else {
        const idScore = answers['identity-perimeter']?.score || 0;
        const telScore = answers['incident-telemetry']?.score || 0;
        fwScore = Math.round((idScore * 0.6) + (telScore * 0.4));
        keyGap = idScore < 75
          ? (isFr ? 'Périmètre non cryptographique (absence d’identités SPIFFE/SPIRE)' : 'Non-cryptographic perimeter (lacks SPIFFE/SPIRE workload identities)')
          : (isFr ? 'Micro-segmentation réseau insuffisante' : 'Insufficient network micro-segmentation');
      }

      frameworkScores[fwId] = {
        score: fwScore,
        status: fwScore >= 80 ? 'compliant' : fwScore >= 50 ? 'moderate' : 'critical',
        keyGap
      };
    });

    let overallTier = 'non-compliant';
    let tierTitle = isFr ? 'Risque Réglementaire Critique' : 'Elevated Regulatory Liability';
    let tierColor = 'text-rose-400 border-rose-500/30 bg-rose-500/10';

    if (totalScore >= 85) {
      overallTier = 'institutional';
      tierTitle = isFr ? 'Niveau Institutionnel • Prêt pour Audit' : 'Institutional Grade • Audit-Ready';
      tierColor = 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10';
    } else if (totalScore >= 65) {
      overallTier = 'substantial';
      tierTitle = isFr ? 'Conformité de Base • Faiblesses Notables' : 'Substantial Baseline • Critical Exposure Gaps';
      tierColor = 'text-cyan-400 border-cyan-500/30 bg-cyan-500/10';
    } else if (totalScore >= 40) {
      overallTier = 'moderate';
      tierTitle = isFr ? 'Exposition Réglementaire Élevée' : 'Elevated Regulatory Liability';
      tierColor = 'text-amber-400 border-amber-500/30 bg-amber-500/10';
    } else {
      overallTier = 'critical';
      tierTitle = isFr ? 'Non Conforme • Exposition à des Sanctions' : 'Non-Compliant • Statutory Penalty Exposure';
      tierColor = 'text-rose-400 border-rose-500/30 bg-rose-500/10';
    }

    return {
      totalScore,
      overallTier,
      tierTitle,
      tierColor,
      frameworkScores
    };
  }, [answers, selectedFrameworks, isFr]);

  // Lead Submission
  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadForm.workEmail || !leadForm.name) {
      toast.error(isFr ? 'Veuillez remplir votre nom et courriel professionnel.' : 'Please provide your name and work email.');
      return;
    }

    setIsSubmittingLead(true);
    try {
      const payload = {
        name: leadForm.name,
        email: leadForm.workEmail,
        company: leadForm.company || 'Enterprise Prospect',
        role: leadForm.role || 'Executive / CISO',
        phone: leadForm.phone,
        notes: leadForm.notes,
        language: language || 'en',
        industry: selectedIndustry,
        cloud: selectedCloud,
        score: results.totalScore,
        tier: results.tierTitle,
        frameworks: selectedFrameworks,
        breakdown: results.frameworkScores,
        timestamp: new Date().toISOString(),
        source: 'compliance_readiness_grader'
      };

      // 1. Save entry to persistent database
      await db.saveEntry('lead', payload);

      setLeadSubmitted(true);
      toast.success(
        isFr 
          ? 'Votre dossier de conformité personnalisé a été généré avec succès !' 
          : 'Your personalized Compliance Audit Dossier has been generated!'
      );
    } catch (err: any) {
      console.error('Lead submission failure:', err);
      toast.error(isFr ? 'Erreur lors de la génération. Veuillez réessayer.' : 'Could not generate report. Please try again.');
    } finally {
      setIsSubmittingLead(false);
    }
  };

  // Direct Booking Handler
  const handleBookAudit = () => {
    const query = new URLSearchParams({
      focus: 'Compliance Audit Readiness (Score: ' + results.totalScore + '%)',
      company: leadForm.company || '',
      name: leadForm.name || '',
      email: leadForm.workEmail || '',
      framework: selectedFrameworks.join(', ')
    }).toString();
    navigate(`/booking?${query}`);
  };

  // Copy Dossier Summary
  const handleCopySummary = () => {
    const text = isFr ? `RAPPORT D'AUDIT DE PRÉPARATION À LA CONFORMITÉ - OAKIVO
===================================================
Organisation cible : ${leadForm.company || 'Entreprise'}
Secteur : ${selectedIndustry.toUpperCase()}
Infrastructure Infonuagique : ${selectedCloud.toUpperCase()}
Score Global de Préparation : ${results.totalScore} / 100 (${results.tierTitle})
Date d'évaluation : ${new Date().toLocaleDateString('fr-CA')}

DÉTAIL PAR CADRE RÉGLEMENTAIRE :
${selectedFrameworks.map(id => {
  const fw = FRAMEWORKS.find(f => f.id === id);
  const data = results.frameworkScores[id];
  return `- ${fw?.nameFr || fw?.name} (${fw?.acronym}): ${data?.score || 0}% | Lacune Prioritaire: ${data?.keyGap}`;
}).join('\n')}

PILARS D'ARCHITECTURE DIAGNOSTIQUÉS :
${QUESTIONS.map(q => {
  const ans = answers[q.id];
  return `• ${q.titleFr || q.title}: Niveau ${ans?.level || 0} (${ans?.score || 0}%) - ${ans?.labelFr || ans?.label}\n  Détails techniques: ${ans?.technicalDetailsFr || ans?.technicalDetails}`;
}).join('\n\n')}

FEUILLE DE ROUTE DE REMÉDIATION PRÉCONISÉE :
Phase 1 (0–30 jours) : Souveraineté des Données & Durcissement des Accès (KMS canadien dédié, barrières SCP).
Phase 2 (30–90 jours) : Identité Zéro Confiance des Charges de Travail (SPIFFE/SPIRE, Cosign, OPA).
Phase 3 (90–180 jours) : Télémétrie d'Audit & Détection Continue (Sondes noyau eBPF, signalement sub-2h Loi C-26).

Préparé par Oakivo Solutions Inc. (Dieppe, N.-B.) • https://www.oakivo.com` : `OAKIVO COMPLIANCE READINESS AUDIT REPORT
===================================================
Target Organization: ${leadForm.company || 'Enterprise'}
Sector: ${selectedIndustry.toUpperCase()}
Cloud Infrastructure: ${selectedCloud.toUpperCase()}
Overall Compliance Readiness Score: ${results.totalScore} / 100 (${results.tierTitle})
Evaluation Date: ${new Date().toLocaleDateString('en-CA')}

REGULATORY FRAMEWORK BREAKDOWN:
${selectedFrameworks.map(id => {
  const fw = FRAMEWORKS.find(f => f.id === id);
  const data = results.frameworkScores[id];
  return `- ${fw?.name} (${fw?.acronym}): ${data?.score || 0}% | Key Exposure: ${data?.keyGap}`;
}).join('\n')}

DIAGNOSTIC ARCHITECTURE PILLARS:
${QUESTIONS.map(q => {
  const ans = answers[q.id];
  return `• ${q.title}: Level ${ans?.level || 0} (${ans?.score || 0}%) - ${ans?.label}\n  Technical: ${ans?.technicalDetails}`;
}).join('\n\n')}

PRESCRIBED REMEDIATION ACTION PLAN:
Phase 1 (0-30 Days): Close Critical Ingress Gaps & Implement In-Country Sovereign KMS.
Phase 2 (30-90 Days): Deploy SPIFFE/SPIRE Ephemeral Workload Mesh & Automated CI/CD Image Signing (Cosign).
Phase 3 (90-180 Days): Enforce Linux Kernel eBPF Telemetry for Bill C-26 Mandatory Sub-2-Hour Incident Dispatch.

Prepared by Oakivo Solutions Inc. (Dieppe, NB) • https://www.oakivo.com`;

    navigator.clipboard.writeText(text);
    setCopiedDossier(true);
    toast.success(isFr ? 'Synthèse du dossier copiée !' : 'Compliance Dossier copied to clipboard!');
    setTimeout(() => setCopiedDossier(false), 3000);
  };

  return (
    <>
      <SEO 
        title={isFr 
          ? "Évaluateur de Préparation à la Conformité Réglementaire | Oakivo Solutions" 
          : "Regulatory Compliance Readiness Grader | Oakivo Solutions"}
        description={isFr 
          ? "Évaluez instantanément la conformité de votre infrastructure cloud face aux normes Bill C-26, OSFI B-13, SOC 2 Type II, Loi 25 et ISO 27001. Obtenez un rapport d'audit exécutif immédiat."
          : "Benchmark your cloud security against Bill C-26, OSFI B-13, SOC 2 Type II, PIPEDA / Law 25, and ISO 27001. Instant multi-standard compliance scoring and executive gap analysis."}
        canonical="/compliance-grader"
        image="/images/compliance-grader-hero.jpg"
        imageAlt="Oakivo Regulatory Compliance Readiness Grader Interface"
        schema={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": isFr ? "Évaluateur de Préparation à la Conformité Réglementaire" : "Regulatory Compliance Readiness Grader",
          "url": "https://www.oakivo.com/compliance-grader",
          "applicationCategory": "SecurityApplication",
          "operatingSystem": "All",
          "description": "Interactive enterprise compliance scoring engine for Bill C-26, OSFI B-13, SOC 2 Type II, PIPEDA/Law 25, and ISO 27001.",
          "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "CAD"
          },
          "provider": {
            "@type": "Organization",
            "name": "Oakivo Solutions Inc.",
            "url": "https://www.oakivo.com"
          }
        }}
      />

      <section className="relative min-h-screen bg-slate-950 text-slate-100 pt-8 pb-24 overflow-hidden">
        {/* Subtle Background Glows */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-cyan-500/10 via-emerald-500/5 to-transparent blur-3xl pointer-events-none" />

        <div className="container mx-auto px-6 max-w-6xl relative z-10">
          
          {/* Header Zone */}
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="flex items-center justify-center gap-2 text-xs font-mono text-cyan-400 mb-3 tracking-wider">
              <span>CANADIAN REGULATORY ARCHITECTURE</span>
              <span aria-hidden="true">·</span>
              <span>MULTI-STANDARD AUDIT GRADER</span>
            </div>
            
            <h1 className="text-3xl md:text-5xl font-display font-bold text-white tracking-tight mb-4 text-balance">
              {isFr 
                ? "Évaluez Votre Préparation à la Conformité Réglementaire" 
                : "Regulatory Compliance Readiness Grader"}
            </h1>
            
            <p className="text-slate-400 text-sm md:text-base leading-relaxed text-balance">
              {isFr
                ? "Mesurez les vulnérabilités réglementaires de votre infrastructure cloud face aux exigences obligatoires de la Loi C-26, des directives B-13 du BSIF, de SOC 2 et de la Loi 25. Obtenez un diagnostic technique précis et chiffré en 3 minutes."
                : "Diagnose your cloud security gaps against mandatory mandates including Canada's Bill C-26, OSFI Guideline B-13, SOC 2 Type II, and Law 25. Generate an executive readiness scorecard and architectural remediation plan in 3 minutes."}
            </p>
          </div>

          {/* Stepper Navigation */}
          <div className="flex items-center justify-between max-w-2xl mx-auto mb-12 border-b border-slate-800 pb-4">
            {[
              { num: 1, label: isFr ? '1. Périmètre' : '1. Scope' },
              { num: 2, label: isFr ? '2. Diagnostic' : '2. Controls' },
              { num: 3, label: isFr ? '3. Score & Lacunes' : '3. Scorecard' },
              { num: 4, label: isFr ? '4. Dossier Exécutif' : '4. Dossier' },
            ].map((step) => {
              const isActive = currentStep === step.num;
              const isPast = currentStep > step.num;
              return (
                <button
                  key={step.num}
                  onClick={() => {
                    if (step.num < currentStep) setCurrentStep(step.num as any);
                  }}
                  disabled={step.num > currentStep && currentStep !== 3}
                  className={`flex items-center gap-2 text-xs font-mono transition-colors ${
                    isActive 
                      ? 'text-cyan-400 font-bold border-b-2 border-cyan-400 pb-4 -mb-4' 
                      : isPast 
                      ? 'text-slate-300 hover:text-white cursor-pointer' 
                      : 'text-slate-600 cursor-not-allowed'
                  }`}
                >
                  <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${
                    isActive ? 'bg-cyan-500 text-slate-950 font-bold' : isPast ? 'bg-slate-800 text-slate-300' : 'bg-slate-900 text-slate-600'
                  }`}>
                    {step.num}
                  </span>
                  <span className="hidden sm:inline">{step.label}</span>
                </button>
              );
            })}
          </div>

          {/* Wizard Content Panels */}
          <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6 md:p-10 backdrop-blur-xl shadow-2xl">

            {/* STEP 1: SCOPE DEFINITION */}
            {currentStep === 1 && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="space-y-8"
              >
                <div>
                  <h2 className="text-xl font-display font-bold text-white mb-2">
                    {isFr ? "1. Définition du Périmètre de l'Organisation" : "1. Define Organizational & Regulatory Scope"}
                  </h2>
                  <p className="text-slate-400 text-sm">
                    {isFr 
                      ? "Sélectionnez votre secteur industriel, votre environnement infonuagique principal et les cadres de conformité cibles."
                      : "Select your operating industry, primary cloud architecture, and the regulatory frameworks governing your systems."}
                  </p>
                </div>

                {/* Industry Sector Selection */}
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-3">
                    {isFr ? "Secteur d'Activité" : "Operating Industry"}
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {INDUSTRIES.map(ind => (
                      <button
                        key={ind.id}
                        type="button"
                        onClick={() => setSelectedIndustry(ind.id)}
                        className={`text-left p-4 rounded-xl border text-sm font-medium transition-all ${
                          selectedIndustry === ind.id
                            ? 'bg-cyan-500/10 border-cyan-500/60 text-white shadow-lg shadow-cyan-500/5'
                            : 'bg-slate-900/40 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span>{isFr ? ind.labelFr : ind.labelEn}</span>
                          {selectedIndustry === ind.id && <Check className="text-cyan-400 shrink-0" size={16} />}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Cloud Provider Selection */}
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-3">
                    {isFr ? "Infrastructure Infonuagique Principale" : "Primary Cloud Infrastructure"}
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {CLOUD_PROVIDERS.map(cp => (
                      <button
                        key={cp.id}
                        type="button"
                        onClick={() => setSelectedCloud(cp.id)}
                        className={`text-left p-4 rounded-xl border text-sm font-medium transition-all ${
                          selectedCloud === cp.id
                            ? 'bg-cyan-500/10 border-cyan-500/60 text-white shadow-lg shadow-cyan-500/5'
                            : 'bg-slate-900/40 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span>{isFr && cp.labelFr ? cp.labelFr : cp.label}</span>
                          {selectedCloud === cp.id && <Check className="text-cyan-400 shrink-0" size={16} />}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Target Frameworks Multi-Select */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <label className="text-xs font-mono uppercase tracking-wider text-slate-400">
                      {isFr ? "Cadres Réglementaires Ciblés (Sélectionnez-en un ou plusieurs)" : "Target Compliance Frameworks (Select all that apply)"}
                    </label>
                    <span className="text-xs text-cyan-400 font-mono">
                      {selectedFrameworks.length} {isFr ? 'sélectionnés' : 'selected'}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {FRAMEWORKS.map(fw => {
                      const isSelected = selectedFrameworks.includes(fw.id);
                      return (
                        <div
                          key={fw.id}
                          onClick={() => toggleFramework(fw.id)}
                          className={`cursor-pointer p-4 rounded-xl border transition-all ${
                            isSelected
                              ? 'bg-slate-800/80 border-cyan-500/50 shadow-md'
                              : 'bg-slate-900/30 border-slate-800/80 hover:border-slate-700'
                          }`}
                        >
                          <div className="flex items-start justify-between gap-3 mb-1">
                            <div>
                              <span className="text-sm font-bold text-white block">{isFr && fw.nameFr ? fw.nameFr : fw.name}</span>
                              <span className="text-xs font-mono text-cyan-400">{isFr && fw.regulatorFr ? fw.regulatorFr : fw.regulator}</span>
                            </div>
                            <div className={`w-5 h-5 rounded flex items-center justify-center border mt-0.5 ${
                              isSelected ? 'bg-cyan-500 border-cyan-500 text-slate-950 font-bold' : 'border-slate-700 bg-slate-950'
                            }`}>
                              {isSelected && <Check size={14} />}
                            </div>
                          </div>
                          <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                            {isFr && fw.descriptionFr ? fw.descriptionFr : fw.description}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Action Bar */}
                <div className="flex justify-end pt-4 border-t border-slate-800">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(2)}
                    className="px-6 py-3 bg-cyan-500 text-slate-950 font-bold text-xs font-mono tracking-wider rounded-lg hover:bg-cyan-400 transition-colors flex items-center gap-2"
                  >
                    {isFr ? "CONTINUER VERS LE DIAGNOSTIC TECHNIQUE" : "CONTINUE TO CONTROLS DIAGNOSTIC"}
                    <ArrowRight size={16} />
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 2: TECHNICAL CONTROLS DIAGNOSTIC */}
            {currentStep === 2 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="space-y-10"
              >
                <div>
                  <h2 className="text-xl font-display font-bold text-white mb-2">
                    {isFr ? "2. Diagnostic des Contrôles de Sécurité & Conformité" : "2. Security & Compliance Controls Diagnostic"}
                  </h2>
                  <p className="text-slate-400 text-sm">
                    {isFr 
                      ? "Sélectionnez le niveau d'implémentation actuel de votre infrastructure pour chaque dimension critique."
                      : "Select the tier that most accurately reflects your current production architecture across each dimension."}
                  </p>
                </div>

                <div className="space-y-8">
                  {QUESTIONS.map((q, idx) => {
                    const currentSelected = answers[q.id];
                    return (
                      <div key={q.id} className="p-6 rounded-xl bg-slate-950/40 border border-slate-800/80">
                        <div className="flex items-start justify-between gap-4 mb-4">
                          <div>
                            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-1">
                              <span>0{idx + 1}. {isFr && q.categoryFr ? q.categoryFr : q.category}</span>
                              <span aria-hidden="true">·</span>
                              <span className="text-slate-500">{q.regulatoryRelevance}</span>
                            </div>
                            <h3 className="text-base font-semibold text-white">
                              {isFr && q.titleFr ? q.titleFr : q.title}
                            </h3>
                          </div>
                          <span className={`text-xs font-mono px-2.5 py-1 rounded border ${
                            currentSelected?.level === 3 ? 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10' :
                            currentSelected?.level === 2 ? 'text-cyan-400 border-cyan-500/30 bg-cyan-500/10' :
                            currentSelected?.level === 1 ? 'text-amber-400 border-amber-500/30 bg-amber-500/10' :
                            'text-rose-400 border-rose-500/30 bg-rose-500/10'
                          }`}>
                            {isFr ? 'Niveau' : 'Level'} {currentSelected?.level ?? 0} ({currentSelected?.score ?? 0}%)
                          </span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {q.options.map(opt => {
                            const isOptSelected = currentSelected?.id === opt.id;
                            return (
                              <button
                                key={opt.id}
                                type="button"
                                onClick={() => handleSelectOption(q.id, opt)}
                                className={`text-left p-4 rounded-lg border transition-all ${
                                  isOptSelected
                                    ? 'bg-slate-800/90 border-cyan-400 text-white shadow-md'
                                    : 'bg-slate-900/30 border-slate-800/60 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                                }`}
                              >
                                <div className="flex items-start justify-between gap-2 mb-1.5">
                                  <span className="text-xs font-bold text-white leading-snug">
                                    {isFr && opt.labelFr ? opt.labelFr : opt.label}
                                  </span>
                                  <span className="text-[10px] font-mono text-slate-500 shrink-0">
                                    L{opt.level}
                                  </span>
                                </div>
                                <p className="text-[11px] text-slate-400 font-light leading-relaxed">
                                  {isFr && opt.technicalDetailsFr ? opt.technicalDetailsFr : opt.technicalDetails}
                                </p>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Action Bar */}
                <div className="flex items-center justify-between pt-6 border-t border-slate-800">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(1)}
                    className="px-5 py-2.5 bg-slate-900 text-slate-400 font-mono text-xs hover:text-white rounded-lg transition-colors flex items-center gap-2"
                  >
                    <ArrowLeft size={16} />
                    {isFr ? "MODIFIER LE PÉRIMÈTRE" : "BACK TO SCOPE"}
                  </button>

                  <button
                    type="button"
                    onClick={() => setCurrentStep(3)}
                    className="px-6 py-3 bg-cyan-500 text-slate-950 font-bold text-xs font-mono tracking-wider rounded-lg hover:bg-cyan-400 transition-colors flex items-center gap-2"
                  >
                    {isFr ? "GÉNÉRER LE SCORECARD EXÉCUTIF" : "CALCULATE COMPLIANCE SCORECARD"}
                    <ArrowRight size={16} />
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 3: SCORECARD & GAP ANALYSIS */}
            {currentStep === 3 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="space-y-10"
              >
                {/* Scorecard Hero Banner */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-8 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-900/90 to-slate-950 border border-slate-800">
                  <div className="lg:col-span-4 flex flex-col items-center justify-center text-center p-6 border border-slate-800/80 rounded-xl bg-slate-950/60">
                    <div className="relative w-36 h-36 flex items-center justify-center mb-4">
                      {/* Circular Gauge Background */}
                      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                        <circle
                          cx="50"
                          cy="50"
                          r="42"
                          stroke="currentColor"
                          strokeWidth="8"
                          className="text-slate-800"
                          fill="transparent"
                        />
                        <circle
                          cx="50"
                          cy="50"
                          r="42"
                          stroke="currentColor"
                          strokeWidth="8"
                          strokeDasharray={264}
                          strokeDashoffset={264 - (264 * results.totalScore) / 100}
                          strokeLinecap="round"
                          className={
                            results.totalScore >= 80 ? 'text-emerald-400' :
                            results.totalScore >= 60 ? 'text-cyan-400' :
                            results.totalScore >= 40 ? 'text-amber-400' :
                            'text-rose-400'
                          }
                          fill="transparent"
                        />
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-4xl font-display font-extrabold text-white tracking-tight tabular-nums">
                          {results.totalScore}%
                        </span>
                        <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">
                          {isFr ? 'Préparation' : 'Readiness'}
                        </span>
                      </div>
                    </div>

                    <span className={`text-xs font-mono font-bold px-3 py-1 rounded-full border ${results.tierColor}`}>
                      {results.tierTitle}
                    </span>
                  </div>

                  <div className="lg:col-span-8 space-y-4">
                    <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
                      <span>AUDIT READINESS BENCHMARK</span>
                      <span aria-hidden="true">·</span>
                      <span className="text-slate-400">{selectedIndustry.toUpperCase()}</span>
                    </div>

                    <h3 className="text-2xl font-display font-bold text-white">
                      {isFr ? "Diagnostic de Conformité & Exposition aux Sanctions" : "Compliance Posture & Exposure Summary"}
                    </h3>

                    <p className="text-slate-300 text-sm leading-relaxed">
                      {results.totalScore >= 85 ? (
                        isFr 
                          ? "Votre architecture démontre une maturité de sécurité institutionnelle. Vos contrôles cryptographiques et vos pipelines de livraison automatisés satisfont les exigences des auditeurs externes."
                          : "Your architecture demonstrates institutional-grade maturity. Your cryptographic identity boundaries and automated pipeline controls align closely with external auditor thresholds."
                      ) : results.totalScore >= 65 ? (
                        isFr
                          ? "Votre posture de sécurité dispose de fondations solides, mais présente des vulnérabilités critiques face aux exigences strictes de divulgation de la Loi C-26 et de gestion des tiers du BSIF."
                          : "Your posture maintains solid baselines, but exposes significant compliance vulnerabilities against strict Bill C-26 mandatory disclosure windows and OSFI B-13 third-party concentration rules."
                      ) : (
                        isFr
                          ? "Votre organisation présente un niveau de responsabilité réglementaire élevé. Les audits externes ou les incidents de sécurité entraîneront des sanctions directes ou des blocages commerciaux majeurs."
                          : "Your organization carries acute regulatory exposure. External audit reviews or uncontained security incidents risk direct statutory enforcement actions or severe enterprise procurement vetoes."
                      )}
                    </p>

                    <div className="pt-2 flex flex-wrap gap-3">
                      <button
                        type="button"
                        onClick={() => setCurrentStep(4)}
                        className="px-5 py-2.5 bg-cyan-500 text-slate-950 font-bold text-xs font-mono tracking-wider rounded-lg hover:bg-cyan-400 transition-colors flex items-center gap-2"
                      >
                        {isFr ? "DÉBLOQUER LE RAPPORT DE REMÉDIATION" : "UNLOCK FULL REMEDIATION DOSSIER"}
                        <ArrowRight size={14} />
                      </button>

                      <button
                        type="button"
                        onClick={handleBookAudit}
                        className="px-5 py-2.5 bg-slate-800 text-white font-mono text-xs hover:bg-slate-700 rounded-lg transition-colors flex items-center gap-2"
                      >
                        <Calendar size={14} className="text-cyan-400" />
                        {isFr ? "RÉSERVER UN AUDIT D'ARCHITECTURE" : "BOOK ARCHITECTURE CONSULTATION"}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Framework by Framework Breakdown */}
                <div>
                  <h3 className="text-lg font-display font-bold text-white mb-4">
                    {isFr ? "Détail par Norme Réglementaire" : "Framework-by-Framework Readiness"}
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {selectedFrameworks.map(fwId => {
                      const fw = FRAMEWORKS.find(f => f.id === fwId);
                      const data = results.frameworkScores[fwId];
                      if (!fw || !data) return null;

                      return (
                        <div key={fw.id} className="p-5 rounded-xl bg-slate-950/60 border border-slate-800 space-y-3">
                          <div className="flex items-center justify-between">
                            <div>
                              <span className="text-sm font-bold text-white block">{isFr && fw.nameFr ? fw.nameFr : fw.name}</span>
                              <span className="text-[11px] font-mono text-cyan-400">{isFr && fw.regulatorFr ? fw.regulatorFr : fw.regulator}</span>
                            </div>
                            <div className="text-right">
                              <span className="text-xl font-bold font-mono text-white tabular-nums">{data.score}%</span>
                            </div>
                          </div>

                          {/* Progress bar */}
                          <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                            <div 
                              className={`h-full rounded-full transition-all duration-500 ${
                                data.score >= 80 ? 'bg-emerald-400' :
                                data.score >= 55 ? 'bg-cyan-400' :
                                data.score >= 40 ? 'bg-amber-400' :
                                'bg-rose-500'
                              }`} 
                              style={{ width: `${data.score}%` }} 
                            />
                          </div>

                          <div className="pt-1">
                            <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block mb-1">
                              {isFr ? 'Lacune Prioritaire Détectée :' : 'Primary Exposure Gap:'}
                            </span>
                            <p className="text-xs text-slate-300 font-light">
                              {data.keyGap}
                            </p>
                          </div>

                          <div className="pt-2 border-t border-slate-900 text-[11px] text-slate-500 font-mono">
                            <span className="text-amber-400/80 font-bold">{isFr ? 'Sanction Légale :' : 'Regulatory Context:'}</span> {isFr && fw.penaltyContextFr ? fw.penaltyContextFr : fw.penaltyContext}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Prescribed Roadmap Preview */}
                <div className="p-6 rounded-xl bg-slate-900/40 border border-slate-800 space-y-4">
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <Sparkles className="text-cyan-400" size={18} />
                    {isFr ? "Plan de Remédiation DevSecOps Préconisé (3 Phases)" : "Prescribed Engineering Remediation Roadmap (3 Phases)"}
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 rounded-lg bg-slate-950/50 border border-slate-800/80 space-y-2">
                      <span className="text-xs font-mono text-rose-400 font-bold">{isFr ? "PHASE 1 (0–30 JOURS)" : "PHASE 1 (0–30 DAYS)"}</span>
                      <h4 className="text-sm font-semibold text-white">{isFr ? "Souveraineté des Données & Accès" : "Sovereignty & Ingress Hardening"}</h4>
                      <p className="text-xs text-slate-400 leading-relaxed">
                        {isFr 
                          ? "Migration de toutes les clés KMS non gérées vers des Cloud HSM canadiens dédiés (ca-central-1). Application de barrières SCP strictes bloquant les fuites transfrontalières."
                          : "Migrate all unmanaged cloud KMS keys to dedicated Canadian HSMs (ca-central-1). Enforce strict SCP boundary blocking unauthorized cross-border egress."}
                      </p>
                    </div>

                    <div className="p-4 rounded-lg bg-slate-950/50 border border-slate-800/80 space-y-2">
                      <span className="text-xs font-mono text-cyan-400 font-bold">{isFr ? "PHASE 2 (30–90 JOURS)" : "PHASE 2 (30–90 DAYS)"}</span>
                      <h4 className="text-sm font-semibold text-white">{isFr ? "Identité Zéro Confiance des Charges" : "Zero-Trust Workload Identity"}</h4>
                      <p className="text-xs text-slate-400 leading-relaxed">
                        {isFr
                          ? "Déploiement d'un maillage SPIFFE/SPIRE éliminant les clés API statiques. Mise en place de la signature de conteneurs Sigstore Cosign et de contrôleurs d'admission OPA."
                          : "Deploy SPIFFE/SPIRE mesh to replace static API keys. Implement automated Sigstore Cosign container signing and OPA admission controllers."}
                      </p>
                    </div>

                    <div className="p-4 rounded-lg bg-slate-950/50 border border-slate-800/80 space-y-2">
                      <span className="text-xs font-mono text-emerald-400 font-bold">{isFr ? "PHASE 3 (90–180 JOURS)" : "PHASE 3 (90–180 DAYS)"}</span>
                      <h4 className="text-sm font-semibold text-white">{isFr ? "Télémétrie d'Audit & Détection Continue" : "Continuous Audit Telemetry"}</h4>
                      <p className="text-xs text-slate-400 leading-relaxed">
                        {isFr
                          ? "Instrumentation de sondes comportementales eBPF dans le noyau Linux pour garantir le respect du délai légal de 2h de la Loi C-26 et la collecte continue de preuves SOC 2."
                          : "Instrument Linux kernel eBPF behavioral monitors to guarantee sub-2-hour Bill C-26 statutory reporting and continuous automated SOC 2 evidence collection."}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Action Bar */}
                <div className="flex items-center justify-between pt-6 border-t border-slate-800">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(2)}
                    className="px-5 py-2.5 bg-slate-900 text-slate-400 font-mono text-xs hover:text-white rounded-lg transition-colors flex items-center gap-2"
                  >
                    <ArrowLeft size={16} />
                    {isFr ? "RÉVISER LES RÉPONSES" : "REVISE DIAGNOSTIC"}
                  </button>

                  <button
                    type="button"
                    onClick={() => setCurrentStep(4)}
                    className="px-6 py-3 bg-cyan-500 text-slate-950 font-bold text-xs font-mono tracking-wider rounded-lg hover:bg-cyan-400 transition-colors flex items-center gap-2"
                  >
                    {isFr ? "RECEVOIR LE DOSSIER COMPLET & PRENDRE RENDEZ-VOUS" : "GENERATE OFFICIAL AUDIT DOSSIER"}
                    <ArrowRight size={16} />
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 4: LEAD CAPTURE & DOSSIER DELIVERY */}
            {currentStep === 4 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="space-y-8"
              >
                {!leadSubmitted ? (
                  <>
                    <div className="max-w-2xl">
                      <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-2">
                        <span>EXECUTIVE ARTIFACT GENERATOR</span>
                        <span aria-hidden="true">·</span>
                        <span>CONFIDENTIAL BRIEFING</span>
                      </div>
                      <h2 className="text-2xl font-display font-bold text-white mb-2">
                        {isFr ? "Débloquez Votre Dossier de Conformité & Plan de Remédiation" : "Unlock Your Full Compliance Audit Dossier"}
                      </h2>
                      <p className="text-slate-400 text-sm">
                        {isFr
                          ? "Recevez une analyse d'écart exhaustive au format PDF avec les scripts Terraform recommandés, les règles Rego OPA et la feuille de route d'audit."
                          : "Receive your comprehensive regulatory gap breakdown with recommended Terraform hardening scripts, OPA policy manifests, and audit timeline."}
                      </p>
                    </div>

                    <form onSubmit={handleLeadSubmit} className="space-y-4 max-w-2xl">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-mono text-slate-400 mb-1.5">
                            {isFr ? "Nom & Prénom *" : "Full Name *"}
                          </label>
                          <div className="relative">
                            <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                            <input
                              required
                              type="text"
                              placeholder={isFr ? "Jean Dupont" : "Jane Doe"}
                              value={leadForm.name}
                              onChange={e => setLeadForm({ ...leadForm, name: e.target.value })}
                              className="w-full bg-slate-950 border border-slate-800 rounded-lg py-2.5 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-mono text-slate-400 mb-1.5">
                            {isFr ? "Courriel Professionnel *" : "Work Email *"}
                          </label>
                          <div className="relative">
                            <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                            <input
                              required
                              type="email"
                              placeholder="name@enterprise.ca"
                              value={leadForm.workEmail}
                              onChange={e => setLeadForm({ ...leadForm, workEmail: e.target.value })}
                              className="w-full bg-slate-950 border border-slate-800 rounded-lg py-2.5 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-mono text-slate-400 mb-1.5">
                            {isFr ? "Organisation / Entreprise" : "Organization / Company"}
                          </label>
                          <div className="relative">
                            <Building2 size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                            <input
                              type="text"
                              placeholder="Acme Financial"
                              value={leadForm.company}
                              onChange={e => setLeadForm({ ...leadForm, company: e.target.value })}
                              className="w-full bg-slate-950 border border-slate-800 rounded-lg py-2.5 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-mono text-slate-400 mb-1.5">
                            {isFr ? "Titre / Fonction" : "Job Title / Role"}
                          </label>
                          <div className="relative">
                            <Briefcase size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                            <input
                              type="text"
                              placeholder="CISO / VP Engineering / Lead Architect"
                              value={leadForm.role}
                              onChange={e => setLeadForm({ ...leadForm, role: e.target.value })}
                              className="w-full bg-slate-950 border border-slate-800 rounded-lg py-2.5 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
                            />
                          </div>
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-mono text-slate-400 mb-1.5">
                          {isFr ? "Questions ou enjeux prioritaires (Optionnel)" : "Specific Infrastructure Questions or Upcoming Audits (Optional)"}
                        </label>
                        <textarea
                          rows={3}
                          placeholder={isFr ? "Ex. : Préparation à l'audit SOC 2 Type II d'ici 6 mois..." : "e.g., Preparing for OSFI B-13 audit or upcoming SOC 2 Type II review..."}
                          value={leadForm.notes}
                          onChange={e => setLeadForm({ ...leadForm, notes: e.target.value })}
                          className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-sm text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={isSubmittingLead}
                        className="w-full py-4 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs font-mono tracking-wider rounded-lg transition-colors flex items-center justify-center gap-2 mt-4"
                      >
                        {isSubmittingLead ? (
                          <>
                            <RefreshCw size={16} className="animate-spin" />
                            {isFr ? "GÉNÉRATION DU DOSSIER EN COURS..." : "GENERATING COMPLIANCE DOSSIER..."}
                          </>
                        ) : (
                          <>
                            <FileCheck size={16} />
                            {isFr ? "ENVOYER MON DOSSIER DE CONFORMITÉ" : "GENERATE & DISPATCH MY COMPLIANCE DOSSIER"}
                          </>
                        )}
                      </button>

                      <p className="text-[11px] text-slate-500 text-center">
                        {isFr 
                          ? "Protection stricte des données selon la Loi 25 et la LPRPDE. Vos informations restent confidentielles." 
                          : "Strict compliance with PIPEDA and Law 25. Your data remains strictly confidential and sovereign."}
                      </p>
                    </form>
                  </>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-8 rounded-xl bg-slate-950/80 border border-emerald-500/30 text-center max-w-2xl mx-auto space-y-6"
                  >
                    <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                      <CheckCircle2 size={32} />
                    </div>

                    <div>
                      <h3 className="text-2xl font-display font-bold text-white mb-2">
                        {isFr ? "Dossier de Conformité Généré" : "Compliance Audit Dossier Dispatched"}
                      </h3>
                      <p className="text-slate-300 text-sm">
                        {isFr
                          ? `Le rapport exécutif pour ${leadForm.company || 'votre organisation'} a été préparé et transmis à ${leadForm.workEmail}.`
                          : `The executive audit dossier for ${leadForm.company || 'your organization'} has been generated and dispatched to ${leadForm.workEmail}.`}
                      </p>
                    </div>

                    <div className="p-4 rounded-lg bg-slate-900/60 border border-slate-800 text-left text-xs font-mono text-slate-300 space-y-2">
                      <div className="flex justify-between border-b border-slate-800 pb-1.5">
                        <span className="text-slate-500">{isFr ? 'Score Global :' : 'Overall Readiness :'}</span>
                        <span className="font-bold text-cyan-400">{results.totalScore}% ({results.tierTitle})</span>
                      </div>
                      <div className="flex justify-between border-b border-slate-800 pb-1.5">
                        <span className="text-slate-500">{isFr ? 'Normes Évaluées :' : 'Frameworks Assessed :'}</span>
                        <span className="text-slate-300">{selectedFrameworks.map(id => FRAMEWORKS.find(f => f.id === id)?.acronym).join(', ')}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">{isFr ? 'Pôle Régional :' : 'Regional Desk :'}</span>
                        <span className="text-slate-300">Oakivo Solutions (Dieppe, NB)</span>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                      <button
                        type="button"
                        onClick={handleCopySummary}
                        className="w-full sm:w-auto px-5 py-2.5 bg-slate-800 text-white font-mono text-xs rounded-lg hover:bg-slate-700 transition-colors flex items-center justify-center gap-2"
                      >
                        {copiedDossier ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                        {copiedDossier ? (isFr ? 'Copié !' : 'Copied!') : (isFr ? 'Copier la Synthèse' : 'Copy Summary Text')}
                      </button>

                      <button
                        type="button"
                        onClick={handleBookAudit}
                        className="w-full sm:w-auto px-6 py-2.5 bg-cyan-500 text-slate-950 font-bold text-xs font-mono tracking-wider rounded-lg hover:bg-cyan-400 transition-colors flex items-center justify-center gap-2"
                      >
                        <Calendar size={14} />
                        {isFr ? "RÉSERVER L'AUDIT ARCHITECTURE (30 MIN)" : "SCHEDULE 30-MIN CONSULTATION"}
                      </button>
                    </div>
                  </motion.div>
                )}

                <div className="pt-4 border-t border-slate-800 flex justify-start">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(3)}
                    className="text-xs font-mono text-slate-400 hover:text-white flex items-center gap-1.5 transition-colors"
                  >
                    <ArrowLeft size={14} />
                    {isFr ? "Retour au Scorecard" : "Back to Scorecard"}
                  </button>
                </div>
              </motion.div>
            )}

          </div>

          {/* Social Proof & Framework Trust Ticker */}
          <div className="mt-16 pt-8 border-t border-slate-900 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="space-y-1">
              <span className="text-xl font-bold font-mono text-white">100%</span>
              <p className="text-xs text-slate-500 font-mono uppercase tracking-wider">
                {isFr ? 'Souveraineté Canadienne' : 'Canadian Data Sovereignty'}
              </p>
            </div>
            <div className="space-y-1">
              <span className="text-xl font-bold font-mono text-cyan-400">&lt; 2h</span>
              <p className="text-xs text-slate-500 font-mono uppercase tracking-wider">
                {isFr ? 'Conformité Loi C-26' : 'Bill C-26 Statutory Reporting'}
              </p>
            </div>
            <div className="space-y-1">
              <span className="text-xl font-bold font-mono text-white">OSFI B-13</span>
              <p className="text-xs text-slate-500 font-mono uppercase tracking-wider">
                {isFr ? 'Résilience Bancaire FRFI' : 'FRFI Operational Resilience'}
              </p>
            </div>
            <div className="space-y-1">
              <span className="text-xl font-bold font-mono text-emerald-400">SOC 2</span>
              <p className="text-xs text-slate-500 font-mono uppercase tracking-wider">
                {isFr ? 'Preuves d\'Audit Continues' : 'Continuous Audit Evidence'}
              </p>
            </div>
          </div>

        </div>
      </section>
    </>
  );
};

export default ComplianceGrader;
