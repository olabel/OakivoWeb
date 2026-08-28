import React from 'react';
import { 
  ArrowRight, ShieldCheck, Zap, Layers, CheckCircle2, 
  Sparkles, RefreshCw, Clock, ArrowUpRight, GitBranch, Database, Activity, Terminal, Shield
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { NavRoute } from '../types';
import SEO from '../components/SEO';
import { useLanguage } from '../context/LanguageContext';

const Services: React.FC = () => {
  const { t } = useLanguage();

  const corePillars = [
    {
      id: 'cspm-compliance',
      title: 'Cloud Security Posture Management (CSPM)',
      tagline: 'Continuous Multi-Cloud Scanning & Compliance',
      icon: <ShieldCheck size={28} className="text-cyan-400" />,
      headline: 'Turn Compliance from an Annual Nightmare into Continuous Assurance.',
      problem: 'Engineering teams spend weeks capturing manual screenshots and log extracts before PIPEDA, SOC 2, and ISO 27001 audits while cloud drift goes unnoticed.',
      capabilities: [
        'Automated cloud misconfiguration detection across AWS, Azure, GCP',
        'Real-time drift detection for Infrastructure-as-Code (Terraform, OpenTofu)',
        'Continuous compliance mapping (SOC 2, PIPEDA, ISO 27001, NIST)',
        'Push-button cryptographic audit evidence and compliance archives'
      ],
      outcomeMetric: '24/7 Continuous Proof',
      outcomeDesc: 'Replaced weeks of stressful pre-audit panic with automated 24/7 compliance evidence and zero cloud configuration drift.'
    },
    {
      id: 'devsecops-pipelines',
      title: 'DevSecOps Pipeline Engineering',
      tagline: 'Shift-Left CI/CD Security Automation',
      icon: <GitBranch size={28} className="text-cyan-400" />,
      headline: 'Build Fast. Break Nothing. Secure Every Single Commit.',
      problem: 'Security reviews happen at the end of release sprints, stalling deployments and forcing developers into expensive last-minute code rewrites.',
      capabilities: [
        'Automated SAST, DAST, and Software Bill of Materials (SBOM) generation',
        'Container image scanning and cryptographic cosign verification',
        'Secret leakage detection and credential gating in pull requests',
        'Policy-as-Code enforcement guaranteeing zero unsecured code deploys'
      ],
      outcomeMetric: 'Accelerated Release Velocity',
      outcomeDesc: 'Eliminated release security bottlenecks while shifting vulnerability scans directly into developer pull requests.'
    },
    {
      id: 'erp-security-iam',
      title: 'ERP Security & Identity Management',
      tagline: 'Zero Trust Access & Financial Data Protection',
      icon: <Database size={28} className="text-cyan-400" />,
      headline: 'Protect the Financial & Operational Core of Your Business.',
      problem: 'Former staff and third-party contractors retain active access across disconnected ERP, finance, and operational databases without centralized controls.',
      capabilities: [
        'Sub-second automated offboarding and credential de-provisioning',
        'Least-privilege role matrix implementation and tokenized API gateways',
        'Zero Trust mutual TLS (mTLS) database perimeter security',
        'Real-time anomalous database exfiltration radar'
      ],
      outcomeMetric: 'Instant Offboarding',
      outcomeDesc: 'Zero unauthorized access and instantaneous credential revocation across core enterprise and ERP systems.'
    },
    {
      id: 'sre-incident-remediation',
      title: 'Automated Incident Remediation (SRE)',
      tagline: 'Autonomous Threat Neutralization & Uptime',
      icon: <Activity size={28} className="text-amber-400" />,
      headline: 'Neutralize Threats at Machine Speed Before They Impact Operations.',
      problem: 'Human analysts cannot respond in milliseconds when brute-force or credential stuff attacks hit cloud infrastructure at 3 AM.',
      capabilities: [
        'Automated event-driven runbooks that isolate compromised nodes instantly',
        'Sub-millisecond secret and API key rotation upon anomaly detection',
        'Immutable audit logging and centralized SIEM streaming',
        'Self-healing cloud architectures guaranteeing 99.99% operational uptime'
      ],
      outcomeMetric: '99.99% Cloud Uptime',
      outcomeDesc: 'Autonomous event-driven remediation neutralizing threats in milliseconds with zero operational downtime.'
    }
  ];

  const processSteps = [
    {
      step: '01',
      title: t('steps.step1_title'),
      subtitle: t('steps.step1_time'),
      description: t('steps.step1_desc')
    },
    {
      step: '02',
      title: t('steps.step2_title'),
      subtitle: t('steps.step2_time'),
      description: t('steps.step2_desc')
    },
    {
      step: '03',
      title: t('steps.step3_title'),
      subtitle: t('steps.step3_time'),
      description: t('steps.step3_desc')
    }
  ];

  return (
    <>
      <SEO 
        title="DevSecOps & Cloud Security Services | Oakivo Solutions"
        description="Explore Oakivo's 4 core DevSecOps pillars: Cloud Security Posture Management (CSPM), CI/CD Pipeline Security, ERP Zero Trust IAM, and Automated SRE Incident Remediation in Atlantic Canada."
        canonical="/services"
        keywords="Cloud Security Posture Management, CSPM, CI/CD Security, Shift-Left, DevSecOps, ERP Security, Zero Trust IAM, SRE Remediation"
      />

      {/* Hero Section */}
      <section className="relative pt-12 pb-20 md:pt-20 md:pb-28 border-b border-white/[0.08] overflow-hidden">
        {/* Cinematic Video Background */}
        <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
          <video autoPlay loop muted playsInline className="w-full h-full object-cover">
            <source src="https://assets.mixkit.co/videos/preview/mixkit-abstract-particles-and-lines-in-space-26210-large.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-950/80 to-slate-950"></div>
        </div>
        <div className="container mx-auto px-4 md:px-6 relative z-10 max-w-7xl">
          <div className="max-w-4xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full linear-pill backdrop-blur-md">
              <Sparkles size={13} className="text-cyan-400" />
              <span className="text-[11px] font-mono font-medium text-gray-300">
                {t('hero.badge')}
              </span>
            </div>

            <h1 className="text-4xl sm:text-6xl xl:text-7xl font-extrabold tracking-linear-tight text-slate-100 leading-[1.06]">
              {t('hero.headline_main')}{' '}
              <span className="text-linear-accent font-semibold">{t('hero.headline_accent')}</span>
            </h1>

            <p className="text-lg md:text-xl text-[#8A8F98] font-normal leading-relaxed max-w-3xl tracking-linear-normal">
              {t('hero.subtitle')}
            </p>

            <div className="pt-4 flex flex-wrap items-center gap-4">
              <button onClick={() => window.dispatchEvent(new CustomEvent("open-lead-drawer"))}
                className="px-7 py-4 rounded-full bg-white hover:bg-gray-100 text-black font-semibold text-xs tracking-wide transition-all shadow-[0_0_25px_rgba(255,255,255,0.25)] flex items-center gap-2 group"
              >
                <span>{t('common.cta_book_audit')}</span>
                <ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Core Pillars */}
      <section id="core-pillars" className="py-24 md:py-32 relative border-b border-white/[0.08]">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <div className="max-w-3xl mb-16 space-y-3">
            <span className="text-xs font-mono font-medium uppercase tracking-wider text-cyan-400">
              {t('arsenal.badge')}
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-linear-tight text-slate-100">
              {t('arsenal.title_main')} {t('arsenal.title_accent')}
            </h2>
            <p className="text-sm md:text-base text-[#8A8F98]">
              {t('arsenal.subtitle')}
            </p>
          </div>

          <div className="space-y-12">
            {corePillars.map((pillar) => (
              <div 
                key={pillar.id}
                id={pillar.id}
                className="bg-slate-900/40 backdrop-blur-md rounded-sm border border-slate-800 rounded-2xl md:rounded-3xl p-6 md:p-10 border border-white/[0.08] relative overflow-hidden"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  
                  {/* Left Column */}
                  <div className="lg:col-span-5 space-y-4">
                    <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">
                      {pillar.icon}
                    </div>
                    <div>
                      <span className="text-xs font-mono text-gray-400 uppercase tracking-wider block">
                        {pillar.tagline}
                      </span>
                      <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-white mt-1">
                        {pillar.title}
                      </h3>
                      <p className="text-xs md:text-sm font-semibold text-cyan-400 mt-2">
                        {pillar.headline}
                      </p>
                    </div>

                    <div className="p-4 rounded-xl bg-black/40 border border-white/[0.06] space-y-1.5">
                      <span className="text-[10px] font-mono font-semibold text-amber-400 uppercase tracking-wider block">
                        Common Operational Risk
                      </span>
                      <p className="text-xs md:text-sm text-gray-300 leading-relaxed">
                        {pillar.problem}
                      </p>
                    </div>
                  </div>

                  {/* Right Column */}
                  <div className="lg:col-span-7 space-y-6 lg:pl-6 lg:border-l lg:border-white/[0.08]">
                    <div>
                      <h4 className="text-xs font-mono font-medium uppercase tracking-wider text-[#8A8F98] mb-4">
                        What Oakivo Engineers Implement
                      </h4>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {pillar.capabilities.map((cap, i) => (
                          <li key={i} className="flex items-start gap-2.5 text-xs md:text-sm text-gray-200">
                            <CheckCircle2 size={16} className="text-cyan-400 shrink-0 mt-0.5" />
                            <span>{cap}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="p-5 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                      <div>
                        <span className="text-[10px] font-mono text-cyan-400 font-bold uppercase tracking-wider block">
                          Real Business Result
                        </span>
                        <p className="text-xs md:text-sm text-gray-200 mt-0.5">
                          {pillar.outcomeDesc}
                        </p>
                      </div>
                      <div className="shrink-0 bg-white/10 px-4 py-2 rounded-lg border border-white/10 text-center">
                        <span className="text-base font-bold text-white font-mono block">
                          {pillar.outcomeMetric}
                        </span>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3-Step Process */}
      <section className="py-24 md:py-32 relative border-b border-white/[0.08]">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <div className="max-w-3xl mb-16 space-y-3">
            <span className="text-xs font-mono font-medium uppercase tracking-wider text-cyan-400">
              {t('steps.badge')}
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-linear-tight text-slate-100">
              {t('steps.title_main')}{t('steps.title_accent')}
            </h2>
            <p className="text-sm md:text-base text-[#8A8F98]">
              {t('steps.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {processSteps.map((proc, idx) => (
              <div 
                key={idx}
                className="bg-slate-900/40 backdrop-blur-md rounded-sm border border-slate-800 rounded-2xl p-8 border border-white/[0.08] relative group flex flex-col justify-between space-y-4"
              >
                <div className="space-y-4">
                  <div className="w-10 h-10 rounded-full bg-white text-black font-extrabold text-sm flex items-center justify-center">
                    {idx + 1}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">
                      {proc.title}
                    </h3>
                    <p className="text-xs font-mono text-cyan-400 mt-0.5">
                      {proc.subtitle}
                    </p>
                  </div>
                  <p className="text-sm text-[#8A8F98] leading-relaxed">
                    {proc.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section className="py-24 md:py-32 relative">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <div className="bg-slate-900/40 backdrop-blur-md rounded-sm border border-slate-800 rounded-2xl md:rounded-3xl p-8 md:p-14 border border-white/[0.08] text-center space-y-6 relative overflow-hidden">
            <div className="max-w-3xl mx-auto space-y-4">
              <span className="inline-block px-3.5 py-1.5 rounded-full linear-pill text-cyan-400 text-xs font-mono uppercase font-bold">
                {t('drawer.tag')}
              </span>
              <h2 className="text-3xl md:text-5xl font-extrabold tracking-linear-tight text-slate-100">
                {t('drawer.title')}
              </h2>
              <p className="text-sm md:text-base text-[#8A8F98] max-w-2xl mx-auto">
                {t('drawer.desc')}
              </p>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button onClick={() => window.dispatchEvent(new CustomEvent("open-lead-drawer"))}
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-white hover:bg-gray-100 text-black font-semibold text-xs tracking-wide shadow-[0_0_25px_rgba(255,255,255,0.25)] flex items-center justify-center gap-2 group transition-all"
              >
                <span>{t('common.cta_book_audit')}</span>
                <ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Services;
