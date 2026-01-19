import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Section from '../components/Section';
import { useLanguage, translations } from '../context/LanguageContext';
import { NavRoute } from '../types';

const Blog: React.FC = () => {
  const { t, language } = useLanguage();
  const blogData = translations[language].blog;

  return (
    <>
      <section className="bg-black text-white pt-40 pb-20">
         <div className="container mx-auto px-6">
            <h1 className="text-5xl md:text-7xl font-serif-display font-bold max-w-4xl leading-tight mb-8">
              {blogData.hero_title}
            </h1>
            <p className="text-xl md:text-2xl text-gray-400 max-w-3xl font-light leading-relaxed">
              {blogData.hero_subtitle}
            </p>
         </div>
      </section>

      <Section>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {blogData.posts.map((post: any) => (
             <Link key={post.id} to={`/perspectives/${post.id}`} className="group block h-full">
                <article className="flex flex-col h-full border border-gray-100 hover:border-oakivo-secondary/50 p-8 rounded-xl bg-white hover:shadow-xl transition-all duration-300">
                   <div className="text-xs font-bold text-oakivo-secondary uppercase tracking-widest mb-4">{post.category}</div>
                   <h2 className="text-2xl font-bold font-serif-display mb-4 group-hover:text-oakivo-blue transition-colors flex-grow">
                     {post.title}
                   </h2>
                   <p className="text-gray-600 mb-6 line-clamp-3">
                     {post.excerpt}
                   </p>
                   <div className="flex justify-between items-center mt-auto border-t border-gray-100 pt-6">
                      <span className="text-gray-400 text-sm">{post.date}</span>
                      <span className="text-oakivo-primary font-bold text-sm flex items-center gap-2 group-hover:text-oakivo-secondary transition-colors">
                        Read More <ArrowRight size={16} />
                      </span>
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