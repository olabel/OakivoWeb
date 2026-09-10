const fs = require('fs');
let content = fs.readFileSync('components/SolutionsInAction.tsx', 'utf8');

// Replace the Simulated Video Player block with a real video
const targetBlock = `{/* Simulated Video Player */}
                <OptimizedImage 
                  src={videos.find(v => v.id === activeVideo)?.thumbnail || ""} 
                  alt="Video playing"
                  className="w-full h-full opacity-40"
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
                  <div className="w-20 h-20 bg-cyan-500/20 border border-cyan-500/50 rounded-full flex items-center justify-center mb-6 animate-pulse">
                    <Play className="text-cyan-400 ml-2" size={32} fill="currentColor" />
                  </div>
                  <h3 className="text-2xl font-display font-bold text-white mb-2">Simulated Video Feed</h3>
                  <p className="text-slate-400 font-mono text-sm max-w-md">
                    In a production environment, this modal streams a high-fidelity MP4 demonstrating the automated remediation pipeline.
                  </p>
                </div>
                
                {/* Fake progress bar */}
                <div className="absolute bottom-0 left-0 w-full h-1.5 bg-slate-800">
                  <div className="h-full bg-cyan-500 w-1/3 relative">
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-[0_0_10px_rgba(6,182,212,0.8)]"></div>
                  </div>
                </div>`;

const realVideoBlock = `{/* Real Video Player */}
                <video 
                  className="w-full h-full object-cover"
                  autoPlay 
                  loop 
                  muted 
                  controls 
                  src={activeVideo === 'cspm' ? 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4' : 
                       activeVideo === 'devsecops' ? 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4' : 
                       activeVideo === 'iam' ? 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4' : 
                       'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4'}
                />`;

content = content.replace(targetBlock, realVideoBlock);
fs.writeFileSync('components/SolutionsInAction.tsx', content);
