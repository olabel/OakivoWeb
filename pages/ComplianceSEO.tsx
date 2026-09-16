import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Shield, Server, CheckCircle2, ChevronRight, ArrowRight, Lock } from 'lucide-react';
import { motion } from 'motion/react';
import SEO from '../components/SEO';

const frameworks = ['soc2', 'bill-c26', 'pipeda', 'hipaa', 'iso27001', 'pci-dss', 'gdpr', 'fedramp', 'cjis'];
const providers = ['aws', 'azure', 'gcp', 'kubernetes'];

const formatName = (str: string) => {
  if (str === 'soc2') return 'SOC 2 Type II';
  if (str === 'bill-c26') return 'Bill C-26 (CCSPA)';
  if (str === 'pipeda') return 'PIPEDA';
  if (str === 'iso27001') return 'ISO 27001';
  if (str === 'pci-dss') return 'PCI-DSS';
  if (str === 'gdpr') return 'GDPR';
  if (str === 'cjis') return 'CJIS';
  if (str === 'aws') return 'AWS';
  if (str === 'gcp') return 'Google Cloud Platform (GCP)';
  if (str === 'azure') return 'Microsoft Azure';
  if (str === 'kubernetes') return 'Kubernetes';
  return str.toUpperCase();
};

const ComplianceSEO: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  
  const [isValid, setIsValid] = useState(true);
  const [framework, setFramework] = useState('');
  const [provider, setProvider] = useState('');

  useEffect(() => {
    if (!slug) return setIsValid(false);
    
    // Parse slug format: soc2-on-aws
    const match = slug.match(/^([a-z0-9-]+)-on-([a-z0-9-]+)$/);
    if (match && frameworks.includes(match[1]) && providers.includes(match[2])) {
      setFramework(match[1]);
      setProvider(match[2]);
    } else {
      setIsValid(false);
      navigate('/expertise', { replace: true });
    }
  }, [slug, navigate]);

  if (!isValid || !framework || !provider) return null;

  const frameworkName = formatName(framework);
  const providerName = formatName(provider);

  return (
    <>
      <SEO 
        title={`${frameworkName} Compliance on ${providerName} | Canadian Audit Readiness | Oakivo`}
        description={`Automate ${frameworkName} compliance on ${providerName} with continuous Policy-as-Code and zero-trust DevSecOps. Audit-ready infrastructure for Canadian and Atlantic enterprises.`}
        keywords={`${frameworkName} compliance on ${providerName}, SOC 2 Type II audit readiness checklist Canada, Bill C-26 Critical Cyber Systems compliance roadmap, PIPEDA vs. HIPAA cloud storage architecture, DevSecOps Moncton, Cloud Security New Brunswick, Terraform AWS EKS hardening`}
        canonical={`/compliance/${slug}`}
      />
      <section className="pt-40 pb-24 px-6 relative bg-slate-950 min-h-[90vh] flex flex-col items-center">
        {/* Glow effect */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[400px] bg-cyan-500/10 blur-[120px] rounded-full pointer-events-none"></div>
        
        <div className="container mx-auto max-w-5xl relative z-10">
          
          <div className="mb-12 inline-flex items-center gap-2 text-xs font-mono font-bold tracking-widest text-cyan-500 uppercase bg-cyan-500/10 px-4 py-2 rounded-full border border-cyan-500/20">
            <Lock size={14} /> Programmatic Security Architecture
          </div>

          <h1 className="text-4xl md:text-6xl font-display font-bold tracking-tight mb-8 text-white leading-[1.1]">
            Architecting <span className="text-cyan-400">{frameworkName}</span><br />
            Natively on <span className="text-white">{providerName}</span>
          </h1>
          
          <p className="text-xl text-slate-400 font-light leading-relaxed mb-12 max-w-3xl">
            For enterprises operating in highly regulated jurisdictions, achieving {frameworkName} compliance on {providerName} requires more than point-in-time audits. Oakivo engineers continuous compliance directly into your CI/CD pipelines through Policy-as-Code and Zero-Trust methodologies.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-slate-900/50 border border-slate-800/80 p-8 rounded-3xl"
            >
              <div className="w-12 h-12 bg-cyan-500/10 rounded-2xl flex items-center justify-center mb-6">
                <Shield className="text-cyan-400" size={24} />
              </div>
              <h3 className="text-2xl font-display font-bold text-white mb-4">Continuous {frameworkName} Auditing</h3>
              <p className="text-slate-400 font-light leading-relaxed mb-6">
                We replace manual compliance checks with automated {providerName} posture management. Our architectures map directly to {frameworkName} controls, providing cryptographically verifiable evidence of compliance in real-time.
              </p>
              <ul className="space-y-3">
                {['Automated Evidence Collection', 'Real-Time Posture Drift Detection', 'Infrastructure-as-Code Scanning'].map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-sm font-mono text-slate-300">
                    <CheckCircle2 size={16} className="text-cyan-500" /> {feature}
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-slate-900/50 border border-slate-800/80 p-8 rounded-3xl"
            >
              <div className="w-12 h-12 bg-cyan-500/10 rounded-2xl flex items-center justify-center mb-6">
                <Server className="text-cyan-400" size={24} />
              </div>
              <h3 className="text-2xl font-display font-bold text-white mb-4">{providerName} Native Guardrails</h3>
              <p className="text-slate-400 font-light leading-relaxed mb-6">
                Instead of bolting on third-party solutions, we leverage native {providerName} services to enforce strict microsegmentation, cryptographic sovereignty, and dynamic admission controls tailored for {frameworkName}.
              </p>
              <ul className="space-y-3">
                {['Zero-Trust Network Microsegmentation', 'Customer Managed Keys (CMK)', 'Policy-as-Code Enforcement'].map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-sm font-mono text-slate-300">
                    <CheckCircle2 size={16} className="text-cyan-500" /> {feature}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          <div className="bg-gradient-to-r from-slate-900 to-slate-900/40 border border-slate-800/80 p-10 md:p-14 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 blur-[100px] rounded-full pointer-events-none"></div>
            
            <div className="max-w-xl z-10">
              <h2 className="text-3xl font-display font-bold text-white mb-4">Ready to automate your {frameworkName} compliance?</h2>
              <p className="text-slate-400 font-light text-lg">
                Schedule a technical architecture review with our DevSecOps leads to map your {providerName} workloads against regulatory requirements.
              </p>
            </div>
            
            <button 
              onClick={() => navigate('/booking')}
              className="z-10 group bg-white text-slate-950 px-8 py-4 rounded-xl font-bold font-mono text-sm hover:bg-cyan-400 transition-colors flex items-center gap-3 whitespace-nowrap"
            >
              SCHEDULE AUDIT
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

        </div>
      </section>
    </>
  );
};

export default ComplianceSEO;
