import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'motion/react';
import { Link, useSearchParams } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import SEO from '../components/SEO';
import { insightsData, InsightPost } from '../content/insights';
import OptimizedImage from '../components/OptimizedImage';
import SubscribeNewsletter from '../components/SubscribeNewsletter';
import { db } from '../utils/database';
import {
  Search,
  X,
  ArrowRight,
  BookOpen
} from 'lucide-react';

interface CategoryTab {
  id: string;
  label: string;
  labelFr: string;
  keywords: string[];
}

const CATEGORY_TABS: CategoryTab[] = [
  { id: 'all', label: 'All Briefings', labelFr: 'Toutes les publications', keywords: [] },
  { id: 'erp', label: 'Modern ERP & Automation', labelFr: 'ERP & Automatisation', keywords: ['erp', 'automation', 'quote-to-cash', 'workflow', 'odoo', 'composable'] },
  { id: 'platform', label: 'Platform & Growth', labelFr: 'Plateforme & Croissance', keywords: ['platform', 'growth', 'marketing', 'geo', 'engine', 'conversion'] },
  { id: 'security', label: 'Cloud Security & DevSecOps', labelFr: 'Sécurité Cloud & DevSecOps', keywords: ['security', 'soc 2', 'bill c-26', 'osfi', 'zero-trust', 'ebpf', 'agentic', 'mcp', 'governance'] },
  { id: 'healthcare', label: 'Healthcare & Data Sovereignty', labelFr: 'Santé & Souveraineté', keywords: ['health', 'phipa', 'law 25', 'pipeda', 'sovereignty', 'clinic'] }
];

const calculateReadingTime = (content?: string, fallback?: string): string => {
  if (fallback) return fallback;
  if (!content) return "5 min read";
  const wordsPerMinute = 220;
  const wordCount = content.split(/\s+/).length;
  const minutes = Math.ceil(wordCount / wordsPerMinute);
  return `${minutes} min read`;
};

