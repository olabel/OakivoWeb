const fs = require('fs');
let content = fs.readFileSync('pages/Insights.tsx', 'utf8');

// Add calculateReadingTime helper
const helper = `const calculateReadingTime = (content: string): string => {
  if (!content) return "5 min read";
  const wordsPerMinute = 238;
  const wordCount = content.split(/\\s+/).length;
  const minutes = Math.ceil(wordCount / wordsPerMinute);
  return \`\${minutes} MIN READ\`;
};

const Insights: React.FC = () => {`;
content = content.replace('const Insights: React.FC = () => {', helper);

// Replace featuredPost readTime
content = content.replace(
  `{featuredPost.readTime && (
                          <div className="flex items-center gap-2">
                            <Clock size={14} />
                            {featuredPost.readTime}
                          </div>
                        )}`,
  `<div className="flex items-center gap-1.5 bg-slate-800/80 text-cyan-400 px-2.5 py-1 rounded-md text-[10px] font-bold tracking-widest uppercase">
                            <Clock size={12} />
                            {featuredPost.readTime || calculateReadingTime(featuredPost.content)}
                          </div>`
);

// Replace selectedPost readTime
content = content.replace(
  `{selectedPost.readTime && (
                      <span className="flex items-center gap-2"><Clock size={14} className="text-cyan-500"/> {selectedPost.readTime}</span>
                    )}`,
  `<span className="flex items-center gap-1.5 bg-slate-800/80 text-cyan-400 px-2.5 py-1 rounded-md text-[10px] font-bold tracking-widest uppercase"><Clock size={12} /> {selectedPost.readTime || calculateReadingTime(selectedPost.content)}</span>`
);

// Replace relatedPost readTime
content = content.replace(
  `<Clock size={12} /> {relatedPost.readTime}`,
  `<Clock size={12} /> {relatedPost.readTime || calculateReadingTime(relatedPost.content)}`
);

// In standard posts, add the badge next to the date
content = content.replace(
  `<span className="flex items-center gap-1.5"><Calendar size={14} /> {post.date}</span>`,
  `<span className="flex items-center gap-1.5"><Calendar size={14} /> {post.date}</span>
                          <span className="flex items-center gap-1.5 bg-slate-800/80 text-cyan-400 px-2 py-0.5 rounded-md text-[9px] font-bold tracking-widest uppercase"><Clock size={10} /> {post.readTime || calculateReadingTime(post.content)}</span>`
);

fs.writeFileSync('pages/Insights.tsx', content);
console.log("Updated read time badges.");
