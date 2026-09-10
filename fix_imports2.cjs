const fs = require('fs');

function fixImport(file) {
  let content = fs.readFileSync(file, 'utf8');
  content = content.replace("import React,\nimport { toast } from 'sonner';\n { useState }", "import React, { useState }");
  content = "import { toast } from 'sonner';\n" + content;
  fs.writeFileSync(file, content);
}

['pages/Booking.tsx', 'pages/RiskCalculator.tsx'].forEach(fixImport);
