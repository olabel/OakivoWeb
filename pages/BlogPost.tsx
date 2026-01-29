import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle, ShieldCheck, Calendar, User, Tag, ChevronRight, Activity, BookOpen, Target, MessageSquare, PlayCircle, Share2 } from 'lucide-react';
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

  return (
    <>
      <SEO 
        title={`${post.title} | Oakivo Intelligence Vault`}
        description={post.excerpt}
        type="article"
        schema={blogSchema}
        canonical={`/perspectives/${id}`}
      />

      {/* Expert Header */}
      <section className="bg-oakivo-primary text-white pt-48 pb-32 relative overflow-hidden">
         <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-oakivo-secondary/5 rounded-full blur-[120px] -mr-60 -mt-60"></div>
         <div className="container mx-auto px-6 max-w-5xl relative z-10">
            <Link to={NavRoute.BLOG} className="inline-flex items-center gap-3 text-oakivo-secondary mb-12 hover:text-white transition-all font-black uppercase tracking-[0.2em] text-[10px] group">
               <ArrowLeft size={16} className="group-hover:-translate-x-2 transition-transform" /> Back to Intelligence Vault
            </Link>
            
            <div className="flex flex-wrap items-center gap-4 mb-8">
               <span className="text-[10px] font-black text-oakivo-secondary uppercase tracking-[0.3em] border border-oakivo-secondary/30 px-4 py-1.5 rounded-xl">
                  {post.category}
               </span>
               <div className="h-px w-8 bg-white/20"></div>
               <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{post.date}</span>
            </div>

            <h1 className="text-4xl md:text-8xl font-serif-display font-bold leading-[0.9] mb-12 tracking-tighter">
              {post.title}
            </h1>
            
            <div className="flex flex-wrap items-center justify-between gap-10 pt-10 border-t border-white/10">
               <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 backdrop-blur-md">
                     <User size={24} className="text-oakivo-secondary" />
                  </div>
                  <div>
                    <span className="block text-lg font-bold text-white">{post.author}</span>
                    <span className="block text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">Principal Strategy Architect</span>
                  </div>
               </div>
               <div className="flex items-center gap-4">
                  <div className="hidden sm:flex items-center gap-3 px-6 py-2.5 bg-oakivo-secondary/10 text-oakivo-secondary rounded-full text-[10px] font-black uppercase tracking-widest border border-oakivo-secondary/20">
                     <CheckCircle size={14} /> Certified Strategy Report
                  </div>
                  <button className="p-3 bg-white/5 hover:bg-white/10 rounded-full border border-white/10 transition-all text-gray-400 hover:text-white">
                    <Share2 size={20} />
                  </button>
               </div>
            </div>
         </div>
      </section>

      {/* Content Engine */}
      <Section className="bg-white">
        <div className="max-w-5xl mx-auto">
           <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
              
              {/* Primary Report Data */}
              <div className="lg:col-span-8 space-y-16">
                 
                 {/* Cinematic Video Integration */}
                 {post.videoUrl && (
                   <div className="mb-16 animate-fade-in-up">
                      <div className="inline-flex items-center gap-3 text-oakivo-secondary font-black uppercase text-[10px] tracking-[0.4em] mb-6">
                        <PlayCircle size={16} /> Technical Executive Briefing
                      </div>
                      <div className="aspect-video w-full rounded-[48px] overflow-hidden shadow-4xl bg-oakivo-primary border border-gray-100 relative group">
                         <iframe 
                           className="w-full h-full grayscale group-hover:grayscale-0 transition-all duration-1000"
                           src={post.videoUrl} 
                           title="Oakivo Strategic Intelligence Video"
                           frameBorder="0" 
                           allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                           allowFullScreen
                         ></iframe>
                         <div className="absolute inset-0 pointer-events-none border-[12px] border-white/5 group-hover:border-transparent transition-all duration-500 rounded-[48px]"></div>
                      </div>
                   </div>
                 )}

                 <article className="prose prose-2xl prose-headings:font-serif-display prose-headings:tracking-tighter max-w-none font-light text-gray-600 leading-relaxed">
                    <h2 className="text-3xl md:text-5xl font-serif-display font-bold text-oakivo-primary flex items-center gap-4 mb-10">
                       <BookOpen size={28} className="text-oakivo-secondary" /> Executive Summary
                    </h2>
                    <p className="text-2xl text-oakivo-primary font-light italic border-l-[10px] border-oakivo-secondary/40 pl-8 mb-16 leading-snug">
                       {post.sections.introduction}
                    </p>

                    <div className="bg-oakivo-surface p-12 rounded-[56px] border border-gray-100 my-16 not-prose shadow-sm relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-8 opacity-5">
                          <Target size={120} />
                        </div>
                        <h3 className="text-[11px] font-black text-oakivo-primary uppercase tracking-[0.4em] mb-10 flex items-center gap-3">
                           Strategic Objectives
                        </h3>
                        <ul className="grid grid-cols-1 md:grid-cols-1 gap-8 list-none p-0 relative z-10">
                           {post.sections.takeaways.map((item: string, i: number) => (
                              <li key={i} className="flex gap-6 items-start">
                                 <div className="w-10 h-10 rounded-2xl bg-white border border-gray-100 flex items-center justify-center text-oakivo-secondary shrink-0 shadow-sm">
                                    <Activity size={18} />
                                 </div>
                                 <span className="text-gray-700 text-lg font-medium pt-1 leading-snug">{item}</span>
                              </li>
                           ))}
                        </ul>
                    </div>

                    <h2 className="text-3xl md:text-5xl font-serif-display font-bold text-oakivo-primary flex items-center gap-4 mb-10 mt-16">
                       <MessageSquare size={28} className="text-oakivo-secondary" /> Tactical Discussion
                    </h2>
                    <div className="text-xl text-gray-600 font-light leading-loose mb-16 space-y-8">
                        {post.sections.discussion}
                    </div>

                    <div className="p-16 bg-oakivo-primary text-white rounded-[60px] relative overflow-hidden not-prose shadow-4xl group">
                        <div className="absolute top-0 right-0 p-12 opacity-5 group-hover:opacity-10 transition-opacity">
                           <ShieldCheck size={160} />
                        </div>
                        <h3 className="text-4xl font-serif-display font-bold mb-8">Architectural Conclusion</h3>
                        <p className="text-gray-300 font-light leading-relaxed text-xl mb-12 relative z-10">
                           {post.sections.conclusion}
                        </p>
                        <Link to={NavRoute.CONTACT}>
                          <Button variant="primary" className="px-12 py-5 font-bold shadow-2xl">Book Strategic Audit</Button>
                        </Link>
                    </div>
                 </article>
              </div>

              {/* Sidebar Intel */}
              <div className="lg:col-span-4">
                 <div className="lg:sticky lg:top-32 space-y-10">
                    <div className="p-10 bg-gray-50 rounded-[48px] border border-gray-100 shadow-sm">
                       <h4 className="text-[10px] font-black text-oakivo-primary uppercase tracking-[0.3em] mb-10">Intelligence Origin</h4>
                       <div className="flex items-center gap-4 mb-10">
                          <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center text-oakivo-primary border border-gray-100">
                             <User size={32} />
                          </div>
                          <div>
                             <p className="font-bold text-xl text-oakivo-primary leading-none">{post.author}</p>
                             <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest mt-2">Verified Architect</p>
                          </div>
                       </div>
                       <p className="text-sm text-gray-500 leading-relaxed font-light mb-10 italic">
                          Specializing in industrial ERP orchestration and de-coupling legacy technical debt for Canadian mid-market manufacturing.
                       </p>
                       <Link to={NavRoute.ABOUT}>
                          <Button variant="ghost" size="sm" className="text-oakivo-secondary flex items-center gap-2 group">
                             Explore Profile <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                          </Button>
                       </Link>
                    </div>

                    <div className="p-10 bg-oakivo-secondary text-oakivo-primary rounded-[48px] shadow-4xl shadow-oakivo-secondary/10 group overflow-hidden relative">
                       <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/20 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-1000"></div>
                       <h4 className="text-[11px] font-black uppercase tracking-[0.3em] mb-6">Need Clarity?</h4>
                       <p className="text-lg font-bold leading-snug mb-10">
                          Request a personalized architectural audit based on the findings in this report.
                       </p>
                       <Link to={NavRoute.CONTACT} className="relative z-10">
                          <Button variant="black" size="md" className="w-full py-5 text-base shadow-2xl">Schedule Human Audit</Button>
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