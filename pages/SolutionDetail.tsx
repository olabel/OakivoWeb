import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Sparkles, ArrowRight, CheckCircle2, ShieldCheck, Clock, FileText, Layers, Database, ArrowLeft, Shield, Lock, Cpu, Cloud, Terminal, Palette } from 'lucide-react';
import Section from '../components/Section';
import SEO from '../components/SEO';
import NotFound from './NotFound';
import LeadDrawer from '../components/LeadDrawer';
import { NavRoute } from '../types';
import { useLanguage } from '../context/LanguageContext';

interface SolutionData {
  title: string;
  subtitle: string;
  description: string;
  icon: any;
  benefits: string[];
  useCase: {
    client: string;
    location: string;
    challenge: string;
    outcome: string;
    hoursSaved: string;
  };
  faq: { question: string; answer: string }[];
}

const solutionsMapEn: Record<string, SolutionData> = {
  'invoice-automation': {
    title: 'Accounting & Invoice Synchronization',
    subtitle: 'Eliminate manual invoice typing between email, CRM, and accounting software.',
    description: 'We build direct automated bridges connecting your sales, dispatch, or customer portals directly into QuickBooks Online, Xero, or Sage - so invoices generate automatically without double data entry.',
    icon: FileText,
    benefits: [
      'Automatic invoice creation from closed orders or dispatch logs',
      'Instant customer payment status sync back to your operational database',
      'Zero double-entry typos across billing codes and line items',
      'Automatic email receipt forwarding to accounting inbox'
    ],
    useCase: {
      client: 'Atlantic Wholesale & Supply',
      location: 'Halifax, Nova Scotia',
      challenge: 'Staff spent 14 hours per week copying PDF invoice details into QuickBooks Online manually.',
      outcome: 'Invoices now post to QuickBooks automatically upon order confirmation, eliminating 100% of double-entry tasks.',
      hoursSaved: '14 staff hours saved per week'
    },
    faq: [
      {
        question: 'Do we need to switch from our existing QuickBooks or Sage account?',
        answer: 'No. We work directly with your existing software and subscription. No new software to buy.'
      },
      {
        question: 'How long does implementation take?',
        answer: 'Most accounting integrations are built, tested in sandbox, and live within 5 to 10 business days with zero downtime.'
      }
    ]
  },
  'order-inventory-sync': {
    title: 'Order & Inventory Bridges',
    subtitle: 'Keep warehouse counts and online order logs perfectly in sync 24/7.',
    description: 'Stop overselling or manually updating inventory spreadsheets. We connect your e-commerce platform, POS, and warehouse management system so stock updates automatically with every sale.',
    icon: Layers,
    benefits: [
      'Real-time inventory deduction across all sales channels',
      'Automated purchase order alerts when stock dips below thresholds',
      'Centralized order logging across regional branch locations',
      'Eliminate manual stock-taking spreadsheets'
    ],
    useCase: {
      client: 'Maritime Equipment & Industrial',
      location: 'Moncton, New Brunswick',
      challenge: 'Counter staff were constantly cross-referencing warehouse whiteboards with inventory spreadsheets.',
      outcome: 'Automated order-to-inventory bridge synchronized stock levels live across 3 regional branches.',
      hoursSaved: '12 staff hours saved per week'
    },
    faq: [
      {
        question: 'Will this work with older custom database systems?',
        answer: 'Yes, we build custom API or database connectors for legacy systems as well as cloud-based software.'
      }
    ]
  },
  'dispatch-route-logging': {
    title: 'Dispatch & Route Logging Automation',
    subtitle: 'Connect field service job completions directly to customer billing and payroll.',
    description: 'When drivers or technicians complete jobs in the field, we ensure work logs, timestamps, and parts used flow instantly into your billing and job-costing software.',
    icon: Clock,
    benefits: [
      'Instant field-to-office job ticket delivery',
      'Automated hours and mileage logging for technician payroll',
      'Faster invoice turnaround on completed service calls',
      'No missing paperwork or delayed billing cycles'
    ],
    useCase: {
      client: 'Bay Logistics & Service Fleet',
      location: 'Saint John, New Brunswick',
      challenge: 'Technicians submitted paper work orders at the end of each week, delaying customer billing by 7 days.',
      outcome: 'Job completions now trigger immediate draft invoices upon mobile sign-off by customer.',
      hoursSaved: '15 staff hours saved per week'
    },
    faq: [
      {
        question: 'Can technicians use their existing mobile phones or tablets?',
        answer: 'Yes. We connect with mobile apps your team already uses or set up simple mobile forms.'
      }
    ]
  },
  'custom-report-automation': {
    title: 'Custom Executive Report Automation',
    subtitle: 'Consolidate operational spreadsheets into clean, daily executive dashboards.',
    description: 'Stop waiting until month-end to understand your operational numbers. We automatically aggregate data from sales, payroll, inventory, and accounting into one daily summary.',
    icon: Database,
    benefits: [
      'Automated daily email digests summarizing key operational metrics',
      'Real-time KPI tracking across all regional branches',
      'No manual copy-pasting between separate Excel sheets',
      'Accurate cash flow and pipeline forecasting'
    ],
    useCase: {
      client: 'Island Food Processing & Supply',
      location: 'Charlottetown, Prince Edward Island',
      challenge: 'General manager spent 3 hours every Monday compiling operational numbers from 4 departments.',
      outcome: 'Automated morning report now delivers consolidated KPIs straight to inbox at 7:00 AM daily.',
      hoursSaved: '10 staff hours saved per week'
    },
    faq: [
      {
        question: 'Can we receive the report directly via email or text?',
        answer: 'Yes, reports can be delivered as PDF attachments, Slack/Teams notifications, or live web dashboards.'
      }
    ]
  },
  'cloud-security': {
    title: 'Cloud Security Posture Management & Hardening',
    subtitle: 'Automated continuous cloud security baselining, IAM guardrails, and real-time misconfiguration remediation.',
    description: 'We harden multi-cloud environments across AWS, Azure, and GCP using automated Policy-as-Code and eBPF runtime monitors, ensuring sovereign Canadian data residency and zero-drift infrastructure.',
    icon: Cloud,
    benefits: [
      'Continuous Cloud Security Posture Management (CSPM) against CIS Benchmarks',
      'Immutable Terraform/OpenTofu infrastructure baselines with drift detection',
      'Least-privilege cloud IAM enforcement and automated key rotation',
      'Sovereign Canadian data residency pinning in AWS ca-central-1 and Azure canadaeast'
    ],
    useCase: {
      client: 'Atlantic Financial Technology Group',
      location: 'Halifax, Nova Scotia',
      challenge: 'Rapid cloud migration left 42 AWS accounts with unmonitored security groups, public S3 buckets, and overlapping IAM roles.',
      outcome: 'Engineered centralized Control Tower governance and automated SCP guardrails, eliminating 100% of high-severity misconfigurations in 14 days.',
      hoursSaved: '40 DevOps hours saved per month'
    },
    faq: [
      {
        question: 'How quickly can Oakivo audit our cloud infrastructure?',
        answer: 'We deploy non-invasive scanning read-only roles and deliver an executive risk report with automated remediation code within 48 to 72 hours.'
      },
      {
        question: 'Do you support multi-cloud deployments?',
        answer: 'Yes. We architect unified policy guardrails across AWS, Microsoft Azure, Google Cloud, and on-premises sovereign private clusters.'
      }
    ]
  },
  'devsecops-automation': {
    title: 'Automated DevSecOps & CI/CD Security Gating',
    subtitle: 'Shift security left into your deployment pipelines with zero-friction developer guardrails.',
    description: 'We integrate static code analysis (SAST), software composition analysis (SCA), container vulnerability scanning, and cryptographic artifact signing directly into GitHub Actions and GitLab CI.',
    icon: Terminal,
    benefits: [
      'Sub-minute automated security gating in CI/CD pipelines',
      'Software Bill of Materials (SBOM) generation satisfying executive orders',
      'Cosign / Sigstore container image signing ensuring verified production provenance',
      'Automated secret detection preventing API credential leaks to git repositories'
    ],
    useCase: {
      client: 'Maritime Health Informatics',
      location: 'Moncton, New Brunswick',
      challenge: 'Manual security reviews delayed production releases by 12 days per sprint cycle.',
      outcome: 'Implemented automated pipeline guardrails, reducing release security verification from 12 days to 3.5 minutes.',
      hoursSaved: '80 engineering hours saved per release'
    },
    faq: [
      {
        question: 'Will DevSecOps gating slow down our engineers?',
        answer: 'No. Our security tests run concurrently with existing unit test suites in under 90 seconds, providing immediate feedback in pull request comments.'
      }
    ]
  },
  'continuous-compliance': {
    title: 'Continuous Compliance & Audit Automation',
    subtitle: 'Eliminate manual audit preparation for SOC 2 Type II, Bill C-26, and PIPEDA.',
    description: 'We transform compliance from a stressful annual spreadsheet scramble into automated, continuous background evidence collection directly from your cloud API telemetry.',
    icon: ShieldCheck,
    benefits: [
      'Automated evidence collection from cloud APIs, GitHub, and IAM providers',
      'Continuous compliance dashboards with real-time pass/fail control telemetry',
      'Pre-built audit packages aligned with SOC 2, Bill C-26, and ISO 27001',
      'Seamless integration with compliance platforms including Vanta, Drata, and Sprinto'
    ],
    useCase: {
      client: 'Boreal Energy Logistics',
      location: 'Calgary, Alberta',
      challenge: 'Preparing for annual SOC 2 Type II audit consumed 300+ engineering and management hours.',
      outcome: 'Codified automated evidence collection pipelines, passing the audit with zero exceptions and zero manual screenshots.',
      hoursSaved: '300 staff hours saved per audit'
    },
    faq: [
      {
        question: 'Can Oakivo help us achieve SOC 2 certification from scratch?',
        answer: 'Yes. We build the infrastructure, codify the policies, and guide you through the CPA observation period to guaranteed audit success.'
      }
    ]
  },
  'zero-trust-architecture': {
    title: 'Zero-Trust Architecture & Microsegmentation',
    subtitle: 'Never trust, always verify. Hardware-enforced cryptographic boundaries for mission-critical systems.',
    description: 'We replace outdated perimeter VPNs with modern Zero-Trust Network Access (ZTNA), mutual TLS (mTLS) service meshes, and SPIFFE/SPIRE cryptographic workload identities.',
    icon: Lock,
    benefits: [
      'Microsegmented Kubernetes networking eliminating lateral threat movement',
      'Hardware-enforced identity boundaries with FIDO2/WebAuthn phishing-resistant MFA',
      'Ephemeral sub-minute credential issuance replacing permanent API keys',
      'eBPF in-kernel network monitoring with sub-second automated threat isolation'
    ],
    useCase: {
      client: 'Fundy Critical Infrastructure Consortium',
      location: 'Saint John, New Brunswick',
      challenge: 'Legacy VPN concentrators exposed internal OT control systems to lateral network traversal.',
      outcome: 'Engineered zero-trust service mesh with kernel-level eBPF firewalls, restricting all cross-service communication to verified mTLS channels.',
      hoursSaved: '25 security operations hours saved weekly'
    },
    faq: [
      {
        question: 'Does zero trust replace our existing firewalls?',
        answer: 'Zero trust complements your network by adding granular application-layer and identity-layer controls, rendering firewall bypass attacks obsolete.'
      }
    ]
  },
  'enterprise-erp-hardening': {
    title: 'Enterprise ERP & Core Systems Hardening',
    subtitle: 'Shield SAP, NetSuite, and mission-critical operational databases from ransomware and unauthorized exfiltration.',
    description: 'We harden enterprise ERP platforms and operational databases with dedicated isolated network enclaves, immutable WORM backups, and role-based zero-trust API proxies.',
    icon: Database,
    benefits: [
      'Immutable write-once-read-many (WORM) air-gapped backups resisting ransomware',
      'Real-time anomaly detection alerting on bulk database exports and schema tampering',
      'Encrypted transit proxies for legacy ERP APIs without application code modifications',
      'Full compliance alignment with OSFI B-13 and Canadian critical infrastructure standards'
    ],
    useCase: {
      client: 'Maritime Distribution Network',
      location: 'Fredericton, New Brunswick',
      challenge: 'Aging on-premise ERP infrastructure faced persistent ransomware threats and unencrypted internal database connections.',
      outcome: 'Migrated ERP database to sovereign AWS enclave with automated point-in-time recovery and zero public IP exposures.',
      hoursSaved: '100% downtime risk eliminated'
    },
    faq: [
      {
        question: 'Can you harden legacy on-premise ERP systems?',
        answer: 'Yes. We deploy hybrid secure access gateways and air-gapped immutable backup vaults that protect on-premise systems without expensive software rewrites.'
      }
    ]
  },
  'creative-web-design': {
    title: 'Creative Website Design & Brand Digital Exposure',
    subtitle: 'Stand out from generic cookie-cutter sites with a bespoke, lightning-fast digital storefront.',
    description: 'We craft distinctive, modern websites engineered to turn casual visitors into committed clients. Blazing performance, search engine dominance, and direct automated lead integration straight into your workflow.',
    icon: Palette,
    benefits: [
      'Bespoke, human visual identity designed specifically for your brand',
      'Sub-second page loading speeds and 100/100 Core Web Vitals',
      'Advanced regional SEO positioning your business above local competitors',
      'Direct CRM and workflow integration capturing customer leads automatically'
    ],
    useCase: {
      client: 'Atlantic Clean Energy Ventures',
      location: 'Moncton, New Brunswick',
      challenge: 'An outdated, slow template website failed to communicate technical credibility, losing bids to regional competitors.',
      outcome: 'Designed a high-conversion, responsive digital platform with automated consultation intake, tripling high-intent client inquiries in 60 days.',
      hoursSaved: '3x qualified inbound lead volume'
    },
    faq: [
      {
        question: 'Do you use generic WordPress templates or page builders?',
        answer: 'Never. We build custom, bespoke React/TypeScript websites with pristine performance, zero bloat, and full ownership for your team.'
      },
      {
        question: 'Will our website integrate with our existing CRM and invoicing tools?',
        answer: 'Yes. Every website we build connects directly with your preferred email desks, calendars, CRM, and accounting pipelines.'
      }
    ]
  }
};

