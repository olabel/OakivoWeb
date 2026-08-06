import React, { useState } from 'react';
import { Calendar as CalendarIcon, Clock, Globe, ShieldCheck, CheckCircle2, ArrowRight, User, Mail, Video, Sparkles } from 'lucide-react';
import { useLanguage, translations } from '../context/LanguageContext';
import SEO from '../components/SEO';
import Section from '../components/Section';
import { db } from '../utils/database';

const Booking: React.FC = () => {
  const { language } = useLanguage();
  const langDict = translations[language] || translations['en'];
  const bData = langDict?.booking || translations['en'].booking || {
    hero_title: "15-Minute Operational Audit.",
    hero_subtitle: "Select a timeslot for a brief evaluation of your invoicing bottlenecks.",
    success_title: "Audit Confirmed.",
    success_message: "A calendar invitation has been sent to your work email address."
  };
  
  const [step, setStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [form, setForm] = useState({ name: '', email: '', company: '', bottleneck: '' });
  const [honeypot, setHoneypot] = useState('');
  const [status, setStatus] = useState<'idle' | 'success'>('idle');

  const dates = [
    { day: 'Mon', date: '22', full: 'May 22, 2026' },
    { day: 'Tue', date: '23', full: 'May 23, 2026' },
    { day: 'Wed', date: '24', full: 'May 24, 2026' },
    { day: 'Thu', date: '25', full: 'May 25, 2026' },
    { day: 'Fri', date: '26', full: 'May 26, 2026' },
  ];

  const times = ['09:00 AM', '10:30 AM', '01:00 PM', '02:30 PM', '04:00 PM'];

  const handleComplete = (e: React.FormEvent) => {
    e.preventDefault();
    if (honeypot) {
      // Bot detected via honeypot: silently simulate success
      setStatus('success');
      return;
    }
    db.saveEntry('lead', {
      ...form,
      selectedDate,
      selectedTime,
      type: '15_MIN_OPERATIONAL_AUDIT_BOOKING'
    });
    setStatus('success');
  };

  return (
    <>
      <SEO 
        title="Schedule Free 15-Minute Audit | Oakivo Solutions"
        description="Schedule your free 15-minute invoice audit with an automation specialist at Oakivo Solutions. Discover how to automate billing across Atlantic Canada."
        canonical="/booking"
      />

      <section className="bg-[#070A0F] text-white pt-40 pb-16 relative overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-emerald-500/5 rounded-full blur-[140px] pointer-events-none" />

        <div className="container mx-auto px-4 text-center max-w-3xl relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-full mb-6">
            <Sparkles size={14} className="text-emerald-400" />
            <span className="text-[10px] font-mono-tech text-emerald-400 font-bold uppercase tracking-widest">
              Free Operational Audit
            </span>
          </div>

          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-linear-heading mb-4">
            {bData.hero_title}
          </h1>
          <p className="text-sm md:text-base text-[#8A8F98] font-normal leading-relaxed">
            {bData.hero_subtitle}
          </p>
        </div>
      </section>

      <Section className="py-16 bg-[#0B0F17] text-white border-t border-white/10">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto linear-card rounded-3xl border border-white/10 overflow-hidden flex flex-col md:flex-row">
            
            {/* Sidebar Details */}
            <div className="md:w-1/3 bg-[#070A0F] p-8 text-white border-r border-white/10 space-y-6">
              <div>
                <div className="w-10 h-10 bg-emerald-500/10 rounded-xl flex items-center justify-center text-emerald-400 mb-4 border border-emerald-500/20">
                  <Video size={20} />
                </div>
                <h3 className="text-lg font-bold">15-Min Operational Audit</h3>
                <p className="text-xs text-gray-400 font-light mt-1">15 Minutes • Live Video or Phone</p>
              </div>
               
              <div className="space-y-4 pt-4 border-t border-white/10 text-xs text-gray-400">
                <div className="flex items-center gap-2">
                  <Clock size={14} className="text-emerald-400" /> <span>15 Minutes</span>
                </div>
                <div className="flex items-center gap-2">
                  <Globe size={14} className="text-emerald-400" /> <span>Atlantic Standard Time</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck size={14} className="text-emerald-400" /> <span>100% Free • No Hard Sales</span>
                </div>
              </div>
               
              <div className="pt-6 border-t border-white/10">
                <p className="text-[10px] font-mono-tech uppercase text-gray-500 mb-2">Automation Specialist</p>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-emerald-400 rounded-full flex items-center justify-center text-black font-bold text-xs">MV</div>
                  <div>
                    <p className="text-xs font-bold text-white">Marcus Vance</p>
                    <p className="text-[10px] text-emerald-400 font-mono-tech">Lead Automation Specialist</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="md:w-2/3 p-8 flex flex-col justify-center">
              {status === 'success' ? (
                <div className="text-center py-12 space-y-4">
                  <CheckCircle2 size={48} className="text-emerald-400 mx-auto" />
                  <h3 className="text-2xl font-bold text-white">{bData.success_title}</h3>
                  <p className="text-xs text-gray-400 max-w-md mx-auto">{bData.success_message}</p>
                </div>
              ) : step === 1 ? (
                <div className="space-y-6">
                  <h3 className="text-lg font-bold text-white">Select Date & Time</h3>
                  <div className="grid grid-cols-5 gap-2">
                    {dates.map((d, i) => (
                      <button 
                        key={i}
                        onClick={() => setSelectedDate(d.full)}
                        className={`flex flex-col items-center p-3 rounded-2xl border text-xs transition-all cursor-pointer ${
                          selectedDate === d.full 
                            ? 'bg-white text-black border-white font-bold' 
                            : 'bg-white/5 text-gray-300 border-white/10 hover:bg-white/10'
                        }`}
                      >
                        <span className="text-[10px] font-mono-tech uppercase text-gray-400 mb-1">{d.day}</span>
                        <span className="text-lg font-bold">{d.date}</span>
                      </button>
                    ))}
                  </div>
                  
                  {selectedDate && (
                    <div className="space-y-3 pt-2">
                      <h4 className="text-[10px] font-mono-tech uppercase text-gray-400">Available Timeslots</h4>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                        {times.map((t, i) => (
                          <button 
                            key={i}
                            onClick={() => setSelectedTime(t)}
                            className={`p-2.5 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                              selectedTime === t 
                                ? 'bg-emerald-400 text-black border-emerald-400' 
                                : 'bg-white/5 text-gray-200 border-white/10 hover:border-white'
                            }`}
                          >
                            {t}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  <div className="pt-4 border-t border-white/10 flex justify-end">
                    <button 
                      disabled={!selectedTime} 
                      onClick={() => setStep(2)}
                      className="px-6 py-3 rounded-full bg-white hover:bg-gray-100 disabled:opacity-50 text-black font-semibold text-xs tracking-wide flex items-center gap-2 cursor-pointer"
                    >
                      <span>Continue</span> <ArrowRight size={14} />
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleComplete} className="space-y-4">
                  {/* Hidden Honeypot Input for Bot Anti-Spam */}
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

                  <h3 className="text-lg font-bold text-white">Confirm Your Details</h3>
                  <div className="p-3 bg-white/5 rounded-xl border border-white/10 text-xs text-emerald-400 font-mono-tech flex justify-between items-center">
                    <span>{selectedDate} at {selectedTime}</span>
                    <button type="button" onClick={() => setStep(1)} className="text-gray-300 hover:text-white underline text-[10px]">Change</button>
                  </div>
                  
                  <div>
                    <label className="text-[10px] font-mono-tech uppercase text-gray-300 block mb-1">Your Name *</label>
                    <input type="text" required value={form.name} onChange={e => setForm({...form, name: e.target.value})} className="w-full bg-white/5 border border-white/15 rounded-xl p-3 text-xs text-white placeholder-gray-400 focus:outline-none focus:border-white" placeholder="Marcus Vance" />
                  </div>

                  <div>
                    <label className="text-[10px] font-mono-tech uppercase text-gray-300 block mb-1">Work Email *</label>
                    <input type="email" required value={form.email} onChange={e => setForm({...form, email: e.target.value})} className="w-full bg-white/5 border border-white/15 rounded-xl p-3 text-xs text-white placeholder-gray-400 focus:outline-none focus:border-white" placeholder="m.vance@company.ca" />
                  </div>

                  <div>
                    <label className="text-[10px] font-mono-tech uppercase text-gray-300 block mb-1">Main Bottleneck Task *</label>
                    <textarea rows={2} required value={form.bottleneck} onChange={e => setForm({...form, bottleneck: e.target.value})} className="w-full bg-white/5 border border-white/15 rounded-xl p-3 text-xs text-white placeholder-gray-400 focus:outline-none focus:border-white resize-none" placeholder="e.g. Typing paper invoices into QuickBooks..." />
                  </div>

                  <button type="submit" className="w-full py-3.5 rounded-full bg-white hover:bg-gray-100 text-black font-semibold text-xs tracking-wide shadow-md flex items-center justify-center gap-2 cursor-pointer">
                    <Sparkles size={14} />
                    <span>Confirm Free 15-Minute Audit</span>
                  </button>
                </form>
              )}
            </div>

          </div>
        </div>
      </Section>
    </>
  );
};

export default Booking;
