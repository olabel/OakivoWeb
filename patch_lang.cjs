const fs = require('fs');
let content = fs.readFileSync('context/LanguageContext.tsx', 'utf8');

if (!content.includes("research: 'Insights'")) {
  content = content.replace(
    "locations: 'Locations'",
    "locations: 'Locations',\n      research: 'Insights'"
  );
  content = content.replace(
    "locations: 'Emplacements'",
    "locations: 'Emplacements',\n      research: 'Aperçus'"
  );
  fs.writeFileSync('context/LanguageContext.tsx', content);
  console.log('Language context patched');
}
