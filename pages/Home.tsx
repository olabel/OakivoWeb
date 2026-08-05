import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Helmet } from 'react-helmet-async';
import KineticHero from '../components/KineticHero';
import LeadDrawer from '../components/LeadDrawer';
import { db } from '../utils/database';
import { 
  Sparkles, ArrowRight, CheckCircle2, FileText, AlertCircle, 
  Layers, Clock, ShieldCheck, Zap, Send, Loader2, User, Mail
} from 'lucide-react';

const Home: React.FC = () => {
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
      type: 'INLINE_HOMEPAGE_AUDIT',
      submittedAt: new Date().toISOString()
    });

    await new Promise(resolve => setTimeout(resolve, 1000));
    setStatus('success');
  };

  return (
    <>
      <Helmet>
        <title>Oakivo Solutions | Done-For-You Workflow & System Automation in Atlantic Canada</title>
        <meta name="description" content="We connect the software you already use so your team stops wasting hours on manual data entry, copy-pasting between systems, and repetitive admin work across Atlantic Canada." />
      </Helmet>

      <div className="space-y-0 bg-[#070A0F] text-white overflow-hidden">
        
        {/* 1. HERO SECTION */}
        <KineticHero />

        {/* 2. THE REALITY (Regional Pain Points) */}
        <section className="py-20 md:py-28 bg-[#0B0F17] border-y border-white/10 relative z-20">
          <div className="container mx-auto px-4 md:px-6 max-w-7xl">
            <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full linear-pill text-[#8A8F98] text-xs font-mono-tech font-medium uppercase tracking-wider">
                <AlertCircle size={14} className="text-amber-400" /> Regional Pain Points
              </div>

              <h2 className="text-3xl md:text-5xl font-extrabold tracking-linear-tight text-linear-heading leading-tight">
                The Daily Operational Reality for <br className="hidden sm:inline" />
                <span className="text-linear-accent font-semibold">Atlantic Canada Businesses</span>
              </h2>

              <p className="text-sm md:text-base text-[#8A8F98] font-normal max-w-2xl mx-auto leading-relaxed">
                If your staff is spending hours moving numbers between apps, you are paying full-time salaries for copy-paste admin work.
              </p>
            </div>

            {/* 3 Pain Point Scenarios Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              
              {/* Scenario 1: The Double-Entry Trap */}
              <div className="linear-card rounded-2xl md:rounded-3xl p-8 border border-white/10 space-y-4 relative overflow-hidden flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 font-bold">
                    01
                  </div>
                  <h3 className="text-xl font-bold text-white">The Double-Entry Trap</h3>
                  <p className="text-sm text-[#8A8F98] leading-relaxed">
                    Staff manually typing invoice data, shipping addresses, or customer information from emails directly into your accounting or inventory software.
                  </p>
                </div>
                <div className="pt-4 border-t border-white/10 text-xs text-amber-300 font-medium flex items-center gap-2">
                  <span>Wastes 10–15 hours of staff time per week</span>
                </div>
              </div>

              {/* Scenario 2: Information Silos */}
              <div className="linear-card rounded-2xl md:rounded-3xl p-8 border border-white/10 space-y-4 relative overflow-hidden flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 font-bold">
                    02
                  </div>
                  <h3 className="text-xl font-bold text-white">Information Silos</h3>
                  <p className="text-sm text-[#8A8F98] leading-relaxed">
                    Management waiting days for basic weekly numbers because your operational data lives scattered across separate spreadsheets and legacy tools.
                  </p>
                </div>
                <div className="pt-4 border-t border-white/10 text-xs text-amber-300 font-medium flex items-center gap-2">
                  <span>Delays crucial business decisions</span>
                </div>
              </div>

              {/* Scenario 3: Scalability Wall */}
              <div className="linear-card rounded-2xl md:rounded-3xl p-8 border border-white/10 space-y-4 relative overflow-hidden flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 font-bold">
                    03
                  </div>
                  <h3 className="text-xl font-bold text-white">The Scalability Wall</h3>
                  <p className="text-sm text-[#8A8F98] leading-relaxed">
                    Wanting to take on more orders or expand operations, but being forced to hire extra admin staff just to handle the endless paperwork mountain.
                  </p>
                </div>
                <div className="pt-4 border-t border-white/10 text-xs text-amber-300 font-medium flex items-center gap-2">
                  <span>Eats away your operational margins</span>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* 3. THE SIMPLE SOLUTION (What We Actually Do) */}
        <section className="py-20 md:py-28 bg-[#070A0F] relative overflow-hidden">
          <div className="container mx-auto px-4 md:px-6 max-w-7xl">
            <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full linear-pill text-[#8A8F98] text-xs font-mono-tech font-medium uppercase tracking-wider">
                <Sparkles size={14} className="text-emerald-400" /> Done-For-You Workflow Automation
              </div>

              <h2 className="text-3xl md:text-5xl font-extrabold tracking-linear-tight text-linear-heading leading-tight">
                How We Fix It in <span className="text-linear-accent font-semibold">3 Simple Steps</span>
              </h2>

              <p className="text-sm md:text-base text-[#8A8F98] font-normal max-w-2xl mx-auto leading-relaxed">
                No expensive new software subscriptions to buy. No risky system overhauls. We make your existing tools work together seamlessly.
              </p>
            </div>

            {/* 3 Steps */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              
              {/* Step 1 */}
              <div className="bg-[#0B0F17] rounded-2xl md:rounded-3xl p-8 border border-white/10 space-y-5 relative">
                <div className="w-10 h-10 rounded-full bg-white text-black font-extrabold text-sm flex items-center justify-center">
                  1
                </div>
                <h3 className="text-2xl font-bold text-white">Spot the Bottlenecks</h3>
                <p className="text-sm text-[#8A8F98] leading-relaxed">
                  We review your daily workflow and pinpoint exact areas where your staff wastes the most time on manual data entry and repetitive admin work.
                </p>
              </div>

              {/* Step 2 */}
              <div className="bg-[#0B0F17] rounded-2xl md:rounded-3xl p-8 border border-white/10 space-y-5 relative">
                <div className="w-10 h-10 rounded-full bg-white text-black font-extrabold text-sm flex items-center justify-center">
                  2
                </div>
                <h3 className="text-2xl font-bold text-white">Connect Your Tools</h3>
                <p className="text-sm text-[#8A8F98] leading-relaxed">
                  We build invisible bridges between your existing software so invoice, customer, scheduling, and inventory data moves automatically.
                </p>
              </div>

              {/* Step 3 */}
              <div className="bg-[#0B0F17] rounded-2xl md:rounded-3xl p-8 border border-white/10 space-y-5 relative">
                <div className="w-10 h-10 rounded-full bg-white text-black font-extrabold text-sm flex items-center justify-center">
                  3
                </div>
                <h3 className="text-2xl font-bold text-white">Reclaim Your Payroll</h3>
                <p className="text-sm text-[#8A8F98] leading-relaxed">
                  Your team gets hours back every week to focus on actual revenue-generating tasks and providing outstanding service to your clients.
                </p>
              </div>

            </div>
          </div>
        </section>

        {/* 4. REAL BUSINESS OUTCOMES (No Fluff Metrics) */}
        <section className="py-20 md:py-28 bg-[#0B0F17] border-y border-white/10 relative overflow-hidden">
          <div className="container mx-auto px-4 md:px-6 max-w-7xl">
            <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full linear-pill text-[#8A8F98] text-xs font-mono-tech font-medium uppercase tracking-wider">
                <CheckCircle2 size={14} className="text-emerald-400" /> Measurable Time & Money Saved
              </div>

              <h2 className="text-3xl md:text-5xl font-extrabold tracking-linear-tight text-linear-heading leading-tight">
                Real Business Outcomes, <span className="text-linear-accent font-semibold">Zero Fluff</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              
              {/* Metric 1 */}
              <div className="linear-card rounded-2xl md:rounded-3xl p-8 border border-white/10 space-y-4 text-center">
                <div className="text-4xl md:text-5xl font-mono-tech font-extrabold text-white tracking-tight">
                  10–20 Hours
                </div>
                <h3 className="text-lg font-bold text-emerald-400">Saved Per Employee / Week</h3>
                <p className="text-xs md:text-sm text-[#8A8F98] leading-relaxed">
                  Reclaim valuable staff hours every single week by eliminating manual data transfer between your apps.
                </p>
              </div>

              {/* Metric 2 */}
              <div className="linear-card rounded-2xl md:rounded-3xl p-8 border border-white/10 space-y-4 text-center">
                <div className="text-4xl md:text-5xl font-mono-tech font-extrabold text-white tracking-tight">
                  Zero Errors
                </div>
                <h3 className="text-lg font-bold text-emerald-400">Across Orders & Billing</h3>
                <p className="text-xs md:text-sm text-[#8A8F98] leading-relaxed">
                  Completely eliminate human copy-paste errors in customer records, order entries, and accounting logs.
                </p>
              </div>

              {/* Metric 3 */}
              <div className="linear-card rounded-2xl md:rounded-3xl p-8 border border-white/10 space-y-4 text-center">
                <div className="text-4xl md:text-5xl font-mono-tech font-extrabold text-white tracking-tight">
                  Faster Service
                </div>
                <h3 className="text-lg font-bold text-emerald-400">Without Adding Payroll</h3>
                <p className="text-xs md:text-sm text-[#8A8F98] leading-relaxed">
                  Accelerate customer response times and order fulfillment without needing to hire additional admin staff.
                </p>
              </div>

            </div>
          </div>
        </section>

        {/* 5. FOOT-IN-THE-DOOR FOOTER / FINAL CTA SECTION */}
        <section className="py-20 md:py-28 bg-[#070A0F] relative overflow-hidden" id="audit-form">
          <div className="container mx-auto px-4 md:px-6 max-w-4xl">
            <div className="linear-card rounded-3xl md:rounded-[36px] p-8 md:p-14 border border-white/10 space-y-8 relative overflow-hidden shadow-2xl">
              
              <div className="text-center space-y-4 max-w-2xl mx-auto">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono-tech font-bold uppercase tracking-wider">
                  <Clock size={14} /> Free 15-Minute Operational Audit
                </div>

                <h2 className="text-3xl md:text-5xl font-extrabold tracking-linear-tight text-white leading-tight">
                  Got 15 Minutes? Let's Find Your Biggest Operational Bottleneck.
                </h2>

                <p className="text-sm md:text-base text-[#8A8F98] leading-relaxed">
                  No high-pressure sales pitch. One of our senior automation specialists will look at your daily workflow and show you exactly where time is being lost—100% free of charge.
                </p>
              </div>

              {/* Direct Contact Form Fields */}
              {status === 'success' ? (
                <div className="py-8 text-center space-y-4 bg-white/5 rounded-2xl p-8 border border-white/10">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                    <CheckCircle2 size={36} />
                  </div>
                  <h3 className="text-2xl font-bold text-white">Your Audit is Requested!</h3>
                  <p className="text-sm text-gray-300 max-w-md mx-auto">
                    Thank you! An automation specialist will review your submitted workflow details and reach out within 24 hours to schedule your free 15-minute operational audit.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleInlineSubmit} className="space-y-6 max-w-xl mx-auto">
                  
                  {/* Field 1: Name */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono-tech font-bold uppercase tracking-wider text-gray-300 block">
                      Your Name *
                    </label>
                    <div className="relative">
                      <User size={18} className="absolute left-4 top-3.5 text-gray-500" />
                      <input
                        type="text"
                        required
                        placeholder="e.g. Sarah Jenkins"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 py-3.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-white transition-colors"
                      />
                    </div>
                  </div>

                  {/* Field 2: Work Email */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono-tech font-bold uppercase tracking-wider text-gray-300 block">
                      Work Email *
                    </label>
                    <div className="relative">
                      <Mail size={18} className="absolute left-4 top-3.5 text-gray-500" />
                      <input
                        type="email"
                        required
                        placeholder="e.g. sarah@company.ca"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 py-3.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-white transition-colors"
                      />
                    </div>
                  </div>

                  {/* Field 3: What manual task takes up most of your team's time? */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono-tech font-bold uppercase tracking-wider text-gray-300 block">
                      What manual task takes up most of your team's time? *
                    </label>
                    <textarea
                      rows={4}
                      required
                      placeholder="e.g. Copy-pasting invoice numbers between email and accounting, re-entering customer order details..."
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
                        <span>Submitting Request...</span>
                      </>
                    ) : (
                      <>
                        <Send size={16} />
                        <span>Book My Free 15-Minute Operational Audit</span>
                      </>
                    )}
                  </button>

                  <p className="text-center text-xs text-gray-500">
                    No credit card required. No new software to buy. 100% confidential.
                  </p>
                </form>
              )}

            </div>
          </div>
        </section>

        <LeadDrawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />
      </div>
    </>
  );
};

export default Home;
