import React, { useEffect, useRef, useState } from 'react';
import Section from '../components/Section';
import { ArrowRight, Quote, Play, X, Video, ShieldCheck, Zap } from 'lucide-react';
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
        loading="lazy"
      />
    </div>
  );
};

const VideoModal: React.FC<{ isOpen: boolean; onClose: () => void; videoUrl: string; title: string }> = ({ isOpen, onClose, videoUrl, title }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-xl p-4 md:p-10 animate-in fade-in duration-300">
      <div className="relative w-full max-w-6xl aspect-video bg-black rounded-3xl overflow-hidden shadow-4xl animate-in zoom-in duration-500">
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 z-50 p-3 bg-white/10 hover:bg-white/20 text-white rounded-full transition-all backdrop-blur-md"
        >
          <X size={24} />
        </button>
        <div className="absolute top-6 left-6 z-50">
           <div className="bg-oakivo-secondary text-oakivo-primary px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg">
             Case Study Film: {title}
           </div>
        </div>
        <video 
          src={videoUrl} 
          controls 
          autoPlay 
          className="w-full h-full object-contain"
        >
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
};

const CaseStudies: React.FC = () => {
  const { t, language } = useLanguage();
  const casesData = translations[language].caseStudies.cases;
  const [activeVideo, setActiveVideo] = useState<{ url: string; title: string } | null>(null);
  
  const casesMeta = [
    {
      id: 1,
      client: "Atlantic Logistics",
      category: "Industrial Automation",
      img: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=1200&auto=format&fit=crop",
      size: "large",
      videoUrl: "https://v.ftcdn.net/04/81/25/67/700_F_481256728_DqYx8P08O6qH6PjV7A3Z4hX5G1n6vH0h_ST.mp4"
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
      videoUrl: "https://v.ftcdn.net/05/17/57/58/700_F_517575822_GvN6E9YvMvH7vX8Z6n7vX9G1n6vH0h_ST.mp4"
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
                  className={`group relative flex flex-col ${isLarge ? 'md:col-span-2' : ''} ${idx % 3 === 0 ? 'md:mt-0' : 'md:mt-24'} cv-auto`}
                >
                  {/* Image/Video Container */}
                  <div className={`relative overflow-hidden mb-8 shadow-2xl rounded-3xl ${isLarge ? 'aspect-[21/9]' : 'aspect-[4/5] md:aspect-[3/4]'}`}>
                    <div className="absolute inset-0 bg-oakivo-primary/10 group-hover:bg-transparent transition-colors z-20 duration-500"></div>
                    
                    {isLarge ? (
                      <ParallaxImage src={project.img} alt={data.title} speed={0.12} />
                    ) : (
                      <img 
                        src={project.img} 
                        alt={data.title} 
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 transform group-hover:scale-105" 
                        loading="lazy"
                      />
                    )}

                    {/* Video Overlay Badge */}
                    {project.videoUrl && (
                      <button 
                        onClick={() => setActiveVideo({ url: project.videoUrl!, title: data.title })}
                        className="absolute top-6 right-6 z-30 group/badge"
                      >
                        <div className="flex items-center gap-3 bg-white/95 backdrop-blur-md px-6 py-3 rounded-full text-[11px] font-black uppercase tracking-[0.2em] text-oakivo-primary shadow-2xl transition-all group-hover/badge:bg-oakivo-secondary group-hover/badge:scale-105">
                          <Play size={14} className="fill-oakivo-primary group-hover/badge:fill-oakivo-primary" /> 
                          Video Story
                        </div>
                      </button>
                    )}
                  </div>
                  
                  {/* Content Lockup */}
                  <div className={`grid grid-cols-1 ${isLarge ? 'lg:grid-cols-12' : ''} gap-12 items-start`}>
                    <div className={`${isLarge ? 'lg:col-span-7' : ''}`}>
                      <div className="flex items-center gap-4 mb-6">
                        <span className="text-[10px] font-black uppercase tracking-[0.25em] bg-oakivo-primary text-white px-3 py-1 rounded">
                          {project.category}
                        </span>
                        <div className="h-px w-8 bg-gray-200"></div>
                        <span className="text-[11px] font-bold uppercase tracking-widest text-gray-400 italic">
                          {project.client}
                        </span>
                      </div>
                      <h3 className={`font-serif-display font-bold leading-tight group-hover:text-oakivo-primary transition-colors mb-8 ${isLarge ? 'text-4xl md:text-7xl tracking-tighter' : 'text-3xl'}`}>
                        {data.title}
                      </h3>
                      <p className="text-gray-500 text-xl leading-relaxed mb-10 max-w-2xl font-light">
                        {data.summary}
                      </p>
                      
                      <Link to={NavRoute.CONTACT} className="inline-flex items-center gap-4 font-black uppercase tracking-[0.2em] text-[10px] text-oakivo-primary border-b-2 border-transparent hover:border-oakivo-secondary transition-all pb-2 group/link">
                        {language === 'en' ? 'Review Technical Strategy' : 'Réviser la Stratégie'} 
                        <ArrowRight size={16} className="group-hover/link:translate-x-2 transition-transform" />
                      </Link>
                    </div>

                    {/* Client Quote Column */}
                    <div className={`${isLarge ? 'lg:col-span-5' : ''}`}>
                      <div className="bg-oakivo-surface p-12 rounded-[40px] border border-gray-100 relative group-hover:shadow-4xl transition-all duration-700 group/quote overflow-hidden">
                        <div className="absolute top-0 right-0 p-8 opacity-5 text-oakivo-secondary group-hover/quote:opacity-10 transition-opacity">
                           <Quote size={80} />
                        </div>
                        <p className="text-2xl font-serif-display italic text-gray-800 mb-10 leading-relaxed relative z-10 font-medium">
                          "{data.quote}"
                        </p>
                        <div className="flex items-center gap-5 relative z-10">
                           <div className="w-12 h-12 rounded-2xl bg-oakivo-primary flex items-center justify-center text-white text-sm font-bold shadow-lg">
                              {data.author ? data.author.charAt(0) : 'C'}
                           </div>
                           <div>
                              <p className="text-sm font-black uppercase tracking-widest text-oakivo-primary">
                                {data.author}
                              </p>
                              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter mt-1 opacity-70">Strategic Partner Success</p>
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

      {/* Strategic Partnership Section */}
      <section className="bg-oakivo-primary py-40 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
        <div className="container mx-auto px-6 relative z-10">
           <div className="max-w-5xl mx-auto text-center">
              <div className="inline-flex items-center gap-3 bg-white/5 border border-white/10 text-oakivo-secondary px-8 py-3 rounded-full text-xs font-black uppercase tracking-[0.3em] mb-16 backdrop-blur-md">
                 <Zap size={16} className="animate-pulse" /> Engineering Results
              </div>
              <h2 className="text-5xl md:text-[8rem] font-serif-display font-bold mb-16 tracking-tighter leading-[0.8] transition-all">
                Beyond <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-oakivo-secondary to-white">Software.</span>
              </h2>
              <p className="text-2xl text-gray-400 font-light leading-relaxed mb-20 max-w-3xl mx-auto">
                {language === 'en'
                  ? "We don't measure success by deployments, but by the measurable impact on your bottom line. Our AI Orchestration models typically yield ROI within the first 6 months of execution."
                  : "Nous ne mesurons pas le succès par les déploiements, mais par l'impact mesurable sur vos résultats. Nos modèles d'orchestration IA produisent généralement un ROI dès les 6 premiers mois."}
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                 {[
                   { val: "23%", label: "Average OpEx Reduction", icon: <TrendingUp size={24} className="text-oakivo-secondary mb-4 mx-auto" /> },
                   { val: "500k+", label: "Reclaimed Human Hours", icon: <ShieldCheck size={24} className="text-oakivo-secondary mb-4 mx-auto" /> },
                   { val: "98%", label: "System Uptime Standard", icon: <Zap size={24} className="text-oakivo-secondary mb-4 mx-auto" /> }
                 ].map((stat, i) => (
                   <div key={i} className="p-12 bg-white/5 border border-white/10 rounded-[48px] backdrop-blur-2xl hover:bg-white/10 transition-all duration-500">
                      {stat.icon}
                      <div className="text-6xl font-bold text-white mb-3 font-serif-display">{stat.val}</div>
                      <div className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500">{stat.label}</div>
                   </div>
                 ))}
              </div>
           </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-white py-48 text-center cv-auto">
        <div className="container mx-auto px-6">
           <h2 className="text-5xl md:text-[9rem] font-serif-display font-bold mb-12 text-black tracking-tighter leading-none">Ready to Lead?</h2>
           <p className="text-2xl text-gray-500 mb-16 max-w-3xl mx-auto font-light leading-relaxed">
             Blueprint your digital evolution with Canada's premier AI & ERP orchestrators.
           </p>
           <Link to={NavRoute.CONTACT}>
              <Button variant="black" size="lg" className="px-20 py-8 text-2xl shadow-4xl hover:scale-105 active:scale-95 transition-all">Book Strategic Discovery Call</Button>
           </Link>
        </div>
      </section>

      {/* Video Modal Component */}
      <VideoModal 
        isOpen={!!activeVideo} 
        onClose={() => setActiveVideo(null)} 
        videoUrl={activeVideo?.url || ''} 
        title={activeVideo?.title || ''} 
      />
    </>
  );
};

const TrendingUp = ({ size, className }: { size: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
    <polyline points="17 6 23 6 23 12"></polyline>
  </svg>
);

export default CaseStudies;