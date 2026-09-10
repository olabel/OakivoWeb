const fs = require('fs');
let content = fs.readFileSync('pages/Insights.tsx', 'utf8');

const loaderTarget = `{isLoading ? (
            <div className="flex items-center justify-center py-24">
              <div className="w-12 h-12 border-4 border-slate-800 border-t-cyan-500 rounded-full animate-spin"></div>
            </div>
          ) :`;

const skeletonReplacement = `{isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map(i => (
                <div key={i} className="flex flex-col bg-slate-900/40 rounded-3xl overflow-hidden border border-slate-800/60 animate-pulse">
                  <div className="h-56 bg-slate-800"></div>
                  <div className="p-8 flex flex-col flex-grow">
                    <div className="w-24 h-4 bg-slate-800 rounded mb-4"></div>
                    <div className="w-full h-6 bg-slate-800 rounded mb-2"></div>
                    <div className="w-4/5 h-6 bg-slate-800 rounded mb-6"></div>
                    <div className="space-y-2 mb-8 flex-grow">
                      <div className="w-full h-3 bg-slate-800 rounded"></div>
                      <div className="w-full h-3 bg-slate-800 rounded"></div>
                      <div className="w-2/3 h-3 bg-slate-800 rounded"></div>
                    </div>
                    <div className="w-32 h-4 bg-slate-800 rounded"></div>
                  </div>
                </div>
              ))}
            </div>
          ) :`;

content = content.replace(loaderTarget, skeletonReplacement);
fs.writeFileSync('pages/Insights.tsx', content);
