import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { NavRoute } from '../types';
import SEO from '../components/SEO';
import { 
  ShieldCheck, 
  Activity, 
  Server, 
  Database, 
  Lock, 
  AlertTriangle,
  ArrowRight,
  LogOut,
  Zap,
  Terminal,
  CheckCircle2,
  RefreshCw,
  Cpu,
  GlobeLock,
  Box,
  Fingerprint,
  ShieldAlert,
  Globe
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  RadarChart, PolarGrid, PolarAngleAxis, Radar,
  BarChart, Bar,
  ComposedChart, Line, Legend,
  ScatterChart, Scatter, ZAxis, Cell
} from 'recharts';

// --- Mock Data ---

const pipelineData = [
  { day: 'Mon', deploys: 12, errors: 0 },
  { day: 'Tue', deploys: 28, errors: 1 },
  { day: 'Wed', deploys: 45, errors: 0 },
  { day: 'Thu', deploys: 32, errors: 0 },
  { day: 'Fri', deploys: 56, errors: 2 },
  { day: 'Sat', deploys: 18, errors: 0 },
  { day: 'Sun', deploys: 22, errors: 0 },
];

const complianceData = [
  { subject: 'IAM', A: 98, fullMark: 100 },
  { subject: 'Network', A: 95, fullMark: 100 },
  { subject: 'Data At Rest', A: 100, fullMark: 100 },
  { subject: 'AppSec', A: 92, fullMark: 100 },
  { subject: 'Logging', A: 99, fullMark: 100 },
  { subject: 'Incident', A: 95, fullMark: 100 },
];

const threatData = [
  { type: 'DDoS Attempts', count: 145 },
  { type: 'Bot Scans', count: 890 },
  { type: 'Malicious Payloads', count: 32 },
  { type: 'Unauthorized Auth', count: 12 },
];

// Vulnerability Burn-Down (SLA)
const vulnerabilitySlaData = [
  { day: 'D-14', discovered: 24, remediated: 12 },
  { day: 'D-10', discovered: 18, remediated: 16 },
  { day: 'D-7', discovered: 32, remediated: 28 },
  { day: 'D-5', discovered: 15, remediated: 22 },
  { day: 'D-3', discovered: 8, remediated: 15 },
  { day: 'D-1', discovered: 4, remediated: 8 },
  { day: 'Today', discovered: 2, remediated: 5 },
];

// Active Global Infrastructure Nodes (Scatter Map Simulation)
const activeNodes = [
  { name: 'ca-central-1 (Montreal)', x: 30, y: 70, latency: 12, status: 'Healthy' },
  { name: 'us-east-1 (N. Virginia)', x: 40, y: 60, latency: 24, status: 'Healthy' },
  { name: 'eu-west-1 (Ireland)', x: 75, y: 65, latency: 85, status: 'Healthy' },
  { name: 'ap-northeast-1 (Tokyo)', x: 140, y: 50, latency: 140, status: 'Warning' },
];

const rawTerminalStrings = [
  '[SYSTEM] Initializing Zero-Trust runtime enforcement...',
  '[AUTH] Validating service-mesh mTLS certificates...',
  '[SUCCESS] Certificates rotated successfully.',
  '[SCAN] Initiating container image analysis on gcr.io/acme/api:v4.2...',
  '[INFO] No critical CVEs found in base image.',
  '[NET] Anomalous traffic detected from 192.168.1.45. Triggering WAF ruleset...',
  '[WARN] DDoS mitigation engaged on edge node (eu-west-1).',
  '[SUCCESS] Attack thwarted. Normalizing traffic patterns.',
  '[INFO] Kubernetes cluster autoscaler scaled up node pool default-pool.',
  '[SYSTEM] CPU utilization stabilized at 45%.'
];

const mockLogs = [
  { id: 1, type: 'success', message: 'Kubernetes cluster scaled automatically', time: 'Just now' },
  { id: 2, type: 'info', message: 'Dependabot PR merged (High Severity patched)', time: '2m ago' },
  { id: 3, type: 'warning', message: 'Rate limit triggered on API Gateway', time: '14m ago' },
  { id: 4, type: 'success', message: 'IAM Roles audited (Zero-Trust verified)', time: '1h ago' },
];

