import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Shield, ChevronRight, AlertTriangle, CheckCircle, ShieldAlert, ArrowRight, Activity, Server, Lock, Loader2, Mail, User, Building } from 'lucide-react';
import SEO from '../components/SEO';
import { db } from '../utils/database';
import { useNavigate } from 'react-router-dom';

const questions = [
  {
    id: 1,
    category: "Infrastructure Deployment",
    icon: <Server size={24} className="text-cyan-400" />,
    title: "How do you currently provision and manage your cloud infrastructure?",
    options: [
      { id: '1a', label: "Manually via Cloud Provider Consoles (AWS/Azure GUI)", score: 0, desc: "High risk of human error and configuration drift." },
      { id: '1b', label: "Mix of manual processes and basic scripts", score: 3, desc: "Inconsistent deployments and limited auditability." },
      { id: '1c', label: "Infrastructure-as-Code (Terraform, CloudFormation)", score: 7, desc: "Standardized, version-controlled deployments." },
      { id: '1d', label: "IaC with integrated Policy-as-Code (OPA, Checkov)", score: 10, desc: "Continuous compliance and proactive misconfiguration blocking." }
    ]
  },
  {
    id: 2,
    category: "Access & Identity",
    icon: <Lock size={24} className="text-cyan-400" />,
    title: "How is access to critical production workloads governed?",
    options: [
      { id: '2a', label: "Static passwords and shared credentials", score: 0, desc: "Critical vulnerability to credential stuffing and phishing." },
      { id: '2b', label: "Standard MFA on primary accounts", score: 4, desc: "Basic protection, but vulnerable to session hijacking." },
      { id: '2c', label: "SSO with Role-Based Access Control (RBAC)", score: 7, desc: "Centralized identity management." },
      { id: '2d', label: "Context-aware Zero-Trust (Device posture, mTLS)", score: 10, desc: "Cryptographic identity verification for every request." }
    ]
  },
  {
    id: 3,
    category: "Threat Detection",
    icon: <Activity size={24} className="text-cyan-400" />,
    title: "What is your primary mechanism for identifying security breaches?",
    options: [
      { id: '3a', label: "Reactive (Customer reports, apparent downtime)", score: 0, desc: "Accepting unquantified risk." },
      { id: '3b', label: "Manual log reviews and basic alerts", score: 3, desc: "High mean-time-to-detect (MTTD)." },
      { id: '3c', label: "Centralized SIEM with automated anomaly detection", score: 7, desc: "Proactive identification of known threats." },
      { id: '3d', label: "Kernel-level eBPF monitoring and AI-driven SOAR", score: 10, desc: "Immediate autonomous mitigation of zero-day behavior." }
    ]
  },
  {
    id: 4,
    category: "Compliance & Auditing",
    icon: <Shield size={24} className="text-cyan-400" />,
    title: "How do you maintain compliance with regulatory frameworks (SOC 2, ISO 27001)?",
    options: [
      { id: '4a', label: "We do not have formal compliance tracking", score: 0, desc: "Significant liability and commercial blocker." },
      { id: '4b', label: "Annual point-in-time manual audits", score: 4, desc: "High risk of compliance drift between audits." },
      { id: '4c', label: "Quarterly reviews with automated evidence gathering", score: 7, desc: "Strong baseline, but still reactive." },
      { id: '4d', label: "Continuous automated compliance monitoring", score: 10, desc: "Cryptographically verifiable real-time compliance." }
    ]
  },
  {
    id: 5,
    category: "Incident Response",
    icon: <ShieldAlert size={24} className="text-cyan-400" />,
    title: "What is your capability to recover from a catastrophic ransomware event?",
    options: [
      { id: '5a', label: "No formal disaster recovery plan", score: 0, desc: "Existential risk to the business." },
      { id: '5b', label: "Standard backups (same environment/account)", score: 3, desc: "Backups are likely compromised during an attack." },
      { id: '5c', label: "Immutable, air-gapped backups", score: 7, desc: "Data is safe, but infrastructure rebuild is slow." },
      { id: '5d', label: "Automated multi-region infrastructure rebuild pipelines", score: 10, desc: "Recovery Time Objective (RTO) measured in minutes." }
    ]
  }
];

