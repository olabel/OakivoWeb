import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import TrustCarousel from '../components/TrustCarousel';
import { ArrowRight, Activity } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { NavRoute } from '../types';
import PremiumCapabilities from '../components/PremiumCapabilities';

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
        title="DevSecOps & Cloud Security Automation | Oakivo Solutions Canada"
        description="Atlantic Canada's elite DevSecOps engineers. We automate continuous compliance (SOC 2, PIPEDA), lock down cloud infrastructure, and build zero-trust CI/CD pipelines."
        keywords="DevSecOps Atlantic Canada, Cloud Security New Brunswick, CSPM Compliance, CI/CD Pipeline Security, Zero Trust Cloud Architecture, Kubernetes Security Canada, Odoo Implementation"
        canonical="/"
        schema={faqSchema}
      />
      
      {/* Hero Section */}
      <header id="hero" className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-[#070A0F]">
        {/* Background Video */}
        <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden bg-[#070A0F]">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover opacity-60 scale-105"
          >
            <source src="/background-loop.mp4" type="video/mp4" />
          </video>
        </div>
        
        {/* Premium Darkening Overlay */}
        <div className="absolute inset-0 bg-slate-950/40 mix-blend-multiply"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-transparent via-[#070A0F]/60 to-[#070A0F]"></div>
        
        <div className="relative z-10 container mx-auto px-6 max-w-7xl pt-32 pb-20">
            <div className="flex flex-col items-start text-left max-w-4xl">
                <h1 className="text-5xl md:text-7xl lg:text-[5.5rem] font-display font-bold tracking-tight mb-8 leading-[1.1] text-slate-100">
                    {t('landing.hero_headline')}
                </h1>
                <p className="text-xl md:text-2xl text-slate-300 max-w-3xl font-light leading-relaxed mb-12 border-l-2 border-slate-700 pl-6">
                    {t('landing.hero_subheadline')}
                </p>
                <div className="flex flex-col sm:flex-row items-center gap-6">
                    <button onClick={() => window.dispatchEvent(new CustomEvent('open-lead-drawer'))} className="group inline-flex items-center justify-center px-8 py-4 text-sm font-semibold tracking-wider text-slate-950 transition-all duration-300 bg-white hover:bg-slate-200 rounded-sm cursor-pointer">
                        <span className="flex items-center gap-3">
                            {t('common.cta_book_audit')}
                            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                        </span>
                    </button>
                    <Link to={NavRoute.CLIENT_DEMO} className="group inline-flex items-center justify-center px-8 py-4 text-sm font-semibold tracking-wider text-slate-100 transition-all duration-300 border border-slate-700 hover:border-slate-400 bg-slate-900/50 hover:bg-slate-800 rounded-sm">
                        <span className="flex items-center gap-3">
                            View Live Demo
                            <Activity className="w-4 h-4 text-cyan-500 transition-transform duration-300 group-hover:scale-110" />
                        </span>
                    </Link>
                </div>
            </div>
        </div>
      </header>

      <TrustCarousel />

      {/* The Strategic Imperative */}
      <section id="imperative" className="py-16 md:py-24 px-6 bg-slate-950 relative border-t border-slate-900/50">
        <div className="container mx-auto max-w-7xl relative z-10">
            <div className="max-w-4xl">
                <h2 className="text-3xl md:text-5xl font-display font-bold tracking-tight mb-8 text-slate-100">{t('landing.strategic_headline')}</h2>
                <p className="text-slate-300 text-lg md:text-2xl font-light leading-relaxed">
                    {t('landing.strategic_body')}
                </p>
            </div>
        </div>
      </section>

      {/* Premium Core Capabilities */}
      <div id="capabilities">
        <PremiumCapabilities />
      </div>

      {/* The Engagement Model - 3-Step Layout */}
      <section id="methodology" className="py-16 md:py-24 px-6 border-t border-slate-800/50 bg-slate-950 relative">
        <div className="container mx-auto max-w-7xl relative z-10">
            <div className="mb-24">
                <h2 className="text-3xl md:text-5xl font-display font-bold tracking-tight mb-6 text-slate-100">{t('landing.methodology_headline')}</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
                {/* Step 1 */}
                <div className="group">
                    <div className="text-sm font-mono tracking-widest text-cyan-500 mb-6 border-b border-slate-800 pb-4">{t('common.step')} 01</div>
                    <h3 className="text-2xl font-display font-bold tracking-tight mb-4 text-slate-100 group-hover:text-cyan-400 transition-colors duration-300">{t('landing.step1_title')}</h3>
                    <p className="text-slate-400 font-light leading-relaxed text-lg">
                        {t('landing.step1_body')}
                    </p>
                </div>

                {/* Step 2 */}
                <div className="group">
                    <div className="text-sm font-mono tracking-widest text-cyan-500 mb-6 border-b border-slate-800 pb-4">{t('common.step')} 02</div>
                    <h3 className="text-2xl font-display font-bold tracking-tight mb-4 text-slate-100 group-hover:text-cyan-400 transition-colors duration-300">{t('landing.step2_title')}</h3>
                    <p className="text-slate-400 font-light leading-relaxed text-lg">
                        {t('landing.step2_body')}
                    </p>
                </div>

                {/* Step 3 */}
                <div className="group">
                    <div className="text-sm font-mono tracking-widest text-cyan-500 mb-6 border-b border-slate-800 pb-4">{t('common.step')} 03</div>
                    <h3 className="text-2xl font-display font-bold tracking-tight mb-4 text-slate-100 group-hover:text-cyan-400 transition-colors duration-300">{t('landing.step3_title')}</h3>
                    <p className="text-slate-400 font-light leading-relaxed text-lg">
                        {t('landing.step3_body')}
                    </p>
                </div>
            </div>
        </div>
      </section>
    </>
  );
};

export default Home;

