import React from 'react';
import { 
  ShieldCheck, ArrowRight, Zap, CheckCircle2, Users, Layers, TrendingUp, Clock,
  Terminal, GitBranch, Database, Activity, Lock, MapPin
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { NavRoute } from '../types';
import SEO from '../components/SEO';
import { useLanguage } from '../context/LanguageContext';

const OperatingPrinciples = [
  {
    number: '01',
    title: 'Grounded Security Engineering',
    icon: <ShieldCheck size={24} className="text-cyan-400" />,
    description: 'No fear-mongering or vanity metrics. We focus on automated security guardrails that eliminate actual breach risks and audit friction.'
  },
  {
    number: '02',
    title: 'Zero Development Friction',
    icon: <Zap size={24} className="text-cyan-400" />,
    description: 'Security should accelerate shipping, not stall it. We embed automated scanning directly into developer CI/CD workflows with sub-second feedback.'
  },
  {
    number: '03',
    title: '100% Atlantic Canada Presence',
    icon: <Users size={24} className="text-cyan-400" />,
    description: 'Headquartered in Dieppe, New Brunswick. Direct bilingual (EN/FR) senior DevSecOps architects operating in Atlantic Standard Time.'
  },
  {
    number: '04',
    title: 'Continuous Compliance & Assurance',
    icon: <Clock size={24} className="text-amber-400" />,
    description: 'Every pipeline and cloud environment we protect continuous cryptographic compliance archives for SOC 2, PIPEDA, and Canadian data sovereignty.'
  }
];

const TrustMetrics = [
  { value: '100% Bilingual', label: 'English & French Engineering', subtext: 'Direct Dieppe, NB team' },
  { value: '< 15 Mins', label: 'Local Incident Response SLA', subtext: 'Atlantic Standard Time' },
  { value: '24/7/365', label: 'Continuous CSPM & Compliance', subtext: 'SOC 2 & PIPEDA ready' },
  { value: '0 Drift', label: 'Infrastructure-as-Code Integrity', subtext: 'Terraform & OpenTofu' }
];

const About: React.FC = () => {
  const { t } = useLanguage();

  return (
    <>
      <SEO 
        title="About Oakivo Solutions | Atlantic Canada DevSecOps & Cloud Security"
        description="Oakivo Solutions is a premier DevSecOps, Cloud Security, and Security Automation firm based in Dieppe, New Brunswick, defending Atlantic Canadian enterprises."
        canonical="/about"
        keywords="Oakivo Solutions, DevSecOps Atlantic Canada, Cloud Security New Brunswick, Dieppe Cybersecurity, Nova Scotia CI/CD Security, PEI PIPEDA Compliance"
      />

      {/* Hero Section */}
      <section className="relative pt-12 pb-20 md:pt-20 md:pb-28 border-b border-white/[0.08] overflow-hidden">
        {/* Cinematic Video Background */}
        <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
          <video autoPlay loop muted playsInline className="w-full h-full object-cover">
            <source src="https://assets.mixkit.co/videos/preview/mixkit-technology-and-network-connections-background-loop-27411-large.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-950/80 to-slate-950"></div>
        </div>
        <div className="container mx-auto px-4 md:px-6 relative z-10 max-w-7xl">
          <div className="max-w-4xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full linear-pill backdrop-blur-md">
              <MapPin size={13} className="text-cyan-400" />
              <span className="text-[11px] font-mono font-medium text-gray-300">
                Dieppe, New Brunswick • Atlantic Canada Authority
              </span>
            </div>

            <h1 className="text-4xl sm:text-6xl xl:text-7xl font-extrabold tracking-linear-tight text-slate-100 leading-[1.06]">
              Defending Atlantic Canadian Enterprises Through <span className="text-linear-accent font-semibold">DevSecOps Automation.</span>
            </h1>

            {/* Brand Mission Statement */}
            <div className="p-6 md:p-8 rounded-2xl bg-slate-900/40 backdrop-blur-md rounded-sm border border-slate-800 border border-white/10 space-y-3">
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-cyan-400 block">
                Our Mission & Positioning
              </span>
              <p className="text-base md:text-lg text-gray-200 font-normal leading-relaxed tracking-linear-normal">
                Oakivo Solutions Inc. is headquartered in Dieppe, New Brunswick. We provide senior DevSecOps pipeline engineering, Cloud Security Posture Management (CSPM), and autonomous incident remediation for logistics, retail, healthcare, and enterprise organizations across Atlantic Canada.
              </p>
              <p className="text-xs text-gray-400 pt-1 leading-relaxed">
                Unlike national consulting monoliths that offload tickets to generic call centers, our bilingual engineering team works directly alongside your technical leaders in Atlantic Standard Time to protect mission-critical systems and ensure strict Canadian data sovereignty.
              </p>
            </div>

            <div className="pt-2 flex items-center gap-4">
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

      {/* Trust Metrics */}
      <section className="py-32 md:py-48 relative border-b border-white/[0.08]">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {TrustMetrics.map((metric, idx) => (
              <div 
                key={idx}
                className="bg-slate-900/40 backdrop-blur-md rounded-sm border border-slate-800 p-6 rounded-2xl border border-white/[0.08] text-center space-y-2"
              >
                <div className="text-3xl sm:text-4xl font-extrabold font-mono text-white tracking-tight">
                  {metric.value}
                </div>
                <div className="text-xs font-semibold text-gray-200">
                  {metric.label}
                </div>
                <div className="text-[10px] font-mono text-cyan-400 font-medium">
                  {metric.subtext}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Operating Principles */}
      <section className="py-32 md:py-48 relative border-b border-white/[0.08]">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <div className="max-w-3xl mb-16 space-y-3">
            <span className="text-xs font-mono font-medium uppercase tracking-wider text-cyan-400">
              Our Principles
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-linear-tight text-slate-100">
              Engineering-First Values
            </h2>
            <p className="text-sm md:text-base text-[#8A8F98]">
              How we defend critical infrastructure across New Brunswick, Nova Scotia, Prince Edward Island, and Newfoundland.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {OperatingPrinciples.map((principle) => (
              <div 
                key={principle.number}
                className="bg-slate-900/40 backdrop-blur-md rounded-sm border border-slate-800 rounded-2xl p-6 md:p-8 border border-white/[0.08] space-y-4"
              >
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-white/[0.05] border border-white/10 flex items-center justify-center">
                    {principle.icon}
                  </div>
                  <span className="text-xl font-mono font-bold text-gray-500">
                    {principle.number}
                  </span>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-white">
                    {principle.title}
                  </h3>
                  <p className="text-xs md:text-sm text-[#8A8F98] leading-relaxed mt-2">
                    {principle.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Matrix */}
      <section className="py-32 md:py-48 relative border-b border-white/[0.08]">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <div className="max-w-3xl mb-12 space-y-3">
            <span className="text-xs font-mono font-medium uppercase tracking-wider text-cyan-400">
              The Oakivo Advantage
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-linear-tight text-slate-100">
              Oakivo DevSecOps vs. Traditional IT Vendors
            </h2>
          </div>

          <div className="bg-slate-900/40 backdrop-blur-md rounded-sm border border-slate-800 rounded-2xl border border-white/[0.08] overflow-x-auto">
            <table className="w-full text-left text-xs md:text-sm border-collapse min-w-[600px]">
              <thead>
                <tr className="border-b border-white/10 bg-white/[0.02]">
                  <th className="p-4 md:p-5 font-mono text-gray-400 font-medium uppercase">Parameter</th>
                  <th className="p-4 md:p-5 font-mono text-white font-bold uppercase bg-cyan-500/10">Oakivo DevSecOps & Cloud Security</th>
                  <th className="p-4 md:p-5 font-mono text-gray-500 font-medium uppercase">Generic Outsourced Vendors</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.06] text-gray-300">
                <tr>
                  <td className="p-4 md:p-5 font-semibold text-white">Security Velocity</td>
                  <td className="p-4 md:p-5 text-white font-bold bg-cyan-500/5 flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-cyan-400 shrink-0" />
                    <span>Automated CI/CD security gates catching issues in milliseconds</span>
                  </td>
                  <td className="p-4 md:p-5 text-gray-400">Slow manual reviews stalling deployments for weeks</td>
                </tr>
                <tr>
                  <td className="p-4 md:p-5 font-semibold text-white">Compliance Assurance</td>
                  <td className="p-4 md:p-5 text-white font-bold bg-cyan-500/5 flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-cyan-400 shrink-0" />
                    <span>Continuous automated SOC 2 & PIPEDA cryptographic archives</span>
                  </td>
                  <td className="p-4 md:p-5 text-gray-400">Stressful manual spreadsheet audits once a year</td>
                </tr>
                <tr>
                  <td className="p-4 md:p-5 font-semibold text-white">Local Authority & SLA</td>
                  <td className="p-4 md:p-5 text-white font-bold bg-cyan-500/5 flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-cyan-400 shrink-0" />
                    <span>Dieppe, NB headquarters with direct AST bilingual support</span>
                  </td>
                  <td className="p-4 md:p-5 text-gray-400">Generic offshore ticket queues and delayed response times</td>
                </tr>
                <tr>
                  <td className="p-4 md:p-5 font-semibold text-white">Cloud Data Sovereignty</td>
                  <td className="p-4 md:p-5 text-white font-bold bg-cyan-500/5 flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-cyan-400 shrink-0" />
                    <span>Strict Canadian data residency and zero cross-border leakage</span>
                  </td>
                  <td className="p-4 md:p-5 text-gray-400">Unmonitored cloud routing and foreign jurisdiction risks</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section className="py-32 md:py-48 relative">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <div className="bg-slate-900/40 backdrop-blur-md rounded-sm border border-slate-800 rounded-2xl md:rounded-3xl p-8 md:p-14 border border-white/[0.08] text-center space-y-6 relative overflow-hidden">
            <div className="max-w-3xl mx-auto space-y-4">
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

export default About;
