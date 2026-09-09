import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Lock, Mail, Key, ArrowRight, Shield, Download, FileText, Activity, LogOut, Loader2, CheckCircle2 } from 'lucide-react';
import SEO from '../components/SEO';
import { auth } from '../utils/firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged, signOut, User } from 'firebase/auth';

const ClientPortal: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isInitializing, setIsInitializing] = useState(true);
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

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
        setError('Invalid credentials. Please verify your access provisioning.');
      } else if (err.code === 'auth/email-already-in-use') {
        setError('An account with this corporate email already exists.');
      } else if (err.code === 'auth/weak-password') {
        setError('Password must be at least 6 characters to meet compliance standards.');
      } else {
        setError('Authentication failed. Please contact your Oakivo technical account manager.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignOut = () => {
    signOut(auth);
  };

  if (isInitializing) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-cyan-500 animate-spin" />
      </div>
    );
  }

  return (
    <>
      <SEO 
        title="Secure Client Portal | Oakivo"
        description="Access Oakivo's secure enclave for premium compliance blueprints, threat matrices, and interactive DevSecOps tooling."
      />
      <section className="pt-32 pb-24 px-6 min-h-screen bg-slate-950 relative flex flex-col items-center justify-center">
        {/* Glow Effects */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.02] pointer-events-none"></div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[400px] bg-cyan-500/10 blur-[120px] rounded-full pointer-events-none"></div>

        <div className="container mx-auto max-w-6xl relative z-10 w-full">
          
          <AnimatePresence mode="wait">
            {!user ? (
              <motion.div 
                key="auth"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="max-w-md mx-auto"
              >
                <div className="text-center mb-8">
                  <div className="w-16 h-16 bg-slate-900 border border-slate-800 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-[0_0_40px_rgba(6,182,212,0.15)]">
                    <Lock className="text-cyan-400" size={28} />
                  </div>
                  <h1 className="text-3xl font-display font-bold text-white mb-3">Secure Enclave</h1>
                  <p className="text-slate-400 font-light text-sm">
                    Authenticate to access premium compliance blueprints and interactive security tooling.
                  </p>
                </div>

                <div className="bg-slate-900/60 border border-slate-800/80 rounded-3xl p-8 backdrop-blur-xl shadow-2xl">
                  {error && (
                    <div className="mb-6 p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-mono flex items-start gap-3">
                      <Lock size={16} className="mt-0.5 flex-shrink-0" />
                      <span>{error}</span>
                    </div>
                  )}

                  <form onSubmit={handleAuth} className="space-y-5">
                    <div className="space-y-1.5">
                      <label className="text-xs font-mono font-bold uppercase tracking-widest text-slate-500">Corporate Email</label>
                      <div className="relative">
                        <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                        <input 
                          required
                          type="email" 
                          value={email}
                          onChange={e => setEmail(e.target.value)}
                          className="w-full bg-slate-950/50 border border-slate-800 rounded-xl py-3.5 pl-12 pr-4 text-white focus:outline-none focus:border-cyan-500 transition-colors text-sm"
                          placeholder="executive@enterprise.com"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-1.5">
                      <label className="text-xs font-mono font-bold uppercase tracking-widest text-slate-500">Access Token / Password</label>
                      <div className="relative">
                        <Key size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                        <input 
                          required
                          type="password" 
                          value={password}
                          onChange={e => setPassword(e.target.value)}
                          className="w-full bg-slate-950/50 border border-slate-800 rounded-xl py-3.5 pl-12 pr-4 text-white focus:outline-none focus:border-cyan-500 transition-colors text-sm"
                          placeholder="••••••••"
                        />
                      </div>
                    </div>

                    <button 
                      type="submit"
                      disabled={isLoading}
                      className="w-full bg-white text-slate-950 font-bold font-mono text-sm py-4 rounded-xl hover:bg-cyan-400 transition-colors flex items-center justify-center gap-2 mt-4"
                    >
                      {isLoading ? (
                        <><Loader2 size={16} className="animate-spin" /> VERIFYING ID...</>
                      ) : (
                        <>{isLoginMode ? 'AUTHENTICATE SESSION' : 'PROVISION ACCESS'} <ArrowRight size={16} /></>
                      )}
                    </button>
                  </form>

                  <div className="mt-8 pt-6 border-t border-slate-800/60 text-center">
                    <button 
                      onClick={() => { setIsLoginMode(!isLoginMode); setError(''); }}
                      className="text-slate-400 hover:text-cyan-400 text-sm transition-colors"
                    >
                      {isLoginMode ? "Need to provision access? Register here." : "Already provisioned? Authenticate here."}
                    </button>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div 
                key="dashboard"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12 border-b border-slate-800/80 pb-8">
                  <div>
                    <div className="inline-flex items-center gap-2 text-xs font-mono font-bold tracking-widest text-emerald-400 uppercase bg-emerald-400/10 px-3 py-1.5 rounded-full border border-emerald-400/20 mb-4">
                      <Shield size={12} /> Secure Session Active
                    </div>
                    <h1 className="text-3xl md:text-4xl font-display font-bold text-white mb-2">Client Intelligence Portal</h1>
                    <p className="text-slate-400 font-mono text-sm">Authenticated Identity: <span className="text-cyan-400">{user.email}</span></p>
                  </div>
                  <button 
                    onClick={handleSignOut}
                    className="flex items-center gap-2 text-slate-400 hover:text-red-400 font-mono text-sm uppercase tracking-widest transition-colors bg-slate-900 border border-slate-800 px-5 py-3 rounded-lg"
                  >
                    Terminate Session <LogOut size={16} />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {/* Premium Asset 1 */}
                  <div className="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-6 hover:border-cyan-500/50 transition-colors group">
                    <div className="w-12 h-12 bg-cyan-950 border border-cyan-900 rounded-xl flex items-center justify-center mb-6">
                      <FileText className="text-cyan-400" size={24} />
                    </div>
                    <h3 className="text-xl font-display font-bold text-white mb-3">Enterprise SOC 2 Blueprint</h3>
                    <p className="text-slate-400 text-sm font-light mb-6">
                      A comprehensive 45-page architectural reference for automating SOC 2 compliance on AWS using Terraform and OPA.
                    </p>
                    <button className="w-full flex items-center justify-center gap-2 py-3 bg-slate-800 text-white font-mono text-xs font-bold rounded-lg group-hover:bg-cyan-500 transition-colors">
                      <Download size={14} /> DOWNLOAD PDF (12MB)
                    </button>
                  </div>

                  {/* Premium Asset 2 */}
                  <div className="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-6 hover:border-cyan-500/50 transition-colors group">
                    <div className="w-12 h-12 bg-cyan-950 border border-cyan-900 rounded-xl flex items-center justify-center mb-6">
                      <Activity className="text-cyan-400" size={24} />
                    </div>
                    <h3 className="text-xl font-display font-bold text-white mb-3">2026 Executive Threat Matrix</h3>
                    <p className="text-slate-400 text-sm font-light mb-6">
                      Proprietary telemetry analysis of the top 10 zero-day vectors targeting cloud-native infrastructure this quarter.
                    </p>
                    <button className="w-full flex items-center justify-center gap-2 py-3 bg-slate-800 text-white font-mono text-xs font-bold rounded-lg group-hover:bg-cyan-500 transition-colors">
                      <Download size={14} /> DOWNLOAD REPORT (8MB)
                    </button>
                  </div>

                  {/* Interactive Tool */}
                  <div className="bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800/80 rounded-2xl p-6 hover:border-cyan-500/50 transition-colors group relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 blur-[40px] rounded-full pointer-events-none"></div>
                    <div className="w-12 h-12 bg-cyan-500/20 border border-cyan-500/30 rounded-xl flex items-center justify-center mb-6">
                      <Shield className="text-cyan-400" size={24} />
                    </div>
                    <h3 className="text-xl font-display font-bold text-white mb-3">Live Posture Scanner</h3>
                    <p className="text-slate-400 text-sm font-light mb-6">
                      Connect your read-only AWS IAM role to generate an instant, automated assessment of your cloud perimeter.
                    </p>
                    <button className="w-full flex items-center justify-center gap-2 py-3 bg-cyan-500 text-slate-950 font-mono text-xs font-bold rounded-lg hover:bg-cyan-400 transition-colors">
                      LAUNCH SCANNER <ArrowRight size={14} />
                    </button>
                  </div>
                </div>

              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </section>
    </>
  );
};

export default ClientPortal;
