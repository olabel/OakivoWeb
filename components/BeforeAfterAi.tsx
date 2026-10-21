import React, { useState } from 'react';
import { 
  XCircle, CheckCircle2, ArrowRight, Zap, RefreshCw, 
  Receipt, MessageSquare, ShieldCheck, Sparkles 
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const BeforeAfterAi: React.FC = () => {
  const { language } = useLanguage();
  const isFr = language === 'fr';

  const [activeTab, setActiveTab] = useState<'leads' | 'quotes' | 'invoicing' | 'support'>('leads');

  const comparisons = {
    leads: {
      title: isFr ? 'Gestion des Nouveaux Prospects' : 'New Inbound Lead Response',
      before: {
        headline: isFr ? 'Le Week-end ou sur Chantier' : 'Evenings & Busy Job Hours',
        points: isFr ? [
          'Le prospect remplit un formulaire vendredi à 20h00.',
          'Le message attend dans votre boîte de réception jusqu’au lundi 9h00.',
          'Pendant ce temps, le prospect a appelé 3 concurrents sur Google.',
          'Résultat : Opportunité perdue, zéro chiffre d’affaires généré.'
        ] : [
          'Prospect submits a quote request Friday at 8:00 PM.',
          'Inquiry sits untouched in inbox until Monday morning catch-up.',
          'Customer already called 3 other local businesses on Google.',
          'Result: Lead won by the faster competitor; zero revenue captured.'
        ],
        badge: isFr ? 'Sans Oakivo (Perte de Contrats)' : 'Without Oakivo (Leaking Revenue)'
      },
      after: {
        headline: isFr ? 'Réponse Qualifiée en Moins de 90s' : 'Under 90-Second Instant Qualification',
        points: isFr ? [
          'L’IA analyse la demande, vérifie votre calendrier et calcule le devis.',
          'Une réponse courtoise et personnalisée est préparée en 42 secondes.',
          'Vous recevez une alerte sur votre téléphone et validez d’un seul clic.',
          'Résultat : Le client réserve et verse son acompte avant le réveil des concurrents.'
        ] : [
          'AI parses project specs, checks calendar, and structures initial quote.',
          'Personalized, high-converting reply staged in 42 seconds flat.',
          'Owner receives priority phone alert and approves with 1 single tap.',
          'Result: Deal locked in and deposit secured while competitors sleep.'
        ],
        badge: isFr ? 'Avec Oakivo (+45% de Conversion)' : 'With Oakivo (+45% Win Rate)'
      }
    },
    quotes: {
      title: isFr ? 'Relance des Devis sans Réponse' : 'Following Up on Sent Estimates',
      before: {
        headline: isFr ? 'Devis Oubliés & Silence Radio' : 'Quotes Ghosted & Forgotten',
        points: isFr ? [
          'Vous envoyez 25 devis ce mois-ci pour 65 000 $ de valeur.',
          'Trop occupé sur le terrain pour rappeler et relancer chaque client.',
          'Gêne de « harceler » le prospect ou manque de temps.',
          'Résultat : 60% des devis tombent dans l’oubli et restent impayés.'
        ] : [
          'You send 25 estimates this month totaling $65,000 in potential work.',
          'Too slammed on active job sites to manually call and chase each one.',
          'Uncomfortable feeling like a nagging salesperson, so quotes sit dormant.',
          'Result: 60% of quotes quietly disappear and expire into thin air.'
        ],
        badge: isFr ? 'Sans Oakivo (Devis Morts)' : 'Without Oakivo (Lost Pipeline)'
      },
      after: {
        headline: isFr ? 'Résurrection Automatisée & Bienveillante' : 'Automated, Polite Revival Campaigns',
        points: isFr ? [
          'L’IA détecte les devis ouverts sans signature après 3, 7 et 14 jours.',
          'Rédige une relance naturelle posant une question précise d’agenda.',
          'Votre équipe approuve le message d’un clic avant envoi.',
          'Résultat : Réactivation de 18% à 25% de devis considérés comme perdus.'
        ] : [
          'AI tracks viewed estimates with no reply at day 3, 7, and 14 milestones.',
          'Drafts a thoughtful, consultative follow-up addressing scheduling.',
          'Your team approves the draft with 1 click before dispatch.',
          'Result: Revives 18% to 25% of quotes previously assumed dead (+$38k).'
        ],
        badge: isFr ? 'Avec Oakivo (+38k $ Récupérés)' : 'With Oakivo (+$38k Revived Pipeline)'
      }
    },
    invoicing: {
      title: isFr ? 'Factures & Saisie Comptable' : 'Receipt & Expense Paperwork',
      before: {
        headline: isFr ? '15h de Corvées le Dimanche Soir' : '15 Hours of Sunday Data Entry',
        points: isFr ? [
          'Boîtes à gants et poches pleines de reçus de matériaux froissés.',
          'Saisie manuelle fastidieuse dans QuickBooks ou Xero ligne par ligne.',
          'Erreurs de numéros de projets et oubli de refacturer certains achats.',
          'Résultat : Week-ends gâchés et fuite de marge non refacturée.'
        ] : [
          'Truck glovebox and pockets stuffed with crumpled supplier receipts.',
          'Tedious hours manually typing invoices and HST/taxes into QuickBooks.',
          'Line-item errors and forgotten billable materials never charged to clients.',
          'Result: Lost weekends, burned-out office staff, and margin leak.'
        ],
        badge: isFr ? 'Sans Oakivo (15h/sem Perdues)' : 'Without Oakivo (15h/wk Lost)'
      },
      after: {
        headline: isFr ? 'Zéro Saisie & Rapprochement Immédiat' : 'Zero-Typing Line Item Extraction',
        points: isFr ? [
          'Prenez une photo sur le chantier ou transférez le courriel du fournisseur.',
          'L’IA extrait la TVH, le fournisseur et associe le projet client exact.',
          'Une notification vous demande confirmation : « Pousser vers QuickBooks ? »',
          'Résultat : 12 heures récupérées par semaine et 100% des coûts refacturés.'
        ] : [
          'Snap a phone photo at supplier counter or forward PDF bill.',
          'AI parses line items, taxes, supplier details, and links client job ID.',
          'Presents clean staged entry for your 1-click accounting sync.',
          'Result: 12+ hours reclaimed weekly; zero billable expenses forgotten.'
        ],
        badge: isFr ? 'Avec Oakivo (12h Économisées)' : 'With Oakivo (12+ Hours Saved)'
      }
    },
    support: {
      title: isFr ? 'Appels Clients & Suivi de Chantier' : 'Inbound Client Calls & Status Updates',
      before: {
        headline: isFr ? '30 Coups de Fil Interrompant le Travail' : '30 Daily Phone Distractions',
        points: isFr ? [
          'Le téléphone sonne sans cesse : « À quelle heure arrivez-vous ? »',
          'Interrompt les techniciens en plein travail sur le terrain.',
          'Clients anxieux qui se sentent non informés.',
          'Résultat : Retards sur les chantiers et journée de travail fractionnée.'
        ] : [
          'Phone rings constantly: "When is the tech coming? Did you get my order?"',
          'Constant interruptions pulling technicians and staff off critical work.',
          'Clients feel left in the dark and get frustrated.',
          'Result: Delayed job completion, fractured attention, and stress.'
        ],
        badge: isFr ? 'Sans Oakivo (Interruptions)' : 'Without Oakivo (Constant Chaos)'
      },
      after: {
        headline: isFr ? 'Avis Proactifs Automatisés par SMS' : 'Proactive Milestone SMS Dispatches',
        points: isFr ? [
          'L’IA envoie un SMS automatique : « Le technicien est en route, arrivée 14h15 ».',
          'Mise à jour du statut avec lien de suivi et confirmation en temps réel.',
          'Réduction de 70% des appels entrants répétitifs.',
          'Résultat : Clients enchantés et équipe concentrée sur l’exécution.'
        ] : [
          'Automated SMS triggered: "Technician en route, estimated arrival 2:15 PM".',
          'Client gets real-time status updates and live technician dispatch alert.',
          '70% reduction in inbound "where is my order" check-in calls.',
          'Result: Delighted 5-star Google reviews and calm, focused staff.'
        ],
        badge: isFr ? 'Avec Oakivo (-70% d’Appels)' : 'With Oakivo (-70% Phone Calls)'
      }
    }
  };

  const current = comparisons[activeTab];

  return (
    <section className="py-24 bg-[#04070E] border-t border-white/[0.08] relative">
      <div className="container mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-mono font-medium tracking-widest text-cyan-400 uppercase mb-4">
            <Sparkles size={14} />
            <span>{isFr ? 'AVANT vs APRÈS L’IA OAKIVO' : 'REALITY CHECK: BEFORE VS. AFTER AI'}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-bold text-white tracking-tight mb-6">
            {isFr 
              ? 'Ce Que Change l’IA Concrètement dans Votre Quotidien'
              : 'What Happens to Your Day When AI Takes the Friction'
            }
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            {isFr
              ? 'Comparez votre fonctionnement actuel avec un système d’IA discret opérant 24/7 en coulisses.'
              : 'Compare the daily grind of manual administration against a quiet AI engine running behind the scenes.'
            }
          </p>
        </div>

        {/* Tab Selector */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-12">
          {[
            { id: 'leads', label: isFr ? '1. Nouveaux Prospects' : '1. Inbound Leads' },
            { id: 'quotes', label: isFr ? '2. Relance des Devis' : '2. Quote Follow-Ups' },
            { id: 'invoicing', label: isFr ? '3. Factures & Reçus' : '3. Invoicing & Bills' },
            { id: 'support', label: isFr ? '4. Suivi & Appels Clients' : '4. Status & Dispatch' }
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 sm:px-5 py-2.5 rounded-xl font-mono text-xs sm:text-sm font-semibold tracking-wider transition-all duration-200 cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-white text-slate-950 shadow-lg'
                  : 'bg-black/40 text-slate-400 hover:text-white border border-white/[0.08]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Side-by-Side Comparison Box */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Column 1: WITHOUT OAKIVO (Before) */}
          <div className="p-8 rounded-2xl bg-gradient-to-b from-rose-950/20 via-black/40 to-black/60 border border-rose-500/20 flex flex-col justify-between">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono font-bold px-3 py-1 rounded-full bg-rose-500/10 text-rose-300 border border-rose-500/20 flex items-center gap-1.5">
                  <XCircle size={13} className="text-rose-400" />
                  <span>{current.before.badge}</span>
                </span>
              </div>

              <div>
                <h3 className="text-xl font-display font-bold text-white tracking-tight mb-4">
                  {current.before.headline}
                </h3>
                <ul className="space-y-3.5">
                  {current.before.points.map((pt, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-400 font-light leading-relaxed">
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-400 shrink-0 mt-2" />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-rose-500/10 text-xs font-mono text-rose-300/80">
              {isFr ? '❌ Coût : Perte de clients & surcharge mentale' : '❌ Cost: Lost deals, weekend exhaustion, slower growth'}
            </div>
          </div>

          {/* Column 2: WITH OAKIVO (After) */}
          <div className="p-8 rounded-2xl bg-gradient-to-b from-emerald-950/20 via-cyan-950/20 to-black/60 border border-emerald-500/30 flex flex-col justify-between shadow-2xl shadow-emerald-500/5">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono font-bold px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 flex items-center gap-1.5">
                  <CheckCircle2 size={13} className="text-emerald-400" />
                  <span>{current.after.badge}</span>
                </span>
                <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider font-semibold">
                  {isFr ? 'Validation en 1 Clic' : '1-Click Human Gate'}
                </span>
              </div>

              <div>
                <h3 className="text-xl font-display font-bold text-white tracking-tight mb-4">
                  {current.after.headline}
                </h3>
                <ul className="space-y-3.5">
                  {current.after.points.map((pt, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-200 font-normal leading-relaxed">
                      <CheckCircle2 size={15} className="text-emerald-400 shrink-0 mt-0.5" />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-emerald-500/20 text-xs font-mono text-emerald-300 flex items-center justify-between">
              <span>{isFr ? '✅ Résultat : Croissance des ventes & sérénité' : '✅ Result: More booked jobs & reclaimed personal freedom'}</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default BeforeAfterAi;
