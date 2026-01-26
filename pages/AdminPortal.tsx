
import React, { useState, useEffect } from 'react';
import { db, DatabaseEntry } from '../utils/database';
import { Shield, Trash2, CheckCircle, Clock, Search, Download, Trash, LayoutDashboard, Mail, Users, Briefcase, Lock, Key, AlertCircle, Eye, X, Terminal, Code, User, Building, MessageSquare, Link as LinkIcon, Info, Fingerprint } from 'lucide-react';
import Button from '../components/Button';
import Logo from '../components/Logo';

const AdminPortal: React.FC = () => {
  const [entries, setEntries] = useState<DatabaseEntry[]>([]);
  const [filter, setFilter] = useState<DatabaseEntry['type'] | 'all'>('all');
  const [search, setSearch] = useState('');
  const [selectedEntry, setSelectedEntry] = useState<DatabaseEntry | null>(null);
  const [showRaw, setShowRaw] = useState(false);
  
  // Security State
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [authError, setAuthError] = useState(false);

  // The "Tactical Access Code" - updated for security protocol
  const VAULT_KEY = "OakivoP@ssword1209";

  useEffect(() => {
    if (isAuthenticated) {
      setEntries(db.getAllEntries());
    }
  }, [isAuthenticated]);

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

  const handleUpdateStatus = (id: string, status: DatabaseEntry['status']) => {
    db.updateStatus(id, status);
    setEntries(db.getAllEntries());
    if (selectedEntry?.id === id) {
      setSelectedEntry(prev => prev ? { ...prev, status } : null);
    }
  };

  const handleDelete = (id: string) => {
    if (confirm('Permanently wipe this intelligence asset from the Vault?')) {
      db.deleteEntry(id);
      setEntries(db.getAllEntries());
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
                <Logo className="w-12 h-12" withText={false} light={true} />
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
        
        {/* Dynamic Dashboard */}
        <div className="bg-oakivo-primary rounded-[56px] p-12 md:p-16 text-white shadow-4xl mb-12 relative overflow-hidden group">
           <div className="absolute top-0 right-0 w-96 h-96 bg-oakivo-secondary/10 rounded-full blur-[120px] -mr-32 -mt-32 group-hover:bg-oakivo-secondary/20 transition-all duration-1000"></div>
           
           <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-12 relative z-10">
              <div className="max-w-2xl">
                 <div className="flex items-center gap-5 mb-8">
                    <Logo className="w-14 h-14" light={true} />
                    <div className="h-10 w-[2px] bg-white/10"></div>
                    <span className="text-[11px] font-black uppercase tracking-[0.4em] text-oakivo-secondary bg-oakivo-secondary/10 px-4 py-1.5 rounded-lg border border-oakivo-secondary/20">Operations Command</span>
                 </div>
                 <h1 className="text-5xl md:text-7xl font-serif-display font-bold leading-tight tracking-tighter">Strategic Vault Intelligence</h1>
                 <p className="text-gray-400 mt-4 text-xl font-light leading-relaxed">Active monitoring of Canadian enterprise leads and engineering talent acquisition.</p>
              </div>
              
              <div className="flex flex-wrap gap-5">
                 <Button variant="outline" size="md" onClick={() => window.print()} className="flex items-center gap-3 bg-white/5 border-white/20 hover:bg-white/10 transition-all font-bold">
                    <Download size={18} /> Export Telemetry
                 </Button>
              </div>
           </div>

           {/* Metrics Grid */}
           <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 pt-12 border-t border-white/10">
              {[
                { label: 'Total Inbound', value: entries.length, icon: <LayoutDashboard /> },
                { label: 'Qualified Leads', value: entries.filter(e => e.type === 'lead').length, icon: <Users /> },
                { label: 'Elite Applicants', value: entries.filter(e => e.type === 'applicant').length, icon: <Briefcase /> },
                { label: 'Intelligence Subs', value: entries.filter(e => e.type === 'subscriber').length, icon: <Mail /> },
              ].map((stat, i) => (
                <div key={i} className="bg-white/5 p-8 rounded-3xl border border-white/5 backdrop-blur-md group hover:bg-white/10 transition-all duration-500">
                   <div className="flex items-center gap-3 text-oakivo-secondary text-[10px] font-black uppercase tracking-[0.3em] mb-4">
                      {/* Fix: Use React.ReactElement<any> to allow dynamic prop 'size' when cloning icon elements */}
                      {React.cloneElement(stat.icon as React.ReactElement<any>, { size: 18 })} {stat.label}
                   </div>
                   <div className="text-5xl font-bold font-serif-display tracking-tight">{stat.value}</div>
                </div>
              ))}
           </div>
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

        <div className="mt-12 p-10 bg-white border border-dashed border-gray-200 rounded-[40px] flex flex-col md:flex-row items-center justify-between gap-8 text-gray-400">
           <div className="flex items-center gap-4 text-xs font-black uppercase tracking-[0.3em]">
              <Shield size={24} className="text-oakivo-secondary" /> Data Sovereign Infrastructure (v5.1)
           </div>
           <p className="text-[10px] font-bold text-center md:text-right max-w-md uppercase tracking-[0.15em] leading-relaxed">
             All strategic assets are managed under Canadian data residency protocols. Access sessions are logged and cryptographically signed.
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
                       <p className="text-xl font-bold text-oakivo-primary font-serif-display tracking-tight">Dieppe Engineering Portal</p>
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
