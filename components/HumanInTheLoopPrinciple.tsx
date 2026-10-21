import React from 'react';
import { AlertCircle, CheckCircle2, ShieldCheck, Check, Smartphone } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const HumanInTheLoopPrinciple: React.FC = () => {
  const { language } = useLanguage();
  const isFr = language === 'fr';

  return (
    <section id="principle" className="py-24 bg-[#000000] text-[#f7faf9] border-b border-[#1e2d27]/70 relative">
      <div className="container mx-auto max-w-6xl px-6 sm:px-8 lg:px-12">
        
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <span className="nova-eyebrow text-[#23c694] mb-3">
            {isFr ? 'NOTRE PHILOSOPHIE D’INGÉNIERIE' : 'OUR ENGINEERING STANDARD'}
          </span>
          <h2 className="text-3xl sm:text-5xl font-display font-light tracking-[-0.035em] text-[#f7faf9] mb-4">
            {isFr 
              ? 'La règle d’or : « L’IA prépare, l’humain valide »'
              : 'The golden rule: "AI prepares, humans approve."'
            }
          </h2>
          <p className="text-[#a8b0ad] text-sm sm:text-base leading-relaxed font-light">
            {isFr
              ? "La plus grande crainte des entrepreneurs est justifiée : que se passe-t-il si un algorithme envoie un courriel embarrassant à un client fidèle ou commet une erreur de facturation ? Voici comment notre architecture élimine ce risque à la racine."
              : "Business owners are rightly protective of their reputation and cash flow. Unchecked autonomous software breaks in production. We engineer an irrevocable human checkpoint into every single operational workflow."
            }
          </p>
        </div>

        {/* 2-Column Comparison with Editorial Image */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Card 1: The Problem with Unchecked Autonomy (5 cols) */}
          <div className="lg:col-span-5 p-8 sm:p-10 rounded-2xl bg-[#070a09] border border-[#1e2d27] flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-rose-400 uppercase tracking-wider mb-4 font-semibold">
                <AlertCircle size={15} />
                <span>{isFr ? 'L’Autonomie Sans Contrôle (Le Risque)' : 'Unchecked Autonomy (The Risky Path)'}</span>
              </div>

              <h3 className="text-xl font-display font-light text-white mb-3">
                {isFr ? 'Pourquoi l’autonomie aveugle échoue sur le terrain' : 'Why blind automation fails in real businesses'}
              </h3>

              <p className="text-xs sm:text-sm text-[#a8b0ad] font-light leading-relaxed mb-6">
                {isFr
                  ? 'Les modèles de langage sont des moteurs statistiques. Lorsqu’on les connecte directement à vos comptes bancaires, logiciels comptables ou communications clients sans barrière humaine, l’erreur est inévitable.'
                  : 'Language models are statistical engines, not deterministic accountants. When connected directly to client email or accounting ledgers without guardrails, failure is mathematically guaranteed over time.'
                }
              </p>

              <div className="space-y-3 pt-4 border-t border-[#1e2d27] text-xs font-mono text-[#a8b0ad]">
                <div className="flex items-start gap-2">
                  <span className="text-rose-400 shrink-0 font-bold">✕</span>
                  <span>{isFr ? 'Rabais erronés ou promesses non autorisées envoyées aux clients' : 'Hallucinated discounts or unauthorized quotes sent to prospects'}</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-rose-400 shrink-0 font-bold">✕</span>
                  <span>{isFr ? 'Lignes de facturation mal lues injectées en douce dans la comptabilité' : 'Mismatched inventory or ledger discrepancies injected silently'}</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-rose-400 shrink-0 font-bold">✕</span>
                  <span>{isFr ? 'Perte de temps en gestion de crise pour réparer les erreurs' : 'Hours wasted cleaning up errors and apologizing to key accounts'}</span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-[#1e2d27] text-[11px] font-mono text-[#7c8581]">
              {isFr ? 'Résultat : Anxiété accrue et temps perdu.' : 'Result: Operational friction and broken trust.'}
            </div>
          </div>

          {/* Card 2: The Oakivo Standard + Editorial Executive Image (7 cols) */}
          <div className="lg:col-span-7 p-8 sm:p-10 rounded-2xl bg-[#080d0b] border border-[#23c694]/45 shadow-[0_0_40px_-5px_rgba(35,198,148,0.15)] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2 text-xs font-mono text-[#23c694] uppercase tracking-wider font-semibold">
                  <ShieldCheck size={16} />
                  <span>{isFr ? 'Le Standard Oakivo (Sécurité Totale)' : 'The Oakivo Standard (Zero-Risk Control)'}</span>
                </div>
                <span className="text-[10px] font-mono text-[#23c694] bg-[#0f5e4a]/25 px-2.5 py-0.5 rounded-full border border-[#23c694]/40">
                  {isFr ? 'Sas Mobile 1-Clic' : '1-Tap Mobile Gateway'}
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-display font-light text-white mb-3">
                {isFr ? 'La machine prépare, vous validez en 3 secondes' : 'Machine prepares in seconds; humans verify in one tap'}
              </h3>

              <p className="text-xs sm:text-sm text-[#dce3e0] font-light leading-relaxed mb-6">
                {isFr
                  ? 'Le système fait 95 % du travail lourd : lecture des PDF, calcul des coûts de main-d’œuvre, extraction des numéros de pièces et rédaction soignée du devis. Le dirigeant jette un coup d’œil et valide d’un seul clic.'
                  : 'Machine intelligence executes 95% of tedious toil: reading invoices, checking price lists, cross-referencing inventory, and formatting the draft. The owner or trusted staff retains the final 1-click confirmation key.'
                }
              </p>

              {/* Real Executive Photography */}
              <div className="relative rounded-xl overflow-hidden border border-[#1e2d27] mb-6 group">
                <img 
                  src="/assets/images/executive_approval.jpg" 
                  alt={isFr ? "Dirigeant d'entreprise validant un devis d'un clic sur mobile" : "Executive reviewing instant 1-tap mobile approval"} 
                  referrerPolicy="no-referrer"
                  className="w-full h-48 sm:h-56 object-cover object-center group-hover:scale-[1.02] transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#080d0b] via-transparent to-transparent opacity-80" />
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[11px] font-mono">
                  <span className="bg-[#000000]/85 px-3 py-1 rounded-full border border-[#23c694]/40 text-[#23c694] flex items-center gap-1.5 backdrop-blur-md">
                    <Smartphone size={12} />
                    <span>{isFr ? 'Autorisation mobile immédiate' : 'Instant mobile approval authorization'}</span>
                  </span>
                  <span className="bg-[#000000]/80 px-2.5 py-1 rounded-full border border-white/10 text-[#a8b0ad] backdrop-blur-md hidden sm:inline">
                    Zero Hallucination Guarantee
                  </span>
                </div>
              </div>

              <div className="space-y-3 pt-2 text-xs font-mono text-[#f7faf9]">
                <div className="flex items-start gap-2">
                  <Check size={14} className="text-[#23c694] shrink-0 mt-0.5" />
                  <span>{isFr ? 'Zéro envoi externe sans confirmation humaine explicite' : 'Zero autonomous external sends without human approval'}</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check size={14} className="text-[#23c694] shrink-0 mt-0.5" />
                  <span>{isFr ? 'Interface de validation ultra-simple sur mobile ou ordinateur' : 'Clean 3-second review console on your phone or desktop'}</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check size={14} className="text-[#23c694] shrink-0 mt-0.5" />
                  <span>{isFr ? '95 % de gain de temps, 100 % de maîtrise opérationnelle' : '95% speed dividend with 100% human operational control'}</span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-[#1e2d27] flex items-center justify-between text-[11px] font-mono">
              <span className="text-[#23c694]">
                {isFr ? 'Résultat : Vitesse maximale sans risque de réputation.' : 'Result: Maximum velocity with zero embarrassment risk.'}
              </span>
              <span className="text-[#7c8581]">
                airgap::v2.4
              </span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default HumanInTheLoopPrinciple;