const solutionsMapFr: Record<string, SolutionData> = {
  'invoice-automation': {
    title: 'Comptabilité & Synchronisation des Factures',
    subtitle: 'Éliminez la saisie manuelle des factures entre courriels, CRM et logiciels comptables.',
    description: 'Nous concevons des passerelles directes automatisées reliant vos ventes, répartition ou portails clients directement à QuickBooks en ligne, Xero ou Sage - vos factures se créent automatiquement sans double saisie.',
    icon: FileText,
    benefits: [
      'Création automatique de factures à partir des bons de commande validés',
      'Synchronisation instantanée du statut de paiement dans votre base opérationnelle',
      'Zéro faute de frappe ou erreur de double saisie dans les codes de facturation',
      'Acheminement automatique des reçus vers la boîte de réception comptable'
    ],
    useCase: {
      client: 'Atlantic Wholesale & Supply',
      location: 'Halifax, Nouvelle-Écosse',
      challenge: 'Le personnel consacrait 14 heures par semaine à recopier manuellement les détails des factures PDF dans QuickBooks.',
      outcome: 'Les factures s\'enregistrent désormais automatiquement dès la confirmation de la commande, éliminant 100 % des doubles saisies.',
      hoursSaved: '14 heures économisées par semaine'
    },
    faq: [
      {
        question: 'Devons-nous changer de compte QuickBooks ou Sage actuel ?',
        answer: 'Non. Nous nous intégrons directement avec vos logiciels et abonnements existants. Aucun nouvel outil à acheter.'
      },
      {
        question: 'Combien de temps prend la mise en œuvre ?',
        answer: 'La plupart des intégrations comptables sont construites, testées en bac à sable et déployées en 5 à 10 jours ouvrables sans interruption.'
      }
    ]
  },
  'order-inventory-sync': {
    title: 'Passerelles de Commandes & d\'Inventaire',
    subtitle: 'Maintenez les stocks d\'entrepôt et les commandes en ligne parfaitement synchronisés 24/7.',
    description: 'Fini le survente ou les mises à jour manuelles sur tableurs. Nous synchronisons votre boutique en ligne, votre caisse PDV et votre système de gestion d\'entrepôt à chaque transaction.',
    icon: Layers,
    benefits: [
      'Déduction des stocks en temps réel sur tous vos canaux de vente',
      'Alertes automatisées de réapprovisionnement sous les seuils critiques',
      'Centralisation des journaux de commandes à travers toutes vos succursales',
      'Élimination complète des feuilles de calcul d\'inventaire manuelles'
    ],
    useCase: {
      client: 'Maritime Equipment & Industrial',
      location: 'Moncton, Nouveau-Brunswick',
      challenge: 'Le personnel au comptoir devait constamment recouper les tableaux blancs de l\'entrepôt avec des chiffriers Excel.',
      outcome: 'La passerelle commandes-stocks synchronise en direct l\'inventaire entre 3 succursales régionales.',
      hoursSaved: '12 heures économisées par semaine'
    },
    faq: [
      {
        question: 'Est-ce compatible avec des bases de données sur mesure plus anciennes ?',
        answer: 'Oui, nous développons des connecteurs API ou bases de données sur mesure pour les systèmes patrimoniaux comme pour le cloud.'
      }
    ]
  },
  'dispatch-route-logging': {
    title: 'Automatisation de la Répartition & des Trajets',
    subtitle: 'Reliez l\'achèvement des travaux sur le terrain directement à la facturation client et à la paie.',
    description: 'Lorsque des chauffeurs ou techniciens terminent des interventions sur le terrain, les feuilles de temps, horodatages et pièces utilisées alimentent instantanément vos logiciels de facturation et de coûts de revient.',
    icon: Clock,
    benefits: [
      'Transmission instantanée des bons d\'intervention du terrain au bureau',
      'Enregistrement automatisé des heures et du kilométrage pour la paie',
      'Facturation accélérée dès la fin de l\'intervention de service',
      'Fin des bordereaux papier égarés et des cycles de facturation retardés'
    ],
    useCase: {
      client: 'Bay Logistics & Service Fleet',
      location: 'Saint John, Nouveau-Brunswick',
      challenge: 'Les techniciens déposaient leurs ordres de travail papier le vendredi, retardant la facturation de 7 jours.',
      outcome: 'L\'achèvement de l\'intervention génère immédiatement une facture brouillon dès la signature mobile du client.',
      hoursSaved: '15 heures économisées par semaine'
    },
    faq: [
      {
        question: 'Les techniciens peuvent-ils utiliser leurs téléphones ou tablettes existants ?',
        answer: 'Oui. Nous nous connectons aux applications mobiles existantes ou mettons en place des formulaires mobiles simples.'
      }
    ]
  },
  'custom-report-automation': {
    title: 'Automatisation des Rapports de Direction',
    subtitle: 'Consolidez vos tableurs opérationnels en tableaux de bord de direction clairs et quotidiens.',
    description: 'N\'attendez plus la fin du mois pour comprendre vos indicateurs opérationnels. Nous agrégeons automatiquement les données de vente, paie, inventaire et comptabilité dans une synthèse matinale.',
    icon: Database,
    benefits: [
      'Condensés quotidiens par courriel résumant les indicateurs clés',
      'Suivi en temps réel des KPI pour l\'ensemble des succursales régionales',
      'Zéro copier-coller fastidieux entre classeurs Excel disparates',
      'Prévisions précises des flux de trésorerie et du pipeline d\'affaires'
    ],
    useCase: {
      client: 'Island Food Processing & Supply',
      location: 'Charlottetown, Île-du-Prince-Édouard',
      challenge: 'Le directeur général passait 3 heures chaque lundi matin à compiler les chiffres de 4 services.',
      outcome: 'Le rapport matinal automatisé livre désormais les KPI consolidés directement par courriel à 7h00 chaque matin.',
      hoursSaved: '10 heures économisées par semaine'
    },
    faq: [
      {
        question: 'Pouvons-nous recevoir le rapport directement par courriel ou messagerie ?',
        answer: 'Oui, les synthèses peuvent être transmises en PDF, alertes Slack/Teams ou visualisées sur un tableau de bord web sécurisé.'
      }
    ]
  },
  'cloud-security': {
    title: 'Gestion de la Posture de Sécurité Cloud (CSPM)',
    subtitle: 'Surveillance continue automatisée, garde-fous IAM et correction en temps réel des erreurs de configuration.',
    description: 'Nous renforçons vos environnements multi-cloud sur AWS, Azure et GCP avec du Policy-as-Code et des sondes eBPF au niveau du noyau, garantissant la souveraineté des données canadiennes.',
    icon: Cloud,
    benefits: [
      'Gestion automatisée de la posture de sécurité selon les benchmarks CIS',
      'Infrastructures immuables Terraform/OpenTofu avec détection automatique de dérive',
      'Application du principe du moindre privilège et rotation automatique des clés IAM',
      'Résidence stricte des données canadiennes dans les régions AWS ca-central-1 et Azure canadaeast'
    ],
    useCase: {
      client: 'Groupe FinTech de l\'Atlantique',
      location: 'Halifax, Nouvelle-Écosse',
      challenge: 'La migration rapide vers le cloud avait laissé 42 comptes AWS sans surveillance avec des compartiments S3 publics.',
      outcome: 'Déploiement centralisé d\'AWS Control Tower et de Service Control Policies (SCP), résolvant 100% des vulnérabilités critiques.',
      hoursSaved: '40 heures DevOps économisées par mois'
    },
    faq: [
      {
        question: 'En combien de temps Oakivo peut-elle auditer notre cloud ?',
        answer: 'Nous déployons des rôles de lecture seule non intrusifs et livrons un rapport de remédiation complet en 48 à 72 heures.'
      }
    ]
  },
  'devsecops-automation': {
    title: 'Automatisation DevSecOps & Portails CI/CD',
    subtitle: 'Intégrez la sécurité en amont dans vos pipelines de livraison sans ralentir vos ingénieurs.',
    description: 'Nous intégrons des analyses statiques (SAST), la vérification de la composition logicielle (SCA) et la signature cryptographique des conteneurs directement dans GitHub Actions et GitLab CI.',
    icon: Terminal,
    benefits: [
      'Validation de sécurité automatisée en moins de 90 secondes dans les pipelines CI/CD',
      'Génération dynamique du Software Bill of Materials (SBOM) pour la conformité',
      'Signature cryptographique des conteneurs via Cosign / Sigstore',
      'Détection automatisée des secrets empêchant toute fuite de clés d\'API'
    ],
    useCase: {
      client: 'Informatique Santé Maritime',
      location: 'Moncton, Nouveau-Brunswick',
      challenge: 'Les audits manuels retardaient les livraisons en production de 12 jours par cycle.',
      outcome: 'Mise en place de garde-fous de pipeline automatisés réduisant la validation de sécurité à 3,5 minutes.',
      hoursSaved: '80 heures d\'ingénierie sauvées par livraison'
    },
    faq: [
      {
        question: 'L\'intégration DevSecOps ralentit-elle les développeurs ?',
        answer: 'Non, nos tests s\'exécutent en parallèle des tests unitaires en moins de 90 secondes avec des retours directs dans les Pull Requests.'
      }
    ]
  },
  'continuous-compliance': {
    title: 'Conformité Continue & Automatisation des Audits',
    subtitle: 'Éliminez le stress des préparatifs d\'audits pour SOC 2 Type II, le Projet de loi C-26 et la LPRPDE.',
    description: 'Nous transformons la conformité réglementaire en une collecte continue et automatisée de preuves directement issue des API cloud.',
    icon: ShieldCheck,
    benefits: [
      'Collecte automatisée de preuves depuis les API cloud, GitHub et les fournisseurs IAM',
      'Tableaux de bord de conformité continue avec télémétrie en temps réel',
      'Modules préconfigurés pour SOC 2, Loi C-26 et ISO 27001',
      'Intégration transparente avec Vanta, Drata et Sprinto'
    ],
    useCase: {
      client: 'Logistique Énergétique Boréale',
      location: 'Calgary, Alberta',
      challenge: 'La préparation de l\'audit annuel SOC 2 monopolisait plus de 300 heures d\'ingénierie.',
      outcome: 'Automatisation complète de la collecte de preuves, passant l\'audit avec zéro exception.',
      hoursSaved: '300 heures économisées par cycle d\'audit'
    },
    faq: [
      {
        question: 'Oakivo peut-elle nous accompagner dès le début vers SOC 2 ?',
        answer: 'Oui. Nous bâtissons l\'infrastructure, codifions les politiques et vous guidons durant toute la période d\'observation du cabinet CPA.'
      }
    ]
  },
  'zero-trust-architecture': {
    title: 'Architecture Zero-Trust & Micro-segmentation',
    subtitle: 'Ne jamais faire confiance, toujours vérifier. Cloisonnement cryptographique strict pour systèmes critiques.',
    description: 'Nous remplaçons les VPN désuets par un accès réseau Zero-Trust (ZTNA), un maillage de services mTLS et des identités éphémères SPIFFE/SPIRE.',
    icon: Lock,
    benefits: [
      'Micro-segmentation réseau Kubernetes empêchant les mouvements latéraux malveillants',
      'Authentification forte FIDO2/WebAuthn résistante à l\'hameçonnage',
      'Émission de jetons d\'accès éphémères de moins d\'une minute remplaçant les clés statiques',
      'Surveillance réseau au niveau du noyau eBPF avec isolation instantanée des menaces'
    ],
    useCase: {
      client: 'Consortium des Infrastructures de Fundy',
      location: 'Saint John, Nouveau-Brunswick',
      challenge: 'Les concentrateurs VPN historiques exposaient les réseaux opérationnels industriels.',
      outcome: 'Architecture d\'un maillage de services Zero-Trust avec filtrage eBPF chiffrant 100% des flux internes.',
      hoursSaved: '25 heures d\'opérations de sécurité sauvées par semaine'
    },
    faq: [
      {
        question: 'Le Zero-Trust remplace-t-il nos pare-feu existants ?',
        answer: 'Le Zero-Trust renforce votre réseau en y ajoutant des contrôles fins d\'identité et d\'application, neutralisant le contournement des pare-feu.'
      }
    ]
  },
  'enterprise-erp-hardening': {
    title: 'Sécurisation des ERP d\'Entreprise & Systèmes Cœurs',
    subtitle: 'Protégez SAP, NetSuite et vos bases de données opérationnelles contre les rançongiciels et l\'exfiltration.',
    description: 'Nous blindons vos ERP d\'entreprise et vos bases de données opérationnelles avec des enclaves réseau isolées, des sauvegardes immuables WORM et des proxys API Zero-Trust.',
    icon: Database,
    benefits: [
      'Sauvegardes immuables WORM (Write Once Read Many) résistantes aux ransomwares',
      'Détection d\'anomalies en temps réel alertant sur les exports massifs de bases de données',
      'Proxys chiffrés pour les API ERP héritées sans modification du code applicatif',
      'Conformité stricte avec les directives B-13 du BSIF et les normes canadiennes'
    ],
    useCase: {
      client: 'Réseau de Distribution Maritime',
      location: 'Fredericton, Nouveau-Brunswick',
      challenge: 'L\'ERP sur site vieillissant subissait des tentatives répétées d\'attaques par rançongiciel.',
      outcome: 'Migration de la base ERP vers une enclave AWS souveraine avec reprise automatisée sans interruption de service.',
      hoursSaved: 'Risque d\'interruption d\'activité éliminé à 100%'
    },
    faq: [
      {
        question: 'Pouvez-vous sécuriser des ERP anciens sur site ?',
        answer: 'Oui. Nous déployons des passerelles d\'accès sécurisées hybrides et des coffres de sauvegarde immuables sans refonte logicielle.'
      }
    ]
  },
  'creative-web-design': {
    title: 'Conception Web Créative & Visibilité Numérique',
    subtitle: 'Distinguez-vous des sites génériques avec une vitrine numérique sur mesure et ultra-rapide.',
    description: 'Nous concevons des sites web remarquables et modernes, pensés pour convertir les visiteurs en clients fidèles. Performance éclair, référencement naturel régional dominant et capture automatisée de prospects reliée directement à vos outils de gestion.',
    icon: Palette,
    benefits: [
      'Identité visuelle humaine et sur mesure, pensée pour votre marque',
      'Chargement inférieur à la seconde et score Core Web Vitals optimal',
      'Optimisation SEO régionale devançant vos concurrents locaux',
      'Intégration directe aux formulaires et CRM capturant les prospects sans délai'
    ],
    useCase: {
      client: 'Atlantic Clean Energy Ventures',
      location: 'Moncton, Nouveau-Brunswick',
      challenge: 'Un site vieillissant et lent ne parvenait pas à inspirer confiance aux donneurs d\'ordres institutionnels.',
      outcome: 'Conception d\'une plateforme web réactive et percutante avec prise de contact qualifiée, triplant les demandes entrantes en 60 jours.',
      hoursSaved: 'Volume de prospects qualifiés multiplié par 3'
    },
    faq: [
      {
        question: 'Utilisez-vous des modèles génériques WordPress ?',
        answer: 'Jamais. Nous développons des architectures web sur mesure en React/TypeScript sans surplus de code, rapides et dont vous détenez l\'entière propriété.'
      },
      {
        question: 'Le site sera-t-il connecté à nos outils de facturation et CRM existants ?',
        answer: 'Oui. Chaque site que nous concevons est directement relié à vos boîtes courriels, agendas, CRM et circuits comptables.'
      }
    ]
  }
};

const SolutionDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { language } = useLanguage();
  const isFr = language === 'fr';

  const solutionKey = slug ? slug.toLowerCase() : null;
  const solutionsMap = isFr ? solutionsMapFr : solutionsMapEn;
  const solution = solutionKey ? solutionsMap[solutionKey] : null;

  if (!solution || !solutionKey) {
    return <NotFound />;
  }

  const IconComponent = solution.icon;

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': solution.faq.map(item => ({
      '@type': 'Question',
      'name': item.question,
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': item.answer
      }
    }))
  };

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    'name': solution.title,
    'description': solution.description,
    'provider': {
      '@type': 'LocalBusiness',
      'name': 'Oakivo Solutions',
      'address': {
        '@type': 'PostalAddress',
        'addressRegion': 'Atlantic Canada',
        'addressCountry': 'CA'
      }
    },
    'areaServed': ['New Brunswick', 'Nova Scotia', 'Prince Edward Island', 'Newfoundland and Labrador']
  };

  return (
    <>
      <SEO 
        title={`${solution.title} | Oakivo Solutions`}
        description={solution.description}
        canonical={`/solutions/${solutionKey}`}
        schema={[serviceSchema, faqSchema]}
      />

      <section className="bg-slate-950 text-white pt-36 pb-20 relative overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-cyan-500/5 rounded-full blur-[140px] pointer-events-none" />

        <div className="container mx-auto px-4 md:px-6 relative z-10 max-w-4xl">
          <Link to={NavRoute.SERVICES} className="inline-flex items-center gap-2 text-cyan-400 mb-8 hover:underline font-mono font-bold uppercase tracking-wider text-xs">
            <ArrowLeft size={16} /> {isFr ? "Toutes les solutions & processus" : "All Solutions & Process"}
          </Link>

          <div className="inline-flex items-center gap-2 bg-cyan-500/10 border border-cyan-500/20 px-3.5 py-1.5 rounded-full mb-6">
            <IconComponent size={16} className="text-cyan-400" />
            <span className="text-[11px] font-mono text-cyan-400 font-bold uppercase tracking-widest">
              {isFr ? "Intégration Clé en Main des Processus" : "Done-For-You Workflow Integration"}
            </span>
          </div>

          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-slate-100 mb-6">
            {solution.title}
          </h1>

          <p className="text-base md:text-xl text-[#8A8F98] leading-relaxed font-normal mb-8">
            {solution.subtitle}
          </p>

          <button
            onClick={() => setIsDrawerOpen(true)}
            className="px-8 py-4 rounded-full bg-white hover:bg-gray-100 text-black font-semibold text-xs tracking-wide shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:scale-105 transition-all inline-flex items-center gap-2 cursor-pointer"
          >
            <Sparkles size={16} /> {isFr ? "Planifier Votre Audit Opérationnel" : "Schedule Your Operational Audit"}
          </button>
        </div>
      </section>

      <Section className="bg-slate-900 text-white py-20 border-t border-white/10">
        <div className="container mx-auto px-4 md:px-6 max-w-5xl space-y-16">
          
          {/* Overview */}
          <div className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-extrabold text-white">
              {isFr ? "Comment Ça Fonctionne" : "How It Works"}
            </h2>
            <p className="text-base text-gray-300 leading-relaxed font-light">{solution.description}</p>
          </div>

          {/* Key Benefits */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white">
              {isFr ? "Caractéristiques Clés & Impact" : "Key Features & Impact"}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {solution.benefits.map((benefit, idx) => (
                <div key={idx} className="bg-slate-900/40 backdrop-blur-md rounded-sm border border-slate-800 rounded-2xl p-5 border border-white/10 flex items-start gap-3">
                  <CheckCircle2 size={18} className="text-cyan-400 shrink-0 mt-0.5" />
                  <span className="text-xs md:text-sm text-gray-200 font-medium">{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Practical Case Example */}
          <div className="bg-slate-900/40 backdrop-blur-md rounded-sm border border-slate-800 rounded-3xl p-8 border border-white/10 space-y-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <span className="text-[10px] font-mono uppercase text-cyan-400 font-bold tracking-widest">
                {isFr ? "Étude de Cas Régionale" : "Regional Case Study"}
              </span>
              <span className="text-xs font-mono text-gray-400">{solution.useCase.location}</span>
            </div>
            <h3 className="text-xl font-bold text-white">{solution.useCase.client}</h3>
            <div className="space-y-2 text-xs md:text-sm text-gray-300">
              <p><strong className="text-white">{isFr ? "Défi :" : "Challenge:"}</strong> {solution.useCase.challenge}</p>
              <p><strong className="text-white">{isFr ? "Résultat :" : "Solution Outcome:"}</strong> {solution.useCase.outcome}</p>
            </div>
            <div className="pt-4 border-t border-white/10 text-cyan-400 font-mono font-bold text-xs uppercase tracking-wider flex items-center gap-2">
              <Clock size={16} /> {solution.useCase.hoursSaved}
            </div>
          </div>

          {/* FAQ Section */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white">
              {isFr ? "Foire Aux Questions" : "Frequently Asked Questions"}
            </h2>
            <div className="space-y-4">
              {solution.faq.map((item, i) => (
                <div key={i} className="bg-slate-900/40 backdrop-blur-md rounded-sm border border-slate-800 rounded-2xl p-6 border border-white/10 space-y-2">
                  <h3 className="text-base font-bold text-white">{item.question}</h3>
                  <p className="text-xs md:text-sm text-gray-400 leading-relaxed">{item.answer}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Final Callout */}
          <div className="bg-slate-900/40 backdrop-blur-md rounded-sm border border-slate-800 rounded-3xl p-8 md:p-12 border border-white/10 text-center space-y-6">
            <span className="text-[10px] font-mono text-cyan-400 font-bold uppercase tracking-widest block">
              {isFr ? "Passez à l'Action" : "Start"}
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              {isFr 
                ? "Prêt à éliminer la saisie manuelle de données dans vos opérations ?"
                : "Ready to eliminate manual data entry in your operations?"}
            </h2>
            <p className="text-xs md:text-sm text-gray-400 font-light max-w-xl mx-auto">
              {isFr
                ? "Planifiez un audit opérationnel de 15 minutes. Nous vous montrerons précisément comment interconnecter vos outils sans licence logicielle coûteuse."
                : "Schedule a 15-minute operational audit. We'll show you exactly how to connect your tools without buying expensive new software."}
            </p>
            <button
              onClick={() => setIsDrawerOpen(true)}
              className="px-8 py-4 rounded-full bg-white hover:bg-gray-100 text-black font-semibold text-xs tracking-wide shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:scale-105 transition-all inline-flex items-center gap-2 cursor-pointer"
            >
              <Sparkles size={16} /> {isFr ? "Planifier Votre Audit Opérationnel" : "Schedule Your Operational Audit"}
            </button>
          </div>

        </div>
      </Section>

      <LeadDrawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />
    </>
  );
};

export default SolutionDetail;
