import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Helmet } from 'react-helmet-async';
import KineticHero from '../components/KineticHero';
import BentoServices from '../components/BentoServices';
import OakivoROIEngine from '../components/OakivoROIEngine';
import CaseStudiesShowcase from '../components/CaseStudiesShowcase';
import LeadDrawer from '../components/LeadDrawer';
import { 
  ShieldCheck, Cpu, Layers, Sparkles, TrendingUp, Award, 
  CheckCircle2, ArrowRight, Building2, Lock, Terminal, BarChart3, Database 
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const Home: React.FC = () => {
  const { language, t } = useLanguage();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <>
      <Helmet>
        <title>Oakivo Solutions Inc. | Architecting Industrial Resilience & Odoo 19 Hub</title>
        <meta name="description" content="Canada's premier Odoo 19 Partner and Agentic AI consultancy. Sovereign digital transformation, PIPEDA compliance, and Zero-Trust industrial core engineering." />
      </Helmet>

      <div className="space-y-0 bg-[#070A0F] text-white overflow-hidden">
        
        {/* 1. Kinetic WebGL/Canvas Hero Section */}
        <KineticHero />

        {/* 2. Live Metrics & Sovereign Compliance Ticker */}
        <section className="py-12 bg-[#0B0F17] border-y border-white/10 relative z-20">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center max-w-7xl mx-auto">
              <div className="space-y-1 border-r border-white/10 last:border-r-0">
                <span className="text-3xl md:text-5xl font-mono-tech font-extrabold text-white tracking-tight">
                  $4.2M+
                </span>
                <span className="text-[10px] font-mono-tech text-oakivo-secondary uppercase tracking-[0.2em] block font-bold">
                  Capital Recovered for SMEs
                </span>
              </div>

              <div className="space-y-1 border-r border-white/10 last:border-r-0">
                <span className="text-3xl md:text-5xl font-mono-tech font-extrabold text-white tracking-tight">
                  42%
                </span>
                <span className="text-[10px] font-mono-tech text-oakivo-accent uppercase tracking-[0.2em] block font-bold">
                  Average OEE Yield Lift
                </span>
              </div>

              <div className="space-y-1 border-r border-white/10 last:border-r-0">
                <span className="text-3xl md:text-5xl font-mono-tech font-extrabold text-white tracking-tight">
                  100%
                </span>
                <span className="text-[10px] font-mono-tech text-indigo-400 uppercase tracking-[0.2em] block font-bold">
                  PIPEDA & Law 25 Sovereign
                </span>
              </div>

              <div className="space-y-1">
                <span className="text-3xl md:text-5xl font-mono-tech font-extrabold text-white tracking-tight">
                  &lt;50ms
                </span>
                <span className="text-[10px] font-mono-tech text-amber-400 uppercase tracking-[0.2em] block font-bold">
                  Local AI Inference Latency
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* 3. Asymmetric Bento Services & Core Pillars */}
        <BentoServices />

        {/* 4. Interactive ROI Engine & System Health Diagnostic */}
        <section className="py-24 bg-[#070A0F] relative overflow-hidden" id="roi-engine-section">
          <div className="container mx-auto px-4 md:px-6 max-w-7xl">
            <OakivoROIEngine />
          </div>
        </section>

        {/* 5. Verified Client Proof & Case Studies */}
        <CaseStudiesShowcase />

        {/* 6. Sovereign Infrastructure & Security Matrix Callout */}
        <section className="py-24 bg-[#070A0F] relative overflow-hidden border-t border-white/10">
          <div className="container mx-auto px-4 md:px-6 max-w-7xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              
              <div className="lg:col-span-6 space-y-6">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-oakivo-accent text-xs font-mono-tech font-bold uppercase tracking-[0.3em]">
                  <ShieldCheck size={14} /> PIPEDA & CRA Zero-Trust Matrix
                </div>

                <h2 className="text-3xl md:text-5xl font-display font-bold leading-tight">
                  Sovereign Canadian data handling. <br />
                  <span className="text-gradient-emerald italic font-serif">Zero compromise.</span>
                </h2>

                <p className="text-sm text-gray-300 font-light leading-relaxed">
                  Unlike multi-tenant US clouds, Oakivo deploys all enterprise databases and Agentic AI models inside isolated Canadian infrastructure in Montreal and Toronto.
                </p>

                <div className="space-y-3 pt-2">
                  {[
                    'Full compliance with Quebec Law 25 & PIPEDA privacy frameworks',
                    'Localized CRA GST/HST tax rules pre-configured in Odoo 19 core',
                    'On-premises & sovereign cloud hybrid deployments with Hardware HSM keys',
                    '24/7 principal-led monitoring and incident response SLA'
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center gap-3 text-xs text-gray-200">
                      <CheckCircle2 size={16} className="text-oakivo-accent shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-4">
                  <button
                    onClick={() => setIsDrawerOpen(true)}
                    className="px-8 py-4 rounded-full bg-oakivo-secondary text-black font-extrabold text-xs uppercase tracking-widest shadow-glow-cyan hover:scale-105 transition-all flex items-center gap-2"
                  >
                    <Sparkles size={16} /> Request Sovereign Compliance Brief
                  </button>
                </div>
              </div>

              {/* Security Console Terminal Graphic */}
              <div className="lg:col-span-6">
                <div className="glass-card rounded-[36px] p-8 border border-white/10 space-y-5 shadow-2xl">
                  <div className="flex justify-between items-center pb-4 border-b border-white/10 text-xs font-mono-tech">
                    <span className="text-oakivo-secondary font-bold flex items-center gap-2">
                      <Lock size={14} /> SECURITY_ENFORCER.SOC2
                    </span>
                    <span className="text-gray-500">CANADIAN_NODES_ACTIVE</span>
                  </div>

                  <div className="space-y-2.5 text-xs font-mono-tech">
                    <div className="p-3 bg-white/5 rounded-xl border border-white/5 flex justify-between">
                      <span className="text-gray-400">Data Residency Node:</span>
                      <span className="text-white font-bold">ca-central-1 (Montreal)</span>
                    </div>
                    <div className="p-3 bg-white/5 rounded-xl border border-white/5 flex justify-between">
                      <span className="text-gray-400">Backup Replication:</span>
                      <span className="text-white font-bold">ca-east-1 (Toronto)</span>
                    </div>
                    <div className="p-3 bg-white/5 rounded-xl border border-white/5 flex justify-between">
                      <span className="text-gray-400">Encryption at Rest:</span>
                      <span className="text-oakivo-accent font-bold">AES-256-GCM + HSM</span>
                    </div>
                    <div className="p-3 bg-white/5 rounded-xl border border-white/5 flex justify-between">
                      <span className="text-gray-400">CRA Audit Engine Status:</span>
                      <span className="text-oakivo-secondary font-bold">GST/HST Verified</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <LeadDrawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />
      </div>
    </>
  );
};

export default Home;
