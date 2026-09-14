import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  HeartPulse, ShoppingBag, Truck, Landmark, ShieldCheck, 
  Layers, Search, ArrowRight, ExternalLink, CheckCircle2, 
  Sparkles, FileText, AlertTriangle, ChevronRight, X,
  Clock, Calendar, Shield, ArrowUpRight, TrendingUp, Building2
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { InsightPost } from '../content/insights';
import { INDUSTRIES_CONFIG, IndustryId, IndustrySecurityProfile } from '../content/industryInsights';
import { caseStudiesData, CaseStudyItem } from '../pages/CaseStudies';
import OptimizedImage from './OptimizedImage';

interface IndustryInsightsExplorerProps {
  posts: InsightPost[];
  initialIndustry?: IndustryId;
}

const calculateReadingTime = (content?: string, fallback?: string): string => {
  if (fallback) return fallback;
  if (!content) return "6 min read";
  const wordsPerMinute = 220;
  const wordCount = content.split(/\s+/).length;
  const minutes = Math.ceil(wordCount / wordsPerMinute);
  return `${minutes} min read`;
};

export const IndustryInsightsExplorer: React.FC<IndustryInsightsExplorerProps> = ({
  posts,
  initialIndustry = 'all'
}) => {
  const { language } = useLanguage();
  const [selectedIndustry, setSelectedIndustry] = useState<IndustryId>(initialIndustry);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeQuickFilter, setActiveQuickFilter] = useState<string | null>(null);
  const [previewCaseStudy, setPreviewCaseStudy] = useState<CaseStudyItem | null>(null);

  // Industry tabs definition
  const industryTabs: { id: IndustryId; label: string; labelFr: string; icon: React.FC<{ size?: number; className?: string }> }[] = [
    { id: 'all', label: 'All Sectors', labelFr: 'Tous les Secteurs', icon: Layers },
    { id: 'healthcare', label: 'Healthcare & Life Sciences', labelFr: 'Santé & Sciences', icon: HeartPulse },
    { id: 'retail', label: 'Retail & E-Commerce', labelFr: 'Commerce & Retail', icon: ShoppingBag },
    { id: 'logistics', label: 'Logistics & Supply Chain', labelFr: 'Logistique & Transport', icon: Truck },
    { id: 'fintech', label: 'Financial & FinTech', labelFr: 'Finance & FinTech', icon: Landmark },
    { id: 'infrastructure', label: 'Critical Infrastructure', labelFr: 'Infrastructures Critiques', icon: ShieldCheck }
  ];

  // Map each post to its detected industry
  const postsWithIndustry = useMemo(() => {
    return posts.map(post => {
      let detectedIndustry: IndustryId = post.industry || 'infrastructure';
      
      // If not explicitly set in post, match against INDUSTRIES_CONFIG
      if (!post.industry) {
        const found = Object.entries(INDUSTRIES_CONFIG).find(([_, profile]) => 
          profile.articleIds.includes(post.id)
        );
        if (found) {
          detectedIndustry = found[0] as IndustryId;
        } else {
          // Heuristics based on title or content
          const text = (post.title + ' ' + post.excerpt + ' ' + post.category).toLowerCase();
          if (text.includes('health') || text.includes('phi') || text.includes('pipeda') || text.includes('patient') || text.includes('clinical')) {
            detectedIndustry = 'healthcare';
          } else if (text.includes('retail') || text.includes('pos') || text.includes('checkout') || text.includes('e-commerce') || text.includes('merchant')) {
            detectedIndustry = 'retail';
          } else if (text.includes('logistics') || text.includes('supply chain') || text.includes('shipping') || text.includes('fleet') || text.includes('cold storage') || text.includes('seafood')) {
            detectedIndustry = 'logistics';
          } else if (text.includes('soc 2') || text.includes('fintech') || text.includes('banking') || text.includes('quantum') || text.includes('cryptography') || text.includes('audit')) {
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
        industryProfile: industryConfig,
        matchedCaseStudyId: post.relatedCaseStudyId || industryConfig?.matchedCaseStudyId || 'atlantic-seafood-logistics'
      };
    });
  }, [posts]);

  // Current active industry profile
  const activeProfile: IndustrySecurityProfile | null = 
    selectedIndustry !== 'all' ? INDUSTRIES_CONFIG[selectedIndustry] : null;

  // Matched case study for the selected industry
  const matchedCaseStudy: CaseStudyItem | undefined = useMemo(() => {
    if (!activeProfile) return undefined;
    return caseStudiesData.find(cs => cs.id === activeProfile.matchedCaseStudyId) || caseStudiesData[0];
  }, [activeProfile]);

  // Quick filter tags
  const quickFilters = ['Zero-Trust', 'Data Sovereignty', 'SOC 2', 'PCI-DSS', 'Bill C-26', 'eBPF Kernel', 'AI Governance', 'Supply Chain'];

  // Filtered articles
  const filteredArticles = useMemo(() => {
    return postsWithIndustry.filter(post => {
      // 1. Industry match
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
        const matchesTakeaways = post.keyTakeaways?.some(k => k.toLowerCase().includes(q));
        const matchesRegulations = post.industryProfile?.keyRegulations.some(r => r.toLowerCase().includes(q));
        if (!matchesTitle && !matchesExcerpt && !matchesCategory && !matchesAuthor && !matchesTakeaways && !matchesRegulations) {
          return false;
        }
      }

      // 3. Quick tag filter match
      if (activeQuickFilter) {
        const qTag = activeQuickFilter.toLowerCase();
        const inTitle = post.title.toLowerCase().includes(qTag);
        const inExcerpt = post.excerpt.toLowerCase().includes(qTag);
        const inContent = post.content?.toLowerCase().includes(qTag);
        const inCategory = post.category.toLowerCase().includes(qTag);
        const inRegs = post.industryProfile?.keyRegulations.some(r => r.toLowerCase().includes(qTag));
        if (!inTitle && !inExcerpt && !inContent && !inCategory && !inRegs) {
          return false;
        }
      }

      return true;
    });
  }, [postsWithIndustry, selectedIndustry, searchQuery, activeQuickFilter]);

  // Count articles per industry
  const articleCounts = useMemo(() => {
    const counts: Record<string, number> = { all: postsWithIndustry.length };
    industryTabs.forEach(tab => {
      if (tab.id !== 'all') {
        counts[tab.id] = postsWithIndustry.filter(p => p.detectedIndustry === tab.id).length;
      }
    });
    return counts;
  }, [postsWithIndustry]);

  return (
    <div id="industry-insights-explorer" className="w-full space-y-10 my-10">
      
      {/* Component Header & Search */}
      <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800/80 rounded-2xl md:rounded-3xl p-6 md:p-8 relative overflow-hidden shadow-2xl">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-mono font-medium mb-3">
                <Sparkles size={13} />
                <span>{language === 'fr' ? 'Intelligence Sectorielle & Études de Cas' : 'Industry Security Intelligence & Case Studies'}</span>
              </div>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-display font-bold text-white tracking-tight">
                {language === 'fr' 
                  ? 'Explorez par Industrie & Découvrez les Études de Cas Déployées' 
                  : 'Filter Insights by Industry & Discover Verified Case Studies'}
              </h2>
              <p className="text-sm md:text-base text-slate-400 max-w-3xl mt-2 font-light">
                {language === 'fr'
                  ? 'Chaque secteur fait face à des exigences réglementaires strictes et des vecteurs d\'attaque spécifiques. Naviguez par industrie pour trouver des analyses approfondies et voir comment Oakivo a automatisé la conformité et la sécurité pour des clients réels.'
                  : 'Select your sector to view targeted threat vectors, compliance mandates (PIPEDA, Law 25, PCI-DSS 4.0, Bill C-26), and directly linked production case studies with quantified ROI.'}
              </p>
            </div>

            {/* In-component search field */}
            <div className="w-full lg:w-80 flex-shrink-0">
              <div className="relative">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                <input 
                  type="text"
                  placeholder={language === 'fr' ? 'Rechercher par norme, mot-clé...' : 'Search regulations, threats, topic...'}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-slate-950/80 border border-slate-700/60 rounded-xl py-3 pl-10 pr-10 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-colors shadow-inner"
                />
                {searchQuery && (
                  <button 
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                  >
                    <X size={14} />
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Industry Selection Tabs */}
          <div className="pt-2 border-t border-slate-800/80">
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
              {industryTabs.map((tab) => {
                const IconComponent = tab.icon;
                const isSelected = selectedIndustry === tab.id;
                const count = articleCounts[tab.id] || 0;

                return (
                  <button
                    key={tab.id}
                    onClick={() => {
                      setSelectedIndustry(tab.id);
                    }}
                    className={`inline-flex items-center gap-2.5 px-4 py-2.5 rounded-xl font-mono text-xs font-semibold whitespace-nowrap transition-all duration-200 border ${
                      isSelected
                        ? 'bg-cyan-500 text-slate-950 border-cyan-400 shadow-lg shadow-cyan-500/20 font-bold'
                        : 'bg-slate-950/60 text-slate-300 border-slate-800/80 hover:bg-slate-800/60 hover:text-white hover:border-slate-700'
                    }`}
                  >
                    <IconComponent size={15} className={isSelected ? 'text-slate-950' : 'text-cyan-400'} />
                    <span>{language === 'fr' ? tab.labelFr : tab.label}</span>
                    <span className={`px-1.5 py-0.5 rounded-full text-[10px] ${
                      isSelected ? 'bg-slate-950/20 text-slate-950 font-bold' : 'bg-slate-800 text-slate-400'
                    }`}>
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quick Filter Keyword Pills */}
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <span className="text-[11px] font-mono text-slate-500 uppercase tracking-wider mr-1">
              {language === 'fr' ? 'Filtres rapides :' : 'Quick Topics:'}
            </span>
            {quickFilters.map((tag) => {
              const isActive = activeQuickFilter === tag;
              return (
                <button
                  key={tag}
                  onClick={() => setActiveQuickFilter(isActive ? null : tag)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-mono transition-colors border ${
                    isActive 
                      ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400/40 font-bold'
                      : 'bg-slate-950/40 text-slate-400 border-slate-800/60 hover:text-slate-200 hover:border-slate-700'
                  }`}
                >
                  #{tag}
                </button>
              );
            })}
            {activeQuickFilter && (
              <button
                onClick={() => setActiveQuickFilter(null)}
                className="text-xs font-mono text-rose-400 hover:underline ml-2"
              >
                {language === 'fr' ? 'Effacer le filtre' : 'Reset filter'}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Industry Spotlight & Verified Case Study Card (Only shown when a specific industry or matched study exists) */}
      <AnimatePresence mode="wait">
        {activeProfile && matchedCaseStudy && (
          <motion.div
            key={activeProfile.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-6"
          >
            {/* Left Column: Industry Threat & Compliance Overview */}
            <div className="lg:col-span-5 bg-slate-900/50 backdrop-blur-md rounded-2xl md:rounded-3xl p-6 md:p-8 border border-slate-800/80 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-mono font-semibold border ${activeProfile.colorClass.pillBg}`}>
                    {activeProfile.badge}
                  </span>
                  <span className="text-xs font-mono text-slate-500 flex items-center gap-1">
                    <Shield size={12} className={activeProfile.colorClass.text} />
                    {language === 'fr' ? 'Architecture Recommandée' : 'Zero-Trust Architecture'}
                  </span>
                </div>

                <h3 className="text-xl md:text-2xl font-display font-bold text-white">
                  {language === 'fr' ? activeProfile.nameFr : activeProfile.name}
                </h3>

                <p className="text-xs md:text-sm font-mono text-cyan-400 leading-snug">
                  "{language === 'fr' ? activeProfile.taglineFr : activeProfile.tagline}"
                </p>

                <p className="text-xs md:text-sm text-slate-300 font-light leading-relaxed">
                  {language === 'fr' ? activeProfile.descriptionFr : activeProfile.description}
                </p>

                {/* Compliance Frameworks */}
                <div className="space-y-2 pt-2">
                  <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block">
                    {language === 'fr' ? 'Normes & Réglementations Clés' : 'Key Compliance & Mandates'}:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {activeProfile.keyRegulations.map((reg, idx) => (
                      <span 
                        key={idx} 
                        className="px-2.5 py-1 rounded-md bg-slate-950/80 border border-slate-800 text-slate-300 text-[11px] font-mono"
                      >
                        {reg}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Primary Threat Mitigations */}
                <div className="space-y-2.5 pt-2">
                  <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block">
                    {language === 'fr' ? 'Mitigation des Risques Primaires' : 'Primary Sector Threats & Mitigations'}:
                  </span>
                  <div className="space-y-2">
                    {activeProfile.primaryThreats.map((threat, idx) => (
                      <div key={idx} className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/60 space-y-1">
                        <div className="flex items-start gap-2 text-xs font-semibold text-rose-300">
                          <AlertTriangle size={13} className="text-rose-400 flex-shrink-0 mt-0.5" />
                          <span>{threat.threat}</span>
                        </div>
                        <div className="text-[11px] font-mono text-emerald-300 pl-5 flex items-start gap-1">
                          <CheckCircle2 size={12} className="text-emerald-400 flex-shrink-0 mt-0.5" />
                          <span>{threat.mitigation}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Matched Client Case Study Highlight */}
            <div className="lg:col-span-7 bg-gradient-to-br from-slate-900/90 to-slate-950/90 rounded-2xl md:rounded-3xl p-6 md:p-8 border border-cyan-500/30 relative overflow-hidden shadow-2xl flex flex-col justify-between space-y-6">
              <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

              <div className="relative z-10 space-y-6">
                {/* Case Study Header */}
                <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-800">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-mono text-[10px] font-bold uppercase tracking-wider">
                        {language === 'fr' ? 'Étude de Cas Déployée' : 'Verified Client Case Study'}
                      </span>
                      <span className="text-xs font-mono text-slate-400">
                        {matchedCaseStudy.location}
                      </span>
                    </div>
                    <h3 className="text-xl md:text-2xl font-display font-bold text-white mt-1">
                      {matchedCaseStudy.client}
                    </h3>
                  </div>

                  <Link
                    to={`/case-studies#${matchedCaseStudy.id}`}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 text-xs font-mono font-medium transition-all group"
                  >
                    <span>{language === 'fr' ? 'Voir sur la page Études' : 'View Full Case Study'}</span>
                    <ArrowUpRight size={13} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </Link>
                </div>

                {/* Case Study Title */}
                <div>
                  <h4 className="text-lg md:text-xl font-bold text-slate-100 leading-snug">
                    {matchedCaseStudy.title}
                  </h4>
                </div>

                {/* Quantifiable Results Metrics */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {matchedCaseStudy.results.map((res, rIdx) => (
                    <div key={rIdx} className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 text-center">
                      <span className="text-xl md:text-2xl font-extrabold font-mono text-white block">
                        {res.metric}
                      </span>
                      <span className="text-[11px] font-mono text-cyan-400 mt-1 block line-clamp-1">
                        {res.label}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Challenge & Done-for-You Solution Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-1.5">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-amber-400 block">
                      {language === 'fr' ? 'Défi Opérationnel' : 'Operational Challenge'}
                    </span>
                    <p className="text-xs text-slate-300 leading-relaxed line-clamp-4">
                      {matchedCaseStudy.challenge}
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-1.5">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-cyan-400 block">
                      {language === 'fr' ? 'Solution Clé en Main Oakivo' : 'The Oakivo Engineered Solution'}
                    </span>
                    <p className="text-xs text-slate-300 leading-relaxed line-clamp-4">
                      {matchedCaseStudy.solution}
                    </p>
                  </div>
                </div>

                {/* Verified Testimonial Quote */}
                <div className="p-4 rounded-xl bg-cyan-500/10 border border-cyan-500/20 space-y-2">
                  <p className="text-xs md:text-sm text-cyan-100 italic leading-relaxed">
                    "{matchedCaseStudy.testimonial.quote}"
                  </p>
                  <div className="text-[11px] font-mono text-cyan-300 font-semibold">
                    — {matchedCaseStudy.testimonial.author}, <span className="text-slate-400 font-normal">{matchedCaseStudy.testimonial.role}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="relative z-10 pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4">
                <button
                  onClick={() => setPreviewCaseStudy(matchedCaseStudy)}
                  className="text-xs font-mono text-slate-300 hover:text-white flex items-center gap-1.5 transition-colors"
                >
                  <FileText size={14} className="text-cyan-400" />
                  <span>{language === 'fr' ? 'Aperçu Rapide du Rapport' : 'Quick Preview Case Study'}</span>
                </button>

                <div className="flex items-center gap-3">
                  <Link
                    to="/schedule"
                    className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-mono text-xs font-bold transition-all shadow-lg shadow-cyan-500/20 inline-flex items-center gap-2"
                  >
                    <span>{language === 'fr' ? 'Réserver un Audit Dédié' : 'Book Industry Security Audit'}</span>
                    <ArrowRight size={13} />
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Categorized Security Articles Grid */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-xl md:text-2xl font-display font-bold text-white flex items-center gap-2.5">
              <span>
                {selectedIndustry === 'all' 
                  ? (language === 'fr' ? 'Tous les Articles et Rapports Techniques' : 'All Technical Security Intelligence Reports')
                  : `${activeProfile ? (language === 'fr' ? activeProfile.nameFr : activeProfile.name) : ''} — ${language === 'fr' ? 'Rapports Dédiés' : 'Industry Reports'}`
                }
              </span>
              <span className="text-sm font-mono text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 px-2.5 py-0.5 rounded-full">
                {filteredArticles.length} {filteredArticles.length === 1 ? 'Report' : 'Reports'}
              </span>
            </h3>
            <p className="text-xs md:text-sm text-slate-400 font-light mt-1">
              {language === 'fr'
                ? 'Analyses rigoureuses et blueprints d\'ingénierie rédigés par les architectes Oakivo.'
                : 'Peer-reviewed architectural blueprints and regulatory breakdowns written by Oakivo\'s principal security engineers.'}
            </p>
          </div>

          {selectedIndustry !== 'all' && (
            <button
              onClick={() => setSelectedIndustry('all')}
              className="text-xs font-mono text-cyan-400 hover:text-cyan-300 self-start sm:self-auto flex items-center gap-1 transition-colors"
            >
              <span>{language === 'fr' ? 'Voir tous les secteurs' : 'View all sectors'}</span>
              <ChevronRight size={13} />
            </button>
          )}
        </div>

        {filteredArticles.length === 0 ? (
          <div className="text-center py-16 bg-slate-900/40 rounded-3xl border border-slate-800 border-dashed space-y-3">
            <Building2 className="mx-auto h-10 w-10 text-slate-600" />
            <h4 className="text-lg font-medium text-white">
              {language === 'fr' ? 'Aucun article trouvé pour ce filtre' : 'No articles match your specific criteria'}
            </h4>
            <p className="text-xs text-slate-400 max-w-md mx-auto">
              {language === 'fr'
                ? 'Essayez de réinitialiser la recherche ou de sélectionner un autre secteur d\'activité.'
                : 'Try adjusting your search query or switching to another industry category above.'}
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setActiveQuickFilter(null);
                setSelectedIndustry('all');
              }}
              className="mt-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-400 font-mono text-xs transition-colors"
            >
              {language === 'fr' ? 'Réinitialiser tous les filtres' : 'Reset All Filters'}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArticles.map((post) => {
              const profile = post.industryProfile;
              const relatedCaseStudy = caseStudiesData.find(cs => cs.id === post.matchedCaseStudyId);

              return (
                <div 
                  key={post.id}
                  className="bg-slate-900/50 border border-slate-800/80 hover:border-cyan-500/50 rounded-2xl md:rounded-3xl overflow-hidden transition-all duration-300 group flex flex-col justify-between"
                >
                  <div>
                    {/* Card Cover Image */}
                    <div className="h-44 w-full relative overflow-hidden bg-slate-800">
                      {post.coverImage ? (
                        <OptimizedImage 
                          src={post.coverImage} 
                          alt={post.title}
                          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-slate-600">
                          <Shield size={36} />
                        </div>
                      )}

                      {/* Industry Pill on Image */}
                      {profile && (
                        <div className="absolute top-3 left-3">
                          <span className={`px-2.5 py-1 rounded-md text-[10px] font-mono font-bold uppercase tracking-wider backdrop-blur-md border ${profile.colorClass.pillBg}`}>
                            {language === 'fr' ? profile.nameFr : profile.name}
                          </span>
                        </div>
                      )}

                      {/* Category Badge on Image */}
                      <div className="absolute top-3 right-3">
                        <span className="px-2 py-0.5 rounded-md text-[9px] font-mono font-bold uppercase tracking-wider bg-slate-950/80 text-slate-300 border border-slate-700 backdrop-blur-md">
                          {post.category}
                        </span>
                      </div>
                    </div>

                    {/* Card Body */}
                    <div className="p-6 space-y-3">
                      <Link to={`/insights/${post.id}`}>
                        <h4 className="text-lg font-display font-bold text-white group-hover:text-cyan-400 transition-colors line-clamp-2 leading-snug">
                          {post.title}
                        </h4>
                      </Link>

                      <p className="text-xs text-slate-400 font-light line-clamp-3 leading-relaxed">
                        {post.excerpt}
                      </p>

                      {/* Key Takeaway snippet */}
                      {post.keyTakeaways && post.keyTakeaways.length > 0 && (
                        <div className="pt-2">
                          <div className="p-2.5 rounded-lg bg-slate-950/60 border border-slate-800/80 space-y-1">
                            <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider block">
                              {language === 'fr' ? 'Point Clé :' : 'Key Takeaway:'}
                            </span>
                            <p className="text-[11px] text-slate-300 line-clamp-2 italic">
                              "{post.keyTakeaways[0]}"
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Card Footer */}
                  <div className="px-6 pb-6 pt-3 border-t border-slate-800/80 space-y-3">
                    {/* Relevant Case Study link button if available */}
                    {relatedCaseStudy && (
                      <Link
                        to={`/case-studies#${relatedCaseStudy.id}`}
                        className="w-full flex items-center justify-between p-2 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/20 text-[11px] font-mono text-cyan-300 transition-colors group/cs"
                      >
                        <span className="flex items-center gap-1.5 truncate">
                          <CheckCircle2 size={12} className="text-cyan-400 flex-shrink-0" />
                          <span className="truncate">
                            {language === 'fr' ? 'Déployé pour ' : 'Solved for '}<strong>{relatedCaseStudy.client}</strong>
                          </span>
                        </span>
                        <ArrowUpRight size={12} className="text-cyan-400 flex-shrink-0 group-hover/cs:translate-x-0.5 group-hover/cs:-translate-y-0.5 transition-transform" />
                      </Link>
                    )}

                    <div className="flex items-center justify-between text-xs font-mono text-slate-500">
                      <span className="flex items-center gap-1 text-[11px]">
                        <Clock size={12} className="text-slate-400" />
                        {calculateReadingTime(post.content, post.readTime)}
                      </span>

                      <Link 
                        to={`/insights/${post.id}`}
                        className="inline-flex items-center gap-1 text-cyan-400 hover:text-cyan-300 font-semibold text-[11px] tracking-wider uppercase transition-colors"
                      >
                        <span>{language === 'fr' ? 'Lire le rapport' : 'Read Report'}</span>
                        <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Case Study Quick Preview Modal */}
      <AnimatePresence>
        {previewCaseStudy && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-slate-900 border border-slate-700/80 rounded-3xl max-w-2xl w-full p-6 md:p-8 relative max-h-[90vh] overflow-y-auto shadow-2xl space-y-6"
            >
              <button 
                onClick={() => setPreviewCaseStudy(null)}
                className="absolute top-6 right-6 text-slate-400 hover:text-white p-2 rounded-full bg-slate-800/80 hover:bg-slate-800 transition-colors"
              >
                <X size={18} />
              </button>

              <div className="space-y-3">
                <span className="px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono font-bold uppercase tracking-wider">
                  {previewCaseStudy.industry} • {previewCaseStudy.location}
                </span>
                <h3 className="text-2xl font-display font-bold text-white">
                  {previewCaseStudy.client}
                </h3>
                <p className="text-sm font-mono text-cyan-300">
                  {previewCaseStudy.title}
                </p>
              </div>

              {/* Quantifiable Results */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {previewCaseStudy.results.map((res, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-center">
                    <span className="text-xl font-bold font-mono text-white block">{res.metric}</span>
                    <span className="text-[10px] font-mono text-cyan-400 mt-1 block">{res.label}</span>
                  </div>
                ))}
              </div>

              {/* Challenge & Solution */}
              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1">
                  <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-amber-400">
                    {language === 'fr' ? 'Le Défi Opérationnel' : 'The Challenge'}
                  </h4>
                  <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
                    {previewCaseStudy.challenge}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1">
                  <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400">
                    {language === 'fr' ? 'La Solution Oakivo' : 'The Solution'}
                  </h4>
                  <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
                    {previewCaseStudy.solution}
                  </p>
                </div>
              </div>

              {/* Testimonial */}
              <div className="p-4 rounded-xl bg-cyan-500/10 border border-cyan-500/20 space-y-2">
                <p className="text-xs md:text-sm text-cyan-100 italic">
                  "{previewCaseStudy.testimonial.quote}"
                </p>
                <p className="text-xs font-mono text-cyan-300 font-semibold">
                  — {previewCaseStudy.testimonial.author}, {previewCaseStudy.testimonial.role}
                </p>
              </div>

              {/* Modal footer CTAs */}
              <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                <Link
                  to={`/case-studies#${previewCaseStudy.id}`}
                  onClick={() => setPreviewCaseStudy(null)}
                  className="inline-flex items-center gap-2 text-xs font-mono text-cyan-400 hover:underline"
                >
                  <span>{language === 'fr' ? 'Ouvrir la page de l\'étude' : 'Open Full Case Study Page'}</span>
                  <ExternalLink size={13} />
                </Link>

                <Link
                  to="/schedule"
                  onClick={() => setPreviewCaseStudy(null)}
                  className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-mono text-xs font-bold transition-colors"
                >
                  {language === 'fr' ? 'Réserver une Consultation Sécurité' : 'Book Security Consultation'}
                </Link>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default IndustryInsightsExplorer;
