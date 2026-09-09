const fs = require('fs');
let content = fs.readFileSync('pages/RiskCalculator.tsx', 'utf8');

// Improve contrast on the description text
content = content.replace(/text-slate-400 font-light/g, 'text-slate-300 font-normal');

// Add aria-labels and focus rings to the option buttons
content = content.replace(
  /className="w-full text-left p-5 rounded-xl border border-slate-700\\/50 bg-slate-800\\/20 hover:bg-slate-800\\/60 hover:border-cyan-500\\/50 transition-all group flex items-start gap-4"/g,
  'className="w-full text-left p-5 rounded-xl border border-slate-700/50 bg-slate-800/20 hover:bg-slate-800/60 hover:border-cyan-500/50 transition-all group flex items-start gap-4 focus:outline-none focus:ring-2 focus:ring-cyan-500/80"'
);

// Add aria-live region to the analyzing state
content = content.replace(
  /<div className="flex flex-col items-center justify-center text-center py-12">/,
  '<div className="flex flex-col items-center justify-center text-center py-12" aria-live="polite" aria-busy="true">'
);

// Add focus ring to form inputs in lead form
content = content.replace(
  /focus:outline-none focus:border-cyan-500 transition-colors/g,
  'focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors'
);

// Add focus ring to submit button
content = content.replace(
  /className="w-full bg-white text-slate-950 font-bold font-mono text-sm py-4 rounded-lg hover:bg-cyan-400 transition-colors flex items-center justify-center gap-2 mt-2"/g,
  'className="w-full bg-white text-slate-950 font-bold font-mono text-sm py-4 rounded-lg hover:bg-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 focus:ring-offset-slate-950 transition-colors flex items-center justify-center gap-2 mt-2"'
);

// Add descriptive id and labels to the input fields
content = content.replace(
  /<input (.*?) placeholder="Full Name"/,
  '<label htmlFor="fullName" className="sr-only">Full Name</label>\n                          <input id="fullName" $1 placeholder="Full Name"'
);
content = content.replace(
  /<input (.*?) placeholder="Work Email"/,
  '<label htmlFor="workEmail" className="sr-only">Work Email</label>\n                          <input id="workEmail" $1 placeholder="Work Email"'
);
content = content.replace(
  /<input (.*?) placeholder="Company Name"/,
  '<label htmlFor="companyName" className="sr-only">Company Name</label>\n                          <input id="companyName" $1 placeholder="Company Name"'
);

fs.writeFileSync('pages/RiskCalculator.tsx', content);
