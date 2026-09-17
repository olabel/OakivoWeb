import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Lock, 
  Mail, 
  Key, 
  ArrowRight, 
  Shield, 
  Download, 
  FileText, 
  Activity, 
  LogOut, 
  Loader2, 
  CheckCircle2, 
  Sparkles,
  LayoutDashboard,
  FileCheck
} from 'lucide-react';
import SEO from '../components/SEO';
import { auth } from '../utils/firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged, signOut, User } from 'firebase/auth';
import SecurityHealthDashboard from '../components/SecurityHealthDashboard';
import { useLanguage } from '../context/LanguageContext';

const ClientPortal: React.FC = () => {
  const { language } = useLanguage();
  const isFr = language === 'fr';

  const [user, setUser] = useState<User | null>(null);
  const [isInitializing, setIsInitializing] = useState(true);
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState<'health_dashboard' | 'compliance_assets'>('health_dashboard');
  const [isDemoActive, setIsDemoActive] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setIsInitializing(false);
    });
    return () => unsubscribe();
  }, []);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
      if (isLoginMode) {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
      }
    } catch (err: any) {
      console.error(err);
      if (err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password' || err.code === 'auth/invalid-credential') {
        setError(isFr 
          ? 'Identifiants invalides. Veuillez vérifier les accès attribués.' 
          : 'Invalid credentials. Please verify your access provisioning.');
      } else if (err.code === 'auth/email-already-in-use') {
        setError(isFr 
          ? 'Un compte avec cette adresse courriel corporative existe déjà.' 
          : 'An account with this corporate email already exists.');
      } else if (err.code === 'auth/weak-password') {
        setError(isFr 
          ? 'Le mot de passe doit comporter au moins 6 caractères pour satisfaire les normes de sécurité.' 
          : 'Password must be at least 6 characters to meet compliance standards.');
      } else {
        setError(isFr 
          ? 'Échec d\'authentification. Veuillez contacter votre responsable technique de compte Oakivo.' 
          : 'Authentication failed. Please contact your Oakivo technical account manager.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignOut = () => {
    if (isDemoActive) {
      setIsDemoActive(false);
    }
    signOut(auth);
  };

  if (isInitializing) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-cyan-500 animate-spin" />
      </div>
    );
  }

  const isEnclaveUnlocked = !!user || isDemoActive;

  return (
    <>
      <SEO 
        title={isFr 
          ? "Portail Client Sécurisé & Tableau de Bord de Santé Sécurité | Oakivo" 
          : "Secure Client Portal & Security Health Dashboard | Oakivo"}
        description={isFr 
          ? "Tableau de bord de santé de sécurité en temps réel affichant la télémétrie des analyses automatisées, la posture Zéro Confiance continue et les remédiations autonomes d'incidents."
          : "Real-time Security Health Dashboard displaying automated scan metrics, continuous zero-trust posture, and autonomous incident remediations."}
      />
      <section className="pt-28 pb-24 px-4 sm:px-6 min-h-screen bg-slate-950 relative flex flex-col items-center">
        {/* Glow Effects */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.02] pointer-events-none"></div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-[450px] bg-cyan-500/10 blur-[130px] rounded-full pointer-events-none"></div>

        <div className="container mx-auto max-w-7xl relative z-10 w-full">
          
          <AnimatePresence mode="wait">
            {!isEnclaveUnlocked ? (
              <motion.div 
                key="auth"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="max-w-md mx-auto my-auto pt-8"
              >
                <div className="text-center mb-8">
                  <div className="w-16 h-16 bg-slate-900 border border-slate-800 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-[0_0_40px_rgba(6,182,212,0.15)]">
                    <Lock className="text-cyan-400" size={28} />
                  </div>
                  <h1 className="text-3xl font-display font-bold text-white mb-3">
                    {isFr ? "Enclave Client" : "Client Enclave"}
                  </h1>
                  <p className="text-slate-300 font-normal text-sm">
                    {isFr
                      ? "Authentifiez-vous pour accéder à votre tableau de bord de santé de sécurité, à la télémétrie des scans et aux pistes d'audit des incidents."
                      : "Authenticate to access your real-time Security Health Dashboard, automated scan telemetry, and incident audit trails."}
                  </p>
                </div>

                <div className="bg-slate-900/60 border border-slate-800/80 rounded-3xl p-8 backdrop-blur-xl shadow-2xl space-y-6">
                  {error && (
                    <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-300 text-sm font-mono flex items-start gap-3">
                      <Lock size={16} className="mt-0.5 flex-shrink-0" />
                      <span>{error}</span>
                    </div>
                  )}

                  <form onSubmit={handleAuth} className="space-y-4">
                    <div className="space-y-1.5">
                      <label htmlFor="email" className="text-xs font-mono font-bold uppercase tracking-widest text-slate-400">
                        {isFr ? "Courriel Corporatif" : "Corporate Email"}
                      </label>
                      <div className="relative">
                        <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                        <input 
                          id="email"
                          required
                          type="email" 
                          value={email}
                          onChange={e => setEmail(e.target.value)}
                          className="w-full bg-slate-950/50 border border-slate-800 rounded-xl py-3.5 pl-12 pr-4 text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors text-sm"
                          placeholder="direction@entreprise.ca"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-1.5">
                      <label htmlFor="password" className="text-xs font-mono font-bold uppercase tracking-widest text-slate-400">
                        {isFr ? "Jeton d'Accès / Mot de Passe" : "Access Token / Password"}
                      </label>
                      <div className="relative">
                        <Key size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                        <input 
                          id="password"
                          required
                          type="password" 
                          value={password}
                          onChange={e => setPassword(e.target.value)}
                          className="w-full bg-slate-950/50 border border-slate-800 rounded-xl py-3.5 pl-12 pr-4 text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors text-sm"
                          placeholder="••••••••"
                        />
                      </div>
                    </div>

                    <button 
                      type="submit"
                      disabled={isLoading}
                      className="w-full bg-cyan-500 text-slate-950 font-bold font-mono text-sm py-4 rounded-xl hover:bg-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 focus:ring-offset-slate-900 transition-colors flex items-center justify-center gap-2 mt-4 cursor-pointer"
                    >
                      {isLoading ? (
                        <><Loader2 size={16} className="animate-spin" /> {isFr ? "VÉRIFICATION DE LA CLÉ..." : "VERIFYING ENCLAVE KEY..."}</>
                      ) : (
                        <>{isLoginMode ? (isFr ? 'AUTHENTIFIER LA SESSION' : 'AUTHENTICATE SESSION') : (isFr ? 'INITIALISER L\'ACCÈS' : 'PROVISION ACCESS')} <ArrowRight size={16} /></>
                      )}
                    </button>
                  </form>

                  {/* Instant Demo Preview Option */}
                  <div className="pt-4 border-t border-slate-800/80">
                    <button
                      onClick={() => setIsDemoActive(true)}
                      className="w-full py-3.5 px-4 rounded-xl bg-slate-950/80 hover:bg-slate-800 border border-slate-700 text-cyan-300 font-mono text-xs font-bold transition-all flex items-center justify-center gap-2.5 group cursor-pointer"
                    >
                      <Sparkles className="w-4 h-4 text-cyan-400 group-hover:rotate-12 transition-transform" />
                      <span>{isFr ? "EXPLORER LE TABLEAU DE BORD EN DIRECT (DÉMO)" : "EXPLORE LIVE SECURITY DASHBOARD (DEMO)"}</span>
                    </button>
                    <p className="text-[11px] text-slate-500 text-center font-mono mt-2">
                      {isFr
                        ? "Mode d'évaluation immédiat avec télémétrie en direct et remédiations simulées."
                        : "Instant evaluation mode with live automated telemetry & simulated remediations."}
                    </p>
                  </div>

                  <div className="pt-2 text-center">
                    <button 
                      onClick={() => { setIsLoginMode(!isLoginMode); setError(''); }}
                      className="text-slate-400 hover:text-cyan-400 text-xs font-mono transition-colors cursor-pointer"
                    >
                      {isLoginMode 
                        ? (isFr ? "Besoin de configurer un nouvel accès client ? Créez un compte ici." : "Need to provision new client access? Register here.")
                        : (isFr ? "Accès déjà configuré ? Connectez-vous ici." : "Already provisioned? Authenticate here.")}
                    </button>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div 
                key="dashboard"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full space-y-8"
              >
                {/* Enclave Top Navigation & Session Bar */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-slate-800/80 pb-6">
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-3">
                      <div className="inline-flex items-center gap-2 text-xs font-mono font-bold tracking-widest text-emerald-400 uppercase bg-emerald-400/10 px-3 py-1 rounded-full border border-emerald-400/20">
                        <Shield size={12} /> {isDemoActive ? (isFr ? 'Enclave Démo Active' : 'Demo Enclave Active') : (isFr ? 'Session Sécurisée Active' : 'Secure Session Active')}
                      </div>
                      <span className="text-xs font-mono text-slate-400">
                        {isFr ? "Environnement :" : "Environment:"} <strong className="text-cyan-400">AWS ca-central-1 (Maillage Atlantique)</strong>
                      </span>
                    </div>
                    <h1 className="text-3xl md:text-4xl font-display font-bold text-white">
                      {isFr ? "Enclave d'Intelligence Client" : "Client Intelligence Enclave"}
                    </h1>
                    <p className="text-slate-400 font-mono text-xs">
                      {isFr ? "Identité Authentifiée :" : "Authenticated Identity:"} <span className="text-cyan-300">{user?.email || 'demo.enterprise@oakivo.cloud'}</span>
                    </p>
                  </div>

                  {/* Navigation Tabs & Logout */}
                  <div className="flex flex-wrap items-center gap-3">
                    <div className="bg-slate-900/80 border border-slate-800 p-1 rounded-xl flex items-center">
                      <button
                        onClick={() => setActiveTab('health_dashboard')}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                          activeTab === 'health_dashboard'
                            ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                            : 'text-slate-400 hover:text-white'
                        }`}
                      >
                        <LayoutDashboard className="w-3.5 h-3.5" />
                        {isFr ? "Santé Sécurité" : "Security Health Dashboard"}
                      </button>

                      <button
                        onClick={() => setActiveTab('compliance_assets')}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                          activeTab === 'compliance_assets'
                            ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                            : 'text-slate-400 hover:text-white'
                        }`}
                      >
                        <FileCheck className="w-3.5 h-3.5" />
                        {isFr ? "Ressources & Modèles de Conformité" : "Compliance Assets & Blueprints"}
                      </button>
                    </div>

                    <button 
                      onClick={handleSignOut}
                      className="flex items-center gap-2 text-slate-400 hover:text-red-400 font-mono text-xs uppercase tracking-widest transition-colors bg-slate-900 border border-slate-800 px-4 py-2.5 rounded-xl cursor-pointer"
                    >
                      <LogOut size={14} /> {isFr ? "Déconnexion" : "Exit"}
                    </button>
                  </div>
                </div>

                {/* Tab 1: Real-Time Security Health Dashboard */}
                {activeTab === 'health_dashboard' && (
                  <SecurityHealthDashboard 
                    userEmail={user?.email || 'demo.enterprise@oakivo.cloud'} 
                    isDemo={isDemoActive} 
                  />
                )}

                {/* Tab 2: Compliance Assets & Blueprints */}
                {activeTab === 'compliance_assets' && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-display font-bold text-white mb-2">
                        {isFr ? "Plans d'Architecture & Conformité Entreprise" : "Enterprise Compliance Blueprints"}
                      </h3>
                      <p className="text-slate-400 text-sm">
                        {isFr
                          ? "Architectures de sécurité vérifiées, modules d'audit Terraform et matrices de menaces réservés exclusivement aux clients partenaires d'Oakivo."
                          : "Curated security architectures, Terraform audit modules, and threat matrices available exclusively to Oakivo enterprise retainers."}
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {/* Premium Asset 1 */}
                      <div className="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-6 hover:border-cyan-500/50 transition-colors group">
                        <div className="w-12 h-12 bg-cyan-950 border border-cyan-900 rounded-xl flex items-center justify-center mb-6">
                          <FileText className="text-cyan-400" size={24} />
                        </div>
                        <h4 className="text-xl font-display font-bold text-white mb-3">
                          {isFr ? "Plan Architectural SOC 2 Entreprise" : "Enterprise SOC 2 Blueprint"}
                        </h4>
                        <p className="text-slate-400 text-sm font-light mb-6">
                          {isFr
                            ? "Guide de référence complet de 45 pages pour automatiser la conformité continue SOC 2 sur AWS avec Terraform et OPA Gatekeeper."
                            : "A comprehensive 45-page architectural reference for automating continuous SOC 2 compliance on AWS using Terraform and OPA Gatekeeper."}
                        </p>
                        <button 
                          onClick={() => {
                            const blob = new Blob(["Oakivo Solutions Inc. - SOC 2 Type II Automated Compliance Architectural Blueprint 2026."], { type: 'text/plain' });
                            const url = URL.createObjectURL(blob);
                            const a = document.createElement('a');
                            a.href = url;
                            a.download = "Oakivo-SOC2-Blueprint-2026.pdf";
                            a.click();
                          }}
                          className="w-full flex items-center justify-center gap-2 py-3 bg-slate-800 text-white font-mono text-xs font-bold rounded-lg group-hover:bg-cyan-500 group-hover:text-slate-950 transition-colors cursor-pointer"
                        >
                          <Download size={14} /> {isFr ? "TÉLÉCHARGER LE PLAN (12 Mo)" : "DOWNLOAD BLUEPRINT (12MB)"}
                        </button>
                      </div>

                      {/* Premium Asset 2 */}
                      <div className="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-6 hover:border-cyan-500/50 transition-colors group">
                        <div className="w-12 h-12 bg-cyan-950 border border-cyan-900 rounded-xl flex items-center justify-center mb-6">
                          <Activity className="text-cyan-400" size={24} />
                        </div>
                        <h4 className="text-xl font-display font-bold text-white mb-3">
                          {isFr ? "Matrice de Télémétrie des Menaces 2026" : "2026 Threat Telemetry Matrix"}
                        </h4>
                        <p className="text-slate-400 text-sm font-light mb-6">
                          {isFr
                            ? "Analyse exclusive des principaux vecteurs zero-day, vulnérabilités de la chaîne d'approvisionnement des conteneurs et signatures eBPF."
                            : "Proprietary analysis of the top zero-day vectors, container supply chain attack vectors, and eBPF detection signatures."}
                        </p>
                        <button 
                          onClick={() => {
                            const blob = new Blob(["Oakivo Solutions Inc. - 2026 Executive Threat Telemetry Matrix."], { type: 'text/plain' });
                            const url = URL.createObjectURL(blob);
                            const a = document.createElement('a');
                            a.href = url;
                            a.download = "Oakivo-Threat-Matrix-2026.pdf";
                            a.click();
                          }}
                          className="w-full flex items-center justify-center gap-2 py-3 bg-slate-800 text-white font-mono text-xs font-bold rounded-lg group-hover:bg-cyan-500 group-hover:text-slate-950 transition-colors cursor-pointer"
                        >
                          <Download size={14} /> {isFr ? "TÉLÉCHARGER LE RAPPORT (8 Mo)" : "DOWNLOAD REPORT (8MB)"}
                        </button>
                      </div>

                      {/* Premium Asset 3 */}
                      <div className="bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800/80 rounded-2xl p-6 hover:border-cyan-500/50 transition-colors group relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 blur-[40px] rounded-full pointer-events-none"></div>
                        <div className="w-12 h-12 bg-cyan-500/20 border border-cyan-500/30 rounded-xl flex items-center justify-center mb-6">
                          <Shield className="text-cyan-400" size={24} />
                        </div>
                        <h4 className="text-xl font-display font-bold text-white mb-3">
                          {isFr ? "Trousse de Conformité LPRPDE & Loi 25" : "PIPEDA / Law 25 Compliance Pack"}
                        </h4>
                        <p className="text-slate-400 text-sm font-light mb-6">
                          {isFr
                            ? "Modèles d'infrastructure validés assurant que toutes les données personnelles et bases de données demeurent sur le sol canadien."
                            : "Validated infrastructure templates ensuring all customer PII and database archives remain restricted to Canadian sovereign data regions."}
                        </p>
                        <button 
                          onClick={() => {
                            const blob = new Blob(["Oakivo Solutions Inc. - Canadian Data Sovereignty & Law 25 Compliance Pack."], { type: 'text/plain' });
                            const url = URL.createObjectURL(blob);
                            const a = document.createElement('a');
                            a.href = url;
                            a.download = "Oakivo-PIPEDA-Compliance-Pack.pdf";
                            a.click();
                          }}
                          className="w-full flex items-center justify-center gap-2 py-3 bg-cyan-500 text-slate-950 font-mono text-xs font-bold rounded-lg hover:bg-cyan-400 transition-colors cursor-pointer"
                        >
                          {isFr ? "TÉLÉCHARGER LA TROUSSE" : "DOWNLOAD COMPLIANCE PACK"} <ArrowRight size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                )}

              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </section>
    </>
  );
};

export default ClientPortal;

