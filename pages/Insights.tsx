import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link, useSearchParams } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import SEO from '../components/SEO';
import { insightsData, InsightPost } from '../content/insights';
import { INDUSTRIES_CONFIG, IndustryId, IndustrySecurityProfile } from '../content/industryInsights';
import { caseStudiesData, CaseStudyItem } from './CaseStudies';
import OptimizedImage from '../components/OptimizedImage';
import SubscribeNewsletter from '../components/SubscribeNewsletter';
import { db } from '../utils/database';
import {
  Search,
  X,
  Shield,
  Calendar,
  Clock,
  ArrowRight,
  ArrowUpRight,
  Layers,
  HeartPulse,
  ShoppingBag,
  Truck,
  Landmark,
  ShieldCheck,
  CheckCircle2,
  BookOpen,
  Sparkles,
  ChevronRight
} from 'lucide-react';

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
  const [searchParams, setSearchParams] = useSearchParams();
  const [posts, setPosts] = useState<InsightPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // URL-driven or local industry filter
  const initialIndustry = (searchParams.get('industry') as IndustryId) || 'all';
  const [selectedIndustry, setSelectedIndustry] = useState<IndustryId>(initialIndustry);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTag, setActiveTag] = useState<string | null>(null);

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

  // Sync state if URL query changes
  useEffect(() => {
    const urlInd = (searchParams.get('industry') as IndustryId) || 'all';
    setSelectedIndustry(urlInd);
  }, [searchParams]);

  const handleIndustrySelect = (id: IndustryId) => {
    setSelectedIndustry(id);
    if (id === 'all') {
      searchParams.delete('industry');
      setSearchParams(searchParams);
    } else {
      setSearchParams({ industry: id });
    }
  };

  // Sector tabs configuration
  const sectorTabs = [
    { id: 'all' as IndustryId, label: 'All Sectors', labelFr: 'Tous les Secteurs', icon: Layers },
    { id: 'healthcare' as IndustryId, label: 'Healthcare & Life Sciences', labelFr: 'Santé & Sciences', icon: HeartPulse },
    { id: 'retail' as IndustryId, label: 'Retail & E-Commerce', labelFr: 'Commerce & Retail', icon: ShoppingBag },
    { id: 'logistics' as IndustryId, label: 'Logistics & Supply Chain', labelFr: 'Logistique & Transport', icon: Truck },
    { id: 'fintech' as IndustryId, label: 'Financial & FinTech', labelFr: 'Finance & FinTech', icon: Landmark },
    { id: 'infrastructure' as IndustryId, label: 'Critical Infrastructure', labelFr: 'Infrastructures Critiques', icon: ShieldCheck }
  ];

  // Map each post to its industry profile
  const enrichedPosts = useMemo(() => {
    return posts.map(post => {
      let detectedIndustry: IndustryId = post.industry || 'infrastructure';
      if (!post.industry) {
        const found = Object.entries(INDUSTRIES_CONFIG).find(([_, profile]) =>
          profile.articleIds.includes(post.id)
        );
        if (found) {
          detectedIndustry = found[0] as IndustryId;
        } else {
          const text = (post.title + ' ' + post.excerpt + ' ' + post.category).toLowerCase();
          if (text.includes('health') || text.includes('phi') || text.includes('pipeda') || text.includes('patient')) {
            detectedIndustry = 'healthcare';
          } else if (text.includes('retail') || text.includes('pos') || text.includes('checkout') || text.includes('pci')) {
            detectedIndustry = 'retail';
          } else if (text.includes('logistics') || text.includes('supply chain') || text.includes('shipping') || text.includes('fleet')) {
            detectedIndustry = 'logistics';
          } else if (text.includes('soc 2') || text.includes('fintech') || text.includes('banking') || text.includes('crypto')) {
            detectedIndustry = 'fintech';
          } else {
            detectedIndustry = 'infrastructure';
          }
        }
      }

      const industryConfig = detectedIndustry !== 'all' ? INDUSTRIES_CONFIG[detectedIndustry] : null;
      return {
        ...post,
        detectedIndustry,
        industryConfig,
        matchedCaseStudyId: post.relatedCaseStudyId || industryConfig?.matchedCaseStudyId || 'atlantic-seafood-logistics'
      };
    });
  }, [posts]);

  // Counts per sector
  const sectorCounts = useMemo(() => {
    const counts: Record<string, number> = { all: enrichedPosts.length };
    sectorTabs.forEach(tab => {
      if (tab.id !== 'all') {
        counts[tab.id] = enrichedPosts.filter(p => p.detectedIndustry === tab.id).length;
      }
    });
    return counts;
  }, [enrichedPosts]);

  // Quick topics for fast filtering
  const quickTopics = [
    'Zero-Trust',
    'Bill C-26',
    'SOC 2',
    'PIPEDA & Law 25',
    'PCI-DSS 4.0',
    'eBPF Kernel',
    'AI Agents'
  ];

  // Filtering logic
  const filteredPosts = useMemo(() => {
    return enrichedPosts.filter(post => {
      // 1. Sector match
      if (selectedIndustry !== 'all' && post.detectedIndustry !== selectedIndustry) {
        return false;
      }

      // 2. Search query match
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = post.title.toLowerCase().includes(q);
        const matchesExcerpt = post.excerpt.toLowerCase().includes(q);
        const matchesCategory = post.category.toLowerCase().includes(q);
        const matchesAuthor = post.author.toLowerCase().includes(q);
        const matchesStandards = post.complianceStandards?.some(s => s.toLowerCase().includes(q));
        const matchesRegulations = post.industryConfig?.keyRegulations.some(r => r.toLowerCase().includes(q));
        const matchesContent = post.content?.toLowerCase().includes(q);

        if (!matchesTitle && !matchesExcerpt && !matchesCategory && !matchesAuthor && !matchesStandards && !matchesRegulations && !matchesContent) {
          return false;
        }
      }

      // 3. Quick Tag match
      if (activeTag) {
        const t = activeTag.toLowerCase();
        const inTitle = post.title.toLowerCase().includes(t);
        const inExcerpt = post.excerpt.toLowerCase().includes(t);
        const inCategory = post.category.toLowerCase().includes(t);
        const inStandards = post.complianceStandards?.some(s => s.toLowerCase().includes(t));
        const inContent = post.content?.toLowerCase().includes(t);
        if (!inTitle && !inExcerpt && !inCategory && !inStandards && !inContent) {
          return false;
        }
      }

      return true;
    });
  }, [enrichedPosts, selectedIndustry, searchQuery, activeTag]);

  // Active sector profile & matched case study
  const activeSectorProfile: IndustrySecurityProfile | null =
    selectedIndustry !== 'all' ? INDUSTRIES_CONFIG[selectedIndustry] : null;

  const matchedCaseStudy: CaseStudyItem | undefined = useMemo(() => {
    if (!activeSectorProfile) return undefined;
    return caseStudiesData.find(cs => cs.id === activeSectorProfile.matchedCaseStudyId) || caseStudiesData[0];
  }, [activeSectorProfile]);

  // Featured lead post (only displayed when on 'all' with no search text to avoid layout confusion)
  const isDefaultView = selectedIndustry === 'all' && !searchQuery.trim() && !activeTag;
  const featuredPost = isDefaultView && filteredPosts.length > 0 ? filteredPosts[0] : null;
  const gridPosts = isDefaultView && featuredPost ? filteredPosts.slice(1) : filteredPosts;

  const resetFilters = () => {
    setSelectedIndustry('all');
    setSearchQuery('');
    setActiveTag(null);
    searchParams.delete('industry');
    setSearchParams(searchParams);
  };

  return (
    <>
      <SEO 
        title={language === 'fr' 
          ? "Analyses & Rapports de Sécurité Cloud | Oakivo Solutions" 
          : "Engineering Insights & DevSecOps Intelligence | Oakivo Solutions"}
        description={language === 'fr'
          ? "Recherches appliquées sur le Zero-Trust, la souveraineté canadienne (Bill C-26, Loi 25, PIPEDA) et l'automatisation de conformité avec études de cas réelles."
          : "Explore technical briefings on Canadian data sovereignty (Bill C-26, PIPEDA, Law 25), zero-trust cloud architecture, autonomous AI security, and production case studies."}
        canonical="/insights"
        keywords="SOC 2 Type II audit readiness checklist Canada, Bill C-26 Critical Cyber Systems compliance roadmap, PIPEDA vs. HIPAA cloud storage architecture, Terraform AWS EKS hardening consultant Calgary / Toronto / Halifax, DevSecOps Moncton, Cloud Security New Brunswick, Canadian cloud compliance"
        schema={{
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          name: 'Oakivo Engineering Insights & Security Intelligence',
          url: 'https://www.oakivo.com/insights',
          description: 'Technical whitepapers, cloud compliance frameworks, and verified DevSecOps architectures for Canadian enterprises.',
          publisher: {
            '@type': 'Organization',
            name: 'Oakivo Solutions Inc.',
            logo: { '@type': 'ImageObject', url: 'https://www.oakivo.com/logo.png' }
          }
        }}
      />

      <div className="bg-slate-950 min-h-screen text-slate-100 selection:bg-cyan-500 selection:text-slate-950">
        
        {/* Subtle Ambient Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-[450px] bg-cyan-500/10 blur-[130px] rounded-full pointer-events-none" />

        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-32 md:pt-40 pb-24 relative z-10">
          
          {/* Header Section */}
          <header className="max-w-3xl mb-12">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-mono font-bold tracking-widest uppercase mb-4">
              <Shield size={14} />
              <span>{language === 'fr' ? 'Recherche & Veille Sectorielle' : 'Research & Sector Intelligence'}</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white tracking-tight leading-[1.1] mb-5">
              {language === 'fr' ? (
                <>Analyses de <span className="text-cyan-400">Sécurité</span> & Études de Cas</>
              ) : (
                <>Security <span className="text-cyan-400">Insights</span> & Case Studies</>
              )}
            </h1>

            <p className="text-base sm:text-lg text-slate-400 font-light leading-relaxed">
              {language === 'fr'
                ? 'Recherche appliquée sur le Zero-Trust, la souveraineté des données canadiennes (Bill C-26, Loi 25, PIPEDA) et l\'ingénierie DevSecOps, accompagnée de déploiements clients vérifiés.'
                : 'Applied research on Zero-Trust Architecture, Canadian data sovereignty (Bill C-26, PIPEDA, Law 25), and autonomous AI defense, paired with verified production client case studies.'}
            </p>
          </header>

          {/* Unified Filter & Search Control Bar */}
          <section aria-label="Filter insights" className="bg-slate-900/60 backdrop-blur-xl border border-slate-800/80 rounded-2xl md:rounded-3xl p-5 md:p-6 mb-12 shadow-xl">
            
            {/* Search Input & Total Matches Counter */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-slate-800">
              <div className="relative flex-grow max-w-xl">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={16} />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={language === 'fr' 
                    ? 'Rechercher par titre, norme (SOC 2, Loi 25), mot-clé...' 
                    : 'Search by topic, framework (SOC 2, Law 25, Bill C-26), keyword...'}
                  aria-label="Search insights"
                  className="w-full bg-slate-950/90 border border-slate-700/70 rounded-xl py-2.5 pl-10 pr-10 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-colors"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    aria-label="Clear search input"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                  >
                    <X size={15} />
                  </button>
                )}
              </div>

              {/* Status and Active Count */}
              <div className="flex items-center justify-between md:justify-end gap-3 text-xs font-mono text-slate-400">
                <span>
                  {language === 'fr' 
                    ? `${filteredPosts.length} publication${filteredPosts.length > 1 ? 's' : ''}` 
                    : `Showing ${filteredPosts.length} report${filteredPosts.length !== 1 ? 's' : ''}`}
                </span>

                {(selectedIndustry !== 'all' || searchQuery || activeTag) && (
                  <button
                    onClick={resetFilters}
                    className="text-cyan-400 hover:text-cyan-300 font-bold hover:underline transition-colors cursor-pointer"
                  >
                    {language === 'fr' ? 'Réinitialiser' : 'Reset filters'}
                  </button>
                )}
              </div>
            </div>

            {/* Sector Tabs Bar */}
            <div className="pt-4 space-y-3">
              <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
                {sectorTabs.map((tab) => {
                  const Icon = tab.icon;
                  const isSelected = selectedIndustry === tab.id;
                  const count = sectorCounts[tab.id] || 0;

                  return (
                    <button
                      key={tab.id}
                      onClick={() => handleIndustrySelect(tab.id)}
                      className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-mono font-medium whitespace-nowrap transition-all border cursor-pointer ${
                        isSelected
                          ? 'bg-cyan-500 text-slate-950 border-cyan-400 font-bold shadow-md shadow-cyan-500/20'
                          : 'bg-slate-950/60 text-slate-300 border-slate-800 hover:bg-slate-800/80 hover:text-white hover:border-slate-700'
                      }`}
                    >
                      <Icon size={14} className={isSelected ? 'text-slate-950' : 'text-cyan-400'} />
                      <span>{language === 'fr' ? tab.labelFr : tab.label}</span>
                      <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                        isSelected ? 'bg-slate-950/20 text-slate-950 font-bold' : 'bg-slate-800 text-slate-400'
                      }`}>
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Quick Topic Pills */}
              <div className="flex flex-wrap items-center gap-1.5 pt-1">
                <span className="text-[11px] font-mono text-slate-500 uppercase tracking-wider mr-1">
                  {language === 'fr' ? 'Sujets :' : 'Topics:'}
                </span>
                {quickTopics.map((topic) => {
                  const isActive = activeTag === topic;
                  return (
                    <button
                      key={topic}
                      onClick={() => setActiveTag(isActive ? null : topic)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-mono transition-colors border cursor-pointer ${
                        isActive
                          ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400/40 font-bold'
                          : 'bg-slate-950/40 text-slate-400 border-slate-800/80 hover:text-white hover:border-slate-700'
                      }`}
                    >
                      #{topic}
                    </button>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Sector Overview Spotlight Card (Rendered only when a specific sector is filtered) */}
          <AnimatePresence mode="wait">
            {activeSectorProfile && matchedCaseStudy && (
              <motion.div
                key={activeSectorProfile.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.25 }}
                className="mb-12 rounded-3xl bg-gradient-to-br from-slate-900/90 to-slate-950/90 border border-cyan-500/30 p-6 md:p-8 shadow-2xl relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

                <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                  {/* Left Column: Sector context */}
                  <div className="lg:col-span-7 space-y-4">
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono font-bold uppercase tracking-wider">
                        {activeSectorProfile.badge}
                      </span>
                      <span className="text-xs font-mono text-slate-400">
                        {language === 'fr' ? 'Architecture Recommandée' : 'Target Architecture'}
                      </span>
                    </div>

                    <h2 className="text-2xl md:text-3xl font-display font-bold text-white">
                      {language === 'fr' ? activeSectorProfile.nameFr : activeSectorProfile.name}
                    </h2>

                    <p className="text-sm text-slate-300 font-light leading-relaxed">
                      {language === 'fr' ? activeSectorProfile.descriptionFr : activeSectorProfile.description}
                    </p>

                    {/* Key Regulations */}
                    <div className="flex flex-wrap items-center gap-2 pt-1">
                      <span className="text-xs font-mono text-slate-500 uppercase">
                        {language === 'fr' ? 'Cadres Réglementaires :' : 'Compliance Mandates:'}
                      </span>
                      {activeSectorProfile.keyRegulations.map((reg, rIdx) => (
                        <span key={rIdx} className="px-2.5 py-0.5 rounded-md bg-slate-950 border border-slate-800 text-slate-300 text-xs font-mono">
                          {reg}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Right Column: Linked Production Case Study */}
                  <div className="lg:col-span-5 bg-slate-950/80 border border-slate-800 rounded-2xl p-5 space-y-4">
                    <div className="flex items-center justify-between text-xs font-mono text-cyan-400">
                      <span className="flex items-center gap-1.5 font-bold uppercase tracking-wider">
                        <Sparkles size={13} />
                        {language === 'fr' ? 'Étude de Cas Déployée' : 'Verified Case Study'}
                      </span>
                      <span className="text-slate-500">{matchedCaseStudy.location}</span>
                    </div>

                    <h3 className="text-base font-bold text-white leading-snug">
                      {matchedCaseStudy.title}
                    </h3>

                    {/* Results metrics */}
                    <div className="grid grid-cols-3 gap-2">
                      {matchedCaseStudy.results.map((res, mIdx) => (
                        <div key={mIdx} className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-center">
                          <span className="text-sm md:text-base font-extrabold font-mono text-white block">
                            {res.metric}
                          </span>
                          <span className="text-[10px] font-mono text-slate-400 mt-0.5 block truncate">
                            {res.label}
                          </span>
                        </div>
                      ))}
                    </div>

                    <Link
                      to={`/case-studies#${matchedCaseStudy.id}`}
                      className="inline-flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 text-xs font-mono font-medium transition-all group cursor-pointer"
                    >
                      <span>{language === 'fr' ? 'Consulter l’étude complète' : 'View Full Case Study'}</span>
                      <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Loading Skeleton */}
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="flex flex-col bg-slate-900/40 rounded-3xl overflow-hidden border border-slate-800/60 animate-pulse">
                  <div className="h-52 bg-slate-800" />
                  <div className="p-7 space-y-4 flex-grow">
                    <div className="w-24 h-4 bg-slate-800 rounded" />
                    <div className="w-full h-6 bg-slate-800 rounded" />
                    <div className="w-3/4 h-6 bg-slate-800 rounded" />
                    <div className="w-full h-3 bg-slate-800 rounded mt-4" />
                    <div className="w-4/5 h-3 bg-slate-800 rounded" />
                  </div>
                </div>
              ))}
            </div>
          ) : filteredPosts.length === 0 ? (
            /* Empty State */
            <div className="text-center py-20 bg-slate-900/40 rounded-3xl border border-slate-800 border-dashed space-y-4">
              <BookOpen className="mx-auto h-12 w-12 text-slate-600" />
              <h2 className="text-xl font-display font-medium text-white">
                {language === 'fr' ? 'Aucun rapport technique trouvé' : 'No technical reports matched your filter'}
              </h2>
              <p className="text-slate-400 text-sm max-w-md mx-auto font-light">
                {language === 'fr'
                  ? 'Essayez de modifier votre requête de recherche ou réinitialisez les filtres pour explorer nos publications.'
                  : 'Try adjusting your search terms or clearing the current sector filter to see all research publications.'}
              </p>
              <button
                onClick={resetFilters}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-500 text-slate-950 font-mono text-xs font-bold hover:bg-cyan-400 transition-colors shadow-lg shadow-cyan-500/20 cursor-pointer"
              >
                {language === 'fr' ? 'Afficher toutes les publications' : 'View all publications'}
              </button>
            </div>
          ) : (
            <div className="space-y-12">
              {/* Lead Featured Article (Magazine Editorial Layout) */}
              {featuredPost && (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Link
                    to={`/insights/${featuredPost.id}`}
                    className="group block bg-slate-900/50 hover:bg-slate-900/80 border border-slate-800/80 hover:border-cyan-500/50 rounded-3xl overflow-hidden transition-all duration-300 shadow-2xl"
                  >
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
                      {/* Left Editorial Content */}
                      <div className="lg:col-span-7 p-8 md:p-12 lg:p-14 flex flex-col justify-between">
                        <div>
                          <div className="flex flex-wrap items-center gap-3 mb-5">
                            <span className="px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-mono text-xs font-bold uppercase tracking-wider">
                              {featuredPost.category}
                            </span>
                            <span className="text-slate-400 text-xs font-mono flex items-center gap-1.5">
                              <Calendar size={13} />
                              {featuredPost.date}
                            </span>
                            <span className="text-slate-400 text-xs font-mono flex items-center gap-1.5">
                              <Clock size={13} className="text-cyan-400" />
                              {featuredPost.readTime || calculateReadingTime(featuredPost.content)}
                            </span>
                          </div>

                          <h2 className="text-2xl md:text-3xl lg:text-4xl font-display font-bold text-white group-hover:text-cyan-300 transition-colors leading-tight mb-4">
                            {featuredPost.title}
                          </h2>

                          <p className="text-slate-400 text-base md:text-lg font-light leading-relaxed mb-6">
                            {featuredPost.excerpt}
                          </p>

                          {/* Executive Takeaways Highlights */}
                          {featuredPost.keyTakeaways && featuredPost.keyTakeaways.length > 0 && (
                            <div className="bg-slate-950/60 border border-slate-800/80 rounded-xl p-4 mb-6 space-y-2">
                              <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
                                <Sparkles size={12} />
                                {language === 'fr' ? 'Points Clés de Recherche :' : 'Key Research Takeaways:'}
                              </span>
                              <ul className="space-y-1.5">
                                {featuredPost.keyTakeaways.slice(0, 2).map((takeaway, tIdx) => (
                                  <li key={tIdx} className="text-xs text-slate-300 flex items-start gap-2">
                                    <ChevronRight size={14} className="text-cyan-400 flex-shrink-0 mt-0.5" />
                                    <span className="line-clamp-2">{takeaway}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>

                        <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                          <span className="text-xs font-mono text-slate-400">
                            {featuredPost.author}
                          </span>
                          <span className="inline-flex items-center gap-2 text-cyan-400 font-mono text-xs font-bold uppercase tracking-wider group-hover:translate-x-1 transition-transform">
                            <span>{language === 'fr' ? 'Lire le rapport complet' : 'Read Full Analysis'}</span>
                            <ArrowRight size={14} />
                          </span>
                        </div>
                      </div>

                      {/* Right Cover Image with SEO Alt Tag */}
                      <div className="lg:col-span-5 relative h-72 sm:h-96 lg:h-auto overflow-hidden bg-slate-950">
                        {featuredPost.coverImage ? (
                          <OptimizedImage
                            src={featuredPost.coverImage}
                            alt={`${featuredPost.title} - Oakivo DevSecOps Intelligence`}
                            fetchPriority="high"
                            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-slate-900 text-slate-700">
                            <BookOpen size={48} />
                          </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-slate-900/90 via-transparent to-transparent pointer-events-none" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              )}

              {/* Grid of Remaining Technical Reports */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {gridPosts.map((post, idx) => (
                  <motion.div
                    key={post.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: Math.min(idx * 0.05, 0.3) }}
                  >
                    <Link
                      to={`/insights/${post.id}`}
                      className="group flex flex-col h-full bg-slate-900/50 hover:bg-slate-900/80 border border-slate-800/80 hover:border-cyan-500/50 rounded-3xl overflow-hidden transition-all duration-300 shadow-xl"
                    >
                      {/* Image Header with Alt Tag */}
                      <div className="h-52 w-full relative overflow-hidden bg-slate-950">
                        {post.coverImage ? (
                          <OptimizedImage
                            src={post.coverImage}
                            alt={`${post.title} - Oakivo DevSecOps Technical Report`}
                            fetchPriority="low"
                            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-slate-900 text-slate-700">
                            <BookOpen size={36} />
                          </div>
                        )}

                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-70" />

                        {/* Category badge */}
                        <div className="absolute top-4 left-4">
                          <span className="px-2.5 py-1 rounded-md bg-slate-900/80 backdrop-blur-md border border-slate-700 text-white font-mono text-[10px] font-bold uppercase tracking-wider">
                            {post.category}
                          </span>
                        </div>
                      </div>

                      {/* Content Card Body */}
                      <div className="p-7 flex flex-col flex-grow justify-between space-y-4">
                        <div>
                          {/* Date and Read Time */}
                          <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-3">
                            <span className="flex items-center gap-1.5">
                              <Calendar size={13} />
                              {post.date}
                            </span>
                            <span className="flex items-center gap-1 text-cyan-400">
                              <Clock size={12} />
                              {post.readTime || calculateReadingTime(post.content)}
                            </span>
                          </div>

                          {/* Title */}
                          <h3 className="text-xl font-display font-bold text-white group-hover:text-cyan-300 transition-colors line-clamp-2 leading-snug mb-3">
                            {post.title}
                          </h3>

                          {/* Excerpt */}
                          <p className="text-sm text-slate-400 font-light line-clamp-3 leading-relaxed mb-4">
                            {post.excerpt}
                          </p>

                          {/* Compliance Standards Tags */}
                          {post.complianceStandards && post.complianceStandards.length > 0 && (
                            <div className="flex flex-wrap gap-1.5 mb-2">
                              {post.complianceStandards.slice(0, 3).map((std, sIdx) => (
                                <span key={sIdx} className="px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-[10px] font-mono text-slate-400">
                                  {std}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>

                        {/* Footer link */}
                        <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono">
                          <span className="text-slate-500 truncate max-w-[150px]">
                            {post.author}
                          </span>
                          <span className="inline-flex items-center gap-1 text-cyan-400 group-hover:translate-x-1 transition-transform font-medium">
                            <span>{language === 'fr' ? 'Consulter' : 'Read Report'}</span>
                            <ArrowRight size={13} />
                          </span>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* Bridging Theory & Production: Case Studies Banner */}
          <section aria-label="Case studies banner" className="mt-20 p-8 md:p-10 rounded-3xl bg-slate-900/40 border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest">
                {language === 'fr' ? 'De l’Architecture à la Production' : 'From Architecture to Verified Production'}
              </span>
              <h3 className="text-xl md:text-2xl font-display font-bold text-white">
                {language === 'fr'
                  ? 'Découvrez comment nos architectures sont déployées chez nos clients canadiens.'
                  : 'Explore how Oakivo architectures operate in mission-critical Canadian enterprises.'}
              </h3>
              <p className="text-sm text-slate-400 font-light">
                {language === 'fr'
                  ? 'Consultez nos études de cas avec métriques quantifiées d\'audit SOC 2, résilience eBPF et réduction de coûts cloud.'
                  : 'Real data, zero marketing claims. See how we reduced deployment friction and guaranteed 100% audit readiness.'}
              </p>
            </div>

            <Link
              to="/case-studies"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 font-mono text-xs font-bold uppercase tracking-wider transition-all flex-shrink-0 cursor-pointer"
            >
              <span>{language === 'fr' ? 'Voir les Études de Cas' : 'Explore All Case Studies'}</span>
              <ArrowRight size={14} className="text-cyan-400" />
            </Link>
          </section>

          {/* Newsletter Subscription Component in Footer of Insights Page */}
          <SubscribeNewsletter className="mt-16" source="insights_page_footer" />

        </div>
      </div>
    </>
  );
};

export default Insights;
