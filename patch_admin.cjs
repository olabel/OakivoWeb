const fs = require('fs');
let content = fs.readFileSync('pages/AdminPortal.tsx', 'utf8');

if (!content.includes('insightsData') && !content.includes('Insights Manager')) {
  content = content.replace(
    "const [activeTab, setActiveTab] = useState<'submissions' | 'analytics' | 'seo'>('submissions');",
    "const [activeTab, setActiveTab] = useState<'submissions' | 'analytics' | 'seo' | 'insights'>('submissions');"
  );

  const tabButton = `
              <button 
                onClick={() => setActiveTab('insights')}
                className={\`flex flex-col items-center justify-center p-6 rounded-2xl border transition-all duration-300 \${
                  activeTab === 'insights' 
                  ? 'bg-cyan-500/10 border-cyan-500/50 text-cyan-400 shadow-[0_0_20px_rgba(0,240,255,0.1)]' 
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                }\`}
              >
                <Terminal size={24} className="mb-3" />
                <span className="font-mono text-sm">Insights Content</span>
              </button>
            </div>
  `;

  content = content.replace(
    /<\/button>\s*<\/div>/,
    "</button>\n" + tabButton
  );

  const newTabContent = `
            {activeTab === 'insights' && (
              <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl">
                <div className="flex justify-between items-center mb-6 border-b border-slate-800 pb-4">
                  <div>
                    <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                      <Terminal className="text-cyan-400" /> Content Editor
                    </h2>
                    <p className="text-slate-400 mt-2 font-mono text-sm">Create and publish security insights to /insights.</p>
                  </div>
                  <button onClick={() => window.open('/insights', '_blank')} className="px-4 py-2 bg-slate-800 text-white rounded-lg hover:bg-slate-700 font-mono text-xs">
                    View Live Page
                  </button>
                </div>
                
                <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800">
                  <div className="flex items-start gap-4">
                    <AlertCircle className="text-cyan-500 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="text-white font-bold mb-2">How to update content:</h3>
                      <p className="text-slate-400 text-sm leading-relaxed mb-4">
                        We have designed a headless structure for your articles. To add or modify articles with rich Markdown formatting, simply update the JSON array in <code className="text-cyan-400">content/insights.ts</code>. The application automatically renders this on the frontend into a world-class magazine layout.
                      </p>
                      <p className="text-slate-400 text-sm leading-relaxed mb-4">
                        If you prefer to push articles via the database, you can use the Firebase Firestore console to add documents to the <code className="text-cyan-400">insights</code> collection. The frontend is already wired to pull from Firebase first, and fall back to the static file if none exist!
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
  `;

  content = content.replace(
    "{activeTab === 'seo' && (",
    newTabContent + "\n            {activeTab === 'seo' && ("
  );

  fs.writeFileSync('pages/AdminPortal.tsx', content);
  console.log("Patched AdminPortal with Insights tab");
}
