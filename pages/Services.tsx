import React from 'react';
import { 
  ArrowRight, ShieldCheck, Zap, Cpu, Lock, 
  Layers, CheckCircle2, Terminal, ArrowUpRight, Sparkles, RefreshCw, BarChart2
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { NavRoute } from '../types';
import SEO from '../components/SEO';

const Services: React.FC = () => {
  const corePillars = [
    {
      id: 'digital-transformation',
      title: 'Digital Transformation',
      tagline: 'Streamline operations & eliminate technical debt',
      icon: <RefreshCw size={28} className="text-oakivo-linearIndigo" />,
      problem: 'Legacy operational friction, fragmented SaaS sprawl, and bloated technical debt halting enterprise release velocity.',
      capabilities: [
        'Enterprise System Consolidation & Monolith Deconstruction',
        'Legacy Architecture Refactoring & API Integration',
        'Continuous Delivery Pipeline (CI/CD) Optimization',
        'Developer Experience (DX) & Internal Developer Platform (IDP)'
      ],
      outcomeMetric: '50%+ Overhead Reduction',
      outcomeDesc: 'Achieved 50%+ reduction in infrastructure maintenance overhead and 3x faster feature deployment velocity across engineering units.'
    },
    {
      id: 'modern-platforms',
      title: 'Modern Platforms',
      tagline: 'Elastic, cloud-native infrastructure at scale',
      icon: <Cpu size={28} className="text-oakivo-linearIndigo" />,
      problem: 'Monolithic database bottlenecks, unreliable cloud auto-scaling, and unoptimized, escalating cloud expenditure.',
      capabilities: [
        'Multi-Cloud Infrastructure as Code (Terraform / Pulumi)',
        'Kubernetes & Microservices Container Orchestration',
        'Database Sharding & High-Availability Clustering (Aurora / Postgres)',
        'Automated Multi-Region Disaster Recovery & Failover'
      ],
      outcomeMetric: '99.99% Guaranteed Availability',
      outcomeDesc: 'Delivered 99.99% system availability while cutting monthly cloud spend by 35% to 45% through automated resource rightsizing.'
    },
    {
      id: 'enterprise-security',
      title: 'Enterprise Security',
      tagline: 'Zero-trust architecture & continuous compliance',
      icon: <Lock size={28} className="text-emerald-400" />,
      problem: 'Pervasive attack surfaces, regulatory non-compliance risks (SOC 2, ISO 27001, PIPEDA), and vulnerable API endpoints.',
      capabilities: [
        'Zero-Trust Network Architecture & Micro-segmentation',
        'Role-Based IAM Governance & Least-Privilege Enforcer',
        'Automated Vulnerability Remediation in CI/CD Pipelines',
        'Real-Time Threat Telemetry & SIEM / Audit Telemetry Integration'
      ],
      outcomeMetric: '< 60 Day Compliance',
      outcomeDesc: 'Accelerated full SOC 2 Type II and ISO 27001 audit readiness in under 60 days with continuous security monitoring.'
    }
  ];

  const processSteps = [
    {
      step: '01',
      title: 'Discover',
      subtitle: 'Technical Audit & Profiling',
      description: 'We execute a forensic audit of your cloud codebase, infrastructure IaC, and security posture to pinpoint technical debt, bottleneck nodes, and cost leaks.'
    },
    {
      step: '02',
      title: 'Architect',
      subtitle: 'Zero-Trust Blueprinting',
      description: 'Our senior architects design a high-availability, zero-trust infrastructure plan customized to your target deployment velocity and compliance requirements.'
    },
    {
      step: '03',
      title: 'Automate',
      subtitle: 'Infrastructure as Code',
      description: 'We deploy version-controlled Infrastructure as Code (IaC) and automated CI/CD pipelines to guarantee reproducible, zero-downtime releases.'
    },
    {
      step: '04',
      title: 'Secure',
      subtitle: 'Governance & Handoff',
      description: 'We enforce continuous compliance monitoring, conduct penetration testing verification, and provide full hands-on operational training to your in-house engineering team.'
    }
  ];

  return (
    <>
      <SEO 
        title="Cloud Platform Engineering & Enterprise Digital Transformation | Oakivo"
        description="Architect resilient cloud infrastructure, eliminate technical debt, and enforce zero-trust security with Oakivo's enterprise platform engineering services."
        keywords="Cloud Platform Engineering, Enterprise Digital Transformation, Zero-Trust Security, Infrastructure as Code, Microservices, SOC 2 Compliance"
      />

      {/* Hero Section */}
      <section className="relative pt-12 pb-20 md:pt-20 md:pb-28 border-b border-white/[0.08] overflow-hidden">
        <div className="container mx-auto px-4 md:px-6 relative z-10 max-w-7xl">
          <div className="max-w-4xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full linear-pill backdrop-blur-md">
              <Sparkles size={13} className="text-oakivo-linearIndigo" />
              <span className="text-[11px] font-mono-tech font-medium text-gray-300">
                Enterprise Platform Engineering & Modernization
              </span>
            </div>

            <h1 className="text-4xl sm:text-6xl xl:text-7xl font-extrabold tracking-linear-tight text-linear-heading leading-[1.06]">
              Enterprise Cloud Platform Engineering & <span className="text-linear-accent">Digital Transformation</span>
            </h1>

            <p className="text-lg md:text-xl text-[#8A8F98] font-normal leading-relaxed max-w-3xl tracking-linear-normal">
              We build resilient cloud environments, eliminate legacy technical debt, and enforce zero-trust security for high-growth enterprises.
            </p>

            <div className="pt-4 flex flex-wrap items-center gap-4">
              <Link
                to={NavRoute.CONTACT}
                className="px-6 py-3.5 rounded-full bg-white hover:bg-gray-100 text-black font-semibold text-xs tracking-wide transition-all shadow-[0_0_25px_rgba(255,255,255,0.25)] flex items-center gap-2 group"
              >
                <span>Schedule Architecture Review</span>
                <ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform" />
              </Link>

              <a
                href="#core-pillars"
                className="px-6 py-3.5 rounded-full linear-pill text-gray-300 hover:text-white hover:border-white/20 transition-all text-xs font-medium"
              >
                Explore Engineering Pillars
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Core Pillar Breakdown Section */}
      <section id="core-pillars" className="py-20 md:py-28 relative border-b border-white/[0.08]">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <div className="max-w-3xl mb-16 space-y-3">
            <span className="text-xs font-mono-tech font-medium uppercase tracking-wider text-oakivo-linearIndigo">
              Capabilities & Outcomes
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-linear-tight text-linear-heading">
              Our Core Engineering Pillars
            </h2>
            <p className="text-sm md:text-base text-[#8A8F98]">
              Purpose-built solutions designed for CTOs, CISOs, and Engineering Leaders driving mission-critical scale.
            </p>
          </div>

          <div className="space-y-12">
            {corePillars.map((pillar) => (
              <div 
                key={pillar.id}
                id={pillar.id}
                className="linear-card rounded-2xl md:rounded-3xl p-6 md:p-10 border border-white/[0.08] relative overflow-hidden"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  
                  {/* Left Column: Title & Problem */}
                  <div className="lg:col-span-5 space-y-4">
                    <div className="w-12 h-12 rounded-xl bg-white/[0.05] border border-white/10 flex items-center justify-center">
                      {pillar.icon}
                    </div>
                    <div>
                      <span className="text-xs font-mono-tech text-gray-400 uppercase tracking-wider">
                        {pillar.tagline}
                      </span>
                      <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-white mt-1">
                        {pillar.title}
                      </h3>
                    </div>

                    <div className="p-4 rounded-xl bg-black/40 border border-white/[0.06] space-y-1.5">
                      <span className="text-[10px] font-mono-tech font-semibold text-rose-400 uppercase tracking-wider block">
                        Problem Solved
                      </span>
                      <p className="text-xs md:text-sm text-gray-300 leading-relaxed">
                        {pillar.problem}
                      </p>
                    </div>
                  </div>

                  {/* Right Column: Capabilities & Outcome */}
                  <div className="lg:col-span-7 space-y-6 lg:pl-6 lg:border-l lg:border-white/[0.08]">
                    <div>
                      <h4 className="text-xs font-mono-tech font-medium uppercase tracking-wider text-[#8A8F98] mb-4">
                        Key Capabilities
                      </h4>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {pillar.capabilities.map((cap, i) => (
                          <li key={i} className="flex items-start gap-2.5 text-xs md:text-sm text-gray-200">
                            <CheckCircle2 size={16} className="text-oakivo-linearIndigo shrink-0 mt-0.5" />
                            <span>{cap}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="p-5 rounded-xl bg-oakivo-linearIndigo/10 border border-oakivo-linearIndigo/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                      <div>
                        <span className="text-[10px] font-mono-tech text-oakivo-linearIndigo font-bold uppercase tracking-wider block">
                          Business Outcome
                        </span>
                        <p className="text-xs md:text-sm text-gray-200 mt-0.5">
                          {pillar.outcomeDesc}
                        </p>
                      </div>
                      <div className="shrink-0 bg-white/10 px-4 py-2 rounded-lg border border-white/10 text-center">
                        <span className="text-base font-bold text-white font-mono-tech block">
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

      {/* 4-Step Process Framework */}
      <section className="py-20 md:py-28 relative border-b border-white/[0.08]">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <div className="max-w-3xl mb-16 space-y-3">
            <span className="text-xs font-mono-tech font-medium uppercase tracking-wider text-oakivo-linearIndigo">
              Deployment Methodology
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-linear-tight text-linear-heading">
              Our 4-Step Process Framework
            </h2>
            <p className="text-sm md:text-base text-[#8A8F98]">
              A battle-tested engineering pipeline designed to deliver predictable results without disruption to live production traffic.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {processSteps.map((proc, idx) => (
              <div 
                key={idx}
                className="linear-card rounded-2xl p-6 border border-white/[0.08] relative group flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-mono-tech font-extrabold text-oakivo-linearIndigo">
                      {proc.step}
                    </span>
                    <span className="text-[10px] font-mono-tech text-gray-500 uppercase tracking-widest">
                      Phase {idx + 1}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">
                      {proc.title}
                    </h3>
                    <p className="text-xs font-mono-tech text-gray-400 mt-0.5">
                      {proc.subtitle}
                    </p>
                  </div>
                  <p className="text-xs text-[#8A8F98] leading-relaxed">
                    {proc.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section className="py-20 md:py-28 relative">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <div className="linear-card rounded-2xl md:rounded-3xl p-8 md:p-14 border border-white/[0.08] text-center space-y-6 relative overflow-hidden">
            <div className="max-w-3xl mx-auto space-y-4">
              <span className="inline-block px-3 py-1 rounded-full linear-pill text-emerald-400 text-xs font-mono-tech uppercase">
                High-Urgency Consultation Offer
              </span>
              <h2 className="text-3xl md:text-5xl font-extrabold tracking-linear-tight text-linear-heading">
                Ready to Modernize Your Enterprise Architecture?
              </h2>
              <p className="text-sm md:text-base text-[#8A8F98] max-w-2xl mx-auto">
                Eliminate infrastructure bottlenecks and achieve continuous deployment velocity with direct senior architect oversight.
              </p>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to={NavRoute.CONTACT}
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-white hover:bg-gray-100 text-black font-semibold text-xs tracking-wide shadow-[0_0_25px_rgba(255,255,255,0.25)] flex items-center justify-center gap-2 group transition-all"
              >
                <span>Book a 30-Minute Architecture Audit</span>
                <ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Services;
