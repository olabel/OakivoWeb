import React, { useState, useRef } from 'react';
import { FileDown, Loader2, CheckCircle, AlertCircle, Sparkles } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface DownloadBrochureButtonProps {
  className?: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'pill';
  size?: 'sm' | 'md' | 'lg';
}

const DownloadBrochureButton: React.FC<DownloadBrochureButtonProps> = ({
  className = '',
  variant = 'outline',
  size = 'md'
}) => {
  const { language, t } = useLanguage();
  const [isGenerating, setIsGenerating] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [errorToast, setErrorToast] = useState(false);
  const printRef = useRef<HTMLDivElement>(null);

  const handleDownload = async () => {
    if (isGenerating) return;
    setIsGenerating(true);
    setErrorToast(false);

    try {
      // Dynamically import html2pdf for browser execution
      const html2pdfModule: any = await import('html2pdf.js');
      const html2pdf: any = html2pdfModule.default || html2pdfModule;

      const element = printRef.current;
      if (!element) {
        throw new Error('Print template element not found');
      }

      // Temporarily reveal template for capture
      element.style.display = 'block';

      const opt = {
        margin: [8, 8, 8, 8],
        filename: `Oakivo-Solutions-DevSecOps-Brochure-${language.toUpperCase()}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { 
          scale: 2, 
          useCORS: true, 
          logging: false,
          scrollY: 0
        },
        jsPDF: { 
          unit: 'mm', 
          format: 'a4', 
          orientation: 'portrait' 
        }
      };

      await html2pdf().set(opt).from(element).save();

      // Hide template back
      element.style.display = 'none';

      setIsGenerating(false);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 4500);
    } catch (error) {
      console.error('PDF Generation failed:', error);
      if (printRef.current) {
        printRef.current.style.display = 'none';
      }
      setIsGenerating(false);
      setErrorToast(true);
      setTimeout(() => setErrorToast(false), 4500);
    }
  };

  const getButtonStyles = () => {
    const base = "inline-flex items-center justify-center gap-2 font-semibold tracking-wide transition-all cursor-pointer select-none";
    const sizeStyles = {
      sm: "px-3.5 py-1.5 text-xs rounded-full",
      md: "px-5 py-2.5 text-xs rounded-full",
      lg: "px-7 py-3.5 text-sm rounded-full"
    }[size];

    if (variant === 'primary') {
      return `${base} ${sizeStyles} bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-md shadow-cyan-500/20 active:scale-98`;
    }
    if (variant === 'pill') {
      return `${base} ${sizeStyles} bg-white/10 hover:bg-white/15 text-white border border-white/15 backdrop-blur-md hover:border-cyan-400/40`;
    }
    // outline default
    return `${base} ${sizeStyles} bg-slate-900/80 hover:bg-slate-800 text-slate-200 border border-slate-700/80 hover:border-cyan-500/50 hover:text-white shadow-sm`;
  };

  const isFrench = language === 'fr';

  return (
    <>
      <button
        id="btn-download-pdf-brochure"
        type="button"
        onClick={handleDownload}
        disabled={isGenerating}
        className={`${getButtonStyles()} ${className}`}
        aria-label="Download PDF Brochure"
      >
        {isGenerating ? (
          <>
            <Loader2 size={15} className="animate-spin text-cyan-400" />
            <span>{isFrench ? 'Génération du PDF...' : 'Generating PDF...'}</span>
          </>
        ) : (
          <>
            <FileDown size={15} className="text-cyan-400" />
            <span>{isFrench ? 'Télécharger la Brochure PDF' : 'Download PDF Brochure'}</span>
          </>
        )}
      </button>

      {/* Floating Toast Notification */}
      {showToast && (
        <div 
          id="brochure-download-toast"
          className="fixed bottom-8 right-8 z-50 bg-slate-900 border border-cyan-500/40 text-white px-5 py-3.5 rounded-2xl shadow-2xl flex items-center gap-3 backdrop-blur-lg animate-in fade-in slide-in-from-bottom-5 duration-300"
        >
          <div className="w-8 h-8 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center shrink-0">
            <CheckCircle size={18} />
          </div>
          <div>
            <p className="text-xs font-bold text-white">
              {isFrench ? 'Brochure téléchargée avec succès' : 'Brochure downloaded successfully'}
            </p>
            <p className="text-[11px] text-slate-400">
              {isFrench ? 'Le fichier PDF a été sauvegardé sur votre appareil.' : 'The PDF document has been saved to your downloads.'}
            </p>
          </div>
        </div>
      )}

      {errorToast && (
        <div className="fixed bottom-8 right-8 z-50 bg-slate-900 border border-rose-500/40 text-white px-5 py-3.5 rounded-2xl shadow-2xl flex items-center gap-3 backdrop-blur-lg">
          <div className="w-8 h-8 rounded-full bg-rose-500/20 text-rose-400 flex items-center justify-center shrink-0">
            <AlertCircle size={18} />
          </div>
          <div>
            <p className="text-xs font-bold text-white">
              {isFrench ? 'Échec du téléchargement' : 'Download failed'}
            </p>
            <p className="text-[11px] text-slate-400">
              {isFrench ? 'Veuillez réessayer ou contacter notre bureau de Dieppe.' : 'Please try again or contact our Dieppe office.'}
            </p>
          </div>
        </div>
      )}

      {/* Off-screen Branded Printable PDF Template */}
      <div
        ref={printRef}
        style={{
          display: 'none',
          width: '210mm',
          minHeight: '297mm',
          backgroundColor: '#ffffff',
          color: '#0f172a',
          fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
          padding: '16mm 18mm',
          boxSizing: 'border-box'
        }}
      >
        {/* Document Header */}
        <div style={{ borderBottom: '2px solid #0891b2', paddingBottom: '12px', marginBottom: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <h1 style={{ fontSize: '24px', fontWeight: '900', color: '#090d16', margin: '0 0 2px 0', letterSpacing: '-0.5px' }}>
              OAKIVO<span style={{ color: '#0891b2' }}>.</span> SOLUTIONS INC.
            </h1>
            <p style={{ fontSize: '11px', color: '#0891b2', fontWeight: '700', margin: '0', textTransform: 'uppercase', letterSpacing: '1px' }}>
              {isFrench ? 'Ingénierie DevSecOps & Sécurité Infonuagique d\'Entreprise' : 'Enterprise DevSecOps, Cloud Security & Autonomous Infrastructure'}
            </p>
            <p style={{ fontSize: '9px', color: '#64748b', margin: '2px 0 0 0' }}>
              Dieppe, New Brunswick, Canada • Atlantic Standard Time (AST) • 100% Bilingual (EN/FR)
            </p>
          </div>
          <div style={{ textAlign: 'right' }}>
            <span style={{ display: 'inline-block', backgroundColor: '#e0f2fe', color: '#0369a1', fontSize: '9px', fontWeight: '700', padding: '3px 8px', borderRadius: '4px', border: '1px solid #bae6fd' }}>
              CANADIAN SOVEREIGN CLOUD
            </span>
            <p style={{ fontSize: '8px', color: '#64748b', margin: '4px 0 0 0' }}>
              SOC 2 Type II • ISO 27001 • PIPEDA • AWS Partner
            </p>
          </div>
        </div>

        {/* Executive Summary */}
        <div style={{ backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '6px', padding: '10px 14px', marginBottom: '16px' }}>
          <h2 style={{ fontSize: '12px', fontWeight: '800', color: '#0f172a', margin: '0 0 4px 0', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            {isFrench ? 'Sommaire Exécutif' : 'Executive Overview'}
          </h2>
          <p style={{ fontSize: '10px', color: '#334155', lineHeight: '1.45', margin: '0' }}>
            {isFrench 
              ? 'Oakivo Solutions Inc. est le cabinet d\'ingénierie DevSecOps de référence au Canada atlantique. Nous remplaçons les processus manuels fastidieux et la panique des audits annuels par du code déterministe, des barrières de sécurité CI/CD automatisées et des architectures infonuagiques Zéro Confiance auto-cicatrisantes.'
              : 'Oakivo Solutions Inc. is Atlantic Canada’s premier DevSecOps and cloud security engineering firm. We replace painful manual compliance toil and deployment bottlenecks with deterministic Infrastructure-as-Code, shift-left CI/CD guardrails, and autonomous zero-trust infrastructure.'}
          </p>
        </div>

        {/* Core Pillars Grid */}
        <h2 style={{ fontSize: '12px', fontWeight: '800', color: '#090d16', textTransform: 'uppercase', letterSpacing: '0.5px', margin: '0 0 8px 0', borderLeft: '3px solid #0891b2', paddingLeft: '8px' }}>
          {isFrench ? 'Nos 4 Piliers de Services DevSecOps' : 'Our 4 Core DevSecOps Service Pillars'}
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '16px' }}>
          {/* Pillar 1 */}
          <div style={{ border: '1px solid #cbd5e1', borderRadius: '6px', padding: '9px 11px', backgroundColor: '#ffffff' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3px' }}>
              <span style={{ fontSize: '10.5px', fontWeight: '800', color: '#0f172a' }}>
                1. {isFrench ? 'Gestion de Posture Cloud (CSPM)' : 'Cloud Security Posture (CSPM)'}
              </span>
              <span style={{ fontSize: '8px', color: '#0891b2', fontWeight: '700' }}>AWS • Azure • GCP</span>
            </div>
            <p style={{ fontSize: '9px', color: '#475569', lineHeight: '1.4', margin: '0 0 6px 0' }}>
              {isFrench 
                ? 'Analyse continue multi-cloud, détection instantanée de dérive d\'infrastructure et archivage cryptographique de preuves pour SOC 2, LPRPDE et ISO 27001.'
                : 'Continuous multi-cloud vulnerability scanning, real-time IaC drift detection, and push-button cryptographic compliance archives for SOC 2, PIPEDA, and ISO 27001.'}
            </p>
            <div style={{ fontSize: '8px', color: '#0369a1', fontWeight: '700', backgroundColor: '#f0f9ff', padding: '3px 6px', borderRadius: '3px' }}>
              ✓ {isFrench ? 'Audit continu 24/7/365 avec zéro dérive' : 'Continuous 24/7/365 proof with zero configuration drift'}
            </div>
          </div>

          {/* Pillar 2 */}
          <div style={{ border: '1px solid #cbd5e1', borderRadius: '6px', padding: '9px 11px', backgroundColor: '#ffffff' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3px' }}>
              <span style={{ fontSize: '10.5px', fontWeight: '800', color: '#0f172a' }}>
                2. {isFrench ? 'Ingénierie de Pipelines CI/CD' : 'DevSecOps Pipeline Engineering'}
              </span>
              <span style={{ fontSize: '8px', color: '#0891b2', fontWeight: '700' }}>GitHub • GitLab</span>
            </div>
            <p style={{ fontSize: '9px', color: '#475569', lineHeight: '1.4', margin: '0 0 6px 0' }}>
              {isFrench 
                ? 'Intégration Shift-Left : analyses SAST/DAST, génération SBOM, signature cryptographique d\'images Cosign et blocage automatique des secrets dans les Pull Requests.'
                : 'Shift-left security automation: SAST, DAST, automated SBOM generation, Cosign cryptographic container signing, and pre-commit secret leak prevention.'}
            </p>
            <div style={{ fontSize: '8px', color: '#0369a1', fontWeight: '700', backgroundColor: '#f0f9ff', padding: '3px 6px', borderRadius: '3px' }}>
              ✓ {isFrench ? 'Déploiements accélérés sans vulnérabilité critique' : 'Accelerated releases with zero vulnerable commits in production'}
            </div>
          </div>

          {/* Pillar 3 */}
          <div style={{ border: '1px solid #cbd5e1', borderRadius: '6px', padding: '9px 11px', backgroundColor: '#ffffff' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3px' }}>
              <span style={{ fontSize: '10.5px', fontWeight: '800', color: '#0f172a' }}>
                3. {isFrench ? 'Sécurité ERP & Accès Zéro Confiance' : 'Odoo & Enterprise ERP Security'}
              </span>
              <span style={{ fontSize: '8px', color: '#0891b2', fontWeight: '700' }}>Odoo • SAP • RBAC</span>
            </div>
            <p style={{ fontSize: '9px', color: '#475569', lineHeight: '1.4', margin: '0 0 6px 0' }}>
              {isFrench 
                ? 'Intégration Odoo sécurisée, matrices de rôles au moindre privilège, révocation de comptes en moins d\'une seconde et passerelles mTLS blindées.'
                : 'Hardened Odoo ERP deployments, zero-trust least-privilege role matrices, sub-second automated de-provisioning, and tokenized mTLS API gateways.'}
            </p>
            <div style={{ fontSize: '8px', color: '#0369a1', fontWeight: '700', backgroundColor: '#f0f9ff', padding: '3px 6px', borderRadius: '3px' }}>
              ✓ {isFrench ? 'Élimination totale des accès orphelins et risques internes' : 'Zero orphan accounts and unified operational core protection'}
            </div>
          </div>

          {/* Pillar 4 */}
          <div style={{ border: '1px solid #cbd5e1', borderRadius: '6px', padding: '9px 11px', backgroundColor: '#ffffff' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3px' }}>
              <span style={{ fontSize: '10.5px', fontWeight: '800', color: '#0f172a' }}>
                4. {isFrench ? 'Remédiation Automatisée SRE' : 'Autonomous Incident Defense (SRE)'}
              </span>
              <span style={{ fontSize: '8px', color: '#0891b2', fontWeight: '700' }}>eBPF • SIEM • 99.99%</span>
            </div>
            <p style={{ fontSize: '9px', color: '#475569', lineHeight: '1.4', margin: '0 0 6px 0' }}>
              {isFrench 
                ? 'Scénarios réactifs événementiels isolant les conteneurs compromis à la vitesse de la machine, rotation instantanée des clés et haute disponibilité garantie.'
                : 'Autonomous event-driven runbooks that quarantine compromised nodes in milliseconds, rotate leaked API tokens automatically, and ensure 99.99% uptime.'}
            </p>
            <div style={{ fontSize: '8px', color: '#0369a1', fontWeight: '700', backgroundColor: '#f0f9ff', padding: '3px 6px', borderRadius: '3px' }}>
              ✓ {isFrench ? 'Résolution autonome des menaces sans réveil de nuit' : 'Machine-speed threat neutralization with zero operational downtime'}
            </div>
          </div>
        </div>

        {/* The 3-Step Methodology */}
        <h2 style={{ fontSize: '12px', fontWeight: '800', color: '#090d16', textTransform: 'uppercase', letterSpacing: '0.5px', margin: '0 0 8px 0', borderLeft: '3px solid #0891b2', paddingLeft: '8px' }}>
          {isFrench ? 'Le Parcours Client en 3 Étapes' : 'The 3-Step Client Engagement Journey'}
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px', marginBottom: '16px' }}>
          <div style={{ backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '6px', padding: '8px 10px' }}>
            <div style={{ fontSize: '9px', fontWeight: '800', color: '#0891b2', textTransform: 'uppercase' }}>
              {isFrench ? 'Étape 01 • Jours 1–5' : 'Step 01 • Days 1–5'}
            </div>
            <div style={{ fontSize: '10px', fontWeight: '700', color: '#0f172a', margin: '2px 0 4px 0' }}>
              {isFrench ? 'Audit d\'Architecture' : 'Architecture & Security Audit'}
            </div>
            <p style={{ fontSize: '8.5px', color: '#475569', margin: '0', lineHeight: '1.35' }}>
              {isFrench 
                ? 'Diagnostic approfondi, plan directeur de remédiation hiérarchisé et score de risque sans rapport verbeux.'
                : 'Diagnostic scan, prioritized Threat Blueprint with CVE risk scoring, and multi-cloud topology review.'}
            </p>
          </div>

          <div style={{ backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '6px', padding: '8px 10px' }}>
            <div style={{ fontSize: '9px', fontWeight: '800', color: '#0891b2', textTransform: 'uppercase' }}>
              {isFrench ? 'Étape 02 • Semaines 2–4' : 'Step 02 • Weeks 2–4'}
            </div>
            <div style={{ fontSize: '10px', fontWeight: '700', color: '#0f172a', margin: '2px 0 4px 0' }}>
              {isFrench ? 'Déploiement en Bac à Sable' : 'Pipeline & Policy Sandbox'}
            </div>
            <p style={{ fontSize: '8.5px', color: '#475569', margin: '0', lineHeight: '1.35' }}>
              {isFrench 
                ? 'Garde-fous CI/CD, modules Terraform immuables et bascule en production sans aucune interruption de service.'
                : 'Isolated staging tests, OPA Policy-as-Code, container Cosign signing, and zero-downtime cutover.'}
            </p>
          </div>

          <div style={{ backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '6px', padding: '8px 10px' }}>
            <div style={{ fontSize: '9px', fontWeight: '800', color: '#0891b2', textTransform: 'uppercase' }}>
              {isFrench ? 'Étape 03 • Continu' : 'Step 03 • Ongoing'}
            </div>
            <div style={{ fontSize: '10px', fontWeight: '700', color: '#0f172a', margin: '2px 0 4px 0' }}>
              {isFrench ? 'Supervision SRE Continue' : 'Managed DevSecOps & SRE'}
            </div>
            <p style={{ fontSize: '8.5px', color: '#475569', margin: '0', lineHeight: '1.35' }}>
              {isFrench 
                ? 'Surveillance CSPM 24/7/365, remédiation autonome des menaces et soutien direct depuis Dieppe, N.-B.'
                : '24/7/365 CSPM posture tracking, autonomous threat isolation, and direct AST senior architect access.'}
            </p>
          </div>
        </div>

        {/* Selected Atlantic Case Studies */}
        <h2 style={{ fontSize: '12px', fontWeight: '800', color: '#090d16', textTransform: 'uppercase', letterSpacing: '0.5px', margin: '0 0 8px 0', borderLeft: '3px solid #0891b2', paddingLeft: '8px' }}>
          {isFrench ? 'Résultats Éprouvés au Canada Atlantique' : 'Proven Results in Atlantic Canada'}
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px', marginBottom: '16px' }}>
          <div style={{ border: '1px solid #cbd5e1', borderRadius: '6px', padding: '8px', backgroundColor: '#ffffff' }}>
            <div style={{ fontSize: '14px', fontWeight: '900', color: '#0891b2' }}>15 Hrs / Week</div>
            <div style={{ fontSize: '9px', fontWeight: '700', color: '#0f172a', margin: '1px 0' }}>Maritime Seafood & Logistics</div>
            <p style={{ fontSize: '8px', color: '#64748b', margin: '0', lineHeight: '1.3' }}>
              {isFrench ? 'Élimination des erreurs de saisie et résilience totale face aux rançongiciels.' : 'Automated order intake & QuickBooks sync, eliminating admin typos and ransomware exposure.'}
            </p>
          </div>

          <div style={{ border: '1px solid #cbd5e1', borderRadius: '6px', padding: '8px', backgroundColor: '#ffffff' }}>
            <div style={{ fontSize: '14px', fontWeight: '900', color: '#0891b2' }}>SOC 2 in 6 Wks</div>
            <div style={{ fontSize: '9px', fontWeight: '700', color: '#0f172a', margin: '1px 0' }}>Regional MedTech Provider</div>
            <p style={{ fontSize: '8px', color: '#64748b', margin: '0', lineHeight: '1.3' }}>
              {isFrench ? 'Preuves CSPM automatisées fermant des contrats hospitaliers majeurs en avance.' : 'Continuous compliance evidence closed enterprise hospital vendor contracts months early.'}
            </p>
          </div>

          <div style={{ border: '1px solid #cbd5e1', borderRadius: '6px', padding: '8px', backgroundColor: '#ffffff' }}>
            <div style={{ fontSize: '14px', fontWeight: '900', color: '#0891b2' }}>+25% Orders</div>
            <div style={{ fontSize: '9px', fontWeight: '700', color: '#0f172a', margin: '1px 0' }}>Acadian Industrial Wholesale</div>
            <p style={{ fontSize: '8px', color: '#64748b', margin: '0', lineHeight: '1.3' }}>
              {isFrench ? 'Intégration d\'inventaire fournisseur en direct sans modification de processus.' : 'Real-time multi-supplier inventory bridge reclaimed 12 staff hours every week.'}
            </p>
          </div>
        </div>

        {/* Dieppe Engineering Hub & Contact Footer */}
        <div style={{ borderTop: '2px solid #0891b2', paddingTop: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#f8fafc', padding: '10px 14px', borderRadius: '6px' }}>
          <div>
            <div style={{ fontSize: '10px', fontWeight: '800', color: '#0f172a' }}>
              {isFrench ? 'BUREAU D\'INGÉNIERIE DE DIEPPE, N.-B.' : 'DIEPPE, NB SENIOR ENGINEERING HUB'}
            </div>
            <p style={{ fontSize: '8.5px', color: '#475569', margin: '1px 0 0 0' }}>
              Ahmed Bello, M.Sc. • Funmilayo Akinsiku, P.Eng. • Fawaz Bello, KCSP • Taiwo Owoeye, CBAP
            </p>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '10px', fontWeight: '800', color: '#0891b2' }}>
              contact@oakivo.com • +1 (506) 800-2440
            </div>
            <p style={{ fontSize: '8.5px', color: '#64748b', margin: '1px 0 0 0' }}>
              www.oakivo.com • Dieppe, New Brunswick, Canada
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default DownloadBrochureButton;
