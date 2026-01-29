import React from 'react';
import Section from '../components/Section';
import SEO from '../components/SEO';
import { ShieldCheck, CheckCircle2, Activity, Globe, Database, Terminal, FileCheck } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const ComplianceMatrix: React.FC = () => {
  const { language } = useLanguage();

  const standards = [
    { title: "SOC2 Type II Readiness", status: "Certified Hubs", desc: "Our infrastructure partners and implementation methodologies are strictly aligned with SOC2 security, availability, and confidentiality trust principles." },
    { title: "PIPEDA Compliant", status: "Standard", desc: "Full adherence to the Personal Information Protection and Electronic Documents Act for all Canadian commercial activities." },
    { title: "Zero-Trust Architecture", status: "Active", desc: "Every Odoo 18 implementation includes identity-aware micro-segmentation and continuous verification protocols." },
    { title: "AES-256 Encryption", status: "Mandatory", desc: "Industrial-grade encryption standards for all sensitive database entities at rest and in transit." }
  ];

  return (
    <>
      <SEO 
        title="Compliance Matrix | Oakivo Institutional Trust"
        description="Detailed technical breakdown of Oakivo's compliance standards, including SOC2, PIPEDA, and Zero-Trust frameworks."
        canonical="/compliance-matrix"
      />

      <section className="bg-oakivo-primary text-white pt-48 pb-24 relative overflow-hidden">
         <div className="absolute top-0 right-0 p-20 opacity-5">
            <ShieldCheck size={400} />
         </div>
         <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-4xl">
               <div className="flex items-center gap-4 mb-8">
                  <div className="h-[1px] w-12 bg-oakivo-secondary"></div>
                  <span className="text-oakivo-secondary font-black tracking-[0.4em] uppercase text-[10px]">Institutional Trust</span>
               </div>
               <h1 className="text-6xl md:text-8xl font-serif-display font-bold mb-10 tracking-tighter leading-none">Compliance <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-oakivo-secondary to-white">Matrix.</span></h1>
               <p className="text-xl md:text-2xl text-gray-400 font-light leading-relaxed">
                  Institutional-grade resilience for Canadian industrial leaders. We bake compliance into the architecture of every digital transformation.
               </p>
            </div>
         </div>
      </section>

      <Section className="bg-white py-32">
        <div className="container mx-auto px-6">
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-32">
              {standards.map((std, i) => (
                <div key={i} className="p-12 bg-oakivo-surface border border-gray-100 rounded-[48px] group hover:border-oakivo-secondary/30 hover:bg-white hover:shadow-4xl transition-all duration-700">
                   <div className="flex items-center justify-between mb-10">
                      <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-oakivo-secondary shadow-sm border border-gray-100">
                         <FileCheck size={32} />
                      </div>
                      <span className="px-4 py-1.5 bg-oakivo-primary text-white text-[9px] font-black uppercase tracking-widest rounded-lg">
                         {std.status}
                      </span>
                   </div>
                   <h3 className="text-3xl font-serif-display font-bold text-oakivo-primary mb-6 tracking-tight">{std.title}</h3>
                   <p className="text-gray-500 font-light text-lg leading-relaxed">{std.desc}</p>
                </div>
              ))}
           </div>

           <div className="bg-oakivo-primary p-16 rounded-[60px] text-white relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-12 opacity-5 group-hover:opacity-10 transition-opacity">
                 <Terminal size={160} />
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
                 <div className="lg:col-span-8">
                    <h2 className="text-4xl font-serif-display font-bold mb-8">Data Residency Protocol</h2>
                    <p className="text-gray-400 text-xl font-light leading-relaxed mb-10">
                       We certify that 100% of the industrial intelligence and operational data processed through our orchestrated Odoo environments remains within Canadian borders. 
                    </p>
                    <div className="flex flex-wrap gap-8">
                       <div className="flex items-center gap-3">
                          <CheckCircle2 size={24} className="text-oakivo-secondary" />
                          <span className="text-sm font-bold uppercase tracking-widest">No Foreign Processing</span>
                       </div>
                       <div className="flex items-center gap-3">
                          <CheckCircle2 size={24} className="text-oakivo-secondary" />
                          <span className="text-sm font-bold uppercase tracking-widest">vCISO Oversight</span>
                       </div>
                    </div>
                 </div>
                 <div className="lg:col-span-4">
                    <div className="p-10 bg-white/5 border border-white/10 rounded-[40px] backdrop-blur-md">
                       <Activity className="text-oakivo-secondary mb-6" size={40} />
                       <p className="text-sm font-bold mb-6">Request our most recent Technical Resilience Audit (Q1 2026).</p>
                       <button className="w-full bg-oakivo-secondary text-oakivo-primary py-4 rounded-2xl text-xs font-black uppercase tracking-widest hover:scale-105 transition-all">Download Audit Reports</button>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </Section>
    </>
  );
};

export default ComplianceMatrix;