import React, { useState, useMemo } from 'react';
import { 
  Calculator, ArrowRight, DollarSign, Clock, Users, Sparkles, CheckCircle2, 
  RotateCcw, TrendingUp, Building2, Briefcase, Stethoscope, ShoppingBag, ShieldCheck, Zap,
  Factory, Mail, Send, Loader2, FileSpreadsheet, Check
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { db } from '../utils/database';
import { toast } from 'sonner';

export interface RoiCalculatorProps {
  className?: string;
  onCtaClick?: (savingsData: { annualSavings: number; hoursSaved: number; teamSize: number }) => void;
}

interface Preset {
  id: string;
  labelEn: string;
  labelFr: string;
  teamSize: number;
  hours: number;
  rate: number;
  automation: number;
  icon: React.ComponentType<{ size?: number; className?: string }>;
}

export const RoiCalculator: React.FC<RoiCalculatorProps> = ({ className = '', onCtaClick }) => {
  const { language } = useLanguage();
  const isFr = language === 'fr';

  const presets: Preset[] = useMemo(() => [
    {
      id: 'distribution',
      labelEn: 'Wholesale & Distribution',
      labelFr: 'Distribution & Grossistes',
      teamSize: 10,
      hours: 12,
      rate: 42,
      automation: 75,
      icon: Building2
    },
    {
      id: 'manufacturing',
      labelEn: 'Manufacturing & Trades',
      labelFr: 'Fabrication & Métiers Spécialisés',
      teamSize: 12,
      hours: 11,
      rate: 46,
      automation: 80,
      icon: Factory
    },
    {
      id: 'services',
      labelEn: 'Professional Services',
      labelFr: 'Services Professionnels',
      teamSize: 8,
      hours: 10,
      rate: 55,
      automation: 70,
      icon: Briefcase
    },
    {
      id: 'healthcare',
      labelEn: 'Clinics & Healthcare',
      labelFr: 'Cliniques & Santé',
      teamSize: 6,
      hours: 9,
      rate: 48,
      automation: 80,
      icon: Stethoscope
    },
    {
      id: 'retail',
      labelEn: 'E-Commerce & Retail',
      labelFr: 'Commerce & En Ligne',
      teamSize: 5,
      hours: 14,
      rate: 38,
      automation: 80,
      icon: ShoppingBag
    }
  ], []);

  const [activePreset, setActivePreset] = useState<string>('distribution');

  // Input states
  const [teamSize, setTeamSize] = useState<number>(10);
  const [manualHoursPerWeek, setManualHoursPerWeek] = useState<number>(12);
  const [hourlyWage, setHourlyWage] = useState<number>(42); // Average CAD hourly rate
  const [automationRate, setAutomationRate] = useState<number>(75); // % of manual toil eliminated

  // Inline lead capture states
  const [reportEmail, setReportEmail] = useState('');
  const [reportCompany, setReportCompany] = useState('');
  const [isSendingReport, setIsSendingReport] = useState(false);
  const [reportSent, setReportSent] = useState(false);

  // Calculations
  const results = useMemo(() => {
    const workingWeeks = 50;
    const totalWeeklyHours = teamSize * manualHoursPerWeek;
    const weeklyHoursSaved = totalWeeklyHours * (automationRate / 100);
    const annualHoursSaved = Math.round(weeklyHoursSaved * workingWeeks);
    
    const annualSavings = Math.round(annualHoursSaved * hourlyWage);
    const monthlySavings = Math.round(annualSavings / 12);
    
    // Equivalent full-time employees freed up (assuming 1,800 productive hours/yr)
    const fteEquivalent = (annualHoursSaved / 1800).toFixed(1);

    // Days Sales Outstanding (DSO) acceleration estimate (days faster cash collection)
    const daysFasterCash = Math.min(18, Math.max(7, Math.round(manualHoursPerWeek * 0.9)));

    // Payback period in weeks (pragmatic modern ERP / automation engagement)
    const estimatedEngagementCost = Math.max(12000, Math.round(annualSavings * 0.22));
    const weeklyCashSavings = annualSavings / 50;
    const paybackWeeks = Math.max(3, Math.round(estimatedEngagementCost / (weeklyCashSavings || 1)));

    // 3-Year compounding recovery (accounting for avoided hiring as business scales)
    const year1Savings = annualSavings;
    const year2Savings = Math.round(annualSavings * 1.15);
    const year3Savings = Math.round(annualSavings * 1.30);
    const threeYearTotal = year1Savings + year2Savings + year3Savings;

    // Breakdown by operational category
    const invoicingSavings = Math.round(annualSavings * 0.42);
    const inventorySyncSavings = Math.round(annualSavings * 0.33);
    const adminReportingSavings = Math.round(annualSavings * 0.25);

    return {
      annualHoursSaved,
      annualSavings,
      monthlySavings,
      fteEquivalent,
      totalWeeklyHours,
      daysFasterCash,
      paybackWeeks,
      year1Savings,
      year2Savings,
      year3Savings,
      threeYearTotal,
      invoicingSavings,
      inventorySyncSavings,
      adminReportingSavings
    };
  }, [teamSize, manualHoursPerWeek, hourlyWage, automationRate]);

  const applyPreset = (preset: Preset) => {
    setActivePreset(preset.id);
    setTeamSize(preset.teamSize);
    setManualHoursPerWeek(preset.hours);
    setHourlyWage(preset.rate);
    setAutomationRate(preset.automation);
  };

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

  const handleSendReport = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reportEmail || !reportEmail.includes('@')) {
      toast.error(isFr ? 'Veuillez saisir une adresse courriel valide' : 'Please provide a valid business email');
      return;
    }

    setIsSendingReport(true);
    try {
      await db.saveEntry('lead', {
        email: reportEmail.trim(),
        company: reportCompany.trim() || 'Not specified',
        inquiryType: 'ROI Calculator Customized Report',
        teamSize,
        manualHoursPerWeek,
        hourlyWage,
        automationRate,
        annualSavings: `$${results.annualSavings.toLocaleString()} CAD`,
        annualHoursSaved: `${results.annualHoursSaved.toLocaleString()} hrs`,
        threeYearTotal: `$${results.threeYearTotal.toLocaleString()} CAD`,
        source: 'Interactive Automation ROI Calculator',
        submittedAt: new Date().toISOString()
      });

      setReportSent(true);
      toast.success(
        isFr ? 'Rapport calculé envoyé !' : 'Customized ROI Report Dispatched',
        {
          description: isFr 
            ? 'Nos ingénieurs seniors ont reçu vos données et prépareront votre synthèse personnalisée.'
            : 'Our senior engineering partners in Dieppe will review your operational numbers.'
        }
      );
    } catch (err) {
      console.error('Error saving ROI report:', err);
      toast.error(isFr ? 'Erreur lors de l’envoi' : 'Could not dispatch report. Please reach out to hello@oakivo.com.');
    } finally {
      setIsSendingReport(false);
    }
  };

  const handleReset = () => {
    applyPreset(presets[0]);
    setReportSent(false);
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
            <span>{isFr ? 'CALCULATEUR D’ÉCONOMIES OPÉRATIONNELLES' : 'AUTOMATION SAVINGS & REVENUE CALCULATOR'}</span>
          </div>
          <h3 className="text-2xl md:text-3xl font-display font-bold text-white tracking-tight">
            {isFr 
              ? 'Calculez Combien de Temps et d’Argent Vous Pouvez Récupérer'
              : 'Calculate How Many Hours & Dollars Your Team Could Recover'
            }
          </h3>
          <p className="text-slate-400 text-sm mt-1 max-w-2xl font-light">
            {isFr
              ? 'Ajustez les curseurs ci-dessous pour voir l’impact financier réel de l’élimination de la double saisie et des processus manuels.'
              : 'Slide the numbers to see what happens when you eliminate manual spreadsheet busywork, automate customer billing, and connect your business systems.'
            }
          </p>
        </div>

        <button
          type="button"
          onClick={handleReset}
          className="self-start md:self-auto inline-flex items-center gap-1.5 text-xs font-mono text-slate-400 hover:text-cyan-400 transition-colors cursor-pointer py-1.5 px-3 rounded-lg border border-slate-800 hover:border-slate-700 bg-slate-900/50"
          title={isFr ? 'Réinitialiser les valeurs par défaut' : 'Reset to defaults'}
        >
          <RotateCcw size={12} />
          <span>{isFr ? 'Réinitialiser' : 'Reset Defaults'}</span>
        </button>
      </div>

      {/* Industry Preset Selector Pills */}
      <div className="mb-8">
        <label className="text-xs font-mono text-slate-400 uppercase tracking-wider block mb-3">
          {isFr ? '1. Choisissez un modèle d’entreprise (ou personnalisez ci-dessous) :' : '1. Choose your business type (or customize sliders below):'}
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
          {presets.map((preset) => {
            const Icon = preset.icon;
            const isActive = activePreset === preset.id;
            return (
              <button
                key={preset.id}
                type="button"
                onClick={() => applyPreset(preset)}
                className={`flex items-center gap-2 p-3 rounded-xl border text-left transition-all cursor-pointer ${
                  isActive 
                    ? 'bg-cyan-950/40 border-cyan-500/50 text-white shadow-lg shadow-cyan-500/10' 
                    : 'bg-slate-950/40 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                }`}
              >
                <div className={`p-1.5 rounded-lg shrink-0 ${isActive ? 'bg-cyan-500/20 text-cyan-300' : 'bg-slate-800 text-slate-400'}`}>
                  <Icon size={16} />
                </div>
                <span className="text-xs font-medium leading-snug">
                  {isFr ? preset.labelFr : preset.labelEn}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        {/* Left Side: Controls & Sliders */}
        <div className="lg:col-span-7 space-y-7">
          
          {/* Slider 1: Team Size */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <label htmlFor="team-size-slider" className="text-slate-200 font-medium flex items-center gap-2">
                <Users size={16} className="text-cyan-400" />
                <span>{isFr ? 'Taille de l’équipe concernée :' : 'Team Members Doing Manual Tasks:'}</span>
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
              onChange={(e) => { setTeamSize(Number(e.target.value)); setActivePreset(''); }}
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
                <span>{isFr ? 'Heures perdues en saisie manuelle / employé / semaine :' : 'Hours Lost to Busywork / Employee / Week:'}</span>
              </label>
              <span className="font-mono font-bold text-cyan-300 text-base bg-cyan-950/40 px-3 py-0.5 rounded-md border border-cyan-800/50">
                {manualHoursPerWeek} {isFr ? 'h / sem' : 'hrs / wk'}
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-light">
              {isFr 
                ? 'Saisie de commandes, réconciliation de factures, synchronisation de stocks ou courriels de relance.' 
                : 'Re-typing sales orders, chasing invoices, updating spreadsheets, or reconciling bank accounts.'
              }
            </p>
            <input
              id="manual-hours-slider"
              type="range"
              min={2}
              max={30}
              step={1}
              value={manualHoursPerWeek}
              onChange={(e) => { setManualHoursPerWeek(Number(e.target.value)); setActivePreset(''); }}
              aria-label="Manual hours spent per employee per week"
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
            />
            <div className="flex justify-between text-[11px] font-mono text-slate-500">
              <span>2 hrs</span>
              <span>10 hrs (typical)</span>
              <span>20 hrs</span>
              <span>30 hrs</span>
            </div>
          </div>

          {/* Slider 3: Blended Hourly Cost (CAD) */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <label htmlFor="hourly-wage-slider" className="text-slate-200 font-medium flex items-center gap-2">
                <DollarSign size={16} className="text-cyan-400" />
                <span>{isFr ? 'Coût horaire moyen chargé (salaire + charges en CAD) :' : 'Average Hourly Cost per Employee (CAD):'}</span>
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
              onChange={(e) => { setHourlyWage(Number(e.target.value)); setActivePreset(''); }}
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

          {/* Slider 4: Expected Automation Elimination Rate */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <label htmlFor="automation-rate-slider" className="text-slate-200 font-medium flex items-center gap-2">
                <Zap size={16} className="text-cyan-400" />
                <span>{isFr ? 'Taux d’automatisation visé :' : 'Estimated Busywork Eliminated:'}</span>
              </label>
              <span className="font-mono font-bold text-emerald-400 text-base bg-emerald-950/40 px-3 py-0.5 rounded-md border border-emerald-800/50">
                {automationRate}%
              </span>
            </div>
            <input
              id="automation-rate-slider"
              type="range"
              min={50}
              max={90}
              step={5}
              value={automationRate}
              onChange={(e) => { setAutomationRate(Number(e.target.value)); setActivePreset(''); }}
              aria-label="Target automation percentage"
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-400"
            />
            <div className="flex justify-between text-[11px] font-mono text-slate-500">
              <span>50% (Conservative)</span>
              <span>75% (Oakivo Average)</span>
              <span>90% (Maximum)</span>
            </div>
          </div>

          {/* Where the Savings Come From - Category Breakdown */}
          <div className="pt-2 border-t border-slate-800/80">
            <span className="text-xs font-mono uppercase tracking-wider text-slate-400 block mb-3">
              {isFr ? 'Répartition Pratique des Économies :' : 'Where Your Team Recovers These Dollars:'}
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              <div className="bg-slate-950/40 border border-slate-800/80 rounded-xl p-3">
                <span className="text-[10px] font-mono text-cyan-400 font-bold block uppercase">
                  {isFr ? 'Facturation & Devis' : 'Billing & Quotes'}
                </span>
                <span className="text-sm font-bold text-white mt-1 block">
                  ${results.invoicingSavings.toLocaleString()} CAD
                </span>
                <span className="text-[10px] text-slate-400 font-light block mt-0.5">
                  {isFr ? 'Zéro retard d’envoi' : 'Quote-to-cash auto'}
                </span>
              </div>

              <div className="bg-slate-950/40 border border-slate-800/80 rounded-xl p-3">
                <span className="text-[10px] font-mono text-emerald-400 font-bold block uppercase">
                  {isFr ? 'Stocks & Commandes' : 'Inventory & Orders'}
                </span>
                <span className="text-sm font-bold text-white mt-1 block">
                  ${results.inventorySyncSavings.toLocaleString()} CAD
                </span>
                <span className="text-[10px] text-slate-400 font-light block mt-0.5">
                  {isFr ? 'Synchronisation directe' : 'Real-time stock sync'}
                </span>
              </div>

              <div className="bg-slate-950/40 border border-slate-800/80 rounded-xl p-3">
                <span className="text-[10px] font-mono text-indigo-400 font-bold block uppercase">
                  {isFr ? 'Fin de Mois & Tableurs' : 'Month-End & Admin'}
                </span>
                <span className="text-sm font-bold text-white mt-1 block">
                  ${results.adminReportingSavings.toLocaleString()} CAD
                </span>
                <span className="text-[10px] text-slate-400 font-light block mt-0.5">
                  {isFr ? 'Fini les réconciliations' : 'No manual copy-paste'}
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* Right Side: High-Impact Output Cards */}
        <div className="lg:col-span-5 flex flex-col justify-between rounded-2xl bg-slate-950/80 border border-cyan-500/20 p-6 md:p-8 space-y-6">
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono uppercase tracking-widest text-cyan-400 font-bold">
                {isFr ? 'GAINS FINANCIERS ANNUELS' : 'ANNUAL BOTTOM-LINE RECOVERY'}
              </span>
              <span className="inline-flex items-center gap-1 text-[11px] font-mono text-emerald-400 bg-emerald-950/40 border border-emerald-500/30 px-2.5 py-0.5 rounded-full font-semibold">
                <TrendingUp size={11} />
                <span>{automationRate}% {isFr ? 'libéré' : 'automated'}</span>
              </span>
            </div>

            {/* Big Headline Number */}
            <div className="py-2">
              <div className="text-4xl md:text-5xl font-mono font-extrabold text-white tracking-tight text-linear-accent">
                ${results.annualSavings.toLocaleString()}
                <span className="text-sm font-sans font-normal text-slate-400 ml-1.5">CAD / {isFr ? 'an' : 'yr'}</span>
              </div>
              <p className="text-xs font-mono text-cyan-400 mt-1">
                ≈ ${results.monthlySavings.toLocaleString()} CAD / {isFr ? 'mois en productivité recouvrée' : 'month in recovered capacity'}
              </p>
            </div>

            {/* 4-Metric Grid */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="bg-slate-900/60 p-3.5 rounded-xl border border-slate-800">
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">
                  {isFr ? 'Heures Libérées / An' : 'Hours Saved / Year'}
                </span>
                <span className="text-xl font-mono font-bold text-white mt-0.5 block">
                  {results.annualHoursSaved.toLocaleString()} <span className="text-xs text-slate-400">hrs</span>
                </span>
              </div>

              <div className="bg-slate-900/60 p-3.5 rounded-xl border border-slate-800">
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">
                  {isFr ? 'Capacité Libérée' : 'Team Capacity'}
                </span>
                <span className="text-xl font-mono font-bold text-white mt-0.5 block">
                  ~{results.fteEquivalent} <span className="text-xs text-slate-400">{isFr ? 'postes' : 'people'}</span>
                </span>
              </div>

              <div className="bg-slate-900/60 p-3.5 rounded-xl border border-slate-800">
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">
                  {isFr ? 'Encaissements Accélérés' : 'Faster Cash Flow'}
                </span>
                <span className="text-xl font-mono font-bold text-emerald-400 mt-0.5 block">
                  -{results.daysFasterCash} <span className="text-xs text-slate-400">{isFr ? 'jours (DSO)' : 'days DSO'}</span>
                </span>
              </div>

              <div className="bg-slate-900/60 p-3.5 rounded-xl border border-slate-800">
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">
                  {isFr ? 'Retour sur Investissement' : 'Estimated Payback'}
                </span>
                <span className="text-xl font-mono font-bold text-cyan-300 mt-0.5 block">
                  ~{results.paybackWeeks} <span className="text-xs text-slate-400">{isFr ? 'semaines' : 'weeks'}</span>
                </span>
              </div>
            </div>

            {/* 3-Year Compounding Projection Bar */}
            <div className="p-4 rounded-xl bg-slate-900/80 border border-white/[0.08] space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-mono text-slate-300 font-semibold uppercase">
                  {isFr ? 'Impact Cumulé sur 3 Ans :' : '3-Year Cumulative Value:'}
                </span>
                <span className="font-mono font-bold text-emerald-400 text-sm">
                  ${results.threeYearTotal.toLocaleString()} CAD
                </span>
              </div>
              <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden flex">
                <div className="bg-cyan-500 h-full" style={{ width: '28%' }} title="Year 1" />
                <div className="bg-cyan-400 h-full" style={{ width: '33%' }} title="Year 2" />
                <div className="bg-emerald-400 h-full" style={{ width: '39%' }} title="Year 3" />
              </div>
              <div className="flex justify-between text-[10px] font-mono text-slate-400 pt-0.5">
                <span>An 1: ${results.year1Savings.toLocaleString()}</span>
                <span>An 2: ${results.year2Savings.toLocaleString()}</span>
                <span>An 3: ${results.year3Savings.toLocaleString()}</span>
              </div>
            </div>

            {/* Practical human narrative summary */}
            <div className="text-xs text-slate-300 font-light leading-relaxed pt-1">
              {isFr
                ? `En connectant vos logiciels et en automatisant les tâches répétitives de vos ${teamSize} collaborateurs, vous récupérez ${results.annualHoursSaved.toLocaleString()} heures par an. Vos factures partent plus vite, vos stocks sont synchronisés et votre équipe peut enfin se concentrer sur vos clients.`
                : `By connecting your tools and eliminating manual data entry for your ${teamSize} team members, you recover ${results.annualHoursSaved.toLocaleString()} hours annually. Invoices get dispatched faster, inventory stays in sync, and your team can focus on serving clients.`
              }
            </div>
          </div>

          {/* Inline Email Report Dispatch Form (Persists to Firebase & Sends to olabel@gmail.com) */}
          <div className="pt-2 border-t border-slate-800/80 space-y-3">
            {!reportSent ? (
              <form onSubmit={handleSendReport} className="space-y-2">
                <label className="text-[11px] font-mono text-cyan-400 block font-semibold">
                  {isFr ? 'Recevoir cette synthèse détaillée par courriel :' : 'Email Me This Custom Calculation Summary:'}
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <input
                    type="email"
                    required
                    value={reportEmail}
                    onChange={(e) => setReportEmail(e.target.value)}
                    placeholder={isFr ? "votre@entreprise.ca" : "work@company.com"}
                    className="w-full bg-slate-900 border border-slate-700 text-xs text-white rounded-lg px-3 py-2.5 focus:outline-none focus:border-cyan-400 placeholder:text-slate-500"
                  />
                  <input
                    type="text"
                    value={reportCompany}
                    onChange={(e) => setReportCompany(e.target.value)}
                    placeholder={isFr ? "Nom de votre entreprise" : "Company name"}
                    className="w-full bg-slate-900 border border-slate-700 text-xs text-white rounded-lg px-3 py-2.5 focus:outline-none focus:border-cyan-400 placeholder:text-slate-500"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSendingReport}
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all cursor-pointer disabled:opacity-50"
                >
                  {isSendingReport ? (
                    <>
                      <Loader2 size={13} className="animate-spin" />
                      <span>{isFr ? 'Envoi du rapport...' : 'Dispatching Report...'}</span>
                    </>
                  ) : (
                    <>
                      <Send size={13} />
                      <span>{isFr ? 'Envoyer Mon Bilan Personnalisé' : 'Send My Custom Savings Report'}</span>
                    </>
                  )}
                </button>
              </form>
            ) : (
              <div className="p-3 bg-emerald-950/40 border border-emerald-500/40 rounded-xl text-center space-y-1">
                <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-400">
                  <Check size={14} />
                  <span>{isFr ? 'Synthèse transmise avec succès !' : 'Report Sent Successfully!'}</span>
                </div>
                <p className="text-[11px] text-slate-300">
                  {isFr ? `Envoyé à ${reportEmail}. Nos associés seniors en prendront connaissance.` : `Delivered to ${reportEmail}. Our senior partners will review your numbers.`}
                </p>
              </div>
            )}

            {/* High-Converting CTA Button */}
            <button
              type="button"
              onClick={handleBookDiscovery}
              className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white hover:bg-slate-200 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all duration-200 shadow-lg shadow-white/10 hover:shadow-cyan-500/20 cursor-pointer focus:outline-none focus:ring-2 focus:ring-cyan-400"
            >
              <span>{isFr ? 'Planifier une Revue avec les Fondateurs' : 'Walk Through These Numbers with Us'}</span>
              <ArrowRight size={15} />
            </button>
            <p className="text-[10px] font-mono text-slate-500 text-center">
              {isFr ? 'Session découverte 30 min sans engagement • Directement avec nos ingénieurs à Dieppe' : 'Free 30-min discovery call • Direct senior partner review in Atlantic Time'}
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default RoiCalculator;

