import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle, ShieldCheck, Calendar, User, Tag } from 'lucide-react';
import Section from '../components/Section';
import { useLanguage, translations } from '../context/LanguageContext';
import Button from '../components/Button';
import { NavRoute } from '../types';
import SEO from '../components/SEO';

const BlogPost: React.FC = () => {
  const { id } = useParams();
  const { t, language } = useLanguage();
  const posts = translations[language].blog.posts;
  const team = translations[language].about.team;
  const ahmed = team.find((m: any) => m.name.includes("Ahmed"));
  
  const post = posts.find((p: any) => p.id.toString() === id);

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center flex-col gap-4">
        <h1 className="text-4xl font-bold">Post Not Found</h1>
        <Link to={NavRoute.BLOG}>
           <Button>Back to Perspectives</Button>
        </Link>
      </div>
    );
  }

  // Enhanced Schema for SEO Authority
  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.excerpt,
    "author": {
      "@type": "Person",
      "name": "Ahmed Bello",
      "url": "https://www.linkedin.com/in/ahmed-bello/",
      "jobTitle": "CEO & Co-Founder",
      "worksFor": {
        "@type": "Organization",
        "name": "Oakivo Solutions Inc"
      }
    },
    "datePublished": post.date,
    "publisher": {
      "@type": "Organization",
      "name": "Oakivo Solutions Inc",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.oakivo.com/logo.png"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://www.oakivo.com/perspectives/${id}`
    }
  };

  return (
    <>
      <SEO 
        title={`${post.title} | Oakivo Insights`}
        description={post.excerpt}
        type="article"
        schema={blogSchema}
        canonical={`/perspectives/${id}`}
      />

      <section className="bg-oakivo-primary text-white pt-40 pb-20 relative overflow-hidden">
         <div className="absolute top-0 right-0 w-64 h-64 bg-oakivo-secondary/5 rounded-full blur-3xl -mr-32 -mt-32"></div>
         <div className="container mx-auto px-6 max-w-4xl relative z-10">
            <Link to={NavRoute.BLOG} className="inline-flex items-center gap-2 text-oakivo-secondary mb-8 hover:text-white transition-colors font-bold uppercase tracking-tighter text-xs group">
               <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> Back to Perspectives
            </Link>
            <div className="text-xs font-bold text-oakivo-secondary uppercase tracking-widest mb-4 flex items-center gap-2">
               <span className="w-8 h-[1px] bg-oakivo-secondary"></span>
               {post.category}
            </div>
            <h1 className="text-4xl md:text-6xl font-serif-display font-bold leading-tight mb-8">
              {post.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-6 pt-6 border-t border-white/10">
               <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center border border-white/20">
                     <User size={20} className="text-oakivo-secondary" />
                  </div>
                  <div>
                    <span className="block text-sm font-bold">Ahmed Bello</span>
                    <span className="block text-xs text-gray-400">CEO & Co-Founder, Oakivo</span>
                  </div>
               </div>
               <div className="h-8 w-[1px] bg-white/10 hidden sm:block"></div>
               <div className="flex items-center gap-2 text-gray-400 text-sm">
                  <Calendar size={14} /> {post.date}
               </div>
               <div className="flex items-center gap-2 px-3 py-1 bg-green-500/10 text-green-400 rounded-full text-xs font-bold border border-green-500/20">
                  <CheckCircle size={14} /> Verified Strategy
               </div>
            </div>
         </div>
      </section>

      <Section>
        <div className="max-w-3xl mx-auto">
           <div className="mb-12 p-6 bg-gray-50 rounded-xl border border-gray-100 flex items-start gap-4 shadow-sm">
              <ShieldCheck className="text-oakivo-secondary shrink-0 mt-1" size={24} />
              <div>
                <p className="text-sm font-bold text-oakivo-primary">Institutional Authority</p>
                <p className="text-xs text-gray-500 leading-relaxed">
                  Technical audit performed by Oakivo Research in {new Date().getFullYear()}. Content adheres to the latest SOC2 compliance frameworks and Canadian data residency laws.
                </p>
              </div>
           </div>

           <article className="prose prose-xl prose-headings:font-serif-display prose-a:text-oakivo-blue max-w-none">
              <p className="lead text-2xl text-gray-700 mb-12 font-light leading-relaxed border-l-4 border-oakivo-secondary pl-8 italic bg-gray-50/50 py-4">
                 {post.excerpt}
              </p>
              <div 
                className="text-gray-800 leading-loose space-y-8 font-sans blog-content"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
           </article>

           <div className="mt-20 p-12 bg-oakivo-surface rounded-2xl border border-gray-100 flex flex-col items-center text-center shadow-lg group">
              <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center mb-6 shadow-md border border-gray-50 group-hover:scale-110 transition-transform">
                 <Tag className="text-oakivo-secondary" size={24} />
              </div>
              <h3 className="text-3xl font-serif-display font-bold mb-4">Ready to accelerate your digital journey?</h3>
              <p className="text-gray-600 mb-8 max-w-lg">
                Stop patching legacy systems and start building a resilient foundation. our consultants are ready to blueprint your roadmap.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to={NavRoute.CONTACT}>
                  <Button variant="black" size="lg">Request Free Strategy Audit</Button>
                </Link>
                <Link to={NavRoute.ABOUT}>
                  <Button variant="outline" size="lg" className="text-black border-black hover:bg-black hover:text-white">Meet our Architects</Button>
                </Link>
              </div>
           </div>
        </div>
      </Section>
    </>
  );
};

export default BlogPost;