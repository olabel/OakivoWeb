import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  TrendingUp, Award, Building2, Quote, ArrowRight, CheckCircle2, 
  ShieldCheck, FileCheck, ChevronLeft, ChevronRight, Sparkles 
} from 'lucide-react';
import LeadDrawer from './LeadDrawer';

interface CaseStudyItem {
  id: string;
  client: string;
  industry: string;
  location: string;
  impactMetric: string;
  impactLabel: string;
  title: string;
  problem: string;
  solution: string;
  quote: string;
  author: string;
  authorRole: string;
  keyAchievements: string[];
}

const CaseStudiesShowcase: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const caseStudies: CaseStudyItem[] = [
    {
      id: 'atlantic-manufacturing',
      client: 'Atlantic Precision Manufacturing',
      industry: 'Industrial Equipment & Machining',
      location: 'Moncton / Dieppe, NB',
      impactMetric: '42% Yield Increase',
      impactLabel: 'Shop Floor OEE Recovery',
      title: 'Odoo 19 Sovereign ERP Migration & MES Automation',
      problem: 'Fragmented legacy software created a 14-day delay between shop floor execution and CRA tax financial reconciliation.',
      solution: 'Deployed a sovereign Odoo 19 core with automated barcode WMS and localized CRA GST/HST accounting modules in under 90 days.',
      quote: "Oakivo redesigned our entire operational logic in under 90 days. We now track every machine component in real-time.",
      author: "Marc LeBlanc",
      authorRole: "VP of Operations",
      keyAchievements: [
        '$420,000 annual labor cost savings in administrative data entry',
        '100% CRA GST/HST tax compliance with real-time audit logs',
        'Real-time shop floor machine integration with sub-second latency'
      ]
    },
    {
      id: 'fintrust-compliance',
      client: 'FinTrust Capital Solutions',
      industry: 'Financial Services & Fintech',
      location: 'Toronto, ON',
      impactMetric: '100% Audit Readiness',
      impactLabel: 'PIPEDA & SOC2 Type II Certified',
      title: 'Zero-Trust Cyber Hardening & Canadian Sovereign Cloud',
      problem: 'Legacy multi-cloud data sprawl posed critical PIPEDA data residency compliance risks for Canadian institutional clients.',
      solution: 'Architected a zero-trust sovereign cloud perimeter hosted exclusively in Montreal and Toronto data centers with hardware HSM key storage.',
      quote: "Zero-Trust is now the foundation of our client trust model. Oakivo eliminated lateral movement threats completely.",
      author: "Sarah Jenkins",
      authorRole: "Chief Technology Officer",
      keyAchievements: [
        'Zero data residency compliance violations across 3 audit cycles',
        'Sub-50ms local inference latency for automated compliance checks',
        'SOC2 Type II certification achieved in record time'
      ]
    },
    {
      id: 'global-logistics-ai',
      client: 'Northern Maritime Supply Chain',
      industry: 'Logistics & Freight Orchestration',
      location: 'Montreal, QC',
      impactMetric: '30% Latency Drop',
      impactLabel: 'Supply Chain Routing Velocity',
      title: 'Agentic AI Autonomous Invoice Parsing & Dispatch',
      problem: 'Manual processing of over 5,000 monthly customs and shipping manifests created severe port bottleneck delays.',
      solution: 'Integrated an autonomous Agentic AI reasoning engine that parses PDFs, performs 3-way matching in Odoo 19, and dispatches drivers automatically.',
      quote: "Our manifest processing speed went from hours to seconds. Oakivo's AI engine is the brain of our logistics network.",
      author: "Jean-Francois Gagnon",
      authorRole: "Director of Logistics Engine",
      keyAchievements: [
        'Over 60,000 shipping manifests processed with 99.4% accuracy',
        '30% reduction in dock holding fees across Atlantic ports',
        'Instant Quebec Law 25 bilingual documentation generation'
      ]
    }
  ];

  const currentCase = caseStudies[activeIndex];

  return (
    <section className="py-24 bg-[#0B0F17] relative overflow-hidden" id="case-studies">
      {/* Background Accent Grids */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <pattern id="case-grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#case-grid)" />
        </svg>
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-14 max-w-7xl mx-auto">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full linear-pill text-emerald-400 text-xs font-mono-tech font-medium uppercase tracking-wider">
              <Award size={13} /> Industrial Impact Verification
            </div>

            <h2 className="text-3xl md:text-5xl font-extrabold text-linear-heading tracking-linear-tight leading-tight">
              Validated results from the <br />
              <span className="text-linear-accent font-semibold">frontlines of Canadian industry.</span>
            </h2>
          </div>

          {/* Nav Controls */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveIndex(prev => (prev === 0 ? caseStudies.length - 1 : prev - 1))}
              className="w-10 h-10 rounded-full linear-pill hover:border-white/20 flex items-center justify-center text-white transition-all"
              aria-label="Previous case study"
            >
              <ChevronLeft size={18} />
            </button>
            <span className="text-xs font-mono-tech font-medium text-gray-400">
              0{activeIndex + 1} / 0{caseStudies.length}
            </span>
            <button
              onClick={() => setActiveIndex(prev => (prev === caseStudies.length - 1 ? 0 : prev + 1))}
              className="w-10 h-10 rounded-full linear-pill hover:border-white/20 flex items-center justify-center text-white transition-all"
              aria-label="Next case study"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        {/* Featured Case Study Card */}
        <div className="max-w-7xl mx-auto linear-card rounded-2xl md:rounded-3xl p-6 md:p-12 border border-white/[0.08] shadow-2xl relative overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentCase.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-14 items-center"
            >
              {/* Left Column: Problem, Solution & Quote */}
              <div className="lg:col-span-7 space-y-8">
                <div className="space-y-2">
                  <div className="flex items-center gap-3 text-xs font-mono-tech text-oakivo-secondary font-bold">
                    <Building2 size={16} />
                    <span>{currentCase.client}</span>
                    <span className="text-gray-600">•</span>
                    <span className="text-gray-400">{currentCase.location}</span>
                  </div>
                  <h3 className="text-2xl md:text-4xl font-display font-bold text-white leading-tight">
                    {currentCase.title}
                  </h3>
                </div>

                {/* Problem vs Solution split */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-5 bg-white/5 rounded-3xl border border-white/5 space-y-2">
                    <span className="text-[10px] font-mono-tech text-red-400 font-bold uppercase tracking-widest block">
                      Legacy Bottleneck
                    </span>
                    <p className="text-xs text-gray-300 font-light leading-relaxed">
                      {currentCase.problem}
                    </p>
                  </div>

                  <div className="p-5 bg-white/5 rounded-3xl border border-white/5 space-y-2">
                    <span className="text-[10px] font-mono-tech text-oakivo-accent font-bold uppercase tracking-widest block">
                      Oakivo Solution
                    </span>
                    <p className="text-xs text-gray-300 font-light leading-relaxed">
                      {currentCase.solution}
                    </p>
                  </div>
                </div>

                {/* Quote */}
                <div className="p-6 bg-oakivo-secondary/5 rounded-3xl border border-oakivo-secondary/20 space-y-3 relative">
                  <Quote size={28} className="text-oakivo-secondary opacity-40 absolute top-4 right-6" />
                  <p className="text-sm md:text-base font-serif italic text-white leading-relaxed">
                    "{currentCase.quote}"
                  </p>
                  <div>
                    <span className="text-xs font-bold text-white block">{currentCase.author}</span>
                    <span className="text-[10px] font-mono-tech text-oakivo-secondary">{currentCase.authorRole}</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Key Achievements & CTA */}
              <div className="lg:col-span-5 space-y-8 bg-white/5 p-8 md:p-10 rounded-[32px] border border-white/10 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-mono-tech text-oakivo-secondary uppercase tracking-[0.3em] font-bold block mb-2">
                    Verified Performance Metric
                  </span>
                  <p className="text-4xl md:text-5xl font-mono-tech font-extrabold text-white tracking-tight">
                    {currentCase.impactMetric}
                  </p>
                  <p className="text-xs text-gray-400 font-mono-tech mt-1">
                    {currentCase.impactLabel}
                  </p>
                </div>

                <div className="space-y-3">
                  <span className="text-xs font-mono-tech font-bold uppercase tracking-widest text-white block">
                    Core Architectural Achievements:
                  </span>
                  {currentCase.keyAchievements.map((ach, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs text-gray-300">
                      <CheckCircle2 size={16} className="text-oakivo-accent shrink-0 mt-0.5" />
                      <span>{ach}</span>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => setIsDrawerOpen(true)}
                  className="w-full py-3.5 rounded-full bg-white hover:bg-gray-100 text-black font-semibold text-xs tracking-wide shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:scale-[1.01] transition-all flex items-center justify-center gap-2"
                >
                  <Sparkles size={15} /> Request Case Study Blueprint & Diagnostic
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <LeadDrawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} defaultTopic={`Case Study: ${currentCase.title}`} />
    </section>
  );
};

export default CaseStudiesShowcase;
