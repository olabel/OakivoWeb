import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, Sparkles, BookOpen, Share2, ShieldCheck, ArrowRight } from 'lucide-react';
import Section from '../components/Section';
import { useLanguage, translations } from '../context/LanguageContext';
import { NavRoute } from '../types';
import SEO from '../components/SEO';
import LeadDrawer from '../components/LeadDrawer';

const BlogPost: React.FC = () => {
  const { id } = useParams();
  const { language } = useLanguage();
  const posts = translations[language].blog.posts;
  const post = posts.find((p: any) => p.id.toString() === id);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  if (!post) return null;

  return (
    <>
      <SEO 
        title={`${post.title} | Oakivo Automation Article`} 
        description={post.excerpt}
        canonical={`/perspectives/${post.id}`}
      />

      <section className="bg-[#070A0F] text-white pt-40 pb-20 relative overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-emerald-500/5 rounded-full blur-[140px] pointer-events-none" />

        <div className="container mx-auto px-4 md:px-6 max-w-4xl relative z-10">
          <Link to={NavRoute.BLOG} className="inline-flex items-center gap-2 text-emerald-400 mb-8 hover:underline font-mono-tech font-bold uppercase tracking-wider text-xs">
            <ArrowLeft size={16} /> Back to Articles
          </Link>
          
          <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full mb-6 text-emerald-400 font-mono-tech font-bold text-xs">
            {post.category}
          </div>

          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-linear-heading mb-8">
            {post.title}
          </h1>
          
          <div className="flex items-center justify-between pt-6 border-t border-white/10 text-xs text-gray-400">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center font-bold text-emerald-400">
                {post.author.charAt(0)}
              </div>
              <div>
                <span className="block font-bold text-white">{post.author}</span>
                <span className="block text-[10px] text-gray-500 font-mono-tech">{post.date}</span>
              </div>
            </div>
            
            <button 
              onClick={() => {
                if (navigator.share) {
                  navigator.share({ title: post.title, url: window.location.href });
                } else {
                  navigator.clipboard.writeText(window.location.href);
                  alert("Link copied to clipboard!");
                }
              }} 
              className="p-2.5 bg-white/5 hover:bg-white/10 rounded-full border border-white/10 transition-all text-gray-300 cursor-pointer"
            >
              <Share2 size={16} />
            </button>
          </div>
        </div>
      </section>

      <Section className="bg-[#0B0F17] text-white py-20 border-t border-white/10">
        <div className="max-w-3xl mx-auto space-y-12">
          
          {/* Key Summary Box */}
          <div className="linear-card rounded-3xl p-8 border border-white/10 space-y-6">
            <div className="flex items-center gap-2 text-emerald-400 font-mono-tech font-bold uppercase tracking-wider text-xs">
              <Sparkles size={16} /> Key Takeaways
            </div>
            <p className="text-base text-gray-200 font-medium leading-relaxed italic border-l-2 border-emerald-400 pl-4">
              "{post.keyTakeawaysSummary}"
            </p>
            <ul className="space-y-3 pt-2">
              {post.sections.takeaways.map((item: string, i: number) => (
                <li key={i} className="flex gap-3 items-center text-sm text-gray-300">
                  <CheckCircle2 size={16} className="text-emerald-400 shrink-0" /> {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Article Body */}
          <article className="prose prose-invert max-w-none text-gray-300 leading-relaxed space-y-8">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <BookOpen size={20} className="text-emerald-400" /> Executive Overview
            </h2>
            <p className="text-base leading-relaxed font-light">{post.sections.introduction}</p>

            <h2 className="text-2xl font-bold text-white">Detailed Analysis</h2>
            <p className="text-base leading-relaxed font-light">{post.sections.discussion}</p>

            <h2 className="text-2xl font-bold text-white">Conclusion</h2>
            <p className="text-base leading-relaxed font-light">{post.sections.conclusion}</p>
          </article>

          {/* CTA Banner */}
          <div className="linear-card rounded-3xl p-8 md:p-12 border border-white/10 text-center space-y-6">
            <span className="text-[10px] font-mono-tech text-emerald-400 font-bold uppercase tracking-widest block">
              Done-For-You Automation
            </span>
            <h3 className="text-2xl md:text-3xl font-bold text-white">
              Ready to stop wasting hours on manual data entry?
            </h3>
            <p className="text-xs md:text-sm text-gray-400 font-light max-w-xl mx-auto">
              Book a free 15-minute operational audit with one of our automation specialists. We'll show you where your staff is losing time and how connecting your tools can fix it.
            </p>
            <button
              onClick={() => setIsDrawerOpen(true)}
              className="px-8 py-4 rounded-full bg-white hover:bg-gray-100 text-black font-semibold text-xs tracking-wide shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:scale-105 transition-all inline-flex items-center gap-2 cursor-pointer"
            >
              <Sparkles size={16} /> Book My Free 15-Minute Audit
            </button>
          </div>

        </div>
      </Section>

      <LeadDrawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />
    </>
  );
};

export default BlogPost;
