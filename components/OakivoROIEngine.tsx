import React, { useState, useMemo } from 'react';
import { 
  Calculator, ArrowRight, Lock, CheckCircle, Loader2, Sparkles, 
  TrendingUp, ShieldAlert, BarChart3, Database, MailCheck, Info,
  FileCheck2, ShieldCheck, Activity, Award
} from 'lucide-react';
import Button from './Button';
import { db } from '../utils/database';

const OakivoROIEngine: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'calculator' | 'diagnostic'>('calculator');
  const [hours, setHours] = useState(60);
  const [rate, setRate] = useState(75);
  const [saasCount, setSaasCount] = useState(4);
  const [errorRate, setErrorRate] = useState(5); // % error rate in manual workflows
  const [email, setEmail] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'unlocked'>('idle');

  // Diagnostic Quiz State
  const [diagAnswers, setDiagAnswers] = useState<Record<number, number>>({ 0: 2, 1: 2, 2: 2, 3: 1, 4: 2 });
  const [diagSubmitted, setDiagSubmitted] = useState(false);

  const diagQuestions = [
    {
      q: "How are your financial and accounting records synchronized with inventory/sales?",
      options: [
        { label: "Fully automated in Odoo / ERP (Real-time CRA compliance)", points: 25 },
        { label: "Semi-automated via custom API scripts & CSV exports", points: 15 },
        { label: "Manual entry into separate accounting software (Excel/QuickBooks)", points: 5 },
      ]
    },
    {
      q: "Where is your corporate & customer data stored?",
      options: [
        { label: "Sovereign Canadian Cloud (Montreal/Toronto/PIPEDA compliant)", points: 25 },
        { label: "Mixed multi-cloud or US-based servers", points: 15 },
        { label: "On-premises local servers without automated offsite backups", points: 5 },
      ]
    },
    {
      q: "To what extent are repetitive tasks automated with AI or workflow logic?",
      options: [
        { label: "Autonomous Agentic AI handles routing, verification & alerts", points: 25 },
        { label: "Basic rule-based email/document automation tools", points: 15 },
        { label: "Zero AI automation — entirely human-driven", points: 5 },
      ]
    },
    {
      q: "How quickly can your executive team generate an audit-ready P&L or supply report?",
      options: [
        { label: "Instantly (1-click real-time dashboard)", points: 25 },
        { label: "1-3 business days after manual consolidation", points: 15 },
        { label: "1-2 weeks or end-of-month reconciliation only", points: 5 },
      ]
    }
  ];

  const diagScore = useMemo(() => {
    return Object.entries(diagAnswers).reduce((acc, [qIdx, optionIdx]) => {
      const q = diagQuestions[parseInt(qIdx)];
      if (q && q.options[optionIdx]) {
        return acc + q.options[optionIdx].points;
      }
      return acc;
    }, 0);
  }, [diagAnswers]);

  // Financial ROI Logic:
  // 45% efficiency recovery in manual hours + $1,500/yr per consolidated SaaS tool + error mitigation recovery
  const calculations = useMemo(() => {
    const grossManualAnnual = hours * rate * 12;
    const errorMitigationRecovery = grossManualAnnual * (errorRate / 100) * 0.60;
    const saasConsolidationSavings = saasCount * 1500;
    const timeRecoveryAmount = grossManualAnnual * 0.45;
    const totalAnnualRecovery = timeRecoveryAmount + saasConsolidationSavings + errorMitigationRecovery;
    
    const resilienceScore = Math.max(15, Math.min(98, 100 - (hours / 4) + (saasCount * 2)));

    return {
      totalAnnualRecovery,
      timeRecoveryAmount,
      saasConsolidationSavings,
      errorMitigationRecovery,
      resilienceScore,
      grossManualAnnual
    };
  }, [hours, rate, saasCount, errorRate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus('submitting');
    
    // Save lead data to Vault
    const entry = db.saveEntry('lead', { 
      email, 
      company: companyName,
      roiMetrics: { 
        recovery: calculations.totalAnnualRecovery, 
        resilience: calculations.resilienceScore,
        manualHours: hours,
        saasCount
      },
      type: 'ROI_ENGINE_CAPTURE' 
    });

    console.log("Strategic Handshake Initialized for:", email, "Entry ID:", entry.id);

    await new Promise(resolve => setTimeout(resolve, 1500));
    setStatus('unlocked');
  };

  return (
    <div className="linear-card p-6 sm:p-10 md:p-14 rounded-2xl md:rounded-3xl bg-[#0B0C0E] text-white border border-white/[0.08] relative overflow-hidden shadow-2xl">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <pattern id="roi-grid-patterns" width="32" height="32" patternUnits="userSpaceOnUse">
            <path d="M 32 0 L 0 0 0 32" fill="none" stroke="white" strokeWidth="0.5" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#roi-grid-patterns)" />
        </svg>
      </div>

      {/* Tabs Header */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 mb-10 border-b border-white/[0.08] pb-6">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-white/[0.05] border border-white/10 flex items-center justify-center text-oakivo-linearIndigo">
            <Calculator size={18} />
          </div>
          <div>
            <span className="text-[10px] font-mono-tech font-medium uppercase tracking-wider text-oakivo-linearIndigo block">Diagnostic Engine v2.0</span>
            <h3 className="text-lg font-bold tracking-tight text-white">Canadian Enterprise Intelligence</h3>
          </div>
        </div>

        <div className="flex bg-white/[0.04] p-1 rounded-xl border border-white/[0.08]">
          <button 
            onClick={() => setActiveTab('calculator')}
            className={`px-4 py-2 rounded-lg text-xs font-mono-tech font-medium transition-all flex items-center gap-2 ${
              activeTab === 'calculator' 
                ? 'bg-white text-black font-semibold shadow-sm' 
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <TrendingUp size={13} /> Operational Recovery
          </button>
          <button 
            onClick={() => setActiveTab('diagnostic')}
            className={`px-4 py-2 rounded-lg text-xs font-mono-tech font-medium transition-all flex items-center gap-2 ${
              activeTab === 'diagnostic' 
                ? 'bg-white text-black font-semibold shadow-sm' 
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <ShieldCheck size={13} /> System Health Scorecard
          </button>
        </div>
      </div>

      {activeTab === 'calculator' ? (
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-12">
          
          {/* Left Col: Variable Inputs */}
          <div className="lg:col-span-5 space-y-6">
            <header>
              <h2 className="text-2xl sm:text-4xl font-extrabold tracking-linear-tight leading-tight text-linear-heading">
                Quantify your <span className="text-linear-accent font-semibold">capital recovery</span> potential.
              </h2>
              <p className="text-xs sm:text-sm text-[#8A8F98] font-normal mt-2.5 leading-relaxed">
                Canadian industrial SMEs lose an average of $65k/year to fragmented manual workflows and redundant SaaS.
              </p>
            </header>

            <div className="space-y-6">
              {/* Hours Input */}
              <div className="bg-white/5 border border-white/10 p-6 rounded-3xl space-y-3">
                <div className="flex justify-between items-end">
                  <label className="text-[10px] font-mono-tech font-bold uppercase tracking-widest text-white/60">Manual Administrative Work (Hrs/Mo)</label>
                  <span className="text-2xl font-mono-tech font-bold text-oakivo-secondary">{hours} hrs</span>
                </div>
                <input 
                  type="range" min="10" max="300" step="5" value={hours}
                  onChange={(e) => setHours(parseInt(e.target.value))}
                  className="w-full h-2 bg-white/10 rounded-full appearance-none cursor-pointer accent-oakivo-secondary"
                />
              </div>

              {/* Rate Input */}
              <div className="bg-white/5 border border-white/10 p-6 rounded-3xl space-y-3">
                <div className="flex justify-between items-end">
                  <label className="text-[10px] font-mono-tech font-bold uppercase tracking-widest text-white/60">Average Blended Labor Rate (CAD/Hr)</label>
                  <span className="text-2xl font-mono-tech font-bold text-oakivo-secondary">${rate}/hr</span>
                </div>
                <input 
                  type="range" min="35" max="200" step="5" value={rate}
                  onChange={(e) => setRate(parseInt(e.target.value))}
                  className="w-full h-2 bg-white/10 rounded-full appearance-none cursor-pointer accent-oakivo-secondary"
                />
              </div>

              {/* SaaS Bloat & Error Rate */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-white/5 border border-white/10 p-5 rounded-3xl space-y-2">
                  <div className="flex justify-between items-center">
                    <label className="text-[9px] font-mono-tech font-bold uppercase tracking-widest text-white/60">SaaS Tools</label>
                    <span className="text-xl font-mono-tech font-bold text-oakivo-secondary">{saasCount}</span>
                  </div>
                  <div className="flex gap-1.5 overflow-x-auto no-scrollbar pt-1">
                    {[1, 2, 4, 6, 8, 12].map(num => (
                      <button 
                        key={num}
                        onClick={() => setSaasCount(num)}
                        className={`flex-1 min-w-[28px] py-1.5 rounded-lg text-[10px] font-mono-tech font-bold transition-all ${saasCount === num ? 'bg-oakivo-secondary text-black shadow-cyber' : 'bg-white/5 text-white/40 hover:bg-white/10'}`}
                      >
                        {num}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="bg-white/5 border border-white/10 p-5 rounded-3xl space-y-2">
                  <div className="flex justify-between items-center">
                    <label className="text-[9px] font-mono-tech font-bold uppercase tracking-widest text-white/60">Error Factor</label>
                    <span className="text-xl font-mono-tech font-bold text-oakivo-secondary">{errorRate}%</span>
                  </div>
                  <input 
                    type="range" min="1" max="15" step="1" value={errorRate}
                    onChange={(e) => setErrorRate(parseInt(e.target.value))}
                    className="w-full h-1.5 bg-white/10 rounded-full appearance-none cursor-pointer accent-oakivo-secondary"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right Col: Calculations & Results */}
          <div className="lg:col-span-7 flex flex-col justify-between bg-white/5 border border-white/10 rounded-[40px] p-8 md:p-12 relative overflow-hidden">
            <div className="space-y-8 relative z-10">
              <div>
                <span className="text-[10px] font-mono-tech font-bold uppercase tracking-[0.4em] text-oakivo-secondary mb-2 block">
                  Estimated Annual Recovery Potential
                </span>
                <p className="text-5xl sm:text-7xl font-mono-tech font-bold tracking-tighter leading-none text-white">
                  <span className="text-3xl align-top mr-1">$</span>
                  {Math.round(calculations.totalAnnualRecovery).toLocaleString()}
                </p>
                <p className="text-xs text-white/40 font-light mt-3">
                  Calculated based on Odoo 19 core unification & Agentic AI automation multipliers.
                </p>
              </div>

              {/* Breakdown Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-white/10">
                <div className="p-4 bg-white/5 rounded-2xl">
                  <span className="text-[9px] font-mono-tech text-white/40 uppercase tracking-widest block mb-1">Time Recovery</span>
                  <span className="text-lg font-bold text-white">${Math.round(calculations.timeRecoveryAmount).toLocaleString()}</span>
                </div>
                <div className="p-4 bg-white/5 rounded-2xl">
                  <span className="text-[9px] font-mono-tech text-white/40 uppercase tracking-widest block mb-1">SaaS Savings</span>
                  <span className="text-lg font-bold text-white">${Math.round(calculations.saasConsolidationSavings).toLocaleString()}</span>
                </div>
                <div className="p-4 bg-white/5 rounded-2xl">
                  <span className="text-[9px] font-mono-tech text-white/40 uppercase tracking-widest block mb-1">Error Prevention</span>
                  <span className="text-lg font-bold text-white">${Math.round(calculations.errorMitigationRecovery).toLocaleString()}</span>
                </div>
              </div>

              {/* Email Form */}
              {status === 'unlocked' ? (
                <div className="p-6 bg-oakivo-secondary/10 border border-oakivo-secondary/30 rounded-3xl text-center space-y-3 animate-fade-in-up">
                  <div className="w-12 h-12 rounded-full bg-oakivo-secondary text-black flex items-center justify-center mx-auto shadow-cyber">
                    <CheckCircle size={24} />
                  </div>
                  <h4 className="text-xl font-bold text-white">Executive Profile Transmitted</h4>
                  <p className="text-xs text-white/70">
                    Detailed PDF architecture breakdown dispatched to <span className="text-oakivo-secondary font-bold">{email}</span>. Our senior architect will review your parameters.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 pt-4 border-t border-white/10">
                  <span className="text-[10px] font-mono-tech font-bold uppercase tracking-widest text-white/60 block">
                    Receive Full Architectural Diagnostic Brief:
                  </span>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <input 
                      type="text" 
                      placeholder="Company Name" 
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      className="bg-white/10 border border-white/10 rounded-2xl px-5 py-3.5 text-sm text-white placeholder-white/40 focus:outline-none focus:border-oakivo-secondary flex-grow"
                    />
                    <input 
                      type="email" 
                      required 
                      placeholder="Corporate Email" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="bg-white/10 border border-white/10 rounded-2xl px-5 py-3.5 text-sm text-white placeholder-white/40 focus:outline-none focus:border-oakivo-secondary flex-grow"
                    />
                  </div>
                  <Button 
                    type="submit" 
                    variant="white" 
                    disabled={status === 'submitting'}
                    className="w-full py-4 text-xs font-black uppercase tracking-widest !bg-oakivo-secondary !text-black border-none hover:scale-[1.02] transition-transform"
                  >
                    {status === 'submitting' ? (
                      <span className="flex items-center justify-center gap-2">
                        <Loader2 size={16} className="animate-spin" /> Transmitting Intelligence...
                      </span>
                    ) : (
                      <span className="flex items-center justify-center gap-2">
                        <FileCheck2 size={16} /> Generate Executive Brief & Lock Strategy
                      </span>
                    )}
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      ) : (
        /* System Health Quiz Tab */
        <div className="relative z-10 max-w-4xl mx-auto space-y-10">
          <header className="text-center">
            <h2 className="text-3xl md:text-5xl font-serif-display font-bold tracking-tighter">
              Canadian Industrial <span className="text-oakivo-secondary italic font-light">Resilience Scorecard</span>
            </h2>
            <p className="text-sm text-white/60 font-light mt-2 max-w-xl mx-auto">
              Evaluate your operational digital core across CRA compliance, PIPEDA data residency, and AI automation readiness.
            </p>
          </header>

          <div className="space-y-6">
            {diagQuestions.map((q, qIdx) => (
              <div key={qIdx} className="bg-white/5 border border-white/10 p-6 md:p-8 rounded-3xl space-y-4">
                <span className="text-[10px] font-mono-tech text-oakivo-secondary font-bold uppercase tracking-widest block">
                  Metric {qIdx + 1} of {diagQuestions.length}
                </span>
                <h4 className="text-lg font-bold text-white">{q.q}</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
                  {q.options.map((opt, oIdx) => (
                    <button
                      key={oIdx}
                      type="button"
                      onClick={() => setDiagAnswers(prev => ({ ...prev, [qIdx]: oIdx }))}
                      className={`p-4 rounded-2xl text-left text-xs transition-all border ${
                        diagAnswers[qIdx] === oIdx
                          ? 'bg-oakivo-secondary text-black font-bold border-oakivo-secondary shadow-cyber'
                          : 'bg-white/5 text-white/70 border-white/10 hover:bg-white/10'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white/5 border border-white/10 p-8 rounded-[36px] flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
            <div>
              <span className="text-[10px] font-mono-tech font-bold uppercase tracking-widest text-oakivo-secondary block">Calculated Resilience Rating</span>
              <p className="text-4xl font-mono-tech font-bold text-white mt-1">
                {diagScore} / 100 <span className="text-sm font-sans font-light text-white/60">
                  ({diagScore >= 80 ? 'Optimal Sovereign Core' : diagScore >= 50 ? 'Moderate Structural Risk' : 'High Fragmented Risk'})
                </span>
              </p>
            </div>
            <Button 
              variant="white" 
              onClick={() => setActiveTab('calculator')} 
              className="px-8 py-4 text-xs font-bold !bg-oakivo-secondary !text-black border-none"
            >
              Analyze Financial Recovery
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default OakivoROIEngine;
