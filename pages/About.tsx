import React from 'react';
import { 
  ShieldCheck, ArrowRight, Zap, CheckCircle2, Users, Layers, TrendingUp, Clock
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { NavRoute } from '../types';
import SEO from '../components/SEO';

const OperatingPrinciples = [
  {
    number: '01',
    title: 'Grounded Solutions',
    icon: <ShieldCheck size={24} className="text-emerald-400" />,
    description: 'No unnecessary tech buzzwords or pushy sales pitches. We focus strictly on practical workflows that save your team actual hours every week.'
  },
  {
    number: '02',
    title: 'Zero Software Buying Required',
    icon: <Zap size={24} className="text-emerald-400" />,
    description: 'We connect the software tools you already pay for and use daily. No forcing expensive new subscriptions or risky operational overhauls.'
  },
  {
    number: '03',
    title: '100% Atlantic Canada Focus',
    icon: <Users size={24} className="text-emerald-400" />,
    description: 'We understand the unique operational dynamics of businesses in New Brunswick, Nova Scotia, PEI, and Newfoundland. Grounded, responsive local support.'
  },
  {
    number: '04',
    title: 'Guaranteed Time Return',
    icon: <Clock size={24} className="text-emerald-400" />,
    description: 'Every workflow bridge we build is designed to eliminate manual data entry errors and give your staff 10 to 15 hours back every single week.'
  }
];

const TrustMetrics = [
  { value: '10–15 Hrs', label: 'Saved Per Employee / Week', subtext: 'Reclaimed staff payroll' },
  { value: '100%', label: 'Atlantic Canada Focused', subtext: 'NB, NS, PEI, NL support' },
  { value: '99%+ Accuracy', label: 'In Automated Billing & Orders', subtext: 'Eliminate copy-paste typos' },
  { value: '15 Mins', label: 'Free Operational Audit', subtext: 'Instant workflow feedback' }
];

const About: React.FC = () => {
  return (
    <>
      <SEO 
        title="About Oakivo Solutions | Atlantic Canada Automation"
        description="Oakivo Solutions connects your existing accounting software so Atlantic Canada businesses eliminate manual invoicing and reclaim valuable office admin hours."
        canonical="/about"
        keywords="Oakivo Solutions, Invoice Automation Atlantic Canada, Bookkeeping Sync New Brunswick, QuickBooks Integration Nova Scotia, PEI Software Integration"
      />

      {/* Hero Section */}
      <section className="relative pt-12 pb-20 md:pt-20 md:pb-28 border-b border-white/[0.08] overflow-hidden">
        <div className="container mx-auto px-4 md:px-6 relative z-10 max-w-7xl">
          <div className="max-w-4xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full linear-pill backdrop-blur-md">
              <ShieldCheck size={13} className="text-emerald-400" />
              <span className="text-[11px] font-mono-tech font-medium text-gray-300">
                Atlantic Canada Invoice & Bookkeeping Automation
              </span>
            </div>

            <h1 className="text-4xl sm:text-6xl xl:text-7xl font-extrabold tracking-linear-tight text-linear-heading leading-[1.06]">
              Solving Atlantic Canada's Office Hiring Crunch Through <span className="text-linear-accent font-semibold">Invoice Automation.</span>
            </h1>

            {/* Brand Mission Statement */}
            <div className="p-6 md:p-8 rounded-2xl linear-card border border-white/10 space-y-2">
              <span className="text-[10px] font-mono-tech font-bold uppercase tracking-widest text-emerald-400 block">
                Our Core Focus
              </span>
              <p className="text-base md:text-lg text-gray-200 font-normal leading-relaxed tracking-linear-normal">
                Atlantic Canada small businesses face the highest hiring difficulty in the country, especially for administrative and office support positions. Oakivo Solutions connects the invoicing and accounting software you already use (like QuickBooks, Xero, or Sage) so billing and customer records sync automatically—eliminating the need to fill office roles the local market can't supply.
              </p>
              <p className="text-xs text-gray-400 pt-2 italic">
                Note: Automated invoice sync is usually just the first step in a broader long-term relationship. Once your business reclaims staff capacity, we help streamline other daily operational bottlenecks over time.
              </p>
            </div>

            <div className="pt-2 flex items-center gap-4">
              <Link
                to={NavRoute.CONTACT}
                className="px-7 py-4 rounded-full bg-white hover:bg-gray-100 text-black font-semibold text-xs tracking-wide transition-all shadow-[0_0_25px_rgba(255,255,255,0.25)] flex items-center gap-2 group"
              >
                <span>Book Your Free 15-Minute Invoice Audit</span>
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
                <div className="text-[10px] font-mono-tech text-emerald-400 font-medium">
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
            <span className="text-xs font-mono-tech font-medium uppercase tracking-wider text-emerald-400">
              Our Principles
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-linear-tight text-linear-heading">
              Grounded, Practical Values
            </h2>
            <p className="text-sm md:text-base text-[#8A8F98]">
              How we work with business owners across New Brunswick, Nova Scotia, PEI, and Newfoundland.
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

      {/* Comparison Matrix */}
      <section className="py-20 md:py-28 relative border-b border-white/[0.08]">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <div className="max-w-3xl mb-12 space-y-3">
            <span className="text-xs font-mono-tech font-medium uppercase tracking-wider text-emerald-400">
              Why Owners Choose Oakivo
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-linear-tight text-linear-heading">
              The Oakivo Approach vs. Traditional Agencies
            </h2>
          </div>

          <div className="linear-card rounded-2xl border border-white/[0.08] overflow-x-auto">
            <table className="w-full text-left text-xs md:text-sm border-collapse min-w-[600px]">
              <thead>
                <tr className="border-b border-white/10 bg-white/[0.02]">
                  <th className="p-4 md:p-5 font-mono-tech text-gray-400 font-medium uppercase">Parameter</th>
                  <th className="p-4 md:p-5 font-mono-tech text-white font-bold uppercase bg-emerald-500/10">Oakivo Done-For-You Automation</th>
                  <th className="p-4 md:p-5 font-mono-tech text-gray-500 font-medium uppercase">Traditional IT Agencies</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.06] text-gray-300">
                <tr>
                  <td className="p-4 md:p-5 font-semibold text-white">Software Costs</td>
                  <td className="p-4 md:p-5 text-white font-bold bg-emerald-500/5 flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
                    <span>Uses your existing software tools (no new licenses)</span>
                  </td>
                  <td className="p-4 md:p-5 text-gray-400">Forces expensive new ERP or SaaS platform subscriptions</td>
                </tr>
                <tr>
                  <td className="p-4 md:p-5 font-semibold text-white">Language & Communication</td>
                  <td className="p-4 md:p-5 text-white font-bold bg-emerald-500/5 flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
                    <span>Plain English, grounded business consulting</span>
                  </td>
                  <td className="p-4 md:p-5 text-gray-400">Confusing technical jargon and acronyms</td>
                </tr>
                <tr>
                  <td className="p-4 md:p-5 font-semibold text-white">Implementation Speed</td>
                  <td className="p-4 md:p-5 text-white font-bold bg-emerald-500/5 flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
                    <span>Quick workflow bridges running in days</span>
                  </td>
                  <td className="p-4 md:p-5 text-gray-400">Multi-month discovery and expensive consulting retainers</td>
                </tr>
                <tr>
                  <td className="p-4 md:p-5 font-semibold text-white">Target Focus</td>
                  <td className="p-4 md:p-5 text-white font-bold bg-emerald-500/5 flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
                    <span>100% Atlantic Canada businesses & regional growth</span>
                  </td>
                  <td className="p-4 md:p-5 text-gray-400">Generic global templates without local responsiveness</td>
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
                Book Your Free 15-Minute Invoice Audit
              </h2>
              <p className="text-sm md:text-base text-[#8A8F98] max-w-2xl mx-auto">
                No high-pressure sales pitch. We will review your daily invoicing setup and show you how to automate your billing flow—free of charge.
              </p>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to={NavRoute.CONTACT}
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-white hover:bg-gray-100 text-black font-semibold text-xs tracking-wide shadow-[0_0_25px_rgba(255,255,255,0.25)] flex items-center justify-center gap-2 group transition-all"
              >
                <span>Book Your Free 15-Minute Invoice Audit</span>
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
