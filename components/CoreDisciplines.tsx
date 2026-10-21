import React from 'react';
import { ArrowRight, TrendingUp, DollarSign, Code2, ShieldCheck, Check } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface CoreDisciplinesProps {
  onSelectTopic?: (topic: string) => void;
}

export const CoreDisciplines: React.FC<CoreDisciplinesProps> = ({ onSelectTopic }) => {
  const { language } = useLanguage();
  const isFr = language === 'fr';

  const disciplines = [
    {
      num: '01',
      title: isFr ? 'Accélération des Ventes & Vitesse de Réponse' : 'Sales Acceleration & Speed-to-Lead',
      subtitle: isFr ? 'Convertissez vos demandes avant vos concurrents' : 'Win high-margin contracts before competitors open their inbox',
      icon: TrendingUp,
      description: isFr
        ? 'Plus de 75 % des contrats reviennent au premier répondant qualifié. Nous installons des micro-systèmes qui répondent en moins de 90 secondes aux appels manqués et formulaires web, préparent un devis complet selon vos grilles tarifaires et relancent courtoisement les devis dormants.'
        : 'Over 78% of service contracts go to the business that responds first. We engineer lightweight systems that instantly reply to missed calls and website inquiries in under 90 seconds, auto-draft itemized quotes from your price sheets, and gently follow up on dormant proposals.',
      benchmarks: isFr 
        ? ['Délai de réponse réduit de 2 jours à < 3 minutes', '2 à 4 devis supplémentaires récupérés par mois', 'Validation humaine obligatoire en 1 clic']
        : ['Lead turnaround cut from 2 days to < 3 minutes', '2 to 4 additional revived quotes won per month', 'Mandatory 1-click human verification'],
      ctaLabel: isFr ? 'Voir le schéma Ventes' : 'Explore Sales Blueprint'
    },
    {
      num: '02',
      title: isFr ? 'Réduction des Coûts & Zéro Saisie Manuelle' : 'Operational Cost Reduction & Zero Typing',
      subtitle: isFr ? 'Éradiquez la paperasse répétitive et les erreurs de saisie' : 'Eliminate repetitive desk work and costly manual re-typing errors',
      icon: DollarSign,
      description: isFr
        ? 'Retaper des factures papier, copier des feuilles de temps et réconcilier des reçus de fournisseurs vous vole 10 à 15 heures chaque semaine. Nos pipelines de données lisent automatiquement les PDF et images pour alimenter directement QuickBooks, Xero ou votre ERP.'
        : 'Re-typing paper supplier invoices, compiling timesheets, and reconciling bills robs owners and staff of 10 to 15 hours each week. Our practical document extractors read incoming PDFs and photos directly into QuickBooks, Xero, or your ERP.',
      benchmarks: isFr
        ? ['6 à 12 heures de bureau récupérées chaque semaine', 'Diminution de 85 % des erreurs de commande', 'Rapprochement comptable sans friction']
        : ['6 to 12 weekly administrative hours saved', '85% fewer data-entry and quantity errors', 'Frictionless accounting & inventory reconciliation'],
      ctaLabel: isFr ? 'Voir le schéma Efficacité' : 'Explore Efficiency Blueprint'
    },
    {
      num: '03',
      title: isFr ? 'Lancement de Nouveaux Produits & Logiciels Sur Mesure' : 'Custom Software & Product MVP Studio',
      subtitle: isFr ? 'Concevez vos portails clients et outils numériques en semaines' : 'Build bespoke client portals, booking engines, and digital tools',
      icon: Code2,
      description: isFr
        ? 'Besoin d’un portail client sécurisé, d’une plateforme de réservation ou d’un logiciel interne adapté à votre métier ? Nous développons des applications web modernes en React, TypeScript et infonuagique avec des cycles de livraison stricts de 14 jours.'
        : 'Need a custom client portal, self-service booking platform, or bespoke operational web tool? We engineer production-ready web applications using modern React, TypeScript, and cloud-native backbones in focused 14-day sprints.',
      benchmarks: isFr
        ? ['Prototype fonctionnel en 14 jours ouvrables', 'Architecture web moderne, rapide et évolutive', 'Propriété intégrale du code source']
        : ['Functional prototype delivered in 14 business days', 'Fast, maintainable, modern full-stack web stack', '100% intellectual property ownership'],
      ctaLabel: isFr ? 'Voir le studio Logiciel' : 'Explore Software Studio'
    },
    {
      num: '04',
      title: isFr ? 'Cybersécurité Canadienne & Souveraineté Cloud' : 'Canadian Sovereign Cyber Security & Privacy',
      subtitle: isFr ? 'Conformité stricte à la LPRPDE et à la Loi 25 québécoise' : 'Strict domestic data residency and regulatory peace of mind',
      icon: ShieldCheck,
      description: isFr
        ? 'Ne confiez pas vos données clients à des serveurs étrangers non vérifiés. Tous nos systèmes sont hébergés exclusivement au Canada (AWS ca-central-1 à Montréal) avec chiffrement, sauvegardes hors site et aucune réutilisation de vos données pour entraîner des modèles publics.'
        : 'Never store sensitive client data or trade secrets on unverified foreign servers. We host all workloads strictly within Canadian cloud regions (AWS ca-central-1 Montreal) with end-to-end encryption, offsite backups, and strict zero-training privacy guarantees.',
      benchmarks: isFr
        ? ['100 % des données hébergées au Canada (ca-central-1)', 'Conforme aux normes LPRPDE & Loi 25', 'Sauvegardes chiffrées automatiques']
        : ['100% Canadian data residency (AWS ca-central-1)', 'Guaranteed PIPEDA & Quebec Law 25 compliance', 'Encrypted offsite disaster recovery backups'],
      ctaLabel: isFr ? 'Voir les normes Sécurité' : 'Explore Security Standards'
    }
  ];

  const handleAction = (topic: string) => {
    if (onSelectTopic) {
      onSelectTopic(topic);
    } else {
      const el = document.getElementById('contact');
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section id="disciplines" className="py-24 bg-[#050811] text-white border-b border-white/[0.06] relative">
      <div className="container mx-auto max-w-6xl px-6 sm:px-8 lg:px-12">
        
        {/* Section Header: Quiet, Dignified Editorial */}
        <div className="max-w-2xl mb-16">
          <div className="text-xs font-mono text-cyan-400 uppercase tracking-widest mb-3">
            {isFr ? 'Ce Que Nous Faisons' : 'What We Do'}
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-semibold tracking-tight text-white mb-4">
            {isFr 
              ? 'Quatre disciplines. Des résultats économiques concrets.'
              : 'Four disciplines. Real balance-sheet outcomes.'
            }
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-light">
            {isFr
              ? 'Nous ne construisons pas de gadgets artificiels. Nous concevons des systèmes discrets et fiables qui s’intègrent directement aux outils que vous utilisez déjà.'
              : 'We don’t build novelty chatbots. We engineer quiet, reliable systems that connect directly into the tools your team already relies on every day.'
            }
          </p>
        </div>

        {/* 4-Pillar Grid: Spacious, Elegant, Non-AI-Slop */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {disciplines.map((d) => {
            const Icon = d.icon;
            return (
              <div 
                key={d.num}
                className="p-8 sm:p-10 rounded-2xl bg-white/[0.02] border border-white/[0.08] hover:border-white/[0.16] transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-xs font-mono text-cyan-400 font-semibold tracking-widest">
                      {d.num}
                    </span>
                    <div className="p-2 rounded-lg bg-white/[0.04] text-slate-300">
                      <Icon size={18} />
                    </div>
                  </div>

                  <h3 className="text-xl font-display font-semibold text-white tracking-tight mb-2">
                    {d.title}
                  </h3>
                  
                  <div className="text-xs font-mono text-slate-400 mb-4">
                    {d.subtitle}
                  </div>

                  <p className="text-sm text-slate-300 font-light leading-relaxed mb-6">
                    {d.description}
                  </p>
                </div>

                <div>
                  <div className="pt-6 border-t border-white/[0.06] mb-6 space-y-2">
                    {d.benchmarks.map((bm, bIdx) => (
                      <div key={bIdx} className="flex items-center gap-2 text-xs font-mono text-slate-300">
                        <Check size={13} className="text-cyan-400 shrink-0" />
                        <span>{bm}</span>
                      </div>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={() => handleAction(d.title)}
                    className="inline-flex items-center gap-2 text-xs font-mono text-cyan-300 hover:text-white transition-colors cursor-pointer group"
                  >
                    <span>{isFr ? 'Discuter de cette priorité' : 'Discuss this focus'}</span>
                    <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default CoreDisciplines;
