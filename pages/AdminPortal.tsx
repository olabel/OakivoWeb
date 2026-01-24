import React, { useState, useEffect } from 'react';
import { db, DatabaseEntry } from '../utils/database';
import { Shield, Trash2, CheckCircle, Clock, Search, Download, Trash, LayoutDashboard, Mail, Users, Briefcase, Lock, Key, AlertCircle } from 'lucide-react';
import Button from '../components/Button';
import Logo from '../components/Logo';

const AdminPortal: React.FC = () => {
  const [entries, setEntries] = useState<DatabaseEntry[]>([]);
  const [filter, setFilter] = useState<DatabaseEntry['type'] | 'all'>('all');
  const [search, setSearch] = useState('');
  
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
  };

  const handleDelete = (id: string) => {
    if (confirm('Permanently delete this entry?')) {
      db.deleteEntry(id);
      setEntries(db.getAllEntries());
    }
  };

  const handleClearAll = () => {
    if (confirm('CRITICAL: This will wipe the entire Strategy Vault. Proceed?')) {
      db.clear();
      setEntries([]);
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
                 <Button variant="outline" size="sm" onClick={exportData} className="flex items-center gap-2">
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
                     <tr key={entry.id} className="hover:bg-gray-50 transition-colors group">
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
                           <button 
                             onClick={() => handleUpdateStatus(entry.id, entry.status === 'new' ? 'processed' : 'new')}
                             className={`flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest ${entry.status === 'new' ? 'text-oakivo-secondary' : 'text-gray-400'}`}
                           >
                              {entry.status === 'new' ? <div className="w-1.5 h-1.5 rounded-full bg-oakivo-secondary animate-pulse" /> : <CheckCircle size={12} />}
                              {entry.status}
                           </button>
                        </td>
                        <td className="px-6 py-4 text-right">
                           <button 
                             onClick={() => handleDelete(entry.id)}
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

        <div className="mt-8 p-6 border border-dashed border-gray-200 rounded-2xl flex items-center justify-between text-gray-400">
           <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em]">
              <Shield size={16} /> Data Encryption Standard: Oakivo-Vault-AES-256
           </div>
           <p className="text-[10px]">Vault session expires on browser refresh unless localStorage persistent.</p>
        </div>
      </div>
    </div>
  );
};

export default AdminPortal;