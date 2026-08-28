import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { ShieldCheck, Server, Lock, ArrowRight, Video, Sparkles, Terminal } from 'lucide-react';
import { NavRoute } from '../types';

const Home: React.FC = () => {
  return (
    <>
      <SEO 
        title="Oakivo Solutions Inc. | Premium DevSecOps & Cloud Security"
        description="We architect bespoke, self-healing cloud infrastructure and shift-left pipelines. Ship faster without failing another compliance audit."
      />
      
      {/* Hero Section */}
      <header className="relative min-h-screen flex items-center justify-center overflow-hidden -mt-20 lg:-mt-24 pt-20">
        {/* Video Placeholder */}
        <div className="absolute inset-0 w-full h-full bg-slate-900">
            <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover opacity-30 mix-blend-luminosity">
                <source src="https://cdn.pixabay.com/video/2020/05/25/40118-425667305_large.mp4" type="video/mp4" />
            </video>
        </div>
        {/* Overlay Gradients */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-950/50 to-slate-950"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-900/20 via-transparent to-transparent"></div>
        
        <div className="relative z-10 container mx-auto px-6 flex flex-col items-center text-center">
            <div className="inline-flex items-center gap-2 mb-8 px-5 py-2 rounded-full border border-cyan-500/20 bg-cyan-500/10 text-cyan-400 text-xs font-semibold tracking-[0.2em] uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></span>
                Enterprise DevSecOps
            </div>
            <h1 className="text-5xl md:text-7xl lg:text-[5.5rem] font-display font-bold tracking-tighter mb-6 leading-[1.05]">
                Automated Security.<br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-indigo-400 to-indigo-600">Uncompromised Speed.</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-400 max-w-2xl font-light leading-relaxed mb-12">
                We architect bespoke, self-healing cloud infrastructure and shift-left pipelines. Ship faster without failing another compliance audit.
            </p>
            <Link to={NavRoute.BOOKING} className="relative group inline-flex items-center justify-center px-10 py-5 text-sm font-medium tracking-widest uppercase text-white transition-all duration-500 rounded-full bg-indigo-600 hover:bg-indigo-500 hover:shadow-[0_0_40px_-10px_rgba(99,102,241,0.6)] overflow-hidden">
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out"></div>
                <span className="relative z-10 flex items-center gap-3">
                    Initialize Audit
                    <ArrowRight className="w-4 h-4 transition-transform duration-500 group-hover:translate-x-1.5" />
                </span>
            </Link>
        </div>
      </header>

      {/* Bento Box Value Proposition */}
      <section id="arsenal" className="py-32 md:py-48 px-6 relative bg-slate-950">
        {/* Decorative Ambient Light */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="container mx-auto max-w-7xl relative z-10">
            <div className="mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8">
                <div className="max-w-2xl">
                    <h2 className="text-4xl md:text-5xl font-display font-bold tracking-tight mb-6">The DevSecOps Arsenal</h2>
                    <p className="text-slate-400 text-lg font-light leading-relaxed">Modular, production-tested pillars designed to secure your cloud infrastructure without bottlenecking engineering velocity.</p>
                </div>
            </div>

            <div className="bento-grid">
                {/* Large Featured Card */}
                <div className="col-span-12 lg:col-span-8 glass-panel rounded-[2rem] p-10 md:p-14 group hover:border-cyan-500/30 transition-all duration-700 relative overflow-hidden flex flex-col justify-between min-h-[400px]">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-[80px] group-hover:bg-cyan-500/20 transition-all duration-700 -translate-y-1/2 translate-x-1/3"></div>
                    <div className="relative z-10">
                        <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 flex items-center justify-center mb-8 border border-cyan-500/20 text-cyan-400">
                            <ShieldCheck className="w-6 h-6" />
                        </div>
                    </div>
                    <div className="relative z-10">
                        <h3 className="text-3xl md:text-4xl font-display font-bold mb-4 tracking-tight">Continuous Cloud Compliance</h3>
                        <p className="text-slate-400 leading-relaxed font-light md:text-lg max-w-xl">
                            Turn compliance from an annual nightmare into continuous assurance. Automated drift detection and push-button cryptographic evidence for SOC 2, PIPEDA, and ISO 27001 across multi-cloud environments.
                        </p>
                    </div>
                </div>

                {/* Small Card 1 */}
                <div className="col-span-12 md:col-span-6 lg:col-span-4 glass-panel rounded-[2rem] p-10 group hover:border-indigo-500/30 hover:-translate-y-2 transition-all duration-500 flex flex-col justify-between min-h-[400px]">
                    <div className="w-12 h-12 rounded-xl bg-indigo-500/10 flex items-center justify-center mb-8 border border-indigo-500/20 text-indigo-400">
                        <Terminal className="w-5 h-5" />
                    </div>
                    <div>
                        <h3 className="text-2xl font-display font-bold mb-4 tracking-tight">Shift-Left Pipeline Speed</h3>
                        <p className="text-slate-400 font-light leading-relaxed">
                            Build fast. Break nothing. We engineer CI/CD gates that scan for vulnerabilities in milliseconds during pull requests, accelerating velocity by 10x.
                        </p>
                    </div>
                </div>

                {/* Small Card 2 */}
                <div className="col-span-12 md:col-span-6 lg:col-span-4 glass-panel rounded-[2rem] p-10 group hover:border-slate-500/50 hover:-translate-y-2 transition-all duration-500 flex flex-col justify-between min-h-[300px]">
                    <div className="w-12 h-12 rounded-xl bg-slate-800/50 flex items-center justify-center mb-8 border border-slate-700/50 text-slate-300">
                        <Lock className="w-5 h-5" />
                    </div>
                    <div>
                        <h3 className="text-2xl font-display font-bold mb-4 tracking-tight">ERP Zero Trust IAM</h3>
                        <p className="text-slate-400 font-light leading-relaxed">
                            Sub-second credential de-provisioning and least-privilege role matrices protecting your core financial data.
                        </p>
                    </div>
                </div>

                {/* Wide Card */}
                <div className="col-span-12 lg:col-span-8 glass-panel rounded-[2rem] p-10 md:p-14 flex flex-col md:flex-row items-start md:items-center justify-between group hover:border-cyan-500/20 hover:bg-slate-900/50 transition-all duration-500 min-h-[300px]">
                    <div className="max-w-xl">
                        <h3 className="text-2xl md:text-3xl font-display font-bold mb-4 tracking-tight">Automated Incident Remediation</h3>
                        <p className="text-slate-400 font-light leading-relaxed md:text-lg">
                            Autonomous SRE runbooks that quarantine compromised workloads and rotate breached secrets at machine speed before humans even wake up.
                        </p>
                    </div>
                    <div className="mt-8 md:mt-0 flex flex-col items-start md:items-end gap-2 shrink-0">
                        <div className="flex items-center gap-3 bg-cyan-500/10 border border-cyan-500/20 px-5 py-2.5 rounded-full">
                            <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></div>
                            <span className="text-sm font-semibold tracking-widest text-cyan-400 uppercase">99.99% Uptime</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </section>

      {/* The 3-Step Process (Asymmetrical) */}
      <section id="process" className="py-32 md:py-48 px-6 border-t border-white/[0.02] relative overflow-hidden bg-slate-950">
        <div className="container mx-auto max-w-5xl relative z-10">
            <div className="text-center mb-32">
                <h2 className="text-4xl md:text-5xl font-display font-bold tracking-tight mb-6">Deployment Protocol</h2>
                <p className="text-slate-400 text-lg max-w-xl mx-auto font-light leading-relaxed">A surgical, predictable integration of enterprise security controls into your existing infrastructure.</p>
            </div>

            <div className="space-y-32 md:space-y-48">
                {/* Step 1 */}
                <div className="flex flex-col md:flex-row items-start md:items-center gap-8 md:gap-24 group">
                    <div className="md:w-5/12 flex justify-start md:justify-end">
                        <div className="text-7xl md:text-[9rem] font-display font-bold text-transparent transition-all duration-700" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.1)' }}>
                            01
                        </div>
                    </div>
                    <div className="md:w-7/12 space-y-5 relative">
                        <div className="absolute -left-6 md:-left-12 top-2 w-px h-0 bg-indigo-500 group-hover:h-full transition-all duration-700 ease-out"></div>
                        <h3 className="text-3xl font-display font-bold tracking-tight">Security & Architecture Audit</h3>
                        <p className="text-slate-400 font-light leading-relaxed text-lg">
                            We map your multi-cloud footprint, analyze existing CI/CD bottlenecks, and identify immediate compliance gaps. No disruptions to active development.
                        </p>
                    </div>
                </div>

                {/* Step 2 */}
                <div className="flex flex-col md:flex-row-reverse items-start md:items-center gap-8 md:gap-24 group">
                    <div className="md:w-5/12 flex justify-start">
                        <div className="text-7xl md:text-[9rem] font-display font-bold text-transparent transition-all duration-700" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.1)' }}>
                            02
                        </div>
                    </div>
                    <div className="md:w-7/12 space-y-5 md:text-right relative">
                        <div className="absolute -left-6 md:left-auto md:-right-12 top-2 w-px h-0 bg-cyan-500 group-hover:h-full transition-all duration-700 ease-out"></div>
                        <h3 className="text-3xl font-display font-bold tracking-tight">Automated Pipeline Deployment</h3>
                        <p className="text-slate-400 font-light leading-relaxed text-lg">
                            Surgical injection of shift-left security gates, secrets scanning, and Infrastructure-as-Code drift detection directly into your Git repositories.
                        </p>
                    </div>
                </div>

                {/* Step 3 */}
                <div className="flex flex-col md:flex-row items-start md:items-center gap-8 md:gap-24 group">
                    <div className="md:w-5/12 flex justify-start md:justify-end">
                        <div className="text-7xl md:text-[9rem] font-display font-bold text-transparent transition-all duration-700" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.1)' }}>
                            03
                        </div>
                    </div>
                    <div className="md:w-7/12 space-y-5 relative">
                        <div className="absolute -left-6 md:-left-12 top-2 w-px h-0 bg-indigo-500 group-hover:h-full transition-all duration-700 ease-out"></div>
                        <h3 className="text-3xl font-display font-bold tracking-tight">Continuous SRE Oversight</h3>
                        <p className="text-slate-400 font-light leading-relaxed text-lg">
                            Hand-off to our autonomous event-driven runbooks and continuous compliance engine, backed by our local Dieppe-based engineering team.
                        </p>
                    </div>
                </div>
            </div>
        </div>
      </section>
    </>
  );
};

export default Home;
