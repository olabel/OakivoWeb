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
  let frameworkKey = 'bill-c26';
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
      }
      if (PROVIDER_NAMES[parsedPr]) {
        providerKey = parsedPr;
      }
    } else {
      // Single slug
      if (lowerSlug.includes('c26') || lowerSlug.includes('ccspa') || lowerSlug.includes('critical-cyber')) {
        frameworkKey = 'bill-c26';
      } else if (lowerSlug.includes('pipeda') || lowerSlug.includes('law-25') || lowerSlug.includes('privacy') || lowerSlug.includes('hipaa')) {
        frameworkKey = 'pipeda';
      } else if (lowerSlug.includes('soc2') || lowerSlug.includes('soc-2') || lowerSlug.includes('audit-readiness')) {
        frameworkKey = 'soc2';
      } else if (FRAMEWORK_DATA[lowerSlug]) {
        frameworkKey = lowerSlug;
      }
    }
  }

  const framework = FRAMEWORK_DATA[frameworkKey] || FRAMEWORK_DATA['bill-c26'];
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
