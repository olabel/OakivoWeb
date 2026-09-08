const fs = require('fs');
let content = fs.readFileSync('components/CaseStudiesShowcase.tsx', 'utf8');

const rightColStart = `              {/* Right Column: Key Achievements & CTA */}
              <div className="lg:col-span-5 space-y-8 bg-white/5 p-8 md:p-10 rounded-[32px] border border-white/10 flex flex-col justify-between">`;

const rightColReplacement = `              {/* Right Column: Image, Key Achievements & CTA */}
              <div className="lg:col-span-5 space-y-6 bg-white/5 p-8 md:p-10 rounded-[32px] border border-white/10 flex flex-col justify-between">
                <div className="w-full h-48 rounded-2xl overflow-hidden relative border border-white/10">
                  <OptimizedImage
                    src={currentCase.image}
                    alt={currentCase.imageAlt}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-slate-900/40 mix-blend-multiply pointer-events-none"></div>
                </div>`;

content = content.replace(rightColStart, rightColReplacement);
fs.writeFileSync('components/CaseStudiesShowcase.tsx', content);
console.log("Patched CaseStudiesShowcase.tsx with OptimizedImage element.");
