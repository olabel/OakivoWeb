import React from 'react';
import { Cpu, Layers, ShieldCheck, Database } from 'lucide-react';
import { ServiceCardData } from '../components/BentoServices';

export const servicesData: ServiceCardData[] = [
  {
    id: 'digital-transformation',
    category: 'modernization',
    title: 'Stop Bleeding Engineering Hours to Manual Workflows.',
    subtitle: 'Legacy System Modernization & Custom API Automation',
    description: 'Connect legacy ERPs to modern cloud applications with custom API bridges - no risky, multi-year rebuilds required.',
    impactMetric: '0',
    impactLabel: 'Risky Multi-Year Monolith Rebuilds Required',
    icon: <Layers className="text-cyan-400" size={24} />,
    accentColor: 'cyan',
    size: 'large',
    features: [
      'Custom API bridges connecting legacy ERPs to modern cloud tools',
      'Automated workflow pipelines eliminating manual data entry',
      'Incremental modernization without operational downtime',
      'Zero-trust data validation across all integration endpoints'
    ],
    schematicCode: [
      'INIT_BRIDGE :: LEGACY_ERP <-> CLOUD_APP',
      'AUTOMATE_WORKFLOW -> ZERO_MANUAL_HOURS',
      'VALIDATE_DATA -> 100% INTEGRITY_STAMP',
      'STATUS -> OPERATIONAL_VELOCITY'
    ]
  },
  {
    id: 'modern-platforms',
    category: 'odoo',
    title: 'Migrate to the Cloud Without the $50k Surprise Monthly Bill.',
    subtitle: 'Predictable Cloud Migration & Fractional SRE',
    description: 'Get enterprise uptime, Kubernetes orchestration, and locked-in monthly spend hosted strictly on Canadian soil.',
    impactMetric: '35%',
    impactLabel: 'Average Monthly Cloud Spend Reduction',
    icon: <Cpu className="text-emerald-400" size={24} />,
    accentColor: 'emerald',
    size: 'large',
    features: [
      'Locked-in monthly spend hosted strictly on Canadian soil',
      'Kubernetes container orchestration & autoscaling',
      '99.99% uptime guarantee with automated failover',
      'Fractional SRE oversight and continuous infrastructure tuning'
    ],
    schematicCode: [
      'DEPLOY_NODE :: CANADIAN_SOVEREIGN_CLOUD',
      'ORCHESTRATE -> KUBERNETES_AUTOSCALE',
      'LOCK_BUDGET -> PREDICTABLE_MONTHLY_COST',
      'STATUS -> 99.99_UPTIME_VERIFIED'
    ]
  },
  {
    id: 'enterprise-security',
    category: 'cyber',
    title: 'Ironclad Data Sovereignty. 100% PIPEDA-Compliant, Zero Breach Anxiety.',
    subtitle: 'PIPEDA-Compliant Cloud Architecture & Zero-Trust Security',
    description: 'Embed automated vulnerability scanning and zero-trust access directly into your deployment pipeline.',
    impactMetric: '100%',
    impactLabel: 'PIPEDA Compliance & Zero Breach Exposure',
    icon: <ShieldCheck className="text-indigo-400" size={24} />,
    accentColor: 'indigo',
    size: 'medium',
    features: [
      'Automated vulnerability scanning in CI/CD deployment pipelines',
      'Zero-trust access control and micro-segmentation',
      '100% PIPEDA & Law 25 compliance on Canadian nodes',
      '24/7 automated security threat monitoring & auditing'
    ],
    schematicCode: [
      'SEC_PIPELINE :: ZERO_TRUST_ENFORCER',
      'SCAN_VULNERABILITY -> AUTOMATED_PASS',
      'ENFORCE_PIPEDA -> CANADIAN_SOVEREIGN_VAULT',
      'STATUS -> SECURE_ZERO_BREACH'
    ]
  },
  {
    id: 'odoo-implementation',
    category: 'odoo',
    title: 'Unify Your Business with Enterprise-Grade Odoo Implementation.',
    subtitle: 'Odoo ERP Integration & Digital Transformation',
    description: 'Streamline workflows and scale efficiently with a comprehensive Odoo ERP tailored to your operational needs.',
    impactMetric: '10x',
    impactLabel: 'Operational Efficiency & Growth Scalability',
    icon: <Database className="text-amber-400" size={24} />,
    accentColor: 'gold',
    size: 'medium',
    features: [
      'End-to-end Odoo ERP implementation and custom module development',
      'Seamless data migration from legacy accounting and CRM systems',
      'Automated inventory, sales, and HR workflows',
      'Built-in security hardening for enterprise data protection'
    ],
    schematicCode: [
      'DEPLOY_ERP :: ODOO_ENTERPRISE_CORE',
      'INTEGRATE_MODULES -> CRM_SALES_INVENTORY',
      'MIGRATE_DATA -> ZERO_LOSS_TRANSFER',
      'STATUS -> UNIFIED_OPERATIONS'
    ]
  }
];
