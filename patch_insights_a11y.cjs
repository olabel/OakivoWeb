const fs = require('fs');

let content = fs.readFileSync('pages/Insights.tsx', 'utf8');

// 1. Featured Article a11y
content = content.replace(
  `className="mb-16 group cursor-pointer"
                  onClick={() => setSelectedPost(featuredPost)}`,
  `className="mb-16 group cursor-pointer"
                  onClick={() => setSelectedPost(featuredPost)}
                  tabIndex={0}
                  role="button"
                  aria-label={\`Read featured article: \${featuredPost.title}\`}
                  onKeyDown={(e) => { if (e.key === 'Enter') setSelectedPost(featuredPost); }}`
);

// 2. Standard Posts a11y
content = content.replace(
  `className="bg-slate-900/30 border border-slate-800/60 rounded-3xl overflow-hidden hover:border-cyan-500/30 hover:bg-slate-900/60 transition-all duration-300 flex flex-col cursor-pointer group shadow-lg"
                    onClick={() => setSelectedPost(post)}`,
  `className="bg-slate-900/30 border border-slate-800/60 rounded-3xl overflow-hidden hover:border-cyan-500/30 hover:bg-slate-900/60 transition-all duration-300 flex flex-col cursor-pointer group shadow-lg"
                    onClick={() => setSelectedPost(post)}
                    tabIndex={0}
                    role="button"
                    aria-label={\`Read article: \${post.title}\`}
                    onKeyDown={(e) => { if (e.key === 'Enter') setSelectedPost(post); }}`
);

// 3. Related Posts a11y
content = content.replace(
  `className="bg-slate-900/40 border border-slate-800/60 p-6 rounded-2xl cursor-pointer hover:border-cyan-500/30 hover:bg-slate-900/80 transition-all group flex flex-col h-full"
                      >`,
  `className="bg-slate-900/40 border border-slate-800/60 p-6 rounded-2xl cursor-pointer hover:border-cyan-500/30 hover:bg-slate-900/80 transition-all group flex flex-col h-full"
                        tabIndex={0}
                        role="button"
                        aria-label={\`Read related article: \${relatedPost.title}\`}
                        onKeyDown={(e) => { if (e.key === 'Enter') { e.stopPropagation(); setSelectedPost(relatedPost); } }}
                      >`
);

fs.writeFileSync('pages/Insights.tsx', content);
console.log("Added grid a11y");
