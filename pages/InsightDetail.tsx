import React, { useState, useEffect, useMemo } from 'react';
import { useLanguage, translations } from '../context/LanguageContext';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, Clock, Calendar, Share2, Twitter, Linkedin, ChevronRight, Building2, CheckCircle2, ArrowRight, ArrowUpRight, ShieldCheck, Sparkles, ExternalLink, Copy, Check } from 'lucide-react';
import { toast } from 'sonner';
import ReactMarkdown from 'react-markdown';
import SEO from '../components/SEO';
import OptimizedImage from '../components/OptimizedImage';
import { db } from '../utils/database';
import { InsightPost, insightsData } from '../content/insights';
import { INDUSTRIES_CONFIG, IndustryId } from '../content/industryInsights';
import { caseStudiesData, CaseStudyItem } from './CaseStudies';

import SubscribeNewsletter from '../components/SubscribeNewsletter';

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
  const [copied, setCopied] = useState(false);

  const handleCopyShareLink = async () => {
    const url = window.location.href;
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(url);
      } else {
        const textArea = document.createElement('textarea');
        textArea.value = url;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand('copy');
        textArea.remove();
      }
      setCopied(true);
      toast.success(
        language === 'fr' ? 'Lien copié dans le presse-papiers' : 'Link Copied to Clipboard',
        { 
          description: language === 'fr' ? 'Le lien de l’article a été copié.' : 'Direct URL copied for seamless sharing with your team.',
          duration: 3500,
        }
      );
      setTimeout(() => setCopied(false), 3000);
    } catch (err) {
      console.error('Failed to copy link:', err);
      toast.error(language === 'fr' ? 'Échec de la copie du lien' : 'Could not copy link automatically');
    }
  };

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

  // Matched industry profile and case study
  const { industryProfile, matchedCaseStudy } = useMemo(() => {
    if (!post) return { industryProfile: null, matchedCaseStudy: null };

    let indId: IndustryId = post.industry || 'infrastructure';
    if (!post.industry) {
      const found = Object.entries(INDUSTRIES_CONFIG).find(([_, p]) => p.articleIds.includes(post.id));
      if (found) indId = found[0] as IndustryId;
    }

    const profile = indId !== 'all' ? INDUSTRIES_CONFIG[indId] : null;
    const csId = post.relatedCaseStudyId || profile?.matchedCaseStudyId || 'atlantic-seafood-logistics';
    const study = caseStudiesData.find(cs => cs.id === csId) || caseStudiesData[0];

    return { industryProfile: profile, matchedCaseStudy: study };
  }, [post]);

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
        imageAlt={`${post.title} - Oakivo DevSecOps Insights`}
        type="article"
        canonical={`/insights/${post.id}`}
        keywords={`${post.category}, DevSecOps, Canadian Cloud Security, ${post.complianceStandards?.join(', ') || ''}`}
        schema={{
          '@context': 'https://schema.org',
          '@type': 'TechArticle',
          headline: post.title,
          description: post.excerpt,
          image: [post.coverImage.startsWith('http') ? post.coverImage : `https://www.oakivo.com${post.coverImage}`],
          datePublished: post.date,
          author: [{ '@type': 'Organization', name: post.author, url: 'https://www.oakivo.com' }],
          publisher: {
            '@type': 'Organization',
            name: 'Oakivo Solutions Inc.',
            logo: { '@type': 'ImageObject', url: 'https://www.oakivo.com/logo.png' }
          }
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
            <ArrowLeft size={16} /> {language === 'fr' ? 'Retour aux rapports' : 'Back to Insights'}
          </button>

          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="text-cyan-400 font-mono text-xs font-bold tracking-widest uppercase border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 rounded-full">
              {post.category}
            </span>

            {industryProfile && (
              <Link 
                to={`/insights?industry=${industryProfile.id}`}
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-semibold border transition-all hover:scale-105 ${industryProfile.colorClass.pillBg}`}
              >
                <Building2 size={12} />
                <span>{language === 'fr' ? industryProfile.nameFr : industryProfile.name}</span>
              </Link>
            )}

            <span className="flex items-center gap-1.5 text-slate-400 text-sm">
              <Calendar size={14} /> {post.date}
            </span>
            <span className="flex items-center gap-1.5 bg-slate-800/80 text-cyan-400 px-2.5 py-1 rounded-md text-[10px] font-bold tracking-widest uppercase">
              <Clock size={12} /> {post.readTime || calculateReadingTime(post.content)}
            </span>
          </div>

          {/* Compliance Standards Tags */}
          {post.complianceStandards && post.complianceStandards.length > 0 && (
            <div className="flex flex-wrap items-center gap-2 mb-6">
              <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">
                {language === 'fr' ? 'Normes visées :' : 'Applicable Frameworks:'}
              </span>
              {post.complianceStandards.map((std, sIdx) => (
                <span key={sIdx} className="px-2.5 py-0.5 rounded-md bg-slate-900 border border-slate-800 text-slate-300 text-xs font-mono">
                  {std}
                </span>
              ))}
            </div>
          )}

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
            
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="text-xs text-slate-500 font-mono mr-1 hidden sm:inline-block">SHARE:</span>
              
              <button
                type="button"
                onClick={handleCopyShareLink}
                aria-label={copied ? "Link copied to clipboard" : "Copy share link to clipboard"}
                title="Copy share link"
                className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-full border text-xs font-mono font-medium transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-cyan-400 ${
                  copied 
                    ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-300' 
                    : 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-850 hover:border-cyan-500/40 hover:text-white'
                }`}
              >
                {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} className="text-cyan-400" />}
                <span>{copied ? (language === 'fr' ? 'Lien copié !' : 'Link Copied!') : (language === 'fr' ? 'Copier le lien' : 'Copy Share Link')}</span>
              </button>

              <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}`} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:bg-[#0077b5] hover:border-[#0077b5] hover:text-white transition-all focus:outline-none focus:ring-2 focus:ring-cyan-400" aria-label="Share on LinkedIn">
                <Linkedin size={15} />
              </a>
              <a href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent("Check out this research: " + post.title)}`} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:bg-[#1DA1F2] hover:border-[#1DA1F2] hover:text-white transition-all focus:outline-none focus:ring-2 focus:ring-cyan-400" aria-label="Share on X (Twitter)">
                <Twitter size={15} />
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
                {language === 'fr' ? 'Points Clés pour la Direction' : 'Executive Takeaways'}
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

          {/* Matched Real-World Case Study Block */}
          {matchedCaseStudy && (
            <div className="mt-16 pt-12 border-t border-slate-800">
              <div className="bg-gradient-to-br from-slate-900/90 to-slate-950/90 border border-cyan-500/30 rounded-3xl p-8 md:p-10 relative overflow-hidden shadow-2xl">
                <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

                <div className="relative z-10 space-y-6">
                  <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-800">
                    <div>
                      <span className="px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-mono text-xs font-bold uppercase tracking-wider">
                        {language === 'fr' ? 'Étude de Cas Déployée Associée' : 'Applied In Practice: Verified Client Case Study'}
                      </span>
                      <h3 className="text-2xl font-display font-bold text-white mt-2">
                        {matchedCaseStudy.client} <span className="text-slate-400 text-base font-normal font-sans">({matchedCaseStudy.location})</span>
                      </h3>
                    </div>

                    <Link
                      to={`/case-studies#${matchedCaseStudy.id}`}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 text-xs font-mono font-medium transition-all group"
                    >
                      <span>{language === 'fr' ? 'Voir l\'étude complète' : 'View Full Case Study'}</span>
                      <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </Link>
                  </div>

                  <p className="text-base text-slate-300 font-light leading-relaxed">
                    {matchedCaseStudy.title}
                  </p>

                  {/* 3 Metric Chips */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {matchedCaseStudy.results.map((res, rIdx) => (
                      <div key={rIdx} className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 text-center">
                        <span className="text-xl md:text-2xl font-extrabold font-mono text-white block">
                          {res.metric}
                        </span>
                        <span className="text-[11px] font-mono text-cyan-400 mt-1 block">
                          {res.label}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Challenge & Solution */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                    <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-1">
                      <span className="font-mono font-bold uppercase text-amber-400 block">
                        {language === 'fr' ? 'Défi Client' : 'Client Challenge'}:
                      </span>
                      <p className="text-slate-300 leading-relaxed">
                        {matchedCaseStudy.challenge}
                      </p>
                    </div>

                    <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-1">
                      <span className="font-mono font-bold uppercase text-cyan-400 block">
                        {language === 'fr' ? 'Architecture Oakivo Déployée' : 'Engineered Solution'}:
                      </span>
                      <p className="text-slate-300 leading-relaxed">
                        {matchedCaseStudy.solution}
                      </p>
                    </div>
                  </div>

                  {/* Testimonial Quote */}
                  <div className="p-4 rounded-xl bg-cyan-500/10 border border-cyan-500/20 space-y-2">
                    <p className="text-xs md:text-sm text-cyan-100 italic">
                      "{matchedCaseStudy.testimonial.quote}"
                    </p>
                    <p className="text-xs font-mono text-cyan-300 font-semibold">
                      — {matchedCaseStudy.testimonial.author}, {matchedCaseStudy.testimonial.role}
                    </p>
                  </div>

                  {/* CTAs */}
                  <div className="pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <Link
                        to="/insights"
                        className="inline-flex items-center gap-2 text-xs font-mono text-slate-400 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-400 rounded-md py-1"
                      >
                        <ArrowLeft size={14} />
                        <span>{language === 'fr' ? 'Retour aux rapports' : 'Explore More Insights'}</span>
                      </Link>

                      <button
                        type="button"
                        onClick={handleCopyShareLink}
                        aria-label="Copy case study share link"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-cyan-500/30 text-xs font-mono transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-cyan-400"
                      >
                        {copied ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} className="text-cyan-400" />}
                        <span>{copied ? (language === 'fr' ? 'Lien copié' : 'Link Copied') : (language === 'fr' ? 'Partager l\'étude' : 'Share Case Study')}</span>
                      </button>
                    </div>

                    <Link
                      to="/schedule"
                      className="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-mono text-xs font-bold transition-all shadow-lg shadow-cyan-500/20 inline-flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-slate-900"
                    >
                      <span>{language === 'fr' ? 'Réserver un Audit pour Votre Entreprise' : 'Schedule Industry Security Consultation'}</span>
                      <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Newsletter Subscription Component */}
          <SubscribeNewsletter className="mt-16" source="insight_detail_page" />

        </div>
      </article>
    </>
  );
};

export default InsightDetail;
