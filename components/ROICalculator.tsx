import React, { useState, useMemo } from 'react';
import { Calculator, ArrowRight, Lock, CheckCircle, Loader2, Sparkles, TrendingUp } from 'lucide-react';
import Button from './Button';
import { db } from '../utils/database';
import { useLanguage } from '../context/LanguageContext';

const ROICalculator: React.FC = () => {
  const { language, t } = useLanguage();
  const [hours, setHours] = useState(40);
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'unlocked'>('idle');

  const HOURLY_RATE = 75;
  const AUTOMATION_EFFICIENCY = 0.65; // 65% reduction in manual labor

  const results = useMemo(() => {
    const monthlyCost = hours * HOURLY_RATE;
    const annualCost = monthlyCost * 12;
    const annualSavings = annualCost * AUTOMATION_EFFICIENCY;
    return {
      monthlyCost,
      annualCost,
      annualSavings
    };
  }, [hours]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    db.saveEntry('subscriber', { 
        email, 
        calculatorData: { 
            hours, 
            projectedSavings: results.annualSavings 
        },
        type: 'roi_unlock' 
    });
    await new Promise(resolve => setTimeout(resolve, 1500));
    setStatus('unlocked');
  };

  return (
    <div className="bento-card p-10 md:p-14 bg-oakivo-primary text-white border-white/5 relative overflow-hidden group">
      {/* Background patterns */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <pattern id="calc-grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#calc-grid)" />
        </svg>
      </div>

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Input Side */}
        <div className="space-y-12">
          <div className="inline-flex items-center gap-3 bg-white/5 border border-white/10 px-5 py-2 rounded-full backdrop-blur-md">
            <Calculator size={14} className="text-oakivo-secondary" />
            <span className="text-[10px] font-mono-tech font-bold uppercase tracking-[0.4em]">Efficiency Diagnostic</span>
          </div>

          <h2 className="text-4xl md:text-6xl font-serif-display font-bold tracking-tighter leading-none">
            Quantify your <span className="text-oakivo-secondary italic font-light">manual</span> cost.
          </h2>

          <div className="space-y-8">
            <div className="space-y-4">
              <div className="flex justify-between items-end">
                <label className="text-xs font-black uppercase tracking-widest text-white/50">Manual Monthly Labor (Hours)</label>
                <span className="text-3xl font-mono-tech font-bold text-oakivo-secondary">{hours}h</span>
              </div>
              <input 
                type="range" 
                min="10" 
                max="500" 
                step="5"
                value={hours}
                onChange={(e) => setHours(parseInt(e.target.value))}
                className="w-full h-2 bg-white/10 rounded-full appearance-none cursor-pointer accent-oakivo-secondary"
              />
              <div className="flex justify-between text-[9px] font-mono-tech text-white/30 uppercase tracking-widest">
                <span>10 hours</span>
                <span>500 hours</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
               <div className="p-6 bg-white/5 rounded-3xl border border-white/10">
                  <span className="block text-[9px] font-black text-white/40 uppercase tracking-widest mb-2">Cost Rate</span>
                  <p className="text-2xl font-mono-tech font-bold text-white">$75<span className="text-xs font-light text-white/30">/hr</span></p>
               </div>
               <div className="p-6 bg-white/5 rounded-3xl border border-white/10">
                  <span className="block text-[9px] font-black text-white/40 uppercase tracking-widest mb-2">Target Efficiency</span>
                  <p className="text-2xl font-mono-tech font-bold text-white">65<span className="text-xs font-light text-white/30">%</span></p>
               </div>
            </div>
          </div>
        </div>

        {/* Results Side */}
        <div className="flex flex-col justify-between">
          <div className="bg-white/5 border border-white/10 rounded-[48px] p-10 md:p-14 relative overflow-hidden">
             <div className="absolute top-0 right-0 p-8 opacity-5">
                <TrendingUp size={160} />
             </div>
             
             <div className="relative z-10 space-y-10">
                <div>
                   <span className="text-[10px] font-black uppercase tracking-[0.4em] text-oakivo-secondary mb-4 block">Projected Annual Savings</span>
                   <p className="text-6xl md:text-8xl font-mono-tech font-bold tracking-tighter leading-none text-white">
                      ${results.annualSavings.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                   </p>
                </div>

                <div className="flex items-center gap-6 pt-10 border-t border-white/10">
                   <div className="flex-grow">
                      <span className="block text-[9px] font-black text-white/30 uppercase tracking-widest mb-1">Current Manual Expense</span>
                      <p className="text-xl font-mono-tech font-bold text-white/60">${results.annualCost.toLocaleString()}/yr</p>
                   </div>
                   <div className="h-10 w-[1px] bg-white/10"></div>
                   <div className="flex-grow">
                      <span className="block text-[9px] font-black text-white/30 uppercase tracking-widest mb-1">After Orchestration</span>
                      <p className="text-xl font-mono-tech font-bold text-oakivo-secondary">${(results.annualCost - results.annualSavings).toLocaleString()}/yr</p>
                   </div>
                </div>
             </div>
          </div>

          <div className="mt-10">
             {status === 'unlocked' ? (
               <div className="flex items-center gap-5 p-6 bg-oakivo-secondary/10 border border-oakivo-secondary/20 rounded-3xl animate-fade-in-up">
                  <div className="w-12 h-12 bg-oakivo-secondary text-oakivo-primary rounded-2xl flex items-center justify-center">
                     <CheckCircle size={24} />
                  </div>
                  <div>
                     <p className="text-sm font-bold text-white">Roadmap Unlocked</p>
                     <p className="text-xs text-white/50 font-light">The technical briefing has been sent to your vault.</p>
                  </div>
               </div>
             ) : (
               <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <div className="relative">
                     <Lock className="absolute left-6 top-1/2 -translate-y-1/2 text-white/20" size={18} />
                     <input 
                       type="email" 
                       required 
                       value={email}
                       onChange={(e) => setEmail(e.target.value)}
                       placeholder="Enter corporate email to unlock roadmap"
                       className="w-full bg-white/5 border border-white/10 rounded-2xl pl-16 pr-6 py-5 text-sm focus:outline-none focus:border-oakivo-secondary transition-all"
                     />
                  </div>
                  <Button variant="white" type="submit" disabled={status === 'submitting'} className="!bg-oakivo-secondary !text-oakivo-primary border-none shadow-cyber group">
                    {status === 'submitting' ? <Loader2 className="animate-spin" size={20} /> : (
                       <>Unlock ROI Roadmap <ArrowRight size={20} className="ml-2 group-hover:translate-x-2 transition-transform" /></>
                    )}
                  </Button>
               </form>
             )}
          </div>
        </div>
      </div>

      {/* Blurred Roadmap Preview */}
      <div className={`mt-20 border-t border-white/10 pt-16 transition-all duration-1000 ${status === 'unlocked' ? 'filter-none opacity-100' : 'blur-xl opacity-20 select-none pointer-events-none'}`}>
         <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
               { icon: <Sparkles />, title: "Logic Integration", desc: "Phase 1: Deep auditing of legacy HST/GST logic fragmentation." },
               { icon: <Calculator />, title: "Cost Minimization", desc: "Phase 2: Automated resource allocation via Odoo 19 Hub." },
               { icon: <TrendingUp />, title: "Scale Velocity", desc: "Phase 3: Autonomous Agent deployment for supply chain routing." }
            ].map((step, i) => (
               <div key={i} className="space-y-4">
                  <div className="text-oakivo-secondary">{step.icon}</div>
                  <h4 className="text-xl font-serif-display font-bold">{step.title}</h4>
                  <p className="text-sm text-white/50 font-light leading-relaxed">{step.desc}</p>
               </div>
            ))}
         </div>
      </div>
    </div>
  );
};

export default ROICalculator;