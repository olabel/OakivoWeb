import React, { useState, useEffect } from 'react';
import { useLanguage, translations } from '../context/LanguageContext';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, Clock, Calendar, Share2, Twitter, Linkedin, ChevronRight } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import SEO from '../components/SEO';
import OptimizedImage from '../components/OptimizedImage';
import { db } from '../utils/database';
import { InsightPost, insightsData } from '../content/insights';

const calculateReadingTime = (content: string): string => {
  if (!content) return "5 min read";
  const wordsPerMinute = 238;
  const wordCount = content.split(/\s+/).length;
  const minutes = Math.ceil(wordCount / wordsPerMinute);
  return `${minutes} MIN READ`;
};

const InsightDetail: React.FC = () => {
  const { language } = useLanguage();
  const inData = translations[language].insights;
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<InsightPost | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setIsLoading(true);
        const firebasePosts = await db.getInsights();
        const found = firebasePosts.find((p: any) => p.id === id);
        if (found) {
          setPost(found);
        } else {
          // Fallback to static if not found in db or not loaded
          // static import used instead
          const staticPost = insightsData.find(p => p.id === id);
          if (staticPost) setPost(staticPost);
          else navigate('/insights', { replace: true });
        }
      } catch (err) {
        console.error(err);
        navigate('/insights', { replace: true });
      } finally {
        setIsLoading(false);
      }
    };
    if (id) fetchPost();
  }, [id, navigate]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPx = document.documentElement.scrollTop;
      const winHeightPx = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (scrollPx / winHeightPx) * 100;
      setScrollProgress(scrolled);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-950 pt-32 pb-24">
        <div className="max-w-4xl mx-auto px-6">
          <div className="w-24 h-6 bg-slate-800 rounded animate-pulse mb-8"></div>
          <div className="w-3/4 h-12 md:h-16 bg-slate-800 rounded animate-pulse mb-6"></div>
          <div className="w-1/2 h-12 md:h-16 bg-slate-800 rounded animate-pulse mb-12"></div>
          <div className="flex gap-4 mb-12">
            <div className="w-32 h-6 bg-slate-800 rounded animate-pulse"></div>
            <div className="w-32 h-6 bg-slate-800 rounded animate-pulse"></div>
          </div>
          <div className="w-full aspect-[21/9] bg-slate-800 rounded-2xl animate-pulse mb-16"></div>
          <div className="space-y-4">
            <div className="w-full h-4 bg-slate-800 rounded animate-pulse"></div>
            <div className="w-full h-4 bg-slate-800 rounded animate-pulse"></div>
            <div className="w-5/6 h-4 bg-slate-800 rounded animate-pulse"></div>
            <div className="w-full h-4 bg-slate-800 rounded animate-pulse"></div>
            <div className="w-4/5 h-4 bg-slate-800 rounded animate-pulse"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!post) return null;

  const currentUrl = window.location.href;

  return (
    <>
      <SEO 
        title={`${post.title} | Oakivo Insights`}
        description={post.excerpt}
        image={post.coverImage}
        type="article"
        canonical={`/insights/${post.id}`}
        schema={{
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: post.title,
          image: [post.coverImage],
          datePublished: post.date,
          author: [{ '@type': 'Organization', name: post.author }]
        }}
      />
      
      {/* Reading Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-slate-900 z-50">
        <div 
          className="h-full bg-cyan-500 transition-all duration-150 ease-out"
          style={{ width: `${scrollProgress}%` }}
        ></div>
      </div>

      <article className="pt-32 pb-24 bg-slate-950 min-h-screen">
        <div className="container mx-auto px-6 max-w-4xl">
          
          <button 
            onClick={() => navigate('/insights')}
            className="flex items-center gap-2 text-slate-400 hover:text-cyan-400 font-mono text-sm tracking-widest uppercase transition-colors mb-8"
          >
            <ArrowLeft size={16} /> Back to Insights
          </button>

          <div className="flex items-center gap-4 mb-6">
            <span className="text-cyan-400 font-mono text-xs font-bold tracking-widest uppercase border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 rounded-full">
              {post.category}
            </span>
            <span className="flex items-center gap-1.5 text-slate-400 text-sm">
              <Calendar size={14} /> {post.date}
            </span>
            <span className="flex items-center gap-1.5 bg-slate-800/80 text-cyan-400 px-2.5 py-1 rounded-md text-[10px] font-bold tracking-widest uppercase">
              <Clock size={12} /> {post.readTime || calculateReadingTime(post.content)}
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white leading-[1.1] mb-8">
            {post.title}
          </h1>

          <div className="flex items-center justify-between border-y border-slate-800/80 py-6 mb-12">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-cyan-900 flex items-center justify-center text-cyan-400 font-bold font-display border border-cyan-700">
                {post.author.charAt(0)}
              </div>
              <div>
                <p className="text-white font-medium">{post.author}</p>
                <p className="text-slate-500 text-sm">Oakivo Research Group</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <span className="text-xs text-slate-500 font-mono mr-2 hidden sm:inline-block">SHARE:</span>
              <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}`} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:bg-[#0077b5] hover:border-[#0077b5] hover:text-white transition-all" aria-label="Share on LinkedIn">
                <Linkedin size={16} />
              </a>
              <a href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent("Check out this research: " + post.title)}`} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:bg-[#1DA1F2] hover:border-[#1DA1F2] hover:text-white transition-all" aria-label="Share on X (Twitter)">
                <Twitter size={16} />
              </a>
            </div>
          </div>

          {post.coverImage && (
            <div className="w-full h-[400px] md:h-[500px] rounded-3xl overflow-hidden mb-12 shadow-2xl relative group">
              <OptimizedImage 
                src={post.coverImage} 
                alt={post.title}
                className="w-full h-full transform group-hover:scale-105 transition-transform duration-1000"
                fetchPriority="high"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>
            </div>
          )}

          {post.keyTakeaways && post.keyTakeaways.length > 0 && (
            <div className="bg-slate-900/50 border border-cyan-900/30 rounded-2xl p-8 mb-12 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-cyan-500"></div>
              <h3 className="text-xl font-display font-bold text-white mb-6 flex items-center gap-2">
                Executive Takeaways
              </h3>
              <ul className="space-y-4">
                {post.keyTakeaways.map((takeaway, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <ChevronRight className="text-cyan-500 mt-0.5 flex-shrink-0" size={18} />
                    <span className="text-slate-300 leading-relaxed">{takeaway}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="prose prose-invert prose-lg max-w-none prose-headings:font-display prose-headings:font-bold prose-a:text-cyan-400 hover:prose-a:text-cyan-300 prose-img:rounded-2xl">
            <ReactMarkdown>{post.content}</ReactMarkdown>
          </div>

        </div>
      </article>
    </>
  );
};

export default InsightDetail;
