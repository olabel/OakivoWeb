const fs = require('fs');
let content = fs.readFileSync('pages/InsightDetail.tsx', 'utf8');

const loaderTarget = `  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center pt-24">
        <div className="w-12 h-12 border-4 border-slate-800 border-t-cyan-500 rounded-full animate-spin"></div>
      </div>
    );
  }`;

const skeletonReplacement = `  if (isLoading) {
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
  }`;

content = content.replace(loaderTarget, skeletonReplacement);
fs.writeFileSync('pages/InsightDetail.tsx', content);
