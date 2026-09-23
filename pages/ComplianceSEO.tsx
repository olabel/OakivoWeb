import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  Shield, 
  Server, 
  CheckCircle2, 
  ArrowRight, 
  Lock, 
  AlertTriangle, 
  FileCheck, 
  Cpu, 
  Scale, 
  Building2, 
  Terminal, 
  HelpCircle,
  ExternalLink,
  MapPin,
  ChevronDown
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import SEO from '../components/SEO';
import NotFound from './NotFound';
import { useLanguage } from '../context/LanguageContext';

interface FrameworkDetails {
  id: string;
  name: string;
  shortName: string;
  regulator: string;
  badge: string;
  jurisdiction: string;
  penaltyText: string;
  executiveSummary: string;
  targetAudience: string;
  urgencyDriver: string;
  coreRequirements: { title: string; desc: string }[];
  technicalBlueprint: { phase: string; title: string; deliverables: string[] }[];
  faqs: { question: string; answer: string }[];
}

const FRAMEWORK_DATA: Record<string, FrameworkDetails> = {
  'bill-c26': {
    id: 'bill-c26',
    name: 'Bill C-26 (Critical Cyber Systems Protection Act - CCSPA)',
    shortName: 'Bill C-26',
    regulator: 'Public Safety Canada / Canadian Centre for Cyber Security (CCCS / CSE)',
    badge: 'Canadian Federal Critical Infrastructure Mandate',
    jurisdiction: 'Canada (Federal Vital Sectors)',
    penaltyText: 'Administrative Monetary Penalties (AMPs) of up to $15,000,000 CAD and criminal liability for executives.',
    executiveSummary: 'Bill C-26 establishes mandatory cyber security baselines for federally regulated critical systems in telecommunications, interprovincial transport, energy (oil, gas, nuclear), and financial systems. Organizations must implement an audited Cyber Security Program (CSP), report cyber incidents to CSE immediately, and comply with binding Cyber Security Directions to remove untrusted third-party vendors.',
    targetAudience: 'Critical infrastructure operators, Canadian telecommunications providers, energy utilities, federally chartered banks, and critical supply chain SaaS vendors.',
    urgencyDriver: 'Impending regulatory enforcement deadlines require organizations to demonstrate audited cyber programs and automated incident telemetry pipelines directly to Canadian federal authorities.',
    coreRequirements: [
      {
        title: 'Mandatory Cyber Security Program (CSP)',
        desc: 'Establish, implement, and maintain a documented, auditable program to identify and manage cyber security risks to critical cyber systems within 90 days of designation.'
      },
      {
        title: 'Immediate Cyber Incident Reporting',
        desc: 'Mandatory reporting of cyber security incidents directly to the Canadian Centre for Cyber Security (CCCS) immediately upon detection to enable national threat coordination.'
      },
      {
        title: 'Supply Chain & Third-Party Vendor Scrubbing',
        desc: 'Binding federal directives requiring the mitigation or physical/logical removal of high-risk third-party hardware, firmware, and software dependencies.'
      },
      {
        title: 'Continuous Verification & Audit Access',
        desc: 'Obligation to provide federal regulators with continuous system logs, architecture diagrams, vulnerability assessments, and verification records.'
      }
    ],
    technicalBlueprint: [
      {
        phase: 'Phase 01',
        title: 'Asset Discovery & Critical System Boundary Mapping',
        deliverables: [
          'eBPF-driven workload telemetry mapping across all VPCs and on-prem enclaves',
          'Identification of critical system boundary perimeters and inter-service dependencies',
          'Software Bill of Materials (SBOM) ingestion to track open-source dependencies'
        ]
      },
      {
        phase: 'Phase 02',
        title: 'Policy-as-Code Implementation & Hardening',
        deliverables: [
          'Terraform/OpenTofu guardrails enforcing CIS Level 2 cloud security baselines',
          'Kyverno & OPA Gatekeeper admission controllers preventing untrusted container images',
          'Cosign cryptographic image signing and provenance validation in CI/CD'
        ]
      },
      {
        phase: 'Phase 03',
        title: 'Automated CCCS Incident Telemetry Pipeline',
        deliverables: [
          'SIEM/SOAR event stream automation pre-formatted for Canadian Centre for Cyber Security protocols',
          'Automated isolation runbooks for compromised worker nodes and container pods',
          'Immutable audit logging pinned to domestic WORM (Write Once, Read Many) cloud vaults'
        ]
      },
      {
        phase: 'Phase 04',
        title: 'Continuous Compliance Audit & Red Team Readiness',
        deliverables: [
          'Continuous Cloud Security Posture Management (CSPM) monitoring drift in real-time',
          'Automated evidence generation for federal regulatory reviews',
          'Adversarial breach simulation testing critical infrastructure resilience'
        ]
      }
    ],
    faqs: [
      {
        question: 'What sectors are directly regulated under Bill C-26?',
        answer: 'Bill C-26 directly regulates four vital federally regulated sectors: Telecommunications, Energy (electricity, oil, natural gas, nuclear), Transportation (interprovincial railways, commercial marine shipping, airports), and Banking/Financial systems. Furthermore, cloud service providers and SaaS vendors serving these entities will be contractually required to satisfy these compliance bars.'
      },
      {
        question: 'What are the penalties for non-compliance under the CCSPA?',
        answer: 'The legislation empowers regulators to issue Administrative Monetary Penalties (AMPs) up to $15,000,000 CAD per violation. Designated individuals and corporate officers may also face summary conviction liabilities for non-compliance with binding Cyber Security Directions.'
      },
      {
        question: 'How does Oakivo accelerate Bill C-26 compliance?',
        answer: 'Oakivo replaces manual spreadsheet assessments with deterministic Policy-as-Code. We codify CCCS guardrails directly into your Terraform, Kubernetes, and CI/CD pipelines, automating evidence gathering and incident reporting so your organization remains perpetually audit-ready.'
      }
    ]
  },
  'pipeda': {
    id: 'pipeda',
    name: 'PIPEDA & Law 25 Canadian Sovereign Cloud Architecture',
    shortName: 'PIPEDA & Law 25',
    regulator: 'Office of the Privacy Commissioner of Canada (OPC) / CAI Québec',
    badge: 'Canadian Data Sovereignty & Privacy Mandate',
    jurisdiction: 'Canada (Federal & Provincial / Quebec Law 25)',
    penaltyText: 'Federal fines up to $100,000 CAD per violation under PIPEDA; up to $25,000,000 CAD or 4% of global turnover under Quebec Law 25.',
    executiveSummary: 'PIPEDA and Quebec\'s stringent Law 25 mandate strict privacy guardrails, lawful basis for processing, and explicit data protection standards for Canadian organizations. In cloud environments, achieving compliance requires strict data residency within Canadian borders (e.g. AWS ca-central-1, ca-west-1, Azure Canada Central), cryptographic sovereignty via Customer Managed Keys (CMK), and automated breach response mechanisms.',
    targetAudience: 'Canadian B2B SaaS, healthcare providers, fintechs, enterprise e-commerce, and Atlantic Canadian businesses managing customer and employee PII.',
    urgencyDriver: 'Heightened cross-border data transfer scrutiny, strict 72-hour mandatory breach notifications, and Law 25 personal liability make data residency architecture non-negotiable.',
    coreRequirements: [
      {
        title: 'Domestic Sovereign Data Residency',
        desc: 'Ensuring personal information, database backups, and cold telemetry archives never traverse international borders without explicit contractual and technical protections.'
      },
      {
        title: 'Cryptographic Sovereignty (CMK / HSM)',
        desc: 'Implementation of Customer Managed Keys where encryption keys reside under Canadian corporate custody, neutralizing US CLOUD Act cross-border disclosure exposure.'
      },
      {
        title: 'Mandatory 72-Hour Breach Reporting',
        desc: 'Automated security telemetry that immediately flags real risk of significant harm (RROSH) and generates notification records for the Privacy Commissioner.'
      },
      {
        title: 'Zero-Trust Granular Data Access',
        desc: 'Role-Based Access Control (RBAC) and Just-In-Time (JIT) privileged access ensuring internal personnel only access personal data on a verified need-to-know basis.'
      }
    ],
    technicalBlueprint: [
      {
        phase: 'Phase 01',
        title: 'PII Discovery & Cloud Residency Pinning',
        deliverables: [
          'Automated data discovery scanning S3, RDS, DynamoDB, and BigQuery for unencrypted PII',
          'Terraform policies restricting cloud resource provisioning strictly to ca-central-1 (Montreal) and ca-west-1 (Calgary)',
          'Multi-region automated failover architecture purely contained within Canadian boundaries'
        ]
      },
      {
        phase: 'Phase 02',
        title: 'Cryptographic Sovereignty & Envelope Encryption',
        deliverables: [
          'AWS KMS / Azure Key Vault integration with Canadian-domiciled Customer Managed Keys',
          'Hardware Security Module (HSM) dedicated key storage for sensitive financial and medical data',
          'Automated annual cryptographic key rotation without application downtime'
        ]
      },
      {
        phase: 'Phase 03',
        title: 'PIPEDA vs. HIPAA Cloud Architecture Harmonization',
        deliverables: [
          'Dual-jurisdiction security controls separating Canadian PII from US ePHI environments',
          'Zero-Trust network microsegmentation between application frontends and database clusters',
          'Tokenization and pseudonymization engines protecting patient and customer identities'
        ]
      },
      {
        phase: 'Phase 04',
        title: 'Automated Privacy Compliance & Audit Vault',
        deliverables: [
          'Continuous audit logging with CloudTrail and SIEM integration retaining logs for statutory periods',
          'Automated user consent tracking and data subject access request (DSAR) deletion workflows',
          'Quarterly privacy risk assessment automation'
        ]
      }
    ],
    faqs: [
      {
        question: 'Can Canadian personal data be stored in US cloud regions under PIPEDA?',
        answer: 'While PIPEDA does not strictly ban cross-border data flows, it holds Canadian organizations accountable for providing a comparable level of protection. Storing data in US regions exposes Canadian enterprises to US CLOUD Act subpoenas and cross-border regulatory liabilities. Deploying in domestic Canadian cloud regions (AWS ca-central-1, Azure Canada) with Customer Managed Keys is the gold standard.'
      },
      {
        question: 'How do PIPEDA and Quebec Law 25 differ?',
        answer: 'Quebec Law 25 introduces European GDPR-style requirements, including mandatory Privacy Impact Assessments (PIAs) before transferring data outside Quebec, statutory fines up to $25M CAD or 4% of worldwide turnover, and mandatory breach notifications. Oakivo\'s architectures are engineered to satisfy the strictest standard across all Canadian jurisdictions.'
      },
      {
        question: 'What is the architectural difference between PIPEDA and HIPAA?',
        answer: 'HIPAA strictly regulates Protected Health Information (PHI) under US federal standards (Business Associate Agreements, specific physical/technical safeguards), while PIPEDA applies to all commercial personal information across Canada. For cross-border healthcare or SaaS firms, Oakivo creates isolated multi-tenant or multi-account AWS/Azure architectures with dedicated encryption keys.'
      }
    ]
  },
  'soc2': {
    id: 'soc2',
    name: 'SOC 2 Type II Continuous Audit Readiness & DevSecOps Automation',
    shortName: 'SOC 2 Type II',
    regulator: 'American Institute of CPAs (AICPA) / Canadian CPA Audit Standards',
    badge: 'Enterprise Procurement & Audit Gatekeeper',
    jurisdiction: 'North America (Canada & US Enterprise Markets)',
    penaltyText: 'Disqualification from enterprise sales cycles, loss of B2B procurement deals, and customer churn.',
    executiveSummary: 'SOC 2 Type II certification is the non-negotiable benchmark for Canadian SaaS and technology companies selling to North American and global enterprise procurement teams. Unlike a Type I report which evaluates controls at a single moment, Type II audits the operational effectiveness of your security controls over a continuous 3 to 12-month window. Oakivo replaces grueling manual screenshot collection with continuous DevSecOps automation.',
    targetAudience: 'Canadian B2B SaaS companies, fintechs, healthcare tech, managed cloud providers, and digital scale-ups seeking rapid enterprise procurement approval.',
    urgencyDriver: 'Enterprise RFP blockers, customer contract demands, and the desire to eliminate the 100+ hours spent manually gathering audit evidence every quarter.',
    coreRequirements: [
      {
        title: 'Continuous Evidence Collection',
        desc: 'Replacing manual spreadsheet audits with automated API hooks into GitHub, AWS, Azure, and Kubernetes to pull real-time cryptographic proof of compliance.'
      },
      {
        title: 'GitOps Policy-as-Code & PR Security Gates',
        desc: 'Enforcing peer reviews, branch protection, static analysis (SAST), and dependency vulnerability scans as blocking gates before code merges.'
      },
      {
        title: 'Zero-Trust Infrastructure & Access Management',
        desc: 'Eliminating static bastion hosts in favor of ephemeral, just-in-time access controls with multi-factor authentication (MFA) and automated deprovisioning.'
      },
      {
        title: 'Continuous Configuration Drift Detection',
        desc: 'Real-time alerting on unauthorized changes to firewall rules, S3 bucket public access, or IAM policy escalation.'
      }
    ],
    technicalBlueprint: [
      {
        phase: 'Phase 01',
        title: 'Gap Analysis & Trust Services Criteria Mapping',
        deliverables: [
          'Comprehensive audit of existing cloud posture against Security, Availability, and Confidentiality criteria',
          'Identification of control gaps in CI/CD, backup automation, and incident response runbooks',
          'Integration with compliance automation platforms (Vanta, Drata, Sprinto)'
        ]
      },
      {
        phase: 'Phase 02',
        title: 'Infrastructure-as-Code Hardening & CIS Benchmarks',
        deliverables: [
          'Terraform / OpenTofu modules implementing CIS Benchmark Level 2 for AWS EKS, RDS, and IAM',
          'Enforcement of TLS 1.3 in-transit and AES-256 at-rest encryption across all storage tiers',
          'Automated daily backup replication and immutable cross-region disaster recovery'
        ]
      },
      {
        phase: 'Phase 03',
        title: 'Shift-Left DevSecOps CI/CD Automation',
        deliverables: [
          'GitHub Actions / GitLab CI pipelines with Trivy, Semgrep, and SonarQube blocking security gates',
          'Cosign cryptographic image signing ensuring only verified containers execute in production',
          'Branch protection rules enforcing separation of duties (no single developer can push directly to production)'
        ]
      },
      {
        phase: 'Phase 04',
        title: 'Audit Execution & Auditor Liaison',
        deliverables: [
          'Full preparation of evidence lockers for Big-4 or specialized CPA audit firms',
          'Technical representation during auditor walkthroughs and observation interviews',
          'Zero-deviation clean SOC 2 Type II report delivery'
        ]
      }
    ],
    faqs: [
      {
        question: 'How long does it take to achieve SOC 2 Type II with Oakivo?',
        answer: 'By deploying pre-engineered Infrastructure-as-Code modules and automated compliance pipelines, Oakivo gets your environment audit-ready in 4 to 6 weeks. Following this readiness phase, the official 3-month or 6-month observation window begins, during which our automated guardrails maintain zero-drift compliance effortlessly.'
      },
      {
        question: 'Can Oakivo integrate with Vanta, Drata, or Sprinto?',
        answer: 'Yes. Oakivo partners with leading compliance platforms. While these platforms detect what is wrong, Oakivo writes the code to fix the underlying infrastructure, configure the IAM policies, and automate the pipeline security controls that turn your compliance dashboard 100% green.'
      },
      {
        question: 'What is the cost of failing a SOC 2 Type II audit?',
        answer: 'A qualified (failed) SOC 2 report or an audit report riddled with exceptions halts enterprise sales pipelines, forces emergency remediation work, damages brand reputation, and requires re-testing at substantial CPA firm costs.'
      }
    ]
  },
  'iso27001': {
    id: 'iso27001',
    name: 'ISO/IEC 27001:2022 Information Security Management System (ISMS)',
    shortName: 'ISO 27001',
    regulator: 'International Organization for Standardization (ISO) / Standards Council of Canada (SCC)',
    badge: 'Global Enterprise Security Standard',
    jurisdiction: 'International & Canadian Global Markets',
    penaltyText: 'Disqualification from international procurement tenders, loss of accreditation, and contract termination.',
    executiveSummary: 'ISO/IEC 27001:2022 is the universally acknowledged global benchmark for information security governance. The 2022 revision introduces 11 new Annex A security controls specifically targeting cloud services, threat intelligence, data masking, and configuration management. Oakivo translates ISO 27001 controls into automated cloud guardrails and continuous audit telemetry.',
    targetAudience: 'Global Canadian SaaS companies, international defense suppliers, cross-border fintechs, and enterprises serving multinational enterprise clients.',
    urgencyDriver: 'Mandatory supplier qualification requirements from European and international enterprise buyers requiring accredited ISO 27001 certification.',
    coreRequirements: [
      {
        title: 'Annex A 5.23 - Cloud Services Security',
        desc: 'Establishing deterministic security policies for acquiring, utilizing, managing, and exiting commercial cloud service provider environments.'
      },
      {
        title: 'Annex A 8.9 - Configuration Management',
        desc: 'Continuous automated baselining of cloud infrastructure (Terraform / OpenTofu) to prevent unauthorized drift and unreviewed changes.'
      },
      {
        title: 'Annex A 8.28 - Secure Coding & CI/CD Governance',
        desc: 'Integrating static and dynamic security analysis (SAST/DAST) and Software Bill of Materials (SBOM) generation into deployment pipelines.'
      },
      {
        title: 'Annex A 8.16 - Monitoring & Threat Intelligence',
        desc: 'Continuous network, system, and cloud account behavioral logging with automated alerting on anomalous activity.'
      }
    ],
    technicalBlueprint: [
      {
        phase: 'Phase 01',
        title: 'ISMS Scope & Annex A Gap Analysis',
        deliverables: [
          'Identification of all cloud assets, repositories, and third-party data processing flows',
          'Statement of Applicability (SoA) mapping against ISO 27001:2022 controls',
          'Codified risk assessment methodology aligned with ISO 27005 guidelines'
        ]
      },
      {
        phase: 'Phase 02',
        title: 'Automated Cloud Guardrails & IaC Hardening',
        deliverables: [
          'Terraform policies enforcing zero-trust networking, encryption at-rest (AES-256), and in-transit (TLS 1.3)',
          'Automated cloud configuration scanning verifying compliance across AWS, Azure, and GCP',
          'Role-based access control (RBAC) with just-in-time privileged access deprovisioning'
        ]
      },
      {
        phase: 'Phase 03',
        title: 'DevSecOps & Supply Chain Security Gates',
        deliverables: [
          'CI/CD pipeline scanning blocking vulnerable open-source dependencies and container images',
          'Cryptographic artifact signing ensuring verified production deployment provenance',
          'Automated secret rotation eliminating hardcoded credentials'
        ]
      },
      {
        phase: 'Phase 04',
        title: 'Stage 1 & Stage 2 Certification Audit Support',
        deliverables: [
          'Automated generation of audit-ready compliance evidence bundles',
          'Technical advisory during registrar audit walkthroughs',
          'Successful accreditation with zero major non-conformities'
        ]
      }
    ],
    faqs: [
      {
        question: 'What is the difference between ISO 27001 and SOC 2?',
        answer: 'ISO 27001 is a globally recognized certification focusing on an overarching Information Security Management System (ISMS) framework, widely demanded in Europe and Asia. SOC 2 is an attestation report focusing on Trust Services Criteria predominantly demanded by North American enterprise buyers. Oakivo builds unified control frameworks that satisfy both standards simultaneously.'
      },
      {
        question: 'How does ISO 27001:2022 impact cloud deployments?',
        answer: 'The 2022 update explicitly requires organizations to manage cloud configurations, monitor threat intelligence, and enforce secure coding in CI/CD. Oakivo automates these requirements via Policy-as-Code so engineers never spend manual hours tracking controls.'
      },
      {
        question: 'How long does ISO 27001 certification take with Oakivo?',
        answer: 'By leveraging pre-built Infrastructure-as-Code modules and automated policy templates, Oakivo enables organizations to achieve full audit readiness in 6 to 8 weeks, significantly cutting traditional consulting timelines in half.'
      }
    ]
  },
  'hipaa': {
    id: 'hipaa',
    name: 'HIPAA Security & Breach Notification Rule Cloud Compliance',
    shortName: 'HIPAA',
    regulator: 'U.S. Department of Health and Human Services (HHS) / Office for Civil Rights (OCR)',
    badge: 'Healthcare & ePHI Protection Standard',
    jurisdiction: 'United States & Canadian HealthTech Exporting to US',
    penaltyText: 'Civil Monetary Penalties up to $2,000,000 USD per violation category, mandatory corrective action plans, and criminal liability.',
    executiveSummary: 'For Canadian digital health, MedTech, and telehealth providers exporting services or cloud software to United States healthcare organizations, HIPAA compliance is a legal prerequisite. Cloud infrastructures hosting electronic Protected Health Information (ePHI) require rigorous physical and technical safeguards, signed Business Associate Agreements (BAAs), dedicated encryption key management, and zero-trust microsegmentation.',
    targetAudience: 'HealthTech startups, medical device software companies, electronic health record (EHR) integrations, telehealth platforms, and clinical data processors.',
    urgencyDriver: 'Stringent enterprise hospital procurement bars, mandatory 60-day HHS breach notifications, and cross-border data transfer requirements.',
    coreRequirements: [
      {
        title: 'ePHI Cryptographic Isolation',
        desc: 'End-to-end encryption for ePHI at rest (AES-256) and in transit (TLS 1.3) with Customer Managed Keys in dedicated HSMs.'
      },
      {
        title: 'Business Associate Agreement (BAA) Governance',
        desc: 'Executing and technically enforcing BAAs with AWS, Azure, GCP, and all third-party downstream sub-processors.'
      },
      {
        title: 'Immutable Audit Telemetry (§ 164.312(b))',
        desc: 'Recording and automatically archiving all ePHI read, write, query, and administrative access events in tamper-proof cloud storage.'
      },
      {
        title: 'Automatic Session Termination & Zero-Trust MFA',
        desc: 'Enforcing strict idle session timeouts, phishing-resistant MFA, and role-based access restricted strictly to verified clinical roles.'
      }
    ],
    technicalBlueprint: [
      {
        phase: 'Phase 01',
        title: 'ePHI Data Flow Mapping & BAA Verification',
        deliverables: [
          'Comprehensive data classification identifying all ePHI ingestion, storage, and egress points',
          'Execution and validation of cloud provider BAAs (AWS, Azure, Google Cloud)',
          'Network boundary isolation separating marketing/general assets from ePHI enclaves'
        ]
      },
      {
        phase: 'Phase 02',
        title: 'Technical Safeguards & Sovereign Encryption',
        deliverables: [
          'KMS customer managed encryption keys configured with automated annual key rotation',
          'Database encryption with field-level tokenization for patient identifiers',
          'Zero-trust network access (ZTNA) eliminating public exposure of healthcare databases'
        ]
      },
      {
        phase: 'Phase 03',
        title: 'Automated HIPAA Audit Logging & SIEM',
        deliverables: [
          'CloudTrail, VPC Flow Logs, and application audit streams forwarded to immutable WORM storage',
          'Real-time anomaly detection alerting on bulk patient record export attempts',
          'Automated quarterly disaster recovery and failover verification'
        ]
      },
      {
        phase: 'Phase 04',
        title: 'Security Assessment & Enterprise Vendor Review',
        deliverables: [
          'Third-party HIPAA Security Rule compliance assessment report',
          'Standardized Vendor Security Assessment Questionnaire (VSAQ) repository for hospital procurement',
          'Automated continuous compliance monitoring'
        ]
      }
    ],
    faqs: [
      {
        question: 'Can Canadian HealthTech companies store US patient data on Canadian servers?',
        answer: 'HIPAA does not explicitly forbid storing ePHI outside the US, provided all Security Rule controls and a signed BAA are maintained. However, US enterprise hospital systems often require domestic US cloud hosting (e.g. AWS us-east-1). Oakivo designs dual-region architectures keeping Canadian data under PIPEDA in Canada and US data under HIPAA in the United States.'
      },
      {
        question: 'What is required for a cloud database to be HIPAA compliant?',
        answer: 'Databases must have encryption at rest (AES-256), encrypted backups, TLS 1.3 in-transit connections, detailed query audit logs identifying user access, automatic backup replication, and zero public IP exposure.'
      },
      {
        question: 'How do PIPEDA and HIPAA differ for healthcare software?',
        answer: 'PIPEDA applies broadly to all commercial personal data across Canada, while HIPAA strictly regulates Protected Health Information (PHI) with prescriptive technical safeguard rules and formal Business Associate Agreements. Oakivo architectures harmonize both standards.'
      }
    ]
  },
  'pci-dss': {
    id: 'pci-dss',
    name: 'PCI-DSS v4.0 Payment Card Industry Cloud Security Standard',
    shortName: 'PCI-DSS',
    regulator: 'Payment Card Industry Security Standards Council (PCI SSC)',
    badge: 'Cardholder Data & Financial Security Standard',
    jurisdiction: 'Global & North American Financial Ecosystems',
    penaltyText: 'Monthly fines up to $100,000 USD from card brands (Visa, Mastercard), card replacement liabilities, and revocation of merchant accounts.',
    executiveSummary: 'PCI-DSS v4.0 represents the most significant update to payment security in over a decade, mandating continuous security verification, automated script management on payment pages, and zero-trust microsegmentation. Organizations handling credit card numbers or processing payment tokens must minimize their Cardholder Data Environment (CDE) scope to prevent devastating breach liabilities.',
    targetAudience: 'Fintech platforms, payment service providers, e-commerce retailers, billing platforms, and software vendors integrating card payments.',
    urgencyDriver: 'Mandatory PCI-DSS v4.0 compliance deadlines requiring authenticated vulnerability scanning, MFA for all console access, and automated script tamper detection.',
    coreRequirements: [
      {
        title: 'Requirement 1 & 2 - CDE Scope Isolation',
        desc: 'Strict firewall rules, VPC peering controls, and Kubernetes network policies preventing communication between general workloads and cardholder environments.'
      },
      {
        title: 'Requirement 3 & 4 - Primary Account Number (PAN) Cryptography',
        desc: 'Strong cryptography protecting cardholder data during transmission and at rest with keyed cryptographic hashes and tokenization.'
      },
      {
        title: 'Requirement 6 - Secure Systems & CI/CD Pipeline Scanning',
        desc: 'Automated vulnerability scanning, web application firewalls (WAF), and automated patching of all critical components within 30 days.'
      },
      {
        title: 'Requirement 11 - Continuous Vulnerability Testing & Tamper Detection',
        desc: 'Quarterly external vulnerability scans by Approved Scanning Vendors (ASV) and automated tamper detection for client-side checkout scripts.'
      }
    ],
    technicalBlueprint: [
      {
        phase: 'Phase 01',
        title: 'CDE Scope Reduction & Network Microsegmentation',
        deliverables: [
          'Implementation of payment tokenization via iframe/hosted fields reducing PCI scope to SAQ A or SAQ A-EP',
          'VPC network isolation establishing strict ingress/egress boundaries around payment infrastructure',
          'Automated data discovery verifying zero unmasked PAN storage in databases or logs'
        ]
      },
      {
        phase: 'Phase 02',
        title: 'Zero-Trust Access & Key Management',
        deliverables: [
          'Mandatory phishing-resistant MFA for all personnel with administrative access to the CDE',
          'Hardware Security Module (HSM) key storage with split-knowledge dual-control management',
          'Automated revocation of inactive accounts within 90 days'
        ]
      },
      {
        phase: 'Phase 03',
        title: 'DevSecOps Vulnerability Gating & WAF Deployment',
        deliverables: [
          'Cloud WAF deployed in blocking mode with automated OWASP Top 10 rule updates',
          'Container image vulnerability scanning integrated into CI/CD pipelines',
          'Subresource Integrity (SRI) and CSP headers preventing Magecart/e-skimming attacks'
        ]
      },
      {
        phase: 'Phase 04',
        title: 'Audit Attestation & ASV Scan Remediation',
        deliverables: [
          'Execution and passing of ASV quarterly vulnerability scans with zero high/critical findings',
          'Preparation of Attestation of Compliance (AoC) and Report on Compliance (RoC)',
          'Automated continuous compliance evidence archiving'
        ]
      }
    ],
    faqs: [
      {
        question: 'What is the biggest change in PCI-DSS v4.0 for cloud applications?',
        answer: 'PCI-DSS v4.0 shifts focus from point-in-time compliance to continuous security. It mandates MFA for all access into the CDE, requires automated management and tamper detection for all scripts running on payment pages, and requires documented targeted risk analyses.'
      },
      {
        question: 'How can Oakivo reduce our organization’s PCI scope?',
        answer: 'By architecting serverless tokenization pipelines and utilizing modern hosted payment fields, Oakivo reduces your CDE scope from an exhaustive 300+ control audit (SAQ D) to a minimal 22-control questionnaire (SAQ A).'
      },
      {
        question: 'Can cardholder data be stored in AWS or Azure?',
        answer: 'Yes, both AWS and Azure are Level 1 PCI-DSS certified service providers. However, under the shared responsibility model, configuring database encryption, access controls, network segmentation, and audit logging remains 100% the customer\'s responsibility.'
      }
    ]
  },
  'gdpr': {
    id: 'gdpr',
    name: 'EU GDPR Article 32 & International Sovereign Cloud Compliance',
    shortName: 'GDPR',
    regulator: 'European Data Protection Board (EDPB) & EU National Data Protection Authorities',
    badge: 'European Union Sovereign Privacy Mandate',
    jurisdiction: 'European Union, United Kingdom & Global Operations',
    penaltyText: 'Administrative fines up to €20,000,000 or 4% of total global annual turnover, whichever is greater.',
    executiveSummary: 'The European Union General Data Protection Regulation (GDPR) sets the world benchmark for fundamental data rights. Article 32 mandates state-of-the-art technical security controls, pseudonymization, and rapid breach recovery. For Canadian businesses processing data of European residents, cloud architectures must provide cryptographic sovereignty, enforce Standard Contractual Clauses (SCCs), and support programmatic user erasure (Right to be Forgotten).',
    targetAudience: 'Canadian enterprises expanding into the EU/UK, global SaaS providers, international e-commerce platforms, and cross-border digital services.',
    urgencyDriver: 'Aggressive enforcement actions by European DPAs against unencrypted cross-border data transfers and non-compliant analytics telemetry.',
    coreRequirements: [
      {
        title: 'Article 32 - Security of Processing',
        desc: 'Pseudonymization, encryption at rest and in transit, continuous confidentiality, integrity, availability, and resilience of processing systems.'
      },
      {
        title: 'Article 17 - Right to Erasure (RTBF)',
        desc: 'Automated data deletion pipelines capable of completely scrubbing user records across databases, caches, and cold storage backups upon request.'
      },
      {
        title: 'Chapter V - International Data Transfers',
        desc: 'Cryptographic barriers and Transfer Impact Assessments (TIAs) ensuring data transferred outside the EU/EEA remains shielded from foreign state surveillance.'
      },
      {
        title: 'Article 33 - 72-Hour Breach Notification',
        desc: 'Automated detection telemetry alerting Data Protection Officers (DPOs) and regulators within 72 hours of an identified data security incident.'
      }
    ],
    technicalBlueprint: [
      {
        phase: 'Phase 01',
        title: 'Data Discovery & Cross-Border Transfer Mapping',
        deliverables: [
          'Inventory of all EU resident personal data stored across databases, logs, and third-party SaaS',
          'Implementation of Standard Contractual Clauses (SCCs) and supplementary technical measures',
          'Data residency pinning restricting EU customer records to European cloud regions (e.g. AWS eu-central-1, eu-west-1)'
        ]
      },
      {
        phase: 'Phase 02',
        title: 'Pseudonymization & Cryptographic Sovereignty',
        deliverables: [
          'Automated data masking engines scrubbing PII from developer environments and analytics lakes',
          'Customer Managed Keys (CMK) ensuring cloud hosting providers cannot access plaintext personal data',
          'Zero-trust database access controls with granular audit trails'
        ]
      },
      {
        phase: 'Phase 03',
        title: 'Automated DSAR & Erasure Workflows',
        deliverables: [
          'API-driven user data export endpoints satisfying Article 15 Data Subject Access Requests',
          'Automated cascade deletion runbooks scrubbing user records from RDS, DynamoDB, Elasticsearch, and S3 archives',
          'Consent management telemetry ensuring tracking pixels only activate after explicit opt-in'
        ]
      },
      {
        phase: 'Phase 04',
        title: 'Continuous Compliance & DPIA Automation',
        deliverables: [
          'Continuous Cloud Security Posture Management (CSPM) alerting on EU data exfiltration',
          'Automated Data Protection Impact Assessment (DPIA) documentation generation',
          'Annual simulated breach notification dry-run testing'
        ]
      }
    ],
    faqs: [
      {
        question: 'Does Canada have an adequacy decision under GDPR?',
        answer: 'Yes, the European Commission has recognized Canada\'s PIPEDA as providing adequate protection for commercial organizations. However, Canadian companies must still implement Article 32 technical safeguards, honor GDPR data subject rights (erasure, portability), and ensure cloud sub-processors satisfy European transfer requirements.'
      },
      {
        question: 'How do you automate the Right to be Forgotten in modern cloud databases?',
        answer: 'Oakivo implements event-driven microservices that receive user deletion requests, query primary relational and NoSQL databases, issue cryptographic tombstone records, and purge identifying telemetry from logging pipelines within statutory timelines.'
      },
      {
        question: 'What happens if EU user data is accessed by US cloud administrators?',
        answer: 'Following the Schrems II ruling, international transfers to US providers require supplementary technical measures. Oakivo implements client-side encryption and Customer Managed Keys held within domestic European or Canadian boundaries to neutralize third-party cloud subpoena risks.'
      }
    ]
  },
  'fedramp': {
    id: 'fedramp',
    name: 'FedRAMP & Canadian Protected B Cloud Security Architecture',
    shortName: 'FedRAMP / Protected B',
    regulator: 'U.S. General Services Administration (GSA) / Treasury Board of Canada Secretariat (TBS)',
    badge: 'Federal Government Cloud Authorization',
    jurisdiction: 'United States Federal Agencies & Canadian Public Sector',
    penaltyText: 'Immediate revocation of government cloud authorizations, debarment from federal contracts, and contractual default.',
    executiveSummary: 'Selling mission-critical software to Canadian and United States government departments requires meeting the highest security assurance thresholds in the world: Canadian Protected B / MITS and US FedRAMP Moderate/High. Oakivo engineers sovereign, FIPS 140-3 validated cloud architectures featuring zero-trust perimeter boundaries, continuous vulnerability monitoring, and automated system security plan (SSP) evidence generation.',
    targetAudience: 'GovTech startups, enterprise SaaS expanding into public sector contracts, defense tech innovators, and aerospace software providers.',
    urgencyDriver: 'Strict federal procurement gatekeeping requiring certified cloud security baselines before entering public sector production agreements.',
    coreRequirements: [
      {
        title: 'NIST SP 800-53 Rev. 5 Security Controls',
        desc: 'Over 300 rigorous technical controls covering access control, incident response, configuration management, and contingency planning.'
      },
      {
        title: 'FIPS 140-3 Cryptographic Validation',
        desc: 'Mandatory cryptographic modules validated under NIST FIPS 140-3 standards for all encryption at rest, in transit, and key storage.'
      },
      {
        title: 'Continuous Monitoring (ConMon)',
        desc: 'Monthly vulnerability scanning, automated container image vetting, and real-time SIEM reporting submitted directly to authorizing officials.'
      },
      {
        title: 'Sovereign Personnel & Boundary Isolation',
        desc: 'Ensuring production administrative access is restricted strictly to vetted citizens in dedicated isolated government cloud enclaves (GovCloud).'
      }
    ],
    technicalBlueprint: [
      {
        phase: 'Phase 01',
        title: 'Government Enclave Architecture & Baseline Mapping',
        deliverables: [
          'Provisioning of dedicated isolated environments (AWS GovCloud / Azure Government / AWS Canada Central Protected B)',
          'NIST SP 800-53 control traceability matrix mapping software architecture to federal baselines',
          'Boundary perimeter lockdown with zero shared multi-tenant resources'
        ]
      },
      {
        phase: 'Phase 02',
        title: 'FIPS 140-3 Cryptographic Hardening',
        deliverables: [
          'Enforcement of FIPS-validated cryptographic ciphers across all load balancers, TLS terminations, and VPNs',
          'Dedicated CloudHSM key storage with dual-custody authorization',
          'Hardened golden machine images adhering strictly to CIS Level 2 Benchmarks'
        ]
      },
      {
        phase: 'Phase 03',
        title: 'Automated Continuous Monitoring (ConMon) Pipelines',
        deliverables: [
          'Automated daily static and dynamic vulnerability scans with 30-day remediation SLAs for high/critical findings',
          'Centralized SIEM ingestion streaming immutable audit logs to government inspection endpoints',
          'Plan of Action and Milestones (POA&M) automated generation'
        ]
      },
      {
        phase: 'Phase 04',
        title: '3PAO Assessment & Authorization Support',
        deliverables: [
          'Complete System Security Plan (SSP) technical documentation bundle',
          'Technical representation during Third Party Assessment Organization (3PAO) audits',
          'Authority to Operate (ATO) achievement support'
        ]
      }
    ],
    faqs: [
      {
        question: 'What is the relationship between FedRAMP and Canadian Protected B?',
        answer: 'FedRAMP is the US federal standard based on NIST SP 800-53, while Canadian Protected B represents the Treasury Board of Canada baseline for sensitive government data. Both standards share extensive control overlap. Oakivo designs unified cloud architectures that satisfy Canadian Protected B while aligning seamlessly with FedRAMP Moderate baselines.'
      },
      {
        question: 'Is AWS GovCloud required for FedRAMP compliance?',
        answer: 'FedRAMP High authorizations generally require AWS GovCloud or Azure Government. However, many SaaS applications can achieve FedRAMP Moderate in commercial cloud regions (such as AWS US East/West) provided strict boundary controls and FIPS 140-3 cryptography are enforced.'
      },
      {
        question: 'How long does it take to achieve federal cloud authorization?',
        answer: 'Traditional federal authorization cycles often take 12 to 18 months. By deploying pre-engineered Infrastructure-as-Code modules and automated ConMon monitoring, Oakivo reduces the technical implementation phase to under 90 days.'
      }
    ]
  },
  'cjis': {
    id: 'cjis',
    name: 'CJIS & Law Enforcement Cloud Security Architecture',
    shortName: 'CJIS',
    regulator: 'Federal Bureau of Investigation (FBI) / Public Safety Canada & Provincial Police Services',
    badge: 'Law Enforcement & Public Safety Data Standard',
    jurisdiction: 'North American Law Enforcement, Public Safety & Justice Sectors',
    penaltyText: 'Immediate termination of CJIS database connectivity, criminal sanctions, and disqualification from police agency procurement.',
    executiveSummary: 'Criminal Justice Information Services (CJIS) compliance governs cloud systems storing, transmitting, or processing Criminal Justice Information (CJI), including biometric data, criminal histories, and 911 dispatch records. Public safety software vendors and emergency response platforms must deploy hardened sovereign enclaves with air-gapped network segmentation, 512-bit encryption, and rigorous background-check verification.',
    targetAudience: 'Public safety software, 911 dispatch platforms, automated license plate reader (ALPR) systems, digital evidence management, and corrections technology.',
    urgencyDriver: 'Mandatory state and provincial CJIS security audits required prior to connecting to law enforcement information networks.',
    coreRequirements: [
      {
        title: 'CJI Data Cryptographic Isolation',
        desc: 'Advanced encryption standard (AES-256) for CJI at rest and in transit across all network tiers with dedicated customer managed keys.'
      },
      {
        title: 'CJIS Security Addendum Governance',
        desc: 'Execution of formal CJIS Security Addendums with all cloud providers and fingerprint-based background vetting of administrative engineers.'
      },
      {
        title: 'Air-Gapped Network Segmentation',
        desc: 'Strict logical or physical separation ensuring law enforcement databases cannot be accessed by commercial non-justice workloads.'
      },
      {
        title: 'Immutable Event Auditing & Non-Repudiation',
        desc: 'Comprehensive logging capturing user login attempts, query executions, record exports, and administrative modifications.'
      }
    ],
    technicalBlueprint: [
      {
        phase: 'Phase 01',
        title: 'CJIS Perimeter Definition & Scope Isolation',
        deliverables: [
          'Architectural isolation of CJI storage vaults into dedicated, single-tenant cloud subnets',
          'Execution of CJIS Security Addendums with AWS / Azure / Google Cloud',
          'Verification of employee security clearance and access controls'
        ]
      },
      {
        phase: 'Phase 02',
        title: 'Zero-Trust Cryptographic Hardening',
        deliverables: [
          'Implementation of FIPS 140-3 validated encryption engines for all databases and telemetry',
          'Phishing-resistant biometric or hardware security key (FIDO2) multi-factor authentication',
          'Immediate automated session termination after 15 minutes of inactivity'
        ]
      },
      {
        phase: 'Phase 03',
        title: 'Tamper-Proof Audit Logging & SIEM',
        deliverables: [
          'Forwarding of all access, read, update, and delete events to write-once-read-many (WORM) storage',
          'Sub-second alerting on unauthorized access attempts to criminal history records',
          'Automated daily backup replication with cross-region disaster recovery'
        ]
      },
      {
        phase: 'Phase 04',
        title: 'Law Enforcement Audit Readiness & Verification',
        deliverables: [
          'CJIS Compliance Technical Documentation Binder for state and provincial police auditors',
          'Independent third-party penetration testing and vulnerability assessment report',
          'Continuous automated compliance verification'
        ]
      }
    ],
    faqs: [
      {
        question: 'Can Criminal Justice Information (CJI) be stored in commercial public cloud regions?',
        answer: 'Major cloud providers (AWS, Azure, Google Cloud) have signed CJIS agreements covering both commercial and specialized government cloud regions. Provided strict encryption, customer-managed keys, and network isolation are enforced, CJI can be securely hosted with full regulatory compliance.'
      },
      {
        question: 'Who is authorized to access CJIS-compliant cloud environments?',
        answer: 'Only personnel who have passed FBI fingerprint-based background checks and completed CJIS Security Awareness training may possess logical or physical access to environments hosting unencrypted CJI.'
      },
      {
        question: 'How does Oakivo assist public safety software vendors with CJIS audits?',
        answer: 'Oakivo designs and deploys the entire CJIS-compliant cloud infrastructure stack via Terraform, provides auditor-ready System Security Plans, and configures automated continuous evidence collection that satisfies law enforcement review boards.'
      }
    ]
  }
};

