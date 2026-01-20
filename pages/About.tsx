import React from 'react';
import Section from '../components/Section';
import { Target, Heart, Award, ShieldCheck, Briefcase, GraduationCap, ChevronRight } from 'lucide-react';
import { useLanguage, translations } from '../context/LanguageContext';

const About: React.FC = () => {
  const { t, language } = useLanguage();
  const values = translations[language].about.values;
  const team = translations[language].about.team;

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
                 { year: "2018", title: "Foundation", desc: "Oakivo is founded with a focus on local ERP implementations." },
                 { year: "2020", title: "Digital Acceleration", desc: "Pivoted to remote-first digital transformation during the global shift." },
                 { year: "2022", title: "The Automation Era", desc: "Launched dedicated AI & RPA division, securing key partnerships with Microsoft." },
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

      {/* Core Values */}
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

      {/* Leadership Team - Typography Centric Credibility Layout */}
      <Section className="bg-white">
        <div className="mb-20 border-b border-gray-100 pb-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
             <div className="max-w-2xl">
                <h2 className="text-4xl md:text-5xl font-serif-display font-bold text-oakivo-primary mb-4">{t('about.leadership_title')}</h2>
                <p className="text-xl text-gray-500 font-light">{t('about.leadership_subtitle')}</p>
             </div>
             <div className="flex items-center gap-4 bg-oakivo-surface px-6 py-3 rounded-full border border-gray-100">
                <ShieldCheck className="text-oakivo-secondary" size={20} />
                <span className="text-xs font-bold uppercase tracking-widest text-oakivo-primary">Institutional Credibility Guaranteed</span>
             </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-16">
          {team.map((member: any, idx: number) => (
            <div key={idx} className="group flex flex-col md:flex-row gap-8 p-8 border border-gray-50 hover:border-oakivo-secondary/20 hover:bg-gray-50/50 transition-all duration-500 rounded-2xl relative overflow-hidden">
              {/* Decorative Monogram */}
              <div className="absolute top-0 right-0 p-4 opacity-[0.03] text-8xl font-serif-display font-bold pointer-events-none group-hover:opacity-[0.06] transition-opacity">
                {member.name.split(' ').map((n: string) => n[0]).join('')}
              </div>

              <div className="flex-grow">
                <div className="flex flex-wrap items-center gap-3 mb-4">
                   <h3 className="text-3xl font-serif-display font-bold text-oakivo-primary">{member.name}</h3>
                   <span className="text-[10px] font-extrabold uppercase tracking-[0.2em] bg-oakivo-primary text-white px-2.5 py-1 rounded-sm">
                      {member.credentials}
                   </span>
                </div>
                <p className="text-sm text-oakivo-secondary font-bold uppercase tracking-[0.15em] mb-6 flex items-center gap-2">
                  <Briefcase size={14} /> {member.role}
                </p>
                <p className="text-gray-600 leading-relaxed mb-8 text-lg border-l-2 border-gray-200 pl-6 italic">
                  {member.bio}
                </p>
                
                <div className="flex flex-wrap gap-6 pt-4 border-t border-gray-100">
                   <div className="flex items-center gap-2 text-xs text-gray-400 font-bold uppercase tracking-widest">
                      <GraduationCap size={16} className="text-oakivo-secondary" /> Professional Advisory
                   </div>
                   <div className="flex items-center gap-2 text-xs text-gray-400 font-bold uppercase tracking-widest group-hover:text-oakivo-secondary transition-colors cursor-pointer">
                      Executive Bio <ChevronRight size={14} />
                   </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Global Advisory Strip */}
        <div className="mt-24 bg-oakivo-primary p-10 md:p-16 rounded-3xl text-white relative overflow-hidden">
           <div className="absolute inset-0 bg-gradient-to-r from-oakivo-secondary/10 to-transparent"></div>
           <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
              <div className="md:col-span-7">
                 <h4 className="text-2xl md:text-3xl font-serif-display font-bold mb-4">The Oakivo Strategic Board</h4>
                 <p className="text-gray-300 text-lg font-light leading-relaxed">
                   Our leadership is supported by a global network of Odoo architects and industry veterans, ensuring every digital blueprint meets international standards of performance and security.
                 </p>
              </div>
              <div className="md:col-span-5 flex flex-wrap gap-4 justify-start md:justify-end">
                 {['Odoo Gold Partner', 'Microsoft Tier 1', 'CISSP Certified', 'SOC2 Readiness'].map((cert, i) => (
                    <div key={i} className="px-4 py-2 border border-white/20 rounded-lg text-xs font-bold uppercase tracking-widest bg-white/5">
                       {cert}
                    </div>
                 ))}
              </div>
           </div>
        </div>
      </Section>
    </>
  );
};

export default About;
