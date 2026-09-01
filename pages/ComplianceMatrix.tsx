import React, { useState } from 'react';
import { Search, Shield, Lock, FileCheck, Server, AlertTriangle, CheckCircle2, ChevronRight, Globe, Database } from 'lucide-react';
import SEO from '../components/SEO';

interface GlossaryTerm {
  id: string;
  term: string;
  category: 'Compliance Frameworks' | 'Cloud Security' | 'DevSecOps' | 'Data Privacy';
  definition: string;
  importance: string;
  oakivoApproach: string;
}

const glossaryData: GlossaryTerm[] = [
  {
    id: 'soc2',
    term: 'SOC 2 (System and Organization Controls 2)',
    category: 'Compliance Frameworks',
    definition: 'An auditing procedure that ensures your service providers securely manage your data to protect the interests of your organization and the privacy of its clients. It focuses on five "trust service principles": security, availability, processing integrity, confidentiality, and privacy.',
    importance: 'Mandatory for B2B SaaS and enterprise vendors. Without SOC 2 Type II compliance, most enterprise procurement teams will outright block software adoption.',
    oakivoApproach: 'We automate evidence collection for SOC 2. Instead of manual screenshot gathering, our DevSecOps pipelines provide continuous cryptographic proof of configuration, drift detection, and automated access logs.'
  },
  {
    id: 'iso-27001',
    term: 'ISO/IEC 27001',
    category: 'Compliance Frameworks',
    definition: 'The international standard for information security management systems (ISMS). It provides a systematic, risk-based approach to managing sensitive company information so that it remains secure.',
    importance: 'The gold standard for global operational security, highly demanded in European, financial, and international enterprise markets.',
    oakivoApproach: 'We map your Infrastructure-as-Code directly to ISO 27001 controls. This provides your auditors with an automated, living matrix of your security posture rather than static spreadsheets.'
  },
  {
    id: 'pipeda',
    term: 'PIPEDA (Personal Information Protection and Electronic Documents Act)',
    category: 'Data Privacy',
    definition: 'The Canadian federal privacy law for private-sector organizations. It sets out the ground rules for how businesses must handle personal information in the course of commercial activity.',
    importance: 'Failure to comply can result in severe financial penalties and loss of Canadian market trust. It mandates strict data residency, consent, and handling protocols.',
    oakivoApproach: 'We architect Canadian Sovereign Cloud environments. By deploying strictly within domestic regions and using localized KMS (Key Management Services), we mathematically eliminate cross-border data residency risks.'
  },
  {
    id: 'cspm',
    term: 'CSPM (Cloud Security Posture Management)',
    category: 'Cloud Security',
    definition: 'A class of security tools and practices designed to continuously identify misconfiguration issues and compliance risks across public cloud infrastructures (AWS, Azure, GCP).',
    importance: '99% of cloud breaches occur due to customer misconfiguration, not the cloud provider. CSPM is the proactive shield against open S3 buckets, exposed databases, and IAM drift.',
    oakivoApproach: 'Oakivo integrates continuous CSPM directly into your CI/CD pipelines. We scan Terraform and Kubernetes manifests before deployment, preventing misconfigurations from ever reaching production.'
  },
  {
    id: 'zero-trust',
    term: 'Zero-Trust Architecture (ZTA)',
    category: 'Cloud Security',
    definition: 'A security framework requiring all users and services, whether in or outside the organization\'s network, to be authenticated, authorized, and continuously validated for security configuration and posture before being granted access.',
    importance: 'Legacy VPNs are obsolete. Once an attacker breaches a VPN, they have free rein. Zero-Trust prevents lateral movement during a breach by trusting nothing and verifying everything.',
    oakivoApproach: 'We replace perimeter-based security with Identity-Aware Proxies (IAP), short-lived credentials, and mTLS service meshes, ensuring every single request is verified cryptographically at the microservice level.'
  },
  {
    id: 'iam',
    term: 'IAM & RBAC (Identity & Access Management)',
    category: 'Cloud Security',
    definition: 'Frameworks and technologies that ensure the right individuals have the appropriate access to technology resources. Role-Based Access Control (RBAC) restricts network access based on the roles of individual users within an enterprise.',
    importance: 'Compromised credentials are the leading vector for ransomware and data exfiltration. Over-privileged accounts are a ticking time bomb.',
    oakivoApproach: 'We implement "Least Privilege" automation. Access is granted just-in-time via automated workflows, and revoked instantly upon offboarding, ensuring zero standing privileges in your cloud.'
  },
  {
    id: 'sast-dast',
    term: 'SAST & DAST',
    category: 'DevSecOps',
    definition: 'Static Application Security Testing (SAST) analyzes source code for vulnerabilities before it is compiled. Dynamic Application Security Testing (DAST) analyzes the running web application from the outside, simulating a hacker\'s approach.',
    importance: 'Catching vulnerabilities early in the software development lifecycle (SDLC) reduces remediation costs by up to 100x compared to fixing them in production.',
    oakivoApproach: 'Oakivo embeds SAST/DAST natively into your GitHub Actions or GitLab CI pipelines. Builds fail automatically if critical CVEs are detected, enforcing a "shift-left" security culture.'
  },
  {
    id: 'sbom',
    term: 'SBOM (Software Bill of Materials)',
    category: 'DevSecOps',
    definition: 'A formally structured, machine-readable inventory of software components and dependencies, information about those components, and their hierarchical relationships.',
    importance: 'Essential for supply chain security. When a zero-day vulnerability (like Log4j) drops, an SBOM tells you exactly where you are exposed in seconds.',
    oakivoApproach: 'We configure your deployment pipelines to automatically generate and sign SBOMs for every container image, ensuring total visibility into your software supply chain.'
  },
  {
    id: 'iac-security',
    term: 'IaC Security (Infrastructure as Code)',
    category: 'DevSecOps',
    definition: 'The practice of securing the configuration files (like Terraform, CloudFormation, or Kubernetes YAML) that are used to provision cloud infrastructure automatically.',
    importance: 'A single typo in an IaC file can expose an entire database to the public internet. Securing IaC means securing the blueprint of your data center.',
    oakivoApproach: 'We treat infrastructure as software. Our automated guardrails run static analysis on your Terraform code, blocking non-compliant architectures from being applied.'
  },
  {
    id: 'sre-remediation',
    term: 'SRE Threat Remediation',
    category: 'DevSecOps',
    definition: 'Applying Site Reliability Engineering (SRE) principles to cybersecurity. This involves writing automated, event-driven runbooks to respond to and quarantine threats without human intervention.',
    importance: 'Human analysts cannot respond to attacks at machine speed. Automated remediation is necessary to neutralize threats before data is exfiltrated.',
    oakivoApproach: 'We build autonomous response loops. If anomaly detection flags a compromised credential, our systems automatically rotate the keys, quarantine the workload, and alert your team.'
  }
];

