import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, Shield, Terminal, Key, Activity, X } from 'lucide-react';
import { useLanguage, translations } from '../context/LanguageContext';
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
  const { language } = useLanguage();
  const solData = translations[language].solutions_in_action;
  
  const localizedVideos = videos.map((vid, i) => ({
    ...vid,
    title: solData.videos[i].title,
    description: solData.videos[i].description
  }));


  return (
    <section id="solutions-in-action" className="py-24 px-6 bg-slate-950 border-t border-slate-900/80 relative">
      <div className="container mx-auto max-w-7xl relative z-10">
        
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-mono font-bold tracking-widest text-cyan-500 uppercase bg-cyan-500/10 px-4 py-2 rounded-full border border-cyan-500/20 mb-6">
            <Play size={14} /> {solData.badge}
          </div>
          <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-6">
            {solData.title}
          </h2>
          <p className="text-slate-400 font-light max-w-2xl mx-auto text-lg">
            {solData.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {localizedVideos.map((vid, idx) => (
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
                  alt={`${vid.title} - Oakivo DevSecOps Video Demonstration`}
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
                {/* Animated Simulation Environment */}
                <div className="absolute inset-0 flex flex-col font-mono">
                  {/* Top Bar */}
                  <div className="h-10 bg-slate-900 border-b border-slate-800 flex items-center px-4 gap-2">
                    <div className="flex gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-slate-700"></div>
                      <div className="w-3 h-3 rounded-full bg-slate-700"></div>
                      <div className="w-3 h-3 rounded-full bg-slate-700"></div>
                    </div>
                    <div className="ml-4 text-xs text-slate-500 flex items-center gap-2">
                      <Terminal size={12}/> oakivo-security-pipeline v2.4.1
                    </div>
                  </div>
                  
                  {/* Terminal Body */}
                  <div className="flex-1 p-6 overflow-hidden relative bg-[#0a0f18]">
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="text-xs md:text-sm space-y-3"
                    >
                      <div className="text-slate-400">root@oakivo-sec:~# ./analyze_posture.sh --target prod-cluster</div>
                      
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }} className="text-cyan-400">
                        [INFO] Initiating deep packet inspection and configuration audit...
                      </motion.div>
                      
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }} className="flex items-center gap-2 text-emerald-400">
                        <Shield size={14}/> <span>Verified: Identity Access Management policies are intact.</span>
                      </motion.div>
                      
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.2 }} className="flex items-center gap-2 text-emerald-400">
                        <Key size={14}/> <span>Verified: No lateral movement detected in namespace 'payment-processing'.</span>
                      </motion.div>

                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.9 }} className="flex items-center gap-2 text-amber-400 mt-4">
                        <Activity size={14}/> <span>[WARNING] Anomalous outbound traffic detected in S3 bucket 'assets-public'.</span>
                      </motion.div>
                      
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 3.5 }} className="text-red-400 font-bold border-l-2 border-red-500 pl-3 ml-1">
                        [CRITICAL] Misconfigured ACL allowing public read/write access.
                      </motion.div>

                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 4.5 }} className="text-cyan-400 mt-4">
                        [ACTION] Executing zero-trust remediation protocol...
                      </motion.div>
                      
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 5.5 }} className="text-slate-300">
                        applying terraform manifest ./remediation/s3-acl-lockdown.tf...
                      </motion.div>

                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 6.5 }} className="text-emerald-400 font-bold mt-4 flex items-center gap-2">
                        <Shield size={16}/> [SUCCESS] Threat neutralized. Access control locked down.
                      </motion.div>
                      
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 7.5, repeat: Infinity, repeatType: "reverse", duration: 0.8 }} className="w-2 h-4 bg-slate-400 inline-block align-middle mt-4"></motion.div>

                    </motion.div>
                    
                    {/* Visual Overlay elements */}
                    <div className="absolute right-8 top-8 opacity-20 pointer-events-none">
                       {activeVideo === 'cspm' && <Shield size={120} className="text-cyan-500" />}
                       {activeVideo === 'devsecops' && <Terminal size={120} className="text-emerald-500" />}
                       {activeVideo === 'iam' && <Key size={120} className="text-purple-500" />}
                       {activeVideo === 'sre' && <Activity size={120} className="text-amber-500" />}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="p-6 bg-slate-900 flex items-center justify-between border-t border-slate-800">
                <div>
                  <h4 className="text-white font-bold font-display text-lg">{localizedVideos.find(v => v.id === activeVideo)?.title} {solData.demo}</h4>
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
