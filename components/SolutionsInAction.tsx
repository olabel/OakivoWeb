import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, Shield, Terminal, Key, Activity, X } from 'lucide-react';
import OptimizedImage from './OptimizedImage';

const videos = [
  {
    id: "cspm",
    title: "Cloud Security (CSPM)",
    description: "Watch how our automated posture management instantly detects and remediates a misconfigured S3 bucket in real-time.",
    icon: <Shield size={20} />,
    thumbnail: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=800",
    color: "cyan"
  },
  {
    id: "devsecops",
    title: "DevSecOps Pipelines",
    description: "See Policy-as-Code in action: A terraform deployment is automatically blocked pre-commit due to an exposed IAM role.",
    icon: <Terminal size={20} />,
    thumbnail: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=800",
    color: "emerald"
  },
  {
    id: "iam",
    title: "Zero Trust IAM",
    description: "Experience cryptographic identity verification blocking lateral movement from a compromised endpoint.",
    icon: <Key size={20} />,
    thumbnail: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800",
    color: "purple"
  },
  {
    id: "sre",
    title: "SRE Threat Remediation",
    description: "Watch our eBPF sensors detect zero-day ransomware behavior and autonomously sever the network connection.",
    icon: <Activity size={20} />,
    thumbnail: "https://images.unsplash.com/photo-1639322537228-f710d846310a?auto=format&fit=crop&q=80&w=800",
    color: "amber"
  }
];

const SolutionsInAction: React.FC = () => {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  return (
    <section id="solutions-in-action" className="py-24 px-6 bg-slate-950 border-t border-slate-900/80 relative">
      <div className="container mx-auto max-w-7xl relative z-10">
        
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-mono font-bold tracking-widest text-cyan-500 uppercase bg-cyan-500/10 px-4 py-2 rounded-full border border-cyan-500/20 mb-6">
            <Play size={14} /> Automation Visualized
          </div>
          <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-6">
            Solutions in <span className="text-cyan-400">Action</span>
          </h2>
          <p className="text-slate-400 font-light max-w-2xl mx-auto text-lg">
            Don't just read about Zero-Trust. Watch our engineering architectures dynamically detect, isolate, and remediate threats in high-fidelity environments.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {videos.map((vid, idx) => (
            <motion.div 
              key={vid.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group cursor-pointer"
              onClick={() => setActiveVideo(vid.id)}
            >
              <div className="relative rounded-2xl overflow-hidden mb-4 border border-slate-800/80 aspect-video shadow-lg">
                <OptimizedImage 
                  src={vid.thumbnail} 
                  alt={vid.title}
                  className="w-full h-full transform group-hover:scale-105 transition-transform duration-700 opacity-60 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-slate-950/40 group-hover:bg-slate-950/20 transition-colors"></div>
                
                {/* Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-14 h-14 rounded-full bg-slate-900/80 backdrop-blur-md border border-slate-700/50 flex items-center justify-center group-hover:bg-cyan-500 group-hover:border-cyan-400 transition-all duration-300 transform group-hover:scale-110 shadow-xl">
                    <Play className="text-white ml-1" size={24} fill="currentColor" />
                  </div>
                </div>
                
                <div className="absolute bottom-3 left-3 bg-slate-900/90 backdrop-blur px-2.5 py-1 rounded text-[10px] font-mono text-slate-300 font-bold tracking-wider">
                  01:45
                </div>
              </div>
              
              <div className="flex items-center gap-2 mb-2">
                <div className={`text-${vid.color}-400`}>
                  {vid.icon}
                </div>
                <h3 className="text-lg font-display font-bold text-white group-hover:text-cyan-400 transition-colors">{vid.title}</h3>
              </div>
              <p className="text-sm text-slate-400 font-light leading-relaxed line-clamp-2">
                {vid.description}
              </p>
            </motion.div>
          ))}
        </div>

      </div>

      {/* Video Modal */}
      <AnimatePresence>
        {activeVideo && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-xl"
            onClick={() => setActiveVideo(null)}
          >
            <motion.div 
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="relative w-full max-w-5xl bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl"
              onClick={e => e.stopPropagation()}
            >
              <button 
                onClick={() => setActiveVideo(null)}
                className="absolute top-4 right-4 z-10 w-10 h-10 bg-slate-950/50 hover:bg-cyan-500 rounded-full flex items-center justify-center text-white transition-colors"
              >
                <X size={20} />
              </button>
              
              <div className="aspect-video bg-slate-950 relative flex items-center justify-center">
                {/* Simulated Video Player */}
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
                </div>
              </div>
              
              <div className="p-6 bg-slate-900 flex items-center justify-between border-t border-slate-800">
                <div>
                  <h4 className="text-white font-bold font-display text-lg">{videos.find(v => v.id === activeVideo)?.title} Architecture Demo</h4>
                  <p className="text-slate-400 text-sm">Oakivo Solutions Inc.</p>
                </div>
                <div className="text-xs font-mono font-bold tracking-widest text-cyan-500 bg-cyan-500/10 px-3 py-1.5 rounded-full border border-cyan-500/20">
                  1080p HD
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
};

export default SolutionsInAction;
