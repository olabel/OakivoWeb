import React, { useState } from 'react';
import { motion } from 'motion/react';
import KineticHero from '../components/KineticHero';
import LeadDrawer from '../components/LeadDrawer';
import SEO from '../components/SEO';
import { db } from '../utils/database';
import { useLanguage } from '../context/LanguageContext';
import { 
  Sparkles, ArrowRight, CheckCircle2, FileText, AlertCircle, 
  Layers, Clock, ShieldCheck, Zap, Send, Loader2, User, Mail, MapPin, Building2, Users
} from 'lucide-react';

const Home: React.FC = () => {
  const { t, language } = useLanguage();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
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

            {/* 3 Regional Client Spotlights */}
            <div className="space-y-6 max-w-6xl mx-auto">
              <h3 className="text-xl font-bold text-white text-center">{t('outcomes.proof_title')}</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                
                {/* Spotlight 1 */}
                <div className="linear-card rounded-3xl p-8 border border-white/10 space-y-4 flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-xs text-gray-400 font-mono-tech">
                      <span className="flex items-center gap-1"><MapPin size={12} className="text-emerald-400" /> {t('outcomes.proof1_loc')}</span>
                      <span className="text-emerald-400 font-bold">{t('outcomes.proof1_saved')}</span>
                    </div>
                    <h4 className="text-lg font-bold text-white">{t('outcomes.proof1_title')}</h4>
                    <p className="text-xs text-[#8A8F98] leading-relaxed">
                      {t('outcomes.proof1_quote')}
                    </p>
                  </div>
                  <div className="pt-4 border-t border-white/10 text-[11px] text-gray-400 font-mono-tech">
                    Order Confirmation → QuickBooks Sync
                  </div>
                </div>

                {/* Spotlight 2 */}
                <div className="linear-card rounded-3xl p-8 border border-white/10 space-y-4 flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-xs text-gray-400 font-mono-tech">
                      <span className="flex items-center gap-1"><MapPin size={12} className="text-emerald-400" /> {t('outcomes.proof2_loc')}</span>
                      <span className="text-emerald-400 font-bold">{t('outcomes.proof2_saved')}</span>
                    </div>
                    <h4 className="text-lg font-bold text-white">{t('outcomes.proof2_title')}</h4>
                    <p className="text-xs text-[#8A8F98] leading-relaxed">
                      {t('outcomes.proof2_quote')}
                    </p>
                  </div>
                  <div className="pt-4 border-t border-white/10 text-[11px] text-gray-400 font-mono-tech">
                    Work Order → Xero Automated Sync
                  </div>
                </div>

                {/* Spotlight 3 */}
                <div className="linear-card rounded-3xl p-8 border border-white/10 space-y-4 flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-xs text-gray-400 font-mono-tech">
                      <span className="flex items-center gap-1"><MapPin size={12} className="text-emerald-400" /> {t('outcomes.proof3_loc')}</span>
                      <span className="text-emerald-400 font-bold">{t('outcomes.proof3_saved')}</span>
                    </div>
                    <h4 className="text-lg font-bold text-white">{t('outcomes.proof3_title')}</h4>
                    <p className="text-xs text-[#8A8F98] leading-relaxed">
                      {t('outcomes.proof3_quote')}
                    </p>
                  </div>
                  <div className="pt-4 border-t border-white/10 text-[11px] text-gray-400 font-mono-tech">
                    Billing Records & Inventory Bridge
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

