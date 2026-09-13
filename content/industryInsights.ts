export type IndustryId = 'all' | 'healthcare' | 'retail' | 'logistics' | 'fintech' | 'infrastructure';

export interface IndustrySecurityProfile {
  id: IndustryId;
  name: string;
  nameFr: string;
  badge: string;
  tagline: string;
  taglineFr: string;
  description: string;
  descriptionFr: string;
  iconName: string;
  colorClass: {
    bg: string;
    border: string;
    text: string;
    pillBg: string;
    glow: string;
  };
  keyRegulations: string[];
  primaryThreats: {
    threat: string;
    mitigation: string;
  }[];
  matchedCaseStudyId: string;
  articleIds: string[];
}

export const INDUSTRIES_CONFIG: Record<Exclude<IndustryId, 'all'>, IndustrySecurityProfile> = {
  healthcare: {
    id: 'healthcare',
    name: 'Healthcare & Life Sciences',
    nameFr: 'Santé et Sciences de la Vie',
    badge: 'PHIPA & PIPEDA Aligned',
    tagline: 'Cryptographic Sovereignty for Clinical Telemetry & EHR Systems',
    taglineFr: 'Souveraineté Cryptographique pour la Télémétrie Clinique et Dossiers de Santé',
    description: 'Securing multi-clinic electronic health records, diagnostic imaging pipelines, and AI triage systems against cross-border data leakage and ransomware disruption.',
    descriptionFr: 'Sécurisation des dossiers médicaux partagés, flux d\'imagerie diagnostique et systèmes de triage IA contre les fuites transfrontalières.',
    iconName: 'HeartPulse',
    colorClass: {
      bg: 'bg-rose-500/10',
      border: 'border-rose-500/30',
      text: 'text-rose-400',
      pillBg: 'bg-rose-500/20 text-rose-300 border-rose-500/30',
      glow: 'from-rose-500/10 via-transparent to-transparent'
    },
    keyRegulations: ['PIPEDA (Federal)', 'Law 25 (Quebec)', 'PHIPA (Ontario)', 'PHIA (Nova Scotia)', 'HIPAA / HITECH'],
    primaryThreats: [
      {
        threat: 'Cross-Border PHI Data Spillage via US Cloud Failover',
        mitigation: 'AWS ca-central-1 strict residency SCPs and localized Customer Managed Keys (CMKs)'
      },
      {
        threat: 'Ransomware Encryption of Clinical Diagnostic Databases',
        mitigation: 'Immutable zero-trust air-gapped snapshots with KMS envelope separation'
      },
      {
        threat: 'Unredacted Patient Telemetry Ingestion into Public AI Models',
        mitigation: 'In-boundary local sanitization proxies that purge PII prior to inference'
      }
    ],
    matchedCaseStudyId: 'atlantic-health-informatics',
    articleIds: [
      'data-residency-health-tech-atlantic-canada',
      'pipeda-data-residency-aws'
    ]
  },
  retail: {
    id: 'retail',
    name: 'Retail & E-Commerce',
    nameFr: 'Commerce de Détail et E-Commerce',
    badge: 'PCI-DSS 4.0 Enforced',
    tagline: 'Defending Omnichannel Checkout, POS Terminals, and Supplier APIs',
    taglineFr: 'Défense du Checkout Omnicanal, Terminaux TPV et APIs Fournisseurs',
    description: 'Protecting consumer credit card telemetry, securing cloud-connected POS fleets, and eliminating digital supply chain skimming across modern retail infrastructures.',
    descriptionFr: 'Protection des transactions bancaires, sécurisation des flottes de points de vente connectés et élimination des risques de chaîne d\'approvisionnement.',
    iconName: 'ShoppingBag',
    colorClass: {
      bg: 'bg-amber-500/10',
      border: 'border-amber-500/30',
      text: 'text-amber-400',
      pillBg: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
      glow: 'from-amber-500/10 via-transparent to-transparent'
    },
    keyRegulations: ['PCI-DSS 4.0', 'PIPEDA', 'SOC 2 Type II', 'FTC Safeguards', 'EU AI Act (Pricing Algorithms)'],
    primaryThreats: [
      {
        threat: 'Third-Party E-Commerce Plugin Infiltration (Magecart)',
        mitigation: 'Subresource Integrity (SRI), CSP strict headers, and real-time DOM mutation monitoring'
      },
      {
        threat: 'POS Gateway Credential Stuffing & Session Hijacking',
        mitigation: 'Hardware-backed WebAuthn/FIDO2 MFA and continuous anomaly session termination'
      },
      {
        threat: 'Compromised Hardware Supplier API Integrations',
        mitigation: 'Zero-Trust API gateways with strict JSON schema validation and per-vendor rate limiting'
      }
    ],
    matchedCaseStudyId: 'maritime-equipment-supplier',
    articleIds: [
      'supply-chain-cyber-risk',
      'ai-governance-eu-act-2026',
      'ai-in-devsecops'
    ]
  },
  logistics: {
    id: 'logistics',
    name: 'Logistics & Supply Chain',
    nameFr: 'Logistique et Chaîne d\'Approvisionnement',
    badge: 'Bill C-26 & OT Ready',
    tagline: 'Operational Continuity for Fleet Telematics, Cold-Chain, and Ports',
    taglineFr: 'Continuité Opérationnelle pour la Télématique, la Chaîne du Froid et les Ports',
    description: 'Guarding refrigerated distribution facilities, transatlantic shipping terminals, and automated dispatch engines against kinetic cyber disruption.',
    descriptionFr: 'Protection des installations frigorifiques, terminaux portuaires et répartiteurs automatisés contre les cyberattaques physiques.',
    iconName: 'Truck',
    colorClass: {
      bg: 'bg-cyan-500/10',
      border: 'border-cyan-500/30',
      text: 'text-cyan-400',
      pillBg: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
      glow: 'from-cyan-500/10 via-transparent to-transparent'
    },
    keyRegulations: ['Bill C-26 (Cyber Security Act)', 'NIST SP 800-161 (Supply Chain)', 'IEC 62443 (OT/SCADA)', 'IMO Maritime Cyber Risk'],
    primaryThreats: [
      {
        threat: 'Kinetic Spoilage via IoT Cold-Storage Telemetry Tampering',
        mitigation: 'Mutual TLS (mTLS) cryptographic sensor attestation with out-of-band temperature alerts'
      },
      {
        threat: 'Fleet Dispatch Lockout & Paper-Based Accounting Bottlenecks',
        mitigation: 'Air-gapped cloud-synced dispatch workflows with automated reconciliation'
      },
      {
        threat: 'SCADA Protocol Lateral Movement from Corporate IT Laptops',
        mitigation: 'eBPF-driven kernel microsegmentation and default-deny workload firewalls'
      }
    ],
    matchedCaseStudyId: 'atlantic-seafood-logistics',
    articleIds: [
      'atlantic-canada-critical-infrastructure-zero-trust',
      'cnapp-ebpf-runtime-security',
      'supply-chain-cyber-risk'
    ]
  },
  fintech: {
    id: 'fintech',
    name: 'Financial Services & FinTech',
    nameFr: 'Services Financiers et FinTech',
    badge: 'OSFI B-13 & SOC 2 Certified',
    tagline: 'Continuous Audit Automation & Quantum-Safe Cloud Architecture',
    taglineFr: 'Audit Continu Automatisé et Architecture Cloud Résistante au Quantique',
    description: 'Empowering venture-backed funds, digital banking ledgers, and wealth management firms to pass continuous SOC 2 audits and defend against AI social engineering.',
    descriptionFr: 'Accompagnement des fonds de capital-risque, registres bancaires et gestionnaires d\'actifs pour réussir leurs audits SOC 2 en continu.',
    iconName: 'Landmark',
    colorClass: {
      bg: 'bg-emerald-500/10',
      border: 'border-emerald-500/30',
      text: 'text-emerald-400',
      pillBg: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
      glow: 'from-emerald-500/10 via-transparent to-transparent'
    },
    keyRegulations: ['SOC 2 Type II', 'OSFI Guideline B-13', 'PCI-DSS 4.0', 'FINTRAC AML', 'NIST PQC (FIPS 203/204)'],
    primaryThreats: [
      {
        threat: 'Compliance Drift between Annual Audits Leading to Sanctions',
        mitigation: 'Policy-as-Code (OPA Gatekeeper) blocking non-compliant infrastructure at pull request'
      },
      {
        threat: 'Harvest-Now-Decrypt-Later Interception of Financial Tunnels',
        mitigation: 'Post-Quantum Cryptography (PQC) hybrid key encapsulation across VPC peering'
      },
      {
        threat: 'Deepfake Executive Voice Authorization for Wire Transfers',
        mitigation: 'Multi-party cryptographic signing keys (FIDO2) requiring secondary biometric approval'
      }
    ],
    matchedCaseStudyId: 'fundy-digital-capital',
    articleIds: [
      'soc2-compliance-automation',
      'quantum-safe-cryptography-ciso',
      'cyber-resilience-genai-era'
    ]
  },
  infrastructure: {
    id: 'infrastructure',
    name: 'Critical Infrastructure & GovTech',
    nameFr: 'Infrastructures Critiques et Secteur Public',
    badge: 'NIST 800-207 Zero-Trust',
    tagline: 'Hardened Kubernetes & SCADA Defense for Regional Utility Grids',
    taglineFr: 'Défense Kubernetes et SCADA Durcie pour Réseaux Énergétiques Régionaux',
    description: 'Shielding offshore energy terminals, subsea telecommunications gateways, and municipal utility grids from sophisticated nation-state APT threats.',
    descriptionFr: 'Protection des terminaux énergétiques offshore, câbles sous-marins et régies publiques contre les menaces étatiques persistantes (APT).',
    iconName: 'ShieldCheck',
    colorClass: {
      bg: 'bg-indigo-500/10',
      border: 'border-indigo-500/30',
      text: 'text-indigo-400',
      pillBg: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30',
      glow: 'from-indigo-500/10 via-transparent to-transparent'
    },
    keyRegulations: ['Bill C-26', 'NIST SP 800-207 (Zero Trust)', 'CIS Kubernetes Benchmarks', 'NERC CIP (Power Grids)'],
    primaryThreats: [
      {
        threat: 'Public Kubernetes API Server Exposure & Pod Takeover',
        mitigation: 'Private VPC endpoint isolation, dynamic admission controllers, and read-only root filesystems'
      },
      {
        threat: 'State-Sponsored Lateral Movement across Subsea Telemetry',
        mitigation: 'Strict Zero-Trust identity boundaries enforcing mTLS and automated ephemeral cert rotation'
      },
      {
        threat: 'Unmonitored Container Host Privilege Escalation',
        mitigation: 'Kernel-level eBPF behavioral monitoring terminating unauthorized fork/exec calls'
      }
    ],
    matchedCaseStudyId: 'atlantic-seafood-logistics',
    articleIds: [
      'zero-trust-architecture-2026',
      'k8s-posture-management',
      'atlantic-canada-critical-infrastructure-zero-trust'
    ]
  }
};
