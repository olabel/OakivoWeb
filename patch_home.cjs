const fs = require('fs');
let content = fs.readFileSync('pages/Home.tsx', 'utf8');

if (!content.includes('import FAQAccordion')) {
  // Add import at the top
  content = content.replace(
    "import PremiumCapabilities from '../components/PremiumCapabilities';",
    "import PremiumCapabilities from '../components/PremiumCapabilities';\nimport FAQAccordion from '../components/FAQAccordion';"
  );

  // Add the component before the end of the file
  content = content.replace(
    '      </section>\n    </>\n  );\n};',
    '      </section>\n      <FAQAccordion />\n    </>\n  );\n};'
  );

  fs.writeFileSync('pages/Home.tsx', content);
  console.log('Patched Home.tsx to include FAQAccordion');
} else {
  console.log('Already included');
}
