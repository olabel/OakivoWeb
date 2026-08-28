import React, { useState } from 'react';
import Section from '../components/Section';
import SEO from '../components/SEO';
import { ShieldCheck, CheckCircle2, Lock, Sparkles, FileCheck } from 'lucide-react';
import LeadDrawer from '../components/LeadDrawer';

const ComplianceMatrix: React.FC = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const standards = [
    { title: "Zero Data Stored on Overseas Servers", status: "Active Guarantee", desc: "100% of your workflow data moves securely between your existing software endpoints without being harvested or sold." },
    { title: "Bank-Grade API Encryption", status: "Standard", desc: "All system integrations utilize SSL/TLS 256-bit encryption for real-time order, invoice, and inventory sync." },
    { title: "Zero Disruption Deployment", status: "Guaranteed", desc: "We build and test your custom workflow bridges in sandbox environments before going live - zero downtime for your business." },
    { title: "Complete System Control", status: "Always Yours", desc: "You maintain full ownership and control of all software accounts, credentials, and API keys." }
  ];

  return (
    <>
      <SEO 
        title="Security & Data Guarantee | Oakivo Solutions"
        description="Explore Oakivo's security standards, zero-data-retention guarantee, and bank-grade encryption for automated invoice and system integrations in Atlantic Canada."
        canonical="/compliance-matrix"
      />

      <section className="bg-slate-950 text-white pt-40 pb-20 relative overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-cyan-500/5 rounded-sm blur-[140px] pointer-events-none" />

        <div className="container mx-auto px-4 md:px-6 relative z-10 text-center max-w-4xl">
          <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-sm mb-8">
            <ShieldCheck size={14} className="text-cyan-400" />
            <span className="text-[10px] font-mono text-cyan-400 font-bold uppercase tracking-widest">
              Data Safety & Reliability
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-slate-100 mb-6">
            Automation Security & Integrity Guarantee
          </h1>
          <p className="text-base md:text-xl text-[#8A8F98] max-w-2xl mx-auto font-normal leading-relaxed">
            Bulletproof workflow integrations built to quietly and securely support your daily operations.
          </p>
        </div>
      </section>

      <Section className="bg-slate-900 text-white py-24 border-t border-white/10">
        <div className="container mx-auto px-4 md:px-6 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            {standards.map((std, i) => (
              <div key={i} className="bg-slate-900/40 backdrop-blur-md rounded-sm border border-slate-800 rounded-sm p-8 border border-white/[0.08] space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 bg-cyan-500/10 rounded-sm flex items-center justify-center text-cyan-400 border border-cyan-500/20">
                    <FileCheck size={24} />
                  </div>
                  <span className="px-3 py-1 bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-[10px] font-mono font-bold uppercase tracking-widest rounded-sm">
                    {std.status}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white">{std.title}</h3>
                <p className="text-xs text-gray-400 font-light leading-relaxed">{std.desc}</p>
              </div>
            ))}
          </div>

          <div className="bg-slate-900/40 backdrop-blur-md rounded-sm border border-slate-800 rounded-sm p-8 md:p-12 border border-white/10 text-center space-y-6">
            <span className="text-[10px] font-mono text-cyan-400 font-bold uppercase tracking-widest block">
              Operational Audit
            </span>
            <h2 className="text-2xl md:text-4xl font-extrabold text-slate-100">
              Have questions about integrating your software safely?
            </h2>
            <p className="text-xs md:text-sm text-gray-400 font-light max-w-xl mx-auto">
              Schedule a 15-minute operational audit. We'll walk through your current software tools and answer all questions in plain English.
            </p>
            <button
              onClick={() => setIsDrawerOpen(true)}
              className="px-8 py-4 rounded-sm bg-white hover:bg-gray-100 text-black font-semibold text-xs tracking-wide shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:scale-105 transition-all inline-flex items-center gap-2 cursor-pointer"
            >
              <Sparkles size={16} /> Schedule My Audit
            </button>
          </div>
        </div>
      </Section>

      <LeadDrawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />
    </>
  );
};

export default ComplianceMatrix;
