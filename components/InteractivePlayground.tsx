import React, { useState, useEffect } from 'react';
import { ShieldCheck, ShieldAlert, Activity, Server, Zap, ChevronRight, PlayCircle, Shield, AlertTriangle, CheckCircle, Terminal } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const InteractivePlayground: React.FC = () => {
  const [attackActive, setAttackActive] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);
  const [nodes, setNodes] = useState([
    { id: 1, status: 'healthy', load: 45 },
    { id: 2, status: 'healthy', load: 38 },
    { id: 3, status: 'healthy', load: 52 },
  ]);

  const triggerAttack = () => {
    if (attackActive) return;
    setAttackActive(true);
    setLogs(['[WARN] Unusual traffic spike detected from multiple IPs', '[CRIT] DDoS signature match: UDP Flood']);
    
    setNodes(prev => [
      { ...prev[0], status: 'warning', load: 89 },
      { ...prev[1], status: 'warning', load: 95 },
      { ...prev[2], status: 'critical', load: 99 },
    ]);

    setTimeout(() => {
      setLogs(prev => [...prev, '[INFO] Zero-Trust Enforcer triggered', '[ACTION] Isolating Node 3']);
      setNodes(prev => [
        { ...prev[0], status: 'warning', load: 75 },
        { ...prev[1], status: 'warning', load: 82 },
        { ...prev[2], status: 'isolated', load: 0 },
      ]);
    }, 1500);

    setTimeout(() => {
      setLogs(prev => [...prev, '[INFO] Spinning up overflow cluster in ca-central-1', '[ACTION] Rerouting clean traffic via WAF']);
      setNodes(prev => [
        { ...prev[0], status: 'healthy', load: 55 },
        { ...prev[1], status: 'healthy', load: 60 },
        { ...prev[2], status: 'isolated', load: 0 },
        { id: 4, status: 'healthy', load: 35 },
      ]);
    }, 3000);

    setTimeout(() => {
      setLogs(prev => [...prev, '[SUCCESS] Threat neutralized. SLA maintained 99.99%.']);
      setAttackActive(false);
    }, 4500);
  };

  const resetPlayground = () => {
    setAttackActive(false);
    setLogs([]);
    setNodes([
      { id: 1, status: 'healthy', load: 45 },
      { id: 2, status: 'healthy', load: 38 },
      { id: 3, status: 'healthy', load: 52 },
    ]);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row">
      {/* Controls & Logs */}
      <div className="p-6 md:w-1/3 bg-slate-950/50 border-r border-slate-800 flex flex-col">
        <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
          <Terminal size={18} className="text-cyan-400" /> Live Simulation
        </h3>
        <p className="text-xs text-slate-400 mb-6">
          Toggle a simulated cyber attack to observe our automated Zero-Trust incident remediation in real-time.
        </p>

        <div className="flex gap-3 mb-6">
          <button 
            onClick={triggerAttack} 
            disabled={attackActive}
            className={`flex-1 py-2 rounded-lg flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-wider transition-all ${
              attackActive ? 'bg-slate-800 text-slate-500 cursor-not-allowed' : 'bg-red-500/20 text-red-400 hover:bg-red-500/30 border border-red-500/50'
            }`}
          >
            {attackActive ? <Zap size={14} className="animate-pulse" /> : <ShieldAlert size={14} />}
            {attackActive ? 'Defending...' : 'Simulate Attack'}
          </button>
          
          <button 
            onClick={resetPlayground}
            disabled={attackActive}
            className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold transition-all disabled:opacity-50"
          >
            Reset
          </button>
        </div>

        <div className="flex-1 bg-black/50 rounded-xl p-4 border border-white/5 font-mono text-[10px] sm:text-xs overflow-y-auto h-48 md:h-auto">
          <div className="space-y-2">
            <div className="text-slate-500">Waiting for simulation trigger...</div>
            <AnimatePresence>
              {logs.map((log, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={`
                    ${log.includes('[CRIT]') || log.includes('[WARN]') ? 'text-red-400' : ''}
                    ${log.includes('[ACTION]') ? 'text-yellow-400' : ''}
                    ${log.includes('[SUCCESS]') ? 'text-emerald-400' : ''}
                    ${log.includes('[INFO]') ? 'text-cyan-400' : ''}
                  `}
                >
                  {log}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Visualization */}
      <div className="p-6 md:w-2/3 flex flex-col justify-center bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-900 to-slate-950">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full max-w-lg mx-auto">
          <AnimatePresence>
            {nodes.map(node => (
              <motion.div 
                key={node.id}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className={`relative p-4 rounded-xl border flex flex-col items-center justify-center gap-3 transition-colors duration-500
                  ${node.status === 'healthy' ? 'bg-emerald-500/10 border-emerald-500/30' : ''}
                  ${node.status === 'warning' ? 'bg-yellow-500/10 border-yellow-500/30' : ''}
                  ${node.status === 'critical' ? 'bg-red-500/20 border-red-500/50 animate-pulse' : ''}
                  ${node.status === 'isolated' ? 'bg-slate-800/50 border-slate-700 opacity-50' : ''}
                `}
              >
                {node.status === 'healthy' && <Server size={24} className="text-emerald-400" />}
                {node.status === 'warning' && <AlertTriangle size={24} className="text-yellow-400" />}
                {node.status === 'critical' && <ShieldAlert size={24} className="text-red-500" />}
                {node.status === 'isolated' && <Shield size={24} className="text-slate-500" />}
                
                <div className="text-center">
                  <div className="text-xs font-bold text-white">Node {node.id}</div>
                  <div className="text-[10px] text-slate-400 uppercase tracking-widest">{node.status}</div>
                </div>

                <div className="absolute top-2 right-2 text-[10px] font-mono font-bold">
                   <span className={`
                     ${node.load > 90 ? 'text-red-400' : 'text-emerald-400'}
                     ${node.status === 'isolated' ? 'text-slate-500' : ''}
                   `}>
                     {node.load}%
                   </span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default InteractivePlayground;
