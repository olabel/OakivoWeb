import React from 'react';
import Section from '../components/Section';
import { Factory, ShoppingBag, Briefcase, Truck, Landmark, Zap, ArrowRight, Cog, Globe, Database, Shield } from 'lucide-react';
import Button from '../components/Button';
import { Link } from 'react-router-dom';
import { NavRoute } from '../types';
import { useLanguage, translations } from '../context/LanguageContext';
import SEO from '../components/SEO';

const Verticals: React.FC = () => {
  const { t, language } = useLanguage();
  const cards = translations[language].verticals.cards;
  const icons = [Factory, ShoppingBag, Briefcase, Truck, Landmark, Zap];

  return (
    <>
      <SEO 
        title="Industry Solutions | Oakivo Digital Transformation"
        description="Specialized AI and ERP solutions for Manufacturing, Retail, Logistics, and more. Orchestrating digital growth across Canada's key sectors."
        keywords="Industry 4.0 Canada, Manufacturing ERP, Retail Automation, Public Sector Digitalization"
      />

      {/* Hero */}
      <section className="bg-[#020504] text-white pt-48 pb-24 relative overflow-hidden">
         <div className="absolute inset-0 bg-gradient-to-br from-oakivo-primary via-black to-black opacity-90"></div>
         <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-oakivo-secondary/5 rounded-full blur-[140px] -mr-40 -mt-40"></div>
         <div className="container mx-auto px-6 relative z-10">
            <div className="flex items-center gap-4 mb-8">
               <div className="h-[1px] w-12 bg-oakivo-secondary"></div>
               <span className="text-oakivo-secondary font-black tracking-[0.4em] uppercase text-[10px]">{t('nav.verticals')}</span>
            </div>
            <h1 className="text-6xl md:text-[9rem] font-serif-display font-bold max-w-5xl leading-[0.8] mb-12 tracking-tighter">
              Verticals.
            </h1>
            <p className="text-2xl md:text-4xl text-gray-400 max-w-3xl font-light leading-relaxed">
              Tailored digital strategies engineered for the structural complexities of Canada's most critical sectors.
            </p>
         </div>
      </section>

      {/* Industry Matrix Grid */}
      <section className="bg-white py-32">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {cards.map((card: any, idx: number) => {
              const Icon = icons[idx];
              return (
                <div key={idx} className="group p-14 border border-gray-100 hover:border-oakivo-secondary/30 hover:shadow-vise-lg transition-all duration-700 rounded-[48px] bg-white flex flex-col h-full">
                   <div className="w-16 h-16 rounded-2xl bg-gray-50 flex items-center justify-center text-oakivo-primary mb-12 group-hover:bg-oakivo-secondary group-hover:text-oakivo-primary transition-all duration-500 shadow-sm">
                      <Icon size={32} strokeWidth={1.5} />
                   </div>
                   <h3 className="text-3xl font-bold font-serif-display mb-8 group-hover:text-oakivo-secondary transition-colors tracking-tight leading-none">{card.title}</h3>
                   <p className="text-gray-500 leading-relaxed text-lg font-light mb-12 flex-grow">
                     {card.desc}
                   </p>
                   <Link to={NavRoute.SERVICES} className="inline-flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.3em] text-oakivo-primary group-hover:text-oakivo-secondary transition-all">
                     EXPLORE MATRIX <ArrowRight size={18} className="group-hover:translate-x-3 transition-transform" />
                   </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Sector Authority Section */}
      <section className="bg-oakivo-surface py-40 border-y border-gray-100">
         <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
               <div>
                  <h2 className="text-5xl md:text-8xl font-serif-display font-bold mb-12 tracking-tighter leading-[0.9]">Cross-Sector <br/> <span className="text-oakivo-secondary">Mastery.</span></h2>
                  <p className="text-xl text-gray-600 font-light leading-relaxed mb-16">
                     Our architects don't just understand code; they understand industrial logic. We bring a vCISO perspective to every vertical deployment in Atlantic Canada and beyond.
                  </p>
                  <div className="space-y-8">
                     {[
                        { title: "Compliance Ready", desc: "Native support for Canadian GST/HST, payroll, and privacy laws.", icon: <Shield size={24} /> },
                        { title: "Scalable Architecture", desc: "Engineered to handle multi-company, multi-currency growth.", icon: <Globe size={24} /> },
                        { title: "Data Driven", desc: "Advanced telemetry and predictive BI built into every industry portal.", icon: <Database size={24} /> }
                     ].map((item, i) => (
                        <div key={i} className="flex gap-8 items-start p-8 bg-white rounded-3xl border border-gray-100 shadow-sm group hover:border-oakivo-secondary/30 transition-all duration-500">
                           <div className="text-oakivo-secondary mt-1 group-hover:scale-110 transition-transform">{item.icon}</div>
                           <div>
                              <h4 className="font-bold text-xl mb-2">{item.title}</h4>
                              <p className="text-gray-500 text-base font-light">{item.desc}</p>
                           </div>
                        </div>
                     ))}
                  </div>
               </div>
               <div className="relative">
                  <div className="aspect-square rounded-[64px] overflow-hidden shadow-vise-xl group">
                     <img 
                        src="https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=1600&auto=format&fit=crop" 
                        alt="Advanced Manufacturing Logic" 
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 scale-105 group-hover:scale-100"
                        loading="lazy"
                        decoding="async"
                     />
                     <div className="absolute inset-0 bg-oakivo-primary/20 group-hover:bg-transparent transition-all duration-500"></div>
                  </div>
                  <div className="absolute -bottom-10 -left-10 bg-white p-12 rounded-[48px] shadow-vise-lg border border-gray-50 hidden md:block animate-bounce-slow">
                     <Cog className="text-oakivo-secondary mb-4 animate-spin-slow" size={48} />
                     <p className="font-bold text-4xl font-serif-display text-oakivo-primary">100%</p>
                     <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Sector Precision</p>
                  </div>
               </div>
            </div>
         </div>
      </section>

      <style>{`
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(-5%); }
          50% { transform: translateY(0); }
        }
        .animate-bounce-slow { animation: bounce-slow 4s infinite ease-in-out; }
        .animate-spin-slow { animation: spin 8s linear infinite; }
      `}</style>
    </>
  );
};

export default Verticals;
