import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Link, useSearchParams } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import SEO from '../components/SEO';
import { insightsData, InsightPost } from '../content/insights';
import { BookOpen, Calendar, ChevronRight, Clock, ArrowRight, Shield, Search, Sparkles, Layers, Building2, TrendingUp } from 'lucide-react';
import OptimizedImage from '../components/OptimizedImage';
import { db } from '../utils/database';
import IndustryInsightsExplorer from '../components/IndustryInsightsExplorer';
import { IndustryId } from '../content/industryInsights';

const calculateReadingTime = (content: string): string => {
  if (!content) return "5 min read";
  const wordsPerMinute = 238;
  const wordCount = content.split(/\s+/).length;
  const minutes = Math.ceil(wordCount / wordsPerMinute);
  return `${minutes} MIN READ`;
};

const Insights: React.FC = () => {
  const { language, t } = useLanguage();
  const [searchParams] = useSearchParams();
  const [posts, setPosts] = useState<InsightPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'industry' | 'archive'>('industry');

  const industryParam = (searchParams.get('industry') as IndustryId) || 'all';

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
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const featuredPost = filteredPosts.length > 0 ? filteredPosts[0] : null;
  const regularPosts = filteredPosts.slice(1);

  return (
    <>
      <SEO 
        title="Engineering Insights & Industry Security Case Studies | Oakivo"
        description="Explore technical insights categorized by industry (Healthcare, Retail, Logistics, FinTech, Critical Infrastructure) and discover verified client case studies."
      />
      <section className="pt-32 md:pt-40 pb-24 px-4 md:px-6 relative bg-slate-950 min-h-screen flex flex-col items-center">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[400px] bg-cyan-500/10 blur-[120px] rounded-full pointer-events-none"></div>
        
        <div className="container mx-auto max-w-7xl relative z-10 w-full">
          {/* Header section */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-10">
            <div className="max-w-3xl">
              <div className="mb-4 inline-flex items-center gap-2 text-xs font-mono font-bold tracking-widest text-cyan-400 uppercase bg-cyan-500/10 px-4 py-2 rounded-full border border-cyan-500/20">
                <Shield size={14} /> {language === 'fr' ? 'Recherche & Conformité Sectorielle' : 'Research & Sector Intelligence'}
              </div>
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-4 leading-tight">
                Security <span className="text-cyan-400">Insights</span> & Case Studies
              </h1>
              <p className="text-base md:text-lg text-slate-400 font-light leading-relaxed">
                {language === 'fr'
                  ? 'Recherche appliquée sur le Zero-Trust, la souveraineté des données canadiennes et l\'automatisation de la conformité, organisée par industrie avec études de cas client réelles.'
                  : 'Applied research on Zero-Trust Architecture, Canadian data sovereignty, and compliance automation, categorized by industry with verified production client case studies.'}
              </p>
            </div>

            {/* View Mode Switcher */}
            <div className="flex items-center gap-2 bg-slate-900/90 border border-slate-800 p-1.5 rounded-2xl flex-shrink-0 self-start md:self-auto">
              <button
                onClick={() => setActiveTab('industry')}
                className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-mono font-bold transition-all ${
                  activeTab === 'industry'
                    ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <Building2 size={15} />
                <span>{language === 'fr' ? 'Par Industrie & Cas Clients' : 'By Industry & Case Studies'}</span>
                <span className={`px-1.5 py-0.2 rounded-full text-[9px] ${
                  activeTab === 'industry' ? 'bg-slate-950/20 text-slate-950' : 'bg-cyan-500/20 text-cyan-400'
                }`}>
                  PRO
                </span>
              </button>

              <button
                onClick={() => setActiveTab('archive')}
                className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-mono font-bold transition-all ${
                  activeTab === 'archive'
                    ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <Layers size={15} />
                <span>{language === 'fr' ? 'Archive Complète' : 'All Reports'}</span>
              </button>
            </div>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map(i => (
                <div key={i} className="flex flex-col bg-slate-900/40 rounded-3xl overflow-hidden border border-slate-800/60 animate-pulse">
                  <div className="h-56 bg-slate-800"></div>
                  <div className="p-8 flex flex-col flex-grow">
                    <div className="w-24 h-4 bg-slate-800 rounded mb-4"></div>
                    <div className="w-full h-6 bg-slate-800 rounded mb-2"></div>
                    <div className="w-4/5 h-6 bg-slate-800 rounded mb-6"></div>
                    <div className="space-y-2 mb-8 flex-grow">
                      <div className="w-full h-3 bg-slate-800 rounded"></div>
                      <div className="w-full h-3 bg-slate-800 rounded"></div>
                      <div className="w-2/3 h-3 bg-slate-800 rounded"></div>
                    </div>
                    <div className="w-32 h-4 bg-slate-800 rounded"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : activeTab === 'industry' ? (
            /* PRIMARY VIEW: Industry Insights Explorer */
            <IndustryInsightsExplorer posts={posts} initialIndustry={industryParam} />
          ) : (
            /* SECONDARY VIEW: Chronological Archive & Featured Post */
            <div className="space-y-12">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
                <div>
                  <h3 className="text-2xl font-display font-bold text-white">
                    {language === 'fr' ? 'Archive Chronologique des Rapports' : 'Chronological Technical Reports'}
                  </h3>
                  <p className="text-sm text-slate-400">
                    {language === 'fr' ? 'Tous les articles classés par date de publication.' : 'All research papers and implementation blueprints.'}
                  </p>
                </div>

                <div className="relative w-full md:w-72">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
                  <input 
                    type="text" 
                    placeholder="Search titles, keywords..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl py-2.5 pl-10 pr-4 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors text-xs font-light"
                  />
                </div>
              </div>

              {filteredPosts.length === 0 ? (
                <div className="text-center py-24 bg-slate-900/30 rounded-3xl border border-slate-800 border-dashed">
                  <BookOpen className="mx-auto h-12 w-12 text-slate-600 mb-4" />
                  <h3 className="text-xl font-display font-medium text-white mb-2">No insights found</h3>
                  <p className="text-slate-400">Adjust your search query to explore our research.</p>
                </div>
              ) : (
                <>
                  {featuredPost && (
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="group"
                    >
                      <Link to={`/insights/${featuredPost.id}`} className="block relative rounded-3xl overflow-hidden bg-slate-900/50 border border-slate-800/80 hover:border-cyan-500/50 transition-colors">
                        <div className="grid grid-cols-1 lg:grid-cols-2">
                          <div className="p-8 lg:p-16 flex flex-col justify-center">
                            <div className="flex items-center gap-3 mb-6">
                              <span className="text-cyan-400 font-mono text-xs font-bold tracking-widest uppercase border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 rounded-full">
                                {featuredPost.category}
                              </span>
                              <span className="text-slate-400 text-sm flex items-center gap-1.5"><Calendar size={14} /> {featuredPost.date}</span>
                            </div>
                            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-6 group-hover:text-cyan-400 transition-colors leading-tight">
                              {featuredPost.title}
                            </h2>
                            <p className="text-lg text-slate-400 font-light leading-relaxed mb-8">
                              {featuredPost.excerpt}
                            </p>
                            <div className="flex items-center justify-between mt-auto pt-8 border-t border-slate-800/80">
                              <div className="flex items-center gap-1.5 bg-slate-800/80 text-cyan-400 px-3 py-1.5 rounded-md text-[10px] font-bold tracking-widest uppercase">
                                <Clock size={12} />
                                {featuredPost.readTime || calculateReadingTime(featuredPost.content)}
                              </div>
                              <div className="text-cyan-400 flex items-center gap-2 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 font-mono text-sm tracking-wider font-bold">
                                READ REPORT <ArrowRight size={16} />
                              </div>
                            </div>
                          </div>
                          <div className="h-64 lg:h-auto w-full relative overflow-hidden">
                            {featuredPost.coverImage ? (
                              <OptimizedImage 
                                src={featuredPost.coverImage} 
                                alt={featuredPost.title}
                                className="w-full h-full transform group-hover:scale-105 transition-transform duration-1000"
                                fetchPriority="high"
                              />
                            ) : (
                              <div className="w-full h-full bg-slate-800 flex items-center justify-center">
                                <BookOpen size={48} className="text-slate-700" />
                              </div>
                            )}
                            <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-slate-900/90 via-transparent to-transparent"></div>
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {regularPosts.map((post, idx) => (
                      <motion.div 
                        key={post.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                      >
                        <Link to={`/insights/${post.id}`} className="block h-full bg-slate-900/50 border border-slate-800/80 rounded-3xl overflow-hidden hover:border-cyan-500/50 transition-all group flex flex-col">
                          <div className="h-48 w-full relative overflow-hidden">
                            {post.coverImage ? (
                              <OptimizedImage 
                                src={post.coverImage} 
                                alt={post.title}
                                className="w-full h-full transform group-hover:scale-105 transition-transform duration-700"
                                fetchPriority="low"
                              />
                            ) : (
                              <div className="w-full h-full bg-slate-800 flex items-center justify-center">
                                <BookOpen size={32} className="text-slate-700" />
                              </div>
                            )}
                            <div className="absolute top-4 left-4">
                              <span className="text-white font-mono text-[10px] font-bold tracking-widest uppercase bg-slate-900/80 backdrop-blur-md px-2.5 py-1 rounded-md border border-slate-700">
                                {post.category}
                              </span>
                            </div>
                          </div>
                          
                          <div className="p-8 flex flex-col flex-grow">
                            <h3 className="text-xl font-display font-bold text-white mb-4 group-hover:text-cyan-400 transition-colors line-clamp-2">
                              {post.title}
                            </h3>
                            <p className="text-slate-400 font-light text-sm mb-6 line-clamp-3">
                              {post.excerpt}
                            </p>
                            
                            <div className="mt-auto pt-6 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono text-slate-500">
                              <span className="flex items-center gap-1.5"><Calendar size={14} /> {post.date}</span>
                              <span className="flex items-center gap-1.5 bg-slate-800/80 text-cyan-400 px-2 py-0.5 rounded-md text-[9px] font-bold tracking-widest uppercase">
                                <Clock size={10} /> {post.readTime || calculateReadingTime(post.content)}
                              </span>
                            </div>
                          </div>
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Insights;
