const fs = require('fs');
let content = fs.readFileSync('components/Navbar.tsx', 'utf8');

if (!content.includes('NavRoute.INSIGHTS')) {
  content = content.replace(
    "{ name: t('nav.insights'), path: NavRoute.METHODOLOGY },",
    "{ name: t('nav.insights'), path: NavRoute.METHODOLOGY },\n    { name: t('nav.research'), path: NavRoute.INSIGHTS },"
  );
  fs.writeFileSync('components/Navbar.tsx', content);
  console.log('Navbar patched');
}
