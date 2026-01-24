import React, { useEffect, useRef, useState } from 'react';
import Section from '../components/Section';
import { ArrowRight, Quote, Play, ExternalLink, ChevronRight, Video } from 'lucide-react';
import { useLanguage, translations } from '../context/LanguageContext';
import Button from '../components/Button';
import { NavRoute } from '../types';
import { Link } from 'react-router-dom';

const ParallaxImage: React.FC<{ src: string; alt: string; speed?: number }> = ({ src, alt, speed = 0.1 }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const scrollPos = window.scrollY;
      const windowHeight = window.innerHeight;
      
      // Only calculate if visible
      if (rect.top < windowHeight && rect.bottom > 0) {
        setOffset((scrollPos - containerRef.current.offsetTop) * speed);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed]);

  return (
    <div ref={containerRef} className="overflow-hidden relative h-full w-full">
      <img 
        src={src} 
        alt={alt} 
        className="w-full h-[120%] object-cover absolute -top-[10%]" 
        style={{ transform: `translateY(${offset}px)` }}
      />
    </div>
  );
};

const CaseStudies: React.FC = () => {
  const { t, language } = useLanguage();
  const casesData = translations[language].caseStudies.cases;
  
  const casesMeta = [
    {
      id: 1,
      client: "Atlantic Logistics",
      category: "Industrial Automation",
      img: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=1200&auto=format&fit=crop",
      size: "large",
      videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-cargo-ship-in-the-sea-during-the-sunset-4171-large.mp4"
    },
    {
      id: 2,
      client: "FinTrust Canada",
      category: "Cloud Security",
      img: "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=800&auto=format&fit=crop",
      size: "small",
    },
    {
      id: 3,
      client: "Northern Retail Group",
      category: "ERP Modernization",
      img: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=800&auto=format&fit=crop",
      size: "small",
    },
    {
      id: 4,
      client: "TechFlow Support",
      category: "Generative AI",
      img: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?q=80&w=1200&auto=format&fit=crop",
      size: "large",
      videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-hands-of-a-person-working-on-a-laptop-490-large.mp4"
    },
    {
      id: 5,
      client: "City Services Dept",
      category: "Public Sector",
      img: "https://images.unsplash.com/photo-1476900966801-4861c85025a6?q=80&w=800&auto=format&fit=crop",
      size: "small",
    },
    {
      id: 6,
      client: "Maritime Energy",
      category: "Critical Infrastructure",
      img: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?q=80&w=800&auto=format&fit=crop",
      size: "small",
    },
  ];

  return (
    <>
      <section className="bg-white pt-40 pb-16">
         <div className="container mx-auto px-6">
            <div className="flex items-center gap-4 mb-6">
               <div className="h-[1px] w-12 bg-oakivo-secondary"></div>
               <span className="text-oakivo-secondary font-bold tracking-widest uppercase">{t('nav.work')}</span>
            </div>
            <h1 className="text-6xl md:text-8xl font-serif-display font-bold mb-8 text-black tracking-tighter">
              {t('caseStudies.hero_title')}
            </h1>
            <p className="text-xl text-gray-500 max-w-2xl font-light leading-relaxed">
              {t('caseStudies.hero_subtitle')}
            </p>
         </div>
      </section>

      {/* Case Studies Grid */}
      <section className="bg-white pb-32">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-32">
            {casesMeta.map((project, idx) => {
              const data = casesData[idx] || {};
              const isLarge = project.size === 'large';
              
              return (
                <div 
                  key={project.id} 
                  className={`group relative flex flex-col ${isLarge ? 'md:col-span-2' : ''} ${idx % 3 === 0 ? 'md:mt-0' : 'md:mt-24'}`}
                >
                  {/* Image/Video Container */}
                  <div className={`relative overflow-hidden mb-8 shadow-2xl ${isLarge ? 'aspect-[21/9]' : 'aspect-[4/5] md:aspect-[3/4]'}`}>
                    <div className="absolute inset-0 bg-oakivo-primary/10 group-hover:bg-transparent transition-colors z-20 duration-500"></div>
                    
                    {/* Parallax Image Effect for Large, Standard for Small */}
                    {isLarge ? (
                      <ParallaxImage src={project.img} alt={data.title} speed={0.15} />
                    ) : (
                      <img 
                        src={project.img} 
                        alt={data.title} 
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 transform group-hover:scale-105" 
                      />
                    )}

                    {/* Video Overlay Badge */}
                    {project.videoUrl && (
                      <div className="absolute top-6 right-6 z-30">
                        <div className="flex items-center gap-2 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest text-oakivo-primary shadow-lg">
                          <Play size={12} className="fill-oakivo-primary" /> Video Story
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {/* Content Lockup */}
                  <div className={`grid grid-cols-1 ${isLarge ? 'lg:grid-cols-12' : ''} gap-8 items-start`}>
                    <div className={`${isLarge ? 'lg:col-span-7' : ''}`}>
                      <div className="flex items-center gap-3 mb-4">
                        <span className="text-[10px] font-extrabold uppercase tracking-[0.2em] bg-oakivo-primary text-white px-2 py-0.5 rounded">
                          {project.category}
                        </span>
                        <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
                          // {project.client}
                        </span>
                      </div>
                      <h3 className={`font-serif-display font-bold leading-tight group-hover:text-oakivo-primary transition-colors mb-6 ${isLarge ? 'text-4xl md:text-6xl' : 'text-3xl'}`}>
                        {data.title}
                      </h3>
                      <p className="text-gray-600 text-lg leading-relaxed mb-8 max-w-2xl">
                        {data.summary}
                      </p>
                      
                      <Link to={NavRoute.CONTACT} className="inline-flex items-center gap-3 font-bold uppercase tracking-widest text-xs border-b-2 border-transparent hover:border-oakivo-secondary transition-all pb-1 group/link">
                        {language === 'en' ? 'Deep Dive Analysis' : 'Analyse Approfondie'} 
                        <ArrowRight size={16} className="group-hover/link:translate-x-2 transition-transform" />
                      </Link>
                    </div>

                    {/* Client Quote Column (Visible for both, positioned differently for large) */}
                    <div className={`${isLarge ? 'lg:col-span-5' : ''}`}>
                      <div className="bg-oakivo-surface p-10 rounded-2xl border border-gray-100 relative group-hover:shadow-xl transition-all duration-500">
                        <Quote className="absolute -top-4 -left-4 text-oakivo-secondary opacity-20" size={64} />
                        <p className="text-xl font-serif-display italic text-gray-800 mb-6 leading-relaxed relative z-10">
                          "{data.quote}"
                        </p>
                        <div className="flex items-center gap-4">
                           <div className="w-10 h-10 rounded-full bg-oakivo-primary flex items-center justify-center text-white text-[10px] font-bold">
                              {data.author ? data.author.charAt(0) : 'C'}
                           </div>
                           <div>
                              <p className="text-xs font-bold uppercase tracking-widest text-oakivo-primary">
                                {data.author}
                              </p>
                              <p className="text-[10px] text-gray-400 font-medium uppercase tracking-tighter mt-0.5">Verified Partner Success</p>
                           </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Strategic Partnership Section (EEAT) */}
      <section className="bg-oakivo-primary py-32 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="container mx-auto px-6 relative z-10">
           <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 bg-oakivo-secondary/20 text-oakivo-secondary px-6 py-2 rounded-full text-xs font-bold uppercase tracking-[0.2em] mb-12">
                 <Video size={16} /> 2026 Digital Impact Review
              </div>
              <h2 className="text-4xl md:text-7xl font-serif-display font-bold mb-12 tracking-tighter leading-none">
                {language === 'en' 
                  ? "Engineering results, not just software." 
                  : "Ingénierie de résultats, pas seulement de logiciels."}
              </h2>
              <p className="text-xl text-gray-400 font-light leading-relaxed mb-16">
                {language === 'en'
                  ? "Our methodology combines rigorous technical audits with industry-specific ERP architecture. We don't measure success by deployments, but by measurable revenue growth and reclaimed operational hours."
                  : "Notre méthodologie combine des audits techniques rigoureux avec une architecture ERP spécifique à l'industrie. Nous ne mesurons pas le succès par les déploiements, mais par la croissance mesurable des revenus."}
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                 {[
                   { val: "23%", label: "Avg. Cost Reduction" },
                   { val: "5000+", label: "Hours Reclaimed/Year" },
                   { val: "100%", label: "Canadian Data Residency" }
                 ].map((stat, i) => (
                   <div key={i} className="p-10 bg-white/5 border border-white/10 rounded-3xl backdrop-blur-md">
                      <div className="text-5xl font-bold text-oakivo-secondary mb-2">{stat.val}</div>
                      <div className="text-[10px] font-bold uppercase tracking-widest text-gray-500">{stat.label}</div>
                   </div>
                 ))}
              </div>
           </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-white py-32 text-center">
        <div className="container mx-auto px-6">
           <h2 className="text-4xl md:text-6xl font-serif-display font-bold mb-8 text-black tracking-tighter">Ready for your success story?</h2>
           <p className="text-xl text-gray-500 mb-12 max-w-2xl mx-auto font-light leading-relaxed">
             Join the ranks of high-growth Canadian companies leveraging the Oakivo Method for Odoo ERP and Intelligent Automation.
           </p>
           <Link to={NavRoute.CONTACT}>
              <Button variant="black" size="lg" className="px-16 py-5 text-lg">Book Strategic Discovery Call</Button>
           </Link>
        </div>
      </section>
    </>
  );
};

export default CaseStudies;