const PROVIDER_NAMES: Record<string, string> = {
  aws: 'Amazon Web Services (AWS)',
  azure: 'Microsoft Azure',
  gcp: 'Google Cloud Platform (GCP)',
  kubernetes: 'Kubernetes (EKS / AKS / OpenShift)'
};

const ComplianceSEO: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { t, language } = useLanguage();

  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  // Normalize slug
  let frameworkKey: string | null = null;
  let providerKey: string | null = null;

  if (slug) {
    const lowerSlug = slug.toLowerCase();
    
    // Check if format is [framework]-on-[provider]
    const onMatch = lowerSlug.match(/^([a-z0-9-]+)-on-([a-z0-9-]+)$/);
    if (onMatch) {
      const parsedFw = onMatch[1];
      const parsedPr = onMatch[2];
      if (FRAMEWORK_DATA[parsedFw]) {
        frameworkKey = parsedFw;
      } else if (parsedFw.includes('c26') || parsedFw.includes('ccspa')) {
        frameworkKey = 'bill-c26';
      } else if (parsedFw.includes('pipeda') || parsedFw.includes('law25')) {
        frameworkKey = 'pipeda';
      } else if (parsedFw.includes('soc2')) {
        frameworkKey = 'soc2';
      } else if (parsedFw.includes('iso')) {
        frameworkKey = 'iso27001';
      } else if (parsedFw.includes('hipaa')) {
        frameworkKey = 'hipaa';
      } else if (parsedFw.includes('pci')) {
        frameworkKey = 'pci-dss';
      } else if (parsedFw.includes('gdpr')) {
        frameworkKey = 'gdpr';
      } else if (parsedFw.includes('fedramp')) {
        frameworkKey = 'fedramp';
      } else if (parsedFw.includes('cjis')) {
        frameworkKey = 'cjis';
      }
      if (PROVIDER_NAMES[parsedPr]) {
        providerKey = parsedPr;
      }
    } else {
      // Single slug
      if (FRAMEWORK_DATA[lowerSlug]) {
        frameworkKey = lowerSlug;
      } else if (lowerSlug.includes('c26') || lowerSlug.includes('ccspa') || lowerSlug.includes('critical-cyber')) {
        frameworkKey = 'bill-c26';
      } else if (lowerSlug.includes('pipeda') || lowerSlug.includes('law-25') || lowerSlug.includes('privacy')) {
        frameworkKey = 'pipeda';
      } else if (lowerSlug.includes('soc2') || lowerSlug.includes('soc-2') || lowerSlug.includes('audit-readiness')) {
        frameworkKey = 'soc2';
      } else if (lowerSlug.includes('iso')) {
        frameworkKey = 'iso27001';
      } else if (lowerSlug.includes('hipaa')) {
        frameworkKey = 'hipaa';
      } else if (lowerSlug.includes('pci')) {
        frameworkKey = 'pci-dss';
      } else if (lowerSlug.includes('gdpr')) {
        frameworkKey = 'gdpr';
      } else if (lowerSlug.includes('fedramp')) {
        frameworkKey = 'fedramp';
      } else if (lowerSlug.includes('cjis')) {
        frameworkKey = 'cjis';
      }
    }
  }

  const framework = frameworkKey ? FRAMEWORK_DATA[frameworkKey] : null;

  if (!framework) {
    return <NotFound />;
  }
  const providerName = providerKey ? PROVIDER_NAMES[providerKey] : null;

  const pageTitle = providerName 
    ? `${framework.name} on ${providerName} | Canadian Audit Readiness | Oakivo`
    : `${framework.name} | Canadian Regulatory Compliance Architecture | Oakivo`;

  const pageDescription = providerName
    ? `Automate ${framework.shortName} compliance natively on ${providerName}. Zero-trust DevSecOps, Canadian data residency, and continuous Policy-as-Code for enterprise audit readiness.`
    : `${framework.executiveSummary.substring(0, 155)}...`;

  const keywords = [
    `${framework.shortName} compliance Canada`,
    `${framework.shortName} audit readiness`,
    'SOC 2 Type II audit readiness checklist Canada',
    'Bill C-26 Critical Cyber Systems compliance roadmap',
    'PIPEDA vs. HIPAA cloud storage architecture',
    'Terraform AWS EKS hardening consultant Calgary / Toronto / Halifax',
    'DevSecOps Moncton',
    'Cloud Security New Brunswick',
    providerName ? `${framework.shortName} on ${providerName}` : 'Canadian cloud sovereignty'
  ].join(', ');

  // Structured Data (JSON-LD) for SEO and FAQ Rich Snippets
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": framework.faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://www.oakivo.com/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Compliance Matrix",
        "item": "https://www.oakivo.com/compliance-matrix"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": framework.name,
        "item": `https://www.oakivo.com/compliance/${slug || framework.id}`
      }
    ]
  };

  return (
    <>
      <SEO 
        title={pageTitle}
        description={pageDescription}
        keywords={keywords}
        canonical={`/compliance/${slug || framework.id}`}
      />
      <script type="application/ld+json">
        {JSON.stringify(faqSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(breadcrumbSchema)}
      </script>

      <div className="bg-[#070A0F] text-slate-100 min-h-screen">
        {/* Navigation Breadcrumb */}
        <div className="border-b border-slate-800/80 bg-slate-950/60 backdrop-blur-md pt-28 pb-4 px-6 sticky top-0 z-30">
          <div className="container mx-auto max-w-6xl flex items-center justify-between text-xs font-mono text-slate-400">
            <div className="flex items-center gap-2 overflow-x-auto whitespace-nowrap py-1">
              <Link to="/" className="hover:text-cyan-400 transition-colors">Home</Link>
              <span>/</span>
              <Link to="/compliance-matrix" className="hover:text-cyan-400 transition-colors">Compliance Matrix</Link>
              <span>/</span>
              <span className="text-cyan-400 font-semibold">{framework.shortName} {providerName ? `• ${providerName}` : ''}</span>
            </div>

            {/* Framework Switcher Chips */}
            <div className="hidden md:flex items-center gap-2">
              <span className="text-slate-500">Frameworks:</span>
              <Link 
                to="/compliance/bill-c26" 
                className={`px-2.5 py-1 rounded-md transition-colors ${framework.id === 'bill-c26' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30' : 'hover:bg-slate-800 text-slate-400'}`}
              >
                Bill C-26
              </Link>
              <Link 
                to="/compliance/pipeda" 
                className={`px-2.5 py-1 rounded-md transition-colors ${framework.id === 'pipeda' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30' : 'hover:bg-slate-800 text-slate-400'}`}
              >
                PIPEDA / Law 25
              </Link>
              <Link 
                to="/compliance/soc2" 
                className={`px-2.5 py-1 rounded-md transition-colors ${framework.id === 'soc2' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30' : 'hover:bg-slate-800 text-slate-400'}`}
              >
                SOC 2 Type II
              </Link>
            </div>
          </div>
        </div>

        {/* Hero Section */}
        <section className="pt-16 pb-20 px-6 relative overflow-hidden">
          {/* Subtle Ambient Radial Glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-[500px] bg-cyan-500/10 blur-[130px] rounded-full pointer-events-none"></div>

          <div className="container mx-auto max-w-5xl relative z-10">
            <div className="inline-flex items-center gap-2 text-xs font-mono font-bold tracking-widest text-cyan-400 uppercase bg-cyan-500/10 px-4 py-2 rounded-full border border-cyan-500/20 mb-6">
              <Shield size={14} />
              {framework.badge}
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold tracking-tight text-white mb-6 leading-[1.15]">
              {framework.name}
              {providerName && (
                <span className="block text-2xl sm:text-3xl md:text-4xl text-cyan-400 mt-2 font-mono font-medium">
                  Engineered Natively for {providerName}
                </span>
              )}
            </h1>

            <p className="text-lg md:text-xl text-slate-300 font-light leading-relaxed mb-8 max-w-3xl">
              {framework.executiveSummary}
            </p>

            {/* Critical Regulatory Callout Banner */}
            <div className="p-6 rounded-2xl bg-slate-900/90 border border-amber-500/30 mb-10 flex items-start gap-4 shadow-xl">
              <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 mt-0.5">
                <AlertTriangle size={22} />
              </div>
              <div>
                <div className="font-mono text-xs font-bold text-amber-400 uppercase tracking-wider mb-1">
                  Enforcement & Non-Compliance Liability
                </div>
                <p className="text-sm text-slate-300 leading-relaxed font-light">
                  {framework.penaltyText}
                </p>
              </div>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
              <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800">
                <div className="text-xs font-mono text-slate-400 mb-1">Regulator</div>
                <div className="text-sm font-semibold text-white truncate" title={framework.regulator}>
                  {framework.regulator.split('/')[0]}
                </div>
              </div>
              <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800">
                <div className="text-xs font-mono text-slate-400 mb-1">Jurisdiction</div>
                <div className="text-sm font-semibold text-white">{framework.jurisdiction}</div>
              </div>
              <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800">
                <div className="text-xs font-mono text-slate-400 mb-1">Delivery Timeframe</div>
                <div className="text-sm font-semibold text-cyan-400">4-6 Weeks to Audit-Ready</div>
              </div>
              <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800">
                <div className="text-xs font-mono text-slate-400 mb-1">Approach</div>
                <div className="text-sm font-semibold text-white">Policy-as-Code (GitOps)</div>
              </div>
            </div>

            {/* Primary Action Buttons */}
            <div className="flex flex-wrap gap-4 items-center">
              <button
                onClick={() => navigate('/schedule')}
                className="px-8 py-4 rounded-xl bg-cyan-400 text-slate-950 font-bold font-mono text-sm hover:bg-cyan-300 transition-colors flex items-center gap-3 shadow-lg shadow-cyan-500/20"
              >
                SCHEDULE 30-MIN AUDIT REVIEW
                <ArrowRight size={16} />
              </button>
              <Link
                to="/risk-calculator"
                className="px-6 py-4 rounded-xl bg-slate-900 text-slate-200 border border-slate-800 font-mono text-sm hover:bg-slate-800 hover:text-white transition-colors flex items-center gap-2"
              >
                <Cpu size={16} className="text-cyan-400" />
                Calculate Breach Risk Score
              </Link>
            </div>
          </div>
        </section>

        {/* Core Regulatory Requirements */}
        <section className="py-20 px-6 border-t border-slate-900 bg-slate-950/40">
          <div className="container mx-auto max-w-5xl">
            <div className="text-center max-w-2xl mx-auto mb-14">
              <div className="text-xs font-mono font-bold tracking-widest text-cyan-400 uppercase mb-3">
                Mandate Breakdown
              </div>
              <h2 className="text-3xl font-display font-bold text-white mb-4">
                What {framework.shortName} Requires from Your Engineering Team
              </h2>
              <p className="text-slate-400 text-sm md:text-base font-light">
                Regulatory expectations have shifted from passive documentation to continuous, cryptographically verified infrastructure controls.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {framework.coreRequirements.map((req, idx) => (
                <div 
                  key={idx}
                  className="p-8 rounded-2xl bg-slate-900/60 border border-slate-800/80 hover:border-cyan-500/30 transition-all group"
                >
                  <div className="w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center font-mono font-bold text-sm mb-5 group-hover:scale-110 transition-transform">
                    0{idx + 1}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{req.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed font-light">{req.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Technical Implementation Blueprint */}
        <section className="py-20 px-6 border-t border-slate-900">
          <div className="container mx-auto max-w-5xl">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <div className="text-xs font-mono font-bold tracking-widest text-cyan-400 uppercase mb-3">
                Oakivo Engineering Blueprint
              </div>
              <h2 className="text-3xl font-display font-bold text-white mb-4">
                Deterministic 4-Phase Implementation Roadmap
              </h2>
              <p className="text-slate-400 text-sm md:text-base font-light">
                We codify compliance directly into your Terraform, Kubernetes, and CI/CD pipelines so security is continuous and frictionless.
              </p>
            </div>

            <div className="space-y-6">
              {framework.technicalBlueprint.map((step, idx) => (
                <div 
                  key={idx}
                  className="p-8 rounded-2xl bg-slate-900/40 border border-slate-800/80 hover:border-slate-700 transition-all flex flex-col md:flex-row md:items-start gap-6"
                >
                  <div className="font-mono text-xs font-bold text-cyan-400 px-3 py-1.5 rounded-lg bg-cyan-500/10 border border-cyan-500/20 w-fit shrink-0">
                    {step.phase}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-display font-bold text-white mb-4">{step.title}</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {step.deliverables.map((item, dIdx) => (
                        <div key={dIdx} className="flex items-start gap-3 text-sm text-slate-300 font-light">
                          <CheckCircle2 size={16} className="text-cyan-400 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Multi-Cloud Provider Support Matrix */}
        <section className="py-16 px-6 border-t border-slate-900 bg-slate-950/60">
          <div className="container mx-auto max-w-5xl">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-10">
              <div>
                <h3 className="text-2xl font-display font-bold text-white mb-2">
                  Cloud Infrastructure Tailoring
                </h3>
                <p className="text-slate-400 text-sm font-light">
                  Explore provider-specific implementations engineered for Canadian sovereignty:
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                {['aws', 'azure', 'kubernetes', 'gcp'].map((p) => (
                  <Link
                    key={p}
                    to={`/compliance/${framework.id}-on-${p}`}
                    className={`px-4 py-2 rounded-xl text-xs font-mono font-medium border transition-colors ${
                      providerKey === p 
                        ? 'bg-cyan-400 text-slate-950 border-cyan-400 font-bold'
                        : 'bg-slate-900 text-slate-300 border-slate-800 hover:border-cyan-500/40 hover:text-white'
                    }`}
                  >
                    {PROVIDER_NAMES[p]}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Frequently Asked Questions (FAQ) */}
        <section className="py-20 px-6 border-t border-slate-900">
          <div className="container mx-auto max-w-3xl">
            <div className="text-center mb-12">
              <div className="text-xs font-mono font-bold tracking-widest text-cyan-400 uppercase mb-3">
                Expert Guidance
              </div>
              <h2 className="text-3xl font-display font-bold text-white mb-4">
                Frequently Asked Questions about {framework.shortName}
              </h2>
              <p className="text-slate-400 text-sm font-light">
                Direct answers from our senior DevSecOps architects on Canadian regulatory enforcement and audit execution.
              </p>
            </div>

            <div className="space-y-4">
              {framework.faqs.map((faq, idx) => {
                const isOpen = activeFaq === idx;
                return (
                  <div 
                    key={idx}
                    className="border border-slate-800 rounded-2xl overflow-hidden bg-slate-900/40"
                  >
                    <button
                      onClick={() => setActiveFaq(isOpen ? null : idx)}
                      className="w-full p-6 text-left flex items-center justify-between gap-4 hover:bg-slate-900/80 transition-colors"
                      aria-expanded={isOpen}
                    >
                      <span className="font-semibold text-white text-base md:text-lg">
                        {faq.question}
                      </span>
                      <ChevronDown 
                        size={18} 
                        className={`text-cyan-400 shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} 
                      />
                    </button>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <div className="px-6 pb-6 text-slate-300 font-light text-sm md:text-base leading-relaxed border-t border-slate-800/60 pt-4">
                            {faq.answer}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Regional Hubs & Sovereign Locations Cross-Links */}
        <section className="py-16 px-6 border-t border-slate-900 bg-slate-950/80">
          <div className="container mx-auto max-w-5xl text-center">
            <div className="inline-flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-widest mb-3">
              <MapPin size={14} /> Local Canadian Engineering Hubs
            </div>
            <h3 className="text-2xl font-display font-bold text-white mb-6">
              Providing On-the-Ground DevSecOps Across Canada
            </h3>
            <div className="flex flex-wrap justify-center gap-3">
              <Link to="/locations/new-brunswick" className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono text-slate-300 hover:border-cyan-400 hover:text-white transition-colors">
                Dieppe / Moncton, NB (Headquarters)
              </Link>
              <Link to="/locations/alberta" className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono text-slate-300 hover:border-cyan-400 hover:text-white transition-colors">
                Calgary & Edmonton, AB (Energy & AWS West)
              </Link>
              <Link to="/locations/ontario" className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono text-slate-300 hover:border-cyan-400 hover:text-white transition-colors">
                Toronto & Waterloo, ON (Fintech & Banking)
              </Link>
              <Link to="/locations/nova-scotia" className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono text-slate-300 hover:border-cyan-400 hover:text-white transition-colors">
                Halifax, NS (Marine & SaaS Hub)
              </Link>
            </div>
          </div>
        </section>

        {/* High-Impact Conversion CTA */}
        <section className="py-20 px-6 border-t border-slate-900 relative overflow-hidden">
          <div className="container mx-auto max-w-4xl bg-gradient-to-br from-slate-900 via-slate-900/90 to-slate-950 border border-cyan-500/30 p-10 md:p-16 rounded-3xl relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 blur-[120px] rounded-full pointer-events-none"></div>

            <div className="relative z-10 text-center max-w-2xl mx-auto">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 font-mono text-xs uppercase tracking-wider mb-6 border border-cyan-500/20">
                <FileCheck size={14} /> Guaranteed Audit Readiness
              </div>

              <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-6 leading-tight">
                Achieve Complete {framework.shortName} Compliance Without Pipeline Friction
              </h2>

              <p className="text-slate-300 font-light text-base md:text-lg mb-8 leading-relaxed">
                Connect with an Oakivo Principal DevSecOps Architect for an actionable 30-minute infrastructure review. We map your current cloud topology directly against Canadian statutory requirements.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <button
                  onClick={() => navigate('/schedule')}
                  className="w-full sm:w-auto px-8 py-4 rounded-xl bg-cyan-400 text-slate-950 font-bold font-mono text-sm hover:bg-cyan-300 transition-colors flex items-center justify-center gap-3 shadow-lg shadow-cyan-500/25"
                >
                  SCHEDULE 30-MIN AUDIT REVIEW
                  <ArrowRight size={16} />
                </button>
                <button
                  onClick={() => navigate('/contact')}
                  className="w-full sm:w-auto px-8 py-4 rounded-xl bg-slate-900 border border-slate-700 text-slate-200 font-mono text-sm hover:bg-slate-800 hover:text-white transition-colors"
                >
                  Request Architecture Checklist
                </button>
              </div>

              <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs font-mono text-slate-400">
                <span>✓ 100% Bilingual (EN/FR)</span>
                <span>✓ Dieppe, NB Headquarters</span>
                <span>✓ Zero Pipeline Disruption</span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default ComplianceSEO;
