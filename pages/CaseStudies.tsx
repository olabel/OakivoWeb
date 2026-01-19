import React from 'react';
import Section from '../components/Section';
import { ArrowRight } from 'lucide-react';
import { useLanguage, translations } from '../context/LanguageContext';

const CaseStudies: React.FC = () => {
  const { t, language } = useLanguage();
  const casesData = translations[language].caseStudies.cases;
  
  // Images and metadata that don't change with language
  const casesMeta = [
    {
      id: 1,
      client: "Atlantic Logistics",
      category: "Industrial Automation",
      img: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=1200&auto=format&fit=crop",
      size: "large"
    },
    {
      id: 2,
      client: "FinTrust Canada",
      category: "Cloud Security",
      img: "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=800&auto=format&fit=crop",
      size: "small"
    },
    {
      id: 3,
      client: "Northern Retail Group",
      category: "ERP Modernization",
      img: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=800&auto=format&fit=crop",
      size: "small"
    },
    {
      id: 4,
      client: "TechFlow Support",
      category: "Generative AI",
      img: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?q=80&w=1200&auto=format&fit=crop",
      size: "large"
    },
    {
      id: 5,
      client: "City Services Dept",
      category: "Public Sector",
      img: "https://images.unsplash.com/photo-1476900966801-4861c85025a6?q=80&w=800&auto=format&fit=crop",
      size: "small"
    },
    {
      id: 6,
      client: "Maritime Energy",
      category: "Critical Infrastructure",
      img: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?q=80&w=800&auto=format&fit=crop",
      size: "small"
    },
  ];

  return (
    <>
      <section className="bg-white pt-40 pb-16">
         <div className="container mx-auto px-6">
            <h1 className="text-6xl md:text-8xl font-serif-display font-bold mb-8 text-black">
              {t('caseStudies.hero_title')}
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl">
              {t('caseStudies.hero_subtitle')}
            </p>
         </div>
      </section>

      <section className="bg-white pb-24">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-20">
            {casesMeta.map((project, idx) => (
              <div 
                key={project.id} 
                className={`group cursor-pointer ${project.size === 'large' ? 'md:col-span-2' : ''}`}
              >
                <div className="overflow-hidden mb-6 bg-gray-100 relative">
                   <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors z-10"></div>
                   <img 
                    src={project.img} 
                    alt={casesData[idx].title} 
                    className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105" 
                    style={{ aspectRatio: project.size === 'large' ? '21/9' : '4/3' }}
                   />
                </div>
                <div className="flex flex-col border-t border-black pt-6">
                  <div className="flex justify-between items-start">
                    <div>
                        <span className="text-xs font-bold uppercase tracking-widest text-oakivo-secondary mb-3 block">{project.category} // {project.client}</span>
                        <h3 className="text-2xl md:text-4xl font-serif-display font-bold leading-tight group-hover:text-oakivo-muted transition-colors">{casesData[idx].title}</h3>
                        <p className="text-gray-600 mt-4 max-w-3xl text-lg leading-relaxed">{casesData[idx].summary}</p>
                    </div>
                    <ArrowRight className="opacity-0 group-hover:opacity-100 transition-opacity -translate-x-4 group-hover:translate-x-0 duration-300 mt-2" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default CaseStudies;