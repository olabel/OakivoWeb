export type IndustryKey = 
  | 'default'
  | 'logistics'
  | 'healthcare'
  | 'fintech'
  | 'energy'
  | 'retail'
  | 'public_sector';

export interface IndustryHeroContent {
  id: IndustryKey;
  iconName: string;
  name: {
    en: string;
    fr: string;
  };
  badge: {
    en: string;
    fr: string;
  };
  headline: {
    en: string;
    fr: string;
    highlightEn: string;
    highlightFr: string;
  };
  subheadline: {
    en: string;
    fr: string;
  };
  metricChip: {
    en: string;
    fr: string;
  };
  ctaFocus: string;
  targetFrameworks: string[];
}

export const INDUSTRY_HERO_CONTENT: Record<IndustryKey, IndustryHeroContent> = {
  default: {
    id: 'default',
    iconName: 'ShieldCheck',
    name: {
      en: 'Enterprise DevSecOps',
      fr: 'DevSecOps Entreprise'
    },
    badge: {
      en: 'Canadian DevSecOps & Cloud Security Authority',
      fr: 'Autorité Canadienne en Sécurité Cloud & DevSecOps'
    },
    headline: {
      en: 'Automated Cloud Security & DevSecOps for Modern Enterprise',
      fr: 'Sécurité Cloud et DevSecOps Automatisés pour Entreprises Modernes',
      highlightEn: 'Modern Enterprise',
      highlightFr: 'Entreprises Modernes'
    },
    subheadline: {
      en: 'We transform high-friction manual security reviews into automated, continuous compliance pipelines. Zero Trust identity, real-time threat neutralization, and audit-ready governance engineered in Atlantic Canada.',
      fr: 'Nous transformons les revues de sécurité manuelles en pipelines de conformité continue. Identité Zéro-Trust, neutralisation des menaces et gouvernance prête pour l’audit.'
    },
    metricChip: {
      en: 'SOC 2 Type II • Bill C-26 • Hardened Multi-Cloud',
      fr: 'SOC 2 Type II • Loi C-26 • Multi-Cloud Renforcé'
    },
    ctaFocus: 'General Cloud Security & DevSecOps Architecture Audit',
    targetFrameworks: ['SOC 2 Type II', 'Bill C-26', 'Zero Trust IAM', 'Terraform CSPM']
  },

  logistics: {
    id: 'logistics',
    iconName: 'Truck',
    name: {
      en: 'Logistics & Supply Chain',
      fr: 'Logistique & Transport'
    },
    badge: {
      en: 'Tailored for Logistics, Freight & Supply Chain',
      fr: 'Adapté pour la Logistique et la Chaîne d’Approvisionnement'
    },
    headline: {
      en: 'Automated Cloud Security & API Protection for Logistics',
      fr: 'Sécurité Cloud et Protection des API Automatisées pour la Logistique',
      highlightEn: 'Logistics',
      highlightFr: 'la Logistique'
    },
    subheadline: {
      en: 'Shield dispatch APIs, fleet telematics microservices, and warehouse ERPs against ransomware and unauthorized access. Eliminate supply-chain software drift with cryptographically signed container pipelines.',
      fr: 'Protégez vos API de répartition, la télématique de flotte et les ERP d’entrepôt contre les ransomwares. Éliminez les dérives logicielles avec des pipelines signés cryptographiquement.'
    },
    metricChip: {
      en: '99.99% Fleet Uptime • Zero Unvetted Dependencies',
      fr: 'Disponibilité Flotte 99,99% • Zéro Dépendance Non Vérifiée'
    },
    ctaFocus: 'Logistics & Fleet Security Architecture Audit',
    targetFrameworks: ['Fleet Telematics API', 'Zero Trust IAM', 'Supply Chain SBOM', 'ERP Hardening']
  },

  healthcare: {
    id: 'healthcare',
    iconName: 'Activity',
    name: {
      en: 'Healthcare & Life Sciences',
      fr: 'Santé & MedTech'
    },
    badge: {
      en: 'Tailored for Healthcare, MedTech & Digital Health',
      fr: 'Adapté pour le Secteur de la Santé et MedTech'
    },
    headline: {
      en: 'HIPAA, Law 25 & Zero-Trust Cloud Security for Healthcare',
      fr: 'Sécurité Cloud Zéro-Trust, Loi 25 et HIPAA pour la Santé',
      highlightEn: 'Healthcare',
      highlightFr: 'la Santé'
    },
    subheadline: {
      en: 'Continuous patient health record sovereignty across Canadian cloud enclaves. Automated audit evidence collection for PIPEDA, Quebec Law 25, and SOC 2 Type II with zero clinical workflow disruption.',
      fr: 'Protection continue des dossiers médicaux au sein d’enclaves cloud souveraines au Canada. Collecte automatisée des preuves d’audit pour LPRPDE, Loi 25 et SOC 2 sans interruption clinique.'
    },
    metricChip: {
      en: 'PIPEDA & Law 25 Ready • Sovereign Canadian Enclaves',
      fr: 'Conforme LPRPDE & Loi 25 • Enclaves Cloud Souveraines'
    },
    ctaFocus: 'Healthcare Data Sovereignty & Zero Trust Audit',
    targetFrameworks: ['PIPEDA', 'Law 25 (Quebec)', 'HIPAA', 'Sovereign Enclaves ca-central-1']
  },

  fintech: {
    id: 'fintech',
    iconName: 'Landmark',
    name: {
      en: 'Financial Services & FinTech',
      fr: 'Services Financiers & FinTech'
    },
    badge: {
      en: 'Tailored for Financial Services & Sovereign FinTech',
      fr: 'Adapté pour les FinTechs & Services Financiers'
    },
    headline: {
      en: 'Zero-Trust Architecture & Continuous Audit Readiness for FinTech',
      fr: 'Architecture Zéro-Trust et Audit Continu pour les FinTechs',
      highlightEn: 'FinTech',
      highlightFr: 'les FinTechs'
    },
    subheadline: {
      en: 'Automate SOC 2 Type II evidence collection, OSFI E-21 governance, and PCI-DSS posture across multi-cloud Kubernetes clusters. Shift security left with cryptographically verified pipelines.',
      fr: 'Automatisez la collecte de preuves SOC 2 Type II, la conformité BSIF E-21 et la posture PCI-DSS sur vos clusters Kubernetes avec des pipelines cryptographiquement vérifiés.'
    },
    metricChip: {
      en: 'SOC 2 Type II in 14 Days • OSFI E-21 & PCI-DSS Hardened',
      fr: 'SOC 2 Type II en 14 Jours • Conforme BSIF E-21 & PCI-DSS'
    },
    ctaFocus: 'FinTech SOC 2 & OSFI E-21 Cloud Security Audit',
    targetFrameworks: ['SOC 2 Type II', 'OSFI E-21', 'PCI-DSS 4.0', 'Cosign Signature Verification']
  },

  energy: {
    id: 'energy',
    iconName: 'Zap',
    name: {
      en: 'Energy & Critical Infrastructure',
      fr: 'Énergie & Infrastructures Critiques'
    },
    badge: {
      en: 'Tailored for Bill C-26 Critical Cyber Systems',
      fr: 'Adapté pour les Systèmes Cybernétiques Critiques Loi C-26'
    },
    headline: {
      en: 'Bill C-26 & Sovereign Cyber Defense for Critical Infrastructure',
      fr: 'Défense Souveraine et Loi C-26 pour les Infrastructures Critiques',
      highlightEn: 'Critical Infrastructure',
      highlightFr: 'les Infrastructures Critiques'
    },
    subheadline: {
      en: 'Meet Bill C-26 (CCSPA) and NERC-CIP mandatory standards with policy-as-code guardrails, air-gapped container scans, and automated Canadian Cyber Security Centre incident notification pipelines.',
      fr: 'Respectez les exigences obligatoires de la Loi C-26 (LSPCY) et NERC-CIP avec des garde-fous as-code et des pipelines de notification automatique d’incidents cybernétiques.'
    },
    metricChip: {
      en: 'Bill C-26 (CCSPA) Ready • NERC-CIP Infrastructure Hardened',
      fr: 'Conforme Loi C-26 (LSPCY) • Durcissement NERC-CIP'
    },
    ctaFocus: 'Bill C-26 Compliance & Critical Infrastructure Review',
    targetFrameworks: ['Bill C-26 (CCSPA)', 'NERC-CIP', 'Cyber Security Programs (CSP)', 'CCCS Incident Alerting']
  },

  retail: {
    id: 'retail',
    iconName: 'ShoppingBag',
    name: {
      en: 'Retail & E-Commerce',
      fr: 'Commerce Électronique & Retail'
    },
    badge: {
      en: 'Tailored for High-Volume E-Commerce & Retail',
      fr: 'Adapté pour le Commerce Électronique et le Retail'
    },
    headline: {
      en: 'PCI-DSS Level 1 & Cloud Edge Defense for E-Commerce',
      fr: 'Sécurité Edge Cloud et PCI-DSS Niveau 1 pour l’E-Commerce',
      highlightEn: 'E-Commerce',
      highlightFr: 'l’E-Commerce'
    },
    subheadline: {
      en: 'Fortify high-volume transactional pipelines, merchant APIs, and distributed microservices against bot attacks, credential stuffing, and unauthorized payment telemetry tampering.',
      fr: 'Sécurisez vos passerelles de paiement, vos API marchandes et microservices contre le credential stuffing et les fuites de données transactionnelles.'
    },
    metricChip: {
      en: 'Zero Secret Drift • PCI-DSS 4.0 Automated Guardrails',
      fr: 'Zéro Fuite d’Identifiants • Garde-fous PCI-DSS 4.0'
    },
    ctaFocus: 'E-Commerce Pipeline & Payment Hardening Audit',
    targetFrameworks: ['PCI-DSS Level 1', 'WAF Edge Defense', 'Tokenized API Gateways', 'Secret Rotation']
  },

  public_sector: {
    id: 'public_sector',
    iconName: 'Building',
    name: {
      en: 'Public Sector & Crown Corps',
      fr: 'Secteur Public & Sociétés d’État'
    },
    badge: {
      en: 'Tailored for Canadian Public Sector & Crown Corporations',
      fr: 'Adapté pour le Secteur Public Canadien et Sociétés d’État'
    },
    headline: {
      en: 'Canadian Data Sovereignty & Protected B Cloud for Public Sector',
      fr: 'Souveraineté des Données et Cloud Protégé B pour le Secteur Public',
      highlightEn: 'Public Sector',
      highlightFr: 'le Secteur Public'
    },
    subheadline: {
      en: 'Bespoke DevSecOps and sovereign cloud architecture engineered strictly within Canadian soil (ca-central-1), ensuring full alignment with ITSG-33, Protected B, and bilingual governance.',
      fr: 'Ingénierie DevSecOps souveraine hébergée exclusivement en sol canadien (ca-central-1), conforme aux exigences Protégé B et ITSG-33.'
    },
    metricChip: {
      en: 'ITSG-33 & Protected B • 100% Canadian Data Residency',
      fr: 'ITSG-33 & Protégé B • Résidence 100% Canadienne'
    },
    ctaFocus: 'Public Sector Protected B Architecture Consultation',
    targetFrameworks: ['Protected B', 'ITSG-33', 'Bilingual Governance', 'Data Sovereignty']
  }
};

