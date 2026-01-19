import React from 'react';
import Section from '../components/Section';
import { Target, Heart, Award, User, Code, LineChart, Shield, Layout } from 'lucide-react';
import { useLanguage, translations } from '../context/LanguageContext';

const About: React.FC = () => {
  const { t, language } = useLanguage();
  const values = translations[language].about.values;

  return (
    <>
      {/* Header */}
      <section className="bg-oakivo-primary text-white pt-40 pb-24">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
             <div>
                <div className="flex items-center gap-4 mb-6">
                   <div className="h-[1px] w-12 bg-oakivo-secondary"></div>
                   <span className="text-oakivo-secondary font-bold tracking-widest uppercase">{t('about.dna_label')}</span>
                </div>
                <h1 className="text-5xl md:text-7xl font-serif-display font-bold mb-6">{t('about.hero_title')}</h1>
             </div>
             <div className="flex items-end">
                <p className="text-xl md:text-3xl text-gray-300 leading-relaxed font-light">
                  {t('about.hero_subtitle')}
                </p>
             </div>
          </div>
        </div>
      </section>

      {/* Narrative Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
           <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-5xl font-serif-display font-bold mb-10 text-black">{t('about.standard_title')}</h2>
              <div className="prose prose-xl text-gray-600 font-light leading-relaxed">
                <p className="mb-8">
                  {t('about.standard_p1')}
                </p>
                <p className="mb-8">
                  {t('about.standard_p2')}
                </p>
                <p>
                  {t('about.standard_p3')}
                </p>
              </div>
           </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="bg-gray-50 py-24">
        <div className="container mx-auto px-6">
           <h2 className="text-3xl font-bold font-serif-display mb-16 text-center">{t('about.journey_title')}</h2>
           <div className="max-w-4xl mx-auto relative border-l-2 border-gray-200 ml-6 md:ml-auto space-y-12">
              {[
                 { year: "2018", title: "Foundation", desc: "Oakivo is founded in Halifax, NS with a focus on local ERP implementations." },
                 { year: "2020", title: "Digital Acceleration", desc: "Pivoted to remote-first digital transformation during the global shift, expanding to Toronto." },
                 { year: "2022", title: "The Automation Era", desc: "Launched dedicated AI & RPA division, securing key partnerships with UiPath and Microsoft." },
                 { year: "2024", title: "National Impact", desc: "Recognized as one of Canada's fastest-growing digital consultancies." }
              ].map((item, i) => (
                 <div key={i} className="relative pl-12">
                    <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-oakivo-secondary border-4 border-white"></div>
                    <span className="text-oakivo-secondary font-bold text-xl block mb-2">{item.year}</span>
                    <h3 className="text-2xl font-bold mb-2">{item.title}</h3>
                    <p className="text-gray-600">{item.desc}</p>
                 </div>
              ))}
           </div>
        </div>
      </section>

      {/* Core Values - Minimalist Grid */}
      <Section bg="light">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 border-t border-black pt-12">
          {values.map((val: any, idx: number) => (
            <div key={idx} className="flex flex-col">
              <div className="text-oakivo-secondary font-bold text-6xl mb-4 opacity-50 font-serif-display">0{idx + 1}</div>
              <h3 className="text-2xl font-bold font-serif-display text-oakivo-primary mb-3">{val.title}</h3>
              <p className="text-gray-600 leading-relaxed">{val.text}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Team Section */}
      <Section>
        <div className="mb-16 border-b border-gray-200 pb-8">
          <h2 className="text-4xl font-serif-display font-bold text-oakivo-primary mb-2">{t('about.leadership_title')}</h2>
          <p className="text-gray-500">{t('about.leadership_subtitle')}</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
          {[
            { name: "Sarah Jenkins", role: "CEO & Founder", icon: <Layout size={40} /> },
            { name: "David Chen", role: "CTO", icon: <Code size={40} /> },
            { name: "Emily Doucet", role: "Head of Strategy", icon: <LineChart size={40} /> },
            { name: "Michael Ross", role: "Lead Architect", icon: <Shield size={40} /> },
          ].map((member, idx) => (
            <div key={idx} className="group cursor-pointer">
              {/* Abstract Avatar Placeholder */}
              <div className="relative overflow-hidden mb-6 bg-gradient-to-br from-gray-100 to-gray-200 h-80 flex items-center justify-center group-hover:from-oakivo-primary group-hover:to-black transition-all duration-500 rounded-sm">
                <div className="text-gray-300 group-hover:text-oakivo-secondary transition-colors duration-500 transform group-hover:scale-110">
                   {member.icon}
                </div>
              </div>
              <div className="text-left">
                <h3 className="text-xl font-bold text-oakivo-primary">{member.name}</h3>
                <p className="text-sm text-oakivo-secondary font-bold uppercase tracking-widest mt-1">{member.role}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
};

export default About;