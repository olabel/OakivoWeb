const fs = require('fs');
let content = fs.readFileSync('components/LeadDrawer.tsx', 'utf8');

// Replace the return block structure
const returnStart = content.indexOf('return (');
const returnEnd = content.lastIndexOf(');');

const oldReturn = content.substring(returnStart, returnEnd + 2);

let newReturn = oldReturn
  .replace('<AnimatePresence>', '<>\n      <AnimatePresence>')
  .replace('</AnimatePresence>', '</AnimatePresence>\n    </>')
  .replace(/<SuccessModal[\s\S]*?\/>/, (match) => {
    return match; // keep it, but we need to move it outside AnimatePresence
  });

// Let's do it with regex to be safer
content = content.replace(
  /<AnimatePresence>\s*{\/\* Success Modal \*\/}\s*(<SuccessModal[\s\S]*?\/>)/,
  '{/* Success Modal */}\n      $1\n      <AnimatePresence>'
);

content = content.replace(
  /<motion\.div\s*key="drawer-overlay"[\s\S]*?\/>/,
  (match) => match + '\n        )}\n        {isOpen && ('
);

content = content.replace(
  /{\s*isOpen\s*&&\s*\(\s*<>/,
  '{isOpen && ('
);

content = content.replace(
  /<\/>\s*\)\s*}\s*<\/AnimatePresence>/,
  ')}\n      </AnimatePresence>'
);

fs.writeFileSync('components/LeadDrawer.tsx', content);
console.log('Patched LeadDrawer.tsx');
