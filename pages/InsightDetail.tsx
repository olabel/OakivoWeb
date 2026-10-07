import React, { useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { ArrowLeft, Clock, Calendar, Share2, ShieldCheck, ArrowRight, CheckCircle2, Bookmark, Check } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import SEO from '../components/SEO';
import OptimizedImage from '../components/OptimizedImage';
import { useLanguage } from '../context/LanguageContext';
import { insightsData } from '../content/insights';

export const InsightDetail: React.FC = () => {
  const { id, slug } = useParams<{ id?: string; slug?: string }>();
  const activeId = id || slug;
  const { language } = useLanguage();
  const isFr = language === 'fr';
  const [copied, setCopied] = useState(false);

  const article = insightsData.find(item => item.id === activeId);

  if (!article) {
    return <Navigate to="/insights" replace />;
  }

  const title = article.title;
  const excerpt = article.excerpt;
  const content = article.content;
  const coverImage = article.coverImage || '/og-image.png';

  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text: excerpt,
          url,
        });
        return;
      } catch (err) {
        // Fall back to copy
      }
    }
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    'headline': title,
    'description': excerpt,
    'image': coverImage.startsWith('http') ? coverImage : `https://www.oakivo.com${coverImage}`,
    'datePublished': article.date,
    'dateModified': article.date,
    'author': {
      '@type': 'Organization',
      'name': article.author || 'Oakivo Solutions Inc.',
      'url': 'https://www.oakivo.com'
    },
    'publisher': {
      '@type': 'Organization',
      'name': 'Oakivo Solutions Inc.',
      'logo': {
        '@type': 'ImageObject',
        'url': 'https://www.oakivo.com/logo.png'
      }
    },
    'mainEntityOfPage': {
      '@type': 'WebPage',
      '@id': `https://www.oakivo.com/insights/${article.id}`
    }
  };

  return (
    <>
      <SEO 
        title={`${title} | Oakivo Insights`}
        description={excerpt}
        canonical={`/insights/${article.id}`}
        type="article"
        image={coverImage}
        imageAlt={title}
        schema={articleSchema}
        keywords={article.complianceStandards?.join(', ') || article.category}
      />

      <article className="bg-[#030712] min-h-screen pt-32 pb-24 px-6 sm:px-8">
        <div className="container mx-auto max-w-4xl space-y-10">
          
          {/* Top navigation bar */}
          <div className="flex items-center justify-between gap-4">
            <Link
              to="/insights"
              className="inline-flex items-center gap-2 text-xs font-mono text-cyan-400 hover:text-cyan-300 transition-colors uppercase tracking-wider"
            >
              <ArrowLeft size={14} />
              <span>{isFr ? 'Retour aux Perspectives' : 'Back to Strategic Briefings'}</span>
            </Link>

            <button
              type="button"
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900/80 hover:bg-slate-800 border border-white/[0.08] text-xs font-mono text-slate-300 hover:text-white transition-colors cursor-pointer"
              title="Share or copy article link"
            >
              {copied ? (
                <>
                  <Check size={13} className="text-emerald-400" />
                  <span className="text-emerald-300">{isFr ? 'Lien copié !' : 'Link Copied!'}</span>
                </>
              ) : (
                <>
                  <Share2 size={13} className="text-cyan-400" />
                  <span>{isFr ? 'Partager' : 'Share Briefing'}</span>
                </>
              )}
            </button>
          </div>

          {/* Article Header */}
          <header className="space-y-6 border-b border-white/[0.08] pb-10">
            <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-slate-400">
              <span className="px-2.5 py-1 rounded-md bg-cyan-950/60 text-cyan-300 border border-cyan-500/30 uppercase tracking-wider font-semibold">
                {article.category}
              </span>
              <span className="text-slate-700">·</span>
              <span>{article.date}</span>
              <span className="text-slate-700">·</span>
              <span>{article.readTime}</span>
              {article.industryLabel && (
                <>
                  <span className="text-slate-700">·</span>
                  <span className="text-slate-400">{article.industryLabel}</span>
                </>
              )}
            </div>

            <h1 className="text-3xl sm:text-5xl font-display font-bold text-white tracking-tight leading-tight">
              {title}
            </h1>

            <p className="text-base sm:text-xl text-slate-300 font-light leading-relaxed">
              {excerpt}
            </p>

            <div className="flex items-center gap-3 pt-2 text-xs font-mono text-slate-400">
              <span className="text-slate-500">{isFr ? 'Rédigé par :' : 'Authored by:'}</span>
              <span className="text-white font-medium">{article.author}</span>
            </div>
          </header>

          {/* Hero Cover Image (SEO Tagged, Responsive, High Performance) */}
          {article.coverImage && (
            <div className="rounded-3xl overflow-hidden border border-white/[0.08] bg-slate-950 shadow-2xl relative">
              <OptimizedImage
                src={article.coverImage}
                alt={`${title} - Strategic Analysis Cover`}
                fetchPriority="high"
                className="w-full aspect-[16/9] object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#030712]/60 via-transparent to-transparent pointer-events-none" />
            </div>
          )}

          {/* Executive Key Takeaways Box */}
          {article.keyTakeaways && article.keyTakeaways.length > 0 && (
            <div className="p-6 sm:p-8 rounded-3xl bg-[#090E1D]/90 border border-cyan-500/30 shadow-xl space-y-4">
              <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider">
                <Bookmark size={15} />
                <span>{isFr ? 'Points Clés pour Dirigeants' : 'Executive Key Takeaways'}</span>
              </div>
              <ul className="space-y-3 text-xs sm:text-sm font-mono text-slate-200">
                {article.keyTakeaways.map((takeaway, tIdx) => (
                  <li key={tIdx} className="flex items-start gap-2.5">
                    <CheckCircle2 size={16} className="text-cyan-400 shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{takeaway}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Standards & Compliance Chips */}
          {article.complianceStandards && article.complianceStandards.length > 0 && (
            <div className="flex flex-wrap items-center gap-2 pt-2 text-xs font-mono">
              <span className="text-slate-500 mr-1">{isFr ? 'Cadres validés :' : 'Validated Frameworks:'}</span>
              {article.complianceStandards.map((std, idx) => (
                <span key={idx} className="px-2.5 py-1 rounded-lg bg-slate-900 border border-white/[0.08] text-slate-300">
                  {std}
                </span>
              ))}
            </div>
          )}

          {/* Article Markdown Body */}
          <div className="prose prose-invert prose-cyan max-w-none text-slate-300 text-sm sm:text-base leading-relaxed space-y-6 pt-4">
            <ReactMarkdown
              components={{
                h2: ({ node, ...props }) => <h2 className="text-2xl sm:text-3xl font-display font-bold text-white tracking-tight mt-10 mb-4 pb-2 border-b border-white/[0.08]" {...props} />,
                h3: ({ node, ...props }) => <h3 className="text-xl sm:text-2xl font-display font-bold text-white tracking-tight mt-8 mb-3 text-cyan-300" {...props} />,
                h4: ({ node, ...props }) => <h4 className="text-lg font-display font-semibold text-slate-200 mt-6 mb-2" {...props} />,
                p: ({ node, ...props }) => <p className="font-light leading-relaxed mb-5 text-slate-300" {...props} />,
                ul: ({ node, ...props }) => <ul className="space-y-2 my-4 list-disc list-inside text-slate-300" {...props} />,
                ol: ({ node, ...props }) => <ol className="space-y-2 my-4 list-decimal list-inside text-slate-300" {...props} />,
                li: ({ node, ...props }) => <li className="leading-relaxed" {...props} />,
                hr: () => <hr className="my-8 border-white/[0.08]" />,
                blockquote: ({ node, ...props }) => (
                  <blockquote className="border-l-2 border-cyan-400 pl-4 py-1 italic text-slate-300 bg-cyan-950/20 rounded-r-xl my-6" {...props} />
                ),
                table: ({ node, ...props }) => (
                  <div className="overflow-x-auto my-8 rounded-2xl border border-white/[0.08] bg-[#090E1D]">
                    <table className="w-full text-left text-xs sm:text-sm border-collapse" {...props} />
                  </div>
                ),
                thead: ({ node, ...props }) => <thead className="bg-[#050811] border-b border-white/[0.08] text-slate-300 uppercase font-mono text-xs" {...props} />,
                th: ({ node, ...props }) => <th className="p-4 font-bold text-cyan-400" {...props} />,
                td: ({ node, ...props }) => <td className="p-4 border-b border-white/[0.04] text-slate-300 font-mono" {...props} />,
              }}
            >
              {content || excerpt}
            </ReactMarkdown>
          </div>

          {/* Article Footer & Consultation CTA */}
          <footer className="pt-12 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="text-xs font-mono text-slate-400">
              <span>{isFr ? 'Publié par le Bureau d’Ingénierie Oakivo · Dieppe (N.-B.)' : 'Authored by Oakivo Engineering Hub · Dieppe, NB'}</span>
            </div>

            <div className="flex items-center gap-3">
              <Link
                to="/booking"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-mono font-semibold text-xs uppercase tracking-wider transition-colors shadow-md"
              >
                <span>{isFr ? 'Planifier une Consultation' : 'Schedule Executive Briefing'}</span>
                <ArrowRight size={13} />
              </Link>
            </div>
          </footer>

        </div>
      </article>
    </>
  );
};

export default InsightDetail;
