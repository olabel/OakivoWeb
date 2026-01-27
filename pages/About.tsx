import React from 'react';
import Section from '../components/Section';
import SEO from '../components/SEO';
import { Target, Heart, Award, ShieldCheck, Briefcase, GraduationCap, ChevronRight, Activity, Zap, Cpu } from 'lucide-react';
import { useLanguage, translations } from '../context/LanguageContext';

const About: React.FC = () => {
  const { t, language } = useLanguage();
  const values = translations[language].about.values;
  const team = translations[language].about.team;

  const aboutSchema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "mainEntity": {
      "@type": "Organization",
      "name": "Oakivo Solutions Inc",
      "description": "Leading Canadian digital transformation agency specializing in Odoo ERP and intelligent automation.",
      "founder": "Ahmed Bello",
      "areaServed": "Canada"
    }
  };

  return (
    <>
      <SEO 
        title="About Oakivo | Leadership in Canadian Digital Transformation"
        description="Discover Oakivo's mission to re-engineer Canadian businesses through intelligent automation, Odoo ERP expertise, and strategic digital consulting."
        keywords="Oakivo Team, Ahmed Bello CEO, Digital Strategy Canada, Odoo Partners Atlantic Canada, IT Consulting Dieppe"
        schema={aboutSchema}
        canonical="/about"
      />

      {/* Header */}
      <section className="bg-oakivo-primary text-white pt-40 pb-24">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
             <div>
                <div className="flex items-center gap-4 mb-6">
                   <div className="h-[1px] w-12 bg-oakivo-secondary"></div>
                   <span className="text-oakivo-secondary font-bold tracking-widest uppercase">{t('about.dna_label')}</span>
                </div>
                <h1 className="text-5xl md:text-7xl font-serif-display font-bold mb-6 tracking-tighter">{t('about.hero_title')}</h1>
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
              <h2 className="text-4xl md:text-6xl font-serif-display font-bold mb-10 text-black tracking-tighter">{t('about.standard_title')}</h2>
              <div className="prose prose-xl text-gray-600 font-light leading-relaxed max-w-none">
                <p className="mb-8">
                  {t('about.standard_p1')}
                </p>
                <div className="p-10 bg-oakivo-surface border-l-[12px] border-oakivo-secondary rounded-r-[40px] mb-10 shadow-sm">
                   <p className="font-serif-display italic text-2xl text-oakivo-primary leading-relaxed">
                     "{t('about.standard_p2')}"
                   </p>
                </div>
                <p>
                  {t('about.standard_p3')}
                </p>
              </div>
           </div>
        </div>
      </section>

      {/* Leadership Section - Prestige Redesign */}
      <Section className="bg-white border-t border-gray-100">
        <div className="mb-24">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
             <div className="max-w-3xl">
                <div className="inline-flex items-center gap-3 text-oakivo-secondary font-black uppercase text-[10px] tracking-[0.4em] mb-6">
                   <Zap size={14} /> Intelligence Hub
                </div>
                <h2 className="text-5xl md:text-[5.5rem] font-serif-display font-bold text-oakivo-primary mb-6 tracking-tighter leading-none">
                   {t('about.leadership_title')}
                </h2>
                <p className="text-xl md:text-2xl text-gray-500 font-light leading-relaxed">{t('about.leadership_subtitle')}</p>
             </div>
             <div className="flex items-center gap-5 bg-oakivo-surface px-8 py-5 rounded-[32px] border border-gray-100 shadow-sm">
                <ShieldCheck className="text-oakivo-secondary" size={28} />
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-oakivo-primary leading-tight">Institutional <br/> Credibility Matrix</span>
             </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {team.map((member: any, idx: number) => (
            <div key={idx} className="group flex flex-col p-10 md:p-14 border border-gray-100 hover:border-oakivo-secondary/30 hover:bg-gray-50/30 transition-all duration-700 rounded-[48px] relative overflow-hidden bg-white shadow-sm hover:shadow-4xl">
              {/* Monogram Overlay */}
              <div className="absolute top-0 right-0 p-8 opacity-[0.03] text-[15rem] font-serif-display font-bold pointer-events-none group-hover:opacity-[0.06] transition-all duration-1000">
                {member.name.split(' ').map((n: string) => n[0]).join('')}
              </div>

              <div className="relative z-10">
                <div className="flex flex-wrap items-center gap-4 mb-8">
                   <h3 className="text-4xl font-serif-display font-bold text-oakivo-primary tracking-tight">{member.name}</h3>
                   <span className="text-[10px] font-black uppercase tracking-[0.2em] bg-oakivo-primary text-white px-4 py-1.5 rounded-full shadow-lg">
                      {member.credentials}
                   </span>
                </div>
                
                <p className="text-xs text-oakivo-secondary font-black uppercase tracking-[0.25em] mb-10 flex items-center gap-3">
                  <div className="w-8 h-[1px] bg-oakivo-secondary"></div> {member.role}
                </p>

                <p className="text-gray-500 leading-loose mb-12 text-xl font-light">
                  {member.bio}
                </p>
                
                <div className="space-y-8">
                   <div className="flex flex-wrap gap-3">
                      {member.expertise.map((exp: string) => (
                         <span key={exp} className="px-4 py-1.5 bg-oakivo-primary/5 text-oakivo-primary rounded-lg text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 border border-oakivo-primary/10">
                            <Activity size={12} className="text-oakivo-secondary" /> {exp}
                         </span>
                      ))}
                   </div>

                   <div className="pt-8 border-t border-gray-100 flex items-center justify-between">
                      <div className="flex items-center gap-3 text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                         <GraduationCap size={16} className="text-oakivo-secondary" /> Verified Board Member
                      </div>
                      <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="text-oakivo-primary font-bold text-xs uppercase tracking-widest group-hover:translate-x-2 transition-transform cursor-pointer flex items-center gap-2 hover:text-oakivo-secondary">
                        View Strategic Portfolio <ChevronRight size={14} />
                      </a>
                   </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Values Section */}
      <Section bg="light" className="py-40">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
          {values.map((val: any, idx: number) => (
            <div key={idx} className="flex flex-col group">
              <div className="text-oakivo-secondary font-bold text-8xl mb-6 opacity-20 font-serif-display group-hover:opacity-100 transition-opacity duration-700">0{idx + 1}</div>
              <h3 className="text-3xl font-bold font-serif-display text-oakivo-primary mb-6 tracking-tight">{val.title}</h3>
              <p className="text-gray-500 leading-relaxed text-lg font-light">{val.text}</p>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
};

export default About;