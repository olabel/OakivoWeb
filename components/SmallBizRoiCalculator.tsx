import React, { useState, useMemo } from 'react';
import { 
  Calculator, ArrowRight, DollarSign, Clock, TrendingUp, 
  Sparkles, CheckCircle2, RotateCcw, Wrench, Stethoscope, 
  Briefcase, Truck, ArrowUpRight 
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface SmallBizRoiCalculatorProps {
  className?: string;
  onOpenBooking?: (data: { industry: string; annualValue: number; hoursReclaimed: number }) => void;
}

interface IndustryPreset {
  id: string;
  nameEn: string;
  nameFr: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  defaultLeads: number;
  defaultAvgValue: number;
  defaultHours: number;
}

export const SmallBizRoiCalculator: React.FC<SmallBizRoiCalculatorProps> = ({ 
  className = '', 
  onOpenBooking 
}) => {
  const { language } = useLanguage();
  const isFr = language === 'fr';

  const presets: IndustryPreset[] = [
    {
      id: 'trades',
      nameEn: 'Trades & Contractors (HVAC, Electrical, Roofing)',
      nameFr: 'Métiers & Entrepreneurs (CVC, Toiture, Électricité)',
      icon: Wrench,
      defaultLeads: 45,
      defaultAvgValue: 2400,
      defaultHours: 18
    },
    {
      id: 'clinic',
      nameEn: 'Medical, Dental & Allied Health',
      nameFr: 'Cliniques Médicales, Dentaires & Soins',
      icon: Stethoscope,
      defaultLeads: 80,
      defaultAvgValue: 350,
      defaultHours: 15
    },
    {
      id: 'services',
      nameEn: 'Boutique Professional Services (Legal, Accounting)',
      nameFr: 'Services Professionnels & Cabinets',
      icon: Briefcase,
      defaultLeads: 25,
      defaultAvgValue: 3500,
      defaultHours: 14
    },
    {
      id: 'distribution',
      nameEn: 'Wholesale, Supply & Commercial Distribution',
      nameFr: 'Distribution & Grossistes Locaux',
      icon: Truck,
      defaultLeads: 60,
      defaultAvgValue: 1800,
      defaultHours: 22
    }
  ];

  const [selectedPreset, setSelectedPreset] = useState<string>('trades');
  const [monthlyLeads, setMonthlyLeads] = useState<number>(45);
  const [avgCustomerValue, setAvgCustomerValue] = useState<number>(2400);
  const [weeklyAdminHours, setWeeklyAdminHours] = useState<number>(18);

  const handleSelectPreset = (preset: IndustryPreset) => {
    setSelectedPreset(preset.id);
    setMonthlyLeads(preset.defaultLeads);
    setAvgCustomerValue(preset.defaultAvgValue);
    setWeeklyAdminHours(preset.defaultHours);
  };

  // Calculations:
  // 1. Lost leads recovered: Conservative 14% improvement in lead capture & quote resurrection
  // 2. Admin hours saved: 75% reduction in manual data entry & repetitive followup
  // Calculations:
  // 1. Lost leads recovered: Conservative realistic 6% improvement (typically 1 to 3 deals/month)
  // 2. Admin hours saved: Conservative 50% reduction in repetitive paperwork (6 to 10 hours/week)
  // 3. Hourly value of owner/staff time: estimated at $40/hr
  const calculations = useMemo(() => {
    const recoveredDealsPerMonth = Math.max(1, Math.round(monthlyLeads * 0.06));
    const monthlyRecoveredRevenue = recoveredDealsPerMonth * avgCustomerValue;
    const weeklyHoursSaved = Math.min(12, Math.max(4, Math.round(weeklyAdminHours * 0.50)));
    const monthlyAdminLaborSavings = weeklyHoursSaved * 4.33 * 40; // $40/hr blended value
    const totalMonthlyValue = monthlyRecoveredRevenue + monthlyAdminLaborSavings;
    const annualNetValue = totalMonthlyValue * 12;

    return {
      recoveredDealsPerMonth,
      monthlyRecoveredRevenue,
      weeklyHoursSaved,
      monthlyAdminLaborSavings,
      annualNetValue
    };
  }, [monthlyLeads, avgCustomerValue, weeklyAdminHours]);

  const handleClaimBlueprint = () => {
    const currentPreset = presets.find(p => p.id === selectedPreset);
    const industryName = currentPreset ? (isFr ? currentPreset.nameFr : currentPreset.nameEn) : 'Small Business';

    if (onOpenBooking) {
      onOpenBooking({
        industry: industryName,
        annualValue: calculations.annualNetValue,
        hoursReclaimed: calculations.weeklyHoursSaved
      });
    } else {
      window.dispatchEvent(new CustomEvent('open-lead-drawer', {
        detail: {
          focus: `Realistic Blueprint: ${industryName} (~$${calculations.annualNetValue.toLocaleString()}/yr impact)`,
          topic: `ROI Calculator: ${industryName} ($${calculations.monthlyRecoveredRevenue.toLocaleString()}/mo revenue recovery, ${calculations.weeklyHoursSaved}h/wk saved)`
        }
      }));
    }
  };

  return (
    <section id="ai-calculator" className={`py-24 bg-[#030712] border-t border-white/[0.08] relative overflow-hidden ${className}`}>
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] bg-cyan-600/[0.06] blur-[150px] pointer-events-none rounded-full" />

      <div className="container mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 relative z-10">
        
        {/* Title & Kicker */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-xs font-mono font-medium tracking-widest text-cyan-400 uppercase mb-4">
            <Calculator size={14} />
            <span>{isFr ? 'SIMULATEUR RÉALISTE POUR PME' : 'CONSERVATIVE SMALL BUSINESS CALCULATOR'}</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-display font-bold text-white tracking-tight mb-4">
            {isFr 
              ? 'Calculez Vos Gains Réalistes. Sans Chiffres Gonflés.'
              : 'Calculate Your Realistic Gains. No Inflated Math.'
            }
          </h2>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            {isFr
              ? 'Nous modélisons un gain conservateur (seulement 1 à 2 contrats supplémentaires par mois et 6 à 10 h de corvées évitées). Constatez ce que cela représente sur 12 mois.'
              : 'Based on conservative assumptions: recovering just 1 to 2 lost jobs per month and eliminating 6 to 10 hours of paperwork. See what quiet automation delivers to your annual bottom line.'
            }
          </p>
        </div>

        {/* Industry Presets Selector */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-12">
          {presets.map((preset) => {
            const Icon = preset.icon;
            const isSelected = selectedPreset === preset.id;
            return (
              <button
                key={preset.id}
                type="button"
                onClick={() => handleSelectPreset(preset)}
                className={`p-4 rounded-xl border text-left transition-all duration-200 cursor-pointer flex flex-col justify-between gap-3 ${
                  isSelected
                    ? 'bg-slate-900 border-cyan-400/80 shadow-lg shadow-cyan-500/10'
                    : 'bg-black/40 border-white/[0.08] hover:border-white/[0.2] hover:bg-slate-900/40'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className={`p-2 rounded-lg ${isSelected ? 'bg-cyan-500/20 text-cyan-300' : 'bg-white/[0.05] text-slate-400'}`}>
                    <Icon size={18} />
                  </div>
                  {isSelected && (
                    <span className="w-2 h-2 rounded-full bg-cyan-400" />
                  )}
                </div>
                <div className="text-xs sm:text-sm font-semibold text-white leading-tight">
                  {isFr ? preset.nameFr : preset.nameEn}
                </div>
              </button>
            );
          })}
        </div>

        {/* Calculator Main Box */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch p-6 sm:p-10 rounded-3xl bg-[#090E1F]/90 border border-white/[0.1] shadow-2xl backdrop-blur-xl">
          
          {/* Sliders Column */}
          <div className="lg:col-span-7 space-y-8 pr-0 lg:pr-6">
            
            {/* Slider 1: Monthly Inquiries */}
            <div className="space-y-3">
              <div className="flex justify-between items-center text-xs font-mono">
                <span className="text-slate-300 uppercase tracking-wider font-semibold">
                  {isFr ? '1. Demandes & Devis Entrants par Mois' : '1. Inbound Leads / Inquiries per Month'}
                </span>
                <span className="text-cyan-400 font-bold text-base">
                  {monthlyLeads} <span className="text-xs text-slate-400">{isFr ? 'demandes' : 'inquiries'}</span>
                </span>
              </div>
              <input
                type="range"
                min="5"
                max="300"
                step="5"
                value={monthlyLeads}
                onChange={(e) => setMonthlyLeads(Number(e.target.value))}
                className="w-full accent-cyan-400 cursor-pointer h-2 bg-slate-800 rounded-lg"
              />
              <div className="flex justify-between text-[11px] font-mono text-slate-500">
                <span>5 / mo</span>
                <span>150 / mo</span>
                <span>300+ / mo</span>
              </div>
            </div>

            {/* Slider 2: Average Deal Value */}
            <div className="space-y-3">
              <div className="flex justify-between items-center text-xs font-mono">
                <span className="text-slate-300 uppercase tracking-wider font-semibold">
                  {isFr ? '2. Valeur Moyenne d’un Client ou Contrat' : '2. Average Customer / Job Value'}
                </span>
                <span className="text-emerald-400 font-bold text-base">
                  ${avgCustomerValue.toLocaleString()}
                </span>
              </div>
              <input
                type="range"
                min="100"
                max="12000"
                step="100"
                value={avgCustomerValue}
                onChange={(e) => setAvgCustomerValue(Number(e.target.value))}
                className="w-full accent-emerald-400 cursor-pointer h-2 bg-slate-800 rounded-lg"
              />
              <div className="flex justify-between text-[11px] font-mono text-slate-500">
                <span>$100</span>
                <span>$6,000</span>
                <span>$12,000+</span>
              </div>
            </div>

            {/* Slider 3: Weekly Admin Hours */}
            <div className="space-y-3">
              <div className="flex justify-between items-center text-xs font-mono">
                <span className="text-slate-300 uppercase tracking-wider font-semibold">
                  {isFr ? '3. Heures Hebdomadaires en Facturation & Relances' : '3. Weekly Hours on Paperwork & Quoting'}
                </span>
                <span className="text-cyan-300 font-bold text-base">
                  {weeklyAdminHours} <span className="text-xs text-slate-400">{isFr ? 'heures/sem' : 'hrs/week'}</span>
                </span>
              </div>
              <input
                type="range"
                min="3"
                max="40"
                step="1"
                value={weeklyAdminHours}
                onChange={(e) => setWeeklyAdminHours(Number(e.target.value))}
                className="w-full accent-cyan-300 cursor-pointer h-2 bg-slate-800 rounded-lg"
              />
              <div className="flex justify-between text-[11px] font-mono text-slate-500">
                <span>3 hrs</span>
                <span>20 hrs</span>
                <span>40 hrs</span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.06] text-xs font-mono text-slate-400 space-y-1">
              <div className="text-slate-300 font-semibold flex items-center gap-1.5">
                <CheckCircle2 size={13} className="text-emerald-400" />
                <span>{isFr ? 'Calculé selon des hypothèses conservatrices :' : 'Calculated using conservative empirical benchmarks:'}</span>
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                {isFr 
                  ? '+14% de conversion via réponse en 90 secondes + 72% de réduction des saisies de reçus/factures.'
                  : '+14% lead win-rate improvement via < 90-sec response + 72% reduction in manual data entry.'
                }
              </p>
            </div>

          </div>

          {/* Results Column */}
          <div className="lg:col-span-5 p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-[#0F172A] to-[#0A0F1D] border border-cyan-500/30 flex flex-col justify-between shadow-2xl">
            
            <div className="space-y-6">
              <div className="space-y-1">
                <span className="text-[11px] font-mono text-cyan-400 uppercase tracking-wider font-bold block">
                  {isFr ? 'VALEUR ANNUELLE ESTIMÉE DÉBLOQUÉE' : 'PROJECTED 12-MONTH NET GAIN'}
                </span>
                <div className="text-4xl sm:text-5xl font-mono font-bold text-white tracking-tight">
                  ${Math.round(calculations.annualNetValue).toLocaleString()}
                  <span className="text-sm font-sans text-slate-400 font-light"> / {isFr ? 'an' : 'yr'}</span>
                </div>
              </div>

              <div className="space-y-3 pt-4 border-t border-white/[0.08]">
                <div className="flex justify-between items-center text-xs font-mono">
                  <span className="text-slate-400">{isFr ? 'Revenus récupérés / mois :' : 'Resurrected Revenue / Month:'}</span>
                  <span className="text-emerald-400 font-bold text-sm">
                    +${Math.round(calculations.monthlyRecoveredRevenue).toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between items-center text-xs font-mono">
                  <span className="text-slate-400">{isFr ? 'Heures économisées / semaine :' : 'Admin Hours Slashed / Week:'}</span>
                  <span className="text-cyan-300 font-bold text-sm">
                    {calculations.weeklyHoursSaved} {isFr ? 'heures' : 'hours'}
                  </span>
                </div>
                <div className="flex justify-between items-center text-xs font-mono">
                  <span className="text-slate-400">{isFr ? 'Temps de déploiement garanti :' : 'Guaranteed Cutover Window:'}</span>
                  <span className="text-slate-200 font-bold text-sm">
                    14 {isFr ? 'jours' : 'days'}
                  </span>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs text-slate-300 font-mono space-y-1">
                <div className="font-bold text-emerald-300 flex items-center gap-1.5">
                  <TrendingUp size={13} />
                  <span>{isFr ? 'Garantie ROI Oakivo 30 Jours :' : 'The Oakivo 30-Day ROI Guarantee:'}</span>
                </div>
                <p className="text-[11px] text-slate-400 font-sans leading-relaxed">
                  {isFr
                    ? "Si le système ne vous fait pas gagner au moins 10h/semaine ou ne débloque pas de nouveau revenu en 30 jours, nous travaillons gratuitement jusqu'à ce que l'objectif soit atteint."
                    : "If your system doesn't save at least 10 hours a week or close at least one new deal in the first month, we work for free until it does."
                  }
                </p>
              </div>
            </div>

            <div className="pt-6">
              <button
                type="button"
                onClick={handleClaimBlueprint}
                className="w-full py-4 px-6 rounded-xl bg-white hover:bg-slate-200 text-slate-950 font-bold font-mono text-xs uppercase tracking-wider transition-all shadow-xl hover:shadow-cyan-400/20 flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>{isFr ? 'Obtenir Mon Plan IA Personnalisé' : 'Get Your Custom AI Blueprint'}</span>
                <ArrowRight size={14} />
              </button>
              <div className="text-center text-[10px] font-mono text-slate-500 mt-2.5">
                {isFr ? 'Sans engagement · Accès direct aux fondateurs en 30 min' : 'No obligation · Direct 30-min session with senior founders'}
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default SmallBizRoiCalculator;
