import React from 'react';
import { AlertCircle, CheckCircle2, ShieldCheck, Check } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const HumanInTheLoopPrinciple: React.FC = () => {
  const { language } = useLanguage();
  const isFr = language === 'fr';

  return (
    <section id="principle" className="py-24 bg-[#04060d] text-white border-b border-white/[0.06] relative">
      <div className="container mx-auto max-w-6xl px-6 sm:px-8 lg:px-12">
        
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <div className="text-xs font-mono text-cyan-400 uppercase tracking-widest mb-3">
            {isFr ? 'Notre Philosophie d’Ingénierie' : 'Our Engineering Standard'}
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-semibold tracking-tight text-white mb-4">
            {isFr 
              ? 'La règle d’or : « L’IA prépare, l’humain valide »'
              : 'The golden rule: "AI prepares, humans approve."'
            }
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-light">
            {isFr
              ? "La plus grande crainte des entrepreneurs est justifiée : que se passe-t-il si un algorithme envoie un courriel embarrassant à un client fidèle ou commet une erreur de facturation ? Voici comment notre architecture élimine ce risque à la racine."
              : "Business owners are rightly protective of their reputation and cash flow. Unchecked autonomous software breaks in production. We engineer an irrevocable human checkpoint into every single operational workflow."
            }
          </p>
        </div>

        {/* 2-Column Comparison: High Contrast, Editorial, Clean */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          
          {/* Card 1: The Problem with Unchecked Autonomy */}
          <div className="p-8 sm:p-10 rounded-2xl bg-white/[0.015] border border-white/[0.08] flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-rose-400 uppercase tracking-wider mb-4">
                <AlertCircle size={15} />
                <span>{isFr ? 'L’Autonomie Sans Contrôle (Le Risque)' : 'Unchecked Autonomy (The Risky Path)'}</span>
              </div>

              <h3 className="text-lg font-display font-semibold text-white mb-3">
                {isFr ? 'Pourquoi l’autonomie aveugle échoue sur le terrain' : 'Why blind automation fails in real businesses'}
              </h3>

              <p className="text-xs sm:text-sm text-slate-400 font-light leading-relaxed mb-6">
                {isFr
                  ? 'Les modèles de langage sont des moteurs statistiques. Lorsqu’on les connecte directement à vos comptes bancaires, logiciels comptables ou communications clients sans barrière humaine, l’erreur est inévitable.'
                  : 'Language models are statistical engines, not deterministic accountants. When connected directly to client email or accounting ledgers without guardrails, failure is mathematically guaranteed over time.'
                }
              </p>

              <div className="space-y-3 pt-4 border-t border-white/[0.06] text-xs font-mono text-slate-400">
                <div className="flex items-start gap-2">
                  <span className="text-rose-400 shrink-0">✕</span>
                  <span>{isFr ? 'Rabais erronés ou promesses non autorisées envoyées aux clients' : 'Hallucinated discounts or unauthorized quotes sent to prospects'}</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-rose-400 shrink-0">✕</span>
                  <span>{isFr ? 'Lignes de facturation mal lues injectées en douce dans la comptabilité' : 'Mismatched inventory or ledger discrepancies injected silently'}</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-rose-400 shrink-0">✕</span>
                  <span>{isFr ? 'Perte de temps en gestion de crise pour réparer les erreurs' : 'Hours wasted cleaning up errors and apologizing to key accounts'}</span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-white/[0.04] text-[11px] font-mono text-slate-500">
              {isFr ? 'Résultat : Anxiété accrue et temps perdu.' : 'Result: Operational friction and broken trust.'}
            </div>
          </div>

          {/* Card 2: The Oakivo Standard */}
          <div className="p-8 sm:p-10 rounded-2xl bg-cyan-950/[0.12] border border-cyan-500/30 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-wider mb-4">
                <ShieldCheck size={15} />
                <span>{isFr ? 'Le Standard Oakivo (Sécurité Totale)' : 'The Oakivo Standard (Zero-Risk Control)'}</span>
              </div>

              <h3 className="text-lg font-display font-semibold text-white mb-3">
                {isFr ? 'La machine prépare, vous validez en 3 secondes' : 'Machine prepares in seconds; humans verify in one tap'}
              </h3>

              <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed mb-6">
                {isFr
                  ? 'Le système fait 95 % du travail lourd : lecture des PDF, calcul des coûts de main-d’œuvre, extraction des numéros de pièces et rédaction soignée du devis. Le dirigeant jette un coup d’œil et valide d’un seul clic.'
                  : 'Machine intelligence executes 95% of tedious toil: reading invoices, checking price lists, cross-referencing inventory, and formatting the draft. The owner or trusted staff retains the final 1-click confirmation key.'
                }
              </p>

              <div className="space-y-3 pt-4 border-t border-cyan-500/20 text-xs font-mono text-slate-200">
                <div className="flex items-start gap-2">
                  <Check size={14} className="text-cyan-400 shrink-0 mt-0.5" />
                  <span>{isFr ? 'Zéro envoi externe sans confirmation humaine explicite' : 'Zero autonomous external sends without human approval'}</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check size={14} className="text-cyan-400 shrink-0 mt-0.5" />
                  <span>{isFr ? 'Interface de validation ultra-simple sur mobile ou ordinateur' : 'Clean 3-second review console on your phone or desktop'}</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check size={14} className="text-cyan-400 shrink-0 mt-0.5" />
                  <span>{isFr ? '95 % de gain de temps, 100 % de maîtrise opérationnelle' : '95% speed dividend with 100% human operational control'}</span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-cyan-500/20 text-[11px] font-mono text-cyan-300">
              {isFr ? 'Résultat : Vitesse maximale sans jamais risquer votre réputation.' : 'Result: Maximum velocity with zero embarrassment risk.'}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default HumanInTheLoopPrinciple;
