import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, User, ChevronRight, Activity, PlayCircle, BookOpen, Clock } from 'lucide-react';
import Section from '../components/Section';
import { useLanguage, translations } from '../context/LanguageContext';
import SEO from '../components/SEO';

const Blog: React.FC = () => {
  const { language, t } = useLanguage();
  const blogData = translations[language].blog;

  return (
    <>
      <SEO 
        title="Intel Vault | Engineering Perspectives & Insights"
        description="Strategic analysis on Odoo 19, Agentic AI, and Cybersecurity orchestration for the Canadian industrial market."
      />

      <section className="bg-oakivo-primary text-white pt-48 pb-32 overflow-hidden relative">
         <div className="absolute inset-0 opacity-5 pointer-events-none">
            <BookOpen className="w-full h-full" />
         </div>
         <div className="container mx-auto px-6 relative z-10">
            <div className="inline-flex items-center gap-4 mb-10 bg-white/5 border border-white/10 px-6 py-2 rounded-full backdrop-blur-md">
               <Activity size={14} className="text-oakivo-secondary" />
               <span className="text-white font-black tracking-[0.3em] uppercase text-[10px]">Technical Intelligence</span>
            </div>
            <h1 className="text-6xl md:text-[9rem] font-serif-display font-bold max-w-5xl leading-[0.8] mb-12 tracking-tighter">
              {blogData.hero_title}
            </h1>
            <p className="text-2xl md:text-3xl text-gray-400 max-w-3xl font-light leading-relaxed">
              {blogData.hero_subtitle}
            </p>
         </div>
      </section>

      <Section className="bg-white py-32">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-16">
          {blogData.posts.map((post: any) => (
             <Link key={post.id} to={`/perspectives/${post.id}`} className="group block">
                <article className="flex flex-col h-full border border-gray-100 hover:border-oakivo-secondary/40 p-12 md:p-16 rounded-[60px] bg-white hover:shadow-vise-xl transition-all duration-700 relative overflow-hidden">
                   <div className="flex items-center justify-between mb-10">
                      <span className="text-[10px] font-black text-oakivo-secondary uppercase tracking-[0.3em] bg-oakivo-primary px-5 py-2 rounded-xl">
                         {post.category}
                      </span>
                      <div className="flex items-center gap-3 text-gray-400 text-[10px] font-black uppercase tracking-widest">
                         <Clock size={14} /> 6 MIN READ
                      </div>
                   </div>

                   <h2 className="text-4xl md:text-6xl font-bold font-serif-display mb-8 group-hover:text-oakivo-primary transition-colors tracking-tighter leading-none">
                     {post.title}
                   </h2>
                   
                   <p className="text-gray-500 mb-12 line-clamp-3 font-light leading-relaxed text-xl italic">
                     {post.excerpt}
                   </p>

                   <div className="mt-auto pt-10 border-t border-gray-100 flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-oakivo-surface flex items-center justify-center text-oakivo-primary font-black text-sm shadow-sm">
                           {post.author.charAt(0)}
                        </div>
                        <div>
                           <span className="block text-sm font-bold text-oakivo-primary">{post.author}</span>
                           <span className="block text-[10px] font-black uppercase tracking-widest text-gray-400">{post.date}</span>
                        </div>
                      </div>
                      <div className="text-oakivo-primary font-black text-[10px] uppercase tracking-widest flex items-center gap-3 group-hover:text-oakivo-secondary transition-all">
                        DECRYPT POST <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                      </div>
                   </div>
                </article>
             </Link>
          ))}
        </div>
      </Section>

      {/* NEWSLETTER INJECT */}
      <section className="py-40 bg-gray-50 border-y border-gray-100">
         <div className="container mx-auto px-6 max-w-4xl text-center">
            <h2 className="text-4xl md:text-6xl font-serif-display font-bold text-oakivo-primary mb-8 tracking-tighter">Stay Synchronized.</h2>
            <p className="text-xl text-gray-500 font-light mb-12">Receive tactical briefings on Odoo 19 and industrial AI direct to your vault.</p>
            <form className="flex flex-col sm:flex-row gap-4">
               <input type="email" required placeholder="principal@enterprise.ca" className="flex-grow bg-white border border-gray-200 rounded-2xl px-8 py-5 text-sm focus:outline-none focus:border-oakivo-primary" />
               <button className="bg-oakivo-primary text-white px-12 py-5 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-black transition-colors">Join the Intelligence Feed</button>
            </form>
         </div>
      </section>
    </>
  );
};

export default Blog;