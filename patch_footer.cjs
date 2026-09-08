const fs = require('fs');
let content = fs.readFileSync('components/Footer.tsx', 'utf8');

if (!content.includes('NavRoute.INSIGHTS')) {
  content = content.replace(
    '<li><Link to={NavRoute.METHODOLOGY}',
    '<li><Link to={NavRoute.INSIGHTS} className="text-sm text-slate-400 hover:text-cyan-400 transition-colors">Security Insights</Link></li>\n                            <li><Link to={NavRoute.METHODOLOGY}'
  );
  fs.writeFileSync('components/Footer.tsx', content);
  console.log('Footer patched');
}
