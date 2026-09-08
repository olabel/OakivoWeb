const fs = require('fs');
let content = fs.readFileSync('types.ts', 'utf8');
if (!content.includes('INSIGHTS = ')) {
  content = content.replace('BLOG = \'/perspectives\',', 'BLOG = \'/perspectives\',\n  INSIGHTS = \'/insights\',');
  fs.writeFileSync('types.ts', content);
  console.log('Added INSIGHTS to types');
}
