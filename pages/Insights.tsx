import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';
import SEO from '../components/SEO';
import { insightsData, InsightPost } from '../content/insights';
import { BookOpen, Calendar, User, ChevronRight, X, Clock, ArrowRight, Shield, Search, Share2, Twitter, Linkedin } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import OptimizedImage from '../components/OptimizedImage';
import { db } from '../utils/database';

const Insights: React.FC = () => {
  const { t } = useLanguage();
  const [posts, setPosts] = useState<InsightPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedPost, setSelectedPost] = useState<InsightPost | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [scrollProgress, setScrollProgress] = useState(0);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    const progress = (scrollTop / (scrollHeight - clientHeight)) * 100;
    setScrollProgress(progress);
  };
  
  // Reset scroll progress when post changes
  useEffect(() => {
    if (selectedPost) {
      setScrollProgress(0);
    }
  }, [selectedPost]);

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

  const filteredPosts = posts.filter(post => 
    searchQuery === '' ||
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.content.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const featuredPost = (filteredPosts.length > 0 && !searchQuery) ? filteredPosts[0] : null;
  const standardPosts = (filteredPosts.length > 1 && !searchQuery) ? filteredPosts.slice(1) : (searchQuery ? filteredPosts : []);

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
        title="Engineering Research & Insights | Oakivo Solutions"
        description="Authoritative research on Zero-Trust Architecture, Kubernetes Posture Management, and DevSecOps automation by Oakivo's cloud security architects."
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
            
            <p className="text-xl text-slate-400 font-light leading-relaxed mb-8">
              Highly researched perspectives on cloud architecture, automated compliance, and the evolving DevSecOps landscape by Oakivo's technical leads.
            </p>
            <div className="relative max-w-xl mb-8">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search size={18} className="text-slate-500" />
              </div>
              <input
                type="text"
                placeholder="Search topics, keywords, or architectures..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-900/50 border border-slate-800/80 text-white rounded-2xl pl-12 pr-4 py-4 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all font-light placeholder:text-slate-500 shadow-inner"
              />
            </div>

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
                  tabIndex={0}
                  role="button"
                  aria-label={`Read featured article: ${featuredPost.title}`}
                  onKeyDown={(e) => { if (e.key === 'Enter') setSelectedPost(featuredPost); }}
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
                    tabIndex={0}
                    role="button"
                    aria-label={`Read article: ${post.title}`}
                    onKeyDown={(e) => { if (e.key === 'Enter') setSelectedPost(post); }}
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
              className="bg-[#0B0F17] border border-slate-800/60 w-full max-w-4xl max-h-[90vh] rounded-3xl overflow-hidden flex flex-col shadow-2xl relative"
              onClick={e => e.stopPropagation()}
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-title"
            >
              {/* Reading Progress Bar */}
              <div className="w-full h-1 bg-slate-800 z-50">
                <div 
                  className="h-full bg-cyan-500 transition-all duration-150 ease-out"
                  style={{ width: `${scrollProgress}%` }}
                ></div>
              </div>
              
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
                  aria-label="Close insight article"
                >
                  <X size={20} />
                </button>
              </div>
              
              {/* Content Body */}
              <div className="p-8 md:p-14 overflow-y-auto no-scrollbar relative" onScroll={handleScroll}>
                <div className="text-[11px] font-mono font-bold uppercase tracking-widest text-cyan-500 mb-6">
                  {selectedPost.category}
                </div>
                
                <h1 id="modal-title" className="text-3xl md:text-5xl font-display font-bold tracking-tight mb-8 text-white leading-[1.1]">
                  {selectedPost.title}
                </h1>
                
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12 pb-8 border-b border-slate-800/60">
                  <div className="flex flex-wrap items-center gap-6 text-xs text-slate-400 font-mono">
                    <span className="flex items-center gap-2"><User size={14} className="text-cyan-500"/> {selectedPost.author}</span>
                    <span className="flex items-center gap-2"><Calendar size={14} className="text-cyan-500"/> {selectedPost.date}</span>
                    {selectedPost.readTime && (
                      <span className="flex items-center gap-2"><Clock size={14} className="text-cyan-500"/> {selectedPost.readTime}</span>
                    )}
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-slate-500 font-mono mr-2">SHARE:</span>
                    <a href={`https://www.linkedin.com/sharing/share-offsite/?url=https://www.oakivo.com/insights`} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-[#0077b5] hover:text-white transition-colors" aria-label="Share on LinkedIn">
                      <Linkedin size={14} />
                    </a>
                    <a href={`https://twitter.com/intent/tweet?url=https://www.oakivo.com/insights&text=Check out this research: ${selectedPost.title}`} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-[#1DA1F2] hover:text-white transition-colors" aria-label="Share on X (Twitter)">
                      <Twitter size={14} />
                    </a>
                  </div>
                </div>

                
                {selectedPost.keyTakeaways && selectedPost.keyTakeaways.length > 0 && (
                  <div className="mb-12 bg-slate-900/50 border-l-4 border-cyan-500 rounded-r-2xl p-8" aria-label="Key Takeaways">
                    <h2 className="text-xl font-display font-bold text-white mb-6 uppercase tracking-wider text-sm">Key Takeaways</h2>
                    <ul className="space-y-4">
                      {selectedPost.keyTakeaways.map((takeaway, idx) => (
                        <li key={idx} className="flex items-start gap-4 text-slate-300 font-light leading-relaxed">
                          <span className="text-cyan-500 mt-1.5 opacity-60">•</span>
                          <span>{takeaway}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                
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
                
                <div className="mt-16 pt-8 border-t border-slate-800/60 text-center mb-12">
                  <p className="text-slate-500 font-mono text-xs">END OF REPORT</p>
                </div>
                
                <div className="pt-8 border-t border-slate-800/60">
                  <h3 className="text-xl font-display font-bold text-white mb-6">Related Research</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {posts.filter(p => p.id !== selectedPost.id).slice(0, 2).map((relatedPost) => (
                      <div 
                        key={relatedPost.id}
                        onClick={(e) => { e.stopPropagation(); setSelectedPost(relatedPost); }}
                        className="bg-slate-900/40 border border-slate-800/60 p-6 rounded-2xl cursor-pointer hover:border-cyan-500/30 hover:bg-slate-900/80 transition-all group flex flex-col h-full"
                        tabIndex={0}
                        role="button"
                        aria-label={`Read related article: ${relatedPost.title}`}
                        onKeyDown={(e) => { if (e.key === 'Enter') { e.stopPropagation(); setSelectedPost(relatedPost); } }}
                      >
                        <div className="text-[10px] font-mono text-cyan-500 mb-3 uppercase tracking-wider">{relatedPost.category}</div>
                        <h4 className="text-slate-100 font-bold leading-snug mb-3 group-hover:text-cyan-400 transition-colors flex-grow">{relatedPost.title}</h4>
                        <div className="flex items-center gap-2 text-xs text-slate-500 font-mono mt-auto pt-4">
                          <Clock size={12} /> {relatedPost.readTime}
                        </div>
                      </div>
                    ))}
                  </div>
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
