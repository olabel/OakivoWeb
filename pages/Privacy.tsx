import React from 'react';
import Section from '../components/Section';
import SEO from '../components/SEO';
import { Shield, Lock, EyeOff, FileText, Server, Globe } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const Privacy: React.FC = () => {
  const { language } = useLanguage();

  return (
    <>
      <SEO 
        title="Privacy & Data Sovereignty | Oakivo Solutions Inc"
        description="Oakivo's commitment to data privacy, Canadian residency, and technical security protocols. Learn how we protect your industrial intelligence."
        canonical="/privacy"
      />

      <section className="bg-oakivo-primary text-white pt-48 pb-24">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl">
             <div className="flex items-center gap-4 mb-8">
                <div className="h-[1px] w-12 bg-oakivo-secondary"></div>
                <span className="text-oakivo-secondary font-black tracking-[0.4em] uppercase text-[10px]">Data Sovereignty</span>
             </div>
             <h1 className="text-6xl md:text-8xl font-serif-display font-bold mb-10 tracking-tighter">Privacy Protocol.</h1>
             <p className="text-xl md:text-2xl text-gray-400 font-light leading-relaxed">
               Oakivo Solutions Inc. prioritizes the technical sovereignty of your organization's data. Our privacy standard is built on Zero-Trust principles and strict Canadian data residency.
             </p>
          </div>
        </div>
      </section>

      <Section className="bg-white py-32">
        <div className="max-w-4xl mx-auto space-y-24">
           <div className="space-y-8">
              <div className="flex items-center gap-6 mb-8">
                 <div className="w-16 h-16 bg-oakivo-surface rounded-2xl flex items-center justify-center text-oakivo-primary border border-gray-100 shadow-sm">
                    <Server size={32} />
                 </div>
                 <h2 className="text-3xl font-serif-display font-bold text-oakivo-primary">1. Canadian Data Residency</h2>
              </div>
              <p className="text-lg text-gray-600 leading-relaxed font-light">
                 Unlike many global ERP consultants, Oakivo ensures that all industrial data, client records, and AI models are hosted exclusively within verified Canadian data centers (Montreal, Toronto, and Moncton regions). We adhere to the <strong>Personal Information Protection and Electronic Documents Act (PIPEDA)</strong> as the baseline for our operations.
              </p>
           </div>

           <div className="space-y-8">
              <div className="flex items-center gap-6 mb-8">
                 <div className="w-16 h-16 bg-oakivo-surface rounded-2xl flex items-center justify-center text-oakivo-primary border border-gray-100 shadow-sm">
                    <Lock size={32} />
                 </div>
                 <h2 className="text-3xl font-serif-display font-bold text-oakivo-primary">2. Technical Safeguards</h2>
              </div>
              <p className="text-lg text-gray-600 leading-relaxed font-light">
                 All data in transit is protected by TLS 1.3 encryption. Data at rest is secured via AES-256-bit encryption. We implement Multi-Factor Authentication (MFA) and Zero-Trust identity management as standard across every Odoo implementation.
              </p>
           </div>

           <div className="space-y-8">
              <div className="flex items-center gap-6 mb-8">
                 <div className="w-16 h-16 bg-oakivo-surface rounded-2xl flex items-center justify-center text-oakivo-primary border border-gray-100 shadow-sm">
                    <EyeOff size={32} />
                 </div>
                 <h2 className="text-3xl font-serif-display font-bold text-oakivo-primary">3. Data Usage & AI Training</h2>
              </div>
              <p className="text-lg text-gray-600 leading-relaxed font-light">
                 Oakivo Solutions Inc. <strong>does not use client industrial data</strong> to train public AI models. Any Agentic AI workflows developed for your organization remain your intellectual property and are isolated within your secure environment.
              </p>
           </div>

           <div className="pt-16 border-t border-gray-100 text-center">
              <p className="text-sm text-gray-400 font-bold uppercase tracking-widest mb-8">Official Governance Document v2.4 (2026)</p>
              <div className="flex justify-center gap-10">
                 <button className="text-[10px] font-black uppercase tracking-widest text-oakivo-primary hover:text-oakivo-secondary transition-colors border-b border-oakivo-primary/20 pb-2">Download Detailed PDF</button>
                 <button className="text-[10px] font-black uppercase tracking-widest text-oakivo-primary hover:text-oakivo-secondary transition-colors border-b border-oakivo-primary/20 pb-2">Request Security Audit</button>
              </div>
           </div>
        </div>
      </Section>
    </>
  );
};

export default Privacy;