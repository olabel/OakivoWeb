import React, { useState } from 'react';
import { Calendar as CalendarIcon, Clock, Globe, ShieldCheck, CheckCircle, ArrowRight, User, Mail, Video } from 'lucide-react';
import { useLanguage, translations } from '../context/LanguageContext';
import Button from '../components/Button';
import SEO from '../components/SEO';
import Section from '../components/Section';

const Booking: React.FC = () => {
  const { t, language } = useLanguage();
  const bData = translations[language].booking;
  
  const [step, setStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
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
    setStatus('success');
  };

  return (
    <>
      <SEO 
        title="Schedule Discovery | Oakivo Systems"
        description="Book a technical discovery session with a senior architect."
      />

      <section className="bg-white pt-24 pb-16">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-8xl font-serif-display font-bold text-oakivo-primary tracking-tighter leading-none mb-6">
            {bData.hero_title}
          </h1>
          <p className="text-xl text-gray-400 font-light max-w-2xl mx-auto">
            {bData.hero_subtitle}
          </p>
        </div>
      </section>

      <section className="py-20 bg-gray-50/30">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto bg-white rounded-[48px] shadow-vise-xl border border-gray-100 overflow-hidden flex flex-col md:flex-row min-h-[600px]">
            
            {/* Sidebar Details */}
            <div className="md:w-1/3 bg-oakivo-primary p-12 text-white border-r border-white/10">
               <div className="mb-12">
                  <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center text-oakivo-secondary mb-6 border border-white/20">
                    <Video size={24} />
                  </div>
                  <h3 className="text-2xl font-serif-display font-bold mb-2">Technical Discovery</h3>
                  <p className="text-gray-400 text-sm font-light">45 Minutes • Video Conference</p>
               </div>
               
               <div className="space-y-8">
                  <div className="flex items-center gap-4 text-xs font-bold text-gray-400 uppercase tracking-widest">
                    <Clock size={16} className="text-oakivo-secondary" /> 45 Min Session
                  </div>
                  <div className="flex items-center gap-4 text-xs font-bold text-gray-400 uppercase tracking-widest">
                    <Globe size={16} className="text-oakivo-secondary" /> (GMT-4) Atlantic
                  </div>
                  <div className="flex items-center gap-4 text-xs font-bold text-gray-400 uppercase tracking-widest">
                    <ShieldCheck size={16} className="text-oakivo-secondary" /> PIPEDA Encrypted
                  </div>
               </div>
               
               <div className="mt-24 pt-12 border-t border-white/10">
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40 mb-4">Lead Architect</p>
                  <div className="flex items-center gap-4">
                     <div className="w-10 h-10 bg-oakivo-secondary rounded-full flex items-center justify-center text-black font-bold text-xs shadow-cyber">AB</div>
                     <div>
                        <p className="text-sm font-bold">Ahmed Bello</p>
                        <p className="text-[10px] text-oakivo-secondary font-black uppercase tracking-widest">Principal Architect</p>
                     </div>
                  </div>
               </div>
            </div>

            {/* Main Content */}
            <div className="md:w-2/3 p-8 md:p-16 flex flex-col">
               {status === 'success' ? (
                 <div className="flex-grow flex flex-col items-center justify-center text-center animate-fade-in-up">
                    <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center text-green-600 mb-8">
                      <CheckCircle size={40} />
                    </div>
                    <h3 className="text-4xl font-serif-display font-bold text-oakivo-primary mb-4">{bData.success_title}</h3>
                    <p className="text-lg text-gray-500 font-light mb-12">{bData.success_message}</p>
                    <Button variant="black" onClick={() => setStep(1)}>Return to Matrix</Button>
                 </div>
               ) : step === 1 ? (
                 <div className="animate-fade-in-up">
                    <h3 className="text-2xl font-serif-display font-bold text-oakivo-primary mb-12">Select Date & Time</h3>
                    <div className="grid grid-cols-5 gap-4 mb-12">
                       {dates.map((d, i) => (
                         <button 
                           key={i}
                           onClick={() => setSelectedDate(d.full)}
                           className={`flex flex-col items-center p-4 rounded-2xl border transition-all ${selectedDate === d.full ? 'bg-oakivo-primary text-white shadow-xl scale-105 border-oakivo-primary' : 'bg-gray-50 text-gray-500 hover:bg-gray-100 border-gray-100'}`}
                         >
                            <span className="text-[10px] font-black uppercase tracking-widest mb-2">{d.day}</span>
                            <span className="text-2xl font-bold font-serif-display">{d.date}</span>
                         </button>
                       ))}
                    </div>
                    
                    {selectedDate && (
                      <div className="space-y-6 animate-fade-in-up">
                         <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Available Windows</h4>
                         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {times.map((t, i) => (
                              <button 
                                key={i}
                                onClick={() => setSelectedTime(t)}
                                className={`p-4 rounded-xl border text-sm font-bold transition-all ${selectedTime === t ? 'bg-oakivo-secondary text-black border-oakivo-secondary shadow-cyber scale-105' : 'bg-white text-oakivo-primary border-gray-100 hover:border-oakivo-primary'}`}
                              >
                                 {t}
                              </button>
                            ))}
                         </div>
                      </div>
                    )}
                    
                    <div className="mt-12 pt-12 border-t border-gray-50 flex justify-end">
                       <Button 
                         variant="black" 
                         disabled={!selectedTime} 
                         onClick={() => setStep(2)}
                       >
                         Next Step <ArrowRight size={18} />
                       </Button>
                    </div>
                 </div>
               ) : (
                 <form onSubmit={handleComplete} className="animate-fade-in-up space-y-8">
                    <h3 className="text-2xl font-serif-display font-bold text-oakivo-primary mb-12">Confirm Details</h3>
                    <div className="p-6 bg-gray-50 rounded-3xl border border-gray-100 flex items-center justify-between">
                       <div className="flex items-center gap-4 text-oakivo-primary">
                          <CalendarIcon size={20} className="text-oakivo-secondary" />
                          <span className="text-sm font-bold">{selectedDate} at {selectedTime}</span>
                       </div>
                       <button onClick={() => setStep(1)} className="text-[10px] font-black text-oakivo-muted hover:text-oakivo-primary uppercase tracking-widest underline">Edit</button>
                    </div>
                    
                    <div className="space-y-6">
                       <div className="space-y-2">
                          <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block">Full Name</label>
                          <div className="relative">
                             <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                             <input type="text" required className="w-full bg-gray-50 border border-gray-100 p-4 pl-12 rounded-2xl focus:outline-none focus:border-oakivo-primary" />
                          </div>
                       </div>
                       <div className="space-y-2">
                          <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block">Email Address</label>
                          <div className="relative">
                             <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                             <input type="email" required className="w-full bg-gray-50 border border-gray-100 p-4 pl-12 rounded-2xl focus:outline-none focus:border-oakivo-primary" />
                          </div>
                       </div>
                    </div>

                    <div className="pt-8">
                       <Button variant="black" size="lg" className="w-full shadow-premium !bg-oakivo-primary">
                          Lock Deployment Window
                       </Button>
                    </div>
                 </form>
               )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Booking;