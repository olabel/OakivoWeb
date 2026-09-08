const fs = require('fs');

let content = fs.readFileSync('pages/Insights.tsx', 'utf8');

// 1. Update imports
content = content.replace(
  "import { BookOpen, Calendar, User, ChevronRight, X, Clock, ArrowRight, Shield } from 'lucide-react';",
  "import { BookOpen, Calendar, User, ChevronRight, X, Clock, ArrowRight, Shield, Search, Share2, Twitter, Linkedin } from 'lucide-react';"
);

// 2. Add searchQuery state
content = content.replace(
  "const [selectedPost, setSelectedPost] = useState<InsightPost | null>(null);",
  "const [selectedPost, setSelectedPost] = useState<InsightPost | null>(null);\n  const [searchQuery, setSearchQuery] = useState('');"
);

// 3. Update filtering logic
content = content.replace(
  "const featuredPost = posts.length > 0 ? posts[0] : null;\n  const standardPosts = posts.length > 1 ? posts.slice(1) : [];",
  `const filteredPosts = posts.filter(post => 
    searchQuery === '' ||
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.content.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const featuredPost = (filteredPosts.length > 0 && !searchQuery) ? filteredPosts[0] : null;
  const standardPosts = (filteredPosts.length > 1 && !searchQuery) ? filteredPosts.slice(1) : (searchQuery ? filteredPosts : []);`
);

// 4. Inject Search UI
const searchUI = `
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
`;

content = content.replace(
  /<p className="text-xl text-slate-400 font-light leading-relaxed">[\s\S]*?<\/p>/,
  searchUI
);

// 5. Update header info to add Social Buttons
const oldHeaderInfo = `<div className="flex flex-wrap items-center gap-6 text-xs text-slate-400 font-mono mb-12 pb-8 border-b border-slate-800/60">
                  <span className="flex items-center gap-2"><User size={14} className="text-cyan-500"/> {selectedPost.author}</span>
                  <span className="flex items-center gap-2"><Calendar size={14} className="text-cyan-500"/> {selectedPost.date}</span>
                  {selectedPost.readTime && (
                    <span className="flex items-center gap-2"><Clock size={14} className="text-cyan-500"/> {selectedPost.readTime}</span>
                  )}
                </div>`;

const newHeaderInfo = `<div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12 pb-8 border-b border-slate-800/60">
                  <div className="flex flex-wrap items-center gap-6 text-xs text-slate-400 font-mono">
                    <span className="flex items-center gap-2"><User size={14} className="text-cyan-500"/> {selectedPost.author}</span>
                    <span className="flex items-center gap-2"><Calendar size={14} className="text-cyan-500"/> {selectedPost.date}</span>
                    {selectedPost.readTime && (
                      <span className="flex items-center gap-2"><Clock size={14} className="text-cyan-500"/> {selectedPost.readTime}</span>
                    )}
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-slate-500 font-mono mr-2">SHARE:</span>
                    <a href={\`https://www.linkedin.com/sharing/share-offsite/?url=https://www.oakivo.com/insights\`} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-[#0077b5] hover:text-white transition-colors">
                      <Linkedin size={14} />
                    </a>
                    <a href={\`https://twitter.com/intent/tweet?url=https://www.oakivo.com/insights&text=Check out this research: \${selectedPost.title}\`} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-[#1DA1F2] hover:text-white transition-colors">
                      <Twitter size={14} />
                    </a>
                  </div>
                </div>`;

content = content.replace(oldHeaderInfo, newHeaderInfo);

// 6. Add Related Insights at the bottom
const oldFooter = `<div className="mt-16 pt-8 border-t border-slate-800/60 text-center">
                  <p className="text-slate-500 font-mono text-xs">END OF REPORT</p>
                </div>`;

const newFooter = `<div className="mt-16 pt-8 border-t border-slate-800/60 text-center mb-12">
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
                      >
                        <div className="text-[10px] font-mono text-cyan-500 mb-3 uppercase tracking-wider">{relatedPost.category}</div>
                        <h4 className="text-slate-100 font-bold leading-snug mb-3 group-hover:text-cyan-400 transition-colors flex-grow">{relatedPost.title}</h4>
                        <div className="flex items-center gap-2 text-xs text-slate-500 font-mono mt-auto pt-4">
                          <Clock size={12} /> {relatedPost.readTime}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>`;

content = content.replace(oldFooter, newFooter);

fs.writeFileSync('pages/Insights.tsx', content);
console.log("Updated Insights.tsx");
