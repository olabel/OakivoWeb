const fs = require('fs');
let content = fs.readFileSync('pages/Home.tsx', 'utf8');

const targetStr = `                <p className="text-slate-300 text-lg md:text-2xl font-light leading-relaxed">
                    {t('landing.strategic_body')}
                </p>
            </div>
        </div>
      </section>`;

const replacementStr = `                <p className="text-slate-300 text-lg md:text-2xl font-light leading-relaxed">
                    {t('landing.strategic_body')}
                </p>
            </div>
            
            <div className="mt-16 max-w-5xl mx-auto rounded-3xl overflow-hidden border border-slate-800 shadow-[0_0_50px_rgba(34,211,238,0.1)] relative">
                <OptimizedImage 
                    src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80" 
                    alt="DevSecOps process automation and cloud security monitoring dashboard in Atlantic Canada"
                    className="w-full h-auto object-cover opacity-80"
                />
                <div className="absolute inset-0 bg-slate-900/40 mix-blend-multiply pointer-events-none"></div>
            </div>
        </div>
      </section>`;

if (content.includes(targetStr)) {
  content = content.replace(targetStr, replacementStr);
  if (!content.includes('import OptimizedImage')) {
    content = content.replace("import SEO from '../components/SEO';", "import SEO from '../components/SEO';\nimport OptimizedImage from '../components/OptimizedImage';");
  }
  fs.writeFileSync('pages/Home.tsx', content);
  console.log("Patched Home.tsx with OptimizedImage.");
} else {
  console.log("Could not find target string in Home.tsx");
}
