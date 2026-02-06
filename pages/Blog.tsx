import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Calendar, User, Tag, ChevronRight, Activity, PlayCircle } from 'lucide-react';
import Section from '../components/Section';
import Button from '../components/Button';
import { useLanguage, translations } from '../context/LanguageContext';
import { NavRoute } from '../types';
import SEO from '../components/SEO';

const Blog: React.FC = () => {
  const { t, language } = useLanguage();
  const blogData = translations[language].blog;

  // JSON-LD for the blog listing page
  const blogListSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": blogData.hero_title,
    "description": blogData.hero_subtitle,
    "publisher": {
      "@type": "Organization",
      "name": "Oakivo Solutions Inc",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.oakivo.com/logo.png"
      }
    },
    "blogPost": blogData.posts.map((post: any) => ({
      "@type": "BlogPosting",
      "headline": post.title,
      "url": `https://www.oakivo.com/#/perspectives/${post.id}`,
      "datePublished": "2026-01-01T00:00:00Z",
      "author": {
        "@type": "Person",
        "name": post.author
      }
    }))
  };

  return (
    <>
      <SEO 
        title="Intel Vault | Strategic AI & ERP Perspectives"
        description="Deep-dive analysis on Odoo 18, Agentic AI, and Zero-Trust Cybersecurity for the Canadian market."
        keywords="Odoo 18 Trends Canada, AI Automation Strategy, Cybersecurity Best Practices 2026"
        schema={blogListSchema}
        canonical="/perspectives"
      />

      <section className="bg-oakivo-primary text-white pt-48 pb-32 relative overflow-hidden">
         <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-oakivo-secondary/5 rounded-full blur-[140px] -mr-40 -mt-40"></div>
         <div className="container mx-auto px-6 relative z-10">
            <div className="flex items-center gap-4 mb-10">
               <div className="h-[1px] w-12 bg-oakivo-secondary"></div>
               <span className="text-oakivo-secondary font-black tracking-[0.3em] uppercase text-[10px]">Intelligence Repository</span>
            </div>
            <h1 className="text-6xl md:text-[9rem] font-serif-display font-bold max-w-5xl leading-[0.8] mb-12 tracking-tighter">
              {blogData.hero_title}
            </h1>
            <p className="text-2xl md:text-3xl text-gray-400 max-w-3xl font-light leading-relaxed">
              {blogData.hero_subtitle}
            </p>
         </div>
      </section>

      {/* Blog Feed */}
      <Section className="bg-white py-32">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {blogData.posts.map((post: any) => (
             <Link key={post.id} to={`/perspectives/${post.id}`} className="group block h-full cv-auto">
                <article className="flex flex-col h-full border border-gray-100 hover:border-oakivo-secondary/30 p-10 rounded-[48px] bg-white hover:shadow-4xl transition-all duration-700 relative overflow-hidden">
                   {/* Background Accent */}
                   <div className="absolute top-0 right-0 p-10 opacity-[0.03] text-oakivo-primary group-hover:opacity-[0.08] transition-opacity">
                      <Activity size={80} />
                   </div>

                   <div className="flex items-center gap-4 mb-8">
                      <span className="text-[10px] font-black text-oakivo-secondary uppercase tracking-[0.3em] border border-oakivo-secondary/20 px-4 py-1.5 rounded-full">
                         {post.category}
                      </span>
                      {post.videoUrl && (
                        <div className="flex items-center gap-2 text-[9px] font-black text-oakivo-primary uppercase tracking-widest bg-gray-50 px-3 py-1.5 rounded-full border border-gray-100">
                          <PlayCircle size={14} className="text-oakivo-secondary" /> Video Briefing
                        </div>
                      )}
                      <div className="h-px flex-grow bg-gray-50"></div>
                   </div>

                   <h2 className="text-3xl font-bold font-serif-display mb-6 group-hover:text-oakivo-secondary transition-colors tracking-tight leading-tight">
                     {post.title}
                   </h2>
                   
                   <p className="text-gray-500 mb-10 line-clamp-3 font-light leading-relaxed text-lg">
                     {post.excerpt}
                   </p>

                   <div className="mt-auto pt-8 border-t border-gray-50">
                      <div className="flex items-center justify-between mb-6">
                         <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center text-oakivo-primary">
                               <User size={18} />
                            </div>
                            <span className="text-xs font-bold text-oakivo-primary uppercase tracking-widest">{post.author}</span>
                         </div>
                         <div className="flex items-center gap-2 text-[10px] text-gray-400 font-bold">
                            <Calendar size={12} /> {post.date}
                         </div>
                      </div>
                      
                      <div className="text-oakivo-primary font-black text-[10px] uppercase tracking-[0.2em] flex items-center justify-between group-hover:text-oakivo-secondary transition-all">
                        Analyze Report <ChevronRight size={16} className="group-hover:translate-x-2 transition-transform" />
                      </div>
                   </div>
                </article>
             </Link>
          ))}
        </div>
      </Section>

      {/* Expert Lead CTA */}
      <section className="bg-oakivo-surface py-32 border-t border-gray-100 cv-auto">
         <div className="container mx-auto px-6">
            <div className="bg-white p-12 md:p-20 rounded-[60px] shadow-4xl border border-gray-50 flex flex-col md:flex-row items-center justify-between gap-12">
               <div className="max-w-2xl">
                  <h2 className="text-4xl md:text-6xl font-serif-display font-bold text-oakivo-primary mb-6 tracking-tighter">Need a localized strategy?</h2>
                  <p className="text-xl text-gray-500 font-light">Connect with our senior architects for a tailored technical blueprint based on these industry insights.</p>
               </div>
               <Link to={NavRoute.CONTACT}>
                  <Button variant="black" size="lg" className="px-12 py-6 text-xl">Request Custom Audit</Button>
               </Link>
            </div>
         </div>
      </section>
    </>
  );
};

export default Blog;