import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle, User, Zap, BookOpen, MessageSquare, PlayCircle, Share2, Lock, ArrowRight } from 'lucide-react';
import Section from '../components/Section';
import { useLanguage, translations } from '../context/LanguageContext';
import Button from '../components/Button';
import { NavRoute } from '../types';
import SEO from '../components/SEO';

const BlogPost: React.FC = () => {
  const { id } = useParams();
  const { language } = useLanguage();
  const posts = translations[language].blog.posts;
  const post = posts.find((p: any) => p.id.toString() === id);

  if (!post) return null;

  return (
    <>
      <SEO title={`${post.title} | Oakivo`} description={post.excerpt} />

      <section className="bg-oakivo-primary text-white pt-48 pb-32">
         <div className="container mx-auto px-6 max-w-5xl">
            <Link to={NavRoute.BLOG} className="inline-flex items-center gap-3 text-oakivo-secondary mb-12 hover:text-white transition-all font-black uppercase tracking-widest text-[10px]">
               <ArrowLeft size={16} /> BACK TO VAULT
            </Link>
            
            <span className="text-[10px] font-black text-oakivo-secondary uppercase tracking-[0.3em] border border-oakivo-secondary/30 px-4 py-1.5 rounded-xl mb-8 inline-block">
               {post.category}
            </span>

            <h1 className="text-4xl md:text-8xl font-serif-display font-bold leading-[0.9] mb-12 tracking-tighter">
              {post.title}
            </h1>
            
            <div className="flex flex-wrap items-center justify-between gap-10 pt-10 border-t border-white/10">
               <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center font-bold text-oakivo-secondary">
                    {post.author.charAt(0)}
                  </div>
                  <div>
                    <span className="block text-lg font-bold">{post.author}</span>
                    <span className="block text-[10px] text-gray-400 font-bold uppercase tracking-widest">{post.date}</span>
                  </div>
               </div>
               <button className="p-3 bg-white/5 hover:bg-white/10 rounded-full border border-white/10 transition-all text-gray-400 hover:text-white">
                 <Share2 size={20} />
               </button>
            </div>
         </div>
      </section>

      <Section className="bg-white">
        <div className="max-w-4xl mx-auto space-y-16">
           <div className="bg-oakivo-surface border border-gray-100 rounded-[48px] p-10 md:p-14">
              <div className="flex items-center gap-4 mb-10">
                 <Zap className="text-oakivo-secondary" size={28} />
                 <h3 className="text-2xl font-serif-display font-bold text-oakivo-primary">Strategy Brief</h3>
              </div>
              <p className="text-2xl font-serif-display italic text-oakivo-primary/80 leading-relaxed mb-10 pl-6 border-l-4 border-oakivo-secondary">
                 {post.keyTakeawaysSummary}
              </p>
              <ul className="space-y-4">
                 {post.sections.takeaways.map((item: string, i: number) => (
                    <li key={i} className="flex gap-4 items-center text-gray-700 text-lg font-medium">
                       <CheckCircle size={18} className="text-oakivo-secondary" /> {item}
                    </li>
                 ))}
              </ul>
           </div>

           {post.videoUrl && (
             <div className="aspect-video w-full rounded-[48px] overflow-hidden shadow-vise-xl bg-oakivo-primary">
                <iframe className="w-full h-full grayscale hover:grayscale-0 transition-all duration-1000" src={post.videoUrl} title="Video Perspective" loading="lazy" />
             </div>
           )}

           <article className="prose prose-2xl prose-headings:font-serif-display max-w-none font-light text-gray-600 leading-relaxed">
              <h2 className="flex items-center gap-4 text-oakivo-primary"><BookOpen size={28} /> Analysis</h2>
              <p className="text-2xl italic mb-16">{post.sections.introduction}</p>

              <h2 className="flex items-center gap-4 text-oakivo-primary"><MessageSquare size={28} /> Strategic Context</h2>
              <div className="text-xl leading-loose mb-16">{post.sections.discussion}</div>

              {/* Action-Oriented standardized CTA Block */}
              <div className="p-10 md:p-20 bg-oakivo-primary text-white rounded-[60px] relative overflow-hidden not-prose border border-white/5 shadow-vise-xl">
                  <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
                     <Zap size={200} />
                  </div>
                  <div className="relative z-10">
                     <h3 className="text-4xl md:text-6xl font-serif-display font-bold mb-8 leading-tight tracking-tighter">Architect your <span className="text-oakivo-secondary italic font-light">sovereign</span> future.</h3>
                     <p className="text-gray-400 text-xl font-light mb-12 max-w-2xl leading-relaxed">Is your industrial logic ready for a deterministic shift? Request a technical diagnostic with our principal architects to de-risk your growth.</p>
                     <div className="flex flex-col sm:flex-row gap-6">
                        <Link to={NavRoute.CONTACT}>
                          <Button variant="white" size="lg" className="px-12 py-6 !bg-oakivo-secondary !text-oakivo-primary border-none shadow-premium group">
                             INITIATE TECHNICAL DISCOVERY <ArrowRight size={22} className="ml-3 group-hover:translate-x-2 transition-transform" />
                          </Button>
                        </Link>
                        <Link to={NavRoute.BOOKING}>
                          <Button variant="outline" size="lg" className="px-12 py-6 border-white/20 text-white hover:bg-white hover:text-oakivo-primary">
                             SCHEDULE DISCOVERY CALL
                          </Button>
                        </Link>
                     </div>
                  </div>
              </div>
           </article>
        </div>
      </Section>
    </>
  );
};

export default BlogPost;