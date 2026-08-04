import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Cpu, Layers, ShieldCheck, Zap, ArrowRight, CheckCircle2, 
  Sparkles, ChevronRight, X, ExternalLink, Terminal, BarChart3, Database, Lock
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import LeadDrawer from './LeadDrawer';

export interface ServiceCardData {
  id: string;
  category: 'odoo' | 'ai' | 'cyber' | 'modernization';
  title: string;
  subtitle: string;
  description: string;
  impactMetric: string;
  impactLabel: string;
  icon: React.ReactNode;
  accentColor: 'cyan' | 'emerald' | 'indigo' | 'gold';
  size: 'large' | 'medium' | 'small';
  features: string[];
  schematicCode: string[];
}

const BentoServices: React.FC = () => {
  const { language, t } = useLanguage();
  const [activeFilter, setActiveFilter] = useState<'all' | 'odoo' | 'ai' | 'cyber' | 'modernization'>('all');
  const [selectedService, setSelectedService] = useState<ServiceCardData | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const servicesData: ServiceCardData[] = [
    {
      id: 'odoo-19-core',
      category: 'odoo',
      title: 'Odoo 19 Sovereign Orchestration',
      subtitle: 'CRA-Compliant Industrial Core',
      description: 'Unified enterprise resource orchestration. We migrate legacy technical debt into a single, real-time Odoo 19 platform localized for CRA taxes, bilingual multi-currency accounting, and shop-floor PLM.',
      impactMetric: '100%',
      impactLabel: 'CRA & GST/HST Audit Synchronization',
      icon: <Layers className="text-oakivo-secondary" size={24} />,
      accentColor: 'cyan',
      size: 'large',
      features: [
        'Automatic CRA GST/HST tax matrix & multi-currency ledger',
        'Real-time Shop-Floor OEE & Manufacturing Execution (MES)',
        'Zero-latency Warehouse (WMS) & Barcode Automation',
        'Native Quebec Law 25 bilingual data governance'
      ],
      schematicCode: [
        'INIT_NODE :: ODOO_19_SOVEREIGN_CORE',
        'CONNECT_MODULES -> [ACCOUNTING_CRA, MES_SHOPFLOOR, WMS_BARCODE]',
        'VERIFY_LEDGER -> CRA_STAMP_OK (0ms latency)',
        'STATUS -> RESILIENT_OPERATIONAL'
      ]
    },
    {
      id: 'agentic-ai-engine',
      category: 'ai',
      title: 'Agentic AI Reasoning Engines',
      subtitle: 'Sub-50ms Local Inference',
      description: 'Autonomous decision-making agents operating within your local security perimeter. From automated PO reconciliation to predictive supply chain routing.',
      impactMetric: '<50ms',
      impactLabel: 'Local Inferences Latency SLA',
      icon: <Cpu className="text-emerald-400" size={24} />,
      accentColor: 'emerald',
      size: 'large',
      features: [
        'Autonomous PDF invoice parsing & 3-way matching',
        'Predictive supply chain anomaly detection',
        'Custom local RAG over confidential enterprise docs',
        'Human-in-the-loop validation dashboards'
      ],
      schematicCode: [
        'AGENT_LOOP -> PARSE_INCOMING_DOCUMENTS',
        'EVAL_CONFIDENCE -> 99.4% (Threshold > 95%)',
        'ACTION -> EXECUTE_3WAY_MATCH()',
        'NOTIFY_AUDIT -> RECORD_SAVED_IN_VAULT'
      ]
    },
    {
      id: 'zero-trust-hardening',
      category: 'cyber',
      title: 'PIPEDA & Zero-Trust Hardening',
      subtitle: 'Sovereign Canadian Cloud',
      description: 'Military-grade perimeter protection and strict Canadian data residency. Prevent lateral movement and ensure 100% PIPEDA & SOC2 Type II compliance.',
      impactMetric: 'Zero',
      impactLabel: 'Data Exposure across Canadian Nodes',
      icon: <ShieldCheck className="text-indigo-400" size={24} />,
      accentColor: 'indigo',
      size: 'medium',
      features: [
        'Montreal & Toronto sovereign data residency',
        'SOC2 Type II & Quebec Law 25 compliance matrices',
        'Continuous automated vulnerability threat scanning',
        'Role-based granular access control (RBAC)'
      ],
      schematicCode: [
        'SEC_NODE :: PIPEDA_GUARD_v2',
        'ENFORCE_RESIDENCY -> CA_EAST_MONTREAL',
        'ENCRYPTION -> AES-256-GCM + HARDWARE_HSM',
        'THREAT_LEVEL -> ZERO_EXPOSURE'
      ]
    },
    {
      id: 'industrial-modernization',
      category: 'modernization',
      title: 'Legacy Technical Debt Elimination',
      subtitle: 'De-Risking Cloud Migration',
      description: 'Replacing fragile on-premise servers and legacy monoliths with modular, cloud-native microservices engineered for 99.99% uptime.',
      impactMetric: '3.8x',
      impactLabel: 'Operational Velocity Multiplier',
      icon: <Zap className="text-amber-400" size={24} />,
      accentColor: 'gold',
      size: 'medium',
      features: [
        'Seamless data migration from legacy ERPs (SAP, Dynamics, AS400)',
        'High-speed API gateway & custom webhooks',
        'Automated failover and disaster recovery protocols',
        'Comprehensive staff training & change management'
      ],
      schematicCode: [
        'MIGRATE_CORE :: AS400 -> ODOO_19_CLOUD',
        'EXTRACT_ENTRIES -> 1,240,000 RECORDS',
        'VALIDATE_CHECKSUM -> 100% MATCH',
        'CUTOVER -> EXECUTED IN 4 HOURS'
      ]
    }
  ];

  const filteredServices = activeFilter === 'all' 
    ? servicesData 
    : servicesData.filter(s => s.category === activeFilter);

  return (
    <section className="py-24 relative overflow-hidden bg-[#070A0F]" id="services">
      {/* Background Glow Orbs */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-oakivo-secondary/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full linear-pill text-[#8A8F98] text-xs font-mono-tech font-medium uppercase tracking-wider">
            <Sparkles size={13} className="text-oakivo-linearIndigo" /> Technical Core Engineering
          </div>

          <h2 className="text-3xl md:text-5xl lg:text-6xl font-extrabold tracking-linear-tight text-linear-heading leading-tight">
            How we scale <br className="hidden sm:inline" />
            <span className="text-linear-accent font-semibold">industrial velocity.</span>
          </h2>

          <p className="text-sm md:text-base text-[#8A8F98] font-normal max-w-2xl mx-auto leading-relaxed">
            High-fidelity digital frameworks engineered to de-risk Canadian enterprise growth through sovereign, Zero-Trust digital transformation.
          </p>

          {/* Category Filter Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-6">
            {[
              { id: 'all', label: 'All Architectures' },
              { id: 'odoo', label: 'Odoo 19 ERP' },
              { id: 'ai', label: 'Agentic AI' },
              { id: 'cyber', label: 'Zero-Trust Cyber' },
              { id: 'modernization', label: 'Legacy Modernization' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveFilter(tab.id as any)}
                className={`px-4 py-2 rounded-full text-xs font-mono-tech font-medium transition-all ${
                  activeFilter === tab.id
                    ? 'bg-white text-black font-semibold shadow-sm'
                    : 'linear-pill text-gray-400 hover:text-white hover:border-white/20'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Bento Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 max-w-7xl mx-auto">
          {filteredServices.map((service, index) => {
            const isLarge = service.size === 'large';
            const colSpanClass = isLarge ? 'lg:col-span-6' : 'lg:col-span-6';

            return (
              <motion.div
                key={service.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                onClick={() => setSelectedService(service)}
                className={`${colSpanClass} linear-card linear-card-hover rounded-2xl md:rounded-3xl p-6 md:p-8 flex flex-col justify-between cursor-pointer group relative overflow-hidden`}
              >
                {/* Top bar info */}
                <div className="space-y-6 relative z-10">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-white/[0.05] border border-white/10 flex items-center justify-center">
                      {service.icon}
                    </div>

                    <span className="text-[10px] font-mono-tech font-medium uppercase tracking-wider text-[#8A8F98] group-hover:text-white transition-colors">
                      {service.subtitle}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-xl md:text-2xl font-bold tracking-tight text-white group-hover:text-oakivo-linearIndigo transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-xs md:text-sm text-[#8A8F98] font-normal mt-2.5 leading-relaxed">
                      {service.description}
                    </p>
                  </div>

                  {/* Highlights checklist */}
                  <div className="space-y-2 pt-1">
                    {service.features.slice(0, 2).map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-center gap-2 text-xs text-gray-300">
                        <CheckCircle2 size={13} className="text-oakivo-linearIndigo shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Impact Metric & Action */}
                <div className="pt-6 mt-6 border-t border-white/[0.08] flex items-end justify-between relative z-10">
                  <div>
                    <span className="text-2xl md:text-3xl font-mono-tech font-bold text-white tracking-tight">
                      {service.impactMetric}
                    </span>
                    <span className="text-[10px] font-mono-tech text-[#8A8F98] uppercase tracking-wider block mt-0.5">
                      {service.impactLabel}
                    </span>
                  </div>

                  <div className="w-8 h-8 rounded-full bg-white/[0.05] border border-white/10 flex items-center justify-center text-gray-300 group-hover:bg-white group-hover:text-black transition-all">
                    <ChevronRight size={16} />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Service Detail Modal */}
      <AnimatePresence>
        {selectedService && (
          <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedService(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative z-10 w-full max-w-3xl bg-[#0B0F17] border border-white/10 rounded-[36px] p-8 md:p-12 text-white shadow-2xl space-y-8 max-h-[90vh] overflow-y-auto no-scrollbar"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
                    {selectedService.icon}
                  </div>
                  <div>
                    <span className="text-[10px] font-mono-tech text-oakivo-secondary font-bold uppercase tracking-widest block">
                      {selectedService.subtitle}
                    </span>
                    <h3 className="text-2xl md:text-3xl font-display font-bold">
                      {selectedService.title}
                    </h3>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedService(null)}
                  className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white"
                >
                  <X size={20} />
                </button>
              </div>

              <p className="text-sm text-gray-300 leading-relaxed font-light">
                {selectedService.description}
              </p>

              {/* Schematic Terminal Block */}
              <div className="bg-[#070A0F] border border-white/10 rounded-2xl p-5 font-mono-tech text-xs space-y-1 text-oakivo-secondary">
                <div className="flex items-center justify-between pb-3 mb-2 border-b border-white/10 text-gray-500 text-[10px]">
                  <span className="flex items-center gap-1.5"><Terminal size={12} /> ARCHITECTURE_SCHEMATIC.LOG</span>
                  <span>ENCRYPTED // PIPEDA_OK</span>
                </div>
                {selectedService.schematicCode.map((line, idx) => (
                  <div key={idx} className="flex gap-2">
                    <span className="text-gray-600 select-none">&gt;</span>
                    <span>{line}</span>
                  </div>
                ))}
              </div>

              {/* Capabilities checklist */}
              <div className="space-y-3">
                <h4 className="text-xs font-mono-tech font-bold uppercase tracking-widest text-white">
                  Validated Core Capabilities:
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {selectedService.features.map((feat, idx) => (
                    <div key={idx} className="p-3.5 bg-white/5 rounded-2xl border border-white/5 flex items-center gap-3 text-xs text-gray-300">
                      <CheckCircle2 size={16} className="text-oakivo-accent shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Trigger */}
              <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <span className="text-2xl font-mono-tech font-bold text-white">
                    {selectedService.impactMetric}
                  </span>
                  <span className="text-[10px] font-mono-tech text-gray-400 block">
                    {selectedService.impactLabel}
                  </span>
                </div>

                <button
                  onClick={() => {
                    setSelectedService(null);
                    setIsDrawerOpen(true);
                  }}
                  className="w-full sm:w-auto px-8 py-4 rounded-full bg-oakivo-secondary text-black font-extrabold text-xs uppercase tracking-widest shadow-glow-cyan hover:scale-105 transition-all flex items-center justify-center gap-2"
                >
                  <Sparkles size={16} /> Request {selectedService.title} Blueprint
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <LeadDrawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} defaultTopic={selectedService?.title} />
    </section>
  );
};

export default BentoServices;
