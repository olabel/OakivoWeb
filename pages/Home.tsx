import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { ShieldCheck, Server, Lock, ArrowRight, Video, Sparkles, Terminal } from 'lucide-react';
import { NavRoute } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';

const ParallaxCard = ({ children, className }: { children: React.ReactNode, className?: string }) => {
    const ref = useRef<HTMLDivElement>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
    const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        x.set((e.clientX - centerX) / (rect.width / 2));
        y.set((e.clientY - centerY) / (rect.height / 2));
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    const rotateX = useTransform(mouseYSpring, [-1, 1], [4, -4]);
    const rotateY = useTransform(mouseXSpring, [-1, 1], [-4, 4]);
    
    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            className={`relative perspective-1000 ${className}`}
        >
            <motion.div 
                style={{ transform: "translateZ(30px)" }}
                className="w-full h-full flex flex-col justify-between"
            >
                {children}
            </motion.div>
        </motion.div>
    );
};

const Home: React.FC = () => {
  const { t } = useLanguage();

  return (
    <>
      <SEO 
        title="Oakivo Solutions Inc. | Premium DevSecOps & Cloud Security"
        description="We architect bespoke, self-healing cloud infrastructure and shift-left pipelines. Ship faster without failing another compliance audit."
        keywords="DevSecOps, Cloud Security, Infrastructure as Code, Kubernetes Security, Zero-Trust Architecture, Shift-Left Pipelines"
      />
      
      {/* Hero Section */}
      <header className="relative min-h-[95vh] flex items-center justify-center overflow-hidden bg-slate-950">
        {/* Video Placeholder */}
        <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden">
            <iframe
                className="absolute w-[300vw] h-[300vh] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 md:w-[150vw] md:h-[150vh] lg:w-[120vw] lg:h-[150vh] opacity-20 mix-blend-luminosity"
                src="https://www.youtube.com/embed/W3xvFiHXsNI?autoplay=1&mute=1&controls=0&loop=1&playlist=W3xvFiHXsNI&showinfo=0&rel=0&modestbranding=1"
                allow="autoplay; encrypted-media"
                style={{ border: 'none' }}
            ></iframe>
        </div>
        {/* Overlay Gradients */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/90 via-slate-950/60 to-slate-950"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-cyan-900/10 via-transparent to-transparent"></div>
        
        <div className="relative z-10 container mx-auto px-6 flex flex-col items-start text-left max-w-7xl pt-24">
            <h1 className="text-5xl md:text-7xl lg:text-[6rem] font-display font-bold tracking-tight mb-8 leading-[1.05] text-slate-100 max-w-4xl">
                {t('landing.hero_headline')}
            </h1>
            <p className="text-lg md:text-2xl text-slate-300 max-w-3xl font-light leading-relaxed mb-12">
                {t('landing.hero_subheadline')}
            </p>
            <div className="flex flex-col sm:flex-row items-start gap-6">
                <button onClick={() => window.dispatchEvent(new CustomEvent('open-lead-drawer'))} className="group inline-flex items-center justify-center px-8 py-4 text-sm font-semibold tracking-wider text-slate-950 transition-all duration-500 bg-slate-100 hover:bg-white rounded-sm overflow-hidden cursor-pointer">
                    <span className="relative z-10 flex items-center gap-3">
                        {t('common.cta_book_audit')}
                        <ArrowRight className="w-4 h-4 transition-transform duration-500 group-hover:translate-x-1" />
                    </span>
                </button>
                <a href="#capabilities" className="group inline-flex items-center justify-center px-8 py-4 text-sm font-semibold tracking-wider text-slate-100 transition-all duration-500 border border-slate-700 hover:border-slate-500 hover:bg-slate-900/50 rounded-sm">
                    <span className="flex items-center gap-3">
                        {t('common.cta_explore_arsenal')}
                    </span>
                </a>
            </div>
        </div>
      </header>

      {/* The Strategic Imperative */}
      <section className="py-32 md:py-48 px-6 bg-slate-950 relative border-t border-slate-900/50">
        <div className="container mx-auto max-w-7xl relative z-10">
            <div className="max-w-4xl">
                <h2 className="text-3xl md:text-5xl font-display font-bold tracking-tight mb-8 text-slate-100">{t('landing.strategic_headline')}</h2>
                <p className="text-slate-300 text-lg md:text-2xl font-light leading-relaxed">
                    {t('landing.strategic_body')}
                </p>
            </div>
        </div>
      </section>

      {/* Core Capabilities - Bento Box Grid */}
      <section id="capabilities" className="py-32 md:py-48 px-6 bg-slate-950 relative border-t border-slate-900/50">
        <div className="absolute inset-0 bg-slate-950 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-20 pointer-events-none"></div>
        <div className="container mx-auto max-w-7xl relative z-10">
            <div className="mb-20">
                <h2 className="text-3xl md:text-5xl font-display font-bold tracking-tight mb-6 text-slate-100">{t('landing.capabilities_headline')}</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 perspective-[2000px]">
                {/* Item 1 */}
                <ParallaxCard className="col-span-1 md:col-span-8 bg-slate-900/40 backdrop-blur-md border border-slate-800 p-10 md:p-14 group hover:bg-slate-900/60 hover:border-cyan-500/30 transition-all duration-500 min-h-[400px]">
                    <div className="w-12 h-12 bg-cyan-500/10 flex items-center justify-center mb-8 border border-cyan-500/20 text-cyan-400 rounded-sm">
                        <ShieldCheck className="w-5 h-5" />
                    </div>
                    <div>
                        <h3 className="text-2xl md:text-3xl font-display font-bold mb-4 tracking-tight text-slate-100">{t('landing.cap1_title')}</h3>
                        <p className="text-slate-400 leading-relaxed font-light md:text-lg max-w-2xl">
                            {t('landing.cap1_body')}
                        </p>
                    </div>
                </ParallaxCard>

                {/* Item 2 */}
                <ParallaxCard className="col-span-1 md:col-span-4 bg-slate-900/40 backdrop-blur-md border border-slate-800 p-10 group hover:bg-slate-900/60 hover:border-cyan-500/30 transition-all duration-500 min-h-[400px]">
                    <div className="w-12 h-12 bg-cyan-500/10 flex items-center justify-center mb-8 border border-cyan-500/20 text-cyan-400 rounded-sm">
                        <Terminal className="w-5 h-5" />
                    </div>
                    <div>
                        <h3 className="text-xl md:text-2xl font-display font-bold mb-4 tracking-tight text-slate-100">{t('landing.cap2_title')}</h3>
                        <p className="text-slate-400 font-light leading-relaxed">
                            {t('landing.cap2_body')}
                        </p>
                    </div>
                </ParallaxCard>

                {/* Item 3 */}
                <ParallaxCard className="col-span-1 md:col-span-4 bg-slate-900/40 backdrop-blur-md border border-slate-800 p-10 group hover:bg-slate-900/60 hover:border-slate-500/50 transition-all duration-500 min-h-[400px]">
                    <div className="w-12 h-12 bg-slate-800/50 flex items-center justify-center mb-8 border border-slate-700/50 text-slate-300 rounded-sm">
                        <Lock className="w-5 h-5" />
                    </div>
                    <div>
                        <h3 className="text-xl md:text-2xl font-display font-bold mb-4 tracking-tight text-slate-100">{t('landing.cap3_title')}</h3>
                        <p className="text-slate-400 font-light leading-relaxed">
                            {t('landing.cap3_body')}
                        </p>
                    </div>
                </ParallaxCard>

                {/* Item 4 */}
                <ParallaxCard className="col-span-1 md:col-span-8 bg-slate-900/40 backdrop-blur-md border border-slate-800 p-10 md:p-14 group hover:bg-slate-900/60 hover:border-cyan-500/30 transition-all duration-500 min-h-[400px]">
                    <div className="w-12 h-12 bg-cyan-500/10 flex items-center justify-center mb-8 border border-cyan-500/20 text-cyan-400 rounded-sm">
                        <Sparkles className="w-5 h-5" />
                    </div>
                    <div className="max-w-2xl">
                        <h3 className="text-2xl md:text-3xl font-display font-bold mb-4 tracking-tight text-slate-100">{t('landing.cap4_title')}</h3>
                        <p className="text-slate-400 font-light leading-relaxed md:text-lg">
                            {t('landing.cap4_body')}
                        </p>
                    </div>
                </ParallaxCard>
            </div>
        </div>
      </section>

      {/* The Engagement Model - 3-Step Layout */}
      <section className="py-32 md:py-48 px-6 border-t border-slate-800/50 bg-slate-950 relative">
        <div className="container mx-auto max-w-7xl relative z-10">
            <div className="mb-24">
                <h2 className="text-3xl md:text-5xl font-display font-bold tracking-tight mb-6 text-slate-100">{t('landing.methodology_headline')}</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
                {/* Step 1 */}
                <div className="group">
                    <div className="text-sm font-mono tracking-widest text-cyan-500 mb-6 border-b border-slate-800 pb-4">STEP 01</div>
                    <h3 className="text-2xl font-display font-bold tracking-tight mb-4 text-slate-100 group-hover:text-cyan-400 transition-colors duration-300">{t('landing.step1_title')}</h3>
                    <p className="text-slate-400 font-light leading-relaxed text-lg">
                        {t('landing.step1_body')}
                    </p>
                </div>

                {/* Step 2 */}
                <div className="group">
                    <div className="text-sm font-mono tracking-widest text-cyan-500 mb-6 border-b border-slate-800 pb-4">STEP 02</div>
                    <h3 className="text-2xl font-display font-bold tracking-tight mb-4 text-slate-100 group-hover:text-cyan-400 transition-colors duration-300">{t('landing.step2_title')}</h3>
                    <p className="text-slate-400 font-light leading-relaxed text-lg">
                        {t('landing.step2_body')}
                    </p>
                </div>

                {/* Step 3 */}
                <div className="group">
                    <div className="text-sm font-mono tracking-widest text-cyan-500 mb-6 border-b border-slate-800 pb-4">STEP 03</div>
                    <h3 className="text-2xl font-display font-bold tracking-tight mb-4 text-slate-100 group-hover:text-cyan-400 transition-colors duration-300">{t('landing.step3_title')}</h3>
                    <p className="text-slate-400 font-light leading-relaxed text-lg">
                        {t('landing.step3_body')}
                    </p>
                </div>
            </div>
        </div>
      </section>
    </>
  );
};

export default Home;

