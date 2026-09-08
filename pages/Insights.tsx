import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';
import SEO from '../components/SEO';
import { insightsData, InsightPost } from '../content/insights';
import { BookOpen, Calendar, User, ChevronRight, X } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

const Insights: React.FC = () => {
  const { t } = useLanguage();
  const [selectedPost, setSelectedPost] = useState<InsightPost | null>(null);

  // Schema for SEO
  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "Oakivo Security Insights",
    "description": "Expert research and articles on DevSecOps, Cloud Security, and Compliance.",
    "blogPost": insightsData.map(post => ({
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

      <section className="pt-32 pb-16 px-6 relative bg-[#060a12] min-h-screen">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03] pointer-events-none"></div>
        <div className="container mx-auto max-w-6xl relative z-10">
          
          <div className="mb-16">
            <h1 className="text-4xl md:text-6xl font-display font-bold tracking-tight mb-6 text-white">
              Security <span className="text-cyan-400">Insights</span>
            </h1>
            <p className="text-xl text-slate-400 font-light max-w-2xl leading-relaxed">
              Highly researched perspectives on cloud architecture, automated compliance, and the evolving DevSecOps landscape.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {insightsData.map((post) => (
              <motion.article 
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-slate-900/40 border border-slate-800/60 rounded-2xl overflow-hidden hover:border-cyan-500/30 transition-colors flex flex-col cursor-pointer group"
                onClick={() => setSelectedPost(post)}
              >
                <div className="p-6 md:p-8 flex-grow flex flex-col">
                  <div className="text-[10px] font-mono font-bold uppercase tracking-widest text-cyan-500 mb-4 inline-block px-3 py-1 bg-cyan-500/10 rounded-full w-fit">
                    {post.category}
                  </div>
                  
                  <h2 className="text-2xl font-bold text-slate-100 mb-4 group-hover:text-cyan-400 transition-colors">
                    {post.title}
                  </h2>
                  
                  <p className="text-slate-400 text-sm leading-relaxed mb-6 flex-grow">
                    {post.excerpt}
                  </p>
                  
                  <div className="mt-auto pt-6 border-t border-slate-800/60 flex items-center justify-between text-xs text-slate-500 font-mono">
                    <div className="flex items-center gap-4">
                      <span className="flex items-center gap-1.5"><Calendar size={14} /> {post.date}</span>
                    </div>
                    <span className="flex items-center text-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity">
                      Read <ChevronRight size={14} className="ml-1" />
                    </span>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Post Modal Overlay */}
      <AnimatePresence>
        {selectedPost && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-6 bg-black/80 backdrop-blur-md"
            onClick={() => setSelectedPost(null)}
          >
            <motion.div 
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="bg-slate-950 border border-slate-800 w-full max-w-4xl max-h-[90vh] rounded-3xl overflow-hidden flex flex-col shadow-2xl"
              onClick={e => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-slate-800 bg-slate-900/50">
                <div className="text-[10px] font-mono font-bold uppercase tracking-widest text-cyan-500 px-3 py-1 bg-cyan-500/10 rounded-full">
                  {selectedPost.category}
                </div>
                <button 
                  onClick={() => setSelectedPost(null)}
                  className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
              
              {/* Content Body */}
              <div className="p-6 md:p-12 overflow-y-auto no-scrollbar">
                <h1 className="text-3xl md:text-5xl font-display font-bold tracking-tight mb-6 text-white leading-tight">
                  {selectedPost.title}
                </h1>
                
                <div className="flex items-center gap-6 text-sm text-slate-400 font-mono mb-10 pb-10 border-b border-slate-800/60">
                  <span className="flex items-center gap-2"><User size={16} className="text-cyan-500"/> {selectedPost.author}</span>
                  <span className="flex items-center gap-2"><Calendar size={16} className="text-cyan-500"/> {selectedPost.date}</span>
                </div>

                <div className="prose prose-invert prose-cyan max-w-none text-slate-300 leading-loose
                  prose-headings:font-display prose-headings:font-bold prose-headings:text-white
                  prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-4
                  prose-p:mb-6 prose-a:text-cyan-400 hover:prose-a:text-cyan-300">
                  <ReactMarkdown>{selectedPost.content}</ReactMarkdown>
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
