import React from 'react';
import Section from '../components/Section';
import { ArrowRight, Plus, Lightbulb, Search, PenTool, Zap, BarChart } from 'lucide-react';
import Button from '../components/Button';
import { Link } from 'react-router-dom';
import { NavRoute } from '../types';
import { useLanguage, translations } from '../context/LanguageContext';
import SEO from '../components/SEO';

const Services: React.FC = () => {
  const { t, language } = useLanguage();
  const servicesList = translations[language].services.list;
  const steps = translations[language].services.steps;

  const tagsMap = [
     ["Ecosystem Architecture", "Legacy Modernization", "CX Strategy"],
     ["Robotic Process Automation", "Generative AI", "Predictive Analytics"],
     ["SAP / Oracle / NetSuite", "Cloud Migration", "Data Governance"],
     ["Zero Trust Architecture", "SOC2/ISO Compliance", "vCISO Advisory"]
  ];

  // Specific illustrative images for each service
  const serviceImages = [
     "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1000&auto=format&fit=crop", // Digital Strategy (Globe/Network)
     "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?q=80&w=1000&auto=format&fit=crop", // Automation/AI (Robot/Brain)
     "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop", // ERP (Dashboard/Data)
     "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?q=80&w=1000&auto=format&fit=crop"  // Security (Code/Lock)
  ];

  const methodIcons = [<Search size={32} />, <PenTool size={32} />, <Zap size={32} />, <BarChart size={32} />];
  const methodSteps = ["01", "02", "03", "04"];

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Odoo ERP Implementation",
    "provider": {
      "@type": "Organization",
      "name": "Oakivo Solutions Inc"
    },
    "areaServed": {
      "@type": "Country",
      "name": "Canada"
    },
    "description": "Full-cycle Odoo ERP implementation, migration, and training for Canadian SMEs."
  };

  return (
    <>
      <SEO 
        title="ERP Implementation & Digital Automation Services | Oakivo"
        description="Expert Odoo ERP implementation, Intelligent Automation, and Cybersecurity services for Canadian businesses. Drive efficiency with our certified consultants."
        keywords="Odoo ERP Service, Business Process Automation Canada, Cyber Security Consultants, Digital Transformation Agency"
        schema={serviceSchema}
        canonical="/services"
      />

      <section className="bg-black text-white pt-40 pb-20">
         <div className="container mx-auto px-6">
            <div className="flex items-center gap-4 mb-8">
               <div className="h-[1px] w-12 bg-oakivo-secondary"></div>
               <span className="text-oakivo-secondary font-bold tracking-widest uppercase">{t('services.hero_label')}</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-serif-display font-bold max-w-4xl leading-tight">
              {t('services.hero_title')}
            </h1>
         </div>
      </section>

      {/* Services List */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 gap-0">
             {servicesList.map((service: any, idx: number) => (
               <div key={idx} className="group border-t border-gray-200 py-20 hover:bg-gray-50 transition-colors">
                 <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    <div className="lg:col-span-4">
                       <h2 className="text-4xl font-serif-display font-bold group-hover:text-oakivo-primary transition-colors flex items-start gap-3 mb-6">
                         <span className="text-oakivo-secondary opacity-0 group-hover:opacity-100 transition-opacity -ml-8 mt-1"><Plus /></span>
                         {service.title}
                       </h2>
                       {/* Illustrative Image */}
                       <div className="w-full h-48 md:h-64 overflow-hidden rounded-lg relative">
                         <div className="absolute inset-0 bg-oakivo-primary/20 mix-blend-multiply z-10 group-hover:bg-transparent transition-colors duration-500"></div>
                         <img 
                           src={serviceImages[idx]} 
                           alt={service.title} 
                           className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 transform group-hover:scale-105"
                         />
                       </div>
                    </div>
                    <div className="lg:col-span-5 flex flex-col items-start pt-2">
                       <p className="text-lg text-gray-700 leading-relaxed mb-8">{service.desc}</p>
                       
                       {/* Strategic Insight Block */}
                       <div className="bg-oakivo-secondary/10 border-l-4 border-oakivo-secondary p-6 mb-8 rounded-r-lg w-full">
                          <div className="flex items-center gap-2 mb-2 text-oakivo-secondary font-bold uppercase text-xs tracking-widest">
                             <Lightbulb size={16} /> Strategic Insight
                          </div>
                          <p className="italic text-gray-800 font-serif-display text-lg">"{service.insight}"</p>
                       </div>

                       <Link to={NavRoute.CONTACT}>
                          <Button variant="ghost" className="text-sm font-bold uppercase tracking-widest flex items-center gap-2 group-hover:translate-x-2 transition-transform duration-300">
                            {t('home.explore')} <ArrowRight size={16} />
                          </Button>
                       </Link>
                    </div>
                    <div className="lg:col-span-3 pt-2">
                       <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Focus Areas</h4>
                       <ul className="space-y-3">
                          {tagsMap[idx].map((tag, tIdx) => (
                            <li key={tIdx} className="text-base font-medium text-gray-800 border-b border-gray-100 pb-2">
                              {tag}
                            </li>
                          ))}
                       </ul>
                    </div>
                 </div>
               </div>
             ))}
             <div className="border-t border-gray-200"></div>
          </div>
        </div>
      </section>

      {/* Methodology Section */}
      <section className="bg-oakivo-primary text-white py-24">
         <div className="container mx-auto px-6">
            <div className="mb-16">
               <h2 className="text-4xl font-serif-display font-bold mb-4">{t('services.method_title')}</h2>
               <p className="text-gray-400 max-w-2xl">{t('services.method_subtitle')}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
               {steps.map((phase: any, i: number) => (
                  <div key={i} className="relative p-8 border border-gray-800 bg-gray-900/50 hover:bg-gray-800 transition-colors rounded-lg">
                     <div className="absolute -top-6 left-6 text-6xl font-bold text-gray-800 opacity-50 font-serif-display select-none">{methodSteps[i]}</div>
                     <div className="relative z-10 mb-6 text-oakivo-secondary">{methodIcons[i]}</div>
                     <h3 className="relative z-10 text-xl font-bold mb-3">{phase.title}</h3>
                     <p className="relative z-10 text-gray-400 text-sm leading-relaxed">{phase.desc}</p>
                  </div>
               ))}
            </div>
         </div>
      </section>

      <Section bg="light" className="text-center">
          <h2 className="text-4xl font-serif-display font-bold mb-6">{t('services.cta_title')}</h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-8 text-lg">
            {t('services.cta_text')}
          </p>
          <Link to={NavRoute.CONTACT}>
            <Button variant="primary" size="lg">{t('services.cta_btn')}</Button>
          </Link>
      </Section>
    </>
  );
};

export default Services;