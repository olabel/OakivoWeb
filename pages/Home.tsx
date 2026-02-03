
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, Database, BrainCircuit, ShieldCheck, Zap, 
  Layers, Cpu, LayoutGrid, CheckCircle, TrendingUp, 
  MessageSquare, Sparkles, Activity, Network, MousePointer2,
  Globe
} from 'lucide-react';
import Button from '../components/Button';
import { NavRoute } from '../types';
import { useLanguage } from '../context/LanguageContext';
import SEO from '../components/SEO';
import Logo from '../components/Logo';

const ProductVisual = () => {
  return (
    <div className="relative w-full max-w-2xl mx-auto h-[500px] flex items-center justify-center">
      {/* Background Decorative Rings */}
      <div className="absolute inset-0 flex items-center justify-center opacity-20">
        <div className="w-[400px] h-[400px] border border-oakivo-primary rounded-full animate-pulse"></div>
        <div className="absolute w-[550px] h-[550px] border border-oakivo-primary rounded-full opacity-50"></div>
      </div>

      {/* Floating UI Elements (SaaS style) */}
      <div className="absolute top-10 right-0 w-64 bg-white p-5 rounded-3xl shadow-vise-xl animate-float stagger-1 border border-gray-100 z-20">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-oakivo-secondary/10 rounded-xl flex items-center justify-center text-oakivo-secondary">
            <Zap size={20} />
          </div>
          <div>
            <p className="text-[10px] font-black uppercase text-gray-400">Growth Velocity</p>
            <p className="font-bold text-oakivo-primary">+42% YoY</p>
          </div>
        </div>
        <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
          <div className="h-full bg-oakivo-secondary w-3/4"></div>
        </div>
      </div>

      <div className="absolute bottom-10 -left-10 w-72 bg-oakivo-primary text-white p-6 rounded-[2rem] shadow-premium animate-float stagger-3 z-20">
        <div className="flex items-center gap-4 mb-4">
           <MessageSquare size={24} className="text-oakivo-secondary" />
           <p className="font-bold text-sm">Agentic Action</p>
        </div>
        <p className="text-xs text-gray-300 leading-relaxed mb-4">"Inventory reconciled across 4 warehouses. 12 orders auto-fulfilled."</p>
        <div className="flex -space-x-2">
           {[1,2,3].map(i => <div key={i} className="w-8 h-8 rounded-full border-2 border-oakivo-primary bg-gray-600" />)}
           <div className="w-8 h-8 rounded-full border-2 border-oakivo-primary bg-oakivo-secondary flex items-center justify-center text-[10px] font-bold">+12</div>
        </div>
      </div>

      {/* Central Identity Card */}
      <div className="w-[420px] bg-white rounded-[3rem] shadow-vise-xl p-10 border border-gray-100 relative z-10 overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-5 text-oakivo-primary">
          <Database size={120} />
        </div>
        <div className="flex items-center gap-4 mb-8">
           <div className="w-12 h-12 bg-oakivo-surface rounded-2xl flex items-center justify-center">
              <Logo withText={false} className="h-8" />
           </div>
           <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Core Engine Sync</p>
        </div>
        <div className="space-y-6">
           <div className="h-4 w-3/4 bg-gray-50 rounded-full"></div>
           <div className="h-4 w-full bg-gray-50 rounded-full"></div>
           <div className="h-4 w-1/2 bg-gray-50 rounded-full"></div>
        </div>
        <div className="mt-12 pt-8 border-t border-gray-50 flex items-center justify-between">
           <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-oakivo-secondary animate-pulse"></div>
              <span className="text-[10px] font-bold text-gray-400 uppercase">System Active</span>
           </div>
           <Activity size={20} className="text-oakivo-secondary" />
        </div>
      </div>
    </div>
  );
};