/**
 * Automatically infers the visitor's industry vertical based on:
 * 1. URL search parameters (?industry=logistics, ?sector=healthcare, etc.)
 * 2. Campaign UTM parameters (utm_campaign, utm_term, utm_content)
 * 3. User's previous manual selection saved in localStorage
 * 4. Document referrer keywords (e.g. from compliance or vertical pages)
 */
export function detectInferredIndustry(): IndustryKey {
  if (typeof window === 'undefined') return 'default';

  // 1. Check URL parameters
  try {
    const urlParams = new URLSearchParams(window.location.search);
    const explicitParam = (
      urlParams.get('industry') ||
      urlParams.get('vertical') ||
      urlParams.get('sector') ||
      urlParams.get('ind') ||
      urlParams.get('target') ||
      urlParams.get('segment')
    )?.toLowerCase().trim();

    if (explicitParam) {
      if (explicitParam.includes('logit') || explicitParam.includes('supply') || explicitParam.includes('freight') || explicitParam.includes('fleet') || explicitParam.includes('transport') || explicitParam.includes('truck')) return 'logistics';
      if (explicitParam.includes('health') || explicitParam.includes('med') || explicitParam.includes('pharma') || explicitParam.includes('clinic') || explicitParam.includes('hospital')) return 'healthcare';
      if (explicitParam.includes('fin') || explicitParam.includes('bank') || explicitParam.includes('wealth') || explicitParam.includes('pay') || explicitParam.includes('insur')) return 'fintech';
      if (explicitParam.includes('energy') || explicitParam.includes('util') || explicitParam.includes('power') || explicitParam.includes('grid') || explicitParam.includes('c26') || explicitParam.includes('critical')) return 'energy';
      if (explicitParam.includes('retail') || explicitParam.includes('ecom') || explicitParam.includes('shop') || explicitParam.includes('store') || explicitParam.includes('pci')) return 'retail';
      if (explicitParam.includes('gov') || explicitParam.includes('public') || explicitParam.includes('crown') || explicitParam.includes('muni') || explicitParam.includes('fed')) return 'public_sector';
    }

    // 2. Check UTM parameters
    const utmParam = (
      urlParams.get('utm_campaign') ||
      urlParams.get('utm_term') ||
      urlParams.get('utm_content') ||
      urlParams.get('utm_source')
    )?.toLowerCase() || '';

    if (utmParam.includes('logistics') || utmParam.includes('fleet') || utmParam.includes('supply')) return 'logistics';
    if (utmParam.includes('health') || utmParam.includes('medtech') || utmParam.includes('pipeda')) return 'healthcare';
    if (utmParam.includes('fintech') || utmParam.includes('finance') || utmParam.includes('soc2')) return 'fintech';
    if (utmParam.includes('energy') || utmParam.includes('c26') || utmParam.includes('infrastructure')) return 'energy';
    if (utmParam.includes('retail') || utmParam.includes('ecommerce')) return 'retail';
    if (utmParam.includes('public') || utmParam.includes('gov')) return 'public_sector';
  } catch (e) {
    // Ignore URL parsing errors
  }

  // 3. Check localStorage
  try {
    const saved = localStorage.getItem('oakivo_inferred_industry') as IndustryKey;
    if (saved && INDUSTRY_HERO_CONTENT[saved]) {
      return saved;
    }
  } catch (e) {
    // Ignore localStorage errors
  }

  // 4. Check referrer path
  try {
    const ref = document.referrer.toLowerCase();
    if (ref.includes('bill-c26')) return 'energy';
    if (ref.includes('pipeda') || ref.includes('law25')) return 'healthcare';
    if (ref.includes('soc2')) return 'fintech';
  } catch (e) {
    // Ignore referrer errors
  }

  return 'default';
}

/**
 * Persists user's manual industry selection to localStorage and updates query string without full reload
 */
export function setStoredIndustry(industry: IndustryKey): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem('oakivo_inferred_industry', industry);
    const url = new URL(window.location.href);
    if (industry === 'default') {
      url.searchParams.delete('industry');
    } else {
      url.searchParams.set('industry', industry);
    }
    window.history.replaceState({}, '', url.toString());
  } catch (e) {
    // Ignore
  }
}
