import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle, ShieldCheck, Calendar, User, Tag, ChevronRight, Activity, BookOpen, Target, MessageSquare } from 'lucide-react';
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
      "name": post.author || "Ahmed Bello",
      "url": "https://www.oakivo.com/about"
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

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.oakivo.com/" },
      { "@type": "ListItem", "position": 2, "name": "Perspectives", "item": "https://www.oakivo.com/perspectives" },
      { "@type": "ListItem", "position": 3, "name": post.title, "item": `https://www.oakivo.com/perspectives/${id}` }
    ]
  };

  return (
    <>
      <SEO 
        title={`${post.title} | Oakivo Intelligence Vault`}
        description={post.excerpt}
        type="article"
        schema={[blogSchema, breadcrumbSchema]}
        canonical={`/perspectives/${id}`}
      />

      {/* Structured Header */}
      <section className="bg-oakivo-primary text-white pt-48 pb-32 relative overflow-hidden">
         <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-oakivo-secondary/5 rounded-full blur-[120px] -mr-60 -mt-60"></div>
         <div className="container mx-auto px-6 max-w-5xl relative z-10">
            <Link to={NavRoute.BLOG} className="inline-flex items-center gap-3 text-oakivo-secondary mb-12 hover:text-white transition-all font-black uppercase tracking-[0.2em] text-[10px] group">
               <ArrowLeft size={16} className="group-hover:-translate-x-2 transition-transform" /> Back to Intelligence Vault
            </Link>
            
            <div className="flex flex-wrap items-center gap-4 mb-8">
               <span className="text-[10px] font-black text-oakivo-secondary uppercase tracking-[0.3em] border border-oakivo-secondary/30 px-3 py-1 rounded">
                  {post.category}
               </span>
               <div className="h-px w-8 bg-white/20"></div>
               <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{post.date}</span>
            </div>

            <h1 className="text-4xl md:text-8xl font-serif-display font-bold leading-[0.85] mb-12 tracking-tighter">
              {post.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-10 pt-10 border-t border-white/10">
               <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 backdrop-blur-md">
                     <User size={24} className="text-oakivo-secondary" />
                  </div>
                  <div>
                    <span className="block text-base font-bold text-white">{post.author}</span>
                    <span className="block text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">Senior Strategy Architect</span>
                  </div>
               </div>
               <div className="hidden sm:flex items-center gap-3 px-5 py-2 bg-oakivo-secondary/10 text-oakivo-secondary rounded-full text-[10px] font-black uppercase tracking-widest border border-oakivo-secondary/20">
                  <CheckCircle size={14} /> Certified Strategy Audit
               </div>
            </div>
         </div>
      </section>

      {/* Structured Body Layout */}
      <Section className="bg-white">
        <div className="max-w-5xl mx-auto">
           <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
              
              {/* Main Content Area */}
              <div className="lg:col-span-8 space-y-16">
                 
                 {/* Introduction */}
                 <article className="prose prose-2xl prose-headings:font-serif-display prose-headings:tracking-tighter max-w-none">
                    <h2 className="text-3xl md:text-5xl font-serif-display font-bold text-oakivo-primary flex items-center gap-4 mb-8">
                       <BookOpen size={28} className="text-oakivo-secondary" /> 1. Introduction
                    </h2>
                    <p className="text-xl text-gray-700 leading-relaxed font-light italic border-l-4 border-oakivo-secondary pl-8 mb-12">
                       {post.sections.introduction}
                    </p>

                    {/* Key Takeaways Grid */}
                    <div className="bg-oakivo-surface p-12 rounded-[40px] border border-gray-100 my-16 not-prose">
                        <h3 className="text-sm font-black text-oakivo-primary uppercase tracking-[0.3em] mb-8 flex items-center gap-3">
                           <Target size={20} className="text-oakivo-secondary" /> Key Strategic Takeaways
                        </h3>
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-6 list-none p-0">
                           {post.sections.takeaways.map((item: string, i: number) => (
                              <li key={i} className="flex gap-4">
                                 <div className="w-6 h-6 rounded-full bg-oakivo-secondary/20 flex items-center justify-center text-oakivo-secondary shrink-0 mt-1">
                                    <Activity size={12} />
                                 </div>
                                 <span className="text-gray-600 text-sm font-medium">{item}</span>
                              </li>
                           ))}
                        </ul>
                    </div>

                    {/* Discussion */}
                    <h2 className="text-3xl md:text-5xl font-serif-display font-bold text-oakivo-primary flex items-center gap-4 mb-8 mt-16">
                       <MessageSquare size={28} className="text-oakivo-secondary" /> 2. Strategic Discussion
                    </h2>
                    <div className="text-xl text-gray-600 font-light leading-relaxed mb-16">
                        {post.sections.discussion}
                    </div>

                    {/* Conclusion */}
                    <div className="p-12 bg-oakivo-primary text-white rounded-[40px] relative overflow-hidden not-prose">
                        <div className="absolute top-0 right-0 p-8 opacity-5">
                           <ShieldCheck size={100} />
                        </div>
                        <h3 className="text-3xl font-serif-display font-bold mb-6">3. The Path Forward</h3>
                        <p className="text-gray-300 font-light leading-relaxed text-lg">
                           {post.sections.conclusion}
                        </p>
                    </div>
                 </article>
              </div>

              {/* Sticky Sidebar */}
              <div className="lg:col-span-4">
                 <div className="lg:sticky lg:top-32 space-y-12">
                    <div className="p-10 bg-gray-50 rounded-[40px] border border-gray-100 shadow-sm">
                       <h4 className="text-[10px] font-black text-oakivo-primary uppercase tracking-[0.2em] mb-8">Author Intelligence</h4>
                       <div className="flex items-center gap-4 mb-8">
                          <div className="w-14 h-14 bg-white rounded-2xl shadow-sm flex items-center justify-center text-oakivo-primary">
                             <User size={24} />
                          </div>
                          <div>
                             <p className="font-bold text-oakivo-primary leading-none">{post.author}</p>
                             <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest mt-2">Principal Architect</p>
                          </div>
                       </div>
                       <p className="text-xs text-gray-500 leading-relaxed font-light mb-8">
                          Expert in de-coupling legacy systems and orchestrating AI-driven growth for mid-market Canadian industrial sectors.
                       </p>
                       <Link to={NavRoute.ABOUT}>
                          <Button variant="ghost" size="sm" className="text-oakivo-secondary flex items-center gap-2">
                             Full Bio <ChevronRight size={14} />
                          </Button>
                       </Link>
                    </div>

                    <div className="p-10 bg-oakivo-secondary text-oakivo-primary rounded-[40px] shadow-2xl shadow-oakivo-secondary/20">
                       <h4 className="text-[10px] font-black uppercase tracking-[0.2em] mb-6">Need Clarity?</h4>
                       <p className="text-sm font-bold leading-relaxed mb-8">
                          Request a personalized architectural audit based on the principles in this report.
                       </p>
                       <Link to={NavRoute.CONTACT}>
                          <Button variant="black" size="md" className="w-full">Book Audit</Button>
                       </Link>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </Section>
    </>
  );
};

export default BlogPost;