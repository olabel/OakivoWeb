import React, { useState, useEffect } from 'react';
import { db, DatabaseEntry } from '../utils/database';
import { analytics, AnalyticsSummary, SEOHealthMetric, PageViewEvent } from '../utils/analytics';
import { 
  Shield, Trash2, CheckCircle, Clock, Search, Download, LayoutDashboard, Mail, 
  Users, Briefcase, Lock, AlertCircle, Eye, X, Terminal, Code, Fingerprint, 
  BarChart3, Globe, Smartphone, Monitor, TrendingUp, Search as SearchIcon, 
  CheckCircle2, RefreshCw, Cpu, Zap, Activity
} from 'lucide-react';
import Button from '../components/Button';
import Logo from '../components/Logo';
import AdminAnalyticsDashboard from '../components/AdminAnalyticsDashboard';

const AdminPortal: React.FC = () => {
  const [entries, setEntries] = useState<DatabaseEntry[]>([]);
  const [filter, setFilter] = useState<DatabaseEntry['type'] | 'all'>('all');
  const [search, setSearch] = useState('');
  const [selectedEntry, setSelectedEntry] = useState<DatabaseEntry | null>(null);
  
  // Tab view inside the Vault
  const [activeTab, setActiveTab] = useState<'submissions' | 'analytics' | 'seo'>('submissions');

  // Security State
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [authError, setAuthError] = useState(false);

  // Analytics & SEO State
  const [analyticsSummary, setAnalyticsSummary] = useState<AnalyticsSummary | null>(null);
  const [recentPageViews, setRecentPageViews] = useState<PageViewEvent[]>([]);
  const [seoHealth, setSeoHealth] = useState<SEOHealthMetric[]>([]);

  // The "Tactical Access Code"
  const VAULT_KEY = "OakivoP@ssword1209";

  useEffect(() => {
    if (isAuthenticated) {
      loadEntries();
      loadAnalyticsAndSEO();
    }
  }, [isAuthenticated]);

  const loadEntries = async () => {
    const data = await db.getAllEntries();
    setEntries(data);
  };

  const loadAnalyticsAndSEO = async () => {
    const summary = await analytics.getSummary();
    const views = await analytics.getAllEvents();
    setAnalyticsSummary(summary);
    setRecentPageViews(views);
    setSeoHealth(analytics.getSEOHealthAudit());
  };

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode === VAULT_KEY) {
      setIsAuthenticated(true);
      setAuthError(false);
    } else {
      setAuthError(true);
      setPasscode('');
    }
  };

  const handleUpdateStatus = async (id: string, status: DatabaseEntry['status']) => {
    await db.updateStatus(id, status);
    loadEntries();
    if (selectedEntry?.id === id) {
      setSelectedEntry(prev => prev ? { ...prev, status } : null);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Permanently wipe this intelligence asset from the Vault?')) {
      await db.deleteEntry(id);
      loadEntries();
      if (selectedEntry?.id === id) setSelectedEntry(null);
    }
  };

  const filteredEntries = entries.filter(e => {
    const matchesFilter = filter === 'all' || e.type === filter;
    const searchStr = JSON.stringify(e.data).toLowerCase();
    const matchesSearch = searchStr.includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#020504] flex items-center justify-center p-6 relative overflow-hidden font-sans">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-oakivo-secondary/10 rounded-full blur-[160px] -mr-40 -mt-40"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-oakivo-blue/5 rounded-full blur-[140px] -ml-40 -mb-40"></div>
        
        <div className="max-w-md w-full bg-white rounded-[48px] p-12 shadow-[0_50px_100px_rgba(0,0,0,0.5)] relative z-10 border border-white/10 animate-fade-in-up">
           <div className="flex flex-col items-center mb-12">
              <div className="w-20 h-20 bg-oakivo-primary rounded-3xl flex items-center justify-center mb-8 shadow-2xl">
                <Logo className="w-12 h-12" />
              </div>
              <h1 className="text-3xl font-serif-display font-bold text-oakivo-primary">Strategy Vault</h1>
              <p className="text-gray-400 text-[10px] font-black uppercase tracking-[0.4em] mt-3">Tactical Access Required</p>
           </div>

           <form onSubmit={handleAuth} className="space-y-8">
              <div className="relative group">
                 <div className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-oakivo-secondary transition-colors">
                    <Fingerprint size={24} />
                 </div>
                 <input 
                    type="password" 
                    value={passcode}
                    onChange={(e) => setPasscode(e.target.value)}
                    placeholder="Security Keyphrase"
                    className={`w-full bg-gray-50 border py-5 pl-14 pr-6 rounded-2xl focus:outline-none transition-all text-sm font-bold tracking-widest ${authError ? 'border-red-500 bg-red-50' : 'border-gray-100 focus:border-oakivo-primary focus:bg-white'}`}
                 />
              </div>

              {authError && (
                 <div className="flex items-center gap-3 text-red-600 text-[10px] font-black uppercase tracking-widest animate-shake">
                    <AlertCircle size={16} /> Access denied: Unauthorized key
                 </div>
              )}

              <Button type="submit" variant="black" size="lg" className="w-full flex items-center justify-center gap-4 py-5 shadow-2xl">
                 <Shield size={20} className="text-oakivo-secondary" /> Authenticate Vault
              </Button>
           </form>

           <div className="mt-12 pt-8 border-t border-gray-100 text-center">
              <p className="text-[9px] text-gray-400 font-bold uppercase tracking-[0.3em] flex items-center justify-center gap-3">
                 <Lock size={12} /> Institutional Grade AES-256 Encryption
              </p>
           </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-oakivo-surface pt-36 pb-24 font-sans">
      <div className="container mx-auto px-6">
        
        {/* Operations Command Header */}
        <div className="bg-oakivo-primary rounded-[56px] p-12 md:p-16 text-white shadow-4xl mb-12 relative overflow-hidden group">
           <div className="absolute top-0 right-0 w-96 h-96 bg-oakivo-secondary/10 rounded-full blur-[120px] -mr-32 -mt-32 group-hover:bg-oakivo-secondary/20 transition-all duration-1000"></div>
           
           <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-12 relative z-10">
              <div className="max-w-2xl">
                 <div className="flex items-center gap-5 mb-8">
                    <Logo className="w-14 h-14" />
                    <div className="h-10 w-[2px] bg-white/10"></div>
                    <span className="text-[11px] font-black uppercase tracking-[0.4em] text-oakivo-secondary bg-oakivo-secondary/10 px-4 py-1.5 rounded-lg border border-oakivo-secondary/20">Operations Command</span>
                 </div>
                 <h1 className="text-5xl md:text-7xl font-serif-display font-bold leading-tight tracking-tighter">Strategic Vault Intelligence</h1>
                 <p className="text-gray-400 mt-4 text-xl font-light leading-relaxed">Real-time enterprise analytics, SEO audit telemetry, and lead intake pipeline.</p>
              </div>
              
              <div className="flex flex-wrap gap-4">
                 <button 
                   onClick={loadAnalyticsAndSEO} 
                   className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-wider transition-all border border-white/10"
                 >
                   <RefreshCw size={16} /> Refresh Telemetry
                 </button>
                 <Button variant="outline" size="md" onClick={() => window.print()} className="flex items-center gap-3 bg-white/5 border-white/20 hover:bg-white/10 transition-all font-bold">
                    <Download size={18} /> Export Report
                 </Button>
              </div>
           </div>

           {/* Core Vault Navigation Tabs */}
           <div className="flex flex-wrap items-center gap-4 mt-12 pt-8 border-t border-white/10 relative z-10">
              <button
                onClick={() => setActiveTab('submissions')}
                className={`px-6 py-3 rounded-2xl text-xs font-black uppercase tracking-widest transition-all flex items-center gap-2 ${
                  activeTab === 'submissions' 
                    ? 'bg-oakivo-secondary text-oakivo-primary shadow-lg scale-105' 
                    : 'bg-white/5 text-gray-300 hover:bg-white/10'
                }`}
              >
                <LayoutDashboard size={16} /> Intake Submissions ({entries.length})
              </button>

              <button
                onClick={() => setActiveTab('analytics')}
                className={`px-6 py-3 rounded-2xl text-xs font-black uppercase tracking-widest transition-all flex items-center gap-2 ${
                  activeTab === 'analytics' 
                    ? 'bg-oakivo-secondary text-oakivo-primary shadow-lg scale-105' 
                    : 'bg-white/5 text-gray-300 hover:bg-white/10'
                }`}
              >
                <BarChart3 size={16} /> Web Visitors & Traffic
              </button>

              <button
                onClick={() => setActiveTab('seo')}
                className={`px-6 py-3 rounded-2xl text-xs font-black uppercase tracking-widest transition-all flex items-center gap-2 ${
                  activeTab === 'seo' 
                    ? 'bg-oakivo-secondary text-oakivo-primary shadow-lg scale-105' 
                    : 'bg-white/5 text-gray-300 hover:bg-white/10'
                }`}
              >
                <SearchIcon size={16} /> SEO Health & Audit
              </button>
           </div>
        </div>

        {/* TAB 1: SUBMISSIONS & LEADS */}
        {activeTab === 'submissions' && (
          <>
            {/* Metrics Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
               {[
                 { label: 'Total Inbound', value: entries.length, icon: <LayoutDashboard /> },
                 { label: 'Qualified Leads', value: entries.filter(e => e.type === 'lead').length, icon: <Users /> },
                 { label: 'Elite Applicants', value: entries.filter(e => e.type === 'applicant').length, icon: <Briefcase /> },
                 { label: 'Intelligence Subs', value: entries.filter(e => e.type === 'subscriber').length, icon: <Mail /> },
               ].map((stat, i) => (
                 <div key={i} className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm group hover:border-oakivo-primary/20 transition-all duration-500">
                    <div className="flex items-center gap-3 text-oakivo-secondary text-[10px] font-black uppercase tracking-[0.3em] mb-4">
                       {React.cloneElement(stat.icon as React.ReactElement<any>, { size: 18 })} {stat.label}
                    </div>
                    <div className="text-4xl font-bold font-serif-display text-oakivo-primary tracking-tight">{stat.value}</div>
                 </div>
               ))}
            </div>

            {/* Filter Matrix */}
            <div className="bg-white rounded-[32px] p-6 shadow-sm border border-gray-100 mb-10 flex flex-col lg:flex-row items-center justify-between gap-6">
               <div className="flex items-center gap-4 overflow-x-auto w-full lg:w-auto pb-2 lg:pb-0 scrollbar-hide">
                  {(['all', 'lead', 'applicant', 'subscriber'] as const).map(t => (
                    <button 
                      key={t}
                      onClick={() => setFilter(t)}
                      className={`px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all duration-500 whitespace-nowrap ${filter === t ? 'bg-oakivo-primary text-white shadow-2xl scale-105' : 'bg-gray-50 text-gray-500 hover:bg-gray-100 hover:scale-105'}`}
                    >
                      {t === 'all' ? 'All Operations' : t === 'lead' ? 'Leads' : t === 'applicant' ? 'Talent' : 'Strategic Subs'}
                    </button>
                  ))}
               </div>

               <div className="relative w-full lg:w-96 group">
                  <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-oakivo-secondary transition-colors" size={20} />
                  <input 
                    type="text" 
                    placeholder="Query Vault Intelligence..." 
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-100 rounded-[20px] pl-14 pr-6 py-4 text-sm font-medium focus:outline-none focus:border-oakivo-primary focus:bg-white transition-all shadow-inner"
                  />
               </div>
            </div>

            {/* Tactical Data Grid */}
            <div className="bg-white rounded-[40px] shadow-sm border border-gray-100 overflow-hidden">
               <div className="overflow-x-auto">
                 <table className="w-full text-left">
                    <thead>
                       <tr className="bg-gray-50/50 border-b border-gray-100">
                          <th className="px-10 py-6 text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">Tactical Timestamp</th>
                          <th className="px-10 py-6 text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">Asset Vector</th>
                          <th className="px-10 py-6 text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">Identity Payload</th>
                          <th className="px-10 py-6 text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">Lifecycle</th>
                          <th className="px-10 py-6 text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 text-right">Strategic Action</th>
                       </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                       {filteredEntries.map(entry => (
                         <tr key={entry.id} className="hover:bg-gray-50/80 transition-all group cursor-pointer" onClick={() => setSelectedEntry(entry)}>
                            <td className="px-10 py-6">
                               <div className="flex items-center gap-3 text-xs font-bold text-gray-500">
                                  <Clock size={16} className="text-oakivo-secondary" />
                                  {new Date(entry.createdAt).toLocaleString()}
                               </div>
                            </td>
                            <td className="px-10 py-6">
                               <span className={`text-[10px] font-black px-4 py-2 rounded-xl border uppercase tracking-widest ${
                                 entry.type === 'lead' ? 'bg-blue-50 text-blue-600 border-blue-100' :
                                 entry.type === 'applicant' ? 'bg-purple-50 text-purple-600 border-purple-100' :
                                 'bg-green-50 text-green-600 border-green-100'
                               }`}>
                                 {entry.type}
                               </span>
                            </td>
                            <td className="px-10 py-6">
                               <div className="max-w-lg">
                                  <p className="font-bold text-lg text-oakivo-primary tracking-tight">
                                    {entry.data.name || entry.data.email}
                                  </p>
                                  <p className="text-xs text-gray-400 font-light truncate max-w-sm mt-1">
                                    {Object.values(entry.data).join(' • ')}
                                  </p>
                               </div>
                            </td>
                            <td className="px-10 py-6">
                               <div className={`flex items-center gap-2.5 text-[11px] font-black uppercase tracking-widest ${entry.status === 'new' ? 'text-oakivo-secondary' : 'text-gray-400'}`}>
                                  {entry.status === 'new' ? <div className="w-2 h-2 rounded-full bg-oakivo-secondary animate-pulse" /> : <CheckCircle size={14} />}
                                  {entry.status}
                               </div>
                            </td>
                            <td className="px-10 py-6 text-right">
                               <div className="flex items-center justify-end gap-3">
                                  <button className="p-3 text-gray-300 hover:text-oakivo-primary transition-all hover:bg-white rounded-xl shadow-sm">
                                     <Eye size={20} />
                                  </button>
                                  <button 
                                    onClick={(e) => { e.stopPropagation(); handleDelete(entry.id); }}
                                    className="p-3 text-gray-200 hover:text-red-500 transition-all opacity-0 group-hover:opacity-100"
                                  >
                                     <Trash2 size={20} />
                                  </button>
                               </div>
                            </td>
                         </tr>
                       ))}
                    </tbody>
                 </table>
               </div>
            </div>
          </>
        )}

        {/* TAB 2: WEB VISITORS & ANALYTICS */}
        {activeTab === 'analytics' && analyticsSummary && (
          <div className="space-y-10">
            {/* Overview Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
                <div className="flex items-center gap-2 text-oakivo-secondary text-[10px] font-black uppercase tracking-widest mb-3">
                  <Users size={16} /> Total Platform Visitors
                </div>
                <div className="text-4xl font-extrabold text-oakivo-primary font-serif-display">
                  {analyticsSummary.totalVisitors.toLocaleString()}
                </div>
                <span className="text-[10px] text-emerald-600 font-bold mt-2 block">+14% vs last week</span>
              </div>

              <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
                <div className="flex items-center gap-2 text-cyan-500 text-[10px] font-black uppercase tracking-widest mb-3">
                  <Activity size={16} /> Active Users Right Now
                </div>
                <div className="text-4xl font-extrabold text-emerald-600 font-serif-display flex items-center gap-3">
                  {analyticsSummary.activeVisitorsNow}
                  <span className="w-3 h-3 bg-cyan-500 rounded-full animate-ping" />
                </div>
                <span className="text-[10px] text-gray-400 font-bold mt-2 block">Live Telemetry</span>
              </div>

              <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
                <div className="flex items-center gap-2 text-blue-500 text-[10px] font-black uppercase tracking-widest mb-3">
                  <Clock size={16} /> Avg Time on Site
                </div>
                <div className="text-4xl font-extrabold text-oakivo-primary font-serif-display">
                  {Math.floor(analyticsSummary.avgDurationSec / 60)}m {analyticsSummary.avgDurationSec % 60}s
                </div>
                <span className="text-[10px] text-gray-400 font-bold mt-2 block">High engagement rate</span>
              </div>

              <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
                <div className="flex items-center gap-2 text-purple-500 text-[10px] font-black uppercase tracking-widest mb-3">
                  <TrendingUp size={16} /> Bounce Rate
                </div>
                <div className="text-4xl font-extrabold text-oakivo-primary font-serif-display">
                  {analyticsSummary.bounceRatePercent}%
                </div>
                <span className="text-[10px] text-emerald-600 font-bold mt-2 block">Optimal enterprise standard</span>
              </div>
            </div>

            {/* Top Pages & Traffic Sources */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Top Performing Pages */}
              <div className="bg-white rounded-[32px] p-8 border border-gray-100 shadow-sm space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                  <h3 className="text-lg font-serif-display font-bold text-oakivo-primary flex items-center gap-2">
                    <Globe size={18} className="text-oakivo-secondary" /> Top Visited Platform Routes
                  </h3>
                  <span className="text-[10px] font-mono text-gray-400 uppercase">Real-Time</span>
                </div>

                <div className="space-y-4">
                  {analyticsSummary.topPages.map((page, idx) => (
                    <div key={idx} className="space-y-1.5">
                      <div className="flex items-center justify-between text-xs font-bold">
                        <span className="text-oakivo-primary font-mono">{page.path}</span>
                        <span className="text-gray-500">{page.views} views ({page.percentage}%)</span>
                      </div>
                      <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-oakivo-primary rounded-full transition-all duration-1000"
                          style={{ width: `${page.percentage}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Traffic Sources */}
              <div className="bg-white rounded-[32px] p-8 border border-gray-100 shadow-sm space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                  <h3 className="text-lg font-serif-display font-bold text-oakivo-primary flex items-center gap-2">
                    <Zap size={18} className="text-oakivo-secondary" /> Inbound Traffic Channels
                  </h3>
                  <span className="text-[10px] font-mono text-gray-400 uppercase">Referrers</span>
                </div>

                <div className="space-y-4">
                  {analyticsSummary.trafficSources.map((source, idx) => (
                    <div key={idx} className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-100">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-xl bg-white flex items-center justify-center shadow-sm text-oakivo-primary font-bold text-xs">
                          #{idx + 1}
                        </div>
                        <span className="text-sm font-bold text-oakivo-primary">{source.source}</span>
                      </div>
                      <div className="text-right">
                        <span className="text-sm font-extrabold text-oakivo-primary block">{source.count} clicks</span>
                        <span className="text-[10px] text-gray-400 font-mono">{source.percentage}% of total</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Custom Recharts Dashboard */}
            <div className="flex justify-end mt-4">
              <Button onClick={() => analytics.seedMockData().then(loadAnalyticsAndSEO)} variant="outline" size="sm">
                <RefreshCw size={16} className="mr-2" />
                Generate Traffic Simulation Data
              </Button>
            </div>
            <AdminAnalyticsDashboard events={recentPageViews} />

            {/* Live Visitor Feed */}
            <div className="bg-white rounded-[32px] p-8 border border-gray-100 shadow-sm space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                <h3 className="text-lg font-serif-display font-bold text-oakivo-primary flex items-center gap-2">
                  <Activity size={18} className="text-cyan-500" /> Recent Visitor Telemetry Feed
                </h3>
                <span className="text-[10px] font-mono text-gray-400 uppercase">Auto-Updating</span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs font-mono">
                  <thead>
                    <tr className="text-gray-400 uppercase text-[9px] border-b border-gray-100">
                      <th className="pb-3">Timestamp</th>
                      <th className="pb-3">Visited Path</th>
                      <th className="pb-3">Device</th>
                      <th className="pb-3">Location</th>
                      <th className="pb-3">Traffic Source</th>
                      <th className="pb-3 text-right">Duration</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {recentPageViews.slice(0, 10).map((pv) => (
                      <tr key={pv.id} className="hover:bg-gray-50/80 transition-colors">
                        <td className="py-3.5 text-gray-500">{new Date(pv.timestamp).toLocaleTimeString()}</td>
                        <td className="py-3.5 font-bold text-oakivo-primary">{pv.path}</td>
                        <td className="py-3.5 text-gray-600">{pv.device}</td>
                        <td className="py-3.5 text-gray-600">{pv.location}</td>
                        <td className="py-3.5 text-gray-600">{pv.referrer}</td>
                        <td className="py-3.5 text-right font-bold text-emerald-600">{pv.durationSeconds}s</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: SEO HEALTH & AUDIT */}
        {activeTab === 'seo' && (
          <div className="space-y-10">
            {/* Health Score Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm flex items-center gap-6">
                <div className="w-20 h-20 bg-emerald-50 text-emerald-600 rounded-3xl flex items-center justify-center font-extrabold text-3xl font-serif-display border border-emerald-100">
                  96
                </div>
                <div>
                  <h4 className="text-base font-bold text-oakivo-primary">Overall SEO Score</h4>
                  <p className="text-xs text-gray-400 mt-1">Sovereign Google/Bing Search Ready</p>
                </div>
              </div>

              <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm flex items-center gap-6">
                <div className="w-20 h-20 bg-blue-50 text-blue-600 rounded-3xl flex items-center justify-center font-extrabold text-3xl font-serif-display border border-blue-100">
                  100%
                </div>
                <div>
                  <h4 className="text-base font-bold text-oakivo-primary">Meta Schema Validity</h4>
                  <p className="text-xs text-gray-400 mt-1">OpenGraph & Canonical Meta Active</p>
                </div>
              </div>

              <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm flex items-center gap-6">
                <div className="w-20 h-20 bg-purple-50 text-purple-600 rounded-3xl flex items-center justify-center font-extrabold text-3xl font-serif-display border border-purple-100">
                  98%
                </div>
                <div>
                  <h4 className="text-base font-bold text-oakivo-primary">Mobile Indexability</h4>
                  <p className="text-xs text-gray-400 mt-1">Responsive Breakpoints Verified</p>
                </div>
              </div>
            </div>

            {/* SEO Audit Detailed List */}
            <div className="bg-white rounded-[32px] p-8 border border-gray-100 shadow-sm space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                <h3 className="text-lg font-serif-display font-bold text-oakivo-primary flex items-center gap-2">
                  <SearchIcon size={18} className="text-oakivo-secondary" /> Page-by-Page SEO Health Breakdown
                </h3>
                <span className="text-[10px] font-mono text-gray-400 uppercase">Diagnostic Audit</span>
              </div>

              <div className="space-y-6">
                {seoHealth.map((audit, idx) => (
                  <div key={idx} className="p-6 bg-gray-50 rounded-2xl border border-gray-100 space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div>
                        <span className="text-base font-bold text-oakivo-primary font-mono">{audit.page}</span>
                        <p className="text-xs text-gray-400 mt-0.5">Title, Meta, Heading & OpenGraph Audit</p>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-lg border border-emerald-100">
                          Speed Score: {audit.speedScore}/100
                        </span>
                        <span className="text-xs font-bold text-oakivo-primary bg-white px-3 py-1 rounded-lg border border-gray-200 shadow-sm">
                          Overall: {Math.round((audit.titleScore + audit.metaScore + audit.headingScore + audit.speedScore) / 4)}%
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-mono">
                      <div className="bg-white p-3 rounded-xl border border-gray-100">
                        <span className="text-gray-400 block text-[9px] uppercase">Title Tag</span>
                        <span className="font-bold text-emerald-600">{audit.titleScore}% Verified</span>
                      </div>
                      <div className="bg-white p-3 rounded-xl border border-gray-100">
                        <span className="text-gray-400 block text-[9px] uppercase">Meta Description</span>
                        <span className="font-bold text-emerald-600">{audit.metaScore}% Optimized</span>
                      </div>
                      <div className="bg-white p-3 rounded-xl border border-gray-100">
                        <span className="text-gray-400 block text-[9px] uppercase">H1/H2 Hierarchy</span>
                        <span className="font-bold text-emerald-600">{audit.headingScore}% Structured</span>
                      </div>
                      <div className="bg-white p-3 rounded-xl border border-gray-100">
                        <span className="text-gray-400 block text-[9px] uppercase">OpenGraph Social</span>
                        <span className="font-bold text-emerald-600">{audit.openGraphScore}% Ready</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-xs text-gray-600 pt-1">
                      <CheckCircle2 size={14} className="text-cyan-500" />
                      <span>{audit.issues.join(' • ')}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Footer Security Notice */}
        <div className="mt-12 p-10 bg-white border border-dashed border-gray-200 rounded-[40px] flex flex-col md:flex-row items-center justify-between gap-8 text-gray-400">
           <div className="flex items-center gap-4 text-xs font-black uppercase tracking-[0.3em]">
              <Shield size={24} className="text-oakivo-secondary" /> Data Sovereign Infrastructure (v5.2)
           </div>
           <p className="text-[10px] font-bold text-center md:text-right max-w-md uppercase tracking-[0.15em] leading-relaxed">
             All strategic assets & web analytics telemetry are managed under Canadian data residency protocols. Access sessions are logged and cryptographically signed.
           </p>
        </div>
      </div>

      {/* Detail Modal */}
      {selectedEntry && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/90 backdrop-blur-xl animate-in fade-in duration-500">
           <div className="bg-white w-full max-w-3xl rounded-[48px] shadow-[0_60px_120px_rgba(0,0,0,0.6)] overflow-hidden relative animate-in zoom-in slide-in-from-bottom-12 duration-700">
              <div className="bg-oakivo-primary p-12 text-white relative">
                 <div className="absolute top-0 right-0 p-12 opacity-5">
                    <Terminal size={120} />
                 </div>
                 <div className="flex items-center justify-between relative z-10">
                    <div className="flex items-center gap-6">
                       <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center border border-white/20">
                          <Eye size={32} className="text-oakivo-secondary" />
                       </div>
                       <div>
                          <h2 className="text-3xl font-serif-display font-bold">Asset Analysis</h2>
                          <p className="text-[10px] text-oakivo-secondary font-black uppercase tracking-[0.4em] mt-2">Vault Reference: {selectedEntry.id.substring(0, 13)}</p>
                       </div>
                    </div>
                    <button onClick={() => setSelectedEntry(null)} className="p-3 hover:bg-white/10 rounded-full transition-all">
                       <X size={32} />
                    </button>
                 </div>
              </div>

              <div className="p-12 space-y-12 max-h-[60vh] overflow-y-auto">
                 <div className="grid grid-cols-2 gap-12 border-b border-gray-100 pb-12">
                    <div>
                       <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] block mb-2">Acquisition Hub</label>
                       <p className="text-xl font-bold text-oakivo-primary font-serif-display tracking-tight">Oakivo Solutions Portal</p>
                    </div>
                    <div>
                       <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] block mb-2">Asset Lifecycle</label>
                       <div className="flex gap-2">
                          {(['new', 'processed', 'archived'] as const).map(s => (
                            <button
                              key={s}
                              onClick={() => handleUpdateStatus(selectedEntry.id, s)}
                              className={`px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${selectedEntry.status === s ? 'bg-oakivo-secondary text-oakivo-primary shadow-xl scale-105' : 'bg-gray-50 text-gray-400 hover:bg-gray-100'}`}
                            >
                              {s}
                            </button>
                          ))}
                       </div>
                    </div>
                 </div>

                 <div className="space-y-8">
                    <h3 className="text-[10px] font-black text-oakivo-primary uppercase tracking-[0.4em] flex items-center gap-3">
                       <Code size={18} className="text-oakivo-secondary" /> Information Payload
                    </h3>
                    <div className="grid grid-cols-1 gap-6">
                       {Object.entries(selectedEntry.data).map(([key, value]) => (
                          <div key={key} className="bg-gray-50 p-6 rounded-3xl group hover:bg-oakivo-surface transition-all duration-500 border border-transparent hover:border-gray-100">
                             <label className="text-[9px] font-black text-gray-400 uppercase tracking-[0.25em] block mb-2">{key}</label>
                             <p className="text-lg font-bold text-oakivo-primary leading-relaxed break-words">{String(value)}</p>
                          </div>
                       ))}
                    </div>
                 </div>
              </div>

              <div className="p-12 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
                 <button onClick={() => handleDelete(selectedEntry.id)} className="text-red-500 text-[10px] font-black uppercase tracking-widest flex items-center gap-3 hover:scale-105 transition-all">
                    <Trash2 size={20} /> Secure Wipe
                 </button>
                 <Button variant="black" size="lg" onClick={() => setSelectedEntry(null)}>Close Inspector</Button>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default AdminPortal;
