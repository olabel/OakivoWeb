const fs = require('fs');

function addImport(file) {
  let content = fs.readFileSync(file, 'utf8');
  if (!content.includes('import { toast }')) {
    content = content.replace(
      "import React,",
      "import React,\nimport { toast } from 'sonner';\n"
    );
    // fallback if first didn't work
    if (!content.includes('import { toast }')) {
       content = "import { toast } from 'sonner';\n" + content;
    }
    fs.writeFileSync(file, content);
  }
}

['pages/Booking.tsx', 'pages/RiskCalculator.tsx'].forEach(addImport);
