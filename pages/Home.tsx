import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, Database, BrainCircuit, ShieldCheck, Zap, 
  Layers, Activity, Network, Globe
} from 'lucide-react';
import Button from '../components/Button';
import { NavRoute } from '../types';
import { useLanguage } from '../context/LanguageContext';
import SEO from '../components/SEO';
import SafeImage from '../components/SafeImage';

const ProductVisual = () => {
  return (
    <div className="relative w-full h-full min-h-[500px] flex items-center justify-center">
      {/* Decorative pulse rings */}
      <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
        <div className="w-[450px] h-[450px] border-2 border-oakivo-primary rounded-full animate-pulse"></div>
        <div className="absolute w-[600px] h-[600px] border border-oakivo-primary rounded-full opacity-40"></div>
      </div>

      <div className="relative z-10 w-full max-w-lg">
        {/* Floating dashboard element */}
        <div className="bg-white/80 backdrop-blur-xl rounded-[3.5rem] shadow-vise-xl p-10 md:p-14 border border-white/50 transform hover:-rotate-1 transition-transform duration-1000">
           <div className="flex items-center gap-5 mb-10">
              <div className="w-14 h-14 bg-oakivo-primary rounded-2xl flex items-center justify-center text-oakivo-secondary shadow-lg">
                <Activity size={28} />
              </div>
              <div>
                <p className="text-[10px] font-black uppercase text-gray-400 tracking-[0.3em]">System Telemetry</p>
                <p className="font-bold text-oakivo-primary text-xl">Operational Health: 99.9%</p>
              </div>
           </div>
           
           <div className="space-y-6 mb-10">
              <div className="h-2.5 w-full bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-oakivo-secondary w-[92%] animate-pulse"></div>
              </div>
              <div className="h-2.5 w-[85%] bg-gray-100 rounded-full"></div>
              <div className="h-2.5 w-[60%] bg-gray-100 rounded-full"></div>
           </div>

           <div className="pt-8 border-t border-gray-100 flex items-center justify-between">
              <div className="flex -space-x-3">
                 {[1,2,3,4].map(i => <div key={i} className="w-10 h-10 rounded-full border-4 border-white bg-gray-200 shadow-sm" />)}
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black uppercase text-oakivo-secondary tracking-[0.2em] animate-pulse">Live</span>
                <span className="text-xs font-bold text-oakivo-primary">Nodes Synced</span>
              </div>
           </div>
        </div>

        {/* Floating badge 1 */}
        <div className="absolute -top-6 -right-12 bg-[#020504] text-white px-8 py-5 rounded-[2rem] shadow-2xl animate-float stagger-2 border border-white/10">
           <p className="text-[10px] font-black uppercase tracking-[0.3em] text-oakivo-secondary mb-1">Impact</p>
           <p className="text-3xl font-bold">+124% <span className="text-sm font-light text-gray-400 ml-1">Efficiency</span></p>
        </div>

        {/* Floating badge 2 */}
        <div className="absolute -bottom-8 -left-12 bg-white p-8 rounded-[3rem] shadow-vise-lg animate-float border border-gray-50">
           <BrainCircuit size={36} className="text-oakivo-primary mb-4" />
           <p className="text-sm font-black uppercase tracking-widest text-gray-400">Agentic Logic</p>
           <p className="font-bold text-oakivo-primary">Active Reasoning</p>
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
        REVAMPED HERO: High-End Cinematic
      */}
      <section className="relative min-h-[95vh] flex items-center bg-white overflow-hidden">
        {/* Subtle Backdrop Image */}
        <div className="absolute inset-0 z-0">
           <SafeImage 
             src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=90&w=2400&auto=format&fit=crop" 
             className="w-full h-full object-cover opacity-[0.04] grayscale"
             alt="Industrial Tech background"
           />
           <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-transparent"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10 pt-32 pb-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">
            
            {/* Left Content Column */}
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-3 bg-oakivo-surface border border-gray-100 px-6 py-2.5 rounded-full mb-12 animate-fade-in-up">
                <ShieldCheck size={18} className="text-oakivo-secondary" />
                <span className="text-[10px] font-black text-oakivo-primary uppercase tracking-[0.4em]">Verified Industrial Sovereignty</span>
              </div>
              
              <h1 className="text-6xl md:text-8xl lg:text-[10rem] font-serif-display font-bold text-oakivo-primary leading-[0.85] mb-14 tracking-tighter animate-fade-in-up stagger-1">
                Orchestrating <br />
                the <span className="italic font-light text-oakivo-secondary">Digital</span> Future.
              </h1>
              
              <p className="text-xl md:text-3xl text-gray-500 max-w-2xl leading-relaxed font-light mb-16 animate-fade-in-up stagger-2">
                Engineering <span className="text-oakivo-primary font-bold">Odoo 18</span> and <span className="text-oakivo-primary font-bold">Agentic AI</span> to replace friction with high-velocity logic. Native Canadian residency. Proven industrial results.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center gap-10 animate-fade-in-up stagger-3">
                <Link to={NavRoute.CONTACT} className="w-full sm:w-auto">
                  <Button variant="black" size="lg" className="w-full px-20 py-8 shadow-premium group text-2xl">
                    Initiate Audit <ArrowRight size={28} className="ml-4 group-hover:translate-x-3 transition-transform" />
                  </Button>
                </Link>
                <div className="flex flex-col items-start gap-1">
                  <div className="flex items-center gap-3 text-[11px] font-black text-gray-400 uppercase tracking-widest">
                    <Globe size={18} className="text-oakivo-secondary" /> 
                    HQ: Moncton-Dieppe, NB
                  </div>
                  <div className="h-1 w-full bg-gray-50 rounded-full mt-1 overflow-hidden">
                    <div className="h-full bg-oakivo-secondary w-1/3 animate-marquee-fast"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Visual Column */}
            <div className="lg:col-span-5 hidden lg:block animate-fade-in-up stagger-4">
               <ProductVisual />
            </div>
          </div>
        </div>
      </section>

      {/* 
        TELEMETRY TICKER
      */}
      <section className="py-12 border-y border-gray-100 bg-[#020504] text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 pointer-events-none bg-[linear-gradient(to_right,#ffffff12_1px,transparent_1px),linear-gradient(to_bottom,#ffffff12_1px,transparent_1px)] bg-[size:40px_40px]"></div>
        <div className="container mx-auto px-6 overflow-hidden flex items-center">
           <div className="flex items-center gap-12 whitespace-nowrap animate-marquee">
              {[
                { l: "ACTIVE ORCHESTRATIONS", v: "1,482", i: <Network size={14}/> },
                { l: "SYSTEM UPTIME", v: "99.998%", i: <Activity size={14}/> },
                { l: "LOGIC LATENCY", v: "4.2ms", i: <Zap size={14}/> },
                { l: "DATA RESIDENCY", v: "CANADA-NATIVE", i: <Globe size={14}/> },
                { l: "COMPLIANCE", v: "SOC2 ALIGNED", i: <ShieldCheck size={14}/> }
              ].map((tick, i) => (
                <div key={i} className="flex items-center gap-4 border-r border-white/10 pr-12 last:border-0">
                   <div className="text-oakivo-secondary">{tick.i}</div>
                   <div className="text-[10px] font-black tracking-[0.2em] text-white/40">{tick.l}</div>
                   <div className="text-sm font-bold tracking-tight">{tick.v}</div>
                </div>
              ))}
           </div>
           {/* Seamless loop */}
           <div className="flex items-center gap-12 whitespace-nowrap animate-marquee ml-12">
              {[
                { l: "ACTIVE ORCHESTRATIONS", v: "1,482", i: <Network size={14}/> },
                { l: "SYSTEM UPTIME", v: "99.998%", i: <Activity size={14}/> },
                { l: "LOGIC LATENCY", v: "4.2ms", i: <Zap size={14}/> },
                { l: "DATA RESIDENCY", v: "CANADA-NATIVE", i: <Globe size={14}/> },
                { l: "COMPLIANCE", v: "SOC2 ALIGNED", i: <ShieldCheck size={14}/> }
              ].map((tick, i) => (
                <div key={i} className="flex items-center gap-4 border-r border-white/10 pr-12 last:border-0">
                   <div className="text-oakivo-secondary">{tick.i}</div>
                   <div className="text-[10px] font-black tracking-[0.2em] text-white/40">{tick.l}</div>
                   <div className="text-sm font-bold tracking-tight">{tick.v}</div>
                </div>
              ))}
           </div>
        </div>
      </section>

      {/* 
        BENTO CAPABILITIES
      */}
      <section className="py-40 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center mb-24">
             <div className="inline-flex items-center gap-3 text-oakivo-secondary font-black uppercase text-[10px] tracking-[0.4em] mb-8">
                <Layers size={16} /> Engineering Matrix
             </div>
             <h2 className="text-5xl md:text-7xl font-serif-display font-bold text-oakivo-primary mb-10 tracking-tighter leading-none">The high-fidelity <br/> automation stack.</h2>
             <p className="text-2xl text-gray-500 font-light max-w-2xl mx-auto leading-relaxed">
               One orchestrated ecosystem. Zero technical debt. Engineering-led digital transformation for the modern industrial age.
             </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-10">
            <div className="md:col-span-7 bento-card p-14 flex flex-col justify-between group bg-oakivo-primary text-white relative overflow-hidden">
               <div className="absolute top-0 right-0 p-12 opacity-5 text-white pointer-events-none">
                  <Database size={240} />
               </div>
               <div className="relative z-10">
                  <div className="w-16 h-16 bg-white/10 border border-white/10 rounded-3xl flex items-center justify-center text-oakivo-secondary mb-12 shadow-2xl">
                     <Database size={32} />
                  </div>
                  <h3 className="text-4xl lg:text-6xl font-serif-display font-bold mb-8 tracking-tighter">Odoo 18 <br/> Orchestration.</h3>
                  <p className="text-xl text-gray-400 font-light leading-relaxed max-w-lg mb-12">
                    Unified business logic across multi-warehouse, multi-entity industrial operations. A single, surgical source of truth.
                  </p>
                  <Link to={NavRoute.SERVICES} className="inline-flex items-center gap-4 text-[11px] font-black uppercase tracking-[0.3em] text-oakivo-secondary hover:text-white transition-colors">
                     Explore Matrix <ArrowRight size={18} />
                  </Link>
               </div>
               <div className="mt-16 h-32 w-full bg-white/5 rounded-3xl border border-white/5 relative">
                  <div className="absolute inset-0 flex items-center justify-around px-10">
                     {[1,2,3,4,5].map(i => <div key={i} className="w-1 h-12 bg-white/10 rounded-full relative"><div className="absolute top-0 left-0 w-full h-1/2 bg-oakivo-secondary animate-pulse" style={{animationDelay: `${i*0.2}s`}}></div></div>)}
                  </div>
               </div>
            </div>

            <div className="md:col-span-5 bento-card p-14 flex flex-col justify-between group bg-white border border-gray-100">
               <div>
                  <div className="w-16 h-16 bg-oakivo-secondary/10 border border-oakivo-secondary/10 rounded-3xl flex items-center justify-center text-oakivo-secondary mb-12">
                     <BrainCircuit size={32} />
                  </div>
                  <h3 className="text-4xl font-serif-display font-bold text-oakivo-primary mb-6 tracking-tighter">Agentic AI <br/> Reasoners.</h3>
                  <p className="text-lg text-gray-500 font-light leading-relaxed mb-10">
                    Reasoning engines that act on data. From predictive procurement to automated quality control.
                  </p>
               </div>
               <div className="p-8 bg-oakivo-surface rounded-3xl border border-gray-100">
                  <div className="h-1 w-full bg-gray-100 rounded-full mb-2"></div>
                  <div className="h-1 w-3/4 bg-gray-100 rounded-full"></div>
               </div>
            </div>

            <div className="md:col-span-5 bento-card p-14 flex flex-col justify-between bg-oakivo-cloud/50 border border-gray-100">
               <div>
                  <ShieldCheck className="text-oakivo-primary mb-10" size={48} />
                  <h3 className="text-3xl font-serif-display font-bold text-oakivo-primary mb-6 tracking-tighter">Zero-Trust <br/> Cyber Resilience.</h3>
                  <p className="text-lg text-gray-500 font-light leading-relaxed">
                    Identity-aware infrastructure built for industrial sovereignty. SOC2 alignment with native Canadian data isolation.
                  </p>
               </div>
            </div>

            <div className="md:col-span-7 bento-card relative h-[450px] group">
               <SafeImage 
                 src="https://images.unsplash.com/photo-1551434678-e076c223a692?q=90&w=1600&auto=format&fit=crop" 
                 alt="Industrial Tech" 
                 className="absolute inset-0 w-full h-full grayscale group-hover:grayscale-0 transition-all duration-[2000ms]"
               />
               <div className="absolute inset-0 bg-oakivo-primary/60 group-hover:bg-oakivo-primary/40 transition-all duration-700"></div>
               <div className="absolute inset-0 p-14 flex flex-col justify-end text-white relative z-10">
                  <div className="max-w-md">
                     <h3 className="text-4xl font-serif-display font-bold mb-6 tracking-tighter leading-none">Modernizing the <br/> industrial core.</h3>
                     <p className="text-gray-300 font-light leading-relaxed mb-8">
                        Bridging the digital execution gap for Canadian manufacturing and logistics.
                     </p>
                     <Link to={NavRoute.VERTICALS}>
                        <Button variant="white" size="sm" className="shadow-2xl">View Vertical Strategies</Button>
                     </Link>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* 
        FINAL CALL 
      */}
      <section className="py-40 bg-[#020504] text-white text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-oakivo-secondary"></div>
        <div className="container mx-auto px-6 relative z-10">
           <h2 className="text-6xl md:text-9xl font-serif-display font-bold mb-16 tracking-tighter leading-[0.9]">
             Architecting <br/> <span className="italic font-light text-oakivo-secondary">Canada's</span> future.
           </h2>
           <p className="text-2xl text-gray-400 mb-20 max-w-2xl mx-auto font-light leading-relaxed">
             Join the industrial elite. Orchestrate your expansion with Canada's digital transformation authority.
           </p>
           <div className="flex flex-col sm:flex-row justify-center gap-8">
              <Link to={NavRoute.CONTACT}>
                 <Button variant="white" size="lg" className="px-20 py-7 text-2xl shadow-premium rounded-[2rem] bg-white text-black hover:bg-oakivo-secondary transition-all">
                   Initiate Systemic Audit
                 </Button>
              </Link>
           </div>
        </div>
      </section>
    </>
  );
};

export default Home;