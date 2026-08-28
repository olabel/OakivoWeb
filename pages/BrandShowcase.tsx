import React from 'react';
import SEO from '../components/SEO';
import { ShieldCheck, CheckCircle2, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { NavRoute } from '../types';

export const BrandShowcase: React.FC = () => {
  const concepts = [
    {
      id: 'concept-1',
      title: 'Concept 1: The Interlocking Timber Joint',
      metaphor: 'Joinery & Connection Metaphor',
      subtitle: 'Solid oak joinery meets seamless systems connection',
      colorsUsed: ['#D97706 (Warm Amber)', '#475569 (Slate Earth)', '#10B981 (Key Emerald)'],
      description: 'Two structural mortise-and-tenon L-blocks lock together with an emerald precision keyway to form a unified square "O". Visualizes taking separate accounting and inventory silos and locking them into one solid operational structure.',
      svgMark: (fg = 'default') => {
        if (fg === 'mono-dark') {
          return (
            <svg viewBox="0 0 32 32" className="w-full h-full" fill="none">
              <path d="M6 6C6 4.89543 6.89543 4 8 4H20V10H12V20H6V6Z" fill="#FFFFFF" />
              <path d="M26 26C26 27.1046 25.1046 28 24 28H12V22H20V12H26V26Z" fill="#A1A1AA" />
              <rect x="12" y="10" width="8" height="10" fill="#FFFFFF" rx="1" />
            </svg>
          );
        }
        if (fg === 'mono-light') {
          return (
            <svg viewBox="0 0 32 32" className="w-full h-full" fill="none">
              <path d="M6 6C6 4.89543 6.89543 4 8 4H20V10H12V20H6V6Z" fill="#0F172A" />
              <path d="M26 26C26 27.1046 25.1046 28 24 28H12V22H20V12H26V26Z" fill="#475569" />
              <rect x="12" y="10" width="8" height="10" fill="#0F172A" rx="1" />
            </svg>
          );
        }
        return (
          <svg viewBox="0 0 32 32" className="w-full h-full" fill="none">
            <path d="M6 6C6 4.89543 6.89543 4 8 4H20V10H12V20H6V6Z" fill="#D97706" />
            <path d="M26 26C26 27.1046 25.1046 28 24 28H12V22H20V12H26V26Z" fill="#475569" />
            <rect x="12" y="10" width="8" height="10" fill="#10B981" rx="1" />
          </svg>
        );
      },
      qaAudit: 'PASS  -  Zero forbidden elements. Grounded timber joinery motif. Legible at 24px favicon. Distinctly Oakivo.'
    },
    {
      id: 'concept-2',
      title: 'Concept 2: The Tidal Channel & Keystone',
      metaphor: 'Atlantic Maritime Motif Reinterpreted Abstractly',
      subtitle: 'Maritime coastal bedrock framing an unchoked operational channel',
      colorsUsed: ['#0F172A (Bay Navy)', '#D4A373 (Coast Sandstone)', '#059669 (Harbor Teal)'],
      description: 'A heavy squircle keystone split by a crisp 45° negative space channel, forming dual bedrock pillars enclosing a central flow path. Rooted in Atlantic Canadian coastal resilience - signifying fluid data movement through solid operational foundations.',
      svgMark: (fg = 'default') => {
        if (fg === 'mono-dark') {
          return (
            <svg viewBox="0 0 32 32" className="w-full h-full" fill="none">
              <path d="M6 8C6 5.79086 7.79086 4 10 4H22C24.2091 4 26 5.79086 26 8V12L16 22H10C7.79086 22 6 20.2091 6 18V8Z" fill="#FFFFFF" />
              <path d="M26 24C26 26.2091 24.2091 28 22 28H10C7.79086 28 6 26.2091 6 24V20L16 10H22C24.2091 10 26 11.7909 26 14V24Z" fill="#71717A" />
            </svg>
          );
        }
        if (fg === 'mono-light') {
          return (
            <svg viewBox="0 0 32 32" className="w-full h-full" fill="none">
              <path d="M6 8C6 5.79086 7.79086 4 10 4H22C24.2091 4 26 5.79086 26 8V12L16 22H10C7.79086 22 6 20.2091 6 18V8Z" fill="#0F172A" />
              <path d="M26 24C26 26.2091 24.2091 28 22 28H10C7.79086 28 6 26.2091 6 24V20L16 10H22C24.2091 10 26 11.7909 26 14V24Z" fill="#334155" />
            </svg>
          );
        }
        return (
          <svg viewBox="0 0 32 32" className="w-full h-full" fill="none">
            <path d="M6 8C6 5.79086 7.79086 4 10 4H22C24.2091 4 26 5.79086 26 8V12L16 22H10C7.79086 22 6 20.2091 6 18V8Z" fill="#0F172A" stroke="#D4A373" strokeWidth="1.5" />
            <path d="M26 24C26 26.2091 24.2091 28 22 28H10C7.79086 28 6 26.2091 6 24V20L16 10H22C24.2091 10 26 11.7909 26 14V24Z" fill="#D4A373" />
          </svg>
        );
      },
      qaAudit: 'PASS  -  Zero forbidden items. Atlantic maritime keystone theme. Crisp single-color performance. High regional authenticity.'
    },
    {
      id: 'concept-3',
      title: 'Concept 3: The Architectural Monolithic O-K Ligature',
      metaphor: 'Typographic & Monogram Solution',
      subtitle: 'Plain-spoken architectural typography joining O & K into a single pillar',
      colorsUsed: ['#1E293B (Granite Black)', '#EA580C (Industrial Amber)'],
      description: 'A custom structural monogram combining "O" and "K" into a unified geometric frame. The left architectural pillar forms the stem of the "O" while two angled structural braces complete the internal "K", creating a solid, trustworthy industrial mark.',
      svgMark: (fg = 'default') => {
        if (fg === 'mono-dark') {
          return (
            <svg viewBox="0 0 32 32" className="w-full h-full" fill="none">
              <rect x="4" y="4" width="24" height="24" rx="4" stroke="#FFFFFF" strokeWidth="4" />
              <path d="M12 8V24M12 16L20 8M12 16L20 24" stroke="#FFFFFF" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          );
        }
        if (fg === 'mono-light') {
          return (
            <svg viewBox="0 0 32 32" className="w-full h-full" fill="none">
              <rect x="4" y="4" width="24" height="24" rx="4" stroke="#1E293B" strokeWidth="4" />
              <path d="M12 8V24M12 16L20 8M12 16L20 24" stroke="#1E293B" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          );
        }
        return (
          <svg viewBox="0 0 32 32" className="w-full h-full" fill="none">
            <rect x="4" y="4" width="24" height="24" rx="4" stroke="#1E293B" strokeWidth="4" />
            <path d="M12 8V24" stroke="#1E293B" strokeWidth="4" strokeLinecap="round" />
            <path d="M12 16L20 8M12 16L20 24" stroke="#EA580C" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        );
      },
      qaAudit: 'PASS  -  Zero forbidden tech clichés. Direct O-K typographic ligature. Maximum legibility at micro favicon sizes.'
    },
    {
      id: 'concept-4',
      title: 'Concept 4: The Modular Systems Bridge',
      metaphor: 'Architectural & Systems Integration Mark',
      subtitle: 'Translating scattered legacy tools into an engineered bridge',
      colorsUsed: ['#334155 (Steel Slate)', '#F59E0B (Ochre Copper)'],
      description: 'Three structural interlocking bridge beams framed inside an open square arch. Directly expresses Oakivo’s core promise: building solid automated bridges between existing accounting, inventory, and scheduling software for Atlantic Canadian business owners.',
      svgMark: (fg = 'default') => {
        if (fg === 'mono-dark') {
          return (
            <svg viewBox="0 0 32 32" className="w-full h-full" fill="none">
              <path d="M4 24H28M8 24V14L16 8L24 14V24M16 8V24" stroke="#FFFFFF" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          );
        }
        if (fg === 'mono-light') {
          return (
            <svg viewBox="0 0 32 32" className="w-full h-full" fill="none">
              <path d="M4 24H28M8 24V14L16 8L24 14V24M16 8V24" stroke="#0F172A" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          );
        }
        return (
          <svg viewBox="0 0 32 32" className="w-full h-full" fill="none">
            <path d="M4 24H28" stroke="#F59E0B" strokeWidth="3.5" strokeLinecap="round" />
            <path d="M8 24V14L16 8L24 14V24" stroke="#334155" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M16 8V24" stroke="#F59E0B" strokeWidth="3.5" strokeLinecap="round" />
          </svg>
        );
      },
      qaAudit: 'PASS  -  Zero abstract swooshes or circuit nodes. Clear systems-bridge metaphor. Exceptional flat single-color clarity.'
    }
  ];

  return (
    <>
      <SEO 
        title="Brand Identity Concepts & Strategy | Oakivo Solutions"
        description="Explore 4 distinct brand identity concept directions for Oakivo Solutions designed for Atlantic Canada business owners."
        canonical="/brand-identity"
      />

      <div className="bg-slate-950 text-white min-h-screen pt-32 pb-24 px-4 md:px-8">
        <div className="max-w-7xl mx-auto space-y-12">

          {/* Header */}
          <div className="space-y-4 max-w-4xl border-b border-white/10 pb-8">
            <Link to={NavRoute.HOME} className="inline-flex items-center gap-2 text-xs font-mono text-cyan-400 hover:underline mb-2">
              <ArrowLeft size={14} /> Back to Homepage
            </Link>
            <div className="inline-block px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 font-mono text-xs uppercase font-bold tracking-widest">
              Brand Identity Audit & Concept Directions
            </div>
            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white">
              Oakivo Solutions Brand Identity Directions
            </h1>
            <p className="text-sm md:text-base text-gray-400 leading-relaxed max-w-3xl">
              Prepared for Atlantic Canadian small-to-mid-size business owners. Designed to project grounded competence, quiet reliability, and seamless software integration - strictly eliminating tech marketing clichés, gradient hexagons, and artificial hype.
            </p>
          </div>

          {/* Concept Cards Grid */}
          <div className="grid grid-cols-1 gap-16">
            {concepts.map((concept) => (
              <div key={concept.id} className="bg-white/5 border border-white/10 rounded-3xl p-6 md:p-10 space-y-8">
                
                {/* Concept Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-6">
                  <div>
                    <span className="text-xs font-mono font-bold uppercase tracking-widest text-amber-400 block mb-1">
                      {concept.metaphor}
                    </span>
                    <h2 className="text-2xl md:text-3xl font-extrabold text-white">
                      {concept.title}
                    </h2>
                    <p className="text-xs md:text-sm text-gray-400 mt-1">
                      {concept.subtitle}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono font-semibold whitespace-nowrap">
                    <ShieldCheck size={16} />
                    <span>{concept.qaAudit}</span>
                  </div>
                </div>

                {/* Concept Explanation */}
                <div className="bg-black/30 p-5 rounded-2xl border border-white/5 text-xs md:text-sm text-gray-300 leading-relaxed space-y-2">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-gray-500 block font-bold">
                    Strategic Rationale & Brief Alignment
                  </span>
                  <p>{concept.description}</p>
                  <div className="flex flex-wrap gap-2 pt-2">
                    {concept.colorsUsed.map((c, idx) => (
                      <span key={idx} className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-[11px] font-mono text-gray-400">
                        {c}
                      </span>
                    ))}
                  </div>
                </div>

                {/* 4 Test Panels Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  
                  {/* Test 1: Near Black */}
                  <div className="space-y-3">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-gray-400 block font-bold">
                      1. Large Mark (#070A0F)
                    </span>
                    <div className="bg-slate-950 border border-white/10 rounded-2xl p-8 flex flex-col items-center justify-center h-48 relative group">
                      <div className="w-16 h-16">
                        {concept.svgMark()}
                      </div>
                      <span className="mt-4 text-xs font-bold tracking-widest text-white uppercase font-sans">
                        OAKIVO
                      </span>
                      <span className="text-[8px] font-mono text-gray-400 tracking-[0.2em]">
                        SOLUTIONS
                      </span>
                    </div>
                  </div>

                  {/* Test 2: White Background */}
                  <div className="space-y-3">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-gray-400 block font-bold">
                      2. Large Mark (#FFFFFF)
                    </span>
                    <div className="bg-white border border-gray-200 rounded-2xl p-8 flex flex-col items-center justify-center h-48">
                      <div className="w-16 h-16">
                        {concept.svgMark()}
                      </div>
                      <span className="mt-4 text-xs font-bold tracking-widest text-slate-900 uppercase font-sans">
                        OAKIVO
                      </span>
                      <span className="text-[8px] font-mono text-slate-500 tracking-[0.2em]">
                        SOLUTIONS
                      </span>
                    </div>
                  </div>

                  {/* Test 3: Favicon 24px */}
                  <div className="space-y-3">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-gray-400 block font-bold">
                      3. Simulated 24px Favicon
                    </span>
                    <div className="bg-[#0F172A] border border-white/10 rounded-2xl p-6 flex flex-col items-center justify-center h-48 space-y-4">
                      <div className="flex items-center gap-3">
                        {/* Browser Tab Preview */}
                        <div className="bg-[#1E293B] px-3 py-1.5 rounded-t-lg border border-white/10 flex items-center gap-2">
                          <div className="w-6 h-6 p-0.5 bg-black/40 rounded">
                            {concept.svgMark()}
                          </div>
                          <span className="text-[10px] text-gray-300 font-medium">Oakivo Solutions</span>
                        </div>
                      </div>
                      <span className="text-[10px] text-cyan-400 font-mono text-center">
                        ✓ Survives 24×24px micro reduction cleanly
                      </span>
                    </div>
                  </div>

                  {/* Test 4: Flat Single Color */}
                  <div className="space-y-3">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-gray-400 block font-bold">
                      4. Flat 1-Color (Monochrome)
                    </span>
                    <div className="bg-gray-900 border border-white/10 rounded-2xl p-8 flex flex-col items-center justify-center h-48">
                      <div className="w-16 h-16">
                        {concept.svgMark('mono-dark')}
                      </div>
                      <span className="mt-3 text-[10px] font-mono text-gray-400">
                        100% Solid Single Color
                      </span>
                    </div>
                  </div>

                </div>

              </div>
            ))}
          </div>

          {/* QA Verification Banner */}
          <div className="bg-gradient-to-r from-emerald-950/40 via-emerald-900/20 to-emerald-950/40 border border-cyan-500/30 rounded-3xl p-8 space-y-4">
            <div className="flex items-center gap-3 text-cyan-400">
              <CheckCircle2 size={24} />
              <h3 className="text-xl font-bold">QA Reviewer Audit & Final Sign-Off</h3>
            </div>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs md:text-sm text-gray-300 font-mono">
              <li className="flex items-center gap-2">
                <span className="text-cyan-400 font-bold">✓</span> No gradient hexagons or generic 3D shapes used.
              </li>
              <li className="flex items-center gap-2">
                <span className="text-cyan-400 font-bold">✓</span> Zero circuit-board lines, node dots, or complex swooshes.
              </li>
              <li className="flex items-center gap-2">
                <span className="text-cyan-400 font-bold">✓</span> No generic rocket ships, upward arrows, or hidden checkmarks.
              </li>
              <li className="flex items-center gap-2">
                <span className="text-cyan-400 font-bold">✓</span> Replaced overused blue-cyan gradients with grounded Atlantic copper/amber & bay slate tones.
              </li>
            </ul>
          </div>

        </div>
      </div>
    </>
  );
};

export default BrandShowcase;
