import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, TrendingUp, ShieldCheck, Layers, Cpu, Globe, Zap, Anchor, Shield, Award, Users, Play, Target, BarChart3, ChevronRight, Activity, Database, Workflow } from 'lucide-react';
import Button from '../components/Button';
import Logo from '../components/Logo';
import { NavRoute } from '../types';
import { useLanguage, translations } from '../context/LanguageContext';
import SEO from '../components/SEO';

const Home: React.FC = () => {
  const { t, language } = useLanguage();
  const blogPosts = translations[language].blog.posts.slice(0, 3);

  const industries = [
    "Manufacturing", "Retail", "Distribution", "Finance", "Public Sector", "Logistics", "Energy", "Healthcare"
  ];

  return (
    <>
      <SEO 
        title="Oakivo | Orchestrating Canadian Digital Transformation"
        description="Oakivo Solutions is Canada's premier digital transformation agency. Specializing in Odoo ERP, intelligent automation, and cybersecurity for enterprise SMEs."
        keywords="Odoo ERP Canada, Digital Transformation, Business Automation, Cyber Security Atlantic Canada, ERP Implementation"
      />

      {/* Hero Section - Cinematic & Expert-Grade Design */}
      <section className="relative min-h-screen flex items-center bg-[#020504] overflow-hidden">
        {/* Dynamic Background Elements */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-oakivo-primary via-black to-black"></div>
          <div className="absolute top-1/4 left-1/4 w-[800px] h-[800px] bg-oakivo-secondary/5 rounded-full blur-[160px] animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-oakivo-blue/5 rounded-full blur-[140px] animate-pulse delay-1000"></div>
          {/* Subtle grid pattern overlay */}
          <div className="absolute inset-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10 pt-20">
          <div className="max-w-6xl">
            <div className="mb-12 inline-flex items-center gap-4 bg-white/5 border border-white/10 px-6 py-2 rounded-full backdrop-blur-md animate-fade-in-up">
               <Activity className="text-oakivo-secondary" size={16} />
               <span className="text-white font-bold tracking-[0.2em] uppercase text-[10px] md:text-xs">
                 Canada's Lead Digital Architects
               </span>
            </div>

            <h1 className="text-6xl md:text-8xl lg:text-[11rem] font-serif-display font-bold text-white leading-[0.8] mb-12 tracking-tighter animate-fade-in-up [animation-delay:200ms]">
              {t('home.hero_title_1')} <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-oakivo-secondary via-green-400 to-white">{t('home.hero_title_2')}</span>
            </h1>

            <p className="text-xl md:text-3xl text-gray-400 mb-16 max-w-4xl font-light leading-snug animate-fade-in-up [animation-delay:400ms]">
              {t('home.hero_subtitle')}
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-10 animate-fade-in-up [animation-delay:600ms]">
              <Link to={NavRoute.CONTACT}>
                <Button variant="primary" size="lg" className="px-14 py-6 text-xl shadow-[0_0_50px_rgba(46,204,113,0.3)] hover:scale-105 transition-transform duration-500">
                  {t('home.cta_primary')}
                </Button>
              </Link>
              <Link to={NavRoute.CASE_STUDIES} className="group flex items-center gap-5 text-white font-bold uppercase tracking-widest text-sm transition-all hover:text-oakivo-secondary">
                <div className="w-14 h-14 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-oakivo-secondary group-hover:text-black group-hover:border-oakivo-secondary transition-all">
                  <Play size={20} fill="currentColor" />
                </div>
                {language === 'en' ? 'Success Showreel' : 'Démo de succès'}
              </Link>
            </div>
          </div>
        </div>
        
        {/* Animated Scroll Visual */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-6 opacity-30">
          <div className="w-[1px] h-24 bg-gradient-to-b from-white to-transparent"></div>
        </div>
      </section>

      {/* Industry Marquee Section */}
      <div className="bg-oakivo-primary py-8 border-y border-white/5 overflow-hidden">
        <div className="animate-marquee">
          {[...industries, ...industries].map((industry, i) => (
            <div key={i} className="flex items-center gap-4 mx-12">
              <span className="text-white/20 font-serif-display text-4xl font-bold uppercase tracking-tighter italic">{industry}</span>
              <div className="w-2 h-2 rounded-full bg-oakivo-secondary/30"></div>
            </div>
          ))}
        </div>
      </div>

      {/* Expert Stats Strip - Removed "Gold Partner" */}
      <div className="bg-white py-16 border-b border-gray-100">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-12">
            {[
              { label: 'Partnership', val: 'Odoo Experts', icon: <Award className="text-oakivo-secondary" /> },
              { label: 'Infrastructure', val: 'SOC2 Ready', icon: <Shield className="text-oakivo-secondary" /> },
              { label: 'Operational Impact', val: '500k+ Hours', icon: <Activity className="text-oakivo-secondary" /> },
              { label: 'Strategic Scale', val: '98% Retention', icon: <Users className="text-oakivo-secondary" /> },
            ].map((stat, i) => (
              <div key={i} className="flex items-center gap-5 group">
                <div className="p-4 bg-oakivo-surface rounded-2xl group-hover:bg-oakivo-primary group-hover:text-white transition-all duration-500">
                  {stat.icon}
                </div>
                <div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-1">{stat.label}</p>
                  <p className="text-2xl font-bold text-oakivo-primary font-serif-display">{stat.val}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Value Proposition - Core Methodology */}
      <section className="py-32 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-24 items-center">
            <div className="lg:col-span-6">
              <div className="inline-block px-5 py-2 bg-oakivo-secondary/10 text-oakivo-secondary rounded-full text-xs font-bold uppercase tracking-widest mb-8">
                The Oakivo Methodology
              </div>
              <h2 className="text-5xl md:text-8xl font-serif-display font-bold text-oakivo-primary leading-[0.9] mb-12 tracking-tighter">
                {t('home.insight_title')}
              </h2>
              <div className="space-y-10">
                <p className="text-2xl text-gray-600 leading-relaxed font-light italic border-l-8 border-oakivo-secondary pl-10">
                  {t('home.insight_text_1')}
                </p>
                <p className="text-xl text-gray-500 leading-relaxed max-w-2xl">
                  {t('home.insight_text_2')}
                </p>
              </div>
            </div>
            <div className="lg:col-span-6">
              <div className="grid grid-cols-1 gap-6">
                {[
                  { title: "Strategic Audit", icon: <Target className="text-oakivo-secondary" />, desc: "Deep operational forensics before any code is written." },
                  { title: "Ecosystem Design", icon: <Workflow className="text-oakivo-secondary" />, desc: "Architecting Odoo as the central nervous system of your firm." },
                  { title: "Continuous Scaling", icon: <Database className="text-oakivo-secondary" />, desc: "Ongoing advisory to ensure your tech stays ahead of the curve." }
                ].map((item, i) => (
                  <div key={i} className="bg-oakivo-surface p-10 rounded-3xl border border-transparent hover:border-oakivo-secondary/20 hover:bg-white hover:shadow-2xl transition-all duration-500 group">
                    <div className="flex gap-8 items-start">
                      <div className="shrink-0 p-4 bg-white rounded-2xl shadow-sm group-hover:bg-oakivo-primary group-hover:text-white transition-all">
                        {item.icon}
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold font-serif-display mb-3 text-oakivo-primary">{item.title}</h3>
                        <p className="text-gray-500 leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Capabilities - Expert Grid with Interactions */}
      <section className="bg-white py-0 border-t border-gray-100">
        <div className="grid grid-cols-1 md:grid-cols-2">
            {[
              { 
                title: t('home.cap_auto_title'), 
                desc: t('home.cap_auto_desc'), 
                img: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1200&auto=format&fit=crop",
                icon: <Cpu size={48} />
              },
              { 
                title: t('home.cap_eco_title'), 
                desc: t('home.cap_eco_desc'), 
                img: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200&auto=format&fit=crop",
                icon: <Layers size={48} />
              },
              { 
                title: t('home.cap_mod_title'), 
                desc: t('home.cap_mod_desc'), 
                img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200&auto=format&fit=crop",
                icon: <TrendingUp size={48} />
              },
              { 
                title: t('home.cap_sec_title'), 
                desc: t('home.cap_sec_desc'), 
                img: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1200&auto=format&fit=crop",
                icon: <ShieldCheck size={48} />
              },
            ].map((item, idx) => (
              <Link to={NavRoute.SERVICES} key={idx} className="relative group min-h-[550px] flex flex-col justify-end p-16 overflow-hidden border-b border-r border-gray-100 transition-all duration-700">
                 <img 
                  src={item.img} 
                  alt={item.title} 
                  className="absolute inset-0 w-full h-full object-cover transition-all duration-[2s] group-hover:scale-110 opacity-60 group-hover:opacity-100" 
                  loading="lazy"
                 />
                 <div className="absolute inset-0 bg-gradient-to-t from-oakivo-primary/95 via-oakivo-primary/40 to-transparent"></div>
                 
                 <div className="relative z-10 translate-y-6 group-hover:translate-y-0 transition-all duration-700">
                    <div className="mb-8 text-oakivo-secondary group-hover:scale-110 transition-transform origin-left">
                      {item.icon}
                    </div>
                    <h3 className="text-4xl md:text-5xl font-serif-display font-bold text-white mb-6 leading-tight">{item.title}</h3>
                    <p className="text-gray-300 text-xl max-w-md mb-10 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100">
                      {item.desc}
                    </p>
                    <div className="flex items-center gap-4 text-white font-bold uppercase tracking-widest text-xs">
                      <span className="border-b-2 border-oakivo-secondary pb-1">{t('home.explore')}</span>
                      <ArrowRight size={20} className="group-hover:translate-x-3 transition-transform" />
                    </div>
                 </div>
              </Link>
            ))}
        </div>
      </section>

      {/* Blog Highlight - Thought Leadership */}
      <section className="bg-gray-50 py-32">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-10">
            <div className="max-w-2xl">
              <h2 className="text-5xl md:text-7xl font-serif-display font-bold text-oakivo-primary tracking-tighter">
                {t('home.perspectives_title')}
              </h2>
              <p className="text-xl text-gray-500 font-light mt-4">Expert analysis on ERP orchestration and the industrial digital economy.</p>
            </div>
            <Link to={NavRoute.BLOG} className="text-oakivo-primary font-bold group flex items-center gap-3 bg-white px-8 py-4 rounded-full border border-gray-200 hover:border-oakivo-secondary transition-all">
              {t('home.view_insights')} <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
             {blogPosts.map((post: any, i: number) => (
                <Link key={i} to={`/perspectives/${post.id}`} className="group flex flex-col h-full">
                  <div className="bg-white p-12 rounded-3xl border border-gray-100 group-hover:shadow-2xl transition-all duration-700 h-full flex flex-col">
                     <div className="flex items-center justify-between mb-10">
                        <span className="text-[10px] font-bold text-oakivo-secondary uppercase tracking-[0.25em]">{post.category}</span>
                        <div className="w-10 h-10 rounded-full bg-oakivo-surface flex items-center justify-center text-oakivo-primary group-hover:bg-oakivo-secondary group-hover:text-black transition-all">
                          <Zap size={16} />
                        </div>
                     </div>
                     <h3 className="text-2xl font-bold font-serif-display mb-8 group-hover:text-oakivo-secondary transition-colors flex-grow leading-tight">{post.title}</h3>
                     <p className="text-gray-500 line-clamp-3 mb-10 text-lg font-light leading-relaxed">{post.excerpt}</p>
                     <div className="flex items-center justify-between pt-10 border-t border-gray-50">
                        <span className="text-gray-400 text-xs font-bold uppercase tracking-widest">{post.date}</span>
                        <div className="flex items-center gap-2 text-oakivo-primary font-bold text-xs uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all">
                          Read Strategy <ArrowRight size={14} />
                        </div>
                     </div>
                  </div>
                </Link>
             ))}
          </div>
        </div>
      </section>

      {/* Global CTA */}
      <section className="bg-oakivo-secondary py-40 text-center relative overflow-hidden group">
        <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-1000"></div>
        <div className="container mx-auto px-6 relative z-10">
          <h2 className="text-6xl md:text-[9rem] font-bold text-oakivo-primary mb-12 font-serif-display tracking-tighter leading-[0.75]">{t('home.cta_footer_title')}</h2>
          <p className="text-2xl md:text-4xl text-oakivo-primary/80 mb-20 max-w-4xl mx-auto font-light leading-relaxed">
            {t('home.cta_footer_text')}
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-8">
            <Link to={NavRoute.CONTACT}>
              <Button variant="black" size="lg" className="px-20 py-7 text-2xl shadow-2xl transition-all hover:scale-105">
                {t('home.cta_footer_btn')}
              </Button>
            </Link>
            <Link to={NavRoute.SERVICES}>
              <Button variant="outline" size="lg" className="px-20 py-7 text-2xl text-oakivo-primary border-oakivo-primary hover:bg-oakivo-primary hover:text-white transition-all">
                The Solution Matrix
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;