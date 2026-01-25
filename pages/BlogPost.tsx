import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle, ShieldCheck, Calendar, User, Tag, ExternalLink } from 'lucide-react';
import Section from '../components/Section';
import { useLanguage, translations } from '../context/LanguageContext';
import Button from '../components/Button';
import { NavRoute } from '../types';
import SEO from '../components/SEO';

const BlogPost: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t, language } = useLanguage();
  const posts = translations[language].blog.posts;
  const post = posts.find((p: any) => p.id.toString() === id);

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center flex-col gap-6 bg-gray-50">
        <h1 className="text-4xl font-serif-display font-bold">Strategy Insight Not Found</h1>
        <p className="text-gray-500 max-w-md text-center">The specific technical intelligence report you are looking for has been moved or archived.</p>
        <Link to={NavRoute.BLOG}>
           <Button variant="black">Return to Intelligence Vault</Button>
        </Link>
      </div>
    );
  }

  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.excerpt,
    "author": {
      "@type": "Person",
      "name": "Ahmed Bello",
      "url": "https://www.oakivo.com/about",
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

  // Helper to handle clicks on links inside rendered HTML
  const handleContentClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    const anchor = target.closest('a');
    if (anchor) {
      const href = anchor.getAttribute('href');
      if (href && href.startsWith('#/')) {
        e.preventDefault();
        const path = href.replace('#', '');
        navigate(path);
      }
    }
  };

  return (
    <>
      <SEO 
        title={`${post.title} | Oakivo Intelligence Vault`}
        description={post.excerpt}
        type="article"
        schema={blogSchema}
        canonical={`/perspectives/${id}`}
      />

      <section className="bg-oakivo-primary text-white pt-40 pb-24 relative overflow-hidden">
         <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-oakivo-secondary/5 rounded-full blur-[120px] -mr-60 -mt-60"></div>
         <div className="container mx-auto px-6 max-w-5xl relative z-10">
            <Link to={NavRoute.BLOG} className="inline-flex items-center gap-3 text-oakivo-secondary mb-12 hover:text-white transition-all font-black uppercase tracking-[0.2em] text-[10px] group">
               <ArrowLeft size={16} className="group-hover:-translate-x-2 transition-transform" /> Back to Intelligence Vault
            </Link>
            <div className="text-[10px] font-black text-oakivo-secondary uppercase tracking-[0.3em] mb-6 flex items-center gap-3">
               <span className="w-10 h-px bg-oakivo-secondary"></span>
               {post.category}
            </div>
            <h1 className="text-4xl md:text-7xl font-serif-display font-bold leading-[0.9] mb-12 tracking-tighter">
              {post.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-10 pt-10 border-t border-white/10">
               <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 backdrop-blur-md">
                     <User size={24} className="text-oakivo-secondary" />
                  </div>
                  <div>
                    <span className="block text-base font-bold text-white">Ahmed Bello</span>
                    <span className="block text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">CEO & Senior Architect</span>
                  </div>
               </div>
               <div className="h-10 w-px bg-white/10 hidden sm:block"></div>
               <div className="flex items-center gap-3 text-gray-400 text-sm font-medium">
                  <Calendar size={16} className="text-oakivo-secondary" /> {post.date}
               </div>
               <div className="flex items-center gap-3 px-5 py-2 bg-oakivo-secondary/10 text-oakivo-secondary rounded-full text-[10px] font-black uppercase tracking-widest border border-oakivo-secondary/20 shadow-lg shadow-oakivo-secondary/5">
                  <CheckCircle size={14} /> Certified Strategy Audit
               </div>
            </div>
         </div>
      </section>

      <Section className="bg-white">
        <div className="max-w-4xl mx-auto">
           <div className="mb-16 p-8 bg-oakivo-surface rounded-[32px] border border-gray-100 flex flex-col md:flex-row items-start md:items-center gap-6 shadow-sm">
              <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-md shrink-0">
                 <ShieldCheck className="text-oakivo-secondary" size={28} />
              </div>
              <div>
                <p className="text-xs font-black text-oakivo-primary uppercase tracking-[0.2em] mb-1">Institutional Credibility Notice</p>
                <p className="text-sm text-gray-500 leading-relaxed font-light">
                  This report adheres to the latest SOC2 compliance frameworks and Canadian data residency laws. Audit ID: INTEL-2026-{id}-VAULT.
                </p>
              </div>
           </div>

           <article className="prose prose-2xl prose-headings:font-serif-display prose-headings:tracking-tighter prose-headings:leading-tight prose-a:text-oakivo-blue prose-a:no-underline hover:prose-a:underline max-w-none">
              <div className="text-3xl md:text-4xl text-gray-800 mb-16 font-serif-display font-medium leading-relaxed border-l-[12px] border-oakivo-secondary pl-12 bg-gray-50/50 py-12 rounded-r-[40px] pr-10 shadow-sm">
                 {post.excerpt}
              </div>
              <div 
                className="text-gray-700 leading-loose space-y-10 font-sans blog-content text-xl font-light"
                onClick={handleContentClick}
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
           </article>

           <div className="mt-32 p-16 bg-oakivo-primary rounded-[48px] text-white flex flex-col items-center text-center shadow-4xl group relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-oakivo-secondary/10 to-transparent pointer-events-none"></div>
              <div className="w-20 h-20 rounded-[28px] bg-white/5 border border-white/10 flex items-center justify-center mb-10 shadow-2xl backdrop-blur-md group-hover:scale-110 transition-transform duration-500">
                 <Tag className="text-oakivo-secondary" size={32} />
              </div>
              <h3 className="text-4xl md:text-6xl font-serif-display font-bold mb-8 tracking-tighter relative z-10">Blueprint your transformation.</h3>
              <p className="text-xl text-gray-400 mb-12 max-w-xl mx-auto font-light leading-relaxed relative z-10">
                Stop managing tech debt. Start orchestrating success with our certified cloud architects.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 relative z-10">
                <Link to={NavRoute.CONTACT}>
                  <Button variant="primary" size="lg" className="px-12 py-5 shadow-2xl">Request Free Strategy Audit</Button>
                </Link>
                <Link to={NavRoute.ABOUT}>
                  <Button variant="outline" size="lg" className="px-12 py-5 border-white/20 hover:bg-white hover:text-oakivo-primary">Meet the Team</Button>
                </Link>
              </div>
           </div>
        </div>
      </Section>
    </>
  );
};

export default BlogPost;