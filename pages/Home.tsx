import React from 'react';
import SolutionsInAction from '../components/SolutionsInAction';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import TrustCarousel from '../components/TrustCarousel';
import DynamicHero from '../components/DynamicHero';
import { useLanguage } from '../context/LanguageContext';
import { NavRoute } from '../types';
import PremiumCapabilities from '../components/PremiumCapabilities';
import FAQAccordion from '../components/FAQAccordion';

const Home: React.FC = () => {
  const { t } = useLanguage();

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is Odoo Implementation and Digital Transformation?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Odoo Implementation is the process of integrating the comprehensive Odoo ERP (Enterprise Resource Planning) software into your business operations. Our Digital Transformation services ensure this integration streamlines your workflows, automates complex processes like CRM, inventory, and HR, and scales with your business for sustainable growth."
        }
      },
      {
        "@type": "Question",
        "name": "Why is ERP security important during an Odoo migration?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "When moving to a centralized ERP like Odoo, securing enterprise data is paramount. We implement zero-trust access controls, mutual TLS, and role-based permissions to protect your operational core from breaches while maintaining compliance with privacy standards like PIPEDA."
        }
      }
    ]
  };

  const breadcrumbSections = [
    { id: 'hero', labelKey: 'nav.home' },
    { id: 'imperative', labelKey: 'landing.strategic_headline' },
    { id: 'capabilities', labelKey: 'nav.capabilities' },
    { id: 'methodology', labelKey: 'nav.insights' }
  ];

  return (
    <>
      <SEO 
        title="DevSecOps Moncton & Cloud Security New Brunswick | Oakivo Solutions"
        description="Atlantic Canada & Canadian enterprise DevSecOps partner. Expert SOC 2 Type II readiness checklists, Bill C-26 compliance roadmaps, and Terraform AWS EKS hardening in Moncton, Halifax, and Calgary."
        keywords="DevSecOps Moncton, Cloud Security New Brunswick, SOC 2 Type II audit readiness checklist Canada, Bill C-26 Critical Cyber Systems compliance roadmap, PIPEDA vs. HIPAA cloud storage architecture, Terraform AWS EKS hardening consultant Calgary / Toronto / Halifax, DevSecOps Calgary, Dieppe NB cloud security"
        canonical="/"
      />
      
      {/* Dynamic Hero Section with Inferred Industry Variations */}
      <DynamicHero />

      <TrustCarousel />

      {/* The Strategic Imperative */}
      <SolutionsInAction />
      
      <section id="imperative" aria-labelledby="strategic-headline" className="py-16 md:py-24 px-6 bg-slate-950 relative border-t border-slate-900/50">
        <div className="container mx-auto max-w-7xl relative z-10">
            <div className="max-w-4xl">
                <h2 id="strategic-headline" className="text-3xl md:text-5xl font-display font-bold tracking-tight mb-8 text-slate-100">{t('landing.strategic_headline')}</h2>
                <p className="text-slate-300 text-lg md:text-2xl font-light leading-relaxed">
                    {t('landing.strategic_body')}
                </p>
            </div>
        </div>
      </section>

      {/* Premium Core Capabilities */}
      <section id="capabilities" aria-label="Core Engineering Capabilities">
        <PremiumCapabilities />
      </section>

      {/* The Engagement Model - 3-Step Layout */}
      <section id="methodology" aria-labelledby="methodology-headline" className="py-16 md:py-24 px-6 border-t border-slate-800/50 bg-slate-950 relative">
        <div className="container mx-auto max-w-7xl relative z-10">
            <div className="mb-24">
                <h2 id="methodology-headline" className="text-3xl md:text-5xl font-display font-bold tracking-tight mb-6 text-slate-100">{t('landing.methodology_headline')}</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
                {/* Step 1 */}
                <article className="group" aria-labelledby="step1-title">
                    <div className="text-sm font-mono tracking-widest text-cyan-500 mb-6 border-b border-slate-800 pb-4" aria-hidden="true">{t('common.step')} 01</div>
                    <h3 id="step1-title" className="text-2xl font-display font-bold tracking-tight mb-4 text-slate-100 group-hover:text-cyan-400 transition-colors duration-300">{t('landing.step1_title')}</h3>
                    <p className="text-slate-400 font-light leading-relaxed text-lg">
                        {t('landing.step1_body')}
                    </p>
                </article>

                {/* Step 2 */}
                <article className="group" aria-labelledby="step2-title">
                    <div className="text-sm font-mono tracking-widest text-cyan-500 mb-6 border-b border-slate-800 pb-4" aria-hidden="true">{t('common.step')} 02</div>
                    <h3 id="step2-title" className="text-2xl font-display font-bold tracking-tight mb-4 text-slate-100 group-hover:text-cyan-400 transition-colors duration-300">{t('landing.step2_title')}</h3>
                    <p className="text-slate-400 font-light leading-relaxed text-lg">
                        {t('landing.step2_body')}
                    </p>
                </article>

                {/* Step 3 */}
                <article className="group" aria-labelledby="step3-title">
                    <div className="text-sm font-mono tracking-widest text-cyan-500 mb-6 border-b border-slate-800 pb-4" aria-hidden="true">{t('common.step')} 03</div>
                    <h3 id="step3-title" className="text-2xl font-display font-bold tracking-tight mb-4 text-slate-100 group-hover:text-cyan-400 transition-colors duration-300">{t('landing.step3_title')}</h3>
                    <p className="text-slate-400 font-light leading-relaxed text-lg">
                        {t('landing.step3_body')}
                    </p>
                </article>
            </div>
        </div>
      </section>
      <FAQAccordion />
    </>
  );
};

export default Home;