const RiskCalculator: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showResults, setShowResults] = useState(false);
  
  // Lead form state
  const [formData, setFormData] = useState({ name: '', email: '', company: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSelectOption = (score: number) => {
    setAnswers(prev => ({ ...prev, [currentStep]: score }));
    
    if (currentStep < questions.length - 1) {
      setTimeout(() => setCurrentStep(prev => prev + 1), 400);
    } else {
      setTimeout(() => calculateResults(), 400);
    }
  };

  const calculateResults = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      setShowResults(true);
    }, 2500); // Simulate deep analysis
  };

  const totalScore = Object.values(answers).reduce((a, b) => a + b, 0);
  const maxScore = questions.length * 10;
  const percentage = Math.round((totalScore / maxScore) * 100);

  let maturityLevel = "Critical Risk";
  let colorClass = "text-red-500";
  let bgClass = "bg-red-500/10";
  let borderClass = "border-red-500/30";
  
  if (percentage >= 80) {
    maturityLevel = "Elite (Zero-Trust)";
    colorClass = "text-cyan-400";
    bgClass = "bg-cyan-400/10";
    borderClass = "border-cyan-400/30";
  } else if (percentage >= 50) {
    maturityLevel = "Advanced";
    colorClass = "text-emerald-400";
    bgClass = "bg-emerald-400/10";
    borderClass = "border-emerald-400/30";
  } else if (percentage >= 30) {
    maturityLevel = "Developing";
    colorClass = "text-amber-400";
    bgClass = "bg-amber-400/10";
    borderClass = "border-amber-400/30";
  }

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await db.saveEntry('lead', {
        source: 'Risk Calculator',
        score: percentage,
        maturityLevel,
        ...formData
      });
      setIsSubmitted(true);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <SEO 
        title="Cloud Security Risk Calculator | Oakivo"
        description="Assess your organization's cloud security maturity and discover critical vulnerabilities with Oakivo's DevSecOps risk calculator."
      />
      <section className="pt-32 pb-24 px-6 min-h-screen bg-slate-950 relative flex flex-col items-center justify-center">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.02] pointer-events-none"></div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[400px] bg-cyan-500/10 blur-[120px] rounded-full pointer-events-none"></div>

        <div className="container mx-auto max-w-4xl relative z-10 w-full">
          
          {!isAnalyzing && !showResults && (
            <div className="mb-12 text-center">
              <h1 className="text-3xl md:text-5xl font-display font-bold text-white mb-4">
                Cloud Security <span className="text-cyan-400">Maturity Assessment</span>
              </h1>
              <p className="text-slate-300 font-normal max-w-2xl mx-auto">
                Evaluate your current infrastructure against elite DevSecOps standards. Answer 5 strategic questions to receive your personalized maturity score.
              </p>
            </div>
          )}

          <div className="bg-slate-900/60 border border-slate-800/80 rounded-3xl p-6 md:p-10 shadow-2xl relative overflow-hidden backdrop-blur-xl min-h-[400px] flex flex-col justify-center">
            
            {/* Analyzing State */}
            {isAnalyzing && (
              <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center text-center py-12"
              >
                <div className="w-20 h-20 relative mb-8">
                  <div className="absolute inset-0 border-4 border-slate-800 rounded-full"></div>
                  <div className="absolute inset-0 border-4 border-cyan-500 rounded-full border-t-transparent animate-spin"></div>
                  <Shield className="absolute inset-0 m-auto text-cyan-400 animate-pulse" size={24} />
                </div>
                <h3 className="text-2xl font-display font-bold text-white mb-2">Analyzing Architecture...</h3>
                <p className="text-slate-400 font-mono text-sm">Compiling threat matrix and resilience metrics.</p>
              </motion.div>
            )}

            {/* Questions State */}
            {!isAnalyzing && !showResults && (
              <div className="relative w-full">
                {/* Progress Bar */}
                <div className="w-full h-1 bg-slate-800 rounded-full mb-10 overflow-hidden">
                  <div 
                    className="h-full bg-cyan-500 transition-all duration-500 ease-out"
                    style={{ width: `${((currentStep) / questions.length) * 100}%` }}
                  ></div>
                </div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentStep}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-12 h-12 rounded-xl bg-slate-800/50 flex items-center justify-center border border-slate-700/50">
                        {questions[currentStep].icon}
                      </div>
                      <div>
                        <div className="text-xs font-mono text-cyan-500 font-bold uppercase tracking-widest mb-1">
                          Step {currentStep + 1} of {questions.length} • {questions[currentStep].category}
                        </div>
                        <h2 className="text-xl md:text-2xl font-display font-bold text-white">
                          {questions[currentStep].title}
                        </h2>
                      </div>
                    </div>

                    <div className="grid gap-4 mt-8">
                      {questions[currentStep].options.map((option, idx) => (
                        <button
                          key={option.id}
                          onClick={() => handleSelectOption(option.score)}
                          className="w-full text-left p-5 rounded-xl border border-slate-700/50 bg-slate-800/20 hover:bg-slate-800/60 hover:border-cyan-500/50 transition-all group flex items-start gap-4 focus:outline-none focus:ring-2 focus:ring-cyan-500/80"
                        >
                          <div className="w-6 h-6 rounded-full border-2 border-slate-600 group-hover:border-cyan-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <div className="w-2.5 h-2.5 rounded-full bg-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                          </div>
                          <div>
                            <div className="text-white font-medium mb-1 group-hover:text-cyan-400 transition-colors">{option.label}</div>
                            <div className="text-sm text-slate-300 font-normal">{option.desc}</div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            )}

            {/* Results State */}
            {!isAnalyzing && showResults && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
              >
                {/* Score Column */}
                <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
                  <div className="text-xs font-mono text-slate-400 font-bold uppercase tracking-widest mb-4">
                    Assessment Complete
                  </div>
                  
                  <div className="relative mb-6">
                    <svg className="w-48 h-48 transform -rotate-90">
                      <circle cx="96" cy="96" r="88" className="stroke-slate-800" strokeWidth="12" fill="none" />
                      <circle 
                        cx="96" cy="96" r="88" 
                        className={`${colorClass} transition-all duration-1000 ease-out`}
                        strokeWidth="12" fill="none" 
                        strokeDasharray={2 * Math.PI * 88} 
                        strokeDashoffset={2 * Math.PI * 88 * (1 - percentage / 100)}
                        strokeLinecap="round"
                        stroke="currentColor"
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-5xl font-display font-bold text-white">{percentage}</span>
                      <span className="text-sm text-slate-400 font-mono">/ 100</span>
                    </div>
                  </div>

                  <h3 className="text-2xl font-display font-bold text-white mb-2">
                    Maturity: <span className={colorClass}>{maturityLevel}</span>
                  </h3>
                  
                  <p className="text-slate-300 font-normal mb-8 max-w-sm">
                    {percentage < 50 
                      ? "Your infrastructure exhibits significant vulnerabilities to modern attack vectors. Immediate architectural remediation is recommended."
                      : "You have established a strong baseline, but critical gaps in automation and zero-trust verification remain."}
                  </p>
                </div>

                {/* Lead Form Column */}
                <div className={`p-8 rounded-2xl border ${borderClass} ${bgClass}`}>
                  {!isSubmitted ? (
                    <>
                      <div className="flex items-center gap-3 mb-6">
                        <AlertTriangle className={colorClass} size={24} />
                        <h4 className="text-xl font-display font-bold text-white">Unlock Full Remediation Report</h4>
                      </div>
                      <p className="text-sm text-slate-300 font-light mb-6">
                        Enter your details to receive a comprehensive breakdown of your vulnerabilities and a step-by-step DevSecOps roadmap to achieve Zero-Trust.
                      </p>
                      
                      <form onSubmit={handleLeadSubmit} className="space-y-4">
                        <div className="relative">
                          <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                          <label htmlFor="fullName" className="sr-only">Full Name</label>
                          <input id="fullName"
                            required
                            type="text"
                            placeholder="Full Name"
                            value={formData.name}
                            onChange={e => setFormData({ ...formData, name: e.target.value })}
                            className="w-full bg-slate-900/80 border border-slate-700 rounded-lg py-3 pl-12 pr-4 text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors text-sm"
                          />
                        </div>
                        <div className="relative">
                          <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                          <label htmlFor="workEmail" className="sr-only">Work Email</label>
                          <input id="workEmail"
                            required
                            type="email"
                            placeholder="Work Email"
                            value={formData.email}
                            onChange={e => setFormData({ ...formData, email: e.target.value })}
                            className="w-full bg-slate-900/80 border border-slate-700 rounded-lg py-3 pl-12 pr-4 text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors text-sm"
                          />
                        </div>
                        <div className="relative">
                          <Building size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                          <label htmlFor="companyName" className="sr-only">Company Name</label>
                          <input id="companyName"
                            required
                            type="text"
                            placeholder="Company Name"
                            value={formData.company}
                            onChange={e => setFormData({ ...formData, company: e.target.value })}
                            className="w-full bg-slate-900/80 border border-slate-700 rounded-lg py-3 pl-12 pr-4 text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors text-sm"
                          />
                        </div>
                        
                        <button 
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full bg-white text-slate-950 font-bold font-mono text-sm py-4 rounded-lg hover:bg-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 focus:ring-offset-slate-950 transition-colors flex items-center justify-center gap-2 mt-2"
                        >
                          {isSubmitting ? (
                            <><Loader2 size={16} className="animate-spin" /> GENERATING REPORT...</>
                          ) : (
                            <>SEND MY REPORT <ArrowRight size={16} /></>
                          )}
                        </button>
                      </form>
                    </>
                  ) : (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-center py-8"
                    >
                      <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle className="text-emerald-400" size={32} />
                      </div>
                      <h4 className="text-2xl font-display font-bold text-white mb-2">Report Dispatched</h4>
                      <p className="text-slate-300 font-light text-sm mb-8">
                        Your custom DevSecOps roadmap has been generated and sent to {formData.email}. An Oakivo engineer will be in touch shortly.
                      </p>
                      <button 
                        onClick={() => navigate('/expertise')}
                        className="text-cyan-400 hover:text-cyan-300 font-mono text-sm font-bold tracking-wider flex items-center justify-center gap-2 mx-auto"
                      >
                        EXPLORE OUR SOLUTIONS <ArrowRight size={14} />
                      </button>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            )}

          </div>
        </div>
      </section>
    </>
  );
};

export default RiskCalculator;
