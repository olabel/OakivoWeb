import React from 'react';
import { Cpu, Layers, ShieldCheck, Database } from 'lucide-react';
import { ServiceCardData } from '../../components/BentoServices';
import { useLanguage } from '../../context/LanguageContext';

export const useServicesData = (): ServiceCardData[] => {
  const { t } = useLanguage();

  return [
    {
      id: 'digital-transformation',
      category: 'modernization',
      title: t('bento.mod_title'),
      subtitle: t('bento.mod_subtitle'),
      description: t('bento.mod_desc'),
      impactMetric: '0',
      impactLabel: t('bento.mod_impact'),
      icon: <Layers className="text-cyan-400" size={24} />,
      accentColor: 'cyan',
      size: 'large',
      features: [
        t('bento.mod_f1'),
        t('bento.mod_f2'),
        t('bento.mod_f3'),
        t('bento.mod_f4')
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
      title: t('bento.cloud_title'),
      subtitle: t('bento.cloud_subtitle'),
      description: t('bento.cloud_desc'),
      impactMetric: '35%',
      impactLabel: t('bento.cloud_impact'),
      icon: <Cpu className="text-emerald-400" size={24} />,
      accentColor: 'emerald',
      size: 'large',
      features: [
        t('bento.cloud_f1'),
        t('bento.cloud_f2'),
        t('bento.cloud_f3'),
        t('bento.cloud_f4')
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
      title: t('bento.sec_title'),
      subtitle: t('bento.sec_subtitle'),
      description: t('bento.sec_desc'),
      impactMetric: '100%',
      impactLabel: t('bento.sec_impact'),
      icon: <ShieldCheck className="text-indigo-400" size={24} />,
      accentColor: 'indigo',
      size: 'medium',
      features: [
        t('bento.sec_f1'),
        t('bento.sec_f2'),
        t('bento.sec_f3'),
        t('bento.sec_f4')
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
      title: t('bento.odoo_title'),
      subtitle: t('bento.odoo_subtitle'),
      description: t('bento.odoo_desc'),
      impactMetric: '10x',
      impactLabel: t('bento.odoo_impact'),
      icon: <Database className="text-amber-400" size={24} />,
      accentColor: 'gold',
      size: 'medium',
      features: [
        t('bento.odoo_f1'),
        t('bento.odoo_f2'),
        t('bento.odoo_f3'),
        t('bento.odoo_f4')
      ],
      schematicCode: [
        'DEPLOY_ERP :: ODOO_ENTERPRISE_CORE',
        'INTEGRATE_MODULES -> CRM_SALES_INVENTORY',
        'MIGRATE_DATA -> ZERO_LOSS_TRANSFER',
        'STATUS -> UNIFIED_OPERATIONS'
      ]
    }
  ];
};
