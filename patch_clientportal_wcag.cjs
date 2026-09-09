const fs = require('fs');
let content = fs.readFileSync('pages/ClientPortal.tsx', 'utf8');

// Form controls focus rings and a11y
content = content.replace(
  /<label className="text-xs font-mono font-bold uppercase tracking-widest text-slate-500">Corporate Email<\/label>/,
  '<label htmlFor="email" className="text-xs font-mono font-bold uppercase tracking-widest text-slate-400">Corporate Email</label>'
);
content = content.replace(
  /<input \n *required\n *type="email"/,
  '<input \n                          id="email"\n                          required\n                          type="email"'
);

content = content.replace(
  /<label className="text-xs font-mono font-bold uppercase tracking-widest text-slate-500">Access Token \/ Password<\/label>/,
  '<label htmlFor="password" className="text-xs font-mono font-bold uppercase tracking-widest text-slate-400">Access Token / Password</label>'
);
content = content.replace(
  /<input \n *required\n *type="password"/,
  '<input \n                          id="password"\n                          required\n                          type="password"'
);

// Better text contrast in form
content = content.replace(
  /className="w-full bg-slate-950\/50 border border-slate-800 rounded-xl py-3.5 pl-12 pr-4 text-white focus:outline-none focus:border-cyan-500 transition-colors text-sm"/g,
  'className="w-full bg-slate-950/50 border border-slate-800 rounded-xl py-3.5 pl-12 pr-4 text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors text-sm"'
);

content = content.replace(
  /className="w-full bg-white text-slate-950 font-bold font-mono text-sm py-4 rounded-xl hover:bg-cyan-400 transition-colors flex items-center justify-center gap-2 mt-4"/g,
  'className="w-full bg-white text-slate-950 font-bold font-mono text-sm py-4 rounded-xl hover:bg-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 focus:ring-offset-slate-900 transition-colors flex items-center justify-center gap-2 mt-4"'
);

content = content.replace(
  /className="text-slate-400 font-light text-sm"/,
  'className="text-slate-300 font-normal text-sm"'
);

// Contrast in Error block
content = content.replace(
  /bg-red-500\/10 border border-red-500\/20 text-red-400/g,
  'bg-red-500/10 border border-red-500/20 text-red-300'
);

// Buttons on dashboard focus state
content = content.replace(
  /className="w-full flex items-center justify-center gap-2 py-3 bg-slate-800 text-white font-mono text-xs font-bold rounded-lg group-hover:bg-cyan-500 transition-colors"/g,
  'className="w-full flex items-center justify-center gap-2 py-3 bg-slate-800 text-white font-mono text-xs font-bold rounded-lg group-hover:bg-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 focus:ring-offset-slate-900 transition-colors"'
);
content = content.replace(
  /className="w-full flex items-center justify-center gap-2 py-3 bg-cyan-500 text-slate-950 font-mono text-xs font-bold rounded-lg hover:bg-cyan-400 transition-colors"/g,
  'className="w-full flex items-center justify-center gap-2 py-3 bg-cyan-500 text-slate-950 font-mono text-xs font-bold rounded-lg hover:bg-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-slate-900 transition-colors"'
);


fs.writeFileSync('pages/ClientPortal.tsx', content);