const Insights: React.FC = () => {
  const { language } = useLanguage();
  const isFr = language === 'fr';
  const [searchParams, setSearchParams] = useSearchParams();
  const [posts, setPosts] = useState<InsightPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const initialCategory = searchParams.get('category') || 'all';
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [searchQuery, setSearchQuery] = useState('');

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

  const handleCategorySelect = (catId: string) => {
    setSelectedCategory(catId);
    if (catId === 'all') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', catId);
    }
    setSearchParams(searchParams);
  };

  // Filtered posts with noise-free matching
  const filteredPosts = useMemo(() => {
    return posts.filter(post => {
      // 1. Category Filter
      if (selectedCategory !== 'all') {
        const activeTab = CATEGORY_TABS.find(t => t.id === selectedCategory);
        if (activeTab && activeTab.keywords.length > 0) {
          const searchable = (
            post.title + ' ' +
            post.category + ' ' +
            post.excerpt + ' ' +
            (post.complianceStandards?.join(' ') || '')
          ).toLowerCase();
          const matchesCategory = activeTab.keywords.some(kw => searchable.includes(kw));
          if (!matchesCategory) return false;
        }
      }

      // 2. Search Query Filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const searchable = (
          post.title + ' ' +
          post.excerpt + ' ' +
          post.category + ' ' +
          (post.complianceStandards?.join(' ') || '') + ' ' +
          (post.author || '')
        ).toLowerCase();
        if (!searchable.includes(q)) return false;
      }

      return true;
    });
  }, [posts, selectedCategory, searchQuery]);

  const resetFilters = () => {
    setSelectedCategory('all');
    setSearchQuery('');
    searchParams.delete('category');
    setSearchParams(searchParams);
  };

  const isDefaultView = selectedCategory === 'all' && !searchQuery.trim();
  const featuredPost = isDefaultView && filteredPosts.length > 0 ? filteredPosts[0] : null;
  const gridPosts = isDefaultView && featuredPost ? filteredPosts.slice(1) : filteredPosts;

  return (
    <>
      <SEO 
        title={isFr 
          ? "Analyses & Rapports Techniques | Oakivo Solutions" 
          : "Engineering Insights & Strategic Briefings | Oakivo Solutions"}
        description={isFr
          ? "Recherche appliquée sur les architectures ERP modernes, l'automatisation des flux, le platform engineering et la souveraineté canadienne des données."
          : "Authoritative engineering briefings on modern headless ERP, autonomous agentic workflows, platform engineering for growth, and Canadian cloud data sovereignty."}
        canonical="/insights"
        keywords="modern ERP architecture, headless ERP, workflow automation, platform engineering, Canadian data sovereignty, SOC 2 Type II, Law 25, PIPEDA, generative engine optimization"
        schema={{
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          name: 'Oakivo Engineering Insights & Strategic Briefings',
          url: 'https://www.oakivo.com/insights',
          description: 'Authoritative research briefings on modern ERP, workflow automation, platform engineering, and cloud data sovereignty.',
          publisher: {
            '@type': 'Organization',
            name: 'Oakivo Solutions Inc.',
            logo: { '@type': 'ImageObject', url: 'https://www.oakivo.com/logo.png' }
          }
        }}
      />

      <div className="bg-[#070A10] min-h-screen text-slate-100 selection:bg-cyan-500 selection:text-slate-950">
        
        <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 pt-28 md:pt-36 pb-24 relative z-10">
          
          {/* Minimalist Editorial Header */}
          <header className="max-w-2xl mb-12">
            <p className="text-xs font-mono font-medium tracking-widest text-cyan-400 uppercase mb-3">
              {isFr ? 'Recherche Appliquée & Perspectives' : 'Applied Research & Perspectives'}
            </p>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white tracking-tight leading-tight mb-4">
              {isFr ? 'Analyses & Rapports Techniques' : 'Engineering Insights & Strategic Briefings'}
            </h1>

            <p className="text-sm sm:text-base text-slate-400 font-light leading-relaxed">
              {isFr
                ? 'Recherche appliquée sur les architectures ERP modernes, l’automatisation des flux, le platform engineering et la souveraineté des données.'
                : 'Authoritative analysis on composable ERP backbones, autonomous agentic workflows, platform growth engineering, and sovereign cloud security.'}
            </p>
          </header>

          {/* Minimalist Filter & Search Bar */}
          <div className="mb-12 space-y-4">
            {/* Top row: Clean search input & count */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" size={15} />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={isFr ? 'Rechercher par sujet ou mot-clé...' : 'Search by topic, keyword, or framework...'}
                  aria-label="Search briefings"
                  className="w-full bg-slate-900/60 border border-white/[0.08] focus:border-cyan-400/60 rounded-xl py-2 pl-9 pr-9 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none transition-colors"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    aria-label="Clear search"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                  >
                    <X size={14} />
                  </button>
                )}
              </div>

              <div className="flex items-center justify-between sm:justify-end gap-3 text-xs font-mono text-slate-500">
                <span>
                  {isFr 
                    ? `${filteredPosts.length} publication${filteredPosts.length > 1 ? 's' : ''}` 
                    : `${filteredPosts.length} briefing${filteredPosts.length !== 1 ? 's' : ''}`}
                </span>

                {(selectedCategory !== 'all' || searchQuery) && (
                  <button
                    onClick={resetFilters}
                    className="text-cyan-400 hover:text-cyan-300 font-medium transition-colors cursor-pointer"
                  >
                    {isFr ? 'Réinitialiser' : 'Reset'}
                  </button>
                )}
              </div>
            </div>

            {/* Quiet Category Selector Tabs (Unboxed, Minimalist Text Buttons) */}
            <div className="flex items-center gap-1 overflow-x-auto pb-1 scrollbar-none border-b border-white/[0.06]">
              {CATEGORY_TABS.map((tab) => {
                const isSelected = selectedCategory === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => handleCategorySelect(tab.id)}
                    className={`px-3 py-2 text-xs font-medium whitespace-nowrap transition-colors border-b-2 -mb-px cursor-pointer ${
                      isSelected
                        ? 'border-cyan-400 text-white font-semibold'
                        : 'border-transparent text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {isFr ? tab.labelFr : tab.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Loading State */}
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex flex-col bg-slate-900/30 rounded-2xl overflow-hidden border border-white/[0.05] animate-pulse">
                  <div className="h-48 bg-slate-800/50" />
                  <div className="p-6 space-y-3">
                    <div className="w-24 h-3 bg-slate-800 rounded" />
                    <div className="w-full h-5 bg-slate-800 rounded" />
                    <div className="w-3/4 h-3 bg-slate-800 rounded mt-2" />
                  </div>
                </div>
              ))}
            </div>
          ) : filteredPosts.length === 0 ? (
            /* Empty State */
            <div className="text-center py-16 bg-slate-900/20 rounded-2xl border border-white/[0.06] space-y-3">
              <BookOpen className="mx-auto h-8 w-8 text-slate-600" />
              <p className="text-base font-medium text-white">
                {isFr ? 'Aucune publication ne correspond à vos critères' : 'No briefings match your search'}
              </p>
              <button
                onClick={resetFilters}
                className="text-xs font-mono text-cyan-400 hover:underline cursor-pointer"
              >
                {isFr ? 'Afficher toutes les publications' : 'View all briefings'}
              </button>
            </div>
          ) : (
            <div className="space-y-12">
              
              {/* Featured Lead Briefing (Clean Minimalist Editorial Layout) */}
              {featuredPost && (
                <article>
                  <Link
                    to={`/insights/${featuredPost.id}`}
                    className="group block bg-slate-900/30 hover:bg-slate-900/50 border border-white/[0.06] hover:border-cyan-500/30 rounded-2xl overflow-hidden transition-all duration-300"
                  >
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
                      
                      {/* Left: Pure Typography Content */}
                      <div className="lg:col-span-7 p-6 sm:p-8 md:p-10 flex flex-col justify-between space-y-4">
                        <div className="space-y-3">
                          {/* Unboxed Metadata (Zero-Pill Discipline) */}
                          <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
                            <span className="text-cyan-400 uppercase tracking-wider">{featuredPost.category}</span>
                            <span aria-hidden="true" className="text-slate-600">·</span>
                            <span>{featuredPost.date}</span>
                            <span aria-hidden="true" className="text-slate-600">·</span>
                            <span>{featuredPost.readTime || calculateReadingTime(featuredPost.content)}</span>
                          </div>

                          <h2 className="text-xl sm:text-2xl lg:text-3xl font-display font-bold text-white group-hover:text-cyan-300 transition-colors leading-snug">
                            {featuredPost.title}
                          </h2>

                          <p className="text-slate-400 text-sm sm:text-base font-light leading-relaxed line-clamp-3">
                            {featuredPost.excerpt}
                          </p>
                        </div>

                        <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between text-xs font-mono">
                          <span className="text-slate-500">{featuredPost.author}</span>
                          <span className="inline-flex items-center gap-1.5 text-cyan-400 group-hover:translate-x-1 transition-transform font-medium">
                            <span>{isFr ? 'Lire l’analyse' : 'Read briefing'}</span>
                            <ArrowRight size={13} />
                          </span>
                        </div>
                      </div>

                      {/* Right: Clean Cover Image */}
                      <div className="lg:col-span-5 relative h-56 sm:h-72 lg:h-auto overflow-hidden bg-slate-950">
                        {featuredPost.coverImage && (
                          <OptimizedImage
                            src={featuredPost.coverImage}
                            alt={featuredPost.title}
                            fetchPriority="high"
                            className="w-full h-full object-cover transform group-hover:scale-102 transition-transform duration-500"
                          />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-[#070A10]/80 via-transparent to-transparent pointer-events-none" />
                      </div>

                    </div>
                  </Link>
                </article>
              )}

              {/* Grid of Remaining Briefings (Clean, Minimalist, Zero-Pill) */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {gridPosts.map((post) => (
                  <article key={post.id} className="flex flex-col">
                    <Link
                      to={`/insights/${post.id}`}
                      className="group flex flex-col h-full bg-slate-900/25 hover:bg-slate-900/50 border border-white/[0.06] hover:border-cyan-500/30 rounded-2xl overflow-hidden transition-all duration-200"
                    >
                      {/* Image */}
                      <div className="h-44 w-full relative overflow-hidden bg-slate-950">
                        {post.coverImage && (
                          <OptimizedImage
                            src={post.coverImage}
                            alt={post.title}
                            fetchPriority="low"
                            className="w-full h-full object-cover transform group-hover:scale-103 transition-transform duration-500"
                          />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#070A10] via-transparent to-transparent opacity-60" />
                      </div>

                      {/* Body */}
                      <div className="p-5 sm:p-6 flex flex-col flex-grow justify-between space-y-3">
                        <div className="space-y-2.5">
                          {/* Unboxed Metadata (Zero-Pill Discipline) */}
                          <div className="flex items-center gap-2 text-[11px] font-mono text-slate-400">
                            <span className="text-cyan-400 uppercase tracking-wider">{post.category}</span>
                            <span aria-hidden="true" className="text-slate-600">·</span>
                            <span>{post.readTime || calculateReadingTime(post.content)}</span>
                          </div>

                          <h3 className="text-base sm:text-lg font-display font-bold text-white group-hover:text-cyan-300 transition-colors line-clamp-2 leading-snug">
                            {post.title}
                          </h3>

                          <p className="text-xs sm:text-sm text-slate-400 font-light line-clamp-2 leading-relaxed">
                            {post.excerpt}
                          </p>
                        </div>

                        {/* Quiet Footer */}
                        <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between text-xs font-mono">
                          <span className="text-slate-500 text-[11px] truncate max-w-[140px]">
                            {post.author}
                          </span>
                          <span className="inline-flex items-center gap-1 text-cyan-400 group-hover:translate-x-1 transition-transform font-medium">
                            <span>{isFr ? 'Lire' : 'Read'}</span>
                            <ArrowRight size={12} />
                          </span>
                        </div>
                      </div>
                    </Link>
                  </article>
                ))}
              </div>

            </div>
          )}

          {/* Understated Minimalist Newsletter Subscription Strip */}
          <div className="mt-16 pt-8 border-t border-white/[0.06]">
            <SubscribeNewsletter />
          </div>

        </div>
      </div>
    </>
  );
};

export default Insights;
