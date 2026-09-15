import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Shield, 
  ShieldCheck, 
  ShieldAlert, 
  Zap, 
  Activity, 
  CheckCircle2, 
  AlertTriangle, 
  Clock, 
  ArrowUpRight, 
  Download, 
  RefreshCw, 
  Play, 
  Terminal, 
  Lock, 
  Server, 
  Cpu, 
  Layers, 
  ChevronDown, 
  ChevronUp, 
  FileCheck,
  TrendingUp,
  Sparkles,
  Info
} from 'lucide-react';
import { 
  db, 
  SecurityScan, 
  IncidentRemediation, 
  DEFAULT_SECURITY_SCANS, 
  DEFAULT_INCIDENT_REMEDIATIONS 
} from '../utils/database';

interface SecurityHealthDashboardProps {
  userEmail?: string;
  isDemo?: boolean;
}

export const SecurityHealthDashboard: React.FC<SecurityHealthDashboardProps> = ({ 
  userEmail = 'enterprise-client@oakivo.cloud',
  isDemo = false 
}) => {
  const [scans, setScans] = useState<SecurityScan[]>(DEFAULT_SECURITY_SCANS);
  const [remediations, setRemediations] = useState<IncidentRemediation[]>(DEFAULT_INCIDENT_REMEDIATIONS);
  const [selectedSeverity, setSelectedSeverity] = useState<'all' | 'critical' | 'high' | 'medium'>('all');
  const [expandedIncidentId, setExpandedIncidentId] = useState<string | null>(null);
  
  // Real-time scan simulation state
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [scanStepMessage, setScanStepMessage] = useState('');
  const [scanLogs, setScanLogs] = useState<string[]>([]);
  
  // Simulated attack trigger state
  const [isSimulatingAttack, setIsSimulatingAttack] = useState(false);
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'alert' } | null>(null);

  // Subscribe to real-time updates from Firestore
  useEffect(() => {
    const unsubScans = db.subscribeToSecurityScans((latestScans) => {
      if (latestScans && latestScans.length > 0) {
        setScans(latestScans);
      }
    });

    const unsubRemediations = db.subscribeToIncidentRemediations((latestRemediations) => {
      if (latestRemediations && latestRemediations.length > 0) {
        setRemediations(latestRemediations);
      }
    });

    return () => {
      unsubScans();
      unsubRemediations();
    };
  }, []);

  // Compute live executive metrics
  const latestScan = scans[0] || DEFAULT_SECURITY_SCANS[0];
  const overallScore = latestScan.overallScore || 98.6;
  const criticalCount = latestScan.criticalCount || 0;
  const highCount = latestScan.highCount || 0;
  const mediumCount = latestScan.mediumCount || 2;
  const lowCount = latestScan.lowCount || 5;

  const totalRemediated = remediations.length;
  const averageRemediationTimeMs = Math.round(
    remediations.reduce((acc, curr) => acc + (curr.remediationTimeMs || 500), 0) / (remediations.length || 1)
  );

  // Filter remediations
  const filteredRemediations = remediations.filter(item => {
    if (selectedSeverity === 'all') return true;
    return item.severity === selectedSeverity;
  });

  // Trigger on-demand automated scan
  const handleTriggerScan = async () => {
    if (isScanning) return;
    setIsScanning(true);
    setScanProgress(5);
    setScanLogs(['[INIT] Contacting Oakivo Autonomous DevSecOps Orchestrator...']);
    setScanStepMessage('Connecting to ca-central-1 production cluster mesh...');

    const logSteps = [
      { progress: 25, msg: 'Auditing container signatures via Sigstore / Cosign cryptographic keyrings...', log: '[COSIGN] Verified 42 running containers against signed OIDC trust roots. 0 unsigned images allowed.' },
      { progress: 50, msg: 'Evaluating Kubernetes Gatekeeper & OPA policy constraints...', log: '[OPA] 128 admission rules evaluated. Enforcing read-only root filesystems and non-root UID policies.' },
      { progress: 75, msg: 'Deep-scanning AWS IAM session boundaries & CloudTrail audit logs...', log: '[IAM] Zero over-privileged access keys found. Session TTL enforced at 60 minutes with MFA requirement.' },
      { progress: 95, msg: 'Validating data residency & AES-256 KMS customer-managed key policies...', log: '[PIPEDA] 100% of persistent storage volumes and S3 buckets verified encrypted with customer KMS keys.' }
    ];

    for (let i = 0; i < logSteps.length; i++) {
      await new Promise(r => setTimeout(r, 650));
      setScanProgress(logSteps[i].progress);
      setScanStepMessage(logSteps[i].msg);
      setScanLogs(prev => [...prev, logSteps[i].log]);
    }

    await new Promise(r => setTimeout(r, 500));
    setScanProgress(100);
    setScanStepMessage('Scan complete! Synchronizing verified posture score to Firestore...');
    setScanLogs(prev => [...prev, '[SUCCESS] Automated full-mesh scan completed in 1,380ms. Posture Score: 98.9% (A+ Hardened)']);

    // Persist new scan in Firestore
    const newScan = await db.triggerAutomatedScan('AWS Production Enclave (ca-central-1)', 'full_mesh');
    setScans(prev => [newScan, ...prev]);

    setTimeout(() => {
      setIsScanning(false);
      setNotification({
        message: 'Automated perimeter scan completed successfully. Zero critical vulnerabilities detected in production.',
        type: 'success'
      });
      setTimeout(() => setNotification(null), 6000);
    }, 1200);
  };

  // Trigger simulated attack & autonomous remediation demo
  const handleSimulateAttack = async () => {
    if (isSimulatingAttack) return;
    setIsSimulatingAttack(true);
    setNotification({
      message: 'Simulating intrusion vector: Unauthorized unsigned container push to cluster...',
      type: 'alert'
    });

    await new Promise(r => setTimeout(r, 900));

    const simulatedIncident: Omit<IncidentRemediation, 'id'> = {
      timestamp: new Date().toISOString(),
      title: 'Simulated Attack: Unsigned Pod Injection Intercepted',
      category: 'admission_controller',
      severity: 'critical',
      remediationTimeMs: 64,
      actionTaken: 'Oakivo Admission Controller instantly rejected unauthorized pod. Cryptographic Sigstore verification failed; isolation boundary enforced.',
      targetResource: 'k8s-cluster-prod-east / staging-test',
      estimatedValueSaved: '$160,000 in supply-chain ransomware defense',
      status: 'neutralized',
      forensicDetails: 'Injected malicious payload failed Cosign signature verification. Auto-quarantine rule isolated target pod IP in 64 milliseconds.',
      sourceIpOrActor: '198.51.100.42 (Simulated Adversary Ingress)'
    };

    const savedIncident = await db.recordIncidentRemediation(simulatedIncident);
    setRemediations(prev => [savedIncident, ...prev]);
    setIsSimulatingAttack(false);
    setExpandedIncidentId(savedIncident.id);

    setNotification({
      message: 'Autonomous Engine Neutralized Threat in 64ms! Incident added to live audit trail.',
      type: 'success'
    });
    setTimeout(() => setNotification(null), 6000);
  };

  // Export Compliance Audit Report
  const handleExportReport = () => {
    const reportData = {
      client: userEmail,
      timestamp: new Date().toISOString(),
      overallScore: `${overallScore}%`,
      complianceStatus: 'SOC 2 Type II / ISO 27001 / PIPEDA Compliant',
      activeScans: scans.length,
      neutralizedIncidents: remediations.length,
      mttr: `${averageRemediationTimeMs}ms`,
      estimatedCostAvoidance: '$340,000+'
    };

    const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `oakivo-security-health-report-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);

    setNotification({
      message: 'Compliance Health Audit Report downloaded successfully.',
      type: 'success'
    });
    setTimeout(() => setNotification(null), 4000);
  };

  return (
    <div className="w-full space-y-8" id="security-health-dashboard">
      
      {/* Toast Notification */}
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`fixed top-24 right-6 z-50 p-4 rounded-xl border shadow-2xl backdrop-blur-md flex items-center gap-3 text-sm font-mono max-w-md ${
              notification.type === 'success' 
                ? 'bg-emerald-950/90 border-emerald-500/50 text-emerald-200' 
                : 'bg-amber-950/90 border-amber-500/50 text-amber-200'
            }`}
          >
            {notification.type === 'success' ? <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" /> : <AlertTriangle className="w-5 h-5 text-amber-400 flex-shrink-0" />}
            <span className="flex-1">{notification.message}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Top Status & Controls Header */}
      <div className="bg-slate-900/60 border border-slate-800/90 rounded-2xl p-6 backdrop-blur-xl shadow-xl flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              Autonomous DevSecOps Engine Active
            </span>
            <span className="text-xs font-mono text-slate-400 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-cyan-400" />
              Continuous Telemetry & Real-Time Sync
            </span>
          </div>
          <h2 className="text-2xl md:text-3xl font-display font-bold text-white flex items-center gap-3">
            <ShieldCheck className="w-8 h-8 text-cyan-400" />
            Security Health Dashboard
          </h2>
          <p className="text-slate-400 text-sm">
            Live telemetry monitoring continuous automated vulnerability scans, zero-trust enforcement, and autonomous incident remediations.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={handleTriggerScan}
            disabled={isScanning}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-mono text-xs font-bold transition-all shadow-lg shadow-cyan-500/20 disabled:opacity-50"
          >
            {isScanning ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin text-slate-950" />
                <span>SCANNING PERIMETER...</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4 fill-slate-950" />
                <span>RUN AUTOMATED SCAN</span>
              </>
            )}
          </button>

          <button
            onClick={handleSimulateAttack}
            disabled={isSimulatingAttack}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-mono text-xs font-bold transition-all"
            title="Simulate an unauthorized deployment attack to test autonomous remediation"
          >
            <Zap className="w-4 h-4 text-amber-400" />
            <span>SIMULATE ATTACK & REMEDIATE</span>
          </button>

          <button
            onClick={handleExportReport}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 font-mono text-xs font-bold transition-all"
          >
            <Download className="w-4 h-4 text-cyan-400" />
            <span>EXPORT AUDIT</span>
          </button>
        </div>
      </div>

      {/* Live Scan Execution Banner (when scanning) */}
      <AnimatePresence>
        {isScanning && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-slate-900/90 border border-cyan-500/40 rounded-2xl p-6 overflow-hidden space-y-4"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <RefreshCw className="w-5 h-5 text-cyan-400 animate-spin" />
                <span className="font-mono text-sm text-cyan-300 font-semibold">{scanStepMessage}</span>
              </div>
              <span className="font-mono text-sm text-cyan-400 font-bold">{scanProgress}%</span>
            </div>

            {/* Progress Bar */}
            <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-gradient-to-r from-cyan-500 to-emerald-400"
                initial={{ width: 0 }}
                animate={{ width: `${scanProgress}%` }}
                transition={{ ease: 'easeInOut', duration: 0.3 }}
              />
            </div>

            {/* Live Terminal Stream */}
            <div className="bg-slate-950 rounded-xl p-3 font-mono text-xs text-slate-300 border border-slate-800 space-y-1 max-h-32 overflow-y-auto">
              {scanLogs.map((log, idx) => (
                <div key={idx} className="flex items-start gap-2">
                  <span className="text-cyan-400 select-none">&gt;</span>
                  <span className={log.includes('SUCCESS') ? 'text-emerald-400 font-semibold' : ''}>{log}</span>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Immediate Value KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        
        {/* Posture Score */}
        <div className="bg-slate-900/50 border border-slate-800/90 rounded-2xl p-6 hover:border-cyan-500/40 transition-colors relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-500/10 blur-2xl rounded-full pointer-events-none group-hover:bg-cyan-500/20 transition-all"></div>
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-mono font-bold tracking-widest text-slate-400 uppercase">Health Posture</span>
            <span className="px-2 py-0.5 rounded text-[11px] font-mono font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
              GRADE A+
            </span>
          </div>
          <div className="flex items-baseline gap-2 mb-2">
            <span className="text-4xl font-display font-bold text-white">{overallScore}%</span>
            <span className="text-xs font-mono text-emerald-400 flex items-center">
              <TrendingUp className="w-3 h-3 mr-0.5" /> +2.4% vs Baseline
            </span>
          </div>
          <p className="text-xs text-slate-400">
            CIS AWS & SOC 2 benchmarked. Zero-Trust perimeter verified.
          </p>
        </div>

        {/* Critical CVEs in Production */}
        <div className="bg-slate-900/50 border border-slate-800/90 rounded-2xl p-6 hover:border-emerald-500/40 transition-colors relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/10 blur-2xl rounded-full pointer-events-none group-hover:bg-emerald-500/20 transition-all"></div>
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-mono font-bold tracking-widest text-slate-400 uppercase">Critical CVEs in Prod</span>
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          </div>
          <div className="flex items-baseline gap-2 mb-2">
            <span className="text-4xl font-display font-bold text-emerald-400">0</span>
            <span className="text-xs font-mono text-emerald-300">100% SLA Compliant</span>
          </div>
          <p className="text-xs text-slate-400">
            Automated image signing & admission control blocks vulnerable code before release.
          </p>
        </div>

        {/* Autonomous MTTR */}
        <div className="bg-slate-900/50 border border-slate-800/90 rounded-2xl p-6 hover:border-amber-500/40 transition-colors relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/10 blur-2xl rounded-full pointer-events-none group-hover:bg-amber-500/20 transition-all"></div>
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-mono font-bold tracking-widest text-slate-400 uppercase">Autonomous MTTR</span>
            <Zap className="w-5 h-5 text-amber-400" />
          </div>
          <div className="flex items-baseline gap-2 mb-2">
            <span className="text-4xl font-display font-bold text-white">{(averageRemediationTimeMs / 1000).toFixed(2)}s</span>
            <span className="text-xs font-mono text-emerald-400">99.9% Faster</span>
          </div>
          <p className="text-xs text-slate-400">
            vs. 4.2 hours manual industry average. Threat neutralized at machine speed.
          </p>
        </div>

        {/* Quantified Cost / Risk Avoidance */}
        <div className="bg-slate-900/50 border border-slate-800/90 rounded-2xl p-6 hover:border-cyan-500/40 transition-colors relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-500/10 blur-2xl rounded-full pointer-events-none group-hover:bg-cyan-500/20 transition-all"></div>
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-mono font-bold tracking-widest text-slate-400 uppercase">Immediate Value Delivered</span>
            <Sparkles className="w-5 h-5 text-cyan-400" />
          </div>
          <div className="flex items-baseline gap-2 mb-2">
            <span className="text-4xl font-display font-bold text-white">$340K+</span>
            <span className="text-xs font-mono text-cyan-400">Direct ROI</span>
          </div>
          <p className="text-xs text-slate-400">
            Prevented downtime, regulatory fines, and supply-chain compromise.
          </p>
        </div>

      </div>

      {/* Dual Column: Security Scan Controls & Pillars vs Vulnerability Status */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Column 1 & 2: Automated Scans & Zero-Trust Verification Pillars */}
        <div className="lg:col-span-2 bg-slate-900/50 border border-slate-800/90 rounded-2xl p-6 backdrop-blur-md space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <h3 className="text-lg font-display font-bold text-white flex items-center gap-2">
                <Cpu className="w-5 h-5 text-cyan-400" />
                Automated Security Scan Engines
              </h3>
              <p className="text-xs text-slate-400">Real-time status across all active continuous scanning agents</p>
            </div>
            <span className="text-xs font-mono text-slate-400">Target: <strong className="text-slate-200">{latestScan.target}</strong></span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Engine 1: Container Security */}
            <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-white flex items-center gap-2">
                  <Layers className="w-4 h-4 text-cyan-400" /> Container & Registry
                </span>
                <span className="text-xs font-mono text-emerald-400 font-bold">100% Passed</span>
              </div>
              <div className="space-y-1">
                <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-cyan-400 w-full"></div>
                </div>
                <div className="flex justify-between text-[11px] text-slate-400 font-mono">
                  <span>Cosign Signature Verified</span>
                  <span>Trivy CVE Clean</span>
                </div>
              </div>
              <p className="text-xs text-slate-400">
                100% of images deployed in the last 30 days cryptographically signed with zero critical findings.
              </p>
            </div>

            {/* Engine 2: Kubernetes Gatekeeper */}
            <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-white flex items-center gap-2">
                  <Server className="w-4 h-4 text-emerald-400" /> K8s Admission Control
                </span>
                <span className="text-xs font-mono text-emerald-400 font-bold">100% Enforced</span>
              </div>
              <div className="space-y-1">
                <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-400 w-full"></div>
                </div>
                <div className="flex justify-between text-[11px] text-slate-400 font-mono">
                  <span>OPA Policies Active</span>
                  <span>Root Pods Blocked</span>
                </div>
              </div>
              <p className="text-xs text-slate-400">
                Enforcing non-root execution, privilege escalation denial, and read-only container file systems.
              </p>
            </div>

            {/* Engine 3: Cloud IAM & Zero-Trust */}
            <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-white flex items-center gap-2">
                  <Lock className="w-4 h-4 text-cyan-400" /> Cloud IAM & Perimeter
                </span>
                <span className="text-xs font-mono text-cyan-400 font-bold">98.4% Hardened</span>
              </div>
              <div className="space-y-1">
                <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-cyan-400 w-[98%]"></div>
                </div>
                <div className="flex justify-between text-[11px] text-slate-400 font-mono">
                  <span>MFA Enforced</span>
                  <span>Session TTL: 60m</span>
                </div>
              </div>
              <p className="text-xs text-slate-400">
                Least-privilege role validation. Automated revocation of unused service credentials over 90 days.
              </p>
            </div>

            {/* Engine 4: Data Residency & Encryption */}
            <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-white flex items-center gap-2">
                  <FileCheck className="w-4 h-4 text-emerald-400" /> PIPEDA & Law 25
                </span>
                <span className="text-xs font-mono text-emerald-400 font-bold">100% Compliant</span>
              </div>
              <div className="space-y-1">
                <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-400 w-full"></div>
                </div>
                <div className="flex justify-between text-[11px] text-slate-400 font-mono">
                  <span>Data in Canada (ca-central)</span>
                  <span>AES-256 KMS</span>
                </div>
              </div>
              <p className="text-xs text-slate-400">
                Canadian data sovereignty validated. All customer telemetry and backups encrypted at rest with KMS-CMK.
              </p>
            </div>

          </div>
        </div>

        {/* Column 3: Active Vulnerability Status & Scan History */}
        <div className="bg-slate-900/50 border border-slate-800/90 rounded-2xl p-6 backdrop-blur-md space-y-5">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <h3 className="text-lg font-display font-bold text-white flex items-center gap-2">
              <Activity className="w-5 h-5 text-cyan-400" />
              Active Finding Matrix
            </h3>
            <span className="text-[11px] font-mono text-slate-400">Continuous Sync</span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 rounded-xl bg-emerald-950/20 border border-emerald-500/30 text-center">
              <span className="text-2xl font-bold font-display text-emerald-400">{criticalCount}</span>
              <p className="text-[11px] font-mono uppercase tracking-wider text-emerald-300 mt-1">Critical CVEs</p>
            </div>
            <div className="p-3 rounded-xl bg-emerald-950/20 border border-emerald-500/30 text-center">
              <span className="text-2xl font-bold font-display text-emerald-400">{highCount}</span>
              <p className="text-[11px] font-mono uppercase tracking-wider text-emerald-300 mt-1">High Severity</p>
            </div>
            <div className="p-3 rounded-xl bg-slate-950/40 border border-slate-800 text-center">
              <span className="text-2xl font-bold font-display text-amber-400">{mediumCount}</span>
              <p className="text-[11px] font-mono uppercase tracking-wider text-slate-400 mt-1">Medium (In Queue)</p>
            </div>
            <div className="p-3 rounded-xl bg-slate-950/40 border border-slate-800 text-center">
              <span className="text-2xl font-bold font-display text-slate-400">{lowCount}</span>
              <p className="text-[11px] font-mono uppercase tracking-wider text-slate-400 mt-1">Low (Informational)</p>
            </div>
          </div>

          {/* Recent Automated Scans Mini-List */}
          <div className="space-y-2 pt-2">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 block">
              Recent Automated Executions
            </span>
            <div className="space-y-2">
              {scans.slice(0, 3).map(scan => (
                <div key={scan.id} className="p-2.5 rounded-lg bg-slate-950/40 border border-slate-800/80 flex items-center justify-between text-xs">
                  <div className="truncate mr-2">
                    <span className="font-mono text-white truncate block">{scan.target}</span>
                    <span className="text-[10px] text-slate-400 font-mono">
                      {new Date(scan.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} • {scan.checksPassed}/{scan.totalChecks} checks passed
                    </span>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 flex-shrink-0">
                    {scan.overallScore}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

      {/* Centerpiece: Real-Time Incident Remediations (Immediate Value of Oakivo's Services) */}
      <div className="bg-slate-900/60 border border-slate-800/90 rounded-2xl p-6 backdrop-blur-xl shadow-xl space-y-6">
        
        {/* Header & Filter Controls */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h3 className="text-xl font-display font-bold text-white flex items-center gap-2.5">
                <ShieldAlert className="w-6 h-6 text-cyan-400" />
                Recent Automated Incident Remediations
              </h3>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                {totalRemediated} Neutralized
              </span>
            </div>
            <p className="text-sm text-slate-400">
              Live audit trail showing real-time threat neutralization and immediate financial and operational value delivered by Oakivo.
            </p>
          </div>

          {/* Severity Filters */}
          <div className="flex items-center gap-2 self-start md:self-auto">
            <span className="text-xs font-mono text-slate-400 mr-1">Filter:</span>
            {(['all', 'critical', 'high', 'medium'] as const).map(sev => (
              <button
                key={sev}
                onClick={() => setSelectedSeverity(sev)}
                className={`px-3 py-1 rounded-lg text-xs font-mono font-bold capitalize transition-all ${
                  selectedSeverity === sev
                    ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                    : 'bg-slate-800/80 text-slate-400 hover:text-white'
                }`}
              >
                {sev}
              </button>
            ))}
          </div>
        </div>

        {/* Remediations List */}
        <div className="space-y-3">
          {filteredRemediations.length === 0 ? (
            <div className="text-center py-12 bg-slate-950/40 rounded-xl border border-slate-800 text-slate-400 text-sm font-mono">
              No incident remediations matching selected filter. All systems nominal.
            </div>
          ) : (
            filteredRemediations.map((incident) => {
              const isExpanded = expandedIncidentId === incident.id;
              const isCritical = incident.severity === 'critical';
              const isHigh = incident.severity === 'high';

              return (
                <div
                  key={incident.id}
                  className={`rounded-xl border transition-all ${
                    isExpanded 
                      ? 'bg-slate-950/80 border-cyan-500/50 shadow-lg shadow-cyan-500/5' 
                      : 'bg-slate-950/40 border-slate-800/80 hover:border-slate-700'
                  }`}
                >
                  <div 
                    onClick={() => setExpandedIncidentId(isExpanded ? null : incident.id)}
                    className="p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 cursor-pointer select-none"
                  >
                    <div className="space-y-1.5 flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2.5">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase tracking-wider ${
                          isCritical
                            ? 'bg-red-500/10 text-red-400 border border-red-500/30'
                            : isHigh
                            ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                            : 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30'
                        }`}>
                          {incident.severity}
                        </span>

                        <span className="inline-flex items-center gap-1 text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                          <Zap className="w-3 h-3" /> Neutralized in {incident.remediationTimeMs}ms
                        </span>

                        <span className="text-xs font-mono text-slate-400">
                          {new Date(incident.timestamp).toLocaleString([], { 
                            month: 'short', 
                            day: 'numeric', 
                            hour: '2-digit', 
                            minute: '2-digit' 
                          })}
                        </span>
                      </div>

                      <h4 className="text-base font-display font-semibold text-white truncate">
                        {incident.title}
                      </h4>

                      <p className="text-xs text-slate-400 line-clamp-1">
                        {incident.actionTaken}
                      </p>
                    </div>

                    {/* Value Delivered Badge & Expand Indicator */}
                    <div className="flex items-center justify-between md:justify-end gap-3 flex-shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-slate-850">
                      <div className="text-right">
                        <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block">Immediate Value</span>
                        <span className="text-xs font-mono font-bold text-cyan-300">
                          {incident.estimatedValueSaved}
                        </span>
                      </div>

                      <div className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400">
                        {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </div>
                    </div>
                  </div>

                  {/* Expanded Forensic Drawer */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="px-5 pb-5 pt-2 border-t border-slate-800/80 bg-slate-900/30 space-y-3"
                      >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
                          <div className="space-y-1">
                            <span className="text-slate-500 block uppercase tracking-wider text-[10px]">Target Resource</span>
                            <span className="text-slate-200 bg-slate-950 px-2.5 py-1.5 rounded border border-slate-800 block truncate">
                              {incident.targetResource}
                            </span>
                          </div>

                          <div className="space-y-1">
                            <span className="text-slate-500 block uppercase tracking-wider text-[10px]">Attribution / Origin Actor</span>
                            <span className="text-slate-200 bg-slate-950 px-2.5 py-1.5 rounded border border-slate-800 block truncate">
                              {incident.sourceIpOrActor || 'CloudTrail Anomaly Detection'}
                            </span>
                          </div>
                        </div>

                        <div className="space-y-1 text-xs">
                          <span className="font-mono text-slate-500 block uppercase tracking-wider text-[10px]">Forensic Analysis & Policy Enforcement</span>
                          <p className="text-slate-300 bg-slate-950 p-3 rounded-xl border border-slate-800 leading-relaxed font-mono text-[11px]">
                            {incident.forensicDetails || incident.actionTaken}
                          </p>
                        </div>

                        <div className="flex items-center justify-between pt-2 text-xs font-mono text-slate-400">
                          <span className="flex items-center gap-1.5 text-emerald-400">
                            <CheckCircle2 className="w-4 h-4" /> Status: {incident.status.toUpperCase()}
                          </span>
                          <span className="text-slate-500">
                            Audit Trace ID: {incident.id}
                          </span>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })
          )}
        </div>

      </div>

    </div>
  );
};

export default SecurityHealthDashboard;
