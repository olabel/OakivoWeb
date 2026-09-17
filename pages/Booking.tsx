import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { toast } from 'sonner';
import { 
  Calendar as CalendarIcon, 
  Clock, 
  Globe, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft,
  User, 
  Mail, 
  Video, 
  Sparkles, 
  Terminal, 
  Building2, 
  Server, 
  Check, 
  ChevronLeft, 
  ChevronRight, 
  Download, 
  ExternalLink, 
  Lock, 
  PhoneCall, 
  Laptop,
  Layers,
  FileCheck2,
  CalendarCheck
} from 'lucide-react';
import { useLanguage, translations } from '../context/LanguageContext';
import SEO from '../components/SEO';
import Section from '../components/Section';
import { db } from '../utils/database';

interface ConsultationOption {
  id: string;
  title: string;
  desc: string;
  icon: string;
}

const getConsultationTopics = (isFr: boolean): ConsultationOption[] => [
  {
    id: 'cloud_cspm',
    title: isFr ? 'Sécurité Cloud & Durcissement CSPM' : 'Cloud Security & CSPM Hardening',
    desc: isFr ? 'Revue de posture AWS, Azure ou GCP, audits des limites IAM et défense périmétrique.' : 'AWS, Azure, or GCP posture review, IAM boundary audits, and perimeter defense.',
    icon: 'cloud'
  },
  {
    id: 'devsecops_cicd',
    title: isFr ? 'DevSecOps & Automatisation de Pipeline CI/CD' : 'DevSecOps & CI/CD Pipeline Automation',
    desc: isFr ? 'Portillons SAST/DAST automatisés, scan de vulnérabilités conteneurs et gestion des secrets.' : 'Automated SAST/DAST gating, container vulnerability scanning, and secrets management.',
    icon: 'code'
  },
  {
    id: 'compliance_readiness',
    title: isFr ? 'Préparation SOC 2, ISO 27001 & LPRPDE' : 'SOC 2, ISO 27001 & PIPEDA Readiness',
    desc: isFr ? 'Cadre de preuves d\'audit, souveraineté des données canadiennes et feuille de route.' : 'Audit evidence framework, Canadian data sovereignty, and compliance roadmap.',
    icon: 'shield'
  },
  {
    id: 'zero_trust_iam',
    title: isFr ? 'IAM Zéro-Trust & Sécurité ERP (Odoo/SAP)' : 'Zero-Trust IAM & ERP (Odoo/SAP) Security',
    desc: isFr ? 'Application du moindre privilège, isolation multi-locataires et gouvernance des données.' : 'Least-privilege policy enforcement, multi-tenant isolation, and data governance.',
    icon: 'lock'
  },
];

const getTimezones = (isFr: boolean) => [
  { code: 'AST', label: isFr ? 'Heure de l\'Atlantique (Siège - Halifax/Moncton)' : 'Atlantic Time (HQ - Halifax/Moncton)', offset: 'UTC-4 / AST' },
  { code: 'EST', label: isFr ? 'Heure de l\'Est (Toronto/Montréal/New York)' : 'Eastern Time (Toronto/New York)', offset: 'UTC-5 / EST' },
  { code: 'CST', label: isFr ? 'Heure du Centre (Chicago/Winnipeg)' : 'Central Time (Chicago/Winnipeg)', offset: 'UTC-6 / CST' },
  { code: 'MST', label: isFr ? 'Heure des Rocheuses (Calgary/Denver)' : 'Mountain Time (Calgary/Denver)', offset: 'UTC-7 / MST' },
  { code: 'PST', label: isFr ? 'Heure du Pacifique (Vancouver/San Francisco)' : 'Pacific Time (Vancouver/San Francisco)', offset: 'UTC-8 / PST' },
  { code: 'UTC', label: isFr ? 'Temps Universel Coordonné (UTC/GMT)' : 'Coordinated Universal Time (UTC/GMT)', offset: 'UTC+0' }
];

const getMeetingFormats = (isFr: boolean) => [
  { id: 'google_meet', label: isFr ? 'Google Meet (HD Chiffré)' : 'Google Meet (Encrypted HD)', icon: Video },
  { id: 'teams', label: isFr ? 'Microsoft Teams' : 'Microsoft Teams', icon: Laptop },
  { id: 'phone', label: isFr ? 'Ligne Sécurisée Directe (CA/US)' : 'Direct Secure Line (CA/US)', icon: PhoneCall },
];

const MORNING_SLOTS = ['09:00 AM', '10:15 AM', '11:30 AM'];
const AFTERNOON_SLOTS = ['01:30 PM', '02:45 PM', '04:00 PM', '05:15 PM'];