const ComplianceMatrix: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = ['All', ...Array.from(new Set(glossaryData.map(item => item.category)))];

  const filteredData = glossaryData.filter(item => {
    const matchesSearch = item.term.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          item.definition.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <>
      <SEO 
        title="Compliance Matrix & Security Glossary | Oakivo Solutions"
        description="Comprehensive guide to DevSecOps terminology, cloud security frameworks, and Canadian data privacy laws including SOC 2, PIPEDA, and CSPM."
        canonical="/compliance-matrix"
        keywords="SOC 2 compliance, PIPEDA data residency, CSPM, Zero Trust, DevSecOps Glossary, Canadian Cloud Security"
      />

      {/* Header Section */}
      <section className="bg-slate-950 text-slate-100 pt-32 pb-20 relative overflow-hidden border-b border-slate-900">
        <div className="absolute inset-0 z-0 opacity-10 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        <div className="container mx-auto px-6 relative z-10 max-w-5xl">
          <div className="inline-flex items-center gap-2 bg-slate-900/80 border border-slate-800 px-4 py-2 rounded-sm mb-6">
            <Globe size={14} className="text-cyan-400" />
            <span className="text-[10px] font-mono tracking-widest text-cyan-400 font-bold uppercase">Educational Resource</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-display font-bold tracking-tight mb-6">
            Compliance Matrix & <br className="hidden md:block" />
            <span className="text-cyan-500">Security Glossary</span>
          </h1>
          <p className="text-xl text-slate-400 font-light max-w-3xl leading-relaxed">
            Demystifying the complex landscape of Canadian data privacy, international compliance frameworks, and elite DevSecOps architecture. Use this matrix to understand what is required for your enterprise to scale securely.
          </p>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="py-8 bg-[#070A0F] border-b border-slate-900 sticky top-0 z-40">
        <div className="container mx-auto px-6 max-w-5xl flex flex-col md:flex-row gap-6 items-center justify-between">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
            <input 
              type="text" 
              placeholder="Search terms (e.g., SOC 2, PIPEDA)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-sm py-3 pl-12 pr-4 text-slate-200 focus:outline-none focus:border-cyan-500 transition-colors"
            />
          </div>
          
          <div className="flex flex-wrap gap-2 w-full md:w-auto">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 text-xs font-mono font-medium rounded-sm transition-colors ${
                  activeCategory === category 
                    ? 'bg-cyan-500 text-slate-950' 
                    : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Matrix Grid */}
      <section className="py-20 bg-[#070A0F] min-h-screen">
        <div className="container mx-auto px-6 max-w-5xl">
          
          {filteredData.length === 0 ? (
            <div className="text-center py-20 border border-dashed border-slate-800 rounded-lg">
              <AlertTriangle className="mx-auto text-slate-600 mb-4" size={48} />
              <h3 className="text-xl font-bold text-slate-300 mb-2">No terms found</h3>
              <p className="text-slate-500">Try adjusting your search query or category filter.</p>
            </div>
          ) : (
            <div className="space-y-8">
              {filteredData.map(item => (
                <div key={item.id} className="bg-slate-900/50 border border-slate-800 rounded-xl p-8 hover:border-slate-700 transition-colors">
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-6">
                    <div>
                      <h2 className="text-2xl font-bold text-slate-100 mb-2">{item.term}</h2>
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-950 border border-slate-800 text-[10px] font-mono text-cyan-400 uppercase tracking-wider">
                        {item.category === 'Compliance Frameworks' && <FileCheck size={12} />}
                        {item.category === 'Data Privacy' && <Shield size={12} />}
                        {item.category === 'Cloud Security' && <Lock size={12} />}
                        {item.category === 'DevSecOps' && <Server size={12} />}
                        {item.category}
                      </span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-xs font-mono text-slate-500 uppercase tracking-widest mb-2 border-b border-slate-800 pb-2">Definition</h4>
                        <p className="text-slate-300 text-sm leading-relaxed">{item.definition}</p>
                      </div>
                      <div>
                        <h4 className="text-xs font-mono text-slate-500 uppercase tracking-widest mb-2 border-b border-slate-800 pb-2">Business Impact</h4>
                        <p className="text-slate-400 text-sm leading-relaxed">{item.importance}</p>
                      </div>
                    </div>
                    
                    <div className="bg-slate-950 p-6 rounded-lg border border-slate-800/50">
                      <div className="flex items-center gap-2 mb-3">
                        <CheckCircle2 size={16} className="text-cyan-500" />
                        <h4 className="text-sm font-bold text-slate-100">The Oakivo Approach</h4>
                      </div>
                      <p className="text-slate-300 text-sm leading-relaxed">
                        {item.oakivoApproach}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          
        </div>
      </section>
    </>
  );
};

export default ComplianceMatrix;
