import React, { useState, useEffect } from 'react';
import { auth } from '../utils/firebase';
import { signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
import { db, DatabaseEntry } from '../utils/database';
import { analytics, AnalyticsSummary, SEOHealthMetric, PageViewEvent } from '../utils/analytics';
import { useLanguage } from '../context/LanguageContext';
import { 
  Shield, Trash2, CheckCircle, Clock, Search, Download, LayoutDashboard, Mail, 
  Users, Briefcase, Lock, AlertCircle, Eye, X, Terminal, Code, Fingerprint, 
  BarChart3, Globe, Smartphone, Monitor, TrendingUp, Search as SearchIcon, 
  CheckCircle2, RefreshCw, Cpu, Zap, Activity
} from 'lucide-react';
import Button from '../components/Button';
import Logo from '../components/Logo';
import AdminAnalyticsDashboard from '../components/AdminAnalyticsDashboard';
import EmailAuditLogSection from '../components/EmailAuditLogSection';

const AdminPortal: React.FC = () => {
  const { language } = useLanguage();
  const isFr = language === 'fr';

  const [entries, setEntries] = useState<DatabaseEntry[]>([]);
  const [filter, setFilter] = useState<DatabaseEntry['type'] | 'all'>('all');
  const [search, setSearch] = useState('');
  const [selectedEntry, setSelectedEntry] = useState<DatabaseEntry | null>(null);
  
  // Tab view inside the Vault
  const [activeTab, setActiveTab] = useState<'submissions' | 'email_audit' | 'analytics' | 'seo' | 'insights'>('submissions');

  // Security State
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState(false);
  const [authErrorMessage, setAuthErrorMessage] = useState('');

  // Analytics & SEO State
  const [analyticsSummary, setAnalyticsSummary] = useState<AnalyticsSummary | null>(null);
  const [recentPageViews, setRecentPageViews] = useState<PageViewEvent[]>([]);
  const [seoHealth, setSeoHealth] = useState<SEOHealthMetric[]>([]);

  // Email Notification Engine State
  const [emailStatus, setEmailStatus] = useState<any>(null);
  const [isTestingEmail, setIsTestingEmail] = useState(false);
  const [testEmailResult, setTestEmailResult] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user);
      setIsLoading(false);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      loadEntries();
      loadAnalyticsAndSEO();
      loadEmailStatus();
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

  const loadEmailStatus = async () => {
    try {
      const res = await fetch('/api/email-status');
      if (res.ok) {
        const data = await res.json();
        setEmailStatus(data);
      }
    } catch (e) {
      console.warn('Could not load email engine status:', e);
    }
  };

  const handleTestEmail = async () => {
    setIsTestingEmail(true);
    setTestEmailResult(null);
    try {
      const res = await fetch('/api/test-email', { method: 'POST' });
      const data = await res.json();
      if (data.success) {
        const prov = data.delivery?.provider || 'resend';
        const msgId = data.delivery?.id ? ` (ID: ${data.delivery.id})` : '';
        setTestEmailResult(
          isFr 
            ? `Vérifié : Notification expédiée à olabel@gmail.com via ${prov}${msgId}`
            : `Verified: Notification dispatched to olabel@gmail.com via ${prov}${msgId}`
        );
      } else {
        setTestEmailResult(
          isFr 
            ? `Avertissement d'expédition : ${data.error || 'Vérifiez les journaux serveur'}`
            : `Dispatch warning: ${data.error || 'Check server logs'}`
        );
      }
    } catch (e: any) {
      setTestEmailResult(isFr ? `Erreur de connexion : ${e.message}` : `Connection error: ${e.message}`);
    } finally {
      setIsTestingEmail(false);
    }
  };

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(false);
    setAuthErrorMessage('');
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error: any) {
      setAuthError(true);
      setAuthErrorMessage(error.message || (isFr ? 'Échec de l\'authentification' : 'Authentication failed'));
      setPassword('');
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
    const confirmMsg = isFr 
      ? 'Supprimer définitivement cet actif de renseignement du Coffre ?' 
      : 'Permanently wipe this intelligence asset from the Vault?';
    if (confirm(confirmMsg)) {
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

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#020504] flex items-center justify-center p-6 relative overflow-hidden font-sans">
        <div className="animate-pulse text-white font-mono tracking-widest text-sm">
          {isFr ? 'INITIALISATION DU COFFRE SÉCURISÉ...' : 'INITIALIZING SECURE VAULT...'}
        </div>
      </div>
    );
  }

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
              <h1 className="text-3xl font-serif-display font-bold text-oakivo-primary">
                {isFr ? 'Coffre Stratégique' : 'Strategy Vault'}
              </h1>
              <p className="text-gray-400 text-[10px] font-black uppercase tracking-[0.4em] mt-3">
                {isFr ? 'Accès Tactique Requis' : 'Tactical Access Required'}
              </p>
           </div>

           <form onSubmit={handleAuth} className="space-y-6">
              <div className="relative group">
                 <div className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-oakivo-secondary transition-colors">
                    <Mail size={24} />
                 </div>
                 <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={isFr ? "Courriel Administrateur" : "Admin Email"}
                    className={`w-full bg-gray-50 border py-4 pl-14 pr-6 rounded-2xl focus:outline-none transition-all text-sm font-bold tracking-widest ${authError ? 'border-red-500 bg-red-50' : 'border-gray-100 focus:border-oakivo-primary focus:bg-white'}`}
                 />
              </div>

              <div className="relative group">
                 <div className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-oakivo-secondary transition-colors">
                    <Fingerprint size={24} />
                 </div>
                 <input 
                    type="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder={isFr ? "Phrase de Sécurité" : "Security Keyphrase"}
                    className={`w-full bg-gray-50 border py-4 pl-14 pr-6 rounded-2xl focus:outline-none transition-all text-sm font-bold tracking-widest ${authError ? 'border-red-500 bg-red-50' : 'border-gray-100 focus:border-oakivo-primary focus:bg-white'}`}
                 />
              </div>

              {authError && (
                 <div className="flex items-center gap-3 text-red-600 text-[10px] font-black uppercase tracking-widest animate-shake">
                    <AlertCircle size={16} /> {authErrorMessage || (isFr ? "Accès refusé : Clé non autorisée" : "Access denied: Unauthorized key")}
                 </div>
              )}

              <Button type="submit" variant="black" size="lg" className="w-full flex items-center justify-center gap-4 py-5 shadow-2xl mt-4">
                 <Shield size={20} className="text-oakivo-secondary" /> {isFr ? 'Authentifier le Coffre' : 'Authenticate Vault'}
              </Button>
           </form>

           <div className="mt-12 pt-8 border-t border-gray-100 text-center">
              <p className="text-[9px] text-gray-400 font-bold uppercase tracking-[0.3em] flex items-center justify-center gap-3">
                 <Lock size={12} /> {isFr ? 'Chiffrement AES-256 de Qualité Institutionnelle' : 'Institutional Grade AES-256 Encryption'}
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
                    <span className="text-[11px] font-black uppercase tracking-[0.4em] text-oakivo-secondary bg-oakivo-secondary/10 px-4 py-1.5 rounded-lg border border-oakivo-secondary/20">
                      {isFr ? 'Commandement des Opérations' : 'Operations Command'}
                    </span>
                 </div>
                 <h1 className="text-5xl md:text-7xl font-serif-display font-bold leading-tight tracking-tighter">
                   {isFr ? 'Renseignement Stratégique du Coffre' : 'Strategic Vault Intelligence'}
                 </h1>
                 <p className="text-gray-400 mt-4 text-xl font-light leading-relaxed">
                   {isFr 
                     ? 'Analytique d\'entreprise en temps réel, télémétrie d\'audit SEO et pipeline de prospects entrants.'
                     : 'Real-time enterprise analytics, SEO audit telemetry, and lead intake pipeline.'
                   }
                 </p>
              </div>
              
              <div className="flex flex-wrap gap-4">
                 <button
                   onClick={handleTestEmail}
                   disabled={isTestingEmail}
                   className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 font-bold text-xs uppercase tracking-wider transition-all border border-cyan-500/30 shadow-sm cursor-pointer"
                   title="Dispatch a live test email to olabel@gmail.com via Resend"
                 >
                   <Mail size={16} /> {isTestingEmail ? (isFr ? 'Envoi en cours...' : 'Dispatching...') : (isFr ? 'Tester Courriel Resend' : 'Test Resend Email')}
                 </button>
                 <button 
                   onClick={() => signOut(auth)} 
                   className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-red-500/10 hover:bg-red-500/20 text-red-400 font-bold text-xs uppercase tracking-wider transition-all border border-red-500/20 cursor-pointer"
                 >
                   <Lock size={16} /> {isFr ? 'Déconnexion Sécurisée' : 'Secure Logout'}
                 </button>
                 <button 
                   onClick={() => { loadAnalyticsAndSEO(); loadEmailStatus(); }} 
                   className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-wider transition-all border border-white/10 cursor-pointer"
                 >
                   <RefreshCw size={16} /> {isFr ? 'Actualiser Télémétrie' : 'Refresh Telemetry'}
                 </button>
                 <Button variant="outline" size="md" onClick={() => window.print()} className="flex items-center gap-3 bg-white/5 border-white/20 hover:bg-white/10 transition-all font-bold">
                    <Download size={18} /> {isFr ? 'Exporter le Rapport' : 'Export Report'}
                 </Button>
              </div>
           </div>

           {/* Live Notification Engine Status Banner */}
           {testEmailResult && (
             <div className="mt-6 bg-cyan-500/15 border border-cyan-500/40 text-cyan-300 text-xs px-6 py-3.5 rounded-2xl font-mono flex items-center justify-between shadow-lg relative z-20">
               <div className="flex items-center gap-2">
                 <CheckCircle2 size={16} className="text-cyan-400 shrink-0" />
                 <span>{testEmailResult}</span>
               </div>
               <button onClick={() => setTestEmailResult(null)} className="text-cyan-400 hover:text-white px-2 py-1 text-sm font-bold">✕</button>
             </div>
           )}

           {/* Core Vault Navigation Tabs */}
           <div className="flex flex-wrap items-center gap-4 mt-12 pt-8 border-t border-white/10 relative z-10">
              <button
                onClick={() => setActiveTab('submissions')}
                className={`px-6 py-3 rounded-2xl text-xs font-black uppercase tracking-widest transition-all flex items-center gap-2 cursor-pointer ${
                  activeTab === 'submissions' 
                    ? 'bg-oakivo-secondary text-oakivo-primary shadow-lg scale-105' 
                    : 'bg-white/5 text-gray-300 hover:bg-white/10'
                }`}
              >
                <LayoutDashboard size={16} /> {isFr ? 'Soumissions Entrantes' : 'Intake Submissions'} ({entries.length})
              </button>

              <button
                onClick={() => setActiveTab('email_audit')}
                className={`px-6 py-3 rounded-2xl text-xs font-black uppercase tracking-widest transition-all flex items-center gap-2 cursor-pointer ${
                  activeTab === 'email_audit' 
                    ? 'bg-oakivo-secondary text-oakivo-primary shadow-lg scale-105' 
                    : 'bg-white/5 text-gray-300 hover:bg-white/10'
                }`}
              >
                <Activity size={16} /> {isFr ? 'Journal d\'Audit Courriels' : 'Email Audit Log'}
              </button>

              <button
                onClick={() => setActiveTab('analytics')}
                className={`px-6 py-3 rounded-2xl text-xs font-black uppercase tracking-widest transition-all flex items-center gap-2 cursor-pointer ${
                  activeTab === 'analytics' 
                    ? 'bg-oakivo-secondary text-oakivo-primary shadow-lg scale-105' 
                    : 'bg-white/5 text-gray-300 hover:bg-white/10'
                }`}
              >
                <BarChart3 size={16} /> {isFr ? 'Visiteurs & Trafic Web' : 'Web Visitors & Traffic'}
              </button>

              <button
                onClick={() => setActiveTab('seo')}
                className={`px-6 py-3 rounded-2xl text-xs font-black uppercase tracking-widest transition-all flex items-center gap-2 cursor-pointer ${
                  activeTab === 'seo' 
                    ? 'bg-oakivo-secondary text-oakivo-primary shadow-lg scale-105' 
                    : 'bg-white/5 text-gray-300 hover:bg-white/10'
                }`}
              >
                <SearchIcon size={16} /> {isFr ? 'Santé & Audit SEO' : 'SEO Health & Audit'}
              </button>

              <button 
                onClick={() => setActiveTab('insights')}
                className={`px-6 py-3 rounded-2xl text-xs font-black uppercase tracking-widest transition-all flex items-center gap-2 cursor-pointer ${
                  activeTab === 'insights' 
                  ? 'bg-oakivo-secondary text-oakivo-primary shadow-lg scale-105' 
                  : 'bg-white/5 text-gray-300 hover:bg-white/10'
                }`}
              >
                <Terminal size={16} />
                <span>{isFr ? 'Gestion des Analyses' : 'Insights Content'}</span>
              </button>
            </div>
  
        </div>

        {/* TAB 1: SUBMISSIONS & LEADS */}
        {activeTab === 'submissions' && (
          <>
            {/* Metrics Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
               {[
                 { label: isFr ? 'Total Entrant' : 'Total Inbound', value: entries.length, icon: <LayoutDashboard /> },
                 { label: isFr ? 'Prospects Qualifiés' : 'Qualified Leads', value: entries.filter(e => e.type === 'lead').length, icon: <Users /> },
                 { label: isFr ? 'Candidats Élite' : 'Elite Applicants', value: entries.filter(e => e.type === 'applicant').length, icon: <Briefcase /> },
                 { label: isFr ? 'Abonnés Stratégiques' : 'Intelligence Subs', value: entries.filter(e => e.type === 'subscriber').length, icon: <Mail /> },
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
                      className={`px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all duration-500 whitespace-nowrap cursor-pointer ${filter === t ? 'bg-oakivo-primary text-white shadow-2xl scale-105' : 'bg-gray-50 text-gray-500 hover:bg-gray-100 hover:scale-105'}`}
                    >
                      {t === 'all' 
                        ? (isFr ? 'Toutes les Opérations' : 'All Operations')
                        : t === 'lead' 
                        ? (isFr ? 'Prospects' : 'Leads') 
                        : t === 'applicant' 
                        ? (isFr ? 'Candidatures' : 'Talent') 
                        : (isFr ? 'Abonnés' : 'Strategic Subs')}
                    </button>
                  ))}
               </div>

               <div className="relative w-full lg:w-96 group">
                  <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-oakivo-secondary transition-colors" size={20} />
                  <input 
                    type="text" 
                    placeholder={isFr ? "Interroger les données du Coffre..." : "Query Vault Intelligence..."} 
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
                          <th className="px-10 py-6 text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">
                            {isFr ? 'Horodatage Tactique' : 'Tactical Timestamp'}
                          </th>
                          <th className="px-10 py-6 text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">
                            {isFr ? 'Vecteur d\'Actif' : 'Asset Vector'}
                          </th>
                          <th className="px-10 py-6 text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">
                            {isFr ? 'Identité & Charge Utile' : 'Identity Payload'}
                          </th>
                          <th className="px-10 py-6 text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">
                            {isFr ? 'Cycle de Vie' : 'Lifecycle'}
                          </th>
                          <th className="px-10 py-6 text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 text-right">
                            {isFr ? 'Action Stratégique' : 'Strategic Action'}
                          </th>
                       </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                       {filteredEntries.map(entry => (
                         <tr key={entry.id} className="hover:bg-gray-50/80 transition-all group cursor-pointer" onClick={() => setSelectedEntry(entry)}>
                            <td className="px-10 py-6">
                               <div className="flex items-center gap-3 text-xs font-bold text-gray-500">
                                  <Clock size={16} className="text-oakivo-secondary" />
                                  {new Date(entry.createdAt).toLocaleString(isFr ? 'fr-CA' : 'en-CA')}
                               </div>
                            </td>
                            <td className="px-10 py-6">
                               <span className={`text-[10px] font-black px-4 py-2 rounded-xl border uppercase tracking-widest ${
                                 entry.type === 'lead' ? 'bg-blue-50 text-blue-600 border-blue-100' :
                                 entry.type === 'applicant' ? 'bg-purple-50 text-purple-600 border-purple-100' :
                                 'bg-green-50 text-green-600 border-green-100'
                               }`}>
                                 {isFr 
                                   ? (entry.type === 'lead' ? 'Prospect' : entry.type === 'applicant' ? 'Candidat' : 'Abonné')
                                   : entry.type
                                 }
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
                                  {isFr 
                                    ? (entry.status === 'new' ? 'Nouveau' : entry.status === 'processed' ? 'Traité' : 'Archivé')
                                    : entry.status
                                  }
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

        {/* TAB: RESEND EMAIL AUDIT LOG */}
        {activeTab === 'email_audit' && (
          <EmailAuditLogSection />
        )}

        {/* TAB 2: WEB VISITORS & ANALYTICS */}
        {activeTab === 'analytics' && analyticsSummary && (
          <div className="space-y-10">
            {/* Overview Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
                <div className="flex items-center gap-2 text-oakivo-secondary text-[10px] font-black uppercase tracking-widest mb-3">
                  <Users size={16} /> {isFr ? 'Visiteurs Totaux Plateforme' : 'Total Platform Visitors'}
                </div>
                <div className="text-4xl font-extrabold text-oakivo-primary font-serif-display">
                  {analyticsSummary.totalVisitors.toLocaleString()}
                </div>
                <span className="text-[10px] text-emerald-600 font-bold mt-2 block">
                  {isFr ? '+14% par rapport à la semaine dernière' : '+14% vs last week'}
                </span>
              </div>

              <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
                <div className="flex items-center gap-2 text-cyan-500 text-[10px] font-black uppercase tracking-widest mb-3">
                  <Activity size={16} /> {isFr ? 'Utilisateurs Actifs En Direct' : 'Active Users Right Now'}
                </div>
                <div className="text-4xl font-extrabold text-emerald-600 font-serif-display flex items-center gap-3">
                  {analyticsSummary.activeVisitorsNow}
                  <span className="w-3 h-3 bg-cyan-500 rounded-full animate-ping" />
                </div>
                <span className="text-[10px] text-gray-400 font-bold mt-2 block">
                  {isFr ? 'Télémétrie en direct' : 'Live Telemetry'}
                </span>
              </div>

              <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
                <div className="flex items-center gap-2 text-blue-500 text-[10px] font-black uppercase tracking-widest mb-3">
                  <Clock size={16} /> {isFr ? 'Temps Moyen sur le Site' : 'Avg Time on Site'}
                </div>
                <div className="text-4xl font-extrabold text-oakivo-primary font-serif-display">
                  {Math.floor(analyticsSummary.avgDurationSec / 60)}m {analyticsSummary.avgDurationSec % 60}s
                </div>
                <span className="text-[10px] text-gray-400 font-bold mt-2 block">
                  {isFr ? 'Taux d\'engagement élevé' : 'High engagement rate'}
                </span>
              </div>

              <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
                <div className="flex items-center gap-2 text-purple-500 text-[10px] font-black uppercase tracking-widest mb-3">
                  <TrendingUp size={16} /> {isFr ? 'Taux de Rebond' : 'Bounce Rate'}
                </div>
                <div className="text-4xl font-extrabold text-oakivo-primary font-serif-display">
                  {analyticsSummary.bounceRatePercent}%
                </div>
                <span className="text-[10px] text-emerald-600 font-bold mt-2 block">
                  {isFr ? 'Standard d\'entreprise optimal' : 'Optimal enterprise standard'}
                </span>
              </div>
            </div>

            {/* Top Pages & Traffic Sources */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Top Performing Pages */}
              <div className="bg-white rounded-[32px] p-8 border border-gray-100 shadow-sm space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                  <h3 className="text-lg font-serif-display font-bold text-oakivo-primary flex items-center gap-2">
                    <Globe size={18} className="text-oakivo-secondary" /> {isFr ? 'Itinéraires les Plus Visités' : 'Top Visited Platform Routes'}
                  </h3>
                  <span className="text-[10px] font-mono text-gray-400 uppercase">{isFr ? 'En Temps Réel' : 'Real-Time'}</span>
                </div>

                <div className="space-y-4">
                  {analyticsSummary.topPages.map((page, idx) => (
                    <div key={idx} className="space-y-1.5">
                      <div className="flex items-center justify-between text-xs font-bold">
                        <span className="text-oakivo-primary font-mono">{page.path}</span>
                        <span className="text-gray-500">
                          {page.views} {isFr ? 'vues' : 'views'} ({page.percentage}%)
                        </span>
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
                    <Zap size={18} className="text-oakivo-secondary" /> {isFr ? 'Canaux de Trafic Entrant' : 'Inbound Traffic Channels'}
                  </h3>
                  <span className="text-[10px] font-mono text-gray-400 uppercase">{isFr ? 'Référents' : 'Referrers'}</span>
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
                        <span className="text-sm font-extrabold text-oakivo-primary block">
                          {source.count} {isFr ? 'clics' : 'clicks'}
                        </span>
                        <span className="text-[10px] text-gray-400 font-mono">
                          {source.percentage}% {isFr ? 'du total' : 'of total'}
                        </span>
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
                {isFr ? 'Générer Données de Simulation de Trafic' : 'Generate Traffic Simulation Data'}
              </Button>
            </div>
            <AdminAnalyticsDashboard events={recentPageViews} />

            {/* Live Visitor Feed */}
            <div className="bg-white rounded-[32px] p-8 border border-gray-100 shadow-sm space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                <h3 className="text-lg font-serif-display font-bold text-oakivo-primary flex items-center gap-2">
                  <Activity size={18} className="text-cyan-500" /> {isFr ? 'Flux de Télémétrie des Visiteurs Récents' : 'Recent Visitor Telemetry Feed'}
                </h3>
                <span className="text-[10px] font-mono text-gray-400 uppercase">{isFr ? 'Auto-Actualisé' : 'Auto-Updating'}</span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs font-mono">
                  <thead>
                    <tr className="text-gray-400 uppercase text-[9px] border-b border-gray-100">
                      <th className="pb-3">{isFr ? 'Horodatage' : 'Timestamp'}</th>
                      <th className="pb-3">{isFr ? 'Chemin Visité' : 'Visited Path'}</th>
                      <th className="pb-3">{isFr ? 'Appareil' : 'Device'}</th>
                      <th className="pb-3">{isFr ? 'Localisation' : 'Location'}</th>
                      <th className="pb-3">{isFr ? 'Source de Trafic' : 'Traffic Source'}</th>
                      <th className="pb-3 text-right">{isFr ? 'Durée' : 'Duration'}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {recentPageViews.slice(0, 10).map((pv) => (
                      <tr key={pv.id} className="hover:bg-gray-50/80 transition-colors">
                        <td className="py-3.5 text-gray-500">{new Date(pv.timestamp).toLocaleTimeString(isFr ? 'fr-CA' : 'en-CA')}</td>
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
        
            {activeTab === 'insights' && (
              <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl">
                <div className="flex justify-between items-center mb-6 border-b border-slate-800 pb-4">
                  <div>
                    <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                      <Terminal className="text-cyan-400" /> {isFr ? 'Éditeur de Contenu et Renseignements' : 'Content Editor'}
                    </h2>
                    <p className="text-slate-400 mt-2 font-mono text-sm">
                      {isFr ? 'Créer et publier des analyses de sécurité sur /insights.' : 'Create and publish security insights to /insights.'}
                    </p>
                  </div>
                  <button onClick={() => window.open('/insights', '_blank')} className="px-4 py-2 bg-slate-800 text-white rounded-lg hover:bg-slate-700 font-mono text-xs cursor-pointer">
                    {isFr ? 'Voir la Page Publique' : 'View Live Page'}
                  </button>
                </div>
                
                <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800">
                  <div className="flex items-start gap-4">
                    <AlertCircle className="text-cyan-500 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="text-white font-bold mb-2">
                        {isFr ? 'Comment mettre à jour le contenu :' : 'How to update content:'}
                      </h3>
                      <p className="text-slate-400 text-sm leading-relaxed mb-4">
                        {isFr 
                          ? 'Nous avons conçu une architecture headless pour vos articles. Pour ajouter ou modifier des publications au format Markdown, mettez simplement à jour le tableau JSON dans '
                          : 'We have designed a headless structure for your articles. To add or modify articles with rich Markdown formatting, simply update the JSON array in '
                        }
                        <code className="text-cyan-400">content/insights.ts</code>.
                        {isFr 
                          ? ' L\'application génère automatiquement une mise en page éditoriale de prestige.'
                          : ' The application automatically renders this on the frontend into a world-class magazine layout.'
                        }
                      </p>
                      <p className="text-slate-400 text-sm leading-relaxed mb-4">
                        {isFr
                          ? 'Si vous préférez publier des articles via la base de données, utilisez la console Firebase Firestore pour insérer des documents dans la collection insights. Le frontend interroge Firebase en priorité avant d\'utiliser les données statiques.'
                          : 'If you prefer to push articles via the database, you can use the Firebase Firestore console to add documents to the insights collection. The frontend is already wired to pull from Firebase first, and fall back to the static file if none exist!'
                        }
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
  
            {activeTab === 'seo' && (
          <div className="space-y-10">
            {/* Health Score Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm flex items-center gap-6">
                <div className="w-20 h-20 bg-emerald-50 text-emerald-600 rounded-3xl flex items-center justify-center font-extrabold text-3xl font-serif-display border border-emerald-100">
                  96
                </div>
                <div>
                  <h4 className="text-base font-bold text-oakivo-primary">
                    {isFr ? 'Score SEO Global' : 'Overall SEO Score'}
                  </h4>
                  <p className="text-xs text-gray-400 mt-1">
                    {isFr ? 'Prêt pour l\'indexation Google & Bing' : 'Sovereign Google/Bing Search Ready'}
                  </p>
                </div>
              </div>

              <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm flex items-center gap-6">
                <div className="w-20 h-20 bg-blue-50 text-blue-600 rounded-3xl flex items-center justify-center font-extrabold text-3xl font-serif-display border border-blue-100">
                  100%
                </div>
                <div>
                  <h4 className="text-base font-bold text-oakivo-primary">
                    {isFr ? 'Validité des Schémas Meta' : 'Meta Schema Validity'}
                  </h4>
                  <p className="text-xs text-gray-400 mt-1">
                    {isFr ? 'Balises OpenGraph & Canoniques Actives' : 'OpenGraph & Canonical Meta Active'}
                  </p>
                </div>
              </div>

              <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm flex items-center gap-6">
                <div className="w-20 h-20 bg-purple-50 text-purple-600 rounded-3xl flex items-center justify-center font-extrabold text-3xl font-serif-display border border-purple-100">
                  98%
                </div>
                <div>
                  <h4 className="text-base font-bold text-oakivo-primary">
                    {isFr ? 'Indexabilité Mobile' : 'Mobile Indexability'}
                  </h4>
                  <p className="text-xs text-gray-400 mt-1">
                    {isFr ? 'Points de rupture réactifs vérifiés' : 'Responsive Breakpoints Verified'}
                  </p>
                </div>
              </div>
            </div>

            {/* SEO Audit Detailed List */}
            <div className="bg-white rounded-[32px] p-8 border border-gray-100 shadow-sm space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                <h3 className="text-lg font-serif-display font-bold text-oakivo-primary flex items-center gap-2">
                  <SearchIcon size={18} className="text-oakivo-secondary" /> {isFr ? 'Ventilation de la Santé SEO Page par Page' : 'Page-by-Page SEO Health Breakdown'}
                </h3>
                <span className="text-[10px] font-mono text-gray-400 uppercase">{isFr ? 'Audit Diagnostique' : 'Diagnostic Audit'}</span>
              </div>

              <div className="space-y-6">
                {seoHealth.map((audit, idx) => (
                  <div key={idx} className="p-6 bg-gray-50 rounded-2xl border border-gray-100 space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div>
                        <span className="text-base font-bold text-oakivo-primary font-mono">{audit.page}</span>
                        <p className="text-xs text-gray-400 mt-0.5">
                          {isFr ? 'Audit Titre, Meta, En-têtes & OpenGraph' : 'Title, Meta, Heading & OpenGraph Audit'}
                        </p>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-lg border border-emerald-100">
                          {isFr ? 'Vitesse :' : 'Speed Score:'} {audit.speedScore}/100
                        </span>
                        <span className="text-xs font-bold text-oakivo-primary bg-white px-3 py-1 rounded-lg border border-gray-200 shadow-sm">
                          {isFr ? 'Global :' : 'Overall:'} {Math.round((audit.titleScore + audit.metaScore + audit.headingScore + audit.speedScore) / 4)}%
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-mono">
                      <div className="bg-white p-3 rounded-xl border border-gray-100">
                        <span className="text-gray-400 block text-[9px] uppercase">{isFr ? 'Balise Titre' : 'Title Tag'}</span>
                        <span className="font-bold text-emerald-600">{audit.titleScore}% {isFr ? 'Vérifié' : 'Verified'}</span>
                      </div>
                      <div className="bg-white p-3 rounded-xl border border-gray-100">
                        <span className="text-gray-400 block text-[9px] uppercase">{isFr ? 'Méta-Description' : 'Meta Description'}</span>
                        <span className="font-bold text-emerald-600">{audit.metaScore}% {isFr ? 'Optimisé' : 'Optimized'}</span>
                      </div>
                      <div className="bg-white p-3 rounded-xl border border-gray-100">
                        <span className="text-gray-400 block text-[9px] uppercase">{isFr ? 'Hiérarchie H1/H2' : 'H1/H2 Hierarchy'}</span>
                        <span className="font-bold text-emerald-600">{audit.headingScore}% {isFr ? 'Structuré' : 'Structured'}</span>
                      </div>
                      <div className="bg-white p-3 rounded-xl border border-gray-100">
                        <span className="text-gray-400 block text-[9px] uppercase">{isFr ? 'Social OpenGraph' : 'OpenGraph Social'}</span>
                        <span className="font-bold text-emerald-600">{audit.openGraphScore}% {isFr ? 'Prêt' : 'Ready'}</span>
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
              <Shield size={24} className="text-oakivo-secondary" /> {isFr ? 'Infrastructure de Données Souveraines (v5.2)' : 'Data Sovereign Infrastructure (v5.2)'}
           </div>
           <p className="text-[10px] font-bold text-center md:text-right max-w-md uppercase tracking-[0.15em] leading-relaxed">
             {isFr 
               ? 'Tous les actifs stratégiques et la télémétrie analytique web sont gérés selon les protocoles canadiens de résidence des données. Les sessions d\'accès sont journalisées et signées cryptographiquement.'
               : 'All strategic assets & web analytics telemetry are managed under Canadian data residency protocols. Access sessions are logged and cryptographically signed.'
             }
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
                          <h2 className="text-3xl font-serif-display font-bold">
                            {isFr ? 'Analyse de l\'Actif' : 'Asset Analysis'}
                          </h2>
                          <p className="text-[10px] text-oakivo-secondary font-black uppercase tracking-[0.4em] mt-2">
                            {isFr ? 'Référence Coffre :' : 'Vault Reference:'} {selectedEntry.id.substring(0, 13)}
                          </p>
                       </div>
                    </div>
                    <button onClick={() => setSelectedEntry(null)} className="p-3 hover:bg-white/10 rounded-full transition-all cursor-pointer">
                       <X size={32} />
                    </button>
                 </div>
              </div>

              <div className="p-12 space-y-12 max-h-[60vh] overflow-y-auto">
                 <div className="grid grid-cols-2 gap-12 border-b border-gray-100 pb-12">
                    <div>
                       <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] block mb-2">
                         {isFr ? 'Plateforme d\'Acquisition' : 'Acquisition Hub'}
                       </label>
                       <p className="text-xl font-bold text-oakivo-primary font-serif-display tracking-tight">Oakivo Solutions Portal</p>
                    </div>
                    <div>
                       <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] block mb-2">
                         {isFr ? 'Cycle de Vie de l\'Actif' : 'Asset Lifecycle'}
                       </label>
                       <div className="flex gap-2">
                          {(['new', 'processed', 'archived'] as const).map(s => (
                            <button
                              key={s}
                              onClick={() => handleUpdateStatus(selectedEntry.id, s)}
                              className={`px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all cursor-pointer ${selectedEntry.status === s ? 'bg-oakivo-secondary text-oakivo-primary shadow-xl scale-105' : 'bg-gray-50 text-gray-400 hover:bg-gray-100'}`}
                            >
                              {isFr 
                                ? (s === 'new' ? 'Nouveau' : s === 'processed' ? 'Traité' : 'Archivé')
                                : s
                              }
                            </button>
                          ))}
                       </div>
                    </div>
                 </div>

                 <div className="space-y-8">
                    <h3 className="text-[10px] font-black text-oakivo-primary uppercase tracking-[0.4em] flex items-center gap-3">
                       <Code size={18} className="text-oakivo-secondary" /> {isFr ? 'Charge d\'Information Utile' : 'Information Payload'}
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
                 <button onClick={() => handleDelete(selectedEntry.id)} className="text-red-500 text-[10px] font-black uppercase tracking-widest flex items-center gap-3 hover:scale-105 transition-all cursor-pointer">
                    <Trash2 size={20} /> {isFr ? 'Effacement Sécurisé' : 'Secure Wipe'}
                 </button>
                 <Button variant="black" size="lg" onClick={() => setSelectedEntry(null)}>
                   {isFr ? 'Fermer l\'Inspecteur' : 'Close Inspector'}
                 </Button>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default AdminPortal;