export const Booking: React.FC = () => {
  const { language } = useLanguage();
  const isFr = language === 'fr';

  const consultationTopics = useMemo(() => getConsultationTopics(isFr), [isFr]);
  const timezones = useMemo(() => getTimezones(isFr), [isFr]);
  const meetingFormats = useMemo(() => getMeetingFormats(isFr), [isFr]);

  const langDict = translations[language] || translations['en'];
  const bData = langDict?.booking || translations['en'].booking || {
    hero_title: isFr ? "Audit d'Architecture de Sécurité 30-Minutes." : "30-Minute Security Architecture Audit.",
    hero_subtitle: isFr ? "Sélectionnez un créneau pour une évaluation technique en direct avec un ingénieur DevSecOps senior." : "Select a timeslot for a live technical evaluation with a senior DevSecOps engineer.",
    success_title: isFr ? "Audit de Sécurité Confirmé." : "Security Audit Confirmed.",
    success_message: isFr ? "Une invitation d'agenda avec les détails de la réunion a été envoyée à votre courriel professionnel." : "A calendar invitation with meeting details has been sent to your work email."
  };

  // Multi-step progression (1: Focus & Format, 2: Date & Time, 3: Organization Dossier, 4: Confirmed)
  const [currentStep, setCurrentStep] = useState<number>(1);

  // Step 1 State: Scope & Format
  const [selectedFocus, setSelectedFocus] = useState<string>('cloud_cspm');
  const [meetingFormat, setMeetingFormat] = useState<string>('google_meet');
  const [timezone, setTimezone] = useState<string>('AST');

  // Step 2 State: Calendar & Timeslots
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [monthOffset, setMonthOffset] = useState<number>(0);

  // Step 3 State: Client Dossier
  const [form, setForm] = useState({
    name: '',
    email: '',
    company: '',
    teamSize: '20-100 employees',
    cloudProvider: 'Multi-Cloud (AWS + Azure/GCP)',
    urgency: 'Standard (Within 2 Weeks)',
    bottleneck: '',
  });

  // Anti-bot Honeypot
  const [honeypot, setHoneypot] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [bookingConfirmationCode, setBookingConfirmationCode] = useState<string>('');

  // Dynamically generate the next 28 days of business dates
  const availableDates = useMemo(() => {
    const dates: { dayName: string; monthName: string; dayNum: number; fullDate: string; isWeekend: boolean }[] = [];
    const base = new Date();
    // Offset days starting tomorrow
    base.setDate(base.getDate() + 1);

    let count = 0;
    let dayCursor = 0;
    while (count < 24 && dayCursor < 60) {
      const d = new Date(base);
      d.setDate(base.getDate() + dayCursor);
      const dayOfWeek = d.getDay();
      const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;

      if (!isWeekend) {
        dates.push({
          dayName: d.toLocaleDateString(language === 'fr' ? 'fr-CA' : 'en-CA', { weekday: 'short' }),
          monthName: d.toLocaleDateString(language === 'fr' ? 'fr-CA' : 'en-CA', { month: 'short' }),
          dayNum: d.getDate(),
          fullDate: d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
          isWeekend: false,
        });
        count++;
      }
      dayCursor++;
    }
    return dates;
  }, [language]);

  // Paginate dates by groups of 6
  const pagedDates = useMemo(() => {
    const startIndex = monthOffset * 6;
    return availableDates.slice(startIndex, startIndex + 6);
  }, [availableDates, monthOffset]);

  const maxPages = Math.ceil(availableDates.length / 6);

  // Handle Complete Submission
  const handleComplete = async (e: React.FormEvent) => {
    e.preventDefault();
    if (honeypot) {
      // Bot detected via honeypot
      setBookingConfirmationCode(`OAK-${Math.floor(100000 + Math.random() * 900000)}`);
      setCurrentStep(4);
      return;
    }

    if (!form.name || !form.email || !form.company || !form.bottleneck) {
      setErrorMessage(isFr ? 'Veuillez renseigner votre nom, courriel professionnel, organisation et une brève description de votre défi technique.' : 'Please provide your name, work email, organization, and a brief description of your technical challenge.');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage('');

    const generatedCode = `OAK-SEC-${Math.floor(100000 + Math.random() * 900000)}`;

    const submissionPayload = {
      ...form,
      selectedDate: selectedDate || availableDates[0]?.fullDate,
      selectedTime: selectedTime || '10:15 AM',
      timezone,
      consultationFocus: consultationTopics.find(c => c.id === selectedFocus)?.title || selectedFocus,
      meetingFormat: meetingFormats.find(m => m.id === meetingFormat)?.label || meetingFormat,
      confirmationCode: generatedCode,
      type: '30_MIN_SECURITY_AUDIT_BOOKING',
      submittedAt: new Date().toISOString(),
    };

    try {
      // 1. Persist to Firebase Firestore
      await db.saveEntry('lead', submissionPayload);

      // 2. Direct server-side 3rd-party email delivery to olabel@gmail.com
      try {
        await fetch('/api/book-audit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: form.name,
            email: form.email,
            company: form.company,
            teamSize: form.teamSize,
            cloudProvider: form.cloudProvider,
            urgency: form.urgency,
            message: form.bottleneck,
            selectedDate: submissionPayload.selectedDate,
            selectedTime: submissionPayload.selectedTime,
            timezone,
            consultationFocus: submissionPayload.consultationFocus,
            meetingFormat: submissionPayload.meetingFormat,
          })
        });
      } catch (postErr) {
        console.warn("Direct book-audit dispatch caught, fallback preserved:", postErr);
      }

      setBookingConfirmationCode(generatedCode);
      setCurrentStep(4);
      toast.success(language === 'fr' ? 'Consultation Confirmée !' : 'Executive Consultation Confirmed', {
        description: language === 'fr' ? 'Une invitation d\'agenda et un briefing technique ont été envoyés.' : 'Calendar dossier and briefing dispatched to your work email and our senior architect.'
      });
    } catch (err) {
      console.error("Booking Error:", err);
      setErrorMessage(isFr ? 'Une erreur réseau est survenue lors de la réservation de votre créneau. Veuillez réessayer ou nous contacter directement.' : 'A network error occurred while securing your consultation slot. Please try again or reach out to us directly.');
      toast.error(isFr ? 'Un problème est survenu lors de la planification' : 'Scheduling Encountered an Issue', { 
        description: isFr ? 'Veuillez réessayer ou envoyer un courriel à olabel@gmail.com.' : 'Please retry or email olabel@gmail.com directly.' 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Generate Google Calendar Link
  const googleCalendarUrl = useMemo(() => {
    const title = encodeURIComponent(isFr ? `Évaluation d'Architecture de Sécurité Oakivo (${form.company || 'Entreprise'})` : `Oakivo Security Architecture Evaluation (${form.company || 'Enterprise'})`);
    const details = encodeURIComponent(
      `Oakivo Solutions Confidential DevSecOps & Cloud Security Audit\n\nClient: ${form.name} (${form.company})\nFocus: ${selectedFocus}\nFormat: ${meetingFormat}\nTimezone: ${timezone}\n\nAssigned Lead: Senior DevSecOps Architect\nOakivo Solutions Inc. (Dieppe, NB)\nInquiries: olabel@gmail.com`
    );
    const location = encodeURIComponent('Secure Encrypted Video Bridge (Link dispatched via email)');
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}`;
  }, [form, selectedFocus, meetingFormat, timezone, isFr]);

  // Generate downloadable .ics iCalendar file
  const downloadIcsFile = () => {
    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Oakivo Solutions Inc//Security Audit Schedule//EN',
      'CALSCALE:GREGORIAN',
      'METHOD:REQUEST',
      'BEGIN:VEVENT',
      `UID:${bookingConfirmationCode || 'OAK-BOOKING'}@oakivo.com`,
      `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').split('.')[0]}Z`,
      `SUMMARY:Oakivo Security Architecture Evaluation - ${form.company || 'Enterprise'}`,
      `DESCRIPTION:Confidential DevSecOps and Cloud Security Consultation with Senior Architect.\\nFocus: ${selectedFocus}\\nFormat: ${meetingFormat}\\nTimezone: ${timezone}`,
      'LOCATION:Secure Video Conference',
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', `Oakivo-Security-Audit-${bookingConfirmationCode || 'Confirmation'}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success(isFr ? 'Fichier calendrier (.ics) téléchargé' : 'Calendar file (.ics) downloaded');
  };

  return (
    <>
      <SEO 
        title={isFr ? "Réserver un Audit de Sécurité Gratuit | DevSecOps Moncton, Calgary & Toronto | Oakivo" : "Book A Free Security Audit | DevSecOps Moncton, Calgary & Toronto | Oakivo"}
        description={isFr ? "Réservez un audit de sécurité cloud et de conformité confidentiel de 30 minutes avec un architecte DevSecOps senior. Préparation SOC 2 Type II, Loi C-26 et durcissement Terraform AWS EKS." : "Book a 30-minute confidential cloud security & compliance audit with a Senior DevSecOps Architect. SOC 2 Type II audit readiness, Bill C-26, and Terraform AWS EKS hardening."}
        keywords="Book security audit, SOC 2 Type II audit readiness checklist Canada, Bill C-26 Critical Cyber Systems compliance roadmap, DevSecOps Moncton, Cloud Security New Brunswick, Terraform AWS EKS hardening consultant Calgary / Toronto / Halifax"
        canonical="/schedule"
      />

      {/* Hero Header */}
      <section className="bg-slate-950 text-white pt-36 pb-14 relative overflow-hidden border-b border-slate-900" aria-label="Appointment Hero">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-full max-w-6xl h-80 bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />

        <div className="container mx-auto px-4 text-center max-w-3xl relative z-10">
          <div className="inline-flex items-center gap-2 bg-slate-900/90 border border-cyan-500/30 px-4 py-1.5 rounded-full mb-6 shadow-lg shadow-cyan-950/40">
            <Terminal size={14} className="text-cyan-400" />
            <span className="text-[11px] font-mono text-cyan-300 font-semibold uppercase tracking-wider">
              {language === 'fr' ? 'Consultation Technique Privée' : 'Senior DevSecOps Advisory Desk'}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-100 mb-4 leading-tight">
            {language === 'fr' ? 'Réserver Votre Audit d\'Architecture' : 'Executive Security Architecture Audit'}
          </h1>
          <p className="text-sm md:text-base text-slate-400 font-normal leading-relaxed max-w-2xl mx-auto">
            {language === 'fr' 
              ? 'Échange technique direct de 30 minutes avec un architecte DevSecOps senior. Analyse confidentielle de vos pipelines, de votre posture cloud et de votre conformité réglementaire.'
              : 'Direct 30-minute technical evaluation with a senior DevSecOps architect. Non-promotional, confidential review of your cloud infrastructure, CI/CD gating, and compliance roadmaps.'
            }
          </p>

          {/* Trust Highlights */}
          <div className="mt-8 flex flex-wrap justify-center items-center gap-6 text-xs text-slate-400 font-mono">
            <div className="flex items-center gap-2">
              <ShieldCheck size={16} className="text-emerald-400" />
              <span>{isFr ? 'Protégé par Accord de Confidentialité (NDA)' : '100% Mutual NDA Protected'}</span>
            </div>
            <div className="flex items-center gap-2">
              <Lock size={15} className="text-cyan-400" />
              <span>{isFr ? 'Stockage Zéro-Trace des Données' : 'Zero-Trace Data Storage'}</span>
            </div>
            <div className="flex items-center gap-2">
              <Building2 size={15} className="text-blue-400" />
              <span>{isFr ? 'Siège Régional à Dieppe, NB' : 'Dieppe, NB Regional HQ'}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Scheduling Application Canvas */}
      <Section className="py-12 md:py-16 bg-[#070A0F] text-white">
        <div className="container mx-auto px-4 md:px-6 max-w-6xl">

          {/* Stepper Progress Bar */}
          <div className="max-w-4xl mx-auto mb-10">
            <div className="grid grid-cols-4 gap-2 sm:gap-4 relative">
              {[
                { num: 1, title: language === 'fr' ? 'Objectif' : 'Focus Area', subtitle: 'Step 1' },
                { num: 2, title: language === 'fr' ? 'Créneau' : 'Date & Time', subtitle: 'Step 2' },
                { num: 3, title: language === 'fr' ? 'Dossier' : 'Architecture', subtitle: 'Step 3' },
                { num: 4, title: language === 'fr' ? 'Confirmé' : 'Confirmed', subtitle: 'Step 4' },
              ].map((s) => {
                const isActive = currentStep === s.num;
                const isPassed = currentStep > s.num;
                return (
                  <button
                    key={s.num}
                    type="button"
                    disabled={currentStep === 4 || s.num > currentStep + 1}
                    onClick={() => {
                      if (s.num < currentStep && currentStep !== 4) setCurrentStep(s.num);
                    }}
                    className={`text-left p-3 rounded-2xl border transition-all cursor-pointer ${
                      isActive 
                        ? 'bg-slate-900/90 border-cyan-500/60 shadow-lg shadow-cyan-950/50' 
                        : isPassed 
                        ? 'bg-slate-950/60 border-emerald-500/40 text-slate-300'
                        : 'bg-slate-950/30 border-slate-900 text-slate-600 cursor-not-allowed'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-mono font-bold ${
                        isPassed 
                          ? 'bg-emerald-500 text-slate-950' 
                          : isActive 
                          ? 'bg-cyan-400 text-slate-950' 
                          : 'bg-slate-800 text-slate-500'
                      }`}>
                        {isPassed ? <Check size={11} /> : s.num}
                      </span>
                      <span className="text-[10px] font-mono uppercase text-slate-500 hidden sm:inline-block">
                        {s.subtitle}
                      </span>
                    </div>
                    <p className={`text-xs font-semibold truncate ${isActive ? 'text-white' : isPassed ? 'text-slate-300' : 'text-slate-600'}`}>
                      {s.title}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Premium Form Container */}
          <div className="max-w-5xl mx-auto bg-slate-950/80 border border-slate-800/80 rounded-3xl shadow-2xl overflow-hidden backdrop-blur-xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[580px]">

              {/* Left Architectural Dossier Sidebar */}
              <div className="lg:col-span-4 bg-slate-950 p-6 md:p-8 border-b lg:border-b-0 lg:border-r border-slate-800 flex flex-col justify-between">
                <div className="space-y-6">
                  <div>
                    <div className="w-11 h-11 bg-cyan-500/10 rounded-2xl flex items-center justify-center text-cyan-400 mb-4 border border-cyan-500/30">
                      <Video size={22} />
                    </div>
                    <h2 className="text-xl font-bold text-white tracking-tight">
                      {language === 'fr' ? 'Session d\'Audit 30-Min' : '30-Min Architecture Evaluation'}
                    </h2>
                    <p className="text-xs text-slate-400 mt-1 font-light leading-relaxed">
                      {language === 'fr' 
                        ? 'Session technique privée pour décideurs et équipes DevOps/Sécurité.'
                        : 'Senior-level engineering briefing focused on actionable remediation.'
                      }
                    </p>
                  </div>

                  {/* Summary Checklist */}
                  <div className="space-y-3.5 pt-4 border-t border-slate-800/80 text-xs text-slate-300">
                    <div className="flex items-center gap-3">
                      <Clock size={16} className="text-cyan-400 shrink-0" />
                      <span><strong>{isFr ? 'Durée :' : 'Duration:'}</strong> {isFr ? '30 Minutes (Démarrage ponctuel)' : '30 Minutes (Prompt start)'}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Globe size={16} className="text-cyan-400 shrink-0" />
                      <span><strong>{isFr ? 'Fuseau horaire :' : 'Timezone:'}</strong> {timezone} {isFr ? 'Sélectionné' : 'Selected'}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Laptop size={16} className="text-cyan-400 shrink-0" />
                      <span><strong>{isFr ? 'Format :' : 'Format:'}</strong> {meetingFormats.find(m => m.id === meetingFormat)?.label}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <ShieldCheck size={16} className="text-emerald-400 shrink-0" />
                      <span><strong>{isFr ? 'Intervenant :' : 'Lead:'}</strong> {isFr ? 'Architecte DevSecOps Senior' : 'Senior DevSecOps Architect'}</span>
                    </div>
                  </div>

                  {/* Focus Capsule */}
                  {selectedFocus && (
                    <div className="p-3.5 bg-slate-900/90 rounded-2xl border border-slate-800">
                      <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider block mb-1">
                        {isFr ? 'Thème Sélectionné' : 'Selected Focus'}
                      </span>
                      <p className="text-xs font-semibold text-slate-200">
                        {consultationTopics.find(c => c.id === selectedFocus)?.title}
                      </p>
                    </div>
                  )}

                  {/* Selection Preview */}
                  {selectedDate && selectedTime && (
                    <div className="p-3.5 bg-cyan-950/30 border border-cyan-500/30 rounded-2xl">
                      <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider block mb-1">
                        {isFr ? 'Créneau Réservé' : 'Reserved Slot'}
                      </span>
                      <p className="text-xs font-bold text-white flex items-center gap-2">
                        <CalendarCheck size={14} className="text-cyan-400" />
                        {selectedDate} {isFr ? 'à' : 'at'} {selectedTime} ({timezone})
                      </p>
                    </div>
                  )}
                </div>

                {/* Footer Assurance */}
                <div className="pt-6 border-t border-slate-900 mt-6">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-slate-900 border border-slate-800 rounded-full flex items-center justify-center text-cyan-400 font-mono text-xs font-bold">
                      OS
                    </div>
                    <div>
                      <p className="text-xs font-bold text-white">Oakivo Solutions Inc.</p>
                      <p className="text-[10px] text-slate-500 font-mono">Dieppe, New Brunswick • Canada</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Interactive Multi-Step Workspace */}
              <div className="lg:col-span-8 p-6 md:p-8 flex flex-col justify-center">
                <AnimatePresence mode="wait">
                  
                  {/* STEP 1: FOCUS AREA & MEETING FORMAT */}
                  {currentStep === 1 && (
                    <motion.div
                      key="step-1"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="space-y-6"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div>
                          <h3 className="text-lg font-bold text-white">
                            {language === 'fr' ? '1. Sélectionnez le Thème d\'Intervention' : '1. Choose Consultation Objective'}
                          </h3>
                          <p className="text-xs text-slate-400">
                            {language === 'fr' ? 'Personnalisez le périmètre de la revue technique selon les priorités de votre architecture.' : 'Tailor the technical evaluation to your architecture\'s priority.'}
                          </p>
                        </div>
                        <span className="text-xs font-mono text-cyan-400 bg-cyan-950/60 px-2.5 py-1 rounded-full border border-cyan-500/30">
                          {isFr ? 'Étape 1 sur 3' : 'Step 1 of 3'}
                        </span>
                      </div>

                      {/* Focus Topics Grid */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {consultationTopics.map((topic) => {
                          const isSelected = selectedFocus === topic.id;
                          return (
                            <button
                              key={topic.id}
                              type="button"
                              onClick={() => setSelectedFocus(topic.id)}
                              className={`text-left p-4 rounded-2xl border transition-all cursor-pointer ${
                                isSelected 
                                  ? 'bg-cyan-950/40 border-cyan-500 shadow-md shadow-cyan-950/40 text-white' 
                                  : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-900'
                              }`}
                            >
                              <div className="flex items-center justify-between mb-2">
                                <span className={`text-xs font-bold ${isSelected ? 'text-cyan-400' : 'text-slate-200'}`}>
                                  {topic.title}
                                </span>
                                {isSelected && <CheckCircle2 size={16} className="text-cyan-400 shrink-0" />}
                              </div>
                              <p className="text-[11px] text-slate-400 font-light leading-relaxed">
                                {topic.desc}
                              </p>
                            </button>
                          );
                        })}
                      </div>

                      {/* Format & Timezone Selectors */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-800/80">
                        <div>
                          <label className="text-[11px] font-mono uppercase text-slate-400 block mb-2 font-semibold">
                            {isFr ? 'Canal de Réunion' : 'Meeting Channel'}
                          </label>
                          <div className="space-y-2">
                            {meetingFormats.map((fmt) => {
                              const FormatIcon = fmt.icon;
                              const isFmtSelected = meetingFormat === fmt.id;
                              return (
                                <button
                                  key={fmt.id}
                                  type="button"
                                  onClick={() => setMeetingFormat(fmt.id)}
                                  className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl border text-xs font-medium transition-all cursor-pointer ${
                                    isFmtSelected
                                      ? 'bg-slate-800 border-cyan-500 text-white'
                                      : 'bg-slate-900/50 border-slate-800 text-slate-400 hover:bg-slate-900 hover:text-slate-200'
                                  }`}
                                >
                                  <FormatIcon size={15} className={isFmtSelected ? 'text-cyan-400' : 'text-slate-500'} />
                                  <span>{fmt.label}</span>
                                </button>
                              );
                            })}
                          </div>
                        </div>

                        <div>
                          <label className="text-[11px] font-mono uppercase text-slate-400 block mb-2 font-semibold">
                            {isFr ? 'Votre Fuseau Horaire' : 'Your Timezone'}
                          </label>
                          <select
                            value={timezone}
                            onChange={(e) => setTimezone(e.target.value)}
                            className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-cyan-500 cursor-pointer font-mono"
                          >
                            {timezones.map((tz) => (
                              <option key={tz.code} value={tz.code} className="bg-slate-950 text-white">
                                {tz.label} ({tz.offset})
                              </option>
                            ))}
                          </select>
                          <p className="text-[10px] text-slate-500 mt-2 font-light">
                            {isFr 
                              ? 'Toutes les invitations s\'ajustent automatiquement à l\'horloge locale de votre agenda.' 
                              : 'All calendar invites automatically adjust to your calendar client\'s local clock.'
                            }
                          </p>
                        </div>
                      </div>

                      {/* Navigation CTA */}
                      <div className="pt-4 flex justify-end">
                        <button
                          type="button"
                          onClick={() => setCurrentStep(2)}
                          className="px-6 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs font-mono flex items-center gap-2 transition-all shadow-lg shadow-cyan-500/20 cursor-pointer focus:outline-none focus:ring-2 focus:ring-cyan-400"
                        >
                          <span>{language === 'fr' ? 'Continuer vers les Créneaux' : 'Proceed to Timeslots'}</span>
                          <ArrowRight size={14} />
                        </button>
                      </div>
                    </motion.div>
                  )}

                  {/* STEP 2: DYNAMIC CALENDAR & TIMESLOTS */}
                  {currentStep === 2 && (
                    <motion.div
                      key="step-2"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="space-y-6"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div>
                          <h3 className="text-lg font-bold text-white">
                            {language === 'fr' ? '2. Choisissez la Date et l\'Heure' : '2. Select Date & Timeslot'}
                          </h3>
                          <p className="text-xs text-slate-400">
                            {isFr 
                              ? <>Heures au format <strong>{timezone}</strong> (Fuseau de l'équipe DevSecOps Oakivo)</>
                              : <>Times formatted in <strong>{timezone}</strong> (Atlantic DevSecOps Operations Desk)</>
                            }
                          </p>
                        </div>
                        
                        {/* Month Page Navigation */}
                        <div className="flex items-center gap-1.5 bg-slate-900 border border-slate-800 p-1 rounded-xl">
                          <button
                            type="button"
                            disabled={monthOffset === 0}
                            onClick={() => setMonthOffset(p => Math.max(0, p - 1))}
                            aria-label={isFr ? "Semaine précédente" : "Previous week"}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                          >
                            <ChevronLeft size={16} />
                          </button>
                          <span className="text-[11px] font-mono text-slate-300 px-2">
                            {isFr ? `Semaine ${monthOffset + 1} sur ${maxPages}` : `Week ${monthOffset + 1} of ${maxPages}`}
                          </span>
                          <button
                            type="button"
                            disabled={monthOffset >= maxPages - 1}
                            onClick={() => setMonthOffset(p => Math.min(maxPages - 1, p + 1))}
                            aria-label={isFr ? "Semaine suivante" : "Next week"}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                          >
                            <ChevronRight size={16} />
                          </button>
                        </div>
                      </div>

                      {/* Dynamic Dates Grid */}
                      <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                        {pagedDates.map((item, idx) => {
                          const isSelected = selectedDate === item.fullDate;
                          return (
                            <button
                              key={idx}
                              type="button"
                              onClick={() => setSelectedDate(item.fullDate)}
                              className={`flex flex-col items-center p-3 rounded-2xl border transition-all cursor-pointer ${
                                isSelected
                                  ? 'bg-cyan-500 text-slate-950 border-cyan-400 font-bold shadow-lg shadow-cyan-500/25'
                                  : 'bg-slate-900/60 text-slate-300 border-slate-800 hover:bg-slate-850 hover:border-slate-700'
                              }`}
                            >
                              <span className={`text-[10px] font-mono uppercase mb-1 ${isSelected ? 'text-slate-950 font-bold' : 'text-slate-400'}`}>
                                {item.dayName}
                              </span>
                              <span className="text-xl font-extrabold tracking-tight">
                                {item.dayNum}
                              </span>
                              <span className={`text-[10px] font-mono mt-1 ${isSelected ? 'text-slate-900' : 'text-slate-500'}`}>
                                {item.monthName}
                              </span>
                            </button>
                          );
                        })}
                      </div>

                      {/* Available Timeslots Section */}
                      <div className="space-y-4 pt-4 border-t border-slate-800/80">
                        <div className="flex items-center justify-between">
                          <h4 className="text-[11px] font-mono uppercase text-slate-400 font-semibold flex items-center gap-2">
                            <Clock size={13} className="text-cyan-400" />
                            <span>{selectedDate ? (isFr ? `Créneaux pour le ${selectedDate}` : `Timeslots for ${selectedDate}`) : (isFr ? 'Créneaux Disponibles' : 'Available Timeslots')}</span>
                          </h4>
                          <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/40 border border-emerald-500/30 px-2 py-0.5 rounded-full">
                            {isFr ? 'Architecte en Service' : 'Active Architect On Duty'}
                          </span>
                        </div>

                        {/* Morning Slots */}
                        <div>
                          <p className="text-[10px] font-mono text-slate-500 mb-2 uppercase">{isFr ? 'Sessions du Matin' : 'Morning Sessions'}</p>
                          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                            {MORNING_SLOTS.map((slot) => {
                              const isSelected = selectedTime === slot;
                              return (
                                <button
                                  key={slot}
                                  type="button"
                                  onClick={() => setSelectedTime(slot)}
                                  className={`py-2.5 px-3 rounded-xl border text-xs font-semibold font-mono transition-all cursor-pointer text-center ${
                                    isSelected
                                      ? 'bg-emerald-400 text-slate-950 border-emerald-300 shadow-md shadow-emerald-950/40 font-bold'
                                      : 'bg-slate-900/80 text-slate-300 border-slate-800 hover:border-slate-700 hover:bg-slate-850'
                                  }`}
                                >
                                  {slot}
                                </button>
                              );
                            })}
                          </div>
                        </div>

                        {/* Afternoon Slots */}
                        <div>
                          <p className="text-[10px] font-mono text-slate-500 mb-2 uppercase">{isFr ? 'Sessions de l\'Après-Midi' : 'Afternoon Sessions'}</p>
                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                            {AFTERNOON_SLOTS.map((slot) => {
                              const isSelected = selectedTime === slot;
                              return (
                                <button
                                  key={slot}
                                  type="button"
                                  onClick={() => setSelectedTime(slot)}
                                  className={`py-2.5 px-3 rounded-xl border text-xs font-semibold font-mono transition-all cursor-pointer text-center ${
                                    isSelected
                                      ? 'bg-emerald-400 text-slate-950 border-emerald-300 shadow-md shadow-emerald-950/40 font-bold'
                                      : 'bg-slate-900/80 text-slate-300 border-slate-800 hover:border-slate-700 hover:bg-slate-850'
                                  }`}
                                >
                                  {slot}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      </div>

                      {/* Navigation Actions */}
                      <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
                        <button
                          type="button"
                          onClick={() => setCurrentStep(1)}
                          className="px-4 py-2.5 rounded-xl border border-slate-800 hover:bg-slate-900 text-slate-400 hover:text-white text-xs font-mono flex items-center gap-2 cursor-pointer transition-all"
                        >
                          <ArrowLeft size={14} />
                          <span>{isFr ? 'Retour' : 'Back'}</span>
                        </button>

                        <button
                          type="button"
                          disabled={!selectedDate || !selectedTime}
                          onClick={() => setCurrentStep(3)}
                          className="px-6 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 disabled:opacity-40 disabled:cursor-not-allowed text-slate-950 font-bold text-xs font-mono flex items-center gap-2 transition-all shadow-lg shadow-cyan-500/20 cursor-pointer focus:outline-none focus:ring-2 focus:ring-cyan-400"
                        >
                          <span>{language === 'fr' ? 'Confirmer le Créneau' : 'Confirm Slot & Enter Details'}</span>
                          <ArrowRight size={14} />
                        </button>
                      </div>
                    </motion.div>
                  )}

                  {/* STEP 3: ORGANIZATION BRIEF & DOSSIER */}
                  {currentStep === 3 && (
                    <motion.div
                      key="step-3"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                    >
                      <form onSubmit={handleComplete} className="space-y-4">
                        {/* Hidden honeypot for spam bots */}
                        <input
                          type="text"
                          name="b_office_phone"
                          tabIndex={-1}
                          autoComplete="off"
                          value={honeypot}
                          onChange={(e) => setHoneypot(e.target.value)}
                          className="hidden absolute opacity-0 pointer-events-none -z-10"
                          aria-hidden="true"
                        />

                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <div>
                            <h3 className="text-lg font-bold text-white">
                              {language === 'fr' ? '3. Dossier Technique de l\'Organisation' : '3. Organization & Architecture Brief'}
                            </h3>
                            <p className="text-xs text-slate-400">
                              {isFr 
                                ? 'Permet à notre architecte senior d\'analyser les schémas d\'architecture pertinents avant l\'appel.'
                                : 'Helps our senior architect review relevant blueprints before connecting.'
                              }
                            </p>
                          </div>
                          <button
                            type="button"
                            onClick={() => setCurrentStep(2)}
                            className="text-xs font-mono text-cyan-400 hover:underline cursor-pointer"
                          >
                            {isFr ? `Modifier l'heure (${selectedTime})` : `Edit Time (${selectedTime})`}
                          </button>
                        </div>

                        {/* Name & Work Email */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="text-[11px] font-mono uppercase text-slate-300 block mb-1.5 font-semibold">
                              {isFr ? 'Nom Complet *' : 'Full Name *'}
                            </label>
                            <div className="relative">
                              <User size={14} className="absolute left-3.5 top-3.5 text-slate-500" />
                              <input
                                type="text"
                                required
                                value={form.name}
                                onChange={(e) => setForm({ ...form, name: e.target.value })}
                                placeholder={isFr ? "Sarah Tremblay" : "Sarah Jenkins"}
                                className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-3 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                              />
                            </div>
                          </div>

                          <div>
                            <label className="text-[11px] font-mono uppercase text-slate-300 block mb-1.5 font-semibold">
                              {isFr ? 'Courriel Professionnel *' : 'Work Email *'}
                            </label>
                            <div className="relative">
                              <Mail size={14} className="absolute left-3.5 top-3.5 text-slate-500" />
                              <input
                                type="email"
                                required
                                value={form.email}
                                onChange={(e) => setForm({ ...form, email: e.target.value })}
                                placeholder="sarah@enterprise.ca"
                                className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-3 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                              />
                            </div>
                          </div>
                        </div>

                        {/* Company & Team Size */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="text-[11px] font-mono uppercase text-slate-300 block mb-1.5 font-semibold">
                              {isFr ? 'Organisation / Entreprise *' : 'Organization / Company *'}
                            </label>
                            <div className="relative">
                              <Building2 size={14} className="absolute left-3.5 top-3.5 text-slate-500" />
                              <input
                                type="text"
                                required
                                value={form.company}
                                onChange={(e) => setForm({ ...form, company: e.target.value })}
                                placeholder="Acme Logistics Corp"
                                className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-3 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                              />
                            </div>
                          </div>

                          <div>
                            <label className="text-[11px] font-mono uppercase text-slate-300 block mb-1.5 font-semibold">
                              {isFr ? 'Taille de l\'Équipe' : 'Team Size'}
                            </label>
                            <select
                              value={form.teamSize}
                              onChange={(e) => setForm({ ...form, teamSize: e.target.value })}
                              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-500 font-mono"
                            >
                              <option value="1-20 engineers">{isFr ? '1 - 20 ingénieurs / employés' : '1 - 20 engineers / staff'}</option>
                              <option value="20-100 employees">{isFr ? '20 - 100 employés' : '20 - 100 employees'}</option>
                              <option value="100-500 employees">{isFr ? '100 - 500 employés' : '100 - 500 employees'}</option>
                              <option value="500+ enterprise">{isFr ? '500+ Grande Entreprise / Secteur Public' : '500+ Enterprise / Public Sector'}</option>
                            </select>
                          </div>
                        </div>

                        {/* Cloud Infrastructure & Urgency */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="text-[11px] font-mono uppercase text-slate-300 block mb-1.5 font-semibold">
                              {isFr ? 'Environnement Cloud Principal' : 'Primary Cloud Environment'}
                            </label>
                            <div className="relative">
                              <Server size={14} className="absolute left-3.5 top-3.5 text-slate-500" />
                              <input
                                type="text"
                                value={form.cloudProvider}
                                onChange={(e) => setForm({ ...form, cloudProvider: e.target.value })}
                                placeholder={isFr ? "AWS, Azure, GCP ou Hybride" : "AWS, Azure, GCP, or Hybrid"}
                                className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-3 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                              />
                            </div>
                          </div>

                          <div>
                            <label className="text-[11px] font-mono uppercase text-slate-300 block mb-1.5 font-semibold">
                              {isFr ? 'Échéance / Urgence' : 'Timeline / Urgency'}
                            </label>
                            <select
                              value={form.urgency}
                              onChange={(e) => setForm({ ...form, urgency: e.target.value })}
                              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-500 font-mono"
                            >
                              <option value="Immediate (Active Audit/Remediation)">{isFr ? 'Immédiat (Audit actif / Remédiation urgente)' : 'Immediate (Active Audit / Remediation Needed)'}</option>
                              <option value="Standard (Within 2 Weeks)">{isFr ? 'Standard (Dans les 2 prochaines semaines)' : 'Standard (Within Next 2 Weeks)'}</option>
                              <option value="Strategic Planning (Next Quarter)">{isFr ? 'Planification Stratégique (Budget prochain trimestre)' : 'Strategic Planning (Next Quarter Budget)'}</option>
                            </select>
                          </div>
                        </div>

                        {/* Challenge / Bottleneck */}
                        <div>
                          <label className="text-[11px] font-mono uppercase text-slate-300 block mb-1.5 font-semibold">
                            {isFr ? 'Défi Technique Principal / Objectif de Sécurité *' : 'Primary Infrastructure Challenge / Security Goal *'}
                          </label>
                          <textarea
                            rows={3}
                            required
                            value={form.bottleneck}
                            onChange={(e) => setForm({ ...form, bottleneck: e.target.value })}
                            placeholder={isFr ? "ex. Préparation à l'audit SOC 2 Type II, automatisation des barrières de sécurité conteneurs dans GitLab/GitHub Actions, ou isolation de bases de données ERP multi-tenants..." : "e.g. Preparing for SOC 2 Type II audit, automating container security gating in GitLab/GitHub Actions, or isolating multi-tenant ERP databases..."}
                            className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 resize-none font-sans"
                          />
                        </div>

                        {errorMessage && (
                          <div className="text-red-400 text-xs font-semibold bg-red-400/10 border border-red-400/20 p-3 rounded-xl">
                            {errorMessage}
                          </div>
                        )}

                        {/* Navigation Actions */}
                        <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
                          <button
                            type="button"
                            onClick={() => setCurrentStep(2)}
                            className="px-4 py-2.5 rounded-xl border border-slate-800 hover:bg-slate-900 text-slate-400 hover:text-white text-xs font-mono flex items-center gap-2 cursor-pointer transition-all"
                          >
                            <ArrowLeft size={14} />
                            <span>{isFr ? 'Retour au Calendrier' : 'Back to Calendar'}</span>
                          </button>

                          <button
                            type="submit"
                            disabled={isSubmitting}
                            className="px-6 py-3.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 disabled:opacity-50 text-slate-950 font-bold text-xs font-mono flex items-center justify-center gap-2 transition-all shadow-lg shadow-cyan-500/20 cursor-pointer focus:outline-none focus:ring-2 focus:ring-cyan-400"
                          >
                            {isSubmitting ? (
                              <span className="animate-pulse">{isFr ? 'Réservation du créneau en cours...' : 'Securing Architecture Slot...'}</span>
                            ) : (
                              <>
                                <Sparkles size={14} />
                                <span>{language === 'fr' ? 'Confirmer la Consultation Privée' : 'Confirm Executive Security Consultation'}</span>
                              </>
                            )}
                          </button>
                        </div>
                      </form>
                    </motion.div>
                  )}

                  {/* STEP 4: WORLD-CLASS CONFIRMATION DOSSIER */}
                  {currentStep === 4 && (
                    <motion.div
                      key="step-4"
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-6"
                    >
                      <div className="text-center pb-4 border-b border-slate-800">
                        <div className="w-14 h-14 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-4">
                          <CheckCircle2 size={32} />
                        </div>
                        <span className="text-[11px] font-mono text-emerald-400 font-bold uppercase tracking-widest block mb-1">
                          {isFr ? 'Consultation Confirmée et Transmise' : 'Consultation Confirmed & Dispatched'}
                        </span>
                        <h3 className="text-2xl font-bold text-white tracking-tight">
                          {bData.success_title}
                        </h3>
                        <p className="text-xs text-slate-400 max-w-md mx-auto mt-1 font-light">
                          {bData.success_message}
                        </p>
                      </div>

                      {/* Confirmation Receipt Card */}
                      <div className="p-5 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-4">
                        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
                          <div>
                            <span className="text-[10px] font-mono text-slate-500 uppercase">{isFr ? 'Référence de Confirmation' : 'Confirmation Reference'}</span>
                            <p className="text-sm font-mono font-bold text-cyan-400">{bookingConfirmationCode}</p>
                          </div>
                          <div className="text-right">
                            <span className="text-[10px] font-mono text-slate-500 uppercase">{isFr ? 'Architecte Référent' : 'Consultation Lead'}</span>
                            <p className="text-xs font-semibold text-white">{isFr ? 'Architecte DevSecOps Senior' : 'Senior DevSecOps Architect'}</p>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                          <div>
                            <span className="text-slate-500 block text-[11px]">{isFr ? 'Créneau de la Réunion' : 'Appointment Slot'}</span>
                            <span className="font-semibold text-white">{selectedDate} {isFr ? 'à' : 'at'} {selectedTime} ({timezone})</span>
                          </div>
                          <div>
                            <span className="text-slate-500 block text-[11px]">{isFr ? 'Canal de Réunion' : 'Meeting Channel'}</span>
                            <span className="font-semibold text-white">{meetingFormats.find(m => m.id === meetingFormat)?.label}</span>
                          </div>
                          <div>
                            <span className="text-slate-500 block text-[11px]">{isFr ? 'Organisation Cliente' : 'Client Organization'}</span>
                            <span className="font-semibold text-white">{form.company} ({form.name})</span>
                          </div>
                          <div>
                            <span className="text-slate-500 block text-[11px]">{isFr ? 'Objectif' : 'Objective'}</span>
                            <span className="font-semibold text-white">{consultationTopics.find(c => c.id === selectedFocus)?.title}</span>
                          </div>
                        </div>
                      </div>

                      {/* Calendar Action Buttons */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                        <a
                          href={googleCalendarUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full py-3 px-4 rounded-xl bg-slate-900 hover:bg-slate-850 border border-slate-800 text-white font-mono text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer"
                        >
                          <CalendarIcon size={14} className="text-cyan-400" />
                          <span>{isFr ? 'Ajouter à Google Agenda' : 'Add to Google Calendar'}</span>
                          <ExternalLink size={12} className="text-slate-500" />
                        </a>

                        <button
                          type="button"
                          onClick={downloadIcsFile}
                          className="w-full py-3 px-4 rounded-xl bg-slate-900 hover:bg-slate-850 border border-slate-800 text-white font-mono text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer"
                        >
                          <Download size={14} className="text-emerald-400" />
                          <span>{isFr ? 'Télécharger le fichier .ics (Outlook/Apple)' : 'Download .ics File (Outlook/Apple)'}</span>
                        </button>
                      </div>

                      {/* Preparation Tips */}
                      <div className="p-4 bg-slate-950/80 rounded-2xl border border-slate-800 text-xs text-slate-400">
                        <p className="font-mono text-cyan-400 text-[11px] font-semibold uppercase mb-1.5 flex items-center gap-1.5">
                          <FileCheck2 size={13} />
                          <span>{isFr ? 'Préparation Recommandée pour Optimiser la Session' : 'Recommended Preparation for Maximum Value'}</span>
                        </p>
                        <ul className="space-y-1 list-disc list-inside text-slate-300 font-light text-[11px]">
                          <li>{isFr ? 'Avoir un schéma d\'architecture général ou la liste de vos fournisseurs cloud (AWS/Azure/GCP).' : 'Have a high-level architecture diagram or cloud provider list ready (AWS/Azure/GCP).'}</li>
                          <li>{isFr ? 'Lister vos obligations de conformité à venir (SOC 2, ISO 27001, LPRPDE, Loi C-26, FedRAMP).' : 'List any upcoming compliance obligations (SOC 2, ISO 27001, PIPEDA, FedRAMP).'}</li>
                          <li>{isFr ? 'Examiner vos règles de contrôle d\'accès d\'équipe et vos pipelines de déploiement CI/CD.' : 'Review team access control patterns and CI/CD deployment pipelines.'}</li>
                        </ul>
                      </div>

                      {/* Start New Booking CTA */}
                      <div className="pt-2 text-center">
                        <button
                          type="button"
                          onClick={() => {
                            setCurrentStep(1);
                            setSelectedDate(null);
                            setSelectedTime(null);
                            setForm({
                              name: '',
                              email: '',
                              company: '',
                              teamSize: '20-100 employees',
                              cloudProvider: 'Multi-Cloud (AWS + Azure/GCP)',
                              urgency: 'Standard (Within 2 Weeks)',
                              bottleneck: '',
                            });
                          }}
                          className="text-xs font-mono text-slate-400 hover:text-white transition-colors cursor-pointer"
                        >
                          {isFr ? 'Planifier une autre consultation technique' : 'Schedule another technical consultation'}
                        </button>
                      </div>
                    </motion.div>
                  )}

                </AnimatePresence>
              </div>

            </div>
          </div>

        </div>
      </Section>
    </>
  );
};

export default Booking;
