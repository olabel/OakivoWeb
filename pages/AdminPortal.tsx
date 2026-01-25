
import React, { useState, useEffect } from 'react';
import { db, DatabaseEntry } from '../utils/database';
// Added missing Info icon to lucide-react imports
import { Shield, Trash2, CheckCircle, Clock, Search, Download, Trash, LayoutDashboard, Mail, Users, Briefcase, Lock, Key, AlertCircle, Eye, X, Terminal, Code, User, Building, MessageSquare, Link as LinkIcon, Info } from 'lucide-react';
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

  // The "Tactical Access Code" - updated as per security protocol
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
    if (confirm('Permanently delete this entry from the Strategy Vault?')) {
      db.deleteEntry(id);
      setEntries(db.getAllEntries());
      if (selectedEntry?.id === id) setSelectedEntry(null);
    }
  };

  const handleClearAll = () => {
    if (confirm('CRITICAL: This will wipe the entire Strategy Vault. Proceed?')) {
      db.clear();
      setEntries([]);
      setSelectedEntry(null);
    }
  };

  const filteredEntries = entries.filter(e => {
    const matchesFilter = filter === 'all' || e.type === filter;
    const searchStr = JSON.stringify(e.data).toLowerCase();
    const matchesSearch = searchStr.includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const exportData = () => {
    const blob = new Blob([JSON.stringify(entries, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `oakivo_strategy_vault_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-oakivo-primary flex items-center justify-center p-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-oakivo-secondary/10 rounded-full blur-[100px] -mr-40 -mt-40"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-oakivo-blue/10 rounded-full blur-[100px] -ml-40 -mb-40"></div>
        
        <div className="max-w-md w-full bg-white rounded-3xl p-10 shadow-2xl relative z-10 border border-white/10">
           <div className="flex flex-col items-center mb-10">
              <Logo className="w-16 h-16 mb-6" withText={false} />
              <h1 className="text-2xl font-serif-display font-bold text-oakivo-primary">Strategy Vault</h1>
              <p className="text-gray-400 text-xs font-bold uppercase tracking-[0.2em] mt-2">Classified Access Only</p>
           </div>

           <form onSubmit={handleAuth} className="space-y-6">
              <div className="relative">
                 <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                    <Lock size={18} />
                 </div>
                 <input 
                    type="password" 
                    value={passcode}
                    onChange={(e) => setPasscode(e.target.value)}
                    placeholder="Enter Access Key"
                    className={`w-full bg-gray-50 border py-4 pl-12 pr-4 rounded-xl focus:outline-none transition-all ${authError ? 'border-red-500 bg-red-50' : 'border-gray-200 focus:border-oakivo-primary'}`}
                 />
              </div>

              {authError && (
                 <div className="flex items-center gap-2 text-red-600 text-[10px] font-bold uppercase tracking-widest animate-shake">
                    <AlertCircle size={14} /> Unauthorized credentials detected
                 </div>
              )}

              <Button type="submit" variant="black" className="w-full flex items-center justify-center gap-2">
                 <Key size={16} /> Authenticate Session
              </Button>
           </form>

           <div className="mt-8 pt-8 border-t border-gray-100 flex flex-col items-center">
              <div className="flex items-center gap-2 text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                 <Shield size={14} className="text-oakivo-secondary" /> AES-256 Encrypted Portal
              </div>
           </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-oakivo-surface pt-32 pb-20">
      <div className="container mx-auto px-6">
        
        {/* Header Dashboard */}
        <div className="bg-oakivo-primary rounded-3xl p-8 md:p-12 text-white shadow-2xl mb-12 relative overflow-hidden">
           <div className="absolute top-0 right-0 w-64 h-64 bg-oakivo-secondary/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
           
           <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 relative z-10">
              <div>
                 <div className="flex items-center gap-3 mb-4">
                    <Logo className="w-10 h-10" />
                    <span className="text-2xl font-bold font-serif-display">Strategy Vault <span className="text-oakivo-secondary font-sans text-sm ml-2 px-2 py-0.5 border border-oakivo-secondary/30 rounded uppercase tracking-widest">Admin</span></span>
                 </div>
                 <h1 className="text-4xl font-serif-display font-bold">Inbound Asset Intelligence</h1>
                 <p className="text-gray-400 mt-2 max-w-lg">Monitoring real-time leads, applications, and tactical subscriptions from across the Oakivo digital ecosystem.</p>
              </div>
              
              <div className="flex gap-4">
                 <Button variant="outline" size="sm" onClick={exportData} className="flex items-center gap-2 bg-white/5 border-white/20 hover:bg-white/10">
                    <Download size={14} /> Export Insight
                 </Button>
                 <Button variant="outline" size="sm" onClick={handleClearAll} className="border-red-500/50 text-red-400 hover:bg-red-500 hover:text-white flex items-center gap-2">
                    <Trash size={14} /> Wipe Vault
                 </Button>
              </div>
           </div>

           {/* Stats Strip */}
           <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 pt-8 border-t border-white/10">
              {[
                { label: 'Total Assets', value: entries.length, icon: <LayoutDashboard size={18} /> },
                { label: 'Market Leads', value: entries.filter(e => e.type === 'lead').length, icon: <Users size={18} /> },
                { label: 'Candidate Pool', value: entries.filter(e => e.type === 'applicant').length, icon: <Briefcase size={18} /> },
                { label: 'Tactical Subs', value: entries.filter(e => e.type === 'subscriber').length, icon: <Mail size={18} /> },
              ].map((stat, i) => (
                <div key={i} className="bg-white/5 p-4 rounded-xl border border-white/5">
                   <div className="flex items-center gap-2 text-oakivo-secondary text-[10px] font-bold uppercase tracking-widest mb-1">
                      {stat.icon} {stat.label}
                   </div>
                   <div className="text-2xl font-bold">{stat.value}</div>
                </div>
              ))}
           </div>
        </div>

        {/* Filters & Actions */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
           <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
              {(['all', 'lead', 'applicant', 'subscriber'] as const).map(t => (
                <button 
                  key={t}
                  onClick={() => setFilter(t)}
                  className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-widest transition-all whitespace-nowrap ${filter === t ? 'bg-oakivo-primary text-white shadow-lg' : 'bg-gray-50 text-gray-500 hover:bg-gray-100'}`}
                >
                  {t === 'all' ? 'All Operations' : t === 'lead' ? 'Leads' : t === 'applicant' ? 'Careers' : 'Newsletter'}
                </button>
              ))}
           </div>

           <div className="relative w-full md:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <input 
                type="text" 
                placeholder="Search vault..." 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-oakivo-primary"
              />
           </div>
        </div>

        {/* Data Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
           <table className="w-full text-left border-collapse">
              <thead>
                 <tr className="bg-gray-50 border-b border-gray-100">
                    <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-gray-400">Timestamp</th>
                    <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-gray-400">Asset Type</th>
                    <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-gray-400">Identity / Payload</th>
                    <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-gray-400">Status</th>
                    <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-gray-400 text-right">Strategic Action</th>
                 </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                 {filteredEntries.length === 0 ? (
                   <tr>
                      <td colSpan={5} className="px-6 py-20 text-center">
                         <div className="flex flex-col items-center opacity-30">
                            <Shield size={48} className="mb-4" />
                            <p className="font-bold text-lg">No tactical assets located.</p>
                         </div>
                      </td>
                   </tr>
                 ) : (
                   filteredEntries.map(entry => (
                     <tr key={entry.id} className="hover:bg-gray-50 transition-colors group cursor-pointer" onClick={() => setSelectedEntry(entry)}>
                        <td className="px-6 py-4">
                           <div className="flex items-center gap-2 text-xs font-medium text-gray-500">
                              <Clock size={12} className="text-oakivo-secondary" />
                              {new Date(entry.createdAt).toLocaleString()}
                           </div>
                        </td>
                        <td className="px-6 py-4">
                           <span className={`text-[9px] font-extrabold px-2 py-1 rounded border uppercase tracking-tighter ${
                             entry.type === 'lead' ? 'bg-blue-50 text-blue-600 border-blue-100' :
                             entry.type === 'applicant' ? 'bg-purple-50 text-purple-600 border-purple-100' :
                             'bg-green-50 text-green-600 border-green-100'
                           }`}>
                             {entry.type}
                           </span>
                        </td>
                        <td className="px-6 py-4">
                           <div className="max-w-md">
                              <p className="font-bold text-sm text-oakivo-primary">
                                {entry.data.name || entry.data.email}
                              </p>
                              <p className="text-xs text-gray-500 line-clamp-1 opacity-70">
                                {Object.entries(entry.data).map(([k, v]) => `${k}: ${v}`).join(' | ')}
                              </p>
                           </div>
                        </td>
                        <td className="px-6 py-4">
                           <div className={`flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest ${entry.status === 'new' ? 'text-oakivo-secondary' : 'text-gray-400'}`}>
                              {entry.status === 'new' ? <div className="w-1.5 h-1.5 rounded-full bg-oakivo-secondary animate-pulse" /> : <CheckCircle size={12} />}
                              {entry.status}
                           </div>
                        </td>
                        <td className="px-6 py-4 text-right flex items-center justify-end gap-2">
                           <button className="p-2 text-gray-400 hover:text-oakivo-primary transition-colors">
                              <Eye size={16} />
                           </button>
                           <button 
                             onClick={(e) => { e.stopPropagation(); handleDelete(entry.id); }}
                             className="p-2 text-gray-300 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                           >
                              <Trash2 size={16} />
                           </button>
                        </td>
                     </tr>
                   ))
                 )}
              </tbody>
           </table>
        </div>

        {/* Enhanced Detail Modal (Asset Inspector) */}
        {selectedEntry && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-oakivo-primary/90 backdrop-blur-md animate-in fade-in duration-300">
            <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden relative animate-in zoom-in slide-in-from-bottom-8 duration-500 flex flex-col">
              
              {/* Modal Header */}
              <div className="bg-oakivo-primary p-8 text-white flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-2xl ${
                    selectedEntry.type === 'lead' ? 'bg-blue-500/20 text-blue-400' :
                    selectedEntry.type === 'applicant' ? 'bg-purple-500/20 text-purple-400' :
                    'bg-green-500/20 text-green-400'
                  }`}>
                    {selectedEntry.type === 'lead' ? <Users size={24} /> : selectedEntry.type === 'applicant' ? <Briefcase size={24} /> : <Mail size={24} />}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold font-serif-display leading-tight">Asset Intelligence Inspector</h2>
                    <p className="text-[10px] text-white/50 font-bold uppercase tracking-[0.2em] mt-1">Unique Identifier: {selectedEntry.id}</p>
                  </div>
                </div>
                <button 
                  onClick={() => { setSelectedEntry(null); setShowRaw(false); }}
                  className="p-2 hover:bg-white/10 rounded-full transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Inspector Content */}
              <div className="p-8 overflow-y-auto max-h-[60vh]">
                 
                 {/* Metadata Strip */}
                 <div className="grid grid-cols-2 gap-8 mb-12 pb-8 border-b border-gray-100">
                    <div>
                       <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-1">Session Creation</label>
                       <div className="flex items-center gap-2 text-sm font-medium text-oakivo-primary">
                          <Clock size={14} className="text-oakivo-secondary" />
                          {new Date(selectedEntry.createdAt).toLocaleString()}
                       </div>
                    </div>
                    <div>
                       <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-1">Lifecycle Status</label>
                       <div className="flex gap-2">
                          {(['new', 'processed', 'archived'] as const).map(s => (
                            <button
                              key={s}
                              onClick={() => handleUpdateStatus(selectedEntry.id, s)}
                              className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all ${selectedEntry.status === s ? 'bg-oakivo-secondary text-oakivo-primary shadow-lg shadow-oakivo-secondary/20' : 'bg-gray-100 text-gray-400 hover:bg-gray-200'}`}
                            >
                              {s}
                            </button>
                          ))}
                       </div>
                    </div>
                 </div>

                 {/* Information Payload */}
                 <div className="space-y-10">
                    <div className="flex items-center justify-between">
                       <h3 className="text-xs font-bold text-oakivo-primary uppercase tracking-[0.2em] flex items-center gap-2">
                          <Terminal size={14} className="text-oakivo-secondary" /> Content Analysis
                       </h3>
                       <button 
                         onClick={() => setShowRaw(!showRaw)}
                         className={`flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest transition-colors ${showRaw ? 'text-oakivo-blue' : 'text-gray-400'}`}
                       >
                         {showRaw ? <Eye size={14} /> : <Code size={14} />} 
                         {showRaw ? 'Render Structured View' : 'View Source JSON'}
                       </button>
                    </div>

                    {showRaw ? (
                       <pre className="bg-oakivo-primary text-green-400 p-6 rounded-2xl text-xs font-mono overflow-x-auto shadow-inner leading-relaxed">
                          {JSON.stringify(selectedEntry, null, 2)}
                       </pre>
                    ) : (
                       <div className="space-y-6">
                          {Object.entries(selectedEntry.data).map(([key, value]) => {
                             // Icon Mapping
                             let FieldIcon = Info;
                             if (key.toLowerCase().includes('name')) FieldIcon = User;
                             if (key.toLowerCase().includes('company')) FieldIcon = Building;
                             if (key.toLowerCase().includes('email')) FieldIcon = Mail;
                             if (key.toLowerCase().includes('message')) FieldIcon = MessageSquare;
                             if (key.toLowerCase().includes('link')) FieldIcon = LinkIcon;

                             return (
                                <div key={key} className="flex gap-6 group">
                                   <div className="shrink-0 w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center text-gray-300 group-hover:bg-oakivo-surface group-hover:text-oakivo-secondary transition-all">
                                      <FieldIcon size={20} />
                                   </div>
                                   <div className="flex-grow pt-1">
                                      <label className="text-[9px] font-bold text-gray-400 uppercase tracking-widest block mb-1">{key.replace(/([A-Z])/g, ' $1').trim()}</label>
                                      <div className="text-base font-medium text-oakivo-primary leading-relaxed break-words">
                                         {typeof value === 'string' && (value.startsWith('http') || value.includes('@')) ? (
                                            <a href={value.includes('@') && !value.startsWith('http') ? `mailto:${value}` : value} target="_blank" rel="noopener noreferrer" className="text-oakivo-blue underline decoration-oakivo-blue/30 hover:decoration-oakivo-blue transition-all">
                                               {value}
                                            </a>
                                         ) : String(value)}
                                      </div>
                                   </div>
                                </div>
                             );
                          })}
                       </div>
                    )}
                 </div>
              </div>

              {/* Modal Footer Actions */}
              <div className="p-8 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
                 <button 
                   onClick={() => handleDelete(selectedEntry.id)}
                   className="text-red-500 text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 hover:bg-red-50 px-4 py-2 rounded-lg transition-all"
                 >
                    <Trash2 size={16} /> Permanently Wipe Asset
                 </button>
                 <Button variant="black" onClick={() => { setSelectedEntry(null); setShowRaw(false); }}>Close Inspector</Button>
              </div>
            </div>
          </div>
        )}

        <div className="mt-8 p-6 border border-dashed border-gray-200 rounded-2xl flex items-center justify-between text-gray-400">
           <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em]">
              <Shield size={16} /> Data Encryption Standard: Oakivo-Vault-AES-256
           </div>
           <p className="text-[10px]">Administrative session is secured and logs are captured for audit compliance.</p>
        </div>
      </div>
    </div>
  );
};

export default AdminPortal;
