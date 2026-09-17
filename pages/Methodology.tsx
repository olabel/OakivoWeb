import React, { useState } from 'react';
import { Network, Lock, Zap, ShieldCheck, ArrowRight, Server, Code, FileKey } from 'lucide-react';
import SEO from '../components/SEO';
import LeadDrawer from '../components/LeadDrawer';
import OakivoROIEngine from '../components/OakivoROIEngine';
import InteractivePlayground from '../components/InteractivePlayground';
import MethodologyTimeline from '../components/MethodologyTimeline';
import { useLanguage } from '../context/LanguageContext';

const Methodology: React.FC = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { language } = useLanguage();
  const isFr = language === 'fr';

  return (
    <>
      <SEO 
        title={isFr ? "Méthodologie d'Ingénierie DevSecOps | Oakivo Canada atlantique" : "DevSecOps Engineering Methodology | Oakivo Atlantic Canada"}
        description={isFr 
          ? "Explorez la méthodologie DevSecOps d'Oakivo. Architectures de sécurité infonuagique Zéro Confiance et pipelines d'automatisation pour la conformité au Canada atlantique."
          : "Explore the Oakivo DevSecOps methodology. We build zero-trust cloud security architectures and process automation pipelines for compliance in Atlantic Canada."}
        canonical="/methodology"
      />

      <section className="bg-slate-950 text-slate-100 pt-32 pb-24 relative overflow-hidden border-b border-slate-900/50">
        {/* Cinematic Video Background */}
        <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
          <video autoPlay loop muted playsInline className="w-full h-full object-cover">
            <source src="https://assets.mixkit.co/videos/preview/mixkit-abstract-technology-network-connections-loop-27402-large.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-950/80 to-slate-950"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10 text-center max-w-4xl">
          <div className="inline-flex items-center gap-2 bg-slate-900/50 border border-slate-800 px-4 py-2 rounded-sm mb-8">
            <ShieldCheck size={14} className="text-cyan-400" />
            <span className="text-[10px] font-mono tracking-widest text-cyan-400 font-bold uppercase">
              {isFr ? "Cadre d'Ingénierie" : "Engineering Framework"}
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-display font-bold tracking-tight mb-6">
            {isFr ? "La Méthodologie de Déploiement Oakivo" : "The Oakivo Deployment Methodology"}
          </h1>
          <p className="text-base md:text-xl text-slate-400 max-w-2xl mx-auto font-light leading-relaxed">
            {isFr 
              ? "Une approche déterministe du DevSecOps. Nous éliminons les frictions de déploiement et intégrons la conformité directement dans vos pipelines CI/CD."
              : "A deterministic approach to DevSecOps. We eliminate deployment friction and bake compliance directly into your CI/CD pipelines."}
          </p>
        </div>
      </section>

      {/* Interactive Horizontal Methodology Timeline */}
      <MethodologyTimeline />

      <section className="bg-slate-950 text-slate-100 py-24 border-b border-slate-900/50">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-sm bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 mb-2">
                <Code size={24} />
              </div>
              <h2 className="text-3xl md:text-4xl font-display font-bold leading-tight">
                {isFr ? "Standardisation de l'Infrastructure as Code (IaC)" : "Infrastructure as Code (IaC) Standardization"}
              </h2>
              <p className="text-slate-400 font-light leading-relaxed text-sm md:text-base">
                {isFr 
                  ? "Nous codons l'intégralité de votre infrastructure. Au lieu de dépendre de configurations manuelles ou de connaissances tacites dispersées, nous mettons en œuvre des manifestes Terraform et Kubernetes rigoureux. Cela garantit la reproductibilité, élimine la dérive de configuration et accélère la reprise après sinistre."
                  : "We codify your entire infrastructure. Instead of relying on manual configurations or scattered tribal knowledge, we implement rigorous Terraform and Kubernetes manifests. This ensures reproducibility, minimizes drift, and accelerates recovery in disaster scenarios."}
              </p>
              <ul className="space-y-4 text-sm font-medium text-slate-300">
                <li className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-cyan-400"></div> 
                  {isFr ? "Approvisionnement déterministe des environnements" : "Deterministic environment provisioning"}
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-cyan-400"></div> 
                  {isFr ? "Pipelines d'infrastructure immuables" : "Immutable infrastructure pipelines"}
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-cyan-400"></div> 
                  {isFr ? "Architecture contrôlée par version (GitOps)" : "Version-controlled architecture"}
                </li>
              </ul>
            </div>
            <div className="bg-slate-900/40 backdrop-blur-md rounded-sm p-8 border border-slate-800 shadow-2xl relative">
              <div className="absolute top-4 left-4 flex gap-2">
                <div className="w-3 h-3 rounded-full bg-slate-700"></div>
                <div className="w-3 h-3 rounded-full bg-slate-700"></div>
                <div className="w-3 h-3 rounded-full bg-slate-700"></div>
              </div>
              <pre className="mt-6 text-[10px] sm:text-xs text-cyan-300/80 font-mono overflow-x-auto">
                <code>
{`resource "aws_security_group" "zero_trust" {
  name        = "strict-enclave"
  description = "Managed by Oakivo IaC"
  vpc_id      = var.vpc_id

  ingress {
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = [var.internal_cidr]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}`}
                </code>
              </pre>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-950 text-slate-100 py-24 border-b border-slate-900/50">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center flex-col-reverse md:flex-row">
            <div className="bg-slate-900/40 backdrop-blur-md rounded-sm p-10 border border-slate-800 shadow-2xl">
              <div className="space-y-6">
                <div className="flex items-center justify-between p-4 border border-slate-800 rounded-sm bg-slate-900/50">
                  <div className="flex items-center gap-3">
                    <FileKey size={18} className="text-cyan-400" />
                    <span className="text-xs font-mono font-bold uppercase">
                      {isFr ? "Contrôles SOC 2 Type II" : "SOC 2 Type II Controls"}
                    </span>
                  </div>
                  <span className="text-[10px] px-2 py-1 bg-cyan-500/20 text-cyan-400 rounded-sm">
                    {isFr ? "AUTOMATISÉ" : "AUTOMATED"}
                  </span>
                </div>
                <div className="flex items-center justify-between p-4 border border-slate-800 rounded-sm bg-slate-900/50">
                  <div className="flex items-center gap-3">
                    <Lock size={18} className="text-cyan-400" />
                    <span className="text-xs font-mono font-bold uppercase">
                      {isFr ? "Gestion des Accès & IAM" : "Identity & Access Mgmt"}
                    </span>
                  </div>
                  <span className="text-[10px] px-2 py-1 bg-cyan-500/20 text-cyan-400 rounded-sm">
                    {isFr ? "APPLIQUÉ" : "ENFORCED"}
                  </span>
                </div>
                <div className="flex items-center justify-between p-4 border border-slate-800 rounded-sm bg-slate-900/50">
                  <div className="flex items-center gap-3">
                    <Server size={18} className="text-cyan-400" />
                    <span className="text-xs font-mono font-bold uppercase">
                      {isFr ? "Résidence des Données (Canada)" : "Data Residency (Canada)"}
                    </span>
                  </div>
                  <span className="text-[10px] px-2 py-1 bg-cyan-500/20 text-cyan-400 rounded-sm">
                    {isFr ? "VÉRIFIÉ" : "VERIFIED"}
                  </span>
                </div>
              </div>
            </div>
            <div className="space-y-8">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-sm bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 mb-2">
                <Lock size={24} />
              </div>
              <h2 className="text-3xl md:text-4xl font-display font-bold leading-tight">
                {isFr ? "Posture de Conformité Continue" : "Continuous Compliance Posture"}
              </h2>
              <p className="text-slate-400 font-light leading-relaxed text-sm md:text-base">
                {isFr
                  ? "La conformité ne devrait pas être une panique annuelle. Nous concevons des pipelines qui valident en continu les politiques de sécurité par rapport aux normes sectorielles (SOC 2, ISO 27001, LPRPDE) à chaque déploiement, générant automatiquement des preuves cryptographiques."
                  : "Compliance shouldn't be an annual scramble. We engineer pipelines that continuously validate security policies against industry frameworks (SOC 2, ISO 27001, PIPEDA) on every deployment, generating cryptographic evidence automatically."}
              </p>
              <button 
                onClick={() => setIsDrawerOpen(true)}
                className="group flex items-center gap-2 text-cyan-400 font-bold text-xs uppercase tracking-widest hover:text-cyan-300 transition-colors cursor-pointer"
              >
                {isFr ? "Discuter d'Architecture de Conformité" : "Discuss Compliance Architecture"} 
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-950 text-slate-100 py-24 border-b border-slate-900/50">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold leading-tight mb-4">
              {isFr ? "Démonstration d'Architecture Zéro Confiance" : "Zero-Trust Architecture Demo"}
            </h2>
            <p className="text-slate-400 font-light leading-relaxed max-w-2xl mx-auto">
              {isFr 
                ? "Simulez une attaque sur un cluster et observez nos pipelines DevSecOps automatisés isoler la menace et réacheminer le trafic sans aucune interruption."
                : "Simulate an attack on a cluster and watch our automated DevSecOps pipelines isolate the threat and reroute traffic without downtime."}
            </p>
          </div>
          <InteractivePlayground />
        </div>
      </section>

      {/* Interactive ROI Engine */}
      <OakivoROIEngine />

      <section className="py-24 bg-slate-950 relative">
        <div className="container mx-auto px-6">
          <div className="bg-slate-900/40 backdrop-blur-md rounded-sm p-14 border border-slate-800 text-slate-100 max-w-5xl mx-auto text-center space-y-6">
            <span className="text-[10px] font-mono text-cyan-400 font-bold uppercase tracking-widest block">
              {isFr ? "Démarrer la Conversation" : "Start The Conversation"}
            </span>
            <h2 className="text-3xl md:text-5xl font-display font-bold">
              {isFr ? "Rehaussez Vos Standards d'Ingénierie" : "Upgrade Your Engineering Standards"}
            </h2>
            <p className="text-sm md:text-base text-slate-400 font-light max-w-2xl mx-auto">
              {isFr 
                ? "Réduisez les frais généraux opérationnels, isolez les menaces de manière autonome et évoluez en toute confiance grâce à une implémentation DevSecOps d'élite."
                : "Reduce operational overhead, isolate threats autonomously, and scale with confidence through elite DevSecOps implementation."}
            </p>
            <button
              onClick={() => setIsDrawerOpen(true)}
              className="px-8 py-4 rounded-sm bg-slate-100 hover:bg-white text-slate-950 font-semibold text-xs tracking-wide transition-all inline-flex items-center gap-2 mt-4 cursor-pointer"
            >
              {isFr ? "Demander un Audit d'Architecture" : "Request Architectural Audit"}
            </button>
          </div>
        </div>
      </section>

      <LeadDrawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />
    </>
  );
};

export default Methodology;
