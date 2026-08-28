import React from 'react';
import SEO from '../components/SEO';
import { Server, Lock, EyeOff } from 'lucide-react';

const Privacy: React.FC = () => {
  return (
    <>
      <SEO 
        title="Privacy Policy & Security | Oakivo Solutions"
        description="Oakivo's commitment to data privacy, Canadian residency, and technical security protocols for automated business workflows across Atlantic Canada."
        canonical="/privacy"
        keywords="Privacy Policy, Data Residency, PIPEDA, Zero Trust, Oakivo Solutions"
      />

      <section className="bg-slate-950 text-slate-100 pt-32 pb-24 border-b border-slate-900/50">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
             <div className="inline-flex items-center gap-2 bg-slate-900/50 border border-slate-800 px-4 py-2 rounded-sm mb-8">
                <span className="text-[10px] font-mono tracking-widest text-cyan-400 font-bold uppercase">Data Sovereignty</span>
             </div>
             <h1 className="text-4xl md:text-6xl font-display font-bold mb-8 tracking-tight">Privacy Protocol</h1>
             <p className="text-base md:text-xl text-slate-400 font-light leading-relaxed max-w-2xl mx-auto">
               Oakivo Solutions Inc. prioritizes the technical sovereignty of your organization's data. Our privacy standard is built on Zero-Trust principles and strict Canadian data residency.
             </p>
          </div>
        </div>
      </section>

      <section className="bg-slate-950 text-slate-100 py-24">
        <div className="max-w-4xl mx-auto space-y-24 px-6">
           
           <div className="space-y-8">
              <div className="flex items-center gap-6 mb-8">
                 <div className="w-16 h-16 bg-cyan-500/10 rounded-sm flex items-center justify-center text-cyan-400 border border-cyan-500/20">
                    <Server size={32} />
                 </div>
                 <h2 className="text-3xl font-display font-bold">1. Canadian Data Residency</h2>
              </div>
              <p className="text-sm md:text-base text-slate-400 leading-relaxed font-light">
                 Unlike many global consultants, Oakivo ensures that all industrial data, client records, and infrastructure configurations are hosted exclusively within verified Canadian data centers. We adhere strictly to the <strong>Personal Information Protection and Electronic Documents Act (PIPEDA)</strong> as the baseline for our operations.
              </p>
           </div>

           <div className="space-y-8">
              <div className="flex items-center gap-6 mb-8">
                 <div className="w-16 h-16 bg-cyan-500/10 rounded-sm flex items-center justify-center text-cyan-400 border border-cyan-500/20">
                    <Lock size={32} />
                 </div>
                 <h2 className="text-3xl font-display font-bold">2. Technical Safeguards</h2>
              </div>
              <p className="text-sm md:text-base text-slate-400 leading-relaxed font-light">
                 All data in transit is protected by TLS 1.3 encryption. Data at rest is secured via AES-256-bit encryption. We implement Multi-Factor Authentication (MFA) and Zero-Trust identity management as standard across every implementation.
              </p>
           </div>

           <div className="space-y-8">
              <div className="flex items-center gap-6 mb-8">
                 <div className="w-16 h-16 bg-cyan-500/10 rounded-sm flex items-center justify-center text-cyan-400 border border-cyan-500/20">
                    <EyeOff size={32} />
                 </div>
                 <h2 className="text-3xl font-display font-bold">3. Data Usage & Telemetry</h2>
              </div>
              <p className="text-sm md:text-base text-slate-400 leading-relaxed font-light">
                 Oakivo Solutions Inc. <strong>does not use client industrial data</strong> to feed telemetry into public systems. Any automated workflows developed for your organization remain your intellectual property and are isolated within your secure environment.
              </p>
           </div>

           <div className="pt-16 border-t border-slate-900/50 text-center">
              <p className="text-xs text-slate-500 font-mono font-bold uppercase tracking-widest mb-8">Official Governance Document v2.4 (2026)</p>
           </div>
        </div>
      </section>
    </>
  );
};

export default Privacy;