const Home: React.FC = () => {
  const { t } = useLanguage();

  return (
    <>
      <SEO 
        title="Oakivo Solutions | The Operating System for Industrial Growth"
        description="Replace technical debt with autonomous operational logic. Oakivo orchestrates mission-critical Odoo 18 ecosystems and Agentic AI."
      />

      {/* 
        HERO SECTION: Tildei-inspired SaaS layout
      */}
      <section className="relative pt-32 lg:pt-52 pb-24 lg:pb-40 bg-white overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-oakivo-cloud/50 rounded-l-[10rem] z-0 hidden lg:block"></div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-20">
            <div className="w-full lg:w-1/2 text-center lg:text-left">
              <div className="inline-flex items-center gap-3 bg-oakivo-cloud border border-gray-100 px-5 py-2 rounded-full text-[10px] font-black text-oakivo-primary uppercase tracking-widest mb-10 animate-fade-in-up">
                <Sparkles size={14} className="text-oakivo-secondary" />
                The New Standard for ERP
              </div>
              
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif-display font-bold text-oakivo-primary leading-[1.05] mb-10 tracking-tighter animate-fade-in-up stagger-1">
                The Operating <br /> 
                <span className="italic font-light text-oakivo-secondary">System</span> for Growth.
              </h1>
              
              <p className="text-xl md:text-2xl text-gray-500 max-w-2xl leading-relaxed font-light mb-12 animate-fade-in-up stagger-2">
                Replace manual friction with autonomous logic. We orchestrate Odoo 18 and Agentic AI to help Canadian enterprises scale without technical debt.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6 animate-fade-in-up stagger-3">
                <Link to={NavRoute.CONTACT} className="w-full sm:w-auto">
                  <Button variant="black" size="lg" className="w-full px-12 py-5 shadow-premium">
                    Initiate Audit <ArrowRight size={20} className="ml-3" />
                  </Button>
                </Link>
                <div className="flex items-center gap-4 text-xs font-bold text-gray-400">
                  <div className="flex -space-x-2">
                    {[1,2,3].map(i => <div key={i} className="w-8 h-8 rounded-full bg-gray-100 border-2 border-white" />)}
                  </div>
                  Trusted by 50+ Institutional Leaders
                </div>
              </div>
            </div>

            <div className="w-full lg:w-1/2 animate-fade-in-up stagger-4">
              <ProductVisual />
            </div>
          </div>
        </div>
      </section>

      {/* 
        TRUST SECTION 
      */}
      <section className="py-20 border-y border-gray-100 bg-oakivo-surface">
        <div className="container mx-auto px-6">
           <p className="text-center text-[10px] font-black uppercase tracking-[0.4em] text-gray-300 mb-12">Institutional Grade Compliance</p>
           <div className="flex flex-wrap justify-center items-center gap-12 lg:gap-24 opacity-40 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-700">
              <div className="flex items-center gap-3 font-bold text-sm"> <ShieldCheck size={20} /> SOC2 Type II </div>
              <div className="flex items-center gap-3 font-bold text-sm"> <Globe size={20} /> PIPEDA Compliant </div>
              <div className="flex items-center gap-3 font-bold text-sm"> <Database size={20} /> Canadian Residency </div>
              <div className="flex items-center gap-3 font-bold text-sm"> <Activity size={20} /> 99.99% Uptime </div>
           </div>
        </div>
      </section>

      {/* 
        CAPABILITIES GRID (Bento Style)
      */}
      <section className="py-32 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center mb-24">
             <h2 className="text-4xl md:text-6xl font-serif-display font-bold text-oakivo-primary mb-8 tracking-tighter">Everything you need <br/> to automate at scale.</h2>
             <p className="text-xl text-gray-500 font-light">One orchestrated ecosystem. No fragmented software. Pure industrial agility.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8">
            {/* Main Feature - Large */}
            <div className="md:col-span-8 bento-card p-12 flex flex-col justify-between group">
               <div className="flex justify-between items-start mb-12">
                  <div className="w-16 h-16 bg-oakivo-secondary/10 rounded-3xl flex items-center justify-center text-oakivo-secondary group-hover:scale-110 transition-transform duration-500">
                     <BrainCircuit size={32} />
                  </div>
                  <MousePointer2 size={24} className="text-gray-200 group-hover:text-oakivo-secondary transition-colors" />
               </div>
               <div>
                  <h3 className="text-3xl lg:text-5xl font-serif-display font-bold text-oakivo-primary mb-6">Agentic AI Orchestration</h3>
                  <p className="text-xl text-gray-500 font-light leading-relaxed max-w-xl">
                    Deploy reasoning engines that don't just alert you—they take action. Reconcile warehouses, fulfill orders, and optimize routes without human intervention.
                  </p>
               </div>
            </div>

            {/* Small Feature */}
            <div className="md:col-span-4 bento-card p-12 flex flex-col justify-between bg-oakivo-primary text-white">
               <Zap className="text-oakivo-secondary mb-12" size={40} />
               <div>
                  <h3 className="text-3xl font-serif-display font-bold mb-6">Odoo 18 Ready</h3>
                  <p className="text-lg text-gray-400 font-light leading-relaxed">
                    Surgical implementation of the world's most versatile ERP. Unified logic for multi-entity operations.
                  </p>
               </div>
            </div>

            {/* Square Feature */}
            <div className="md:col-span-4 bento-card p-12 flex flex-col justify-between">
               <div className="h-40 w-full bg-oakivo-cloud rounded-3xl mb-12 flex items-center justify-center">
                  <Activity size={64} className="text-oakivo-primary/20" />
               </div>
               <div>
                  <h3 className="text-2xl font-bold text-oakivo-primary mb-4">Real-time Telemetry</h3>
                  <p className="text-sm text-gray-500 font-light">24/7 technical monitoring of your entire automation stack.</p>
               </div>
            </div>

            {/* Long Feature */}
            <div className="md:col-span-8 bento-card p-12 flex flex-col lg:flex-row items-center gap-12">
               <div className="w-full lg:w-1/2">
                  <h3 className="text-3xl font-serif-display font-bold text-oakivo-primary mb-6">Zero-Trust Infrastructure</h3>
                  <p className="text-lg text-gray-500 font-light leading-relaxed">
                    Institutional security baked into every byte. Data sovereignty with 100% native Canadian residency.
                  </p>
                  <div className="mt-8 flex gap-3">
                     {[1,2,3,4].map(i => <div key={i} className="w-10 h-2 bg-oakivo-secondary rounded-full" />)}
                  </div>
               </div>
               <div className="w-full lg:w-1/2 bg-oakivo-surface p-8 rounded-[2rem] border border-gray-100">
                  <ShieldCheck size={120} className="mx-auto text-oakivo-primary opacity-10" />
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* 
        CONVERSATIONAL ROI 
      */}
      <section className="py-32 bg-oakivo-cloud/30">
        <div className="container mx-auto px-6">
           <div className="bg-white rounded-[4rem] p-12 lg:p-24 shadow-soft border border-gray-100 flex flex-col lg:flex-row items-center gap-20">
              <div className="w-full lg:w-1/2">
                 <div className="flex items-center gap-4 mb-8">
                    <div className="w-12 h-12 bg-oakivo-primary rounded-2xl flex items-center justify-center text-white">
                       <MessageSquare size={24} />
                    </div>
                    <span className="text-sm font-bold text-oakivo-primary">Ask an Architect</span>
                 </div>
                 <h2 className="text-4xl md:text-6xl font-serif-display font-bold text-oakivo-primary mb-10 tracking-tighter leading-none">Why orchestrate?</h2>
                 <div className="space-y-8">
                    {[
                      { q: "Software is fragmented.", a: "We unify your logic in Odoo." },
                      { q: "Technical debt is mounting.", a: "Our AI engines automate the cleanup." },
                      { q: "Manual work is expensive.", a: "Agentic workflows de-couple labor from growth." }
                    ].map((item, i) => (
                      <div key={i} className="flex gap-6 group">
                         <div className="w-1.5 h-auto bg-gray-100 group-hover:bg-oakivo-secondary transition-colors rounded-full" />
                         <div>
                            <p className="font-bold text-gray-400 mb-1">{item.q}</p>
                            <p className="text-xl font-bold text-oakivo-primary">{item.a}</p>
                         </div>
                      </div>
                    ))}
                 </div>
              </div>
              <div className="w-full lg:w-1/2">
                 <div className="aspect-square bg-oakivo-surface rounded-[3rem] p-12 flex flex-col justify-center relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-10 opacity-[0.02] text-oakivo-primary">
                       <TrendingUp size={300} />
                    </div>
                    <div className="space-y-12 relative z-10">
                       <div className="flex items-end justify-between border-b border-gray-200 pb-6">
                          <div>
                             <p className="text-[10px] font-black uppercase text-gray-400 mb-2">Operational Velocity</p>
                             <p className="text-5xl font-serif-display font-bold text-oakivo-primary">+88%</p>
                          </div>
                          <Activity className="text-oakivo-secondary mb-2" />
                       </div>
                       <div className="flex items-end justify-between border-b border-gray-100 pb-6">
                          <div>
                             <p className="text-[10px] font-black uppercase text-gray-400 mb-2">Error Reduction</p>
                             <p className="text-5xl font-serif-display font-bold text-oakivo-primary">-99%</p>
                          </div>
                          <CheckCircle className="text-oakivo-secondary mb-2" />
                       </div>
                    </div>
                    <Link to={NavRoute.CONTACT} className="mt-16">
                       <Button variant="black" className="w-full py-5 text-xl rounded-2xl">Get your ROI Blueprint</Button>
                    </Link>
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* 
        FINAL CALL 
      */}
      <section className="py-40 bg-white">
        <div className="container mx-auto px-6 text-center">
           <h2 className="text-6xl md:text-[8rem] font-serif-display font-bold text-oakivo-primary mb-16 tracking-tighter leading-[0.9]">
             Build for <br/> <span className="italic font-light text-oakivo-secondary">tomorrow.</span>
           </h2>
           <p className="text-2xl text-gray-400 mb-20 max-w-2xl mx-auto font-light leading-relaxed">
             Join the industrial elite. Orchestrate your expansion with Canada's digital transformation authority.
           </p>
           <div className="flex flex-col sm:flex-row justify-center gap-6">
              <Link to={NavRoute.CONTACT}>
                 <Button variant="black" size="lg" className="px-16 py-6 text-2xl shadow-premium rounded-[2rem]">
                   Request System Audit
                 </Button>
              </Link>
           </div>
        </div>
      </section>
    </>
  );
};

export default Home;
