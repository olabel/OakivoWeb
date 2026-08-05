import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, User, ChevronRight, Sparkles, BookOpen, Clock, ShieldCheck } from 'lucide-react';
import Section from '../components/Section';
import { useLanguage, translations } from '../context/LanguageContext';
import SEO from '../components/SEO';

const Blog: React.FC = () => {
  const { language } = useLanguage();
  const blogData = translations[language].blog;

  return (
    <>
      <SEO 
        title="Automation Insights | Practical Articles for Atlantic Canada Businesses"
        description="Read tactical guides on eliminating manual data entry, connecting accounting software, and saving staff payroll hours in Atlantic Canada."
        canonical="/blog"
      />

      <section className="bg-[#070A0F] text-white pt-40 pb-20 relative overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-emerald-500/5 rounded-full blur-[140px] pointer-events-none" />

        <div className="container mx-auto px-4 md:px-6 relative z-10 text-center max-w-4xl">
          <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-full mb-8">
            <ShieldCheck size={14} className="text-emerald-400" />
            <span className="text-[10px] font-mono-tech text-emerald-400 font-bold uppercase tracking-widest">
              Automation Knowledge Base
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-linear-heading mb-6">
            {blogData.hero_title}
          </h1>
          <p className="text-base md:text-xl text-[#8A8F98] max-w-2xl mx-auto font-normal leading-relaxed">
            {blogData.hero_subtitle}
          </p>
        </div>
      </section>

      <Section className="bg-[#0B0F17] text-white py-24 border-t border-white/10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {blogData.posts.map((post: any) => (
            <Link key={post.id} to={`/perspectives/${post.id}`} className="group block">
              <article className="linear-card rounded-3xl p-8 border border-white/[0.08] hover:border-emerald-500/30 transition-all flex flex-col h-full justify-between">
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-[10px] font-mono-tech font-bold text-emerald-400 uppercase tracking-widest bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full">
                      {post.category}
                    </span>
                    <div className="flex items-center gap-2 text-[#8A8F98] text-[10px] font-mono-tech font-bold uppercase tracking-wider">
                      <Clock size={12} /> 4 MIN READ
                    </div>
                  </div>

                  <h2 className="text-2xl font-bold text-white mb-4 group-hover:text-emerald-400 transition-colors tracking-tight">
                    {post.title}
                  </h2>
                  
                  <p className="text-sm text-gray-400 font-light leading-relaxed mb-8">
                    {post.excerpt}
                  </p>
                </div>

                <div className="pt-6 border-t border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-emerald-400 font-bold text-xs">
                      {post.author.charAt(0)}
                    </div>
                    <div>
                      <span className="block text-xs font-bold text-white">{post.author}</span>
                      <span className="block text-[10px] text-gray-500 font-mono-tech">{post.date}</span>
                    </div>
                  </div>

                  <div className="text-emerald-400 font-mono-tech text-[10px] font-bold uppercase tracking-widest flex items-center gap-1.5 group-hover:translate-x-1 transition-transform">
                    READ ARTICLE <ChevronRight size={14} />
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </Section>
    </>
  );
};

export default Blog;
