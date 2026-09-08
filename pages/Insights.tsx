import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';
import SEO from '../components/SEO';
import { insightsData, InsightPost } from '../content/insights';
import { BookOpen, Calendar, User, ChevronRight, X, Clock, ArrowRight, Shield } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import OptimizedImage from '../components/OptimizedImage';
import { db } from '../utils/database';

const Insights: React.FC = () => {
  const { t } = useLanguage();
  const [posts, setPosts] = useState<InsightPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedPost, setSelectedPost] = useState<InsightPost | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const firebasePosts = await db.getInsights();
        if (firebasePosts && firebasePosts.length > 0) {
          setPosts(firebasePosts);
        } else {
          setPosts(insightsData);
        }
      } catch (err) {
        console.log("Fallback to static content", err);
        setPosts(insightsData);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPosts();
  }, []);

  const featuredPost = posts.length > 0 ? posts[0] : null;
  const standardPosts = posts.length > 1 ? posts.slice(1) : [];

  // Schema for SEO
  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "Oakivo Security Insights",
    "description": "Expert research and articles on DevSecOps, Cloud Security, and Compliance.",
    "blogPost": posts.map(post => ({
      "@type": "BlogPosting",
      "headline": post.title,
      "datePublished": post.date,
      "author": {
        "@type": "Organization",
        "name": post.author
      }
    }))
  };

  return (
    <>
      <SEO 
        title="Security Insights & Research | Oakivo Solutions"
        description="Deep-dive articles on Zero-Trust, DevSecOps automation, and Canadian data residency compliance (PIPEDA, SOC 2) by Oakivo engineers."
        canonical="/insights"
        schema={blogSchema}
      />

      <section className="pt-32 pb-24 px-6 relative bg-slate-950 min-h-screen">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.02] pointer-events-none"></div>
        
        {/* Glow effect */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[400px] bg-cyan-500/10 blur-[120px] rounded-full pointer-events-none"></div>

        <div className="container mx-auto max-w-7xl relative z-10">
          
          <div className="mb-16 md:mb-24 max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-display font-bold tracking-tight mb-6 text-white leading-tight">
              Engineering <span className="text-cyan-400">Insights</span>
            </h1>
            <p className="text-xl text-slate-400 font-light leading-relaxed">
              Highly researched perspectives on cloud architecture, automated compliance, and the evolving DevSecOps landscape by Oakivo's technical leads.
            </p>
          </div>

          {isLoading ? (
            <div className="flex justify-center py-20">
              <div className="w-8 h-8 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : (
            <>
              {/* Featured Article */}
              {featuredPost && (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-16 group cursor-pointer"
                  onClick={() => setSelectedPost(featuredPost)}
                >
                  <div className="relative rounded-3xl overflow-hidden border border-slate-800/80 bg-slate-900/50 shadow-2xl transition-all duration-500 hover:border-cyan-500/40 hover:shadow-cyan-500/10 flex flex-col md:flex-row">
                    <div className="w-full md:w-1/2 h-[300px] md:h-auto relative overflow-hidden">
                      <div className="absolute inset-0 bg-slate-900/40 mix-blend-multiply z-10"></div>
                      <OptimizedImage 
                        src={featuredPost.coverImage || "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1200"}
                        alt={featuredPost.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute top-6 left-6 z-20">
                        <div className="text-[10px] font-mono font-bold uppercase tracking-widest text-white px-4 py-1.5 bg-black/60 backdrop-blur-md rounded-full border border-white/10 flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></span>
                          Featured Research
                        </div>
                      </div>
                    </div>
                    
                    <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center relative bg-gradient-to-br from-slate-900 to-slate-950">
                      <div className="text-[11px] font-mono font-bold uppercase tracking-widest text-cyan-500 mb-4 inline-block">
                        {featuredPost.category}
                      </div>
                      <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-6 group-hover:text-cyan-400 transition-colors leading-tight">
                        {featuredPost.title}
                      </h2>
                      <p className="text-slate-400 text-lg leading-relaxed mb-8 font-light">
                        {featuredPost.excerpt}
                      </p>
                      
                      <div className="flex items-center gap-6 text-xs font-mono text-slate-500 mt-auto pt-8 border-t border-slate-800">
                        <div className="flex items-center gap-2">
                          <Calendar size={14} />
                          {featuredPost.date}
                        </div>
                        {featuredPost.readTime && (
                          <div className="flex items-center gap-2">
                            <Clock size={14} />
                            {featuredPost.readTime}
                          </div>
                        )}
                        <div className="ml-auto text-cyan-400 flex items-center gap-2 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                          Read Report <ArrowRight size={14} />
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Grid of Articles */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {standardPosts.map((post, index) => (
                  <motion.article 
                    key={post.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-slate-900/30 border border-slate-800/60 rounded-3xl overflow-hidden hover:border-cyan-500/30 hover:bg-slate-900/60 transition-all duration-300 flex flex-col cursor-pointer group shadow-lg"
                    onClick={() => setSelectedPost(post)}
                  >
                    {post.coverImage && (
                      <div className="w-full h-48 relative overflow-hidden border-b border-slate-800/60">
                        <div className="absolute inset-0 bg-slate-900/40 mix-blend-multiply z-10"></div>
                        <OptimizedImage 
                          src={post.coverImage}
                          alt={post.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      </div>
                    )}

                    <div className="p-8 flex-grow flex flex-col">
                      <div className="text-[10px] font-mono font-bold uppercase tracking-widest text-cyan-500 mb-4 inline-block">
                        {post.category}
                      </div>
                      
                      <h2 className="text-xl md:text-2xl font-bold text-slate-100 mb-4 group-hover:text-cyan-400 transition-colors leading-snug">
                        {post.title}
                      </h2>
                      
                      <p className="text-slate-400 text-sm leading-relaxed mb-8 flex-grow font-light line-clamp-3">
                        {post.excerpt}
                      </p>
                      
                      <div className="mt-auto pt-6 border-t border-slate-800/60 flex items-center justify-between text-[11px] text-slate-500 font-mono">
                        <div className="flex items-center gap-4">
                          <span className="flex items-center gap-1.5"><Calendar size={14} /> {post.date}</span>
                        </div>
                        <span className="flex items-center text-cyan-400 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                          Explore <ChevronRight size={14} className="ml-1" />
                        </span>
                      </div>
                    </div>
                  </motion.article>
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {/* Post Modal Overlay */}
      <AnimatePresence>
        {selectedPost && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-6 bg-black/90 backdrop-blur-xl"
            onClick={() => setSelectedPost(null)}
          >
            <motion.div 
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="bg-[#0B0F17] border border-slate-800/60 w-full max-w-4xl max-h-[90vh] rounded-3xl overflow-hidden flex flex-col shadow-2xl"
              onClick={e => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-slate-800/60 bg-slate-900/80">
                <div className="flex items-center gap-3">
                  <Shield size={18} className="text-cyan-500" />
                  <div className="text-[10px] font-mono font-bold uppercase tracking-widest text-cyan-500">
                    Oakivo Security Research
                  </div>
                </div>
                <button 
                  onClick={() => setSelectedPost(null)}
                  className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
              
              {/* Content Body */}
              <div className="p-8 md:p-14 overflow-y-auto no-scrollbar relative">
                <div className="text-[11px] font-mono font-bold uppercase tracking-widest text-cyan-500 mb-6">
                  {selectedPost.category}
                </div>
                
                <h1 className="text-3xl md:text-5xl font-display font-bold tracking-tight mb-8 text-white leading-[1.1]">
                  {selectedPost.title}
                </h1>
                
                <div className="flex flex-wrap items-center gap-6 text-xs text-slate-400 font-mono mb-12 pb-8 border-b border-slate-800/60">
                  <span className="flex items-center gap-2"><User size={14} className="text-cyan-500"/> {selectedPost.author}</span>
                  <span className="flex items-center gap-2"><Calendar size={14} className="text-cyan-500"/> {selectedPost.date}</span>
                  {selectedPost.readTime && (
                    <span className="flex items-center gap-2"><Clock size={14} className="text-cyan-500"/> {selectedPost.readTime}</span>
                  )}
                </div>

                <div className="prose prose-invert prose-cyan max-w-none text-slate-300 leading-loose
                  prose-headings:font-display prose-headings:font-bold prose-headings:text-white prose-headings:tracking-tight
                  prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-6 prose-h2:border-b prose-h2:border-slate-800/60 prose-h2:pb-4
                  prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-4 prose-h3:text-slate-100
                  prose-p:mb-6 prose-p:font-light prose-p:text-lg
                  prose-a:text-cyan-400 hover:prose-a:text-cyan-300 prose-a:underline-offset-4
                  prose-strong:text-white prose-strong:font-bold
                  prose-code:text-cyan-300 prose-code:bg-cyan-500/10 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-code:font-mono prose-code:text-sm">
                  <ReactMarkdown>{selectedPost.content}</ReactMarkdown>
                </div>
                
                <div className="mt-16 pt-8 border-t border-slate-800/60 text-center">
                  <p className="text-slate-500 font-mono text-xs">END OF REPORT</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Insights;