const ClientPortalDemo: React.FC = () => {
  const navigate = useNavigate();
  const [logs, setLogs] = useState(mockLogs);
  const [pulse, setPulse] = useState(false);
  const [terminalLines, setTerminalLines] = useState<string[]>([rawTerminalStrings[0]]);
  const terminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Simulate incoming logs for Activity Feed
    const interval = setInterval(() => {
      setPulse(true);
      setTimeout(() => setPulse(false), 500);

      const newLog = {
        id: Date.now(),
        type: Math.random() > 0.8 ? 'warning' : 'success',
        message: 'Automated CI/CD pipeline check passed (Zero Drift)',
        time: 'Just now'
      };
      
      setLogs(prev => [newLog, ...prev.slice(0, 4)]);
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Simulate terminal typing
    let lineIndex = 1;
    const terminalInterval = setInterval(() => {
      if (lineIndex < rawTerminalStrings.length) {
        setTerminalLines(prev => [...prev, rawTerminalStrings[lineIndex]]);
        lineIndex++;
      } else {
        // Loop it with a fake timestamp
        const time = new Date().toLocaleTimeString();
        setTerminalLines(prev => [...prev.slice(1), `[INFO] ${time} - Background telemetry sync complete.`]);
      }
      
      // Auto-scroll
      if (terminalRef.current) {
        terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
      }
    }, 3500);

    return () => clearInterval(terminalInterval);
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-cyan-500/30">
      <SEO 
        title="Interactive Client Portal Demo | Oakivo Solutions"
        description="Experience the Oakivo Client Dashboard. View simulated live compliance scores, vulnerability scans, and CI/CD pipeline deployments."
        canonical="/client-portal-demo"
        keywords="Oakivo Client Portal, DevSecOps Dashboard, SOC 2 Monitoring, Pipeline Telemetry"
      />

      {/* Demo Mode Banner */}
      <div className="bg-gradient-to-r from-cyan-600 to-blue-600 text-white text-xs font-semibold py-2 px-4 flex justify-between items-center sticky top-0 z-50 shadow-lg">
        <div className="flex items-center gap-2">
          <GlobeLock size={14} className="animate-pulse" />
          <span>Interactive Demo Mode: Read-Only Access</span>
        </div>
        <button 
          onClick={() => navigate(NavRoute.HOME)}
          className="flex items-center gap-1 hover:text-cyan-100 transition-colors"
        >
          Exit Demo <LogOut size={14} />
        </button>
      </div>

      <div className="flex flex-col lg:flex-row min-h-[calc(100vh-32px)]">
        
        {/* Sidebar */}
        <div className="w-full lg:w-64 bg-slate-900 border-r border-slate-800 p-6 flex flex-col hidden lg:flex">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-8 h-8 bg-cyan-500/20 border border-cyan-500/50 rounded flex items-center justify-center">
              <Box size={18} className="text-cyan-400" />
            </div>
            <div>
              <div className="font-bold text-slate-100 tracking-tight leading-none mb-1">Acme Corp</div>
              <div className="text-[10px] text-cyan-400 font-mono tracking-wider">PRODUCTION ENV</div>
            </div>
          </div>

          <div className="space-y-1 flex-1">
            <div className="text-xs font-semibold text-slate-500 mb-4 tracking-wider uppercase">Dashboards</div>
            {['Overview', 'Compliance (SOC 2)', 'Pipelines', 'Active Threats', 'FinOps & Cost'].map((item, i) => (
              <button 
                key={item} 
                className={`w-full text-left px-3 py-2.5 rounded-md text-sm transition-colors flex items-center gap-3 ${
                  i === 0 ? 'bg-cyan-500/10 text-cyan-400 font-medium' : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                }`}
              >
                {i === 0 && <Activity size={16} />}
                {i === 1 && <ShieldCheck size={16} />}
                {i === 2 && <Terminal size={16} />}
                {i === 3 && <ShieldAlert size={16} />}
                {i === 4 && <Database size={16} />}
                {item}
              </button>
            ))}
          </div>

          <div className="pt-6 border-t border-slate-800 mt-auto">
            <button 
              onClick={() => navigate(NavRoute.BOOKING)}
              className="w-full bg-slate-100 hover:bg-white text-slate-900 py-3 rounded-md text-sm font-semibold transition-all flex items-center justify-center gap-2"
            >
              Get Your Own Portal
              <ArrowRight size={16} />
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-4 lg:p-8 overflow-y-auto bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-fixed">
          
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
            <div>
              <h1 className="text-2xl font-bold text-white mb-1">Infrastructure Overview</h1>
              <p className="text-sm text-slate-400">Real-time telemetry and compliance status across all connected clusters.</p>
            </div>
            
            <div className="flex items-center gap-3 bg-slate-900 border border-slate-800 px-4 py-2 rounded-full shadow-inner">
              <div className={`w-2.5 h-2.5 rounded-full ${pulse ? 'bg-cyan-300' : 'bg-emerald-500'}`}></div>
              <span className="text-sm font-medium text-emerald-400">System Secure</span>
              <span className="text-xs text-slate-500 border-l border-slate-700 pl-3 ml-1">99.99% Uptime</span>
            </div>
          </div>

          {/* Metric Cards (Top Row) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-6">
            {[
              { label: 'Overall Security Score', value: '98/100', icon: ShieldCheck, color: 'text-emerald-400', bg: 'bg-emerald-400/10' },
              { label: 'Compliance Readiness', value: '100%', icon: CheckCircle2, color: 'text-cyan-400', bg: 'bg-cyan-400/10' },
              { label: 'Blocked Threats (24h)', value: '1,067', icon: Lock, color: 'text-indigo-400', bg: 'bg-indigo-400/10' },
              { label: 'Cloud Resource Health', value: 'Optimal', icon: Cpu, color: 'text-amber-400', bg: 'bg-amber-400/10' },
            ].map((metric, i) => (
              <div key={i} className="bg-slate-900/80 backdrop-blur-sm border border-slate-800 rounded-xl p-5 shadow-sm hover:border-slate-700 transition-colors">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-10 h-10 rounded-lg ${metric.bg} flex items-center justify-center`}>
                    <metric.icon size={20} className={metric.color} />
                  </div>
                </div>
                <div className="text-3xl font-bold text-white mb-1">{metric.value}</div>
                <div className="text-xs font-medium text-slate-400 uppercase tracking-wider">{metric.label}</div>
              </div>
            ))}
          </div>

          {/* Complex Visualizations Row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            
            {/* Vulnerability Burn-Down (Composed Chart) */}
            <div className="lg:col-span-2 bg-slate-900/80 backdrop-blur-sm border border-slate-800 rounded-xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-bold text-white">Vulnerability SLA Burn-Down</h3>
                  <p className="text-xs text-slate-400">Tracking Discovered vs. Remediated CVEs (14 Days)</p>
                </div>
                <button className="text-slate-400 hover:text-white transition-colors">
                  <RefreshCw size={16} />
                </button>
              </div>
              <div className="h-[280px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart data={vulnerabilitySlaData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" />
                    <XAxis dataKey="day" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '8px', color: '#f8fafc' }}
                      itemStyle={{ color: '#06b6d4' }}
                    />
                    <Legend wrapperStyle={{ fontSize: '12px' }} />
                    <Bar dataKey="discovered" name="Newly Discovered" barSize={20} fill="#6366f1" radius={[4, 4, 0, 0]} />
                    <Line type="monotone" dataKey="remediated" name="Remediated / Patched" stroke="#10b981" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Global Active Nodes (Scatter) */}
            <div className="bg-slate-900/80 backdrop-blur-sm border border-slate-800 rounded-xl p-6 shadow-sm flex flex-col">
              <div className="mb-4">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Globe size={18} className="text-indigo-400" /> Infrastructure Nodes
                </h3>
                <p className="text-xs text-slate-400">Global Cluster Health & Latency</p>
              </div>
              
              <div className="flex-1 h-[200px] w-full relative">
                {/* Minimalist Grid overlay to represent map */}
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20 pointer-events-none"></div>
                <ResponsiveContainer width="100%" height="100%">
                  <ScatterChart margin={{ top: 10, right: 10, left: 10, bottom: 10 }}>
                    <XAxis type="number" dataKey="x" name="Longitude" hide domain={[0, 160]} />
                    <YAxis type="number" dataKey="y" name="Latitude" hide domain={[0, 100]} />
                    <ZAxis type="number" dataKey="latency" range={[50, 400]} name="Latency (ms)" />
                    <Tooltip 
                      cursor={{strokeDasharray: '3 3'}}
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          const data = payload[0].payload;
                          return (
                            <div className="bg-slate-900 border border-slate-800 p-3 rounded-lg shadow-xl">
                              <p className="text-sm font-bold text-white mb-1">{data.name}</p>
                              <p className="text-xs text-slate-300">Latency: <span className="text-cyan-400">{data.latency}ms</span></p>
                              <p className="text-xs text-slate-300">Status: <span className={data.status === 'Healthy' ? 'text-emerald-400' : 'text-amber-400'}>{data.status}</span></p>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <Scatter name="Nodes" data={activeNodes} fill="#0ea5e9">
                      {activeNodes.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.status === 'Healthy' ? '#10b981' : '#f59e0b'} />
                      ))}
                    </Scatter>
                  </ScatterChart>
                </ResponsiveContainer>
              </div>
              
              <div className="mt-4 pt-4 border-t border-slate-800/50 flex justify-between text-xs text-slate-400">
                <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-emerald-500"></div> Healthy (3)</span>
                <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-amber-500"></div> Degraded (1)</span>
              </div>
            </div>
          </div>

          {/* Bottom Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Live Terminal Log Viewer */}
            <div className="bg-slate-900/80 backdrop-blur-sm border border-slate-800 rounded-xl p-6 shadow-sm flex flex-col h-[320px]">
              <div className="flex items-center justify-between mb-4 pb-4 border-b border-slate-800/50">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Terminal size={18} className="text-cyan-400" /> Runtime Audit Logs
                </h3>
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-rose-500"></div>
                  <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                  <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                </div>
              </div>
              
              <div 
                ref={terminalRef}
                className="flex-1 overflow-y-auto font-mono text-xs sm:text-sm bg-black/40 p-4 rounded-lg border border-slate-800/80 custom-scrollbar"
              >
                {terminalLines.map((line, idx) => (
                  <div key={idx} className="mb-2">
                    <span className="text-slate-500 mr-2">{'>'}</span>
                    <span className={
                      line.includes('[SUCCESS]') ? 'text-emerald-400' :
                      line.includes('[WARN]') ? 'text-amber-400' :
                      line.includes('[NET]') ? 'text-rose-400' :
                      'text-cyan-300'
                    }>{line}</span>
                  </div>
                ))}
                <div className="animate-pulse inline-block w-2 h-4 bg-cyan-400 mt-2"></div>
              </div>
            </div>

            {/* Blocked Threats (Bar Chart) */}
            <div className="bg-slate-900/80 backdrop-blur-sm border border-slate-800 rounded-xl p-6 shadow-sm flex flex-col h-[320px]">
              <h3 className="text-lg font-bold text-white mb-2">Edge Threat Mitigation</h3>
              <p className="text-xs text-slate-400 mb-6">WAF interventions over the last 24 hours</p>
              
              <div className="flex-1 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={threatData} layout="vertical" margin={{ top: 0, right: 20, left: 20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#334155" />
                    <XAxis type="number" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis dataKey="type" type="category" stroke="#94a3b8" fontSize={11} width={120} tickLine={false} axisLine={false} />
                    <Tooltip 
                      cursor={{fill: '#1e293b'}}
                      contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '8px' }}
                    />
                    <Bar dataKey="count" fill="#6366f1" radius={[0, 4, 4, 0]} barSize={24} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
            
          </div>

          {/* CTA Panel */}
          <div className="mt-8 bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700 rounded-2xl p-8 text-center relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 p-12 opacity-10 pointer-events-none">
              <ShieldAlert size={200} className="text-cyan-500" />
            </div>
            <div className="relative z-10 max-w-2xl mx-auto">
              <h2 className="text-2xl font-bold text-white mb-3">Want this level of visibility into your own infrastructure?</h2>
              <p className="text-slate-400 mb-6 font-light">Oakivo builds bespoke DevSecOps pipelines and automated compliance dashboards for Atlantic Canadian enterprises. Stop flying blind.</p>
              <button 
                onClick={() => navigate(NavRoute.BOOKING)}
                className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 px-8 py-3 rounded-md font-semibold transition-colors inline-flex items-center gap-2"
              >
                Book an Architectural Review
                <ArrowRight size={18} />
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ClientPortalDemo;

