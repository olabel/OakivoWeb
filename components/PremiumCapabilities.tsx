import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const PremiumCapabilities: React.FC = () => {
  const { t } = useLanguage();

  const capabilities = [
    {
      id: '01',
      title: t('caps.cspm_title'),
      description: t('caps.cspm_desc'),
      features: [t('caps.cspm_f1'), t('caps.cspm_f2'), t('caps.cspm_f3')]
    },
    {
      id: '02',
      title: t('caps.ci_title'),
      description: t('caps.ci_desc'),
      features: [t('caps.ci_f1'), t('caps.ci_f2'), t('caps.ci_f3')]
    },
    {
      id: '03',
      title: t('caps.iam_title'),
      description: t('caps.iam_desc'),
      features: [t('caps.iam_f1'), t('caps.iam_f2'), t('caps.iam_f3')]
    },
    {
      id: '04',
      title: t('caps.odoo_title'),
      description: t('caps.odoo_desc'),
      features: [t('caps.odoo_f1'), t('caps.odoo_f2'), t('caps.odoo_f3')]
    }
  ];

  return (
    <section className="py-24 md:py-32 bg-[#070A0F] text-slate-100 border-t border-slate-900" id="capabilities">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
          
          {/* Left Column - Sticky Header */}
          <div className="lg:col-span-4 relative">
            <div className="lg:sticky lg:top-32">
              <h2 className="text-sm font-mono tracking-widest text-cyan-500 mb-6 uppercase">{t('caps.badge')}</h2>
              <h3 className="text-4xl md:text-5xl font-display font-bold leading-tight mb-6 text-slate-100">
                {t('caps.title')}
              </h3>
              <p className="text-lg text-slate-400 font-light leading-relaxed mb-8">
                {t('caps.subtitle')}
              </p>
              <a href="#engagement" className="inline-flex items-center gap-3 text-cyan-400 hover:text-cyan-300 transition-colors font-mono text-sm tracking-wide uppercase group">
                {t('caps.cta')} 
                <ArrowRight size={16} className="transform group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>

          {/* Right Column - Capability Rows */}
          <div className="lg:col-span-8 flex flex-col">
            {capabilities.map((cap, index) => (
              <div 
                key={cap.id} 
                className={`py-12 md:py-16 flex flex-col md:flex-row gap-8 md:gap-12 group transition-all duration-500 ${index === 0 ? 'pt-0 lg:pt-4' : 'border-t border-slate-800/60'}`}
              >
                {/* Minimalist Number */}
                <div className="shrink-0">
                  <span className="text-6xl md:text-7xl font-display font-light text-slate-800 group-hover:text-cyan-500/40 transition-colors duration-500 select-none">
                    {cap.id}
                  </span>
                </div>

                {/* Content */}
                <div>
                  <h4 className="text-2xl md:text-3xl font-display font-bold mb-6 text-slate-200 group-hover:text-cyan-400 transition-colors duration-300">
                    {cap.title}
                  </h4>
                  <p className="text-slate-400 text-lg leading-relaxed mb-8 font-light">
                    {cap.description}
                  </p>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8">
                    {cap.features.map(feature => (
                      <li key={feature} className="flex items-start gap-3">
                        <span className="w-1.5 h-1.5 mt-2 rounded-full bg-slate-700 group-hover:bg-cyan-500 shrink-0 transition-colors duration-300"></span>
                        <span className="text-slate-300 text-sm font-medium">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default PremiumCapabilities;
