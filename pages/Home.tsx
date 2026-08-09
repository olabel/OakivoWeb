import React, { useState } from 'react';
import { motion } from 'motion/react';
import KineticHero from '../components/KineticHero';
import LeadDrawer from '../components/LeadDrawer';
import SEO from '../components/SEO';
import { db } from '../utils/database';
import { useLanguage } from '../context/LanguageContext';
import { 
  Sparkles, ArrowRight, CheckCircle2, FileText, AlertCircle, 
  Layers, Clock, ShieldCheck, Zap, Send, Loader2, User, Mail, MapPin, Building2, Users,
  Lock, KeyRound, Shield, Terminal, Activity, Cpu, Database, RefreshCw
} from 'lucide-react';

const Home: React.FC = () => {
  const { t, language } = useLanguage();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [activePillar, setActivePillar] = useState<'modular' | 'deployment' | 'alerting'>('modular');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    bottleneck: ''
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  const handleInlineSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.bottleneck) return;

    setStatus('submitting');
    db.saveEntry('lead', {
      ...formData,
      type: 'INLINE_INVOICE_AUDIT',
      submittedAt: new Date().toISOString()
    });

    await new Promise(resolve => setTimeout(resolve, 1000));
    setStatus('success');
  };

  const faqList = [
    {
      q: 'Do we need to buy new accounting or invoicing software to work with Oakivo?',
      a: 'No. We connect the existing software subscriptions you already pay for (such as QuickBooks, Xero, Sage, or custom billing tools).'
    },
    {
      q: 'How does invoice automation help if we cannot hire office admin staff?',
      a: 'Atlantic Canada has the highest administrative hiring difficulty in Canada. Instead of trying to recruit a scarce office worker, we automate the manual copy-pasting of invoices, payments, and billing records between your tools.'
    },
    {
      q: 'Will this disrupt our daily billing operations during setup?',
      a: 'No daily disruption. We build and test all automated invoice bridges in a isolated sandbox environment before going live.'
    }
  ];

  const schemaData = [
    {
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      'name': 'Oakivo Solutions',
      'description': 'Done-for-you invoice & bookkeeping automation for small and mid-size businesses across Atlantic Canada (New Brunswick, Nova Scotia, Prince Edward Island, Newfoundland & Labrador).',
      'url': 'https://www.oakivo.com',
      'telephone': '+1-800-555-0199',
      'areaServed': [
        { '@type': 'AdministrativeArea', 'name': 'New Brunswick' },
        { '@type': 'AdministrativeArea', 'name': 'Nova Scotia' },
        { '@type': 'AdministrativeArea', 'name': 'Prince Edward Island' },
        { '@type': 'AdministrativeArea', 'name': 'Newfoundland and Labrador' }
      ],
      'address': {
        '@type': 'PostalAddress',
        'addressRegion': 'Atlantic Canada',
        'addressCountry': 'CA'
      }
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      'mainEntity': faqList.map(item => ({
        '@type': 'Question',
        'name': item.q,
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': item.a
        }
      }))
    }
  ];

  return (
    <>
      <SEO 
        title="Invoice & Bookkeeping Automation | Oakivo Solutions"
        description="Can't hire office admin staff in Atlantic Canada? We connect your existing accounting software (QuickBooks, Xero, Sage) so invoices sync automatically."
        canonical="/"
        schema={schemaData}
      />

      <div className="space-y-0 bg-[#070A0F] text-white overflow-hidden">
        
        {/* 1. HERO SECTION */}
        <KineticHero />

        {/* 2. THE PROBLEM (Plain Terms: Atlantic Canada Labour Shortage & Invoicing Friction) */}
        <section className="py-20 md:py-28 bg-[#0B0F17] border-y border-white/10 relative z-20" id="problem-section">
          <div className="container mx-auto px-4 md:px-6 max-w-7xl">
            <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full linear-pill text-[#8A8F98] text-xs font-mono-tech font-medium uppercase tracking-wider">
                <AlertCircle size={14} className="text-amber-400" /> {t('problem.badge')}
              </div>

              <h2 className="text-3xl md:text-5xl font-extrabold tracking-linear-tight text-linear-heading leading-tight">
                {t('problem.title_main')} <br className="hidden sm:inline" />
                <span className="text-linear-accent font-semibold">{t('problem.title_accent')}</span>
              </h2>

              <p className="text-sm md:text-base text-[#8A8F98] font-normal max-w-2xl mx-auto leading-relaxed">
                {t('problem.subtitle')}
              </p>
            </div>

            {/* 3 Concrete Pain Points */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
              
              {/* Pain Point 1: Unfilled Admin Roles */}
              <div className="linear-card rounded-2xl md:rounded-3xl p-8 border border-white/10 space-y-4 relative overflow-hidden flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 font-bold">
                    <Users size={20} />
                  </div>
                  <h3 className="text-xl font-bold text-white">{t('problem.point1_title')}</h3>
                  <p className="text-sm text-[#8A8F98] leading-relaxed">
                    {t('problem.point1_desc')}
                  </p>
                </div>
                <div className="pt-4 border-t border-white/10 text-xs text-amber-300 font-medium flex items-center gap-2">
                  <span>{t('problem.point1_stat')}</span>
                </div>
              </div>

              {/* Pain Point 2: Double Invoicing Entry */}
              <div className="linear-card rounded-2xl md:rounded-3xl p-8 border border-white/10 space-y-4 relative overflow-hidden flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 font-bold">
                    <FileText size={20} />
                  </div>
                  <h3 className="text-xl font-bold text-white">{t('problem.point2_title')}</h3>
                  <p className="text-sm text-[#8A8F98] leading-relaxed">
                    {t('problem.point2_desc')}
                  </p>
                </div>
                <div className="pt-4 border-t border-white/10 text-xs text-amber-300 font-medium flex items-center gap-2">
                  <span>{t('problem.point2_stat')}</span>
                </div>
              </div>

              {/* Pain Point 3: Delayed Payment Visibility */}
              <div className="linear-card rounded-2xl md:rounded-3xl p-8 border border-white/10 space-y-4 relative overflow-hidden flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 font-bold">
                    <Clock size={20} />
                  </div>
                  <h3 className="text-xl font-bold text-white">{t('problem.point3_title')}</h3>
                  <p className="text-sm text-[#8A8F98] leading-relaxed">
                    {t('problem.point3_desc')}
                  </p>
                </div>
                <div className="pt-4 border-t border-white/10 text-xs text-amber-300 font-medium flex items-center gap-2">
                  <span>{t('problem.point3_stat')}</span>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* 3. HOW IT WORKS (Exactly 3 Simple Steps, One Short Sentence Each) */}
        <section className="py-20 md:py-28 bg-[#070A0F] relative overflow-hidden" id="how-it-works">
          <div className="container mx-auto px-4 md:px-6 max-w-7xl">
            <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full linear-pill text-[#8A8F98] text-xs font-mono-tech font-medium uppercase tracking-wider">
                <Sparkles size={14} className="text-emerald-400" /> {t('steps.badge')}
              </div>

              <h2 className="text-3xl md:text-5xl font-extrabold tracking-linear-tight text-linear-heading leading-tight">
                {t('steps.title_main')}<span className="text-linear-accent font-semibold">{t('steps.title_accent')}</span>
              </h2>

              <p className="text-sm md:text-base text-[#8A8F98] font-normal max-w-2xl mx-auto leading-relaxed">
                {t('steps.subtitle')}
              </p>
            </div>

            {/* Exactly 3 Steps */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              
              {/* Step 1 */}
              <div className="bg-[#0B0F17] rounded-2xl md:rounded-3xl p-8 border border-white/10 space-y-5 relative">
                <div className="w-10 h-10 rounded-full bg-white text-black font-extrabold text-sm flex items-center justify-center">
                  1
                </div>
                <h3 className="text-xl font-bold text-white">{t('steps.step1_title')}</h3>
                <p className="text-sm text-[#8A8F98] leading-relaxed">
                  {t('steps.step1_desc')}
                </p>
              </div>

              {/* Step 2 */}
              <div className="bg-[#0B0F17] rounded-2xl md:rounded-3xl p-8 border border-white/10 space-y-5 relative">
                <div className="w-10 h-10 rounded-full bg-white text-black font-extrabold text-sm flex items-center justify-center">
                  2
                </div>
                <h3 className="text-xl font-bold text-white">{t('steps.step2_title')}</h3>
                <p className="text-sm text-[#8A8F98] leading-relaxed">
                  {t('steps.step2_desc')}
                </p>
              </div>

              {/* Step 3 */}
              <div className="bg-[#0B0F17] rounded-2xl md:rounded-3xl p-8 border border-white/10 space-y-5 relative">
                <div className="w-10 h-10 rounded-full bg-white text-black font-extrabold text-sm flex items-center justify-center">
                  3
                </div>
                <h3 className="text-xl font-bold text-white">{t('steps.step3_title')}</h3>
                <p className="text-sm text-[#8A8F98] leading-relaxed">
                  {t('steps.step3_desc')}
                </p>
              </div>

            </div>
          </div>
        </section>

        {/* 4. PROOF / OUTCOMES (Reconciled Metrics & Sourced Regional Stat) */}
        <section className="py-20 md:py-28 bg-[#0B0F17] border-y border-white/10 relative overflow-hidden" id="outcomes">
          <div className="container mx-auto px-4 md:px-6 max-w-7xl">
            <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full linear-pill text-[#8A8F98] text-xs font-mono-tech font-medium uppercase tracking-wider">
                <CheckCircle2 size={14} className="text-emerald-400" /> {t('outcomes.badge')}
              </div>

              <h2 className="text-3xl md:text-5xl font-extrabold tracking-linear-tight text-linear-heading leading-tight">
                {t('outcomes.title_main')}<span className="text-linear-accent font-semibold">{t('outcomes.title_accent')}</span>
              </h2>
            </div>

            {/* 3 Outcome Statements */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
              
              {/* Metric 1 */}
              <div className="linear-card rounded-2xl md:rounded-3xl p-8 border border-white/10 space-y-4 text-center">
                <div className="text-4xl md:text-5xl font-mono-tech font-extrabold text-white tracking-tight">
                  {t('outcomes.metric1_val')}
                </div>
                <h3 className="text-lg font-bold text-emerald-400">{t('outcomes.metric1_title')}</h3>
                <p className="text-xs md:text-sm text-[#8A8F98] leading-relaxed">
                  {t('outcomes.metric1_desc')}
                </p>
              </div>

              {/* Metric 2 */}
              <div className="linear-card rounded-2xl md:rounded-3xl p-8 border border-white/10 space-y-4 text-center">
                <div className="text-4xl md:text-5xl font-mono-tech font-extrabold text-white tracking-tight">
                  {t('outcomes.metric2_val')}
                </div>
                <h3 className="text-lg font-bold text-emerald-400">{t('outcomes.metric2_title')}</h3>
                <p className="text-xs md:text-sm text-[#8A8F98] leading-relaxed">
                  {t('outcomes.metric2_desc')}
                </p>
              </div>

              {/* Metric 3: Regional Sourced Stat */}
              <div className="linear-card rounded-2xl md:rounded-3xl p-8 border border-white/10 space-y-4 text-center bg-emerald-950/20 border-emerald-500/20">
                <div className="text-4xl md:text-5xl font-mono-tech font-extrabold text-emerald-400 tracking-tight">
                  {t('outcomes.metric3_val')}
                </div>
                <h3 className="text-lg font-bold text-white">{t('outcomes.metric3_title')}</h3>
                <p className="text-xs md:text-sm text-[#8A8F98] leading-relaxed">
                  {t('outcomes.metric3_desc')}
                </p>
              </div>

            </div>

            {/* Interactive Engineering & Reliability Console */}
            <div className="space-y-8 max-w-5xl mx-auto text-center">
              
              <div className="linear-card rounded-3xl p-6 md:p-10 border border-white/10 space-y-6 text-left shadow-2xl relative overflow-hidden">
                <p className="text-base md:text-lg text-gray-200 leading-relaxed font-normal">
                  {t('outcomes.proof_desc')}
                </p>

                {/* Interactive Pillar Selector Tabs */}
                <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-2xl bg-black/60 border border-white/10">
                  <button
                    type="button"
                    onClick={() => setActivePillar('modular')}
                    className={`flex-1 min-w-[140px] px-4 py-3 rounded-xl text-xs font-mono-tech font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer ${
                      activePillar === 'modular'
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-lg'
                        : 'text-gray-400 hover:text-white hover:bg-white/5 border border-transparent'
                    }`}
                  >
                    <Layers size={14} className={activePillar === 'modular' ? 'text-emerald-400' : 'text-gray-500'} />
                    <span>{t('outcomes.proof_pillar1_title')}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setActivePillar('deployment')}
                    className={`flex-1 min-w-[140px] px-4 py-3 rounded-xl text-xs font-mono-tech font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer ${
                      activePillar === 'deployment'
                        ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-lg'
                        : 'text-gray-400 hover:text-white hover:bg-white/5 border border-transparent'
                    }`}
                  >
                    <Zap size={14} className={activePillar === 'deployment' ? 'text-cyan-400' : 'text-gray-500'} />
                    <span>{t('outcomes.proof_pillar2_title')}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setActivePillar('alerting')}
                    className={`flex-1 min-w-[140px] px-4 py-3 rounded-xl text-xs font-mono-tech font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer ${
                      activePillar === 'alerting'
                        ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-lg'
                        : 'text-gray-400 hover:text-white hover:bg-white/5 border border-transparent'
                    }`}
                  >
                    <Sparkles size={14} className={activePillar === 'alerting' ? 'text-amber-400' : 'text-gray-500'} />
                    <span>{t('outcomes.proof_pillar3_title')}</span>
                  </button>
                </div>

                {/* Interactive Console Content Body */}
                <motion.div 
                  key={activePillar}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className="p-6 rounded-2xl bg-[#080B10] border border-white/10 space-y-4 font-mono-tech"
                >
                  {activePillar === 'modular' && (
                    <div className="space-y-4">
                      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-3">
                        <div className="flex items-center gap-2 text-xs text-emerald-400 font-bold">
                          <Terminal size={14} />
                          <span>ARCHITECTURE : DECOUPLED CONNECTOR MATRIX</span>
                        </div>
                        <div className="text-[10px] text-gray-400 bg-white/5 px-2.5 py-1 rounded-md border border-white/10">
                          STATUS: 99.98% SCHEMA INTEGRITY
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                        <div className="p-3 rounded-lg bg-white/5 border border-white/10 space-y-1">
                          <span className="text-[10px] text-gray-500 uppercase block">Input Source</span>
                          <span className="text-white font-semibold">Invoices, Work Orders, CSV</span>
                        </div>
                        <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/30 space-y-1">
                          <span className="text-[10px] text-emerald-400 uppercase block">Oakivo Schema Validator</span>
                          <span className="text-emerald-300 font-semibold">Zero-Loss Data Mapping</span>
                        </div>
                        <div className="p-3 rounded-lg bg-white/5 border border-white/10 space-y-1">
                          <span className="text-[10px] text-gray-500 uppercase block">Target Ledger</span>
                          <span className="text-white font-semibold">QuickBooks, Xero, Sage</span>
                        </div>
                      </div>

                      <p className="text-xs text-gray-400 font-sans leading-relaxed pt-1">
                        {t('outcomes.proof_pillar1_desc')} Every automated connector isolates data transformation logic from accounting API rate limits to ensure zero lost transactions.
                      </p>
                    </div>
                  )}

                  {activePillar === 'deployment' && (
                    <div className="space-y-4">
                      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-3">
                        <div className="flex items-center gap-2 text-xs text-cyan-400 font-bold">
                          <Activity size={14} />
                          <span>DEPLOYMENT : ZERO-DOWNTIME SANDBOX PIPELINE</span>
                        </div>
                        <div className="text-[10px] text-cyan-300 bg-cyan-500/10 px-2.5 py-1 rounded-md border border-cyan-500/30">
                          ENVIRONMENT: ISOLATED TEST SANDBOX
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                        <div className="p-3 rounded-lg bg-white/5 border border-white/10 space-y-1">
                          <span className="text-[10px] text-gray-500 uppercase block">Stage 1</span>
                          <span className="text-white font-semibold">Pre-Flight Payload Audit</span>
                        </div>
                        <div className="p-3 rounded-lg bg-cyan-500/10 border border-cyan-500/30 space-y-1">
                          <span className="text-[10px] text-cyan-400 uppercase block">Stage 2: Parallel Test</span>
                          <span className="text-cyan-300 font-semibold">Zero Daily Disruption</span>
                        </div>
                        <div className="p-3 rounded-lg bg-white/5 border border-white/10 space-y-1">
                          <span className="text-[10px] text-gray-500 uppercase block">Stage 3</span>
                          <span className="text-white font-semibold">Instant Production Cutover</span>
                        </div>
                      </div>

                      <p className="text-xs text-gray-400 font-sans leading-relaxed pt-1">
                        {t('outcomes.proof_pillar2_desc')} All data mapping scripts run in an isolated staging layer first. Your business billing operations continue uninterrupted.
                      </p>
                    </div>
                  )}

                  {activePillar === 'alerting' && (
                    <div className="space-y-4">
                      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-3">
                        <div className="flex items-center gap-2 text-xs text-amber-400 font-bold">
                          <RefreshCw size={14} className="animate-spin" style={{ animationDuration: '4s' }} />
                          <span>ALERTING : REAL-TIME HEALTH MONITOR & FALLBACK</span>
                        </div>
                        <div className="text-[10px] text-amber-300 bg-amber-500/10 px-2.5 py-1 rounded-md border border-amber-500/30">
                          LATENCY: &lt; 120ms
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                        <div className="p-3 rounded-lg bg-white/5 border border-white/10 space-y-1">
                          <span className="text-[10px] text-gray-500 uppercase block">API Monitor</span>
                          <span className="text-white font-semibold">24/7 Heartbeat Pulse</span>
                        </div>
                        <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/30 space-y-1">
                          <span className="text-[10px] text-amber-400 uppercase block">Retry Handler</span>
                          <span className="text-amber-300 font-semibold">Exponential Backoff</span>
                        </div>
                        <div className="p-3 rounded-lg bg-white/5 border border-white/10 space-y-1">
                          <span className="text-[10px] text-gray-500 uppercase block">Owner Notification</span>
                          <span className="text-white font-semibold">Instant Alert & Log</span>
                        </div>
                      </div>

                      <p className="text-xs text-gray-400 font-sans leading-relaxed pt-1">
                        {t('outcomes.proof_pillar3_desc')} Automated fallback mechanisms catch third-party accounting API outages instantly, queuing invoices safely until service restores.
                      </p>
                    </div>
                  )}
                </motion.div>
              </div>

              {/* Security & Compliance Standards Row */}
              <div className="space-y-4 text-center pt-4">
                <div className="inline-flex items-center gap-2 text-xs font-mono-tech text-gray-400 uppercase tracking-widest">
                  <Shield size={14} className="text-emerald-400" />
                  <span>{t('outcomes.security_title')}</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
                  {/* Badge 1: Data Encryption */}
                  <div className="linear-card rounded-2xl p-5 border border-white/10 hover:border-emerald-500/40 transition-all space-y-2 group">
                    <div className="flex items-center justify-between">
                      <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 group-hover:scale-105 transition-transform">
                        <Lock size={18} />
                      </div>
                      <span className="text-[10px] font-mono-tech font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                        256-Bit AES
                      </span>
                    </div>
                    <h3 className="text-sm font-bold text-white tracking-tight">{t('outcomes.security1_title')}</h3>
                    <p className="text-xs text-gray-400 leading-relaxed">{t('outcomes.security1_desc')}</p>
                  </div>

                  {/* Badge 2: API Security Standards */}
                  <div className="linear-card rounded-2xl p-5 border border-white/10 hover:border-cyan-500/40 transition-all space-y-2 group">
                    <div className="flex items-center justify-between">
                      <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 group-hover:scale-105 transition-transform">
                        <KeyRound size={18} />
                      </div>
                      <span className="text-[10px] font-mono-tech font-bold uppercase tracking-wider text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20">
                        OAuth 2.0
                      </span>
                    </div>
                    <h3 className="text-sm font-bold text-white tracking-tight">{t('outcomes.security2_title')}</h3>
                    <p className="text-xs text-gray-400 leading-relaxed">{t('outcomes.security2_desc')}</p>
                  </div>

                  {/* Badge 3: Regional Compliance */}
                  <div className="linear-card rounded-2xl p-5 border border-white/10 hover:border-emerald-500/40 transition-all space-y-2 group">
                    <div className="flex items-center justify-between">
                      <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 group-hover:scale-105 transition-transform">
                        <ShieldCheck size={18} />
                      </div>
                      <span className="text-[10px] font-mono-tech font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                        PIPEDA / CAN
                      </span>
                    </div>
                    <h3 className="text-sm font-bold text-white tracking-tight">{t('outcomes.security3_title')}</h3>
                    <p className="text-xs text-gray-400 leading-relaxed">{t('outcomes.security3_desc')}</p>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </section>

        {/* 5. SINGLE CTA + LEAD FORM */}
        <section className="py-20 md:py-28 bg-[#070A0F] relative overflow-hidden" id="audit-form">
          <div className="container mx-auto px-4 md:px-6 max-w-4xl">
            <div className="linear-card rounded-3xl md:rounded-[36px] p-8 md:p-14 border border-white/10 space-y-8 relative overflow-hidden shadow-2xl">
              
              <div className="text-center space-y-4 max-w-2xl mx-auto">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono-tech font-bold uppercase tracking-wider">
                  <Clock size={14} /> {t('drawer.tag')}
                </div>

                <h2 className="text-3xl md:text-5xl font-extrabold tracking-linear-tight text-white leading-tight">
                  {t('drawer.title')}
                </h2>

                <p className="text-sm md:text-base text-[#8A8F98] leading-relaxed">
                  {t('drawer.desc')}
                </p>
              </div>

              {/* 3 Form Fields Maximum */}
              {status === 'success' ? (
                <div className="py-8 text-center space-y-4 bg-white/5 rounded-2xl p-8 border border-white/10">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                    <CheckCircle2 size={36} />
                  </div>
                  <h3 className="text-2xl font-bold text-white">{t('drawer.success_title')}</h3>
                  <p className="text-sm text-gray-300 max-w-md mx-auto">
                    {t('drawer.success_desc')}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleInlineSubmit} className="space-y-6 max-w-xl mx-auto">
                  
                  {/* Field 1: Name */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono-tech font-bold uppercase tracking-wider text-gray-300 block">
                      {t('drawer.name_label')}
                    </label>
                    <div className="relative">
                      <User size={18} className="absolute left-4 top-3.5 text-gray-500" />
                      <input
                        type="text"
                        required
                        placeholder={t('drawer.name_placeholder')}
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 py-3.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-white transition-colors"
                      />
                    </div>
                  </div>

                  {/* Field 2: Work Email */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono-tech font-bold uppercase tracking-wider text-gray-300 block">
                      {t('drawer.email_label')}
                    </label>
                    <div className="relative">
                      <Mail size={18} className="absolute left-4 top-3.5 text-gray-500" />
                      <input
                        type="email"
                        required
                        placeholder={t('drawer.email_placeholder')}
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 py-3.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-white transition-colors"
                      />
                    </div>
                  </div>

                  {/* Field 3: Bottleneck */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono-tech font-bold uppercase tracking-wider text-gray-300 block">
                      {t('drawer.bottleneck_label')}
                    </label>
                    <textarea
                      rows={4}
                      required
                      placeholder={t('drawer.bottleneck_placeholder')}
                      value={formData.bottleneck}
                      onChange={(e) => setFormData({ ...formData, bottleneck: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-white transition-colors resize-none"
                    />
                  </div>

                  {/* CTA Button */}
                  <button
                    type="submit"
                    disabled={status === 'submitting'}
                    className="w-full py-4 rounded-full bg-white hover:bg-gray-100 text-black font-bold text-sm tracking-wide transition-all shadow-[0_0_25px_rgba(255,255,255,0.25)] flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {status === 'submitting' ? (
                      <>
                        <Loader2 size={18} className="animate-spin text-black" />
                        <span>{t('drawer.submitting')}</span>
                      </>
                    ) : (
                      <>
                        <Send size={16} />
                        <span>{t('common.cta_book_invoice_audit')}</span>
                      </>
                    )}
                  </button>

                  <p className="text-center text-xs text-gray-500">
                    {t('common.guarantee')}
                  </p>
                </form>
              )}

            </div>
          </div>
        </section>

        {/* 6. TRUST & REGIONAL COVERAGE FOOTER SECTION */}
        <section className="py-12 bg-[#0B0F17] border-t border-white/10 text-center">
          <div className="container mx-auto px-4 md:px-6 max-w-5xl space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider font-mono-tech">
              Serving All Four Atlantic Canada Provinces & Smaller Communities
            </h4>
            <p className="text-xs text-gray-400 leading-relaxed max-w-3xl mx-auto">
              We directly support businesses in <strong className="text-gray-200">New Brunswick</strong> (Moncton, Saint John, Fredericton, Dieppe, Miramichi), <strong className="text-gray-200">Nova Scotia</strong> (Halifax, Dartmouth, Sydney, Truro, New Glasgow), <strong className="text-gray-200">Prince Edward Island</strong> (Charlottetown, Summerside), and <strong className="text-gray-200">Newfoundland & Labrador</strong> (St. John's, Corner Brook)—not just the capital hubs.
            </p>
            <p className="text-[11px] text-gray-500 max-w-2xl mx-auto italic">
              Note: Automated invoice & bookkeeping sync is typically our first step together. Once your team reclaims administrative capacity, we help with broader operational efficiency over time.
            </p>
          </div>
        </section>

        <LeadDrawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />
      </div>
    </>
  );
};

export default Home;

