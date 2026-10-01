import React from 'react';
import { 
  ArrowRight, ShieldCheck, Zap, Layers, CheckCircle2, 
  Sparkles, RefreshCw, Clock, ArrowUpRight, GitBranch, Database, Activity, Terminal, Shield, Server, Lock, Palette
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { NavRoute } from '../types';
import SEO from '../components/SEO';
import { useLanguage } from '../context/LanguageContext';
import DownloadBrochureButton from '../components/DownloadBrochureButton';
import RoiCalculator from '../components/RoiCalculator';
import IntersectionAnimatedCard from '../components/IntersectionAnimatedCard';

const Services: React.FC = () => {
  const { t } = useLanguage();

  const corePillars = [
    {
      id: 'modern-erp-transformation',
      title: 'Modern ERP & Operations Modernization',
      tagline: 'Single Source of Truth & Operational Flow',
      icon: <Database size={28} className="text-cyan-400" />,
      headline: 'Replace Disjointed Systems with One Unified Business Engine.',
      problem: 'Disconnected spreadsheets, outdated software, and manual silos bleed administrative hours and cause shipping and billing errors.',
      capabilities: [
        'Turnkey modern ERP implementation, module customization & data migration',
        'Integrated CRM, Sales, Inventory, Accounting, Invoicing & Dispatch',
        'Canadian banking, payment gateway & carrier API integrations',
        'Direct founder leadership, hands-on team training & zero operational downtime'
      ],
      outcomeMetric: '60% Less Admin Overhead',
      outcomeDesc: 'Unified end-to-end business operations, eliminating double-entry and synchronizing all departments.'
    },
    {
      id: 'workflow-revenue-automation',
      title: 'Workflow & Revenue Automation',
      tagline: 'Accelerated Cash Flow & Hands-Free Pipelines',
      icon: <Zap size={28} className="text-amber-400" />,
      headline: 'Turn Manual Hand-Offs into Hands-Free Revenue Boosters.',
      problem: 'Manual quote-to-cash handoffs, delayed invoicing, and disconnected inventory lead to missed sales, slow collections, and cash flow strain.',
      capabilities: [
        'Automated quote-to-cash and instant invoice reconciliation pipelines',
        'Real-time inventory synchronization across warehouse hubs and sales channels',
        'Automated route dispatch logging and customer status alerts',
        'Self-healing data validation pipelines that eliminate human error'
      ],
      outcomeMetric: 'Accelerated Cash Flow',
      outcomeDesc: 'Eliminated invoicing bottlenecks and manual double-entry, accelerating order-to-cash cycles.'
    },
    {
      id: 'cloud-architecture-devops',
      title: 'Cloud Architecture & DevOps Modernization',
      tagline: 'Resilient Multi-Cloud & Fast Software Delivery',
      icon: <Server size={28} className="text-emerald-400" />,
      headline: 'Resilient Cloud Infrastructure Built for Scale.',
      problem: 'Fragile server environments, unmonitored cloud spending, and slow deployment cycles drag down business velocity.',
      capabilities: [
        'Canadian sovereign cloud architecture design and migration (AWS, Azure)',
        'Automated CI/CD pipelines (GitHub Actions, GitLab) for zero-downtime releases',
        'Declarative Infrastructure-as-Code (Terraform / OpenTofu) with drift detection',
        'High-availability cloud clustering with 99.99% operational uptime'
      ],
      outcomeMetric: '99.99% Cloud Uptime',
      outcomeDesc: 'Reliable, scalable cloud environments with 2x faster release velocity and Canadian data sovereignty.'
    },
    {
      id: 'creative-web-design',
      title: 'Creative Website Design & Digital Exposure',
      tagline: 'Custom Web Design · Brand Digital Exposure · High Conversion',
      icon: <Palette size={28} className="text-cyan-400" />,
      headline: 'A Website That Gives Your Company Undeniable Digital Presence.',
      problem: 'Outdated websites that look like template clones, take 6 seconds to load, fail to rank on search engines, and leak potential clients to competitors.',
      capabilities: [
        'Bespoke, brand-aligned visual design that commands immediate authority',
        'Blazing-fast mobile and desktop load speeds built on modern tech stacks',
        'On-page technical SEO, rich schema metadata, and Google search readiness',
        'Direct inquiry pipelines connecting customer forms to your CRM or inbox'
      ],
      outcomeMetric: 'High-Impact Web Presence',
      outcomeDesc: 'Custom-designed websites that turn cold search visitors into qualified phone calls, quote requests, and client bookings.'
    },
    {
      id: 'compliance-security-assurance',
      title: 'Enterprise Cybersecurity & Practical Compliance',
      tagline: 'Continuous Zero Trust Protection & Automated Proof',
      icon: <ShieldCheck size={28} className="text-cyan-400" />,
      headline: 'Enterprise-Grade Peace of Mind Without the Bureaucracy.',
      problem: 'Unmonitored security gaps, ransomware threats, or panic over upcoming SOC 2, PIPEDA, Law 25 audits stalling contracts.',
      capabilities: [
        'Automated Cloud Security Posture Management (CSPM) with 24/7 continuous evidence',
        'Canadian sovereign data residency guarantees (AWS ca-central-1, Azure Canada)',
        'Granular Zero Trust identity governance and automated credential rotation',
        'Plain-English remediation blueprints that satisfy enterprise vendor audits & cyber insurance'
      ],
      outcomeMetric: 'Continuous 24/7 Proof',
      outcomeDesc: 'Continuous automated compliance evidence generation replacing chaotic manual spreadsheet gathering.'
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
        title="Modern ERP, Workflow Automation & Creative Web Design | Oakivo Solutions"
        description="Modernize operations with clean ERP implementations, automated quote-to-cash workflows, creative custom websites, and sovereign cloud security for Canadian businesses."
        keywords="Modern ERP Atlantic Canada, Business Workflow Automation, Creative Website Design Moncton, High Converting Web Design Halifax, Cloud Architecture Dieppe, SOC 2 compliance Canada"
        canonical="/services"
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
                className="px-7 py-4 rounded-full bg-white hover:bg-gray-100 text-black font-semibold text-xs tracking-wide transition-all shadow-[0_0_25px_rgba(255,255,255,0.25)] flex items-center gap-2 group cursor-pointer"
              >
                <span>{t('common.cta_book_audit')}</span>
                <ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform" />
              </button>
              
              <DownloadBrochureButton size="lg" variant="outline" />
            </div>
          </div>
        </div>
      </section>

      {/* Core Pillars */}
      <section id="core-pillars" className="py-16 md:py-24 relative border-b border-white/[0.08]">
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
            {corePillars.map((pillar, index) => (
              <IntersectionAnimatedCard
                key={pillar.id}
                delayMs={index * 100}
                className="group"
              >
                <div 
                  id={pillar.id}
                  className="bg-slate-900/40 backdrop-blur-md rounded-2xl md:rounded-3xl p-6 md:p-10 border border-white/[0.08] hover:border-cyan-500/30 transition-all duration-300 relative overflow-hidden shadow-xl"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    
                    {/* Left Column */}
                    <div className="lg:col-span-5 space-y-4">
                      <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 group-hover:scale-105 transition-transform duration-300">
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
              </IntersectionAnimatedCard>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive ROI & Automation Savings Calculator */}
      <section className="py-20 md:py-28 px-4 md:px-6 bg-[#070A0F] border-b border-white/[0.08] relative">
        <div className="container mx-auto max-w-7xl">
          <RoiCalculator />
        </div>
      </section>

      {/* 3-Step Process */}
      <section className="py-16 md:py-24 relative border-b border-white/[0.08]">
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
      <section className="py-16 md:py-24 relative">
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
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-white hover:bg-gray-100 text-black font-semibold text-xs tracking-wide shadow-[0_0_25px_rgba(255,255,255,0.25)] flex items-center justify-center gap-2 group transition-all cursor-pointer"
              >
                <span>{t('common.cta_book_audit')}</span>
                <ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform" />
              </button>
              
              <DownloadBrochureButton size="lg" variant="outline" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Services;
