import React from 'react';
import { 
  ArrowRight, ShieldCheck, Zap, Layers, CheckCircle2, 
  Sparkles, RefreshCw, Clock, ArrowUpRight
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { NavRoute } from '../types';
import SEO from '../components/SEO';

const Services: React.FC = () => {
  const corePillars = [
    {
      id: 'software-integration',
      title: 'Connecting the Software Tools You Already Use.',
      tagline: 'Seamless System Integration & Custom Data Bridges',
      icon: <RefreshCw size={28} className="text-emerald-400" />,
      problem: 'Your team is forced to act as human bridges—manually copy-pasting data between separate accounting, scheduling, and inventory systems.',
      capabilities: [
        'Automatic invoice and order data transfer',
        'Real-time inventory and customer record sync',
        'Elimination of double data entry and typo errors',
        'Zero forced software upgrades or subscription changes'
      ],
      outcomeMetric: '100% Automated Data Sync',
      outcomeDesc: 'Eliminated manual copy-pasting across accounting, shipping, and sales tools with zero disruption to daily work.'
    },
    {
      id: 'admin-automation',
      title: 'Eliminating Hours of Repetitive Admin Work Every Week.',
      tagline: 'Done-For-You Workflow Automation',
      icon: <Zap size={28} className="text-emerald-400" />,
      problem: 'Staff spends valuable payroll hours on tedious manual tasks instead of serving customers and growing your revenue.',
      capabilities: [
        'Automated order processing and confirmation emails',
        'Instant digital document generation and filing',
        'Scheduled automated status reports for management',
        'Custom workflow triggers for immediate team notifications'
      ],
      outcomeMetric: '10–15 Hrs Saved / Week',
      outcomeDesc: 'Reclaimed hundreds of staff payroll hours every month by automating repetitive daily paperwork.'
    },
    {
      id: 'operational-visibility',
      title: 'Real-Time Operational Visibility Without Manual Spreadsheets.',
      tagline: 'Unified Business Data & Reporting',
      icon: <Layers size={28} className="text-emerald-400" />,
      problem: 'Owners and general managers wait days for weekly numbers because operational data lives scattered across disconnected spreadsheets.',
      capabilities: [
        'Automated weekly operational summary reports',
        'Live tracking of active orders and fulfillment queues',
        'Error detection alerts before wrong billing goes out',
        'Clean data structure tailored specifically for your team\'s needs'
      ],
      outcomeMetric: 'Real-Time Decision Intelligence',
      outcomeDesc: 'Gave owners instant access to exact business numbers without waiting for manual weekly report collation.'
    }
  ];

  const processSteps = [
    {
      step: '01',
      title: 'Identify Bottlenecks',
      subtitle: 'Free 15-Minute Operational Audit',
      description: 'We review your daily workflow with you and pinpoint the exact manual copy-paste tasks and data entry bottlenecks draining your team’s weekly payroll hours.'
    },
    {
      step: '02',
      title: 'Connect Existing Tools',
      subtitle: 'Seamless System Integration',
      description: 'We build invisible bridges between your current software tools so orders, invoices, and customer records move automatically without human intervention.'
    },
    {
      step: '03',
      title: 'Reclaim Staff Time',
      subtitle: 'Full Workflow Handoff & Support',
      description: 'Your team gets hours back every week to focus on actual revenue-generating work, backed by our hands-on support and local Atlantic Canada team.'
    }
  ];

  return (
    <>
      <SEO 
        title="Done-For-You Workflow Automation & Integrations | Oakivo Solutions"
        description="We connect the software tools you already use so your team stops wasting hours on manual data entry across Atlantic Canada."
        canonical="/services"
      />

      {/* Hero Section */}
      <section className="relative pt-12 pb-20 md:pt-20 md:pb-28 border-b border-white/[0.08] overflow-hidden">
        <div className="container mx-auto px-4 md:px-6 relative z-10 max-w-7xl">
          <div className="max-w-4xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full linear-pill backdrop-blur-md">
              <Sparkles size={13} className="text-emerald-400" />
              <span className="text-[11px] font-mono-tech font-medium text-gray-300">
                Done-For-You Invoice & Bookkeeping Automation
              </span>
            </div>

            <h1 className="text-4xl sm:text-6xl xl:text-7xl font-extrabold tracking-linear-tight text-linear-heading leading-[1.06]">
              Stop Wasting Hours on <span className="text-linear-accent font-semibold">Manual Invoicing & Data Entry.</span>
            </h1>

            <p className="text-lg md:text-xl text-[#8A8F98] font-normal leading-relaxed max-w-3xl tracking-linear-normal">
              We connect the invoicing, dispatch, and accounting software you already use so your team stops losing payroll hours to manual copy-pasting and billing errors. Zero new software subscriptions required.
            </p>

            <div className="pt-4 flex flex-wrap items-center gap-4">
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

      {/* Core Pillars */}
      <section id="core-pillars" className="py-20 md:py-28 relative border-b border-white/[0.08]">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <div className="max-w-3xl mb-16 space-y-3">
            <span className="text-xs font-mono-tech font-medium uppercase tracking-wider text-emerald-400">
              What We Do
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-linear-tight text-linear-heading">
              How We Streamline Your Business Operations
            </h2>
            <p className="text-sm md:text-base text-[#8A8F98]">
              Grounded, practical system integration tailored for business owners across New Brunswick, Nova Scotia, PEI, and Newfoundland.
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
                  
                  {/* Left Column */}
                  <div className="lg:col-span-5 space-y-4">
                    <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                      {pillar.icon}
                    </div>
                    <div>
                      <span className="text-xs font-mono-tech text-gray-400 uppercase tracking-wider block">
                        {pillar.tagline}
                      </span>
                      <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-white mt-1">
                        {pillar.title}
                      </h3>
                    </div>

                    <div className="p-4 rounded-xl bg-black/40 border border-white/[0.06] space-y-1.5">
                      <span className="text-[10px] font-mono-tech font-semibold text-amber-400 uppercase tracking-wider block">
                        Common Problem
                      </span>
                      <p className="text-xs md:text-sm text-gray-300 leading-relaxed">
                        {pillar.problem}
                      </p>
                    </div>
                  </div>

                  {/* Right Column */}
                  <div className="lg:col-span-7 space-y-6 lg:pl-6 lg:border-l lg:border-white/[0.08]">
                    <div>
                      <h4 className="text-xs font-mono-tech font-medium uppercase tracking-wider text-[#8A8F98] mb-4">
                        What We Implement
                      </h4>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {pillar.capabilities.map((cap, i) => (
                          <li key={i} className="flex items-start gap-2.5 text-xs md:text-sm text-gray-200">
                            <CheckCircle2 size={16} className="text-emerald-400 shrink-0 mt-0.5" />
                            <span>{cap}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="p-5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                      <div>
                        <span className="text-[10px] font-mono-tech text-emerald-400 font-bold uppercase tracking-wider block">
                          Real Business Result
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

      {/* 3-Step Process */}
      <section className="py-20 md:py-28 relative border-b border-white/[0.08]">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <div className="max-w-3xl mb-16 space-y-3">
            <span className="text-xs font-mono-tech font-medium uppercase tracking-wider text-emerald-400">
              The Simple Process
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-linear-tight text-linear-heading">
              3 Steps to Eliminate Manual Admin
            </h2>
            <p className="text-sm md:text-base text-[#8A8F98]">
              A straightforward, zero-risk approach designed specifically for busy operations teams.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {processSteps.map((proc, idx) => (
              <div 
                key={idx}
                className="linear-card rounded-2xl p-8 border border-white/[0.08] relative group flex flex-col justify-between space-y-4"
              >
                <div className="space-y-4">
                  <div className="w-10 h-10 rounded-full bg-white text-black font-extrabold text-sm flex items-center justify-center">
                    {idx + 1}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">
                      {proc.title}
                    </h3>
                    <p className="text-xs font-mono-tech text-emerald-400 mt-0.5">
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
      <section className="py-20 md:py-28 relative">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <div className="linear-card rounded-2xl md:rounded-3xl p-8 md:p-14 border border-white/[0.08] text-center space-y-6 relative overflow-hidden">
            <div className="max-w-3xl mx-auto space-y-4">
              <span className="inline-block px-3.5 py-1.5 rounded-full linear-pill text-emerald-400 text-xs font-mono-tech uppercase font-bold">
                Free 15-Minute Invoice Audit
              </span>
              <h2 className="text-3xl md:text-5xl font-extrabold tracking-linear-tight text-linear-heading">
                Book Your Free 15-Minute Invoice Audit
              </h2>
              <p className="text-sm md:text-base text-[#8A8F98] max-w-2xl mx-auto">
                No high-pressure sales pitch. One of our senior automation specialists will look at your daily invoicing workflow and show you where time is being lost—100% free of charge.
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

export default Services;
