import React from 'react';
import { 
  ShieldCheck, ArrowRight, Zap, Check, X, 
  Terminal, Award, CheckCircle2, Users, Cpu, Lock, Sliders, TrendingUp
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { NavRoute } from '../types';
import SEO from '../components/SEO';

const OperatingPrinciples = [
  {
    number: '01',
    title: 'Security by Design',
    icon: <Lock size={24} className="text-oakivo-linearIndigo" />,
    description: 'Defense-in-depth is baked into every line of Infrastructure as Code from day zero. We treat security as a fundamental engineering requirement, not an audit checklist afterthought.'
  },
  {
    number: '02',
    title: 'Automation First',
    icon: <Zap size={24} className="text-oakivo-linearIndigo" />,
    description: 'Eliminating manual human intervention across CI/CD pipelines, environment provisioning, database migration, and security compliance verification.'
  },
  {
    number: '03',
    title: 'Zero Fluff',
    icon: <Terminal size={24} className="text-oakivo-linearIndigo" />,
    description: 'Direct communication, zero buzzword fluff, and transparent engineering telemetry. You deal directly with senior architects who write code, not account managers.'
  },
  {
    number: '04',
    title: 'Measured ROI',
    icon: <TrendingUp size={24} className="text-oakivo-linearIndigo" />,
    description: 'Every architectural decision is tied directly to explicit business outcomes—guaranteed uptime, reduced monthly cloud spend, and deployment velocity.'
  }
];

const TrustMetrics = [
  { value: '99.99%', label: 'Infrastructure Uptime Guaranteed', subtext: 'Battle-tested HA clustering' },
  { value: '< 60 Days', label: 'SOC 2 Readiness SLA', subtext: 'Accelerated audit timelines' },
  { value: '40%', label: 'Avg Cloud Spend Reduction', subtext: 'Automated cost optimization' },
  { value: '100%', label: 'Senior Architect Lead Ratio', subtext: 'Zero junior associate billing' }
];

const About: React.FC = () => {
  return (
    <>
      <SEO 
        title="About Oakivo | Cloud Engineering & Zero-Trust Security Principals"
        description="Oakivo is an elite boutique consultancy of senior architects empowering high-growth B2B enterprises with cloud modernization and zero-trust security."
        keywords="Oakivo, Cloud Engineering Principals, Zero-Trust Architecture, B2B Cloud Consulting, DevOps Automation"
      />

      {/* Hero Section */}
      <section className="relative pt-12 pb-20 md:pt-20 md:pb-28 border-b border-white/[0.08] overflow-hidden">
        <div className="container mx-auto px-4 md:px-6 relative z-10 max-w-7xl">
          <div className="max-w-4xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full linear-pill backdrop-blur-md">
              <ShieldCheck size={13} className="text-oakivo-linearIndigo" />
              <span className="text-[11px] font-mono-tech font-medium text-gray-300">
                Senior Engineering Consultancy
              </span>
            </div>

            <h1 className="text-4xl sm:text-6xl xl:text-7xl font-extrabold tracking-linear-tight text-linear-heading leading-[1.06]">
              Architecting Unshakeable Platforms for <span className="text-linear-accent">Growth Enterprises</span>
            </h1>

            {/* Brand Mission Statement */}
            <div className="p-6 md:p-8 rounded-2xl linear-card border border-white/10 space-y-2">
              <span className="text-[10px] font-mono-tech font-bold uppercase tracking-widest text-oakivo-linearIndigo block">
                Brand Mission
              </span>
              <p className="text-base md:text-lg text-gray-200 font-normal leading-relaxed tracking-linear-normal">
                Oakivo exists to eliminate technical debt and engineer unshakeable cloud platforms for growth-focused enterprises. We replace bloated agency overhead with direct access to senior architects who deliver zero-trust security, automated velocity, and quantifiable ROI.
              </p>
            </div>

            <div className="pt-2 flex items-center gap-4">
              <Link
                to={NavRoute.CONTACT}
                className="px-6 py-3.5 rounded-full bg-white hover:bg-gray-100 text-black font-semibold text-xs tracking-wide transition-all shadow-[0_0_25px_rgba(255,255,255,0.25)] flex items-center gap-2 group"
              >
                <span>Talk to a Senior Architect</span>
                <ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Metrics */}
      <section className="py-16 md:py-20 relative border-b border-white/[0.08]">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {TrustMetrics.map((metric, idx) => (
              <div 
                key={idx}
                className="linear-card p-6 rounded-2xl border border-white/[0.08] text-center space-y-2"
              >
                <div className="text-3xl sm:text-4xl font-extrabold font-mono-tech text-white tracking-tight">
                  {metric.value}
                </div>
                <div className="text-xs font-semibold text-gray-200">
                  {metric.label}
                </div>
                <div className="text-[10px] font-mono-tech text-gray-500">
                  {metric.subtext}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Operating Principles */}
      <section className="py-20 md:py-28 relative border-b border-white/[0.08]">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <div className="max-w-3xl mb-16 space-y-3">
            <span className="text-xs font-mono-tech font-medium uppercase tracking-wider text-oakivo-linearIndigo">
              Our Engineering Standards
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-linear-tight text-linear-heading">
              Core Operating Principles
            </h2>
            <p className="text-sm md:text-base text-[#8A8F98]">
              We govern every architectural engagement through four non-negotiable engineering values.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {OperatingPrinciples.map((principle) => (
              <div 
                key={principle.number}
                className="linear-card rounded-2xl p-6 md:p-8 border border-white/[0.08] space-y-4"
              >
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-white/[0.05] border border-white/10 flex items-center justify-center">
                    {principle.icon}
                  </div>
                  <span className="text-xl font-mono-tech font-bold text-gray-500">
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

      {/* Distinction Matrix */}
      <section className="py-20 md:py-28 relative border-b border-white/[0.08]">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <div className="max-w-3xl mb-12 space-y-3">
            <span className="text-xs font-mono-tech font-medium uppercase tracking-wider text-oakivo-linearIndigo">
              Why Leaders Choose Oakivo
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-linear-tight text-linear-heading">
              The Oakivo Difference vs. Legacy Consultancies
            </h2>
          </div>

          <div className="linear-card rounded-2xl border border-white/[0.08] overflow-x-auto">
            <table className="w-full text-left text-xs md:text-sm border-collapse min-w-[600px]">
              <thead>
                <tr className="border-b border-white/10 bg-white/[0.02]">
                  <th className="p-4 md:p-5 font-mono-tech text-gray-400 font-medium uppercase">Engineering Parameter</th>
                  <th className="p-4 md:p-5 font-mono-tech text-white font-bold uppercase bg-oakivo-linearIndigo/10">Oakivo Principal Model</th>
                  <th className="p-4 md:p-5 font-mono-tech text-gray-500 font-medium uppercase">Legacy Big-4 Consultancies</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.06] text-gray-300">
                <tr>
                  <td className="p-4 md:p-5 font-semibold text-white">Architect Seniority</td>
                  <td className="p-4 md:p-5 text-white font-bold bg-oakivo-linearIndigo/5 flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
                    <span>100% Principal Architects (12+ yrs experience)</span>
                  </td>
                  <td className="p-4 md:p-5 text-gray-400">Junior associates with high billable hour targets</td>
                </tr>
                <tr>
                  <td className="p-4 md:p-5 font-semibold text-white">Security & IaC Protocol</td>
                  <td className="p-4 md:p-5 text-white font-bold bg-oakivo-linearIndigo/5 flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
                    <span>Zero-Trust Infrastructure as Code by default</span>
                  </td>
                  <td className="p-4 md:p-5 text-gray-400">Manual provisioning with post-hoc compliance patches</td>
                </tr>
                <tr>
                  <td className="p-4 md:p-5 font-semibold text-white">Execution Speed</td>
                  <td className="p-4 md:p-5 text-white font-bold bg-oakivo-linearIndigo/5 flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
                    <span>Rapid 60-day target deployment sprints</span>
                  </td>
                  <td className="p-4 md:p-5 text-gray-400">6–12 month protracted discovery cycles</td>
                </tr>
                <tr>
                  <td className="p-4 md:p-5 font-semibold text-white">Engagement Model</td>
                  <td className="p-4 md:p-5 text-white font-bold bg-oakivo-linearIndigo/5 flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
                    <span>Direct Slack/Teams channel with lead engineers</span>
                  </td>
                  <td className="p-4 md:p-5 text-gray-400">Layered account managers & proxy status meetings</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section className="py-20 md:py-28 relative">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <div className="linear-card rounded-2xl md:rounded-3xl p-8 md:p-14 border border-white/[0.08] text-center space-y-6 relative overflow-hidden">
            <div className="max-w-3xl mx-auto space-y-4">
              <h2 className="text-3xl md:text-5xl font-extrabold tracking-linear-tight text-linear-heading">
                Experience Zero-Fluff Cloud Engineering
              </h2>
              <p className="text-sm md:text-base text-[#8A8F98] max-w-2xl mx-auto">
                Schedule a direct intake session with our principal team to evaluate your current platform architecture.
              </p>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to={NavRoute.CONTACT}
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-white hover:bg-gray-100 text-black font-semibold text-xs tracking-wide shadow-[0_0_25px_rgba(255,255,255,0.25)] flex items-center justify-center gap-2 group transition-all"
              >
                <span>Initiate Technical Intake</span>
                <ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
