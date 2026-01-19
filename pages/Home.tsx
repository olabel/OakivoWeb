import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, TrendingUp, ShieldCheck, Layers, Cpu, Globe, Zap, Anchor } from 'lucide-react';
import Section from '../components/Section';
import Button from '../components/Button';
import Logo from '../components/Logo';
import { NavRoute } from '../types';
import { useLanguage } from '../context/LanguageContext';

const Home: React.FC = () => {
  const { t } = useLanguage();

  return (
    <>
      {/* Hero Section - Strategic & Authoritative */}
      <section className="relative min-h-screen flex items-center bg-black overflow-hidden pt-20">
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-5xl">
            <div className="mb-8 flex items-center gap-3">
               <Logo className="w-12 h-12" />
               <span className="text-white font-bold tracking-widest uppercase text-sm">Oakivo Solutions</span>
            </div>
            <h1 className="text-5xl md:text-7xl lg:text-9xl font-serif-display font-bold text-white leading-[0.95] mb-10 tracking-tighter">
              {t('home.hero_title_1')} <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-oakivo-secondary via-green-400 to-oakivo-blue">{t('home.hero_title_2')}</span>
            </h1>
            <p className="text-xl md:text-3xl text-gray-300 mb-12 max-w-3xl font-light leading-snug">
              {t('home.hero_subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-6">
              <Link to={NavRoute.CONTACT}>
                <Button variant="primary" size="lg">{t('home.cta_primary')}</Button>
              </Link>
            </div>
          </div>
        </div>
        
        {/* Abstract Background Element */}
        <div className="absolute right-0 bottom-0 w-[800px] h-[800px] bg-gradient-to-tl from-oakivo-secondary/20 to-transparent rounded-full blur-[120px] pointer-events-none opacity-40"></div>
      </section>

      {/* Trusted By Strip */}
      <div className="bg-white border-b border-gray-100 py-12 overflow-hidden">
        <div className="container mx-auto px-6">
          <p className="text-center text-xs font-bold uppercase tracking-widest text-gray-400 mb-8">{t('home.trusted_by')}</p>
          <div className="flex flex-wrap justify-center md:justify-between items-center gap-12 opacity-50 grayscale">
             {/* Placeholder Logos using Icons + Text for demo purposes */}
             <div className="flex items-center gap-2 text-xl font-bold text-gray-600"><Globe size={28} /> Global Logistics</div>
             <div className="flex items-center gap-2 text-xl font-bold text-gray-600"><ShieldCheck size={28} /> FinSecure</div>
             <div className="flex items-center gap-2 text-xl font-bold text-gray-600"><Zap size={28} /> Atlantic Power</div>
             <div className="flex items-center gap-2 text-xl font-bold text-gray-600"><Anchor size={28} /> Maritime Ports</div>
             <div className="flex items-center gap-2 text-xl font-bold text-gray-600"><Cpu size={28} /> TechNorth</div>
          </div>
        </div>
      </div>

      {/* Insight Section - Editorial Layout */}
      <section className="py-32 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            <div className="lg:col-span-8">
              <h2 className="text-4xl md:text-6xl font-serif-display font-medium leading-tight mb-8 text-black">
                {t('home.insight_title')}
              </h2>
            </div>
            <div className="lg:col-span-4 lg:pt-4">
              <div className="w-16 h-1 bg-oakivo-secondary mb-8"></div>
              <p className="text-lg text-oakivo-muted leading-relaxed mb-6">
                {t('home.insight_text_1')}
              </p>
              <p className="text-lg text-oakivo-muted leading-relaxed">
                {t('home.insight_text_2')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Capabilities - Immersive Grid with Illustrative Images */}
      <section className="bg-black py-0">
        <div className="grid grid-cols-1 md:grid-cols-2">
            {[
              { 
                title: t('home.cap_auto_title'), 
                desc: t('home.cap_auto_desc'), 
                img: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1000&auto=format&fit=crop",
                icon: <Cpu size={32} />
              },
              { 
                title: t('home.cap_eco_title'), 
                desc: t('home.cap_eco_desc'), 
                img: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1000&auto=format&fit=crop",
                icon: <Layers size={32} />
              },
              { 
                title: t('home.cap_mod_title'), 
                desc: t('home.cap_mod_desc'), 
                img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1000&auto=format&fit=crop",
                icon: <TrendingUp size={32} />
              },
              { 
                title: t('home.cap_sec_title'), 
                desc: t('home.cap_sec_desc'), 
                img: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1000&auto=format&fit=crop",
                icon: <ShieldCheck size={32} />
              },
            ].map((item, idx) => (
              <div key={idx} className="relative group h-[500px] overflow-hidden cursor-pointer border-b border-r border-gray-800">
                 {/* Image */}
                 <img 
                  src={item.img} 
                  alt={item.title} 
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-60 group-hover:opacity-40" 
                 />
                 
                 {/* Gradient Overlay */}
                 <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-90 group-hover:opacity-80 transition-opacity"></div>

                 {/* Content */}
                 <div className="absolute inset-0 p-12 flex flex-col justify-end items-start">
                    <div className="mb-6 text-oakivo-secondary transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                      {item.icon}
                    </div>
                    <h3 className="text-3xl md:text-4xl font-bold text-white mb-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75">{item.title}</h3>
                    <p className="text-gray-300 text-lg max-w-md transform translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-100">
                      {item.desc}
                    </p>
                    <div className="mt-8 transform translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-150">
                      <span className="text-white border-b border-oakivo-secondary pb-1 text-sm font-bold uppercase tracking-widest flex items-center gap-2">
                        {t('home.explore')} <ArrowRight size={16} />
                      </span>
                    </div>
                 </div>
              </div>
            ))}
        </div>
      </section>

      {/* Featured Work - High Contrast with Abstract Illustrative Images */}
      <section className="bg-white text-black py-32">
        <div className="container mx-auto px-6">
           <div className="flex flex-col md:flex-row justify-between items-end mb-20">
             <h2 className="text-5xl md:text-6xl font-serif-display font-bold max-w-xl">{t('home.impact_title')}</h2>
             <Link to={NavRoute.CASE_STUDIES} className="hidden md:flex items-center gap-2 font-bold border-b-2 border-black pb-1 hover:text-oakivo-secondary hover:border-oakivo-secondary transition-all">
               {t('home.view_portfolio')} <ArrowRight size={20} />
             </Link>
           </div>
           
           <div className="space-y-32">
             {[
               {
                 client: "Atlantic Logistics",
                 title: "Reimagining the supply chain through the lens of IoT.",
                 img: "https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?q=80&w=2000&auto=format&fit=crop", // Abstract analytics/data
                 tag: "Industrial Automation",
                 stat: "80% Efficiency Gain"
               },
               {
                 client: "FinTrust Canada",
                 title: "Architecting a fortress for the future of digital banking.",
                 img: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?q=80&w=2000&auto=format&fit=crop", // Code/Security abstract
                 tag: "Cloud Security",
                 stat: "Zero Downtime Migration"
               }
             ].map((work, idx) => (
               <div key={idx} className="group grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                  <div className={`lg:col-span-7 ${idx % 2 === 1 ? 'lg:order-2' : ''}`}>
                    <div className="overflow-hidden relative aspect-[4/3] lg:aspect-[16/9] rounded-lg shadow-2xl">
                       {/* Illustrative Overlay to match Capabilities style */}
                      <div className="absolute inset-0 bg-gradient-to-tr from-oakivo-primary/60 to-transparent z-10 opacity-60 group-hover:opacity-40 transition-opacity duration-500"></div>
                      <img src={work.img} alt={work.title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 transform group-hover:scale-105" />
                    </div>
                  </div>
                  <div className={`lg:col-span-5 ${idx % 2 === 1 ? 'lg:order-1' : ''}`}>
                      <div className="text-oakivo-secondary font-bold uppercase tracking-widest text-xs mb-6 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-oakivo-secondary"></span>
                        {work.tag}
                      </div>
                      <h3 className="text-3xl md:text-5xl font-serif-display font-bold leading-tight mb-6 cursor-pointer hover:text-oakivo-muted transition-colors">{work.title}</h3>
                      <div className="border-l-2 border-gray-200 pl-6 my-8">
                        <p className="text-4xl font-bold text-black">{work.stat}</p>
                        <p className="text-gray-500 text-sm mt-1">Key Outcome</p>
                      </div>
                      <Link to={NavRoute.CASE_STUDIES}>
                        <Button variant="black" className="mt-4">{t('home.read_case')}</Button>
                      </Link>
                  </div>
               </div>
             ))}
           </div>
        </div>
      </section>

      {/* Thought Leadership / Blog Preview */}
      <section className="bg-oakivo-surface py-24">
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-end mb-12">
            <h2 className="text-3xl md:text-4xl font-serif-display font-bold">{t('home.perspectives_title')}</h2>
            <Link to="#" className="text-oakivo-primary font-bold hover:text-oakivo-secondary transition-colors">{t('home.view_insights')}</Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
             {[
                { date: "Oct 12, 2023", title: "The CIO's Guide to Generative AI", category: "Artificial Intelligence" },
                { date: "Sep 28, 2023", title: "Why ERP Migrations Fail (And How to Fix Them)", category: "Enterprise Platforms" },
                { date: "Sep 15, 2023", title: "Zero Trust: Beyond the Buzzword", category: "Cybersecurity" }
             ].map((post, i) => (
                <div key={i} className="bg-white p-8 border border-gray-200 hover:shadow-xl transition-all duration-300 group cursor-pointer">
                   <div className="text-xs font-bold text-oakivo-secondary uppercase tracking-widest mb-4">{post.category}</div>
                   <h3 className="text-xl font-bold mb-4 group-hover:text-oakivo-blue transition-colors">{post.title}</h3>
                   <div className="flex justify-between items-center mt-8">
                      <span className="text-gray-400 text-sm">{post.date}</span>
                      <ArrowRight size={18} className="text-gray-300 group-hover:text-oakivo-secondary transition-colors" />
                   </div>
                </div>
             ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-oakivo-secondary py-32 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="container mx-auto px-6 relative z-10">
          <h2 className="text-4xl md:text-7xl font-bold text-oakivo-primary mb-8 font-serif-display tracking-tight">{t('home.cta_footer_title')}</h2>
          <p className="text-xl text-oakivo-primary/80 mb-12 max-w-2xl mx-auto">
            {t('home.cta_footer_text')}
          </p>
          <Link to={NavRoute.CONTACT}>
            <Button variant="black" size="lg" className="px-12 py-5 text-lg">{t('home.cta_footer_btn')}</Button>
          </Link>
        </div>
      </section>
    </>
  );
};

export default Home;