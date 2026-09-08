const fs = require('fs');

let content = fs.readFileSync('pages/Insights.tsx', 'utf8');

// 1. Add scroll progress state and handler
const stateReplacement = `const [selectedPost, setSelectedPost] = useState<InsightPost | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [scrollProgress, setScrollProgress] = useState(0);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    const progress = (scrollTop / (scrollHeight - clientHeight)) * 100;
    setScrollProgress(progress);
  };
  
  // Reset scroll progress when post changes
  useEffect(() => {
    if (selectedPost) {
      setScrollProgress(0);
    }
  }, [selectedPost]);`;

content = content.replace(
  "const [selectedPost, setSelectedPost] = useState<InsightPost | null>(null);\n  const [searchQuery, setSearchQuery] = useState('');",
  stateReplacement
);

// 2. Add ARIA attributes to modal container
content = content.replace(
  `className="bg-[#0B0F17] border border-slate-800/60 w-full max-w-4xl max-h-[90vh] rounded-3xl overflow-hidden flex flex-col shadow-2xl"
              onClick={e => e.stopPropagation()}`,
  `className="bg-[#0B0F17] border border-slate-800/60 w-full max-w-4xl max-h-[90vh] rounded-3xl overflow-hidden flex flex-col shadow-2xl relative"
              onClick={e => e.stopPropagation()}
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-title"`
);

// 3. Add Progress bar and accessibility to header/close button
content = content.replace(
  `<button 
                  onClick={() => setSelectedPost(null)}
                  className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
                >`,
  `<button 
                  onClick={() => setSelectedPost(null)}
                  className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
                  aria-label="Close insight article"
                >`
);

content = content.replace(
  `{/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-slate-800/60 bg-slate-900/80">`,
  `{/* Reading Progress Bar */}
              <div className="w-full h-1 bg-slate-800 z-50">
                <div 
                  className="h-full bg-cyan-500 transition-all duration-150 ease-out"
                  style={{ width: \`\${scrollProgress}%\` }}
                ></div>
              </div>
              
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-slate-800/60 bg-slate-900/80">`
);

// 4. Attach handleScroll to Content Body and add id to title
content = content.replace(
  `<div className="p-8 md:p-14 overflow-y-auto no-scrollbar relative">`,
  `<div className="p-8 md:p-14 overflow-y-auto no-scrollbar relative" onScroll={handleScroll}>`
);

content = content.replace(
  `<h1 className="text-3xl md:text-5xl font-display font-bold tracking-tight mb-8 text-white leading-[1.1]">
                  {selectedPost.title}
                </h1>`,
  `<h1 id="modal-title" className="text-3xl md:text-5xl font-display font-bold tracking-tight mb-8 text-white leading-[1.1]">
                  {selectedPost.title}
                </h1>`
);

// 5. Add Key Takeaways component before Markdown content
const keyTakeawaysHtml = `
                {selectedPost.keyTakeaways && selectedPost.keyTakeaways.length > 0 && (
                  <div className="mb-12 bg-slate-900/50 border-l-4 border-cyan-500 rounded-r-2xl p-8" aria-label="Key Takeaways">
                    <h2 className="text-xl font-display font-bold text-white mb-6 uppercase tracking-wider text-sm">Key Takeaways</h2>
                    <ul className="space-y-4">
                      {selectedPost.keyTakeaways.map((takeaway, idx) => (
                        <li key={idx} className="flex items-start gap-4 text-slate-300 font-light leading-relaxed">
                          <span className="text-cyan-500 mt-1.5 opacity-60">•</span>
                          <span>{takeaway}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                
                <div className="prose prose-invert prose-cyan max-w-none text-slate-300 leading-loose`;

content = content.replace(
  `<div className="prose prose-invert prose-cyan max-w-none text-slate-300 leading-loose`,
  keyTakeawaysHtml
);

// 6. Update social links aria-labels
content = content.replace(
  `className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-[#0077b5] hover:text-white transition-colors"`,
  `className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-[#0077b5] hover:text-white transition-colors" aria-label="Share on LinkedIn"`
);

content = content.replace(
  `className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-[#1DA1F2] hover:text-white transition-colors"`,
  `className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-[#1DA1F2] hover:text-white transition-colors" aria-label="Share on X (Twitter)"`
);

// Make sure other interactable elements have aria-labels in grid
content = content.replace(
  `<button \n                  onClick={() => setSelectedPost(null)}\n                  className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-colors"\n                  aria-label="Close insight article"`,
  `<button \n                  onClick={() => setSelectedPost(null)}\n                  className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-colors"\n                  aria-label="Close insight article"`
);

fs.writeFileSync('pages/Insights.tsx', content);
console.log("Updated Insights.tsx with Accessibility, Progress bar, and Key Takeaways");
