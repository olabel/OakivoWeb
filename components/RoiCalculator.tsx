import React, { useState, useMemo } from 'react';
import { Calculator, ArrowRight, DollarSign, Clock, Users, Sparkles, CheckCircle2, RotateCcw, TrendingUp } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export interface RoiCalculatorProps {
  className?: string;
  onCtaClick?: (savingsData: { annualSavings: number; hoursSaved: number; teamSize: number }) => void;
}

export const RoiCalculator: React.FC<RoiCalculatorProps> = ({ className = '', onCtaClick }) => {
  const { language } = useLanguage();
  const isFr = language === 'fr';

  // Input states
  const [teamSize, setTeamSize] = useState<number>(8);
  const [manualHoursPerWeek, setManualHoursPerWeek] = useState<number>(10);
  const [hourlyWage, setHourlyWage] = useState<number>(45); // Average CAD hourly rate
  const [automationRate, setAutomationRate] = useState<number>(70); // % of manual toil eliminated

  // Calculations
  const results = useMemo(() => {
    // 50 working weeks per year
    const workingWeeks = 50;
    const totalWeeklyHours = teamSize * manualHoursPerWeek;
    const weeklyHoursSaved = totalWeeklyHours * (automationRate / 100);
    const annualHoursSaved = Math.round(weeklyHoursSaved * workingWeeks);
    
    const annualCost = totalWeeklyHours * workingWeeks * hourlyWage;
    const annualSavings = Math.round(annualHoursSaved * hourlyWage);
    const monthlySavings = Math.round(annualSavings / 12);
    
    // Equivalent full-time employees freed up (assuming 1,800 productive hours/yr)
    const fteEquivalent = (annualHoursSaved / 1800).toFixed(1);

    return {
      annualHoursSaved,
      annualSavings,
      monthlySavings,
      fteEquivalent,
      totalWeeklyHours
    };
  }, [teamSize, manualHoursPerWeek, hourlyWage, automationRate]);

  const handleBookDiscovery = () => {
    const focus = 'Workflow & Revenue Automation';
    const topic = `ROI Calculator: $${results.annualSavings.toLocaleString()} CAD / yr saved (~${results.annualHoursSaved.toLocaleString()} hrs across ${teamSize} staff)`;
    
    if (onCtaClick) {
      onCtaClick({
        annualSavings: results.annualSavings,
        hoursSaved: results.annualHoursSaved,
        teamSize
      });
    }

    window.dispatchEvent(new CustomEvent('open-lead-drawer', {
      detail: {
        focus,
        topic,
        industry: isFr ? 'Calculateur de RCI' : 'ROI Calculator Estimate',
        savings: `$${results.annualSavings.toLocaleString()} CAD/year`
      }
    }));
  };

  const handleReset = () => {
    setTeamSize(8);
    setManualHoursPerWeek(10);
    setHourlyWage(45);
    setAutomationRate(70);
  };

  return (
    <div id="roi-calculator" className={`bg-slate-900/60 backdrop-blur-md border border-slate-800 rounded-3xl p-6 md:p-10 shadow-2xl relative overflow-hidden ${className}`}>
      {/* Subtle background glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" aria-hidden="true" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" aria-hidden="true" />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 pb-6 border-b border-slate-800/80">
        <div>
          <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs uppercase tracking-widest mb-2">
            <Calculator size={15} />
            <span>{isFr ? 'ESTIMATEUR D’ÉCONOMIES OPÉRATIONNELLES' : 'AUTOMATION SAVINGS CALCULATOR'}</span>
          </div>
          <h3 className="text-2xl md:text-3xl font-display font-bold text-white tracking-tight">
            {isFr 
              ? 'Calculez le Retour sur Investissement de Votre Automatisation'
              : 'Calculate Your Custom Automation Cost & Time Savings'
            }
          </h3>
          <p className="text-slate-400 text-sm mt-1 max-w-2xl font-light">
            {isFr
              ? 'Ajustez la taille de votre équipe et les heures perdues en tâches manuelles pour estimer les gains financiers et le temps libéré.'
              : 'Adjust team size and manual hours lost to spreadsheets and administrative toil to see your projected annual bottom-line recovery.'
            }
          </p>
        </div>

        <button
          type="button"
          onClick={handleReset}
          className="self-start md:self-auto inline-flex items-center gap-1.5 text-xs font-mono text-slate-400 hover:text-cyan-400 transition-colors cursor-pointer py-1 px-2.5 rounded-lg border border-slate-800 hover:border-slate-700"
          title={isFr ? 'Réinitialiser les valeurs par défaut' : 'Reset to defaults'}
        >
          <RotateCcw size={12} />
          <span>{isFr ? 'Réinitialiser' : 'Reset'}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        {/* Left Side: Controls & Sliders */}
        <div className="lg:col-span-7 space-y-7">
          
          {/* Slider 1: Team Size */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <label htmlFor="team-size-slider" className="text-slate-200 font-medium flex items-center gap-2">
                <Users size={16} className="text-cyan-400" />
                <span>{isFr ? 'Taille de l’équipe opérationnelle :' : 'Operational Team Size:'}</span>
              </label>
              <span className="font-mono font-bold text-white text-base bg-slate-800 px-3 py-0.5 rounded-md border border-slate-700">
                {teamSize} {isFr ? (teamSize > 1 ? 'personnes' : 'personne') : (teamSize > 1 ? 'people' : 'person')}
              </span>
            </div>
            <input
              id="team-size-slider"
              type="range"
              min={1}
              max={60}
              step={1}
              value={teamSize}
              onChange={(e) => setTeamSize(Number(e.target.value))}
              aria-label="Operational team size"
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
            />
            <div className="flex justify-between text-[11px] font-mono text-slate-500">
              <span>1</span>
              <span>15</span>
              <span>30</span>
              <span>45</span>
              <span>60+</span>
            </div>
          </div>

          {/* Slider 2: Manual Hours Per Week */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <label htmlFor="manual-hours-slider" className="text-slate-200 font-medium flex items-center gap-2">
                <Clock size={16} className="text-cyan-400" />
                <span>{isFr ? 'Heures manuelles / employé / semaine :' : 'Manual Hours / Employee / Week:'}</span>
              </label>
              <span className="font-mono font-bold text-cyan-300 text-base bg-cyan-950/40 px-3 py-0.5 rounded-md border border-cyan-800/50">
                {manualHoursPerWeek} {isFr ? 'h / sem' : 'hrs / wk'}
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-light">
              {isFr 
                ? 'Saisie de commandes, réconciliation de factures, synchronisation de stocks ou emails de suivi.' 
                : 'Time lost to spreadsheet double-entry, order tracking, invoice chasing, and manual status sync.'
              }
            </p>
            <input
              id="manual-hours-slider"
              type="range"
              min={2}
              max={30}
              step={1}
              value={manualHoursPerWeek}
              onChange={(e) => setManualHoursPerWeek(Number(e.target.value))}
              aria-label="Manual hours spent per employee per week"
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
            />
            <div className="flex justify-between text-[11px] font-mono text-slate-500">
              <span>2 hrs</span>
              <span>10 hrs (avg)</span>
              <span>20 hrs</span>
              <span>30 hrs</span>
            </div>
          </div>

          {/* Slider 3: Blended Hourly Cost (CAD) */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <label htmlFor="hourly-wage-slider" className="text-slate-200 font-medium flex items-center gap-2">
                <DollarSign size={16} className="text-cyan-400" />
                <span>{isFr ? 'Coût horaire moyen chargé (CAD) :' : 'Blended Hourly Labor Cost (CAD):'}</span>
              </label>
              <span className="font-mono font-bold text-white text-base bg-slate-800 px-3 py-0.5 rounded-md border border-slate-700">
                ${hourlyWage} / hr
              </span>
            </div>
            <input
              id="hourly-wage-slider"
              type="range"
              min={25}
              max={120}
              step={5}
              value={hourlyWage}
              onChange={(e) => setHourlyWage(Number(e.target.value))}
              aria-label="Blended hourly wage in CAD"
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
            />
            <div className="flex justify-between text-[11px] font-mono text-slate-500">
              <span>$25/hr</span>
              <span>$45/hr (standard)</span>
              <span>$80/hr</span>
              <span>$120/hr</span>
            </div>
          </div>

          {/* Preset Buttons for Speed */}
          <div className="pt-2 flex items-center gap-2 flex-wrap">
            <span className="text-xs font-mono text-slate-400">
              {isFr ? 'Exemples de profils :' : 'Quick Presets:'}
            </span>
            <button
              type="button"
              onClick={() => { setTeamSize(5); setManualHoursPerWeek(8); setHourlyWage(38); }}
              className="text-xs font-mono px-2.5 py-1 rounded bg-slate-800/80 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-colors"
            >
              {isFr ? 'PME Commerce / 5 pers.' : 'Small Distribution (5 staff)'}
            </button>
            <button
              type="button"
              onClick={() => { setTeamSize(15); setManualHoursPerWeek(12); setHourlyWage(45); }}
              className="text-xs font-mono px-2.5 py-1 rounded bg-slate-800/80 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-colors"
            >
              {isFr ? 'Manufacture / 15 pers.' : 'Manufacturing / Ops (15 staff)'}
            </button>
            <button
              type="button"
              onClick={() => { setTeamSize(30); setManualHoursPerWeek(14); setHourlyWage(55); }}
              className="text-xs font-mono px-2.5 py-1 rounded bg-slate-800/80 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-colors"
            >
              {isFr ? 'Logistique / 30 pers.' : 'Logistics Enterprise (30 staff)'}
            </button>
          </div>

        </div>

        {/* Right Side: High-Impact Output Cards */}
        <div className="lg:col-span-5 flex flex-col justify-between rounded-2xl bg-slate-950/80 border border-cyan-500/20 p-6 md:p-8 space-y-6">
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono uppercase tracking-widest text-cyan-400 font-bold">
                {isFr ? 'GAIN FINANCIER ESTIMÉ' : 'ESTIMATED ANNUAL VALUE'}
              </span>
              <span className="inline-flex items-center gap-1 text-[11px] font-mono text-emerald-400 bg-emerald-950/40 border border-emerald-500/30 px-2 py-0.5 rounded-full">
                <TrendingUp size={11} />
                <span>{automationRate}% {isFr ? 'automatisé' : 'automated'}</span>
              </span>
            </div>

            {/* Big Headline Number */}
            <div className="py-2">
              <div className="text-4xl md:text-5xl font-mono font-extrabold text-white tracking-tight text-linear-accent">
                ${results.annualSavings.toLocaleString()}
                <span className="text-sm font-sans font-normal text-slate-400 ml-1.5">CAD / {isFr ? 'an' : 'yr'}</span>
              </div>
              <p className="text-xs font-mono text-cyan-400 mt-1">
                ≈ ${results.monthlySavings.toLocaleString()} CAD / {isFr ? 'mois en capacité recouvrée' : 'month in recovered capacity'}
              </p>
            </div>

            {/* Metrics Breakdown Grid */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-800">
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">
                  {isFr ? 'Temps Récupéré / An' : 'Hours Saved / Year'}
                </span>
                <span className="text-xl font-mono font-bold text-white mt-0.5 block">
                  {results.annualHoursSaved.toLocaleString()} <span className="text-xs text-slate-400">hrs</span>
                </span>
              </div>

              <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-800">
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">
                  {isFr ? 'Équivalent ETP' : 'FTE Capacity Equiv.'}
                </span>
                <span className="text-xl font-mono font-bold text-white mt-0.5 block">
                  +{results.fteEquivalent} <span className="text-xs text-slate-400">{isFr ? 'postes' : 'FTEs'}</span>
                </span>
              </div>
            </div>

            {/* Impact summary description */}
            <div className="text-xs text-slate-300 font-light leading-relaxed pt-2">
              {isFr
                ? `En automatisant la saisie de données et la synchronisation des flux pour vos ${teamSize} collaborateurs, vous libérez l’équivalent de ${results.annualHoursSaved.toLocaleString()} heures de valeur pure pour servir vos clients et accélérer vos ventes.`
                : `By automating manual reconciliation and operational hand-offs for your ${teamSize} team members, you recover ${results.annualHoursSaved.toLocaleString()} hours annually—reinvested directly into client service and revenue-generating initiatives.`
              }
            </div>
          </div>

          {/* High-Converting CTA Button */}
          <div className="pt-2">
            <button
              type="button"
              onClick={handleBookDiscovery}
              className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-white hover:bg-slate-200 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all duration-200 shadow-lg shadow-white/10 hover:shadow-cyan-500/20 cursor-pointer focus:outline-none focus:ring-2 focus:ring-cyan-400"
            >
              <span>{isFr ? 'Concrétiser Ces Économies' : 'Capture These Savings'}</span>
              <ArrowRight size={15} />
            </button>
            <p className="text-[10px] font-mono text-slate-500 text-center mt-2.5">
              {isFr ? 'Session découverte 30 min gratuite • Analyse sans engagement' : 'Free 30-min discovery session • Direct senior partner review'}
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default RoiCalculator;
